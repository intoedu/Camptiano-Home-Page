import { Button, Container } from "@/components/ui";
import { ko } from "@/i18n/ko";

/**
 * not-found 는 params 를 받을 수 없어 기본 언어(한국어)로 표시합니다.
 */
export default function NotFound() {
  return (
    <section className="texture-paper py-28 sm:py-36">
      <Container className="max-w-lg text-center">
        <p className="font-serif text-5xl font-semibold text-ochre-400">404</p>
        <h1 className="mt-6 text-2xl font-semibold sm:text-3xl">
          {ko.notFound.title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-bark-600">
          {ko.notFound.body}
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/ko">{ko.notFound.cta}</Button>
        </div>
      </Container>
    </section>
  );
}
