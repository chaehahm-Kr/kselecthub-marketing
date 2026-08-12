"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Simulator() {
  const [step, setStep] = useState<"store_profile" | "analyzing" | "results">("store_profile");
  const [activeTileIndex, setActiveTileIndex] = useState<number>(-1);
  const [progress, setProgress] = useState<number>(0);

  // 14.4s Loop sequence simulation (2x slower than original 7.2s)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const runLoop = () => {
      // Step 1: Store Profile Tiles (0s - 5.0s)
      setStep("store_profile");
      setActiveTileIndex(-1);
      setProgress(0);

      // Tile 0 (0.6s)
      timer = setTimeout(() => {
        setActiveTileIndex(0);
      }, 600);

      // Tile 1 (1.8s)
      timer = setTimeout(() => {
        setActiveTileIndex(1);
      }, 1800);

      // Tile 2 (3.0s)
      timer = setTimeout(() => {
        setActiveTileIndex(2);
      }, 3000);

      // Tile 3 (4.2s)
      timer = setTimeout(() => {
        setActiveTileIndex(3);
      }, 4200);

      // Step 2: Analyzing (5.0s - 8.8s)
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
        }, 170); // 170ms * 20 steps = 3.4s of gradual smooth analysis
      }, 5000);

      // Step 3: Recommended Results (8.8s - 14.4s)
      timer = setTimeout(() => {
        setStep("results");
        clearInterval(progressInterval);
      }, 8800);
    };

    runLoop();
    const mainInterval = setInterval(runLoop, 14400);

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
    <div className="w-full grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center text-left max-w-[1250px] mx-auto">
      
      {/* ================= LEFT COLUMN: Title, Subcopy, CTA ================= */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-black text-[#ff2b75] tracking-[0.08em] uppercase">
          07 — GROWTH SIMULATOR
        </span>
        <h2 className="font-display text-3xl sm:text-[36px] font-bold leading-[1.25] text-white my-2 tracking-tight">
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
            href="#simulator-section"
            onClick={(e) => handleSmoothScroll(e, "simulator-section")}
            className="h-14 inline-flex items-center justify-center border border-[#22D3EE]/30 text-[#22D3EE] px-8 rounded-[8px] font-bold text-[14.5px] tracking-wide transition-all duration-300 hover:bg-[#22D3EE] hover:text-[#0c0c0c] hover:shadow-[0_0_15px_rgba(34,211,238,0.35)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50"
            aria-label="Start My Simulation"
          >
            내 매장 시뮬레이션 시작하기 →
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
      <div className="relative min-h-[360px] sm:min-h-[385px] w-full max-w-[530px] rounded-[24px] overflow-hidden border border-white/10 bg-[#070708] shadow-2xl flex flex-col justify-between p-6 sm:p-8 select-none mx-auto lg:mx-0">
        
        {/* Underlay: Highly Subdued Shelf Silhouette */}
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
 
        {/* Top Header Step Indicators */}
        <div className="relative z-10 flex justify-between items-center w-full gap-2 border-b border-white/10 pb-4">
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
        <div className="relative z-10 flex-1 flex items-center justify-center w-full my-4 min-h-[220px]">
          
          {/* STEP 1: Store Profile Tiles */}
          {step === "store_profile" && (
            <div className="flex flex-col gap-4.5 w-full animate-fade-in text-left">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9.5px] font-bold text-[#ff2b75] tracking-widest uppercase">
                  STEP 1 — YOUR STORE PROFILE
                </span>
                <h3 className="text-[14.5px] font-bold text-white tracking-tight">
                  매장 면적, 핵심 타겟 및 운영 조건을 입력합니다
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "SPACE CAPACITY", val: "1,500 - 3,500 sq ft" },
                  { label: "PRODUCT DEMAND", val: "Skincare + Makeup" },
                  { label: "PRICE PREFERENCE", val: "Value & Premium" },
                  { label: "REORDER PATTERN", val: "90-Day Loop Cycle" }
                ].map((tile, idx) => (
                  <div
                    key={tile.label}
                    className={`border rounded-[12px] p-3.5 flex flex-col justify-center transition-all duration-300 ${
                      activeTileIndex >= idx
                        ? "border-[#ff2b75] bg-[#0c0c0c]/90 shadow-[0_0_15px_rgba(255,43,117,0.15)] scale-[1.02]"
                        : "border-white/5 bg-[#111113]/20 opacity-30"
                    }`}
                  >
                    <span className="text-[8px] text-[#ff2b75] font-black tracking-widest block mb-0.5 font-display">
                      {tile.label}
                    </span>
                    <span className="text-[12px] font-bold text-white tracking-tight">
                      {tile.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
 
          {/* STEP 2: Smart Matching Loader */}
          {step === "analyzing" && (
            <div className="flex flex-col items-center justify-center gap-5 w-full max-w-[320px] text-center animate-fade-in">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9.5px] font-bold text-[#ff2b75] tracking-[0.16em] uppercase">
                  STEP 2 — SMART MATCHING
                </span>
                <h3 className="text-[13.5px] font-bold text-white tracking-tight mt-1 animate-pulse leading-normal">
                  스토어 조건에 맞는 최적의 디스플레이 규모와 상품 구성(AP)을 조합하고 있습니다
                </h3>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                <div
                  className="h-full bg-[#ff2b75] transition-all duration-75 ease-out shadow-[0_0_10px_#ff2b75]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-display text-[14px] font-black text-white">
                {progress}%
              </span>
            </div>
          )}
 
          {/* STEP 3: Results Preview - Large Display, Highlighted Program & Metrics */}
          {step === "results" && (
            <div className="w-full flex flex-col gap-3.5 text-left">
              
              <div className="flex flex-col gap-0.5 animate-pop-bounce">
                <span className="text-[9.5px] font-bold text-[#ff2b75] tracking-widest uppercase">
                  STEP 3 — GROWTH SIMULATION
                </span>
                <h3 className="text-[13px] font-bold text-[#9ca3af] tracking-tight">
                  매칭 결과 및 예상 성과 Preview
                </h3>
              </div>
 
              {/* Main Recommendations Container (Prominent Hero Display) */}
              <div 
                className="bg-[#0c0c0c]/80 border border-white/10 rounded-[14px] p-4.5 flex justify-between items-center gap-4 shadow-lg animate-pop-bounce"
                style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-[#7A7A7A] font-black tracking-wider uppercase">RECOMMENDED DISPLAY</span>
                  <span className="text-[16px] font-black text-white tracking-tight leading-none">
                    GROW · <span className="text-[#ff2b75]">8FT Module</span>
                  </span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-[#7A7A7A] font-black tracking-wider uppercase">ASSORTMENT PROFILE</span>
                  <span className="text-[14px] font-bold text-white tracking-tight leading-none">
                    AP-03 · 스킨케어 강화형
                  </span>
                </div>
              </div>
 
              {/* Minimized Recommendation Reason Tags (3 elements) */}
              <div 
                className="flex flex-wrap gap-1.5 py-0.5 justify-start animate-pop-bounce"
                style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
              >
                {["Skincare Focus", "Mid-Premium Price", "Fast Reorder Loop", "Growth Target"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] font-black text-[#ff2b75] bg-[#ff2b75]/8 border border-[#ff2b75]/20 px-2 py-0.5 rounded-[4px] tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
 
              {/* Key Metrics Grid - Bold highlighted first tier, clean secondary tier */}
              <div 
                className="grid grid-cols-2 gap-3.5 border-t border-white/10 pt-3.5 animate-pop-bounce"
                style={{ animationDelay: "450ms", animationFillMode: "forwards" }}
              >
                
                {/* Highlighted Primary metrics */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15.5px] font-black text-[#ff2b75] leading-none drop-shadow-[0_0_8px_rgba(255,43,117,0.35)]">
                    Estimated 180%
                  </span>
                  <span className="text-[9px] text-[#9ca3af] font-bold uppercase tracking-tight">Expected ROI Simulation</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-black text-white leading-none">
                    $25,000 - $30,000
                  </span>
                  <span className="text-[9px] text-[#9ca3af] font-bold uppercase tracking-tight">Product Investment</span>
                </div>
 
                {/* Secondary metrics */}
                <div className="flex flex-col gap-0.5 opacity-60">
                  <span className="text-[12px] font-bold text-white leading-none">120+ SKUs</span>
                  <span className="text-[8.5px] text-[#7A7A7A] font-semibold tracking-tight">Recommended SKU Size</span>
                </div>
                <div className="flex flex-col gap-0.5 opacity-60">
                  <span className="text-[12px] font-bold text-white leading-none">6x / Year</span>
                  <span className="text-[8.5px] text-[#7A7A7A] font-semibold tracking-tight">Inventory Turnover</span>
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

        {/* Custom CSS for Pop Bounce springs */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes popBounce {
            0% {
              transform: scale(0.92);
              opacity: 0;
            }
            60% {
              transform: scale(1.05);
              opacity: 0.9;
            }
            85% {
              transform: scale(0.98);
              opacity: 0.95;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-pop-bounce {
            opacity: 0;
            animation: popBounce 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        ` }} />
 
      </div>
 
    </div>
  );
}
