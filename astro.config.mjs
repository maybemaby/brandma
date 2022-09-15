import { defineConfig } from "astro/config";
import {
  presetUno,
  presetAttributify,
  presetIcons,
  presetWebFonts,
} from "unocss";
import Unocss from "@unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    Unocss({
      presets: [
        presetAttributify(),
        presetUno(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
        presetWebFonts({
          fonts: {
            sans: "DM Sans",
            serif: "DM Serif Display",
            mono: "DM Mono",
          },
        }),
      ],
      shortcuts: [
        [
          "a-link",
          "hover:text-primary-d focus:text-primary-d focus:ring focus:ring-blue-500 focus:ring-2 text-base transition cursor-pointer rounded-sm p-1",
        ],
      ],
      theme: {
        colors: {
          primary: "#3b82f6",
          "primary-d": "#2563eb",
          "primary-l": "#60a5fa",
          accent: "#10b981",
          "accent-d": "#059669",
          "accent-l": "#34d399",
        },
      },
    }),
  ],
});
