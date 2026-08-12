import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/CopyButton";
import { programIcons } from "@/components/Icons";
import {
  Button,
  Card,
  Container,
  PageHeader,
  PendingNote,
  SectionHeading,
} from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { programs } from "@/content/programs";
import { site } from "@/lib/site";
import { formatCurrency } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.support.title, description: dict.support.lead };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.support;

  // 링크가 채워진 간편 후원 수단만 노출합니다.
  const activeLinks = site.donationLinks.filter((link) => link.url);

  return (
    <>
      <PageHeader eyebrow={dict.nav.support} title={t.title} lead={t.lead} />

      {/* 세 가지 기금 */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {site.funds.map((fund) => {
              const program = programs.find((p) => p.fundId === fund.id);
              const Icon = program
                ? programIcons[program.icon]
                : programIcons.scholarship;
              const showBar = fund.goal !== null && fund.raised !== null;

              return (
                <Card key={fund.id} id={fund.id} className="scroll-mt-24 flex flex-col">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ochre-200/50 text-ochre-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 font-serif text-xl font-semibold">
                    {fund[locale].name}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-bark-600">
                    {fund[locale].summary}
                  </p>

                  {showBar ? (
                    <div className="mt-6">
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="font-semibold text-bark-700">
                          {formatCurrency(fund.raised!, locale)}
                        </span>
                        <span className="text-bark-500">
                          {dict.programs.goalLabel}{" "}
                          {formatCurrency(fund.goal!, locale)}
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-cream-200">
                        <div
                          className="h-full rounded-full bg-ochre-500"
                          style={{
                            width: `${Math.min(100, Math.round((fund.raised! / fund.goal!) * 100))}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 계좌 후원 */}
      <section className="texture-paper border-y border-cream-300/70 bg-cream-100/70 py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={locale === "ko" ? "후원 방법" : "How to give"}
              title={t.bankHeading}
            />

            <dl className="mt-8 divide-y divide-cream-300/80 rounded-2xl bg-cream-50 px-6 ring-1 ring-cream-300/80">
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="text-sm text-bark-500">{t.bankName}</dt>
                <dd className="text-sm font-semibold">
                  {site.bank.name[locale]}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="text-sm text-bark-500">{t.bankAccount}</dt>
                <dd className="flex items-center gap-3">
                  <span className="font-serif text-base font-semibold tabular-nums">
                    {site.bank.account}
                  </span>
                  <CopyButton
                    value={site.bank.account}
                    label={t.copy}
                    copiedLabel={t.copied}
                  />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="text-sm text-bark-500">{t.bankHolder}</dt>
                <dd className="text-sm font-semibold">
                  {site.bank.holder[locale]}
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-xs leading-relaxed text-bark-500">
              {locale === "ko"
                ? "특정 사업을 지정해 후원하시려면 입금자명 뒤에 '장학', '벽', '기념관' 을 붙여 주세요. 예) 홍길동장학"
                : "To designate your gift, add “scholarship”, “wall”, or “hall” after your name in the transfer reference."}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-lg font-semibold">
                {t.onlineHeading}
              </h2>
              {activeLinks.length > 0 ? (
                <>
                  <p className="mt-3 text-sm leading-relaxed text-bark-600">
                    {t.onlineBody}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {activeLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center justify-center rounded-full bg-ochre-600 px-6 py-3 text-sm font-semibold text-cream-50 shadow-warm transition-colors hover:bg-ochre-700"
                      >
                        {link.label[locale]}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mt-3">
                  <PendingNote>{t.onlinePending}</PendingNote>
                </div>
              )}
            </div>

            <div>
              <h2 className="font-serif text-lg font-semibold">
                {t.corporateHeading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bark-600">
                {t.corporateBody}
              </p>
              <div className="mt-4">
                <Button href={`/${locale}/contact`} variant="secondary">
                  {t.corporateCta}
                </Button>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-lg font-semibold">
                {t.receiptHeading}
              </h2>
              <div className="mt-3">
                <PendingNote>{t.receiptPending}</PendingNote>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-lg font-semibold">
                {t.transparencyHeading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bark-600">
                {t.transparencyBody}
              </p>
              <div className="mt-4">
                <Button href={`/${locale}/news`} variant="secondary">
                  {dict.nav.news}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 돈이 아니어도 좋습니다 */}
      <section className="texture-grain bg-ochre-700 text-cream-100">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="font-serif text-2xl font-semibold text-cream-50 sm:text-3xl">
            {t.otherHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream-200/85 sm:text-base">
            {t.otherBody}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href={`/${locale}/contact`} variant="onDark">
              {dict.common.contactUs}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
