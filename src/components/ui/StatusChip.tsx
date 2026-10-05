import { Txt } from "./Txt";

export function StatusChip({ children }: { children: string }) {
  return (
    <span className="label inline-flex items-center gap-2 rounded-[3px] border border-rule-strong px-2.5 py-1 text-ink-2">
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      <Txt>{children}</Txt>
    </span>
  );
}
