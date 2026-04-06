#!/usr/bin/env python3
"""
publish_gmb_post.py
Generates and publishes a Google Business Profile post for a new DKDP blog article.

Usage:
    python tools/publish_gmb_post.py src/lib/blog/seo-local-geneve-2026.ts
    python tools/publish_gmb_post.py src/lib/blog/seo-local-geneve-2026.ts --dry-run

Environment variables (required except for --dry-run):
    ANTHROPIC_API_KEY          Anthropic API key
    GOOGLE_GMB_CREDENTIALS     Base64-encoded service account JSON
    GOOGLE_GMB_ACCOUNT_ID      Format: accounts/XXXXXXXXXX
    GOOGLE_GMB_LOCATION_ID     Format: locations/XXXXXXXXXX
"""

import argparse
import base64
import json
import os
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Resolve project root so we can import parse_blog_article even when run
# from a different cwd.
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))

from parse_blog_article import parse_article  # noqa: E402  (after sys.path manipulation)

SITE_URL = "https://dkdp.ch"
CLAUDE_MODEL = "claude-haiku-4-5-20251001"


# ---------------------------------------------------------------------------
# Post text generation
# ---------------------------------------------------------------------------

def build_article_url(slug: str) -> str:
    return f"{SITE_URL}/blog/{slug}"


def generate_post_text_via_claude(article: dict, api_key: str) -> str:
    """
    Call Claude Haiku to generate an engaging ~100-150 word French Google Post.
    Returns the generated text string.
    """
    import anthropic  # imported here so --dry-run doesn't require the package

    slug = article["slug"]
    title = article["title"]
    excerpt = article["excerpt"]
    category = article.get("category", "")
    article_url = build_article_url(slug)

    prompt = f"""Tu es un community manager pour DKDP, une agence digitale basee a Geneve, Suisse.
Redige un post Google Business Profile pour promouvoir l'article suivant.

Titre de l'article : {title}
Categorie : {category}
Resume : {excerpt}
URL de l'article : {article_url}

Regles strictes :
- Ton professionnel mais accessible, adapte aux PME de Suisse romande
- Entre 100 et 150 mots exactement
- Inclure un appel a l'action clair invitant a lire l'article complet (avec l'URL)
- Ne pas utiliser de tiret cadratin (—)
- Ne pas commencer par "Decouvrez" ou "Vous cherchez"
- Pas de hashtags
- Ecrire en francais, sans fautes

Reponds uniquement avec le texte du post, sans introduction ni explication."""

    client = anthropic.Anthropic(api_key=api_key)
    message = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=300,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text.strip()


def generate_post_text_fallback(article: dict) -> str:
    """
    Fallback when Claude API is unavailable: use the article excerpt + CTA.
    """
    title = article["title"]
    excerpt = article["excerpt"]
    slug = article["slug"]
    article_url = build_article_url(slug)

    text = f"{title}\n\n{excerpt}\n\nLire l'article complet : {article_url}"
    # Truncate to GMB limit (1500 chars)
    return text[:1500]


# ---------------------------------------------------------------------------
# GMB publishing
# ---------------------------------------------------------------------------

def load_gmb_credentials(b64_credentials: str):
    """
    Decode base64 service account JSON and return google.oauth2 credentials.
    """
    from google.oauth2 import service_account  # noqa: PLC0415

    credentials_json = base64.b64decode(b64_credentials).decode("utf-8")
    credentials_info = json.loads(credentials_json)

    scopes = ["https://www.googleapis.com/auth/business.manage"]
    credentials = service_account.Credentials.from_service_account_info(
        credentials_info, scopes=scopes
    )
    return credentials


def publish_to_gmb(
    post_text: str,
    article: dict,
    credentials,
    account_id: str,
    location_id: str,
) -> dict:
    """
    Publish a LOCAL_POST to Google Business Profile via REST API.
    Returns the API response as a dict.
    """
    import requests  # noqa: PLC0415
    from google.auth.transport.requests import Request  # noqa: PLC0415

    # Refresh credentials to get access token
    credentials.refresh(Request())
    access_token = credentials.token

    # Build the localPosts endpoint URL
    # Format: https://mybusiness.googleapis.com/v4/{account_id}/{location_id}/localPosts
    endpoint = (
        f"https://mybusiness.googleapis.com/v4/"
        f"{account_id}/{location_id}/localPosts"
    )

    slug = article["slug"]
    hero_image = article.get("heroImage", "")

    payload: dict = {
        "languageCode": "fr",
        "summary": post_text,
        "callToAction": {
            "actionType": "LEARN_MORE",
            "url": build_article_url(slug),
        },
        "topicType": "STANDARD",
    }

    # Add hero image if available and it's a full URL or a known public path
    if hero_image:
        # heroImage is a relative path like /images/blog/hero.png
        # Prepend the site URL to make it absolute
        image_url = (
            hero_image
            if hero_image.startswith("http")
            else f"{SITE_URL}{hero_image}"
        )
        payload["media"] = [
            {
                "mediaFormat": "PHOTO",
                "sourceUrl": image_url,
            }
        ]

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }

    response = requests.post(endpoint, headers=headers, json=payload, timeout=30)
    response.raise_for_status()
    return response.json()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate and publish a GMB post for a DKDP blog article."
    )
    parser.add_argument(
        "article_path",
        help="Path to the TypeScript article file (e.g. src/lib/blog/seo-local-geneve-2026.ts)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be published without calling any API.",
    )
    args = parser.parse_args()

    # --- Parse article ---
    print(f"[1/4] Parsing article: {args.article_path}")
    try:
        article = parse_article(args.article_path)
    except (FileNotFoundError, ValueError) as exc:
        print(f"Error parsing article: {exc}", file=sys.stderr)
        sys.exit(1)

    print(f"      slug     : {article['slug']}")
    print(f"      title    : {article['title']}")
    print(f"      category : {article['category']}")

    # --- Dry-run exit (before any API calls) ---
    if args.dry_run:
        post_text = generate_post_text_fallback(article)
        print("\n--- Post preview (fallback text, no API calls in dry-run) ---")
        print(post_text)
        print("--- End preview ---\n")
        print("[DRY-RUN] Would publish the above post to Google Business Profile.")
        print(f"          Article URL: {build_article_url(article['slug'])}")
        print(f"          Hero image:  {SITE_URL}{article['heroImage']}")
        print("Dry run complete. No API calls made.")
        sys.exit(0)

    # --- Generate post text ---
    print("[2/4] Generating post text...")
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    post_text: str

    if not api_key:
        print("      ANTHROPIC_API_KEY not set — using fallback text.")
        post_text = generate_post_text_fallback(article)
    else:
        try:
            post_text = generate_post_text_via_claude(article, api_key)
            print("      Generated via Claude Haiku.")
        except Exception as exc:  # noqa: BLE001
            print(f"      Claude API failed ({exc}) — using fallback text.")
            post_text = generate_post_text_fallback(article)

    print("\n--- Post preview ---")
    print(post_text)
    print(f"\n      Word count : ~{len(post_text.split())} words")
    print("--- End preview ---\n")

    # --- Validate environment ---
    print("[3/4] Loading GMB credentials...")
    required_env = {
        "GOOGLE_GMB_CREDENTIALS": os.environ.get("GOOGLE_GMB_CREDENTIALS", ""),
        "GOOGLE_GMB_ACCOUNT_ID": os.environ.get("GOOGLE_GMB_ACCOUNT_ID", ""),
        "GOOGLE_GMB_LOCATION_ID": os.environ.get("GOOGLE_GMB_LOCATION_ID", ""),
    }
    missing = [k for k, v in required_env.items() if not v]
    if missing:
        print(
            f"Error: Missing required environment variables: {', '.join(missing)}",
            file=sys.stderr,
        )
        sys.exit(1)

    try:
        credentials = load_gmb_credentials(required_env["GOOGLE_GMB_CREDENTIALS"])
    except Exception as exc:  # noqa: BLE001
        print(f"Error loading GMB credentials: {exc}", file=sys.stderr)
        sys.exit(1)

    # --- Publish ---
    print("[4/4] Publishing to Google Business Profile...")
    try:
        response = publish_to_gmb(
            post_text=post_text,
            article=article,
            credentials=credentials,
            account_id=required_env["GOOGLE_GMB_ACCOUNT_ID"],
            location_id=required_env["GOOGLE_GMB_LOCATION_ID"],
        )
        print("Post published successfully.")
        post_name = response.get("name", "unknown")
        print(f"GMB post name: {post_name}")
    except Exception as exc:  # noqa: BLE001
        print(f"Error publishing to GMB: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
