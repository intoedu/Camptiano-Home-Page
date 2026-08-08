# 캠프티아노기념사업회 홈페이지

한국전쟁에 참전한 필리핀 용사와 그 가족을 기억하는 보훈 사이트.
한국어·영어 2개 언어로 제공됩니다.

- 현재 주소: `https://intoedu.github.io/Camptiano-Home-Page/` (GitHub Pages, 무료)
- 예정 도메인: `www.camptiano.kr` (사업회에서 구매 여부 결정)
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
| 다국어 | `/ko`, `/en` 경로 분리 | 첫 진입 시 브라우저 언어로 자동 안내 |
| 문의·신청 | 폼 접수 서비스 연동 | 미설정 시 방문자 메일 앱으로 대체 |
| 호스팅 | **GitHub Pages** (정적 배포, 무료) | 서버 비용 0원 |

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

## 배포

`main` 브랜치에 변경이 올라가면 GitHub Actions가 자동으로 사이트를 새로 만들어
GitHub Pages에 공개합니다. 별도로 해야 할 일은 없습니다.

**저장소 최초 설정** — 한 번만 하면 됩니다.
저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions**
로 지정하세요.

### 도메인을 연결할 때

`www.camptiano.kr` 같은 도메인을 구매해 연결하는 경우:

1. 저장소 **Settings → Pages → Custom domain** 에 도메인 입력
2. `.github/workflows/deploy.yml` 의 `BASE_PATH` 를 `""` 로 변경
3. 도메인 등록업체(가비아·후이즈 등)에서 DNS 를 GitHub Pages 로 설정

## 문의·신청 폼

기본 상태에서는 방문자가 폼을 제출하면 **메일 앱이 열려** 입력한 내용이 그대로
채워집니다. 별도 설정 없이 지금 바로 동작합니다.

방문자가 사이트를 벗어나지 않고 접수하게 하려면, 무료 폼 접수 서비스
(Formspree 등)에 가입해 받은 주소를 저장소 **Settings → Secrets and variables →
Actions → Variables** 에 아래 이름으로 등록하세요.

```
NEXT_PUBLIC_FORM_ENDPOINT = https://formspree.io/f/xxxxxxxx
```

등록하면 다음 배포부터 자동으로 적용됩니다.

## 남은 일

공개 전에 채워야 할 자료와 확인이 필요한 사실은 [`CONTENT-CHECKLIST.md`](./CONTENT-CHECKLIST.md)
에 정리해 두었습니다.
