/* =============================================================================
 * site.config.ts, SINGLE SOURCE OF TRUTH
 * -----------------------------------------------------------------------------
 * This is the ONLY file with business-specific content. Every component/page
 * reads from here, no business detail is hardcoded anywhere else. To spin up a
 * different client site on this exact codebase:
 *   1. Replace the values in this file.
 *   2. Drop new photos in /public/images and update `images` + `work` below.
 *   3. Swap the brand colors in tailwind.config.ts + the fonts in app/layout.tsx.
 * That's it, zero component edits.
 *
 * Multi-page: real routes (/, /services, /services/<slug>, /gallery, /about,
 * /contact, /privacy-policy, /terms). Per-page SEO lives in `seo.pages`.
 *
 * --- Fresh Cut Lawns LLC (Elkhart, IN / Michiana) ---------------------------
 * Content sourced from freshcutlawnsllc.com + public listings (Google 5.0,
 * Yelp, Nextdoor). Photos are TEMPORARY free stock (Pexels) standing in until
 * Colin sends his own job photos, see PHOTOS.md. Items flagged TODO below need
 * Colin/Jacob to confirm before launch (hours, email, Google review link, the
 * real CRM businessSlug).
 * ========================================================================== */

import type { LucideIcon } from "lucide-react";
import { Sprout, Shrub, Leaf, Snowflake } from "lucide-react";

/* ---- Types ----------------------------------------------------------------- */

export type SiteImage = {
  /** Path under /public. Leave "" to render the role placeholder until the real photo lands. */
  src: string;
  /** Real, specific alt text, required for every image. */
  alt: string;
  /** Shown inside the placeholder box so it's obvious which photo goes here. */
  placeholderLabel: string;
};

export type Service = {
  title: string;
  /** URL segment for the sub-page: /services/<slug> */
  slug: string;
  /** Short card description (home + services index). */
  description: string;
  icon: LucideIcon;
  /** The lead service, rendered as the large feature block on /services. */
  featured?: boolean;
  /** Photo for the feature block + the service sub-page hero. */
  image: SiteImage;
  /** Sub-page lead paragraph. */
  intro: string;
  /** Sub-page "what's included" bullets. */
  bullets: string[];
};

export type Project = {
  image: SiteImage;
  title: string;
  category: string;
};

export type Review = {
  /** Leave quote empty ("") to render a clearly-marked placeholder slot, never invent. */
  quote: string;
  author: string;
  context?: string;
};

export type Stat = { value: string; label: string };

export type DayHours = {
  open: string | null;
  close: string | null;
  closed: boolean;
};

export type NavItem = { label: string; href: string };

export type BeforeAfterPair = {
  before: SiteImage;
  after: SiteImage;
  title: string;
};

/* ---- Config ---------------------------------------------------------------- */

export const site = {
  /* --- Identity --- */
  business: {
    name: "Fresh Cut Lawns LLC",
    shortName: "Fresh Cut",
    // Reviews + public listings name the owner/operator Colin. TODO: confirm
    // (the client folder also references "Carson", verify before printing a name).
    owner: "Colin",
    tagline: "Professional lawn care in Elkhart, Granger & South Bend",
    phoneDisplay: "(574) 214-9385",
    phoneHref: "tel:+15742149385",
    region: "Michiana",
    email: "", // TODO: add Colin's public contact email if he wants one shown
  },

  /* --- Shared CTA (one place; used in header, mobile bar, bands) --- */
  cta: {
    label: "Free estimate", // header button / sections
    short: "Free estimate", // mobile cta bar
    callShort: "Call", // mobile header button
    href: "/contact", // the quote form lives on /contact
  },

  /* --- Hero (home, split layout: copy + a tall lawn/property photo) --- */
  hero: {
    eyebrow: "Locally owned · Serving Michiana · 5.0 on Google",
    headline: "Fresh-cut lawns,\nevery single week.",
    sub: "Fresh Cut Lawns keeps Elkhart, Granger, and South Bend yards sharp with dependable weekly mowing, clean edges, and seasonal care. It's the kind of lawn service you set up once and never have to think about again.",
    primaryCta: "Get a free estimate",
    secondaryCtaLabel: "Call us",
    imageKey: "hero" as const,
    imageBadge: "Trusted across Michiana",
  },

  /* --- Trust strip (under the hero) --- */
  trust: {
    rating: 5.0 as number | null,
    ratingSource: "Google",
    points: [
      "Locally owned & operated",
      "Reliable weekly scheduling",
      "Clean, detailed results",
      "Licensed & insured",
    ],
  },

  /* --- Services intro + cards ---
   * The service with `featured: true` renders as the large feature block on /services.
   * Each service is also its own page at /services/<slug>.
   */
  servicesIntro: {
    eyebrow: "What we do",
    heading: "Everything your yard needs, all year.",
    sub: "From weekly mowing to seasonal cleanups and winter snow removal, Fresh Cut Lawns keeps your property looking sharp in every season.",
    allLabel: "All services",
  },
  services: [
    {
      title: "Lawn Maintenance",
      slug: "lawn-maintenance",
      description:
        "Weekly mowing, clean edging, and full cleanup that keeps your lawn looking cared for, sharp lines every visit.",
      icon: Sprout,
      featured: true,
      image: {
        src: "/images/IMG_6132.jpg",
        alt: "A Fresh Cut Lawns zero-turn mower cutting crisp green stripes across a residential lawn",
        placeholderLabel: "Lawn maintenance, mowing a green lawn",
      },
      intro:
        "A great-looking lawn is the easiest way to make a home stand out, and the hardest to keep up with on your own. We mow on a reliable schedule, edge every walk and bed, and clean up before we leave, so your yard looks cared for week after week without you lifting a finger.",
      bullets: [
        "Weekly & biweekly mowing",
        "Crisp edging along walks, drives & beds",
        "String-trimming around fences, trees & posts",
        "Every clipping blown off and cleaned up",
        "Same crew, same dependable schedule",
      ],
    },
    {
      title: "Landscaping Services",
      slug: "landscaping",
      description:
        "Fresh mulch, defined bed edges, and tidy shrubs that make the whole property look finished, not just mowed.",
      icon: Shrub,
      image: {
        src: "/images/IMG_3556.jpg",
        alt: "Freshly installed dark mulch beds with crisp edging along the side of a home, by Fresh Cut Lawns",
        placeholderLabel: "Landscaping, fresh beds & plantings",
      },
      intro:
        "When you want the yard to look finished, not just mowed, we handle the details. Fresh mulch, defined bed edges, trimmed shrubs, and the little touches that pull a property together and give it real curb appeal.",
      bullets: [
        "Fresh mulch & bed refreshes",
        "Crisp, defined bed edging",
        "Shrub & hedge trimming",
        "Clean lines that frame the whole yard",
      ],
    },
    {
      title: "Seasonal Cleanups",
      slug: "seasonal-cleanups",
      description:
        "Spring and fall cleanups that clear the leaves, debris, and overgrowth so your yard starts each season fresh.",
      icon: Leaf,
      image: {
        src: "/images/leaf-before-after.jpg",
        alt: "Before and after of a Fresh Cut Lawns fall cleanup: a leaf-covered lawn on the left cleared to clean grass on the right",
        placeholderLabel: "Seasonal cleanups, before and after leaf removal",
      },
      intro:
        "The change of seasons is when a yard either gets ahead or falls behind. We clear out the leaves, sticks, and debris in spring and fall so your lawn starts healthy and your property looks ready instead of buried.",
      bullets: [
        "Leaf & debris removal",
        "Spring bed & lawn prep",
        "Fall cleanup before the snow flies",
        "Hauled away and left clean",
      ],
    },
    {
      title: "Snow Removal",
      slug: "snow-removal",
      description:
        "Driveways, walks, and entries cleared and treated so your property stays safe through every Michiana winter.",
      icon: Snowflake,
      image: {
        src: "/images/Plow_3.jpg",
        alt: "A Fresh Cut Lawns truck with a red plow blade clearing snow from a tree-lined residential driveway in winter",
        placeholderLabel: "Snow removal, plowing a residential driveway",
      },
      intro:
        "When the snow comes, you shouldn't have to scramble. We keep driveways, walkways, and entries clear and treated so your family and your visitors stay safe through every Michiana winter.",
      bullets: [
        "Driveway & walkway clearing",
        "Ice control & salting",
        "Dependable service after every storm",
        "Residential properties",
      ],
    },
  ] satisfies Service[],

  /* --- The Work (finished-lawn gallery) --- */
  work: {
    eyebrow: "Our work",
    heading: "See the difference a fresh cut makes.",
    sub: "Recent lawns and properties we keep sharp across Elkhart, Granger, and South Bend. Real results, every visit.",
    teaserCta: "View the full gallery",
    footerNote:
      "Every job starts with a free, no-pressure estimate. Let's talk about your yard.",
    cta: "Get a free estimate",
    projects: [
      {
        image: {
          src: "/images/IMG_4536.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_3605.jpg",
          alt: "A clean circular mulch ring installed around a tree by Fresh Cut Lawns.",
          placeholderLabel: "Tree-Ring Mulch",
        },
        title: "Tree-Ring Mulch",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/IMG_6132.jpg",
          alt: "A Fresh Cut Lawns zero-turn mower cutting crisp green stripes across a lawn.",
          placeholderLabel: "On the Job",
        },
        title: "On the Job",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_5873.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_3556.jpg",
          alt: "Freshly mulched and sharply edged landscape beds installed by Fresh Cut Lawns.",
          placeholderLabel: "Fresh Mulch Beds",
        },
        title: "Fresh Mulch Beds",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/IMG_6149.jpg",
          alt: "A Fresh Cut Lawns zero-turn mower cutting crisp green stripes across a lawn.",
          placeholderLabel: "On the Job",
        },
        title: "On the Job",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/Plow2.jpg",
          alt: "A Fresh Cut Lawns plow truck clearing snow from a residential driveway in winter.",
          placeholderLabel: "Snow Plowing",
        },
        title: "Snow Plowing",
        category: "Snow Removal",
      },
      {
        image: {
          src: "/images/Before_and_after_1.jpg",
          alt: "Before and after of a Fresh Cut Lawns fall leaf cleanup, the lawn cleared and tidy.",
          placeholderLabel: "Before & After: Leaf Cleanup",
        },
        title: "Before & After: Leaf Cleanup",
        category: "Before & After",
      },
      {
        image: {
          src: "/images/IMG_5902.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_3599.jpg",
          alt: "Freshly mulched and sharply edged landscape beds installed by Fresh Cut Lawns.",
          placeholderLabel: "Fresh Mulch Beds",
        },
        title: "Fresh Mulch Beds",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/IMG_6185.jpg",
          alt: "A Fresh Cut Lawns zero-turn mower cutting crisp green stripes across a lawn.",
          placeholderLabel: "On the Job",
        },
        title: "On the Job",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/Plow_1.jpg",
          alt: "A Fresh Cut Lawns plow truck clearing snow from a residential driveway in winter.",
          placeholderLabel: "Snow Plowing",
        },
        title: "Snow Plowing",
        category: "Snow Removal",
      },
      {
        image: {
          src: "/images/Before_and_after.jpg",
          alt: "Before and after of a Fresh Cut Lawns yard cleanup, the area cleared and tidy.",
          placeholderLabel: "Before & After: Leaf Cleanup",
        },
        title: "Before & After: Leaf Cleanup",
        category: "Before & After",
      },
      {
        image: {
          src: "/images/IMG_5827.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_3625.jpg",
          alt: "A clean decorative-stone bed border with crisp edging along a home by Fresh Cut Lawns.",
          placeholderLabel: "Stone Bed Border",
        },
        title: "Stone Bed Border",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/Plow_3.jpg",
          alt: "A Fresh Cut Lawns plow truck clearing snow from a residential driveway in winter.",
          placeholderLabel: "Snow Plowing",
        },
        title: "Snow Plowing",
        category: "Snow Removal",
      },
      {
        image: {
          src: "/images/IMG_5920.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_3628.jpg",
          alt: "A clean decorative-stone bed border with crisp edging along a home by Fresh Cut Lawns.",
          placeholderLabel: "Stone Bed Border",
        },
        title: "Stone Bed Border",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/IMG_6126.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_3629.jpg",
          alt: "A clean decorative-stone bed border with crisp edging along a home by Fresh Cut Lawns.",
          placeholderLabel: "Stone Bed Border",
        },
        title: "Stone Bed Border",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/IMG_4131.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_3630.jpg",
          alt: "A clean decorative-stone bed border with crisp edging along a home by Fresh Cut Lawns.",
          placeholderLabel: "Stone Bed Border",
        },
        title: "Stone Bed Border",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/IMG_4732.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_4400.jpg",
          alt: "Freshly mulched and sharply edged landscape beds installed by Fresh Cut Lawns.",
          placeholderLabel: "Fresh Mulch Beds",
        },
        title: "Fresh Mulch Beds",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/IMG_5746.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_4402.jpg",
          alt: "Freshly mulched and sharply edged landscape beds installed by Fresh Cut Lawns.",
          placeholderLabel: "Fresh Mulch Beds",
        },
        title: "Fresh Mulch Beds",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/IMG_5779.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_4404.jpg",
          alt: "Freshly mulched and sharply edged landscape beds installed by Fresh Cut Lawns.",
          placeholderLabel: "Fresh Mulch Beds",
        },
        title: "Fresh Mulch Beds",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/IMG_5812.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_4544.jpg",
          alt: "Freshly mulched and sharply edged landscape beds installed by Fresh Cut Lawns.",
          placeholderLabel: "Fresh Mulch Beds",
        },
        title: "Fresh Mulch Beds",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/IMG_5883.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_5729.jpg",
          alt: "Freshly mulched and sharply edged landscape beds installed by Fresh Cut Lawns.",
          placeholderLabel: "Fresh Mulch Beds",
        },
        title: "Fresh Mulch Beds",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/IMG_5898.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_4398.jpg",
          alt: "A leaf blower and freshly edged mulch bed during a Fresh Cut Lawns property cleanup.",
          placeholderLabel: "Cleanup & Edging",
        },
        title: "Cleanup & Edging",
        category: "Landscaping",
      },
      {
        image: {
          src: "/images/IMG_5900.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_5904.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_5913.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_5916.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_6084.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_6117.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_6171.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_6179.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_6181.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_6205.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
      {
        image: {
          src: "/images/IMG_5864.jpg",
          alt: "A residential lawn freshly mowed with clean, straight mowing stripes by Fresh Cut Lawns.",
          placeholderLabel: "Freshly Striped Lawn",
        },
        title: "Freshly Striped Lawn",
        category: "Lawn Maintenance",
      },
    ] satisfies Project[],
  },

  /* --- Before/after slider --- DISABLED: we have no real before/after pair yet
   * (current photos are stock). Flip `enabled` to true and drop a real pair in
   * /public/images once Colin sends matching before + after shots. --- */
  beforeAfter: {
    enabled: false,
    eyebrow: "Before & after",
    heading: "See the transformation.",
    sub: "Drag the slider to see a property before and after Fresh Cut got to work.",
    beforeLabel: "Before",
    afterLabel: "After",
    pairs: [
      {
        before: {
          src: "",
          alt: "A yard before Fresh Cut Lawns started service",
          placeholderLabel: "Before, overgrown / untidy yard",
        },
        after: {
          src: "",
          alt: "The same yard after Fresh Cut Lawns finished",
          placeholderLabel: "After, freshly cut & cleaned yard",
        },
        title: "Lawn refresh",
      },
    ] as BeforeAfterPair[],
  },

  /* --- Why us / about --- */
  whyUs: {
    eyebrow: "Why Fresh Cut",
    heading: "Lawn care that actually shows up.",
    body: "Fresh Cut Lawns is locally owned and operated, built on a simple idea: show up when you say you will, do clean work, and keep people in the loop. No missed weeks, no chasing anyone down, just a sharp lawn and a service you can count on. Our customers stick with us because we make lawn care one less thing to think about.",
    bullets: [
      "Locally owned & operated",
      "Reliable weekly scheduling, we show up",
      "Clear communication, easy quoting & payment",
      "Respectful of your property, every visit",
    ],
    imageKey: "crew" as const,
    stats: [
      { value: "5.0", label: "Rated on Google" },
      { value: "Local", label: "Owned & operated in Elkhart" },
      { value: "Insured", label: "Licensed & fully insured" },
    ] satisfies Stat[],
  },

  /* --- Service area --- */
  serviceArea: {
    eyebrow: "Service area",
    heading: "Proudly serving\nElkhart & Michiana.",
    note: "Based in Elkhart and serving the surrounding Michiana communities across Northern Indiana and into Michigan. Don't see your town? Reach out, we likely cover you.",
    cta: "See if we cover you",
    towns: [
      "Elkhart, IN",
      "Mishawaka, IN",
      "Granger, IN",
      "South Bend, IN",
      "Edwardsburg, MI",
      "Northern Indiana",
    ],
  },

  /* --- Reviews ---
   * Real reviews from Fresh Cut's public Google profile (5.0). Google blocks
   * scraping, so these are rendered faithfully from the captured public text,
   * lightly normalized (spelling/punctuation), with NO invented claims. Tommy
   * and Lisa are named on the profile; the third is a real Google review whose
   * reviewer name wasn't captured (left blank rather than guessed).
   * TODO: paste exact verbatim text + add Brendan Rhoade's review.
   */
  reviews: {
    rating: 5.0 as number | null,
    eyebrow: "Reviews",
    heading: "Homeowners across Michiana trust Fresh Cut.",
    sub: "We let our work, and our customers, do the talking.",
    // TODO: replace with Fresh Cut's exact Google one-tap "write a review" link
    // and Maps profile URL once we have the listing's place ID / CID.
    googleReviewUrl:
      "https://www.google.com/maps/search/Fresh+Cut+Lawns+LLC+Elkhart+IN",
    googleProfileUrl:
      "https://www.google.com/maps/search/Fresh+Cut+Lawns+LLC+Elkhart+IN",
    reviewCtaLabel: "Leave us a Google review",
    readReviewsLabel: "Read our reviews",
    placeholderLabel: "Review coming soon",
    placeholderHint: "Paste a real Google review in site.config.ts",
    quotes: [
      {
        quote:
          "Colin does a great job and makes lawn care something I don't have to think about.",
        author: "Tommy Dills",
        context: "Google review",
      },
      {
        quote:
          "Colin has been great to work with. Clear and communicative the whole way through.",
        author: "Lisa Mckee",
        context: "Google review",
      },
      {
        quote:
          "Colin cleaned and raked our one-acre lawn and did a great job. Highly recommend.",
        author: "",
        context: "Google review",
      },
    ] satisfies Review[],
  },

  /* --- Hours --- TODO: confirm Colin's real hours. These are reasonable
   * placeholders (Mon to Sat 8 to 6, Sun closed) until verified. */
  hours: {
    monday: { open: "08:00", close: "18:00", closed: false },
    tuesday: { open: "08:00", close: "18:00", closed: false },
    wednesday: { open: "08:00", close: "18:00", closed: false },
    thursday: { open: "08:00", close: "18:00", closed: false },
    friday: { open: "08:00", close: "18:00", closed: false },
    saturday: { open: "08:00", close: "16:00", closed: false },
    sunday: { open: null, close: null, closed: true },
  } as Record<string, DayHours>,

  /* --- Photo manifest (non-gallery roles) --- */
  images: {
    hero: {
      src: "/images/IMG_5864.jpg",
      alt: "A residential lawn freshly mowed into clean stripes under a blue sky, maintained by Fresh Cut Lawns",
      placeholderLabel: "Hero, strongest finished lawn",
    },
    crew: {
      src: "/images/IMG_6149.jpg",
      alt: "A Fresh Cut Lawns zero-turn mower cutting stripes across a large green lawn",
      placeholderLabel: "About, mower on the job",
    },
  } satisfies Record<string, SiteImage>,

  /* --- CRM wiring (do not improvise, see ContactForm.tsx) --- */
  crm: {
    url:
      process.env.NEXT_PUBLIC_CRM_URL ||
      "https://www.alignandacquire.com/api/contact",
    // TODO: paste Fresh Cut's real Neon Business.slug before launch.
    businessSlug:
      process.env.NEXT_PUBLIC_BUSINESS_SLUG || "REPLACE_ME_BEFORE_LAUNCH",
  },

  /* --- Contact / quote copy --- */
  contact: {
    eyebrow: "Free estimate",
    heading: "Get your free estimate.",
    sub: "Tell us about your property and what you need, weekly mowing, a cleanup, landscaping, or snow removal. We'll get back to you fast with a no-pressure quote.",
    callOrTextLabel: "Call or text",
    infoLines: [
      "We'll reach out to schedule a quick look at your property and price it out.",
      "Most quotes go out the same day, the sooner you reach out, the sooner you're on the schedule.",
    ],
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      phoneLabel: "Phone",
      phonePlaceholder: "(574) 000-0000",
      emailLabel: "Email",
      emailOptionalLabel: "(optional)",
      emailPlaceholder: "you@email.com",
      addressLabel: "Property address",
      addressPlaceholder: "Street, city",
      messageLabel: "What can we help with?",
      messagePlaceholder:
        "Tell us what you need: weekly mowing, a one-time cleanup, mulch and beds, snow removal, or something else.",
      submitLabel: "Request my free estimate",
      submittingLabel: "Sending…",
    },
    consentLabel:
      "I agree to receive text messages from Fresh Cut Lawns about my request. Message and data rates may apply. Reply STOP to opt out.",
    successHeading: "Thanks, we've got it.",
    successBody:
      "We'll reach out shortly about your free estimate. Need it sooner? Call or text us directly.",
    errorLead: "Something went wrong sending that. Please call or text us at",
  },

  /* --- Closing CTA band (bottom of most pages) --- */
  ctaBand: {
    heading: "Ready for a lawn you don't have to think about?",
    sub: "Get a free, no-pressure estimate and see how easy lawn care can be.",
  },

  /* --- Top-level nav (real routes). Services renders as a dropdown built from
   * `services` in the Header. --- */
  nav: [
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  /* --- Footer --- */
  footer: {
    credit: "Site by Align and Acquire",
    exploreLabel: "Explore",
    hoursLabel: "Hours",
    rightsText: "All rights reserved.",
    blurb:
      "Locally owned lawn care and seasonal services, keeping Michiana yards sharp all year.",
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
    ] satisfies NavItem[],
  },

  /* --- SEO --- *
   * `url` is the production origin (metadataBase). Per-page metadata in `pages`. */
  seo: {
    url: "https://freshcutlawnsllc.com",
    siteName: "Fresh Cut Lawns LLC",
    pages: {
      home: {
        path: "/",
        title:
          "Fresh Cut Lawns LLC, Professional Lawn Care in Elkhart, Granger & South Bend",
        description:
          "Locally owned lawn care in Elkhart, Mishawaka, Granger, South Bend and Edwardsburg. Dependable weekly mowing, landscaping, seasonal cleanups, and snow removal. Rated 5.0 on Google. Free estimates.",
      },
      services: {
        path: "/services",
        title: "Services, Lawn Care, Landscaping & Snow Removal | Fresh Cut Lawns",
        description:
          "Weekly lawn maintenance, landscaping, spring and fall cleanups, and snow removal across Elkhart and the Michiana area. Free estimates from a locally owned crew.",
      },
      gallery: {
        path: "/gallery",
        title: "Gallery, Lawns & Properties We Maintain | Fresh Cut Lawns",
        description:
          "See recent lawns, beds, and properties kept sharp by Fresh Cut Lawns across Elkhart, Granger, and South Bend, Indiana.",
      },
      about: {
        path: "/about",
        title: "About, Locally Owned Lawn Care | Fresh Cut Lawns",
        description:
          "Fresh Cut Lawns is a locally owned, owner-run lawn care company serving Elkhart and the Michiana area. Reliable scheduling, clean work, and clear communication.",
      },
      contact: {
        path: "/contact",
        title: "Get a Free Estimate | Fresh Cut Lawns",
        description:
          "Request a free, no-pressure estimate from Fresh Cut Lawns. Lawn care, landscaping, cleanups, and snow removal in Elkhart and the Michiana area.",
      },
      privacy: {
        path: "/privacy-policy",
        title: "Privacy Policy | Fresh Cut Lawns",
        description:
          "How Fresh Cut Lawns handles the information you share through this website.",
      },
      terms: {
        path: "/terms",
        title: "Terms of Service | Fresh Cut Lawns",
        description: "The terms for using the Fresh Cut Lawns website.",
      },
    },
  },
} as const;

export type Site = typeof site;
