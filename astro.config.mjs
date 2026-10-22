// @ts-check
import { defineConfig } from "astro/config";

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
  devToolbar: {
    enabled: false,
  },
});
