---
layout: ../../layouts/ProjectLayout.astro
title: Brandon's Simple Themer
preview: themer-preview.png
intro: "I built this simple utility site in a few hours to fill a simple need to create color palettes that translate to CSS variables. Other online tools like Coolor or Material Design were frequently overly complex for my needs and didn't export to a format I liked. I used Preact
to keep the bundle size smaller."
links:
  source: https://github.com/maybemaby/my-themer
  live: https://brandons-themer.netlify.app
tags: 
  - Preact
  - Typescript
meta:
  description: Project for generating simple CSS color themes.
---

### Goals
- Create a utility that will save me the time of copy pasting color codes manually from existing theming sites.
- Create something quickly and simply over a weekend.

### Challenges
- Not many! This one was pretty straightforward.

### Things I Learned
- Never used Preact before this, but it was very simple and close to React.
- While I settled on using react-colorful as a color picker, I used the browser dev tools to learn how a color picker could be made from scratch.