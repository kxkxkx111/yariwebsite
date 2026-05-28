"use client";

import Script from "next/script";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type Item = { q: string; a: string };

export type FaqDict = {
  eyebrow: string;
  title: string;
  intro: string;
  items: Item[];
};

export function HomeFaq({ locale, dict }: { locale: Locale; dict: FaqDict }) {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section
      lang={locale}
      aria-labelledby="faq-heading"
      className="bg-muted py-24 md:py-32"
    >
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 sm:px-8 md:grid-cols-[1fr_1.4fr] md:gap-16 lg:px-12">
        <div>
          <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {dict.eyebrow}
          </p>
          <h2
            id="faq-heading"
            className="font-sans text-[2.2rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[2.8rem]"
          >
            {accentFirstWord(dict.title)}
          </h2>
          <p className="mt-6 max-w-md text-base leading-[1.7] text-muted-foreground">
            {dict.intro}
          </p>
        </div>
        <ul className="divide-y divide-border/40 border-y border-border/40">
          {dict.items.map((it, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <li key={i}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-foreground"
                >
                  <span className="font-sans text-lg font-light leading-snug tracking-[-0.01em] text-foreground md:text-xl">
                    {it.q}
                  </span>
                  {isOpen ? (
                    <Minus className="mt-1 h-5 w-5 flex-shrink-0 text-accent" aria-hidden />
                  ) : (
                    <Plus className="mt-1 h-5 w-5 flex-shrink-0 text-accent" aria-hidden />
                  )}
                </button>
                <div
                  id={id}
                  hidden={!isOpen}
                  className="pb-6 text-base leading-[1.7] text-muted-foreground"
                >
                  {it.a}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
