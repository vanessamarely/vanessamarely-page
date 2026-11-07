// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.vanessamarely.dev/",
  base: "/",
  redirects: {
    "/posts": "/blog/",
  },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Each page lists its Spanish and English versions (hreflang)
      i18n: { defaultLocale: "es", locales: { es: "es-CO", en: "en-US" } },
      filter: (page) => !/\/(404|posts)\/?$/.test(page),
    }),
  ],
  devToolbar: {
    enabled: false,
  },
});
