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
| Islands | `@astrojs/react` for the two interactive widgets (MeshTopology, BreakEvenCalculator) |
| Vite | Pinned via `overrides: { "vite": "npm:vite@^7.1.5" }` |
| Dependencies | Standalone - no private packages. Self-contained public repo. |
| Hosting | GitHub Pages (static) via `.github/workflows/deploy.yml` (bun) |
| Package manager | bun |

## Directory map

```
src/
  layouts/Main.astro          Nav (Workstations/Sovereign/Why Owned/About/Contact) + partnerships banner + footer
  pages/
    index.astro               Home: hero "Compute you own", two doors, mesh widget, spec/build/own, break-even widget, why-us, CTA
    workstations.astro        Door 1 hub: spec matrix, 3 segment links, what-you-get
    sovereign.astro           Door 2 hub: problem/answer, 3 segment links, process, DAI Compute partnership
    why-owned.astro           Break-even widget + owned-vs-rented argument
    about.astro               Origin (customer zero), conviction, values
    contact.astro             mailto + brand business cards (Ben/Francis/Salar/general)
    workstations/
      research-labs.astro     Segment landing (labs)
      quant-finance.astro     Segment landing (funds/trading)
      studios.astro           Segment landing (creative/media)
    sovereign/
      government.astro        Segment landing (public sector / dual-use)
      indigenous-data.astro   Segment landing (Indigenous data sovereignty)
      enterprise.astro        Segment landing (regulated finance/health)
  components/
    Wordmark.astro            Aurora + Nyxus (aurora-accent)
    PageHeader.astro          Eyebrow + title + lede + optional glow / fig label
    FeatureCard, StepCard, Placeholder, SpecTable, PartnersBanner
    BusinessCard.astro        Dark precision-engineering card (mailto/tel), aurora accent rule
    widgets/
      MeshTopology.tsx        Animated node -> two-node mesh -> cluster (React island, client:visible)
      BreakEvenCalculator.tsx Owned-vs-rented calculator, seeded with real numbers (React island)
  styles/global.css           Aurora design tokens (@theme), gradient, glow, dot-grid, fig/mono helpers
public/
  CNAME (auroranyxus.com), robots.txt, favicon.svg (aurora arc over nexus)
docs/                         brand/ (DESIGN, voice), adr/, strategy/ (positioning), plans/ (gitignored)
```

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
