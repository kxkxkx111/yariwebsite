import type { ReactNode } from "react";

/**
 * Cream-accent helper for display headlines.
 *
 * Wraps the first whitespace-delimited token of `line` in a `<span>` with the
 * `.accent-cream` class (cream `#E8E2DC` text + faint caramel text-shadow).
 * The rest of the line stays in the inherited foreground colour.
 *
 * Per brief: cream-on-white only works at ≥64px display sizes — call sites
 * are responsible for using this only on the largest hero/section headlines.
 * The cream word is decorative emphasis only; the line still parses as a
 * full sentence if the cream colour disappears on certain monitors.
 */
export function accentFirstWord(line: string): ReactNode {
  const trimmed = line.trimStart();
  const match = trimmed.match(/^(\S+)(\s+)(.*)$/);
  if (!match) {
    return <span className="accent-cream">{trimmed}</span>;
  }
  const [, first, gap, rest] = match;
  return (
    <>
      <span className="accent-cream">{first}</span>
      {gap}
      {rest}
    </>
  );
}

/**
 * Wrap a specific substring of `line` in the cream accent class.
 * Falls back to plain text if the substring isn't found.
 */
export function accentWord(line: string, word: string): ReactNode {
  const idx = line.indexOf(word);
  if (idx === -1) return line;
  return (
    <>
      {line.slice(0, idx)}
      <span className="accent-cream">{word}</span>
      {line.slice(idx + word.length)}
    </>
  );
}
