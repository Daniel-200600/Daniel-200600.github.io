import { notFound } from "next/navigation";

/** Sends every unmatched URL under a locale to [locale]/not-found.tsx. */
export default function CatchAll() {
  notFound();
}
