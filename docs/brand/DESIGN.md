# Aurora Nyxus - Design Spec (START HERE)

Reference class: **Oxide Computer** (oxide.computer). Precision-engineering
prestige, monospace-forward, dark canvas, engineering-drawing framing. Not
gamer-RGB. Read before any UI work.

## 1. Design posture

- **Dark-first.** Near-black canvas carries the weight; content and accents pop.
- **Engineering seriousness.** Monospace for specs, labels, tickers, captions. "Fig. N" framing on figures. Telemetry-style detail.
- **Terse and confident.** Short lines; big technical numbers as display elements.
- **Aurora signature.** The northern-lights gradient (green -> cyan -> violet) is the one moment of colour drama. Ration it.

## 2. Palette (exact values)

### Canvas + neutrals (dark-first)
- Canvas `#0a0c10` (near-black base)
- Surface `#12151b` (raised panels), Surface-2 `#1a1e26` (cards, inputs)
- Hairline `#262b34` (borders, rules)
- Ink `#f4f6f8` (primary text), Graphite `#aab2bd` (secondary), Muted `#6b747f` (captions)

### Aurora accents (the signature)
- Aurora green `#3ff5a5` - primary accent; workstations, "owned", CTAs
- Aurora violet `#a06bff` - secondary accent; sovereign / Door 2
- Signal cyan `#34d2ff` - telemetry, links, active states, quant segment
- Amber `#ffb547` - rationed warm highlight (premium numeric emphasis)

## 3. Colour language (convention)

- **Green = owned / workstations / build.** **Violet = sovereign / Door 2.** **Cyan = signal / data / quant.**
- The **aurora gradient** (`linear-gradient(100deg, green 0%, cyan 45%, violet 100%)`) is the brand's signature: use in `.aurora-text`, `.aurora-gradient`, and the `.aurora-glow` hero radial. Never wallpaper it.
- Ration warm accents; the dark canvas does the work.

## 4. Typography

- **Display:** Space Grotesk (headlines, wordmark). Tight, confident.
- **Mono:** IBM Plex Mono (specs, labels, tickers, captions, contact blocks, code).
- Currently loaded via Google Fonts `@import` in `global.css`; a `docs/plans/` handoff will self-host.
- **Numerals:** let big technical figures (VRAM, cost, break-even) act as display elements.

## 5. Components (inventory)

- `Wordmark` - Aurora + Nyxus (aurora-accent on "Nyxus").
- `PageHeader` - eyebrow (mono, accent) + display title + lede + optional `.aurora-glow` + `Fig.` label.
- `FeatureCard` - hairline box, mono index, accent-tinted; slot body.
- `StepCard` - numbered process step (Spec/Build/Own).
- `SpecTable` - workload -> GPU/VRAM/memory matrix (the Alpha PC beater; darker, mono).
- `Placeholder` - dashed dot-grid frame; note encodes the build brief.
- `PartnersBanner` - hairline logo grid; DAI Compute anchor; nominative-association note.
- `BusinessCard` - dark precision card, aurora accent rule, mono contact (mailto/tel), `Fig.` label, accent variant per person.
- `widgets/MeshTopology.tsx` - animated node -> two-node mesh -> cluster (SVG + rAF pulse).
- `widgets/BreakEvenCalculator.tsx` - owned-vs-rented sliders, seeded with real numbers.

## 6. Motion

- Restrained. The MeshTopology auto-cycles states (~3.2s) with a pulse travelling the links (~1.6s loop).
- Hover: hairline intensifies, subtle background lift (`hover:bg-surface/40`), links underline.
- Scroll-aware header border. No parallax, no gratuitous animation.

## 7. Content rules that affect design

- Canadian spelling; no em-dashes (restructure).
- No "This is not X; it is Y" negation-then-assertion.
- No crypto-hype, no gamer language ("beast", "rig", RGB).
- Tickers and specs are mono, often uppercase.
- Do not surface Aurora Miniatures or founder ownership anywhere.
- DAI Compute appears only as a named partner (sovereignty + finance), never as owner.
