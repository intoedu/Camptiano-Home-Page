/**
 * 임시 워드마크 — 비석 위로 떠오르는 해와 잎.
 * 사업회의 정식 로고 파일이 준비되면 이 컴포넌트만 교체하면 됩니다.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="var(--color-cream-100)" />
      <circle
        cx="20"
        cy="20"
        r="19"
        fill="none"
        stroke="var(--color-ochre-400)"
        strokeWidth="1.2"
      />
      {/* 떠오르는 해 */}
      <circle cx="20" cy="17" r="6.2" fill="var(--color-ochre-300)" />
      {/* 비석 */}
      <path
        d="M15.4 30.5V18.6a4.6 4.6 0 0 1 9.2 0v11.9Z"
        fill="var(--color-khaki-500)"
      />
      {/* 새겨진 이름 자리 */}
      <path
        d="M17.6 22.4h4.8M17.6 25.2h4.8M17.6 28h3"
        stroke="var(--color-cream-100)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {/* 땅 */}
      <path
        d="M8 30.6h24"
        stroke="var(--color-bark-600)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({
  name,
  tagline,
  tone = "light",
}: {
  name: string;
  tagline?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span className="flex flex-col leading-tight">
      <span
        className={`font-serif text-base font-semibold tracking-tight sm:text-lg ${
          tone === "dark" ? "text-cream-50" : "text-bark-900"
        }`}
      >
        {name}
      </span>
      {tagline ? (
        <span
          className={`mt-0.5 hidden text-[11px] tracking-wide whitespace-nowrap sm:block ${
            tone === "dark" ? "text-cream-200/70" : "text-bark-500"
          }`}
        >
          {tagline}
        </span>
      ) : null}
    </span>
  );
}
