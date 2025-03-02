// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://vanessamarely.site/",
  base: "/",
  devToolbar: {
    enabled: false,
  },
  // Enable React to support React JSX components.
  integrations: [
    react({
      include: ["**/react/*"],
    }),
    tailwind(),
  ],
});
