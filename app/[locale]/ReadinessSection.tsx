"use client";

import React, { useState, useEffect } from "react";

interface Question {
  id: string;
  num: string;
  title: string;
  desc: string;
}

const QUESTIONS: Question[] = [
  {
    id: "section-operation",
    num: "01",
    title: "K-Beauty 전용 섹션 운영",
    desc: "K SELECT HUB의 전용 Display Section을 구성하고, 해당 공간을 큐레이션된 K-Beauty 상품 중심으로 운영할 의향이 있습니다."
  },
  {
    id: "product-learning",
    num: "02",
    title: "Product Learning 참여",
    desc: "오너 또는 담당 직원이 온라인 Product Learning을 통해 주요 상품의 특징과 사용법을 학습하고, 간단한 Knowledge Check에 참여할 의향이 있습니다."
  },
  {
    id: "weekly-update",
    num: "03",
    title: "주 1회 재고 업데이트",
    desc: "정확한 Reorder, Slow Seller 분석, 상품 교환 및 매장별 상품 최적화를 위해 최소 주 1회 플랫폼에서 재고를 업데이트할 수 있습니다."
  },
  {
    id: "category-growth",
    num: "04",
    title: "K-Beauty 카테고리 성장 의향",
    desc: "K-Beauty를 단순한 테스트 상품이 아니라, 향후 매장의 주요 Beauty Category 중 하나로 함께 성장시켜 나갈 의향이 있습니다."
  }
];

export default function ReadinessSection() {
  const [answers, setAnswers] = useState<{ [key: number]: "available" | "discuss" }>({});
  const [highlightFirst, setHighlightFirst] = useState<boolean>(false);

  // Monitor hash change for focus trigger
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#launch-readiness") {
        setHighlightFirst(true);
        const timer = setTimeout(() => {
          setHighlightFirst(false);
        }, 2200);
        return () => clearTimeout(timer);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Toggle selection on double-click/second click
  const handleSelect = (idx: number, type: "available" | "discuss") => {
    setAnswers((prev) => {
      if (prev[idx] === type) {
        const next = { ...prev };
        delete next[idx];
        return next;
      }
      return {
        ...prev,
        [idx]: type
      };
    });
  };

  const handleReset = () => {
    setAnswers({});
  };

  const answeredCount = Object.keys(answers).length;
  const availableCount = Object.values(answers).filter((v) => v === "available").length;
  const discussCount = Object.values(answers).filter((v) => v === "discuss").length;
  const isCompleted = answeredCount === 4;

  const progressPercent = (answeredCount / 4) * 100;

  return (
    <section id="launch-readiness" className="bg-[#0c0c0c] border-y border-[#2a2a2a] overflow-hidden scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px] text-left">
        
        <div className="grid lg:grid-cols-[0.45fr_0.55fr] gap-12 lg:gap-16 items-start">
          
          {/* ================= LEFT SIDE: Sticky Header, Progress & CTA Funnel ================= */}
          <div className="flex flex-col gap-2 lg:sticky lg:top-28">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff2b75]/20 bg-[#ff2b75]/5 mb-4 max-w-max select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
              <span className="text-[10px] tracking-[0.12em] font-black text-white/70 uppercase font-display">
                LAUNCH READINESS — SELF CHECK
              </span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-[34px] font-bold leading-[1.25] text-white tracking-tight m-0">
              성공적인 K-Beauty 런칭을 위한<br />
              준비 사항을 확인해 주세요.
            </h2>
            
            <p className="text-[13.5px] text-[#9ca3af] leading-relaxed mt-5 max-w-md font-medium">
              K SELECT HUB는 단순히 제품을 공급하는 프로그램이 아닙니다. 매장과 함께 K-Beauty 카테고리를 만들고, 실제 판매 데이터를 기반으로 매출을 함께 최적화하는 동반 프로그램입니다.
            </p>
            <p className="text-[13.5px] text-[#7A7A7A] leading-relaxed max-w-md mt-2 font-semibold">
              아래 항목들은 매장의 지속적인 안착과 성장을 약속하기 위한 기본 파트너 협업 원칙입니다. 현재 준비가 완벽하지 않더라도, 파트너 신청 완료 후 함께 대안을 찾을 수 있습니다.
            </p>

            {/* Realtime Progress Indicator Panel */}
            <div className="mt-8 bg-white/[0.02] border border-white/5 rounded-[16px] p-5 max-w-md flex flex-col gap-3.5 select-none shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-[14.5px] font-black text-white font-display">
                  {isCompleted ? "4 / 4 준비 사항 확인 완료" : `${answeredCount} / 4 확인 진행 중`}
                </span>
                <span className="text-xs font-black text-[#ff2b75]">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              
              {/* Progress gauge bar */}
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-[#ff2b75] to-[#ff2b75]/60 transition-all duration-500 ease-out shadow-[0_0_8px_#ff2b75]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Counts & Reset Trigger */}
              <div className="flex justify-between items-center text-[12px] font-bold">
                <div className="flex gap-4 text-white/50">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" /> 
                    진행 가능 <strong className="text-[#ff2b75] font-extrabold">{availableCount}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" /> 
                    협의 필요 <strong className="text-[#00F0FF] font-extrabold">{discussCount}</strong>
                  </span>
                </div>
                {answeredCount > 0 && (
                  <button
                    onClick={handleReset}
                    className="text-[11px] text-white/40 hover:text-[#ff2b75] transition-colors flex items-center gap-1 underline underline-offset-2 cursor-pointer font-bold focus:outline-none"
                    title="초기화"
                  >
                    초기화 ↺
                  </button>
                )}
              </div>
            </div>

            {/* Funnel Trigger CTA */}
            <div className="mt-8 flex flex-col items-start gap-2.5">
              {isCompleted ? (
                <a
                  href="#apply"
                  className="h-14 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-9 rounded-[8px] font-extrabold text-[14.5px] tracking-wide transition-all duration-300 hover:shadow-[0_4px_25px_rgba(255,43,117,0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  aria-label="Confirm eligibility and apply for partnership"
                >
                  파트너십 신청하기 →
                </a>
              ) : (
                <button
                  disabled
                  className="h-14 inline-flex items-center justify-center bg-white/5 border border-white/5 text-white/20 px-9 rounded-[8px] font-extrabold text-[14.5px] tracking-wide cursor-not-allowed select-none transition-all"
                  aria-label="Application locked until check completed"
                >
                  질문에 모두 답하면 활성화됩니다
                </button>
              )}
              <span className="text-[10px] text-[#7A7A7A] font-semibold tracking-wide pl-2">
                * 협의 필요 항목이 있어도 파트너 신청이 가능합니다.
              </span>
            </div>

          </div>

          {/* ================= RIGHT SIDE: Vertical Question Cards Stack ================= */}
          <div className="flex flex-col gap-5 w-full">
            {QUESTIONS.map((q, idx) => {
              const selected = answers[idx];
              const isFirstHighlit = idx === 0 && highlightFirst;

              return (
                <div
                  key={q.id}
                  className={`bg-white/[0.01] rounded-[20px] p-6 text-left transition-all duration-300 border flex flex-col gap-4.5 ${
                    isFirstHighlit
                      ? "border-[#ff2b75] bg-[#ff2b75]/[0.02] shadow-[0_0_20px_rgba(255,43,117,0.2)] scale-[1.01]"
                      : selected === "available"
                      ? "border-[#ff2b75]/40 bg-[#ff2b75]/[0.01]"
                      : selected === "discuss"
                      ? "border-[#00F0FF]/40 bg-[#00F0FF]/[0.01]"
                      : "border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`text-[12px] font-black w-6 h-6 rounded-full flex items-center justify-center border font-display transition-colors select-none ${
                      selected === "available"
                        ? "bg-[#ff2b75] border-[#ff2b75] text-white"
                        : selected === "discuss"
                        ? "bg-[#00F0FF] border-[#00F0FF] text-[#0c0c0c]"
                        : "border-white/10 text-white/40"
                    }`}>
                      {q.num}
                    </span>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <h4 className="text-[15.5px] font-extrabold text-white leading-snug">
                        {q.title}
                      </h4>
                      <p className="text-[12.5px] text-[#9ca3af] leading-relaxed font-medium">
                        {q.desc}
                      </p>
                    </div>
                  </div>

                  {/* Buttons with clear hierarchy */}
                  <div className="flex gap-3.5 pl-10">
                    <button
                      onClick={() => handleSelect(idx, "available")}
                      className={`h-10 px-6.5 rounded-[8px] font-extrabold text-[12.5px] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2b75]/50 ${
                        selected === "available"
                          ? "bg-[#ff2b75]/10 border border-[#ff2b75] text-white shadow-[0_0_12px_rgba(255,43,117,0.15)]"
                          : "border border-white/10 text-white/50 bg-[#0c0c0c] hover:border-white/20 hover:text-white"
                      }`}
                    >
                      진행 가능
                    </button>
                    
                    <button
                      onClick={() => handleSelect(idx, "discuss")}
                      className={`h-10 px-6.5 rounded-[8px] font-extrabold text-[12.5px] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00F0FF]/50 ${
                        selected === "discuss"
                          ? "bg-[#00F0FF]/10 border border-[#00F0FF] text-white shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                          : "border border-white/10 text-white/50 bg-[#0c0c0c] hover:border-white/20 hover:text-white"
                      }`}
                    >
                      협의 필요
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
