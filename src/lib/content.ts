/**
 * Every missing fact is written with todo("…") so it renders as a visible
 * placeholder and is caught by `npm run check:content` before production.
 */
export const TODO_PREFIX = "[À FOURNIR";

export function todo(what: string): string {
  return `${TODO_PREFIX} : ${what}]`;
}

export function isTodo(value: string | undefined): boolean {
  return value?.startsWith(TODO_PREFIX) ?? false;
}

/** Same placeholder in both languages. */
export function todoL(what: string) {
  const value = todo(what);
  return { fr: value, en: value };
}

/** Same placeholder as a one-paragraph rich block in both languages. */
export function todoRich(what: string) {
  const value = [todo(what)];
  return { fr: value, en: value };
}
