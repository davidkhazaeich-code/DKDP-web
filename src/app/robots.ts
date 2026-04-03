import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Tous les crawlers : accès complet sauf /api/
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Crawlers AI Search : accès explicite confirmé
        userAgent: ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Applebot", "Bingbot"],
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Crawlers d'entraînement pur : bloqués
        userAgent: ["CCBot", "cohere-ai", "anthropic-ai"],
        disallow: "/",
      },
    ],
    sitemap: "https://dkdp.ch/sitemap.xml",
  };
}
