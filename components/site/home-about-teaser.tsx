import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

export type AboutTeaserDict = {
  eyebrow: string;
  title: string;
  /** Pull-quote split into three parts so the middle word can be rendered
      in the brand accent color. Reads naturally even if rendered as plain
      text (e.g. `${quoteStart} ${quoteAccent}${quoteEnd}`). */
  quoteStart: string;
  quoteAccent: string;
  quoteEnd: string;
  /** Self-introduction paragraph in first person ("Ich bin Dr. Pouyan Yary …") */
  intro: string;
  /** Vita / Werdegang paragraph */
  vita: string;
  cta: string;
  image: string;
  imageAlt: string;
  memberships: string;
};

export function HomeAboutTeaser({
  locale,
  dict,
  href,
}: {
  locale: Locale;
  dict: AboutTeaserDict;
  href: string;
}) {
  return (
    <section
      lang={locale}
      aria-labelledby="about-teaser-heading"
      className="bg-background py-20 md:py-28"
    >
      {/* Pull-quote — clean white block, the visual statement */}
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
        <blockquote
          id="about-teaser-heading"
          className="relative pl-7 md:pl-9"
        >
          <span
            aria-hidden
            className="absolute -top-2 left-0 font-serif text-[2.6rem] leading-none text-accent md:text-[3.8rem]"
          >
            &ldquo;
          </span>
          <p className="text-[1.2rem] italic leading-[1.35] text-foreground md:text-[1.5rem]">
            {dict.quoteStart}{" "}
            <span className="accent-cream">{dict.quoteAccent}</span>
            {dict.quoteEnd}
          </p>
        </blockquote>
      </div>

      {/* "Über mich" box — muted cream surface containing the bio */}
      <div className="mx-auto mt-14 max-w-3xl px-6 sm:px-8 md:mt-20 lg:px-12">
        <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
          <span aria-hidden className="h-px w-8 bg-accent" />
          {dict.eyebrow}
        </p>

        <div className="rounded-2xl bg-muted p-8 md:p-12">
          {/* Self-introduction */}
          <p className="max-w-xl text-base leading-[1.7] text-foreground md:text-[1.05rem]">
            {dict.intro}
          </p>

          {/* Vita paragraph */}
          <p className="mt-5 max-w-xl text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
            {dict.vita}
          </p>

          {/* Memberships line */}
          <p className="mt-7 font-display text-[0.7rem] uppercase tracking-[0.22em] text-accent">
            {dict.memberships}
          </p>

          {/* CTA */}
          <div className="mt-8">
            <Link
              href={href}
              className="group inline-flex items-center gap-2 border-b-[1.5px] border-foreground/40 pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground"
            >
              {dict.cta}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
