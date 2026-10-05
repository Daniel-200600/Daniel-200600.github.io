"use client";

import { useEffect, useState } from "react";

type Item = { id: string; n: number; label: string };

/**
 * Sticky table of contents for a case study (desktop) and a reading
 * progress bar under the header. The active entry is the last section
 * whose top has passed a third of the viewport.
 */
export function CaseStudyNav({ items, label }: { items: Item[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < line) current = item.id;
      }
      setActive(current);
      const article = document.getElementById("case-study");
      if (article) {
        const rect = article.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        setProgress(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-16 z-30 h-0.5">
        <div
          className="h-full origin-left bg-accent transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <nav aria-label={label} className="sticky top-28">
        <p className="label mb-4 text-ink-3">{label}</p>
        <ol className="space-y-0.5 border-l border-rule">
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`-ml-px flex items-baseline gap-3 border-l py-1.5 pl-4 text-[0.9375rem] transition-colors ${
                    isActive ? "border-accent text-ink" : "border-transparent text-ink-3 hover:text-ink"
                  }`}
                >
                  <span className="font-mono text-[0.75rem]">{String(item.n).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
