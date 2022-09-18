---
layout: ../../layouts/ProjectLayout.astro
title: Actionable
preview: actionable-preview.jpg
intro: "Actionable is a website for generating Github Actions workflows interactively. I built the site to help beginners start
with CI/CD without having to learn the whole syntax upfront. Filling out the fields progressively builds the workflow."
links:
  source: https://github.com/maybemaby/actionable
  live: https://actionable-beta.vercel.app/
tags: 
  - Next.js
  - React
  - Typescript
  - Github Actions
meta:
  description: Project for generating Github Actions workflows interactively.
---
### Goals
  - Make the user experience of creating CI/CD workflows simple for beginners.
  - Minimize Javascript bundle size (Below 120kb).
### Challenges
  - Deciding how to manage state so it's translatable to Github Action YAML syntax. 
  - Creating an input for an arbitrary number of keys and values.

### Things I Learned
  - Utilize lazy loading and code splitting to reduce initial load.
  - How JSON data structure translates to YAML.
  - Greater understanding of the Github Actions platform.