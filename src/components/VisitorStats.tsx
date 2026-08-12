"use client";

import { useEffect, useState } from "react";

/**
 * 방문자 통계.
 *
 * GoatCounter(무료·비영리 무료, 쿠키 미사용)를 사용합니다.
 * 개인을 식별하는 정보를 남기지 않아 보훈 사이트에 적합합니다.
 *
 * 설정 전에는 아무것도 그리지 않으므로, 준비되기 전까지 빈 숫자가 보이지 않습니다.
 * 설정 방법은 README 를 참고하세요.
 */
const CODE = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE ?? "";

type Counts = { today: number | null; total: number | null };

async function fetchCount(path: string): Promise<number | null> {
  try {
    const response = await fetch(
      `https://${CODE}.goatcounter.com/counter/${path}.json`,
      { headers: { Accept: "application/json" } },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as { count?: string };
    // GoatCounter 는 "1,234" 처럼 쉼표가 섞인 문자열로 돌려줍니다.
    const parsed = Number(String(data.count ?? "").replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function VisitorStats({
  labels,
}: {
  labels: { eyebrow: string; today: string; total: string };
}) {
  const [counts, setCounts] = useState<Counts>({ today: null, total: null });

  useEffect(() => {
    if (!CODE) return;
    let alive = true;
    (async () => {
      const [total, today] = await Promise.all([
        fetchCount("TOTAL"),
        fetchCount("TOTAL?daily=1"),
      ]);
      if (alive) setCounts({ today, total });
    })();
    return () => {
      alive = false;
    };
  }, []);

  // 아직 연결 전이거나 값을 받지 못하면 이 영역을 아예 그리지 않습니다.
  if (!CODE || counts.total === null) return null;

  const cells = [
    { value: counts.today, label: labels.today },
    { value: counts.total, label: labels.total },
  ].filter((cell) => cell.value !== null);

  // 어두운 푸터 위에 놓이므로 밝은 색으로 그립니다.
  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-3">
      <p className="text-xs font-semibold tracking-[0.18em] text-ochre-300 uppercase">
        {labels.eyebrow}
      </p>
      <dl className="flex gap-6">
        {cells.map((cell) => (
          <div key={cell.label} className="flex items-baseline gap-2">
            <dt className="text-sm text-cream-200/60">{cell.label}</dt>
            <dd className="font-serif text-lg font-semibold text-cream-100 tabular-nums">
              {cell.value!.toLocaleString()}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** 페이지뷰를 기록하는 스크립트. 레이아웃에서 한 번만 불러옵니다. */
export function VisitorStatsScript() {
  if (!CODE) return null;
  return (
    <script
      data-goatcounter={`https://${CODE}.goatcounter.com/count`}
      async
      src="//gc.zgo.at/count.js"
    />
  );
}
