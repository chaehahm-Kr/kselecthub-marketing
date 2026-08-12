"use client";

import React, { useState } from "react";
import Image from "next/image";

interface DisplayProgram {
  id: string;
  tag: string;
  titleKo: string;
  titleEn: string;
  sub: string;
  desc: string;
  image: string;
}

export default function DisplaySection() {
  const [activeTab, setActiveTab] = useState<string>("8ft");

  const programs: DisplayProgram[] = [
    {
      id: "4ft",
      tag: "START · 4FT",
      titleKo: "작게 시작하고 빠르게 검증합니다.",
      titleEn: "Start small and validate fast.",
      sub: "진입형 매대",
      desc: "K-Beauty를 처음 도입하거나 매장의 한정된 유휴 공간에서 고객 반응 및 시장성을 빠르게 테스트하기 위한 핵심 집중형 구성.",
      image: "/images/solutions/4F_A.jpg"
    },
    {
      id: "8ft",
      tag: "GROW · 8FT",
      titleKo: "K-Beauty를 본격적인 매출 카테고리로 성장시킵니다.",
      titleEn: "Scale K-Beauty into a core revenue driver.",
      sub: "성장형 매대",
      desc: "카테고리와 SKU 진열폭을 대폭 넓혀 본격적인 매장 내 K-Beauty 목적 구매 유입과 카테고리 매출 성장을 이끄는 2열 모듈 구성.",
      image: "/images/solutions/8F_AA.jpg"
    },
    {
      id: "12ft",
      tag: "expand · 12ft",
      titleKo: "K-Beauty 자체가 매장의 목적 구매 공간이 됩니다.",
      titleEn: "Create a complete beauty destination zone.",
      sub: "데스티네이션 매대",
      desc: "여러 스킨케어, 헤어케어, 메이크업 브랜드를 아울러 폭넓은 풀 라인업 쇼핑 가이드를 제공하는 완성형 모듈러 리테일 인프라 시스템.",
      image: "/images/solutions/12F_AAA.jpg"
    }
  ];

  const activeProg = programs.find((p) => p.id === activeTab) || programs[1];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTabClick(id);
    }
  };

  return (
    <section
      id="display"
      className="w-full bg-[#141414] border-y border-[#2a2a2a] py-[120px] text-left select-none font-sans"
      style={{ fontFamily: "'Pretendard', -apple-system, sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] flex flex-col gap-12">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="max-w-[760px] flex flex-col gap-3">
          <span className="text-[11px] font-black text-[#ff2b75] tracking-[0.08em] uppercase">
            05 — K-BEAUTY CATEGORY DISPLAY
          </span>
          <h2 className="font-display text-3xl sm:text-[38px] font-bold leading-[1.2] text-white tracking-tight">
            매장 안에, 하나의 완성된 K-Beauty 카테고리를 만듭니다.<br />
            <span className="text-xl font-medium text-text-secondary mt-1 block">
              Build a Complete K-Beauty Category Inside Your Store.
            </span>
          </h2>
          <p className="text-[13.5px] text-[#9ca3af] leading-relaxed font-medium mt-1">
            매장 규모와 고객 특성에 맞춰 4FT, 8FT, 12FT 모듈형 디스플레이를 구성합니다.  
            단순한 진열장이 아니라, 큐레이션된 상품부터 가격·제품 정보·구매 가이드까지 하나의 시스템으로 설계된 K-Beauty 전문 B2B 리테일 인프라입니다.
          </p>
        </div>

        {/* ================= MAIN SPLIT GRID: items-stretch keeps left panel and right image height in perfect symmetry ================= */}
        <div className="grid lg:grid-cols-[0.45fr_0.55fr] gap-12 items-stretch mt-2">
          
          {/* LEFT SIDE: Switchers & Category Specs & Technology Features */}
          <div className="flex flex-col justify-between gap-8">
            
            {/* Top Interactive Tabs & Active Tab Details */}
            <div className="flex flex-col gap-5">
              
              {/* Tab Selector Buttons */}
              <div className="flex bg-[#0c0c0c] border border-white/10 rounded-[12px] p-1.5 w-fit">
                {programs.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleTabClick(p.id)}
                    onKeyDown={(e) => handleKeyDown(e, p.id)}
                    className={`h-11 px-5 rounded-[8px] text-[12.5px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer focus:outline-none ${
                      activeTab === p.id
                        ? "bg-[#ff2b75] text-white shadow-[0_2px_10px_rgba(255,43,117,0.3)]"
                        : "text-[#7A7A7A] hover:text-white"
                    }`}
                  >
                    {p.id}
                  </button>
                ))}
              </div>

              {/* Selected Program Specification */}
              <div className="bg-[#0c0c0c]/40 border border-white/5 rounded-[16px] p-6 text-left flex flex-col gap-2.5 min-h-[160px] justify-center animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-[#ff2b75] tracking-widest uppercase">
                    {activeProg.tag}
                  </span>
                  <span className="text-[9.5px] text-[#7A7A7A] font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded-[4px]">
                    {activeProg.sub}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {activeProg.titleKo}
                </h3>
                <p className="text-[12.5px] text-[#9ca3af] leading-relaxed font-medium">
                  {activeProg.desc}
                </p>
              </div>

            </div>

            {/* Middle: 4 Value Points including QR product experience */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Point 1 */}
              <div className="border border-white/5 bg-[#0c0c0c]/20 p-4.5 rounded-[14px] text-left">
                <span className="text-[12.5px] font-bold text-white block mb-1">Premium Modular Display</span>
                <p className="text-[10px] text-[#7A7A7A] leading-normal font-semibold">매장 환경에 맞게 4FT부터 12FT까지 규격 유연 확장 지원</p>
              </div>

              {/* Point 2 */}
              <div className="border border-white/5 bg-[#0c0c0c]/20 p-4.5 rounded-[14px] text-left">
                <span className="text-[12.5px] font-bold text-white block mb-1">Curated Merchandising</span>
                <p className="text-[10px] text-[#7A7A7A] leading-normal font-semibold">전문가의 검토와 테스트를 통과한 최적의 상품 큐레이션</p>
              </div>

              {/* Point 3 */}
              <div className="border border-white/5 bg-[#0c0c0c]/20 p-4.5 rounded-[14px] text-left">
                <span className="text-[12.5px] font-bold text-white block mb-1">Shopper Guidance</span>
                <p className="text-[10px] text-[#7A7A7A] leading-normal font-semibold">제품 용도와 피부고민별 직관적인 리테일 안내 스트립</p>
              </div>

              {/* Point 4 - QR Technology */}
              <div className="border border-[#ff2b75]/30 bg-[#ff2b75]/5 p-4.5 rounded-[14px] text-left shadow-[0_0_15px_rgba(255,43,117,0.03)]">
                <span className="text-[12.5px] font-bold text-white flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75] animate-pulse" />
                  QR Product Experience
                </span>
                <p className="text-[10px] text-[#ff2b75] leading-normal font-semibold">
                  직원이 없어도 개별 QR 스캔으로 성분, 리뷰 및 한글 번역 가이드를 스스로 확인 (Self-Guided Shopping)
                </p>
              </div>

            </div>

            {/* Bottom Closing Info Card */}
            <div className="border border-white/10 bg-[#0c0c0c] rounded-[16px] p-6 text-left flex flex-col gap-2">
              <span className="text-[10px] text-[#ff2b75] tracking-widest font-black uppercase block">
                MAIN INFRASTRUCTURE CONCEPT
              </span>
              <span className="text-[13.5px] font-bold text-white">
                More Than a Display. A Complete Retail Category System.
              </span>
              <p className="text-[11px] text-[#9ca3af] leading-relaxed font-medium">
                제품을 설명할 직원이 없어도, 가격·제품 정보와 QR 기반 안내로 고객이 쉽게 이해하고 선택할 수 있습니다.<br />
                <span className="text-[#7A7A7A] text-[10px] block mt-1">
                  Even without a beauty specialist on the floor, shoppers can understand, explore, and choose with confidence through pricing and QR guidance.
                </span>
              </p>
            </div>

          </div>

          {/* RIGHT SIDE: Authentic Fixture Full-View Box (Storage Base, Top signage, all features clearly displayed without crop) */}
          <div className="bg-[#0c0c0c] border border-white/10 rounded-[24px] shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[560px] sm:min-h-[660px] relative overflow-hidden group">
            
            {/* Soft backdrop glow to give a premium 3D feeling to the fixture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="relative w-full h-[500px] sm:h-[600px] flex items-center justify-center">
              {programs.map((p) => (
                <div
                  key={p.id}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
                    activeTab === p.id
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-95 z-0 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full h-full">
                    {/* Replicating the physical cabinet with exact layout and full storage base/key hole details */}
                    <Image
                      src={p.image}
                      alt={`K-Beauty ${p.id.toUpperCase()} modular retail fixture with base cabinet`}
                      fill
                      className="object-contain"
                      sizes="45vw"
                      priority={p.id === "8ft"}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom hint label */}
            <span className="text-[9.5px] text-[#7A7A7A] font-bold tracking-widest uppercase mt-4 block relative z-20">
              * 리테일 파트너에게 실제로 무상 대여 제공될 실물 디스플레이 가구 비율 규격
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}
