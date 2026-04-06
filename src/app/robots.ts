import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Tous les crawlers : acces complet sauf /api/ et /_next/
        userAgent: "*",
        allow: ["/", "/agence-digitale/", "/formation-entreprise/", "/intelligence-artificielle/", "/blog/", "/contact", "/a-propos", "/tarifs"],
        disallow: ["/api/", "/_next/", "/private/", "/temp/"],
      },
      {
        // Googlebot : acces total, pas de crawl-delay
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        // Bingbot : acces total
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        // Crawlers AI Search : acces explicite confirme
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Applebot", "Applebot-Extended", "Google-Extended", "YouBot"],
        allow: "/",
      },
      {
        // Crawlers d'entrainement pur : bloques
        userAgent: ["CCBot", "cohere-ai", "anthropic-ai", "Meta-ExternalAgent"],
        disallow: "/",
      },
      {
        // Bots parasites : bloques
        userAgent: ["MJ12bot", "AhrefsBot", "SemrushBot", "DotBot", "PetalBot", "BLEXBot"],
        disallow: "/",
      },
    ],
    sitemap: "https://dkdp.ch/sitemap.xml",
  };
}
