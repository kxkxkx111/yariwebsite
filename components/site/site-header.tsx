"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import {
  localeMeta,
  locales,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/config";
import {
  treatments,
  minimalInvasive,
  treatmentsHub,
  minimalInvasiveHub,
  pages,
  path,
  type TreatmentSlug,
  type MinimalInvasiveSlug,
} from "@/lib/routes";

type HeaderDict = {
  logoAlt: string;
  nav: {
    treatments: string;
    minimalInvasive: string;
    forWomen: string;
    forMen: string;
    academy: string;
    about: string;
    contact: string;
  };
  dropdown: {
    treatmentsLabel: string;
    minimalLabel: string;
    overview: string;
  };
  cta: string;
  menuOpen: string;
  menuClose: string;
  languageSwitcher: string;
};

const TREATMENT_KEYS: TreatmentSlug[] = ["breast", "face", "abdomen", "legs", "arms", "buttocks"];
const MINIMAL_KEYS: MinimalInvasiveSlug[] = ["botox", "filler", "biostimulation", "laser", "prp", "microneedling"];

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
  microneedling: { de: "Radiofrequenz-Microneedling", en: "RF Microneedling" },
};

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: HeaderDict;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"treatments" | "minimal" | null>(null);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer / dropdown on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  const homeHref = path(pages.home, locale);
  const ctaHref = path(pages.booking, locale);

  const treatmentItems = TREATMENT_KEYS.map((k) => ({
    key: k,
    label: TREATMENT_LABELS[k][locale],
    href: path(treatments[k], locale),
  }));
  const minimalItems = MINIMAL_KEYS.map((k) => ({
    key: k,
    label: MINIMAL_LABELS[k][locale],
    href: path(minimalInvasive[k], locale),
  }));

  const flatNav = [
    { key: "forWomen", label: dict.nav.forWomen, href: path(pages.forWomen, locale) },
    { key: "forMen", label: dict.nav.forMen, href: path(pages.forMen, locale) },
    { key: "academy", label: dict.nav.academy, href: path(pages.academy, locale) },
    { key: "about", label: dict.nav.about, href: path(pages.about, locale) },
    { key: "contact", label: dict.nav.contact, href: path(pages.contact, locale) },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-[border-color,background-color] duration-300",
        scrolled ? "border-b border-border/60" : "border-b border-border/30",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href={homeHref}
          aria-label={`${siteConfig.brand} — ${locale === "de" ? "Startseite" : "Home"}`}
          className="flex shrink-0 items-center focus-visible:outline-none"
        >
          <Image
            src={siteConfig.assets.logoMono}
            alt={dict.logoAlt}
            width={152}
            height={36}
            priority
            sizes="(min-width: 768px) 168px, 132px"
            className="h-7 w-auto md:h-9"
            style={{ maxWidth: "168px", width: "auto" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex" aria-label="Hauptnavigation">
          <ul className="flex items-center gap-6 xl:gap-8">
            {/* Treatments dropdown */}
            <li className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown((d) => (d === "treatments" ? null : "treatments"))}
                onMouseEnter={() => setOpenDropdown("treatments")}
                aria-haspopup="true"
                aria-expanded={openDropdown === "treatments"}
                className="nav-link inline-flex items-center gap-1 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:text-foreground"
              >
                {dict.nav.treatments}
                <ChevronDown className="h-3 w-3" aria-hidden />
              </button>
              {openDropdown === "treatments" && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute left-0 top-full z-40 mt-3 w-72 rounded-sm border border-border/40 bg-background/95 p-3 shadow-[0_24px_44px_-20px_rgba(51,51,51,0.25)] backdrop-blur"
                >
                  <Link
                    href={path(treatmentsHub, locale)}
                    className="block rounded-sm px-3 py-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted-foreground hover:bg-card hover:text-foreground"
                  >
                    {dict.dropdown.overview}
                  </Link>
                  <ul className="mt-1 grid gap-px">
                    {treatmentItems.map((item) => (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          className="block rounded-sm px-3 py-2 text-sm font-medium text-foreground/85 hover:bg-card hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* Minimal-invasive dropdown */}
            <li className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown((d) => (d === "minimal" ? null : "minimal"))}
                onMouseEnter={() => setOpenDropdown("minimal")}
                aria-haspopup="true"
                aria-expanded={openDropdown === "minimal"}
                className="nav-link inline-flex items-center gap-1 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:text-foreground"
              >
                {dict.nav.minimalInvasive}
                <ChevronDown className="h-3 w-3" aria-hidden />
              </button>
              {openDropdown === "minimal" && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute left-0 top-full z-40 mt-3 w-72 rounded-sm border border-border/40 bg-background/95 p-3 shadow-[0_24px_44px_-20px_rgba(51,51,51,0.25)] backdrop-blur"
                >
                  <Link
                    href={path(minimalInvasiveHub, locale)}
                    className="block rounded-sm px-3 py-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted-foreground hover:bg-card hover:text-foreground"
                  >
                    {dict.dropdown.overview}
                  </Link>
                  <ul className="mt-1 grid gap-px">
                    {minimalItems.map((item) => (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          className="block rounded-sm px-3 py-2 text-sm font-medium text-foreground/85 hover:bg-card hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {flatNav.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="nav-link text-[0.78rem] font-medium uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language switcher */}
          <div
            className="hidden items-center gap-1 text-[0.74rem] font-medium uppercase tracking-[0.18em] lg:flex"
            role="group"
            aria-label={dict.languageSwitcher}
          >
            {locales.map((l, i) => {
              const target = switchLocalePath(l, pathname);
              const isActive = l === locale;
              return (
                <span key={l} className="flex items-center">
                  {i > 0 && (
                    <span aria-hidden className="mx-1 text-border">
                      ·
                    </span>
                  )}
                  <Link
                    href={target}
                    aria-current={isActive ? "page" : undefined}
                    hrefLang={localeMeta[l].htmlLang}
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {localeMeta[l].label}
                  </Link>
                </span>
              );
            })}
          </div>

          <Link
            href={ctaHref}
            className="hidden items-center rounded-[2px] bg-primary px-5 py-2.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-all hover:-translate-y-px hover:bg-accent hover:shadow-[0_10px_28px_-14px_rgba(51,51,51,0.45)] lg:inline-flex"
          >
            {dict.cta}
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? dict.menuClose : dict.menuOpen}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur lg:hidden",
          mobileOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0",
        )}
        style={{ transition: "max-height 360ms cubic-bezier(0.22,1,0.36,1)" }}
      >
        <nav aria-label="Mobile Navigation" className="px-6 py-6">
          <MobileSection label={dict.nav.treatments} hubHref={path(treatmentsHub, locale)} hubLabel={dict.dropdown.overview} items={treatmentItems} onNavigate={() => setMobileOpen(false)} />
          <MobileSection label={dict.nav.minimalInvasive} hubHref={path(minimalInvasiveHub, locale)} hubLabel={dict.dropdown.overview} items={minimalItems} onNavigate={() => setMobileOpen(false)} />
          <ul className="mt-2 flex flex-col gap-0.5 border-t border-border/30 pt-3">
            {flatNav.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-base font-medium tracking-tight text-foreground/85"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-border/30 pt-4 text-[0.78rem] font-medium uppercase tracking-[0.18em]">
            <span className="text-muted-foreground">{dict.languageSwitcher}</span>
            <div className="flex items-center gap-1">
              {locales.map((l, i) => {
                const target = switchLocalePath(l, pathname);
                const isActive = l === locale;
                return (
                  <span key={l} className="flex items-center">
                    {i > 0 && (
                      <span aria-hidden className="mx-1 text-border">
                        ·
                      </span>
                    )}
                    <Link
                      href={target}
                      aria-current={isActive ? "page" : undefined}
                      hrefLang={localeMeta[l].htmlLang}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {localeMeta[l].label}
                    </Link>
                  </span>
                );
              })}
            </div>
          </div>
          <Link
            href={ctaHref}
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center rounded-[2px] bg-primary px-5 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground"
          >
            {dict.cta}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function MobileSection({
  label,
  hubHref,
  hubLabel,
  items,
  onNavigate,
}: {
  label: string;
  hubHref: string;
  hubLabel: string;
  items: Array<{ key: string; label: string; href: string }>;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/30 py-2 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3 text-base font-medium tracking-tight text-foreground/85"
      >
        {label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open ? "rotate-180" : "")}
          aria-hidden
        />
      </button>
      {open && (
        <ul className="ml-1 flex flex-col gap-0.5 pb-3 pl-3">
          <li>
            <Link
              href={hubHref}
              onClick={onNavigate}
              className="block py-2 text-[0.78rem] uppercase tracking-[0.18em] text-muted-foreground"
            >
              {hubLabel}
            </Link>
          </li>
          {items.map((it) => (
            <li key={it.key}>
              <Link
                href={it.href}
                onClick={onNavigate}
                className="block py-2 text-sm text-foreground/85"
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
