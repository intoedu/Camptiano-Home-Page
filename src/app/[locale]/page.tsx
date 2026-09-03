import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactActions } from "@/components/ContactActions";
import { Countdown } from "@/components/Countdown";
import { HeroScene } from "@/components/HeroScene";
import { Ridgeline } from "@/components/Ridgeline";
import { IconArrowRight, IconMapPin } from "@/components/Icons";
import { Button, Container, Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { getDictionary, isLocale, fill, type Locale } from "@/i18n";
import { getSortedNews } from "@/content/news";
import { programs } from "@/content/programs";
import { site } from "@/lib/site";
import { formatDate, formatDateTime, ordinal } from "@/lib/format";

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
      {/* ── 첫 화면 · 새벽 능선 ──────────────────────────────────── */}
      <section className="relative isolate flex min-h-[40rem] flex-col justify-center overflow-hidden lg:min-h-[48rem]">
        {site.heroPhoto ? (
          <>
            <Image
              src={site.heroPhoto}
              alt={site.heroPhotoAlt[locale]}
              fill
              priority
              className="-z-10 object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-linear-to-r from-cream-50/95 via-cream-50/70 to-transparent"
            />
          </>
        ) : (
          <HeroScene className="absolute inset-0 -z-10 h-full w-full" />
        )}

        {/*
          글이 놓이는 왼쪽 위에만 옅은 종이빛을 깝니다.
          아래로 갈수록 걷혀서 앞 능선의 짙은 색은 그대로 남습니다.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-cream-50) 0%, color-mix(in srgb, var(--color-cream-50) 42%, transparent) 44%, transparent 72%)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 52%, transparent 82%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 52%, transparent 82%)",
          }}
        />

        <Container className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p className="rise eyebrow mb-6 flex items-center gap-3 text-ochre-600">
              <span aria-hidden className="h-px w-10 bg-ochre-400" />
              {t.heroEyebrow}
            </p>
            <h1 className="rise rise-1 display text-[2.6rem] whitespace-pre-line sm:text-[3.6rem] lg:text-[4.25rem]">
              {t.heroTitle}
            </h1>
            <p className="rise rise-2 mt-8 max-w-xl text-[1.0625rem] leading-[1.85] text-bark-600 sm:text-lg">
              {t.heroBody}
            </p>
            <div className="rise rise-3 mt-10 flex flex-wrap gap-3">
              <Button href={`/${locale}/visit`}>{t.heroPrimary}</Button>
              <Button href={`/${locale}/about`} variant="secondary">
                {t.heroSecondary}
              </Button>
            </div>
          </div>
        </Container>
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
      <Ridgeline fill="var(--color-khaki-800)" flip className="h-10 sm:h-16" />

      {/* ── 세 가지 사업 · 번호를 매긴 목록 ──────────────────────── */}
      <section className="py-20 sm:py-28">
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
                  className="group grid items-baseline gap-x-8 gap-y-3 border-t border-cream-300/70 py-8 transition-colors hover:bg-cream-100/50 sm:grid-cols-12 sm:py-10"
                >
                  <span className="font-serif text-2xl text-ochre-400 tabular-nums sm:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl font-semibold transition-colors group-hover:text-ochre-700 sm:col-span-4 sm:text-2xl">
                    {program.title[locale]}
                  </h3>
                  <p className="text-[0.9375rem] leading-[1.8] text-bark-600 sm:col-span-6">
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
      <section className="texture-dawn relative overflow-hidden py-24 sm:py-32">
        <Container className="relative max-w-3xl text-center">
          <Eyebrow className="mb-6 justify-center">{t.storyEyebrow}</Eyebrow>
          <h2 className="display text-[2rem] sm:text-[2.6rem]">
            {t.storyTitle}
          </h2>

          <blockquote className="mt-12">
            <p className="font-serif text-xl leading-[1.75] whitespace-pre-line text-bark-700 italic sm:text-2xl">
              {locale === "ko"
                ? "“70년 전에 세워진 작은 비석 하나에 담겨 있던,\n잊혀진 전쟁의 잊혀진 영웅 이야기.”"
                : "“In one small stone set seventy years ago lay the story\nof forgotten heroes of a forgotten war.”"}
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
