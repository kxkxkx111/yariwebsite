import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import {
  pages,
  treatments,
  minimalInvasive,
  treatmentsHub,
  minimalInvasiveHub,
  type RouteEntry,
} from "@/lib/routes";

// Single sitemap for both locales, with hreflang alternates per entry.
// Priorities:
//   1.0 — homepage
//   0.9 — treatments hub / about / contact
//   0.85 — individual treatment pages
//   0.7 — for-women / for-men / academy / booking
//   0.4 — legal pages
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entry = (
    e: RouteEntry,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ): MetadataRoute.Sitemap[number] => ({
    url: `${siteConfig.url}${e.de}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        "de-DE": `${siteConfig.url}${e.de}`,
        en: `${siteConfig.url}${e.en}`,
        "x-default": `${siteConfig.url}${e.de}`,
      },
    },
  });

  const items: MetadataRoute.Sitemap = [
    entry(pages.home, 1.0, "weekly"),
    entry(treatmentsHub, 0.9, "monthly"),
    entry(minimalInvasiveHub, 0.9, "monthly"),
    entry(pages.about, 0.9, "yearly"),
    entry(pages.contact, 0.9, "yearly"),
    entry(pages.booking, 0.7, "monthly"),
    entry(pages.forWomen, 0.7, "monthly"),
    entry(pages.forMen, 0.7, "monthly"),
    entry(pages.academy, 0.7, "monthly"),
    ...(Object.values(treatments) as RouteEntry[]).map((r) =>
      entry(r, 0.85, "monthly"),
    ),
    ...(Object.values(minimalInvasive) as RouteEntry[]).map((r) =>
      entry(r, 0.85, "monthly"),
    ),
    entry(pages.impressum, 0.4, "yearly"),
    entry(pages.datenschutz, 0.4, "yearly"),
  ];

  // Also publish EN URLs as primary entries so they're indexable directly.
  const enItems: MetadataRoute.Sitemap = items.map((it) => {
    const enLink = it.alternates?.languages?.en;
    if (typeof enLink !== "string") return it;
    return { ...it, url: enLink };
  });

  // Deduplicate by URL.
  const seen = new Set<string>();
  return [...items, ...enItems].filter((it) => {
    if (seen.has(it.url)) return false;
    seen.add(it.url);
    return true;
  });
}
