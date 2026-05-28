import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { treatmentMetadata, renderTreatmentPage } from "@/lib/render-treatment";

export async function generateMetadata(
  props: PageProps<"/[locale]/behandlungen/arme">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (locale !== "de") return {};
  return treatmentMetadata("de", { category: "treatment", slug: "arms" });
}

export default async function Page(
  props: PageProps<"/[locale]/behandlungen/arme">,
) {
  const { locale } = await props.params;
  if (locale !== "de") notFound();
  return renderTreatmentPage("de", { category: "treatment", slug: "arms" });
}
