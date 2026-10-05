"use client";

import { useState } from "react";

type Props = { value: string; label: string; done: string };

/** Copies a value to the clipboard; the confirmation is announced to screen readers. */
export function CopyButton({ value, label, done }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard can be unavailable (permissions, insecure context): the address stays visible anyway.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center gap-2.5 rounded-[3px] border border-rule-strong px-5 text-[0.9375rem] font-medium text-ink transition-colors hover:border-ink"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        {copied ? <path d="M3 8.5 6.5 12 13 4.5" /> : <path d="M5.5 5.5h7v7h-7zM3.5 10.5v-7h7" />}
      </svg>
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
