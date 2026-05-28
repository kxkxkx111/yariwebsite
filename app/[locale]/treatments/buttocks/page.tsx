import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { treatmentMetadata, renderTreatmentPage } from "@/lib/render-treatment";

export async function generateMetadata(
  props: PageProps<"/[locale]/treatments/buttocks">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "en") return {};
  return treatmentMetadata("en", { category: "treatment", slug: "buttocks" });
}

export default async function Page(
  props: PageProps<"/[locale]/treatments/buttocks">,
) {
  const { locale } = await props.params;
  if (locale !== "en") notFound();
  return renderTreatmentPage("en", { category: "treatment", slug: "buttocks" });
}
