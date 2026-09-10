import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  trackLead,
  trackPhoneClick,
  trackBookingComplete,
  trackNewsletterSignup,
  trackChatOpen,
  trackEvent,
} from '../analytics'
import { GA4_TO_OPENAI, OPENAI_EVENT_DATA_TYPE, newEventId } from '../openai-ads'

/**
 * Ces tests protegent le contrat du pixel OpenAI, verifie en reel contre
 * l'API le 2026-09-10 : un couple (evenement, data.type) invalide est refuse
 * en HTTP 400 (`event_type_data_mismatch`), et le SDK n'accepte aucune cle
 * libre dans `data`. Une faute de frappe ici ne casse rien visuellement :
 * les conversions disparaissent en silence.
 */

type OaiqCall = [string, string, Record<string, unknown>, Record<string, unknown>?]

function lastMeasure(): OaiqCall {
  const calls = (window.oaiq as unknown as { mock: { calls: OaiqCall[] } }).mock.calls
  return calls[calls.length - 1]
}

describe('pixel OpenAI', () => {
  beforeEach(() => {
    window.oaiq = vi.fn() as unknown as typeof window.oaiq
  })
  afterEach(() => {
    delete window.oaiq
  })

  it('envoie un formulaire en lead_created / customer_action', () => {
    trackLead({ form_type: 'contact', event_id: 'evt-123' })
    expect(lastMeasure()).toEqual([
      'measure',
      'lead_created',
      { type: 'customer_action' },
      { event_id: 'evt-123' },
    ])
  })

  it('envoie un rendez-vous Cal confirme en appointment_scheduled', () => {
    trackBookingComplete({ cal_namespace: 'planifier-un-appel' })
    expect(lastMeasure()[1]).toBe('appointment_scheduled')
    expect(lastMeasure()[2]).toEqual({ type: 'customer_action' })
  })

  it('envoie une inscription newsletter en registration_completed', () => {
    trackNewsletterSignup({ event_id: 'nl-1' })
    expect(lastMeasure()[1]).toBe('registration_completed')
  })

  it('envoie les signaux d intention en evenement personnalise', () => {
    trackPhoneClick({ phone_number: '+41799407969' })
    const [, name, data, options] = lastMeasure()
    expect(name).toBe('custom')
    expect(data).toEqual({ type: 'custom' })
    expect(options).toEqual({ custom_event_name: 'phone_click' })
  })

  it("n'envoie rien pour un evenement non mappe", () => {
    trackEvent('scroll_depth', { percent: 50 })
    expect(window.oaiq).not.toHaveBeenCalled()
  })

  it('omet event_id quand le formulaire n en fournit pas', () => {
    trackChatOpen()
    expect(lastMeasure()[3]).toEqual({ custom_event_name: 'chat_open' })
  })

  it('ne pousse aucun parametre GA4 libre dans data', () => {
    // Le SDK n'accepte que type / amount / currency pour customer_action :
    // `form_type` ou `form_location` feraient rejeter l'evenement.
    trackLead({ form_type: 'audit_seo', form_location: 'audit_hero', event_id: 'e' })
    expect(Object.keys(lastMeasure()[2])).toEqual(['type'])
  })

  it('transmet une valeur de lead quand elle est fournie', () => {
    trackLead({ form_type: 'estimation_site_web', value: 4200.4, currency: 'chf' })
    expect(lastMeasure()[2]).toEqual({ type: 'customer_action', amount: 4200, currency: 'CHF' })
  })

  it('ne casse pas quand le pixel est bloque', () => {
    delete window.oaiq
    expect(() => trackLead({ form_type: 'contact' })).not.toThrow()
  })
})

describe('table de correspondance', () => {
  it('associe a chaque evenement le data.type impose par le SDK', () => {
    for (const mapping of Object.values(GA4_TO_OPENAI)) {
      expect(OPENAI_EVENT_DATA_TYPE[mapping.event]).toBeDefined()
    }
    expect(OPENAI_EVENT_DATA_TYPE.lead_created).toBe('customer_action')
    expect(OPENAI_EVENT_DATA_TYPE.page_viewed).toBe('contents')
  })

  it('respecte le format impose aux noms d evenements personnalises', () => {
    // Regex du SDK : minuscules, chiffres, _ et -, 1 a 64 caracteres.
    const valid = /^[a-z0-9](?:[a-z0-9_-]{0,62}[a-z0-9])?$/
    for (const mapping of Object.values(GA4_TO_OPENAI)) {
      if (mapping.event === 'custom') {
        expect(mapping.customName).toMatch(valid)
      }
    }
  })
})

describe('newEventId', () => {
  it('rend un identifiant unique et non vide', () => {
    const ids = new Set(Array.from({ length: 200 }, () => newEventId()))
    expect(ids.size).toBe(200)
    expect([...ids].every((id) => id.length > 8)).toBe(true)
  })
})
