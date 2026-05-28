// i18n configuration — DE is the default locale and is served at the root
// (`/`) with no URL prefix. EN is served under `/en/...`.
// Internally both render through `app/[locale]/...` thanks to a rewrite in
// `proxy.ts` that maps `/` → `/de` without changing the visible URL.

export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export const localeMeta: Record<
  Locale,
  { label: string; htmlLang: string; ogLocale: string }
> = {
  de: { label: "DE", htmlLang: "de-DE", ogLocale: "de_DE" },
  en: { label: "EN", htmlLang: "en", ogLocale: "en_US" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Public URL path for a given locale.
 * DE has no prefix, EN is prefixed with `/en`.
 */
export function localePath(locale: Locale, pathname: string = "/"): string {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === defaultLocale) {
    return clean === "/" ? "/" : clean;
  }
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * Given a current public path, produce its counterpart in the target locale.
 * Examples:
 *   ("en", "/")          → "/en"
 *   ("de", "/en/about")  → "/about"
 *   ("en", "/about")     → "/en/about"
 *   ("de", "/")          → "/"
 */
export function switchLocalePath(target: Locale, currentPath: string): string {
  // Strip any leading locale segment from currentPath
  const segments = currentPath.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments.shift();
  }
  const rest = "/" + segments.join("/");
  return localePath(target, rest === "/" ? "/" : rest);
}
