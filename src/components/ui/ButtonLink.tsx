import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-2 border border-ink hover:border-ink-2",
  secondary: "border border-rule-strong text-ink hover:border-ink",
  quiet: "text-ink px-0! hover:text-accent",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  external?: boolean;
  download?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon,
  external = false,
  download = false,
  className = "",
}: Props) {
  const classes = `group inline-flex min-h-11 items-center gap-2.5 rounded-[3px] px-5 text-[0.9375rem] font-medium transition-colors duration-200 ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
