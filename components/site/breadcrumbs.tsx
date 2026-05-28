import Link from "next/link";
import Script from "next/script";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export type BreadcrumbItem = { label: string; href?: string };

/**
 * Editorial breadcrumb trail.
 *  - Visually quiet — small caps, divider chevrons, muted ink
 *  - Emits BreadcrumbList JSON-LD so Google can show breadcrumbs in results
 *  - Last item is plain text (no link), per WAI/ARIA practice
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${siteConfig.url}${item.href}` : undefined,
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={
        "mx-auto max-w-7xl px-6 pt-8 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground sm:px-8 lg:px-12 " +
        (className ?? "")
      }
    >
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-foreground">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  className="h-3 w-3 text-border"
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
