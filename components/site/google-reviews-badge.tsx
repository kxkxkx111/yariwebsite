import { Star } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

/**
 * GoogleReviewsBadge
 * ------------------
 * Calm trust signal that sits between the hero CTAs and the stats row.
 *
 * Renders:
 *   - 4-color Google "G" SVG (inline, decorative)
 *   - five gold stars (lucide `Star`, filled with #F5B400)
 *   - rating number + count, locale-aware
 *
 * TODO: replace the rating, count and href with real values pulled from
 * the Google Business Profile once Dr. Yary confirms the place ID. The
 * placeholders below are intentionally marked so we do NOT ship pretend
 * numbers without an explicit human review.
 */

// TODO: replace with real Google rating once verified
const RATING_VALUE = 5.0;
// TODO: replace with real review count once verified
const REVIEW_COUNT = 47;
// TODO: replace with real Google Maps place URL once we have it
const PLACE_URL = "https://www.google.com/maps/place/Capital+Aesthetics";

const GOLD = "#F5B400";

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      className={className}
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.45c-.28 1.45-1.11 2.68-2.36 3.51v2.93h3.81c2.23-2.05 3.59-5.08 3.59-8.68z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.18 0 5.85-1.06 7.8-2.86l-3.81-2.93c-1.05.7-2.4 1.13-3.99 1.13-3.07 0-5.67-2.07-6.6-4.86H1.46v3.04C3.4 21.55 7.4 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.38c-.24-.7-.38-1.45-.38-2.22s.14-1.52.38-2.22V6.9H1.46A11.96 11.96 0 0 0 0 12.16c0 1.93.46 3.76 1.46 5.26L5.4 14.38z"
      />
      <path
        fill="#EA4335"
        d="M12 4.78c1.73 0 3.29.6 4.51 1.77l3.38-3.38C17.85 1.19 15.18 0 12 0 7.4 0 3.4 2.45 1.46 6.9L5.4 9.94C6.33 7.15 8.93 4.78 12 4.78z"
      />
    </svg>
  );
}

export function GoogleReviewsBadge({ locale }: { locale: Locale }) {
  const ratingText =
    locale === "de"
      ? RATING_VALUE.toFixed(1).replace(".", ",")
      : RATING_VALUE.toFixed(1);

  const reviewsLabel =
    locale === "de" ? "Google-Bewertungen" : "Google reviews";

  const ariaLabel =
    locale === "de"
      ? `${RATING_VALUE} von 5 Sternen, ${REVIEW_COUNT} ${reviewsLabel}`
      : `${RATING_VALUE} out of 5 stars, ${REVIEW_COUNT} ${reviewsLabel}`;

  return (
    <a
      href={PLACE_URL}
      target="_blank"
      rel="noopener noreferrer"
      role="img"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--muted-foreground)] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all hover:-translate-y-px hover:border-[color:color-mix(in_srgb,var(--foreground)_25%,transparent)]"
    >
      <GoogleGlyph />
      <span aria-hidden="true" className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill={GOLD} color={GOLD} strokeWidth={0} />
        ))}
      </span>
      <span aria-hidden="true" className="text-[var(--foreground)]">
        <span className="font-medium">{ratingText}</span>
        <span className="mx-1.5 text-[var(--muted-foreground)]">·</span>
        <span>
          {REVIEW_COUNT} {reviewsLabel}
        </span>
      </span>
    </a>
  );
}
