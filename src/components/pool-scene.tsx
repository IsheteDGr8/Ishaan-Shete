import { useId } from "react";
import { fir, frond } from "./waterfall-scene";

const v = (name: string) => `var(--scene-${name})`;
const W = 420;
const H = 220;
const WATER = 150;
const MIRROR = 156;

type Column = { x: number; w: number; top: number; base: number; moss?: boolean; joints?: number[] };

const columns: Column[] = [
  { x: 246, w: 26, top: 84, base: 146, joints: [104, 126] },
  { x: 270, w: 24, top: 72, base: 146, moss: true, joints: [96, 120] },
  { x: 292, w: 28, top: 88, base: 146, joints: [110] },
  { x: 318, w: 24, top: 102, base: 146, moss: true, joints: [124] },
  { x: 340, w: 26, top: 114, base: 146 },
  { x: 230, w: 28, top: 114, base: 156, moss: true, joints: [134] },
  { x: 256, w: 30, top: 100, base: 156, joints: [120, 140] },
  { x: 284, w: 26, top: 120, base: 156, joints: [138] },
  { x: 308, w: 30, top: 128, base: 156, moss: true },
  { x: 336, w: 24, top: 136, base: 156 },
  { x: 358, w: 20, top: 142, base: 156 },
];

function column({ x, w, top, base, moss, joints = [] }: Column) {
  const d = Math.round(w * 0.2);
  const a = x + w * 0.25;
  const b = x + w * 0.75;
  const e = x + w;
  return (
    <g key={`${x}-${top}`}>
      <path d={`M${x} ${top}L${a} ${top + d}V${base}H${x}Z`} style={{ fill: v("rock-shade") }} />
      <path d={`M${a} ${top + d}H${b}V${base}H${a}Z`} style={{ fill: v("rock") }} />
      <path d={`M${b} ${top + d}L${e} ${top}V${base}H${b}Z`} style={{ fill: v("rock-hi"), opacity: 0.75 }} />
      <path
        d={`M${x} ${top}L${a} ${top - d}H${b}L${e} ${top}L${b} ${top + d}H${a}Z`}
        style={{ fill: moss ? v("moss") : v("rock-hi") }}
      />
      {moss ? (
        <path
          d={`M${x} ${top}L${a} ${top + d}H${b}L${e} ${top}V${top + 5}L${b} ${top + d + 6}L${(a + b) / 2} ${top + d + 3}L${a} ${top + d + 7}L${x} ${top + 4}Z`}
          style={{ fill: v("moss") }}
        />
      ) : null}
      {joints.map((y) => (
        <path key={y} d={`M${x} ${y - 2}L${a} ${y}H${b}L${e} ${y - 2}`} fill="none" strokeWidth={1} style={{ stroke: v("rock-shade") }} />
      ))}
    </g>
  );
}

function Rocks() {
  return (
    <g>
      {columns.map(column)}
      <path d="M38 160C34 132 58 106 94 102C128 98 160 112 170 136C174 148 172 156 168 160Z" style={{ fill: v("rock") }} />
      <path d="M94 104C124 101 152 114 162 132L132 126L108 114Z" style={{ fill: v("rock-hi") }} />
      <path d="M38 160C36 142 44 128 58 120L76 142L70 160Z" style={{ fill: v("rock-shade") }} />
      <path d="M108 114L132 126L162 132C168 144 170 152 168 160H120L114 136Z" style={{ fill: v("rock-shade"), opacity: 0.55 }} />
      <path d="M104 114L114 136L110 160" fill="none" strokeWidth={1.2} style={{ stroke: v("rock-shade") }} />
      <path
        d="M56 118C70 104 98 98 122 101C136 103 146 108 150 112C138 110 128 112 120 108C110 112 98 108 88 114C78 112 66 118 56 118Z"
        style={{ fill: v("moss") }}
      />
      <path d="M178 162C180 150 192 144 204 146C214 148 220 156 220 162Z" style={{ fill: v("rock") }} />
      <path d="M190 147C200 144 212 147 217 154L200 152Z" style={{ fill: v("rock-hi") }} />
      <path d="M8 166C10 156 22 152 32 155C40 158 42 164 42 166Z" style={{ fill: v("rock-shade") }} />
      <path d="M374 160C376 152 386 148 396 151C404 154 406 158 406 160Z" style={{ fill: v("rock-shade") }} />
    </g>
  );
}

const ferns = [
  { x: 114, y: 104, len: 26, lean: -14 },
  { x: 122, y: 103, len: 22, lean: 10 },
  { x: 282, y: 70, len: 20, lean: 12 },
  { x: 244, y: 114, len: 16, lean: -9 },
];

const ripples = [
  { cx: 104, cy: 161, rx: 58 },
  { cx: 296, cy: 157, rx: 70 },
  { cx: 200, cy: 163, rx: 22 },
];

const shimmer = [
  { x: 40, y: 178, w: 46 },
  { x: 150, y: 186, w: 60 },
  { x: 268, y: 176, w: 40 },
  { x: 320, y: 196, w: 54 },
  { x: 70, y: 204, w: 36 },
];

const fireflies = [
  [196, 118, 0],
  [226, 96, 0.9],
  [382, 128, 1.6],
  [60, 92, 2.2],
] as const;

export function PoolScene({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const fade = `pool-fade-${id}`;
  const clip = `pool-water-${id}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={`scene block ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={fade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--canvas)" stopOpacity="1" />
          <stop offset="1" stopColor="var(--canvas)" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clip}>
          <rect x="0" y={MIRROR} width={W} height={H - MIRROR} />
        </clipPath>
      </defs>

      <rect width={W} height={H} style={{ fill: v("sky-2") }} />
      <path
        d="M0 118L34 96L70 108L112 84L150 100L196 78L238 96L282 80L326 98L366 82L420 100V160H0Z"
        style={{ fill: v("far") }}
      />
      {[20, 58, 92, 132, 170, 206, 238, 272, 310, 344, 380].map((x, i) => (
        <path key={x} d={fir(x, WATER + 2, 34 + ((i * 17) % 26), 22 + ((i * 7) % 8))} style={{ fill: v("forest-3") }} />
      ))}
      <path d={fir(14, WATER + 4, 118, 46)} style={{ fill: v("forest-2") }} />
      <path d={fir(408, WATER + 4, 128, 48)} style={{ fill: v("forest-1") }} />
      <rect width={W} height="96" style={{ fill: `url(#${fade})` }} />

      <rect y={WATER} width={W} height={H - WATER} style={{ fill: v("pool") }} />
      <rect y={WATER} width={W} height="10" style={{ fill: v("water-2"), opacity: 0.55 }} />
      <rect y={H - 22} width={W} height="22" style={{ fill: v("river"), opacity: 0.45 }} />

      <g clipPath={`url(#${clip})`} style={{ opacity: 0.28 }}>
        <g transform={`matrix(1 0 0 -1 0 ${MIRROR * 2})`}>
          <Rocks />
        </g>
      </g>

      <ellipse className="scene-mist" cx="150" cy={WATER} rx="150" ry="9" style={{ fill: v("mist"), opacity: 0.7 }} />
      <ellipse className="scene-mist" cx="330" cy={WATER - 2} rx="110" ry="7" style={{ fill: v("mist"), opacity: 0.6, animationDelay: "-3s" }} />

      <g fill="none" style={{ stroke: v("foam") }} strokeWidth={1.2}>
        {ripples.map((r, i) => (
          <ellipse key={r.cx} className="scene-ripple" cx={r.cx} cy={r.cy} rx={r.rx} ry={r.rx * 0.12} style={{ animationDelay: `${-i * 1.1}s` }} />
        ))}
      </g>

      <Rocks />

      <g style={{ stroke: v("fern") }} strokeWidth={1.3} strokeLinecap="round" fill="none">
        {ferns.map((f, i) => (
          <path
            key={f.x}
            className="scene-sway"
            d={frond(f.x, f.y, f.len, f.lean, 9)}
            style={{ transformOrigin: `${f.x}px ${f.y}px`, animationDelay: `${-i * 1.3}s` }}
          />
        ))}
      </g>

      <g strokeLinecap="round" style={{ stroke: v("water-1") }} strokeWidth={1.5}>
        {shimmer.map((s, i) => (
          <path key={s.x} className="scene-flow" d={`M${s.x} ${s.y}h${s.w}`} style={{ animationDelay: `${-i * 0.7}s` }} />
        ))}
      </g>
      {fireflies.map(([cx, cy, delay]) => (
        <circle key={cx} className="scene-twinkle" cx={cx} cy={cy} r="1.6" style={{ fill: v("firefly"), animationDelay: `${-delay}s` }} />
      ))}
    </svg>
  );
}
