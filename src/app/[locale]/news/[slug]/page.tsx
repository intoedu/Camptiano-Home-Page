import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button, Container } from "@/components/ui";
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

          <div className="mt-14 flex flex-wrap gap-3 border-t border-cream-300/70 pt-10">
            <Button href={`/${locale}/apply`}>{dict.common.applyNow}</Button>
            <Button href={`/${locale}/support`} variant="secondary">
              {dict.common.donate}
            </Button>
          </div>
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
