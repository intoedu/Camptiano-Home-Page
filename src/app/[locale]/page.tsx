import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactActions } from "@/components/ContactActions";
import { Countdown } from "@/components/Countdown";
import { HeroScene } from "@/components/HeroScene";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Ridgeline } from "@/components/Ridgeline";
import { IconArrowRight, IconMapPin } from "@/components/Icons";
import { Button, Container, Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { getDictionary, isLocale, fill, type Locale } from "@/i18n";
import { inscriptionOriginal, photoCredit } from "@/content/inscription";
import { getSortedNews } from "@/content/news";
import { programs } from "@/content/programs";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";
import {
  formatDate,
  formatDateNumeric,
  formatDateTime,
  ordinal,
} from "@/lib/format";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.home;

  const news = getSortedNews().slice(0, 3);
  const featured = programs.filter((p) =>
    ["scholarship", "wall", "museum"].includes(p.id),
  );

  const ceremonyTitle = fill(t.ceremonyHeading, {
    n:
      locale === "ko"
        ? site.ceremony.anniversary
        : ordinal(site.ceremony.anniversary),
  });

  return (
    <>
      {/*
        ── 첫 화면 ───────────────────────────────────────────────
        기념비 사진이 화면을 가득 채웁니다.
        상단 머리글이 사진 위에 겹쳐 보이도록 -mt-18 로 끌어올립니다.
      */}
      <section className="relative isolate -mt-18 flex min-h-[100svh] flex-col justify-end overflow-hidden pt-18">
        {/* 사진 — 세로 화면에서는 원본, 가로 화면에서는 비석 중심의 넓은 사진 */}
        {site.heroPhoto ? (
          <picture className="absolute inset-0 -z-20 block h-full w-full">
            <source
              media="(min-aspect-ratio: 1/1)"
              srcSet={asset(site.heroPhotoWide)}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(site.heroPhoto)}
              alt={site.heroPhotoAlt[locale]}
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />
          </picture>
        ) : (
          <HeroScene className="absolute inset-0 -z-20 h-full w-full" />
        )}

        {/*
          글씨가 읽히도록 사진 위에 덮는 층.
          검정 대신 나무껍질빛(bark)을 써서 사진의 따뜻함을 지킵니다.
        */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-bark-900/90 via-bark-900/48 to-bark-900/22"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-bark-900/72 via-bark-900/22 to-transparent"
        />
        {/* 사진이 아래 능선빛 띠로 자연스럽게 잠기도록 */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-b from-transparent to-khaki-800"
        />

        <Container className="relative pt-24 pb-24 sm:pb-28">
          <div className="max-w-2xl">
            <p className="rise eyebrow mb-6 flex items-center gap-3 text-ochre-200">
              <span aria-hidden className="h-px w-6 bg-ochre-200/70 sm:w-10" />
              {t.heroEyebrow}
            </p>
            <h1 className="rise rise-1 display text-[2.75rem] whitespace-pre-line text-cream-50 sm:text-[3.6rem] lg:text-[4.6rem] xl:text-[5.1rem]">
              {t.heroTitle}
            </h1>
            <p className="rise rise-2 mt-7 max-w-xl text-[1.0625rem] leading-[1.85] text-cream-100/85 sm:text-lg">
              {t.heroBody}
            </p>
            <div className="rise rise-3 mt-9 flex flex-wrap gap-3">
              <Button href={`/${locale}/visit`} variant="onDark">
                {t.heroPrimary}
              </Button>
              <Button href={`/${locale}/about`} variant="onPhoto">
                {t.heroSecondary}
              </Button>
            </div>
          </div>
        </Container>

        {/* 아래에 더 있다는 조용한 표시 */}
        <span
          aria-hidden
          className="rise rise-4 absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream-100/50 sm:flex"
        >
          <span className="eyebrow text-[0.625rem]">{t.heroScroll}</span>
          <span className="h-10 w-px bg-gradient-to-b from-cream-100/50 to-transparent" />
        </span>
      </section>

      {/* ── 다가오는 추모식 ─────────────────────────────────────── */}
      <section className="bg-khaki-800 text-cream-100">
        <Container className="flex flex-col gap-9 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
          <div>
            <Eyebrow tone="dark">{t.ceremonyLabel}</Eyebrow>
            <h2 className="mt-4 font-serif text-2xl font-semibold text-cream-50 sm:text-[1.75rem]">
              {ceremonyTitle}
            </h2>
            <p className="mt-3 text-sm text-cream-100/75">
              {formatDateTime(site.ceremony.datetime, locale)}
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-sm text-cream-100/60">
              <IconMapPin className="h-4 w-4 shrink-0 text-ochre-300" />
              {site.ceremony.place[locale]}
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Countdown
              datetime={site.ceremony.datetime}
              tone="dark"
              labels={{
                days: dict.common.days,
                hours: dict.common.hours,
                minutes: dict.common.minutes,
              }}
              passedLabel={t.ceremonyPassed}
            />
            <Button href={`/${locale}/contact`} variant="onDark">
              {t.ceremonyCta}
            </Button>
          </div>
        </Container>
      </section>

      {/*
        ── 비문 ─────────────────────────────────────────────────
        사업회를 설명하기 전에, 돌이 스스로 하는 말을 먼저 둡니다.
        새겨진 원문과 1952년의 사진, 그리고 그날과 오늘을 잇는 두 날짜.
      */}
      <section className="texture-grain bg-bark-900 text-cream-100">
        <Container className="py-24 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            {/* 1952년, 갓 세워진 비석 — 비문을 읽는 동안 곁에 머무릅니다 */}
            <div className="lg:col-span-5">
              <figure className="mx-auto max-w-sm lg:sticky lg:top-28 lg:max-w-none">
                <Image
                  src={asset(site.homePhotos.stone1952.src)}
                  alt={site.homePhotos.stone1952.alt[locale]}
                  width={638}
                  height={833}
                  className="w-full rounded-sm shadow-warm-lg ring-1 ring-cream-100/10"
                />
                <figcaption className="mt-4 text-xs leading-relaxed text-cream-100/40">
                  {photoCredit[locale]}
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-7">
              <Eyebrow tone="dark" className="mb-6">
                {t.inscriptionEyebrow}
              </Eyebrow>
              <h2 className="display text-[2.05rem] whitespace-pre-line text-cream-50 sm:text-[2.7rem] lg:text-[3rem]">
                {t.inscriptionTitle}
              </h2>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.85] text-cream-100/70">
                {t.inscriptionBody}
              </p>

              {/* 새겨진 그대로 */}
              <div className="mt-11 border-l border-ochre-300/35 py-1 pl-7 sm:pl-9">
                <div className="space-y-1.5 font-serif text-[0.9375rem] leading-relaxed tracking-[0.09em] text-cream-100/80 sm:text-base">
                  {inscriptionOriginal.map((line, index) =>
                    line === "" ? (
                      <div key={index} className="h-3.5" aria-hidden />
                    ) : (
                      <p
                        key={index}
                        className={
                          index === 0
                            ? "text-lg font-semibold tracking-[0.24em] text-cream-50 sm:text-xl"
                            : ""
                        }
                      >
                        {line}
                      </p>
                    ),
                  )}
                </div>
              </div>

              {/* 그날과 오늘 */}
              <dl className="mt-12 grid gap-9 border-t border-cream-100/12 pt-10 sm:grid-cols-2 sm:gap-10">
                <div>
                  <dt className="eyebrow text-ochre-300">
                    {t.inscriptionThenLabel}
                  </dt>
                  <dd className="mt-3 font-serif text-[1.75rem] font-semibold text-cream-50 tabular-nums sm:text-[2.1rem]">
                    {formatDateNumeric(site.memorial.dedicatedOn, locale)}
                  </dd>
                  <p className="mt-2.5 text-sm leading-relaxed text-cream-100/55">
                    {t.inscriptionThenNote}
                  </p>
                </div>
                <div>
                  <dt className="eyebrow text-ochre-300">
                    {t.inscriptionNowLabel}
                  </dt>
                  <dd className="mt-3 font-serif text-[1.75rem] font-semibold text-cream-50 tabular-nums sm:text-[2.1rem]">
                    {formatDateNumeric(site.ceremony.datetime, locale)}
                  </dd>
                  <p className="mt-2.5 text-sm leading-relaxed text-cream-100/55">
                    {t.inscriptionNowNote}
                  </p>
                </div>
              </dl>

              <div className="mt-10">
                <TextLink href={`/${locale}/about#inscription`} tone="dark">
                  {t.inscriptionCta}
                </TextLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Ridgeline fill="var(--color-bark-900)" flip className="h-10 sm:h-16" />

      {/* ── 세 가지 사업 · 번호를 매긴 목록 ──────────────────────── */}
      <section className="py-24 sm:py-32 lg:py-36">
        <Container>
          <SectionHeading
            eyebrow={t.missionEyebrow}
            title={t.missionTitle}
            body={t.missionBody}
          />

          <ol className="mt-16 space-y-px">
            {featured.map((program, index) => (
              <li key={program.id}>
                <Link
                  href={`/${locale}/programs#${program.id}`}
                  className="group grid items-baseline gap-x-8 gap-y-3 border-t border-cream-300/70 py-10 transition-colors hover:bg-cream-100/50 sm:grid-cols-12 sm:py-14"
                >
                  <span className="font-serif text-3xl text-ochre-400 tabular-nums sm:col-span-1 sm:text-[2.75rem]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold transition-colors group-hover:text-ochre-700 sm:col-span-4 sm:text-[1.9rem]">
                    {program.title[locale]}
                  </h3>
                  <p className="text-[0.9375rem] leading-[1.8] text-bark-600 sm:col-span-6 sm:text-base">
                    {program.lead[locale]}
                  </p>
                  <span className="text-ochre-600 transition-transform duration-200 group-hover:translate-x-1 sm:col-span-1 sm:justify-self-end">
                    <IconArrowRight className="h-5 w-5" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="border-t border-cream-300/70" />
        </Container>
      </section>

      {/* ── 이야기 ─────────────────────────────────────────────── */}
      <section className="texture-dawn relative overflow-hidden py-28 sm:py-36 lg:py-44">
        <Container className="relative max-w-3xl text-center">
          <Eyebrow className="mb-6 justify-center">{t.storyEyebrow}</Eyebrow>
          <h2 className="display text-[2.15rem] sm:text-[2.9rem] lg:text-[3.2rem]">
            {t.storyTitle}
          </h2>

          {/* 비석이 세워지던 날의 사진 */}
          <div className="mt-12">
            {/*
              제막 사진은 5:4 에 가깝습니다. 넓게 자르면 바르가스 준장도
              비석도 화면 밖으로 나가 버리므로, 원본 비율 그대로 둡니다.
            */}
            <PhotoFrame
              photo={site.homePhotos.story}
              locale={locale}
              pendingLabel={dict.common.photoPending}
              ratio="aspect-5/4"
            />
          </div>

          <blockquote className="mt-12">
            <p className="font-serif text-[1.4rem] leading-[1.6] whitespace-pre-line text-bark-700 italic sm:text-[1.9rem] lg:text-[2.15rem]">
              {locale === "ko"
                ? "“74년 전에 세워진 작은 비석 하나에 담겨 있던,\n잊혀진 전쟁의 잊혀진 영웅 이야기.”"
                : "“In one small stone set seventy-four years ago lay the story\nof forgotten heroes of a forgotten war.”"}
            </p>
            <footer className="mt-6 text-sm text-bark-500">
              {site.org[locale].representative} ·{" "}
              {site.org[locale].representativeTitle}
            </footer>
          </blockquote>

          <p className="mx-auto mt-12 max-w-2xl text-[1.0625rem] leading-[1.85] text-bark-600">
            {t.storyBody}
          </p>

          <div className="mt-10 flex justify-center">
            <Button href={`/${locale}/about`} variant="secondary">
              {t.storyCta}
            </Button>
          </div>
        </Container>
      </section>

      {/* ── 얼굴들 · 사진 기념관 ────────────────────────────────── */}
      <Ridgeline fill="var(--color-khaki-800)" className="h-10 sm:h-16" />
      <section className="texture-grain bg-khaki-800 text-cream-100">
        <Container className="pb-20 sm:pb-24">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="dark" className="mb-5 justify-center">
              {t.galleryEyebrow}
            </Eyebrow>
            <h2 className="display text-[2.05rem] text-cream-50 sm:text-[2.7rem] lg:text-[3rem]">
              {t.galleryTitle}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.85] text-cream-100/75">
              {t.galleryBody}
            </p>
          </div>

          {/* 전시실 벽에 걸린 것처럼 — 높낮이를 조금씩 어긋나게 둡니다. */}
          <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6">
            {site.homePhotos.faces.map((photo, index) => (
              <PhotoFrame
                key={index}
                photo={photo}
                locale={locale}
                pendingLabel={dict.common.photoPending}
                tone="dark"
                className={index % 2 === 1 ? "sm:mt-10" : ""}
              />
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Button href={`/${locale}/gallery`} variant="onDark">
              {t.galleryCta}
            </Button>
            <TextLink href={`/${locale}/programs#museum`} tone="dark">
              {dict.common.learnMore}
            </TextLink>
          </div>
        </Container>
      </section>
      <Ridgeline
        fill="var(--color-khaki-800)"
        flip
        className="h-10 sm:h-16"
      />

      {/* ── 소식 ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t.newsEyebrow} title={t.newsTitle} />
            <TextLink href={`/${locale}/news`}>{dict.common.viewAll}</TextLink>
          </div>

          {news.length === 0 ? (
            <p className="mt-10 text-sm text-bark-500">{t.newsEmpty}</p>
          ) : (
            <ul className="mt-14">
              {news.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/${locale}/news/${post.slug}`}
                    className="group grid gap-3 border-t border-cream-300/70 py-8 sm:grid-cols-12 sm:gap-8"
                  >
                    <div className="sm:col-span-3">
                      <span className="inline-flex rounded-full bg-khaki-100 px-3 py-1 text-xs font-medium text-khaki-600">
                        {dict.news.categories[post.category]}
                      </span>
                      <time
                        dateTime={post.date}
                        className="mt-3 block text-xs text-bark-500"
                      >
                        {formatDate(post.date, locale)}
                      </time>
                    </div>
                    <div className="sm:col-span-9">
                      <h3 className="font-serif text-lg leading-snug font-semibold transition-colors group-hover:text-ochre-700 sm:text-xl">
                        {post.title[locale]}
                      </h3>
                      <p className="mt-2.5 line-clamp-2 max-w-2xl text-[0.9375rem] leading-[1.8] text-bark-600">
                        {post.excerpt[locale]}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-cream-300/70" />
        </Container>
      </section>

      {/* ── 후원과 연락 ─────────────────────────────────────────── */}
      <Ridgeline fill="var(--color-ochre-700)" className="h-10 sm:h-16" />
      <section className="texture-grain bg-ochre-700 text-cream-100">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow={t.supportEyebrow}
            title={t.supportTitle}
            body={t.supportBody}
            align="center"
            tone="dark"
          />

          <div className="mt-12 flex flex-col items-center gap-7">
            <Button href={`/${locale}/support`} variant="onDark">
              {dict.common.donate}
            </Button>

            <div className="flex items-center gap-4 text-cream-100/45">
              <span aria-hidden className="h-px w-12 bg-cream-100/20" />
              <span className="eyebrow">{dict.contact.title}</span>
              <span aria-hidden className="h-px w-12 bg-cream-100/20" />
            </div>

            <ContactActions
              callLabel={dict.common.call}
              emailLabel={dict.common.email}
              tone="dark"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
