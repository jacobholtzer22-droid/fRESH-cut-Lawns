# Photos — Fresh Cut Lawns LLC

✅ **The site now uses Colin's real photos.** All earlier generic stock has been removed.
45 of his job photos are live across the hero, the four service pages, the About section,
and a full 45-tile gallery, plus his real logo in the header, footer, and favicon.

Every image is mapped to a **role** in `site.config.ts`. Non-gallery roles live under
`images`; the gallery photos live under `work.projects`; each service card has its own
`image`. To swap a photo, drop the new file in `/public/images` and point its `src` at it
— **no component edits, ever** (`ImagePlaceholder` renders the photo when `src` is set, and
a labeled placeholder box when `src` is `""`).

## Source files (git-ignored)

Colin's raw originals (30+ HEIC, a few JPG, PNG logos, and a few MOV/MP4 videos) live in
`Colin, Fresh Cut Lawn Photos/` inside this project. That folder + all `*.HEIC` / `*.MOV` /
`*.mp4` are **git-ignored** (too large for the repo); only the optimized web JPGs/PNGs in
`/public/images` are committed. The videos are not used on the static site.

## Key role photos

| Role | File (`/public/images/…`) | Shows |
|---|---|---|
| `images.hero` | `IMG_5864.jpg` | Striped lawn under a blue sky (home hero) |
| `images.crew` (About) | `IMG_6149.jpg` | Zero-turn mower cutting stripes |
| Service: Lawn Maintenance (featured) | `IMG_6132.jpg` | Mower on a striped lawn |
| Service: Landscaping | `IMG_3556.jpg` | Fresh dark mulch beds + edging |
| Service: Seasonal Cleanups | `IMG_4398.jpg` | Leaf blower + edged bed during a cleanup |
| Service: Snow Removal | `Plow2.jpg` | Plow truck clearing a residential driveway |
| Logo (header) | `logo.png` | Round "Fresh Cut" emblem (from "Fresh cut lawns Llc logo 2.PNG") |
| Logo (footer) | `logo-badge.png` | Full badge w/ "Lawn Care & Landscaping" arc (from "Fresh Cut Lawns LLC Logo.PNG") |
| Favicon | `app/icon.png` | Emblem, 512px square |

## Gallery (45 tiles, `work.projects`)

All 45 of Colin's photos are in the gallery, **interleaved by category** for visual variety
as you scroll (lawn → beds → mower → snow → before/after → …). Categories shown as badges:
**Lawn Maintenance** (striped lawns + mower shots), **Landscaping** (mulch/stone beds,
tree-ring, edging), **Snow Removal** (3 plow-truck shots), and **Before & After** (his two
before/after collage graphics). The home page shows the first 3 as a teaser.

## Before/after slider (still OFF — and why)

`components/BeforeAfterSlider.tsx` is wired into `/gallery` but `site.beforeAfter.enabled`
is `false`. Colin's two "before/after" files are **pre-composed collages** (single images
with Before/After labels baked in), not the two separate, identically-framed shots the
interactive slider needs. They're shown as gallery tiles instead. To enable the slider
later, drop a real matched pair (same angle, before + after) into `/public/images`, fill
`beforeAfter.pairs[0].before/after`, and set `enabled: true`.

## Conversion pipeline used (for next time)

HEIC originals were converted with orientation baked in (sips `-Z` alone does NOT always
apply HEIC rotation), long edge ~1600px, quality 82:

```python
from PIL import Image, ImageOps
import pillow_heif; pillow_heif.register_heif_opener()
im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
im.thumbnail((1600, 1600), Image.LANCZOS)
im.save(out, "JPEG", quality=82, optimize=True)
```
