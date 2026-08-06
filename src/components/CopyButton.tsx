"use client";

import { useEffect, useState } from "react";

export function CopyButton({
  value,
  label,
  copiedLabel,
}: {
  value: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          // 클립보드 접근이 막힌 환경에서는 아무 일도 하지 않습니다.
        }
      }}
      className="inline-flex shrink-0 items-center rounded-full bg-cream-200 px-3.5 py-1.5 text-xs font-semibold text-bark-700 transition-colors hover:bg-cream-300"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
