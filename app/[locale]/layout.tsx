import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { fontSans, fontDisplay, fontScript } from "@/app/fonts";
import { theme } from "@/lib/theme";
import "../globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ThemeProvider } from "@/components/site/theme-provider";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  isLocale,
  localeMeta,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site-config";

/**
 * Theme variables injected onto `:root` at runtime so Tailwind v4 tokens
 * (defined in `app/globals.css`) and component-level CSS can resolve them.
 * Source of truth: `lib/theme.ts`. Edit there, not here.
 */
const themeCss = `:root{
  --theme-bg: ${theme.colors.background};
  --theme-fg: ${theme.colors.foreground};
  --theme-accent: ${theme.colors.accent};
  --theme-deep: ${theme.colors.deep};
  --theme-heading-weight: ${theme.typography.headingWeight};
  --theme-body-weight: ${theme.typography.bodyWeight};
  --theme-heading-tracking: ${theme.typography.headingTracking}em;
}`;

export const viewport: Viewport = {
  themeColor: theme.colors.background,
  width: "device-width",
  initialScale: 1,
};

export const dynamicParams = false;

export function generateStaticParams(): Array<{ locale: Locale }> {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<"/[locale]">,
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const meta = localeMeta[locale];

  const otherLocale: Locale = locale === "de" ? "en" : "de";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.site.title,
      template: `%s | ${siteConfig.brand}`,
    },
    description: dict.site.description,
    applicationName: siteConfig.brand,
    authors: [{ name: siteConfig.legalName }],
    keywords: [
      "Plastische Chirurgie Berlin",
      "Ästhetische Chirurgie",
      "Dr. Pouyan Yary",
      "Capital Aesthetics",
      "Kurfürstendamm Berlin",
      "Plastic Surgery Berlin",
      "Aesthetic Surgery",
    ],
    alternates: {
      canonical: locale === "de" ? "/" : `/${locale}`,
      languages: {
        "de-DE": "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      alternateLocale: localeMeta[otherLocale].ogLocale,
      url: locale === "de" ? siteConfig.url : `${siteConfig.url}/${locale}`,
      siteName: siteConfig.brand,
      title: dict.site.title,
      description: dict.site.description,
      images: [
        {
          url: siteConfig.assets.heroPortrait,
          alt: dict.site.ogAlt,
          width: 1200,
          height: 800,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.title,
      description: dict.site.description,
      images: [siteConfig.assets.heroPortrait],
    },
    robots: { index: true, follow: true },
    other: {
      "format-detection": "telephone=no",
    },
  };
}

/**
 * Root layout — owns `<html>` and `<body>`. The visible URL `/` is rewritten
 * to `/de` by `proxy.ts`, so this layout always handles the actual request.
 */
export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const htmlLang = localeMeta[locale].htmlLang;

  return (
    <html
      lang={htmlLang}
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontScript.variable} h-full antialiased`}
    >
      <head>
        {/* Inject theme variables BEFORE Tailwind globals load so tokens resolve cleanly. */}
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange
        >
          <a href="#main" className="skip-link">
            {dict.skip.toContent}
          </a>
          <SiteHeader locale={locale} dict={dict.header} />
          <main id="main" className="flex flex-1 flex-col">
            {props.children}
          </main>
          <SiteFooter locale={locale} dict={dict.footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
