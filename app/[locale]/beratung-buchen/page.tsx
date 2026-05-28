import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { BookingPage } from "@/components/site/booking-page";
import { alternatesFor, pages } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/beratung-buchen">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "de") return {};
  const dict = await getDictionary("de");
  const t = dict.pages.booking;
  return {
    title: t.title,
    description: t.intro,
    keywords: ["Beratung buchen", "Termin", "Capital Aesthetics", "Berlin"],
    alternates: alternatesFor(pages.booking, "de"),
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: `${siteConfig.url}${pages.booking.de}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.intro,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/beratung-buchen">,
) {
  const { locale } = await props.params;
  if (locale !== "de") notFound();
  const dict = await getDictionary("de");
  return <BookingPage locale="de" dict={dict.pages.booking} />;
}
