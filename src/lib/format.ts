import type { Locale } from "@/i18n";

const TIME_ZONE = "Asia/Seoul";

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

export function formatDateTime(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

/** 숫자로만 — 크게 보여 주는 날짜 (1952. 9. 18. / 18 Sept 1952) */
export function formatDateNumeric(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-GB", {
    year: "numeric",
    month: locale === "ko" ? "numeric" : "short",
    day: "numeric",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

export function formatCurrency(amount: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * 주소로 지도 앱을 여는 링크.
 * 위도·경도를 몰라도 방문자가 길찾기를 시작할 수 있습니다.
 */
export function mapLinks(address: string) {
  const q = encodeURIComponent(address);
  return {
    kakao: `https://map.kakao.com/?q=${q}`,
    naver: `https://map.naver.com/p/search/${q}`,
    google: `https://www.google.com/maps/search/?api=1&query=${q}`,
  };
}

/** 서수 접미사 — 영어에서 74th 같은 표기에 사용 */
export function ordinal(n: number) {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}
