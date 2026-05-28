"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * ChronicleButton
 * ---------------
 * Editorial CTA used by the ServicesGrid section. The original `_inspiration`
 * file imported this component from a sibling we never had; we ship our own
 * implementation that matches the brand:
 *
 *   - Caramel fill (`bg-primary`) with white text by default
 *   - Hover transitions to a darker taupe (`bg-accent`) — text stays white
 *   - Subtle scale + translate-y on hover, capped at 1.02
 *   - Optional `href` makes it a `<Link>`, otherwise it's a `<button>`
 *   - Honors `prefers-reduced-motion`
 *
 * The API surface mirrors the original signature so the existing call sites in
 * the inspiration files would work unchanged.
 */
export type ChronicleButtonProps = {
  text: string;
  onClick?: () => void;
  href?: string;
  hoverColor?: string;
  hoverForeground?: string;
  borderRadius?: string;
  fontFamily?: string;
  customBackground?: string;
  customForeground?: string;
  className?: string;
  ariaLabel?: string;
  showArrow?: boolean;
};

export function ChronicleButton({
  text,
  onClick,
  href,
  hoverColor,
  hoverForeground,
  borderRadius,
  fontFamily,
  customBackground,
  customForeground,
  className,
  ariaLabel,
  showArrow = true,
}: ChronicleButtonProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const baseStyle: CSSProperties = {
    backgroundColor: hovered
      ? hoverColor ?? "var(--accent)"
      : customBackground ?? "var(--primary)",
    color: hovered
      ? hoverForeground ?? "var(--accent-foreground)"
      : customForeground ?? "var(--primary-foreground)",
    borderRadius: borderRadius ?? "var(--radius-sm)",
    fontFamily,
  };

  const transition = reduce
    ? { duration: 0.001 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  const inner = (
    <motion.span
      className={cn(
        "relative inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em]",
        "transition-shadow will-change-transform",
        "shadow-[0_8px_24px_-16px_rgba(51,51,51,0.35)]",
        "hover:shadow-[0_14px_36px_-16px_rgba(51,51,51,0.5)]",
        className,
      )}
      style={baseStyle}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      whileHover={reduce ? undefined : { y: -1, scale: 1.015 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={transition}
    >
      {text}
      {showArrow && (
        <ArrowRight
          aria-hidden
          className={cn(
            "h-4 w-4 transition-transform",
            hovered ? "translate-x-0.5" : "",
          )}
        />
      )}
    </motion.span>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className="inline-flex focus-visible:outline-none"
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex focus-visible:outline-none"
    >
      {inner}
    </button>
  );
}
