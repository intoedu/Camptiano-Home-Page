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

export function formatCurrency(amount: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
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
