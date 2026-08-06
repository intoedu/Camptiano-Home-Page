import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button, Container, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { faqGroups } from "@/content/faq";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.faq.title, description: dict.faq.lead };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  // 검색 결과에 Q&A가 노출되도록 구조화 데이터를 함께 싣습니다.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q[locale],
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a[locale].join(" "),
        },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHeader
        eyebrow={dict.nav.faq}
        title={dict.faq.title}
        lead={dict.faq.lead}
      />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="space-y-14">
            {faqGroups.map((group) => (
              <div key={group.id}>
                <h2 className="font-serif text-xl font-semibold text-ochre-700">
                  {group.heading[locale]}
                </h2>
                <div className="mt-5 divide-y divide-cream-300/80 border-y border-cream-300/80">
                  {group.items.map((item, index) => (
                    <details key={index} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-medium text-bark-800 transition-colors hover:text-ochre-700">
                        {item.q[locale]}
                        <span
                          aria-hidden
                          className="mt-1 shrink-0 text-ochre-500 transition-transform duration-200 group-open:rotate-45"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.6}
                            strokeLinecap="round"
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </summary>
                      <div className="mt-4 space-y-3 pr-8 text-sm leading-relaxed text-bark-600">
                        {item.a[locale].map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-cream-100/70 p-8 text-center ring-1 ring-cream-300/80">
            <p className="text-sm leading-relaxed text-bark-600">
              {dict.faq.lead}
            </p>
            <div className="mt-5 flex justify-center">
              <Button href={`/${locale}/contact`}>
                {dict.common.contactUs}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
