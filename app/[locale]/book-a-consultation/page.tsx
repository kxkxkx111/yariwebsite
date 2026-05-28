import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { BookingPage } from "@/components/site/booking-page";
import { alternatesFor, pages } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/book-a-consultation">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  const dict = await getDictionary("en");
  const t = dict.pages.booking;
  return {
    title: t.title,
    description: t.intro,
    keywords: ["Book a consultation", "Appointment", "Capital Aesthetics", "Berlin"],
    alternates: alternatesFor(pages.booking, "en"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${siteConfig.url}${pages.booking.en}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.intro,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/book-a-consultation">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  const dict = await getDictionary("en");
  return <BookingPage locale="en" dict={dict.pages.booking} />;
}
