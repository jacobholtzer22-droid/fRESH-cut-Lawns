# Photos — Fresh Cut Lawns LLC

> ⚠️ **Every photo on the site right now is TEMPORARY free stock** from
> [Pexels](https://www.pexels.com) (Pexels License = free for commercial use, no
> attribution required). They are generic lawn/landscaping images standing in until
> Colin sends his own job photos. **Swap them before treating the site as final.**

Every image is mapped to a **role** in `site.config.ts`. Non-gallery roles live under
`images`; the gallery photos live under `work.projects`; each service card has its own
`image`. Each has real, specific `alt` text. To swap a photo, drop the new file in
`/public/images` and point its `src` at it — **no component edits, ever** (the
`ImagePlaceholder` component renders the photo when `src` is set, and a labeled
placeholder box when `src` is `""`).

## Roles currently filled (with temporary stock)

| Role | File | Pexels ID | What it shows |
|---|---|---|---|
| `images.hero` | `hero.jpg` | 5178034 | Home with a healthy green lawn (hero) |
| `images.crew` | `mowing-action.jpg` | 11400230 | Person mowing a green lawn (About) |
| Service: Lawn Maintenance (featured) | `lawn-mower.jpg` | 11364122 | Mower cutting a green lawn |
| Service: Landscaping | `landscaping-beds.jpg` | 5208120 | Fresh planted beds / color |
| Service: Seasonal Cleanups | `fall-leaves.jpg` | 9779101 | Fallen autumn leaves on a lawn |
| Service: Snow Removal | `snow-driveway.jpg` | 6944210 | Snowy residential driveway |
| `work.projects[0]` | `backyard-lawn.jpg` | 7546775 | Backyard lawn |
| `work.projects[1]` | `front-lawn-sky.jpg` | 226407 | Front lawn under blue sky |
| `work.projects[2]` | `lawn-mower.jpg` | 11364122 | Clean mow lines (reused) |
| `work.projects[3]` | `landscaping-beds.jpg` | 5208120 | Beds & color (reused) |
| `work.projects[4]` | `mowing-action.jpg` | 11400230 | On the job (reused) |
| `work.projects[5]` | `leaf-pile.jpg` | 19042995 | Raked leaf pile (fall cleanup) |
| `work.projects[6]` | `modern-home-lawn.jpg` | 8134816 | Modern home + manicured lawn |
| `work.projects[7]` | `snow-driveway.jpg` | 6944210 | Winter snow removal (reused) |

(`home-exterior.jpg`, Pexels 5008394, is downloaded and available as a spare if you want
another gallery tile.)

## How to swap a photo in

1. Save Colin's photo into `/public/images/` (keep the same filename to swap in place, or
   use a new name).
2. If you used a new name, open `site.config.ts`, find the role, set
   `src: "/images/<newname>.jpg"`.
3. Update the `alt` text so it describes the **actual** photo (real alt text matters for
   SEO + accessibility — don't leave the stock description).
4. Recommended: long edge ~1600px, JPG. `next/image` handles responsive sizing.

Prefer **portrait/4:5** crops for the hero and gallery tiles; the layout is built for
them. The home hero frame is `aspect-[4/5]`.

## The before/after slider (signature, currently OFF)

`components/BeforeAfterSlider.tsx` is built and wired into `/gallery`, but
`site.beforeAfter.enabled` is `false` — we have no real matched before/after pair yet, and
we never fake a transformation with stock.

**To turn it on** when Colin sends a real pair (same angle, before + after):
1. Drop both files in `/public/images` (e.g. `ba-before.jpg`, `ba-after.jpg`).
2. In `site.config.ts → beforeAfter`, fill the pair's `before`/`after` `src` + `alt`, and
   set `enabled: true`.

## Converting Colin's photos (when they arrive)

If they come as HEIC (iPhone), browsers can't render HEIC and EXIF rotation can bite.
Convert with orientation baked in, long edge ~1600px:

```bash
sips -s format jpeg -Z 1600 "IMG_XXXX.HEIC" --out /tmp/x.jpg
# then bake EXIF rotation + compress (Pillow): ImageOps.exif_transpose(im), quality 82
```
