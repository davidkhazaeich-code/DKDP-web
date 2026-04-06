#!/usr/bin/env python3
"""Parse a blog article and send its metadata to the n8n webhook.

Usage:
    python send_to_n8n.py <path_to_article.ts>

Required environment variable:
    N8N_WEBHOOK_URL - The n8n webhook URL for the DKDP Blog to GMB Post workflow
"""

import os
import sys

import requests

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from parse_blog_article import parse_article


def main():
    if len(sys.argv) != 2:
        print("Usage: python send_to_n8n.py <path_to_article.ts>", file=sys.stderr)
        sys.exit(1)

    webhook_url = os.environ.get("N8N_WEBHOOK_URL", "")
    if not webhook_url:
        print("ERROR: N8N_WEBHOOK_URL not set", file=sys.stderr)
        sys.exit(1)

    article_path = sys.argv[1]
    print(f"Parsing article: {article_path}")
    article = parse_article(article_path)

    if not article["slug"]:
        print(f"ERROR: Could not parse article from {article_path}", file=sys.stderr)
        sys.exit(1)

    print(f"Article: {article['title']} ({article['slug']})")
    print(f"Sending to n8n webhook...")

    response = requests.post(webhook_url, json=article, timeout=60)

    if response.status_code in (200, 201):
        print(f"Successfully sent to n8n. Response: {response.text[:200]}")
    else:
        print(f"ERROR: n8n webhook returned {response.status_code}", file=sys.stderr)
        print(f"Response: {response.text[:500]}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
