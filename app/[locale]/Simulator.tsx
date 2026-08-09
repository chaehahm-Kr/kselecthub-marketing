"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ko } from "../locales/ko";

export default function Simulator() {
  const t = ko.simulator;

  // 1. Initial Card Selection States
  const [selectedSpace, setSelectedSpace] = useState<"4ft" | "8ft" | "12ft">("8ft");

  // Recommendation parameters mapping
  const configMeta = {
    "4ft": {
      name: "4 FT - Starter 모듈 패키지",
      defaultBudget: 3000,
      minBudget: 3000,
      maxBudget: 5000,
      skuRange: "16 – 24 SKUs",
      skuMidpoint: 20,
      displayType: "4' LED Wall Display Feature (1 Module)",
      imageSrc: "/images/display_4ft.png",
    },
    "8ft": {
      name: "8 FT - Growth 모듈 패키지",
      defaultBudget: 6000,
      minBudget: 6000,
      maxBudget: 9000,
      skuRange: "32 – 48 SKUs",
      skuMidpoint: 40,
      displayType: "8' LED Wall Display Features (2 Modules)",
      imageSrc: "/images/display_8ft.png",
    },
    "12ft": {
      name: "12 FT - Destination 모듈 패키지",
      defaultBudget: 9000,
      minBudget: 9000,
      maxBudget: 12000,
      skuRange: "48 – 70 SKUs",
      skuMidpoint: 59,
      displayType: "12' LED Wall Display Features (3 Modules)",
      imageSrc: "/images/display_12ft.jpg",
    },
  };

  const activeConfig = configMeta[selectedSpace];

  // 2. Slider States (Initialized based on selectedSpace)
  const [initialInvestment, setInitialInvestment] = useState<number>(6000);
  const [averagePrice, setAveragePrice] = useState<number>(20);
  const [targetMargin, setTargetMargin] = useState<number>(50);
  const [inventoryTurn, setInventoryTurn] = useState<number>(6); // Default 6 as per brief

  // Sync investment slider when space category changes
  useEffect(() => {
    setInitialInvestment(activeConfig.defaultBudget);
  }, [selectedSpace]);

  // 3. Output Calculations
  const annualCogs = initialInvestment * inventoryTurn;
  const annualSales = Math.round(annualCogs / (1 - targetMargin / 100));
  const annualGrossProfit = annualSales - annualCogs;
  
  const annualUnits = Math.round(annualSales / averagePrice);
  const monthlyUnits = Math.round(annualUnits / 12);
  const dailyUnits = Math.round(annualUnits / 365);
  
  const unitsPerSkuPerMonth = Number((monthlyUnits / activeConfig.skuMidpoint).toFixed(1));
  const gmroi = Math.round((annualGrossProfit / initialInvestment) * 100);

  // Scroll to application form and bind selected configuration
  const handleApplyClick = () => {
    localStorage.setItem("kselect_recommended_config", activeConfig.name);
    localStorage.setItem("kselect_simulator_investment", initialInvestment.toString());
    
    // Dispatch custom event to auto-select fields in CtaForm
    window.dispatchEvent(
      new CustomEvent("kselect_simulator_recommend", {
        detail: {
          configName: activeConfig.name,
          space: selectedSpace,
          investment: initialInvestment,
        },
      })
    );

    const applySection = document.getElementById("apply");
    if (applySection) {
      applySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="simulator" className="w-full bg-surface border border-border rounded-panel p-6 sm:p-10 flex flex-col gap-10">
      
      {/* Step 1: Input controls */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Side Inputs (Sliders and Buttons) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">
              STEP 01. 매장 규모 및 버짓 정보 입력
            </span>
            <h3 className="font-display text-2xl font-bold text-ink">
              매장 조건 시뮬레이션 설정
            </h3>
          </div>

          {/* Space Option Cards */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-text-secondary">
              {t.inputs.size} (K-Beauty 전용 공간)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["4ft", "8ft", "12ft"] as const).map((space) => (
                <button
                  key={space}
                  type="button"
                  onClick={() => setSelectedSpace(space)}
                  className={`p-4 rounded-card border transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1 ${
                    selectedSpace === space
                      ? "bg-accent-light border-accent text-accent"
                      : "bg-[#0c0d14] border-border text-text-secondary hover:border-accent-light"
                  }`}
                >
                  <span className="font-display text-lg font-bold">
                    {space.toUpperCase()}
                  </span>
                  <span className="text-[10px] opacity-85 leading-none">
                    {configMeta[space].skuRange}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Investment Slider */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-text-secondary">{t.inputs.budget} (초기 상품 투자액)</span>
              <span className="font-display text-accent text-lg">${initialInvestment.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={activeConfig.minBudget}
              max={activeConfig.maxBudget + 3000}
              step={500}
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full accent-accent bg-[#0c0d14] rounded-pill h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-muted">
              <span>Min: ${activeConfig.minBudget.toLocaleString()}</span>
              <span>Max: ${(activeConfig.maxBudget + 3000).toLocaleString()}</span>
            </div>
          </div>

          {/* Average Retail Price Slider */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-text-secondary">{t.inputs.averagePrice} (평균 판매가)</span>
              <span className="font-display text-accent text-lg">${averagePrice}</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={1}
              value={averagePrice}
              onChange={(e) => setAveragePrice(Number(e.target.value))}
              className="w-full accent-accent bg-[#0c0d14] rounded-pill h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-muted">
              <span>$10</span>
              <span>$50 (핵심 타겟대: $15 ~ $25)</span>
            </div>
          </div>

          {/* Target Retail Margin Slider */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-text-secondary">{t.inputs.margin} (목표 소매 마진율)</span>
              <span className="font-display text-accent text-lg">{targetMargin}%</span>
            </div>
            <input
              type="range"
              min={45}
              max={60}
              step={1}
              value={targetMargin}
              onChange={(e) => setTargetMargin(Number(e.target.value))}
              className="w-full accent-accent bg-[#0c0d14] rounded-pill h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-muted">
              <span>45%</span>
              <span>60% (K-Beauty 고마진 마크업)</span>
            </div>
          </div>

          {/* Inventory Turn Radio Group */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-text-secondary">
              {t.inputs.turn} (연간 재고 회전율)
            </label>
            <div className="flex justify-between gap-2">
              {[4, 5, 6, 7, 8].map((turn) => (
                <button
                  key={turn}
                  type="button"
                  onClick={() => setInventoryTurn(turn)}
                  className={`flex-1 py-3 text-sm font-display font-bold rounded-card border transition-all cursor-pointer text-center ${
                    inventoryTurn === turn
                      ? "bg-accent text-white border-accent"
                      : "bg-[#0c0d14] border-border text-text-secondary hover:border-accent"
                  }`}
                >
                  {turn} Turns
                </button>
              ))}
            </div>
            <span className="text-[10px] text-text-muted leading-tight">
              * 기본값은 6회전입니다. 회전수가 높을수록 상품 원재고 대비 연 매출 효율이 가파르게 증대됩니다.
            </span>
          </div>

        </div>

        {/* Right Side Recommendation Card with Fixture Image */}
        <div className="lg:col-span-5 bg-[#0c0d14] border border-border rounded-card p-6 flex flex-col justify-between gap-6">
          <div>
            <span className="text-[10px] text-accent font-bold uppercase tracking-wider">
              RECOMMENDED MODULE
            </span>
            <h4 className="font-display text-lg font-bold text-ink mt-1">
              {activeConfig.name}
            </h4>
            <p className="text-xs text-text-secondary mt-1 leading-normal">
              {activeConfig.displayType}
            </p>
          </div>

          {/* Fixture image card */}
          <div className="relative w-full aspect-square bg-[#12141c] border border-border rounded-card overflow-hidden flex items-center justify-center">
            <Image
              src={activeConfig.imageSrc}
              alt={activeConfig.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>

          <div className="border-t border-border pt-4 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-text-muted block">추천 수량 (SKUs)</span>
              <span className="font-display text-sm font-bold text-ink">{activeConfig.skuRange}</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted block">초기 상품 구성액</span>
              <span className="font-display text-sm font-bold text-accent">${activeConfig.defaultBudget.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Step 2: Outputs (Expected ROI results) */}
      <div className="border-t border-border pt-8 flex flex-col gap-6">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">
            STEP 02. 시뮬레이션 계산 결과
          </span>
          <h3 className="font-display text-2xl font-bold text-ink">
            예상 매출 및 연간 소매 마진 (ROI)
          </h3>
        </div>

        {/* Main Outputs Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0c0d14] border border-border p-6 rounded-card flex flex-col justify-between">
            <span className="text-xs text-text-secondary font-medium">{t.outputs.sales}</span>
            <span className="font-display text-3xl font-bold text-ink mt-3">${annualSales.toLocaleString()}</span>
            <span className="text-[10px] text-text-muted mt-2">연간 총 소매 매출액</span>
          </div>

          <div className="bg-[#0c0d14] border border-border p-6 rounded-card flex flex-col justify-between">
            <span className="text-xs text-text-secondary font-medium">{t.outputs.profit}</span>
            <span className="font-display text-3xl font-bold text-accent mt-3">${annualGrossProfit.toLocaleString()}</span>
            <span className="text-[10px] text-text-muted mt-2">목표 마진 대비 순수익</span>
          </div>

          <div className="bg-[#0c0d14] border border-border p-6 rounded-card flex flex-col justify-between">
            <span className="text-xs text-text-secondary font-medium">{t.outputs.gmroi}</span>
            <span className="font-display text-3xl font-bold text-ink mt-3">{gmroi}%</span>
            <div className="w-full bg-border h-1.5 rounded-pill mt-3 overflow-hidden">
              <div
                className="bg-accent h-full transition-all duration-500"
                style={{ width: `${Math.min(gmroi / 10, 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-[#0c0d14] border border-border p-6 rounded-card flex flex-col justify-between">
            <span className="text-xs text-text-secondary font-medium">{t.outputs.cogs}</span>
            <span className="font-display text-3xl font-bold text-ink mt-3">${annualCogs.toLocaleString()}</span>
            <span className="text-[10px] text-text-muted mt-2">연간 총 상품 공급 매입액</span>
          </div>
        </div>

        {/* Sub Metrics (Units details) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0c0d14] border border-border p-6 rounded-card">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-secondary">{t.outputs.annualUnits}</span>
            <span className="font-display text-xl font-bold text-ink">{annualUnits.toLocaleString()} <span className="text-xs font-semibold">Units</span></span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-secondary">{t.outputs.monthlyUnits}</span>
            <span className="font-display text-xl font-bold text-ink">{monthlyUnits.toLocaleString()} <span className="text-xs font-semibold">Units</span></span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-secondary">{t.outputs.dailyUnits}</span>
            <span className="font-display text-xl font-bold text-accent">{dailyUnits.toLocaleString()} <span className="text-xs font-semibold">Units</span></span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-text-secondary">{t.outputs.skuUnits}</span>
            <span className="font-display text-xl font-bold text-ink">{unitsPerSkuPerMonth.toLocaleString()} <span className="text-xs font-semibold">Units</span></span>
          </div>
        </div>

      </div>

      {/* Step 3: Calculation Logic Flow Infographic */}
      <div className="border-t border-border pt-8 flex flex-col gap-6">
        <h4 className="font-display text-sm font-bold text-ink uppercase tracking-wider">
          {t.howItIsCalculated.title}
        </h4>
        
        {/* Step-by-Step Flow Cards */}
        <div className="grid md:grid-cols-4 gap-4 text-xs">
          
          <div className="bg-[#0c0d14] border border-border p-4 rounded-card flex flex-col gap-2">
            <span className="text-[10px] text-accent font-bold">STAGE 01</span>
            <span className="font-semibold text-ink">{t.howItIsCalculated.steps[0].label}</span>
            <p className="text-text-secondary leading-relaxed">
              초기 투자액(${initialInvestment.toLocaleString()})에 재고 회전수({inventoryTurn}회)를 곱해 연간 총 공급액(${annualCogs.toLocaleString()})을 산출합니다.
            </p>
          </div>

          <div className="bg-[#0c0d14] border border-border p-4 rounded-card flex flex-col gap-2">
            <span className="text-[10px] text-accent font-bold">STAGE 02</span>
            <span className="font-semibold text-ink">{t.howItIsCalculated.steps[1].label}</span>
            <p className="text-text-secondary leading-relaxed">
              공급액(${annualCogs.toLocaleString()})을 마진 공제비율({100 - targetMargin}%)로 나누어 연 소매 매출액(${annualSales.toLocaleString()})을 도출합니다.
            </p>
          </div>

          <div className="bg-[#0c0d14] border border-border p-4 rounded-card flex flex-col gap-2">
            <span className="text-[10px] text-accent font-bold">STAGE 03</span>
            <span className="font-semibold text-ink">{t.howItIsCalculated.steps[2].label}</span>
            <p className="text-text-secondary leading-relaxed">
              소매매출(${annualSales.toLocaleString()})에서 원가(${annualCogs.toLocaleString()})를 빼 순이익(${annualGrossProfit.toLocaleString()})을 계산합니다.
            </p>
          </div>

          <div className="bg-[#0c0d14] border border-border p-4 rounded-card flex flex-col gap-2">
            <span className="text-[10px] text-accent font-bold">STAGE 04</span>
            <span className="font-semibold text-ink">{t.howItIsCalculated.steps[3].label}</span>
            <p className="text-text-secondary leading-relaxed">
              연간 판매개수를 365일로 균등 쪼개어 하루 평균 목표치({dailyUnits}개)와 SKU별 월판매량({unitsPerSkuPerMonth}개)을 제공합니다.
            </p>
          </div>

        </div>

        {/* GMROI Infographic summary bar */}
        <div className="bg-accent-light border border-accent/20 rounded-card p-5 text-sm text-ink leading-relaxed">
          💡 <strong>매장 성장 분석 요약</strong>: 초기 재고 비용으로 <strong>${initialInvestment.toLocaleString()}</strong>을 투입하고, 연간 <strong>{inventoryTurn}회</strong> 회전하며 <strong>{targetMargin}%</strong>의 마진을 확보하면, 연간 총 소매 매출액은 <strong>${annualSales.toLocaleString()}</strong>에 이르며 순마진 이익으로만 <strong>${annualGrossProfit.toLocaleString()}</strong>을 돌려받게 됩니다. 이는 하루에 평균 약 <strong>{dailyUnits}개</strong>의 제품 판매만 꾸준히 달성해도 달성 가능한 목표입니다. (초기 재고 투자 대비 마진 회수율 <strong>GMROI: {gmroi}%</strong>)
        </div>
      </div>

      {/* Step 4: Disclaimer & CTA */}
      <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-[10px] text-text-muted leading-relaxed max-w-2xl text-left">
          {t.disclaimer}
        </p>
        <button
          onClick={handleApplyClick}
          className="w-full sm:w-auto inline-flex h-14 items-center justify-center bg-accent text-white px-8 font-bold rounded-pill hover:bg-accent-hover transition-colors text-sm cursor-pointer whitespace-nowrap"
        >
          {t.cta}
        </button>
      </div>

    </div>
  );
}
