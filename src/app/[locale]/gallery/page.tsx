import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Button, Container, PageHeader, PhotoSlot } from "@/components/ui";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { galleryAlbums, galleryVideos } from "@/content/gallery";

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

      {galleryAlbums.map((album, index) => (
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
                {album.items.length > 0
                  ? `${album.items.length}`
                  : dict.common.photoPending}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {album.items.length > 0
                ? album.items.map((item) => (
                    <figure
                      key={item.src}
                      className="overflow-hidden rounded-xl bg-cream-200"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt[locale]}
                        width={800}
                        height={800}
                        className="aspect-square h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </figure>
                  ))
                : Array.from({ length: album.placeholders }).map((_, i) => (
                    <PhotoSlot
                      key={i}
                      label={dict.common.photoPending}
                      ratio="aspect-square"
                    />
                  ))}
            </div>
          </Container>
        </section>
      ))}

      {/* 영상 */}
      <section className="py-14 sm:py-16">
        <Container>
          <h2 className="font-serif text-2xl font-semibold">{t.tabs.video}</h2>
          {galleryVideos.length === 0 ? (
            <p className="mt-4 rounded-xl border border-dashed border-ochre-300 bg-cream-100/70 px-5 py-4 text-sm text-bark-600">
              {t.videoEmpty}
            </p>
          ) : (
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
          )}
        </Container>
      </section>

      {/* 사진을 기다립니다 */}
      <section className="texture-grain bg-khaki-600 text-cream-100">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="font-serif text-2xl font-semibold text-cream-50 sm:text-3xl">
            {t.contribute}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream-200/85 sm:text-base">
            {t.contributeBody}
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
