import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AcademyPage } from "@/components/site/academy-page";
import { alternatesFor, pages } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/academy">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  const dict = await getDictionary("en");
  const t = dict.pages.academy;
  return {
    title: t.title,
    description: t.intro,
    keywords: ["Yary Aesthetic Academy", "DGBT trainer", "Galderma KOL", "Aesthetic medicine training", "Berlin"],
    alternates: alternatesFor(pages.academy, "en"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${siteConfig.url}${pages.academy.en}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.intro,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/academy">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  const dict = await getDictionary("en");
  return <AcademyPage locale="en" dict={dict.pages.academy} />;
}
