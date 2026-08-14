import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IconMail, IconMapPin, IconPhone } from "@/components/Icons";
import {
  Button,
  Card,
  Container,
  PageHeader,
  PendingNote,
  SectionHeading,
} from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { site } from "@/lib/site";
import { formatDateTime } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.visit.title, description: dict.visit.lead };
}

export default async function VisitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.visit;

  const hasCoords = site.memorial.lat !== null && site.memorial.lng !== null;

  return (
    <>
      <PageHeader eyebrow={dict.nav.visit} title={t.title} lead={t.lead} />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* 지도 */}
          <div className="lg:col-span-7">
            {hasCoords ? (
              <iframe
                title={site.memorial.name[locale]}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${site.memorial.lng! - 0.01}%2C${site.memorial.lat! - 0.008}%2C${site.memorial.lng! + 0.01}%2C${site.memorial.lat! + 0.008}&layer=mapnik&marker=${site.memorial.lat}%2C${site.memorial.lng}`}
                loading="lazy"
                className="aspect-4/3 w-full rounded-2xl ring-1 ring-cream-300"
              />
            ) : (
              <div className="photo-slot flex aspect-4/3 items-center justify-center rounded-2xl ring-1 ring-ochre-300/40 ring-inset">
                <div className="max-w-xs px-6 text-center">
                  <IconMapPin className="mx-auto h-8 w-8 text-ochre-600/60" />
                  <p className="mt-3 text-sm leading-relaxed text-bark-600">
                    {t.mapPending}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 위치 정보 */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={locale === "ko" ? "위치" : "Location"}
              title={site.memorial.name[locale]}
            />

            <dl className="mt-8 space-y-6 text-sm">
              <div className="flex gap-3">
                <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-ochre-600" />
                <div>
                  <dt className="font-semibold text-bark-700">
                    {t.addressLabel}
                  </dt>
                  <dd className="mt-1 leading-relaxed text-bark-600">
                    {site.memorial.address[locale]}
                  </dd>
                </div>
              </div>

              <div className="flex gap-3">
                <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-ochre-600" />
                <div>
                  <dt className="font-semibold text-bark-700">
                    {dict.contact.phoneLabel}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${site.contact.phoneHref}`}
                      className="text-bark-600 transition-colors hover:text-ochre-700"
                    >
                      {site.contact.phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-3">
                <IconMail className="mt-0.5 h-5 w-5 shrink-0 text-ochre-600" />
                <div>
                  <dt className="font-semibold text-bark-700">
                    {dict.contact.emailLabel}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="break-all text-bark-600 transition-colors hover:text-ochre-700"
                    >
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-8">
              <Button href={`/${locale}/contact`}>{dict.common.contactUs}</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="texture-paper border-y border-cream-300/70 bg-cream-100/70 py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading title={t.transportHeading} />
            <div className="mt-6">
              <PendingNote>{t.transportPending}</PendingNote>
            </div>
          </div>

          <div>
            <SectionHeading title={t.etiquetteHeading} />
            <ul className="mt-6 space-y-3">
              {t.etiquette.map((line, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-relaxed text-bark-700"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ochre-400"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 다가오는 추모식 */}
      <section className="py-16 sm:py-20">
        <Container>
          <Card className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-ochre-600 uppercase">
                {dict.home.ceremonyLabel}
              </p>
              <p className="mt-2 font-serif text-xl font-semibold">
                {formatDateTime(site.ceremony.datetime, locale)}
              </p>
              <p className="mt-1 text-sm text-bark-600">
                {site.ceremony.place[locale]}
              </p>
            </div>
            <Button href={`/${locale}/contact`}>
              {dict.home.ceremonyCta}
            </Button>
          </Card>
        </Container>
      </section>
    </>
  );
}
