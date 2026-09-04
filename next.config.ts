import type { NextConfig } from "next";

/**
 * GitHub Pages 배포용 설정.
 *
 * 서버 없이 동작하는 정적 사이트로 내보냅니다. 별도 호스팅 비용이 들지 않고,
 * 나중에 camptiano.kr 같은 도메인을 사도 그대로 연결할 수 있습니다.
 *
 * BASE_PATH
 *   - GitHub 기본 주소(intoedu.github.io/Camptiano-Home-Page)로 열 때
 *     → "/Camptiano-Home-Page"
 *   - 직접 구매한 도메인(www.camptiano.kr)으로 열 때
 *     → 빈 값
 *   배포 워크플로(.github/workflows/deploy.yml)에서 자동으로 넣어 줍니다.
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // 각 페이지를 폴더+index.html 로 내보내 GitHub Pages 에서 안정적으로 열립니다.
  trailingSlash: true,
  basePath,
  images: {
    // 정적 사이트에는 이미지 변환 서버가 없습니다.
    unoptimized: true,
  },
  // unoptimized 이미지는 basePath 가 자동으로 붙지 않아, 직접 붙일 수 있게 노출합니다.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
