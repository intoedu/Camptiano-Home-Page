import type { Locale } from "@/i18n";

export type FaqGroup = {
  id: string;
  heading: Record<Locale, string>;
  items: {
    q: Record<Locale, string>;
    a: Record<Locale, string[]>;
  }[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "ceremony",
    heading: { ko: "추모식 참석", en: "Attending the ceremony" },
    items: [
      {
        q: {
          ko: "누구나 참석할 수 있나요?",
          en: "Is the ceremony open to everyone?",
        },
        a: {
          ko: [
            "네. 참전용사와 유가족은 물론, 감사의 마음을 전하고자 하는 어느 분이든 함께하실 수 있습니다. 참가비는 없습니다.",
            "준비를 위해 '신청·예약' 페이지에서 미리 알려 주시면 감사하겠습니다.",
          ],
          en: [
            "Yes. Veterans and their families are our honoured guests, and anyone who wishes to give thanks is welcome. There is no fee.",
            "Letting us know in advance through the Register page helps us prepare.",
          ],
        },
      },
      {
        q: {
          ko: "단체로 참석하려면 어떻게 해야 하나요?",
          en: "How do we attend as a group?",
        },
        a: {
          ko: [
            "학교, 기관, 기업, 교회 등 단체 참석은 '신청·예약'에서 단체 참배를 선택해 인원과 희망 날짜를 알려 주세요. 헌화나 별도 순서를 원하시면 문의하기로 연락 주시면 함께 준비하겠습니다.",
          ],
          en: [
            "Schools, institutions, companies, and churches can select the group visit option on the Register page and tell us the number of people and preferred date. If you would like to lay a wreath or take part in the programme, contact us and we will arrange it together.",
          ],
        },
      },
      {
        q: {
          ko: "복장이나 준비물이 있나요?",
          en: "Is there a dress code, or anything to bring?",
        },
        a: {
          ko: [
            "정해진 복장은 없습니다. 야외 행사인 만큼 날씨에 맞는 편한 옷차림을 권해 드립니다. 헌화용 꽃은 사업회에서 준비합니다.",
          ],
          en: [
            "There is no dress code. As it is an outdoor event, we suggest comfortable clothing suited to the weather. Flowers for the wreath-laying are provided by the association.",
          ],
        },
      },
    ],
  },
  {
    id: "support",
    heading: { ko: "후원", en: "Giving" },
    items: [
      {
        q: {
          ko: "후원금은 어디에 쓰이나요?",
          en: "Where does my gift go?",
        },
        a: {
          ko: [
            "참전용사 후손 장학기금, 전사자의 벽 건립, 사진 기념관 건립 — 세 가지 사업에 사용됩니다. 특정 사업을 지정해 후원하실 수도 있습니다.",
            "사용 내역은 공지·소식 게시판에 정기적으로 공개합니다.",
          ],
          en: [
            "To three projects: the descendants' scholarship fund, the Wall of the Fallen, and the photo memorial hall. You may also designate your gift to a specific project.",
            "We publish reports on how the funds are used in our news section.",
          ],
        },
      },
      {
        q: {
          ko: "기부금 영수증을 받을 수 있나요?",
          en: "Can I receive a tax receipt?",
        },
        a: {
          ko: [
            "발급 가능 여부를 확인하고 있습니다. 확정되는 대로 이 페이지와 후원 페이지에 안내드리겠습니다.",
          ],
          en: [
            "We are confirming whether tax-deductible receipts can be issued, and will update this page and the donation page once it is settled.",
          ],
        },
      },
      {
        q: {
          ko: "해외에서도 후원할 수 있나요?",
          en: "Can I give from outside Korea?",
        },
        a: {
          ko: [
            "네. 해외 송금 방법을 준비하고 있습니다. 그동안은 문의하기로 연락 주시면 개별 안내드리겠습니다.",
          ],
          en: [
            "Yes. We are setting up a route for international gifts. In the meantime, please contact us and we will guide you individually.",
          ],
        },
      },
    ],
  },
  {
    id: "family",
    heading: { ko: "유가족·참전용사", en: "Veterans and families" },
    items: [
      {
        q: {
          ko: "필리핀 참전용사의 가족입니다. 어떻게 연락드리면 되나요?",
          en: "I am a Filipino veteran's family member. How do I reach you?",
        },
        a: {
          ko: [
            "'신청·예약'의 유가족 등록 또는 문의하기를 통해 연락 주세요. 한국어와 영어 모두 가능합니다.",
            "사업회는 유가족의 한국 방문이 이루어질 수 있도록 준비하고 있습니다. 연락처를 남겨 주시면 진행 상황을 계속 알려 드리겠습니다.",
          ],
          en: [
            "Please use the family registration option on the Register page, or the contact form. We can correspond in English or Korean.",
            "The association is working toward bringing veterans' families to Korea. If you leave your contact details we will keep you informed as this develops.",
          ],
        },
      },
      {
        q: {
          ko: "사진이나 유품을 제공하고 싶습니다.",
          en: "I would like to offer a photograph or a keepsake.",
        },
        a: {
          ko: [
            "정말 감사합니다. 원본을 보내 주실 필요는 없으며, 사진으로 찍은 이미지나 스캔본이면 충분합니다. 원본을 맡겨 주시는 경우 고해상도로 스캔한 뒤 안전하게 돌려드립니다.",
            "모든 자료는 유가족이 동의하신 범위 안에서만 사용하며, 원하지 않으시면 언제든 공개를 중단합니다.",
          ],
          en: [
            "Thank you — truly. You do not need to send an original; a photo or scan is enough. If you entrust an original to us, we scan it at high resolution and return it safely.",
            "Every item is used only within the limits the family agrees to, and we will withdraw anything from public view on request.",
          ],
        },
      },
    ],
  },
  {
    id: "org",
    heading: { ko: "사업회", en: "About the association" },
    items: [
      {
        q: {
          ko: "자원봉사나 재능기부로 참여할 수 있나요?",
          en: "Can I volunteer or contribute a skill?",
        },
        a: {
          ko: [
            "네. 행사 진행, 한국어–영어–타갈로그어 번역, 사진 정리와 아카이빙, 촬영과 편집 등 함께할 수 있는 일이 많습니다. 문의하기로 연락 주세요.",
          ],
          en: [
            "Yes. Event support, Korean–English–Tagalog translation, sorting and archiving photographs, filming and editing — there is a great deal to do. Please get in touch.",
          ],
        },
      },
      {
        q: {
          ko: "취재나 강연을 요청하고 싶습니다.",
          en: "I would like to request an interview or a talk.",
        },
        a: {
          ko: [
            "문의하기에서 '취재·언론' 또는 '신청·예약'의 교육·강연 요청을 선택해 연락 주세요. 학교와 기관 대상 교육 프로그램을 준비하고 있습니다.",
          ],
          en: [
            "Please select 'Press and media' on the contact form, or the education / speaking request on the Register page. We are developing programmes for schools and institutions.",
          ],
        },
      },
    ],
  },
];
