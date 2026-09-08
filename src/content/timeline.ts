import type { Locale } from "@/i18n";

/**
 * 캠프티아노 연표.
 *
 * 여기 실린 날짜는 모두 근거가 있습니다 — 비문에 새겨져 있거나(1952년 두 항목),
 * 그 날짜에서 바로 계산되는 것(추모식)입니다. 사업회의 설립 연도와 임원 구성처럼
 * 아직 확인되지 않은 것은 넣지 않았습니다. 확인되면 이 목록에 더하면 됩니다.
 */
export type TimelineEntry = {
  /** 화면에 그대로 보이는 연도·날짜 */
  when: Record<Locale, string>;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
  /** 다가올 일 — 다르게 표시합니다 */
  upcoming?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    when: { ko: "1950 – 1953", en: "1950 – 1953" },
    title: { ko: "한국전쟁", en: "The Korean War" },
    body: {
      ko: "필리핀은 주한 필리핀 원정군(PEFTOK)을 보냈습니다. 티아노 소위가 속한 제19대대전투단도 그중 하나였습니다.",
      en: "The Philippines sent the Philippine Expeditionary Forces to Korea (PEFTOK). Lt. Tiano's 19th Battalion Combat Team was one of them.",
    },
  },
  {
    when: { ko: "1952. 6. 21.", en: "21 June 1952" },
    title: { ko: "이어리 고지", en: "Hill Eerie" },
    body: {
      ko: "아폴로 B. 티아노 소위가 카르와골 이어리 고지에서 전사했습니다.",
      en: "2nd Lieut. Apollo B. Tiano was killed in action on Hill Eerie, Karhwa-gol.",
    },
  },
  {
    when: { ko: "1952. 9. 18.", en: "18 September 1952" },
    title: { ko: "비석이 세워지다", en: "The stone is set" },
    body: {
      ko: "제19대대전투단 전우들이 그가 지키던 자리에 비석을 세웠습니다. 필리핀군 참모차장 바르가스 준장이 덮개를 벗겼습니다.",
      en: "His comrades of the 19th BCT raised a stone where he had stood. Brigadier General Vargas drew back the cover.",
    },
  },
  {
    when: { ko: "2026. 9. 18.", en: "18 September 2026" },
    title: { ko: "제74주년 추모식", en: "The 74th memorial ceremony" },
    body: {
      ko: "비석이 세워진 지 74년 되는 날, 같은 자리에서 그 이름을 다시 부릅니다.",
      en: "Seventy-four years to the day, in the same place, we call the name again.",
    },
    upcoming: true,
  },
];
