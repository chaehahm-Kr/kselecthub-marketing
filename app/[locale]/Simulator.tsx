"use client";

import React, { useState, useEffect } from "react";
import { ko } from "../locales/ko";

export default function Simulator() {
  const t = ko.simulator;

  // 1. Simulator Input States (Matches Claude Design exact slider specs)
  const [space, setSpace] = useState<number>(2000);
  const [investment, setInvestment] = useState<number>(20000);
  const [avgPrice, setAvgPrice] = useState<number>(18);
  const [margin, setMargin] = useState<number>(45);
  const [turns, setTurns] = useState<number>(6);

  // Helper formats
  const fmtMoney = (n: number) => {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M";
    return "$" + Math.round(n).toLocaleString("en-US");
  };
  const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");
  
  // Custom slider background track dynamic coloring
  const trackStyle = (val: number, min: number, max: number) => {
    const pct = ((val - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, var(--dl-magenta-500) ${pct}%, var(--dl-grey-200) ${pct}%)`
    };
  };

  // 2. Verified Business Calculation Logic (Keep K Select Hub Core Business Formulas)
  const annualCogs = investment * turns;
  const annualSales = Math.round(annualCogs / (1 - margin / 100));
  const grossProfit = annualSales - annualCogs;
  
  const annualUnits = Math.round(annualSales / avgPrice);
  const monthlySales = Math.round(annualSales / 12);
  const dailySales = Math.round(annualSales / 365);
  const skuProductivity = avgPrice * turns;
  const recommendedDisplay = space < 1500 ? "4FT Starter" : space < 3500 ? "8FT Growth" : "12FT Destination";

  // Form submit trigger redirection
  const handleApplyClick = () => {
    localStorage.setItem("kselect_recommended_config", `${recommendedDisplay} 모듈 패키지`);
    localStorage.setItem("kselect_simulator_investment", investment.toString());
    
    window.dispatchEvent(
      new CustomEvent("kselect_simulator_recommend", {
        detail: {
          configName: `${recommendedDisplay} 모듈 패키지`,
          space: space < 1500 ? "4ft" : space < 3500 ? "8ft" : "12ft",
          investment: investment,
        },
      })
    );

    const applySection = document.getElementById("apply");
    if (applySection) {
      applySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-surface border border-border rounded-panel p-8 sm:p-12 grid lg:grid-cols-2 gap-14 text-left">
      
      {/* Left Input Sliders Column */}
      <div className="flex flex-col gap-6">
        <span className="text-xs font-black text-accent uppercase tracking-widest block">
          매장 조건 입력
        </span>
        <div className="flex flex-col gap-8 mt-5">
          
          {/* Space Slider */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-sm font-semibold text-text-secondary">K-Beauty 매장 면적</span>
              <span className="font-display text-sm font-black text-white">{fmtInt(space)} sq ft</span>
            </div>
            <input
              type="range"
              min={500}
              max={5000}
              step={100}
              value={space}
              onChange={(e) => setSpace(Number(e.target.value))}
              style={trackStyle(space, 500, 5000)}
              className="ksh-range w-full"
            />
          </div>

          {/* Investment Slider */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-sm font-semibold text-text-secondary">초기 제품 투자금</span>
              <span className="font-display text-sm font-black text-white">{fmtMoney(investment)}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={100000}
              step={1000}
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              style={trackStyle(investment, 5000, 100000)}
              className="ksh-range w-full"
            />
          </div>

          {/* Average Price Slider */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-sm font-semibold text-text-secondary">평균 판매가</span>
              <span className="font-display text-sm font-black text-white">${avgPrice}</span>
            </div>
            <input
              type="range"
              min={8}
              max={40}
              step={1}
              value={avgPrice}
              onChange={(e) => setAvgPrice(Number(e.target.value))}
              style={trackStyle(avgPrice, 8, 40)}
              className="ksh-range w-full"
            />
          </div>

          {/* Margin Slider */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-sm font-semibold text-text-secondary">리테일 마진</span>
              <span className="font-display text-sm font-black text-white">{margin}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={60}
              step={1}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              style={trackStyle(margin, 30, 60)}
              className="ksh-range w-full"
            />
          </div>

          {/* Turns Slider */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-sm font-semibold text-text-secondary">연간 재고 회전율</span>
              <span className="font-display text-sm font-black text-white">{turns}회/년</span>
            </div>
            <input
              type="range"
              min={3}
              max={12}
              step={1}
              value={turns}
              onChange={(e) => setTurns(Number(e.target.value))}
              style={trackStyle(turns, 3, 12)}
              className="ksh-range w-full"
            />
          </div>

        </div>
      </div>

      {/* Right Output Calculations Card Column */}
      <div className="bg-[#121214] border border-[#2a2a2a] rounded-card p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs text-text-secondary font-black uppercase tracking-wider">
            예상 결과 · 연간
          </span>
          <span className="text-[10px] text-accent border border-accent/20 px-3 py-1 rounded-pill font-black bg-accent-light uppercase">
            권장 디스플레이: {recommendedDisplay}
          </span>
        </div>

        <div className="mb-6">
          <span className="font-display text-5xl sm:text-6xl font-black text-accent tracking-tight select-none">
            {fmtMoney(annualSales)}
          </span>
          <p className="mt-2 text-xs font-semibold text-text-secondary">
            예상 연간 소매 매출
          </p>
        </div>

        {/* Dynamic calculations list grid */}
        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#2a2a2a] text-left">
          <div>
            <span className="font-display text-lg font-bold text-white">{fmtMoney(grossProfit)}</span>
            <p className="text-[10px] text-text-secondary mt-1">총 매출총이익</p>
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white">{fmtInt(annualUnits)}개</span>
            <p className="text-[10px] text-text-secondary mt-1">연간 판매 수량</p>
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white">{fmtMoney(monthlySales)}</span>
            <p className="text-[10px] text-text-secondary mt-1">월 평균 매출</p>
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white">{fmtMoney(dailySales)}</span>
            <p className="text-[10px] text-text-secondary mt-1">일 평균 매출</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#2a2a2a] flex items-center justify-between">
          <span className="text-xs text-text-secondary font-semibold">SKU당 연간 생산성</span>
          <span className="font-display text-sm font-black text-white">{fmtMoney(skuProductivity)}</span>
        </div>

        <button
          onClick={handleApplyClick}
          className="w-full h-14 bg-accent hover:bg-[#e01a5e] text-white font-black rounded-pill text-xs mt-8 transition-colors cursor-pointer"
        >
          이 조건으로 파트너 신청하기 →
        </button>
      </div>

    </div>
  );
}
