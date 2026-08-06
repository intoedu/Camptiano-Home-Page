type IconProps = {
  className?: string;
};

const base = "h-6 w-6";

/** 선으로 그린 아이콘 모음 — 외부 아이콘 라이브러리 없이 사용합니다. */
function Svg({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? base}
    >
      {children}
    </svg>
  );
}

/** 장학 — 학사모 */
export function IconScholarship(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" />
      <path d="M6.5 10.7V16c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-5.3" />
      <path d="M21.5 8.5V14" />
    </Svg>
  );
}

/** 전사자의 벽 — 이름을 새긴 석벽 */
export function IconWall(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 20h18" />
      <path d="M5 20V6.5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1V20" />
      <path d="M8.5 9.5h7M8.5 13h7M8.5 16.5h4" />
    </Svg>
  );
}

/** 사진 기념관 — 액자 */
export function IconMuseum(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="4" width="17" height="16" rx="1.2" />
      <path d="M3.5 16.2 8.8 11l3.4 3.3 2.6-2.4 5.7 5" />
      <circle cx="9" cy="8.3" r="1.2" />
    </Svg>
  );
}

/** 추모식 — 헌화 */
export function IconCeremony(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21V11" />
      <path d="M12 11c0-2.5 1.8-4.5 4-4.5 0 2.5-1.8 4.5-4 4.5Z" />
      <path d="M12 11c0-2.5-1.8-4.5-4-4.5 0 2.5 1.8 4.5 4 4.5Z" />
      <path d="M7 21h10" />
      <path d="M12 6.5V3.5" />
    </Svg>
  );
}

/** 유가족 */
export function IconFamily(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8" cy="7.5" r="2.6" />
      <circle cx="16.5" cy="9" r="2.1" />
      <path d="M3.5 19.5c0-2.8 2-4.8 4.5-4.8s4.5 2 4.5 4.8" />
      <path d="M14 19.5c0-2.3 1.3-4 3-4s3 1.7 3 4" />
    </Svg>
  );
}

/** 교육 */
export function IconEducation(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5.5h6a2 2 0 0 1 2 2V19a1.8 1.8 0 0 0-1.8-1.6H4Z" />
      <path d="M20 5.5h-6a2 2 0 0 0-2 2V19a1.8 1.8 0 0 1 1.8-1.6H20Z" />
    </Svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.4a12.5 12.5 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </Svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.6 7 8.4 6 8.4-6" />
    </Svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </Svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Svg>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" />
    </Svg>
  );
}

export function IconYoutube(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="m10.5 9.8 4.5 2.2-4.5 2.2z" />
    </Svg>
  );
}

export function IconFacebook(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14.5 8.5h2.2M14.5 21v-8.7m0 0V10a2 2 0 0 1 2-2m-2 4.3h-2.4m2.4 0h2.4" />
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    </Svg>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" />
    </Svg>
  );
}

export const programIcons = {
  scholarship: IconScholarship,
  wall: IconWall,
  museum: IconMuseum,
  ceremony: IconCeremony,
  family: IconFamily,
  education: IconEducation,
} as const;
