import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

const site = process.env.SITE_URL;

export default defineConfig({
  output: "static",
  site,
  integrations: [react(), ...(site ? [sitemap()] : [])],
  scopedStyleStrategy: "where",
});
