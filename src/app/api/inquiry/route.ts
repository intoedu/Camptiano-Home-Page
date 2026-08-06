import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * 문의·신청 접수.
 *
 * 환경변수가 설정되어 있으면 Resend로 사업회 메일함에 전달하고,
 * 아직 설정 전이라면 `unconfigured` 를 돌려주어 방문자의 메일 앱이 열리도록 합니다.
 *
 *   RESEND_API_KEY   Resend API 키
 *   INQUIRY_TO       받는 사람 (사업회 메일 주소)
 *   INQUIRY_FROM     보내는 사람 (Resend에 인증된 도메인의 주소)
 */

const FIELD_LABELS: Record<string, string> = {
  kind: "구분",
  type: "신청 종류",
  subject: "문의 유형",
  name: "성함",
  org: "소속",
  email: "이메일",
  phone: "연락처",
  count: "인원",
  date: "희망 날짜",
  message: "내용",
  locale: "언어",
};

const MAX_LENGTH = 5000;

/** 아주 단순한 인메모리 속도 제한 — 같은 IP에서 1분에 5건까지. */
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const window = 60_000;
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < window);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) hits.clear();
  return recent.length > 5;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, reason: "rate_limited" },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  // 봇이 채운 숨김 필드 — 조용히 성공으로 응답합니다.
  if (typeof payload.website === "string" && payload.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  if (!name || !email.includes("@")) {
    return NextResponse.json(
      { ok: false, reason: "bad_request" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO;
  const from = process.env.INQUIRY_FROM;

  if (!apiKey || !to || !from) {
    return NextResponse.json({ ok: false, reason: "unconfigured" });
  }

  const rows = Object.entries(payload)
    .filter(
      ([key, value]) =>
        key !== "website" && typeof value === "string" && value.trim(),
    )
    .map(([key, value]) => {
      const label = FIELD_LABELS[key] ?? key;
      const text = String(value).slice(0, MAX_LENGTH);
      return `<tr><th align="left" style="padding:6px 16px 6px 0;color:#6b5844;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(
        label,
      )}</th><td style="padding:6px 0;color:#362b20">${escapeHtml(text).replace(
        /\n/g,
        "<br>",
      )}</td></tr>`;
    })
    .join("");

  const kind = payload.kind === "apply" ? "신청·예약" : "문의";
  const subject = `[캠프티아노] ${kind} — ${name}`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html: `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.7">
  <h2 style="font-size:16px;color:#46372a;margin:0 0 16px">${escapeHtml(subject)}</h2>
  <table style="border-collapse:collapse">${rows}</table>
</div>`,
      }),
    });

    if (!response.ok) {
      console.error("Resend 전송 실패", await response.text());
      return NextResponse.json(
        { ok: false, reason: "send_failed" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Resend 요청 오류", error);
    return NextResponse.json(
      { ok: false, reason: "send_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
