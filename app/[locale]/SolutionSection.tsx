"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// 5 solutions dataset shared within the 3-Zone dynamic Skeleton Panel
const solutionDataList = [
  {
    num: "01",
    title: "CURATE",
    koSub: "검증된 제품 선별",
    enSub: "Curated Product Mix",
    headlineKo: "모든 K-뷰티 제품이\nK SELECT에 포함되지는 않습니다.",
    headlineEn: "We Don't List Everything.\nWe Select What Sells.",
    descKo: "엄격한 기준을 통해 성분 안전성, 안정적 마진, 그리고 미국 시장 적합성을 종합적으로 검증하여 가장 경쟁력 있는 에센셜 라인업을 큐레이션합니다.",
    descEn: "We audit ingredient safety, gross margins, and local U.S. demand to curate only the most competitive beauty essentials for your shelves.",
    image: "/images/solutions/solution_curate_v2.jpg",
    benefits: [
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        title: "QUALITY",
        descKo: "엄격한 품질 및 성분 검증",
        descEn: "Strict ingredient safety audit"
      },
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        ),
        title: "MARGIN",
        descKo: "지속 가능한 높은 리테일 마진",
        descEn: "High, protected retail margins"
      },
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        ),
        title: "U.S. MARKET FIT",
        descKo: "미국 로컬 트렌드 적합성 검토",
        descEn: "Vetted local consumer demand"
      }
    ],
    outcomeTitle: "WHAT THIS MEANS FOR YOUR STORE",
    outcomeDescKo: "검증되지 않은 무분별한 SKU 도입을 억제하고 상권 내 실제 판매 확률이 가장 높은 핵심 아이템만 전략적으로 진열하여, 불필요한 초기 재고 낭비를 차단하고 소매점의 빠른 초기 비용 회수 주기를 만듭니다.",
    outcomeDescEn: "By blocking unverified SKUs and displaying only high-velocity items, you avoid wasting upfront capital on dead stock, securing a much faster payback period.",
    outcomeTags: ["SAFE INGREDIENTS", "RELIABLE RETAIL MARGIN", "FAST INVENTORY TURNOVER"]
  },
  {
    num: "02",
    title: "DIFFERENTIATE",
    koSub: "차별화된 상품 구성",
    enSub: "Differentiated Assortment",
    headlineKo: "단순히 인기 제품의 나열만으로는\n상권 독점을 만들 수 없습니다.",
    headlineEn: "Sheer SKU Quantity\nCannot Protect Your Traffic.",
    descKo: "매장별 상권 특성, 고객 구매 데이터 및 마진율의 최적 균형을 설계하여 주변 Mass 매장들과 완전히 차별화되는 고유의 K-Beauty 코너를 확보해 드립니다.",
    descEn: "We analyze your local shopper profile and design a custom product mix that differentiates your store from mass chains and online discounters.",
    image: "/images/solutions/solution_differentiate_v2.jpg",
    benefits: [
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 3H18L22 9L12 22L2 9Z" />
            <path d="M2 9H22" />
            <path d="M9 3L12 9L15 3" />
          </svg>
        ),
        title: "DIFFERENTIATION",
        descKo: "인근 매장과의 가격 경쟁 차단",
        descEn: "Exclusive store allocations"
      },
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        ),
        title: "PRICE POINT",
        descKo: "가격대와 판매율의 최적 밸런스",
        descEn: "Optimal retail price tiers ($10-$50)"
      },
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
        ),
        title: "STORE FIT",
        descKo: "매장 단골 고객 맞춤형 믹스",
        descEn: "Tailored to your shopper demographic"
      }
    ],
    outcomeTitle: "WHAT THIS MEANS FOR YOUR STORE",
    outcomeDescKo: "고객 특성, 가격대와 마진을 고려한 차별화된 Product Mix로 불필요한 온라인 최저가 및 대형 체인과의 제로섬 가격 경쟁을 차단하고, 오직 소매점 매장만이 독점 소싱할 수 있는 지역 경쟁력을 만듭니다.",
    outcomeDescEn: "Our tailored product mix protects your traffic from zero-sum price wars, building a highly differentiated category that shoppers can only buy at your store.",
    outcomeTags: ["LESS PRICE COMPETITION", "BETTER MARGIN BALANCE", "STRONGER STORE IDENTITY"]
  },
  {
    num: "03",
    title: "BUILD",
    koSub: "숍인숍 카테고리 구축",
    enSub: "Store-in-a-Store",
    headlineKo: "4FT / 8FT / 12FT 모듈러 시스템으로\n매장에 완성형 뷰티 섹션을 구축합니다.",
    headlineEn: "Turnkey Modular System\nBuilt Directly in Your Store.",
    descKo: "단순 선반 진열을 탈피하여, K SELECT HUB 특유의 조명 인프라 프레임과 LED 전용 디바이스가 장착된 완성도 높은 카테고리 존을 매장 내에 직접 구축해 드립니다.",
    descEn: "Move beyond generic shelves. K SELECT HUB installs premium backlit LED fixtures, tester layouts, and brand signage to build a high-converting beauty zone.",
    image: "dynamic",
    benefits: [
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ),
        title: "VISIBILITY",
        descKo: "LED 시그니처 조명 시선 유도",
        descEn: "LED backlit displays that draw eyes"
      },
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="9" width="8" height="8" />
            <rect x="13" y="9" width="8" height="8" />
            <rect x="8" y="3" width="8" height="8" />
          </svg>
        ),
        title: "MODULAR FORMAT",
        descKo: "매장 면적별 유연한 모듈 증설",
        descEn: "Scalable 4FT, 8FT, or 12FT setups"
      },
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        ),
        title: "INSTALLATION",
        descKo: "현장 맞춤형 프레임 셋업 완료",
        descEn: "Complete custom planogram installation"
      }
    ],
    outcomeTitle: "WHAT THIS MEANS FOR YOUR STORE",
    outcomeDescKo: "낙후된 일반 단일 매대를 고급 숍인숍(Shop-in-Shop) 프리미엄 K-뷰티 체험존 형태로 탈바꿈시켜, 매장 내 체류 시간을 늘리고 매장 전체의 고급스러운 시각적 이미지와 평당 매출 효율성을 비약적으로 높입니다.",
    outcomeDescEn: "Upgrade generic retail space into a luxury store-in-a-store K-Beauty zone. This increases shopper dwell time, elevates your brand image, and boosts sales per square foot.",
    outcomeTags: ["LED ATTRACT POWER", "SCALABLE MODULAR FIT", "FAST PROFITABLE SETUP"]
  },
  {
    num: "04",
    title: "SUPPORT",
    koSub: "판매 준비 지원",
    enSub: "Retail-Ready Support",
    headlineKo: "제품을 납품하는 것만으로는\n실제 판매가 일어나지 않습니다.",
    headlineEn: "Shipping Products is Easy.\nGenerating Sales Requires a System.",
    descKo: "매장 스태프 가이드 교육, 고객용 모바일 제품 QR 정보 매핑, 그리고 현장 Merchandising VMD 진열 지원 등 실질적인 매출 발생을 위해 K SELECT의 마케팅 파워를 매장에 지원합니다.",
    descEn: "We equip your store with staff education guides, mobile product QR codes for customer self-discovery, and detailed planograms to drive immediate sell-through.",
    image: "/images/solutions/solution_support_v2.jpg",
    benefits: [
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="15" y="15" width="2.5" height="2.5" />
          </svg>
        ),
        title: "QR GUIDE",
        descKo: "QR 스캔을 통한 성분 상세 정보 제공",
        descEn: "Scan to view localized product benefits"
      },
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L22 8L12 13L2 8Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 10V16C6 18 9 19 12 19C15 19 18 18 18 16V10" />
          </svg>
        ),
        title: "TRAINING",
        descKo: "스태프용 K-뷰티 판매 핵심 교육",
        descEn: "Bilingual staff training playbooks"
      },
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="4" r="1.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.5 L3 13H21Z" />
          </svg>
        ),
        title: "DISPLAY FIT",
        descKo: "초기 상품 진열 및 테스터 배치 지원",
        descEn: "Turnkey visual merchandising setup"
      }
    ],
    outcomeTitle: "READY TO SELL, NOT JUST READY TO DISPLAY",
    outcomeDescKo: "QR Product Guide, Staff Training, Display Support를 통해 상품이 단순히 매대 위 먼지만 쌓이는 일반 진열에 그치지 않고, 매장 스태프와 소비자의 실시간 정보 소통을 통해 실질적인 단골 매출(Sell-Through)로 연결되도록 지원합니다.",
    outcomeDescEn: "With QR guides, training tools, and setup support, we ensure your products don't just sit on shelves collecting dust. We empower your staff to consult shoppers and drive sell-through.",
    outcomeTags: ["BETTER PRODUCT KNOWLEDGE", "EASIER CUSTOMER GUIDANCE", "STRONGER SELL-THROUGH"]
  },
  {
    num: "05",
    title: "OPTIMIZE",
    koSub: "판매 데이터 기반 최적화",
    enSub: "Inventory & Growth Optimization",
    headlineKo: "판매 이후에도 재고 흐름을\n밀착 모니터링합니다.",
    headlineEn: "Continuous Optimization\nBased on Real Store Sales.",
    descKo: "실제 매장에서 수집된 주간 Sell-through 회전율 데이터를 바탕으로, 누적 판매 성과 분석과 자동화된 재주문(Reorder) 제안을 통해 악성 재고 없는 건전한 매출 순환을 책임집니다.",
    descEn: "We track weekly sell-through rates at your store, identifying fast sellers to generate automated reorder suggestions and swapping slow sellers to protect your cash flow.",
    image: "optimize_visual",
    benefits: [
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        ),
        title: "TURNOVER SPEED",
        descKo: "데이터 분석을 통한 회전율 가속",
        descEn: "Data-driven inventory turns"
      },
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="21" y1="12" x2="3" y2="12" />
          </svg>
        ),
        title: "AUTO REORDER",
        descKo: "품절 방지 자동 재오더 주문 루프",
        descEn: "Stockout prevention auto-reorder loop"
      },
      {
        icon: (
          <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        ),
        title: "DEADSTOCK CONTROL",
        descKo: "비정체 SKU 조기 식별 및 제어",
        descEn: "Early slow-seller identification"
      }
    ],
    outcomeTitle: "WHAT THIS MEANS FOR YOUR STORE",
    outcomeDescKo: "실시간 주간 판매 실적을 토대로 안 팔리는 제품(Slow Seller)을 적기에 감지하여 베스트셀러 SKU로 조기 대환하며, 매대 면적당 회전 속도를 극대화하여 악성 재고 리스크가 없는 이상적인 현금 유동성을 보장합니다.",
    outcomeDescEn: "By monitoring real-time store sales, we swap slow-moving SKUs for proven bestsellers, maximizing turnover speed and keeping your capital liquid and risk-free.",
    outcomeTags: ["ZERO DEAD STOCK RISK", "INTELLIGENT AUTO REORDER", "MAXIMIZED CASH FLOW"]
  }
];

export default function SolutionSection({ locale }: { locale?: string }) {
  const [activeTab, setActiveTab] = useState(0); // 0 to 4 (CURATE to OPTIMIZE)
  const [buildSize, setBuildSize] = useState<"4ft" | "8ft" | "12ft">("8ft"); // Default is 8FT
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);
  const isKo = locale === "ko";

  // 4.5s Auto-rolling sequence
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || isHovered) {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      return;
    }

    autoPlayTimer.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 5);
    }, 4500);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isHovered]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handlePrevTab = () => {
    setActiveTab((prev) => (prev - 1 + 5) % 5);
  };

  const handleNextTab = () => {
    setActiveTab((prev) => (prev + 1) % 5);
  };

  const getBuildImage = () => {
    if (buildSize === "4ft") return "/images/solutions/build.jpg";
    if (buildSize === "8ft") return "/images/solutions/build_8ft.jpg";
    return "/images/solutions/build_12ft.jpg";
  };

  const activeData = solutionDataList[activeTab];

  return (
    <section
      id="solution"
      className="bg-[#141414] border-b border-[#2a2a2a] relative overflow-hidden font-medium"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background radial soft light decor */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#ff2b75]/2 filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#22d3ee]/2 filter blur-[120px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px] text-left relative z-10">
        <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-12 lg:gap-14 items-stretch">
          
          {/* ================= LEFT SIDE PANEL — ORBIT CONTROL & MENU ================= */}
          <div className="flex flex-col justify-between items-start self-stretch">
            
            {/* Header copy */}
            <div className="mb-8">
              <span className="text-xs font-semibold text-accent tracking-[0.04em]">
                03 — K SELECT INTEGRATED SOLUTION
              </span>
              <h2 className="font-display text-3xl sm:text-[35px] font-bold leading-[1.28] tracking-tight text-white m-0 mt-4 keep-all select-none">
                {isKo ? (
                  <>우리가 가진 5가지 솔루션으로<br />리테일러의 문제를 해결합니다.</>
                ) : (
                  <>Solving Retailer Challenges<br />with 5 Core Solutions</>
                )}
              </h2>
              <p className="text-[14.5px] text-[#ADADAD] leading-relaxed max-w-[460px] mt-4 mb-2 font-medium">
                {isKo 
                  ? "K Select는 제품 선정부터 디스플레이 · 운영 · 재고 최적화까지 하나로 연결된 시스템으로 리테일 성장을 지원합니다."
                  : "K SELECT HUB delivers category growth through a unified system covering curation, merchandising, store operations, and inventory optimization."
                }
              </p>
            </div>

            {/* Mobile/Tablet Horizontal Selector Slider */}
            <div className="lg:hidden w-full overflow-x-auto pb-4 mb-2 flex gap-2 scrollbar-none select-none">
              {[
                { key: "CURATE", num: "01" },
                { key: "DIFFERENTIATE", num: "02" },
                { key: "BUILD", num: "03" },
                { key: "SUPPORT", num: "04" },
                { key: "OPTIMIZE", num: "05" }
              ].map((item, index) => (
                <button
                  key={item.key}
                  onClick={() => handleTabClick(index)}
                  className={`px-4.5 py-3 rounded-[12px] text-[11px] font-black tracking-wider uppercase whitespace-nowrap transition-all focus:outline-none ${
                    activeTab === index
                      ? "bg-[#ff2b75] text-white border border-[#ff2b75] shadow-[0_0_12px_rgba(255,43,117,0.4)]"
                      : "bg-[#111] border border-white/10 text-[#9A9A9A] hover:border-white/20"
                  }`}
                >
                  {item.num} {item.key}
                </button>
              ))}
            </div>

            {/* Desktop Orbit Wheel (Hidden on Mobile/Tablet) */}
            <div className="hidden lg:block relative w-[440px] h-[440px] mx-auto -my-4 select-none">
              {/* Dashed lines representing connections */}
              <div style={{ position: "absolute", left: "220px", top: "220px", width: "36px", height: 0, borderTop: "1.5px dotted rgba(255,255,255,0.3)", transform: "rotate(-90deg)", transformOrigin: "0 0" }} />
              <div style={{ position: "absolute", left: "220px", top: "220px", width: "36px", height: 0, borderTop: "1.5px dotted rgba(255,255,255,0.3)", transform: "rotate(-18deg)", transformOrigin: "0 0" }} />
              <div style={{ position: "absolute", left: "220px", top: "220px", width: "36px", height: 0, borderTop: "1.5px dotted rgba(255,255,255,0.3)", transform: "rotate(54deg)", transformOrigin: "0 0" }} />
              <div style={{ position: "absolute", left: "220px", top: "220px", width: "36px", height: 0, borderTop: "1.5px dotted rgba(255,255,255,0.3)", transform: "rotate(126deg)", transformOrigin: "0 0" }} />
              <div style={{ position: "absolute", left: "220px", top: "220px", width: "36px", height: 0, borderTop: "1.5px dotted rgba(255,255,255,0.3)", transform: "rotate(198deg)", transformOrigin: "0 0" }} />

              {/* Central Hub Core */}
              <div style={{ position: "absolute", left: "128px", top: "128px", width: "184px", height: "184px", borderRadius: "50%", border: "1.5px solid #ff2b75", background: "#0c0c0c", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <path d="M12 3C15 6 15 18 12 21C9 18 9 6 12 3Z" />
                </svg>
                <div style={{ color: "#FAFAFA", fontSize: "17px", fontWeight: 800 }}>K SELECT</div>
                <div style={{ color: "#8A8A8A", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em" }}>SOLUTION</div>
              </div>

              {/* Node 01 - CURATE */}
              <button
                onClick={() => handleTabClick(0)}
                className={`ks-node ${activeTab === 0 ? "active" : ""}`}
                style={{ position: "absolute", left: "178px", top: "8px", border: "none", outline: "none", padding: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.2" y2="16.2" />
                </svg>
                <span className="label">01 CURATE</span>
              </button>

              {/* Node 02 - DIFFERENTIATE */}
              <button
                onClick={() => handleTabClick(1)}
                className={`ks-node ${activeTab === 1 ? "active" : ""}`}
                style={{ position: "absolute", left: "354px", top: "134px", border: "none", outline: "none", padding: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="label">02 DIFFERENTIATE</span>
              </button>

              {/* Node 03 - BUILD */}
              <button
                onClick={() => handleTabClick(2)}
                className={`ks-node ${activeTab === 2 ? "active" : ""}`}
                style={{ position: "absolute", left: "288px", top: "338px", border: "none", outline: "none", padding: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="label">03 BUILD</span>
              </button>

              {/* Node 04 - SUPPORT */}
              <button
                onClick={() => handleTabClick(3)}
                className={`ks-node ${activeTab === 3 ? "active" : ""}`}
                style={{ position: "absolute", left: "70px", top: "338px", border: "none", outline: "none", padding: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
                <span className="label">04 SUPPORT</span>
              </button>

              {/* Node 05 - OPTIMIZE */}
              <button
                onClick={() => handleTabClick(4)}
                className={`ks-node ${activeTab === 4 ? "active" : ""}`}
                style={{ position: "absolute", left: "4px", top: "134px", border: "none", outline: "none", padding: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                <span className="label">05 OPTIMIZE</span>
              </button>
            </div>

            {/* Micro Navigation Arrows */}
            <div className="flex items-center gap-3.5 mt-8 select-none">
              <button
                onClick={handlePrevTab}
                className="w-11 h-11 rounded-full border border-white/10 hover:border-white/20 bg-[#0c0c0c] hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all focus:outline-none"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-[12.5px] font-black text-white/50 tracking-wider font-display">
                0{activeTab + 1} <span className="text-white/20">/</span> 05
              </span>
              <button
                onClick={handleNextTab}
                className="w-11 h-11 rounded-full border border-white/10 hover:border-white/20 bg-[#0c0c0c] hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all focus:outline-none"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>

          {/* ================= RIGHT SIDE PANEL — DYNAMIC 3-ZONE SKELETON ================= */}
          <div 
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "20px", 
              padding: "44px 48px", 
              background: "#0c0c0c", 
            }}
            className="w-full h-full min-h-[770px] relative self-stretch overflow-hidden flex flex-col justify-between gap-6"
          >
            {/* Keyframe animation injected via style block */}
            <style>{`
              @keyframes solutionFade {
                from { opacity: 0; transform: translateY(6px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-solution-fade {
                animation: solutionFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            `}</style>

            {/* Active Content Wrapper mapped by activeTab */}
            <div 
              key={activeTab} 
              className="w-full h-full flex flex-col justify-between flex-1 gap-6 animate-solution-fade"
            >
              {/* ================= ZONE 1 — SOLUTION STORY / VISUAL (Top 55-60%) ================= */}
              <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center flex-1 min-h-[350px]">
                <div className="flex flex-col justify-center h-full text-left">
                  <span className="text-[14px] font-black text-[#ff2b75] tracking-widest uppercase block mb-1">
                    {activeData.num}
                  </span>
                  <h3 className="font-display text-white text-[38px] font-extrabold tracking-tight leading-none mb-3">
                    {activeData.title}
                  </h3>
                  <div className="text-[13.5px] text-white/90 font-semibold mb-4.5 flex items-center gap-2">
                    <span className="text-[#ff2b75]">{isKo ? activeData.koSub : activeData.enSub}</span>
                  </div>
                  <div className="w-12 h-0.5 bg-[#ff2b75] mb-4.5" />
                  <h4 className="text-[19px] sm:text-[21px] font-black text-white leading-snug tracking-tight mb-3.5 whitespace-pre-line">
                    {isKo ? activeData.headlineKo : activeData.headlineEn}
                  </h4>
                  <p className="text-[13.5px] text-[#ADADAD] leading-relaxed font-semibold">
                    {isKo ? activeData.descKo : activeData.descEn}
                  </p>

                  {/* Modular build size buttons (shown only on BUILD tab 02) */}
                  {activeTab === 2 && (
                    <div className="grid grid-cols-3 gap-[10px] mt-4.5 max-w-[340px] select-none">
                      {(["4ft", "8ft", "12ft"] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setBuildSize(size)}
                          className={`ks-ft cursor-pointer ${buildSize === size ? "active" : ""}`}
                          style={{ background: "transparent", outline: "none" }}
                        >
                          <div className="num text-[13.5px] font-black">{size.toUpperCase()}</div>
                          <div style={{ color: "#9A9A9A", fontSize: "9.5px" }}>
                            {size === "4ft" ? "Starter" : size === "8ft" ? "Growth" : "Destination"}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Visual Container */}
                <div className="w-full flex items-center justify-center">
                  {activeData.image === "optimize_visual" ? (
                    <div className="w-full h-[260px] md:h-[300px] bg-[#111]/70 border border-white/10 rounded-[14px] p-5 flex flex-col justify-between shadow-lg select-none">
                      {/* WEEKLY SELL-THROUGH Chart widget */}
                      <div className="bg-[#080808]/90 border border-white/5 rounded-[8px] p-3">
                        <div className="text-[#ff2b75] text-[9.5px] font-black tracking-wider uppercase font-display mb-2">WEEKLY SELL-THROUGH</div>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "42px" }}>
                          <div style={{ width: "100%", background: "#ff2b75", borderRadius: "2px 2px 0 0", height: "100%" }} />
                          <div style={{ width: "100%", background: "#ff2b75", borderRadius: "2px 2px 0 0", height: "85%" }} />
                          <div style={{ width: "100%", background: "#ff2b75", borderRadius: "2px 2px 0 0", height: "72%" }} />
                          <div style={{ width: "100%", background: "#ff2b75", borderRadius: "2px 2px 0 0", height: "55%" }} />
                          <div style={{ width: "100%", background: "#ff2b75", borderRadius: "2px 2px 0 0", height: "35%" }} />
                        </div>
                      </div>

                      {/* REORDER SUGGESTION widget */}
                      <div className="flex items-center justify-between bg-[#080808]/90 border border-white/5 rounded-[8px] p-3">
                        <div>
                          <div className="text-[#ff2b75] text-[9.5px] font-black tracking-wider uppercase font-display mb-0.5">REORDER SUGGESTION</div>
                          <div className="text-white text-[11px] font-bold">SKU-1023 (Skincare)</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white text-[15px] font-black">240<span className="text-[9.5px] text-[#9A9A9A] font-bold"> EA</span></div>
                          <span className="text-[7.5px] text-[#ff2b75] font-black tracking-widest uppercase">AUTO RUNNING</span>
                        </div>
                      </div>

                      {/* MARGIN PERFORMANCE widget */}
                      <div className="flex items-center justify-between bg-[#080808]/90 border border-white/5 rounded-[8px] p-3">
                        <div>
                          <div className="text-[#ff2b75] text-[9.5px] font-black tracking-wider uppercase font-display mb-0.5">MARGIN PROFILE</div>
                          <div className="text-white text-[11px] font-bold">Category Average</div>
                        </div>
                        <div className="text-[#ff2b75] text-[17px] font-black">52.4%</div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-[260px] md:h-[300px] rounded-[14px] overflow-hidden border border-white/10 shadow-lg">
                      <Image
                        src={activeData.image === "dynamic" ? getBuildImage() : activeData.image}
                        alt={`${activeData.title} visual illustration`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 320px"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* ================= ZONE 2 — THREE KEY BENEFITS (Middle 18-20%) ================= */}
              <div className="border-t border-white/10 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
                  {activeData.benefits.map((b, idx) => (
                    <div
                      key={b.title}
                      className={`flex flex-col gap-1.5 ${
                        idx === 0
                          ? "md:pr-4 md:border-r border-white/10"
                          : idx === 1
                          ? "md:px-5 md:border-r border-white/10"
                          : "md:pl-5"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {b.icon}
                        <span className="text-white text-[12.5px] font-black tracking-wider uppercase font-display">
                          {b.title}
                        </span>
                      </div>
                      <span className="text-[#A0A0A0] text-[12.5px] font-bold">
                        {isKo ? b.descKo : b.descEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ================= ZONE 3 — STORE OUTCOME (Bottom 20-25%) ================= */}
              <div className="border-t border-white/10 pt-5 flex flex-col gap-3.5">
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[10px] font-black text-[#ff2b75] tracking-widest uppercase font-display block select-none">
                    {activeData.outcomeTitle}
                  </span>
                  <p className="text-[13.5px] text-[#E0E0E0] leading-relaxed font-bold">
                    {isKo ? activeData.outcomeDescKo : activeData.outcomeDescEn}
                  </p>
                </div>
                {/* Horizontal outcome tags */}
                <div className="flex flex-wrap gap-2.5 mt-1 select-none">
                  {activeData.outcomeTags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-white/5 border border-white/10 text-[#ff2b75] text-[9.5px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm hover:border-[#ff2b75]/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
