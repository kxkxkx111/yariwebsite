/**
 * Font configuration.
 *
 * To swap a font:
 * 1. Change the `next/font/google` import name below
 *    (any font from https://fonts.google.com is fair game)
 * 2. Replace the call below — preserve the `variable` name so the
 *    rest of the site keeps working
 * 3. Keep the weights array aligned with what you actually use in
 *    `lib/theme.ts.typography`
 */
import { Geist, Inter, Sacramento } from "next/font/google";

/** Body font — used for all text and headings by default.
 *  The `variable` name is referenced by the Tailwind v4 `--font-sans`
 *  token in `app/globals.css`. If you rename it, update that file too. */
export const fontSans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans-face",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/** Display font — used for hyper-large accent numbers, eyebrow tags.
 *  Pairs with the Tailwind `--font-display` token. */
export const fontDisplay = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-face",
  weight: ["800", "900"],
  display: "swap",
});

/** Script / cursive font — used for headline ornaments like the hero
 *  "im Herzen von" Schnörkel-treatment. Pairs with the `font-script`
 *  utility class defined in `app/globals.css`. */
export const fontScript = Sacramento({
  subsets: ["latin", "latin-ext"],
  variable: "--font-script-face",
  weight: ["400"],
  display: "swap",
});
