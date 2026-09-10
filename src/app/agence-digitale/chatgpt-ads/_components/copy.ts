import type { Locale } from '@/i18n/config'

/**
 * Textes partagés entre la page FR et son miroir EN. Les faits, dates et
 * chiffres viennent de `docs/chatgpt-ads-facts-2026-09-10.md`, seule source
 * autorisée. Les prix sont ceux décidés par David le 10 septembre 2026.
 *
 * La FAQ est balisée en FAQPage par `buildFAQPage` : le texte affiché et le
 * texte balisé doivent rester identiques, d'où une seule source ici.
 */

export const CONTACT_HREF = '/contact?service=service-digital'

export const FAQ: Record<Locale, { question: string; answer: string }[]> = {
  fr: [
    {
      question: 'Qu\'est-ce que ChatGPT Ads et comment fonctionne la publicité dans ChatGPT ?',
      answer:
        'ChatGPT Ads est le programme publicitaire d\'OpenAI. Une carte sponsorisée (nom de l\'annonceur, favicon, titre, texte, image, lien) s\'affiche sous la fin d\'une réponse pour les utilisateurs des forfaits Free et Go. Elle est choisie selon le contexte de la conversation en cours, la page de destination, le titre, le texte et les indications de contexte de l\'annonceur, par une enchère au second prix pondérée par la pertinence. Les annonces tournent sur un système séparé et n\'influencent jamais la réponse de ChatGPT.',
    },
    {
      question: 'ChatGPT Ads est-il disponible en Suisse et en Suisse romande ?',
      answer:
        'Oui. OpenAI a étendu ChatGPT Ads à 31 marchés européens, Suisse comprise, avec de premières annonces servies le 24 août 2026. Depuis le 31 août 2026, l\'Ads Manager en libre-service est ouvert aux entreprises de ces 31 marchés, et la Suisse figure comme disponible dans la liste officielle d\'OpenAI. Condition : l\'entité juridique qui annonce et qui est facturée doit être établie dans un pays listé.',
    },
    {
      question: 'Combien coûte une campagne ChatGPT Ads à Genève ?',
      answer:
        'Deux postes. Le budget média, versé directement à OpenAI sur votre compte : le budget quotidien minimum est de CHF 20 pour un compte facturé en francs, et OpenAI recommande de démarrer les enchères au clic entre 3 et 5 USD ; DKDP conseille CHF 600 à 1\'500 pour un pilote de 30 jours. La gestion DKDP : CHF 1\'200 pour le pilote (compte, mesure, cartes, suivi, rapport), puis CHF 450 par mois en gestion continue, ou CHF 950 par mois pour Google Ads et ChatGPT Ads ensemble. Zéro commission sur le budget média.',
    },
    {
      question: 'Qui voit les annonces dans ChatGPT ?',
      answer:
        'Les utilisateurs des forfaits Free et Go uniquement. Les abonnés Plus, Pro, Business, Enterprise et Edu ne voient aucune annonce, les comptes identifiés comme appartenant à des moins de 18 ans non plus, et rien ne s\'affiche dans les chats temporaires. Pour une offre grand public, l\'audience est large ; pour du B2B, beaucoup de décideurs sont sur des forfaits payants, donc sans annonces, et un pilote sert précisément à mesurer ce qu\'il reste.',
    },
    {
      question: 'Peut-on cibler uniquement Genève ou la Suisse romande ?',
      answer:
        'Pas de façon garantie : Ads Manager cible par pays, et les zones plus fines (région, ville, code postal) ne sont documentées par OpenAI que pour les États-Unis, avec une disponibilité « variable selon le pays » à vérifier au moment de créer la campagne. La localité se joue donc ailleurs : des cartes rédigées en français, un message qui nomme votre ville ou votre quartier, une page de destination locale et des indications de contexte qui décrivent les demandes de vos clients romands. Pour la Suisse alémanique, DKDP prépare des cartes en allemand dans un groupe d\'annonces séparé.',
    },
    {
      question: 'Quelle différence entre Google Ads et ChatGPT Ads ?',
      answer:
        'Google Ads répond à des mots-clés tapés, avec un ciblage fin (ville, rayon, audiences) et vingt ans de benchmarks. ChatGPT Ads répond à une conversation : la personne explique son besoin, ses contraintes, son budget, et la carte s\'affiche sous la réponse. Le ciblage est national, les formats se limitent à une carte, la mesure passe par le pixel OpenAI, la Conversions API et les UTM. DKDP recommande souvent les deux : Google pour la demande exprimée, ChatGPT pour la demande qui se construit.',
    },
    {
      question: 'Quels secteurs peuvent faire de la publicité dans ChatGPT ?',
      answer:
        'Pendant la période de test, OpenAI accepte surtout les biens de consommation et ménagers, les services locaux, les voyages et expériences, les produits numériques et l\'éducation. Les services financiers, de santé et juridiques ne sont autorisés qu\'au cas par cas aux États-Unis et sont généralement interdits ailleurs. Alcool, tabac, jeux d\'argent, contenu politique et annonces individuelles d\'emploi ou de logement sont interdits. DKDP vérifie l\'éligibilité avant de vous faire ouvrir un compte.',
    },
    {
      question: 'Faut-il un compte Ads Manager au nom de mon entreprise ?',
      answer:
        'Oui. OpenAI n\'autorise pas une agence à créer le compte à la place de son client : vous ouvrez le compte annonceur avec un compte OpenAI, vous renseignez l\'entreprise, le pays, la devise et le fuseau horaire (définitifs après création), vous passez la vérification d\'identité, puis vous ajoutez une carte de crédit. DKDP est ensuite invité comme membre de l\'équipe. Le compte, les données et l\'historique restent à vous.',
    },
    {
      question: 'Comment mesure-t-on les résultats d\'une campagne ChatGPT Ads ?',
      answer:
        'Ads Manager rapporte les impressions, les clics, la dépense, le taux de clic, le CPC moyen, le CPM moyen et les conversions. Pour compter les conversions, DKDP installe l\'OpenAI Pixel sur votre site ou branche la Conversions API côté serveur, et ajoute des paramètres UTM à chaque carte pour retrouver le trafic dans GA4. Le pixel dépose un cookie : il passe par votre bandeau de consentement, conforme à la nLPD.',
    },
    {
      question: 'Combien de temps faut-il pour lancer une campagne ChatGPT Ads ?',
      answer:
        'La seule étape que personne ne peut accélérer est la revue de votre compte par OpenAI, traitée dans une file d\'attente après la vérification d\'identité. En parallèle, DKDP prépare la mesure, les cartes et les indications de contexte. Une fois le compte validé, la campagne part en quelques jours, le pilote dure 30 jours, et vous recevez un rapport avec une décision go ou no-go.',
    },
  ],
  en: [
    {
      question: 'What is ChatGPT Ads and how does advertising inside ChatGPT work?',
      answer:
        'ChatGPT Ads is OpenAI\'s advertising programme. A sponsored card (advertiser name, favicon, title, copy, image, link) appears below the end of a response for users on the Free and Go plans. It is selected from the context of the current conversation, the landing page, the title, the copy and the advertiser\'s context hints, through a relevance-weighted second-price auction. Ads run on a separate system and never influence ChatGPT\'s answer.',
    },
    {
      question: 'Is ChatGPT Ads available in Switzerland and French-speaking Switzerland?',
      answer:
        'Yes. OpenAI extended ChatGPT Ads to 31 European markets, Switzerland included, with the first ads served on 24 August 2026. Since 31 August 2026 the self-serve Ads Manager has been open to businesses in those 31 markets, and Switzerland is listed as available in OpenAI\'s official table. Condition: the legal entity that advertises and is billed must be based in a listed country.',
    },
    {
      question: 'How much does a ChatGPT Ads campaign cost in Geneva?',
      answer:
        'Two lines. The media budget, paid directly to OpenAI on your own account: the minimum daily budget is CHF 20 for an account billed in francs, and OpenAI recommends starting cost-per-click bids between 3 and 5 USD; DKDP suggests CHF 600 to 1\'500 for a 30-day pilot. DKDP\'s management: CHF 1\'200 for the pilot (account, measurement, cards, monitoring, report), then CHF 450 per month for ongoing management, or CHF 950 per month for Google Ads and ChatGPT Ads together. Zero commission on media spend.',
    },
    {
      question: 'Who sees ads inside ChatGPT?',
      answer:
        'Only users on the Free and Go plans. Plus, Pro, Business, Enterprise and Edu subscribers see no ads, nor do accounts identified as belonging to people under 18, and nothing appears in temporary chats. For a consumer offer the audience is wide; for B2B many decision-makers sit on paid plans without ads, which is exactly what a pilot measures.',
    },
    {
      question: 'Can we target only Geneva or French-speaking Switzerland?',
      answer:
        'Not in a guaranteed way: Ads Manager targets by country, and finer areas (region, city, postal code) are only documented by OpenAI for the United States, with availability "varying by country" to be checked when the campaign is created. Locality is therefore built elsewhere: cards written in French, a message that names your city or neighbourhood, a local landing page and context hints that describe what your Swiss-French customers ask for. For German-speaking Switzerland, DKDP prepares German cards in a separate ad group.',
    },
    {
      question: 'What is the difference between Google Ads and ChatGPT Ads?',
      answer:
        'Google Ads answers typed keywords, with fine targeting (city, radius, audiences) and twenty years of benchmarks. ChatGPT Ads answers a conversation: the person explains their need, constraints and budget, and the card appears below the answer. Targeting is national, the format is a single card, and measurement relies on the OpenAI Pixel, the Conversions API and UTM parameters. DKDP often recommends both: Google for expressed demand, ChatGPT for demand that is still taking shape.',
    },
    {
      question: 'Which industries can advertise inside ChatGPT?',
      answer:
        'During the test period OpenAI mainly accepts consumer and household goods, local services, travel and experiences, digital products and education. Financial, health and legal services are only allowed case by case in the United States and are generally prohibited elsewhere. Alcohol, tobacco, gambling, political content and individual job or housing listings are prohibited. DKDP checks eligibility before you open an account.',
    },
    {
      question: 'Do I need an Ads Manager account in my company\'s name?',
      answer:
        'Yes. OpenAI does not allow an agency to create the account on a client\'s behalf: you open the advertiser account with an OpenAI account, enter the business, country, currency and time zone (fixed after creation), complete identity verification, then add a credit card. DKDP is then invited as a team member. The account, the data and the history stay yours.',
    },
    {
      question: 'How are the results of a ChatGPT Ads campaign measured?',
      answer:
        'Ads Manager reports impressions, clicks, spend, click-through rate, average CPC, average CPM and conversions. To count conversions, DKDP installs the OpenAI Pixel on your site or connects the server-side Conversions API, and adds UTM parameters to each card so the traffic shows up in GA4. The pixel sets a cookie: it goes through your consent banner, in line with the Swiss data protection act.',
    },
    {
      question: 'How long does it take to launch a ChatGPT Ads campaign?',
      answer:
        'The only step nobody can speed up is OpenAI\'s review of your account, handled in a queue after identity verification. In parallel DKDP prepares measurement, cards and context hints. Once the account is approved the campaign goes live within days, the pilot runs for 30 days, and you receive a report with a go or no-go decision.',
    },
  ],
}

/** Étiquettes courtes réutilisées dans plusieurs composants. */
export const LABELS: Record<Locale, { sponsored: string; estimate: string; source: string }> = {
  fr: { sponsored: 'Sponsorisé', estimate: 'Estimation indicative, pas une promesse', source: 'Source' },
  en: { sponsored: 'Sponsored', estimate: 'Indicative estimate, not a promise', source: 'Source' },
}
