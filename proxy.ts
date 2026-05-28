import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

/**
 * Locale routing strategy
 * -----------------------
 * Visible URL  →  Internal route
 *   `/`          `/de`
 *   `/about`     `/de/about`
 *   `/en`        `/en`
 *   `/en/about`  `/en/about`
 *
 * We use `rewrite` (not `redirect`) so the German URL stays prefix-less.
 * EN traffic already matches `app/[locale]/...` directly.
 *
 * Next.js 16 renames `middleware.ts` to `proxy.ts`. The named export must be
 * `proxy` (or the file can default-export it).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip framework internals, API, and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/portraits") ||
    pathname.startsWith("/brand") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Detect a locale segment
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // EN: pass through (matches `app/[locale]/...` directly)
  if (first && isLocale(first)) {
    return NextResponse.next();
  }

  // DE (no prefix): internally rewrite to `/de/...`
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Run on everything except framework internals & common static files.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|portraits/|brand/|.*\\..*).*)",
  ],
};
