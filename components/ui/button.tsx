"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button
 * ------
 * Minimal, theme-aware Button primitive used by the centered hero and
 * any future component that needs a generic CTA element with size+variant
 * presets. Token-driven — never hardcodes color hex values.
 *
 *   - `default` variant: foreground bg / background text (classic dark CTA)
 *   - `outline` variant: transparent bg with hairline border, foreground text
 *   - `ghost` variant: no border, hover background fill
 *   - `sizes`: sm / default / lg
 *
 * If `href` is provided, renders as a Next.js `<Link>` so client-side
 * navigation works out of the box. Otherwise renders as a `<button>`.
 *
 * The `asChild` shorthand is intentionally NOT supported — the chronicle-button
 * stays as the editorial CTA, this one is for utility cases.
 */
const buttonVariants = cva(
  // base — typography rhythm, focus ring, motion, layout
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] font-sans text-sm font-medium tracking-[0.01em] transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--foreground)] text-[var(--background)] shadow-[0_8px_24px_-16px_rgba(0,0,0,0.35)] hover:-translate-y-px hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] hover:shadow-[0_14px_36px_-16px_rgba(0,0,0,0.5)]",
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:-translate-y-px hover:border-[var(--foreground)] hover:bg-[var(--brand-off-white)]",
        ghost:
          "bg-transparent text-[var(--foreground)] hover:bg-[var(--brand-off-white)]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-12 px-7 text-[0.95rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant, size, href, type, children, ...props },
    ref,
  ) {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (href) {
      // The `<Link>` accepts the same a11y / event props we pass through.
      // We intentionally do not forward `ref` to Link (it expects HTMLAnchor).
      return (
        <Link
          href={href}
          className={classes}
          aria-label={props["aria-label"]}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export { buttonVariants };
