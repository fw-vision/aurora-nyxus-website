import { useState } from "react";

/**
 * BreakEvenCalculator - the honest owned-vs-rented model. User sets monthly
 * cloud spend + build cost + monthly electricity; widget shows break-even
 * month and 3-year delta. Defaults seeded from the real meeting numbers
 * (~$5K/mo Bedrock, ~$10.5K build, ~10-month break-even). React island.
 */

function fmt(n: number) {
  return n.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
}

export default function BreakEvenCalculator() {
  const [cloud, setCloud] = useState(5000);
  const [build, setBuild] = useState(10500);
  const [power, setPower] = useState(120);

  const monthlySaving = Math.max(cloud - power, 0);
  const breakEven = monthlySaving > 0 ? build / monthlySaving : Infinity;
  const threeYearCloud = cloud * 36;
  const threeYearOwned = build + power * 36;
  const threeYearDelta = threeYearCloud - threeYearOwned;

  return (
    <div className="border border-hairline bg-surface/40 p-6">
      <div className="mb-5 flex items-center justify-between">
        <p className="fig-label">Fig. 2 — Owned vs rented</p>
        <p className="font-mono text-xs text-aurora-green">
          {Number.isFinite(breakEven)
            ? `~${breakEven.toFixed(1)} months to break even`
            : "adjust inputs"}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field
          label="Cloud spend / mo"
          value={cloud}
          set={setCloud}
          min={0}
          max={20000}
          step={100}
        />
        <Field
          label="Build cost (one-time)"
          value={build}
          set={setBuild}
          min={2000}
          max={40000}
          step={500}
        />
        <Field
          label="Electricity / mo"
          value={power}
          set={setPower}
          min={0}
          max={1000}
          step={10}
        />
      </div>

      <div className="mt-6 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
        <Stat label="Monthly saving" value={fmt(monthlySaving)} accent />
        <Stat
          label="3-yr rented"
          value={fmt(threeYearCloud)}
        />
        <Stat
          label="3-yr owned"
          value={fmt(threeYearOwned)}
        />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-graphite">
        Over three years, owning saves{" "}
        <span className="font-mono font-medium text-aurora-green">
          {fmt(Math.max(threeYearDelta, 0))}
        </span>{" "}
        versus renting. Defaults are the real numbers behind Aurora Nyxus: about
        {" "}
        {fmt(5000)}/mo of cloud inference, a build near {fmt(10500)}, and
        Ontario power. You pay a premium once. You stop renting forever.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  set,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  set: (n: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <label className="block">
      <span className="mono-label block text-graphite">{label}</span>
      <span className="mt-1 block font-mono text-lg font-medium text-ink">
        {fmt(value)}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--color-aurora-green)]"
        aria-label={label}
      />
    </label>
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
    <div className="bg-surface p-4">
      <p className="mono-label text-muted">{label}</p>
      <p
        className={`mt-1 font-mono text-lg font-medium ${
          accent ? "text-aurora-green" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
