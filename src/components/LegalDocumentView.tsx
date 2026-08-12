import { IconMail, IconPhone } from "./Icons";
import { Container, PageHeader } from "./ui";
import type { LegalDocument } from "@/content/legal";
import type { Dictionary, Locale } from "@/i18n";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/format";

/** 개인정보처리방침·이용약관처럼 조항으로 이루어진 문서를 그립니다. */
export function LegalDocumentView({
  document,
  locale,
  dict,
}: {
  document: LegalDocument;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <>
      <PageHeader
        eyebrow={site.org[locale].name}
        title={document.title[locale]}
        lead={document.lead[locale]}
      />

      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <p className="text-sm text-bark-500">
            {locale === "ko" ? "시행일" : "Effective"}{" "}
            <time dateTime={document.effectiveDate}>
              {formatDate(document.effectiveDate, locale)}
            </time>
          </p>

          <div className="mt-10 space-y-12">
            {document.sections.map((section, index) => (
              <section key={index}>
                <h2 className="font-serif text-xl font-semibold text-ochre-700">
                  {section.heading[locale]}
                </h2>

                <div className="mt-4 space-y-3 text-sm leading-loose text-bark-700 sm:text-base">
                  {section.body[locale].map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {section.table ? (
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-lg border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-cream-300">
                          {section.table.columns[locale].map((column) => (
                            <th
                              key={column}
                              scope="col"
                              className="py-3 pr-4 font-semibold text-bark-700"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows[locale].map((row, r) => (
                          <tr
                            key={r}
                            className="border-b border-cream-300/70 align-top"
                          >
                            {row.map((cell, c) => (
                              <td
                                key={c}
                                className="py-3 pr-4 leading-relaxed text-bark-600"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          {/* 연락처 */}
          <div className="mt-14 rounded-2xl bg-cream-100/70 p-6 ring-1 ring-cream-300/80 sm:p-8">
            <h2 className="font-serif text-lg font-semibold">
              {dict.contact.infoHeading}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex gap-3">
                <IconPhone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ochre-600" />
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="text-bark-600 transition-colors hover:text-ochre-700"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <IconMail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ochre-600" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-all text-bark-600 transition-colors hover:text-ochre-700"
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
