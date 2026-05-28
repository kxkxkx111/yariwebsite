/**
 * Central theme configuration.
 *
 * Change values here to retheme the entire site. Hot-reload picks
 * up changes immediately. See THEMING.md for usage notes.
 *
 * To swap fonts, edit `app/fonts.ts` instead — Next.js requires
 * font imports to be statically analyzable.
 */
export const theme = {
  colors: {
    /** Page background — dominant surface color */
    background: "#FFFFFF",
    /** Primary text color (also default CTA background) */
    foreground: "#1A1A1A",
    /** Brand accent — used in headline accent words, hover states, decorative borders */
    accent: "#DCAC83",
    /** Deep dark — used for footer background, CTA bands on light pages */
    deep: "#141414",
  },
  typography: {
    /**
     * Heading weight applied to all H1, H2, H3 across the site.
     * 300=Light, 400=Regular, 500=Medium, 600=Semibold, 700=Bold, 800=ExtraBold
     */
    headingWeight: 600,
    /** Body text weight */
    bodyWeight: 400,
    /** Letter-spacing on big display headlines (in em). Negative = tighter. */
    headingTracking: -0.02,
  },
} as const;

export type Theme = typeof theme;
