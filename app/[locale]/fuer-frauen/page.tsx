import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AudiencePage } from "@/components/site/audience-page";
import { alternatesFor, pages } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/fuer-frauen">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "de") return {};
  const dict = await getDictionary("de");
  const t = dict.pages.forWomen;
  return {
    title: t.title,
    description: t.intro,
    keywords: ["Behandlungen für Frauen", "Brust", "Mommy-Makeover", "Lipödem", "Berlin"],
    alternates: alternatesFor(pages.forWomen, "de"),
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: `${siteConfig.url}${pages.forWomen.de}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.intro,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/fuer-frauen">,
) {
  const { locale } = await props.params;
  if (locale !== "de") notFound();
  const dict = await getDictionary("de");
  return (
    <AudiencePage
      locale="de"
      dict={dict.pages.forWomen}
      heroImage="/portraits/beratung.jpg"
      heroImageAlt="Behandlungen für Frauen — Dr. Yary"
    />
  );
}
