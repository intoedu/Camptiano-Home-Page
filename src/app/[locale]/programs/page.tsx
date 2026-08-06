import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { programIcons } from "@/components/Icons";
import { Button, Container, PageHeader, PhotoSlot } from "@/components/ui";
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
  return { title: dict.programs.title, description: dict.programs.lead };
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.programs;

  return (
    <>
      <PageHeader eyebrow={dict.nav.programs} title={t.title} lead={t.lead} />

      {/* 목차 */}
      <nav
        aria-label={t.title}
        className="border-b border-cream-300/70 bg-cream-50/80 py-4 backdrop-blur"
      >
        <Container>
          <ul className="flex flex-wrap gap-2">
            {programs.map((program) => (
              <li key={program.id}>
                <a
                  href={`#${program.id}`}
                  className="inline-flex rounded-full bg-cream-100 px-4 py-2 text-sm font-medium text-bark-700 transition-colors hover:bg-cream-200 hover:text-ochre-700"
                >
                  {program.title[locale]}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <div className="divide-y divide-cream-300/70">
        {programs.map((program, index) => {
          const Icon = programIcons[program.icon];
          const fund = program.fundId
            ? site.funds.find((f) => f.id === program.fundId)
            : undefined;
          const reversed = index % 2 === 1;

          return (
            <section
              key={program.id}
              id={program.id}
              className={`scroll-mt-24 py-16 sm:py-20 ${
                reversed ? "texture-paper bg-cream-100/60" : ""
              }`}
            >
              <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div
                  className={`lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ochre-200/50 text-ochre-700">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-khaki-200/60 px-3 py-1 text-xs font-medium text-khaki-700">
                      {program.status[locale]}
                    </span>
                  </div>

                  <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
                    {program.title[locale]}
                  </h2>
                  <p className="mt-4 font-serif text-lg leading-relaxed text-ochre-700">
                    {program.lead[locale]}
                  </p>

                  <div className="mt-6 space-y-4 text-base leading-loose text-bark-700">
                    {program.body[locale].map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  {fund && fund.goal && fund.raised !== null ? (
                    <div className="mt-8 max-w-md">
                      <div className="flex items-baseline justify-between text-sm">
                        <span className="font-semibold text-bark-700">
                          {t.raisedLabel} {formatCurrency(fund.raised, locale)}
                        </span>
                        <span className="text-bark-500">
                          {t.goalLabel} {formatCurrency(fund.goal, locale)}
                        </span>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-cream-200">
                        <div
                          className="h-full rounded-full bg-ochre-500"
                          style={{
                            width: `${Math.min(100, Math.round((fund.raised / fund.goal) * 100))}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-8 flex flex-wrap gap-3">
                    {program.fundId ? (
                      <Button href={`/${locale}/support#${program.fundId}`}>
                        {t.supportLabel}
                      </Button>
                    ) : null}
                    <Button href={`/${locale}/contact`} variant="secondary">
                      {dict.common.contactUs}
                    </Button>
                  </div>
                </div>

                <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
                  <PhotoSlot
                    label={dict.common.photoPending}
                    ratio="aspect-4/3"
                    className="shadow-warm"
                  />
                </div>
              </Container>
            </section>
          );
        })}
      </div>
    </>
  );
}
