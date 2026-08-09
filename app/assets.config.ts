/**
 * K Select Hub - Central Media Asset Configuration
 * 
 * Claude Design(FINAL APPROVED MASTER DESIGN)에서 참조하는 CDN 경로 및 로컬 자산을 매핑하는 Asset Map입니다.
 * 향후 실제 로컬 파일이나 다른 CDN 자산으로 변경 시, 본 파일의 설정만 교체하면 1초 만에 전체 반영됩니다.
 */

export const assetConfig = {
  // 1. 브랜드 로고 설정 - 공식 고화질 이미지 로고 연동
  logo: {
    mode: "image" as "text" | "image",
    text: "K Select Hub",
    src: "/images/logo_official.jpg",
    alt: "K Select Hub Official Brand Logo",
    width: 202,
    height: 48,
  },

  // 2. SVG 아이콘 리스트 (assets/icons/에 수록된 파일들 매핑)
  icons: {
    arrowUp: "/images/icons/arrow-up.svg",
    circleCheck: "/images/icons/circle-check.svg",
    circleAlert: "/images/icons/circle-alert.svg",
    circleX: "/images/icons/circle-x.svg",
    info: "/images/icons/info.svg",
    placeholder: "/images/icons/placeholder.svg",
    plus: "/images/icons/plus.svg",
    search: "/images/icons/search.svg",
    user: "/images/icons/user.svg",
    x: "/images/icons/x.svg",
    alertTriangle: "/images/icons/alert-triangle-filled.svg"
  },

  // 3. 숍인숍 디스플레이 피처(Fixture) 이미지 매핑 (Gamma CDN & Local fallback 혼용)
  displayFixtures: {
    "4ft": {
      src: "https://cdn.gamma.app/mhos87u9pgmkdd1/design-anything/zkzoZLaTfn9zRmPaVoEcp/q1I7U3FlbNND-L548rG-6.png",
      alt: "4FT K-Beauty Starter Display Module",
      width: 600,
      height: 600,
    },
    "8ft": {
      src: "https://cdn.gamma.app/mhos87u9pgmkdd1/design-anything/6RdIvMeLC2sKOu7FvMtAE/kgJpEtE8SUgEbWtq76EjR.png",
      alt: "8FT K-Beauty Growth Display Modules",
      width: 600,
      height: 600,
    },
    "12ft": {
      src: "https://cdn.gamma.app/mhos87u9pgmkdd1/design-anything/h0FZ02ZsxYpjFOuVkaNOF/GKW45iQGxMxxAw-BEGvJI.png",
      alt: "12FT K-Beauty Destination Display Modules",
      width: 800,
      height: 800,
    },
  },

  // 4. 메인 스토리텔링 및 스토어 쇼케이스 배경 이미지 (Gamma CDN 주소 매핑)
  storeShowcase: {
    heroSection: {
      src: "https://cdn.gamma.app/mhos87u9pgmkdd1/design-anything/oACXIbSpXtZmYaBCnS61Y/ScvgWqXOCaS5HCjAwIbIn.png",
      alt: "Premium K-Beauty Retail Fixture Showcase (Beauty Supply Store)",
    },
    curationSection: {
      src: "https://cdn.gamma.app/mhos87u9pgmkdd1/design-anything/Fr8o1QW9jAn6NyePyJQtb/EGxjdUzyviv69zCQQwy0S.png",
      alt: "Curated K-Beauty Products Flatlay",
    },
    partnershipSection: {
      src: "https://cdn.gamma.app/mhos87u9pgmkdd1/design-anything/Mn3YlE51J87jCYLcKpsaE/RlRI4MN-4e4YbRLihiEoz.png",
      alt: "K Select Partnership Retailer or Representative Team",
    }
  }
};
