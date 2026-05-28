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
  trailingSlash: false,
};

export default nextConfig;
