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
  description: string;
  description2?: string;
  chips: { label: string; desc: string }[];
  defaultImage: string;
}

export default function SolutionSection() {
  const [activeTab, setActiveTab] = useState(0); // 0 to 4 (CURATE to OPTIMIZE)
  const [buildSize, setBuildSize] = useState<"4ft" | "8ft" | "12ft">("12ft");
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // 5 Solutions Data definition matching DC finalized copy
  const solutions: SolutionItem[] = [
    {
      id: 0,
      key: "CURATE",
      number: "01",
      title: "CURATE",
      subtitle: "검증된 제품 선별",
      englishSub: "Curated Product Mix",
      description: "모든 K-뷰티 제품이 K Select에 포함되지는 않습니다.",
      description2: "엄격한 기준으로 품질, 마진, 시장 적합성을 종합적으로 검토하여 가장 경쟁력 있는 제품만을 선별합니다.",
      defaultImage: assetConfig.storeShowcase.curationSection.src,
      chips: [
        { label: "Quality", desc: "엄격한 품질 기준 검증" },
        { label: "Margin", desc: "지속 가능한 마진 구조" },
        { label: "U.S. Market Fit", desc: "미국 시장 트렌드 & 규제 적합성 검토" }
      ]
    },
    {
      id: 1,
      key: "DIFFERENTIATE",
      number: "02",
      title: "DIFFERENTIATE",
      subtitle: "차별화된 상품 구성",
      englishSub: "Differentiated Assortment",
      description: "K Select는 단순히 인기 상품을 모으는 것이 아니라, 가격 경쟁을 넘어설 수 있는 매장 맞춤형 상품 구성을 제안합니다.",
      description2: "카테고리 역할, 가격대, 지역 고객 니즈를 균형 있게 반영하여 매장만의 경쟁력을 높여드립니다.",
      defaultImage: assetConfig.storeShowcase.curationSection.src,
      chips: [
        { label: "Differentiation", desc: "가격 경쟁에서 벗어나는 구성" },
        { label: "Price Point Balance", desc: "마진과 가격대 균형" },
        { label: "Store Fit", desc: "매장 고객 맞춤 구성" }
      ]
    },
    {
      id: 2,
      key: "BUILD",
      number: "03",
      title: "BUILD",
      subtitle: "Store-in-Store 디스플레이",
      englishSub: "Right Display",
      description: "4FT / 8FT / 12FT 모듈형 디스플레이 옵션으로 매장 내 K-Beauty 카테고리를 눈에 띄게 구축할 수 있도록 돕습니다.",
      description2: "브랜드 가시성을 높이고, 쇼핑 경험과 전환율을 함께 향상시킵니다.",
      defaultImage: assetConfig.displayFixtures["12ft"].src, // Fallback, will swap
      chips: [
        { label: "Visibility", desc: "카테고리 가시성 강화" },
        { label: "Modular Format", desc: "매장 규모별 선택" },
        { label: "Store-in-Store", desc: "전문 섹션 구축" }
      ]
    },
    {
      id: 3,
      key: "SUPPORT",
      number: "04",
      title: "SUPPORT",
      subtitle: "교육 · 매장운영지원",
      englishSub: "Retail-Ready Support",
      description: "K Select는 제품 공급을 넘어, 매장의 실행력을 높이는 실질적인 지원을 제공합니다.",
      description2: "QR 기반 제품 정보 제공, 직원 교육, 진열 가이드, 운영 지원을 통해 매장의 성공적인 운영을 함께 만들어갑니다.",
      defaultImage: assetConfig.storeShowcase.partnershipSection.src,
      chips: [
        { label: "QR Info", desc: "제품 정보 즉시 확인" },
        { label: "Staff Training", desc: "직원 교육 지원" },
        { label: "Merchandising", desc: "매장 운영 준비" }
      ]
    },
    {
      id: 4,
      key: "OPTIMIZE",
      number: "05",
      title: "OPTIMIZE",
      subtitle: "재고 · 재주문 · 매출 최적화",
      englishSub: "Inventory & Growth Optimization",
      description: "K Select는 판매 데이터 기반으로 슬로우셀러 리스크를 줄이고, 더 정확한 재주문과 수익성 향상을 지원합니다.",
      description2: "셀스루 데이터 분석, 스마트 재주문 지원, 제품 믹스 조정으로 효율적인 재고 운영과 지속 가능한 매출 성장을 실현합니다.",
      defaultImage: assetConfig.storeShowcase.curationSection.src,
      chips: [
        { label: "Weekly Update", desc: "주 1회 재고 업데이트" },
        { label: "Smart Reorder", desc: "데이터 기반 재주문" },
        { label: "Mix Optimization", desc: "Product Mix 조정" }
      ]
    }
  ];

  // 4.5s Auto-rolling tab sequence logic
  useEffect(() => {
    // Skip if prefers-reduced-motion is active
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
      className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px] text-left relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 03 Header Narrative */}
      <div className="max-w-[640px] mb-16 flex flex-col gap-3">
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

      {/* Main Interactive Grid Layout */}
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-[64px] items-center">
        
        {/* Left Column: Interactive Orbit Loop (Orbit Ring) */}
        <div className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center select-none">
          
          {/* Circular dotted dashed track */}
          <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-[#2a2a2a] animate-[spin_100s_linear_infinite]" />
          
          {/* Central Logo Hub */}
          <div className="absolute w-[36%] h-[36%] rounded-full bg-[#0c0c0c] border border-[#2a2a2a] flex flex-col items-center justify-center text-center shadow-2xl z-10 p-3">
            <svg className="w-8 h-8 text-[#ff2b75]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V3m0 18a9 9 0 009-9M12 3a9 9 0 00-9 9m9-9a9 9 0 019 9m-9-9a9 9 0 00-9 9m9 9c1.656 0 3-4.03 3-9s-1.344-9-3-9m0 18c-1.656 0-3-4.03-3-9s1.344-9 3-9m-9 9h18" />
            </svg>
            <span className="font-display text-[10px] sm:text-[11px] font-black text-white mt-2 tracking-widest uppercase">
              K Select
            </span>
            <span className="font-display text-[9px] text-[#ff2b75] font-semibold uppercase">
              Solution
            </span>
          </div>

          {/* Orbit Button 01 - CURATE (Top / 0 deg) */}
          <button
            onClick={() => handleTabClick(0)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-[76px] sm:w-[88px] aspect-square rounded-full flex flex-col justify-center items-center text-center transition-all duration-300 focus:outline-none ${
              activeTab === 0 
                ? "bg-[#0c0c0c] border-2 border-[#ff2b75] text-[#ff2b75] shadow-[0_0_15px_rgba(255,43,117,0.3)] z-20 scale-105" 
                : "bg-[#111] border border-[#2a2a2a] text-text-secondary hover:border-white/20 z-10"
            }`}
            style={{ top: "12%", left: "50%" }}
          >
            <svg className="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-[9px] font-black tracking-wide">01 CURATE</span>
          </button>

          {/* Orbit Button 02 - DIFFERENTIATE (Top Right / 72 deg) */}
          <button
            onClick={() => handleTabClick(1)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-[76px] sm:w-[88px] aspect-square rounded-full flex flex-col justify-center items-center text-center transition-all duration-300 focus:outline-none ${
              activeTab === 1 
                ? "bg-[#0c0c0c] border-2 border-[#ff2b75] text-[#ff2b75] shadow-[0_0_15px_rgba(255,43,117,0.3)] z-20 scale-105" 
                : "bg-[#111] border border-[#2a2a2a] text-text-secondary hover:border-white/20 z-10"
            }`}
            style={{ top: "33%", left: "85%" }}
          >
            <svg className="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span className="text-[9px] font-black tracking-wide">02 DIFF</span>
          </button>

          {/* Orbit Button 03 - BUILD (Bottom Right / 144 deg) */}
          <button
            onClick={() => handleTabClick(2)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-[76px] sm:w-[88px] aspect-square rounded-full flex flex-col justify-center items-center text-center transition-all duration-300 focus:outline-none ${
              activeTab === 2 
                ? "bg-[#0c0c0c] border-2 border-[#ff2b75] text-[#ff2b75] shadow-[0_0_15px_rgba(255,43,117,0.3)] z-20 scale-105" 
                : "bg-[#111] border border-[#2a2a2a] text-text-secondary hover:border-white/20 z-10"
            }`}
            style={{ top: "74%", left: "72%" }}
          >
            <svg className="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-[9px] font-black tracking-wide">03 BUILD</span>
          </button>

          {/* Orbit Button 04 - SUPPORT (Bottom Left / 216 deg) */}
          <button
            onClick={() => handleTabClick(3)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-[76px] sm:w-[88px] aspect-square rounded-full flex flex-col justify-center items-center text-center transition-all duration-300 focus:outline-none ${
              activeTab === 3 
                ? "bg-[#0c0c0c] border-2 border-[#ff2b75] text-[#ff2b75] shadow-[0_0_15px_rgba(255,43,117,0.3)] z-20 scale-105" 
                : "bg-[#111] border border-[#2a2a2a] text-text-secondary hover:border-white/20 z-10"
            }`}
            style={{ top: "74%", left: "28%" }}
          >
            <svg className="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-[9px] font-black tracking-wide">04 SUPPORT</span>
          </button>

          {/* Orbit Button 05 - OPTIMIZE (Top Left / 288 deg) */}
          <button
            onClick={() => handleTabClick(4)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-[76px] sm:w-[88px] aspect-square rounded-full flex flex-col justify-center items-center text-center transition-all duration-300 focus:outline-none ${
              activeTab === 4 
                ? "bg-[#0c0c0c] border-2 border-[#ff2b75] text-[#ff2b75] shadow-[0_0_15px_rgba(255,43,117,0.3)] z-20 scale-105" 
                : "bg-[#111] border border-[#2a2a2a] text-text-secondary hover:border-white/20 z-10"
            }`}
            style={{ top: "33%", left: "15%" }}
          >
            <svg className="w-4 h-4 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-[9px] font-black tracking-wide">05 OPTIMIZE</span>
          </button>

          {/* Outer Ring Arrows & Indicator Dots */}
          <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-10">
            <div className="flex items-center gap-6 text-[10px] text-text-secondary font-medium tracking-wide">
              <button 
                onClick={() => handleTabClick((activeTab - 1 + 5) % 5)}
                className="hover:text-white transition-colors"
                aria-label="Previous solution tab"
              >
                ←
              </button>
              <span className="uppercase text-[9px] tracking-[0.08em]">좌/우로 슬라이드하여 탐색</span>
              <button 
                onClick={() => handleTabClick((activeTab + 1) % 5)}
                className="hover:text-white transition-colors"
                aria-label="Next solution tab"
              >
                →
              </button>
            </div>
            {/* Sliding pagination dots */}
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((dotIndex) => (
                <span
                  key={dotIndex}
                  onClick={() => handleTabClick(dotIndex)}
                  className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                    activeTab === dotIndex ? "bg-[#ff2b75] w-3" : "bg-[#2a2a2a]"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Premium Swap Specs Details Panel */}
        <div className="bg-[#0c0c0c] border border-[#ff2b75]/40 rounded-[20px] p-8 sm:p-9 shadow-2xl relative min-h-[480px] flex flex-col justify-between text-left transition-all duration-300">
          
          {/* Swapped content transitions container */}
          <div key={activeTab} className="flex flex-col gap-6 animate-fade-in">
            
            {/* Header info */}
            <div>
              <span className="text-[10px] text-accent tracking-[0.08em] font-black uppercase">
                {solutions[activeTab].number}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight mb-1 mt-0.5">
                {solutions[activeTab].title}
              </h3>
              <h4 className="text-sm font-bold text-[#ff2b75]">
                {solutions[activeTab].subtitle} <span className="text-text-secondary font-medium">| {solutions[activeTab].englishSub}</span>
              </h4>
            </div>

            {/* Split layout inside detail panel (Left text info, Right graphic showcase) */}
            <div className="grid sm:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
              
              {/* Left narrative inside details */}
              <div className="flex flex-col gap-3">
                <p className="text-xs sm:text-sm text-white leading-relaxed font-bold">
                  {solutions[activeTab].description}
                </p>
                {solutions[activeTab].description2 && (
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {solutions[activeTab].description2}
                  </p>
                )}
                
                {/* BUILD section size swapper button group */}
                {solutions[activeTab].key === "BUILD" && (
                  <div className="flex gap-2.5 mt-2">
                    {(["4ft", "8ft", "12ft"] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setBuildSize(size)}
                        className={`px-3 py-1.5 rounded-[8px] text-[10px] font-black tracking-wider transition-all focus:outline-none ${
                          buildSize === size
                            ? "bg-[#ff2b75] text-white shadow-[0_0_10px_rgba(255,43,117,0.3)]"
                            : "bg-[#111] border border-[#2a2a2a] text-text-secondary hover:border-white/10"
                        }`}
                      >
                        {size.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right graphical image or mini dashboard block */}
              <div className="relative w-full aspect-square rounded-[16px] overflow-hidden border border-[#2a2a2a] bg-[#111] shadow-lg flex items-center justify-center">
                
                {/* OPTIMIZE: Custom simplified visual dashboard display */}
                {solutions[activeTab].key === "OPTIMIZE" ? (
                  <div className="absolute inset-0 p-4 flex flex-col justify-between text-left select-none bg-[#111]">
                    {/* Sell-Through Analysis mini card */}
                    <div className="bg-[#0c0c0c] border border-[#2a2a2a] rounded-[10px] p-2.5 shadow-md transform -translate-y-1 scale-95 origin-top-left transition-transform duration-300">
                      <span className="text-[8px] text-text-secondary uppercase tracking-widest font-bold">Sell-Through Rate</span>
                      <div className="flex items-baseline justify-between gap-2 mt-1">
                        <span className="font-display text-sm font-black text-accent">78%</span>
                        <span className="text-[7px] text-[#10b981] font-bold">+14% vs Prev</span>
                      </div>
                    </div>
                    
                    {/* Reorder Recommendation mini card */}
                    <div className="bg-[#0c0c0c] border border-[#2a2a2a] rounded-[10px] p-2.5 shadow-md w-[80%] mx-auto z-10 relative">
                      <span className="text-[8px] text-text-secondary uppercase tracking-widest font-bold">Reorder Recommendation</span>
                      <div className="flex items-center gap-1.5 justify-between mt-1 text-[7px] text-text-secondary font-semibold">
                        <span>Cream A</span>
                        <span className="text-accent border border-[#ff2b75]/20 px-1 py-0.5 rounded bg-[#ff2b75]/5">Reorder 120 Units</span>
                      </div>
                    </div>

                    {/* Product Mix Insight mini donut chart */}
                    <div className="bg-[#0c0c0c] border border-[#2a2a2a] rounded-[10px] p-2.5 shadow-md transform translate-y-1 scale-95 origin-bottom-right transition-transform duration-300 ml-auto w-[65%]">
                      <span className="text-[7px] text-text-secondary uppercase font-bold">Mix Insight</span>
                      <div className="flex items-center gap-2 mt-1">
                        {/* Tiny circular donut */}
                        <div className="w-5 h-5 rounded-full border-[3.5px] border-[#222] border-t-accent shrink-0" />
                        <div className="flex flex-col text-[6px] text-text-muted">
                          <span>High Performer: 65%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular Showcase Images
                  <Image
                    src={getActiveDisplayImage()}
                    alt={`${solutions[activeTab].title} Visual Details`}
                    fill
                    className="object-cover transition-opacity duration-300"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                )}
              </div>

            </div>

          </div>

          {/* Bottom 3 Detailed Attribute Chips */}
          <div className="grid grid-cols-3 gap-3 border-t border-[#2a2a2a] mt-8 pt-6">
            {solutions[activeTab].chips.map((chip, index) => (
              <div key={index} className="flex flex-col gap-1 text-left">
                <span className="text-[9px] text-accent uppercase tracking-widest font-black">
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

      {/* Bottom Solution Next section link panels */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[#2a2a2a] overflow-hidden rounded-[12px] mt-16 border border-[#2a2a2a]">
        
        {/* Left header cell */}
        <div className="bg-[#0c0c0c] p-6 flex flex-col justify-center text-left">
          <div className="flex items-center gap-2 text-[10px] text-[#ff2b75] font-black uppercase mb-1">
            <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Deep Dive
          </div>
          <h4 className="text-xs font-bold text-white leading-normal">
            다음 섹션에서 3가지 핵심 솔루션을 자세히 소개합니다.
          </h4>
        </div>

        {/* 01 Curated Product Mix */}
        <a 
          href="#products" 
          className="bg-[#0c0c0c] hover:bg-[#111] p-6 flex items-center justify-between text-left transition-colors duration-200 group focus:outline-none"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-text-secondary tracking-widest font-bold">01</span>
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
            <span className="text-[9px] text-text-secondary tracking-widest font-bold">02</span>
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
            <span className="text-[9px] text-text-secondary tracking-widest font-bold">03</span>
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
