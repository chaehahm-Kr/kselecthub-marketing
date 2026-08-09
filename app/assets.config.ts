/**
 * K Select Hub - Central Media Asset Configuration
 * 
 * 나중에 실제 고품질 로고 원본이나 실사 매장 디스플레이 이미지(.png, .svg, .jpg 등)가 준비되면
 * 이 설정 파일의 주소 및 모드 값만 변경하여 전체 사이트에 즉시 반영할 수 있습니다.
 */

export const assetConfig = {
  // 1. 브랜드 로고 설정
  logo: {
    // 'text' 모드 시 단순 텍스트 워드마크 렌더링, 'image' 모드 시 아래 src 경로의 로고 이미지 렌더링
    mode: "text" as "text" | "image",
    text: "K Select Hub",
    src: "/images/logo_official.svg", // 실제 로고가 도착하면 이 파일 경로로 업로드 후 대체
    alt: "K Select Hub Official Logo",
    width: 160,
    height: 40,
  },

  // 2. 샵인숍 디스플레이 피처(Fixture) 이미지 매핑
  displayFixtures: {
    "4ft": {
      src: "/images/display_4ft.png", // 4FT 임시 AI placeholder 실사 매대
      alt: "4FT K-Beauty Starter Display Module",
      width: 600,
      height: 600,
    },
    "8ft": {
      src: "/images/display_8ft.png", // 8FT 임시 AI placeholder 실사 매대
      alt: "8FT K-Beauty Growth Display Modules",
      width: 600,
      height: 600,
    },
    "12ft": {
      src: "/images/display_12ft.jpg", // 12FT 임시 AI placeholder 실사 매대
      alt: "12FT K-Beauty Destination Display Modules",
      width: 800,
      height: 800,
    },
  },

  // 3. 메인 스토리텔링 및 스토어 쇼케이스 배경 이미지
  storeShowcase: {
    heroSection: {
      src: "/images/display_12ft.jpg",
      alt: "Premium K-Beauty Retail Fixture Showcase",
    },
    problemsSection: {
      // 추가적인 AI 생성 매장 파킹 뷰 등 향후 추가용
      src: "/images/display_8ft.png",
      alt: "Independent Retail Store Challenges",
    }
  }
};
