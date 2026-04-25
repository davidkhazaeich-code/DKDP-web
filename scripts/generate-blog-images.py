#!/usr/bin/env python3
"""
Generate blog images for DKDP.ch using Gemini image generation API.
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

BRAND_SYSTEM = (
    "You are a premium digital agency visual designer. "
    "All images must have: very dark near-black background (#09090B or similar), "
    "violet/purple accent glows (#A78BFA), chrome/silver metallic highlights. "
    "Clean, modern, editorial, Swiss precision aesthetic. "
    "No cheesy stock photo style. No cliché robot hands. Photorealistic or stylized digital art. "
    "High contrast, premium feel. Images should feel like a top-tier tech brand (Vercel, Linear, Stripe)."
)

IMAGES = [
    # Article 1 — ChatGPT vs Claude vs Copilot
    {
        "filename": "chatgpt-claude-copilot-hero.png",
        "aspect": "16:9",
        "prompt": (
            "Three glowing orbs of light representing AI assistants hovering in a dark void, "
            "each with a distinct aura: one warm white, one soft violet, one cool blue. "
            "Connected by fine geometric neural network lines. Abstract, cinematic, no text. "
            "Very dark background, violet ambient light from below. Premium digital art."
        ),
    },
    {
        "filename": "chatgpt-claude-copilot-comparison.png",
        "aspect": "4:3",
        "prompt": (
            "A sleek radar/spider chart visualization on a dark screen, comparing three AI models "
            "across 6 axes (speed, accuracy, cost, privacy, creativity, integration). "
            "Three overlapping polygon shapes in violet, chrome silver, and deep blue. "
            "Dark dashboard aesthetic, glowing lines, grid background. No text labels, pure visual."
        ),
    },
    # Article 2 — SEO local Genève
    {
        "filename": "seo-local-geneve-hero.png",
        "aspect": "16:9",
        "prompt": (
            "Aerial cinematic view of Geneva old town at dusk, Jet d'Eau fountain visible, "
            "overlaid with a dark semi-transparent digital map grid and glowing violet location pins. "
            "Search result cards floating in 3D above the city. Google Maps meets cyberpunk. "
            "Dark overlay, violet glow, chrome metallic accents. Editorial, premium."
        ),
    },
    {
        "filename": "seo-local-geneve-funnel.png",
        "aspect": "4:3",
        "prompt": (
            "A stylized digital marketing funnel visualization on dark background. "
            "Three stages: awareness (wide top, chrome), consideration (mid, violet), conversion (narrow bottom, green glow). "
            "Geometric 3D isometric style, glowing edges, particle effects flowing down. "
            "Dark background, premium tech dashboard aesthetic. No text."
        ),
    },
    # Article 3 — Automatiser les tâches répétitives
    {
        "filename": "automatiser-taches-hero.png",
        "aspect": "16:9",
        "prompt": (
            "Abstract workflow automation visualization: nodes representing tasks connected by "
            "glowing violet data streams on a very dark background. "
            "Some nodes show a checkmark (automated), others show gears (in progress). "
            "Cinematic depth of field, particle effects, matrix-like vertical data rain in the background. "
            "Premium, editorial, no text, high contrast."
        ),
    },
    {
        "filename": "automatiser-taches-workflow.png",
        "aspect": "1:1",
        "prompt": (
            "A circular workflow process diagram viewed from above: 6 connected steps arranged in a ring, "
            "each as a glowing hexagon node. Connected by violet arc lines with directional arrows. "
            "Dark background, isometric 3D style, chrome and violet color scheme. "
            "Like a premium infographic made by a top design studio. No text."
        ),
    },
    # Article 4 — Core Web Vitals
    {
        "filename": "core-web-vitals-hero.png",
        "aspect": "16:9",
        "prompt": (
            "A sleek dark performance dashboard filling the frame: three large circular gauge meters "
            "showing LCP, CLS, and INP scores. Green glowing needles in the 'good' zone. "
            "Dark background, violet accent lines, chrome metallic bezels on the gauges. "
            "Cinematic, slightly tilted 3D perspective. Premium tech product aesthetic."
        ),
    },
    {
        "filename": "core-web-vitals-metrics.png",
        "aspect": "4:3",
        "prompt": (
            "Three abstract geometric shapes representing Core Web Vitals metrics: "
            "a timeline bar (LCP), a grid with minimal shift (CLS), a response wave (INP). "
            "Each shape has a distinct glow: green for good, amber for average. "
            "Dark background, chrome borders, violet highlights. Minimalist, ultra-premium."
        ),
    },
    # Article 5 — Formation IA en entreprise
    {
        "filename": "formation-ia-roi-hero.png",
        "aspect": "16:9",
        "prompt": (
            "Modern open-plan corporate office at night, teams working at screens displaying AI interfaces. "
            "Violet and purple light from monitors illuminates the scene. "
            "Futuristic but grounded: real people, real desks, but with holographic AI dashboards floating. "
            "Cinematic 35mm depth of field, premium editorial photography style. Dark mood, violet ambient."
        ),
    },
    {
        "filename": "formation-ia-roi-curve.png",
        "aspect": "4:3",
        "prompt": (
            "A glowing ROI growth curve on a dark screen: an exponential upward curve in violet, "
            "with a flat line at the start (before training), then steep rise. "
            "X-axis: time (months), Y-axis: productivity. Before/after marker in chrome. "
            "Dashboard aesthetic, grid background, particle glow on the curve peak. No axis text."
        ),
    },
    # Article 6 — Pourquoi votre site ne convertit pas
    {
        "filename": "site-web-convertit-hero.png",
        "aspect": "16:9",
        "prompt": (
            "A website displayed on a dark monitor with a heatmap overlay: "
            "warm orange and red zones where users click, cool blue zones ignored. "
            "The screen is angled in 3D perspective. Dark background, violet ambient glow. "
            "Around the screen: floating UX metrics cards. Premium tech editorial style."
        ),
    },
    {
        "filename": "site-web-convertit-ux.png",
        "aspect": "4:3",
        "prompt": (
            "A user journey flow diagram for a website conversion funnel: "
            "5 steps as connected rounded rectangles (Visit, Engage, Interest, Action, Convert). "
            "Color gradient from chrome (top) to violet (bottom). "
            "Arrows show drop-off with red warning indicators at each leaky step. "
            "Very dark background, premium infographic style, subtle grid. No text."
        ),
    },
    # Article 7 — No-code / Low-code
    {
        "filename": "no-code-low-code-hero.png",
        "aspect": "16:9",
        "prompt": (
            "A visual programming interface in 3D perspective: colorful block connectors "
            "and node graph floating in dark space. Blocks in different pastel colors (violet, green, orange, chrome) "
            "connected by glowing bezier curves. Like a premium version of Zapier's workflow builder. "
            "Dark void background, depth of field, particles. No actual software UI text."
        ),
    },
    {
        "filename": "no-code-low-code-ecosystem.png",
        "aspect": "4:3",
        "prompt": (
            "A software tools ecosystem map: circular nodes of different sizes connected by lines, "
            "forming a galaxy-like network on a very dark background. "
            "Central large node (violet glow) surrounded by medium and small nodes (chrome, orange, green). "
            "Nodes have subtle icon-like symbols inside. Like a premium dependency graph visualization. "
            "No text, pure visual network."
        ),
    },
    # Article 8 — Cybersécurité PME
    {
        "filename": "cybersecurite-pme-hero.png",
        "aspect": "16:9",
        "prompt": (
            "A massive glowing digital shield in the center of a dark void, "
            "surrounded by incoming threat vectors as red angular geometric shapes being deflected. "
            "Shield core glows violet-white, outer rim chrome metallic. "
            "Binary code and matrix patterns in the dark background. "
            "Cinematic, dramatic lighting, premium cybersecurity concept art."
        ),
    },
    {
        "filename": "cybersecurite-pme-risques.png",
        "aspect": "4:3",
        "prompt": (
            "A 3D risk matrix visualization: a 5x5 grid floating in dark space, "
            "cells colored from dark green (low risk, bottom-left) through amber to deep red (critical, top-right). "
            "Threat nodes as small glowing dots positioned across the matrix. "
            "Chrome frame, violet grid lines. Isometric perspective, premium dashboard look."
        ),
    },
    # Article 9 — Audit digital 360
    {
        "filename": "audit-digital-hero.png",
        "aspect": "16:9",
        "prompt": (
            "A cinematic overhead view of a digital audit command center: "
            "multiple data visualization screens showing analytics, SEO metrics, performance scores, maps. "
            "Dark room, violet and chrome light from screens. "
            "Holographic overlays and data streams floating above the displays. "
            "Premium editorial tech photography style, no visible text."
        ),
    },
    {
        "filename": "audit-digital-radar.png",
        "aspect": "1:1",
        "prompt": (
            "A hexagonal radar chart with 6 axes representing digital audit dimensions: "
            "SEO, Performance, UX, Security, Content, Analytics. "
            "A filled violet polygon inside showing scores, with chrome axis lines. "
            "Very dark background, subtle grid, glowing polygon edges. "
            "Clean, minimal, premium infographic style. No axis labels visible."
        ),
    },
    # Article 21 — Limite de session Claude (2026-04-23)
    {
        "filename": "limite-session-claude-hero.webp",
        "aspect": "16:9",
        "prompt": (
            "A semi-flat, geometric conceptual illustration representing Claude AI session context management. "
            "Horizontal split composition on a near-black #050505 background. "
            "Left side (30 percent): a cluttered overflowing chrome-gray container filled with small disorganized "
            "geometric fragments, tiny chat bubbles, crumpled rectangles, overlapping text lines. Subtle red warning glow. "
            "Right side (60 percent): four separate clean rounded containers in a 2x2 grid, each containing one icon "
            "(lightbulb, document with checkmark, play arrow, magnifier) in minimal stroke style. Subtle chrome glow. "
            "Between the two sides, four thin flowing lines with small violet dots traveling along. "
            "One single orange accent dot on one line. Subtle violet blob upper right, brushed metal grain at 2.5 percent. "
            "No text, no letters, no logos. Dark premium tech, Swiss minimal, editorial."
        ),
    },
    {
        "filename": "limite-session-claude-courbe-qualite.webp",
        "aspect": "16:9",
        "prompt": (
            "A minimalist editorial data visualization on a deep black background, 16:9 landscape. "
            "Two smooth S-shaped curves crossing at the exact center of the chart area: "
            "one in pale cool chrome silver rising from bottom-left to top-right with a gentle S-curve, "
            "the other in soft lavender violet declining from top-left to bottom-right in a mirrored S-curve. "
            "Soft translucent fills under each line at low opacity. At the crossing point, a small silver dot "
            "with a faint radial glow. A single thin dashed vertical line in very dark grey through the crossing. "
            "Background grid almost invisible, mostly pure negative space. No axis numbers, no labels, no legend, "
            "no chart title, no text anywhere. Swiss graphic design, dark premium tech, editorial minimalism."
        ),
    },
    {
        "filename": "limite-session-claude-fractionnement.webp",
        "aspect": "16:9",
        "prompt": (
            "A clean, modern horizontal flow diagram on a near-black background, 16:9 landscape. "
            "Left side: one large rectangular card representing a monolithic session, with an overloaded visual "
            "of stacked small icons piled inside, in chrome gray with subtle red-tinted glow indicating overload. "
            "A curved splitting arrow in violet fans out into four separate clean paths. "
            "Right side: four small vertical cards in a 2x2 grid, each with a minimal stroke icon "
            "(lightbulb, document with checkmark, play arrow, magnifying glass) in chrome. "
            "Rounded corners 12px, subtle chrome glow on each card. "
            "Connecting curves in dark grey with small violet dots traveling along, one single orange accent dot. "
            "Lots of negative space, no borders around the overall chart, no text, no labels. "
            "Swiss minimal, dark premium tech, editorial."
        ),
    },
    # Article 22 — GPT-5.5 vs Claude Opus 4.7 (2026-04-25)
    {
        "filename": "gpt-vs-claude-2026-hero.webp",
        "aspect": "16:9",
        "prompt": (
            "A semi-flat geometric conceptual illustration on a near-black background, 16:9 landscape. "
            "Two abstract orb-shapes facing each other in a balanced symmetric composition. "
            "Left orb: softly glowing sphere in cool chrome silver and pale teal accents, geometric "
            "concentric data rings, subtle particle dots. Right orb: mirrored sphere in warm violet "
            "and orange accents, similar concentric rings. Both orbs glow gently against deep dark space. "
            "Between them, a thin vertical axis with a single bright dot in the center. "
            "Subtle radial blobs: cool teal upper left, warm violet lower right, both at low opacity. "
            "No text, no faces, no robots. Brushed metal grain. Swiss editorial, dark premium tech."
        ),
    },
    {
        "filename": "gpt-vs-claude-2026-tests-resultats.webp",
        "aspect": "16:9",
        "prompt": (
            "A clean modern data visualization on a deep black background, 16:9 landscape. "
            "Four horizontal grouped bar pairs stacked vertically, each pair showing two slim horizontal "
            "bars side by side with rounded ends: one in cool chrome silver, one in soft violet. "
            "Most chrome bars shorter (faster) than violet ones. "
            "Left edge of each pair: a small minimal stroke icon in chrome (globe, planet system, game controller, tree). "
            "Right edge of each bar: just a tick mark, no numbers visible. No labels, no text, no legend. "
            "Subtle radial blob in violet upper right at very low opacity. Lots of negative space."
        ),
    },
    {
        "filename": "gpt-vs-claude-2026-matrice-decision.webp",
        "aspect": "16:9",
        "prompt": (
            "A clean modern decision matrix on a deep black background, 16:9 landscape. "
            "A 2x2 grid of four equal quadrants with thin dividers in very dark grey. "
            "Each quadrant contains a single minimal stroke icon in chrome silver, with a small colored dot "
            "at the corner. Top-left: lightning bolt + soft teal-chrome dot. Top-right: paint palette + violet dot. "
            "Bottom-left: game controller + soft teal-chrome dot. Bottom-right: tree branching icon + half teal half violet dot. "
            "Subtle radial blobs at the four corners. No text, no labels, no legend, no logos. Brushed metal grain."
        ),
    },
]


def convert_jpeg_png_to_webp(path: Path) -> None:
    """Gemini returns JPEG bytes even when filename is .png. If the target is
    actually a .webp, run cwebp on the raw bytes we wrote. No-op otherwise."""
    if path.suffix != ".webp":
        return
    cwebp = Path("/opt/homebrew/bin/cwebp")
    if not cwebp.exists():
        return
    import subprocess
    tmp = path.with_suffix(".raw")
    path.rename(tmp)
    subprocess.run([str(cwebp), "-q", "82", "-quiet", str(tmp), "-o", str(path)], check=True)
    tmp.unlink()


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
                convert_jpeg_png_to_webp(output_path)
                print(f"  -> Saved: {output_path} ({output_path.stat().st_size // 1024}KB)")
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
    print(f"Generating {total} blog images with {MODEL}")
    print(f"Output: {OUT_DIR}\n")

    success = 0
    failed = []

    for i, item in enumerate(IMAGES, 1):
        ok = generate_image(item, i, total)
        if ok:
            success += 1
        else:
            failed.append(item["filename"])

        # Rate limiting: 3 seconds between requests
        if i < total:
            time.sleep(3)

    print(f"\nDone: {success}/{total} images generated")
    if failed:
        print(f"Failed: {failed}")
    else:
        print("All images generated successfully!")


if __name__ == "__main__":
    main()
