#!/usr/bin/env python3
"""
Generate blog images for DKDP.ch — articles 10-17 (8 articles x 2 images = 16 images).
Hero (16:9) + UX/UI diagram (4:3 or 1:1) per article.
Brand: dark (#09090B), violet (#A78BFA), chrome (#D4D4D8), premium editorial.
"""

import os
import sys
import time
import base64
from pathlib import Path

# Load GEMINI_API_KEY from .env
env_path = Path(__file__).parent.parent.parent.parent.parent.parent / ".env"
for line in env_path.read_text().splitlines():
    if line.startswith("GEMINI_API_KEY="):
        os.environ["GEMINI_API_KEY"] = line.split("=", 1)[1].strip()
        break

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("ERROR: GEMINI_API_KEY not found")
    sys.exit(1)

from google import genai
from google.genai import types as gx

client = genai.Client(api_key=API_KEY)
MODEL = "gemini-3.1-flash-image-preview"

OUT_DIR = Path(__file__).parent.parent / "public" / "images" / "blog"
OUT_DIR.mkdir(parents=True, exist_ok=True)

IMAGES = [
    # ─────────────────────────────────────────────────────────────────────
    # Article 10 — Combien coûte un site web à Genève en 2026
    # ─────────────────────────────────────────────────────────────────────
    {
        "filename": "cout-site-web-geneve-hero.png",
        "aspect": "16:9",
        "prompt": (
            "Abstract premium concept for web project pricing: a minimalist dark dashboard "
            "with a large glowing budget dial/gauge at center, surrounded by floating cost cards "
            "with subtle price ranges as glowing labels. Swiss precision aesthetic — clean geometry, "
            "violet glow, chrome metallic accents on the cards. "
            "No text, no numbers. Very dark background, depth of field, cinematic."
        ),
    },
    {
        "filename": "cout-site-web-geneve-tableau.png",
        "aspect": "4:3",
        "prompt": (
            "UX/UI diagram: a tiered price comparison visualization on a dark screen. "
            "5 horizontal tiers stacked vertically (like a bar chart flipped), each a glowing "
            "horizontal bar of increasing length and color intensity — from faint chrome (entry) "
            "to bright violet (enterprise). Small icon symbols at the start of each bar suggest project complexity. "
            "Dark background, grid lines subtle, premium infographic style. No text labels visible."
        ),
    },

    # ─────────────────────────────────────────────────────────────────────
    # Article 11 — Comment choisir son agence digitale à Genève
    # ─────────────────────────────────────────────────────────────────────
    {
        "filename": "choisir-agence-digitale-geneve-hero.png",
        "aspect": "16:9",
        "prompt": (
            "Cinematic top-down view of a premium meeting room at night in Geneva: "
            "a glass table with floating holographic scorecards evaluating agencies. "
            "Violet and chrome light from the displays reflects on the table surface. "
            "The scene feels decisive, strategic, elegant. Dark ambient, editorial photography style. "
            "No faces visible, no text."
        ),
    },
    {
        "filename": "choisir-agence-digitale-geneve-criteres.png",
        "aspect": "4:3",
        "prompt": (
            "UX/UI checklist diagram: 6 evaluation criteria as glowing vertical cards arranged "
            "in a 2x3 grid on a dark background. Each card has a distinct icon symbol (geometric, minimal) "
            "and a status indicator — checkmark glow in violet. Cards have chrome borders and subtle "
            "depth shadow. Like a premium scoring rubric visualized. No text, pure visual hierarchy."
        ),
    },

    # ─────────────────────────────────────────────────────────────────────
    # Article 12 — SEO vs Google Ads à Genève
    # ─────────────────────────────────────────────────────────────────────
    {
        "filename": "seo-vs-google-ads-geneve-hero.png",
        "aspect": "16:9",
        "prompt": (
            "A split-screen cinematic visualization: left half shows organic search results "
            "as glowing green nodes growing slowly upward (like a plant in time-lapse), "
            "right half shows paid ads as bright instant flashes that blink on then off. "
            "Both sides on very dark background with a chrome dividing line in center. "
            "Abstract, metaphorical, premium digital art. No text."
        ),
    },
    {
        "filename": "seo-vs-google-ads-geneve-tableau.png",
        "aspect": "4:3",
        "prompt": (
            "UX/UI comparison matrix: two columns side-by-side on a dark dashboard, "
            "8 rows of criteria. Left column has a violet glow header (organic), "
            "right column a chrome glow header (paid). Each row cell shows a mini bar or dot "
            "indicator showing relative score — no numbers or text. "
            "Clean grid lines, alternating subtle row backgrounds. Premium data table aesthetic."
        ),
    },

    # ─────────────────────────────────────────────────────────────────────
    # Article 13 — Refonte site web : 7 signaux
    # ─────────────────────────────────────────────────────────────────────
    {
        "filename": "refonte-site-web-hero.png",
        "aspect": "16:9",
        "prompt": (
            "A dramatic before/after visualization on dark background: "
            "left side shows an old website on a cracked, glitchy dark screen with desaturated, "
            "blurry UI elements; right side shows a sleek modern website on a perfect screen "
            "glowing violet and chrome. A bright vertical light beam divides the two. "
            "Cinematic, high-contrast, no text. Premium digital transformation concept."
        ),
    },
    {
        "filename": "refonte-site-web-checklist.png",
        "aspect": "4:3",
        "prompt": (
            "UX/UI diagram: 7 signal indicators arranged vertically like a diagnostic panel. "
            "Each row is a status bar with a warning icon (amber glow) or critical icon (red glow). "
            "The bars have different fill levels suggesting severity. "
            "Dark background, chrome borders on each row, violet accent on the most critical. "
            "Like a server health dashboard but for website quality signals. No text."
        ),
    },

    # ─────────────────────────────────────────────────────────────────────
    # Article 14 — Formation IA entreprise à Genève 2026
    # ─────────────────────────────────────────────────────────────────────
    {
        "filename": "formation-ia-entreprise-geneve-hero.png",
        "aspect": "16:9",
        "prompt": (
            "A premium corporate training session at night in a modern Geneva office: "
            "professionals gathered around a large screen displaying AI interface visualizations. "
            "Violet light from the displays illuminates focused faces. "
            "Cinematic depth of field, 35mm photography feel, no text on screens. "
            "Dark ambient, warm violet and chrome highlights. Editorial, aspirational."
        ),
    },
    {
        "filename": "formation-ia-entreprise-geneve-usages.png",
        "aspect": "4:3",
        "prompt": (
            "UX/UI department matrix: a 4-column organizational chart visualization on dark background. "
            "4 department nodes (abstract icons) at top: Marketing, RH, Finance, Commercial — each glowing differently. "
            "Below each, 3-4 connected use-case nodes as smaller pills. "
            "Connecting lines in violet, node borders in chrome. "
            "Like a premium org chart meets mind-map. No text, pure visual hierarchy."
        ),
    },

    # ─────────────────────────────────────────────────────────────────────
    # Article 15 — Automatiser ses tâches avec l'IA
    # ─────────────────────────────────────────────────────────────────────
    {
        "filename": "automatiser-taches-ia-hero.png",
        "aspect": "16:9",
        "prompt": (
            "Abstract automation flow visualization: an email icon at top-left sends a glowing stream "
            "through a neural processing node (violet brain-like shape), which fans out into "
            "multiple output streams going to CRM, document, and notification icons. "
            "All on very dark background. Glowing bezier curves in violet and chrome. "
            "Clean, geometric, premium tech illustration. No text."
        ),
    },
    {
        "filename": "automatiser-taches-ia-workflow.png",
        "aspect": "4:3",
        "prompt": (
            "UX/UI workflow diagram: 5 connected process steps in a horizontal pipeline on dark background. "
            "Each step is a rounded rectangle node with a distinct geometric icon inside. "
            "Arrows connecting nodes pulse with violet glow. "
            "Above the pipeline: input sources as small icons feeding in. "
            "Below: output results as glowing checkmark nodes. "
            "Chrome node borders, violet flow lines, very dark background. Premium process diagram."
        ),
    },

    # ─────────────────────────────────────────────────────────────────────
    # Article 16 — Créer un site web PME Suisse romande
    # ─────────────────────────────────────────────────────────────────────
    {
        "filename": "creer-site-web-pme-suisse-romande-hero.png",
        "aspect": "16:9",
        "prompt": (
            "A creative team collaborating on a web project at a modern Swiss studio: "
            "large wall-mounted screen showing website wireframes, team members in foreground "
            "working on tablets and laptops. Violet and chrome light from the displays. "
            "Cinematic 3/4 angle, depth of field, dark ambient. No visible text on screens. "
            "Premium editorial photography feel, aspirational but grounded."
        ),
    },
    {
        "filename": "creer-site-web-pme-suisse-romande-etapes.png",
        "aspect": "4:3",
        "prompt": (
            "UX/UI step diagram: 5 phases of a web project as an ascending staircase visualization. "
            "Each step is a glowing platform labeled with a phase number (1-5 as geometric numerals). "
            "The staircase goes from bottom-left to top-right, each step taller and brighter. "
            "Colors shift from chrome (step 1) through violet gradient to bright violet (step 5). "
            "Dark background, isometric 3D perspective, premium infographic style. No text."
        ),
    },

    # ─────────────────────────────────────────────────────────────────────
    # Article 17 — IA ou consultant humain pour PME
    # ─────────────────────────────────────────────────────────────────────
    {
        "filename": "ia-ou-consultant-humain-hero.png",
        "aspect": "16:9",
        "prompt": (
            "A split conceptual visualization: left side shows a glowing AI interface "
            "(abstract neural network, violet glow, dark screen), right side shows "
            "a human in a premium suit at a desk with physical documents and warm accent light. "
            "The two sides meet in the center with a bright chrome dividing beam. "
            "Dark background overall, cinematic, no text. Premium concept art."
        ),
    },
    {
        "filename": "ia-ou-consultant-humain-tableau.png",
        "aspect": "4:3",
        "prompt": (
            "UX/UI comparison diagram: two vertical columns on dark background. "
            "Left column header glows chrome (AI icon), right column header glows violet (human icon). "
            "10 rows of criteria as horizontal bars split between the two columns, "
            "each bar showing relative strength — some tilt left (AI stronger), some tilt right (human stronger). "
            "Like a strength meter visualization. No text. Premium data comparison aesthetic."
        ),
    },
]


def generate_image(item: dict, idx: int, total: int) -> bool:
    filename = item["filename"]
    output_path = OUT_DIR / filename

    if output_path.exists():
        print(f"[{idx}/{total}] SKIP (exists): {filename}")
        return True

    print(f"[{idx}/{total}] Generating: {filename} ({item['aspect']})...")

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=[item["prompt"]],
            config=gx.GenerateContentConfig(
                response_modalities=["TEXT", "IMAGE"],
                image_config=gx.ImageConfig(aspect_ratio=item["aspect"]),
            ),
        )

        image_saved = False
        for part in response.candidates[0].content.parts:
            if part.inline_data and part.inline_data.mime_type.startswith("image/"):
                output_path.write_bytes(part.inline_data.data)
                print(f"  -> Saved: {output_path} ({len(part.inline_data.data) // 1024}KB)")
                image_saved = True
                break

        if not image_saved:
            print(f"  WARNING: No image in response for {filename}")
            for part in response.candidates[0].content.parts:
                if part.text:
                    print(f"  Text: {part.text[:200]}")
            return False

        return True

    except Exception as e:
        print(f"  ERROR generating {filename}: {e}")
        return False


def main():
    total = len(IMAGES)
    print(f"Generating {total} blog images — articles 10-17")
    print(f"Model: {MODEL}")
    print(f"Output: {OUT_DIR}\n")

    success = 0
    failed = []

    for i, item in enumerate(IMAGES, 1):
        ok = generate_image(item, i, total)
        if ok:
            success += 1
        else:
            failed.append(item["filename"])

        # Rate limiting: 4 seconds between requests
        if i < total:
            time.sleep(4)

    print(f"\nDone: {success}/{total} images generated")
    if failed:
        print(f"Failed: {failed}")
    else:
        print("All images generated successfully!")


if __name__ == "__main__":
    main()
