import { fir } from "./waterfall-scene";

const v = (name: string) => `var(--scene-${name})`;
const H = 150;

function ridge(width: number, base: number, amp: number, step: number, phase: number) {
  let d = `M0 ${base}`;
  for (let x = step, i = 1; x <= width + step; x += step, i++) {
    const y = base - amp * (0.5 + 0.5 * Math.sin(i * 1.7 + phase)) + (i % 2 ? amp * 0.35 : 0);
    d += `L${Math.min(x, width)} ${Math.round(y * 10) / 10}`;
  }
  return `${d}V${H}H0Z`;
}

function treesFor(width: number) {
  const edge = [
    { dx: 24, h: 110, w: 46, layer: "forest-1" },
    { dx: 58, h: 78, w: 34, layer: "forest-2" },
    { dx: 92, h: 60, w: 28, layer: "forest-3" },
  ];
  const left = edge.map((t) => ({ x: t.dx, ...t }));
  const right = edge.map((t) => ({ x: width - t.dx, ...t }));
  const extra =
    width > 600
      ? [0.2, 0.3, 0.68, 0.8].map((f, i) => ({ x: Math.round(width * f), h: 54 + (i % 2) * 18, w: 26 + (i % 2) * 6, layer: "forest-3" }))
      : [];
  return [...left, ...extra, ...right];
}

export function MenuLandscape({ className = "h-auto", width = 420 }: { className?: string; width?: number }) {
  const cx = width / 2;
  const trees = treesFor(width);

  return (
    <svg
      viewBox={`0 0 ${width} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={`scene block w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect width={width} height={H} style={{ fill: v("sky-2") }} />
      <path d={ridge(width, 74, 40, 60, 0)} style={{ fill: v("far") }} />
      <path d={ridge(width, 98, 30, 70, 2)} style={{ fill: v("mid") }} />
      <path d={`M${cx - 64} 62L${cx - 18} 58L${cx - 10} 118L${cx - 72} 122Z`} style={{ fill: v("rock") }} />
      <path d={`M${cx + 18} 58L${cx + 62} 64L${cx + 72} 122L${cx + 12} 118Z`} style={{ fill: v("rock") }} />
      <path d={`M${cx - 18} 58L${cx + 18} 58L${cx + 24} 124L${cx - 24} 124Z`} style={{ fill: v("water-2") }} />
      <g style={{ stroke: v("foam") }} strokeLinecap="round" fill="none">
        {[-14, -4, 6, 15].map((off, i) => (
          <path
            key={off}
            className="scene-fall"
            d={`M${cx + off} 58L${cx + off * 1.4} 124`}
            strokeWidth={2}
            strokeDasharray="20 33"
            style={{ animationDuration: `${1 + i * 0.15}s` }}
          />
        ))}
      </g>
      <path d={`M0 126Q${cx} 110 ${width} 126V${H}H0Z`} style={{ fill: v("pool") }} />
      <ellipse className="scene-mist" cx={cx} cy="124" rx="56" ry="10" style={{ fill: v("mist"), opacity: 0.8 }} />
      {trees.map((t) => (
        <path key={`${t.x}-${t.h}`} d={fir(t.x, H, t.h, t.w)} style={{ fill: v(t.layer) }} />
      ))}
    </svg>
  );
}
