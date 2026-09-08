import Image from "next/image";
import type { Locale } from "@/i18n";
import { asset } from "@/lib/asset";

type Photo = {
  src: string;
  alt: Record<Locale, string>;
  caption?: Record<Locale, string>;
};

/**
 * 액자에 걸린 사진 한 장.
 *
 * 사진 기념관에 걸린 모습 그대로 — 크림색 마운트에 얹고 가는 테를 둘렀습니다.
 * 사진이 있을 때만 씁니다. 빈 액자는 두지 않습니다.
 */
export function PhotoFrame({
  photo,
  locale,
  ratio = "aspect-4/5",
  tone = "light",
  className = "",
  priority = false,
}: {
  photo: Photo;
  locale: Locale;
  ratio?: string;
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  const dark = tone === "dark";

  return (
    <figure className={className}>
      <div
        className={`overflow-hidden rounded-sm p-2 shadow-warm sm:p-2.5 ${
          dark ? "bg-cream-100" : "bg-cream-50 ring-1 ring-cream-300/70"
        }`}
      >
        <Image
          src={asset(photo.src)}
          alt={photo.alt[locale]}
          width={900}
          height={1125}
          priority={priority}
          className={`${ratio} h-auto w-full object-cover`}
        />
      </div>

      {photo.caption ? (
        <figcaption
          className={`mt-3 text-xs leading-relaxed ${
            dark ? "text-cream-100/60" : "text-bark-500"
          }`}
        >
          {photo.caption[locale]}
        </figcaption>
      ) : null}
    </figure>
  );
}
