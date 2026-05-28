import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import type { Locale } from "@/lib/i18n/config";
import {
  treatments,
  minimalInvasive,
  pages,
  path,
  type TreatmentSlug,
  type MinimalInvasiveSlug,
} from "@/lib/routes";
import { getTreatmentContent } from "@/lib/treatment-content";
import { accentFirstWord } from "@/lib/headline-accent";

type HubDict = {
  eyebrow: string;
  title: string;
  intro: string;
  cardCtaLabel: string;
};

export function TreatmentsHub({
  locale,
  dict,
  category,
}: {
  locale: Locale;
  dict: HubDict;
  category: "treatment" | "minimal";
}) {
  const slugs =
    category === "treatment"
      ? (Object.keys(treatments) as TreatmentSlug[])
      : (Object.keys(minimalInvasive) as MinimalInvasiveSlug[]);

  const cards = slugs.map((slug) => {
    const c = getTreatmentContent(category, slug, locale);
    const route =
      category === "treatment"
        ? treatments[slug as TreatmentSlug]
        : minimalInvasive[slug as MinimalInvasiveSlug];
    return {
      slug,
      title: c.title,
      tagline: c.tagline,
      image: c.heroImage,
      alt: c.heroImageAlt,
      href: path(route, locale),
      blurb: c.intro,
    };
  });

  const homeLabel = locale === "de" ? "Start" : "Home";
  const hubLabel =
    locale === "de"
      ? category === "treatment"
        ? "Operative Eingriffe"
        : "Minimal-invasive Verfahren"
      : category === "treatment"
        ? "Surgical Procedures"
        : "Minimally Invasive";

  return (
    <>
      <Breadcrumbs
        items={[
          { label: homeLabel, href: path(pages.home, locale) },
          { label: hubLabel },
        ]}
      />
      <section
        lang={locale}
        aria-labelledby="hub-heading"
        className="bg-background py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {dict.eyebrow}
          </p>
          <h1
            id="hub-heading"
            className="font-sans text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem] lg:text-[4rem]"
          >
            <span className="block">{accentFirstWord(dict.title)}</span>
          </h1>
          <div aria-hidden className="my-8 h-px w-20 bg-foreground" />
          <p className="max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
            {dict.intro}
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12 lg:px-12">
          {cards.map((card) => (
            <li key={card.slug as string} className="group">
              <Link
                href={card.href}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-3">
                  <h2 className="font-sans text-[1.5rem] leading-tight tracking-[-0.01em] text-foreground md:text-[1.65rem]">
                    {card.title}
                  </h2>
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </div>
                <p className="mt-1.5 text-base leading-snug text-foreground/75">
                  {card.tagline}
                </p>
                <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">
                  {card.blurb.length > 200 ? card.blurb.slice(0, 200) + "…" : card.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 border-b border-foreground/40 pb-0.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors group-hover:border-foreground">
                  {dict.cardCtaLabel}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
