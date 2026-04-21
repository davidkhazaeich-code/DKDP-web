'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Hook de reconnaissance vocale basé sur l'API native Web Speech
 * (`SpeechRecognition` / `webkitSpeechRecognition`).
 *
 * Supporté sur :
 * - iOS Safari (moteur Apple)
 * - Chrome / Edge desktop (moteur Google)
 * - Chrome Android
 * - Non supporté sur Firefox → `isSupported` est false, le bouton
 *   d'activation doit être masqué.
 *
 * L'API tourne côté client et est gratuite. La reconnaissance s'arrête
 * automatiquement après ~2s de silence ou quand `stop()` est appelé.
 */

type MinimalSpeechRecognition = {
  lang: string
  interimResults: boolean
  continuous: boolean
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onend: (() => void) | null
  onerror: ((event: { error?: string }) => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type SpeechRecognitionCtor = new () => MinimalSpeechRecognition

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor
    webkitSpeechRecognition?: SpeechRecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export function useSpeechRecognition(options: { lang?: string } = {}) {
  const { lang = 'fr-FR' } = options

  const [isSupported, setIsSupported] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<MinimalSpeechRecognition | null>(null)

  useEffect(() => {
    const Ctor = getSpeechRecognitionCtor()
    if (!Ctor) {
      setIsSupported(false)
      return
    }

    setIsSupported(true)
    const recognition = new Ctor()
    recognition.lang = lang
    recognition.interimResults = true
    recognition.continuous = false

    recognition.onresult = (event) => {
      let text = ''
      const results = event.results
      for (let i = 0; i < results.length; i++) {
        const r = results[i]
        if (r && r[0]) text += r[0].transcript
      }
      setTranscript(text.trim())
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      setIsListening(false)
      const code = event.error ?? 'unknown'
      if (code === 'not-allowed' || code === 'service-not-allowed') {
        setError('Permission microphone refusée.')
      } else if (code === 'no-speech') {
        setError(null) // silence simple, pas une vraie erreur
      } else if (code !== 'aborted') {
        setError('Reconnaissance vocale indisponible.')
      }
    }

    recognitionRef.current = recognition

    return () => {
      try {
        recognition.abort()
      } catch {
        // ignore
      }
      recognitionRef.current = null
    }
  }, [lang])

  const start = useCallback(async () => {
    if (!recognitionRef.current || isListening) return
    setTranscript('')
    setError(null)

    // Demande permission micro explicite avant d'appeler start() : sur Chrome
    // si la permission a ete refusee une fois, recognition.start() echoue
    // silencieusement. getUserMedia force le prompt ou le refus explicite.
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        // On stoppe le stream immediatement, on voulait juste la permission
        stream.getTracks().forEach((t) => t.stop())
      } catch (err) {
        const name = (err as Error)?.name ?? 'unknown'
        if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
          setError('Permission microphone refusée. Autorisez le micro dans les réglages du site.')
        } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
          setError('Aucun microphone détecté.')
        } else {
          setError('Impossible d\'accéder au microphone.')
        }
        return
      }
    }

    try {
      recognitionRef.current.start()
      setIsListening(true)
    } catch (err) {
      const msg = (err as Error)?.message ?? ''
      if (!msg.includes('already started')) {
        setError('La reconnaissance vocale n\'a pas pu démarrer.')
      }
    }
  }, [isListening])

  const stop = useCallback(() => {
    if (!recognitionRef.current) return
    try {
      recognitionRef.current.stop()
    } catch {
      // ignore
    }
  }, [])

  const toggle = useCallback(() => {
    if (isListening) stop()
    else start()
  }, [isListening, start, stop])

  return { isSupported, isListening, transcript, error, start, stop, toggle }
}
