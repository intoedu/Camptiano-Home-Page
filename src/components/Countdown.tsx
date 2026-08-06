"use client";

import { useEffect, useState } from "react";

type Remaining = { days: number; hours: number; minutes: number } | null;

function remainingUntil(iso: string): Remaining {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
  };
}

/**
 * 추모식까지 남은 시간.
 * 서버·클라이언트 시각 차이로 인한 하이드레이션 불일치를 피하려고
 * 마운트 이후에만 값을 그립니다.
 */
export function Countdown({
  datetime,
  labels,
  passedLabel,
}: {
  datetime: string;
  labels: { days: string; hours: string; minutes: string };
  passedLabel: string;
}) {
  const [remaining, setRemaining] = useState<Remaining>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRemaining(remainingUntil(datetime));
    const timer = setInterval(
      () => setRemaining(remainingUntil(datetime)),
      30_000,
    );
    return () => clearInterval(timer);
  }, [datetime]);

  if (!mounted) {
    return <div className="h-20" aria-hidden />;
  }

  if (!remaining) {
    return (
      <p className="text-sm leading-relaxed text-cream-200/80">{passedLabel}</p>
    );
  }

  const cells = [
    { value: remaining.days, label: labels.days },
    { value: remaining.hours, label: labels.hours },
    { value: remaining.minutes, label: labels.minutes },
  ];

  return (
    <div className="flex gap-3" role="timer" aria-live="off">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="min-w-20 rounded-xl bg-cream-50/10 px-4 py-3 text-center ring-1 ring-cream-200/20"
        >
          <div className="font-serif text-2xl leading-none font-semibold text-cream-50 tabular-nums sm:text-3xl">
            {cell.value}
          </div>
          <div className="mt-1.5 text-[11px] tracking-wide text-cream-200/70">
            {cell.label}
          </div>
        </div>
      ))}
    </div>
  );
}
