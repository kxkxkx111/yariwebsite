import type { NextConfig } from "next";

/**
 * Subpath deployment toggle.
 *
 * For local dev: `BASE_PATH` undefined → site serves at "/".
 * For staging on vorschau.beauty-full.de/dryary/: set `BASE_PATH=/dryary`
 * before `npm run build` so all asset, image and route URLs include the
 * prefix. The proxy.ts locale rewrites pre-prefix-aware (see lib/i18n/config).
 */
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  // With a basePath, the Caddy reverse-proxy redirects `/dryary` → `/dryary/`
  // (so the asset paths resolve). If Next.js then strips that trailing slash
  // (the default), the redirect bounces back to /dryary and creates an
  // infinite loop. Keep the slash on subpath deploys.
  trailingSlash: basePath ? true : false,
  images: {
    // When a basePath is set, the built-in image optimizer fetches assets via
    // an absolute internal HTTP URL that does NOT include the basePath, which
    // 404s for files in /public/. `unoptimized: true` renders <Image> as a
    // direct <img> with the basePath-prefixed src and skips the optimizer.
    // Files are already sized + compressed during the asset pipeline.
    unoptimized: basePath ? true : false,
  },
};

export default nextConfig;
