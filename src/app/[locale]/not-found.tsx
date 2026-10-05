import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";

// not-found receives no params; the French copy carries a link to both homes.
export default function NotFound() {
  const fr = getDictionary("fr").notFound;
  const en = getDictionary("en").notFound;
  return (
    <div className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <p className="label text-accent">404</p>
      <h1 className="display mt-5">{fr.title}</h1>
      <p className="lede mt-5">
        {fr.body} <span lang="en">{en.body}</span>
      </p>
      <p className="mt-8 flex gap-6">
        <Link href="/fr" className="prose-link text-ink">
          {fr.back}
        </Link>
        <Link href="/en" lang="en" className="prose-link text-ink">
          {en.back}
        </Link>
      </p>
    </div>
  );
}
