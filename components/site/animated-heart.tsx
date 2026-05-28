"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * AnimatedHeart — SVG heart that draws itself in when scrolled into view.
 *
 * Uses `pathLength` (framer-motion's stroke-dash animation) to draw the
 * heart outline, then fades in a subtle fill. Honours prefers-reduced-motion
 * by showing the final state immediately.
 *
 * Inherits `color` via `currentColor` so it picks up whatever text color
 * surrounds it (e.g. the caramel accent on the hero headline).
 */
export function AnimatedHeart({
  className,
  fillOnComplete = true,
  duration = 1.4,
  delay = 0.2,
}: {
  className?: string;
  fillOnComplete?: boolean;
  duration?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 32 28"
      className={className}
      aria-hidden
      style={{ display: "inline-block", verticalAlign: "-0.12em" }}
    >
      {/* Outline — pen-drawn cursive heart, single stroke */}
      <motion.path
        d="M16 25 C 6 18, 1 11, 5 5 C 8.5 0.5, 14 2, 16 7 C 18 2, 23.5 0.5, 27 5 C 31 11, 26 18, 16 25 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration, ease: [0.22, 1, 0.36, 1], delay }
        }
      />

      {/* Optional soft fill that fades in after the stroke completes */}
      {fillOnComplete && (
        <motion.path
          d="M16 25 C 6 18, 1 11, 5 5 C 8.5 0.5, 14 2, 16 7 C 18 2, 23.5 0.5, 27 5 C 31 11, 26 18, 16 25 Z"
          fill="currentColor"
          initial={reduce ? { opacity: 0.22 } : { opacity: 0 }}
          whileInView={{ opacity: 0.22 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 0.6,
                  ease: "easeOut",
                  delay: delay + duration * 0.8,
                }
          }
        />
      )}
    </motion.svg>
  );
}
