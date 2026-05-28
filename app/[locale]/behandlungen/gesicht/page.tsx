import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { treatmentMetadata, renderTreatmentPage } from "@/lib/render-treatment";

export async function generateMetadata(
  props: PageProps<"/[locale]/behandlungen/gesicht">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "de") return {};
  return treatmentMetadata("de", { category: "treatment", slug: "face" });
}

export default async function Page(
  props: PageProps<"/[locale]/behandlungen/gesicht">,
) {
  const { locale } = await props.params;
  if (locale !== "de") notFound();
  return renderTreatmentPage("de", { category: "treatment", slug: "face" });
}
