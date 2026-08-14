import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrowRight } from "./Icons";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-ochre-600 uppercase">
      <span aria-hidden className="h-px w-8 bg-ochre-400" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const centered = align === "center";
  return (
    <div
      className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} ${
        tone === "dark" ? "text-cream-100" : ""
      }`}
    >
      {eyebrow ? (
        <p
          className={`mb-3 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase ${
            centered ? "justify-center" : ""
          } ${tone === "dark" ? "text-ochre-300" : "text-ochre-600"}`}
        >
          <span
            aria-hidden
            className={`h-px w-8 ${tone === "dark" ? "bg-ochre-300/60" : "bg-ochre-400"}`}
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-3xl leading-tight font-semibold whitespace-pre-line sm:text-4xl ${
          tone === "dark" ? "text-cream-50" : ""
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            tone === "dark" ? "text-cream-200/85" : "text-bark-600"
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  className?: string;
};

const buttonStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-ochre-600 text-cream-50 hover:bg-ochre-700 shadow-warm hover:shadow-warm-lg",
  secondary:
    "bg-cream-100 text-bark-800 ring-1 ring-inset ring-ochre-300/70 hover:bg-cream-200",
  ghost: "text-bark-700 hover:text-ochre-700 hover:bg-cream-100",
  onDark:
    "bg-cream-50 text-bark-900 hover:bg-cream-100 shadow-warm hover:shadow-warm-lg",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
        tone === "dark"
          ? "text-ochre-300 hover:text-ochre-200"
          : "text-ochre-700 hover:text-ochre-600"
      }`}
    >
      {children}
      <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export function Card({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`rounded-2xl bg-cream-50 p-6 ring-1 ring-cream-300/80 transition-shadow duration-300 hover:shadow-warm sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * 사진이 준비되기 전 자리를 지키는 플레이스홀더.
 * 망가진 이미지가 아니라 '의도된 빈 액자'로 보이도록 그립니다.
 */
export function PhotoSlot({
  label,
  className = "",
  ratio = "aspect-4/3",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`photo-slot flex flex-col items-center justify-center gap-2.5 rounded-xl ring-1 ring-ochre-300/40 ring-inset ${ratio} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-7 w-7 text-ochre-600/35"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="1.5" />
        <path d="m3 15.4 4.6-4.5 3 2.9 2.3-2.1 5.1 4.4" />
        <circle cx="8.2" cy="9.2" r="1.1" />
      </svg>
      <span className="px-4 text-center text-[11px] font-medium tracking-wide text-ochre-700/50">
        {label}
      </span>
    </div>
  );
}

/** 페이지 상단 제목 영역 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="texture-paper border-b border-cream-300/70 bg-cream-100/60 pt-14 pb-12 sm:pt-20 sm:pb-16">
      <Container>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="text-4xl leading-tight font-semibold sm:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-bark-600 sm:text-lg">
            {lead}
          </p>
        ) : null}
      </Container>
    </header>
  );
}

/** 확인이 끝나지 않은 내용을 정중하게 알리는 안내 상자 */
export function PendingNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-ochre-300 bg-cream-100/70 px-5 py-4 text-sm leading-relaxed text-bark-600">
      {children}
    </p>
  );
}
