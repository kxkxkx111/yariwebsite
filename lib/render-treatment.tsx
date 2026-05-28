import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  TreatmentPageTemplate,
  treatmentJsonLd,
} from "@/components/site/treatment-page-template";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site-config";
import {
  alternatesFor,
  path,
  pages,
  treatments,
  minimalInvasive,
  treatmentsHub,
  minimalInvasiveHub,
  type TreatmentSlug,
  type MinimalInvasiveSlug,
} from "@/lib/routes";
import {
  getTreatmentContent,
  type TreatmentCategory,
} from "@/lib/treatment-content";

type Args =
  | { category: "treatment"; slug: TreatmentSlug }
  | { category: "minimal"; slug: MinimalInvasiveSlug };

/** Build metadata for a treatment route, locale-aware. */
export async function treatmentMetadata(
  locale: string,
  args: Args,
): Promise<Metadata> {
  if (!isLocale(locale)) return {};
  const content = getTreatmentContent(args.category, args.slug, locale);
  const route =
    args.category === "treatment"
      ? treatments[args.slug]
      : minimalInvasive[args.slug];
  const meta = await getDictionary(locale);

  const titleSuffix =
    locale === "de"
      ? "Dr. Yary — Plastische Chirurgie Berlin"
      : "Dr. Yary — Plastic Surgery Berlin";

  const keywords =
    args.category === "treatment"
      ? [
          content.title,
          locale === "de" ? "Plastische Chirurgie Berlin" : "Plastic Surgery Berlin",
          locale === "de" ? "Ästhetische Chirurgie" : "Aesthetic Surgery",
          "Dr. Yary",
          "Capital Aesthetics",
          ...content.subProcedures.map((s) => s.title),
        ]
      : [
          content.title,
          locale === "de" ? "Minimal-invasive Behandlung" : "Minimally invasive treatment",
          "Dr. Yary",
          "Capital Aesthetics",
          ...content.subProcedures.map((s) => s.title),
        ];

  // Avoid `messages.site` namespace unused warning by reading title fallback
  void meta;

  return {
    title: `${content.title} — ${content.tagline}`,
    description: content.intro,
    keywords,
    alternates: alternatesFor(route, locale),
    openGraph: {
      type: "article",
      locale: locale === "de" ? "de_DE" : "en_US",
      url: `${siteConfig.url}${path(route, locale)}`,
      title: `${content.title} | ${titleSuffix}`,
      description: content.intro,
      images: [
        {
          url: content.heroImage,
          alt: content.heroImageAlt,
          width: 1200,
          height: 800,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.title} | ${titleSuffix}`,
      description: content.intro,
      images: [content.heroImage],
    },
  };
}

/** Render a treatment page (DE or EN). */
export async function renderTreatmentPage(
  locale: string,
  args: Args,
) {
  if (!isLocale(locale)) notFound();
  const content = getTreatmentContent(args.category, args.slug, locale);
  const route =
    args.category === "treatment"
      ? treatments[args.slug]
      : minimalInvasive[args.slug];
  const dict = await getDictionary(locale);
  const tpl = dict.treatmentTemplate;

  const hubLabel =
    locale === "de"
      ? args.category === "treatment"
        ? "Behandlungen"
        : "Minimal-invasiv"
      : args.category === "treatment"
        ? "Treatments"
        : "Minimally Invasive";

  const hubRoute =
    args.category === "treatment" ? treatmentsHub : minimalInvasiveHub;

  const breadcrumbs = [
    { label: locale === "de" ? "Start" : "Home", href: path(pages.home, locale) },
    { label: hubLabel, href: path(hubRoute, locale) },
    { label: content.title },
  ];

  const ld = treatmentJsonLd({
    content,
    url: `${siteConfig.url}${path(route, locale)}`,
    category: args.category as TreatmentCategory,
  });

  return (
    <>
      <Script
        id="ld-treatment"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <TreatmentPageTemplate
        locale={locale as Locale}
        content={content}
        breadcrumbs={breadcrumbs}
        dict={tpl}
      />
    </>
  );
}
