import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { treatmentMetadata, renderTreatmentPage } from "@/lib/render-treatment";

export async function generateMetadata(
  props: PageProps<"/[locale]/treatments/breast">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  return treatmentMetadata("en", { category: "treatment", slug: "breast" });
}

export default async function Page(
  props: PageProps<"/[locale]/treatments/breast">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  return renderTreatmentPage("en", { category: "treatment", slug: "breast" });
}
