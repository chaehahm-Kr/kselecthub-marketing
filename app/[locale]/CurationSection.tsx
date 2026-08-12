"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CategoryData {
  nameKo: string;
  nameEn: string;
  image: string;
  items: string[];
  tags: string[];
}

export default function CurationSection() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const categories: CategoryData[] = [
    {
      nameKo: "스킨케어",
      nameEn: "Skincare",
      image: "/images/solutions/curation_skincare.jpg",
      items: ["클렌징", "토너·미스트", "에센스·세럼", "앰플", "모이스처라이저", "선케어", "마스크", "패치", "아이케어"],
      tags: ["Balanced Core", "Essential Mix", "Price Fit"]
    },
    {
      nameKo: "헤어케어",
      nameEn: "Hair Care",
      image: "/images/solutions/curation_haircare.jpg",
      items: ["샴푸·클렌징", "컨디셔너", "트리트먼트", "스칼프 케어", "스타일링", "헤어 에센스", "헤어 컬러"],
      tags: ["Premium Tier", "Essential Mix", "Margin Focus"]
    },
    {
      nameKo: "메이크업",
      nameEn: "Makeup",
      image: "/images/solutions/curation_makeup.jpg",
      items: ["베이스 메이크업", "페이스 컬러", "아이 메이크업", "아이브로우", "립 메이크업"],
      tags: ["Trend Selection", "Price Fit", "Balanced Core"]
    },
    {
      nameKo: "바디케어",
      nameEn: "Body Care",
      image: "/images/solutions/curation_bodycare.jpg",
      items: ["바디 클렌징", "바디 모이스처라이저", "각질 케어", "핸드·풋 케어", "데오도란트"],
      tags: ["Essential Mix", "Price Fit", "Margin Focus"]
    },
    {
      nameKo: "퍼스널케어",
      nameEn: "Personal Care",
      image: "/images/solutions/curation_personalcare.jpg",
      items: ["오럴 케어", "여성 위생", "남성 그루밍", "쉐이빙", "위생 케어"],
      tags: ["Balanced Core", "Essential Mix", "Price Fit"]
    },
    {
      nameKo: "뷰티 툴",
      nameEn: "Beauty Tools",
      image: "/images/solutions/curation_beautytools.jpg",
      items: ["페이스 툴", "메이크업 툴", "헤어 툴", "바디 툴", "보관·액세서리"],
      tags: ["Trend Selection", "Premium Tier", "Margin Focus"]
    }
  ];

  // 4.5s Auto Rolling sequence
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || isHovered) {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      return;
    }

    autoPlayTimer.current = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % categories.length);
    }, 4500);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isHovered, categories.length]);

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCategoryClick(index);
    }
  };

  return (
    <section
      id="products"
      className="w-full bg-[#141414] border-y border-[#2a2a2a] select-none text-left font-sans"
      style={{ fontFamily: "'Pretendard', -apple-system, sans-serif" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container aligning exact content widths with outer margin rhythms */}
      <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px]">
        
        {/* Main Grid: items-stretch synchronizes heights of left content and right showcase perfectly */}
        <div className="grid lg:grid-cols-[0.43fr_0.57fr] gap-12 items-stretch">
          
          {/* ================= LEFT COLUMN: Narrative & Category Switcher ================= */}
          <div className="flex flex-col justify-between gap-6">
            
            {/* Upper text block */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-black text-[#ff2b75] tracking-[0.08em] uppercase">
                04 — PRODUCT CURATION
              </span>
              <h2 className="font-display text-3xl sm:text-[38px] font-bold leading-[1.25] text-white my-2 tracking-tight">
                모든 제품을 공급하지 않습니다.<br />
                당신의 매장에 맞는 제품을 큐레이션합니다.
              </h2>
              <p className="text-[13.5px] text-[#9ca3af] leading-relaxed max-w-xl my-2 font-medium">
                전문가의 검토와 테스트를 거쳐 선별된 상품 풀을 기반으로, 매장의 고객 특성, 가격대, 판매 환경에 가장 적합한 K-Beauty 제품을 큐레이션합니다.
              </p>

              {/* Core Selection Standards Tags */}
              <div className="flex flex-wrap gap-2.5 my-3">
                {[
                  "Performance · 상품 경쟁력",
                  "Store Fit · 매장 적합성",
                  "Price Fit · 적정 가격",
                  "Retail Margin · 리테일 마진",
                  "Store Profile Match · 매장 특성 반영"
                ].map((std) => (
                  <span
                    key={std}
                    className="text-[11px] font-bold text-[#FAFAFA] border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 bg-[#0c0c0c]/30"
                  >
                    <svg className="w-3 h-3 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {std}
                  </span>
                ))}
              </div>
            </div>

            {/* Category Button grid - Bottom aligns with showcase bottom */}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat, index) => (
                  <button
                    key={cat.nameEn}
                    onClick={() => handleCategoryClick(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-[12px] border transition-all duration-300 focus:outline-none cursor-pointer group text-left ${
                      activeCategory === index
                        ? "border-[#ff2b75] bg-[#0c0c0c] shadow-[0_0_15px_rgba(255,43,117,0.15)]"
                        : "border-white/10 bg-[#0A0A0A]/40 hover:border-white/20"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-[12.5px] font-bold transition-colors ${activeCategory === index ? "text-white" : "text-[#FAFAFA]"}`}>
                        {cat.nameKo}
                      </span>
                      <span className="text-[9.5px] font-bold text-[#7A7A7A] tracking-wider uppercase font-display">
                        {cat.nameEn}
                      </span>
                    </div>
                    <span className={`text-xs font-bold transition-transform group-hover:translate-x-0.5 ${activeCategory === index ? "text-[#ff2b75]" : "text-[#7A7A7A]"}`}>
                      ➔
                    </span>
                  </button>
                ))}
              </div>

              {/* Closing Message */}
              <div className="flex items-center gap-2 text-[11px] text-[#7A7A7A] font-semibold pl-1 mt-1">
                <svg className="w-3.5 h-3.5 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                <span>복잡한 상품 선정은 K SELECT HUB가 맡고, 리테일러는 판매와 성장에 집중합니다.</span>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: Premium Full-Image Curation Showcase ================= */}
          <div className="relative rounded-[24px] border border-white/10 bg-[#0c0c0c] shadow-2xl flex flex-col justify-between overflow-hidden p-8 sm:p-10 min-h-[480px]">
            
            {/* Showcase Background Image: Full sized background visual (High Opacity, Clear Central Visibility) */}
            <div className="absolute inset-0 z-0">
              {categories.map((cat, index) => (
                <div
                  key={cat.nameEn}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeCategory === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={cat.image}
                    alt={`${cat.nameKo} Curation Visual`}
                    fill
                    className="object-cover opacity-[0.84] transition-transform duration-700 hover:scale-102"
                    sizes="45vw"
                    priority={index === 0}
                  />
                </div>
              ))}
              {/* Premium dark gradient overlay: Clear in center, shading only top and bottom for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/82 via-transparent to-[#0c0c0c]/90 z-10 pointer-events-none" />
            </div>

            {/* Top header labels overlay (z-20) */}
            <div className="relative z-20 flex justify-between items-center w-full bg-black/40 backdrop-blur-sm border border-white/5 rounded-[12px] p-4.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#ff2b75] tracking-widest font-black uppercase">
                  ACTIVE SHOWCASE
                </span>
                <span className="text-[9px] text-[#FAFAFA]/70 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-[4px] font-bold tracking-wide uppercase font-display">
                  {categories[activeCategory].nameEn}
                </span>
              </div>
              <span className="text-[9.5px] text-[#FAFAFA]/70 font-bold tracking-wider">
                Store-fit Curation Applied
              </span>
            </div>

            {/* Center Area: Left Empty intentionally to allow clear visibility of center products */}
            <div className="flex-1 min-h-[140px] pointer-events-none" />

            {/* Bottom Combined Panel (z-20): Core items and strategy metrics grouped clean at the bottom */}
            <div className="relative z-20 bg-black/60 backdrop-blur-md border border-white/10 rounded-[18px] p-5 flex flex-col gap-4 text-left">
              
              {/* 1. 핵심 제품군 (2Depth Items) */}
              <div className="flex flex-col gap-2">
                <span className="text-[9.5px] text-[#ff2b75] font-black uppercase tracking-[0.12em] block">
                  {categories[activeCategory].nameKo} 핵심 제품군
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {categories[activeCategory].items.map((item) => (
                    <span
                      key={item}
                      className="text-[10.5px] font-bold text-white/95 bg-white/5 border border-white/15 px-2.5 py-1 rounded-[6px] tracking-tight"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 w-full" />

              {/* 2. Recommended Curation Strategy */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] text-[#FAFAFA]/50 tracking-widest font-black uppercase">
                  RECOMMENDED CURATION STRATEGY
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {categories[activeCategory].tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9.5px] font-bold text-[#ff2b75] bg-[#ff2b75]/8 border border-[#ff2b75]/20 px-2.5 py-0.5 rounded-[4px] tracking-wide"
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
