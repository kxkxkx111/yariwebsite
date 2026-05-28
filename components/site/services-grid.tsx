"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type ServiceItem = {
  title: string;
  subtitle: string;
  imageAlt: string;
  href: string;
};

type ServicesDict = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  intro: string;
  cta: string;
  ctaHref: string;
  items: {
    breast: ServiceItem;
    face: ServiceItem;
    body: ServiceItem;
    minimal: ServiceItem;
  };
};

// Image bindings — Higgsfield Nano Banana Pro 4K renders, editorial-luxury
// brand-DNA (warm beige, anonymous compositions, Aēsop/The Row visual language).
const IMAGE_BY_KEY: Record<keyof ServicesDict["items"], string> = {
  breast: "/services/brust.jpg",
  face: "/services/gesicht.jpg",
  body: "/services/body.jpg",
  minimal: "/services/minimal.jpg",
};

const ORDER: Array<keyof ServicesDict["items"]> = [
  "breast",
  "face",
  "body",
  "minimal",
];

/**
 * Services accordion (4 treatment areas).
 *
 * Desktop (md+): horizontal image-accordion. Hover or focus expands the
 * active card to ~440px width while the others collapse to ~64px. Inactive
 * card titles render rotated 90deg along the bottom; active card title
 * sits horizontally with subtitle + arrow CTA.
 *
 * Mobile (<md): simple 2-col grid of cards (no accordion — touch devices
 * have no hover state and 60px-wide cards are unusable).
 */
export function ServicesGrid({
  locale,
  dict,
}: {
  locale: Locale;
  dict: ServicesDict;
}) {
  return (
    <section
      lang={locale}
      aria-labelledby="services-heading"
      className="bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between md:gap-10">
          {/* Left: text column */}
          <div className="max-w-xl md:w-1/2">
            <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {dict.eyebrow}
            </p>
            <h2
              id="services-heading"
              className="font-sans text-[2rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[2.6rem]"
            >
              {accentFirstWord(dict.titleLine1)}
              <br />
              {dict.titleLine2}
            </h2>
            <p className="mt-7 max-w-lg text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
              {dict.intro}
            </p>
            <div className="mt-8">
              <Link
                href={dict.ctaHref}
                className="group inline-flex items-center gap-2 border-b-[1.5px] border-foreground/40 pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground"
              >
                {dict.cta}
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Right: accordion (desktop) */}
          <div className="hidden md:block md:w-1/2">
            <ServiceAccordion dict={dict} locale={locale} />
          </div>
        </div>

        {/* Mobile fallback grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:hidden">
          {ORDER.map((key) => {
            const item = dict.items[key];
            return (
              <Link
                key={key}
                href={item.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-xl"
              >
                <Image
                  src={IMAGE_BY_KEY[key]}
                  alt={item.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 33vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 text-white">
                  <p className="font-display text-[0.62rem] uppercase tracking-[0.16em] opacity-85">
                    {item.subtitle.split("·")[0].trim()}
                  </p>
                  <p className="font-sans text-base font-medium leading-tight">
                    {item.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Desktop accordion (md+ only)
   ------------------------------------------------------------------------ */

function ServiceAccordion({
  dict,
  locale,
}: {
  dict: ServicesDict;
  locale: Locale;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="flex h-[460px] w-full gap-2 lg:h-[500px]"
      role="tablist"
      aria-label={
        locale === "de"
          ? "Behandlungsbereiche, mit Maus oder Tabulator wechselbar"
          : "Treatment areas, switch with mouse or keyboard"
      }
    >
      {ORDER.map((key, index) => {
        const item = dict.items[key];
        const isActive = index === activeIndex;
        return (
          <AccordionPanel
            key={key}
            item={item}
            image={IMAGE_BY_KEY[key]}
            isActive={isActive}
            onActivate={() => setActiveIndex(index)}
          />
        );
      })}
    </div>
  );
}

function AccordionPanel({
  item,
  image,
  isActive,
  onActivate,
}: {
  item: ServiceItem;
  image: string;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <Link
      href={item.href}
      role="tab"
      aria-selected={isActive}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={`group relative h-full overflow-hidden rounded-xl outline-none ring-foreground/30 transition-[flex-grow,flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 ${
        isActive ? "flex-[5] basis-0" : "flex-[1] basis-0"
      }`}
    >
      {/* Background image */}
      <Image
        src={image}
        alt={item.imageAlt}
        fill
        sizes="(min-width: 1024px) 50vw, 80vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      {/* Gradient overlay for legible text */}
      <div
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-500 ${
          isActive
            ? "bg-gradient-to-t from-black/65 via-black/15 to-transparent"
            : "bg-black/45"
        }`}
      />

      {/* Inactive: rotated title along bottom */}
      <span
        aria-hidden={isActive}
        className={`pointer-events-none absolute bottom-6 left-1/2 origin-bottom-left -translate-x-1/2 whitespace-nowrap font-display text-[0.7rem] uppercase tracking-[0.22em] text-white transition-all duration-500 ${
          isActive ? "opacity-0" : "rotate-90 opacity-95"
        }`}
        style={{
          // Push the rotated label up from the very bottom so it sits cleanly.
          transformOrigin: "left bottom",
          translate: isActive ? "0 0" : "-50% -1.5rem",
        }}
      >
        {item.title}
      </span>

      {/* Active: horizontal title + subtitle + arrow */}
      <div
        className={`absolute inset-x-6 bottom-6 text-white transition-opacity duration-500 ${
          isActive ? "opacity-100 delay-200" : "pointer-events-none opacity-0"
        }`}
      >
        <p className="font-display text-[0.66rem] uppercase tracking-[0.22em] opacity-85">
          {item.subtitle}
        </p>
        <div className="mt-2 flex items-baseline gap-3">
          <h3 className="font-sans text-[1.55rem] leading-tight tracking-[-0.01em]">
            {item.title}
          </h3>
          <ArrowUpRight
            aria-hidden
            className="h-5 w-5 translate-y-1 transition-transform duration-300 group-hover:-translate-y-0 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
