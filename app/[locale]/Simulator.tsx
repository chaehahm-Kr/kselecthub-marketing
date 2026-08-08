"use client";

import React, { useState, useEffect } from "react";
import { ko } from "../locales/ko";

export default function Simulator() {
  const t = ko.simulator;

  // Question States
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  
  // Results
  const [result, setResult] = useState<{
    configName: string;
    skuRange: string;
    displayType: string;
    initialInvestment: string;
    margin: string;
    turn: string;
    annualSales: string;
    grossProfit: string;
  } | null>(null);

  // Question choices
  const q1Choices = [
    { label: "1,500 sq.ft 이하", val: "under-1.5k" },
    { label: "1,500–3,000 sq.ft", val: "1.5k-3k" },
    { label: "3,000–5,000 sq.ft", val: "3k-5k" },
    { label: "5,000 sq.ft 이상", val: "over-5k" }
  ];

  const q2Choices = [
    { label: "작은 공간 (2-4ft 미니 섹션)", val: "small" },
    { label: "중간 공간 (4-8ft 단독 진열)", val: "medium" },
    { label: "넓은 공간 (8-12ft+ 샵인샵)", val: "large" },
    { label: "아직 잘 모르겠음", val: "unknown" }
  ];

  const q3Choices = [
    { label: "$3,000 이하", val: "under-3k" },
    { label: "$3,000–$5,000", val: "3k-5k" },
    { label: "$5,000–$7,500", val: "5k-7.5k" },
    { label: "$7,500 이상", val: "over-7.5k" },
    { label: "잘 모르겠음", val: "unknown" }
  ];

  // Calculate recommendation based on choices
  useEffect(() => {
    if (!q1 || !q2 || !q3) {
      setResult(null);
      return;
    }

    // Recommendation logic: Store Conditions -> Recommended Assortment -> SKU Count -> Display -> Budget
    if (q2 === "small" || (q3 === "under-3k" && q2 === "unknown") || (q1 === "under-1.5k" && q2 === "unknown")) {
      // Starter configuration (4FT)
      setResult({
        configName: "K-Beauty Starter (4FT 입문형 패키지)",
        skuRange: "16 - 24 SKUs",
        displayType: "4' Wall Display Module (1 Module)",
        initialInvestment: "$3,000 이하",
        margin: "45% - 60%",
        turn: "연 6 - 8회 회전",
        annualSales: "$65,000 - $80,000",
        grossProfit: "$32,500 - $44,000"
      });
    } else if (q2 === "large" || (q3 === "over-7.5k" && q2 !== "small") || (q1 === "over-5k" && q2 === "large")) {
      // Destination configuration (12FT)
      setResult({
        configName: "K-Beauty Destination (12FT 메인 집중형 패키지)",
        skuRange: "48 - 70 SKUs",
        displayType: "12' Wall Display Modules (3 Modules)",
        initialInvestment: "$7,500 이상",
        margin: "45% - 60%",
        turn: "연 6 - 8회 회전",
        annualSales: "$140,000 - $180,000",
        grossProfit: "$70,000 - $99,000"
      });
    } else {
      // Growth configuration (8FT) - standard middle option
      setResult({
        configName: "K-Beauty Growth (8FT 표준형 패키지)",
        skuRange: "32 - 48 SKUs",
        displayType: "8' Wall Display Modules (2 Modules)",
        initialInvestment: "$3,000 - $5,000",
        margin: "45% - 60%",
        turn: "연 6 - 8회 회전",
        annualSales: "$90,000 - $120,000",
        grossProfit: "$45,000 - $66,000"
      });
    }
  }, [q1, q2, q3]);

  // Handle consultation click: store result in localStorage and scroll to #apply form
  const handleConsultClick = () => {
    if (!result) return;
    localStorage.setItem("kselect_recommended_config", result.configName);
    // Dispatch custom event to notify CtaForm if it's already mounted
    window.dispatchEvent(new CustomEvent("kselect_simulator_recommend", { detail: result.configName }));
    
    const applySection = document.getElementById("apply");
    if (applySection) {
      applySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resetSimulator = () => {
    setQ1(null);
    setQ2(null);
    setQ3(null);
  };

  return (
    <div id="simulator" className="w-full bg-surface border border-border rounded-panel p-8 sm:p-12">
      {/* Simulator Interface */}
      {!result ? (
        <div className="flex flex-col gap-10">
          {/* Question 1 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-ink">{t.questions.q1}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {q1Choices.map((choice) => (
                <button
                  key={choice.val}
                  type="button"
                  onClick={() => setQ1(choice.val)}
                  className={`p-6 text-sm font-semibold rounded-card border transition-all cursor-pointer text-center ${
                    q1 === choice.val
                      ? "bg-accent text-white border-accent"
                      : "bg-bg text-ink border-border hover:border-accent"
                  }`}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-ink">{t.questions.q2}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {q2Choices.map((choice) => (
                <button
                  key={choice.val}
                  type="button"
                  onClick={() => setQ2(choice.val)}
                  className={`p-6 text-sm font-semibold rounded-card border transition-all cursor-pointer text-center ${
                    q2 === choice.val
                      ? "bg-accent text-white border-accent"
                      : "bg-bg text-ink border-border hover:border-accent"
                  }`}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-ink">{t.questions.q3}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {q3Choices.map((choice) => (
                <button
                  key={choice.val}
                  type="button"
                  onClick={() => setQ3(choice.val)}
                  className={`p-5 text-xs font-semibold rounded-card border transition-all cursor-pointer text-center ${
                    q3 === choice.val
                      ? "bg-accent text-white border-accent"
                      : "bg-bg text-ink border-border hover:border-accent"
                  }`}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center border-b border-border pb-6">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-wide">YOUR RECOMMENDATION</span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-1">
                {result.configName}
              </h3>
            </div>
            <button
              onClick={resetSimulator}
              className="text-xs font-semibold px-4 py-2 border border-border rounded-pill hover:bg-bg transition-colors cursor-pointer"
            >
              다시 시뮬레이션하기
            </button>
          </div>

          {/* Core Metrics Visualizations */}
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="bg-bg border border-border p-6 rounded-card flex flex-col justify-between">
              <span className="text-xs text-text-secondary font-medium">추천 상품 범위</span>
              <span className="font-display text-2xl font-bold text-ink mt-2">{result.skuRange}</span>
            </div>
            <div className="bg-bg border border-border p-6 rounded-card flex flex-col justify-between">
              <span className="text-xs text-text-secondary font-medium">추천 Display 모듈</span>
              <span className="font-display text-lg font-bold text-ink mt-2 leading-tight">{result.displayType}</span>
            </div>
            <div className="bg-bg border border-border p-6 rounded-card flex flex-col justify-between">
              <span className="text-xs text-text-secondary font-medium">예상 상품 투자금</span>
              <span className="font-display text-2xl font-bold text-accent mt-2">{result.initialInvestment}</span>
            </div>
            <div className="bg-bg border border-border p-6 rounded-card flex flex-col justify-between">
              <span className="text-xs text-text-secondary font-medium">목표 마진율</span>
              <span className="font-display text-2xl font-bold text-ink mt-2">{result.margin}</span>
            </div>
          </div>

          {/* Expected Revenue / ROI Performance */}
          <div className="bg-bg border border-border p-8 rounded-card grid sm:grid-cols-3 gap-8">
            <div className="flex flex-col justify-center">
              <span className="text-xs text-text-secondary font-medium">예상 재고 회전수</span>
              <span className="font-display text-3xl font-bold text-ink mt-2">{result.turn}</span>
              <div className="w-full bg-border h-2 rounded-pill mt-4 overflow-hidden">
                <div className="bg-accent h-full w-[80%]" /> {/* Visual indicator representation */}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs text-text-secondary font-medium">예상 연간 매출 (Annual Retail Sales)</span>
              <span className="font-display text-3xl font-bold text-ink mt-2 text-accent">{result.annualSales}</span>
              <span className="text-[10px] text-text-secondary mt-1">월 평균 약 ${(parseInt(result.annualSales.replace(/[^0-9]/g, "")) / 12).toLocaleString()} 매출 잠재력</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs text-text-secondary font-medium">예상 연간 소매 마진 (Annual Gross Profit)</span>
              <span className="font-display text-3xl font-bold text-ink mt-2">{result.grossProfit}</span>
              <span className="text-[10px] text-text-secondary mt-1">평균 마진율 50% 적용 시 산출값</span>
            </div>
          </div>

          {/* Disclaimer & CTA */}
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-text-secondary leading-relaxed max-w-2xl text-left">
              ⚠️ <strong>Disclaimer</strong>: {t.disclaimer}
            </p>
            <button
              onClick={handleConsultClick}
              className="w-full sm:w-auto inline-flex h-14 items-center justify-center bg-accent text-white px-8 font-bold rounded-pill hover:opacity-95 transition-opacity text-sm cursor-pointer whitespace-nowrap"
            >
              {t.cta}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
