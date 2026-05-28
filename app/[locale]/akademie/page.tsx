import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AcademyPage } from "@/components/site/academy-page";
import { alternatesFor, pages } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/akademie">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "de") return {};
  const dict = await getDictionary("de");
  const t = dict.pages.academy;
  return {
    title: t.title,
    description: t.intro,
    keywords: ["Yary Aesthetic Academy", "DGBT-Trainer", "Galderma KOL", "Ärztefortbildung", "Berlin"],
    alternates: alternatesFor(pages.academy, "de"),
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: `${siteConfig.url}${pages.academy.de}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.intro,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/akademie">,
) {
  const { locale } = await props.params;
  if (locale !== "de") notFound();
  const dict = await getDictionary("de");
  return <AcademyPage locale="de" dict={dict.pages.academy} />;
}
