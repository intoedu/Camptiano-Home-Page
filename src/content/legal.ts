import type { Locale } from "@/i18n";

export type LegalSection = {
  heading: Record<Locale, string>;
  /** 문단 또는 목록 항목 */
  body: Record<Locale, string[]>;
  /** 표 형태로 보여 줄 항목 */
  table?: {
    columns: Record<Locale, string[]>;
    rows: Record<Locale, string[][]>;
  };
};

export type LegalDocument = {
  title: Record<Locale, string>;
  lead: Record<Locale, string>;
  /** 시행일 (YYYY-MM-DD) */
  effectiveDate: string;
  sections: LegalSection[];
};

/**
 * 개인정보처리방침.
 *
 * 사이트가 실제로 하는 일만 적었습니다.
 * 홈페이지에는 입력 양식이 없어, 사이트 자체가 수집하는 개인정보는 없습니다.
 *
 * TODO: 개인정보 보호책임자 성함·직위·연락처를 사업회에서 확정해 주세요.
 */
export const privacyPolicy: LegalDocument = {
  title: { ko: "개인정보처리방침", en: "Privacy Policy" },
  lead: {
    ko: "캠프티아노기념사업회는 방문자의 개인정보를 소중히 다루며, 「개인정보 보호법」에 따라 아래와 같이 처리방침을 두고 있습니다.",
    en: "The Camp Tiano Memorial Association handles visitors' personal data with care, under the following policy in accordance with the Personal Information Protection Act of Korea.",
  },
  effectiveDate: "2026-08-06",
  sections: [
    {
      heading: {
        ko: "1. 홈페이지는 개인정보를 수집하지 않습니다",
        en: "1. This website collects nothing",
      },
      body: {
        ko: [
          "이 홈페이지에는 이름이나 연락처를 입력하는 양식이 없습니다. 회원가입도 없습니다. 따라서 방문만으로는 어떤 개인정보도 수집되지 않습니다.",
          "연락은 전화와 이메일로만 받습니다. 방문자가 먼저 연락해 주신 경우에 한해, 그 연락에 답하기 위한 목적으로 아래 정보가 사업회에 남습니다.",
        ],
        en: [
          "This website has no form asking for your name or contact details, and there is no sign-up. Simply visiting the site collects nothing.",
          "We take enquiries by phone and email only. Where you contact us first, the following remains with the association solely so that we can reply.",
        ],
      },
      table: {
        columns: {
          ko: ["연락 방법", "남는 정보", "이용 목적"],
          en: ["How you contact us", "What remains", "Purpose"],
        },
        rows: {
          ko: [
            ["전화", "전화번호, 통화로 알려 주신 내용", "문의에 대한 답변과 안내"],
            [
              "이메일",
              "이메일 주소, 메일에 적어 주신 내용과 첨부 자료",
              "문의에 대한 답변, 제공해 주신 사진·자료의 보존",
            ],
          ],
          en: [
            ["Phone", "Your number, and what you tell us", "Replying and following up"],
            [
              "Email",
              "Your address, your message, and anything you attach",
              "Replying, and preserving photographs or records you offer",
            ],
          ],
        },
      },
    },
    {
      heading: {
        ko: "2. 보유 기간과 파기",
        en: "2. Retention and disposal",
      },
      body: {
        ko: [
          "수집한 개인정보는 문의 답변 또는 신청 처리가 끝난 뒤 지체 없이 파기합니다. 다만 행사 운영 기록이 필요한 경우에도 해당 행사 종료일로부터 1년을 넘기지 않습니다.",
          "전자적 파일 형태의 정보는 복구할 수 없는 방법으로 삭제하며, 출력물이 있는 경우 분쇄하거나 소각합니다.",
        ],
        en: [
          "We delete personal data without delay once the enquiry has been answered or the request processed. Where event records are needed, they are kept no longer than one year from the date of the event.",
          "Electronic files are deleted irrecoverably; any printed material is shredded or incinerated.",
        ],
      },
    },
    {
      heading: {
        ko: "3. 제3자 제공",
        en: "3. Sharing with third parties",
      },
      body: {
        ko: [
          "사업회는 방문자의 개인정보를 제3자에게 제공하지 않습니다. 다만 법령에 따라 수사기관의 적법한 요구가 있는 경우에는 예외로 합니다.",
          "참전용사 유가족 연결과 같이 제3자에게 정보를 전달해야 하는 일이 생기는 경우, 반드시 사전에 본인의 동의를 받은 뒤에만 진행합니다.",
        ],
        en: [
          "We do not provide personal data to third parties, except where lawfully required by an investigative authority.",
          "Where information must be passed on — for example to connect a veteran's family — we do so only with the prior consent of the person concerned.",
        ],
      },
    },
    {
      heading: {
        ko: "4. 처리 위탁",
        en: "4. Processing on our behalf",
      },
      body: {
        ko: [
          "사업회는 개인정보 처리를 외부에 위탁하지 않습니다.",
          "홈페이지는 GitHub Pages 를 통해 공개되며, 이는 웹페이지를 전달하는 역할만 합니다. 방문자의 개인정보가 이곳에 저장되지 않습니다.",
          "글꼴은 Google Fonts 에서 불러옵니다. 이 과정에서 방문자의 IP 주소가 Google 서버에 전달될 수 있습니다. 글꼴을 표시하는 목적 외에 사업회가 이 정보를 받거나 이용하지는 않습니다.",
          "앞으로 위탁이 필요해지는 경우, 위탁받는 업체와 위탁 업무를 이 페이지에 미리 공개하겠습니다.",
        ],
        en: [
          "We do not outsource the processing of personal data.",
          "The site is published through GitHub Pages, which only serves the web pages themselves. No visitor's personal data is stored there.",
          "Typefaces are loaded from Google Fonts, which may transmit a visitor's IP address to Google's servers. Beyond displaying the typefaces, the association neither receives nor uses that information.",
          "Should outsourcing become necessary, we will disclose the processor and the work entrusted to them on this page in advance.",
        ],
      },
    },
    {
      heading: {
        ko: "5. 접속 통계와 쿠키",
        en: "5. Visit statistics and cookies",
      },
      body: {
        ko: [
          "사업회는 어떤 내용이 많이 읽히는지 파악하기 위해 방문자 수를 집계할 수 있습니다. 이때 개인을 식별할 수 있는 정보나 쿠키는 사용하지 않으며, 방문한 페이지 주소와 대략적인 접속 국가 정도만 익명으로 기록됩니다.",
          "광고 목적의 추적은 하지 않습니다.",
        ],
        en: [
          "We may count visits to understand which pages are read. No personally identifying information and no cookies are used; only the page address and an approximate country are recorded anonymously.",
          "We do not carry out advertising-related tracking.",
        ],
      },
    },
    {
      heading: {
        ko: "6. 정보주체의 권리",
        en: "6. Your rights",
      },
      body: {
        ko: [
          "방문자는 언제든지 본인의 개인정보에 대해 열람, 정정, 삭제, 처리정지를 요구하실 수 있습니다.",
          "아래 연락처로 요청해 주시면 지체 없이 처리하고 결과를 알려 드립니다. 사진이나 자료를 제공해 주신 유가족께서 공개 중단을 요청하시는 경우에도 마찬가지로 즉시 처리합니다.",
        ],
        en: [
          "You may at any time request access to, correction of, deletion of, or a halt to the processing of your personal data.",
          "Contact us at the address below and we will act without delay and inform you of the outcome. The same applies to families who have provided photographs and later ask that they be withdrawn.",
        ],
      },
    },
    {
      heading: {
        ko: "7. 개인정보 보호책임자",
        en: "7. Data protection officer",
      },
      body: {
        ko: [
          "개인정보와 관련한 문의는 아래로 연락해 주시기 바랍니다.",
          "※ 보호책임자의 성함과 직위는 사업회 확정 후 게시합니다.",
        ],
        en: [
          "For any question about personal data, please contact us below.",
          "※ The name and position of the officer will be published once confirmed by the association.",
        ],
      },
    },
    {
      heading: {
        ko: "8. 방침의 변경",
        en: "8. Changes to this policy",
      },
      body: {
        ko: [
          "이 방침의 내용이 바뀌는 경우, 변경 사항을 공지·소식 게시판과 이 페이지에 시행일 7일 전부터 알려 드립니다.",
        ],
        en: [
          "If this policy changes, we will post the change here and in our news section at least seven days before it takes effect.",
        ],
      },
    },
  ],
};

/** 이용약관 */
export const termsOfUse: LegalDocument = {
  title: { ko: "이용약관", en: "Terms of Use" },
  lead: {
    ko: "이 홈페이지는 한국전쟁에 참전한 필리핀 용사와 그 가족을 기억하고 알리기 위한 비영리 목적으로 운영됩니다.",
    en: "This website is operated on a non-profit basis, to remember and make known the Filipino veterans of the Korean War and their families.",
  },
  effectiveDate: "2026-08-06",
  sections: [
    {
      heading: { ko: "1. 목적", en: "1. Purpose" },
      body: {
        ko: [
          "이 약관은 캠프티아노기념사업회가 운영하는 홈페이지의 이용 조건을 정합니다. 방문자는 별도의 가입 절차 없이 자유롭게 이용하실 수 있습니다.",
        ],
        en: [
          "These terms set out the conditions for using the website operated by the Camp Tiano Memorial Association. Visitors may use the site freely, without registration.",
        ],
      },
    },
    {
      heading: { ko: "2. 자료의 이용", en: "2. Use of materials" },
      body: {
        ko: [
          "이 홈페이지에 실린 글과 사진은 참전용사와 유가족을 기억하고 알리기 위한 것입니다. 추모·교육·보도 목적이라면 출처를 밝히고 자유롭게 인용하셔도 좋습니다.",
          "다만 유가족이 제공하신 개인 사진은 가족의 동의 범위 안에서만 게시된 것이므로, 별도 문의 없이 다른 곳에 옮겨 싣지 말아 주시기 바랍니다.",
          "상업적 목적의 이용은 사전에 문의해 주세요.",
        ],
        en: [
          "The writing and photographs on this site exist to remember the veterans and their families. For remembrance, education, or reporting, you are welcome to quote them with attribution.",
          "Personal photographs provided by families are published only within the limits those families agreed to. Please do not republish them elsewhere without asking us first.",
          "For commercial use, please contact us in advance.",
        ],
      },
    },
    {
      heading: { ko: "3. 후원금의 사용", en: "3. Use of donations" },
      body: {
        ko: [
          "후원해 주신 금액은 참전용사 후손 장학기금, 전사자의 벽 건립, 사진 기념관 건립 등 사업회가 공개한 목적에만 사용합니다.",
          "사용 내역은 공지·소식 게시판을 통해 정기적으로 공개합니다.",
          "특정 사업을 지정해 후원하신 경우, 해당 사업에 우선 사용합니다.",
        ],
        en: [
          "Donations are used only for the purposes the association has published: the descendants' scholarship fund, the Wall of the Fallen, and the photo memorial hall.",
          "We report on how funds are used in our news section.",
          "Where a gift is designated for a particular project, it is applied to that project first.",
        ],
      },
    },
    {
      heading: { ko: "4. 게시물의 관리", en: "4. Managing content" },
      body: {
        ko: [
          "사업회는 확인된 사실만 게시하는 것을 원칙으로 합니다. 사실과 다른 내용을 발견하시면 알려 주시기 바랍니다. 확인 후 바로잡겠습니다.",
          "참전용사와 유가족의 명예를 훼손하는 내용, 특정 국가나 집단에 대한 혐오 표현은 사업회 판단에 따라 삭제될 수 있습니다.",
        ],
        en: [
          "As a matter of principle we publish only what has been verified. If you find something inaccurate, please tell us and we will correct it.",
          "Content that damages the dignity of the veterans or their families, or that expresses hatred toward any nation or group, may be removed at the association's discretion.",
        ],
      },
    },
    {
      heading: { ko: "5. 책임의 범위", en: "5. Limits of responsibility" },
      body: {
        ko: [
          "사업회는 홈페이지가 안정적으로 운영되도록 노력하지만, 천재지변이나 서비스 장애 등 부득이한 사유로 일시 중단될 수 있습니다.",
          "외부 사이트로 연결되는 링크의 내용에 대해서는 사업회가 책임지지 않습니다.",
        ],
        en: [
          "We make every effort to keep the site running, but it may be interrupted by circumstances beyond our control, such as natural disaster or service failure.",
          "We are not responsible for the content of external sites we link to.",
        ],
      },
    },
    {
      heading: { ko: "6. 문의", en: "6. Contact" },
      body: {
        ko: [
          "약관과 관련한 문의는 문의하기 페이지 또는 아래 연락처로 주시기 바랍니다.",
        ],
        en: [
          "For questions about these terms, please use the contact page or the details below.",
        ],
      },
    },
  ],
};
