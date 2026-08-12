"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function SolutionSection() {
  const [activeTab, setActiveTab] = useState(0); // 0 to 4 (CURATE to OPTIMIZE)
  const [buildSize, setBuildSize] = useState<"4ft" | "8ft" | "12ft">("8ft"); // Default is 8FT
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  const getBuildImage = () => {
    if (buildSize === "4ft") return "/images/solutions/4F_A.jpg";
    if (buildSize === "12ft") return "/images/solutions/12F_AAA.jpg";
    return "/images/solutions/8F_AA.jpg";
  };

  return (
    <section
      id="solution"
      className="w-full bg-[#141414] select-none text-left font-sans border-y border-[#2a2a2a]"
      style={{ fontFamily: "'Pretendard', -apple-system, sans-serif" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer container aligning exactly with outer margin rhythms (01, 02, 04 section matching) */}
      <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px]">

        {/* Main Grid: Left Column (38%), Right Column (62%) on Desktop, height matching with items-stretch */}
        <div className="grid lg:grid-cols-[minmax(320px,38%)_1fr] gap-[56px] items-stretch">

          {/* ================= LEFT COLUMN: Intro + Diagram ================= */}
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-black text-[#ff2b75] tracking-[0.08em] uppercase block mb-3">
                03 — K SELECT SOLUTION
              </span>
              <h2 className="font-display text-3xl sm:text-[35px] font-bold leading-[1.28] tracking-tight text-white m-0">
                우리가 가진 5가지 솔루션으로<br />리테일러의 문제를 해결합니다.
              </h2>
              <p className="text-[14.5px] text-[#ADADAD] leading-relaxed max-w-[460px] mt-4 mb-2 font-medium">
                K Select는 제품 선정부터 디스플레이 · 운영 · 재고 최적화까지 하나로 연결된 시스템으로 리테일 성장을 지원합니다.
              </p>
            </div>

            {/* Mobile/Tablet Horizontal Selector Slider (lg:hidden fallback to prevent circle breaking) */}
            <div className="lg:hidden w-full overflow-x-auto pb-4 mb-2 flex gap-2 scrollbar-none">
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
            <div className="hidden lg:block relative w-[440px] h-[440px] mx-auto -my-4">
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
                <div className="num">01</div>
                <div className="lbl">CURATE</div>
              </button>

              {/* Node 02 - DIFFERENTIATE */}
              <button
                onClick={() => handleTabClick(1)}
                className={`ks-node ${activeTab === 1 ? "active" : ""}`}
                style={{ position: "absolute", left: "339.7px", top: "125.5px", border: "none", outline: "none", padding: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 17 9 11 13 15 21 7" />
                  <polyline points="15 7 21 7 21 13" />
                </svg>
                <div className="num">02</div>
                <div className="lbl">DIFFERENTIATE</div>
              </button>

              {/* Node 03 - BUILD */}
              <button
                onClick={() => handleTabClick(2)}
                className={`ks-node ${activeTab === 2 ? "active" : ""}`}
                style={{ position: "absolute", left: "278px", top: "315.5px", border: "none", outline: "none", padding: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9L4 4H20L21 9" />
                  <path d="M4 9V20H20V9" />
                  <line x1="9" y1="20" x2="9" y2="13" />
                  <line x1="15" y1="20" x2="15" y2="13" />
                </svg>
                <div className="num">03</div>
                <div className="lbl">BUILD</div>
              </button>

              {/* Node 04 - SUPPORT */}
              <button
                onClick={() => handleTabClick(3)}
                className={`ks-node ${activeTab === 3 ? "active" : ""}`}
                style={{ position: "absolute", left: "78px", top: "315.5px", border: "none", outline: "none", padding: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="7" r="4" />
                  <path d="M17 11a4 4 0 100-8" />
                  <path d="M1 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                </svg>
                <div className="num">04</div>
                <div className="lbl">SUPPORT</div>
              </button>

              {/* Node 05 - OPTIMIZE */}
              <button
                onClick={() => handleTabClick(4)}
                className={`ks-node ${activeTab === 4 ? "active" : ""}`}
                style={{ position: "absolute", left: "16.3px", top: "125.5px", border: "none", outline: "none", padding: 0 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="12" height="17" rx="2" />
                  <rect x="9" y="2" width="6" height="4" rx="1" />
                  <line x1="9" y1="10" x2="15" y2="10" />
                  <line x1="9" y1="14" x2="15" y2="14" />
                </svg>
                <div className="num">05</div>
                <div className="lbl">OPTIMIZE</div>
              </button>
            </div>

            {/* Wheel Bottom Navigator (Desktop lg:flex) */}
            <div className="hidden lg:flex items-center justify-center gap-[10px] text-[#7A7A7A] text-[13px] mt-[8px]">
              <span 
                id="ks-prev" 
                onClick={handlePrevTab}
                onKeyDown={(e) => handleKeyDown(e, handlePrevTab)}
                className="cursor-pointer hover:text-white px-1.5 focus:outline-none"
                tabIndex={0}
                role="button"
                aria-label="Previous Solution"
              >
                ←
              </span>
              <span>노드를 클릭하여 솔루션을 확인하세요.</span>
              <span 
                id="ks-next" 
                onClick={handleNextTab}
                onKeyDown={(e) => handleKeyDown(e, handleNextTab)}
                className="cursor-pointer hover:text-white px-1.5 focus:outline-none"
                tabIndex={0}
                role="button"
                aria-label="Next Solution"
              >
                →
              </span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Fixed Height Premium Solution Panel Card ================= */}
          <div 
            style={{ 
              border: "1.5px solid #ff2b75", 
              borderRadius: "20px", 
              padding: "44px 48px", 
              background: "#0c0c0c", 
              display: "flex", 
              flexDirection: "column"
            }}
            className="w-full h-full min-h-[640px] justify-between relative self-stretch overflow-hidden"
          >

            {/* 01 CURATE PANEL */}
            <div className={`ks-panel ${activeTab === 0 ? "active" : ""} h-full flex flex-col justify-between flex-1`}>
              <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-[36px] flex-1 items-center">
                <div className="flex flex-col justify-center h-full">
                  <span className="text-[14px] font-black text-[#ff2b75] tracking-widest uppercase block mb-1">01</span>
                  <h3 className="font-display text-white text-[42px] font-extrabold tracking-tight leading-none mb-3">
                    CURATE
                  </h3>
                  <div className="text-[14px] text-white/90 font-semibold mb-5 flex items-center gap-2">
                    <span className="text-[#ff2b75]">검증된 제품 선별</span>
                    <span className="text-white/20">|</span>
                    <span className="text-white/60">Curated Product Mix</span>
                  </div>
                  <div className="w-12 h-0.5 bg-[#ff2b75] mb-5" />
                  <h4 className="text-[18px] font-bold text-white leading-snug mb-3">
                    모든 K-뷰티 제품이<br />K SELECT에 포함되지는 않습니다.
                  </h4>
                  <p className="text-[13.5px] text-[#ADADAD] leading-relaxed font-medium">
                    엄격한 기준을 통해 성분 안전성, 안정적 마진, 그리고 미국 시장 적합성을 종합적으로 검증하여 가장 경쟁력 있는 에센셜 라인업을 큐레이션합니다.
                  </p>
                </div>
                <div className="relative w-full h-[260px] md:h-[290px] rounded-[14px] overflow-hidden my-auto border border-white/10 shadow-lg">
                  <Image 
                    src="/images/solutions/solution_curate_v2.jpg" 
                    alt="Selected premium product mix lineup with clean blank labels" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                </div>
              </div>
              
              {/* Bottom anchor 3 points */}
              <div className="border-t border-white/10 pt-5 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-0">
                  <div className="flex flex-col gap-1.5 md:pr-4 md:border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2 L20 5 V11 C20 16 16.5 20 12 22 C7.5 20 4 16 4 11 V5 Z" />
                        <path d="M8.5 12 L11 14.5 L16 9" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">QUALITY</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">엄격한 품질 및 성분 검증</span>
                  </div>
                  <div className="flex flex-col gap-1.5 md:px-6 md:border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 17 9 11 13 15 21 7" />
                        <polyline points="15 7 21 7 21 13" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">MARGIN</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">지속 가능한 높은 리테일 마진</span>
                  </div>
                  <div className="flex flex-col gap-1.5 md:pl-6">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <path d="M12 3C15 6 15 18 12 21C9 18 9 6 12 3Z" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">U.S. MARKET FIT</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">미국 로컬 트렌드 적합성 검토</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 02 DIFFERENTIATE PANEL */}
            <div className={`ks-panel ${activeTab === 1 ? "active" : ""} h-full flex flex-col justify-between flex-1`}>
              <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-[36px] flex-1 items-center">
                <div className="flex flex-col justify-center h-full">
                  <span className="text-[14px] font-black text-[#ff2b75] tracking-widest uppercase block mb-1">02</span>
                  <h3 className="font-display text-white text-[42px] font-extrabold tracking-tight leading-none mb-3">
                    DIFFERENTIATE
                  </h3>
                  <div className="text-[14px] text-white/90 font-semibold mb-5 flex items-center gap-2">
                    <span className="text-[#ff2b75]">차별화된 상품 구성</span>
                    <span className="text-white/20">|</span>
                    <span className="text-white/60">Differentiated Assortment</span>
                  </div>
                  <div className="w-12 h-0.5 bg-[#ff2b75] mb-5" />
                  <h4 className="text-[18px] font-bold text-white leading-snug mb-3">
                    단순히 인기 제품의 나열만으로는<br />상권 독점을 만들 수 없습니다.
                  </h4>
                  <p className="text-[13.5px] text-[#ADADAD] leading-relaxed font-medium">
                    매장별 상권 특성, 고객 구매 데이터 및 마진율의 최적 균형을 설계하여 주변 Mass 매장들과 완전히 차별화되는 고유의 K-Beauty 코너를 확보해 드립니다.
                  </p>
                </div>
                <div className="relative w-full h-[260px] md:h-[290px] rounded-[14px] overflow-hidden my-auto border border-white/10 shadow-lg">
                  <Image 
                    src="/images/solutions/solution_differentiate_v2.jpg" 
                    alt="Premium 3D store assortment matrix comparison graphics with pink glow" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                </div>
              </div>
              
              {/* Bottom anchor 3 points */}
              <div className="border-t border-white/10 pt-5 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-0">
                  <div className="flex flex-col gap-1.5 md:pr-4 md:border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3H18L22 9L12 22L2 9Z" />
                        <path d="M2 9H22" />
                        <path d="M9 3L12 9L15 3" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">DIFFERENTIATION</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">인근 매장과의 가격 경쟁 차단</span>
                  </div>
                  <div className="flex flex-col gap-1.5 md:px-6 md:border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="3" x2="12" y2="21" />
                        <line x1="5" y1="7" x2="19" y2="7" />
                        <path d="M4 7 Q4 12 8 12 Q12 12 12 7" />
                        <path d="M12 7 Q12 12 16 12 Q20 12 20 7" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">PRICE POINT</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">가격대와 판매율의 최적 밸런스</span>
                  </div>
                  <div className="flex flex-col gap-1.5 md:pl-6">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9L4 4H20L21 9" />
                        <path d="M4 9V20H20V9" />
                        <line x1="9" y1="20" x2="9" y2="13" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">STORE FIT</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">매장 단골 고객 맞춤형 믹스</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 03 BUILD PANEL */}
            <div className={`ks-panel ${activeTab === 2 ? "active" : ""} h-full flex flex-col justify-between flex-1`}>
              <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-[36px] flex-1 items-center">
                <div className="flex flex-col justify-center h-full">
                  <span className="text-[14px] font-black text-[#ff2b75] tracking-widest uppercase block mb-1">03</span>
                  <h3 className="font-display text-white text-[42px] font-extrabold tracking-tight leading-none mb-3">
                    BUILD
                  </h3>
                  <div className="text-[14px] text-white/90 font-semibold mb-5 flex items-center gap-2">
                    <span className="text-[#ff2b75]">숍인숍 카테고리 구축</span>
                    <span className="text-white/20">|</span>
                    <span className="text-white/60">Store-in-a-Store</span>
                  </div>
                  <div className="w-12 h-0.5 bg-[#ff2b75] mb-5" />
                  <h4 className="text-[18px] font-bold text-white leading-snug mb-3">
                    4FT / 8FT / 12FT 모듈러 시스템으로<br />매장에 완성형 뷰티 섹션을 짓습니다.
                  </h4>
                  <p className="text-[13.5px] text-[#ADADAD] leading-relaxed font-medium">
                    단순 선반 진열을 탈피하여, K SELECT HUB 특유의 조명 인프라 프레임과 LED 전용 디바이스가 장착된 완성도 높은 카테고리 존을 매장 내에 직접 구축해 드립니다.
                  </p>

                  {/* Built-in Switcher Tabs mapped neatly to content */}
                  <div className="grid grid-cols-3 gap-[10px] mt-5 max-w-[340px]">
                    <button 
                      onClick={() => setBuildSize("4ft")}
                      className={`ks-ft ${buildSize === "4ft" ? "active" : ""}`}
                      style={{ background: "transparent", outline: "none" }}
                    >
                      <div className="num text-[14px] font-black">4FT</div>
                      <div style={{ color: "#9A9A9A", fontSize: "10.5px" }}>Starter Module</div>
                    </button>
                    <button 
                      onClick={() => setBuildSize("8ft")}
                      className={`ks-ft ${buildSize === "8ft" ? "active" : ""}`}
                      style={{ background: "transparent", outline: "none" }}
                    >
                      <div className="num text-[14px] font-black">8FT</div>
                      <div style={{ color: "#9A9A9A", fontSize: "10.5px" }}>Growth Module</div>
                    </button>
                    <button 
                      onClick={() => setBuildSize("12ft")}
                      className={`ks-ft ${buildSize === "12ft" ? "active" : ""}`}
                      style={{ background: "transparent", outline: "none" }}
                    >
                      <div className="num text-[14px] font-black">12FT</div>
                      <div style={{ color: "#9A9A9A", fontSize: "10.5px" }}>Destination</div>
                    </button>
                  </div>
                </div>
                
                <div className="relative w-full h-[260px] md:h-[290px] rounded-[14px] overflow-hidden my-auto border border-white/10 shadow-lg">
                  <Image 
                    src={getBuildImage()} 
                    alt="Modular K-Beauty LED store display fixture composites" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                </div>
              </div>
              
              {/* Bottom anchor 3 points */}
              <div className="border-t border-white/10 pt-5 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-0">
                  <div className="flex flex-col gap-1.5 md:pr-4 md:border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12C4 6 20 6 22 12C20 18 4 18 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">VISIBILITY</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">LED 시그니처 조명 시선 유도</span>
                  </div>
                  <div className="flex flex-col gap-1.5 md:px-6 md:border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="9" width="8" height="8" />
                        <rect x="13" y="9" width="8" height="8" />
                        <rect x="8" y="3" width="8" height="8" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">MODULAR FORMAT</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">매장 면적별 유연한 모듈 증설</span>
                  </div>
                  <div className="flex flex-col gap-1.5 md:pl-6">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9L4 4H20L21 9" />
                        <path d="M4 9V20H20V9" />
                        <line x1="9" y1="20" x2="9" y2="13" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">INSTALLATION</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">현장 맞춤형 프레임 셋업 완료</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 04 SUPPORT PANEL */}
            <div className={`ks-panel ${activeTab === 3 ? "active" : ""} h-full flex flex-col justify-between flex-1`}>
              <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-[36px] flex-1 items-center">
                <div className="flex flex-col justify-center h-full">
                  <span className="text-[14px] font-black text-[#ff2b75] tracking-widest uppercase block mb-1">04</span>
                  <h3 className="font-display text-white text-[42px] font-extrabold tracking-tight leading-none mb-3">
                    SUPPORT
                  </h3>
                  <div className="text-[14px] text-white/90 font-semibold mb-5 flex items-center gap-2">
                    <span className="text-[#ff2b75]">판매 준비 지원</span>
                    <span className="text-white/20">|</span>
                    <span className="text-white/60">Retail-Ready Support</span>
                  </div>
                  <div className="w-12 h-0.5 bg-[#ff2b75] mb-5" />
                  <h4 className="text-[18px] font-bold text-white leading-snug mb-3">
                    제품을 납품하는 것만으로는<br />실제 판매가 일어나지 않습니다.
                  </h4>
                  <p className="text-[13.5px] text-[#ADADAD] leading-relaxed font-medium">
                    매장 스태프 가이드 교육, 고객용 모바일 제품 QR 정보 매핑, 그리고 현장 Merchandising VMD 진열 지원 등 실질적인 매출 발생을 위해 K SELECT의 마케팅 파워를 매장에 지원합니다.
                  </p>
                </div>
                <div className="relative w-full h-[260px] md:h-[290px] rounded-[14px] overflow-hidden my-auto border border-white/10 shadow-lg">
                  <Image 
                    src="/images/solutions/solution_support_v2.jpg" 
                    alt="Smartphone scanning QR code on sleek black cosmetics shelf layout" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                </div>
              </div>
              
              {/* Bottom anchor 3 points */}
              <div className="border-t border-white/10 pt-5 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-0">
                  <div className="flex flex-col gap-1.5 md:pr-4 md:border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="15" y="15" width="2.5" height="2.5" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">QR GUIDE</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">QR 스캔을 통한 성분 상세 정보 제공</span>
                  </div>
                  <div className="flex flex-col gap-1.5 md:px-6 md:border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3L22 8L12 13L2 8Z" />
                        <path d="M6 10V16C6 18 9 19 12 19C15 19 18 18 18 16V10" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">TRAINING</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">스태프용 K-뷰티 판매 핵심 교육</span>
                  </div>
                  <div className="flex flex-col gap-1.5 md:pl-6">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="4" r="1.5" />
                        <path d="M12 5.5 L3 13H21Z" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">DISPLAY FIT</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">초기 상품 진열 및 테스터 배치 지원</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 05 OPTIMIZE PANEL */}
            <div className={`ks-panel ${activeTab === 4 ? "active" : ""} h-full flex flex-col justify-between flex-1`}>
              <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-[36px] flex-1 items-center">
                <div className="flex flex-col justify-center h-full">
                  <span className="text-[14px] font-black text-[#ff2b75] tracking-widest uppercase block mb-1">05</span>
                  <h3 className="font-display text-white text-[42px] font-extrabold tracking-tight leading-none mb-3">
                    OPTIMIZE
                  </h3>
                  <div className="text-[14px] text-white/90 font-semibold mb-5 flex items-center gap-2">
                    <span className="text-[#ff2b75]">판매 데이터 기반 최적화</span>
                    <span className="text-white/20">|</span>
                    <span className="text-white/60">Inventory &amp; Growth Optimization</span>
                  </div>
                  <div className="w-12 h-0.5 bg-[#ff2b75] mb-5" />
                  <h4 className="text-[18px] font-bold text-white leading-snug mb-3">
                    판매 이후에도 재고 흐름을 밀착 모니터링합니다.
                  </h4>
                  <p className="text-[13.5px] text-[#ADADAD] leading-relaxed font-medium">
                    실제 매장에서 수집된 주간 Sell-through 회전율 데이터를 바탕으로, 누적 판매 성과 분석과 자동화된 재주문(Reorder) 제안을 통해 악성 재고 없는 건전한 매출 순환을 책임집니다.
                  </p>
                </div>
                
                {/* Visual Stack mapping exactly to the 290px frame layout for perfect Jitter-free transition */}
                <div className="w-full h-[260px] md:h-[290px] bg-[#111]/70 border border-white/10 rounded-[14px] p-5 flex flex-col justify-between my-auto shadow-lg">
                  
                  {/* SELL-THROUGH Chart widget */}
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

                  {/* REORDER RECOMMENDATION widget */}
                  <div className="flex items-center justify-between bg-[#080808]/90 border border-white/5 rounded-[8px] p-3">
                    <div>
                      <div className="text-[#ff2b75] text-[9.5px] font-black tracking-wider uppercase font-display mb-0.5">REORDER SUGGESTION</div>
                      <div className="text-white text-[11.5px] font-bold">SKU-1023 (Skincare)</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-[16px] font-black">240<span className="text-[10px] text-[#9A9A9A] font-bold"> EA</span></div>
                      <span className="text-[8px] text-[#ff2b75] font-black tracking-widest uppercase">AUTO RUNNING</span>
                    </div>
                  </div>

                  {/* MARGIN PERFORMANCE widget */}
                  <div className="flex items-center justify-between bg-[#080808]/90 border border-white/5 rounded-[8px] p-3">
                    <div>
                      <div className="text-[#ff2b75] text-[9.5px] font-black tracking-wider uppercase font-display mb-0.5">MARGIN PROFILE</div>
                      <div className="text-white text-[11.5px] font-bold">Category Average</div>
                    </div>
                    <div className="text-[#ff2b75] text-[18px] font-black">52.4%</div>
                  </div>

                </div>
              </div>
              
              {/* Bottom anchor 3 points */}
              <div className="border-t border-white/10 pt-5 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-0">
                  <div className="flex flex-col gap-1.5 md:pr-4 md:border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">TURNOVER SPEED</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">데이터 분석을 통한 회전율 가속</span>
                  </div>
                  <div className="flex flex-col gap-1.5 md:px-6 md:border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <line x1="21" y1="12" x2="3" y2="12" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">AUTO REORDER</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">품절 방지 자동 재오더 주문 루프</span>
                  </div>
                  <div className="flex flex-col gap-1.5 md:pl-6">
                    <div className="flex items-center gap-2">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span className="text-white text-[11.5px] font-black tracking-wider uppercase font-display">DEADSTOCK CONTROL</span>
                    </div>
                    <span className="text-[#8F8F8F] text-[12px] font-semibold">비정체 SKU 조기 식별 및 제어</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
