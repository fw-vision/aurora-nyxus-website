# aurora-nyxus-website - Agent Context

> Read by AI coding agents (Cursor, opencode, etc.) on every session. START HERE. Keep concise and current.

## What this project is

The public website for **Aurora Nyxus**, an independent Canadian venture that (1) builds **premium AI compute workstations** and (2) delivers **sovereign on-prem AI deployments**. The workstation line is the revenue and credibility engine; proven builds earn the right to win data-residency-sensitive deployments. Sovereignty and financing are delivered in partnership with **DAI Compute** (daicompute.ca), not owned by this brand.

- **Domain:** auroranyxus.com
- **Posture:** early-stage, incubating. A first-build proof-of-concept underway.

This repository is **public**. Do not include private information (see Privacy firewall below). Brand and content direction come from `docs/brand/` and `docs/strategy/`; do not invent positioning.

## Read next (in this repo)

| Doc | Purpose |
|-----|---------|
| `docs/brand/DESIGN.md` | The design spec. Aurora palette, type, texture, components, motion. Read before UI work. |
| `docs/brand/IMAGE-STYLE.md` | Locked hardware figure style bible + shot list for product imagery. |
| `docs/brand/voice.md` | Voice guidelines (Oxide-register: terse, technical-poetic, confident). |
| `docs/strategy/positioning.md` | Two-door model, competitor differentiation, segment map (public-safe). |
| `docs/adr/` | Architecture decisions (static hosting, standalone stack, two-door IA, aurora-dark theme). |
| `docs/plans/` | Local build-spec prompts / Cursor handoffs for visual finetuning (gitignored, not published). |

## Privacy firewall (critical - public repo)

NEVER surface in this repo or on the site:
- The interim legal vehicle (Aurora Miniatures) or founder ownership split.
- DAI Compute's private aggregator / digital-currency detail. Only the public partnership framing appears.
- Any vault `_journal` / `_legal` content.

Everything web-facing is drawn only from public-safe brand, strategy, and landscape framing.

## Verification (critical)

- **Build:** `bunx astro build` (terminates; exit 0 = compiles). Use bun.
- **Install:** `bun install`. Standalone: no private `@fw-vision/*` packages, no token required.
- **Dev smoke only:** start `bunx astro dev` in a background job, wait ~9s, capture output, kill it. NEVER leave a dev server running - it blocks the session.
- A successful build proves code compiles. Visual verification is manual.

## Tech stack

| Concern | Choice |
|---------|--------|
| Framework | Astro 5.13 (static output) |
| Styling | Tailwind 4 via `@tailwindcss/vite` (CSS `@source`, no JS config) |
| Islands | `@astrojs/react` for the two interactive widgets (MeshTopology, BuildVsRent) |
| Vite | Pinned via `overrides: { "vite": "npm:vite@^7.1.5" }` |
| Dependencies | Standalone - no private packages. Self-contained public repo. |
| Hosting | GitHub Pages (static) via `.github/workflows/deploy.yml` (bun) |
| Package manager | bun |

## Directory map

```
src/
  layouts/Main.astro          Nav (Workstations/Mesh Compute/Why Owned/About/Contact) + partnerships banner (DAICompute wordmark) + footer
  pages/
    index.astro               Home: hero "Compute you own", two TRACKS (Workstations / Mesh Compute), chain-to-scale (premium mesh), spec/build/own, BuildVsRent widget, why-us, CTA
    workstations.astro        Track 1 (premium): GB10/DGX Spark chain-to-scale, spec matrix incl. frontier, 4 segment links
    mesh-compute.astro        Track 2 (sovereign/scrappy): scrappy-by-design mesh, sovereignty case, 2 segment links, DAI Compute partnership
    why-owned.astro           BuildVsRent widget + owned-vs-rented argument (~1yr break-even, honest)
    about.astro               Origin (customer zero), conviction, values
    contact.astro             mailto + brand business cards (Ben/Francis/Salar/general)
    workstations/
      research-labs.astro     Segment (labs)
      quant-finance.astro     Segment (funds/trading)
      studios.astro           Segment (creative/media)
      enterprise.astro        Segment (regulated finance/health) - premium track
    mesh-compute/
      government.astro        Segment (public sector / dual-use)
      indigenous-data.astro   Segment (Indigenous data sovereignty)
  components/
    Wordmark.astro            Aurora + Nyxus (aurora-accent)
    PageHeader, FeatureCard, StepCard, Placeholder, SpecTable, PartnersBanner
    BusinessCard.astro        Dark precision-engineering card (mailto/tel), aurora accent rule
    widgets/
      MeshTopology.tsx        Animated topology, TWO MODES: mode="premium" (chain GB10 units to 405B) | mode="sovereign" (mesh old+new hardware). React island.
      BuildVsRent.tsx         Workload-preset build-vs-cloud estimator with display break-even + 0–36mo timeline. React island.
    Figure.astro               Product image plate + Fig. caption (hardware in public/images/hardware/)
  styles/global.css           Aurora design tokens (@theme), self-hosted fonts, gradient, glow, dot-grid, fig/mono helpers
public/
  images/hardware/ (fig-01…06.webp), fonts/, CNAME, robots.txt, favicon.svg
docs/                         brand/ (DESIGN, IMAGE-STYLE, voice), adr/, strategy/ (positioning), plans/ (gitignored)
```

## Two tracks (important)

The site is organised into two tracks with distinct audiences and narratives. Do NOT mix them:
- **Workstations (Track 1, green):** premium, high-performance, scalable. GB10 / DGX Spark, chain units over ConnectX-7 for 405B-class frontier models (GLM 5.2, DeepSeek v4). "Meshing as scaling up." Segments: labs, quant, studios, enterprise.
- **Mesh Compute (Track 2, violet):** scrappy, sovereign, resourceful. Mesh old + new hardware into owned Canadian capacity. Physical custody, CLOUD-Act-free. Segments: government, Indigenous data. The "scrappy-by-design" narrative lives HERE, not on Workstations.

## Colour language

- **Aurora green `#3ff5a5`** = primary accent, workstations / "owned". **Aurora violet `#a06bff`** = sovereign / Door 2. **Signal cyan `#34d2ff`** = telemetry, links, quant. **Amber `#ffb547`** = rationed premium highlight.
- Near-black `#0a0c10` canvas; `#f4f6f8` / `#aab2bd` text; `#262b34` hairline.
- The **aurora gradient** (green -> cyan -> violet) is the signature; ration it (hero accents, key rules).

## Working guidelines

1. **Dark-first, precision-engineering.** Oxide reference class. No RGB gamer aesthetic, no "beast/rig" language.
2. **Terse, confident, honest copy.** Short lines; let specs and numbers carry weight. Name tradeoffs.
3. **Canadian spelling; no em-dashes** (restructure the sentence). No "This is not X; it is Y".
4. **Mono for specs/labels/tickers;** display sans for headlines.
5. **Astro islands** only where interactive (the two widgets are `client:visible`).
6. **Placeholders are intentional** - `<Placeholder>` frames encode the next build brief.
7. **Partnerships:** DAI Compute is named as the sovereignty/finance partner. Keep it partnership framing, never ownership.

## Active build work

All 12 pages and both widgets are built. Next passes (see `docs/plans/`): self-hosted fonts, real hardware photography, logo refinement, and any additional interactive dataviz. Visual finetuning is handed to Cursor via `docs/plans/`.
