import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createHash } from 'node:crypto'
import {
  sendOpenAiAdsEvent,
  sourceUrlFromRequest,
  geoFromRequest,
} from '../openai-ads-server'

/**
 * Contrat de l'API de conversion, valide en reel contre bzr.openai.com le
 * 2026-09-10 (`validate_only: true` -> `{"accepted_events":1}`).
 * Ces tests figent la forme de la charge utile sans toucher au reseau.
 */

const sha = (v: string) => createHash('sha256').update(v, 'utf8').digest('hex')

function mockFetch(ok = true) {
  const fn = vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 400,
    text: async () => (ok ? '{"accepted_events":1}' : '{"error":{"message":"nope"}}'),
  })
  vi.stubGlobal('fetch', fn)
  return fn
}

function bodyOf(fn: ReturnType<typeof mockFetch>) {
  return JSON.parse(fn.mock.calls[0][1].body as string)
}

describe('sendOpenAiAdsEvent', () => {
  beforeEach(() => {
    vi.stubEnv('OPENAI_ADS_API_KEY', 'sk-test-key')
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('poste sur le bon endpoint avec le pixel en parametre et le jeton', async () => {
    const fetchMock = mockFetch()
    await sendOpenAiAdsEvent({ id: 'e1', type: 'lead_created' })

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://bzr.openai.com/v1/events?pid=MhbGMaod48Cuvp7YJVsNgA')
    expect(init.method).toBe('POST')
    expect(init.headers.Authorization).toBe('Bearer sk-test-key')
    expect(init.headers['Content-Type']).toBe('application/json')
  })

  it('construit un evenement conforme au contrat', async () => {
    const fetchMock = mockFetch()
    await sendOpenAiAdsEvent({
      id: 'e2',
      type: 'lead_created',
      sourceUrl: 'https://dkdp.ch/contact',
      timestampMs: 1_757_500_000_000,
    })

    const body = bodyOf(fetchMock)
    expect(body.validate_only).toBe(false)
    expect(body.events).toHaveLength(1)
    expect(body.events[0]).toMatchObject({
      id: 'e2',
      type: 'lead_created',
      timestamp_ms: 1_757_500_000_000,
      source_url: 'https://dkdp.ch/contact',
      action_source: 'web',
      data: { type: 'customer_action' },
    })
  })

  it('hashe les identifiants et ne laisse fuiter aucune donnee en clair', async () => {
    const fetchMock = mockFetch()
    await sendOpenAiAdsEvent({
      id: 'e3',
      type: 'lead_created',
      user: {
        email: '  David.Khazaei@DKDP.ch ',
        phone: '+41 79 940 79 69',
        firstName: 'David',
        lastName: "O'Brien-Smith",
        country: 'ch',
        city: 'Genève',
      },
    })

    const raw = fetchMock.mock.calls[0][1].body as string
    const user = bodyOf(fetchMock).events[0].user

    // Normalisation attendue par OpenAI avant hachage.
    expect(user.email_sha256).toBe(sha('david.khazaei@dkdp.ch'))
    expect(user.phone_number_sha256).toBe(sha('41799407969'))
    expect(user.first_name_sha256).toBe(sha('david'))
    expect(user.last_name_sha256).toBe(sha('obriensmith'))
    expect(user.country).toBe('CH')
    expect(user.city).toBe('Genève')

    expect(raw).not.toContain('david.khazaei@dkdp.ch')
    expect(raw).not.toContain('DKDP.ch')
    expect(raw).not.toContain('799407969')
  })

  it('ecarte un telephone trop court plutot que de hasher du bruit', async () => {
    const fetchMock = mockFetch()
    await sendOpenAiAdsEvent({ id: 'e4', type: 'lead_created', user: { phone: '12 34' } })
    expect(bodyOf(fetchMock).events[0].user).toBeUndefined()
  })

  it("n'appelle pas l'API sans cle et ne jette pas", async () => {
    vi.stubEnv('OPENAI_ADS_API_KEY', '')
    const fetchMock = mockFetch()
    const res = await sendOpenAiAdsEvent({ id: 'e5', type: 'lead_created' })
    expect(fetchMock).not.toHaveBeenCalled()
    expect(res).toEqual({ sent: false, reason: 'no_api_key' })
  })

  it('avale un refus HTTP sans casser la reponse du formulaire', async () => {
    mockFetch(false)
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await sendOpenAiAdsEvent({ id: 'e6', type: 'lead_created' })
    expect(res.sent).toBe(false)
  })

  it('avale une panne reseau sans jeter', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('timeout')))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    await expect(sendOpenAiAdsEvent({ id: 'e7', type: 'lead_created' })).resolves.toMatchObject({
      sent: false,
      reason: 'network_error',
    })
  })
})

describe('contexte de la requete', () => {
  it('prend la page reelle dans Referer', () => {
    const req = new Request('https://dkdp.ch/api/contact', {
      headers: { referer: 'https://dkdp.ch/formation-entreprise/ia' },
    })
    expect(sourceUrlFromRequest(req)).toBe('https://dkdp.ch/formation-entreprise/ia')
  })

  it('retombe sur l accueil sans Referer, source_url etant obligatoire', () => {
    expect(sourceUrlFromRequest(new Request('https://dkdp.ch/api/contact'))).toBe('https://dkdp.ch')
  })

  it('lit la geolocalisation Vercel et decode les accents', () => {
    const req = new Request('https://dkdp.ch/api/contact', {
      headers: {
        'x-vercel-ip-country': 'CH',
        'x-vercel-ip-city': 'Gen%C3%A8ve',
        'x-vercel-ip-country-region': 'GE',
      },
    })
    expect(geoFromRequest(req)).toEqual({
      country: 'CH',
      city: 'Genève',
      region: 'GE',
      postalCode: undefined,
    })
  })

  it('ne suppose aucun pays hors de Vercel', () => {
    expect(geoFromRequest(new Request('https://dkdp.ch/api/contact')).country).toBeUndefined()
  })
})
