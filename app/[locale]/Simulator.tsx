"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Simulator() {
  const [step, setStep] = useState<"store_profile" | "analyzing" | "results">("store_profile");
  const [activeTileIndex, setActiveTileIndex] = useState<number>(-1);
  const [progress, setProgress] = useState<number>(0);

  // 7.2s Loop sequence simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const runLoop = () => {
      // Step 1: Store Profile Tiles (0s - 2.5s)
      setStep("store_profile");
      setActiveTileIndex(-1);
      setProgress(0);

      // Tile 0 (0.3s)
      timer = setTimeout(() => {
        setActiveTileIndex(0);
      }, 300);

      // Tile 1 (0.9s)
      timer = setTimeout(() => {
        setActiveTileIndex(1);
      }, 900);

      // Tile 2 (1.5s)
      timer = setTimeout(() => {
        setActiveTileIndex(2);
      }, 1500);

      // Tile 3 (2.1s)
      timer = setTimeout(() => {
        setActiveTileIndex(3);
      }, 2100);

      // Step 2: Analyzing (2.5s - 4.4s)
      timer = setTimeout(() => {
        setStep("analyzing");
        setActiveTileIndex(-1);
        
        let currentProgress = 0;
        progressInterval = setInterval(() => {
          currentProgress += 5;
          if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(progressInterval);
          }
          setProgress(currentProgress);
        }, 85);
      }, 2500);

      // Step 3: Recommended Results (4.4s - 7.2s)
      timer = setTimeout(() => {
        setStep("results");
        clearInterval(progressInterval);
      }, 4400);
    };

    runLoop();
    const mainInterval = setInterval(runLoop, 7200);

    return () => {
      clearInterval(mainInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full grid lg:grid-cols-[0.43fr_0.57fr] gap-12 items-center text-left">
      
      {/* ================= LEFT COLUMN: Title, Subcopy, CTA ================= */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-black text-[#ff2b75] tracking-[0.08em] uppercase">
          07 — GROWTH SIMULATOR
        </span>
        <h2 className="font-display text-3xl sm:text-[38px] font-bold leading-[1.25] text-white my-2 tracking-tight">
          내 매장에 맞는<br />
          K-Beauty 성장 프로그램을<br />
          찾아보세요.
        </h2>
        <p className="text-[13.5px] text-[#9ca3af] leading-relaxed max-w-md my-2 font-medium">
          몇 가지 간단한 매장 정보를 입력하면, K SELECT HUB가 <strong className="text-white font-bold">매장에 맞는 디스플레이 규모와 상품 구성</strong>을 추천하고 예상 투자와 판매 성과를 함께 시뮬레이션합니다.
        </p>
        <span className="text-[10px] text-[#7A7A7A] font-semibold tracking-wide block -mt-1 mb-2">
          * Display Program + Assortment Profile 공식 매칭 기준
        </span>

        {/* CTA Button Block */}
        <div className="flex flex-col gap-2.5 mt-4 items-start">
          <a
            href="#apply"
            onClick={(e) => handleSmoothScroll(e, "apply")}
            className="h-14 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-8 rounded-[8px] font-bold text-[14.5px] tracking-wide transition-all cursor-pointer shadow-[0_4px_20px_rgba(255,43,117,0.25)] focus:outline-none focus:ring-2 focus:ring-[#ff2b75]/50"
            aria-label="Start My Simulation"
          >
            내 매장 시뮬레이션 해보기 →
          </a>
          <span className="text-[11px] text-[#7A7A7A] font-semibold tracking-wide pl-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
            </svg>
            약 1–2분 · 간단한 매장 진단
          </span>
        </div>
      </div>

      {/* ================= RIGHT COLUMN: Premium Minimal Curation Showcase ================= */}
      <div className="relative min-h-[480px] aspect-[1.12] rounded-[24px] overflow-hidden border border-white/10 bg-[#070708] shadow-2xl flex flex-col justify-between p-8 sm:p-10 select-none">
        
        {/* Underlay: Highly Subdued Shelf Silhouette (Strictly 8% opacity, no competing text/UI details) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/solutions/build.jpg"
            alt="Subdued display fixture silhouette background"
            fill
            className="object-cover opacity-[0.06] pointer-events-none"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070708]/90 via-transparent to-[#070708]/95 pointer-events-none" />
        </div>

        {/* Top Header Step Indicators (Bold step navigation header) */}
        <div className="relative z-10 flex justify-between items-center w-full gap-2 border-b border-white/10 pb-4.5">
          {[
            { step: "01", key: "store_profile", title: "YOUR STORE" },
            { step: "02", key: "analyzing", title: "SMART MATCH" },
            { step: "03", key: "results", title: "SIMULATION" }
          ].map((s) => {
            const isCurrent = step === s.key;
            return (
              <div key={s.step} className="flex items-center gap-2">
                <span className={`text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isCurrent ? "bg-[#ff2b75] border-[#ff2b75] text-white" : "border-white/10 text-white/30"
                }`}>
                  {s.step}
                </span>
                <span className={`text-[10px] font-black tracking-wider transition-all duration-300 ${
                  isCurrent ? "text-white" : "text-white/30"
                }`}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main Content Area (Swap content by step state) */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full my-4 min-h-[260px]">
          
          {/* STEP 1: Store Profile Tiles */}
          {step === "store_profile" && (
            <div className="flex flex-col gap-5 w-full animate-fade-in text-left">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#ff2b75] tracking-widest uppercase">
                  STEP 1 — YOUR STORE PROFILE
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  매장 면적, 핵심 타겟 및 운영 조건을 입력합니다
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                {[
                  { label: "SPACE CAPACITY", val: "1,500 - 3,500 sq ft" },
                  { label: "PRODUCT DEMAND", val: "Skincare + Makeup" },
                  { label: "PRICE PREFERENCE", val: "Value & Premium" },
                  { label: "REORDER PATTERN", val: "90-Day Loop Cycle" }
                ].map((tile, idx) => (
                  <div
                    key={tile.label}
                    className={`border rounded-[14px] p-4.5 flex flex-col justify-center transition-all duration-300 ${
                      activeTileIndex >= idx
                        ? "border-[#ff2b75] bg-[#0c0c0c]/90 shadow-[0_0_15px_rgba(255,43,117,0.15)] scale-[1.02]"
                        : "border-white/5 bg-[#111113]/20 opacity-30"
                    }`}
                  >
                    <span className="text-[8.5px] text-[#ff2b75] font-black tracking-widest block mb-1 font-display">
                      {tile.label}
                    </span>
                    <span className="text-[12.5px] font-bold text-white tracking-tight">
                      {tile.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Smart Matching Loader */}
          {step === "analyzing" && (
            <div className="flex flex-col items-center justify-center gap-6 w-full max-w-[320px] text-center animate-fade-in">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#ff2b75] tracking-[0.16em] uppercase">
                  STEP 2 — SMART MATCHING
                </span>
                <h3 className="text-[14.5px] font-bold text-white tracking-tight mt-1 animate-pulse">
                  스토어 조건에 맞는 최적의 디스플레이 규모와 상품 구성(AP)을 조합하고 있습니다
                </h3>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                <div
                  className="h-full bg-[#ff2b75] transition-all duration-75 ease-out shadow-[0_0_10px_#ff2b75]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-display text-[15px] font-black text-white">
                {progress}%
              </span>
            </div>
          )}

          {/* STEP 3: Results Preview - Large Display, Highlighted Program & Metrics */}
          {step === "results" && (
            <div className="w-full flex flex-col gap-4 animate-fade-in text-left">
              
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#ff2b75] tracking-widest uppercase">
                  STEP 3 — GROWTH SIMULATION
                </span>
                <h3 className="text-[13.5px] font-bold text-[#9ca3af] tracking-tight">
                  매칭 결과 및 예상 성과 Preview
                </h3>
              </div>

              {/* Main Recommendations Container (Prominent Hero Display) */}
              <div className="bg-[#0c0c0c]/80 border border-white/10 rounded-[16px] p-5 flex justify-between items-center gap-4 shadow-lg">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[8.5px] text-[#7A7A7A] font-black tracking-wider uppercase">RECOMMENDED DISPLAY</span>
                  <span className="text-[17px] font-black text-white tracking-tight leading-none">
                    GROW · <span className="text-[#ff2b75]">8FT Module</span>
                  </span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col gap-1.5">
                  <span className="text-[8.5px] text-[#7A7A7A] font-black tracking-wider uppercase">ASSORTMENT PROFILE</span>
                  <span className="text-[15px] font-bold text-white tracking-tight leading-none">
                    AP-03 · 스킨케어 강화형
                  </span>
                </div>
              </div>

              {/* Minimized Recommendation Reason Tags (3 elements) */}
              <div className="flex flex-wrap gap-1.5 py-0.5 justify-start">
                {["Skincare Demand", "Mid-Premium Price", "Fast Reorder Loop", "Growth Focus"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] font-black text-[#ff2b75] bg-[#ff2b75]/8 border border-[#ff2b75]/20 px-2 py-0.5 rounded-[4px] tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Key Metrics Grid - Bold highlighted first tier, clean secondary tier */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                
                {/* Highlighted Primary metrics */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-black text-[#ff2b75] leading-none">Estimated 180%</span>
                  <span className="text-[9.5px] text-[#9ca3af] font-bold uppercase tracking-tight">Expected ROI Simulation</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-black text-white leading-none">$25,000 - $30,000</span>
                  <span className="text-[9.5px] text-[#9ca3af] font-bold uppercase tracking-tight">Product Investment</span>
                </div>

                {/* Secondary metrics */}
                <div className="flex flex-col gap-0.5 opacity-60">
                  <span className="text-[12px] font-bold text-white leading-none">120+ SKUs</span>
                  <span className="text-[9px] text-[#7A7A7A] font-semibold tracking-tight">Recommended SKU Size</span>
                </div>
                <div className="flex flex-col gap-0.5 opacity-60">
                  <span className="text-[12px] font-bold text-white leading-none">6x / Year</span>
                  <span className="text-[9px] text-[#7A7A7A] font-semibold tracking-tight">Inventory Turnover</span>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Bottom indicator dots */}
        <div className="relative z-10 flex items-center justify-center gap-1.5 w-full">
          <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${step === "store_profile" ? "bg-[#ff2b75] w-3.5" : "bg-white/10"}`} />
          <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${step === "analyzing" ? "bg-[#ff2b75] w-3.5" : "bg-white/10"}`} />
          <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${step === "results" ? "bg-[#ff2b75] w-3.5" : "bg-white/10"}`} />
        </div>

      </div>

    </div>
  );
}
