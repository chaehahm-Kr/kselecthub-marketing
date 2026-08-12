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
      image: "/images/solutions/curate.png",
      items: ["클렌징", "토너·미스트", "에센스·세럼", "앰플", "모이스처라이저", "선케어", "마스크", "패치", "아이케어"],
      tags: ["Balanced Core", "Essential Mix", "Price Fit"]
    },
    {
      nameKo: "헤어케어",
      nameEn: "Hair Care",
      image: "/images/solutions/differentiate.png",
      items: ["샴푸·클렌징", "컨디셔너", "트리트먼트", "스칼프 케어", "스타일링", "헤어 에센스", "헤어 컬러"],
      tags: ["Premium Tier", "Essential Mix", "Margin Focus"]
    },
    {
      nameKo: "메이크업",
      nameEn: "Makeup",
      image: "/images/solutions/support.png",
      items: ["베이스 메이크업", "페이스 컬러", "아이 메이크업", "아이브로우", "립 메이크업"],
      tags: ["Trend Selection", "Price Fit", "Balanced Core"]
    },
    {
      nameKo: "바디케어",
      nameEn: "Body Care",
      image: "/images/solutions/curate.png",
      items: ["바디 클렌징", "바디 모이스처라이저", "각질 케어", "핸드·풋 케어", "데오도란트"],
      tags: ["Essential Mix", "Price Fit", "Margin Focus"]
    },
    {
      nameKo: "퍼스널케어",
      nameEn: "Personal Care",
      image: "/images/solutions/differentiate.png",
      items: ["오럴 케어", "여성 위생", "남성 그루밍", "쉐이빙", "위생 케어"],
      tags: ["Balanced Core", "Essential Mix", "Price Fit"]
    },
    {
      nameKo: "뷰티 툴",
      nameEn: "Beauty Tools",
      image: "/images/solutions/support.png",
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
      <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px] grid lg:grid-cols-[0.45fr_0.55fr] gap-14 items-center">
        
        {/* ================= LEFT COLUMN: Narrative & Category Switcher ================= */}
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

          {/* Core Selection Standards Tags (Visual check icons list) */}
          <div className="flex flex-wrap gap-2 my-4">
            {[
              "Performance · 상품 경쟁력",
              "Store Fit · 매장 적합성",
              "Price Fit · 적정 가격",
              "Retail Margin · 리테일 마진",
              "Store Profile Match · 매장 특성 반영"
            ].map((std) => (
              <span
                key={std}
                className="text-[11.5px] font-semibold text-[#FAFAFA] border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 bg-[#0A0A0A]/30"
              >
                <svg className="w-3.5 h-3.5 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {std}
              </span>
            ))}
          </div>

          <div className="border-t border-white/10 my-4 w-full" />

          {/* 6 Category Interactive Button grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-2">
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
          <div className="flex items-center gap-2 text-[11px] text-[#7A7A7A] font-semibold mt-8 pl-1">
            <svg className="w-3.5 h-3.5 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
            <span>복잡한 상품 선정은 K SELECT HUB가 맡고, 리테일러는 판매와 성장에 집중합니다.</span>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: Interactive Showcase Panel ================= */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-[24px] p-8 sm:p-10 shadow-2xl relative min-h-[480px] flex flex-col justify-between overflow-hidden">
          
          <div className="flex flex-col gap-6">
            
            {/* Showcase Header displaying active category and meta tag */}
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#ff2b75] tracking-widest font-black uppercase">
                  ACTIVE SHOWCASE
                </span>
                <span className="text-[9px] text-[#FAFAFA]/70 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-[4px] font-bold tracking-wide uppercase font-display">
                  {categories[activeCategory].nameEn}
                </span>
              </div>
              <span className="text-[9.5px] text-[#7A7A7A] font-bold tracking-wider">
                Store-fit curation applied
              </span>
            </div>

            <div className="border-t border-white/10 w-full" />

            {/* Showcase Product Visual & 2Depth subcategories */}
            <div className="grid sm:grid-cols-[1.15fr_0.85fr] gap-6 items-center">
              
              {/* Left Column: subcategories list (2Depth Items) */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {categories[activeCategory].nameKo} 핵심 제품군
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {categories[activeCategory].items.map((item) => (
                    <span
                      key={item}
                      className="text-[11.5px] font-bold text-[#FAFAFA] bg-white/5 border border-white/10 px-3 py-2 rounded-[8px] tracking-tight hover:bg-white/[0.08] transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Representation Curation Image with Crossfade transition */}
              <div className="relative w-full aspect-square rounded-[20px] overflow-hidden border border-white/5 bg-[#111] shadow-lg">
                {categories.map((cat, index) => (
                  <div
                    key={cat.nameEn}
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      activeCategory === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={cat.image}
                      alt={`${cat.nameKo} Showcase`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Bottom: Store-Fit Curation Preview tags */}
          <div className="border-t border-white/10 mt-6 pt-5 flex flex-col gap-3">
            <span className="text-[9px] text-[#7A7A7A] tracking-widest font-black uppercase text-left">
              RECOMMENDED CURATION STRATEGY
            </span>
            <div className="flex flex-wrap gap-2 justify-start">
              {categories[activeCategory].tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-[#ff2b75] bg-[#ff2b75]/8 border border-[#ff2b75]/20 px-3 py-1 rounded-[6px] tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
