"use client";

import { useEffect } from "react";

/**
 * One observer for every [data-reveal] element, including elements added
 * later (route changes, re-renders). The hidden initial state only applies
 * under html.js (see globals.css), so content is never hidden without JS.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-visible");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const watch = (root: ParentNode) =>
      root.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el));

    watch(document);
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]:not(.is-visible)")) io.observe(node);
          watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
