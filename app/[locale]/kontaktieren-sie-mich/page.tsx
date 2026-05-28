import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ContactPage } from "@/components/site/contact-page";
import { alternatesFor, pages } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/kontaktieren-sie-mich">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "de") return {};
  const dict = await getDictionary("de");
  const t = dict.pages.contact;
  return {
    title: t.title,
    description: t.intro,
    keywords: ["Kontakt", "Capital Aesthetics", "Kurfürstendamm", "Berlin", "Termin"],
    alternates: alternatesFor(pages.contact, "de"),
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: `${siteConfig.url}${pages.contact.de}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.intro,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/kontaktieren-sie-mich">,
) {
  const { locale } = await props.params;
  if (locale !== "de") notFound();
  const dict = await getDictionary("de");
  return <ContactPage locale="de" dict={dict.pages.contact} mapDict={dict.map} />;
}
