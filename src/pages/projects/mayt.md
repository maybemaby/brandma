---
layout: ../../layouts/ProjectLayout.astro
title: Mayt
preview: mayt-preview.jpg
intro: "Mayt is a self hosted site for powering up Youtube video organization. This project was motivated by my desire for a way to organize music I listen to on Youtube. Features tagging, pinning, and playlists that are searchable."
links:
  source: https://github.com/maybemaby/mayt
  live: https://mayt.vercel.app/
tags:
  - Next.js
  - React
  - Typescript
  - Postgresql
  - Prisma
meta:
  description: "Self hosted site project for organizing a Youtube video collection." 
---

### Goals
  - Support organization of Youtube videos based on tags, playlists, and pins.
  - Provide an embedded Youtube player on the website that supports user made playlists.
### Challenges
  - Figuring out how to manage modal state in a scalable way.
  - Optimizing web page metrics for thumbnail heavy pages.

### Things I Learned
  - Using the compound component pattern to compose components into one that fulfills a single task.
  - Use React Query to manage remote state coming from the backend.
  - Implementing infinite scrolling grids/lists.