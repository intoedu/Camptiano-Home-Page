"use client";

import { useState } from "react";
import { Field, Input, Select, Textarea } from "./Fields";
import { useSubmit } from "./useSubmit";
import type { Dictionary, Locale } from "@/i18n";
import { site } from "@/lib/site";

export function ApplyForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.apply;
  const { state, submit } = useSubmit(site.contact.email);
  const [agreed, setAgreed] = useState(false);

  const typeEntries = Object.entries(t.types) as [string, string][];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(
      Array.from(form.entries()).map(([k, v]) => [k, String(v)]),
    );
    await submit(
      { ...payload, kind: "apply", locale },
      `[${site.org.ko.name}] 신청 — ${payload.type ?? ""} / ${payload.name ?? ""}`,
    );
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl bg-khaki-200/40 p-8 text-center ring-1 ring-khaki-300/60">
        <p className="font-serif text-lg font-semibold text-khaki-700">
          {dict.contact.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden>
        <label htmlFor="apply-website">Website</label>
        <input
          id="apply-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field
        id="type"
        label={t.typeLabel}
        required
        requiredText={dict.common.required}
      >
        <Select id="type" name="type" required defaultValue={t.types.ceremony}>
          {typeEntries.map(([key, label]) => (
            <option key={key} value={label}>
              {label}
            </option>
          ))}
        </Select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="apply-name"
          label={t.nameLabel}
          required
          requiredText={dict.common.required}
        >
          <Input id="apply-name" name="name" required autoComplete="name" />
        </Field>
        <Field
          id="org"
          label={t.orgLabel}
          requiredText={dict.common.required}
        >
          <Input id="org" name="org" autoComplete="organization" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="apply-email"
          label={t.emailLabel}
          required
          requiredText={dict.common.required}
        >
          <Input
            id="apply-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </Field>
        <Field
          id="apply-phone"
          label={t.phoneLabel}
          required
          requiredText={dict.common.required}
        >
          <Input
            id="apply-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="count"
          label={t.countLabel}
          requiredText={dict.common.required}
        >
          <Input id="count" name="count" type="number" min={1} defaultValue={1} />
        </Field>
        <Field id="date" label={t.dateLabel} requiredText={dict.common.required}>
          <Input id="date" name="date" type="date" />
        </Field>
      </div>

      <Field
        id="apply-message"
        label={t.messageLabel}
        requiredText={dict.common.required}
      >
        <Textarea id="apply-message" name="message" rows={5} />
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
          {dict.contact.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending" || !agreed}
        className="inline-flex items-center justify-center rounded-full bg-ochre-600 px-7 py-3.5 text-sm font-semibold text-cream-50 shadow-warm transition-colors hover:bg-ochre-700 disabled:cursor-not-allowed disabled:opacity-45"
      >
        {state === "sending" ? dict.contact.sending : t.submit}
      </button>
    </form>
  );
}
