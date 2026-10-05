import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CopyButton } from "@/components/ui/CopyButton";
import { IndexLabel } from "@/components/ui/IndexLabel";
import { ArrowUpRight } from "@/components/ui/icons";
import { ContactLinks } from "./ContactLinks";

export function ContactSection({ locale, dict, index }: { locale: Locale; dict: Dictionary; index: string }) {
  const { email } = profile.links;
  return (
    <section id="contact" aria-labelledby="contact-title" className="night relative overflow-hidden">
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-page section-pad relative">
        <div className="grid gap-10 border-t border-rule pt-6 md:grid-cols-12 md:gap-8">
          <IndexLabel index={index} label={dict.sections.contact} className="md:col-span-3 md:self-start" />
          <div className="md:col-span-9">
            <h2 id="contact-title" className="h-section max-w-[18ch]">
              {profile.availability[locale]}
            </h2>
            <p className="lede mt-5 max-w-[56ch]">{dict.sections.contactIntro}</p>
            <div data-reveal className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${email}`} icon={<ArrowUpRight />}>
                {dict.contact.write}
              </ButtonLink>
              <CopyButton value={email} label={dict.contact.copy} done={dict.contact.copied} />
            </div>
            <div data-reveal className="mt-14">
              <ContactLinks labels={dict.contact} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
