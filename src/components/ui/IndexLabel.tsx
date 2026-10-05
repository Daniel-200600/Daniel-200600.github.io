/** Editorial index: number in accent, then the label. No dash, drawn or typed. */
export function IndexLabel({ index, label, className = "" }: { index: string; label: string; className?: string }) {
  return (
    <p className={`label flex items-center gap-4 text-ink-3 ${className}`}>
      <span className="text-accent">{index}</span>
      <span>{label}</span>
    </p>
  );
}
