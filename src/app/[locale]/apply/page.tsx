import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ApplyForm } from "@/components/forms/ApplyForm";
import { IconMail, IconMapPin, IconPhone } from "@/components/Icons";
import { Card, Container, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, fill, type Locale } from "@/i18n";
import { site } from "@/lib/site";
import { formatDateTime, ordinal } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.apply.title, description: dict.apply.lead };
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const ceremonyTitle = fill(dict.home.ceremonyHeading, {
    n:
      locale === "ko"
        ? site.ceremony.anniversary
        : ordinal(site.ceremony.anniversary),
  });

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.apply}
        title={dict.apply.title}
        lead={dict.apply.lead}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ApplyForm locale={locale} dict={dict} />
          </div>

          <aside className="lg:col-span-5">
            <Card className="bg-cream-100/70">
              <p className="text-xs font-semibold tracking-[0.18em] text-ochre-600 uppercase">
                {dict.home.ceremonyLabel}
              </p>
              <h2 className="mt-3 font-serif text-xl font-semibold">
                {ceremonyTitle}
              </h2>
              <p className="mt-3 text-sm text-bark-600">
                {formatDateTime(site.ceremony.datetime, locale)}
              </p>
              <p className="mt-1.5 flex items-start gap-2 text-sm text-bark-600">
                <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-ochre-600" />
                {site.ceremony.place[locale]}
              </p>
            </Card>

            <div className="mt-6 rounded-2xl p-6 ring-1 ring-cream-300/80 sm:p-8">
              <h2 className="font-serif text-lg font-semibold">
                {dict.contact.infoHeading}
              </h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <IconPhone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ochre-600" />
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="text-bark-600 transition-colors hover:text-ochre-700"
                  >
                    {site.contact.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <IconMail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ochre-600" />
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="break-all text-bark-600 transition-colors hover:text-ochre-700"
                  >
                    {site.contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
