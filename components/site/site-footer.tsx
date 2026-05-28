import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/config";
import {
  treatments,
  minimalInvasive,
  pages,
  treatmentsHub,
  minimalInvasiveHub,
  path,
  type TreatmentSlug,
  type MinimalInvasiveSlug,
} from "@/lib/routes";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

type FooterDict = {
  tagline: string;
  contactLabel: string;
  addressLabel: string;
  socialLabel: string;
  legalLabel: string;
  navLabel: string;
  treatmentsLabel: string;
  minimalLabel: string;
  moreLabel: string;
  directionsCta: string;
  legalImprint: string;
  legalPrivacy: string;
  legalCookies: string;
  rights: string;
  madeWithCare: string;
};

const TREATMENT_LABELS: Record<TreatmentSlug, Record<Locale, string>> = {
  breast: { de: "Brust", en: "Breast" },
  face: { de: "Gesicht", en: "Face" },
  abdomen: { de: "Bauch", en: "Abdomen" },
  legs: { de: "Beine", en: "Legs" },
  arms: { de: "Arme", en: "Arms" },
  buttocks: { de: "Gesäß", en: "Buttocks" },
};
const MINIMAL_LABELS: Record<MinimalInvasiveSlug, Record<Locale, string>> = {
  botox: { de: "Botox", en: "Botox" },
  filler: { de: "Filler", en: "Filler" },
  biostimulation: { de: "Biostimulation", en: "Biostimulants" },
  laser: { de: "Laser", en: "Laser" },
  prp: { de: "PRP", en: "PRP" },
  microneedling: { de: "RF-Microneedling", en: "RF Microneedling" },
};

const MORE_LINKS_KEYS = ["forWomen", "forMen", "academy", "about", "contact"] as const;
const MORE_LABELS: Record<typeof MORE_LINKS_KEYS[number], Record<Locale, string>> = {
  forWomen: { de: "Für Frauen", en: "For Women" },
  forMen: { de: "Für Männer", en: "For Men" },
  academy: { de: "Akademie", en: "Academy" },
  about: { de: "Über mich", en: "About" },
  contact: { de: "Kontakt", en: "Contact" },
};

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: FooterDict;
}) {
  const year = new Date().getFullYear();
  const impressumHref = path(pages.impressum, locale);
  const datenschutzHref = path(pages.datenschutz, locale);
  const homeHref = path(pages.home, locale);

  const treatmentList = (Object.keys(treatments) as TreatmentSlug[]).map((k) => ({
    label: TREATMENT_LABELS[k][locale],
    href: path(treatments[k], locale),
  }));
  const minimalList = (Object.keys(minimalInvasive) as MinimalInvasiveSlug[]).map((k) => ({
    label: MINIMAL_LABELS[k][locale],
    href: path(minimalInvasive[k], locale),
  }));
  const moreList = MORE_LINKS_KEYS.map((k) => ({
    label: MORE_LABELS[k][locale],
    href: path(pages[k], locale),
  }));

  return (
    <footer
      id="kontakt"
      lang={locale}
      className="bg-[#141414] text-[#e8e2dc]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 md:py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Col 1: brand + tagline + social */}
          <div className="flex flex-col gap-5 md:col-span-4">
            <Link
              href={homeHref}
              aria-label={`${siteConfig.brand} — home`}
              className="inline-flex w-fit focus-visible:outline-none"
            >
              <Image
                src={siteConfig.assets.logoMono}
                alt={`${siteConfig.brand} — Plastic Surgery`}
                width={2727}
                height={646}
                sizes="(min-width: 768px) 220px, 180px"
                className="h-7 w-auto brightness-0 invert md:h-8"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="font-sans text-[1.05rem] font-light leading-snug text-white">
              {siteConfig.brand}
            </p>
            {dict.tagline && (
              <p className="max-w-[28ch] text-sm leading-relaxed text-[#e8e2dc]/70">
                {dict.tagline}
              </p>
            )}
            <p className="max-w-[30ch] text-[0.78rem] leading-relaxed text-[#e8e2dc]/55">
              {siteConfig.legalName}
              <br />
              {siteConfig.profession[locale]}
            </p>
            <div className="mt-2">
              <p className="mb-3 font-display text-[0.68rem] uppercase tracking-[0.24em] text-[#e8e2dc]/60">
                {dict.socialLabel}
              </p>
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white hover:text-[#dcac83]"
              >
                <InstagramGlyph className="h-4 w-4" />
                {siteConfig.social.instagram.handle}
              </a>
            </div>
          </div>

          {/* Col 2: Behandlungen + Minimalinvasiv */}
          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            <div>
              <p className="mb-4 font-display text-[0.68rem] uppercase tracking-[0.24em] text-[#e8e2dc]/60">
                <Link
                  href={path(treatmentsHub, locale)}
                  className="transition-colors hover:text-white"
                >
                  {dict.treatmentsLabel}
                </Link>
              </p>
              <ul className="space-y-2 text-sm">
                {treatmentList.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="text-[#e8e2dc]/80 transition-colors hover:text-white"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-display text-[0.68rem] uppercase tracking-[0.24em] text-[#e8e2dc]/60">
                <Link
                  href={path(minimalInvasiveHub, locale)}
                  className="transition-colors hover:text-white"
                >
                  {dict.minimalLabel}
                </Link>
              </p>
              <ul className="space-y-2 text-sm">
                {minimalList.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="text-[#e8e2dc]/80 transition-colors hover:text-white"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 3: More navigation */}
          <div className="md:col-span-2">
            <p className="mb-4 font-display text-[0.68rem] uppercase tracking-[0.24em] text-[#e8e2dc]/60">
              {dict.moreLabel}
            </p>
            <ul className="space-y-2 text-sm">
              {moreList.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="text-[#e8e2dc]/80 transition-colors hover:text-white"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="md:col-span-2">
            <p className="mb-4 font-display text-[0.68rem] uppercase tracking-[0.24em] text-[#e8e2dc]/60">
              {dict.contactLabel}
            </p>
            <address className="not-italic text-sm leading-relaxed text-[#e8e2dc]/85">
              <span className="font-sans text-base font-light text-white">
                {siteConfig.address.practice}
              </span>
              <br />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postalCode} {siteConfig.address.city}
            </address>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="text-white transition-colors hover:text-[#dcac83]"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-colors hover:text-[#dcac83]"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.emailHref}
                  className="text-white transition-colors hover:text-[#dcac83]"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            <a
              href={siteConfig.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:text-[#dcac83]"
            >
              {dict.directionsCta} →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 text-xs sm:flex-row sm:items-center">
          <p className="text-[#e8e2dc]/55">
            © {year} {siteConfig.brand}. {dict.rights}
          </p>
          <nav aria-label={dict.legalLabel} className="flex items-center gap-5">
            <Link
              href={impressumHref}
              className="text-[#e8e2dc]/55 transition-colors hover:text-white"
            >
              {dict.legalImprint}
            </Link>
            <Link
              href={datenschutzHref}
              className="text-[#e8e2dc]/55 transition-colors hover:text-white"
            >
              {dict.legalPrivacy}
            </Link>
            <button
              type="button"
              className="text-[#e8e2dc]/55 transition-colors hover:text-white"
              aria-label={dict.legalCookies}
            >
              {dict.legalCookies}
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
