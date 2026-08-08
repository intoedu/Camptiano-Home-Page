import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getDictionary, isLocale, locales, type Locale } from "@/i18n";
import { site } from "@/lib/site";

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-kr",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const org = site.org[locale];

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${org.name} — ${org.tagline}`,
      template: `%s · ${org.name}`,
    },
    description:
      locale === "ko"
        ? "캠프티아노기념사업회는 한국전쟁에 참전한 필리핀 용사와 그 가족을 기억하고, 추모식·장학기금·전사자의 벽·사진 기념관 사업을 통해 감사의 마음을 다음 세대에 전합니다."
        : "The Camp Tiano Memorial Association remembers the Filipino veterans of the Korean War and their families through memorial ceremonies, scholarships, the Wall of the Fallen, and a photo memorial hall.",
    alternates: {
      canonical: `/${locale}`,
      languages: { ko: "/ko", en: "/en" },
    },
    openGraph: {
      type: "website",
      siteName: org.name,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      title: `${org.name} — ${org.tagline}`,
    },
    // 정적 배포 시 하위 경로(/Camptiano-Home-Page)를 붙여 줘야 합니다.
    icons: { icon: `${process.env.BASE_PATH ?? ""}/favicon.svg` },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const org = site.org[typedLocale];

  return (
    <html
      lang={typedLocale}
      className={`${notoSerifKr.variable} ${notoSansKr.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-ochre-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream-50"
        >
          {dict.nav.skipToContent}
        </a>
        <Header
          locale={typedLocale}
          dict={dict}
          orgName={org.name}
          tagline={org.tagline}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={typedLocale} dict={dict} />
      </body>
    </html>
  );
}
