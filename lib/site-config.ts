// Single source of truth for brand, contact, address, social.
// Locale-specific copy lives in lib/i18n/messages/{de,en}.json.
// Tokens/colors live in app/globals.css.

export const siteConfig = {
  brand: "Dr. Yary",
  legalName: "Dr. med. Pouyan Yary",
  profession: {
    de: "Facharzt für Plastische, Rekonstruktive und Ästhetische Chirurgie",
    en: "Specialist in Plastic, Reconstructive and Aesthetic Surgery",
  },
  domain: "dryary.de",
  url: "https://dryary.de",
  coordinates: {
    longitude: 13.3157,
    latitude: 52.5009,
  },
  address: {
    practice: "Capital Aesthetics",
    street: "Kurfürstendamm 188",
    postalCode: "10707",
    city: "Berlin",
    country: "Deutschland",
    full: "Capital Aesthetics, Kurfürstendamm 188, 10707 Berlin",
  },
  contact: {
    phone: "+49 30 88914580",
    phoneDisplay: "+49 30 88914580",
    phoneHref: "tel:+493088914580",
    whatsapp: "+49 176 499 97 499",
    whatsappDisplay: "+49 176 499 97 499",
    whatsappHref: "https://wa.me/4917649997499",
    email: "info@dryary.de",
    emailHref: "mailto:info@dryary.de",
  },
  social: {
    instagram: {
      handle: "@dr.yary",
      url: "https://instagram.com/dr.yary",
    },
  },
  assets: {
    logoMono: "/brand/logo-mono-surgery.png",
    heroPortrait: "/portraits/dr-yary-hero-v3.jpg",
    heroPortraitAlt: "/portraits/dr-yary-hero-alt.jpg",
    /** Praxis-Innenhof (Frederike Wetzels Shoot 13.05.2025, #1313) */
    praxisBuilding: "/environment/praxis-building.jpg",
  },
  // Google Maps directions builder (uses lat,lng for accuracy)
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=52.5009,13.3157",
} as const;

export type SiteConfig = typeof siteConfig;
