"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

export type CtaPortraitDict = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  portraitAlt: string;
};

/**
 * CtaPortraitBand
 * ---------------
 * Closing-CTA band, displaced from its former duty as the homepage hero.
 * Lives between the editorial sections and the map — a personal handshake
 * before the map invites the visitor to come in.
 *
 *   - Same portrait/clipPath reveal as the old hero, but with a smaller
 *     min-height and reduced headline tier so it reads as a closing
 *     gesture rather than an opening statement
 *   - Eyebrow + subtitle are CTA-flavored ("Ready for the next step?")
 *   - `motion-safe:` gates animations on `prefers-reduced-motion`
 */
export function CtaPortraitBand({
  locale,
  dict,
}: {
  locale: Locale;
  dict: CtaPortraitDict;
}) {
  return (
    <section
      lang={locale}
      aria-labelledby="cta-portrait-heading"
      className="relative flex w-full flex-col overflow-hidden bg-background text-foreground lg:flex-row"
    >
      {/* LEFT: copy column */}
      <div className="flex w-full flex-col justify-center gap-8 px-6 py-20 sm:px-10 md:px-16 md:py-24 lg:w-[58%] lg:px-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="mb-6 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground motion-safe:animate-[hero-rise_700ms_cubic-bezier(0.22,1,0.36,1)_120ms_both]">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {dict.eyebrow}
          </p>

          <h2
            id="cta-portrait-heading"
            className="font-sans text-[1.95rem] leading-[1.08] tracking-[-0.02em] text-foreground sm:text-[2.4rem] md:text-4xl lg:text-5xl motion-safe:animate-[hero-rise_750ms_cubic-bezier(0.22,1,0.36,1)_220ms_both]"
          >
            <span className="block">{accentFirstWord(dict.titleLine1)}</span>
            <span className="block">{dict.titleLine2}</span>
            <span className="block">{dict.titleLine3}</span>
          </h2>

          <div
            aria-hidden
            className="my-6 h-px w-20 bg-foreground motion-safe:animate-[hero-line_600ms_cubic-bezier(0.22,1,0.36,1)_440ms_both]"
          />

          <p className="max-w-xl text-base leading-[1.7] text-muted-foreground md:text-[1.05rem] motion-safe:animate-[hero-rise_700ms_cubic-bezier(0.22,1,0.36,1)_560ms_both]">
            {dict.subtitle}
          </p>

          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7 motion-safe:animate-[hero-rise_700ms_cubic-bezier(0.22,1,0.36,1)_700ms_both]">
            {/* Primary CTA — black bg / cream text */}
            <Link
              href={dict.ctaPrimaryHref}
              className="inline-flex items-center gap-3 rounded-[2px] bg-primary px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_8px_24px_-16px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-[1px] hover:shadow-[0_14px_36px_-16px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {dict.ctaPrimary}
            </Link>
            {/* Secondary CTA — text link with arrow */}
            <Link
              href={dict.ctaSecondaryHref}
              className="group inline-flex items-center gap-2 border-b-[1.5px] border-foreground/40 pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground"
            >
              {dict.ctaSecondary}
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT: Praxis-Innenhof with CSS clipPath reveal. */}
      <div className="relative w-full min-h-[380px] sm:min-h-[460px] lg:w-[42%] lg:min-h-[560px] motion-safe:animate-[hero-reveal_1250ms_cubic-bezier(0.16,1,0.3,1)_both]">
        <Image
          src={siteConfig.assets.praxisBuilding}
          alt={dict.portraitAlt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/15 via-transparent to-transparent"
        />
      </div>
    </section>
  );
}
