import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AudiencePage } from "@/components/site/audience-page";
import { alternatesFor, pages } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/for-women">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  const dict = await getDictionary("en");
  const t = dict.pages.forWomen;
  return {
    title: t.title,
    description: t.intro,
    keywords: ["Treatments for women", "Breast", "Mommy makeover", "Lipedema", "Berlin"],
    alternates: alternatesFor(pages.forWomen, "en"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${siteConfig.url}${pages.forWomen.en}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.intro,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/for-women">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  const dict = await getDictionary("en");
  return (
    <AudiencePage
      locale="en"
      dict={dict.pages.forWomen}
      heroImage="/portraits/beratung.jpg"
      heroImageAlt="Treatments for women — Dr. Yary"
    />
  );
}
