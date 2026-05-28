import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AudiencePage } from "@/components/site/audience-page";
import { alternatesFor, pages } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/for-men">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  const dict = await getDictionary("en");
  const t = dict.pages.forMen;
  return {
    title: t.title,
    description: t.intro,
    keywords: ["Treatments for men", "Gynecomastia", "VASER", "Masculine contours", "Berlin"],
    alternates: alternatesFor(pages.forMen, "en"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${siteConfig.url}${pages.forMen.en}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.intro,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/for-men">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  const dict = await getDictionary("en");
  return (
    <AudiencePage
      locale="en"
      dict={dict.pages.forMen}
      heroImage="/portraits/dr-yary-hero-alt.jpg"
      heroImageAlt="Treatments for men — Dr. Yary"
    />
  );
}
