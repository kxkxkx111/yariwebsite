import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { TreatmentsHub } from "@/components/site/treatments-hub";
import { alternatesFor, treatmentsHub } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/behandlungen">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "de") return {};
  const dict = await getDictionary("de");
  const t = dict.pages.treatmentsHub;
  return {
    title: t.title,
    description: t.intro,
    alternates: alternatesFor(treatmentsHub, "de"),
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: `${siteConfig.url}${treatmentsHub.de}`,
      title: `${t.title} | ${siteConfig.brand}`,
      description: t.intro,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/behandlungen">,
) {
  const { locale } = await props.params;
  if (locale !== "de") notFound();
  const dict = await getDictionary("de");
  return (
    <TreatmentsHub locale="de" dict={dict.pages.treatmentsHub} category="treatment" />
  );
}
