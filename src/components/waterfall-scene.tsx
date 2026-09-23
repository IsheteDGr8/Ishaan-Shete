import type { CSSProperties } from "react";

type Pt = [number, number];

const r1 = (n: number) => Math.round(n * 10) / 10;

function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const poly = (pts: Pt[]) => `M${pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join("L")}Z`;

export function fir(x: number, base: number, h: number, w: number, tiers = 6) {
  const top = base - h;
  const left: Pt[] = [];
  for (let i = 1; i <= tiers; i++) {
    const t = i / tiers;
    const y = top + h * t * 0.9;
    const hw = (w / 2) * (0.25 + 0.75 * t);
    left.push([x - hw, y]);
    if (i < tiers) left.push([x - hw * 0.45, y - h * 0.035]);
  }
  left.push([x - w * 0.04, base]);
  const right = left.map(([px, py]) => [2 * x - px, py] as Pt).reverse();
  return poly([[x, top], ...left, ...right]);
}

function treeLine(seed: number, from: number, to: number, baseAt: (x: number) => number, hMin: number, hMax: number, step: number) {
  const rand = seeded(seed);
  const trees: string[] = [];
  for (let x = from; x <= to; x += step * (0.7 + rand() * 0.6)) {
    const h = hMin + rand() * (hMax - hMin);
    trees.push(fir(x, baseAt(x) + 6, h, h * (0.38 + rand() * 0.12)));
  }
  return trees;
}

function frond(bx: number, by: number, len: number, lean: number, leaflets = 11) {
  const cx = bx + lean * 0.35;
  const cy = by - len * 0.7;
  const ex = bx + lean;
  const ey = by - len;
  const at = (t: number): Pt => [
    (1 - t) ** 2 * bx + 2 * (1 - t) * t * cx + t * t * ex,
    (1 - t) ** 2 * by + 2 * (1 - t) * t * cy + t * t * ey,
  ];
  let d = `M${bx} ${by}Q${r1(cx)} ${r1(cy)} ${r1(ex)} ${r1(ey)}`;
  for (let i = 1; i <= leaflets; i++) {
    const t = i / (leaflets + 1);
    const [px, py] = at(t);
    const [qx, qy] = at(Math.min(1, t + 0.02));
    const ang = Math.atan2(qy - py, qx - px);
    const l = len * 0.24 * (1 - t * 0.8);
    for (const side of [-1, 1]) {
      const a = ang + side * 1.05;
      d += `M${r1(px)} ${r1(py)}l${r1(Math.cos(a) * l)} ${r1(Math.sin(a) * l)}`;
    }
  }
  return d;
}

const leftCliffTop = (x: number) => 212 + Math.sin(x / 38) * 8 + (x > 200 ? (x - 200) * 0.18 : 0);
const rightCliffTop = (x: number) => 212 + Math.cos(x / 41) * 8 + (x < 400 ? (400 - x) * 0.18 : 0);

const backTrees = [
  ...treeLine(7, 4, 238, leftCliffTop, 46, 96, 17),
  ...treeLine(11, 362, 598, rightCliffTop, 46, 96, 17),
];

const streaks = [
  { x1: 268, x2: 244, w: 3, dash: "36 70", dur: 1.4, delay: 0 },
  { x1: 278, x2: 262, w: 2, dash: "22 84", dur: 1.1, delay: 0.4 },
  { x1: 288, x2: 280, w: 4, dash: "48 58", dur: 1.6, delay: 0.2 },
  { x1: 300, x2: 300, w: 3, dash: "30 76", dur: 1.25, delay: 0.7 },
  { x1: 311, x2: 318, w: 4, dash: "52 54", dur: 1.5, delay: 0.1 },
  { x1: 321, x2: 337, w: 2, dash: "26 80", dur: 1.15, delay: 0.55 },
  { x1: 332, x2: 356, w: 3, dash: "40 66", dur: 1.35, delay: 0.3 },
];

const vines = [
  "M250 236Q242 262 250 290Q256 312 248 336",
  "M232 232Q226 252 232 272",
  "M204 230Q198 256 206 280Q212 298 204 318",
  "M350 238Q358 264 350 292Q344 316 352 342",
  "M370 234Q376 256 368 278",
  "M398 228Q404 252 396 276Q390 296 398 316",
];

const vineLeaves: Pt[] = [
  [248, 262], [252, 300], [246, 330], [230, 256], [203, 254], [208, 292], [203, 314],
  [352, 262], [348, 304], [353, 336], [372, 256], [401, 250], [394, 290], [399, 312],
];

function bush(seed: number, cx: number, cy: number, spread: number): [number, number, number][] {
  const rand = seeded(seed);
  return Array.from({ length: 7 }, () => [
    r1(cx + (rand() - 0.5) * spread),
    r1(cy - rand() * spread * 0.35),
    r1(12 + rand() * 16),
  ]);
}

const bushes = [bush(3, 170, 700, 90), bush(5, 238, 708, 60), bush(9, 420, 704, 80), bush(13, 520, 712, 90)];

const fireflies: Pt[] = [
  [96, 470], [150, 540], [70, 600], [470, 500], [530, 560], [420, 610], [210, 612], [560, 470],
];

const ferns = [
  { bx: 30, by: 705, len: 120, lean: 40 },
  { bx: 48, by: 705, len: 150, lean: 80 },
  { bx: 70, by: 705, len: 105, lean: 110 },
  { bx: 20, by: 705, len: 90, lean: -20 },
  { bx: 575, by: 705, len: 130, lean: -60 },
  { bx: 556, by: 705, len: 110, lean: -105 },
  { bx: 590, by: 705, len: 95, lean: -10 },
];

const v = (name: string) => `var(--scene-${name})`;
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

export function WaterfallScene() {
  return (
    <svg
      viewBox="0 0 600 700"
      preserveAspectRatio="xMidYMid slice"
      className="scene h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="sc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: v("sky-1") }} />
          <stop offset="1" style={{ stopColor: v("sky-2") }} />
        </linearGradient>
        <linearGradient id="sc-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: v("water-1") }} />
          <stop offset="1" style={{ stopColor: v("water-2") }} />
        </linearGradient>
        <linearGradient id="sc-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: v("pool") }} />
          <stop offset="1" style={{ stopColor: v("river") }} />
        </linearGradient>
        <radialGradient id="sc-mist">
          <stop offset="0" style={{ stopColor: v("mist"), stopOpacity: 0.95 }} />
          <stop offset="1" style={{ stopColor: v("mist"), stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id="sc-glow">
          <stop offset="0" style={{ stopColor: v("sun"), stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: v("sun"), stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      <rect width="600" height="700" fill="url(#sc-sky)" />
      <circle cx="440" cy="96" r="130" fill="url(#sc-glow)" />
      <circle cx="440" cy="96" r="30" style={{ fill: v("sun") }} />

      <g className="scene-birds" style={{ stroke: v("bird") }} fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M150 90q6 -6 12 0q6 -6 12 0" />
        <path d="M184 72q5 -5 10 0q5 -5 10 0" />
        <path d="M128 64q4 -4 8 0q4 -4 8 0" />
      </g>

      <path d="M0 176L70 128L130 150L200 104L270 146L330 118L400 150L470 112L540 140L600 122V260H0Z" style={{ fill: v("far") }} />
      <path d="M0 214L60 176L120 196L190 160L250 190L320 170L390 196L450 164L520 188L600 170V290H0Z" style={{ fill: v("mid") }} />

      <g style={{ fill: v("forest-3") }}>
        {backTrees.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      <path d="M0 214L60 205L120 218L180 210L262 226L257 300L249 420L234 548L0 566Z" style={{ fill: v("rock") }} />
      <path d="M338 226L420 210L480 218L540 204L600 212V566L366 548L351 420L343 300Z" style={{ fill: v("rock") }} />
      <g style={{ fill: v("rock-shade") }}>
        <path d="M20 270L70 250L100 300L60 360L24 340Z" />
        <path d="M120 300L180 280L205 330L170 420L128 380Z" />
        <path d="M40 420L110 400L130 470L70 520L30 490Z" />
        <path d="M180 460L230 450L226 530L176 540Z" />
        <path d="M380 290L430 270L452 330L410 380L386 360Z" />
        <path d="M470 260L540 250L566 310L520 370L480 330Z" />
        <path d="M420 430L500 410L520 480L450 520L416 490Z" />
        <path d="M540 420L590 410L596 500L548 520Z" />
      </g>
      <g style={{ stroke: v("rock-hi") }} strokeWidth="2" strokeLinecap="round" opacity="0.7" fill="none">
        <path d="M18 330L90 322M160 380L214 372M40 470L200 458" />
        <path d="M410 350L462 344M506 320L574 314M390 500L560 490" />
      </g>
      <g style={{ fill: v("moss") }}>
        <path d="M0 214L60 205L120 218L180 210L262 226L260 250Q236 240 214 256Q190 236 160 250Q130 232 100 246Q70 228 40 244Q18 232 0 240Z" />
        <path d="M338 226L420 210L480 218L540 204L600 212V238Q576 226 552 240Q522 224 494 242Q462 226 432 244Q402 230 378 250Q356 238 340 252Z" />
        <path d="M257 300Q246 318 252 344Q244 330 240 312Z" />
        <path d="M343 300Q356 320 350 348Q358 332 362 312Z" />
      </g>

      <g style={{ stroke: v("fern") }} fill="none" strokeWidth="3" strokeLinecap="round">
        {vines.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g style={{ fill: v("moss") }}>
        {vineLeaves.map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="5" ry="3" transform={`rotate(${i % 2 ? 35 : -35} ${x} ${y})`} />
        ))}
      </g>

      <path d="M262 226L338 226L343 300L351 420L366 548L234 548L249 420L257 300Z" fill="url(#sc-water)" />
      <g style={{ stroke: v("foam") }} fill="none" strokeLinecap="round">
        {streaks.map((s, i) => (
          <path
            key={i}
            className="scene-fall"
            d={`M${s.x1} 226L${s.x2} 548`}
            strokeWidth={s.w}
            strokeDasharray={s.dash}
            style={{ animationDuration: `${s.dur}s`, animationDelay: `${-s.delay}s` }}
          />
        ))}
      </g>
      <ellipse cx="300" cy="228" rx="42" ry="6" style={{ fill: v("foam") }} />

      <path d="M40 560Q300 530 560 560L620 700H-20Z" fill="url(#sc-river)" />
      <g style={{ stroke: v("foam") }} fill="none" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <path className="scene-flow" d="M240 600Q270 604 300 600" />
        <path className="scene-flow" style={delay(-1.2)} d="M330 628Q370 634 400 628" />
        <path className="scene-flow" style={delay(-2.1)} d="M180 650Q220 656 250 650" />
        <path className="scene-flow" style={delay(-0.6)} d="M380 672Q420 680 460 672" />
      </g>
      <g style={{ stroke: v("foam") }} fill="none" strokeWidth="2">
        {[0, 1, 2].map((i) => (
          <ellipse key={i} className="scene-ripple" cx="300" cy="556" rx="90" ry="14" style={delay(-i * 1.1)} />
        ))}
      </g>
      <ellipse className="scene-mist" cx="300" cy="545" rx="150" ry="46" fill="url(#sc-mist)" />
      <ellipse className="scene-mist" style={delay(-3)} cx="230" cy="560" rx="110" ry="34" fill="url(#sc-mist)" />
      <ellipse className="scene-mist" style={delay(-5)} cx="372" cy="556" rx="110" ry="34" fill="url(#sc-mist)" />

      <g style={{ fill: v("rock") }}>
        <path d="M-10 700L-10 612Q30 578 96 590Q170 598 196 650Q210 690 196 700Z" />
        <path d="M430 700Q420 640 470 616Q540 590 610 620V700Z" />
        <path d="M256 648Q266 626 296 628Q326 632 324 652Q300 664 256 648Z" />
        <path d="M348 690Q352 670 380 668Q404 670 404 690Z" />
      </g>
      <g style={{ fill: v("rock-hi") }} opacity="0.55">
        <path d="M20 612Q56 592 96 598Q70 604 44 622Z" />
        <path d="M472 626Q520 604 570 614Q530 618 492 640Z" />
        <path d="M270 636Q286 628 304 632Q288 636 276 644Z" />
      </g>
      <g style={{ fill: v("moss") }}>
        <path d="M-10 618Q30 584 96 592Q150 598 180 628Q140 612 100 618Q60 606 20 628Q4 626 -10 636Z" />
        <path d="M440 650Q456 618 500 606Q560 594 610 622V634Q560 614 520 624Q480 628 452 656Z" />
      </g>

      <g style={{ fill: v("forest-2") }}>
        <path d={fir(120, 640, 250, 120)} />
        <path d={fir(478, 646, 240, 116)} />
      </g>
      <g style={{ fill: v("forest-1") }}>
        <path d={fir(34, 690, 470, 190, 8)} />
        <path d={fir(570, 690, 480, 196, 8)} />
      </g>

      {bushes.map((b, i) => (
        <g key={i}>
          {b.map(([x, y, r], j) => (
            <circle key={j} cx={x} cy={y} r={r} style={{ fill: v(j % 3 === 2 ? "moss" : "forest-2") }} />
          ))}
        </g>
      ))}

      <g className="scene-fireflies" style={{ fill: v("firefly") }}>
        {fireflies.map(([x, y], i) => (
          <circle key={i} className="scene-twinkle" cx={x} cy={y} r="2.6" style={delay(-i * 0.7)} />
        ))}
      </g>

      <g style={{ stroke: v("fern") }} fill="none" strokeWidth="2.4" strokeLinecap="round">
        {ferns.map((f, i) => (
          <path
            key={i}
            className="scene-sway"
            d={frond(f.bx, f.by, f.len, f.lean)}
            style={{ transformOrigin: `${f.bx}px ${f.by}px`, animationDelay: `${-i * 0.9}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
