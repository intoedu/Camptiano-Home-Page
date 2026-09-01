import Link from "next/link";
import { LogoMark, Wordmark } from "./Logo";
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconMapPin,
  IconPhone,
  IconYoutube,
} from "./Icons";
import { Container } from "./ui";
import { VisitorStats } from "./VisitorStats";
import type { Dictionary, Locale } from "@/i18n";
import { footerNavigation, site } from "@/lib/site";

type NavKey = (typeof footerNavigation)[number]["key"];

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const org = site.org[locale];
  const year = new Date().getFullYear();

  const socials = [
    { href: site.social.youtube, Icon: IconYoutube, label: "YouTube" },
    { href: site.social.facebook, Icon: IconFacebook, label: "Facebook" },
    { href: site.social.instagram, Icon: IconInstagram, label: "Instagram" },
  ].filter((s) => s.href);

  return (
    <footer className="texture-grain bg-khaki-700 text-cream-200">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3"
              aria-label={org.name}
            >
              <LogoMark className="h-11 w-11" />
              <Wordmark name={org.name} tone="dark" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-cream-200/75">
              {org.tagline}
            </p>
            {socials.length > 0 ? (
              <div className="mt-6 flex gap-2">
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-cream-200/25 transition-colors hover:bg-cream-200/10"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold tracking-wide text-cream-100">
              {dict.footer.linksHeading}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerNavigation.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-cream-200/75 transition-colors hover:text-ochre-300"
                  >
                    {dict.nav[item.key as NavKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold tracking-wide text-cream-100">
              {dict.footer.contactHeading}
            </h3>
            <ul className="space-y-3.5 text-sm text-cream-200/75">
              <li className="flex items-start gap-2.5">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-ochre-300" />
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="transition-colors hover:text-ochre-300"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-ochre-300" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-all transition-colors hover:text-ochre-300"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-ochre-300" />
                <span>{site.contact.address[locale]}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold tracking-wide text-cream-100">
              {dict.support.title}
            </h3>
            <p className="text-sm leading-relaxed text-cream-200/75">
              {dict.support.lead}
            </p>
            <Link
              href={`/${locale}/support`}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-ochre-500 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-ochre-400"
            >
              {dict.common.donate}
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-cream-200/15 pt-8">
          <VisitorStats
            labels={{
              eyebrow: dict.visitors.eyebrow,
              today: dict.visitors.today,
              total: dict.visitors.total,
            }}
          />

          <div className="flex flex-col gap-4 text-xs text-cream-200/55 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {dict.footer.rights}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href={`/${locale}/privacy`}
                className="transition-colors hover:text-ochre-300"
              >
                {dict.footer.privacy}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="transition-colors hover:text-ochre-300"
              >
                {dict.footer.terms}
              </Link>
              <span>{dict.footer.builtNote}</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
