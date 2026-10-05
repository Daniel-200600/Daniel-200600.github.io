"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number; s: number; o: number };

const N = 30;
const STAGES = 5;
const STAGE_MS = 2400;
const HIGHLIGHT = 18; // index among signal points
const DECISION = { x: 430, y: 118 };

/** Deterministic PRNG so server and client render the same scatter. */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const isNoise = (i: number) => i % 5 === 4;

/** Raw index of the highlighted signal point. */
const HIGHLIGHT_RAW = Array.from({ length: N }, (_, i) => i).filter((i) => !isNoise(i))[HIGHLIGHT];

function buildLayouts(): Point[][] {
  const rand = mulberry32(7);
  const raw = Array.from({ length: N }, () => ({
    x: 50 + rand() * 460,
    y: 40 + rand() * 200,
    s: 1,
    o: 1,
  }));

  const columns = [3, 5, 6, 5, 3, 2];
  const columnOf: { col: number; row: number }[] = [];
  columns.forEach((count, col) => {
    for (let row = 0; row < count; row++) columnOf.push({ col, row });
  });

  const layouts: Point[][] = [[], [], [], [], []];
  let k = 0;
  for (let i = 0; i < N; i++) {
    const r = raw[i];
    layouts[0].push(r);
    if (isNoise(i)) {
      const gone = { ...r, s: 0, o: 0 };
      for (let st = 1; st < STAGES; st++) layouts[st].push(gone);
      continue;
    }
    const t = k / 23;
    const isHighlight = k === HIGHLIGHT;
    layouts[1].push({ x: 140 + (k % 8) * 40, y: 100 + Math.floor(k / 8) * 40, s: 1, o: 1 });
    layouts[2].push({ x: 130 + columnOf[k].col * 60, y: 236 - columnOf[k].row * 24, s: 1, o: 1 });
    layouts[3].push({
      x: 70 + k * (420 / 23),
      y: 214 - 150 * Math.pow(t, 1.6) + 9 * Math.sin(k * 1.3),
      s: isHighlight ? 1.8 : 1,
      o: 1,
    });
    layouts[4].push({ ...DECISION, s: isHighlight ? 2.6 : 0.4, o: isHighlight ? 1 : 0 });
    k++;
  }
  return layouts;
}

const layouts = buildLayouts();

type Labels = {
  figure: string;
  caption: string;
  stages: string[];
  pause: string;
  play: string;
};

export function PipelineFigure({ labels }: { labels: Labels }) {
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) setStage(3);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Start cycling only once the page has finished loading, so the animation never competes with the first render.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const start = () => window.setTimeout(() => setReady(true), 600);
    if (document.readyState === "complete") {
      const id = start();
      return () => window.clearTimeout(id);
    }
    let id = 0;
    const onLoad = () => {
      id = start();
    };
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    if (!ready || reduced || paused || !visible) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setStage((s) => (s + 1) % STAGES);
    }, STAGE_MS);
    return () => window.clearInterval(id);
  }, [ready, reduced, paused, visible]);

  // Signal points only, used to draw the trend line at the "insight" stage.
  const trend = layouts[3].filter((_, i) => !isNoise(i));
  const trendPath = trend.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  return (
    <figure ref={rootRef} className="night rounded-[4px] border border-rule">
      <div className="flex items-center justify-between border-b border-rule px-4 py-3">
        <span className="label text-ink-3">{labels.figure}</span>
        <div className="flex items-center gap-3">
          <span className="label text-ink-3 tabular-nums" aria-hidden>
            0{stage + 1} / 0{STAGES}
          </span>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={paused ? labels.play : labels.pause}
              className="grid size-8 place-items-center rounded-[3px] border border-rule text-ink-2 transition-colors hover:border-rule-strong hover:text-ink"
            >
              {paused ? (
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                  <path d="M2 1 9 5 2 9Z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                  <path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      <svg
        viewBox="0 0 560 280"
        className="block h-auto w-full"
        aria-hidden
      >
        <g stroke="var(--rule)" strokeWidth="1">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`v${i}`} x1={40 + i * 40} x2={40 + i * 40} y1="20" y2="260" />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`h${i}`} x1="40" x2="520" y1={20 + i * 40} y2={20 + i * 40} />
          ))}
        </g>

        {/* analysis baseline */}
        <line
          x1="100"
          x2="460"
          y1="252"
          y2="252"
          stroke="var(--ink-3)"
          strokeWidth="1"
          style={{ opacity: stage === 2 ? 1 : 0, transition: "opacity 500ms" }}
        />

        {/* insight trend */}
        <path
          d={trendPath}
          fill="none"
          stroke="var(--accent-soft)"
          strokeWidth="1.25"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: stage === 3 ? 0 : 1,
            opacity: stage === 3 ? 1 : 0,
            transition: "stroke-dashoffset 1400ms var(--ease-out-soft) 300ms, opacity 400ms",
          }}
        />

        {/* decision marker */}
        <circle
          cx={DECISION.x}
          cy={DECISION.y}
          r="24"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          style={{
            opacity: stage === 4 ? 1 : 0,
            transform: stage === 4 ? "scale(1)" : "scale(0.6)",
            transformOrigin: `${DECISION.x}px ${DECISION.y}px`,
            transition: "opacity 500ms 500ms, transform 700ms var(--ease-out-soft) 500ms",
          }}
        />

        <g>
          {layouts[0].map((_, i) => {
            const noise = isNoise(i);
            const highlight = i === HIGHLIGHT_RAW && stage >= 3;
            const p = layouts[stage][i];
            return (
              <circle
                key={i}
                r="3.5"
                fill={noise ? "none" : highlight ? "var(--accent)" : "var(--ink-2)"}
                stroke={noise ? "var(--ink-3)" : "none"}
                strokeWidth="1"
                style={{
                  transform: `translate(${p.x}px, ${p.y}px) scale(${p.s})`,
                  opacity: p.o,
                  transition: `transform 1000ms var(--ease-out-soft) ${i * 14}ms, opacity 600ms ${i * 14}ms, fill 400ms`,
                }}
              />
            );
          })}
        </g>
      </svg>

      <ol className="grid grid-cols-5 border-t border-rule" aria-hidden>
        {labels.stages.map((name, i) => (
          <li
            key={name}
            className={`label relative truncate px-0.5 py-3 text-center text-[0.5625rem] tracking-[0.03em] transition-colors duration-500 sm:px-1.5 sm:text-[0.6875rem] sm:tracking-[0.08em] ${
              i === stage ? "text-ink" : "text-ink-3"
            }`}
          >
            <span
              className="absolute inset-x-0 top-0 h-px origin-left bg-accent transition-transform duration-500"
              style={{ transform: i === stage ? "scaleX(1)" : "scaleX(0)" }}
            />
            {name}
          </li>
        ))}
      </ol>
      <figcaption className="border-t border-rule px-4 py-3 text-[0.8125rem] leading-snug text-ink-3">{labels.caption}</figcaption>
    </figure>
  );
}
