"""
Classify SVG logos in public/images/logos/ as monochrome vs colored.

Heuristic :
  - "Monochrome" if all <path>, <rect>, <circle>, etc. elements either :
    a) have no fill attribute (browser default = currentColor or black), OR
    b) have fill="black" / fill="#000" / fill="currentColor"
  - "Colored" if any element has a fill that's not black/none/currentColor

Output : tools/output/monochrome-logos.json with two arrays :
  { "monochrome": ["logo-foo.svg", ...], "colored": ["logo-bar.svg", ...] }

Run :
    python3 tools/audit-svg-logos.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOGOS = ROOT / "public" / "images" / "logos"
OUT_DIR = ROOT / "tools" / "output"
OUT_DIR.mkdir(parents=True, exist_ok=True)
OUT = OUT_DIR / "monochrome-logos.json"

FILL_RE = re.compile(r'fill="([^"]+)"', re.IGNORECASE)
STYLE_FILL_RE = re.compile(r'fill\s*:\s*([^;"\s]+)', re.IGNORECASE)

MONOCHROME_FILLS = {"", "none", "currentcolor", "black", "#000", "#000000"}

def classify(svg_text: str) -> str:
    """Return 'monochrome' or 'colored'."""
    fills = set()
    fills.update(m.group(1).lower() for m in FILL_RE.finditer(svg_text))
    fills.update(m.group(1).lower() for m in STYLE_FILL_RE.finditer(svg_text))

    # Empty fills set = no explicit fill anywhere = monochrome (defaults to black)
    if not fills:
        return "monochrome"

    # All fills are in the monochrome set ?
    if fills.issubset(MONOCHROME_FILLS):
        return "monochrome"

    return "colored"

def main():
    monochrome = []
    colored = []
    for path in sorted(LOGOS.rglob("*.svg")):
        rel = path.relative_to(LOGOS).as_posix()
        text = path.read_text(encoding="utf-8")
        cat = classify(text)
        (monochrome if cat == "monochrome" else colored).append(rel)

    out = {"monochrome": monochrome, "colored": colored}
    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"Wrote {OUT}")
    print(f"  Monochrome : {len(monochrome)} files")
    print(f"  Colored    : {len(colored)} files")

if __name__ == "__main__":
    main()
