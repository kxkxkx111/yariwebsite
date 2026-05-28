"use client";

import { useSyncExternalStore } from "react";
import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/map";
import { MapErrorBoundary } from "@/components/site/map-error-boundary";
import { siteConfig } from "@/lib/site-config";
import { accentWord } from "@/lib/headline-accent";
import type { Locale } from "@/lib/i18n/config";

type MapDict = {
  eyebrow: string;
  title: string;
  intro: string;
  ariaLabel: string;
  fallbackAlt: string;
  popupBadge: string;
  directionsCta: string;
  routeCta: string;
  contactCard: {
    eyebrow: string;
    addressLabel: string;
    phoneLabel: string;
    whatsappLabel: string;
    emailLabel: string;
  };
};

/**
 * Detect WebGL support without triggering a render cascade.
 * useSyncExternalStore returns false on the server (snapshot for SSR), then
 * picks up the real client-side value on hydration.
 */
function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (canvas.getContext as any)("experimental-webgl")
    );
  } catch {
    return false;
  }
}

const subscribeNoop = () => () => {};

export function MapSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: MapDict;
}) {
  const canRenderMap = useSyncExternalStore(
    subscribeNoop,
    supportsWebGL,
    () => false,
  );

  return (
    <section
      id="praxis"
      aria-labelledby="praxis-heading"
      lang={locale}
      className="bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Heading block */}
        <div className="mb-14 max-w-3xl">
          <p className="mb-5 flex items-center gap-3 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {dict.eyebrow}
          </p>
          <h2
            id="praxis-heading"
            className="font-sans text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl"
          >
            {accentWord(dict.title, locale === "de" ? "Kurfürstendamm" : "Kurfürstendamm")}
          </h2>
          <div className="my-7 h-px w-20 bg-primary" aria-hidden />
          <p className="max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-[1.05rem]">
            {dict.intro}
          </p>
        </div>

        {/* Map + side card */}
        <div
          className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px] lg:gap-8"
          role="region"
          aria-label={dict.ariaLabel}
        >
          <div className="relative h-[440px] w-full overflow-hidden rounded-[4px] border border-border/60 bg-secondary md:h-[560px]">
            <MapErrorBoundary
              fallbackTitle={siteConfig.address.practice}
              address={siteConfig.address.full}
              fallbackLabel={dict.fallbackAlt}
            >
              {canRenderMap ? (
                <Map
                  center={[
                    siteConfig.coordinates.longitude,
                    siteConfig.coordinates.latitude,
                  ]}
                  zoom={14}
                  renderWorldCopies={false}
                  attributionControl={{ compact: true }}
                >
                  <MapMarker
                    longitude={siteConfig.coordinates.longitude}
                    latitude={siteConfig.coordinates.latitude}
                  >
                    <MarkerContent>
                      <div className="relative -translate-y-1/2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-secondary/40">
                          <MapPin className="h-5 w-5" aria-hidden />
                        </div>
                        <div
                          aria-hidden
                          className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-primary"
                        />
                      </div>
                    </MarkerContent>
                    <MarkerPopup offset={28}>
                      <div className="min-w-[240px] p-1">
                        <p className="font-sans text-[1.05rem] font-medium leading-tight text-foreground">
                          {siteConfig.address.practice}
                        </p>
                        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                          {dict.popupBadge}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                          {siteConfig.address.street}
                          <br />
                          {siteConfig.address.postalCode}{" "}
                          {siteConfig.address.city}
                        </p>
                        <a
                          href={siteConfig.directionsHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary hover:text-accent"
                        >
                          {dict.directionsCta} →
                        </a>
                      </div>
                    </MarkerPopup>
                  </MapMarker>
                  <MapControls position="bottom-right" showZoom />
                </Map>
              ) : (
                <div
                  role="img"
                  aria-label={dict.fallbackAlt}
                  className="flex h-full w-full flex-col items-center justify-center gap-4 bg-secondary px-6 py-12 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-sans text-lg font-light text-foreground">
                      {siteConfig.address.practice}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {siteConfig.address.full}
                    </p>
                  </div>
                </div>
              )}
            </MapErrorBoundary>
          </div>

          {/* Contact card */}
          <aside className="flex flex-col justify-between gap-8 rounded-[4px] border border-border/60 bg-secondary p-8 md:p-10">
            <div>
              <p className="mb-4 font-display text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                {dict.contactCard.eyebrow}
              </p>
              <p className="font-sans text-2xl font-light leading-tight tracking-[-0.01em] text-foreground">
                {siteConfig.address.practice}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {siteConfig.legalName}
              </p>

              <dl className="mt-7 space-y-5 text-sm">
                <div className="flex gap-3">
                  <MapPin
                    aria-hidden
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                  />
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {dict.contactCard.addressLabel}
                    </dt>
                    <dd className="mt-1 leading-snug text-foreground">
                      {siteConfig.address.street}
                      <br />
                      {siteConfig.address.postalCode}{" "}
                      {siteConfig.address.city}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone
                    aria-hidden
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                  />
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {dict.contactCard.phoneLabel}
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={siteConfig.contact.phoneHref}
                        className="text-foreground hover:text-primary"
                      >
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MessageCircle
                    aria-hidden
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                  />
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {dict.contactCard.whatsappLabel}
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={siteConfig.contact.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary"
                      >
                        {siteConfig.contact.whatsappDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail
                    aria-hidden
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                  />
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {dict.contactCard.emailLabel}
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={siteConfig.contact.emailHref}
                        className="text-foreground hover:text-primary"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <a
              href={siteConfig.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center self-start rounded-[2px] bg-primary px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-all hover:-translate-y-px hover:bg-accent hover:shadow-[0_12px_30px_-14px_rgba(51,51,51,0.45)]"
            >
              {dict.routeCta}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
