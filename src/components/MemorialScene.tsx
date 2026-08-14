/**
 * 히어로 영역의 삽화 — 낮은 해, 겹겹의 능선, 그리고 작은 비석 하나.
 *
 * 실제 기념비 사진이 준비되기 전까지 자리를 지킵니다. 빈 자리표시자 대신
 * 완성된 그림을 두어, 사진이 없어도 사이트가 미완성으로 보이지 않게 합니다.
 * 사진이 들어오면 site.ts 의 heroPhoto 에 경로를 넣으면 이 그림 대신 사진이 나옵니다.
 */
export function MemorialScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label="낮은 해와 능선을 배경으로 선 작은 기념비"
    >
      <defs>
        <linearGradient id="ct-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-cream-100)" />
          <stop offset="55%" stopColor="var(--color-cream-200)" />
          <stop offset="100%" stopColor="var(--color-ochre-200)" />
        </linearGradient>
        <linearGradient id="ct-stone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-khaki-400)" />
          <stop offset="55%" stopColor="var(--color-khaki-500)" />
          <stop offset="100%" stopColor="var(--color-khaki-600)" />
        </linearGradient>
        <radialGradient id="ct-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--color-ochre-300)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--color-ochre-300)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="500" fill="url(#ct-sky)" />

      {/* 낮게 뜬 해 */}
      <circle cx="200" cy="180" r="120" fill="url(#ct-glow)" />
      <circle cx="200" cy="180" r="58" fill="var(--color-ochre-300)" opacity="0.72" />

      {/* 겹쳐진 능선 — 뒤에서 앞으로 */}
      <path
        d="M0 296 Q 96 244 196 272 T 400 254 L400 500 L0 500 Z"
        fill="var(--color-khaki-300)"
        opacity="0.38"
      />
      <path
        d="M0 338 Q 124 292 232 318 T 400 302 L400 500 L0 500 Z"
        fill="var(--color-khaki-400)"
        opacity="0.45"
      />

      {/* 능선 위의 나무들 */}
      <g fill="var(--color-khaki-600)" opacity="0.42">
        <path d="M52 316 l9 22 h-18 Z M52 302 l7 18 h-14 Z" />
        <path d="M78 322 l7 18 h-14 Z" />
        <path d="M330 310 l9 22 h-18 Z M330 296 l7 18 h-14 Z" />
        <path d="M356 316 l7 18 h-14 Z" />
      </g>

      <path
        d="M0 386 Q 152 348 262 372 T 400 358 L400 500 L0 500 Z"
        fill="var(--color-khaki-500)"
        opacity="0.55"
      />

      {/* 비석 — 작지만 또렷하게 */}
      <g>
        <ellipse cx="200" cy="432" rx="62" ry="9" fill="var(--color-bark-700)" opacity="0.14" />
        <path
          d="M172 424 L172 322 Q172 297 200 297 Q228 297 228 322 L228 424 Z"
          fill="url(#ct-stone)"
        />
        {/* 새겨진 글씨의 자리 */}
        <g stroke="var(--color-cream-100)" strokeWidth="2.6" strokeLinecap="round" opacity="0.5">
          <path d="M186 340 h28" />
          <path d="M186 356 h28" />
          <path d="M186 372 h20" />
        </g>
        {/* 받침돌 */}
        <rect x="156" y="424" width="88" height="13" rx="3" fill="var(--color-bark-600)" />
        <rect x="148" y="437" width="104" height="9" rx="3" fill="var(--color-bark-700)" opacity="0.85" />
      </g>

      {/* 비석 앞에 놓인 꽃 */}
      <g stroke="var(--color-khaki-600)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75">
        <path d="M252 446 q 10 -14 24 -18" />
        <path d="M258 448 q 12 -8 26 -8" />
      </g>
      <circle cx="278" cy="427" r="5" fill="var(--color-ochre-400)" opacity="0.9" />
      <circle cx="287" cy="439" r="4" fill="var(--color-ochre-300)" opacity="0.9" />

      {/* 땅 */}
      <path d="M0 446 L400 446 L400 500 L0 500 Z" fill="var(--color-khaki-600)" opacity="0.22" />
      <g stroke="var(--color-khaki-700)" strokeWidth="1.6" strokeLinecap="round" opacity="0.22">
        <path d="M40 462 v-12" />
        <path d="M48 464 v-9" />
        <path d="M108 468 v-11" />
        <path d="M330 462 v-13" />
        <path d="M340 466 v-9" />
      </g>
    </svg>
  );
}
