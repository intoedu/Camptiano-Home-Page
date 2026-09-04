import type { Locale } from "@/i18n";

/**
 * 캠프티아노 기념비의 비문.
 *
 * 사업회에서 보내 주신 사진 — 현재의 비석, 그리고 1952년 건립 당시 촬영된
 * 기록 사진 여러 장 — 을 대조해 옮겨 적었습니다. 건립 당시 사진에서는
 * 글자가 또렷해 전문을 확인할 수 있었습니다.
 */

/** 비석에 새겨진 원문 그대로 */
export const inscriptionOriginal = [
  "CAMP TIANO",
  "SIMP'O-RI, KOREA",
  "",
  "In Memory of",
  "",
  "2nd Lieut. APOLLO B. TIANO,",
  "of CAGAYAN DE ORO CITY,",
  "PHILIPPINES.  K.I.A: 21",
  "JUNE 1952 on HILL EERIE,",
  "KARHWA-GOL, KOREA.",
  "",
  "Dedicated this 18th",
  "day of September 1952, by",
  "the Philippines' 19th B.C.T.",
  "PEFTOK.",
];

/** 우리말 옮김 */
export const inscriptionTranslation: Record<Locale, string[]> = {
  ko: [
    "캠프 티아노",
    "심포리, 한국",
    "",
    "아폴로 B. 티아노 소위를 기억하며",
    "필리핀 카가얀데오로시 출신",
    "1952년 6월 21일 한국 카르와골 이어리 고지에서 전사",
    "",
    "1952년 9월 18일",
    "필리핀 제19대대전투단(PEFTOK) 건립",
  ],
  en: [
    "Camp Tiano",
    "Simp'o-ri, Korea",
    "",
    "In memory of 2nd Lieut. Apollo B. Tiano",
    "of Cagayan de Oro City, Philippines",
    "Killed in action 21 June 1952 on Hill Eerie, Karhwa-gol, Korea",
    "",
    "Dedicated 18 September 1952",
    "by the Philippines' 19th Battalion Combat Team, PEFTOK",
  ],
};

export const inscriptionHeading: Record<Locale, string> = {
  ko: "비문",
  en: "The inscription",
};

export const inscriptionNote: Record<Locale, string> = {
  ko: "1952년 건립 당시의 기록 사진과 현재의 비석을 대조해 옮겼습니다.",
  en: "Transcribed from photographs taken at the dedication in 1952, checked against the stone as it stands today.",
};

/** 비문에서 확인된 사실 */
export const inscriptionFacts: {
  label: Record<Locale, string>;
  value: Record<Locale, string>;
}[] = [
  {
    label: { ko: "성함", en: "Name" },
    value: { ko: "아폴로 B. 티아노 (Apollo B. Tiano)", en: "Apollo B. Tiano" },
  },
  {
    label: { ko: "계급", en: "Rank" },
    value: { ko: "소위 (2nd Lieutenant)", en: "Second Lieutenant" },
  },
  {
    label: { ko: "소속", en: "Unit" },
    value: {
      ko: "필리핀군 제19대대전투단(19th BCT) · PEFTOK",
      en: "Philippine 19th Battalion Combat Team · PEFTOK",
    },
  },
  {
    label: { ko: "출신", en: "From" },
    value: {
      ko: "필리핀 카가얀데오로시",
      en: "Cagayan de Oro City, Philippines",
    },
  },
  {
    label: { ko: "전사", en: "Killed in action" },
    value: {
      ko: "1952년 6월 21일 · 이어리 고지(Hill Eerie), 카르와골",
      en: "21 June 1952 · Hill Eerie, Karhwa-gol",
    },
  },
  {
    label: { ko: "비석 건립", en: "Stone dedicated" },
    value: {
      ko: "1952년 9월 18일 · 필리핀 제19대대전투단",
      en: "18 September 1952 · the Philippines' 19th BCT",
    },
  },
];

/**
 * 사진 설명에 적혀 있던 기록.
 * TODO: 장군 성함의 한글 표기를 사업회에서 확인해 주세요.
 */
export const dedicationNote: Record<Locale, string[]> = {
  ko: [
    "1952년 9월 18일, 전우들이 손수 세운 비석 앞에서 제막식이 열렸습니다. 필리핀군 참모차장 헤수스 바르가스(Jesus Vargas) 준장이 덮개를 벗겼습니다.",
    "그날 그 자리에 모인 부대원들의 사진이 남아 있습니다. 헬멧을 쓴 청년들이 비석 앞에 줄지어 서 있고, 뒤로는 양구의 산이 보입니다.",
  ],
  en: [
    "On 18 September 1952 the stone his comrades had raised was unveiled. Brigadier General Jesus Vargas, Vice Chief of Staff of the Armed Forces of the Philippines, drew back the cover.",
    "Photographs of that day survive. Young men in helmets stand in ranks before the stone, the hills of Yanggu rising behind them.",
  ],
};

/** 유족이 보존해 온 사진 모음의 이름 — 사진을 실을 때 함께 밝힙니다. */
export const photoCredit: Record<Locale, string> = {
  ko: "사진: 티아노 가족 명예의 벽 소장 (Tiano Family Wall of Honor Collection)",
  en: "Photographs courtesy of the Tiano Family Wall of Honor Collection",
};
