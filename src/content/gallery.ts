import type { Locale } from "@/i18n";

export type GalleryAlbum = {
  id: string;
  title: Record<Locale, string>;
  caption: Record<Locale, string>;
  /** 사진이 준비되면 /public/gallery/… 경로를 넣어 주세요. 비어 있으면 자리표시자가 표시됩니다. */
  items: { src: string; alt: Record<Locale, string> }[];
  /** 아직 사진이 없는 앨범에서 자리표시자를 몇 칸 보여 줄지 */
  placeholders: number;
};

export type GalleryVideo = {
  id: string;
  /** 유튜브 영상 ID */
  youtubeId: string;
  title: Record<Locale, string>;
  caption: Record<Locale, string>;
};

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: "memorial",
    title: { ko: "캠프티아노 기념비", en: "The Camp Tiano Memorial" },
    caption: {
      ko: "70년을 그 자리에서 견뎌 온 비석과, 사계절의 기록.",
      en: "The stone that has kept its place for seventy years, through the seasons.",
    },
    items: [],
    placeholders: 6,
  },
  {
    id: "ceremony",
    title: { ko: "추모식", en: "Memorial ceremonies" },
    caption: {
      ko: "해마다 기념비 앞에 모인 사람들.",
      en: "Those who have gathered before the stone, year after year.",
    },
    items: [],
    placeholders: 6,
  },
  {
    id: "veterans",
    title: { ko: "참전용사와 유가족", en: "Veterans and families" },
    caption: {
      ko: "유가족이 간직해 온 사진들. 사진 기념관의 첫 소장품이 됩니다.",
      en: "Photographs kept by families — the first holdings of the memorial hall.",
    },
    items: [],
    placeholders: 8,
  },
  {
    id: "archive",
    title: { ko: "기록물", en: "Documents and records" },
    caption: {
      ko: "참전 기록, 옛 인쇄물, 신문 기사.",
      en: "Service records, old printed material, newspaper clippings.",
    },
    items: [],
    placeholders: 4,
  },
];

/** 유튜브 채널이 열리면 영상 ID를 채워 주세요. */
export const galleryVideos: GalleryVideo[] = [];
