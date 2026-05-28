// Locale-aware route map. The live site uses German slugs in DE and English
// slugs in EN. This single source of truth keeps every link, nav, sitemap and
// hreflang alternate in sync.
//
// `de` / `en` are the visible public paths (DE has no locale prefix per
// `proxy.ts`). `contentDe` / `contentEn` are the filenames in
// `/tmp/dryary/pages_md/` we mine for per-page copy.

import type { Locale } from "./i18n/config";

export type RouteEntry = {
  de: string;
  en: string;
  contentDe?: string;
  contentEn?: string;
};

export type TreatmentSlug =
  | "breast"
  | "face"
  | "abdomen"
  | "legs"
  | "arms"
  | "buttocks";

export type MinimalInvasiveSlug =
  | "botox"
  | "filler"
  | "biostimulation"
  | "laser"
  | "prp"
  | "microneedling";

export const treatmentsHub: RouteEntry = {
  de: "/behandlungen",
  en: "/en/treatments",
};

export const minimalInvasiveHub: RouteEntry = {
  de: "/minimalinvasive-verfahren",
  en: "/en/minimally-invasive",
};

export const treatments: Record<TreatmentSlug, RouteEntry> = {
  breast: {
    de: "/behandlungen/brust",
    en: "/en/treatments/breast",
    contentDe: "brust",
    contentEn: "breast",
  },
  face: {
    de: "/behandlungen/gesicht",
    en: "/en/treatments/face",
    contentDe: "gesicht",
    contentEn: "face",
  },
  abdomen: {
    de: "/behandlungen/bauch",
    en: "/en/treatments/abdomen",
    contentDe: "bauch",
    contentEn: "abdomen",
  },
  legs: {
    de: "/behandlungen/beine",
    en: "/en/treatments/legs",
    contentDe: "beine",
    contentEn: "legs",
  },
  arms: {
    de: "/behandlungen/arme",
    en: "/en/treatments/arms",
    contentDe: "arme",
    contentEn: "arms",
  },
  buttocks: {
    de: "/behandlungen/gesaess",
    en: "/en/treatments/buttocks",
    contentDe: "gesaess",
    contentEn: "buttocks",
  },
};

export const minimalInvasive: Record<MinimalInvasiveSlug, RouteEntry> = {
  botox: {
    de: "/minimalinvasive-verfahren/botox",
    en: "/en/minimally-invasive/botox",
    contentDe: "botox",
    contentEn: "botox",
  },
  filler: {
    de: "/minimalinvasive-verfahren/filler",
    en: "/en/minimally-invasive/filler",
    contentDe: "filler",
    contentEn: "filler",
  },
  biostimulation: {
    de: "/minimalinvasive-verfahren/biostimulation",
    en: "/en/minimally-invasive/biostimulants",
    contentDe: "biostimulation",
    contentEn: "biostimulants",
  },
  laser: {
    de: "/minimalinvasive-verfahren/laserbehandlung",
    en: "/en/minimally-invasive/laser-treatment",
    contentDe: "laserbehandlung",
    contentEn: "laser-treatment",
  },
  prp: {
    de: "/minimalinvasive-verfahren/plaettchenreiches-plasma-prp",
    en: "/en/minimally-invasive/platelet-rich-plasma-prp",
    contentDe: "plaettchenreiches-plasma-prp",
    contentEn: "platelet-rich-plasma-prp",
  },
  microneedling: {
    de: "/minimalinvasive-verfahren/radiofrequenz-microneedling",
    en: "/en/minimally-invasive/radiofrequency-microneedling",
    contentDe: "radiofrequenz-microneedling",
    contentEn: "radiofrequency-microneedling",
  },
};

export const pages = {
  home: { de: "/", en: "/en" } as RouteEntry,
  about: {
    de: "/ueber-mich",
    en: "/en/about",
    contentDe: "ueber-mich",
    contentEn: "about-me",
  } as RouteEntry,
  forWomen: {
    de: "/fuer-frauen",
    en: "/en/for-women",
    contentDe: "fuer-frauen",
    contentEn: "for-woman",
  } as RouteEntry,
  forMen: {
    de: "/fuer-maenner",
    en: "/en/for-men",
    contentDe: "fuer-maenner",
    contentEn: "for-men",
  } as RouteEntry,
  academy: {
    de: "/akademie",
    en: "/en/academy",
    contentDe: "akademie",
    contentEn: "academy",
  } as RouteEntry,
  contact: {
    de: "/kontaktieren-sie-mich",
    en: "/en/contact",
    contentDe: "kontaktieren-sie-mich",
    contentEn: "contact-us",
  } as RouteEntry,
  booking: {
    de: "/beratung-buchen",
    en: "/en/book-a-consultation",
    contentDe: "beratung-buchen",
    contentEn: "book-a-consultation",
  } as RouteEntry,
  impressum: { de: "/impressum", en: "/en/impressum" } as RouteEntry,
  datenschutz: { de: "/datenschutz", en: "/en/datenschutz" } as RouteEntry,
};

export type PageKey = keyof typeof pages;

/** Get the public path for an entry in the given locale. */
export function path(entry: RouteEntry, locale: Locale): string {
  return locale === "de" ? entry.de : entry.en;
}

/** Get the counterpart path in the other locale (for hreflang alternates). */
export function alternatePath(entry: RouteEntry, locale: Locale): string {
  return locale === "de" ? entry.en : entry.de;
}

/**
 * Build the full alternates object (hreflang) for a route.
 * Used by every page's `generateMetadata` for proper SEO.
 */
export function alternatesFor(entry: RouteEntry, locale: Locale) {
  return {
    canonical: locale === "de" ? entry.de : entry.en,
    languages: {
      "de-DE": entry.de,
      en: entry.en,
      "x-default": entry.de,
    },
  } as const;
}
