// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";
import { imagetools } from "vite-imagetools";
import compression from "vite-plugin-compression2";
import netlify from "@netlify/vite-plugin-tanstack-start";
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  plugins: [
    compression(),
    VitePWA(),
    imagetools(),
    netlify(),
  ],
});
