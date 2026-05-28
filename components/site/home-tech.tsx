import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type Item = { title: string; blurb: string };

export type TechDict = {
  eyebrow: string;
  title: string;
  intro: string;
  items: {
    vaser: Item;
    renuvion: Item;
    co2: Item;
    ultrasound: Item;
  };
};

/**
 * HomeTech — minimal editorial list of treatment technologies.
 *
 * No icons, no card grid. Four devices rendered as a clean typographic list
 * with numeric markers + hairline dividers, in the spirit of an editorial
 * table of contents.
 */
export function HomeTech({ locale, dict }: { locale: Locale; dict: TechDict }) {
  const items = [
    dict.items.vaser,
    dict.items.renuvion,
    dict.items.co2,
    dict.items.ultrasound,
  ];

  return (
    <section
      lang={locale}
      aria-labelledby="tech-heading"
      className="bg-background py-20 md:py-28 border-t border-border/60"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
          <div>
            <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {dict.eyebrow}
            </p>
            <h2
              id="tech-heading"
              className="font-sans text-[1.9rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[2.4rem]"
            >
              {accentFirstWord(dict.title)}
            </h2>
          </div>
          <p className="max-w-2xl self-end text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
            {dict.intro}
          </p>
        </div>

        {/* Editorial list — no cards, no icons, hairline dividers only */}
        <ul className="mt-14 border-t border-border md:mt-20">
          {items.map((it, i) => (
            <li
              key={i}
              className="grid grid-cols-1 gap-2 border-b border-border py-7 md:grid-cols-[1fr_2fr] md:gap-12 md:py-8"
            >
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden
                  className="font-display text-[0.7rem] uppercase tracking-[0.22em] text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-sans text-[1.25rem] leading-tight tracking-[-0.01em] text-foreground md:text-[1.45rem]">
                  {it.title}
                </h3>
              </div>
              <p className="text-base leading-[1.7] text-muted-foreground md:text-[1.02rem]">
                {it.blurb}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
