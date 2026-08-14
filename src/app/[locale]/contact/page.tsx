import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactActions } from "@/components/ContactActions";
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconMapPin,
  IconPhone,
  IconYoutube,
} from "@/components/Icons";
import { Container, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.contact.title, description: dict.contact.lead };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.contact;

  const socials = [
    { href: site.social.youtube, Icon: IconYoutube, label: "YouTube" },
    { href: site.social.facebook, Icon: IconFacebook, label: "Facebook" },
    { href: site.social.instagram, Icon: IconInstagram, label: "Instagram" },
  ].filter((s) => s.href);

  return (
    <>
      <PageHeader eyebrow={dict.nav.contact} title={t.title} lead={t.lead} />

      {/* 전화 · 이메일 */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="group rounded-2xl bg-cream-50 p-8 ring-1 ring-cream-300/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-warm-lg sm:p-10"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ochre-200/50 text-ochre-700 transition-colors group-hover:bg-ochre-200">
                <IconPhone className="h-7 w-7" />
              </span>
              <h2 className="mt-6 font-serif text-xl font-semibold">
                {t.callHeading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bark-600">
                {t.callBody}
              </p>
              <p className="mt-6 font-serif text-2xl font-semibold text-ochre-700 tabular-nums">
                {site.contact.phone}
              </p>
            </a>

            <a
              href={`mailto:${site.contact.email}`}
              className="group rounded-2xl bg-cream-50 p-8 ring-1 ring-cream-300/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-warm-lg sm:p-10"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-khaki-200/60 text-khaki-700 transition-colors group-hover:bg-khaki-200">
                <IconMail className="h-7 w-7" />
              </span>
              <h2 className="mt-6 font-serif text-xl font-semibold">
                {t.mailHeading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bark-600">
                {t.mailBody}
              </p>
              <p className="mt-6 font-serif text-lg font-semibold break-all text-khaki-700">
                {site.contact.email}
              </p>
            </a>
          </div>

          <p className="mt-8 rounded-xl bg-cream-100/70 px-6 py-5 text-sm leading-relaxed text-bark-600 ring-1 ring-cream-300/70">
            <span className="font-semibold text-bark-700">
              {t.noteHeading}
            </span>{" "}
            {t.note}
          </p>
        </Container>
      </section>

      {/* 이런 일로 연락 주세요 */}
      <section className="texture-paper border-y border-cream-300/70 bg-cream-100/60 py-16 sm:py-20">
        <Container>
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            {t.reasonsHeading}
          </h2>

          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {t.reasons.map((reason) => (
              <div key={reason.title}>
                <dt className="flex items-start gap-3 font-serif text-base font-semibold text-ochre-700">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ochre-400"
                  />
                  {reason.title}
                </dt>
                <dd className="mt-2 pl-[1.125rem] text-sm leading-relaxed text-bark-600">
                  {reason.body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 주소 · SNS */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="font-serif text-lg font-semibold">
                {dict.visit.addressLabel}
              </h2>
              <p className="mt-3 flex items-start gap-3 text-sm leading-relaxed text-bark-600">
                <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-ochre-600" />
                {site.contact.address[locale]}
              </p>
            </div>

            {socials.length > 0 ? (
              <div>
                <h2 className="font-serif text-lg font-semibold">
                  {dict.footer.followHeading}
                </h2>
                <div className="mt-3 flex gap-2">
                  {socials.map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-bark-600 ring-1 ring-cream-300 transition-colors hover:bg-cream-200 hover:text-ochre-700"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* 마무리 */}
      <section className="texture-grain bg-khaki-600 text-cream-100">
        <Container className="flex flex-col items-center gap-8 py-16 text-center sm:py-20">
          <h2 className="max-w-xl font-serif text-2xl font-semibold text-cream-50 sm:text-3xl">
            {site.org[locale].tagline}
          </h2>
          <ContactActions
            callLabel={dict.common.call}
            emailLabel={dict.common.email}
            tone="dark"
            size="lg"
          />
        </Container>
      </section>
    </>
  );
}
