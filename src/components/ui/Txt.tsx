import { isTodo } from "@/lib/content";
import type { Rich } from "@/lib/types";

/** Renders a content string, flagging placeholders visually. */
export function Txt({ children }: { children: string }) {
  if (isTodo(children)) return <span className="todo">{children}</span>;
  return <>{children}</>;
}

export function RichText({ blocks, className = "" }: { blocks: Rich; className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, i) =>
        typeof block === "string" ? (
          <p key={i} className="text-pretty">
            <Txt>{block}</Txt>
          </p>
        ) : (
          <ul key={i} className="space-y-2.5">
            {block.map((item, j) => (
              <li key={j} className="relative pl-5 text-pretty">
                <span
                  aria-hidden
                  className="absolute top-[0.6em] left-0.5 size-1.5 rounded-full bg-accent-soft"
                />
                <Txt>{item}</Txt>
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}
