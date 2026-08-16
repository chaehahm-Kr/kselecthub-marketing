"use client";

import React, { useState, useEffect, useRef } from "react";

export default function ChallengesSection({ locale }: { locale?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isKo = locale === "ko";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Run only once
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="problems-section"
      ref={sectionRef}
      className="bg-[#0c0c0c] border-y border-[#2a2a2a] relative overflow-hidden font-medium"
    >
      <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px] text-left">
        
        {/* Title and Narrative Headers */}
        <div 
          className={`max-w-[800px] mb-14 flex flex-col gap-3 transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs font-semibold text-accent tracking-[0.04em]">
            02 — RETAILER CHALLENGES
          </span>
          <h2 
            className="font-display text-3xl sm:text-4xl font-bold leading-[1.25] tracking-tight text-white mb-2"
          >
            {isKo ? (
              <>
                K-Beauty의 기회는 보입니다.<br />
                하지만 매장에서 성공시키는 것은 <span className="text-accent">또 다른 문제입니다.</span>
              </>
            ) : (
              <>
                K-Beauty Demand is Soaring.<br />
                But Store Execution is a <span className="text-accent">Different Challenge.</span>
              </>
            )}
          </h2>
          <p 
            className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl"
          >
            {isKo ? (
              <>
                독립 Beauty Retailer는 이미 가격 경쟁, 제품 선택, 재고 부담이라는 현실적인 문제를 안고 있습니다.<br />
                K-Beauty라는 새로운 기회도 제대로 된 상품 선정과 운영 시스템 없이는 또 하나의 재고가 될 수 있습니다.
              </>
            ) : (
              <>
                Independent beauty retailers already face intense price wars and high inventory risks. Without a structured assortment selection and Category Management system, K-Beauty is just another inventory bottleneck.
              </>
            )}
          </p>
        </div>

        {/* 5 Timeline Cards Container with connection arrows */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-5 mb-12 relative">
          
          {/* CARD 01 - PRICE WAR */}
          <div 
            className={`relative bg-[#111] border border-[#2a2a2a] rounded-[16px] p-6 flex flex-col gap-4 text-left transition-all duration-700 ease-out transform ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            } hover:-translate-y-1 hover:border-[#ff2b75]/30 hover:shadow-[0_0_15px_rgba(255,43,117,0.05)]`}
            style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-text-secondary tracking-widest font-bold uppercase">
                01 · PRICE WAR
              </span>
              <div className="w-9 h-9 rounded-full bg-[#ff2b75]/5 flex items-center justify-center text-accent">
                <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10M7 7l4-4m-4 4l4 4m1 11h-4m4 0l-4-4m4 4l-4 4M9 16.5V12M15 12v3.5M3 8a4 4 0 014-4h4a4 4 0 014 4v4a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold text-white min-h-[40px] flex items-center font-display">
                Same Products. Same Price War.
              </h4>
              <p className="text-[11px] text-text-secondary leading-relaxed pt-2 border-t border-[#2a2a2a]">
                {isKo 
                  ? "같은 제품을 팔수록 가격 경쟁에서 벗어나기 어렵습니다. 온라인과 주변 매장에서 동일한 제품을 판매하면 고객은 결국 가격을 비교합니다."
                  : "Selling the exact same SKUs as competitors and e-commerce giants locks you into a margin-killing discount battle."
                }
              </p>
            </div>

            {/* Desktop connection arrow to CARD 02 */}
            <div className="hidden lg:flex absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 text-accent items-center opacity-60">
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* CARD 02 - SOURCING GAP */}
          <div 
            className={`relative bg-[#111] border border-[#2a2a2a] rounded-[16px] p-6 flex flex-col gap-4 text-left transition-all duration-700 ease-out transform ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            } hover:-translate-y-1 hover:border-[#ff2b75]/30 hover:shadow-[0_0_15px_rgba(255,43,117,0.05)]`}
            style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-text-secondary tracking-widest font-bold uppercase">
                02 · SOURCING GAP
              </span>
              <div className="w-9 h-9 rounded-full bg-[#ff2b75]/5 flex items-center justify-center text-accent">
                <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14v14m0-14L4 7m0 0v10l8 4M21 21l-3.5-3.5M17 13.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold text-white min-h-[40px] flex items-center font-display">
                K-Beauty Is Growing. But Where Do You Start?
              </h4>
              <p className="text-[11px] text-text-secondary leading-relaxed pt-2 border-t border-[#2a2a2a]">
                {isKo 
                  ? "K-Beauty가 잘 나간다는데 어디서부터 시작해야 할지 어렵습니다. 브랜드와 공급처는 많지만 어디서 안정적으로 공급받아야 할지 판단하기 어렵습니다."
                  : "While demand is real, finding a reliable importer who guarantees consistent inventory of authentic SKUs is difficult."
                }
              </p>
            </div>

            {/* Desktop connection arrow to CARD 03 */}
            <div className="hidden lg:flex absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 text-accent items-center opacity-60">
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* CARD 03 - PRODUCT SELECTION */}
          <div 
            className={`relative bg-[#111] border border-[#2a2a2a] rounded-[16px] p-6 flex flex-col gap-4 text-left transition-all duration-700 ease-out transform ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            } hover:-translate-y-1 hover:border-[#ff2b75]/30 hover:shadow-[0_0_15px_rgba(255,43,117,0.05)]`}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-text-secondary tracking-widest font-bold uppercase">
                03 · PRODUCT SELECTION
              </span>
              <div className="w-9 h-9 rounded-full bg-[#ff2b75]/5 flex items-center justify-center text-accent">
                <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold text-white min-h-[40px] flex items-center font-display">
                Too Many Products. Which Ones Will Sell?
              </h4>
              <p className="text-[11px] text-text-secondary leading-relaxed pt-2 border-t border-[#2a2a2a]">
                {isKo 
                  ? "수천 개 제품 중 실제로 우리 매장에서 팔릴 제품을 고르기 어렵습니다. 온라인 인기 제품이 내 매장에서도 팔린다는 보장은 없습니다."
                  : "With thousands of cosmetic brands, selecting the specific SKUs that fit your local store demographic is a guesswork."
                }
              </p>
            </div>

            {/* Desktop connection arrow to CARD 04 */}
            <div className="hidden lg:flex absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 text-accent items-center opacity-60">
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* CARD 04 - INVENTORY RISK */}
          <div 
            className={`relative bg-[#111] border border-[#2a2a2a] rounded-[16px] p-6 flex flex-col gap-4 text-left transition-all duration-700 ease-out transform ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            } hover:-translate-y-1 hover:border-[#ff2b75]/30 hover:shadow-[0_0_15px_rgba(255,43,117,0.05)]`}
            style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-text-secondary tracking-widest font-bold uppercase">
                04 · INVENTORY RISK
              </span>
              <div className="w-9 h-9 rounded-full bg-[#ff2b75]/5 flex items-center justify-center text-accent">
                <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold text-white min-h-[40px] flex items-center font-display">
                New Products Mean New Inventory Risk.
              </h4>
              <p className="text-[11px] text-text-secondary leading-relaxed pt-2 border-t border-[#2a2a2a]">
                {isKo 
                  ? "잘못 선택한 제품은 Slow Seller가 되고 결국 Dead Stock으로 매장에 남습니다. 새로운 카테고리 도입이 고스란히 리테일러의 재고 리스크가 됩니다."
                  : "Buying new products without sales data inevitably leads to slow-moving inventory, locking up your cash flow in dead stock."
                }
              </p>
            </div>

            {/* Desktop connection arrow to CARD 05 */}
            <div className="hidden lg:flex absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 text-accent items-center opacity-60">
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* CARD 05 - MARGIN PRESSURE */}
          <div 
            className={`relative rounded-[16px] p-6 flex flex-col gap-4 text-left transition-all duration-[1000ms] ease-out transform ${
              isVisible 
                ? "opacity-100 translate-y-0 scale-100 border-2 border-[#ff2b75] bg-[#0c0c0c] shadow-[0_0_20px_rgba(255,43,117,0.18)]" 
                : "opacity-0 translate-y-8 scale-95 border-2 border-[#ff2b75]/20 bg-[#111] shadow-none"
            } hover:-translate-y-1`}
            style={{ 
              transitionDelay: isVisible ? "550ms" : "0ms",
              transitionProperty: "opacity, transform, border-color, box-shadow"
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-accent tracking-widest font-bold uppercase">
                05 · MARGIN PRESSURE
              </span>
              <div className="w-9 h-9 rounded-full bg-[#ff2b75]/10 flex items-center justify-center text-accent">
                <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold text-accent min-h-[40px] flex items-center font-display">
                More Sales Don’t Always Mean Better Profit.
              </h4>
              <p className="text-[11px] text-text-secondary leading-relaxed pt-2 border-t border-[#2a2a2a]">
                {isKo 
                  ? "동일 상품의 가격 경쟁과 기존 카테고리의 낮은 마진 구조 때문에, 매출이 늘어도 실제 수익성을 개선하기 어렵습니다."
                  : "If you sell low-margin items or enter price-matching battles, higher transaction volume won't improve your bottom line."
                }
              </p>
            </div>
          </div>

        </div>

        {/* Bottom alert info capsule */}
        <div 
          className={`inline-flex items-center gap-3.5 px-6 py-3.5 rounded-full border border-[#2a2a2a] bg-[#0c0c0c]/80 text-left transition-all duration-1000 delay-[900ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-5 h-5 rounded-full bg-[#ff2b75]/10 border border-[#ff2b75]/35 flex items-center justify-center text-[#ff2b75] text-[10px] font-black shrink-0">
            !
          </div>
          <p className="margin-0 text-xs text-white leading-normal font-semibold">
            {isKo 
              ? "이 문제들은 각각 따로 존재하지 않습니다. 제품 선정부터 수익성과 재고까지 서로 연결되어 있습니다."
              : "These issues are deeply interconnected. Solving them requires an integrated system covering selection, merchandising, margins, and replenishment."
            }
          </p>
        </div>

      </div>
    </section>
  );
}
