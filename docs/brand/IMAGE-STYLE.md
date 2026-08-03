# Aurora Nyxus - Hardware Image Style Bible

Locked visual language for all product figures. Every generated or commissioned
shot must match this seed. Reject frames that break it; regenerate rather than
ship "almost."

Reference class: Oxide Computer product photography. Precision engineering,
dark studio, restrained status LEDs. Not gamer RGB.

## Master style seed (paste into every prompt)

```
Precision-engineering product photography of AI compute hardware, Oxide Computer
aesthetic. Near-black seamless studio background matching #0a0c10. Matte charcoal
and black metal chassis with subtle brushed aluminum accents, no chrome bling.
Soft key light from upper-left, gentle falloff, thin hairline reflections,
dust-free clean-room seriousness. Shallow depth of field on detail shots;
three-quarter angle on full units. Status LEDs only (no RGB fans, no neon,
no cyberpunk haze). No readable brand logos on chassis (no NVIDIA, DGX, Dell,
or invented wordmarks). No crypto motifs. Photoreal restrained CGI / studio
photograph, high detail, professional hardware catalog look.
```

## Track accents (status LEDs only)

| Track | LED colour | Hex | Use |
|-------|------------|-----|-----|
| Workstations (Track 1) | Aurora green | `#3ff5a5` | Primary hero, chain pairs, chassis detail |
| Mesh Compute (Track 2) | Aurora violet | `#a06bff` | Mesh pair hero |
| Shared telemetry | Signal cyan | `#34d2ff` | Port indicators sparingly |

## Forbidden

- RGB gamer aesthetic, rainbow fans, neon wallpaper, cyberpunk haze
- Literal crypto motifs, coin imagery, circuit-board mandalas
- Fake readable logos on chassis
- Bright white labs, lifestyle / smiling-engineer stock
- Purple-on-white SaaS look; cream/terracotta brochure look
- Busy collage or floating UI stickers over hardware

## Formats and paths

| Role | Aspect | Path pattern |
|------|--------|--------------|
| Hero plates | 16:9 | `public/images/hardware/fig-01-hero-workstation.webp` |
| Track headers | 4:3 | same folder, descriptive names |
| Detail / mesh | 4:3 or 1:1 | `fig-0N-*.webp` |

## Consistency technique

1. Generate Fig. 01 first; approve materials and grade.
2. Use Fig. 01 as the reference image for Figs. 02-06.
3. Reuse this master style seed verbatim; only change the subject sentence.
4. Real photography later drops into the same filenames and crops.

## Shot list

| File | Subject | Track |
|------|---------|-------|
| `fig-01-hero-workstation.webp` | Single premium AI workstation, three-quarter, green status LED | Workstations |
| `fig-02-chain-pair.webp` | Two identical units with interconnect cable suggestion | Workstations |
| `fig-03-chassis-detail.webp` | Dense chassis close-up: cooling, ports, hairline panel gaps | Shared |
| `fig-04-mesh-pair.webp` | Dissimilar nodes cabling together, violet LED | Mesh |
| `fig-05-interconnect.webp` | High-speed interconnect / cabling macro | Shared |
| `fig-06-bench-build.webp` | Restrained bench / build scene, tools minimal, no clutter | Shared |
| `hero-bg-workstation.webp` | Full-bleed home / workstations hero field | Workstations |
| `hero-bg-mesh.webp` | Full-bleed mesh-compute hero field | Mesh |
| `hero-bg-macro.webp` | Full-bleed macro hero for detail / segment pages | Shared |

## Public presentation

Do not show "Fig. N" captions on the live site. Filenames keep the fig- prefix for asset inventory only.
