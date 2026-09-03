/**
 * 구획과 구획 사이를 잇는 능선.
 *
 * 사이트 전체를 하나의 풍경으로 묶어 주는 장치입니다.
 * 딱딱한 가로선 대신 이 능선이 구획을 나눕니다.
 */
export function Ridgeline({
  className = "",
  fill = "var(--color-khaki-700)",
  flip = false,
}: {
  className?: string;
  /** 능선 아래를 채울 색 — 이어지는 구획의 배경색과 같게 둡니다. */
  fill?: string;
  /** 위아래를 뒤집어 구획 아래쪽 경계에 씁니다. */
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1600 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block w-full ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="M0 78 Q 200 34 420 62 Q 660 92 900 52 Q 1140 12 1360 48 Q 1490 68 1600 44 L1600 120 L0 120 Z"
        fill={fill}
      />
    </svg>
  );
}
