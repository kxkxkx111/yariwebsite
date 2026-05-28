import { Star } from "lucide-react";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type Review = {
  stars: number;
  name: string;
  body: string;
  /** Relative date string, e.g. "vor 2 Monaten" / "2 months ago" */
  date?: string;
};

export type ReviewsDict = {
  eyebrow: string;
  title: string;
  items: Review[];
  /** Aggregate label e.g. "5,0 auf Google · 47 Bewertungen" */
  aggregate: string;
  /** CTA label e.g. "Alle Bewertungen ansehen" */
  viewAllCta: string;
  /** External link to the Google reviews page */
  viewAllHref: string;
};

export function HomeReviews({
  locale,
  dict,
}: {
  locale: Locale;
  dict: ReviewsDict;
}) {
  return (
    <section
      lang={locale}
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden bg-background py-16 md:py-24"
    >
      {/* Header — single column, compact */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
          <div>
            <p className="mb-3 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {dict.eyebrow}
            </p>
            <h2
              id="reviews-heading"
              className="font-sans text-[1.9rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[2.4rem]"
            >
              {accentFirstWord(dict.title)}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-[0.85rem] tracking-[0.02em] text-muted-foreground">
            <GoogleGlyph />
            <span
              className="flex items-center gap-0.5"
              aria-label={`${locale === "de" ? "Bewertung" : "Rating"}: 5/5`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  aria-hidden
                  className="h-3.5 w-3.5 fill-[#F5B400] text-[#F5B400]"
                />
              ))}
            </span>
            <span className="font-medium text-foreground">
              {dict.aggregate}
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal scroller — full-bleed left so the last card teases off-edge. */}
      <div className="relative mt-8 md:mt-10">
        <ul
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 sm:px-8 md:gap-7 md:px-12 lg:pl-[max(3rem,calc((100vw-1280px)/2+3rem))]"
          aria-label={
            locale === "de"
              ? "Patientenbewertungen, horizontal scrollbar"
              : "Patient reviews, horizontal scroll"
          }
        >
          {dict.items.map((r, i) => (
            <li
              key={i}
              className="group relative flex w-[86vw] shrink-0 snap-start flex-col rounded-2xl border border-white/55 bg-white/55 p-7 shadow-[0_14px_44px_-18px_rgba(91,74,62,0.22)] backdrop-blur-2xl sm:w-[400px] md:w-[440px]"
            >
              {/* Star row + tiny G logo, top-right */}
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="flex items-center gap-1"
                  aria-label={`${r.stars} ${
                    locale === "de" ? "von 5 Sternen" : "of 5 stars"
                  }`}
                >
                  {Array.from({ length: r.stars }).map((_, idx) => (
                    <Star
                      key={idx}
                      aria-hidden
                      className="h-4 w-4 fill-[#F5B400] text-[#F5B400]"
                    />
                  ))}
                </div>
                <GoogleGlyph small />
              </div>

              {/* Body */}
              <p className="grow font-sans text-base leading-[1.6] text-foreground/95 md:text-[1.02rem]">
                &ldquo;{r.body}&rdquo;
              </p>

              {/* Footer: name + date */}
              <div className="mt-6 flex items-center justify-between border-t border-white/55 pt-4">
                <p className="font-display text-[0.7rem] uppercase tracking-[0.22em] text-foreground">
                  {r.name}
                </p>
                {r.date && (
                  <p className="text-[0.7rem] tracking-[0.05em] text-muted-foreground">
                    {r.date}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer: view-all CTA */}
      <div className="mx-auto mt-6 max-w-7xl px-6 sm:px-8 lg:px-12">
        <a
          href={dict.viewAllHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 border-b-[1.5px] border-foreground/40 pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground"
        >
          {dict.viewAllCta}
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}

/** Tiny 4-color Google "G" glyph for trust signal. */
function GoogleGlyph({ small = false }: { small?: boolean }) {
  const size = small ? 16 : 18;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden
      className="shrink-0"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}
