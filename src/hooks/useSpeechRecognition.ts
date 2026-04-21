'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Hook de reconnaissance vocale basé sur l'API native Web Speech.
 *
 * Particularités de cette implémentation :
 *
 * 1. Chaque appel à `start()` crée une NOUVELLE instance de
 *    `SpeechRecognition`. iOS Safari (et dans une moindre mesure Chrome)
 *    ne permet pas de réutiliser proprement un objet après que `onend`
 *    a été déclenché : les `start()` suivants échouent silencieusement.
 *    Recréer l'objet à chaque session élimine tout ce bug de "deuxième
 *    clic qui ne fait rien".
 *
 * 2. `start()` reste synchrone à l'intérieur du click handler : on ne
 *    met pas de `await` avant car Chrome exige que `start()` soit
 *    appelé dans la même task que le user gesture, sinon silent reject.
 *
 * 3. Le support du navigateur est détecté une seule fois au mount,
 *    permet de masquer le bouton mic sur Firefox.
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

// Codes d'erreur qui indiquent que la dictée ne marchera pas durant
// toute cette session (permission refusée, pas de micro, langue non
// supportée). Quand un de ces codes remonte, on cache le bouton pour
// ne pas laisser le visiteur taper dans le vide.
const FATAL_ERROR_CODES = new Set([
  'not-allowed',
  'service-not-allowed',
  'audio-capture',
  'language-not-supported',
])

export function useSpeechRecognition(options: { lang?: string } = {}) {
  const { lang = 'fr-FR' } = options

  const [isSupported, setIsSupported] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [hasFatalError, setHasFatalError] = useState(false)

  const recognitionRef = useRef<MinimalSpeechRecognition | null>(null)

  // Détection du support — une seule fois au mount.
  useEffect(() => {
    setIsSupported(getSpeechRecognitionCtor() !== null)
    return () => {
      // Coupe toute reconnaissance encore active au démontage
      try {
        recognitionRef.current?.abort()
      } catch {
        // ignore
      }
      recognitionRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (isListening) return
    const Ctor = getSpeechRecognitionCtor()
    if (!Ctor) return

    // Abort toute reconnaissance précédente avant d'en démarrer une nouvelle.
    try {
      recognitionRef.current?.abort()
    } catch {
      // ignore
    }

    setTranscript('')
    setError(null)

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
      console.warn('[chatbot dictation] onerror:', code, event)
      if (FATAL_ERROR_CODES.has(code)) setHasFatalError(true)
      if (code === 'not-allowed' || code === 'service-not-allowed') {
        setError('Micro refusé. Vérifiez les réglages système (Confidentialité → Microphone) et les permissions du site.')
      } else if (code === 'no-speech') {
        setError(null)
      } else if (code === 'audio-capture') {
        setError('Aucun microphone détecté.')
      } else if (code === 'network') {
        setError('Dictée indisponible : connexion réseau requise.')
      } else if (code === 'language-not-supported') {
        setError('Langue non supportée par votre navigateur.')
      } else if (code !== 'aborted') {
        setError(`Dictée indisponible (${code}).`)
      }
    }

    recognitionRef.current = recognition

    try {
      recognition.start()
      setIsListening(true)
    } catch (err) {
      const msg = (err as Error)?.message ?? ''
      if (msg.toLowerCase().includes('already started')) {
        setIsListening(true)
        return
      }
      console.warn('[chatbot dictation] start() threw:', err)
      setError(`Démarrage impossible : ${msg || 'erreur inconnue'}`)
    }
  }, [isListening, lang])

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

  // Le bouton ne s'affiche que si le navigateur supporte l'API ET qu'on
  // n'a pas encore rencontré d'erreur fatale dans la session courante.
  const isAvailable = isSupported && !hasFatalError

  return { isSupported, isAvailable, hasFatalError, isListening, transcript, error, start, stop, toggle }
}
