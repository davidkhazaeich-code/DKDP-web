import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Moteurs classiques + crawlers AI Search : acces complet
        userAgent: ["*", "GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Applebot", "Bingbot"],
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Crawlers d'entrainement pur : bloques
        userAgent: ["CCBot", "cohere-ai", "anthropic-ai"],
        disallow: "/",
      },
    ],
    sitemap: "https://dkdp.ch/sitemap.xml",
  };
}
