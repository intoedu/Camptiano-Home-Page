"use client";

import { useState } from "react";
import { Field, Input, Select, Textarea } from "./Fields";
import { useSubmit } from "./useSubmit";
import type { Dictionary, Locale } from "@/i18n";
import { site } from "@/lib/site";

export function ContactForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.contact;
  const { state, submit } = useSubmit("/api/inquiry", site.contact.email);
  const [agreed, setAgreed] = useState(false);

  const subjectEntries = Object.entries(t.subjects) as [string, string][];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(
      Array.from(form.entries()).map(([k, v]) => [k, String(v)]),
    );
    await submit(
      { ...payload, kind: "contact", locale },
      `[${site.org.ko.name}] ${payload.subject ?? ""} — ${payload.name ?? ""}`,
    );
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl bg-khaki-200/40 p-8 text-center ring-1 ring-khaki-300/60">
        <p className="font-serif text-lg font-semibold text-khaki-700">
          {t.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      {/* 스팸 방지용 숨김 필드 — 사람에게는 보이지 않습니다. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label={t.nameLabel}
          required
          requiredText={dict.common.required}
        >
          <Input id="name" name="name" required autoComplete="name" />
        </Field>
        <Field
          id="email"
          label={t.emailLabel}
          required
          requiredText={dict.common.required}
        >
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="phone" label={t.phoneLabel} requiredText={dict.common.required}>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field
          id="subject"
          label={t.subjectLabel}
          required
          requiredText={dict.common.required}
        >
          <Select id="subject" name="subject" required defaultValue="general">
            {subjectEntries.map(([key, label]) => (
              <option key={key} value={label}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        id="message"
        label={t.messageLabel}
        required
        requiredText={dict.common.required}
      >
        <Textarea id="message" name="message" rows={7} required />
      </Field>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-bark-600">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-ochre-600)]"
        />
        <span>
          {t.privacyAgree}
          <span className="mt-1 block text-xs text-bark-500">{t.privacy}</span>
        </span>
      </label>

      {state === "error" ? (
        <p className="rounded-xl bg-ochre-200/40 px-4 py-3 text-sm text-ochre-700">
          {t.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending" || !agreed}
        className="inline-flex items-center justify-center rounded-full bg-ochre-600 px-7 py-3.5 text-sm font-semibold text-cream-50 shadow-warm transition-colors hover:bg-ochre-700 disabled:cursor-not-allowed disabled:opacity-45"
      >
        {state === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
