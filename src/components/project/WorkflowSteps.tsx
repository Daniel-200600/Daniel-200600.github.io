"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { WorkflowStep } from "@/lib/types";
import { RichText } from "@/components/ui/Txt";

/**
 * Scroll-linked workflow: a sticky step diagram (desktop) follows the
 * step currently read on the right. On mobile the steps are a numbered
 * vertical list with a progress rule.
 */
export function WorkflowSteps({ steps, locale }: { steps: WorkflowStep[]; locale: Locale }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  // Active step = last step whose top has crossed the middle of the viewport.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight * 0.5;
      let current = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < middle) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const progress = steps.length > 1 ? active / (steps.length - 1) : 1;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-28 rounded-[4px] border border-rule p-6" aria-hidden>
          <span className="absolute top-10 bottom-10 left-[2.15rem] w-px bg-rule" />
          <span
            className="absolute top-10 left-[2.15rem] w-px origin-top bg-accent transition-transform duration-500 ease-out"
            style={{ height: "calc(100% - 5rem)", transform: `scaleY(${progress})` }}
          />
          <ol className="relative">
          {steps.map((step, i) => (
            <li key={step.title.fr} className="relative flex items-center gap-4 py-2.5">
              <span
                className={`relative z-10 grid size-5 place-items-center rounded-full border transition-colors duration-300 ${
                  i <= active ? "border-accent bg-accent" : "border-rule-strong bg-paper"
                }`}
              >
                <span className={`size-1.5 rounded-full ${i <= active ? "bg-paper" : "bg-transparent"}`} />
              </span>
              <span
                className={`text-[0.9375rem] transition-colors duration-300 ${
                  i === active ? "text-ink" : "text-ink-3"
                }`}
              >
                {step.title[locale]}
              </span>
            </li>
          ))}
          </ol>
        </div>
      </div>

      <ol className="lg:col-span-8">
        {steps.map((step, i) => (
          <li
            key={step.title.fr}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-12 last:pb-0 lg:grid-cols-[3.5rem_1fr]"
          >
            <span className="label relative pt-1 text-accent">{String(i + 1).padStart(2, "0")}</span>
            <div className="border-t border-rule pt-4">
              <h3 className="h-item">{step.title[locale]}</h3>
              <RichText blocks={step.body[locale]} className="mt-4 max-w-[62ch] text-ink-2" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
