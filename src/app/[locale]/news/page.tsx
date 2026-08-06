import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { IconArrowRight } from "@/components/Icons";
import { Container, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { getSortedNews } from "@/content/news";
import { formatDate } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.news.title, description: dict.news.lead };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const posts = getSortedNews();

  return (
    <>
      <PageHeader
        eyebrow={dict.nav.news}
        title={dict.news.title}
        lead={dict.news.lead}
      />

      <section className="py-16 sm:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-sm text-bark-500">{dict.news.empty}</p>
          ) : (
            <ul className="divide-y divide-cream-300/70">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/${locale}/news/${post.slug}`}
                    className="group grid gap-4 py-8 transition-colors sm:grid-cols-12 sm:gap-8"
                  >
                    <div className="sm:col-span-3">
                      <div className="flex flex-wrap items-center gap-2.5 text-xs">
                        <span className="rounded-full bg-khaki-200/60 px-2.5 py-1 font-medium text-khaki-700">
                          {dict.news.categories[post.category]}
                        </span>
                        {post.pinned ? (
                          <span className="rounded-full bg-ochre-200/60 px-2.5 py-1 font-medium text-ochre-700">
                            {locale === "ko" ? "고정" : "Pinned"}
                          </span>
                        ) : null}
                      </div>
                      <time
                        dateTime={post.date}
                        className="mt-3 block text-sm text-bark-500"
                      >
                        {formatDate(post.date, locale)}
                      </time>
                    </div>

                    <div className="sm:col-span-9">
                      <h2 className="font-serif text-xl leading-snug font-semibold transition-colors group-hover:text-ochre-700 sm:text-2xl">
                        {post.title[locale]}
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bark-600">
                        {post.excerpt[locale]}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ochre-700">
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
    </>
  );
}
