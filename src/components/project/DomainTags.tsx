import type { Dictionary } from "@/i18n/dictionaries";
import type { Domain } from "@/lib/types";

export function DomainTags({ domains, labels }: { domains: Domain[]; labels: Dictionary["domains"] }) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1">
      {domains.map((d, i) => (
        <li key={d} className="label text-ink-3">
          {i > 0 && (
            <span aria-hidden className="mr-3 text-rule-strong">
              /
            </span>
          )}
          {labels[d]}
        </li>
      ))}
    </ul>
  );
}
