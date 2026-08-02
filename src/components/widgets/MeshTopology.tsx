import { useEffect, useRef, useState } from "react";

/**
 * MeshTopology - animated proof-of-concept visual of the Aurora Nyxus
 * two-node mesh scaling toward a meshed cluster. Auto-cycles between three
 * states: single node -> two-node mesh -> meshed cluster. SVG + requestAnimationFrame
 * pulse on the links. React island (client:visible).
 */

type Node = { id: string; x: number; y: number; label: string; vram: string };

const STATES: { name: string; nodes: Node[]; links: [number, number][] }[] = [
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

export default function MeshTopology() {
  const [state, setState] = useState(0);
  const [pulse, setPulse] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const cycle = setInterval(() => {
      setState((s) => (s + 1) % STATES.length);
    }, 3200);
    return () => clearInterval(cycle);
  }, []);

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
    <div className="border border-hairline bg-surface/40 p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="fig-label">Fig. 1 — Meshed capacity</p>
        <p className="font-mono text-xs text-aurora-green">{current.name}</p>
      </div>
      <svg
        viewBox="0 0 400 280"
        className="h-auto w-full"
        role="img"
        aria-label={`Mesh topology: ${current.name}`}
      >
        {/* links */}
        {current.links.map(([a, b], i) => {
          const na = current.nodes[a];
          const nb = current.nodes[b];
          const px = na.x + (nb.x - na.x) * pulse;
          const py = na.y + (nb.y - na.y) * pulse;
          return (
            <g key={`l-${state}-${i}`}>
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
        {/* nodes */}
        {current.nodes.map((n) => (
          <g key={`n-${state}-${n.id}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r={26}
              fill="var(--color-surface-2)"
              stroke="var(--color-aurora-green)"
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
              fill="var(--color-aurora-green)"
              style={{ font: "400 8px var(--font-mono)" }}
            >
              {n.vram}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Mesh old and new hardware into usable capacity. Start with one node,
        prove the mesh, scale the cluster. Different models on different nodes,
        one addressable pool.
      </p>
    </div>
  );
}
