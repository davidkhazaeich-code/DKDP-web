import { streamText, convertToModelMessages } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { NextRequest } from 'next/server'
import { rateLimit, rateLimitDaily, getIp } from '@/lib/rate-limit'
import { DKDP_SYSTEM_PROMPT } from '@/lib/chat-system-prompt'

const MAX_MESSAGE_LENGTH = 500
const MAX_MESSAGES_PER_CONVERSATION = 12

export async function POST(req: NextRequest) {
  const ip = getIp(req)

  // Rate limit: 10 messages per IP per minute
  const { allowed: minuteOk } = rateLimit(ip, { limit: 10, windowMs: 60 * 1000 })
  if (!minuteOk) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please wait a moment.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Daily limit: 50 messages per IP per day
  const { allowed: dailyOk } = rateLimitDaily(ip, 50)
  if (!dailyOk) {
    return new Response(JSON.stringify({ error: 'Daily limit reached. Please try again tomorrow.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const body = await req.json()
  const { messages, _hp } = body

  // Honeypot: if the hidden field is filled, it's a bot
  if (_hp) {
    // Return a fake success to not tip off the bot
    return new Response('data: {"type":"text","value":"Merci pour votre message."}\n\n', {
      status: 200,
      headers: { 'Content-Type': 'text/event-stream' },
    })
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'Invalid messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Block conversations that exceed the max length (server-side enforcement)
  if (messages.length > MAX_MESSAGES_PER_CONVERSATION * 2) {
    return new Response(JSON.stringify({ error: 'Conversation limit reached.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Validate last user message length
  const lastMessage = messages[messages.length - 1]
  const lastText = lastMessage?.parts
    ?.filter((p: { type: string }) => p.type === 'text')
    .map((p: { text: string }) => p.text)
    .join('') ?? ''

  if (lastText.length > MAX_MESSAGE_LENGTH) {
    return new Response(JSON.stringify({ error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters).` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (lastText.trim().length === 0) {
    return new Response(JSON.stringify({ error: 'Empty message.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Convert UI messages (parts format) to model messages (content format)
  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    system: DKDP_SYSTEM_PROMPT,
    messages: modelMessages,
    maxOutputTokens: 500,
  })

  return result.toUIMessageStreamResponse()
}
