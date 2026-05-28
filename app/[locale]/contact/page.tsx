import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ContactPage } from "@/components/site/contact-page";
import { alternatesFor, pages } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/contact">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  const dict = await getDictionary("en");
  const t = dict.pages.contact;
  return {
    title: t.title,
    description: t.intro,
    keywords: ["Contact", "Capital Aesthetics", "Kurfürstendamm", "Berlin", "Appointment"],
    alternates: alternatesFor(pages.contact, "en"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${siteConfig.url}${pages.contact.en}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.intro,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/contact">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  const dict = await getDictionary("en");
  return <ContactPage locale="en" dict={dict.pages.contact} mapDict={dict.map} />;
}
