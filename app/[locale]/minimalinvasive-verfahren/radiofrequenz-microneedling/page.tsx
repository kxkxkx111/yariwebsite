import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { treatmentMetadata, renderTreatmentPage } from "@/lib/render-treatment";

export async function generateMetadata(
  props: PageProps<"/[locale]/minimalinvasive-verfahren/radiofrequenz-microneedling">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "de") return {};
  return treatmentMetadata("de", { category: "minimal", slug: "microneedling" });
}

export default async function Page(
  props: PageProps<"/[locale]/minimalinvasive-verfahren/radiofrequenz-microneedling">,
) {
  const { locale } = await props.params;
  if (locale !== "de") notFound();
  return renderTreatmentPage("de", { category: "minimal", slug: "microneedling" });
}
