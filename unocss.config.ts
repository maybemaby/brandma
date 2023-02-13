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
    [
      "primary-gradient",
      {
        ["background"]: `linear-gradient(
          45deg,
          hsl(217deg 65% 59%) 9%,
          hsl(218deg 63% 57%) 32%,
          hsl(218deg 61% 56%) 39%,
          hsl(219deg 59% 54%) 44%,
          hsl(219deg 57% 53%) 47%,
          hsl(220deg 55% 52%) 51%,
          hsl(220deg 54% 50%) 55%,
          hsl(221deg 55% 49%) 60%,
          hsl(222deg 56% 47%) 68%,
          hsl(222deg 57% 46%) 98%
        );`,
      },
    ],
  ],
  theme: {
    colors: {
      primary: "#3b82f6",
      primaryd: "#1d4ed8",
      "primary-dark": "#1d4ed8",
      "primary-light": "#60a5fa",
      accent: "#10b981",
      "accent-d": "#059669",
      "accent-l": "#34d399",
      "primary-gradient": `
      linear-gradient(
        45deg,
        hsl(217deg 91% 60%) 9%,
        hsl(217deg 77% 55%) 34%,
        hsl(217deg 66% 51%) 43%,
        hsl(217deg 63% 47%) 49%,
        hsl(217deg 64% 43%) 54%,
        hsl(217deg 64% 39%) 58%,
        hsl(217deg 65% 35%) 62%,
        hsl(217deg 66% 31%) 67%,
        hsl(217deg 67% 27%) 74%,
        hsl(217deg 69% 24%) 93%
      );`,
    },
  },
});
