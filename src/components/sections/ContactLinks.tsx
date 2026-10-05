import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { isTodo } from "@/lib/content";
import { ArrowUpRight } from "@/components/ui/icons";

type Props = { labels: Dictionary["contact"]; size?: "large" | "compact" };

export function contactItems(labels: Dictionary["contact"]) {
  const { email, linkedin, github } = profile.links;
  return [
    { key: "email", label: labels.email, value: email, href: `mailto:${email}`, display: email },
    { key: "linkedin", label: labels.linkedin, value: linkedin, href: linkedin, display: linkedin.replace(/^https?:\/\/(www\.)?/, "") },
    { key: "github", label: labels.github, value: github, href: github, display: github.replace(/^https?:\/\//, "") },
  ];
}

export function ContactLinks({ labels, size = "large" }: Props) {
  const items = contactItems(labels);
  const large = size === "large";

  return (
    <dl className={large ? "divide-y divide-rule border-y border-rule" : "space-y-2"}>
      {items.map((item) => (
        <div
          key={item.key}
          className={large ? "grid gap-1 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-8" : "flex gap-3"}
        >
          <dt className={`label text-ink-3 ${large ? "sm:col-span-3" : "w-20 shrink-0"}`}>{item.label}</dt>
          <dd className={large ? "min-w-0 sm:col-span-9" : "min-w-0"}>
            {isTodo(item.value) ? (
              <span className="todo">{item.value}</span>
            ) : (
              <a
                href={item.href}
                {...(item.key === "email" ? {} : { target: "_blank", rel: "noopener noreferrer me" })}
                className={`group inline-flex max-w-full items-center gap-2 break-all text-ink transition-colors hover:text-accent ${
                  large ? "font-serif text-[clamp(1.25rem,1rem+1.2vw,1.875rem)] leading-tight" : ""
                }`}
              >
                {item.display}
                <ArrowUpRight className="shrink-0 text-ink-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
