import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactActions } from "@/components/ContactActions";
import { Countdown } from "@/components/Countdown";
import { MemorialScene } from "@/components/MemorialScene";
import { programIcons, IconArrowRight, IconMapPin } from "@/components/Icons";
import { Button, Container, SectionHeading, TextLink } from "@/components/ui";
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
      {/* ── 첫 화면 ─────────────────────────────────────────────── */}
      <section className="texture-paper relative overflow-hidden bg-cream-100">
        <Container className="relative grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-7">
            <p className="rise mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-ochre-600 uppercase">
              <span aria-hidden className="h-px w-10 bg-ochre-400" />
              {t.heroEyebrow}
            </p>
            <h1 className="rise rise-1 text-4xl leading-[1.15] font-semibold whitespace-pre-line sm:text-5xl lg:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="rise rise-2 mt-7 max-w-xl text-base leading-relaxed text-bark-600 sm:text-lg">
              {t.heroBody}
            </p>
            <div className="rise rise-3 mt-9 flex flex-wrap gap-3">
              <Button href={`/${locale}/visit`}>{t.heroPrimary}</Button>
              <Button href={`/${locale}/about`} variant="secondary">
                {t.heroSecondary}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="rise rise-2">
              <div className="overflow-hidden rounded-2xl shadow-warm-lg ring-1 ring-ochre-300/30">
                {site.heroPhoto ? (
                  <Image
                    src={site.heroPhoto}
                    alt={site.heroPhotoAlt[locale]}
                    width={800}
                    height={1000}
                    priority
                    className="aspect-4/5 h-auto w-full object-cover"
                  />
                ) : (
                  <MemorialScene className="aspect-4/5 w-full" />
                )}
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── 다가오는 추모식 ─────────────────────────────────────── */}
      <section className="border-y border-cream-300/70 bg-cream-50">
        <Container className="flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:py-12">
          <div className="flex gap-5">
            <span
              aria-hidden
              className="w-0.5 shrink-0 rounded-full bg-ochre-400"
            />
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-ochre-600 uppercase">
                {t.ceremonyLabel}
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                {ceremonyTitle}
              </h2>
              <p className="mt-2.5 text-sm text-bark-600">
                {formatDateTime(site.ceremony.datetime, locale)}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-bark-500">
                <IconMapPin className="h-4 w-4 shrink-0 text-ochre-500" />
                {site.ceremony.place[locale]}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Countdown
              datetime={site.ceremony.datetime}
              labels={{
                days: dict.common.days,
                hours: dict.common.hours,
                minutes: dict.common.minutes,
              }}
              passedLabel={t.ceremonyPassed}
            />
            <Button href={`/${locale}/contact`} variant="secondary">
              {t.ceremonyCta}
            </Button>
          </div>
        </Container>
      </section>

      {/* ── 세 가지 사업 ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={t.missionEyebrow}
            title={t.missionTitle}
            body={t.missionBody}
          />

          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {featured.map((program) => {
              const Icon = programIcons[program.icon];
              return (
                <div key={program.id} className="flex flex-col">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ochre-200/50 text-ochre-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold">
                    {program.title[locale]}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-bark-600">
                    {program.lead[locale]}
                  </p>
                  <div className="mt-5">
                    <TextLink href={`/${locale}/programs#${program.id}`}>
                      {dict.common.learnMore}
                    </TextLink>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── 이야기 ─────────────────────────────────────────────── */}
      <section className="texture-paper border-y border-cream-300/70 bg-cream-100/70 py-20 sm:py-28">
        <Container className="max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-ochre-600 uppercase">
            {t.storyEyebrow}
          </p>
          <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">
            {t.storyTitle}
          </h2>

          <blockquote className="mt-10">
            <p className="font-serif text-xl leading-relaxed whitespace-pre-line text-bark-700 italic sm:text-2xl">
              {locale === "ko"
                ? "“70년 전에 세워진 작은 비석 하나에 담겨 있던,\n잊혀진 전쟁의 잊혀진 영웅 이야기.”"
                : "“In one small stone set seventy years ago lay the story\nof forgotten heroes of a forgotten war.”"}
            </p>
            <footer className="mt-5 text-sm text-bark-500">
              {site.org[locale].representative} ·{" "}
              {site.org[locale].representativeTitle}
            </footer>
          </blockquote>

          <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-bark-600">
            {t.storyBody}
          </p>

          <div className="mt-9 flex justify-center">
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
            <ul className="mt-12 divide-y divide-cream-300/70 border-y border-cream-300/70">
              {news.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/${locale}/news/${post.slug}`}
                    className="group grid gap-3 py-7 sm:grid-cols-12 sm:gap-8"
                  >
                    <div className="sm:col-span-3">
                      <span className="inline-flex rounded-full bg-khaki-200/60 px-2.5 py-1 text-xs font-medium text-khaki-700">
                        {dict.news.categories[post.category]}
                      </span>
                      <time
                        dateTime={post.date}
                        className="mt-2.5 block text-xs text-bark-500"
                      >
                        {formatDate(post.date, locale)}
                      </time>
                    </div>
                    <div className="sm:col-span-9">
                      <h3 className="font-serif text-lg leading-snug font-semibold transition-colors group-hover:text-ochre-700 sm:text-xl">
                        {post.title[locale]}
                      </h3>
                      <p className="mt-2.5 line-clamp-2 max-w-2xl text-sm leading-relaxed text-bark-600">
                        {post.excerpt[locale]}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ochre-700">
                        {dict.common.learnMore}
                        <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* ── 후원과 연락 ─────────────────────────────────────────── */}
      <section className="texture-grain bg-ochre-700 text-cream-100">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            eyebrow={t.supportEyebrow}
            title={t.supportTitle}
            body={t.supportBody}
            align="center"
            tone="dark"
          />

          <div className="mt-10 flex flex-col items-center gap-6">
            <Button href={`/${locale}/support`} variant="onDark">
              {dict.common.donate}
            </Button>

            <div className="flex items-center gap-4 text-cream-200/50">
              <span aria-hidden className="h-px w-10 bg-cream-200/25" />
              <span className="text-xs tracking-wide">
                {dict.contact.title}
              </span>
              <span aria-hidden className="h-px w-10 bg-cream-200/25" />
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
