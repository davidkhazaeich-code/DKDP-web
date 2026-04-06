#!/usr/bin/env python3
"""
parse_blog_article.py
Parses a TypeScript blog article file from src/lib/blog/*.ts
and extracts key metadata as JSON.

Usage:
    python tools/parse_blog_article.py src/lib/blog/seo-local-geneve-2026.ts
    python tools/parse_blog_article.py src/lib/blog/seo-local-geneve-2026.ts | python -m json.tool
"""

from __future__ import annotations

import re
import sys
import json
from typing import Optional


def extract_single_field(source: str, field: str) -> Optional[str]:
    """
    Extract a simple single-quoted string field.
    Handles both inline and multiline (string concatenation) patterns.
    Example:
        slug: 'my-slug',
        excerpt:
          'Line one ' +
          'line two',
    """
    # Match field name followed by an optional newline then one or more quoted strings
    # joined by optional whitespace / + / \n
    pattern = rf"(?m)^\s*{re.escape(field)}\s*:\s*((?:'(?:[^'\\]|\\.)*'[\s\n]*\+?[\s\n]*)+)"
    match = re.search(pattern, source)
    if not match:
        return None

    raw = match.group(1)
    # Collect all individual quoted string fragments
    fragments = re.findall(r"'((?:[^'\\]|\\.)*)'", raw)
    joined = "".join(fragments)
    # Unescape JS escape sequences
    joined = joined.replace("\\'", "'").replace('\\"', '"').replace("\\n", "\n").replace("\\\\", "\\")
    return joined.strip()


def extract_hero_image_src(source: str) -> Optional[str]:
    """
    Extract src from the heroImage nested object:
        heroImage: {
          src: '/images/blog/hero.png',
          alt: '...',
        },
    """
    block_match = re.search(
        r"heroImage\s*:\s*\{([^}]+)\}", source, re.DOTALL
    )
    if not block_match:
        return None
    block = block_match.group(1)
    src_match = re.search(r"src\s*:\s*'([^']+)'", block)
    return src_match.group(1) if src_match else None


def extract_content_preview(source: str, max_chars: int = 500) -> Optional[str]:
    """
    Extract the first `max_chars` characters of the content backtick template literal.
    The content field uses:
        content: `...very long markdown...`,
    """
    match = re.search(r"content\s*:\s*`([\s\S]*?)`\s*(?:,|\})", source)
    if not match:
        return None
    content = match.group(1).strip()
    return content[:max_chars]


def parse_article(file_path: str) -> dict:
    """
    Parse a TypeScript article file and return a dict with extracted fields.
    Raises FileNotFoundError if the file does not exist.
    Raises ValueError if mandatory fields cannot be extracted.
    """
    with open(file_path, "r", encoding="utf-8") as fh:
        source = fh.read()

    result: dict = {}

    # --- Required fields ---
    for field in ("slug", "title", "category"):
        value = extract_single_field(source, field)
        if not value:
            raise ValueError(f"Could not extract required field '{field}' from {file_path}")
        result[field] = value

    # --- Excerpt (may span multiple lines with concatenation) ---
    excerpt = extract_single_field(source, "excerpt")
    if not excerpt:
        raise ValueError(f"Could not extract 'excerpt' from {file_path}")
    result["excerpt"] = excerpt

    # --- Hero image src ---
    hero_src = extract_hero_image_src(source)
    if not hero_src:
        raise ValueError(f"Could not extract 'heroImage.src' from {file_path}")
    result["heroImage"] = hero_src

    # --- Content preview (first 500 chars) ---
    content_preview = extract_content_preview(source)
    # Content is optional for parsing purposes; warn but don't fail
    result["contentPreview"] = content_preview or ""

    return result


def main() -> None:
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <path/to/article.ts>", file=sys.stderr)
        sys.exit(1)

    file_path = sys.argv[1]
    try:
        data = parse_article(file_path)
    except FileNotFoundError:
        print(f"Error: file not found: {file_path}", file=sys.stderr)
        sys.exit(1)
    except ValueError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)

    print(json.dumps(data, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
