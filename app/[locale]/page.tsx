import { notFound } from "next/navigation";
import Script from "next/script";
import { HeroSection } from "@/components/site/hero-section";
import { ServicesGrid } from "@/components/site/services-grid";
import { HomeCarousel } from "@/components/site/home-carousel";
import { HomeTech } from "@/components/site/home-tech";
import { HomeAudience } from "@/components/site/home-audience";
import { HomeAboutTeaser } from "@/components/site/home-about-teaser";
import { HomeFaq } from "@/components/site/home-faq";
import { HomeReviews } from "@/components/site/home-reviews";
import { HomeInstagram } from "@/components/site/home-instagram";
import { HomeReels } from "@/components/site/home-reels";
import { CtaPortraitBand } from "@/components/site/cta-portrait-band";
import { MapSection } from "@/components/site/map-section";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site-config";
import { pages, path } from "@/lib/routes";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  // JSON-LD: Physician + MedicalBusiness + Person on the homepage.
  // TODO: confirm opening hours with client — current value is a placeholder.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Physician", "MedicalBusiness"],
    "@id": `${siteConfig.url}#practice`,
    name: `${siteConfig.legalName} — ${siteConfig.address.practice}`,
    legalName: siteConfig.legalName,
    description: dict.site.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.assets.heroPortrait}`,
    logo: `${siteConfig.url}${siteConfig.assets.logoMono}`,
    medicalSpecialty: "PlasticSurgery",
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.latitude,
      longitude: siteConfig.coordinates.longitude,
    },
    sameAs: [siteConfig.social.instagram.url],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    availableLanguage: ["de", "en"],
  };

  return (
    <>
      <Script
        id="ld-physician"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection locale={locale} dict={dict.hero} />
      <HomeAboutTeaser
        locale={locale}
        dict={dict.home.aboutTeaser}
        href={path(pages.about, locale)}
      />
      <HomeReviews locale={locale} dict={dict.home.reviews} />
      <ServicesGrid locale={locale} dict={dict.services} />
      <HomeReels locale={locale} dict={dict.home.reels} />
      <HomeCarousel locale={locale} dict={dict.home.carousel} />
      <HomeTech locale={locale} dict={dict.home.tech} />
      <HomeAudience locale={locale} dict={dict.home.audienceSplit} />
      <HomeFaq locale={locale} dict={dict.home.faq} />
      <HomeInstagram locale={locale} dict={dict.home.instagram} />
      <CtaPortraitBand locale={locale} dict={dict.ctaPortrait} />
      <MapSection locale={locale} dict={dict.map} />
    </>
  );
}
