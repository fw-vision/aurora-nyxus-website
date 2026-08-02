# ADR 0003 - Two-door information architecture with segment landings

## Status
Accepted

## Context
Aurora Nyxus serves two business lines (workstations, sovereign deployment)
across six distinct buyer personas. A single generic page cannot speak to a
quant desk and an Indigenous data steward with equal force.

## Decision
Two hub pages (Workstations = Door 1, Sovereign = Door 2), each linking to
three dedicated segment landing pages that speak that persona's language and
stakes. Home splits into the two doors immediately after the hero.

- Door 1 landings: research-labs, quant-finance, studios (`/workstations/*`)
- Door 2 landings: government, indigenous-data, enterprise (`/sovereign/*`)

## Consequences
- 12 pages total. Higher content surface, but each buyer sees a page written for them.
- Colour-codes the doors: green for workstations, violet for sovereign, cyan as signal.
- Segment pages are conversion-focused (specific stakes + a tailored CTA).
