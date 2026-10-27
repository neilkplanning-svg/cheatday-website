"""Builds every logo/icon size the site needs from brand-source/logo-original.jpg.

Run once after replacing the logo:  python3 scripts/make-brand-assets.py
Needs Pillow (pip install pillow). Output goes to public/ and is committed.
"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "brand-source" / "logo-original.jpg"
BRAND = ROOT / "public" / "assets" / "brand"
ICONS = ROOT / "public" / "icons"
CREAM = (253, 250, 243, 255)

# Geometry of the round badge inside the original artwork (pixels in the 1264px source)
CX, CY, R = 631, 615, 541
ROLL_BOX = (300, 200, 965, 770)  # the cinnamon roll alone, without the wordmark


def circle_crop(img, cx, cy, r):
    box = (cx - r, cy - r, cx + r, cy + r)
    sq = img.crop(box).convert("RGBA")
    size = sq.size[0]
    scale = 4
    mask = Image.new("L", (size * scale, size * scale), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * scale - 1, size * scale - 1), fill=255)
    sq.putalpha(mask.resize((size, size), Image.LANCZOS))
    return sq


def save(img, path, size, fmt="PNG"):
    out = img.resize((size, size), Image.LANCZOS)
    kw = {"optimize": True} if fmt == "PNG" else {"quality": 88, "method": 6}
    out.save(path, fmt, **kw)


def on_square(img, size, fill_ratio, bg=CREAM):
    canvas = Image.new("RGBA", (size, size), bg)
    inner = int(size * fill_ratio)
    piece = img.resize((inner, inner), Image.LANCZOS)
    off = (size - inner) // 2
    canvas.alpha_composite(piece, (off, off))
    return canvas


def main():
    BRAND.mkdir(parents=True, exist_ok=True)
    ICONS.mkdir(parents=True, exist_ok=True)
    src = Image.open(SRC).convert("RGB")

    badge = circle_crop(src, CX, CY, R)
    for s in (96, 192, 512):
        save(badge, BRAND / f"logo-badge-{s}.png", s)
        save(badge, BRAND / f"logo-badge-{s}.webp", s, "WEBP")

    # The roll alone reads better than the full badge at favicon sizes
    roll = src.crop(ROLL_BOX).convert("RGBA")
    w, h = roll.size
    side = max(w, h)
    sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    sq.paste(roll, ((side - w) // 2, (side - h) // 2))
    px = sq.load()
    ox = ROLL_BOX[0] - (side - w) // 2
    oy = ROLL_BOX[1] - (side - h) // 2

    def background(x, y):
        r, g, b, a = px[x, y]
        far = ((x + ox - CX) ** 2 + (y + oy - CY) ** 2) ** 0.5 > R - 30
        return a == 0 or far or (r > 238 and g > 232 and b > 222)

    # flood-fill from the edges so only the outside is cleared (the glaze is the same cream colour)
    seen = set()
    stack = [(x, y) for x in range(side) for y in (0, side - 1)] + [(x, y) for y in range(side) for x in (0, side - 1)]
    while stack:
        x, y = stack.pop()
        if (x, y) in seen or not (0 <= x < side and 0 <= y < side) or not background(x, y):
            continue
        seen.add((x, y))
        r, g, b, _ = px[x, y]
        px[x, y] = (r, g, b, 0)
        stack += [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]
    save(sq, BRAND / "logo-mark-128.png", 128)
    save(sq, ICONS / "favicon-32.png", 32)
    save(sq, ICONS / "favicon-48.png", 48)
    sq.resize((48, 48), Image.LANCZOS).save(ICONS / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    # App icons: full badge on a cream square (maskable keeps it inside the safe zone)
    on_square(badge, 180, 0.9).convert("RGB").save(ICONS / "apple-touch-icon.png", optimize=True)
    on_square(badge, 192, 0.92).save(ICONS / "icon-192.png", optimize=True)
    on_square(badge, 512, 0.92).save(ICONS / "icon-512.png", optimize=True)
    on_square(badge, 512, 0.78).save(ICONS / "icon-maskable-512.png", optimize=True)
    print("brand assets written to", BRAND, "and", ICONS)


if __name__ == "__main__":
    main()
