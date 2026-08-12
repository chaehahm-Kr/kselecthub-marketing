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

  const getBuildImage = () => {
    if (buildSize === "4ft") return "/images/solutions/4F_A.jpg";
    if (buildSize === "12ft") return "/images/solutions/12F_AAA.jpg";
    return "/images/solutions/8F_AA.jpg"; // Updated store background composite visual files
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

          {/* ================= RIGHT COLUMN: Fixed Height Solution Panel Card ================= */}
          <div 
            style={{ 
              border: "1.5px solid #ff2b75", 
              borderRadius: "20px", 
              padding: "44px 48px", 
              background: "#0c0c0c", 
              display: "flex", 
              flexDirection: "column",
              justifyContent: "space-between"
            }}
            className="w-full h-full min-h-[560px] relative self-stretch"
          >

            {/* 01 CURATE PANEL */}
            <div className={`ks-panel ${activeTab === 0 ? "active" : ""} h-full flex flex-col justify-between`}>
              <div className="flex flex-col md:flex-row gap-[40px] flex-1">
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div style={{ color: "#ff2b75", fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>01</div>
                  <div style={{ color: "#FAFAFA", fontSize: "44px", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "14px" }}>
                    CURATE
                  </div>
                  <div style={{ color: "#FAFAFA", fontSize: "15px", marginBottom: "20px" }}>
                    <span style={{ color: "#ff2b75", fontWeight: 700 }}>검증된 제품 선별</span> <span style={{ color: "#8A8A8A" }}>|</span> Curated Product Mix
                  </div>
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", marginBottom: "20px" }} />
                  <div style={{ color: "#FAFAFA", fontSize: "19.5px", fontWeight: 700, lineHeight: 1.5, marginBottom: "16px" }}>
                    모든 K-뷰티 제품이<br />K Select에 포함되지는 않습니다.
                  </div>
                  <div style={{ color: "#B9B9B9", fontSize: "14px", lineHeight: "1.75" }}>
                    엄격한 기준으로 품질, 마진,<br />시장 적합성을 종합적으로 검토하여<br />가장 경쟁력 있는 제품만을 선별합니다.
                  </div>
                </div>
                <div className="relative w-full md:w-[280px] h-[280px] md:h-auto flex-shrink-0 rounded-[14px] overflow-hidden my-auto max-h-[300px] aspect-square">
                  <Image 
                    src="/images/solutions/curate.png" 
                    alt="Curated K-Beauty product mix" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 280px"
                  />
                </div>
              </div>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", margin: "24px 0 20px" }} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 md:gap-0 mt-auto">
                <div className="flex flex-col gap-1.5 md:pr-[18px] md:border-r border-white/12">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2 L20 5 V11 C20 16 16.5 20 12 22 C7.5 20 4 16 4 11 V5 Z" />
                      <path d="M8.5 12 L11 14.5 L16 9" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>QUALITY</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>엄격한 품질 기준 검증</span>
                </div>
                <div className="flex flex-col gap-1.5 md:px-[18px] md:border-r border-white/12">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 17 9 11 13 15 21 7" />
                      <polyline points="15 7 21 7 21 13" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>MARGIN</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>지속 가능한 마진 구조</span>
                </div>
                <div className="flex flex-col gap-1.5 md:pl-[18px]">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <path d="M12 3C15 6 15 18 12 21C9 18 9 6 12 3Z" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>U.S. MARKET FIT</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>미국 트렌드 &amp; 규격 적합성</span>
                </div>
              </div>
            </div>

            {/* 02 DIFFERENTIATE PANEL */}
            <div className={`ks-panel ${activeTab === 1 ? "active" : ""} h-full flex flex-col justify-between`}>
              <div className="flex flex-col md:flex-row gap-[40px] flex-1">
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div style={{ color: "#ff2b75", fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>02</div>
                  <div style={{ color: "#FAFAFA", fontSize: "40px", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "14px" }}>
                    DIFFERENTIATE
                  </div>
                  <div style={{ color: "#FAFAFA", fontSize: "15px", marginBottom: "20px" }}>
                    <span style={{ color: "#ff2b75", fontWeight: 700 }}>차별화된 상품 구성</span> <span style={{ color: "#8A8A8A" }}>|</span> Differentiated Assortment
                  </div>
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", marginBottom: "20px" }} />
                  <div style={{ color: "#FAFAFA", fontSize: "19.5px", fontWeight: 700, lineHeight: 1.5, marginBottom: "16px" }}>
                    인기 제품을 모으는 것만으로는<br />차별화가 되지 않습니다.
                  </div>
                  <div style={{ color: "#B9B9B9", fontSize: "14px", lineHeight: "1.75" }}>
                    카테고리, 가격대, 제품 역할과<br />매장 고객 특성을 고려하여<br />가격 경쟁에서 벗어날 수 있는<br />매장 맞춤형 Product Mix를 구성합니다.
                  </div>
                </div>
                <div className="relative w-full md:w-[280px] h-[280px] md:h-auto flex-shrink-0 rounded-[14px] overflow-hidden my-auto max-h-[300px] aspect-square">
                  <Image 
                    src="/images/solutions/differentiate.png" 
                    alt="Differentiated K-Beauty assortment display" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 280px"
                  />
                </div>
              </div>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", margin: "24px 0 20px" }} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 md:gap-0 mt-auto">
                <div className="flex flex-col gap-1.5 md:pr-[18px] md:border-r border-white/12">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3H18L22 9L12 22L2 9Z" />
                      <path d="M2 9H22" />
                      <path d="M9 3L12 9L15 3" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>DIFFERENTIATION</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>가격 경쟁 완화</span>
                </div>
                <div className="flex flex-col gap-1.5 md:px-[18px] md:border-r border-white/12">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="3" x2="12" y2="21" />
                      <line x1="5" y1="7" x2="19" y2="7" />
                      <path d="M4 7 Q4 12 8 12 Q12 12 12 7" />
                      <path d="M12 7 Q12 12 16 12 Q20 12 20 7" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>PRICE BALANCE</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>가격대와 마진 균형</span>
                </div>
                <div className="flex flex-col gap-1.5 md:pl-[18px]">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9L4 4H20L21 9" />
                      <path d="M4 9V20H20V9" />
                      <line x1="9" y1="20" x2="9" y2="13" />
                      <line x1="15" y1="20" x2="15" y2="13" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>STORE FIT</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>매장 고객 맞춤 구성</span>
                </div>
              </div>
            </div>

            {/* 03 BUILD PANEL (Includes 4FT/8FT/12FT Switcher) */}
            <div className={`ks-panel ${activeTab === 2 ? "active" : ""} h-full flex flex-col justify-between`}>
              <div className="flex flex-col md:flex-row gap-[40px] flex-1">
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div style={{ color: "#ff2b75", fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>03</div>
                  <div style={{ color: "#FAFAFA", fontSize: "44px", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "14px" }}>
                    BUILD
                  </div>
                  <div style={{ color: "#FAFAFA", fontSize: "15px", marginBottom: "20px" }}>
                    <span style={{ color: "#ff2b75", fontWeight: 700 }}>숍인숍 카테고리 구축</span> <span style={{ color: "#8A8A8A" }}>|</span> Store-in-a-Store
                  </div>
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", marginBottom: "20px" }} />
                  <div style={{ color: "#FAFAFA", fontSize: "18.5px", fontWeight: 700, lineHeight: 1.5, marginBottom: "16px" }}>
                    4FT / 8FT / 12FT 모듈형 디스플레이로<br />전문 K-Beauty 섹션을 매장에 구축합니다.
                  </div>
                  <div style={{ color: "#B9B9B9", fontSize: "14px", lineHeight: "1.75" }}>
                    단순 제품 진열을 넘어, 매장의 실제 판매를 가속화하는 조명 프레임 인프라 시설을 완벽히 매핑 설치해 드립니다.
                  </div>
                </div>
                <div className="relative w-full md:w-[280px] h-[280px] md:h-auto flex-shrink-0 rounded-[14px] overflow-hidden my-auto max-h-[300px] aspect-square">
                  <Image 
                    src={getBuildImage()} 
                    alt="K-Beauty store-in-a-store display module" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 280px"
                  />
                </div>
              </div>

              {/* 4FT / 8FT / 12FT tabs swapper */}
              <div className="grid grid-cols-3 gap-[10px] my-4 mt-auto">
                <button 
                  onClick={() => setBuildSize("4ft")}
                  className={`ks-ft ${buildSize === "4ft" ? "active" : ""}`}
                  style={{ background: "transparent", outline: "none" }}
                >
                  <div className="num">4FT</div>
                  <div style={{ color: "#9A9A9A", fontSize: "11px" }}>Starter</div>
                </button>
                <button 
                  onClick={() => setBuildSize("8ft")}
                  className={`ks-ft ${buildSize === "8ft" ? "active" : ""}`}
                  style={{ background: "transparent", outline: "none" }}
                >
                  <div className="num">8FT</div>
                  <div style={{ color: "#9A9A9A", fontSize: "11px" }}>Growth</div>
                </button>
                <button 
                  onClick={() => setBuildSize("12ft")}
                  className={`ks-ft ${buildSize === "12ft" ? "active" : ""}`}
                  style={{ background: "transparent", outline: "none" }}
                >
                  <div className="num">12FT</div>
                  <div style={{ color: "#9A9A9A", fontSize: "11px" }}>Destination</div>
                </button>
              </div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", margin: "16px 0 20px" }} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 md:gap-0">
                <div className="flex flex-col gap-1.5 md:pr-[18px] md:border-r border-white/12">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12C4 6 20 6 22 12C20 18 4 18 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>VISIBILITY</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>LED 조명 가시성 강화</span>
                </div>
                <div className="flex flex-col gap-1.5 md:px-[18px] md:border-r border-white/12">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="9" width="8" height="8" />
                      <rect x="13" y="9" width="8" height="8" />
                      <rect x="8" y="3" width="8" height="8" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>MODULAR</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>매장 규모별 모듈 선택</span>
                </div>
                <div className="flex flex-col gap-1.5 md:pl-[18px]">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9L4 4H20L21 9" />
                      <path d="M4 9V20H20V9" />
                      <line x1="9" y1="20" x2="9" y2="13" />
                      <line x1="15" y1="20" x2="15" y2="13" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>STRUCTURE</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>완성형 숍인숍 피처</span>
                </div>
              </div>
            </div>

            {/* 04 SUPPORT PANEL */}
            <div className={`ks-panel ${activeTab === 3 ? "active" : ""} h-full flex flex-col justify-between`}>
              <div className="flex flex-col md:flex-row gap-[40px] flex-1">
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div style={{ color: "#ff2b75", fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>04</div>
                  <div style={{ color: "#FAFAFA", fontSize: "44px", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "14px" }}>
                    SUPPORT
                  </div>
                  <div style={{ color: "#FAFAFA", fontSize: "15px", marginBottom: "20px" }}>
                    <span style={{ color: "#ff2b75", fontWeight: 700 }}>판매 준비 지원</span> <span style={{ color: "#8A8A8A" }}>|</span> Retail-Ready Support
                  </div>
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", marginBottom: "20px" }} />
                  <div style={{ color: "#FAFAFA", fontSize: "19.5px", fontWeight: 700, lineHeight: 1.5, marginBottom: "16px" }}>
                    제품 공급에서 끝나지 않습니다.
                  </div>
                  <div style={{ color: "#B9B9B9", fontSize: "14px", lineHeight: "1.75" }}>
                    제품 정보 QR 매핑, 스태프 가이드 교육,<br />그리고 현장 Merchandising 지원을 통해<br />매장의 판매 전환율을 함께 높여 드립니다.
                  </div>
                </div>
                <div className="relative w-full md:w-[280px] h-[280px] md:h-auto flex-shrink-0 rounded-[14px] overflow-hidden my-auto max-h-[300px] aspect-square">
                  <Image 
                    src="/images/solutions/support.png" 
                    alt="Retail-ready support: staff training and merchandising" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 280px"
                  />
                </div>
              </div>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", margin: "24px 0 20px" }} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 md:gap-0 mt-auto">
                <div className="flex flex-col gap-1.5 md:pr-[18px] md:border-r border-white/12">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="15" y="15" width="2.5" height="2.5" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>QR GUIDE</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>성분/사용 가이드 스캔</span>
                </div>
                <div className="flex flex-col gap-1.5 md:px-[18px] md:border-r border-white/12">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3L22 8L12 13L2 8Z" />
                      <path d="M6 10V16C6 18 9 19 12 19C15 19 18 18 18 16V10" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>TRAINING</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>가이드북 및 교육 지원</span>
                </div>
                <div className="flex flex-col gap-1.5 md:pl-[18px]">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="4" r="1.5" />
                      <path d="M12 5.5 L3 13H21Z" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>DISPLAY FIT</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>진열 및 쇼케이스 세팅</span>
                </div>
              </div>
            </div>

            {/* 05 OPTIMIZE PANEL (Includes HTML/CSS Charts & Widgets) */}
            <div className={`ks-panel ${activeTab === 4 ? "active" : ""} h-full flex flex-col justify-between`}>
              <div className="flex flex-col justify-center flex-1">
                <div style={{ color: "#ff2b75", fontSize: "15px", fontWeight: 800, marginBottom: "6px" }}>05</div>
                <div style={{ color: "#FAFAFA", fontSize: "44px", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "14px" }}>
                  OPTIMIZE
                </div>
                <div style={{ color: "#FAFAFA", fontSize: "15px", marginBottom: "20px" }}>
                  <span style={{ color: "#ff2b75", fontWeight: 700 }}>판매 데이터 기반 최적화</span> <span style={{ color: "#8A8A8A" }}>|</span> Inventory &amp; Growth Optimization
                </div>
                <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", marginBottom: "20px" }} />
                <div style={{ color: "#FAFAFA", fontSize: "19.5px", fontWeight: 700, lineHeight: 1.5, marginBottom: "10px" }}>
                  판매 이후에도 시스템 관리는 계속됩니다.
                </div>
                <div style={{ color: "#B9B9B9", fontSize: "14px", lineHeight: "1.75", marginBottom: "20px" }}>
                  실제 Sell-through 데이터를 바탕으로 제품 회전율을 분석하고,<br />재주문 제안과 Product Mix를 매장 상권에 딱 맞게 상시 고도화합니다.
                </div>

                {/* Dashboard Widgets layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] my-1">
                  
                  {/* SELL-THROUGH Chart widget */}
                  <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "14px 16px" }}>
                    <div style={{ color: "#ff2b75", fontSize: "10px", fontWeight: 800, letterSpacing: "0.06em", marginBottom: "12px" }}>SELL-THROUGH</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "64px" }}>
                      <div style={{ width: "100%", background: "#ff2b75", borderRadius: "2px 2px 0 0", height: "100%" }} />
                      <div style={{ width: "100%", background: "#ff2b75", borderRadius: "2px 2px 0 0", height: "85%" }} />
                      <div style={{ width: "100%", background: "#ff2b75", borderRadius: "2px 2px 0 0", height: "72%" }} />
                      <div style={{ width: "100%", background: "#ff2b75", borderRadius: "2px 2px 0 0", height: "55%" }} />
                      <div style={{ width: "100%", background: "#ff2b75", borderRadius: "2px 2px 0 0", height: "42%" }} />
                    </div>
                  </div>

                  {/* REORDER RECOMMENDATION widget */}
                  <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ color: "#ff2b75", fontSize: "10px", fontWeight: 800, letterSpacing: "0.06em", marginBottom: "8px" }}>REORDER SUGGESTION</div>
                      <div style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700 }}>SKU-1023</div>
                    </div>
                    <div style={{ color: "#FAFAFA", fontSize: "22px", fontWeight: 800, margin: "6px 0" }}>240<span style={{ fontSize: "12px", color: "#9A9A9A", fontWeight: 600 }}> EA</span></div>
                    <div style={{ border: "1px solid #ff2b75", color: "#ff2b75", borderRadius: "6px", padding: "4px 8px", fontSize: "10.5px", fontWeight: 800, textAlign: "center" }}>✓ AUTO REORDER</div>
                  </div>

                  {/* MARGIN PERFORMANCE widget */}
                  <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ color: "#ff2b75", fontSize: "10px", fontWeight: 800, letterSpacing: "0.06em", marginBottom: "8px" }}>MARGIN PROFILE</div>
                      <div style={{ color: "#FAFAFA", fontSize: "12.5px", fontWeight: 700 }}>Average Category Margin</div>
                    </div>
                    <div style={{ color: "#FAFAFA", fontSize: "22px", fontWeight: 800, margin: "6px 0" }}>52.4%</div>
                    <div style={{ background: "#ff2b75/10", border: "1px solid #ff2b75/20", color: "#ff2b75", borderRadius: "6px", padding: "4px 8px", fontSize: "10.5px", fontWeight: 800, textAlign: "center" }}>OPTIMIZED</div>
                  </div>

                </div>
              </div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", margin: "24px 0 20px" }} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 md:gap-0 mt-auto">
                <div className="flex flex-col gap-1.5 md:pr-[18px] md:border-r border-white/12">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>TURNOVER SPEED</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>재고 회전 주기 가속화</span>
                </div>
                <div className="flex flex-col gap-1.5 md:px-[18px] md:border-r border-white/12">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="21" y1="12" x2="3" y2="12" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>AUTOMATIC REORDER</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>자동 리오더 솔루션</span>
                </div>
                <div className="flex flex-col gap-1.5 md:pl-[18px]">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2b75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>DEADSTOCK CONTROL</span>
                  </div>
                  <span style={{ color: "#8F8F8F", fontSize: "11.5px" }}>악성 재고 최소화 케어</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
