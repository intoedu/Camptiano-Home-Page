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
 * 사진이 아직 없으면 같은 크기의 빈 액자가 자리를 지킵니다.
 */
export function PhotoFrame({
  photo,
  locale,
  pendingLabel,
  ratio = "aspect-4/5",
  tone = "light",
  className = "",
  priority = false,
}: {
  photo: Photo;
  locale: Locale;
  pendingLabel: string;
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
        {photo.src ? (
          <Image
            src={asset(photo.src)}
            alt={photo.alt[locale]}
            width={900}
            height={1125}
            priority={priority}
            className={`${ratio} h-auto w-full object-cover`}
          />
        ) : (
          <div
            className={`photo-slot flex ${ratio} flex-col items-center justify-center gap-2`}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 text-ochre-600/30"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <path d="m3 15.4 4.6-4.5 3 2.9 2.3-2.1 5.1 4.4" />
              <circle cx="8.2" cy="9.2" r="1.1" />
            </svg>
            <span className="px-3 text-center text-[10px] font-medium tracking-wide text-ochre-700/45">
              {pendingLabel}
            </span>
          </div>
        )}
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
