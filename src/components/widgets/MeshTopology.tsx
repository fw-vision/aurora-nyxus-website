import { useEffect, useRef, useState } from "react";

/**
 * MeshTopology - animated topology visual, two modes.
 *
 * mode="premium" (Workstations): chaining identical GB10 / DGX Spark units to
 *   scale to bigger models. Single unit -> 2-unit ConnectX-7 chain (405B) ->
 *   larger cluster. The premium "add hardware to scale up" story.
 *
 * mode="sovereign" (Mesh Compute): meshing heterogeneous old + new hardware
 *   into owned Canadian capacity. The scrappy sovereignty story.
 *
 * SVG + requestAnimationFrame pulse on the links. React island (client:visible).
 */

type Node = { id: string; x: number; y: number; label: string; vram: string };
type Mode = "premium" | "sovereign";

const PREMIUM: { name: string; nodes: Node[]; links: [number, number][] }[] = [
  {
    name: "One GB10 unit - up to 200B",
    nodes: [{ id: "a", x: 200, y: 130, label: "GB10", vram: "128 GB" }],
    links: [],
  },
  {
    name: "Chain two - up to 405B",
    nodes: [
      { id: "a", x: 140, y: 130, label: "GB10", vram: "128 GB" },
      { id: "b", x: 260, y: 130, label: "GB10", vram: "128 GB" },
    ],
    links: [[0, 1]],
  },
  {
    name: "Scale the cluster",
    nodes: [
      { id: "a", x: 200, y: 70, label: "GB10", vram: "128 GB" },
      { id: "b", x: 110, y: 150, label: "GB10", vram: "128 GB" },
      { id: "c", x: 290, y: 150, label: "GB10", vram: "128 GB" },
      { id: "d", x: 200, y: 220, label: "GB10", vram: "128 GB" },
    ],
    links: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [0, 3],
    ],
  },
];

const SOVEREIGN: { name: string; nodes: Node[]; links: [number, number][] }[] = [
  {
    name: "Node A - proof of concept",
    nodes: [{ id: "a", x: 200, y: 130, label: "RTX 5090", vram: "24 GB" }],
    links: [],
  },
  {
    name: "Two-node mesh",
    nodes: [
      { id: "a", x: 130, y: 110, label: "RTX 5090", vram: "24 GB" },
      { id: "b", x: 290, y: 160, label: "6900 XT", vram: "16 GB" },
    ],
    links: [[0, 1]],
  },
  {
    name: "Meshed cluster",
    nodes: [
      { id: "a", x: 200, y: 70, label: "5090", vram: "24 GB" },
      { id: "b", x: 90, y: 150, label: "5090", vram: "24 GB" },
      { id: "c", x: 310, y: 150, label: "6900 XT", vram: "16 GB" },
      { id: "d", x: 150, y: 220, label: "RX 580", vram: "8 GB" },
      { id: "e", x: 260, y: 220, label: "RX 580", vram: "8 GB" },
    ],
    links: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 4],
      [0, 3],
      [0, 4],
    ],
  },
];

export default function MeshTopology({ mode = "sovereign" }: { mode?: Mode }) {
  const STATES = mode === "premium" ? PREMIUM : SOVEREIGN;
  const accent = mode === "premium" ? "var(--color-aurora-green)" : "var(--color-aurora-violet)";
  const caption =
    mode === "premium"
      ? "Start with one GB10 unit, chain a second over ConnectX-7 for 405B-class models, then scale the cluster. Add hardware as the models grow."
      : "Mesh old and new hardware into usable capacity. Start with one node, prove the mesh, scale the cluster. Different models on different nodes, one addressable pool.";

  const [state, setState] = useState(0);
  const [pulse, setPulse] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const cycle = setInterval(() => {
      setState((s) => (s + 1) % STATES.length);
    }, 3200);
    return () => clearInterval(cycle);
  }, [STATES.length]);

  useEffect(() => {
    let start: number | null = null;
    const loop = (t: number) => {
      if (start === null) start = t;
      setPulse(((t - start) / 1600) % 1);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const current = STATES[state];

  return (
    <div class="border border-hairline bg-surface/40 p-5">
      <div class="mb-3 flex items-center justify-end">
        <p class="font-mono text-xs" style={{ color: accent }}>{current.name}</p>
      </div>
      <svg
        viewBox="0 0 400 280"
        class="h-auto w-full"
        role="img"
        aria-label={`Topology: ${current.name}`}
      >
        {current.links.map(([a, b], i) => {
          const na = current.nodes[a];
          const nb = current.nodes[b];
          const px = na.x + (nb.x - na.x) * pulse;
          const py = na.y + (nb.y - na.y) * pulse;
          return (
            <g key={`l-${mode}-${state}-${i}`}>
              <line
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="var(--color-hairline)"
                strokeWidth={1}
              />
              <circle cx={px} cy={py} r={2.5} fill="var(--color-signal)" />
            </g>
          );
        })}
        {current.nodes.map((n) => (
          <g key={`n-${mode}-${state}-${n.id}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r={26}
              fill="var(--color-surface-2)"
              stroke={accent}
              strokeWidth={1.5}
            />
            <text
              x={n.x}
              y={n.y - 2}
              textAnchor="middle"
              fill="var(--color-ink)"
              style={{ font: "500 10px var(--font-mono)" }}
            >
              {n.label}
            </text>
            <text
              x={n.x}
              y={n.y + 11}
              textAnchor="middle"
              fill={accent}
              style={{ font: "400 8px var(--font-mono)" }}
            >
              {n.vram}
            </text>
          </g>
        ))}
      </svg>
      <p class="mt-3 text-xs leading-relaxed text-muted">{caption}</p>
    </div>
  );
}
