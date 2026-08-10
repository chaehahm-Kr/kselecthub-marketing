"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { assetConfig } from "../assets.config";

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

  const handleSmoothScroll = (e: React.MouseEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getBuildImage = () => {
    if (buildSize === "4ft") return assetConfig.displayFixtures["4ft"].src;
    if (buildSize === "12ft") return assetConfig.displayFixtures["12ft"].src;
    return "/images/solutions/build.jpg"; // Default 8FT master image
  };

  return (
    <section
      id="solution"
      className="w-full bg-[#0A0A0A] select-none text-left font-sans"
      style={{ fontFamily: "'Pretendard', -apple-system, sans-serif" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer wrapper replicating inline styles of the standalone HTML */}
      <div className="py-[72px] px-6 sm:px-10 md:px-10" style={{ background: "#0A0A0A" }}>
        <div className="max-w-[1600px] mx-auto flex flex-col gap-[36px]">

          {/* Main Grid: Left Column (38%), Right Column (62%) on Desktop */}
          <div className="grid lg:grid-cols-[minmax(320px,38%)_1fr] gap-[56px] items-start">

            {/* ================= LEFT COLUMN: Intro + Diagram ================= */}
            <div className="flex flex-col gap-2">
              <div style={{ color: "#EB326E", fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", marginBottom: "16px" }}>
                03 — K SELECT SOLUTION
              </div>
              <h2 style={{ margin: "0 0 16px", color: "#FAFAFA", fontSize: "33px", fontWeight: 800, lineHeight: 1.32, letterSpacing: "-0.01em" }}>
                우리가 가진 5가지 솔루션으로<br />리테일러의 문제를 해결합니다.
              </h2>
              <p style={{ margin: "0 0 32px", color: "#ADADAD", fontSize: "15px", lineHeight: "1.75", maxWidth: "460px" }}>
                K Select는 제품 선정부터 디스플레이 · 운영 · 재고 최적화까지<br />하나로 연결된 시스템으로 리테일 성장을 지원합니다.
              </p>

              {/* Mobile/Tablet Horizontal Selector Slider (lg:hidden fallback to prevent circle breaking) */}
              <div className="lg:hidden w-full overflow-x-auto pb-4 mb-4 flex gap-2 scrollbar-none">
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
                        ? "bg-[#EB326E] text-white border border-[#EB326E] shadow-[0_0_12px_rgba(235,50,110,0.4)]"
                        : "bg-[#111] border border-white/10 text-[#9A9A9A] hover:border-white/20"
                    }`}
                  >
                    {item.num} {item.key}
                  </button>
                ))}
              </div>

              {/* Desktop Orbit Wheel (Hidden on Mobile/Tablet) */}
              <div className="hidden lg:block relative w-[440px] h-[440px] mx-auto">
                {/* Dashed lines representing connections */}
                <div style={{ position: "absolute", left: "220px", top: "220px", width: "36px", height: 0, borderTop: "1.5px dotted rgba(255,255,255,0.3)", transform: "rotate(-90deg)", transformOrigin: "0 0" }} />
                <div style={{ position: "absolute", left: "220px", top: "220px", width: "36px", height: 0, borderTop: "1.5px dotted rgba(255,255,255,0.3)", transform: "rotate(-18deg)", transformOrigin: "0 0" }} />
                <div style={{ position: "absolute", left: "220px", top: "220px", width: "36px", height: 0, borderTop: "1.5px dotted rgba(255,255,255,0.3)", transform: "rotate(54deg)", transformOrigin: "0 0" }} />
                <div style={{ position: "absolute", left: "220px", top: "220px", width: "36px", height: 0, borderTop: "1.5px dotted rgba(255,255,255,0.3)", transform: "rotate(126deg)", transformOrigin: "0 0" }} />
                <div style={{ position: "absolute", left: "220px", top: "220px", width: "36px", height: 0, borderTop: "1.5px dotted rgba(255,255,255,0.3)", transform: "rotate(198deg)", transformOrigin: "0 0" }} />

                {/* Central Hub Core */}
                <div style={{ position: "absolute", left: "128px", top: "128px", width: "184px", height: "184px", borderRadius: "50%", border: "1.5px solid #EB326E", background: "#0A0A0A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
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

            {/* ================= RIGHT COLUMN: Solution Panel Card ================= */}
            <div 
              style={{ 
                border: "1.5px solid #EB326E", 
                borderRadius: "16px", 
                padding: "44px 48px", 
                background: "#0A0A0A", 
                display: "flex", 
                flexDirection: "column" 
              }}
              className="lg:mt-[206px]"
            >

              {/* 01 CURATE PANEL */}
              <div className={`ks-panel ${activeTab === 0 ? "active" : ""}`}>
                <div className="flex flex-col md:flex-row gap-[40px]">
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div style={{ color: "#EB326E", fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>01</div>
                    <div style={{ color: "#FAFAFA", fontSize: "48px", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "14px" }}>
                      CURATE
                    </div>
                    <div style={{ color: "#FAFAFA", fontSize: "16px", marginBottom: "20px" }}>
                      <span style={{ color: "#EB326E", fontWeight: 700 }}>검증된 제품 선별</span> <span style={{ color: "#8A8A8A" }}>|</span> Curated Product Mix
                    </div>
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.14)", marginBottom: "24px" }} />
                    <div style={{ color: "#FAFAFA", fontSize: "21px", fontWeight: 700, lineHeight: 1.55, marginBottom: "16px" }}>
                      모든 K-뷰티 제품이<br />K Select에 포함되지는 않습니다.
                    </div>
                    <div style={{ color: "#B9B9B9", fontSize: "14.5px", lineHeight: "1.85" }}>
                      엄격한 기준으로 품질, 마진,<br />시장 적합성을 종합적으로 검토하여<br />가장 경쟁력 있는 제품만을 선별합니다.
                    </div>
                  </div>
                  <div className="relative w-full md:w-[300px] h-[320px] md:h-auto flex-shrink-0 rounded-[14px] overflow-hidden">
                    <Image 
                      src="/images/solutions/curate.png" 
                      alt="Curated K-Beauty product mix" 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 300px"
                    />
                  </div>
                </div>
                <div style={{ height: "1px", background: "rgba(255,255,255,0.14)", margin: "32px 0 24px" }} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-0">
                  <div className="flex flex-col gap-2 md:pr-[24px] md:border-r border-white/14">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2 L20 5 V11 C20 16 16.5 20 12 22 C7.5 20 4 16 4 11 V5 Z" />
                        <path d="M8.5 12 L11 14.5 L16 9" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>QUALITY</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>엄격한 품질 기준 검증</span>
                  </div>
                  <div className="flex flex-col gap-2 md:px-[24px] md:border-r border-white/14">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 17 9 11 13 15 21 7" />
                        <polyline points="15 7 21 7 21 13" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>MARGIN</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>지속 가능한 마진 구조</span>
                  </div>
                  <div className="flex flex-col gap-2 md:pl-[24px]">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <path d="M12 3C15 6 15 18 12 21C9 18 9 6 12 3Z" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>U.S. MARKET FIT</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>미국 시장 트렌드 &amp; 규격 적합성 검토</span>
                  </div>
                </div>
              </div>

              {/* 02 DIFFERENTIATE PANEL */}
              <div className={`ks-panel ${activeTab === 1 ? "active" : ""}`}>
                <div className="flex flex-col md:flex-row gap-[40px]">
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div style={{ color: "#EB326E", fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>02</div>
                    <div style={{ color: "#FAFAFA", fontSize: "44px", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "14px" }}>
                      DIFFERENTIATE
                    </div>
                    <div style={{ color: "#FAFAFA", fontSize: "16px", marginBottom: "20px" }}>
                      <span style={{ color: "#EB326E", fontWeight: 700 }}>차별화된 상품 구성</span> <span style={{ color: "#8A8A8A" }}>|</span> Differentiated Assortment
                    </div>
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.14)", marginBottom: "24px" }} />
                    <div style={{ color: "#FAFAFA", fontSize: "21px", fontWeight: 700, lineHeight: 1.55, marginBottom: "16px" }}>
                      인기 제품을 모으는 것만으로는<br />차별화가 되지 않습니다.
                    </div>
                    <div style={{ color: "#B9B9B9", fontSize: "14.5px", lineHeight: "1.85" }}>
                      카테고리, 가격대, 제품 역할과<br />매장 고객 특성을 고려하여<br />가격 경쟁에서 벗어날 수 있는<br />매장 맞춤형 Product Mix를 구성합니다.
                    </div>
                  </div>
                  <div className="relative w-full md:w-[300px] h-[320px] md:h-auto flex-shrink-0 rounded-[14px] overflow-hidden">
                    <Image 
                      src="/images/solutions/differentiate.png" 
                      alt="Differentiated K-Beauty assortment display" 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 300px"
                    />
                  </div>
                </div>
                <div style={{ height: "1px", background: "rgba(255,255,255,0.14)", margin: "32px 0 24px" }} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-0">
                  <div className="flex flex-col gap-2 md:pr-[24px] md:border-r border-white/14">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3H18L22 9L12 22L2 9Z" />
                        <path d="M2 9H22" />
                        <path d="M9 3L12 9L15 3" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>DIFFERENTIATION</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>동일 상품 가격 경쟁 완화</span>
                  </div>
                  <div className="flex flex-col gap-2 md:px-[24px] md:border-r border-white/14">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="3" x2="12" y2="21" />
                        <line x1="5" y1="7" x2="19" y2="7" />
                        <path d="M4 7 Q4 12 8 12 Q12 12 12 7" />
                        <path d="M12 7 Q12 12 16 12 Q20 12 20 7" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>PRICE POINT BALANCE</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>가격대와 마진의 균형</span>
                  </div>
                  <div className="flex flex-col gap-2 md:pl-[24px]">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9L4 4H20L21 9" />
                        <path d="M4 9V20H20V9" />
                        <line x1="9" y1="20" x2="9" y2="13" />
                        <line x1="15" y1="20" x2="15" y2="13" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>STORE FIT</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>매장 고객에 맞는 구성</span>
                  </div>
                </div>
              </div>

              {/* 03 BUILD PANEL (Includes 4FT/8FT/12FT Switcher) */}
              <div className={`ks-panel ${activeTab === 2 ? "active" : ""}`}>
                <div className="flex flex-col md:flex-row gap-[40px]">
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div style={{ color: "#EB326E", fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>03</div>
                    <div style={{ color: "#FAFAFA", fontSize: "52px", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "14px" }}>
                      BUILD
                    </div>
                    <div style={{ color: "#FAFAFA", fontSize: "16px", marginBottom: "20px" }}>
                      <span style={{ color: "#EB326E", fontWeight: 700 }}>매장 안에 K-Beauty 카테고리를 구축합니다.</span> <span style={{ color: "#8A8A8A" }}>|</span> Store-in-a-Store
                    </div>
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.14)", marginBottom: "24px" }} />
                    <div style={{ color: "#FAFAFA", fontSize: "19px", fontWeight: 700, lineHeight: 1.55, marginBottom: "16px" }}>
                      제품을 진열하는 데서 끝나지 않고<br />4FT / 8FT / 12FT 모듈형 디스플레이로<br />K-Beauty 전용 섹션을 구축합니다.
                    </div>
                    <div style={{ color: "#B9B9B9", fontSize: "14.5px", lineHeight: "1.85" }}>
                      고객이 쉽게 발견하고 쇼핑할 수 있는<br />전용 카테고리 공간을 매장 안에 구현합니다.
                    </div>
                  </div>
                  <div className="relative w-full md:w-[300px] h-[320px] md:h-auto flex-shrink-0 rounded-[14px] overflow-hidden">
                    <Image 
                      src={getBuildImage()} 
                      alt="K-Beauty store-in-a-store display module" 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 300px"
                    />
                  </div>
                </div>

                {/* 4FT / 8FT / 12FT tabs swapper */}
                <div className="grid grid-cols-3 gap-[12px]" style={{ margin: "28px 0 24px" }}>
                  <button 
                    onClick={() => setBuildSize("4ft")}
                    className={`ks-ft ${buildSize === "4ft" ? "active" : ""}`}
                    style={{ background: "transparent", outline: "none" }}
                  >
                    <div className="num">4FT</div>
                    <div style={{ color: "#9A9A9A", fontSize: "12.5px" }}>Starter</div>
                  </button>
                  <button 
                    onClick={() => setBuildSize("8ft")}
                    className={`ks-ft ${buildSize === "8ft" ? "active" : ""}`}
                    style={{ background: "transparent", outline: "none" }}
                  >
                    <div className="num">8FT</div>
                    <div style={{ color: "#9A9A9A", fontSize: "12.5px" }}>Growth</div>
                  </button>
                  <button 
                    onClick={() => setBuildSize("12ft")}
                    className={`ks-ft ${buildSize === "12ft" ? "active" : ""}`}
                    style={{ background: "transparent", outline: "none" }}
                  >
                    <div className="num">12FT</div>
                    <div style={{ color: "#9A9A9A", fontSize: "12.5px" }}>Destination</div>
                  </button>
                </div>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.14)", marginBottom: "24px" }} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-0">
                  <div className="flex flex-col gap-2 md:pr-[24px] md:border-r border-white/14">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12C4 6 20 6 22 12C20 18 4 18 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>VISIBILITY</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>K-Beauty 카테고리 가시성 강화</span>
                  </div>
                  <div className="flex flex-col gap-2 md:px-[24px] md:border-r border-white/14">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="9" width="8" height="8" />
                        <rect x="13" y="9" width="8" height="8" />
                        <rect x="8" y="3" width="8" height="8" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>MODULAR FORMAT</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>매장 규모에 맞는 선택</span>
                  </div>
                  <div className="flex flex-col gap-2 md:pl-[24px]">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9L4 4H20L21 9" />
                        <path d="M4 9V20H20V9" />
                        <line x1="9" y1="20" x2="9" y2="13" />
                        <line x1="15" y1="20" x2="15" y2="13" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>STORE-IN-A-STORE</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>전문 K-Beauty 섹션 구축</span>
                  </div>
                </div>
              </div>

              {/* 04 SUPPORT PANEL */}
              <div className={`ks-panel ${activeTab === 3 ? "active" : ""}`}>
                <div className="flex flex-col md:flex-row gap-[40px]">
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div style={{ color: "#EB326E", fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>04</div>
                    <div style={{ color: "#FAFAFA", fontSize: "48px", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "14px" }}>
                      SUPPORT
                    </div>
                    <div style={{ color: "#FAFAFA", fontSize: "16px", marginBottom: "20px" }}>
                      <span style={{ color: "#EB326E", fontWeight: 700 }}>판매할 수 있도록 준비시킵니다.</span> <span style={{ color: "#8A8A8A" }}>|</span> Retail-Ready Support
                    </div>
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.14)", marginBottom: "24px" }} />
                    <div style={{ color: "#FAFAFA", fontSize: "21px", fontWeight: 700, lineHeight: 1.55, marginBottom: "16px" }}>
                      제품 공급에서 끝나지 않습니다.
                    </div>
                    <div style={{ color: "#B9B9B9", fontSize: "14.5px", lineHeight: "1.85" }}>
                      제품 정보, 직원 교육, Merchandising과<br />매장 운영 지원을 통해 실제 판매가<br />이루어질 수 있도록 돕습니다.
                    </div>
                  </div>
                  <div className="relative w-full md:w-[340px] h-[320px] md:h-auto flex-shrink-0 rounded-[14px] overflow-hidden">
                    <Image 
                      src="/images/solutions/support.png" 
                      alt="Retail-ready support: staff training and merchandising" 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 340px"
                    />
                  </div>
                </div>
                <div style={{ height: "1px", background: "rgba(255,255,255,0.14)", margin: "32px 0 24px" }} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-0">
                  <div className="flex flex-col gap-2 md:pr-[24px] md:border-r border-white/14">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="15" y="15" width="2.5" height="2.5" />
                        <rect x="19" y="15" width="2.5" height="2.5" />
                        <rect x="15" y="19" width="2.5" height="2.5" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>QR PRODUCT INFO</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>고객이 제품 정보를 즉시 확인</span>
                  </div>
                  <div className="flex flex-col gap-2 md:px-[24px] md:border-r border-white/14">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3L22 8L12 13L2 8Z" />
                        <path d="M6 10V16C6 18 9 19 12 19C15 19 18 18 18 16V10" />
                        <line x1="22" y1="8" x2="22" y2="14" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>STAFF TRAINING</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>직원이 자신 있게 제품을 설명</span>
                  </div>
                  <div className="flex flex-col gap-2 md:pl-[24px]">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="4" r="1.5" />
                        <path d="M12 5.5 L3 13H21Z" />
                        <line x1="5" y1="17" x2="19" y2="17" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>MERCHANDISING</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>매장 내 판매 준비 지원</span>
                  </div>
                </div>
              </div>

              {/* 05 OPTIMIZE PANEL (Includes HTML/CSS Charts & Widgets) */}
              <div className={`ks-panel ${activeTab === 4 ? "active" : ""}`}>
                <div style={{ color: "#EB326E", fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>05</div>
                <div style={{ color: "#FAFAFA", fontSize: "50px", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "14px" }}>
                  OPTIMIZE
                </div>
                <div style={{ color: "#FAFAFA", fontSize: "16px", marginBottom: "20px" }}>
                  <span style={{ color: "#EB326E", fontWeight: 700 }}>판매 데이터를 보고, 다음 결정을 더 정확하게 합니다.</span> <span style={{ color: "#8A8A8A" }}>|</span> Inventory &amp; Growth Optimization
                </div>
                <div style={{ height: "1px", background: "rgba(255,255,255,0.14)", marginBottom: "24px" }} />
                <div style={{ color: "#FAFAFA", fontSize: "21px", fontWeight: 700, lineHeight: 1.55, marginBottom: "8px" }}>
                  판매 이후에도 끝나지 않습니다.
                </div>
                <div style={{ color: "#B9B9B9", fontSize: "14.5px", lineHeight: "1.85", marginBottom: "28px" }}>
                  실제 Sell-through 데이터를 바탕으로<br />재고 상태를 확인하고, 재주문과<br />Product Mix를 지속적으로 최적화합니다.
                </div>

                {/* Dashboard Widgets layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]" style={{ marginBottom: "28px" }}>
                  
                  {/* SELL-THROUGH Chart widget */}
                  <div style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: "12px", padding: "18px 20px" }}>
                    <div style={{ color: "#EB326E", fontSize: "11.5px", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "14px" }}>SELL-THROUGH (7D)</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "88px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "6px" }}>
                      <div style={{ width: "100%", background: "#EB326E", borderRadius: "2px 2px 0 0", height: "100%" }} />
                      <div style={{ width: "100%", background: "#EB326E", borderRadius: "2px 2px 0 0", height: "88%" }} />
                      <div style={{ width: "100%", background: "#EB326E", borderRadius: "2px 2px 0 0", height: "75%" }} />
                      <div style={{ width: "100%", background: "#EB326E", borderRadius: "2px 2px 0 0", height: "60%" }} />
                      <div style={{ width: "100%", background: "#EB326E", borderRadius: "2px 2px 0 0", height: "48%" }} />
                      <div style={{ width: "100%", background: "#EB326E", borderRadius: "2px 2px 0 0", height: "35%" }} />
                      <div style={{ width: "100%", background: "#EB326E", borderRadius: "2px 2px 0 0", height: "22%" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                      <span style={{ color: "#7A7A7A", fontSize: "10px" }}>W1</span>
                      <span style={{ color: "#7A7A7A", fontSize: "10px" }}>W2</span>
                      <span style={{ color: "#7A7A7A", fontSize: "10px" }}>W3</span>
                      <span style={{ color: "#7A7A7A", fontSize: "10px" }}>W4</span>
                      <span style={{ color: "#7A7A7A", fontSize: "10px" }}>W5</span>
                      <span style={{ color: "#7A7A7A", fontSize: "10px" }}>W6</span>
                      <span style={{ color: "#7A7A7A", fontSize: "10px" }}>W7</span>
                    </div>
                  </div>

                  {/* REORDER RECOMMENDATION widget */}
                  <div style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: "12px", padding: "18px 20px", display: "flex", flexDirection: "column" }}>
                    <div style={{ color: "#EB326E", fontSize: "11.5px", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "14px" }}>REORDER RECOMMENDATION</div>
                    <div style={{ color: "#FAFAFA", fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>SKU-1023</div>
                    <div style={{ color: "#9A9A9A", fontSize: "12px", marginBottom: "8px" }}>재주문 수량 제안</div>
                    <div style={{ color: "#FAFAFA", fontSize: "30px", fontWeight: 800, marginBottom: "16px" }}>240<span style={{ fontSize: "15px", color: "#9A9A9A", fontWeight: 600 }}> EA</span></div>
                    <div style={{ border: "1px solid #EB326E", color: "#EB326E", borderRadius: "8px", padding: "8px 14px", fontSize: "12px", fontWeight: 700, textAlign: "center", letterSpacing: "0.03em" }}>✓ REORDER NOW</div>
                  </div>

                  {/* PRODUCT MIX ADJUSTMENT donut charts widget */}
                  <div style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: "12px", padding: "18px 20px" }}>
                    <div style={{ color: "#EB326E", fontSize: "11.5px", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "14px" }}>PRODUCT MIX ADJUSTMENT</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "conic-gradient(#EB326E 0% 30%, #2A2A2A 30% 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", color: "#FAFAFA", fontSize: "12px", fontWeight: 700 }}>30%</div>
                        </div>
                        <span style={{ color: "#7A7A7A", fontSize: "10px", letterSpacing: "0.04em" }}>BEFORE</span>
                      </div>
                      <span style={{ color: "#7A7A7A", fontSize: "16px" }}>→</span>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "conic-gradient(#EB326E 0% 60%, #2A2A2A 60% 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", color: "#FAFAFA", fontSize: "12px", fontWeight: 700 }}>60%</div>
                        </div>
                        <span style={{ color: "#7A7A7A", fontSize: "10px", letterSpacing: "0.04em" }}>AFTER</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "12px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#9A9A9A", fontSize: "11px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2A2A2A", display: "inline-block" }} />
                        LOW SELL
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#9A9A9A", fontSize: "11px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#EB326E", display: "inline-block" }} />
                        HIGH SELL
                      </span>
                    </div>
                  </div>

                </div>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.14)", marginBottom: "24px" }} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-0">
                  <div className="flex flex-col gap-2 md:pr-[24px] md:border-r border-white/14">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                        <line x1="8" y1="3" x2="8" y2="7" />
                        <line x1="16" y1="3" x2="16" y2="7" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>WEEKLY UPDATE</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>간단한 재고 · 판매 현황 확인</span>
                  </div>
                  <div className="flex flex-col gap-2 md:px-[24px] md:border-r border-white/14">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="20" r="1.4" />
                        <circle cx="18" cy="20" r="1.4" />
                        <path d="M2 4H4L6.5 15H19L21 7H6" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>SMART REORDER</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>판매 데이터 기반 재주문 제안</span>
                  </div>
                  <div className="flex flex-col gap-2 md:pl-[24px]">
                    <div className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 3 A9 9 0 0 1 21 12 L12 12 Z" fill="#EB326E" stroke="none" />
                      </svg>
                      <span style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em" }}>MIX OPTIMIZATION</span>
                    </div>
                    <span style={{ color: "#8F8F8F", fontSize: "12.5px" }}>잘 팔리는 상품 중심으로 구성 개선</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ================= BOTTOM: Deep Dive Bar ================= */}
          <div 
            style={{ 
              border: "1.5px solid rgba(255,255,255,0.14)", 
              borderRadius: "14px", 
              background: "#111113", 
              display: "grid" 
            }}
            className="grid-cols-1 md:grid-cols-4 overflow-hidden shadow-lg mt-8"
          >
            <div 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "16px", 
                padding: "22px 28px"
              }}
              className="border-b md:border-b-0 md:border-r border-white/14"
            >
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", border: "1.5px solid #EB326E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EB326E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="10" cy="9" r="4.5" />
                  <path d="M4 21v-1c0-2.8 2.7-5 6-5s6 2.2 6 5v1" />
                  <circle cx="17" cy="8" r="2.2" />
                </svg>
              </div>
              <div>
                <div style={{ color: "#FAFAFA", fontSize: "13.5px", fontWeight: 800, letterSpacing: "0.04em", marginBottom: "2px" }}>DEEP DIVE</div>
                <div style={{ color: "#8F8F8F", fontSize: "12px", lineHeight: "1.5" }}>
                  다음 섹션에서 3가지 핵심 솔루션을<br />자세히 소개합니다.
                </div>
              </div>
            </div>

            {/* 01 Card Anchor */}
            <div 
              onClick={(e) => handleSmoothScroll(e, "products")}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 28px" }}
              className="border-b md:border-b-0 md:border-r border-white/14 cursor-pointer hover:bg-white/[0.02] transition-colors"
            >
              <div>
                <div style={{ color: "#EB326E", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>01</div>
                <div style={{ color: "#FAFAFA", fontSize: "16px", fontWeight: 700 }}>Curated Product Mix</div>
              </div>
              <span style={{ color: "#8A8A8A", fontSize: "20px" }}>›</span>
            </div>

            {/* 02 Card Anchor */}
            <div 
              onClick={(e) => handleSmoothScroll(e, "display")}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 28px" }}
              className="border-b md:border-b-0 md:border-r border-white/14 cursor-pointer hover:bg-white/[0.02] transition-colors"
            >
              <div>
                <div style={{ color: "#EB326E", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>02</div>
                <div style={{ color: "#FAFAFA", fontSize: "16px", fontWeight: 700 }}>Store-in-a-Store</div>
              </div>
              <span style={{ color: "#8A8A8A", fontSize: "20px" }}>›</span>
            </div>

            {/* 03 Card Anchor */}
            <div 
              onClick={(e) => handleSmoothScroll(e, "exchange-credit")}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 28px" }}
              className="cursor-pointer hover:bg-white/[0.02] transition-colors"
            >
              <div>
                <div style={{ color: "#EB326E", fontSize: "12px", fontWeight: 700, marginBottom: "6px" }}>03</div>
                <div style={{ color: "#FAFAFA", fontSize: "16px", fontWeight: 700 }}>90-Day Exchange Credit</div>
              </div>
              <span style={{ color: "#8A8A8A", fontSize: "20px" }}>›</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
