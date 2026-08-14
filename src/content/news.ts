import type { Locale } from "@/i18n";

export type NewsCategory = "notice" | "event" | "report" | "press" | "memoriam";

export type NewsPost = {
  slug: string;
  /** YYYY-MM-DD */
  date: string;
  category: NewsCategory;
  /** 목록 상단에 고정 */
  pinned?: boolean;
  /**
   * 부고나 긴급 안내처럼 모든 페이지 상단에 띠로 알려야 하는 글.
   * 한 번에 하나만 표시되며, 가장 최근 글이 우선합니다.
   */
  urgent?: boolean;
  /** 상단 띠에 쓰일 짧은 문구 */
  urgentLabel?: Record<Locale, string>;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  /** 문단 배열 */
  body: Record<Locale, string[]>;
  /** 본문 뒤에 상자로 강조해 보여 줄 안내 (후원 계좌 등) */
  callout?: {
    heading: Record<Locale, string>;
    lines: Record<Locale, string[]>;
    note?: Record<Locale, string>;
  };
  /** 본문에 곁들일 사진. /public 아래 경로. */
  photos?: { src: string; alt: Record<Locale, string> }[];
  /** 사진이 아직 없을 때 보여 줄 자리표시자 개수 */
  photoPlaceholders?: number;
};

/**
 * 공지·소식.
 *
 * 새 글은 이 배열 맨 앞에 추가하면 됩니다. 날짜순으로 자동 정렬됩니다.
 * 아래 두 건은 사업회 확인 후 세부 내용(시간·장소·계좌)을 채워 주세요.
 */
export const newsPosts: NewsPost[] = [
  {
    slug: "col-flores-in-memoriam",
    date: "2026-08-06",
    category: "memoriam",
    pinned: true,
    urgent: true,
    urgentLabel: {
      ko: "부고 — 한국전 참전용사 플로레스 대령 별세",
      en: "In memoriam — Col. Flores, Korean War veteran",
    },
    title: {
      ko: "부고 — 필리핀 제14대대전투단 플로레스 대령 별세",
      en: "In memoriam — Col. Flores of the 14th BCT",
    },
    excerpt: {
      ko: "한국전쟁에 참전한 필리핀 제14대대전투단(14th BCT)의 퇴역 장교이자 14th BCT 초대 회장이었던 플로레스 대령께서 97세를 일기로 별세하셨습니다. 장례를 위한 도움을 청합니다.",
      en: "Col. Flores — a retired officer of the Philippine 14th Battalion Combat Team and its first association president — has passed away at the age of 97. His family asks for help with the funeral.",
    },
    body: {
      ko: [
        "한국전쟁에 참전했던 필리핀 제14대대전투단(14th BCT)의 퇴역 장교이자 14th BCT 초대 회장이었던 플로레스 대령(Col. Flores)께서 97세를 일기로 별세하셨습니다.",
        "플로레스 대령은 장애를 안고 살아오신 참전용사였으며, 한국전쟁 당시 대한민국의 자유를 위해 용감히 싸운 한국전 참전 영웅이었습니다.",
        "고인의 희생과 헌신을 기억하며, 유가족께 깊은 위로를 전합니다.",
        "장례 일정과 장소는 확인되는 대로 이 글에 다시 안내드리겠습니다.",
        "대한민국을 위해 싸워 주신 고인의 희생과 헌신을 기억하며, 유가족에게도 하나님의 위로가 함께하시기를 기도합니다.",
        "캠프티아노기념사업회 윤정화 선교사 올림",
      ],
      en: [
        "Col. Flores, a retired officer of the Philippine 14th Battalion Combat Team (14th BCT) who served in the Korean War, and the first president of the 14th BCT association, has passed away at the age of 97.",
        "He lived with a disability, and he fought bravely for the freedom of the Republic of Korea during the Korean War.",
        "We remember his sacrifice and his service, and we extend our deepest sympathy to his family.",
        "The funeral date and place will be added here as soon as they are confirmed.",
        "We remember the sacrifice and devotion of one who fought for the Republic of Korea, and we pray that God's comfort will be with his family.",
        "Yoon Jung-hwa, Camp Tiano Memorial Association",
      ],
    },
    callout: {
      heading: {
        ko: "장례 후원 안내",
        en: "Helping with the funeral",
      },
      lines: {
        ko: [
          "유가족이 장례를 치를 수 있도록 도움을 청합니다. 작은 금액이라도 큰 힘이 됩니다.",
          "[한국] 카카오뱅크 3333-1838-79101 · 예금주 윤정화",
          "[필리핀] GCash 09477101607 · 예금주 Aira Jane Alcantara",
        ],
        en: [
          "His family has asked for help with the funeral. Any amount, however small, is a great help.",
          "[Korea] KakaoBank 3333-1838-79101 · Yoon Jung-hwa",
          "[Philippines] GCash 09477101607 · Aira Jane Alcantara",
        ],
      },
      note: {
        ko: "이 계좌는 플로레스 대령 장례 후원을 위한 것으로, 사업회의 일반 후원 계좌와 다릅니다.",
        en: "These accounts are for Col. Flores's funeral, and are separate from the association's general donation account.",
      },
    },
    photoPlaceholders: 2,
  },
  {
    slug: "74th-memorial-ceremony",
    date: "2026-08-01",
    category: "event",
    pinned: true,
    title: {
      ko: "제74주년 캠프티아노 추모식 안내",
      en: "The 74th Camp Tiano Memorial Ceremony",
    },
    excerpt: {
      ko: "9월 18일, 캠프티아노 기념비 앞에서 제74주년 추모식을 엽니다. 참전용사와 유가족, 그리고 감사의 마음을 전하고자 하는 모든 분을 모십니다.",
      en: "On 18 September we gather before the Camp Tiano Memorial for the 74th memorial ceremony. Veterans, families, and all who wish to give thanks are welcome.",
    },
    body: {
      ko: [
        "캠프티아노기념사업회는 오는 9월 18일 제74주년 추모식을 엽니다.",
        "한국전쟁에 참전한 필리핀 용사들과, 이 땅에서 스러져 간 전사자들을 기억하는 자리입니다. 참전용사와 유가족은 물론, 감사의 마음을 전하고자 하는 어느 분이든 함께하실 수 있습니다.",
        "정확한 시간과 장소, 식순은 확정되는 대로 이 게시판과 홈 화면에 다시 안내드리겠습니다. 참석을 원하시는 분은 전화나 이메일로 미리 알려 주시면 준비에 큰 도움이 됩니다.",
        "단체로 참석하시거나 헌화를 계획하고 계신 기관·학교·기업은 전화나 이메일로 연락 주시기 바랍니다.",
      ],
      en: [
        "The Camp Tiano Memorial Association will hold the 74th memorial ceremony on 18 September.",
        "It is a gathering to remember the Filipino soldiers who came to the Korean War, and those who fell on this soil. Veterans and their families are our honoured guests, and anyone who wishes to give thanks is welcome to join.",
        "The exact time, venue, and order of service will be posted here and on the home page as soon as they are confirmed. If you plan to attend, a call or an email in advance helps us prepare.",
        "Institutions, schools, and companies attending as a group or planning a wreath-laying are asked to contact us in advance.",
      ],
    },
  },
  {
    slug: "call-for-photographs",
    date: "2026-07-20",
    category: "notice",
    pinned: true,
    title: {
      ko: "참전용사 사진을 찾습니다 — 사진 기념관 준비",
      en: "Looking for photographs — building the memorial hall",
    },
    excerpt: {
      ko: "유가족이 간직해 온 아버지와 할아버지의 사진을 모읍니다. A4·A3 크기로 확대해 상설 전시할 사진 기념관을 준비하고 있습니다.",
      en: "We are gathering the photographs families have kept of their fathers and grandfathers, to be enlarged and permanently exhibited.",
    },
    body: {
      ko: [
        "사업회는 필리핀 참전용사 사진 기념관 건립을 준비하고 있습니다.",
        "유가족이 오랜 시간 간직해 온 아버지와 할아버지의 사진을 모아, A4와 A3 크기까지 확대해 상설로 전시하는 것이 목표입니다. 한 장의 사진이 한 사람의 생애를 되살립니다.",
        "사진은 원본을 보내 주실 필요가 없습니다. 스마트폰으로 찍은 사진이나 스캔본이면 충분하며, 원본을 맡겨 주시는 경우에는 고해상도 스캔 후 안전하게 돌려드립니다.",
        "사진에 담긴 분의 성함, 계급, 부대, 촬영 시기와 장소를 아시는 만큼만 함께 알려 주시면 기록에 큰 도움이 됩니다. 모르셔도 괜찮습니다.",
        "모든 사진은 유가족의 동의를 받은 범위 안에서만 사용하며, 원하지 않으시면 언제든 공개를 중단합니다.",
      ],
      en: [
        "The association is preparing a photo memorial hall for the Filipino veterans of the Korean War.",
        "Our aim is to gather the photographs families have kept for decades — of fathers and grandfathers — and enlarge them to A4 and A3 for permanent exhibition. A single photograph can bring back a whole life.",
        "You do not need to send us an original. A phone photo or a scan is enough. If you do entrust an original to us, we will scan it at high resolution and return it safely.",
        "If you know the name, rank, unit, or when and where the photograph was taken, please tell us as much as you can — it helps the record enormously. If you don't know, that is perfectly all right.",
        "Every photograph is used only within the limits the family agrees to, and we will withdraw any image from public view at a family's request.",
      ],
    },
  },
];

export function getSortedNews() {
  return [...newsPosts].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.date.localeCompare(a.date);
  });
}

export function getNewsPost(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}

/** 모든 페이지 상단 띠에 띄울 글 — 가장 최근 것 하나만. */
export function getUrgentPost() {
  return [...newsPosts]
    .filter((post) => post.urgent)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
}
