import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AboutPage } from "@/components/site/about-page";
import { alternatesFor, pages } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/ueber-mich">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "de") return {};
  const dict = await getDictionary("de");
  const t = dict.pages.about;
  return {
    title: t.title,
    description: t.lede,
    keywords: ["Dr. Pouyan Yary", "Über mich", "Plastische Chirurgie Berlin", "Facharzt", "Vita"],
    alternates: alternatesFor(pages.about, "de"),
    openGraph: {
      type: "profile",
      locale: "de_DE",
      url: `${siteConfig.url}${pages.about.de}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.lede,
      images: [{ url: siteConfig.assets.heroPortrait, alt: "Dr. Pouyan Yary", width: 1200, height: 800 }],
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/ueber-mich">,
) {
  const { locale } = await props.params;
  if (locale !== "de") notFound();
  const dict = await getDictionary("de");
  return <AboutPage locale="de" dict={dict.pages.about} />;
}
