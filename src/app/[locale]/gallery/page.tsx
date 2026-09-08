import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ContactActions } from "@/components/ContactActions";
import { Container, PageHeader } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { galleryAlbums, galleryVideos } from "@/content/gallery";
import { asset } from "@/lib/asset";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.gallery.title, description: dict.gallery.lead };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.gallery;

  return (
    <>
      <PageHeader eyebrow={dict.nav.gallery} title={t.title} lead={t.lead} />

      {galleryAlbums
        .filter((album) => album.items.length > 0)
        .map((album, index) => (
        <section
          key={album.id}
          className={`py-14 sm:py-16 ${
            index % 2 === 1
              ? "texture-paper border-y border-cream-300/70 bg-cream-100/60"
              : ""
          }`}
        >
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-semibold">
                  {album.title[locale]}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-bark-600">
                  {album.caption[locale]}
                </p>
              </div>
              <span className="text-xs text-bark-500">
                {album.items.length}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {album.items.map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden rounded-xl bg-cream-200"
                >
                  <Image
                    src={asset(item.src)}
                    alt={item.alt[locale]}
                    width={800}
                    height={800}
                    className="aspect-square h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </figure>
              ))}
            </div>
          </Container>
        </section>
      ))}

      {/* 영상 — 올릴 영상이 있을 때만 나옵니다 */}
      {galleryVideos.length > 0 ? (
        <section className="py-14 sm:py-16">
          <Container>
            <h2 className="font-serif text-2xl font-semibold">{t.tabs.video}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {galleryVideos.map((video) => (
                <figure key={video.id}>
                  <div className="aspect-video overflow-hidden rounded-xl bg-cream-200">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                      title={video.title[locale]}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="h-full w-full"
                    />
                  </div>
                  <figcaption className="mt-3">
                    <p className="font-serif text-base font-semibold">
                      {video.title[locale]}
                    </p>
                    <p className="mt-1 text-sm text-bark-600">
                      {video.caption[locale]}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/*
        사진을 내려 달라고 하실 수 있는 자리.
        사이트가 세 군데에서 "원하지 않으시면 내립니다"라고 약속하고 있으면서
        정작 말할 창구가 없었습니다. 사진 바로 아래에 둡니다.
      */}
      <section className="border-t border-cream-300/70 py-14 sm:py-16">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-xl font-semibold sm:text-2xl">
            {t.takedownHeading}
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-[1.85] text-bark-600">
            {t.takedownBody}
          </p>
          <div className="mt-7">
            <ContactActions
              callLabel={dict.common.call}
              emailLabel={dict.common.email}
            />
          </div>
        </Container>
      </section>

    </>
  );
}
