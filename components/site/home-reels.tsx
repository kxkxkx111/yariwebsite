"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type Reel = {
  src: string;
  poster: string;
  caption?: string;
};

export type ReelsDict = {
  eyebrow: string;
  title: string;
  intro?: string;
  items: Reel[];
  /** ARIA label for the scroller, e.g. "Reels, horizontal scrollbar" */
  scrollerLabel: string;
  /** "Vorheriges Reel" / "Previous reel" */
  prevLabel: string;
  /** "Nächstes Reel" / "Next reel" */
  nextLabel: string;
};

/**
 * Home Reels — horizontal 9:16 video carousel.
 *
 * Ported from the Shopify "Ultima UGC Videos" liquid section. Behaviour:
 *   - Cards in 9:16 aspect, peek layout (next/prev cards' edges visible).
 *   - IntersectionObserver: video plays muted while visible, pauses when not.
 *   - Click on the active card toggles unmute + play/pause.
 *   - Keyboard ←/→ scrolls one card at a time.
 *   - CSS scroll-snap for native mobile swipe.
 */
export function HomeReels({
  locale,
  dict,
}: {
  locale: Locale;
  dict: ReelsDict;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [unmuted, setUnmuted] = useState<Record<number, boolean>>({});

  /* IntersectionObserver — play visible video muted, pause out-of-view */
  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(
            (entry.target as HTMLElement).dataset.index ?? -1,
          );
          const video = videoRefs.current[idx];
          if (!video) return;
          if (entry.isIntersecting && entry.intersectionRatio > 0.65) {
            setActiveIndex(idx);
            video.play().catch(() => {});
          } else {
            video.pause();
            // Reset to muted when scrolling away
            if (!entry.isIntersecting) {
              video.muted = true;
              setUnmuted((u) => ({ ...u, [idx]: false }));
            }
          }
        });
      },
      { root, threshold: [0.65] },
    );

    const cards = root.querySelectorAll(".reel-card");
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [dict.items.length]);

  /* Keyboard ←/→ */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!trackRef.current) return;
      if (
        document.activeElement &&
        !trackRef.current.contains(document.activeElement)
      )
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollBy(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollBy(1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const scrollBy = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".reel-card");
    if (!card) return;
    const gap = parseFloat(
      getComputedStyle(track).getPropertyValue("column-gap") || "16",
    );
    const delta = (card.offsetWidth + gap) * direction;
    track.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  const handleCardClick = useCallback((idx: number) => {
    const video = videoRefs.current[idx];
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      setUnmuted((u) => ({ ...u, [idx]: true }));
      video.play().catch(() => {});
    } else if (!video.paused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section
      lang={locale}
      aria-labelledby="reels-heading"
      className="bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {dict.eyebrow}
            </p>
            <h2
              id="reels-heading"
              className="font-sans text-[1.9rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[2.4rem]"
            >
              {accentFirstWord(dict.title)}
            </h2>
            {dict.intro ? (
              <p className="mt-4 text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
                {dict.intro}
              </p>
            ) : null}
          </div>

          {/* Prev/Next */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label={dict.prevLabel}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label={dict.nextLabel}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Track — full-bleed scroller */}
      <ul
        ref={trackRef}
        aria-label={dict.scrollerLabel}
        className="reels-track hide-scrollbar grid snap-x snap-mandatory grid-flow-col gap-4 overflow-x-auto pb-3"
        style={{
          gridAutoColumns: "min(72vw, 280px)",
          paddingInline: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
          scrollPaddingInline: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
          // @ts-expect-error CSS custom prop
          "--gap": "1rem",
        }}
      >
        {dict.items.map((reel, i) => {
          const isActive = i === activeIndex;
          const isUnmuted = unmuted[i] ?? false;
          return (
            <li
              key={reel.src}
              data-index={i}
              className="reel-card group relative aspect-[9/16] snap-start overflow-hidden rounded-2xl bg-black ring-1 ring-border/30 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <button
                type="button"
                onClick={() => handleCardClick(i)}
                aria-label={
                  isUnmuted
                    ? `Reel ${i + 1} stummschalten`
                    : `Reel ${i + 1} mit Ton abspielen`
                }
                className="block h-full w-full focus-visible:outline-none"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={reel.src}
                  poster={reel.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              </button>

              {/* Bottom gradient */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              />

              {/* Mute indicator (top-right) */}
              <div className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground backdrop-blur-sm">
                {isUnmuted ? (
                  <Volume2 className="h-4 w-4" aria-hidden />
                ) : (
                  <VolumeX className="h-4 w-4" aria-hidden />
                )}
              </div>

              {/* Active indicator (small play/pause) — bottom-left */}
              {isActive && (
                <div className="pointer-events-none absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-foreground backdrop-blur-sm">
                  <Play className="h-4 w-4 fill-current" aria-hidden />
                </div>
              )}

              {/* Optional caption */}
              {reel.caption ? (
                <p className="absolute inset-x-3 bottom-14 line-clamp-2 text-[0.78rem] font-medium leading-snug text-white">
                  {reel.caption}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
