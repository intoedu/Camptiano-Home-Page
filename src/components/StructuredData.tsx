import type { Locale } from "@/i18n";
import { site } from "@/lib/site";

/**
 * 검색엔진이 읽는 구조화 데이터(JSON-LD).
 *
 * 사람 눈에는 보이지 않지만, 구글이 "이 단체는 무엇이고 추모식은 언제인가"를
 * 정확히 이해하게 해 줍니다. 보훈단체 이름으로 검색했을 때 행사 일정이
 * 함께 노출되도록 하는 것이 목적입니다.
 *
 * 확인되지 않은 값(장소 주소 등)은 넣지 않습니다. 비워 두는 편이
 * 틀린 값을 넣는 것보다 낫습니다.
 */
export function StructuredData({ locale }: { locale: Locale }) {
  const org = site.org[locale];

  const organization = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: org.name,
    alternateName: site.org[locale === "ko" ? "en" : "ko"].name,
    url: `${site.url}/${locale}/`,
    image: `${site.url}/og.jpg`,
    description: org.tagline,
    email: site.contact.email,
    telephone: site.contact.phoneHref,
    // 값이 있는 계정만 싣습니다.
    sameAs: Object.values(site.social).filter(Boolean),
  };

  const ceremony = {
    "@context": "https://schema.org",
    "@type": "Event",
    name:
      locale === "ko"
        ? `제${site.ceremony.anniversary}주년 캠프티아노 추모식`
        : `The ${site.ceremony.anniversary}th Camp Tiano Memorial Ceremony`,
    startDate: site.ceremony.datetime,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    // 정확한 주소가 확인되기 전까지는 이름만 밝힙니다.
    location: { "@type": "Place", name: site.memorial.name[locale] },
    organizer: { "@type": "Organization", name: org.name, url: site.url },
    image: `${site.url}/og.jpg`,
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      // 우리가 만든 값만 들어가므로 외부 입력이 섞일 여지가 없습니다.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organization, ceremony]),
      }}
    />
  );
}
