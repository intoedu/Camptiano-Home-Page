import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IconMail, IconMapPin, IconPhone } from "@/components/Icons";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  PageHeader,
  SectionHeading,
} from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { site } from "@/lib/site";
import { formatDate, formatDateTime, mapLinks } from "@/lib/format";

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

  /*
   * 현충시설 지정 내역.
   * 지정 기관은 머리말에 이미 밝히므로, 표에는 지정서에서 확인된 항목만
   * 싣습니다. 확인되지 않은 줄을 "확인 중"으로 채워 두지 않습니다 —
   * 없는 것을 있는 것처럼 보이게 하는 자리표시자는 두지 않습니다.
   */
  const heritage = site.heritage;
  const heritageRows = [
    { label: t.heritageNumber, value: heritage.number },
    {
      label: t.heritageDate,
      value: heritage.designatedOn
        ? formatDate(heritage.designatedOn, locale)
        : null,
    },
    { label: t.heritageKind, value: heritage.kind?.[locale] ?? null },
    { label: t.heritageManager, value: heritage.manager?.[locale] ?? null },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  const links = mapLinks(site.contact.address[locale]);
  const mapButtons =
    locale === "ko"
      ? [
          { label: "카카오맵", href: links.kakao },
          { label: "네이버 지도", href: links.naver },
          { label: "Google Maps", href: links.google },
        ]
      : [
          { label: "Google Maps", href: links.google },
          { label: "Naver Map", href: links.naver },
        ];

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
              <div className="flex aspect-4/3 items-center justify-center rounded-2xl bg-cream-100/70 ring-1 ring-cream-300/80 ring-inset">
                <div className="max-w-sm px-6 text-center">
                  <IconMapPin className="mx-auto h-8 w-8 text-ochre-600/60" />
                  <p className="mt-4 font-serif text-lg font-semibold text-bark-800">
                    {site.contact.address[locale]}
                  </p>
                  {/* 좌표가 없어도 지도 앱에서 바로 길찾기를 시작할 수 있게 합니다. */}
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {mapButtons.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center rounded-full bg-cream-50 px-4 py-2 text-xs font-semibold text-bark-700 ring-1 ring-cream-300 transition-colors hover:bg-cream-100 hover:text-ochre-700"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
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
              {site.memorial.address[locale] ? (
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
              ) : null}

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

      {/*
        ── 현충시설 ─────────────────────────────────────────────
        기념비가 국가로부터 받은 지정입니다. 다른 안내에 섞이지 않도록
        구획을 따로 두었습니다.
      */}
      {site.heritage.designated ? (
        <section className="texture-grain bg-khaki-700 text-cream-100">
          <Container
            className={`py-16 sm:py-20 ${
              heritageRows.length > 0
                ? "grid gap-12 lg:grid-cols-12 lg:gap-16"
                : "max-w-2xl"
            }`}
          >
            <div className={heritageRows.length > 0 ? "lg:col-span-5" : ""}>
              <Eyebrow tone="dark" className="mb-5">
                {t.heritageEyebrow}
              </Eyebrow>
              <h2 className="display text-[2.05rem] text-cream-50 sm:text-[2.5rem]">
                {t.heritageHeading}
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-[1.85] text-cream-100/75">
                {t.heritageBody}
              </p>
            </div>

            {heritageRows.length > 0 ? (
            <div className="lg:col-span-7">
              <dl className="divide-y divide-cream-100/12 border-y border-cream-100/12">
                {heritageRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-6"
                  >
                    <dt className="text-sm font-semibold text-ochre-200">
                      {row.label}
                    </dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-cream-50 sm:col-span-2">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      <section className="texture-paper border-y border-cream-300/70 bg-cream-100/70 py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
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
