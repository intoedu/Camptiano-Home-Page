/**
 * 첫 화면을 채우는 새벽 능선.
 *
 * 알링턴 국립묘지 사이트처럼 풍경이 화면을 이끌게 하되, 사진이 없는 지금은
 * 삽화가 그 자리를 대신합니다. 멀수록 옅고 가까울수록 짙은 다섯 겹의 능선,
 * 그 위에 아주 작게 선 비석 하나 — "70년 전 세워진 작은 비석 하나".
 *
 * 실제 사진이 준비되면 site.heroPhoto 에 경로를 넣으면 사진이 대신 나옵니다.
 */
export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ct-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-cream-50)" />
          <stop offset="42%" stopColor="var(--color-cream-100)" />
          <stop offset="72%" stopColor="var(--color-ochre-100)" />
          <stop offset="100%" stopColor="var(--color-ochre-200)" />
        </linearGradient>
        <radialGradient id="ct-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--color-ochre-300)" stopOpacity="0.9" />
          <stop offset="45%" stopColor="var(--color-ochre-300)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="var(--color-ochre-300)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#ct-sky)" />

      {/* 낮게 뜬 해 */}
      <circle cx="1128" cy="452" r="300" fill="url(#ct-sun)" />
      <circle cx="1128" cy="452" r="74" fill="var(--color-ochre-300)" opacity="0.75" />

      {/* 능선 — 멀수록 옅게 */}
      <path
        d="M0 552 Q 200 502 400 537 Q 600 572 800 522 Q 1000 472 1200 517 Q 1400 562 1600 527 L1600 900 L0 900 Z"
        fill="var(--color-khaki-300)"
        opacity="0.3"
      />
      <path
        d="M0 622 Q 240 572 460 607 Q 700 647 920 597 Q 1140 547 1360 592 Q 1500 617 1600 602 L1600 900 L0 900 Z"
        fill="var(--color-khaki-300)"
        opacity="0.45"
      />

      {/* 먼 능선의 나무들 */}
      <g fill="var(--color-khaki-500)" opacity="0.3">
        <path d="M296 600 l11 26 h-22 Z M296 583 l9 22 h-18 Z" />
        <path d="M330 606 l9 22 h-18 Z" />
        <path d="M1206 596 l11 26 h-22 Z M1206 579 l9 22 h-18 Z" />
        <path d="M1242 602 l9 22 h-18 Z" />
      </g>

      <path
        d="M0 692 Q 260 647 520 682 Q 780 717 1020 670 Q 1280 622 1600 677 L1600 900 L0 900 Z"
        fill="var(--color-khaki-400)"
        opacity="0.55"
      />

      {/* 비석 — 작지만 또렷하게, 세 번째 능선 위에 */}
      <g>
        <ellipse cx="1058" cy="678" rx="34" ry="6" fill="var(--color-khaki-700)" opacity="0.28" />
        <path
          d="M1044 674 L1044 606 Q1044 590 1058 590 Q1072 590 1072 606 L1072 674 Z"
          fill="var(--color-khaki-600)"
        />
        <rect x="1034" y="672" width="48" height="8" rx="2" fill="var(--color-khaki-700)" />
      </g>

      <path
        d="M0 764 Q 300 722 600 757 Q 900 792 1200 747 Q 1420 717 1600 747 L1600 900 L0 900 Z"
        fill="var(--color-khaki-500)"
        opacity="0.72"
      />

      {/* 가까운 능선의 나무들 */}
      <g fill="var(--color-khaki-700)" opacity="0.5">
        <path d="M188 760 l14 34 h-28 Z M188 738 l11 28 h-22 Z" />
        <path d="M232 768 l11 28 h-22 Z" />
        <path d="M1392 752 l14 34 h-28 Z M1392 730 l11 28 h-22 Z" />
        <path d="M1436 760 l11 28 h-22 Z" />
      </g>

      {/* 맨 앞 능선은 이어지는 추모식 띠와 같은 색 — 풍경이 그대로 흘러듭니다. */}
      <path
        d="M0 840 Q 340 806 700 834 Q 1060 862 1600 822 L1600 900 L0 900 Z"
        fill="var(--color-khaki-800)"
      />

      {/* 앞자락 풀 */}
      <g stroke="var(--color-khaki-600)" strokeWidth="3" strokeLinecap="round" opacity="0.55">
        <path d="M92 880 v-26" />
        <path d="M108 884 v-19" />
        <path d="M124 878 v-30" />
        <path d="M1490 872 v-27" />
        <path d="M1508 878 v-20" />
      </g>
    </svg>
  );
}
