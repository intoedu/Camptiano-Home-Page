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

export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-3 ${
        tone === "dark" ? "text-ochre-300" : "text-ochre-600"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`h-px w-8 ${tone === "dark" ? "bg-ochre-300/50" : "bg-ochre-400/70"}`}
      />
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
  const dark = tone === "dark";

  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p
          className={`eyebrow mb-5 flex items-center gap-3 ${
            centered ? "justify-center" : ""
          } ${dark ? "text-ochre-300" : "text-ochre-600"}`}
        >
          <span
            aria-hidden
            className={`h-px w-8 ${dark ? "bg-ochre-300/50" : "bg-ochre-400/70"}`}
          />
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={`display text-[1.9rem] whitespace-pre-line sm:text-[2.4rem] ${
          dark ? "text-cream-50" : ""
        }`}
      >
        {title}
      </h2>

      {body ? (
        <p
          className={`mt-5 text-[1.0625rem] leading-[1.85] ${
            dark ? "text-cream-100/80" : "text-bark-600"
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
  variant?: "primary" | "secondary" | "ghost" | "onDark" | "onPhoto";
  className?: string;
};

const buttonStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-ochre-600 text-cream-50 hover:bg-ochre-700 shadow-warm hover:shadow-warm-lg",
  secondary:
    "text-bark-800 ring-1 ring-inset ring-bark-400/35 hover:bg-cream-100 hover:ring-ochre-400",
  ghost: "text-bark-700 hover:text-ochre-700 hover:bg-cream-100",
  onDark:
    "bg-cream-50 text-bark-900 hover:bg-cream-100 shadow-warm hover:shadow-warm-lg",
  /* 사진 위 — 사진을 가리지 않도록 테두리만 두고 살짝 비칩니다. */
  onPhoto:
    "text-cream-50 ring-1 ring-inset ring-cream-100/45 backdrop-blur-[2px] hover:bg-cream-50/10 hover:ring-cream-50/80",
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
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 ${buttonStyles[variant]} ${className}`}
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

/** 상자보다 인쇄면에 가깝게 — 테두리 없이 여백과 가는 선으로 나눕니다. */
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
      className={`rounded-2xl bg-cream-50 p-7 ring-1 ring-cream-300/70 transition-shadow duration-300 hover:shadow-warm sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

/** 사진이 준비되기 전, 의도된 빈 액자 */
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
      className={`photo-slot flex flex-col items-center justify-center gap-2.5 rounded-xl ring-1 ring-ochre-300/35 ring-inset ${ratio} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-7 w-7 text-ochre-600/30"
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
      <span className="px-4 text-center text-[11px] font-medium tracking-wide text-ochre-700/45">
        {label}
      </span>
    </div>
  );
}

/** 안쪽 페이지 머리 — 첫 화면과 같은 새벽빛을 옅게 이어 받습니다. */
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
    <header className="texture-paper relative overflow-hidden border-b border-cream-300/60 bg-cream-100 pt-16 pb-14 sm:pt-24 sm:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-ochre-200/30 blur-3xl"
      />
      <Container className="relative">
        {eyebrow ? (
          <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
        ) : null}
        <h1 className="display text-[2.35rem] sm:text-[3.1rem]">{title}</h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.85] text-bark-600">
            {lead}
          </p>
        ) : null}
      </Container>
    </header>
  );
}

/** 확인이 끝나지 않은 내용을 정중하게 알리는 안내 */
export function PendingNote({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-ochre-300 bg-cream-100/60 px-6 py-5 text-sm leading-[1.85] text-bark-600">
      {children}
    </p>
  );
}
