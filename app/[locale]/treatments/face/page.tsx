import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { treatmentMetadata, renderTreatmentPage } from "@/lib/render-treatment";

export async function generateMetadata(
  props: PageProps<"/[locale]/treatments/face">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  return treatmentMetadata("en", { category: "treatment", slug: "face" });
}

export default async function Page(
  props: PageProps<"/[locale]/treatments/face">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  return renderTreatmentPage("en", { category: "treatment", slug: "face" });
}
