import { defineConfig } from "astro/config";
import {
  presetUno,
  presetAttributify,
  presetIcons,
  presetWebFonts,
} from "unocss";
import Unocss from "@unocss/astro";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://brandma.dev",
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "dracula",
      langs: ["css", "jsx", "js", "ts", "tsx"],
    },
  },
  integrations: [Unocss(), sitemap()],
});
