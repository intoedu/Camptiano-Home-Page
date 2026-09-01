/**
 * 사이트 전역 설정 — 단체 정보, 연락처, 추모식 일정, 기금 정보.
 *
 * 이 파일 하나만 고치면 사이트 전체에 반영됩니다.
 * `TODO:` 로 표시된 값은 사업회 확인이 필요한 항목입니다.
 */

/**
 * 사이트가 실제로 열리는 주소.
 * 도메인을 구매해 연결하기 전까지는 GitHub 기본 주소를 사용합니다.
 * (검색엔진에 알려 줄 주소·sitemap 에 쓰입니다)
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://intoedu.github.io/Camptiano-Home-Page";

export const site = {
  domain: "www.camptiano.kr",
  url: SITE_URL,

  org: {
    ko: {
      name: "캠프티아노기념사업회",
      shortName: "캠프티아노",
      tagline: "잊혀진 전쟁의, 잊혀진 영웅들을 기억합니다",
      representativeTitle: "회장",
      representative: "윤정화",
    },
    en: {
      name: "Camp Tiano Memorial Association",
      shortName: "Camp Tiano",
      tagline: "Remembering the forgotten heroes of the forgotten war",
      representativeTitle: "President",
      representative: "Yoon Jung-hwa",
    },
  },

  contact: {
    // TODO: 개인 휴대폰·개인 이메일을 그대로 공개할지 확인 필요.
    //       공개용 대표번호/대표메일이 따로 생기면 여기만 교체하면 됩니다.
    phone: "010-2603-0324",
    phoneHref: "+82-10-2603-0324",
    email: "yoonjenny324@gmail.com",
    // 캠프티아노기념교회 개소 안내문에 인쇄된 주소.
    // TODO: 한글 표기(죽곡로)와 상세 주소가 맞는지 사업회 확인 부탁드립니다.
    address: {
      ko: "강원도 양구군 죽곡로 289",
      en: "289 Jukgok-ro, Yanggu-gun, Gangwon-do, Korea",
    },
  },

  social: {
    // TODO: 실제 계정 주소로 교체 (없으면 빈 문자열로 두면 자동으로 숨겨집니다)
    youtube: "",
    facebook: "",
    instagram: "",
    kakao: "",
  },

  /**
   * 메인 화면 큰 사진.
   * 기념비 사진이 준비되면 "/images/파일이름.jpg" 를 넣어 주세요.
   * 비어 있으면 삽화(MemorialScene)가 대신 표시됩니다.
   */
  heroPhoto: "",
  heroPhotoAlt: {
    ko: "캠프티아노 기념비",
    en: "The Camp Tiano Memorial",
  },

  /** 기념비 위치 — 지도 및 오시는 길에 사용 */
  memorial: {
    // TODO: 캠프티아노 기념비 정확한 주소·좌표 확인 필요
    name: { ko: "캠프티아노 기념비", en: "Camp Tiano Memorial" },
    address: { ko: "위치 확인 중", en: "Location to be confirmed" },
    lat: null as number | null,
    lng: null as number | null,
  },

  /** 다가오는 추모식 */
  ceremony: {
    /** ISO 8601 (KST). TODO: 정확한 시각·장소 확인 필요 */
    datetime: "2026-09-18T11:00:00+09:00",
    anniversary: 74,
    place: {
      ko: "캠프티아노 기념비 (장소 확정 예정)",
      en: "Camp Tiano Memorial (venue to be confirmed)",
    },
  },

  /** 3대 모금 사업 — 홈 화면과 후원 페이지에서 공유 */
  funds: [
    {
      id: "scholarship",
      ko: {
        name: "참전용사 후손 장학기금",
        summary:
          "필리핀 참전용사의 손자·손녀 세대가 배움을 이어 갈 수 있도록 장학금을 지원합니다.",
      },
      en: {
        name: "Descendants' Scholarship Fund",
        summary:
          "Scholarships so the grandchildren of Filipino Korean War veterans can continue their education.",
      },
      // TODO: 목표액·현재 모금액 확정 후 입력 (null 이면 진행률 막대가 숨겨집니다)
      goal: null as number | null,
      raised: null as number | null,
    },
    {
      id: "wall",
      ko: {
        name: "전사자의 벽 건립기금",
        summary:
          "한국 땅에서 스러져 간 필리핀 참전 전사자들의 이름을 하나도 빠짐없이 새겨 남깁니다.",
      },
      en: {
        name: "Wall of the Fallen",
        summary:
          "Engraving the name of every Filipino soldier who fell on Korean soil — not one left out.",
      },
      goal: null as number | null,
      raised: null as number | null,
    },
    {
      id: "museum",
      ko: {
        name: "사진 기념관 건립기금",
        summary:
          "유가족이 간직해 온 아버지와 할아버지의 사진을 모아 상설 전시관을 세웁니다.",
      },
      en: {
        name: "Photo Memorial Hall",
        summary:
          "Gathering the photographs families have kept of their fathers and grandfathers into a permanent exhibition.",
      },
      goal: null as number | null,
      raised: null as number | null,
    },
  ],

  /**
   * 온라인 간편 후원 링크.
   * 카카오페이·토스는 송금 링크만 만들면 되므로 결제 대행 계약 없이,
   * 비용 없이 바로 쓸 수 있습니다.
   * TODO: 링크를 만들어 아래에 넣어 주세요. 빈 값이면 버튼이 숨겨집니다.
   */
  donationLinks: [
    { id: "kakaopay", label: { ko: "카카오페이로 후원", en: "Give with KakaoPay" }, url: "" },
    { id: "toss", label: { ko: "토스로 후원", en: "Give with Toss" }, url: "" },
  ],

  /** 후원 계좌 — TODO: 사업회 명의 계좌 확정 후 입력 */
  bank: {
    name: { ko: "은행명 확인 중", en: "Bank to be confirmed" },
    account: "000-0000-0000-00",
    holder: { ko: "캠프티아노기념사업회", en: "Camp Tiano Memorial Association" },
  },
} as const;

export type Locale = "ko" | "en";

/**
 * 상단 메뉴. 여섯 개까지만 둡니다 — 더 늘어나면 한눈에 들어오지 않습니다.
 * 자주 묻는 질문은 하단 바로가기에서 찾을 수 있습니다.
 */
export const navigation = [
  { href: "/about", key: "about" },
  { href: "/programs", key: "programs" },
  { href: "/news", key: "news" },
  { href: "/gallery", key: "gallery" },
  { href: "/visit", key: "visit" },
  { href: "/contact", key: "contact" },
] as const;

/** 하단 바로가기 — 상단 메뉴에 더해 안내 성격의 페이지까지 */
export const footerNavigation = [
  ...navigation,
  { href: "/faq", key: "faq" },
  { href: "/support", key: "support" },
] as const;

export function localePath(locale: Locale, href: string) {
  return `/${locale}${href === "/" ? "" : href}` || "/";
}
