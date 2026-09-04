/**
 * public 아래 파일의 주소를 만들어 줍니다.
 *
 * GitHub 기본 주소로 열 때는 /Camptiano-Home-Page 가 앞에 붙어야 하는데,
 * 최적화를 끈 이미지에는 Next.js 가 이 경로를 자동으로 붙여 주지 않습니다.
 * 그래서 사진 경로는 반드시 이 함수를 거치게 합니다.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  if (!path) return path;
  return path.startsWith("/") ? `${BASE}${path}` : path;
}
