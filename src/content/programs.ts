import type { Locale } from "@/i18n";

export type Program = {
  id: string;
  /** 후원 페이지의 기금과 연결되는 경우 */
  fundId?: "scholarship" | "wall" | "museum";
  icon: "scholarship" | "wall" | "museum" | "ceremony" | "family" | "education";
  title: Record<Locale, string>;
  lead: Record<Locale, string>;
  body: Record<Locale, string[]>;
  /** 진행 상태 배지 */
  status: Record<Locale, string>;
};

export const programs: Program[] = [
  {
    id: "ceremony",
    icon: "ceremony",
    status: { ko: "매년 진행", en: "Annual" },
    title: { ko: "추모식", en: "Memorial ceremony" },
    lead: {
      ko: "해마다 기념비 앞에 모여, 이 땅을 위해 싸운 이들의 이름을 부릅니다.",
      en: "Each year we gather before the stone and call the names of those who fought for this land.",
    },
    body: {
      ko: [
        "캠프티아노 기념비 앞에서 열리는 추모식은 사업회의 가장 오래된 일이자, 모든 일의 출발점입니다.",
        "참전용사와 유가족, 정부 기관과 기업, 학교와 청소년, 그리고 감사의 마음을 전하고자 하는 국민 누구나 함께합니다. 헌화와 묵념, 참전 기록 낭독으로 이어집니다.",
        "참석은 무료이며, 신청·예약 페이지에서 미리 알려 주시면 좌석과 안내를 준비해 드립니다.",
      ],
      en: [
        "The ceremony before the Camp Tiano Memorial is the association's oldest work, and the origin of everything else we do.",
        "Veterans and families, government bodies and companies, schools and young people, and any citizen who wishes to give thanks stand together — for the wreath-laying, the silence, and the reading of the record.",
        "Attendance is free. Telling us in advance through the Register page lets us prepare seating and guidance for you.",
      ],
    },
  },
  {
    id: "scholarship",
    fundId: "scholarship",
    icon: "scholarship",
    status: { ko: "모금 중", en: "Fundraising" },
    title: { ko: "참전용사 후손 장학기금", en: "Descendants' scholarship fund" },
    lead: {
      ko: "할아버지가 지킨 나라가, 손자의 배움을 지킵니다.",
      en: "The country a grandfather defended now helps a grandchild study.",
    },
    body: {
      ko: [
        "한국전쟁에 참전한 필리핀 용사들의 손자·손녀 세대가 학업을 이어 갈 수 있도록 장학금을 지원합니다.",
        "많은 참전용사 가정이 여전히 넉넉하지 않은 형편에 있습니다. 우리가 받은 것을 그 후손에게 돌려드리는 일이, 감사를 표현하는 가장 구체적인 방법이라고 믿습니다.",
        "선발 기준과 지원 규모, 신청 절차는 기금이 조성되는 대로 이 페이지와 공지·소식에 공개합니다.",
      ],
      en: [
        "Scholarships so that the grandchildren of the Filipino veterans of the Korean War can continue their studies.",
        "Many veterans' households still live with little. Returning what we received to their descendants is, we believe, the most concrete way to say thank you.",
        "Selection criteria, award sizes, and how to apply will be published here and in our news section as the fund is established.",
      ],
    },
  },
  {
    id: "wall",
    fundId: "wall",
    icon: "wall",
    status: { ko: "준비 중", en: "In preparation" },
    title: { ko: "전사자의 벽", en: "The Wall of the Fallen" },
    lead: {
      ko: "이름 하나도 빠뜨리지 않기 위해, 돌에 새깁니다.",
      en: "So that not one name is missing, we cut them into stone.",
    },
    body: {
      ko: [
        "한국 땅에서 전사한 필리핀 참전 장병들의 이름을 한 사람도 빠짐없이 새겨 남기는 벽을 세우려 합니다.",
        "기록에서 누락되거나 표기가 어긋난 이름이 아직 남아 있습니다. 사업회는 필리핀과 한국 양쪽의 자료를 대조하며 명단을 정리하고 있습니다.",
        "혹시 가족 중에 한국전쟁에서 전사하신 분이 계시다면, 문의하기를 통해 알려 주세요. 확인 절차를 거쳐 명단에 반영하겠습니다.",
      ],
      en: [
        "A wall carrying the name of every Filipino soldier who fell on Korean soil — not one left out.",
        "Names are still missing from the records, and some are recorded wrongly. The association is cross-checking Philippine and Korean sources to settle the roll.",
        "If someone in your family fell in the Korean War, please tell us. We will verify and add the name to the roll.",
      ],
    },
  },
  {
    id: "museum",
    fundId: "museum",
    icon: "museum",
    status: { ko: "모금 중", en: "Fundraising" },
    title: { ko: "사진 기념관", en: "The photo memorial hall" },
    lead: {
      ko: "서랍 속 사진 한 장이, 전시실의 한 벽이 됩니다.",
      en: "A photograph from a drawer becomes a wall in an exhibition room.",
    },
    body: {
      ko: [
        "유가족이 오랫동안 간직해 온 아버지와 할아버지의 사진을 모아, A4와 A3 크기까지 확대해 상설로 전시하는 기념관을 세우는 것이 사업회의 가장 큰 목표입니다.",
        "숫자로 남은 참전 기록은 얼굴을 보여 주지 못합니다. 사진은 보여 줍니다. 스무 살 청년의 얼굴을 마주한 사람은 그 전쟁을 다시 생각하게 됩니다.",
        "지금은 사진을 모으는 단계입니다. 원본이 아니어도 좋습니다. 휴대폰으로 찍은 사진이면 충분합니다.",
        "모든 사진은 유가족의 동의를 받은 범위 안에서만 전시하며, 원하지 않으시면 언제든 내립니다.",
      ],
      en: [
        "Our largest aim: to gather the photographs families have kept of their fathers and grandfathers, enlarge them to A4 and A3, and hang them permanently.",
        "A record kept in numbers cannot show a face. A photograph can. Anyone who looks a twenty-year-old in the eye thinks about that war differently afterwards.",
        "We are at the gathering stage. It need not be an original — a photo taken on a phone is enough.",
        "Every photograph is exhibited only within the limits the family agrees to, and comes down at any time on request.",
      ],
    },
  },
  {
    id: "family-visit",
    icon: "family",
    status: { ko: "준비 중", en: "In preparation" },
    title: { ko: "유가족 한국 방문", en: "Bringing families to Korea" },
    lead: {
      ko: "아버지가 싸운 땅을, 자녀와 손자가 딛게 하는 일.",
      en: "Letting children and grandchildren stand on the ground their father defended.",
    },
    body: {
      ko: [
        "티아노 소위님과 필리핀 참전용사 여러분의 가족들이 한국을 방문하실 수 있도록 준비하고 있습니다.",
        "기념비 참배, 참전 지역 방문, 한국 청소년들과의 만남까지 이어지는 일정을 구상하고 있습니다. 항공과 체류 비용을 어떻게 마련할지가 가장 큰 과제입니다.",
        "유가족이시거나, 이 일에 함께해 주실 수 있는 기관·기업이 계시면 연락 주시기 바랍니다.",
      ],
      en: [
        "We are working toward bringing the family of Lt. Tiano and the families of the Filipino veterans to Korea.",
        "The itinerary we envision runs from the memorial to the places they fought, and on to meetings with Korean students. How to fund flights and stays is the hardest part.",
        "If you are a family member, or an institution or company willing to help, please write to us.",
      ],
    },
  },
  {
    id: "education",
    icon: "education",
    status: { ko: "준비 중", en: "In preparation" },
    title: { ko: "청소년 보훈 교육", en: "Education for young people" },
    lead: {
      ko: "다음 세대가 모르면, 기억은 한 세대 만에 끝납니다.",
      en: "If the next generation does not know, remembrance ends in one generation.",
    },
    body: {
      ko: [
        "필리핀 참전용사들의 역할을 알지 못했던 한국과 세계의 다음 세대에게, 한국전쟁의 의미와 참전 용사들의 희생을 전하는 교육 프로그램을 준비하고 있습니다.",
        "학교 방문 수업, 기념비 현장 학습, 한국어·영어 교육 자료 제작을 계획하고 있습니다.",
        "학교나 기관에서 강연을 요청하시려면 신청·예약 페이지를 이용해 주세요.",
      ],
      en: [
        "A programme to teach what the Korean War meant, and what these veterans gave, to a generation in Korea and abroad that never knew the Filipino contingent existed.",
        "We are planning school visits, field learning at the memorial, and teaching materials in both Korean and English.",
        "Schools and institutions can request a talk through the Register page.",
      ],
    },
  },
];

export function getProgram(id: string) {
  return programs.find((program) => program.id === id);
}
