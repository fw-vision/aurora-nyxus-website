# ADR 0001 - Static hosting on GitHub Pages

## Status
Accepted

## Context
Aurora Nyxus needs a credibility website, early-stage, low cost, easy to hand
to collaborators (Ben, Salar) and AI agents. No backend requirements at launch;
contact is mailto.

## Decision
Static Astro build deployed to GitHub Pages via `.github/workflows/deploy.yml`
(bun-based). Custom domain via `public/CNAME` (auroranyxus.com).

## Consequences
- No server, no runtime cost, trivial to deploy on push to `main`.
- Contact is mailto only (no form backend); intentional (keeps first contact off third-party form services).
- Interactive pieces are client-side React islands, not server-rendered.
