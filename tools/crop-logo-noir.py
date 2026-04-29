"""
Generate dkdp_noir-croped.png by cropping dkdp_noir.png to match the bounding
box of the visible content in dkdp_blanc-croped.png.

Approach :
  1. Load the white-cropped reference for target aspect ratio
  2. Load the full noir version
  3. Find the bounding box of non-white pixels in noir (alpha or luminance threshold)
  4. Crop noir to that bounding box, then resize to match white-cropped height if needed

Run from project root :
    python3 tools/crop-logo-noir.py
"""
from pathlib import Path
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
LOGO_DIR = ROOT / "public" / "images" / "logo"
SRC      = LOGO_DIR / "dkdp_noir.png"
REF      = LOGO_DIR / "dkdp_blanc-croped.png"
OUT      = LOGO_DIR / "dkdp_noir-croped.png"

def trim_to_content(im: Image.Image) -> Image.Image:
    """Crop to bounding box of non-transparent / non-white content."""
    im = im.convert("RGBA")
    # Use alpha channel if present, else fall back to luminance
    alpha = im.getchannel("A")
    bbox = alpha.getbbox()
    if bbox is None:
        # No alpha, use difference from white background
        bg = Image.new("RGB", im.size, (255, 255, 255))
        diff = ImageChops.difference(im.convert("RGB"), bg)
        bbox = diff.getbbox()
    if bbox is None:
        return im
    return im.crop(bbox)

def main():
    if not SRC.exists():
        raise SystemExit(f"Missing source : {SRC}")
    if not REF.exists():
        raise SystemExit(f"Missing reference : {REF}")

    src = Image.open(SRC)
    ref = Image.open(REF)
    target_ratio = ref.size[0] / ref.size[1]   # width / height of the white-cropped variant

    cropped = trim_to_content(src)
    w, h = cropped.size
    actual_ratio = w / h

    # If aspect ratios diverge, pad to match (don't distort)
    if abs(actual_ratio - target_ratio) > 0.02:
        if actual_ratio < target_ratio:
            # too tall : pad left/right
            new_w = int(round(h * target_ratio))
            pad = (new_w - w) // 2
            padded = Image.new("RGBA", (new_w, h), (255, 255, 255, 0))
            padded.paste(cropped, (pad, 0))
            cropped = padded
        else:
            # too wide : pad top/bottom
            new_h = int(round(w / target_ratio))
            pad = (new_h - h) // 2
            padded = Image.new("RGBA", (w, new_h), (255, 255, 255, 0))
            padded.paste(cropped, (0, pad))
            cropped = padded

    # Resize to match reference height for consistent display in the codebase
    out_h = ref.size[1]
    out_w = int(round(out_h * target_ratio))
    cropped = cropped.resize((out_w, out_h), Image.LANCZOS)

    cropped.save(OUT, optimize=True)
    print(f"Wrote {OUT.name} : {cropped.size[0]}x{cropped.size[1]}")
    print(f"Reference dkdp_blanc-croped.png : {ref.size[0]}x{ref.size[1]}")

if __name__ == "__main__":
    main()
