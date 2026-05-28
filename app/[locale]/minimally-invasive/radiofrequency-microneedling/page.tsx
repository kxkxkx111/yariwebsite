import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { treatmentMetadata, renderTreatmentPage } from "@/lib/render-treatment";

export async function generateMetadata(
  props: PageProps<"/[locale]/minimally-invasive/radiofrequency-microneedling">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  return treatmentMetadata("en", { category: "minimal", slug: "microneedling" });
}

export default async function Page(
  props: PageProps<"/[locale]/minimally-invasive/radiofrequency-microneedling">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  return renderTreatmentPage("en", { category: "minimal", slug: "microneedling" });
}
