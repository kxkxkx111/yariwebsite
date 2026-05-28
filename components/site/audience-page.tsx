import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import { pages, path } from "@/lib/routes";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type Highlight = { title: string; blurb: string; href: string };

export type AudienceDict = {
  eyebrow: string;
  title: string;
  tagline: string;
  intro: string;
  categoriesHeading: string;
  highlights: Highlight[];
  ctaHeading: string;
  ctaBody: string;
};

export function AudiencePage({
  locale,
  dict,
  heroImage,
  heroImageAlt,
}: {
  locale: Locale;
  dict: AudienceDict;
  heroImage: string;
  heroImageAlt: string;
}) {
  const homeLabel = locale === "de" ? "Start" : "Home";
  const bookingHref = path(pages.booking, locale);
  const contactHref = path(pages.contact, locale);
  const ctaPrimaryLabel = locale === "de" ? "Beratung vereinbaren" : "Book a consultation";
  const ctaSecondaryLabel = locale === "de" ? "Kontakt" : "Contact";

  return (
    <>
      <Breadcrumbs
        items={[
          { label: homeLabel, href: path(pages.home, locale) },
          { label: dict.eyebrow },
        ]}
      />

      <section lang={locale} aria-labelledby="audience-heading" className="bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-8 md:gap-16 lg:grid-cols-[1.1fr_1fr] lg:px-12">
          <div className="flex flex-col justify-center">
            <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {dict.eyebrow}
            </p>
            <h1
              id="audience-heading"
              className="font-sans text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem] lg:text-[4rem]"
            >
              <span className="block">{accentFirstWord(dict.title)}</span>
            </h1>
            <p className="mt-5 font-sans text-xl font-light leading-snug text-foreground/85 md:text-2xl">
              {dict.tagline}
            </p>
            <div aria-hidden className="my-8 h-px w-20 bg-foreground" />
            <p className="max-w-xl text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
              {dict.intro}
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm md:aspect-[3/4]">
            <Image
              src={heroImage}
              alt={heroImageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section lang={locale} aria-labelledby="categories-heading" className="bg-muted py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {dict.categoriesHeading}
          </p>
          <h2
            id="categories-heading"
            className="font-sans text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.4rem]"
          >
            {dict.title}
          </h2>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dict.highlights.map((h) => (
              <li key={h.href} className="group">
                <Link
                  href={h.href}
                  className="block rounded-sm border border-border bg-background p-7 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-[0_18px_40px_-30px_rgba(26,26,26,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
                >
                  <h3 className="flex items-start justify-between gap-3 font-sans text-[1.35rem] leading-[1.15] tracking-[-0.01em] text-foreground">
                    {h.title}
                    <ArrowUpRight
                      aria-hidden
                      className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    />
                  </h3>
                  <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">
                    {h.blurb}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section lang={locale} aria-labelledby="audience-cta-heading" className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 px-6 sm:px-8 lg:px-12">
          <h2
            id="audience-cta-heading"
            className="font-sans text-[2.2rem] leading-[1.05] tracking-[-0.02em] md:text-[3rem]"
          >
            <span className="block">{dict.ctaHeading}</span>
          </h2>
          <p className="max-w-2xl text-base leading-[1.75] text-primary-foreground/80 md:text-[1.05rem]">
            {dict.ctaBody}
          </p>
          <div className="mt-2 flex flex-wrap gap-5">
            <Link
              href={bookingHref}
              className="inline-flex items-center gap-3 rounded-[2px] bg-primary-foreground px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary transition-all hover:-translate-y-px"
            >
              {ctaPrimaryLabel}
            </Link>
            <Link
              href={contactHref}
              className="group inline-flex items-center gap-2 border-b-[1.5px] border-primary-foreground/40 pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:border-primary-foreground"
            >
              {ctaSecondaryLabel}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
