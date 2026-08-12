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
      // Step 1: Sequential Store Profile Tiles reveal (0s - 2.5s)
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
        }, 80);
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

      {/* ================= RIGHT COLUMN: Diagnostic Loop Motion Box ================= */}
      <div className="relative min-h-[480px] aspect-[1.12] rounded-[24px] overflow-hidden border border-white/10 bg-[#0c0c0c] shadow-2xl flex flex-col justify-between p-8 sm:p-10 select-none group">
        
        {/* Underlay: K-Beauty Display Fixture Image (Adjusted Dim level for higher visibility of UI structure) */}
        <div className="absolute inset-0 z-0 bg-[#0c0c0c]/68 backdrop-blur-[0.5px]">
          <Image
            src="/images/solutions/build.jpg"
            alt="K-Beauty display module framework"
            fill
            className="object-cover opacity-[0.32] transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>

        {/* Top Header Label */}
        <div className="relative z-10 flex justify-between items-center w-full">
          <span className="text-[10px] text-[#ff2b75] tracking-widest font-black uppercase">
            LIVE PREVIEW
          </span>
          <span className="text-[9px] text-[#FAFAFA]/70 bg-white/5 border border-white/10 px-3 py-1 rounded-[20px] font-bold tracking-wide uppercase">
            {step === "store_profile" && "Step 1: Your Store Profile"}
            {step === "analyzing" && "Step 2: Smart Matching"}
            {step === "results" && "Step 3: Growth Simulation"}
          </span>
        </div>

        {/* Main Content Area (Swap content by state with soft fade-in animation) */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full my-4 min-h-[250px]">
          
          {/* Phase 1: Store Profile Tiles */}
          {step === "store_profile" && (
            <div className="grid grid-cols-2 gap-4 w-full animate-fade-in">
              {[
                { label: "SPACE CAPACITY", val: "1,500 - 3,500 sq ft" },
                { label: "PRODUCT DEMAND", val: "Skincare + Makeup" },
                { label: "PRICE PREFERENCE", val: "Value & Premium" },
                { label: "REORDER PATTERN", val: "90-Day Loop Cycle" }
              ].map((tile, idx) => (
                <div
                  key={tile.label}
                  className={`border rounded-[16px] p-5 flex flex-col justify-center text-left transition-all duration-300 ${
                    activeTileIndex >= idx
                      ? "border-[#ff2b75] bg-[#0A0A0A]/90 shadow-[0_0_15px_rgba(255,43,117,0.15)] scale-[1.02]"
                      : "border-white/5 bg-[#111113]/40 opacity-40"
                  }`}
                >
                  <span className="text-[9px] text-[#ff2b75] font-black tracking-widest block mb-1">
                    {tile.label}
                  </span>
                  <span className="text-[12.5px] font-bold text-white tracking-tight">
                    {tile.val}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Phase 2: Analyzing Loader */}
          {step === "analyzing" && (
            <div className="flex flex-col items-center justify-center gap-6 w-full max-w-[320px] text-center animate-fade-in">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-[#ff2b75] font-black tracking-[0.16em] uppercase animate-pulse">
                  ANALYZING STORE PROFILE...
                </span>
                <span className="text-[11px] text-[#9ca3af] font-medium mt-1">
                  매장 조건에 최적화된 상품군을 조합하고 있습니다
                </span>
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

          {/* Phase 3: Results & Metrics Recommendation Preview with Diagnostic Tags */}
          {step === "results" && (
            <div className="w-full flex flex-col gap-4 animate-fade-in">
              
              {/* Header result row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0A0A0A]/90 border border-white/10 rounded-[14px] p-4 text-left">
                  <span className="text-[8.5px] text-[#9ca3af] font-bold block tracking-wider uppercase mb-1">RECOMMENDED DISPLAY</span>
                  <span className="text-[13px] font-black text-[#ff2b75] tracking-tight">GROW · 8FT Module</span>
                </div>
                <div className="bg-[#0A0A0A]/90 border border-white/10 rounded-[14px] p-4 text-left">
                  <span className="text-[8.5px] text-[#9ca3af] font-bold block tracking-wider uppercase mb-1">ASSORTMENT PROFILE</span>
                  <span className="text-[13px] font-black text-[#ff2b75] tracking-tight">AP-03 · 스킨케어 강화형</span>
                </div>
              </div>

              {/* Recommendation Tags Preview */}
              <div className="flex flex-wrap gap-1.5 justify-start py-0.5">
                {[
                  "Hair & Scalp Demand",
                  "Fast Reorder",
                  "Mid-Premium",
                  "Growth Focus"
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[8.5px] font-bold text-[#ff2b75] bg-[#ff2b75]/8 border border-[#ff2b75]/20 px-2 py-0.5 rounded-[4px] tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Dynamic scroll indicator / metrics listing */}
              <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 border-t border-white/10 pt-4 text-left">
                <div>
                  <span className="text-[12px] font-bold text-white">120+ SKUs</span>
                  <p className="text-[9.5px] text-[#9ca3af] mt-0.5">Recommended SKU Size</p>
                </div>
                <div>
                  <span className="text-[12px] font-bold text-white">$25,000 - $30,000</span>
                  <p className="text-[9.5px] text-[#9ca3af] mt-0.5">Estimated Product Investment</p>
                </div>
                <div>
                  <span className="text-[12px] font-bold text-white">6x / Year</span>
                  <p className="text-[9.5px] text-[#9ca3af] mt-0.5">Inventory Turnover</p>
                </div>
                <div>
                  <span className="text-[12px] font-bold text-white">Estimated 180%</span>
                  <p className="text-[9.5px] text-[#9ca3af] mt-0.5">Expected ROI Simulation</p>
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
