import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { TreatmentsHub } from "@/components/site/treatments-hub";
import { alternatesFor, treatmentsHub } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/treatments">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  const dict = await getDictionary("en");
  const t = dict.pages.treatmentsHub;
  return {
    title: t.title,
    description: t.intro,
    alternates: alternatesFor(treatmentsHub, "en"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${siteConfig.url}${treatmentsHub.en}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.intro,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/treatments">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  const dict = await getDictionary("en");
  return (
    <TreatmentsHub locale="en" dict={dict.pages.treatmentsHub} category="treatment" />
  );
}
