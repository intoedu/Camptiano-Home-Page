import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalDocumentView } from "@/components/LegalDocumentView";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { privacyPolicy } from "@/content/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: privacyPolicy.title[locale],
    description: privacyPolicy.lead[locale],
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <LegalDocumentView
      document={privacyPolicy}
      locale={locale}
      dict={getDictionary(locale)}
    />
  );
}
