import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Image from "next/image";
import { Button, Container, PhotoSlot } from "@/components/ui";
import { getDictionary, isLocale, locales, type Locale } from "@/i18n";
import { getNewsPost, getSortedNews, newsPosts } from "@/content/news";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    newsPosts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getNewsPost(slug);
  if (!post) return {};
  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    openGraph: {
      type: "article",
      title: post.title[locale],
      description: post.excerpt[locale],
      publishedTime: post.date,
    },
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const post = getNewsPost(slug);
  if (!post) notFound();

  const others = getSortedNews()
    .filter((item) => item.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <article>
        <header className="texture-paper border-b border-cream-300/70 bg-cream-100/60 pt-14 pb-12 sm:pt-20 sm:pb-16">
          <Container className="max-w-3xl">
            <Link
              href={`/${locale}/news`}
              className="text-sm font-semibold text-ochre-700 transition-colors hover:text-ochre-600"
            >
              ← {dict.common.backTo}
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-khaki-200/60 px-2.5 py-1 font-medium text-khaki-700">
                {dict.news.categories[post.category]}
              </span>
              <time dateTime={post.date} className="text-sm text-bark-500">
                {formatDate(post.date, locale)}
              </time>
            </div>
            <h1 className="mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
              {post.title[locale]}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-bark-600">
              {post.excerpt[locale]}
            </p>
          </Container>
        </header>

        <Container className="max-w-3xl py-14 sm:py-20">
          <div className="space-y-6 text-base leading-loose text-bark-700 sm:text-lg">
            {post.body[locale].map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {post.photos?.length ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {post.photos.map((photo) => (
                <figure
                  key={photo.src}
                  className="overflow-hidden rounded-xl bg-cream-200"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt[locale]}
                    width={1200}
                    height={900}
                    className="h-auto w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          ) : post.photoPlaceholders ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: post.photoPlaceholders }).map((_, i) => (
                <PhotoSlot
                  key={i}
                  label={dict.common.photoPending}
                  ratio="aspect-4/3"
                />
              ))}
            </div>
          ) : null}

          {post.callout ? (
            <aside className="mt-10 rounded-2xl bg-cream-100 p-6 ring-1 ring-ochre-300/60 sm:p-8">
              <h2 className="font-serif text-lg font-semibold text-ochre-700">
                {post.callout.heading[locale]}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {post.callout.lines[locale].map((line, index) => (
                  <li
                    key={index}
                    className="text-base leading-relaxed text-bark-700"
                  >
                    {line}
                  </li>
                ))}
              </ul>
              {post.callout.note ? (
                <p className="mt-5 border-t border-cream-300 pt-4 text-xs leading-relaxed text-bark-500">
                  {post.callout.note[locale]}
                </p>
              ) : null}
            </aside>
          ) : null}

          {/* 부고에는 행사 참석·후원 권유 버튼을 붙이지 않습니다. */}
          {post.category === "memoriam" ? null : (
            <div className="mt-14 flex flex-wrap gap-3 border-t border-cream-300/70 pt-10">
              <Button href={`/${locale}/contact`}>{dict.common.contactUs}</Button>
              <Button href={`/${locale}/support`} variant="secondary">
                {dict.common.donate}
              </Button>
            </div>
          )}
        </Container>
      </article>

      {others.length > 0 ? (
        <section className="texture-paper border-t border-cream-300/70 bg-cream-100/70 py-16">
          <Container>
            <h2 className="font-serif text-xl font-semibold">
              {dict.home.newsTitle}
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${locale}/news/${item.slug}`}
                    className="group block h-full rounded-2xl bg-cream-50 p-6 ring-1 ring-cream-300/80 transition-shadow duration-300 hover:shadow-warm"
                  >
                    <time
                      dateTime={item.date}
                      className="text-xs text-bark-500"
                    >
                      {formatDate(item.date, locale)}
                    </time>
                    <h3 className="mt-2 font-serif text-lg leading-snug font-semibold transition-colors group-hover:text-ochre-700">
                      {item.title[locale]}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
