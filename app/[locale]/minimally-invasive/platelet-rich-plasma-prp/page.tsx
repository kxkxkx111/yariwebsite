import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { treatmentMetadata, renderTreatmentPage } from "@/lib/render-treatment";

export async function generateMetadata(
  props: PageProps<"/[locale]/minimally-invasive/platelet-rich-plasma-prp">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  return treatmentMetadata("en", { category: "minimal", slug: "prp" });
}

export default async function Page(
  props: PageProps<"/[locale]/minimally-invasive/platelet-rich-plasma-prp">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  return renderTreatmentPage("en", { category: "minimal", slug: "prp" });
}
