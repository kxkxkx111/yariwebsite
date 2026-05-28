import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AboutPage } from "@/components/site/about-page";
import { alternatesFor, pages } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/about">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  const dict = await getDictionary("en");
  const t = dict.pages.about;
  return {
    title: t.title,
    description: t.lede,
    keywords: ["Dr. Pouyan Yary", "About", "Plastic Surgery Berlin", "Specialist", "Vita"],
    alternates: alternatesFor(pages.about, "en"),
    openGraph: {
      type: "profile",
      locale: "en_US",
      url: `${siteConfig.url}${pages.about.en}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.lede,
      images: [{ url: siteConfig.assets.heroPortrait, alt: "Dr. Pouyan Yary", width: 1200, height: 800 }],
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/about">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  const dict = await getDictionary("en");
  return <AboutPage locale="en" dict={dict.pages.about} />;
}
