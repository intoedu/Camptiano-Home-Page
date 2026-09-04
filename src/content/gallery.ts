import type { Locale } from "@/i18n";

export type GalleryAlbum = {
  id: string;
  title: Record<Locale, string>;
  caption: Record<Locale, string>;
  /** 사진 파일은 /public/gallery 아래에 둡니다. */
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
      ko: "74년을 그 자리에서 견뎌 온 비석. 지금은 태극기와 필리핀 국기가 함께 서 있습니다.",
      en: "The stone that has kept its place for seventy-four years, now flanked by the Korean and Philippine flags.",
    },
    items: [
      {
        src: "/gallery/memorial-today.jpg",
        alt: {
          ko: "태극기와 필리핀 국기 사이에 선 캠프티아노 기념비",
          en: "The Camp Tiano Memorial between the Korean and Philippine flags",
        },
      },
      {
        src: "/gallery/stone-closeup.jpg",
        alt: {
          ko: "비문이 새겨진 캠프티아노 기념비",
          en: "The inscription on the Camp Tiano Memorial",
        },
      },
      {
        src: "/gallery/soldier-flagpole.jpg",
        alt: {
          ko: "깃대 옆 비석과 병사, 1952년",
          en: "The stone beside the flagpole, with a soldier, 1952",
        },
      },
    ],
    placeholders: 3,
  },
  {
    id: "dedication",
    title: {
      ko: "1952년, 비석이 세워지던 날",
      en: "1952 — the day the stone was raised",
    },
    caption: {
      ko: "1952년 9월 18일, 제19대대전투단 전우들이 세운 비석의 제막식. 티아노 가족 명예의 벽 소장.",
      en: "18 September 1952, the unveiling of the stone raised by the men of the 19th BCT. Tiano Family Wall of Honor Collection.",
    },
    items: [
      {
        src: "/gallery/dedication-unveiling.jpg",
        alt: {
          ko: "바르가스 준장이 비석의 덮개를 벗기는 장면",
          en: "Brigadier General Vargas draws back the cover from the stone",
        },
      },
      {
        src: "/gallery/dedication-parade.jpg",
        alt: {
          ko: "제막식을 위해 도열한 부대, 양구",
          en: "The battalion drawn up for the dedication, Yanggu",
        },
      },
      {
        src: "/gallery/dedication-crowd.jpg",
        alt: {
          ko: "제막식에 모인 부대원들",
          en: "The men gathered for the dedication",
        },
      },
      {
        src: "/gallery/officers-at-stone.jpg",
        alt: {
          ko: "비석 양옆에 선 두 장교",
          en: "Two officers flanking the stone",
        },
      },
      {
        src: "/gallery/soldier-at-stone.jpg",
        alt: {
          ko: "비석 옆에 앉은 병사",
          en: "A soldier beside the stone",
        },
      },
      {
        src: "/gallery/soldier-salute.jpg",
        alt: {
          ko: "비석 앞에서 경례하는 병사",
          en: "A soldier saluting before the stone",
        },
      },
      {
        src: "/gallery/dedication-record.jpg",
        alt: {
          ko: "제막식 기록 사진 두 컷",
          en: "Two record photographs of the dedication",
        },
      },
    ],
    placeholders: 4,
  },
  {
    id: "veterans",
    title: { ko: "참전용사들", en: "The men who served" },
    caption: {
      ko: "양구 계곡과 겨울 전선에서. 스무 몇 살의 얼굴들입니다.",
      en: "In Yanggu Valley and at the winter front. These are the faces of young men.",
    },
    items: [
      {
        src: "/gallery/yanggu-valley-two.jpg",
        alt: {
          ko: "양구 계곡에 선 두 병사",
          en: "Two soldiers standing in Yanggu Valley",
        },
      },
      {
        src: "/gallery/yanggu-valley-walking.jpg",
        alt: {
          ko: "양구 계곡을 걸어오는 두 병사",
          en: "Two soldiers walking through Yanggu Valley",
        },
      },
      {
        src: "/gallery/winter-squad-a.jpg",
        alt: {
          ko: "겨울 진지의 부대원들",
          en: "The squad at a winter position",
        },
      },
      {
        src: "/gallery/winter-squad-b.jpg",
        alt: {
          ko: "겨울 진지의 부대원들",
          en: "The squad at a winter position",
        },
      },
      {
        src: "/gallery/winter-two.jpg",
        alt: {
          ko: "겨울 진지의 두 병사",
          en: "Two soldiers at a winter position",
        },
      },
    ],
    placeholders: 5,
  },
];

/** 유튜브 채널이 열리면 영상 ID를 채워 주세요. */
export const galleryVideos: GalleryVideo[] = [];
