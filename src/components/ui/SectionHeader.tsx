import type { ReactNode } from "react";
import { IndexLabel } from "./IndexLabel";

type Props = {
  index: string;
  label: string;
  title?: ReactNode;
  intro?: ReactNode;
  id?: string;
  action?: ReactNode;
};

/** Editorial section header: index, label, optional title and intro. */
export function SectionHeader({ index, label, title, intro, id, action }: Props) {
  return (
    <header className="mb-10 grid gap-6 border-t border-rule pt-6 md:mb-14 md:grid-cols-12 md:gap-8">
      <IndexLabel index={index} label={label} className="md:col-span-3 md:self-start" />
      <div className="md:col-span-9">
        {title ? (
          <h2 id={id} className="h-section max-w-[22ch]">
            {title}
          </h2>
        ) : null}
        {intro ? <p className="lede mt-4 max-w-[60ch]">{intro}</p> : null}
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </header>
  );
}
