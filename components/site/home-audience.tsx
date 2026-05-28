"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { accentFirstWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type AudienceCard = {
  label: string;
  title: string;
  blurb: string;
  cta: string;
  image: string;
  imageAlt: string;
  href: string;
};

export type AudienceSplitDict = {
  eyebrow: string;
  title: string;
  women: AudienceCard;
  men: AudienceCard;
};

/**
 * Audience Split (Women / Men) — text on the left, image-stack-swiper on the
 * right. Drag the top card horizontally; on release past threshold it flies
 * out and the next card snaps into place. The left text block syncs to the
 * active card. Mobile: stacks vertically (text on top).
 */
export function HomeAudience({
  locale,
  dict,
}: {
  locale: Locale;
  dict: AudienceSplitDict;
}) {
  const cards = [dict.women, dict.men];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = cards[activeIndex];
  const next = cards[(activeIndex + 1) % cards.length];

  return (
    <section
      lang={locale}
      aria-labelledby="audience-split-heading"
      className="bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {dict.eyebrow}
          </p>
          <h2
            id="audience-split-heading"
            className="font-sans text-[1.9rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-[2.4rem]"
          >
            {accentFirstWord(dict.title)}
          </h2>
        </div>

        {/* Split: text left, swiper right */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1fr] md:items-center md:gap-16">
          {/* LEFT — syncs to active card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-accent">
                {active.label}
              </p>
              <h3 className="font-sans text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.4rem]">
                {active.title}
              </h3>
              <p className="mt-5 max-w-md text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
                {active.blurb}
              </p>
              <div className="mt-8">
                <Link
                  href={active.href}
                  className="group inline-flex items-center gap-2 border-b-[1.5px] border-foreground/40 pb-1 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground"
                >
                  {active.cta}
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
              {/* Pagination dots */}
              <div className="mt-10 flex gap-2">
                {cards.map((c, i) => (
                  <button
                    key={c.label}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Zeige ${c.label}`}
                    aria-current={i === activeIndex}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeIndex
                        ? "w-8 bg-foreground"
                        : "w-1.5 bg-foreground/30 hover:bg-foreground/60"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT — swiper card stack */}
          <div className="flex items-center justify-center md:justify-end">
            <CardStack
              top={active}
              behind={next}
              onSwiped={() =>
                setActiveIndex((i) => (i + 1) % cards.length)
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CardStack({
  top,
  behind,
  onSwiped,
}: {
  top: AudienceCard;
  behind: AudienceCard;
  onSwiped: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-12, 0, 12]);
  const opacity = useTransform(x, [-300, -120, 0, 120, 300], [0, 0.6, 1, 0.6, 0]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > 500) {
      onSwiped();
    }
  };

  return (
    <div
      className="relative"
      style={{ width: 320, height: 440, perspective: "1000px" }}
    >
      {/* Behind card — static, slightly offset, smaller */}
      <div
        key={`behind-${behind.label}`}
        className="absolute left-1/2 top-1/2 overflow-hidden rounded-2xl shadow-[0_14px_44px_-24px_rgba(91,74,62,0.3)] ring-1 ring-border/50"
        style={{
          width: 320,
          height: 440,
          transform:
            "translate(-50%, -50%) translateY(18px) scale(0.94)",
          zIndex: 1,
        }}
      >
        <Image
          src={behind.image}
          alt=""
          fill
          sizes="320px"
          className="pointer-events-none object-cover"
          draggable={false}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-black/15"
        />
        <p className="absolute bottom-5 left-5 font-display text-[0.7rem] uppercase tracking-[0.24em] text-white/85">
          {behind.label}
        </p>
      </div>

      {/* Top card — draggable */}
      <motion.div
        key={`top-${top.label}`}
        className="absolute left-1/2 top-1/2 cursor-grab overflow-hidden rounded-2xl shadow-[0_22px_70px_-25px_rgba(91,74,62,0.4)] ring-1 ring-border/60 active:cursor-grabbing"
        style={{
          width: 320,
          height: 440,
          x,
          rotate,
          opacity,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 2,
          touchAction: "none",
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        initial={{ x: 0, opacity: 0, scale: 0.95 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ cursor: "grabbing" }}
      >
        <Image
          src={top.image}
          alt={top.imageAlt}
          fill
          sizes="320px"
          priority
          className="pointer-events-none object-cover"
          draggable={false}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
        />
        <p className="absolute bottom-5 left-5 font-display text-[0.7rem] uppercase tracking-[0.24em] text-white">
          {top.label}
        </p>
      </motion.div>
    </div>
  );
}
