"use client";

import { useEffect, useState } from "react";

// False until the first page has hydrated: the initial load paints instantly
// (no fade that would delay LCP); later client navigations fade in.
let hydrated = false;

/** Re-mounted on each navigation: gives client-side page changes a short fade-in (CSS only). */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hydrated);
  useEffect(() => {
    hydrated = true;
  }, []);
  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
