"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { assetConfig } from "../assets.config";

interface SolutionItem {
  id: number;
  key: string;
  number: string;
  title: string;
  subtitle: string;
  englishSub: string;
  mainCopy: string;
  description: string;
  chips: { label: string; desc: string }[];
  defaultImage: string;
}

export default function SolutionSection() {
  const [activeTab, setActiveTab] = useState(0); // 0 to 4 (CURATE to OPTIMIZE)
  const [buildSize, setBuildSize] = useState<"4ft" | "8ft" | "12ft">("8ft"); // Default is 8ft Growth based on user spec
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // 5 Solutions Data matching final마스터 PNG 디자인 V2
  const solutions: SolutionItem[] = [
    {
      id: 0,
      key: "CURATE",
      number: "01",
      title: "CURATE",
      subtitle: "검증된 제품 선별",
      englishSub: "Curated Product Mix",
      mainCopy: "모든 K-뷰티 제품이 K Select에 포함되지는 않습니다.",
      description: "엄격한 기준으로 품질, 마진, 시장 적합성을 종합적으로 검토하여 가장 경쟁력 있는 제품만을 선별합니다.",
      defaultImage: assetConfig.storeShowcase.curationSection.src,
      chips: [
        { label: "QUALITY", desc: "엄격한 품질 기준 검증" },
        { label: "MARGIN", desc: "지속 가능한 마진 구조" },
        { label: "U.S. MARKET FIT", desc: "미국 시장 트렌드 & 규제 적합성 검토" }
      ]
    },
    {
      id: 1,
      key: "DIFFERENTIATE",
      number: "02",
      title: "DIFFERENTIATE",
      subtitle: "차별화된 상품 구성",
      englishSub: "Differentiated Assortment",
      mainCopy: "인기 제품을 모으는 것만으로는 차별화가 되지 않습니다.",
      description: "카테고리, 가격대, 제품 역할과 매장 고객 특성을 고려하여 가격 경쟁에서 벗어날 수 있는 매장 맞춤형 Product Mix를 구성합니다.",
      defaultImage: assetConfig.storeShowcase.heroSection.src, // Clean premium product shelves flatlay
      chips: [
        { label: "DIFFERENTIATION", desc: "동일 상품 가격 경쟁 완화" },
        { label: "PRICE POINT BALANCE", desc: "가격대와 마진의 균형" },
        { label: "STORE FIT", desc: "매장 고객에 맞는 구성" }
      ]
    },
    {
      id: 2,
      key: "BUILD",
      number: "03",
      title: "BUILD",
      subtitle: "매장 안에 K-Beauty 카테고리를 구축합니다.",
      englishSub: "Store-in-a-Store",
      mainCopy: "제품을 진열하는 데서 끝나지 않고 4FT / 8FT / 12FT 모듈형 디스플레이로 K-Beauty 전용 섹션을 구축합니다.",
      description: "고객이 쉽게 발견하고 쇼핑할 수 있는 전용 카테고리 공간을 매장 안에 구현합니다.",
      defaultImage: assetConfig.displayFixtures["8ft"].src, // Swapped dynamically
      chips: [
        { label: "VISIBILITY", desc: "K-Beauty 카테고리 가시성 강화" },
        { label: "MODULAR FORMAT", desc: "매장 규모에 맞는 선택" },
        { label: "STORE-IN-A-STORE", desc: "전문 K-Beauty 섹션 구축" }
      ]
    },
    {
      id: 3,
      key: "SUPPORT",
      number: "04",
      title: "SUPPORT",
      subtitle: "판매할 수 있도록 준비시킵니다.",
      englishSub: "Retail-Ready Support",
      mainCopy: "제품 공급에서 끝나지 않습니다.",
      description: "제품 정보, 직원 교육, Merchandising과 매장 운영 지원을 통해 실제 판매가 이루어질 수 있도록 돕습니다.",
      defaultImage: assetConfig.storeShowcase.partnershipSection.src, // Screen, Guide support mockup
      chips: [
        { label: "QR PRODUCT INFO", desc: "고객이 제품 정보를 즉시 확인" },
        { label: "STAFF TRAINING", desc: "직원이 자신 있게 제품을 설명" },
        { label: "MERCHANDISING", desc: "매장 내 판매 준비 지원" }
      ]
    },
    {
      id: 4,
      key: "OPTIMIZE",
      number: "05",
      title: "OPTIMIZE",
      subtitle: "판매 데이터를 보고, 다음 결정을 더 정확하게 합니다.",
      englishSub: "Inventory & Growth Optimization",
      mainCopy: "판매 이후에도 끝나지 않습니다.",
      description: "실제 Sell-through 데이터를 바탕으로 재고 상태를 확인하고, 재주문과 Product Mix를 지속적으로 최적화합니다.",
      defaultImage: assetConfig.storeShowcase.curationSection.src,
      chips: [
        { label: "WEEKLY UPDATE", desc: "간단한 재고 · 판매 현황 확인" },
        { label: "SMART REORDER", desc: "판매 데이터 기반 재주문 제안" },
        { label: "MIX OPTIMIZATION", desc: "잘 팔리는 상품 중심으로 구성 개선" }
      ]
    }
  ];

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

  const getActiveDisplayImage = () => {
    if (solutions[activeTab].key === "BUILD") {
      return assetConfig.displayFixtures[buildSize].src;
    }
    return solutions[activeTab].defaultImage;
  };

  return (
    <section
      id="solution"
      className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-16 sm:py-20 text-left relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 03 Header Narrative Section */}
      <div className="max-w-[720px] mb-12 flex flex-col gap-2.5">
        <span className="text-xs font-semibold text-accent tracking-[0.04em]">
          03 — K SELECT SOLUTION
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.25] text-white">
          우리가 가진 5가지 솔루션으로<br />
          리테일러의 문제를 해결합니다.
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          K Select는 제품 선정부터 디스플레이 · 운영 · 재고 최적화까지<br />
          하나로 연결된 시스템으로 리테일 성장을 지원합니다.
        </p>
      </div>

      {/* Main Grid: Left Orbit Wheel (43%), Right Panel (57%) */}
      <div className="grid lg:grid-cols-[0.43fr_0.57fr] gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Solution Wheel */}
        <div className="relative w-full max-w-[440px] aspect-square mx-auto flex items-center justify-center select-none">
          
          {/* Circular Track Line */}
          <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-[#2a2a2a] animate-[spin_120s_linear_infinite]" />
          
          {/* Central Hub Core */}
          <div className="absolute w-[36%] h-[36%] rounded-full bg-[#0c0c0c] border border-[#2a2a2a] flex flex-col items-center justify-center text-center shadow-2xl z-10 p-3">
            <svg className="w-6 h-6 text-[#ff2b75]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 000 20M12 2a14.5 14.5 0 010 20M2 12h20" />
            </svg>
            <span className="font-display text-[10px] font-black text-white mt-2 tracking-widest uppercase">
              K SELECT
            </span>
            <span className="font-display text-[8.5px] text-[#ff2b75] font-bold uppercase mt-0.5">
              SOLUTION
            </span>
          </div>

          {/* Node 01 - CURATE (Top / 0 deg) */}
          <button
            onClick={() => handleTabClick(0)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-[84px] sm:w-[96px] aspect-square rounded-full flex flex-col justify-center items-center text-center transition-all duration-300 focus:outline-none ${
              activeTab === 0 
                ? "bg-[#0c0c0c] border-2 border-[#ff2b75] text-[#ff2b75] shadow-[0_0_20px_rgba(255,43,117,0.4)] z-20 scale-110 opacity-100" 
                : "bg-[#111] border border-[#2a2a2a] text-text-secondary opacity-45 scale-95 hover:opacity-85 z-10"
            }`}
            style={{ top: "12%", left: "50%" }}
          >
            <svg className="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[9px] font-black tracking-wide leading-tight">01</span>
            <span className="text-[7.5px] font-bold tracking-wider uppercase mt-0.5">CURATE</span>
          </button>

          {/* Node 02 - DIFFERENTIATE (Top Right / 72 deg) */}
          <button
            onClick={() => handleTabClick(1)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-[84px] sm:w-[96px] aspect-square rounded-full flex flex-col justify-center items-center text-center transition-all duration-300 focus:outline-none ${
              activeTab === 1 
                ? "bg-[#0c0c0c] border-2 border-[#ff2b75] text-[#ff2b75] shadow-[0_0_20px_rgba(255,43,117,0.4)] z-20 scale-110 opacity-100" 
                : "bg-[#111] border border-[#2a2a2a] text-text-secondary opacity-45 scale-95 hover:opacity-85 z-10"
            }`}
            style={{ top: "34%", left: "86%" }}
          >
            <svg className="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-[9px] font-black tracking-wide leading-tight">02</span>
            <span className="text-[7.5px] font-bold tracking-wider uppercase mt-0.5">DIFF</span>
          </button>

          {/* Node 03 - BUILD (Bottom Right / 144 deg) */}
          <button
            onClick={() => handleTabClick(2)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-[84px] sm:w-[96px] aspect-square rounded-full flex flex-col justify-center items-center text-center transition-all duration-300 focus:outline-none ${
              activeTab === 2 
                ? "bg-[#0c0c0c] border-2 border-[#ff2b75] text-[#ff2b75] shadow-[0_0_20px_rgba(255,43,117,0.4)] z-20 scale-110 opacity-100" 
                : "bg-[#111] border border-[#2a2a2a] text-text-secondary opacity-45 scale-95 hover:opacity-85 z-10"
            }`}
            style={{ top: "74%", left: "73%" }}
          >
            <svg className="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-[9px] font-black tracking-wide leading-tight">03</span>
            <span className="text-[7.5px] font-bold tracking-wider uppercase mt-0.5">BUILD</span>
          </button>

          {/* Node 04 - SUPPORT (Bottom Left / 216 deg) */}
          <button
            onClick={() => handleTabClick(3)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-[84px] sm:w-[96px] aspect-square rounded-full flex flex-col justify-center items-center text-center transition-all duration-300 focus:outline-none ${
              activeTab === 3 
                ? "bg-[#0c0c0c] border-2 border-[#ff2b75] text-[#ff2b75] shadow-[0_0_20px_rgba(255,43,117,0.4)] z-20 scale-110 opacity-100" 
                : "bg-[#111] border border-[#2a2a2a] text-text-secondary opacity-45 scale-95 hover:opacity-85 z-10"
            }`}
            style={{ top: "74%", left: "27%" }}
          >
            <svg className="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-[9px] font-black tracking-wide leading-tight">04</span>
            <span className="text-[7.5px] font-bold tracking-wider uppercase mt-0.5">SUPPORT</span>
          </button>

          {/* Node 05 - OPTIMIZE (Top Left / 288 deg) */}
          <button
            onClick={() => handleTabClick(4)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-[84px] sm:w-[96px] aspect-square rounded-full flex flex-col justify-center items-center text-center transition-all duration-300 focus:outline-none ${
              activeTab === 4 
                ? "bg-[#0c0c0c] border-2 border-[#ff2b75] text-[#ff2b75] shadow-[0_0_20px_rgba(255,43,117,0.4)] z-20 scale-110 opacity-100" 
                : "bg-[#111] border border-[#2a2a2a] text-text-secondary opacity-45 scale-95 hover:opacity-85 z-10"
            }`}
            style={{ top: "34%", left: "14%" }}
          >
            <svg className="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span className="text-[9px] font-black tracking-wide leading-tight">05</span>
            <span className="text-[7.5px] font-bold tracking-wider uppercase mt-0.5">OPTIMIZE</span>
          </button>

          {/* Wheel Footer Nav */}
          <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <div className="flex items-center gap-4 text-[9px] text-text-secondary font-medium tracking-wide">
              <button 
                onClick={() => handleTabClick((activeTab - 1 + 5) % 5)}
                className="hover:text-white transition-colors"
              >
                ←
              </button>
              <span className="uppercase text-[8px] tracking-[0.08em] select-none">노드를 클릭하여 솔루션을 확인하세요.</span>
              <button 
                onClick={() => handleTabClick((activeTab + 1) % 5)}
                className="hover:text-white transition-colors"
              >
                →
              </button>
            </div>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((dotIndex) => (
                <span
                  key={dotIndex}
                  onClick={() => handleTabClick(dotIndex)}
                  className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                    activeTab === dotIndex ? "bg-[#ff2b75] w-3.5" : "bg-[#2a2a2a]"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Premium Swap Specs Details Panel (57% width on desktop, larger view) */}
        <div className="bg-[#0c0c0c] border border-[#ff2b75]/40 rounded-[24px] p-8 sm:p-10 shadow-2xl relative min-h-[520px] flex flex-col justify-between text-left transition-all duration-300">
          
          {/* Swapped content container with React key for trigger transition */}
          <div key={activeTab} className="flex flex-col gap-5.5 animate-fade-in">
            
            {/* Header Title info */}
            <div>
              <span className="text-[10px] text-accent tracking-[0.08em] font-black uppercase">
                {solutions[activeTab].number}
              </span>
              <h3 className="font-display text-3xl sm:text-[34px] font-black text-white leading-tight mb-1 mt-0.5">
                {solutions[activeTab].title}
              </h3>
              <h4 className="text-xs font-bold text-accent">
                {solutions[activeTab].subtitle} <span className="text-text-secondary font-medium text-[11px] ml-1">| {solutions[activeTab].englishSub}</span>
              </h4>
            </div>

            {/* Divider line */}
            <div className="border-b border-white/10 w-full" />

            {/* Split layout inside detail panel (Left text info, Right graphic showcase) */}
            <div className="grid sm:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
              
              {/* Left narrative text */}
              <div className="flex flex-col gap-3.5">
                <p className="text-sm sm:text-base text-white leading-relaxed font-bold">
                  {solutions[activeTab].mainCopy}
                </p>
                <p className="text-xs text-text-secondary leading-relaxed font-medium">
                  {solutions[activeTab].description}
                </p>
                
                {/* BUILD section size swapper button group */}
                {solutions[activeTab].key === "BUILD" && (
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex gap-2">
                      {(["4ft", "8ft", "12ft"] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setBuildSize(size)}
                          className={`px-3.5 py-1.5 rounded-[8px] text-[10px] font-black tracking-wider transition-all focus:outline-none ${
                            buildSize === size
                              ? "bg-[#ff2b75] text-white shadow-[0_0_10px_rgba(255,43,117,0.35)]"
                              : "bg-[#111] border border-[#2a2a2a] text-text-secondary hover:border-white/10"
                          }`}
                        >
                          {size.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    {/* Small button descriptors label matching user specs */}
                    <span className="text-[9px] text-text-muted mt-1">
                      {buildSize === "4ft" && "Starter / 1 Module"}
                      {buildSize === "8ft" && "Growth / 2 Modules"}
                      {buildSize === "12ft" && "Destination / 3 Modules"}
                    </span>
                  </div>
                )}
              </div>

              {/* Right graphical image or mini dashboard block */}
              <div className="relative w-full aspect-square rounded-[20px] overflow-hidden border border-[#2a2a2a] bg-[#111] shadow-lg flex items-center justify-center">
                
                {/* OPTIMIZE: Custom simplified visual dashboard display 복제 */}
                {solutions[activeTab].key === "OPTIMIZE" ? (
                  <div className="absolute inset-0 p-4 flex flex-col justify-between text-left select-none bg-[#0c0c0c] border border-white/5 rounded-[20px]">
                    
                    {/* 1. SELL-THROUGH (7D) 막대 그래프 */}
                    <div className="bg-[#111] border border-white/5 rounded-[12px] p-2.5 shadow-md flex-1 flex flex-col justify-between">
                      <span className="text-[7px] text-text-secondary uppercase tracking-widest font-black block mb-1">SELL-THROUGH (7D)</span>
                      
                      <div className="flex-1 flex items-end justify-between gap-1.5 px-1 relative h-12">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                          <div className="border-t border-white w-full" />
                          <div className="border-t border-white w-full" />
                          <div className="border-t border-white w-full" />
                        </div>

                        {/* Bars matching SOLUTION-05 chart */}
                        <div className="flex flex-col items-center gap-1 w-full">
                          <div className="bg-[#ff2b75] w-2 rounded-t-[2px]" style={{ height: "40px" }} />
                          <span className="text-[5.5px] text-text-muted">W1</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 w-full">
                          <div className="bg-[#ff2b75] w-2 rounded-t-[2px]" style={{ height: "30px" }} />
                          <span className="text-[5.5px] text-text-muted">W2</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 w-full">
                          <div className="bg-[#ff2b75] w-2 rounded-t-[2px]" style={{ height: "48px" }} />
                          <span className="text-[5.5px] text-text-muted">W3</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 w-full">
                          <div className="bg-[#ff2b75] w-2 rounded-t-[2px]" style={{ height: "20px" }} />
                          <span className="text-[5.5px] text-text-muted">W4</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 w-full">
                          <div className="bg-[#ff2b75] w-2 rounded-t-[2px]" style={{ height: "35px" }} />
                          <span className="text-[5.5px] text-text-muted">W5</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 w-full">
                          <div className="bg-[#ff2b75] w-2 rounded-t-[2px]" style={{ height: "15px" }} />
                          <span className="text-[5.5px] text-text-muted">W6</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 2. REORDER RECOMMENDATION 위젯 */}
                    <div className="bg-[#111] border border-[#ff2b75]/35 rounded-[12px] p-2.5 my-2 shadow-md relative z-10 flex flex-col justify-between">
                      <span className="text-[7px] text-text-secondary uppercase tracking-widest font-black block mb-0.5">REORDER RECOMMENDATION</span>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex flex-col">
                          <span className="text-[6.5px] text-text-muted">SKU-1023</span>
                          <span className="text-[8px] text-white font-bold">재주문 수량 제안</span>
                        </div>
                        <span className="text-sm font-black text-accent">240 EA</span>
                      </div>
                      <div className="mt-2 flex items-center justify-center border border-[#ff2b75]/50 bg-[#ff2b75]/5 rounded-full py-0.5 text-[6.5px] text-[#ff2b75] font-black uppercase select-none">
                        ✓ REORDER NOW
                      </div>
                    </div>

                    {/* 3. PRODUCT MIX ADJUSTMENT 원형 도넛 차트 위젯 */}
                    <div className="bg-[#111] border border-white/5 rounded-[12px] p-2.5 shadow-md flex flex-col justify-between">
                      <span className="text-[7px] text-text-secondary uppercase font-bold block mb-1">PRODUCT MIX ADJUSTMENT</span>
                      <div className="flex items-center justify-around gap-2 py-1">
                        
                        {/* BEFORE Donut */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="relative w-7 h-7 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#222" strokeWidth="4" />
                              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ff2b75" strokeWidth="4" strokeDasharray="30 70" />
                            </svg>
                            <span className="absolute text-[6.5px] font-black text-white">30%</span>
                          </div>
                          <span className="text-[6px] text-text-secondary uppercase font-bold">BEFORE</span>
                        </div>

                        {/* Arrow connector */}
                        <span className="text-text-secondary text-[10px]">➔</span>

                        {/* AFTER Donut */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="relative w-7 h-7 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#222" strokeWidth="4" />
                              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ff2b75" strokeWidth="4" strokeDasharray="60 40" />
                            </svg>
                            <span className="absolute text-[6.5px] font-black text-white">60%</span>
                          </div>
                          <span className="text-[6px] text-[#ff2b75] uppercase font-bold">AFTER</span>
                        </div>

                      </div>
                    </div>

                  </div>
                ) : (
                  // Regular Premium Showcase Images
                  <Image
                    key={solutions[activeTab].key === "BUILD" ? buildSize : activeTab}
                    src={getActiveDisplayImage()}
                    alt={`${solutions[activeTab].title} Showcase`}
                    fill
                    className="object-cover transition-opacity duration-300 animate-fade-in"
                    sizes="(max-width: 640px) 100vw, 30vw"
                    priority
                  />
                )}
              </div>

            </div>

          </div>

          {/* Bottom 3 Points matching 마스터 디자인 */}
          <div className="grid grid-cols-3 gap-3 border-t border-[#2a2a2a] mt-8 pt-6">
            {solutions[activeTab].chips.map((chip, index) => (
              <div key={index} className="flex flex-col gap-1 text-left">
                <span className="text-[9px] text-[#ff2b75] uppercase tracking-widest font-black">
                  {chip.label}
                </span>
                <p className="margin-0 text-[10px] text-text-secondary leading-normal font-medium">
                  {chip.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Bottom Explore Deep Dive Navigation Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#2a2a2a] overflow-hidden rounded-[16px] mt-16 border border-[#2a2a2a] shadow-lg">
        
        {/* Left header cell */}
        <div className="bg-[#0c0c0c] p-6 flex flex-col justify-center text-left">
          <div className="flex items-center gap-2 text-[9px] text-[#ff2b75] font-black uppercase mb-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
            DEEP DIVE
          </div>
          <h4 className="text-xs font-bold text-white leading-normal">
            다음 섹션에서 3가지 핵심 솔루션을<br />자세히 소개합니다.
          </h4>
        </div>

        {/* 01 Curated Product Mix */}
        <a 
          href="#products" 
          className="bg-[#0c0c0c] hover:bg-[#111] p-6 flex items-center justify-between text-left transition-colors duration-200 group focus:outline-none"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-[#ff2b75] tracking-widest font-bold">01</span>
            <span className="text-xs font-bold text-white group-hover:text-accent transition-colors">
              Curated Product Mix
            </span>
          </div>
          <svg className="w-4 h-4 text-text-secondary group-hover:text-accent transition-all transform group-hover:translate-x-1 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>

        {/* 02 Store-in-a-Store */}
        <a 
          href="#display" 
          className="bg-[#0c0c0c] hover:bg-[#111] p-6 flex items-center justify-between text-left transition-colors duration-200 group focus:outline-none"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-[#ff2b75] tracking-widest font-bold">02</span>
            <span className="text-xs font-bold text-white group-hover:text-accent transition-colors">
              Store-in-a-Store
            </span>
          </div>
          <svg className="w-4 h-4 text-text-secondary group-hover:text-accent transition-all transform group-hover:translate-x-1 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>

        {/* 03 90-Day Exchange Credit */}
        <a 
          href="#exchange-credit" 
          className="bg-[#0c0c0c] hover:bg-[#111] p-6 flex items-center justify-between text-left transition-colors duration-200 group focus:outline-none"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-[#ff2b75] tracking-widest font-bold">03</span>
            <span className="text-xs font-bold text-white group-hover:text-accent transition-colors">
              90-Day Exchange Credit
            </span>
          </div>
          <svg className="w-4 h-4 text-text-secondary group-hover:text-accent transition-all transform group-hover:translate-x-1 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>

      </div>

    </section>
  );
}
