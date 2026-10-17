// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://www.vanessamarely.dev/",
  base: "/",
  redirects: {
    "/posts": "/blog/",
  },
  devToolbar: {
    enabled: false,
  },
});
