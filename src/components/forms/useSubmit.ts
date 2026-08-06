"use client";

import { useState } from "react";

export type SubmitState = "idle" | "sending" | "success" | "error";

/**
 * 문의·신청 폼 공통 전송 로직.
 *
 * 서버에 메일 발송이 아직 설정되지 않았으면(`unconfigured`) 방문자가 헛걸음하지
 * 않도록 메일 앱을 열어 같은 내용을 그대로 보낼 수 있게 합니다.
 */
export function useSubmit(endpoint: string, fallbackEmail: string) {
  const [state, setState] = useState<SubmitState>("idle");

  async function submit(
    payload: Record<string, string>,
    mailSubject: string,
  ): Promise<void> {
    setState("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ok: boolean; reason?: string };

      if (data.ok) {
        setState("success");
        return;
      }

      if (data.reason === "unconfigured") {
        const body = Object.entries(payload)
          .filter(([key, value]) => value && key !== "website")
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
        window.location.href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(
          mailSubject,
        )}&body=${encodeURIComponent(body)}`;
        setState("success");
        return;
      }

      setState("error");
    } catch {
      setState("error");
    }
  }

  return { state, submit, reset: () => setState("idle") };
}
