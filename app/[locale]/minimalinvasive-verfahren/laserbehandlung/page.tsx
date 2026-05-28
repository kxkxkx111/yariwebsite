import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { treatmentMetadata, renderTreatmentPage } from "@/lib/render-treatment";

export async function generateMetadata(
  props: PageProps<"/[locale]/minimalinvasive-verfahren/laserbehandlung">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "de") return {};
  return treatmentMetadata("de", { category: "minimal", slug: "laser" });
}

export default async function Page(
  props: PageProps<"/[locale]/minimalinvasive-verfahren/laserbehandlung">,
) {
  const { locale } = await props.params;
  if (locale !== "de") notFound();
  return renderTreatmentPage("de", { category: "minimal", slug: "laser" });
}
