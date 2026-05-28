import Script from "next/script";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import { MapSection } from "./map-section";
import { siteConfig } from "@/lib/site-config";
import { pages, path } from "@/lib/routes";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type Hours = { day: string; value: string };

export type ContactDict = {
  eyebrow: string;
  title: string;
  tagline: string;
  intro: string;
  visitHeading: string;
  chatHeading: string;
  hoursHeading: string;
  hoursTodo: string;
  hours: Hours[];
  formHeading: string;
  formIntro: string;
  form: {
    name: string;
    email: string;
    phone: string;
    topic: string;
    topicPlaceholder: string;
    message: string;
    consent: string;
    submit: string;
    todo: string;
  };
};

export function ContactPage({
  locale,
  dict,
  mapDict,
}: {
  locale: Locale;
  dict: ContactDict;
  mapDict: React.ComponentProps<typeof MapSection>["dict"];
}) {
  const homeLabel = locale === "de" ? "Start" : "Home";

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    name: `${siteConfig.legalName} — ${siteConfig.address.practice}`,
    url: `${siteConfig.url}${path(pages.contact, locale)}`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    image: `${siteConfig.url}${siteConfig.assets.heroPortrait}`,
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.latitude,
      longitude: siteConfig.coordinates.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <>
      <Script
        id="ld-local-business"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <Breadcrumbs
        items={[
          { label: homeLabel, href: path(pages.home, locale) },
          { label: dict.eyebrow },
        ]}
      />

      <section
        lang={locale}
        aria-labelledby="contact-heading"
        className="bg-background py-16 md:py-24"
      >
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {dict.eyebrow}
          </p>
          <h1
            id="contact-heading"
            className="font-sans text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[3.2rem] lg:text-[4rem]"
          >
            <span className="block">{accentFirstWord(dict.title)}</span>
          </h1>
          <p className="mt-5 font-sans text-xl font-light leading-snug text-foreground/85 md:text-2xl">
            {dict.tagline}
          </p>
          <div aria-hidden className="my-8 h-px w-20 bg-foreground" />
          <p className="max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
            {dict.intro}
          </p>
        </div>
      </section>

      {/* Visit + chat + hours cards */}
      <section lang={locale} className="bg-muted py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 sm:px-8 md:grid-cols-3 lg:px-12">
          <div className="rounded-sm border border-border bg-background p-7">
            <div className="mb-4 inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden />
              <span className="font-display text-[0.66rem] uppercase tracking-[0.22em]">
                {dict.visitHeading}
              </span>
            </div>
            <address className="not-italic">
              <p className="font-sans text-lg font-light text-foreground">
                {siteConfig.address.practice}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
                <br />
                {siteConfig.address.country}
              </p>
            </address>
            <a
              href={siteConfig.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-foreground hover:text-accent"
            >
              {mapDict.directionsCta} →
            </a>
          </div>

          <div className="rounded-sm border border-border bg-background p-7">
            <div className="mb-4 inline-flex items-center gap-2 text-muted-foreground">
              <MessageCircle className="h-4 w-4" aria-hidden />
              <span className="font-display text-[0.66rem] uppercase tracking-[0.22em]">
                {dict.chatHeading}
              </span>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" aria-hidden />
                <a
                  href={siteConfig.contact.phoneHref}
                  className="text-foreground hover:text-accent"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-muted-foreground" aria-hidden />
                <a
                  href={siteConfig.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent"
                >
                  WhatsApp · {siteConfig.contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" aria-hidden />
                <a
                  href={siteConfig.contact.emailHref}
                  className="text-foreground hover:text-accent"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-sm border border-border bg-background p-7">
            <div className="mb-4 inline-flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden />
              <span className="font-display text-[0.66rem] uppercase tracking-[0.22em]">
                {dict.hoursHeading}
              </span>
            </div>
            <ul className="space-y-2 text-sm leading-snug">
              {dict.hours.map((h) => (
                <li key={h.day} className="flex items-baseline justify-between gap-3">
                  <span className="text-foreground/85">{h.day}</span>
                  <span className="text-foreground">{h.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.66rem] uppercase tracking-[0.18em] text-muted-foreground/80">
              {dict.hoursTodo}
            </p>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section lang={locale} aria-labelledby="form-heading" className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <h2
            id="form-heading"
            className="font-sans text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.3rem]"
          >
            {dict.formHeading}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-muted-foreground">
            {dict.formIntro}
          </p>
          <form action="#" method="post" className="mt-10 grid grid-cols-1 gap-5">
            <FormField id="name" label={dict.form.name} required>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="form-input"
              />
            </FormField>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField id="email" label={dict.form.email} required>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="form-input"
                />
              </FormField>
              <FormField id="phone" label={dict.form.phone}>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="form-input"
                />
              </FormField>
            </div>
            <FormField id="topic" label={dict.form.topic}>
              <input
                id="topic"
                name="topic"
                type="text"
                placeholder={dict.form.topicPlaceholder}
                className="form-input"
              />
            </FormField>
            <FormField id="message" label={dict.form.message} required>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="form-input resize-y"
              />
            </FormField>
            <label className="mt-2 flex items-start gap-3 text-sm leading-snug text-muted-foreground">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 h-4 w-4 flex-shrink-0 accent-foreground"
              />
              <span>{dict.form.consent}</span>
            </label>
            <div className="mt-2 flex items-center gap-5">
              <button
                type="submit"
                className="inline-flex items-center gap-3 rounded-[2px] bg-primary px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:-translate-y-px hover:shadow-[0_14px_36px_-16px_rgba(0,0,0,0.5)]"
              >
                {dict.form.submit}
              </button>
              <p className="text-[0.66rem] uppercase tracking-[0.18em] text-muted-foreground/80">
                {dict.form.todo}
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Map */}
      <MapSection locale={locale} dict={mapDict} />
    </>
  );
}

function FormField({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-display text-[0.66rem] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {children}
    </div>
  );
}
