import type { Locale } from "@/i18n";

export type NewsCategory = "notice" | "event" | "report" | "press";

export type NewsPost = {
  slug: string;
  /** YYYY-MM-DD */
  date: string;
  category: NewsCategory;
  /** 목록 상단에 고정 */
  pinned?: boolean;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  /** 문단 배열 */
  body: Record<Locale, string[]>;
};

/**
 * 공지·소식.
 *
 * 새 글은 이 배열 맨 앞에 추가하면 됩니다. 날짜순으로 자동 정렬됩니다.
 * 아래 두 건은 사업회 확인 후 세부 내용(시간·장소·계좌)을 채워 주세요.
 */
export const newsPosts: NewsPost[] = [
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
        "정확한 시간과 장소, 식순은 확정되는 대로 이 게시판과 홈 화면에 다시 안내드리겠습니다. 참석을 원하시는 분은 '신청·예약' 페이지에서 미리 알려 주시면 준비에 큰 도움이 됩니다.",
        "단체로 참석하시거나 헌화를 계획하고 계신 기관·학교·기업은 문의하기를 통해 연락 주시기 바랍니다.",
      ],
      en: [
        "The Camp Tiano Memorial Association will hold the 74th memorial ceremony on 18 September.",
        "It is a gathering to remember the Filipino soldiers who came to the Korean War, and those who fell on this soil. Veterans and their families are our honoured guests, and anyone who wishes to give thanks is welcome to join.",
        "The exact time, venue, and order of service will be posted here and on the home page as soon as they are confirmed. If you plan to attend, letting us know through the Register page helps us prepare.",
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
