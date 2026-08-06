import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/forms/ContactForm";
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconMapPin,
  IconPhone,
  IconYoutube,
} from "@/components/Icons";
import { Card, Container, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.contact.title, description: dict.contact.lead };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.contact;

  const socials = [
    { href: site.social.youtube, Icon: IconYoutube, label: "YouTube" },
    { href: site.social.facebook, Icon: IconFacebook, label: "Facebook" },
    { href: site.social.instagram, Icon: IconInstagram, label: "Instagram" },
  ].filter((s) => s.href);

  return (
    <>
      <PageHeader eyebrow={dict.nav.contact} title={t.title} lead={t.lead} />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-xl font-semibold">
              {t.formHeading}
            </h2>
            <div className="mt-7">
              <ContactForm locale={locale} dict={dict} />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <Card className="bg-cream-100/70">
              <h2 className="font-serif text-lg font-semibold">
                {t.infoHeading}
              </h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex gap-3">
                  <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-ochre-600" />
                  <div>
                    <p className="font-medium text-bark-700">{t.phoneLabel}</p>
                    <a
                      href={`tel:${site.contact.phoneHref}`}
                      className="mt-0.5 block text-bark-600 transition-colors hover:text-ochre-700"
                    >
                      {site.contact.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <IconMail className="mt-0.5 h-5 w-5 shrink-0 text-ochre-600" />
                  <div>
                    <p className="font-medium text-bark-700">{t.emailLabel}</p>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="mt-0.5 block break-all text-bark-600 transition-colors hover:text-ochre-700"
                    >
                      {site.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-ochre-600" />
                  <div>
                    <p className="font-medium text-bark-700">
                      {dict.visit.addressLabel}
                    </p>
                    <p className="mt-0.5 text-bark-600">
                      {site.contact.address[locale]}
                    </p>
                  </div>
                </li>
              </ul>

              {socials.length > 0 ? (
                <div className="mt-7 border-t border-cream-300/80 pt-6">
                  <p className="text-sm font-medium text-bark-700">
                    {dict.footer.followHeading}
                  </p>
                  <div className="mt-3 flex gap-2">
                    {socials.map(({ href, Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-bark-600 ring-1 ring-cream-300 transition-colors hover:bg-cream-200 hover:text-ochre-700"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </Card>
          </aside>
        </Container>
      </section>
    </>
  );
}
