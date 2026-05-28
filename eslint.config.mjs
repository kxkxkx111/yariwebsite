import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Reference-only files from another project; not part of the build.
    "_inspiration/**",
    // Vendored 3rd-party-ish map wrapper — owns its own ref/state semantics
    // (createPortal into a MapLibre marker DOM node, etc.). Linting it as if
    // it were idiomatic React 19 produces a wave of false positives that
    // would require rewriting the upstream component.
    "components/ui/map.tsx",
  ]),
]);

export default eslintConfig;
