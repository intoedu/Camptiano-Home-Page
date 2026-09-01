import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Button,
  Card,
  Container,
  PageHeader,
  PendingNote,
  PhotoSlot,
  SectionHeading,
} from "@/components/ui";
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
            <div className="mt-7 space-y-5 text-base leading-loose text-bark-700">
              {t.greetingBody.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 font-serif text-lg">
              <span className="text-bark-500">{t.greetingSignoff}</span>
              <br />
              <span className="font-semibold">
                {org.representativeTitle} {org.representative}
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* 캠프티아노, 그 이름의 유래 */}
      <section className="texture-paper border-y border-cream-300/70 bg-cream-100/70 py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow={locale === "ko" ? "기록" : "The record"}
            title={t.storyHeading}
          />
          <div className="mt-7">
            <PendingNote>{t.storyBody}</PendingNote>
          </div>
        </Container>
      </section>

      {/* 우리가 지키는 것 */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={locale === "ko" ? "원칙" : "Principles"}
            title={t.valuesHeading}
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {t.values.map((value) => (
              <Card key={value.title}>
                <h3 className="font-serif text-lg font-semibold">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bark-600">
                  {value.body}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 연혁 · 조직 */}
      <section className="texture-paper border-t border-cream-300/70 bg-cream-100/70 py-20 sm:py-24">
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
