import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import { pages, path } from "@/lib/routes";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

export type AcademyDict = {
  eyebrow: string;
  title: string;
  tagline: string;
  intro: string;
  programsHeading: string;
  programsBody: string;
  curriculumHeading: string;
  curriculum: string[];
  safetyHeading: string;
  safetyBody: string;
  communityHeading: string;
  communityBody: string;
  ctaHeading: string;
  ctaBody: string;
  ctaPrimary: string;
};

export function AcademyPage({ locale, dict }: { locale: Locale; dict: AcademyDict }) {
  const homeLabel = locale === "de" ? "Start" : "Home";
  const contactHref = path(pages.contact, locale);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: homeLabel, href: path(pages.home, locale) },
          { label: dict.eyebrow },
        ]}
      />

      <section lang={locale} aria-labelledby="academy-heading" className="bg-background py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-8 md:gap-16 lg:grid-cols-[1.1fr_1fr] lg:px-12">
          <div className="flex flex-col justify-center">
            <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {dict.eyebrow}
            </p>
            <h1
              id="academy-heading"
              className="font-sans text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem] lg:text-[4rem]"
            >
              <span className="block">{accentFirstWord(dict.title)}</span>
            </h1>
            <p className="mt-6 font-sans text-xl font-light leading-snug text-foreground/85 md:text-2xl">
              {dict.tagline}
            </p>
            <div aria-hidden className="my-8 h-px w-20 bg-foreground" />
            <p className="max-w-xl text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
              {dict.intro}
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm md:aspect-[3/4]">
            <Image
              src="/portraits/morpheus.jpg"
              alt="Yary Aesthetic Academy — Training"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section lang={locale} aria-labelledby="programs-heading" className="bg-muted py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <h2
            id="programs-heading"
            className="font-sans text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.3rem]"
          >
            {dict.programsHeading}
          </h2>
          <p className="mt-6 text-base leading-[1.75] text-foreground/85 md:text-[1.05rem]">
            {dict.programsBody}
          </p>
        </div>
      </section>

      <section lang={locale} aria-labelledby="curriculum-heading" className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <h2
            id="curriculum-heading"
            className="font-sans text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.3rem]"
          >
            {dict.curriculumHeading}
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {dict.curriculum.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 rounded-sm border border-border bg-card p-5 text-base leading-snug text-foreground/90"
              >
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section lang={locale} className="bg-muted py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <div>
            <h2
              className="font-sans text-[1.6rem] leading-[1.15] tracking-[-0.02em] text-foreground md:text-[2rem]"
            >
              {dict.safetyHeading}
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-foreground/85 md:text-[1.05rem]">
              {dict.safetyBody}
            </p>
          </div>
          <div>
            <h2
              className="font-sans text-[1.6rem] leading-[1.15] tracking-[-0.02em] text-foreground md:text-[2rem]"
            >
              {dict.communityHeading}
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-foreground/85 md:text-[1.05rem]">
              {dict.communityBody}
            </p>
          </div>
        </div>
      </section>

      <section lang={locale} aria-labelledby="academy-cta-heading" className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 px-6 sm:px-8 lg:px-12">
          <h2
            id="academy-cta-heading"
            className="font-sans text-[2.2rem] leading-[1.05] tracking-[-0.02em] md:text-[3rem]"
          >
            <span className="block">{dict.ctaHeading}</span>
          </h2>
          <p className="max-w-2xl text-base leading-[1.75] text-primary-foreground/80 md:text-[1.05rem]">
            {dict.ctaBody}
          </p>
          <Link
            href={contactHref}
            className="mt-2 inline-flex items-center gap-3 rounded-[2px] bg-primary-foreground px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary transition-all hover:-translate-y-px"
          >
            {dict.ctaPrimary}
          </Link>
        </div>
      </section>
    </>
  );
}
