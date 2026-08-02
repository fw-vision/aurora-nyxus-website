# aurora-nyxus-website

Public website for **Aurora Nyxus** (auroranyxus.com): an independent Canadian
venture that builds premium AI compute workstations and delivers sovereign
on-prem AI systems. Compute you own, on soil you trust.

Part of a Canadian venture group; partners with [DAI Compute](https://daicompute.ca)
on sovereign infrastructure. Early-stage.

## For AI agents

**Read `AGENTS.md` first**, then `docs/brand/DESIGN.md`. Positioning is in
`docs/strategy/positioning.md`. Architecture decisions in `docs/adr/`. Active
visual-finetuning handoffs live in `docs/plans/` (gitignored).

## Stack

- **Astro 5.13** (static output) + **Tailwind 4** (via `@tailwindcss/vite`)
- **React islands** (`@astrojs/react`) for two interactive widgets only
- **Standalone** - no private package dependencies; clones and builds with just `bun install`

## Design

**Dark, precision-engineering** (Oxide Computer reference class) on an aurora
palette: near-black `#0a0c10` canvas with an aurora-green `#3ff5a5` -> cyan
`#34d2ff` -> violet `#a06bff` signature gradient. Space Grotesk + IBM Plex Mono.
Full spec: `docs/brand/DESIGN.md`.

## Pages

Home, Workstations (Door 1) + 3 segment landings (research labs, quant &
finance, studios), Sovereign (Door 2) + 3 segment landings (government,
Indigenous data, enterprise), Why Owned (break-even), About, Contact (mailto +
business cards).

## Develop

```bash
bun install
bunx astro dev      # local dev (do not leave running in agent sessions)
bunx astro build    # verify: exit 0 = compiles
```

Deploys to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`.

## Notes

- Canadian spelling; no em-dashes.
- Public repo: no private information (see the Privacy firewall in `AGENTS.md`).
