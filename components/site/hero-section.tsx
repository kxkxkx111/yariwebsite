"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GoogleReviewsBadge } from "@/components/site/google-reviews-badge";
import { pages, treatmentsHub, path } from "@/lib/routes";
import type { Locale } from "@/lib/i18n/config";

export type HeroStat = {
  value: string;
  label: string;
};

export type HeroDict = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  /** Optional 2-part split: Pre renders in default foreground,
   *  Post in the caramel accent color. Used by the hero for
   *  "im Herzen von Berlin." */
  titleLine2Pre?: string;
  titleLine2Post?: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: HeroStat[];
};

/**
 * HeroSection (NEW — centered, animated)
 * --------------------------------------
 * Statement opener of the homepage. Adapted from the user-provided
 * "centered animated hero" sample. Key differences from the source:
 *
 *   - Adapted to LIGHT theme: badge is hairline border + soft surface,
 *     headline accent is solid caramel (var(--theme-accent)), NOT a
 *     dark-mode bg-clip gradient
 *   - Heading weight is governed by --theme-heading-weight (no font-bold)
 *   - `useReducedMotion()` short-circuits the framer stagger
 *   - Min-height: 500px mobile, 70vh on md+ for commanding presence
 *   - GoogleReviewsBadge sits between CTAs and the stats row
 *   - Stats are real Dr. Yary numbers (with TODOs for unverified figures)
 *
 * Localized text comes through `dict`; structural choices (icon, layout,
 * accent) are component-owned.
 */
export function HeroSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: HeroDict;
}) {
  const reduce = useReducedMotion();

  // SSR-stable: visible state is the SAME shape as the painted-first frame
  // (opacity: 1, y: 0). The animation runs a tiny y-translate-up from 12px,
  // which gracefully degrades — no opacity:0 means JS-disabled, headless, or
  // pre-hydration paints still show the hero correctly.
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: reduce
        ? { duration: 0.001 }
        : { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0.001 }
        : { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      lang={locale}
      aria-labelledby="hero-heading"
      className="border-b border-[var(--border)] bg-[var(--background)]"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        {/* Full-bleed portrait with curved bottom edge.
            `clip-path: ellipse(...)` anchored at top-center: sides straight
            (anchor wider than 100% pushes them off-screen), bottom is a
            sweeping curve that resolves into the white background. */}
        <motion.div variants={itemVariants} className="w-full" aria-hidden>
          <Image
            src="/portraits/dr-yary-hero-v2.jpg"
            alt=""
            width={2048}
            height={1365}
            sizes="100vw"
            priority
            className="aspect-[2048/1365] w-full object-cover object-center"
            style={{
              clipPath: "ellipse(140% 92% at 50% 0%)",
            }}
          />
        </motion.div>

        {/* Text block — re-enters the container for legible measure. */}
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-10 pb-20 text-center sm:px-8 md:pt-12 md:pb-28">

          {/* Google reviews badge — sits between portrait and headline */}
          <motion.div variants={itemVariants} className="mb-8">
            <GoogleReviewsBadge locale={locale} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="mb-7 max-w-3xl text-balance text-[1.9rem] leading-[1.05] tracking-[-0.02em] text-[var(--foreground)] sm:text-5xl md:text-6xl lg:text-[4.4rem]"
          >
            {dict.titleLine1}
            <br />
            {dict.titleLine2Pre && dict.titleLine2Post ? (
              <>
                <span className="text-[var(--foreground)]">
                  {dict.titleLine2Pre}
                </span>{" "}
                <span className="accent-cream">{dict.titleLine2Post}</span>
              </>
            ) : (
              <span className="accent-cream">{dict.titleLine2}</span>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mb-9 max-w-2xl text-base leading-[1.7] text-[var(--muted-foreground)] md:text-[1.075rem]"
          >
            {dict.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button
              size="lg"
              href={path(pages.booking, locale)}
              className="gap-2"
              aria-label={dict.ctaPrimary}
            >
              {dict.ctaPrimary}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              href={path(treatmentsHub, locale)}
              aria-label={dict.ctaSecondary}
            >
              {dict.ctaSecondary}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
