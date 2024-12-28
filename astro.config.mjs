// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  // Enable React to support React JSX components.
  integrations: [
    react({
      include: ["**/react/*"],
    }),
  ],
});
