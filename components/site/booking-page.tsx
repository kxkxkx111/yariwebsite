import { Phone, MessageCircle, Mail, Calendar } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { pages, path } from "@/lib/routes";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type Step = { number: string; title: string; body: string };

export type BookingDict = {
  eyebrow: string;
  title: string;
  tagline: string;
  intro: string;
  stepsHeading: string;
  steps: Step[];
  channelsHeading: string;
  channels: { phone: string; whatsapp: string; email: string };
  embedTodo: string;
  embedFallback: string;
};

export function BookingPage({ locale, dict }: { locale: Locale; dict: BookingDict }) {
  const homeLabel = locale === "de" ? "Start" : "Home";

  return (
    <>
      <Breadcrumbs
        items={[
          { label: homeLabel, href: path(pages.home, locale) },
          { label: dict.eyebrow },
        ]}
      />

      <section lang={locale} aria-labelledby="booking-heading" className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {dict.eyebrow}
          </p>
          <h1
            id="booking-heading"
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

      {/* STEPS */}
      <section lang={locale} aria-labelledby="steps-heading" className="bg-muted py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <h2
            id="steps-heading"
            className="font-sans text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.3rem]"
          >
            {dict.stepsHeading}
          </h2>
          <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {dict.steps.map((step) => (
              <li
                key={step.number}
                className="rounded-sm border border-border bg-background p-6"
              >
                <p className="font-display text-[0.78rem] uppercase tracking-[0.18em] text-accent">
                  {step.number}
                </p>
                <h3 className="mt-2 font-sans text-lg leading-tight tracking-[-0.01em] text-foreground md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CHANNELS */}
      <section lang={locale} aria-labelledby="channels-heading" className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <h2
            id="channels-heading"
            className="font-sans text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.3rem]"
          >
            {dict.channelsHeading}
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <li>
              <a
                href={siteConfig.contact.phoneHref}
                className="block rounded-sm border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-[0_18px_40px_-30px_rgba(26,26,26,0.25)]"
              >
                <Phone className="mb-4 h-5 w-5 text-accent" aria-hidden />
                <p className="font-display text-[0.66rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {dict.channels.phone}
                </p>
                <p className="mt-2 font-sans text-lg font-light text-foreground">
                  {siteConfig.contact.phoneDisplay}
                </p>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-sm border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-[0_18px_40px_-30px_rgba(26,26,26,0.25)]"
              >
                <MessageCircle className="mb-4 h-5 w-5 text-accent" aria-hidden />
                <p className="font-display text-[0.66rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {dict.channels.whatsapp}
                </p>
                <p className="mt-2 font-sans text-lg font-light text-foreground">
                  {siteConfig.contact.whatsappDisplay}
                </p>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.contact.emailHref}
                className="block rounded-sm border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-[0_18px_40px_-30px_rgba(26,26,26,0.25)]"
              >
                <Mail className="mb-4 h-5 w-5 text-accent" aria-hidden />
                <p className="font-display text-[0.66rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {dict.channels.email}
                </p>
                <p className="mt-2 font-sans text-lg font-light text-foreground">
                  {siteConfig.contact.email}
                </p>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* EMBED PLACEHOLDER */}
      <section lang={locale} className="bg-muted py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center gap-4 rounded-sm border border-border bg-background p-10 text-center md:p-16">
            <Calendar className="h-7 w-7 text-accent" aria-hidden />
            <p className="font-sans text-xl font-light leading-snug text-foreground md:text-2xl">
              {dict.embedFallback}
            </p>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              {dict.embedTodo}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
