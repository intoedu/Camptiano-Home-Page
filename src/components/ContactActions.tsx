import { IconMail, IconPhone } from "./Icons";
import { site } from "@/lib/site";

/**
 * 전화·이메일로 바로 연결되는 버튼 한 쌍.
 * 폼 대신 이 방식으로 연락을 받습니다.
 */
export function ContactActions({
  callLabel,
  emailLabel,
  tone = "light",
  size = "md",
}: {
  callLabel: string;
  emailLabel: string;
  tone?: "light" | "dark";
  size?: "md" | "lg";
}) {
  const padding = size === "lg" ? "px-7 py-4 text-base" : "px-6 py-3 text-sm";

  const primary =
    tone === "dark"
      ? "bg-cream-50 text-bark-900 hover:bg-cream-100"
      : "bg-ochre-600 text-cream-50 hover:bg-ochre-700";

  const secondary =
    tone === "dark"
      ? "text-cream-100 ring-1 ring-cream-200/40 hover:bg-cream-100/10"
      : "bg-cream-100 text-bark-800 ring-1 ring-inset ring-ochre-300/70 hover:bg-cream-200";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={`tel:${site.contact.phoneHref}`}
        className={`inline-flex items-center justify-center gap-2.5 rounded-full font-semibold shadow-warm transition-all duration-200 hover:shadow-warm-lg ${padding} ${primary}`}
      >
        <IconPhone className="h-5 w-5" />
        {callLabel}
        <span className="font-normal opacity-70">{site.contact.phone}</span>
      </a>
      <a
        href={`mailto:${site.contact.email}`}
        className={`inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-200 ${padding} ${secondary}`}
      >
        <IconMail className="h-5 w-5" />
        {emailLabel}
      </a>
    </div>
  );
}
