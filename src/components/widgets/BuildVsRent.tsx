import { useState } from "react";

/**
 * BuildVsRent - model/workload-driven build-vs-cloud estimator.
 *
 * Anchors to realistic workload presets: each preset ties a monthly token
 * volume to the Bedrock rate for a representative model AND the local build
 * required to serve it. Break-even typically lands near ~12 months at steady
 * 24/7-style use.
 */

type Preset = {
  id: string;
  label: string;
  blurb: string;
  cloudPerMTok: number;
  baseMonthlyMTok: number;
  build: { name: string; cost: number; watts: number };
  track: "Workstations" | "Mesh Compute";
};

const PRESETS: Preset[] = [
  {
    id: "agentic-small",
    label: "Agentic fleet (small models)",
    blurb: "Qwen3 / DeepSeek R1-distill class. Nightly automation, tool-calling.",
    cloudPerMTok: 0.35,
    baseMonthlyMTok: 900,
    build: { name: "RTX 5090 node", cost: 11000, watts: 500 },
    track: "Workstations",
  },
  {
    id: "chat-mid",
    label: "Chat / RAG (mid models)",
    blurb: "DeepSeek v3.2 class. Multi-user inference, retrieval.",
    cloudPerMTok: 1.4,
    baseMonthlyMTok: 400,
    build: { name: "GB10 / DGX Spark single", cost: 8500, watts: 240 },
    track: "Workstations",
  },
  {
    id: "frontier",
    label: "Frontier (405B class)",
    blurb: "GLM 5.2 / DeepSeek v4 class. Chain two GB10 units via ConnectX-7.",
    cloudPerMTok: 9.0,
    baseMonthlyMTok: 120,
    build: { name: "GB10 x2 chain (up to 405B)", cost: 16500, watts: 480 },
    track: "Workstations",
  },
  {
    id: "sovereign-mesh",
    label: "Sovereign mesh (mixed)",
    blurb: "Meshed old + new hardware for owned Canadian capacity.",
    cloudPerMTok: 1.4,
    baseMonthlyMTok: 500,
    build: { name: "Meshed node cluster", cost: 12500, watts: 900 },
    track: "Mesh Compute",
  },
];

const USAGE = [
  { id: "light", label: "Light", mult: 0.4 },
  { id: "steady", label: "Steady", mult: 1 },
  { id: "heavy", label: "Heavy 24/7", mult: 2.2 },
];

const ELEC_PER_KWH = 0.1;
const TIMELINE_MONTHS = 36;

function fmt(n: number) {
  return n.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
}

export default function BuildVsRent() {
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [usageId, setUsageId] = useState("heavy");
  const [routing, setRouting] = useState(false);

  const preset = PRESETS.find((p) => p.id === presetId)!;
  const usage = USAGE.find((u) => u.id === usageId)!;

  const monthlyMTok = preset.baseMonthlyMTok * usage.mult;
  const routingFactor = routing && preset.cloudPerMTok > 1 ? 0.55 : 1;
  const effectiveCloudRate = preset.cloudPerMTok * routingFactor;
  const monthlyCloud = monthlyMTok * effectiveCloudRate;
  const hoursPerMonth = 730 * usage.mult;
  const monthlyPower =
    (preset.build.watts / 1000) * hoursPerMonth * ELEC_PER_KWH;
  const monthlySaving = monthlyCloud - monthlyPower;
  const breakEven =
    monthlySaving > 0 ? preset.build.cost / monthlySaving : Infinity;

  const threeYearCloud = monthlyCloud * 36;
  const threeYearOwned = preset.build.cost + monthlyPower * 36;
  const threeYearDelta = threeYearCloud - threeYearOwned;

  const beMonths = Number.isFinite(breakEven) ? breakEven : null;
  const beClamped =
    beMonths === null ? null : Math.min(Math.max(beMonths, 0), TIMELINE_MONTHS);
  const bePct =
    beClamped === null ? null : (beClamped / TIMELINE_MONTHS) * 100;

  const beHeadline =
    beMonths === null
      ? "—"
      : beMonths > 36
        ? `${beMonths.toFixed(0)}`
        : beMonths.toFixed(1);

  const beSub =
    beMonths === null
      ? "no break-even at this volume"
      : beMonths > 36
        ? "months (long)"
        : "months to break even";

  return (
    <div class="border border-hairline bg-surface/40 p-6">
      <div class="mb-5 flex justify-end">
        <p class="font-mono text-xs text-aurora-green">
          {beMonths === null
            ? beSub
            : `~${beHeadline} ${beSub}`}
        </p>
      </div>

      {/* Display break-even + timeline */}
      <div class="mb-6 border border-hairline bg-canvas/60 p-5">
        <p class="mono-label text-muted">Break-even</p>
        <div class="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span class="font-display text-5xl font-semibold tracking-tight text-aurora-green sm:text-6xl">
            {beHeadline}
          </span>
          <span class="font-mono text-sm text-graphite">{beSub}</span>
        </div>
        <div class="mt-5">
          <div class="relative h-px bg-hairline">
            {bePct !== null && (
              <span
                class="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-aurora-green bg-aurora-green/80"
                style={{ left: `${bePct}%` }}
                title={`~${beHeadline} mo`}
              />
            )}
          </div>
          <div class="mt-2 flex justify-between font-mono text-[10px] text-muted">
            <span>0 mo</span>
            <span>12</span>
            <span>24</span>
            <span>36 mo</span>
          </div>
        </div>
        <p class="mt-4 font-mono text-sm text-ink">
          3-yr delta{" "}
          <span class="text-aurora-green">
            {fmt(Math.max(threeYearDelta, 0))}
          </span>
          <span class="text-muted"> owned vs cloud</span>
        </p>
      </div>

      {/* Workload preset */}
      <div class="mb-5">
        <p class="mono-label mb-2 text-graphite">Workload</p>
        <div class="grid gap-2 sm:grid-cols-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPresetId(p.id)}
              class={`border p-3 text-left transition-colors ${
                p.id === presetId
                  ? "border-aurora-green/60 bg-aurora-green/10"
                  : "border-hairline bg-surface hover:border-graphite/40"
              }`}
            >
              <span class="font-display text-sm font-medium text-ink">
                {p.label}
              </span>
              <span class="mt-0.5 block font-mono text-[10px] text-muted">
                {p.track}
              </span>
              <span class="mt-1 block text-xs leading-snug text-graphite">
                {p.blurb}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Usage intensity */}
      <div class="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="mono-label mb-2 text-graphite">Usage</p>
          <div class="inline-flex border border-hairline">
            {USAGE.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setUsageId(u.id)}
                class={`px-4 py-2 font-mono text-xs transition-colors ${
                  u.id === usageId
                    ? "bg-aurora-green/15 text-aurora-green"
                    : "text-graphite hover:text-ink"
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>
        <label class="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={routing}
            onChange={(e) => setRouting(e.target.checked)}
            class="accent-[var(--color-aurora-green)]"
          />
          <span class="font-mono text-xs text-graphite">
            Intelligent routing (delegate light tasks to small models)
          </span>
        </label>
      </div>

      {/* Build + volume readout */}
      <div class="mb-5 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
        <div class="bg-surface p-4">
          <p class="mono-label text-muted">Recommended build</p>
          <p class="mt-1 font-display text-sm font-medium text-ink">
            {preset.build.name}
          </p>
          <p class="mt-0.5 font-mono text-lg font-medium text-aurora-green">
            {fmt(preset.build.cost)}
          </p>
        </div>
        <div class="bg-surface p-4">
          <p class="mono-label text-muted">Estimated volume</p>
          <p class="mt-1 font-mono text-sm text-graphite">
            ~{monthlyMTok.toLocaleString("en-CA")}M tokens / month
          </p>
          <p class="mt-0.5 font-mono text-xs text-muted">
            @ {fmt(effectiveCloudRate)}/1M blended cloud
          </p>
        </div>
      </div>

      {/* Result grid */}
      <div class="grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
        <Stat label="Cloud / mo" value={fmt(monthlyCloud)} />
        <Stat label="Owned / mo (power)" value={fmt(monthlyPower)} accent />
        <Stat
          label="3-yr saving"
          value={fmt(Math.max(threeYearDelta, 0))}
          accent
        />
      </div>

      <p class="mt-4 text-sm leading-relaxed text-graphite">
        At <span class="font-mono text-ink">{usage.label.toLowerCase()}</span>{" "}
        usage, this workload{" "}
        {beMonths === null ? (
          <>does not break even at this volume</>
        ) : (
          <>
            breaks even in{" "}
            <span class="font-mono text-aurora-green">
              ~{beHeadline} months
            </span>
          </>
        )}
        , then keeps saving. Owning turns a variable cloud bill into a fixed
        cost plus cheap Ontario power. You pay a premium once; you stop renting
        forever.
      </p>

      <p class="mt-3 text-xs text-muted">
        Estimate. Cloud rates: AWS Bedrock on-demand, US regions (DeepSeek v3.2
        {" "}$0.62/$1.85 per 1M; frontier proxied to Claude Sonnet 5 standard
        {" "}$3/$15). Build costs in CAD include Aurora Nyxus margin over ~$6K GB10
        retail. Power at Ontario ~$0.10/kWh. Real numbers depend on your exact
        model, context length, throughput, and duty cycle. We quote from your
        actual workload.
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div class="bg-surface p-4">
      <p class="mono-label text-muted">{label}</p>
      <p
        class={`mt-1 font-mono text-lg font-medium ${
          accent ? "text-aurora-green" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
