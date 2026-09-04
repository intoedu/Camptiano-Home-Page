"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark, Wordmark } from "./Logo";
import { IconClose, IconGlobe, IconMenu, IconPhone } from "./Icons";
import type { Dictionary, Locale } from "@/i18n";
import { navigation, site } from "@/lib/site";

type NavKey = (typeof navigation)[number]["key"];

export function Header({
  locale,
  dict,
  orgName,
  tagline,
}: {
  locale: Locale;
  dict: Dictionary;
  orgName: string;
  tagline: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const other: Locale = locale === "ko" ? "en" : "ko";

  // 페이지가 바뀌면 모바일 메뉴를 닫습니다.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 메뉴가 열려 있는 동안 본문 스크롤을 잠급니다.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const rest = pathname.replace(/^\/(ko|en)/, "") || "";
  const switchHref = `/${other}${rest}`;

  const isActive = (href: string) => pathname.startsWith(`/${locale}${href}`);

  /*
   * 첫 화면은 사진이 가득 채웁니다. 화면 맨 위에 있는 동안에는 머리글을
   * 투명하게 두어 사진이 끊기지 않게 하고, 조금이라도 내리면 종이빛 바탕을
   * 되돌려 글씨가 흐려지지 않게 합니다.
   */
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onPhoto = isHome && atTop;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        onPhoto
          ? "border-transparent bg-transparent"
          : "border-cream-300/70 bg-cream-50/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center gap-3 px-5 sm:gap-4 sm:px-8">
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label={orgName}
        >
          <LogoMark className="h-10 w-10 sm:h-11 sm:w-11" />
          <Wordmark
            name={orgName}
            tagline={tagline}
            tone={onPhoto ? "dark" : "light"}
          />
        </Link>

        <nav
          className="ml-auto hidden items-center gap-0.5 lg:flex"
          aria-label={dict.nav.menu}
        >
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-2.5 py-2 text-sm font-medium whitespace-nowrap transition-colors xl:px-3 ${
                onPhoto
                  ? isActive(item.href)
                    ? "bg-cream-50/15 text-cream-50"
                    : "text-cream-100/90 hover:bg-cream-50/12 hover:text-cream-50"
                  : isActive(item.href)
                    ? "bg-cream-200 text-ochre-700"
                    : "text-bark-700 hover:bg-cream-100 hover:text-ochre-700"
              }`}
            >
              {dict.nav[item.key as NavKey]}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-2 lg:ml-2">
          {/* 전화가 가장 빠른 연락 수단이므로 어느 화면에서나 한 번에 닿게 둡니다. */}
          <a
            href={`tel:${site.contact.phoneHref}`}
            aria-label={`${dict.contact.callCta} ${site.contact.phone}`}
            className={`inline-flex items-center gap-2 rounded-full px-2.5 py-2 text-sm font-medium sm:px-3 whitespace-nowrap transition-colors ${
              onPhoto
                ? "text-cream-100/90 hover:bg-cream-50/12 hover:text-cream-50"
                : "text-bark-700 hover:bg-cream-100 hover:text-ochre-700"
            }`}
          >
            <IconPhone className="h-4 w-4" />
            <span className="hidden tabular-nums 2xl:inline">
              {site.contact.phone}
            </span>
          </a>

          <Link
            href={switchHref}
            hrefLang={other}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-medium sm:px-3 transition-colors ${
              onPhoto
                ? "text-cream-100/85 hover:bg-cream-50/12 hover:text-cream-50"
                : "text-bark-600 hover:bg-cream-100 hover:text-ochre-700"
            }`}
          >
            <IconGlobe className="h-4 w-4" />
            <span className="hidden sm:inline">{dict.meta.switchTo}</span>
            <span className="sm:hidden">{other.toUpperCase()}</span>
          </Link>

          <Link
            href={`/${locale}/support`}
            className="hidden rounded-full bg-ochre-600 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-cream-50 shadow-warm transition-colors hover:bg-ochre-700 sm:inline-flex"
          >
            {dict.nav.support}
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={dict.nav.menu}
            aria-expanded={open}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${
              onPhoto
                ? "text-cream-50 hover:bg-cream-50/12"
                : "text-bark-700 hover:bg-cream-100"
            }`}
          >
            <IconMenu />
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label={dict.nav.close}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-bark-900/40 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-cream-50 shadow-warm-lg">
            <div className="flex h-18 shrink-0 items-center justify-between border-b border-cream-300/70 px-5">
              <span className="font-serif text-base font-semibold">
                {dict.nav.menu}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={dict.nav.close}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-bark-700 transition-colors hover:bg-cream-100"
              >
                <IconClose />
              </button>
            </div>

            <nav className="flex flex-col p-3" aria-label={dict.nav.menu}>
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={`rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-cream-200 text-ochre-700"
                      : "text-bark-800 hover:bg-cream-100"
                  }`}
                >
                  {dict.nav[item.key as NavKey]}
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-3 border-t border-cream-300/70 p-5">
              <Link
                href={`/${locale}/support`}
                className="flex w-full items-center justify-center rounded-full bg-ochre-600 px-5 py-3.5 text-sm font-semibold text-cream-50"
              >
                {dict.nav.support}
              </Link>
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-bark-800 ring-1 ring-inset ring-cream-300"
              >
                <IconPhone className="h-4 w-4" />
                {site.contact.phone}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
