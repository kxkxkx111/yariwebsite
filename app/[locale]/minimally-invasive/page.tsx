import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { TreatmentsHub } from "@/components/site/treatments-hub";
import { alternatesFor, minimalInvasiveHub } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/minimally-invasive">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  const dict = await getDictionary("en");
  const t = dict.pages.minimalHub;
  return {
    title: t.title,
    description: t.intro,
    alternates: alternatesFor(minimalInvasiveHub, "en"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${siteConfig.url}${minimalInvasiveHub.en}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.intro,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/minimally-invasive">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  const dict = await getDictionary("en");
  return (
    <TreatmentsHub locale="en" dict={dict.pages.minimalHub} category="minimal" />
  );
}
