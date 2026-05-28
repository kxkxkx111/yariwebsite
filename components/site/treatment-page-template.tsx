import Image from "next/image";
import Link from "next/link";
import { Clock, Euro, Stethoscope, Sparkles, ArrowUpRight } from "lucide-react";
import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";
import {
  type TreatmentContent,
  detailLabels,
  type TreatmentCategory,
  getTreatmentCard,
} from "@/lib/treatment-content";
import { siteConfig } from "@/lib/site-config";
import {
  treatments,
  minimalInvasive,
  pages,
  path,
  type TreatmentSlug,
  type MinimalInvasiveSlug,
} from "@/lib/routes";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type TemplateDict = {
  procedureDetailsHeading: string;
  indicationHeading: string;
  procedureStepsHeading: string;
  bookingCta: string;
  bookingCtaSecondary: string;
  closingHeading: string;
  closingBody: string;
  relatedHeading: string;
  relatedKicker: string;
};

export function TreatmentPageTemplate({
  locale,
  content,
  breadcrumbs,
  dict,
}: {
  locale: Locale;
  content: TreatmentContent;
  breadcrumbs: BreadcrumbItem[];
  dict: TemplateDict;
}) {
  const labels = detailLabels[locale];
  const bookingHref = path(pages.booking, locale);
  const contactHref = path(pages.contact, locale);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      {/* HERO ---------------------------------------------------------- */}
      <section
        lang={locale}
        aria-labelledby="treatment-heading"
        className="relative bg-background py-16 md:py-24"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-8 md:gap-16 lg:grid-cols-[1.1fr_1fr] lg:px-12">
          <div className="flex flex-col justify-center">
            <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {content.eyebrow}
            </p>
            <h1
              id="treatment-heading"
              className="font-sans text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem] lg:text-[4rem]"
            >
              <span className="block">{accentFirstWord(content.title)}</span>
            </h1>
            <p className="mt-5 font-sans text-xl font-light leading-snug text-foreground/85 md:text-2xl">
              {content.tagline}
            </p>
            <div aria-hidden className="my-8 h-px w-20 bg-foreground" />
            <p className="max-w-xl text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
              {content.intro}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href={bookingHref}
                className="inline-flex items-center gap-3 rounded-[2px] bg-primary px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_8px_24px_-16px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-px hover:shadow-[0_14px_36px_-16px_rgba(0,0,0,0.5)]"
              >
                {dict.bookingCta}
              </Link>
              <Link
                href={contactHref}
                className="group inline-flex items-center gap-2 border-b-[1.5px] border-foreground/40 pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground"
              >
                {dict.bookingCtaSecondary}
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm md:aspect-[3/4]">
            <Image
              src={content.heroImage}
              alt={content.heroImageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SUB-PROCEDURES ------------------------------------------------- */}
      {content.subProcedures.map((sub, i) => (
        <section
          key={sub.id}
          lang={locale}
          aria-labelledby={`sub-${sub.id}-heading`}
          className={
            i % 2 === 0
              ? "bg-muted py-20 md:py-28"
              : "bg-background py-20 md:py-28"
          }
        >
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
            <div className="flex items-baseline gap-4">
              <span
                aria-hidden
                className="font-display text-[0.78rem] tracking-tight text-foreground/60"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className="h-px w-10 self-center bg-border" />
              <p className="font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                {content.eyebrow}
              </p>
            </div>
            <h2
              id={`sub-${sub.id}-heading`}
              className="mt-5 font-sans text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.4rem]"
            >
              {sub.title}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.75] text-muted-foreground md:text-[1.05rem]">
              {sub.description}
            </p>

            {/* Details grid */}
            <div className="mt-10 grid grid-cols-1 gap-6 rounded-sm border border-border bg-card p-6 sm:grid-cols-2 md:grid-cols-4 md:p-8">
              <DetailItem icon={<Euro className="h-4 w-4" aria-hidden />} label={labels.cost} value={sub.details.cost} />
              <DetailItem icon={<Clock className="h-4 w-4" aria-hidden />} label={labels.recovery} value={sub.details.recovery} />
              <DetailItem icon={<Sparkles className="h-4 w-4" aria-hidden />} label={labels.duration} value={sub.details.duration} />
              {sub.details.notes && (
                <DetailItem
                  icon={<Stethoscope className="h-4 w-4" aria-hidden />}
                  label={labels.notes}
                  value={sub.details.notes}
                />
              )}
            </div>

            {/* Indication list */}
            {sub.indication && sub.indication.length > 0 && (
              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr]">
                <p className="font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground md:pt-1">
                  {dict.indicationHeading}
                </p>
                <ul className="space-y-3 text-base leading-[1.6] text-foreground/90 md:text-[1.025rem]">
                  {sub.indication.map((line, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent"
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10">
              <Link
                href={bookingHref}
                className="group inline-flex items-center gap-2 border-b-[1.5px] border-foreground/40 pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground"
              >
                {dict.bookingCta}
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* RELATED -------------------------------------------------------- */}
      <RelatedSection content={content} locale={locale} dict={dict} />

      {/* CLOSING CTA BAND ---------------------------------------------- */}
      <section
        lang={locale}
        aria-labelledby="treatment-closing-heading"
        className="bg-primary py-20 text-primary-foreground md:py-28"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 px-6 sm:px-8 lg:px-12">
          <p className="font-display text-[0.7rem] uppercase tracking-[0.24em] text-primary-foreground/70">
            {siteConfig.address.practice} · {siteConfig.address.city}
          </p>
          <h2
            id="treatment-closing-heading"
            className="font-sans text-[2.2rem] leading-[1.05] tracking-[-0.02em] md:text-[3rem]"
          >
            <span className="block">{dict.closingHeading}</span>
          </h2>
          <p className="max-w-2xl text-base leading-[1.75] text-primary-foreground/80 md:text-[1.05rem]">
            {dict.closingBody}
          </p>
          <div className="mt-2 flex flex-wrap gap-5">
            <Link
              href={bookingHref}
              className="inline-flex items-center gap-3 rounded-[2px] bg-primary-foreground px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary transition-all hover:-translate-y-px"
            >
              {dict.bookingCta}
            </Link>
            <a
              href={siteConfig.contact.phoneHref}
              className="group inline-flex items-center gap-2 border-b-[1.5px] border-primary-foreground/40 pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:border-primary-foreground"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="mb-2 inline-flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="font-display text-[0.65rem] uppercase tracking-[0.22em]">
          {label}
        </span>
      </div>
      <p className="font-sans text-lg font-light leading-tight text-foreground md:text-xl">
        {value}
      </p>
    </div>
  );
}

function RelatedSection({
  content,
  locale,
  dict,
}: {
  content: TreatmentContent;
  locale: Locale;
  dict: TemplateDict;
}) {
  const cards = content.related.map((ref) => {
    const card = getTreatmentCard(ref.type, ref.key, locale);
    const route =
      ref.type === "treatment"
        ? treatments[ref.key as TreatmentSlug]
        : minimalInvasive[ref.key as MinimalInvasiveSlug];
    return { ...card, href: path(route, locale), key: `${ref.type}-${ref.key}` };
  });

  return (
    <section
      lang={locale}
      aria-labelledby="related-heading"
      className="bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 flex items-baseline justify-between gap-8">
          <div>
            <p className="mb-4 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {dict.relatedKicker}
            </p>
            <h2
              id="related-heading"
              className="font-sans text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.4rem]"
            >
              {dict.relatedHeading}
            </h2>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card) => (
            <li key={card.key} className="group">
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
                    sizes="(min-width: 1024px) 25vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <span className="font-sans text-[1.25rem] font-light leading-tight tracking-[-0.01em] text-foreground">
                    {card.title}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </div>
                <p className="mt-1.5 text-[0.82rem] leading-snug text-muted-foreground">
                  {card.tagline}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export type TreatmentTemplateDict = TemplateDict;

/** Build a MedicalProcedure JSON-LD blob for a treatment page. */
export function treatmentJsonLd({
  content,
  url,
  category,
}: {
  content: TreatmentContent;
  url: string;
  category: TreatmentCategory;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: content.title,
    description: content.intro,
    procedureType: category === "treatment" ? "SurgicalProcedure" : "TherapeuticProcedure",
    url,
    provider: {
      "@type": "Physician",
      name: siteConfig.legalName,
      url: siteConfig.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        postalCode: siteConfig.address.postalCode,
        addressCountry: "DE",
      },
    },
    howPerformed: content.subProcedures
      .map((s) => s.description)
      .join(" "),
    preparation: "Beratung mit Dr. Yary, klinische Untersuchung, Aufklärung über Risiken und Heilungsverlauf.",
    expectedPrognosis:
      "Individuelle Heilungsverläufe, Erholungszeiten und Endergebnisse — wie auf der Seite je Sub-Verfahren angegeben.",
  };
}
