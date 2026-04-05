import type { Article } from './types'

const article: Article = {
    slug: 'cybersecurite-pme-erreurs-courantes',
    category: 'formation',
    title: "Cybersécurité pour PME : les 8 erreurs qui vous exposent (et comment les corriger ce mois-ci)",
    excerpt:
      '60 % des cyberattaques ciblent les PME, et la moitié des entreprises touchées ne s\'en remettent pas. Voici les 8 erreurs de sécurité les plus courantes et un plan d\'action minimal pour vous protéger rapidement.',
    date: '22 janvier 2026',
    dateISO: '2026-01-22',
    readTime: '9 min',
    author: 'David Khazaei',
    heroImage: {
      src: '/images/blog/cybersecurite-pme-hero.png',
      alt: 'Cybersecurite PME 2026 : bouclier numerique protégeant une entreprise contre les cybermenaces et attaques informatiques',
    },
    images: [
      {
        src: '/images/blog/cybersecurite-pme-risques.png',
        alt: 'Matrice de risques cybersecurite PME : evaluation des menaces par probabilite et impact pour entreprises suisses',
        caption: 'Matrice de risques : probabilité vs impact. Les zones rouges demandent une action immédiate',
      },
    ],
    tags: ['cybersécurité', 'PME', 'sécurité', 'RGPD', 'phishing', 'mots de passe'],
    seoTitle: 'Cybersécurité PME 2026 : 8 erreurs à corriger · DKDP',
    seoDescription:
      '60 % des cyberattaques visent les PME. Découvrez les 8 erreurs de sécurité les plus fréquentes et un plan d\'action concret pour renforcer votre protection ce mois-ci.',
    content: `## La réalité : les PME sont la cible principale des cyberattaques

Le mythe persiste : "les hackers ne s'intéressent qu'aux grandes entreprises." C'est l'inverse. En 2025, 60 % des cyberattaques documentées ciblaient des PME de moins de 250 employés (source : Verizon Data Breach Investigations Report, 2024). La raison est simple : les PME ont des données de valeur (données clients, bancaires, propriété intellectuelle) mais des défenses bien plus faibles que les grandes structures.

Le coût moyen d'une cyberattaque pour une PME suisse est estimé entre 50 000 et 250 000 CHF (source : Hiscox Cyber Readiness Report, 2024), en comptant la récupération des données, l'arrêt d'activité, les frais juridiques et les amendes potentielles liées à la LPD (Loi sur la Protection des Données). 43 % des PME touchées déposent le bilan dans les 6 mois suivant une attaque majeure (source : National Cyber Security Alliance).

Ce n'est pas pour vous faire peur. C'est pour ancrer la décision de sécuriser votre infrastructure dans la réalité économique.

## Les 8 erreurs qui vous exposent

### 1. Mots de passe faibles et partagés

"Password123" ou le nom de votre entreprise suivi de l'année : ces mots de passe sont cracqués en quelques secondes par des outils automatisés. Le problème aggravant : le partage de mots de passe entre collègues, sans traçabilité.

**Solution :** déployez un gestionnaire de mots de passe d'entreprise (1Password Teams, Bitwarden Business, Dashlane for Business). Chaque collaborateur a son propre compte sécurisé, les accès partagés sont contrôlés, et les mots de passe sont générés aléatoirement (20+ caractères).

### 2. Pas d'authentification à deux facteurs

L'authentification à deux facteurs (2FA) bloque 99,9 % des attaques automatisées sur les comptes (source : Microsoft Security Blog, 2019), même si le mot de passe est compromis. Et pourtant, la majorité des PME ne l'ont pas activée sur leurs services critiques.

**Solution :** activez le 2FA sur tous les services sensibles en priorité : Microsoft 365 / Google Workspace, accès VPN, comptabilité en ligne, banking. Utilisez une app d'authentification (Authy, Google Authenticator, Microsoft Authenticator) plutôt que les SMS.

### 3. Logiciels non mis à jour

Les mises à jour de sécurité corrigent des vulnérabilités connues et documentées. Un système non mis à jour est une porte ouverte à des attaques qui exploitent des failles déjà répertoriées. Cela concerne Windows, macOS, mais aussi WordPress, ses plugins, et tout logiciel métier.

**Solution :** activez les mises à jour automatiques là où c'est possible. Pour WordPress, utilisez un outil de monitoring (ManageWP, MainWP) qui centralise les mises à jour de tous vos sites.

### 4. Emails non sécurisés

Sans SPF, DKIM et DMARC configurés sur votre domaine email, n'importe qui peut envoyer des emails en se faisant passer pour vous. C'est la base technique de l'usurpation d'identité par email, qui expose vos clients et partenaires.

**Solution :** demandez à votre hébergeur ou à votre développeur de vérifier et configurer SPF, DKIM et DMARC sur votre domaine. C'est une configuration DNS qui prend une heure et qui protège votre réputation d'expéditeur.

### 5. Pas de sauvegarde testée régulièrement

Avoir une sauvegarde ne suffit pas : encore faut-il avoir testé sa restauration. Des dizaines de PME ont découvert que leurs sauvegardes étaient corrompues ou incomplètes au moment où elles en avaient besoin.

**Solution :** règle du 3-2-1 : 3 copies de vos données, sur 2 supports différents, dont 1 hors site (cloud). Testez la restauration d'un fichier depuis votre sauvegarde au moins une fois par trimestre.

### 6. Accès trop larges aux employés

Le principe du moindre privilège est simple : chaque collaborateur ne doit avoir accès qu'aux données et systèmes dont il a réellement besoin pour son travail. Or, dans la plupart des PME, tout le monde a accès à tout "par facilité".

**Solution :** auditez vos accès. Révoquez les accès des anciens collaborateurs (immédiatement au départ). Créez des groupes d'accès par rôle plutôt que des accès individuels ad hoc.

### 7. Wifi d'entreprise non sécurisé

Un réseau Wifi d'entreprise avec un mot de passe partagé à toute l'équipe et aux visiteurs est une faille béante. Toute personne sur le réseau peut potentiellement intercepter le trafic non chiffré ou attaquer d'autres appareils connectés.

**Solution :** séparez votre réseau Wifi en deux : un réseau privé (employés, appareils de travail) avec WPA3 et un mot de passe complexe, et un réseau invités isolé pour les visiteurs et appareils personnels.

### 8. Pas de formation phishing pour les équipes

91 % des cyberattaques réussies commencent par un email de phishing (source : Deloitte, 2024). Vos collaborateurs sont la dernière ligne de défense, et ils doivent être formés à reconnaître les tentatives de manipulation.

**Solution :** organisez au minimum une formation annuelle sur les signaux de phishing. Des outils comme KnowBe4 ou Proofpoint permettent d'envoyer de faux emails de phishing pour tester et former vos équipes sans risque réel.

___IMG:cybersecurite-pme-risques.png___

## Le plan d'action minimal en 30 jours

**Semaines 1-2 : Authentification.** Déployez un gestionnaire de mots de passe. Activez le 2FA sur tous les services critiques. Révoquez les accès des anciens collaborateurs.

**Semaine 3 : Sauvegardes.** Auditez votre stratégie de sauvegarde actuelle. Mettez en place la règle 3-2-1. Testez une restauration.

**Semaine 4 : Formation équipe.** Organisez une session de 1h sur le phishing et les bonnes pratiques de sécurité. Configurez SPF/DKIM/DMARC. Séparez vos réseaux Wifi.

## Outils recommandés

| Outil | Usage | Prix |
|---|---|---|
| 1Password Teams | Gestionnaire de mots de passe | 5 $/utilisateur/mois |
| Bitwarden Business | Gestionnaire de mots de passe (open-source) | 3 $/utilisateur/mois |
| Authy | Authentification 2FA | Gratuit |
| Backblaze B2 | Sauvegarde cloud | 6 $/To/mois |
| Malwarebytes for Teams | Protection endpoints | 4 $/appareil/mois |
| KnowBe4 | Formation phishing | Sur devis |
| Have I Been Pwned | Vérification de fuite de données | Gratuit |

## Conclusion

La cybersécurité n'est pas un projet réservé aux DSI des grandes entreprises. C'est un ensemble de bonnes pratiques accessibles à toute PME, souvent à faible coût. Les 8 points couverts dans cet article constituent le socle minimal. Commencez ce mois-ci par les deux premières priorités : gestionnaire de mots de passe et 2FA. Ces deux mesures seules réduisent votre surface d'attaque de façon drastique.`,
  }

export default article
