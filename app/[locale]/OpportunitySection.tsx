"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { assetConfig } from "../assets.config";

// CountUp Component - Easing-based high-performance count metrics
const OpportunityCountUp = ({
  value,
  duration = 1200,
  isVisible,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  duration?: number;
  isVisible: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    // Reduced motion handling
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing: easeOutQuad
      const easedProgress = progress * (2 - progress);
      
      setCount(easedProgress * value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration, isVisible]);

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default function OpportunitySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      id="opportunity"
      ref={sectionRef}
      className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px] text-left relative"
    >
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-[56px] items-center mb-14">
        
        {/* Left text description column with sequential fade-up */}
        <div 
          className={`flex flex-col gap-4 transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs font-semibold text-accent tracking-[0.04em]">
            01 — WHY NOW?
          </span>
          <h2 
            className={`font-display text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.2] tracking-tight text-white mb-4 select-none transition-all duration-700 ease-out transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
          >
            미국 K-Beauty 시장은<br />
            성장하고 있습니다.<br />
            하지만 진짜 기회는<br />
            <span className="text-accent">‘무엇을 어떻게 파느냐’</span>에 있습니다.
          </h2>
          <p 
            className={`text-sm text-text-secondary leading-relaxed max-w-xl transition-all duration-700 ease-out transform ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
          >
            K-Beauty는 이제 일시적인 트렌드가 아닙니다.<br />
            소비자 수요, 리테일 채널, 시장 규모 모두 빠르게 확대되고 있습니다.<br />
            성장의 흐름을 매출로 전환하는 전략이 지금 필요한 이유입니다.
          </p>
        </div>

        {/* Right graphic column (U.S. K-Beauty Sales Line Chart Card) */}
        <div 
          className={`bg-[#0c0c0c] border border-[#2a2a2a] rounded-[20px] p-8 sm:p-10 w-full box-border relative transition-all duration-800 ease-out transform ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <span className="text-xs text-text-secondary font-bold block mb-4 uppercase tracking-wider">
            U.S. K-Beauty Sales
          </span>
          <div className="flex flex-wrap items-baseline gap-4 mb-6">
            <span className="font-display text-5xl font-black text-accent tracking-tight">
              <OpportunityCountUp value={2.0} decimals={1} prefix="$" suffix="B" isVisible={isVisible} />
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl font-bold text-accent">
                <OpportunityCountUp value={37} decimals={0} prefix="+" suffix="%" isVisible={isVisible} />
              </span>
              <span className="text-[10px] text-text-secondary font-semibold uppercase">YoY Growth</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-text-secondary ml-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
              2025
            </div>
          </div>

          {/* SVG Area & Polyline Line Drawing Chart */}
          <div className="w-full h-40 relative">
            <svg viewBox="0 0 1120 160" width="100%" height="160" className="block overflow-visible">
              {/* Grid Lines */}
              <line x1="0" y1="140" x2="1120" y2="140" stroke="#222222" strokeWidth="1" />
              <line x1="0" y1="95" x2="1120" y2="95" stroke="#222222" strokeWidth="1" strokeDasharray="3 6" />
              <line x1="0" y1="50" x2="1120" y2="50" stroke="#222222" strokeWidth="1" strokeDasharray="3 6" />
              
              {/* Area fill */}
              <path 
                d="M0,140 L0,130 L373,110 L746,65 L1120,15 L1120,140 Z" 
                fill="#ff2b75" 
                opacity="0.08" 
                className={`transition-opacity duration-1000 delay-[1200ms] ${isVisible ? "opacity-100" : "opacity-0"}`}
              />
              
              {/* Polyline line with custom dashes to animate rendering */}
              <polyline 
                points="0,130 373,110 746,65 1120,15" 
                fill="none" 
                stroke="#ff2b75" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={isVisible ? "chart-polyline-draw" : "opacity-0"}
              />
              
              {/* Intersection circles */}
              <g className={`transition-opacity duration-500 delay-[1200ms] ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <circle cx="0" cy="130" r="4.5" fill="#ff2b75" />
                <circle cx="373" cy="110" r="4.5" fill="#ff2b75" />
                <circle cx="746" cy="65" r="4.5" fill="#ff2b75" />
                <circle cx="1120" cy="15" r="6" fill="#ff2b75" stroke="#141414" strokeWidth="2" />
              </g>
            </svg>
          </div>
          <div className="flex justify-between mt-3 text-[11px] text-text-secondary font-semibold">
            <span>2021</span>
            <span>2023</span>
            <span>2025</span>
            <span>2027E</span>
          </div>

          <div className="flex justify-between items-center border-t border-[#2a2a2a] mt-6 pt-5">
            <span className="text-[10px] text-text-secondary font-medium">Source: NielsenIQ, Oct 2025</span>
            <span className="text-[10px] text-[#10b981] font-black uppercase tracking-wider">CAGR +21% (Estimates)</span>
          </div>
        </div>

      </div>

      {/* Sub 4 Opportunity Tiles grid (Reproduction from target layout with sequential reveal) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* TILE 01 */}
        <div 
          className={`bg-[#0c0c0c] border border-[#2a2a2a] rounded-[16px] p-8 flex flex-col gap-4 text-left transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          } hover:-translate-y-1 hover:border-[#2a2a2a]/80`}
          style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-text-secondary tracking-widest uppercase font-bold">
              TILE 01 · SALES MOMENTUM
            </span>
            {/* Line Trend SVG Icon */}
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[32px] font-black text-accent leading-none">
              <OpportunityCountUp value={37} decimals={0} prefix="+" suffix="%" isVisible={isVisible} />
            </span>
            <span className="text-[10px] text-text-secondary font-bold">YoY</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1.5">K-Beauty Sales Are Surging</h4>
            <p className="text-xs text-text-secondary leading-relaxed">미국 K-Beauty 판매가 빠르게 확대되고 있습니다.</p>
          </div>
        </div>

        {/* TILE 02 */}
        <div 
          className={`bg-[#0c0c0c] border border-[#2a2a2a] rounded-[16px] p-8 flex flex-col gap-4 text-left transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          } hover:-translate-y-1 hover:border-[#2a2a2a]/80`}
          style={{ transitionDelay: isVisible ? "250ms" : "0ms" }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-text-secondary tracking-widest uppercase font-bold">
              TILE 02 · MARKET LEADERSHIP
            </span>
            {/* Globe SVG Icon */}
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[32px] font-black text-accent leading-none">#1</span>
            <span className="text-[9px] text-accent font-black uppercase tracking-wider">Import Source</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-2 leading-snug">Korea Is America’s No.1 Cosmetics Import Source</h4>
            
            <div className="flex items-baseline gap-1 border-t border-[#2a2a2a] pt-3.5 mt-2.5">
              <span className="text-base font-black text-accent leading-none">
                <OpportunityCountUp value={24.8} decimals={1} suffix="%" isVisible={isVisible} />
              </span>
              <span className="text-[9px] text-text-secondary font-semibold">U.S. Import Share (2025)</span>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed mt-2">
              2025년, 한국은 프랑스를 제치고 미국 화장품 수입 시장 1위를 기록했습니다.
            </p>
          </div>
        </div>

        {/* TILE 03 */}
        <div 
          className={`bg-[#0c0c0c] border border-[#2a2a2a] rounded-[16px] p-8 flex flex-col gap-4 text-left transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          } hover:-translate-y-1 hover:border-[#2a2a2a]/80`}
          style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-text-secondary tracking-widest uppercase font-bold">
              TILE 03 · RETAIL OPPORTUNITY
            </span>
            {/* Shopping Cart SVG Icon */}
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[32px] font-black text-accent leading-none">
              <OpportunityCountUp value={76} decimals={0} suffix="%" isVisible={isVisible} />
            </span>
            <span className="text-[9px] font-bold text-white bg-[#ff2b75] px-2 py-0.5 rounded-full uppercase tracking-wider select-none">
              North America
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-2 leading-snug">From Digital Demand to Physical Shelf</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              북미 K-Beauty 판매의 76%가 온라인에서 발생하고 있습니다. 이미 형성된 강한 디지털 수요를 오프라인 리테일 매장으로 연결할 기회가 있습니다.
            </p>
          </div>
        </div>

        {/* TILE 04 (Highlighted with Fading-in border accentuation) */}
        <div 
          className={`bg-[#0c0c0c] rounded-[16px] p-8 flex flex-col gap-4 text-left transition-all duration-[1000ms] ease-out transform ${
            isVisible 
              ? "opacity-100 translate-y-0 scale-100 border-2 border-[#ff2b75] shadow-[0_0_12px_rgba(255,43,117,0.15)]" 
              : "opacity-0 translate-y-8 scale-95 border-2 border-[#ff2b75]/20 shadow-none"
          } hover:-translate-y-1`}
          style={{ 
            transitionDelay: isVisible ? "550ms" : "0ms",
            transitionProperty: "opacity, transform, border-color, box-shadow"
          }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-accent tracking-widest uppercase font-bold">
              TILE 04 · EXECUTION GAP
            </span>
            {/* Bullseye SVG Icon */}
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 110-20 10 10 0 010 20z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
          <div>
            <span className="font-display text-[16px] sm:text-[18px] font-black text-accent block leading-tight">
              Growth ≠ Guaranteed Sales
            </span>
          </div>
          <div>
            <p className="text-xs text-white leading-normal font-semibold mb-3.5">
              시장이 커져도 저절로 팔리지는 않습니다.
            </p>
            {/* Check list */}
            <div className="flex flex-col gap-1.5 text-xs text-text-secondary font-medium">
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#ff2b75] fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Right Products
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#ff2b75] fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Right Assortment
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#ff2b75] fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Right Execution
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Sources Footnote Row */}
      <div className="text-center md:text-left border-t border-[#2a2a2a] pt-4.5">
        <p className="margin-0 text-[10px] sm:text-[11px] text-text-secondary leading-relaxed">
          Sources: NielsenIQ (U.S. K-Beauty Sales 2025, North America E-Commerce Share 2026), U.S. International Trade Commission (U.S. Cosmetics Imports 2025)
        </p>
      </div>
    </section>
  );
}
