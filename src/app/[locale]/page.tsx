import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactActions } from "@/components/ContactActions";
import { Countdown } from "@/components/Countdown";
import { MemorialScene } from "@/components/MemorialScene";
import { programIcons, IconArrowRight, IconMapPin } from "@/components/Icons";
import {
  Button,
  Card,
  Container,
  PhotoSlot,
  SectionHeading,
  TextLink,
} from "@/components/ui";
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
      {/* ── 히어로 ─────────────────────────────────────────────── */}
      <section className="texture-paper relative overflow-hidden bg-cream-100">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-ochre-400/50 to-transparent"
        />
        <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:gap-16 lg:py-28">
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
            <figure className="rise rise-2 relative">
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
              <figcaption className="mt-3.5 text-xs leading-relaxed text-bark-500">
                {locale === "ko"
                  ? "70년을 그 자리에서 견뎌 온 기념비."
                  : "The stone that has kept its place for seventy years."}
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* ── 추모식 안내 ─────────────────────────────────────────── */}
      <section className="texture-grain bg-khaki-600 text-cream-100">
        <Container className="flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-ochre-300 uppercase">
              {t.ceremonyLabel}
            </p>
            <h2 className="font-serif text-2xl font-semibold text-cream-50 sm:text-3xl">
              {ceremonyTitle}
            </h2>
            <p className="mt-3 text-sm text-cream-200/80">
              {formatDateTime(site.ceremony.datetime, locale)}
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-sm text-cream-200/80">
              <IconMapPin className="h-4 w-4 shrink-0 text-ochre-300" />
              {site.ceremony.place[locale]}
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center lg:gap-8">
            <Countdown
              datetime={site.ceremony.datetime}
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

      {/* ── 세 가지 사업 ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={t.missionEyebrow}
            title={t.missionTitle}
            body={t.missionBody}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {featured.map((program) => {
              const Icon = programIcons[program.icon];
              return (
                <Card key={program.id} className="flex flex-col">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ochre-200/50 text-ochre-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold">
                    {program.title[locale]}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-bark-600">
                    {program.lead[locale]}
                  </p>
                  <div className="mt-6">
                    <TextLink href={`/${locale}/programs#${program.id}`}>
                      {dict.common.learnMore}
                    </TextLink>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── 이야기 ─────────────────────────────────────────────── */}
      <section className="texture-paper border-y border-cream-300/70 bg-cream-100/70 py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="grid grid-cols-2 gap-4">
            <PhotoSlot
              label={dict.common.photoPending}
              ratio="aspect-3/4"
              className="mt-8"
            />
            <PhotoSlot label={dict.common.photoPending} ratio="aspect-3/4" />
          </div>

          <div>
            <SectionHeading
              eyebrow={t.storyEyebrow}
              title={t.storyTitle}
              body={t.storyBody}
            />
            <blockquote className="mt-8 border-l-2 border-ochre-400 pl-6">
              <p className="font-serif text-lg leading-relaxed text-bark-700 italic">
                {locale === "ko"
                  ? "“70년 전에 세워진 작은 비석 하나에 담겨 있던, 잊혀진 전쟁의 잊혀진 영웅 이야기.”"
                  : "“In one small stone set seventy years ago lay the story of forgotten heroes of a forgotten war.”"}
              </p>
              <footer className="mt-3 text-sm text-bark-500">
                {site.org[locale].representative} ·{" "}
                {site.org[locale].representativeTitle}
              </footer>
            </blockquote>
            <div className="mt-8">
              <TextLink href={`/${locale}/about`}>{t.storyCta}</TextLink>
            </div>
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
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {news.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/${locale}/news/${post.slug}`}
                    className="group block h-full rounded-2xl bg-cream-50 p-6 ring-1 ring-cream-300/80 transition-shadow duration-300 hover:shadow-warm sm:p-7"
                  >
                    <div className="flex items-center gap-3 text-xs text-bark-500">
                      <span className="rounded-full bg-khaki-200/60 px-2.5 py-1 font-medium text-khaki-700">
                        {dict.news.categories[post.category]}
                      </span>
                      <time dateTime={post.date}>
                        {formatDate(post.date, locale)}
                      </time>
                    </div>
                    <h3 className="mt-4 font-serif text-lg leading-snug font-semibold transition-colors group-hover:text-ochre-700">
                      {post.title[locale]}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-bark-600">
                      {post.excerpt[locale]}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ochre-700">
                      {dict.common.learnMore}
                      <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* ── 갤러리 미리보기 ─────────────────────────────────────── */}
      <section className="texture-paper border-y border-cream-300/70 bg-cream-100/70 py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={t.galleryEyebrow}
              title={t.galleryTitle}
              body={t.galleryBody}
            />
            <TextLink href={`/${locale}/gallery`}>
              {dict.common.viewAll}
            </TextLink>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <PhotoSlot
                key={index}
                label={dict.common.photoPending}
                ratio="aspect-square"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ── 후원 ───────────────────────────────────────────────── */}
      <section className="texture-grain bg-ochre-700 text-cream-100">
        <Container className="grid gap-10 py-20 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow={t.supportEyebrow}
            title={t.supportTitle}
            body={t.supportBody}
            tone="dark"
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-end">
            <Button href={`/${locale}/support`} variant="onDark">
              {dict.common.donate}
            </Button>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-cream-100 ring-1 ring-cream-200/40 transition-colors hover:bg-cream-100/10"
            >
              {dict.common.contactUs}
            </Link>
          </div>
        </Container>
      </section>

      {/* ── 연락 ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24">
        <Container className="flex flex-col items-center gap-8 text-center">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-ochre-600 uppercase">
              {dict.nav.contact}
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              {dict.contact.lead}
            </h2>
          </div>
          <ContactActions
            callLabel={dict.common.call}
            emailLabel={dict.common.email}
            size="lg"
          />
        </Container>
      </section>
    </>
  );
}
