import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n";

/** Accept-Language 헤더로 첫 방문자의 언어를 짐작합니다. */
function detectLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());

  for (const tag of preferred) {
    if (tag.startsWith("ko")) return "ko";
    if (tag.startsWith("en")) return "en";
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // 정적 파일과 내부 경로는 건드리지 않습니다.
  matcher: ["/((?!_next|api|favicon.svg|robots.txt|sitemap.xml|.*\\..*).*)"],
};
