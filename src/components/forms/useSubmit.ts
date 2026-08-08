"use client";

import { useState } from "react";

export type SubmitState = "idle" | "sending" | "success" | "error";

/**
 * 문의·신청 폼 전송.
 *
 * 이 사이트는 서버 없이 동작하는 정적 사이트라, 접수 방식이 두 가지입니다.
 *
 * 1. NEXT_PUBLIC_FORM_ENDPOINT 가 설정된 경우
 *    폼 접수 서비스(Formspree 등)로 바로 보냅니다. 방문자는 사이트를 벗어나지
 *    않고, 사업회는 메일로 접수 내용을 받습니다. 무료 플랜으로 충분합니다.
 *
 * 2. 설정되지 않은 경우
 *    방문자의 메일 앱이 열리면서 입력한 내용이 그대로 채워집니다.
 *    별도 설정 없이 지금 바로 동작하는 방식입니다.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export function useSubmit(fallbackEmail: string) {
  const [state, setState] = useState<SubmitState>("idle");

  function openMailClient(
    payload: Record<string, string>,
    mailSubject: string,
  ) {
    const body = Object.entries(payload)
      .filter(([key, value]) => value && key !== "website")
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    window.location.href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(
      mailSubject,
    )}&body=${encodeURIComponent(body)}`;
  }

  async function submit(
    payload: Record<string, string>,
    mailSubject: string,
  ): Promise<void> {
    // 봇이 채운 숨김 필드 — 보내지 않고 조용히 성공 처리합니다.
    if (payload.website) {
      setState("success");
      return;
    }

    if (!ENDPOINT) {
      openMailClient(payload, mailSubject);
      setState("success");
      return;
    }

    setState("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, _subject: mailSubject }),
      });
      setState(response.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  return { state, submit, reset: () => setState("idle") };
}
