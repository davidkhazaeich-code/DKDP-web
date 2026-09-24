/**
 * L'entité DKDP, une seule fois (21/09/2026, plan SEO, action D15).
 *
 * Avant ce fichier, l'adresse, les coordonnées et le lien Maps étaient écrits
 * dans huit endroits avec trois valeurs de geo (centroïde de Genève à 1'326 m
 * de l'adresse), un CID de fiche inexistant et un nom « DKDP Service Digital »
 * dans les liens d'itinéraire. Tout ce qui décrit l'entreprise lit ici.
 *
 * Sources : Zefix (nom légal, UID), geo.admin (coordonnées de la rue du
 * 31-Décembre 36), fiche Google Business Profile (CID, nom), page À propos
 * (fondation 2019).
 */
export const ENTITY = {
  name: 'DKDP',
  legalName: 'DKDP - David Khazaei Digital Production',
  /** Nom de la fiche Google Business Profile. */
  gbpName: 'DKDP - Agence Digitale - IA & Formation à Genève',
  vatID: 'CHE-417.965.534',
  foundingDate: '2019',
  url: 'https://dkdp.ch',
  telephone: '+41799407969',
  telephoneDisplay: '+41 79 940 79 69',
  /**
   * Pas d'adresse email publique (décision de David, 24/09/2026 : trop de
   * spam). Le contact écrit passe par le formulaire /contact. Garde-fou :
   * `src/lib/__tests__/aucun-email-public.test.ts`.
   */
  address: {
    streetAddress: 'Rue du 31 Décembre 36',
    postalCode: '1207',
    locality: 'Genève',
    localityEn: 'Geneva',
    region: 'GE',
    country: 'CH',
  },
  /** geo.admin, entrée de l'immeuble. */
  geo: { latitude: 46.20285, longitude: 6.16029 },
  /** CID de la fiche Google (celui qui ouvre la fiche, pas le location_id de l'API). */
  mapsUrl: 'https://maps.google.com/?cid=11506632638193894279',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=DKDP,Rue+du+31+D%C3%A9cembre+36,1207+Gen%C3%A8ve',
  sameAs: [
    'https://www.linkedin.com/company/dkdp',
    'https://www.instagram.com/davidkhazaei',
    'https://maps.google.com/?cid=11506632638193894279',
  ],
  /** Logo sombre sur fond clair, dimensions réelles du fichier. */
  logo: { url: 'https://dkdp.ch/images/logo/dkdp_noir-croped.png', width: 2180, height: 374 },
} as const

/** « Rue du 31 Décembre 36, 1207 Genève ». */
export const ADDRESS_LINE = `${ENTITY.address.streetAddress}, ${ENTITY.address.postalCode} ${ENTITY.address.locality}`
