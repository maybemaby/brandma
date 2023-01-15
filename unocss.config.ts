import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  presetWebFonts,
} from "unocss";

export default defineConfig({
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
        body: {
          name: "Source Sans Pro",
          weights: ["200", "300", "400", "500"],
        },
      },
    }),
  ],
  shortcuts: [
    [
      "a-link",
      "hover:text-primary-d focus:text-primary-d focus:ring focus:ring-blue-500 focus:ring-2 text-base transition cursor-pointer rounded-sm p-1",
    ],
  ],
  rules: [
    [
      "text-gradient",
      {
        ["background-image"]: `
        linear-gradient(
          120deg,
          hsl(177deg 69% 41%) 0%,
          hsl(177deg 81% 45%) 23%,
          hsl(178deg 93% 50%) 37%,
          hsl(170deg 97% 47%) 52%,
          hsl(152deg 92% 38%) 68%,
          hsl(133deg 88% 28%) 100%
        );`,
        ["-webkit-background-clip"]: "text",
        ["-webkit-text-fill-color"]: "transparent",
        [`background-clip`]: "text",
        ["text-fill-color"]: "transparent",
      },
    ],
  ],
  theme: {
    colors: {
      primary: "#3b82f6",
      "primary-dark": "#1d4ed8",
      "primary-light": "#60a5fa",
      accent: "#10b981",
      "accent-d": "#059669",
      "accent-l": "#34d399",
    },
  },
});
