import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/impressum">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.legal.impressum.title,
    description: dict.legal.impressum.intro,
    robots: { index: true, follow: false },
  };
}

/**
 * Impressum — German statutory imprint (§ 5 TMG).
 *
 * v1 is a stub. The TODO block lists every legally required field that must
 * be filled before launch:
 *   - Approbationsbehörde (Senatsverwaltung für Gesundheit, Berlin)
 *   - Zuständige Ärztekammer (Ärztekammer Berlin)
 *   - Berufsbezeichnung + Land der Verleihung
 *   - Berufsrechtliche Regelungen (MBO-Ä, BO Ärztekammer Berlin)
 *   - Berufshaftpflichtversicherung (Versicherer + räumlicher Geltungsbereich)
 *   - USt-IdNr. (falls vorhanden)
 *   - EU-Streitschlichtung Hinweis (Art. 14 ODR-VO)
 */
export default async function ImpressumPage(
  props: PageProps<"/[locale]/impressum">,
) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.legal.impressum;

  return (
    <section lang={locale} className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
        <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
          <span aria-hidden className="h-px w-8 bg-accent" />
          Capital Aesthetics · Berlin
        </p>
        <h1 className="font-sans text-[2.4rem] font-light leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl">
          {t.title}
        </h1>
        <div className="my-8 h-px w-20 bg-foreground" aria-hidden />

        <p className="text-base leading-[1.75] text-muted-foreground md:text-[1.05rem]">
          {t.intro}
        </p>

        <div className="mt-12 space-y-10 text-base leading-[1.7] text-foreground">
          <section>
            <h2 className="mb-3 font-sans text-2xl font-light tracking-[-0.01em] text-foreground">
              {t.responsibleHeading}
            </h2>
            <address className="not-italic">
              {siteConfig.legalName}
              <br />
              {siteConfig.address.practice}
              <br />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
              <br />
              {siteConfig.address.country}
            </address>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-2xl font-light tracking-[-0.01em] text-foreground">
              {t.contactHeading}
            </h2>
            <ul className="space-y-1.5">
              <li>
                Telefon:{" "}
                <a
                  href={siteConfig.contact.phoneHref}
                  className="text-foreground underline underline-offset-4 hover:text-accent"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                E-Mail:{" "}
                <a
                  href={siteConfig.contact.emailHref}
                  className="text-foreground underline underline-offset-4 hover:text-accent"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                WhatsApp:{" "}
                <a
                  href={siteConfig.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4 hover:text-accent"
                >
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-2xl font-light tracking-[-0.01em] text-foreground">
              {t.professionHeading}
            </h2>
            <p className="text-muted-foreground">
              {siteConfig.profession[locale]} — {siteConfig.address.country}
            </p>
          </section>

          {/* TODO — vor Launch durch DSGVO-/Medizinrechts-Anwalt prüfen */}
          <aside
            role="note"
            className="mt-12 rounded-[4px] border border-accent/40 bg-accent/10 p-6 text-sm leading-relaxed text-foreground"
          >
            <p className="mb-2 font-display text-[0.7rem] uppercase tracking-[0.24em] text-accent-foreground/80">
              TODO
            </p>
            <p>{t.todo}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Approbationsbehörde + Verleihungsstaat</li>
              <li>Zuständige Ärztekammer (Ärztekammer Berlin)</li>
              <li>Berufsrechtliche Regelungen (MBO-Ä, BO der ÄK Berlin)</li>
              <li>Berufshaftpflichtversicherung (Versicherer + Geltungsbereich)</li>
              <li>USt-IdNr. (falls erteilt)</li>
              <li>EU-Streitschlichtung (Art. 14 ODR-VO)</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
