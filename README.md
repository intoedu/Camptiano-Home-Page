# 캠프티아노기념사업회 홈페이지

한국전쟁에 참전한 필리핀 용사와 그 가족을 기억하는 보훈 사이트.
한국어·영어 2개 언어로 제공됩니다.

- 예정 도메인: `www.camptiano.kr`
- 목표 일정: 9월 18일 제74주년 추모식 이전 공개

## 개발

```bash
npm install
npm run dev      # http://localhost:3000 → /ko 로 자동 이동
npm run build    # 배포용 빌드
```

Node 22 이상이 필요합니다.

## 기술 구성

| 항목 | 사용 기술 | 비고 |
| --- | --- | --- |
| 프레임워크 | Next.js 15 (App Router) | 대부분의 페이지를 정적으로 미리 생성 |
| 스타일 | Tailwind CSS 4 | 디자인 토큰은 `src/app/globals.css` 의 `@theme` |
| 글꼴 | Noto Serif KR (제목) · Noto Sans KR (본문) | 빌드 시 자체 호스팅 |
| 다국어 | `/ko`, `/en` 경로 분리 + 미들웨어 | 외부 라이브러리 없음 |
| 문의·신청 | `/api/inquiry` → Resend 메일 발송 | 미설정 시 방문자 메일 앱으로 대체 |
| 호스팅 | Vercel 무료 플랜 권장 | 예산 0원으로 운영 가능 |

## 내용을 고치는 곳

거의 모든 문구와 자료는 아래 파일만 고치면 됩니다. 코드를 건드릴 필요가 없습니다.

| 고치고 싶은 것 | 파일 |
| --- | --- |
| 단체 정보, 연락처, 계좌, 추모식 일정, 기금 목표액 | `src/lib/site.ts` |
| 공지·소식 글 | `src/content/news.ts` |
| 사역·사업 소개 | `src/content/programs.ts` |
| 자주 묻는 질문 | `src/content/faq.ts` |
| 갤러리 앨범·영상 | `src/content/gallery.ts` |
| 메뉴 이름, 버튼, 안내 문구 (한국어) | `src/i18n/ko.ts` |
| 위와 같은 문구 (영어) | `src/i18n/en.ts` |
| 색상·글꼴 | `src/app/globals.css` 의 `@theme` |

`src/lib/site.ts` 안에서 `TODO:` 로 표시된 값은 사업회 확인이 필요한 항목입니다.
확인이 끝나기 전까지 사이트에는 "확인 중" 으로 정중하게 표시되고, 지도·모금
진행률 막대처럼 값이 없으면 곤란한 요소는 자동으로 숨겨집니다.

### 사진 넣는 법

1. 이미지를 `public/gallery/` 아래에 넣습니다. (예: `public/gallery/memorial-01.jpg`)
2. `src/content/gallery.ts` 의 해당 앨범 `items` 에 추가합니다.

```ts
items: [
  {
    src: "/gallery/memorial-01.jpg",
    alt: { ko: "눈 내린 캠프티아노 기념비", en: "The Camp Tiano Memorial in snow" },
  },
],
```

사진이 하나도 없는 앨범은 자리표시자가 대신 표시되므로, 준비되는 대로 하나씩
채워 넣으면 됩니다.

## 문의·신청 메일 연결

기본 상태에서는 방문자가 폼을 제출하면 메일 앱이 열려 같은 내용을 사업회 주소로
보내도록 되어 있습니다. 접수 내용을 서버에서 바로 받아 보려면 아래 환경변수를
설정하세요. (Resend 무료 플랜: 하루 100통)

```
RESEND_API_KEY=re_xxxxxxxx
INQUIRY_TO=사업회_받는_주소@example.com
INQUIRY_FROM=no-reply@camptiano.kr
```

`.env.example` 을 참고하세요. `INQUIRY_FROM` 은 Resend에 인증된 도메인의 주소여야
합니다.

## 남은 일

공개 전에 채워야 할 자료와 확인이 필요한 사실은 [`CONTENT-CHECKLIST.md`](./CONTENT-CHECKLIST.md)
에 정리해 두었습니다.
