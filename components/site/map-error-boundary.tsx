"use client";

import { Component, type ReactNode } from "react";
import { MapPin } from "lucide-react";

type Props = {
  children: ReactNode;
  fallbackTitle?: string;
  address?: string;
  fallbackLabel?: string;
};
type State = { hasError: boolean };

/**
 * Guards the MapLibre map against WebGL-init failures.
 * Without this, headless browsers and very old devices throw uncaught runtime
 * errors and Next.js shows the dev error overlay. In production this also
 * produces a graceful fallback for real users.
 */
export class MapErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[MapErrorBoundary] Map failed to initialise:", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="img"
          aria-label={this.props.fallbackLabel ?? "Map unavailable"}
          className="flex h-full w-full flex-col items-center justify-center gap-4 bg-secondary px-6 py-12 text-center"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MapPin className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="font-sans text-lg font-light text-foreground">
              {this.props.fallbackTitle ?? "Standort"}
            </p>
            {this.props.address && (
              <p className="mt-1 text-sm text-muted-foreground">
                {this.props.address}
              </p>
            )}
            <p className="mt-3 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              {this.props.fallbackLabel ?? "Map unavailable"}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
