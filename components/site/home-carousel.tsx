"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type Item = { title: string; blurb: string; image: string; href: string };

export type CarouselDict = {
  eyebrow: string;
  title: string;
  intro: string;
  ctaCard: string;
  items: {
    breastImplant: Item;
    breastFat: Item;
    bbl: Item;
    vaser: Item;
    lips: Item;
    botox: Item;
  };
};

export function HomeCarousel({
  locale,
  dict,
}: {
  locale: Locale;
  dict: CarouselDict;
}) {
  const reduce = useReducedMotion();
  const items: Item[] = [
    dict.items.breastImplant,
    dict.items.breastFat,
    dict.items.bbl,
    dict.items.vaser,
    dict.items.lips,
    dict.items.botox,
  ];

  return (
    <section
      lang={locale}
      aria-labelledby="carousel-heading"
      className="bg-muted py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <div>
            <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {dict.eyebrow}
            </p>
            <h2
              id="carousel-heading"
              className="font-sans text-[2.2rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[2.8rem]"
            >
              {accentFirstWord(dict.title)}
            </h2>
          </div>
          <p className="max-w-2xl self-end text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
            {dict.intro}
          </p>
        </div>

        <ul className="mt-14 grid snap-x snap-mandatory grid-cols-1 gap-6 overflow-x-auto md:grid-cols-3 md:gap-7 md:overflow-visible">
          {items.map((it, i) => (
            <motion.li
              key={i}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.001 : 0.5, delay: reduce ? 0 : i * 0.06 }}
              className="snap-start group relative min-w-[260px]"
            >
              <Link
                href={it.href}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-muted"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 30vw, 80vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <h3 className="font-sans text-[1.2rem] leading-tight tracking-[-0.01em] text-foreground md:text-[1.3rem]">
                    {it.title}
                  </h3>
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </div>
                <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                  {it.blurb}
                </p>
                <span className="mt-3 inline-block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground/70">
                  {dict.ctaCard} →
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
