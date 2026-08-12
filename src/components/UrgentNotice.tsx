import Link from "next/link";
import { IconArrowRight } from "./Icons";
import { getUrgentPost } from "@/content/news";
import type { Locale } from "@/i18n";

/**
 * 부고나 긴급 안내를 모든 페이지 맨 위에 알리는 띠.
 * 해당하는 글이 없으면 아무것도 그리지 않습니다.
 */
export function UrgentNotice({ locale }: { locale: Locale }) {
  const post = getUrgentPost();
  if (!post) return null;

  const label = post.urgentLabel?.[locale] ?? post.title[locale];

  return (
    <Link
      href={`/${locale}/news/${post.slug}`}
      className="group block bg-khaki-700 text-cream-100 transition-colors hover:bg-khaki-600"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-3 px-5 py-2.5 text-center sm:px-8">
        <span className="text-sm leading-snug font-medium">{label}</span>
        <IconArrowRight className="hidden h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 sm:block" />
      </div>
    </Link>
  );
}
