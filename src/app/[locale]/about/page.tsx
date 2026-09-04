import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Button,
  Container,
  Eyebrow,
  PageHeader,
  PendingNote,
  PhotoSlot,
  SectionHeading,
} from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import {
  dedicationNote,
  inscriptionFacts,
  inscriptionHeading,
  inscriptionNote,
  inscriptionOriginal,
  inscriptionTranslation,
  photoCredit,
} from "@/content/inscription";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.about.title, description: dict.about.lead };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.about;
  const org = site.org[locale];

  return (
    <>
      <PageHeader eyebrow={org.name} title={t.title} lead={t.lead} />

      {/* 인사말 */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <PhotoSlot
              label={
                locale === "ko"
                  ? "회장 사진이 들어갈 자리"
                  : "Portrait of the president"
              }
              ratio="aspect-4/5"
              className="shadow-warm"
            />
          </div>

          <div className="lg:col-span-7">
            <SectionHeading title={t.greetingHeading} />
            <div className="mt-7 space-y-5 text-[1.0625rem] leading-[1.9] text-bark-700">
              {t.greetingBody.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-9 font-serif text-lg">
              <span className="text-bark-500">{t.greetingSignoff}</span>
              <br />
              <span className="font-semibold">
                {org.representativeTitle} {org.representative}
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* 캠프티아노, 그 이름의 유래 · 비문 */}
      <section
        id="inscription"
        className="texture-dawn scroll-mt-24 border-y border-cream-300/60 py-20 sm:py-28"
      >
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* 비석 */}
          <div className="lg:col-span-5">
            <figure className="mx-auto max-w-xs">
              <div className="rounded-t-[3.5rem] rounded-b-lg bg-khaki-700 px-7 py-12 text-center shadow-warm-lg sm:px-9 sm:py-14">
                <div className="space-y-1.5 font-serif text-[0.8125rem] leading-relaxed tracking-[0.06em] text-cream-100/90">
                  {inscriptionOriginal.map((line, index) =>
                    line === "" ? (
                      <div key={index} className="h-3" aria-hidden />
                    ) : (
                      <p
                        key={index}
                        className={
                          index === 0
                            ? "text-base font-semibold tracking-[0.22em] text-cream-50"
                            : ""
                        }
                      >
                        {line}
                      </p>
                    ),
                  )}
                </div>
              </div>
              <figcaption className="mt-4 text-center text-xs leading-relaxed text-bark-500">
                {inscriptionNote[locale]}
              </figcaption>
            </figure>
          </div>

          {/* 이야기와 확인된 사실 */}
          <div className="lg:col-span-7">
            <Eyebrow className="mb-5">{inscriptionHeading[locale]}</Eyebrow>
            <h2 className="display text-[1.9rem] sm:text-[2.4rem]">
              {t.storyHeading}
            </h2>

            <div className="mt-7 space-y-5 text-[1.0625rem] leading-[1.9] text-bark-700">
              {t.storyBody.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* 우리말 옮김 */}
            <div className="mt-9 border-l-2 border-ochre-300 py-1 pl-6">
              {inscriptionTranslation[locale].map((line, index) =>
                line === "" ? (
                  <div key={index} className="h-3" aria-hidden />
                ) : (
                  <p
                    key={index}
                    className="font-serif text-[0.9375rem] leading-relaxed text-bark-600"
                  >
                    {line}
                  </p>
                ),
              )}
            </div>

            {/* 확인된 사실 */}
            <dl className="mt-10 divide-y divide-cream-300/70 border-y border-cream-300/70">
              {inscriptionFacts.map((fact) => (
                <div
                  key={fact.label[locale]}
                  className="grid gap-1 py-3.5 sm:grid-cols-4 sm:gap-4"
                >
                  <dt className="text-sm font-semibold text-bark-500">
                    {fact.label[locale]}
                  </dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-bark-800 sm:col-span-3">
                    {fact.value[locale]}
                  </dd>
                </div>
              ))}
            </dl>

            {/* 제막식 */}
            <div className="mt-10 space-y-4 text-[0.9375rem] leading-[1.9] text-bark-600">
              {dedicationNote[locale].map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-5 text-xs text-bark-500">{photoCredit[locale]}</p>
          </div>
        </Container>
      </section>

      {/* 우리가 지키는 것 */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={locale === "ko" ? "원칙" : "Principles"}
            title={t.valuesHeading}
            align="center"
          />
          <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {t.values.map((value, index) => (
              <div key={value.title}>
                <span className="font-serif text-2xl text-ochre-400 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.8] text-bark-600">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 연혁 · 조직 */}
      <section className="texture-paper border-t border-cream-300/60 bg-cream-100/60 py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading title={t.historyHeading} />
            <div className="mt-6">
              <PendingNote>{t.historyPending}</PendingNote>
            </div>
          </div>
          <div>
            <SectionHeading title={t.orgHeading} />
            <div className="mt-6">
              <PendingNote>{t.orgPending}</PendingNote>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="flex flex-wrap items-center justify-center gap-4">
          <Button href={`/${locale}/programs`}>{dict.nav.programs}</Button>
          <Button href={`/${locale}/support`} variant="secondary">
            {dict.common.donate}
          </Button>
        </Container>
      </section>
    </>
  );
}
