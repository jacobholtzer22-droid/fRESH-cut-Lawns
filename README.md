# Fresh Cut Lawns LLC — marketing site

A modern, high-conversion **multi-page** marketing site for **Fresh Cut Lawns LLC**, a
locally owned lawn-care company serving Elkhart, Granger, South Bend, Mishawaka (IN) and
Edwardsburg (MI) — the Michiana area. Rebuilt from the old freshcutlawnsllc.com.

Built **config-driven**: every business-specific string, service, photo, and brand value
lives in one file. Swap that, swap the images, swap the brand tokens, and you get a
completely different-looking site with **zero component edits**.

Design: **"Fresh Cut"** — a bright, airy off-white base with a deep near-black forest-green
structure (footer, scrolled header, interior page headers) and a single fresh grass-green
accent + CTA. Modern and sleek, in the spirit of aestheticgardener.net / jackofallblades.
Type: **Sora** (display, geometric modern sans, set semibold + tight) × **Inter** (body).
Signature motif: a fresh-green **mow-stripe** band/divider + a faint diagonal mow-stripe
wash on light sections (`.stone-seam` / `.ashlar-wash` in `globals.css`).

## Pages

Real routes (App Router, static): `/`, `/services`, `/services/<slug>` (4 service
sub-pages), `/gallery`, `/about`, `/contact`, `/privacy-policy`, `/terms`, plus generated
`sitemap.xml` + `robots.txt`. Per-page SEO lives in `site.config.ts → seo.pages`.

## Stack

- Next.js 14 (App Router) · TypeScript · Tailwind CSS · lucide-react
- No database. Leads POST straight to the Align & Acquire CRM (see below).
- Deploy target: Vercel.

## The one file that matters

`site.config.ts` is the single source of truth: `business`, `hero`, `trust`,
`servicesIntro`, `services`, `work`, `beforeAfter`, `whyUs`, `serviceArea`, `reviews`,
`hours`, `images`, `crm`, `contact`, `ctaBand`, `nav`, `seo`, `footer`. Brand colors live
in `tailwind.config.ts` (semantic tokens — note the token names like `evergreen`/`cedar`
are inherited from the template; on this site `cedar` = the fresh-green accent). Fonts in
`app/layout.tsx`.

## CRM wiring (do not improvise)

The contact form POSTs **directly** (client-side `fetch`) to the CRM endpoint with a body
of **exactly**:

```json
{ "name": "", "phone": "", "email": "", "message": "", "smsConsent": false, "businessSlug": "" }
```

Configured via two public env vars (see `.env.local.example`):

```
NEXT_PUBLIC_CRM_URL=https://www.alignandacquire.com/api/contact
NEXT_PUBLIC_BUSINESS_SLUG=REPLACE_ME_BEFORE_LAUNCH   # ← paste the real Neon Business.slug
```

The property-address field is folded into `message` so the CRM body stays the exact
contract. `smsConsent` is a real, default-unchecked checkbox with TCPA-compliant language.

## Run it

```bash
npm install
npm run dev      # preview config "freshcut-dev" runs this on http://localhost:3010
npm run build    # production build (verified clean on Next 14.2.35)
```

## ⚠️ Open TODOs before launch

- [ ] **Photos are TEMPORARY free stock** (Pexels, free for commercial use). Swap in
      Colin's real job photos — see `PHOTOS.md` for the exact role → file mapping.
- [ ] **`NEXT_PUBLIC_BUSINESS_SLUG`** — paste the real Neon `Business.slug` for Fresh Cut.
- [ ] **Owner name** — site copy/config uses **"Colin"** (confirmed by Google reviews +
      public listings). The client folder is named "Carson" — confirm the correct
      owner/contact name before printing it anywhere.
- [ ] **Hours** — `site.config.ts → hours` are reasonable placeholders (Mon to Sat 8 to 6,
      Sun closed). Confirm Colin's real hours; they show in the footer + contact page.
- [ ] **Reviews** — 3 real Google reviews are imported (Tommy Dills, Lisa Mckee, one
      unnamed). Paste exact verbatim text + add Brendan Rhoade's review when available.
- [ ] **Google review link** — `reviews.googleReviewUrl` / `googleProfileUrl` are a Maps
      search placeholder. Replace with Fresh Cut's one-tap write-a-review deep link.
- [ ] **Email** — `business.email` is blank (the old site only exposed a form + phone).
      Add a public email if Colin wants one shown.
- [ ] (Optional) Turn on the before/after slider once Colin sends a matched pair — see
      `PHOTOS.md`. Currently `beforeAfter.enabled = false`.

## Confirmed business facts (from freshcutlawnsllc.com + public listings)

- Phone: **(574) 214-9385**
- Services: Lawn Maintenance, Landscaping, Seasonal Cleanups, Snow Removal
- Service area: Elkhart, Mishawaka, Granger, South Bend (IN), Edwardsburg (MI)
- Rating: **5.0 on Google**, Licensed & insured, locally owned (operator: Colin)
- Socials (not yet linked in footer): Facebook, Instagram @freshcutlawnselkhart

## Cloning to another business

1. Replace the values in `site.config.ts`.
2. Replace `/public/images` + update the `images` / `work` manifests.
3. Swap the palette in `tailwind.config.ts` and the fonts in `app/layout.tsx`.

No component edits. That's the whole point.

---

Site by Align and Acquire.
