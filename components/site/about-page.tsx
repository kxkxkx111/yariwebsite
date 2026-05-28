import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { pages, path } from "@/lib/routes";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type Vita = { year: string; label: string };

type AboutDict = {
  eyebrow: string;
  title: string;
  tagline: string;
  lede: string;
  introHeading: string;
  introBody: string;
  introBody2: string;
  introBody3: string;
  specHeading: string;
  specBody: string;
  philoHeading: string;
  philoBody: string;
  vitaHeading: string;
  vita: Vita[];
  membershipsHeading: string;
  memberships: string[];
  quote: string;
  quoteAttribution: string;
  ctaHeading: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export function AboutPage({ locale, dict }: { locale: Locale; dict: AboutDict }) {
  const homeLabel = locale === "de" ? "Start" : "Home";
  const bookingHref = path(pages.booking, locale);
  const contactHref = path(pages.contact, locale);

  const physicianLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: siteConfig.legalName,
    medicalSpecialty: "PlasticSurgery",
    description: dict.lede,
    url: `${siteConfig.url}${path(pages.about, locale)}`,
    image: `${siteConfig.url}${siteConfig.assets.heroPortrait}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "DE",
    },
    affiliation: dict.memberships.map((m) => ({
      "@type": "Organization",
      name: m,
    })),
    alumniOf: [
      { "@type": "EducationalOrganization", name: "Universität Heidelberg" },
      { "@type": "EducationalOrganization", name: "University of California, Los Angeles (UCLA)" },
    ],
  };

  return (
    <>
      <Script
        id="ld-physician-about"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianLd) }}
      />
      <Breadcrumbs
        items={[
          { label: homeLabel, href: path(pages.home, locale) },
          { label: dict.eyebrow },
        ]}
      />

      {/* HERO */}
      <section
        lang={locale}
        aria-labelledby="about-heading"
        className="bg-background py-16 md:py-24"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-8 md:gap-16 lg:grid-cols-[1.1fr_1fr] lg:px-12">
          <div className="flex flex-col justify-center">
            <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {dict.eyebrow}
            </p>
            <h1
              id="about-heading"
              className="font-sans text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem] lg:text-[4rem]"
            >
              <span className="block">{accentFirstWord(dict.title)}</span>
            </h1>
            <p className="mt-5 font-sans text-xl font-light leading-snug text-foreground/85 md:text-2xl">
              {dict.tagline}
            </p>
            <div aria-hidden className="my-8 h-px w-20 bg-foreground" />
            <p className="max-w-xl text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
              {dict.lede}
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm md:aspect-[3/4]">
            <Image
              src={siteConfig.assets.heroPortrait}
              alt="Dr. Pouyan Yary — Portrait"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-[60%_30%]"
            />
          </div>
        </div>
      </section>

      {/* INTRO TEXT */}
      <section
        lang={locale}
        aria-labelledby="about-intro-heading"
        className="bg-muted py-20 md:py-28"
      >
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <h2
            id="about-intro-heading"
            className="font-sans text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.3rem]"
          >
            {dict.introHeading}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-[1.75] text-foreground/85 md:text-[1.05rem]">
            <p>{dict.introBody}</p>
            <p>{dict.introBody2}</p>
            <p>{dict.introBody3}</p>
          </div>
        </div>
      </section>

      {/* VITA TIMELINE */}
      <section
        lang={locale}
        aria-labelledby="vita-heading"
        className="bg-background py-20 md:py-28"
      >
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <h2
            id="vita-heading"
            className="font-sans text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.3rem]"
          >
            {dict.vitaHeading}
          </h2>
          <ol className="mt-10 space-y-6">
            {dict.vita.map((stop, i) => (
              <li
                key={i}
                className="grid grid-cols-1 gap-3 border-l-2 border-accent/50 py-2 pl-6 md:grid-cols-[180px_1fr] md:gap-6 md:pl-8"
              >
                <p className="font-display text-[0.78rem] uppercase tracking-[0.18em] text-muted-foreground md:pt-1">
                  {stop.year}
                </p>
                <p className="text-base leading-snug text-foreground/90 md:text-[1.05rem]">
                  {stop.label}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SPEC + PHILO  */}
      <section
        lang={locale}
        className="bg-muted py-20 md:py-28"
      >
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <div>
            <h2
              className="font-sans text-[1.6rem] leading-[1.15] tracking-[-0.02em] text-foreground md:text-[2rem]"
            >
              {dict.specHeading}
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-foreground/85 md:text-[1.05rem]">
              {dict.specBody}
            </p>
          </div>
          <div>
            <h2
              className="font-sans text-[1.6rem] leading-[1.15] tracking-[-0.02em] text-foreground md:text-[2rem]"
            >
              {dict.philoHeading}
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-foreground/85 md:text-[1.05rem]">
              {dict.philoBody}
            </p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <figure>
            <blockquote
              className="font-sans text-[1.6rem] font-light leading-[1.25] tracking-[-0.015em] text-foreground md:text-[2.2rem]"
            >
              &ldquo;{dict.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 font-display text-[0.78rem] uppercase tracking-[0.18em] text-muted-foreground">
              — {dict.quoteAttribution}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* MEMBERSHIPS */}
      <section
        lang={locale}
        aria-labelledby="memberships-heading"
        className="bg-muted py-20 md:py-28"
      >
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <h2
            id="memberships-heading"
            className="font-sans text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.3rem]"
          >
            {dict.membershipsHeading}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {dict.memberships.map((m, i) => (
              <li
                key={i}
                className="rounded-sm border border-border bg-background p-6 text-sm leading-relaxed text-foreground/90"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section
        lang={locale}
        aria-labelledby="about-closing-heading"
        className="bg-primary py-20 text-primary-foreground md:py-28"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 px-6 sm:px-8 lg:px-12">
          <p className="font-display text-[0.7rem] uppercase tracking-[0.24em] text-primary-foreground/70">
            {siteConfig.address.practice} · {siteConfig.address.city}
          </p>
          <h2
            id="about-closing-heading"
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
              {dict.ctaPrimary}
            </Link>
            <Link
              href={contactHref}
              className="group inline-flex items-center gap-2 border-b-[1.5px] border-primary-foreground/40 pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:border-primary-foreground"
            >
              {dict.ctaSecondary}
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
