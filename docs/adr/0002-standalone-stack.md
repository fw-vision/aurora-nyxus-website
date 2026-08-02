# ADR 0002 - Standalone stack (no private packages)

## Status
Accepted

## Context
Sibling FW.VISION sites (daicompute-website, syncidlabs-website) consume private
GitHub Packages (`@fw-vision/web-kit`, `@fw-vision/widgets`), which require a
`GITHUB_TOKEN_FWVISION` PAT to install. This repo is public and shared with
co-founders (Ben, Salar) who may not have that token.

## Decision
Build Aurora Nyxus standalone: Astro 5 + Tailwind 4 + React islands, with no
`@fw-vision/*` dependencies. All components and both widgets are self-contained
in this repo.

## Consequences
- `git clone` + `bun install` + `bunx astro build` works with no auth.
- Design tokens live in `src/styles/global.css` (not imported from web-kit); the aurora palette is defined here.
- Slight duplication of patterns that web-kit would provide, accepted for portability and public-repo cleanliness.
