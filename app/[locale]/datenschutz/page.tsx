import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(
  props: PageProps<"/[locale]/datenschutz">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.legal.datenschutz.title,
    description: dict.legal.datenschutz.intro,
    robots: { index: true, follow: false },
  };
}

/**
 * Datenschutzerklärung — Privacy Policy stub.
 *
 * v1 is a placeholder. The following sections are stubbed:
 *   - Verantwortlicher (Art. 4 (7) DSGVO)
 *   - Hosting / Server-Logs / IP-Adressen
 *   - Cookies (technisch notwendig vs. einwilligungspflichtig)
 *   - Karten-Provider — CARTO via MapLibre GL JS
 *     (Drittland-Übermittlung prüfen → CARTO ist DE/EU-hosting verfügbar)
 *   - Kontaktformular (kommt v2)
 *   - Betroffenenrechte (Art. 15–21 DSGVO + § 19 BDSG)
 *
 * Final text MUST be approved by a GDPR attorney before launch.
 */
export default async function DatenschutzPage(
  props: PageProps<"/[locale]/datenschutz">,
) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.legal.datenschutz;

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
              {t.controllerHeading}
            </h2>
            <address className="not-italic">
              {siteConfig.legalName}
              <br />
              {siteConfig.address.practice}, {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city},{" "}
              {siteConfig.address.country}
              <br />
              <a
                href={siteConfig.contact.emailHref}
                className="text-foreground underline underline-offset-4 hover:text-accent"
              >
                {siteConfig.contact.email}
              </a>
            </address>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-2xl font-light tracking-[-0.01em] text-foreground">
              {t.hostingHeading}
            </h2>
            <p className="text-muted-foreground">
              {/* TODO: Hosting-Anbieter benennen (Vercel / EU-Region o.ä.),
                  Auftragsverarbeitungsvertrag verlinken, Server-Logs Rechtsgrundlage
                  (Art. 6 (1) f DSGVO) angeben, Speicherdauer benennen. */}
              TODO — Hosting-Anbieter (z. B. Vercel, EU-Region), AV-Vertrag,
              Server-Logs nach Art. 6 Abs. 1 lit. f DSGVO, Speicherdauer.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-2xl font-light tracking-[-0.01em] text-foreground">
              {t.cookiesHeading}
            </h2>
            <p className="text-muted-foreground">
              {/* TODO: Liste aller eingesetzten Cookies, technisch notwendig vs.
                  einwilligungspflichtig, Consent-Management-Plattform. */}
              Diese Website verwendet derzeit ausschließlich technisch notwendige
              Cookies. Eine vollständige Liste sowie ein Consent-Banner werden
              vor Launch ergänzt.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-2xl font-light tracking-[-0.01em] text-foreground">
              {t.mapsHeading}
            </h2>
            <p className="text-muted-foreground">
              Die Standortkarte wird mit{" "}
              <a
                href="https://maplibre.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-accent"
              >
                MapLibre GL JS
              </a>{" "}
              gerendert; die Kartenkacheln stammen von{" "}
              <a
                href="https://carto.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-accent"
              >
                CARTO
              </a>
              . Beim Laden der Kacheln wird Ihre IP-Adresse an CARTO übermittelt.
              {/* TODO: Drittland-Übermittlung CARTO prüfen, ggf. CARTO EU-Endpunkt,
                  Rechtsgrundlage Art. 6 (1) f DSGVO, Speicherdauer. */}
              {" "}TODO — Rechtsgrundlage, Drittland-Hinweis und Opt-Out vor Launch
              ergänzen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-2xl font-light tracking-[-0.01em] text-foreground">
              {t.contactFormHeading}
            </h2>
            <p className="text-muted-foreground">
              {/* TODO: Kontaktformular kommt in v2 — Datenkategorien, Zweck,
                  Rechtsgrundlage, Speicherdauer dann hier ergänzen. */}
              Ein Kontaktformular ist in Vorbereitung. Bis dahin erreichen Sie
              uns telefonisch unter{" "}
              <a
                href={siteConfig.contact.phoneHref}
                className="text-foreground underline underline-offset-4 hover:text-accent"
              >
                {siteConfig.contact.phoneDisplay}
              </a>{" "}
              oder per E-Mail an{" "}
              <a
                href={siteConfig.contact.emailHref}
                className="text-foreground underline underline-offset-4 hover:text-accent"
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-sans text-2xl font-light tracking-[-0.01em] text-foreground">
              {t.rightsHeading}
            </h2>
            <p className="text-muted-foreground">
              Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16),
              Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
              Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21) gemäß
              DSGVO. Zur Geltendmachung wenden Sie sich an die oben genannten
              Kontaktdaten.
            </p>
          </section>

          <aside
            role="note"
            className="mt-12 rounded-[4px] border border-accent/40 bg-accent/10 p-6 text-sm leading-relaxed text-foreground"
          >
            <p className="mb-2 font-display text-[0.7rem] uppercase tracking-[0.24em] text-accent-foreground/80">
              TODO
            </p>
            <p>{t.todo}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
