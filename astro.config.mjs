import { defineConfig } from "astro/config";

// GitHub Pages project-site configuration.
// Site/base are set for https://jamesburney46-cyber.github.io/amazon-fba-training-lab/
// If a custom domain is ever added, remove `base` and update `site`.
export default defineConfig({
  site: "https://jamesburney46-cyber.github.io",
  base: "/amazon-fba-training-lab",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});
