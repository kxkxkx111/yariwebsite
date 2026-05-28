import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

/** Official Instagram gradient glyph (orange → pink → purple radial gradient). */
function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
    >
      <defs>
        <radialGradient
          id="ig-gradient"
          cx="0.3"
          cy="1"
          r="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.05" stopColor="#fdf497" />
          <stop offset="0.45" stopColor="#fd5949" />
          <stop offset="0.6" stopColor="#d6249f" />
          <stop offset="0.9" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5.5"
        ry="5.5"
        fill="url(#ig-gradient)"
      />
      <path
        d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.92a3.12 3.12 0 1 1 0-6.24 3.12 3.12 0 0 1 0 6.24Z"
        fill="#fff"
      />
      <circle cx="17.6" cy="6.4" r="1.15" fill="#fff" />
    </svg>
  );
}

export type InstagramDict = {
  eyebrow: string;
  title: string;
  cta: string;
};

const tiles = [
  "/instagram/post-1.jpg",
  "/instagram/post-2.jpg",
  "/instagram/post-3.jpg",
  "/instagram/post-4.jpg",
  "/instagram/post-5.jpg",
  "/instagram/post-6.jpg",
];

export function HomeInstagram({
  locale,
  dict,
}: {
  locale: Locale;
  dict: InstagramDict;
}) {
  return (
    <section
      lang={locale}
      aria-labelledby="instagram-heading"
      className="bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {dict.eyebrow}
            </p>
            <h2
              id="instagram-heading"
              className="font-sans text-[1.9rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[2.4rem]"
            >
              {accentFirstWord(dict.title)}
            </h2>
          </div>
          <a
            href={siteConfig.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border-b-[1.5px] border-foreground/40 pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground"
          >
            <InstagramGlyph className="h-5 w-5" />
            {dict.cta}
          </a>
        </div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {tiles.map((src, i) => (
            <li
              key={src}
              className="group aspect-square overflow-hidden rounded-sm"
            >
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteConfig.social.instagram.handle} — Post ${i + 1}`}
                className="relative block h-full w-full"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 16vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30"
                >
                  <InstagramGlyph className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
