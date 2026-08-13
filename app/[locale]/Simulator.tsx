"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { QUESTIONS, QuestionConfig, AnswerChoice } from "./SimulatorQuestions";
import { simulateGrowth, SimulationResult } from "./SimulatorAdapter";

interface SimulatorProps {
  locale?: string;
}

export default function Simulator({ locale = "ko" }: SimulatorProps) {
  // Simulator State
  const [step, setStep] = useState<"intro" | "assessment" | "transition" | "results">("intro");
  
  // Guided Assessment States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  // Results UI States
  const [activeResultTab, setActiveResultTab] = useState<"display" | "product" | "financial">("display");
  const [showAlternative, setShowAlternative] = useState<boolean>(false);
  const [showConsultationModal, setShowConsultationModal] = useState<boolean>(false);
  
  // Section transition insight popup state
  const [showSectionInsight, setShowSectionInsight] = useState<boolean>(false);
  const [lastFinishedSection, setLastFinishedSection] = useState<string>("");

  // Transition state loaders
  const [transitionStage, setTransitionStage] = useState<number>(0);
  const transitionMessages = [
    "매장 특성 분석 중...",
    "고객 수요 분석 중...",
    "상품 구성 Matching 중...",
    "판매 및 재주문 패턴 분석 중...",
    "Financial Projection 계산 중...",
    "분석이 완료되었습니다!"
  ];

  // Dynamic filter for active questions based on conditional visibility rules
  const visibleQuestions = useMemo(() => {
    return QUESTIONS.filter(q => {
      if (!q.conditional_trigger) return true;
      const { question_id, values } = q.conditional_trigger;
      const parentAnswer = answers[question_id];
      if (!parentAnswer) return false;
      
      // If parent is multi-select
      if (Array.isArray(parentAnswer)) {
        return parentAnswer.some(val => values.includes(val));
      }
      return values.includes(parentAnswer);
    });
  }, [answers]);

  const activeQuestion = visibleQuestions[currentQuestionIndex];

  // Section details
  const sectionLabels: Record<string, { ko: string; en: string }> = {
    store_space: { ko: "매장 기본 정보", en: "Store & Space" },
    customer_demand: { ko: "고객과 판매 특성", en: "Customer & Demand" },
    product_price: { ko: "상품 및 가격 성향", en: "Product & Price Behavior" },
    inventory_reorder: { ko: "재고와 재주문", en: "Inventory & Reorder" },
    investment_growth: { ko: "투자와 성장 목표", en: "Investment & Growth" }
  };

  // Compute current section
  const currentSection = activeQuestion?.section;

  // Calculate accuracy indicator
  const accuracyInfo = useMemo(() => {
    const precisionIds = ["Q6", "Q22", "Q30", "Q31", "Q32", "Q33"];
    let answeredPrecisionCount = 0;
    precisionIds.forEach(pid => {
      if (answers[pid] && !answers[pid].includes("잘 모르겠") && !answers[pid].includes("답변하지 않")) {
        answeredPrecisionCount++;
      }
    });

    if (answeredPrecisionCount >= 4) {
      return { label: "높음 (High)", color: "text-[#22D3EE] border-[#22D3EE]/30 bg-[#22D3EE]/5" };
    } else if (answeredPrecisionCount >= 2) {
      return { label: "좋음 (Good)", color: "text-[#ff2b75] border-[#ff2b75]/30 bg-[#ff2b75]/5" };
    }
    return { label: "기본 (Basic)", color: "text-white/50 border-white/10 bg-white/5" };
  }, [answers]);

  // Handle single select selection
  const handleSelectAnswer = (questionId: string, answerLabel: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerLabel
    }));
  };

  // Handle multi select selection (toggle chips)
  const handleToggleAnswer = (questionId: string, answerLabel: string, maxSelect?: number) => {
    const current = answers[questionId] || [];
    let next: string[] = [];
    
    if (current.includes(answerLabel)) {
      next = current.filter((x: string) => x !== answerLabel);
    } else {
      if (maxSelect && current.length >= maxSelect) {
        next = [...current.slice(1), answerLabel];
      } else {
        next = [...current, answerLabel];
      }
    }
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: next
    }));
  };

  // Progress handling
  const handleNext = () => {
    if (!activeQuestion) return;

    // Check if we just finished a section to show SectionInsight
    const nextQuestion = visibleQuestions[currentQuestionIndex + 1];
    if (nextQuestion && nextQuestion.section !== activeQuestion.section) {
      setLastFinishedSection(activeQuestion.section);
      setShowSectionInsight(true);
      return;
    }

    if (currentQuestionIndex < visibleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question finished, trigger analysis transition
      setStep("transition");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setStep("intro");
    }
  };

  const handleSkip = () => {
    if (!activeQuestion) return;
    
    setAnswers(prev => ({
      ...prev,
      [activeQuestion.id]: "답변하지 않음 (Skipped)"
    }));

    handleNext();
  };

  // Handle analysis loader sequential simulation
  useEffect(() => {
    if (step !== "transition") return;
    setTransitionStage(0);

    const interval = setInterval(() => {
      setTransitionStage(prev => {
        if (prev < transitionMessages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setStep("results");
          }, 600);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [step]);

  // Compute Recommendations using adapter
  const mainRecommendation: SimulationResult = useMemo(() => {
    return simulateGrowth(answers);
  }, [answers]);

  // Alternative suggestion result
  const alternativeRecommendation: SimulationResult = useMemo(() => {
    const mockAltAnswers = { ...answers, Q2: (answers.Q2 || "").includes("4FT") ? "약 8FT" : "약 4FT", Q22: "$2,000 미만" };
    return simulateGrowth(mockAltAnswers);
  }, [answers]);

  // Store recommended investment for CtaForm integration
  useEffect(() => {
    if (step === "results" && mainRecommendation) {
      localStorage.setItem("kselect_simulator_investment", mainRecommendation.display.investment.toString());
      window.dispatchEvent(new CustomEvent("kselect_simulator_recommend", {
        detail: { investment: mainRecommendation.display.investment }
      }));
    }
  }, [step, mainRecommendation]);

  // Restart simulator
  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStep("intro");
    setShowAlternative(false);
    setActiveResultTab("display");
    localStorage.removeItem("kselect_simulator_investment");
  };

  return (
    <div className="w-full text-left max-w-[1250px] mx-auto min-h-[480px]">
      
      {/* ============================================================== */}
      {/* 1. SIMULATOR INTRO VIEW                                       */}
      {/* ============================================================== */}
      {step === "intro" && (
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center animate-fade-in">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-black text-[#ff2b75] tracking-[0.08em] uppercase">
              07 — GROWTH SIMULATOR
            </span>
            <h2 className="font-display text-3xl sm:text-[40px] font-bold leading-[1.2] text-white my-2 tracking-tight">
              내 매장에 맞는<br />
              K-Beauty 성장 플랜을<br />
              확인해보세요
            </h2>
            <p className="text-[14.5px] text-[#b4b4b4] leading-relaxed max-w-lg my-2 font-medium">
              매장 규모, 고객 특성, 상품 판매 방식과 재주문 패턴을 분석하여 귀 매장에 적합한 디스플레이 모듈 크기, 최적의 상품 믹스, 예상 투자 및 사업성 분석 결과를 제안해 드립니다.
            </p>
            
            <div className="flex flex-col gap-2.5 my-3 text-[12.5px] text-white/50 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
                <span>약 5–7분 소요 (상황에 맞는 유동적 문항 노출)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
                <span>모르는 질문이나 민감한 항목은 건너뛰기 가능</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
                <span>더 많은 정보를 입력할수록 예상 수치 정확도가 높아집니다.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 items-start sm:items-center">
              <button
                onClick={() => setStep("assessment")}
                className="h-14 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-9 rounded-[8px] font-bold text-[14.5px] tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,43,117,0.4)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2b75]"
              >
                내 매장 분석 시작하기 →
              </button>
            </div>
          </div>

          <div className="relative min-h-[380px] w-full max-w-[530px] rounded-[24px] overflow-hidden border border-white/10 bg-[#121214] shadow-2xl flex flex-col justify-between p-6 sm:p-8 mx-auto lg:mx-0">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/solutions/build.jpg"
                alt="Fixture preview"
                fill
                className="object-cover opacity-[0.06] pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/90 via-transparent to-[#121214]/95 pointer-events-none" />
            </div>

            <div className="relative z-10 flex flex-col gap-5 w-full">
              <span className="text-[10px] font-black text-[#ff2b75] tracking-widest uppercase">
                3 CORE ANALYTICAL OUTCOMES
              </span>
              
              <div className="flex flex-col gap-4">
                {[
                  { num: "01", title: "DISPLAY PLAN", desc: "4FT · 8FT · 12FT 등 매장 크기와 적합도를 매칭한 피처 집기" },
                  { num: "02", title: "PRODUCT STRATEGY", desc: "고객 구매 성향에 최적화된 Assortment 믹스 및 맞춤 카테고리 비율" },
                  { num: "03", title: "BUSINESS OUTLOOK", desc: "초도 매입 비용, 예상 회전율, 연간 매출 및 이익 등 종합 ROI" }
                ].map((item) => (
                  <div key={item.num} className="flex gap-4 items-start p-3 bg-white/5 border border-white/5 rounded-[12px] hover:border-white/10 transition-colors">
                    <span className="text-[#ff2b75] font-black text-sm">{item.num}</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-white text-[13px] font-bold tracking-tight">{item.title}</span>
                      <span className="text-white/60 text-[12px] leading-normal font-medium">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. 5-STEP GUIDED ASSESSMENT WIZARD                          */}
      {/* ============================================================== */}
      {step === "assessment" && activeQuestion && (
        <div className="w-full max-w-[800px] mx-auto bg-[#121214] border border-white/10 rounded-[24px] p-6 sm:p-10 shadow-2xl relative animate-slide-up">
          
          <div className="flex justify-between items-center gap-4 border-b border-white/10 pb-5 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-[#ff2b75] tracking-wider uppercase font-display">
                {sectionLabels[currentSection]?.en || "DIAGNOSTIC"}
              </span>
              <h3 className="text-[14.5px] font-bold text-white tracking-tight">
                {sectionLabels[currentSection]?.ko || "진단 진행 중"}
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/40 font-semibold">분석 정밀도:</span>
              <span className={"text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-[6px] border " + accuracyInfo.color}>
                {accuracyInfo.label}
              </span>
            </div>
          </div>

          {showSectionInsight && (
            <div className="absolute inset-0 z-30 bg-[#121214] rounded-[24px] p-6 sm:p-10 flex flex-col justify-between animate-fade-in">
              <div className="flex flex-col gap-5 justify-center flex-1">
                <span className="text-[11px] font-black text-[#ff2b75] tracking-widest uppercase">
                  SECTION INSIGHT REPORT
                </span>
                <h4 className="text-[20px] font-bold text-white leading-snug tracking-tight">
                  {lastFinishedSection === "store_space" && "스페이스 정보가 성공적으로 수집되었습니다."}
                  {lastFinishedSection === "customer_demand" && "매장의 고객층과 수요 특성이 종합되었습니다."}
                  {lastFinishedSection === "product_price" && "구매 선호 가격대 분석이 완료되었습니다."}
                  {lastFinishedSection === "inventory_reorder" && "재고 리오더 순환 빈도 추정이 반영되었습니다."}
                </h4>
                <p className="text-[13.5px] text-white/70 leading-relaxed font-medium">
                  {lastFinishedSection === "store_space" && "입력하신 사용 면적 정보는 매대에 진열할 적격 브랜드 SKU 한계를 계산하는 가중치 지표로 활용됩니다."}
                  {lastFinishedSection === "customer_demand" && "특정 연령대 및 브랜드 인지도 성향 지표는 큐레이션 추천 매칭 로직의 AP 가중치 계산에 즉각 반영됩니다."}
                  {lastFinishedSection === "product_price" && "가격대 민감도는 디스플레이 내 가성비 핵심 라인업과 볼륨 있는 프리미엄 SKU 비율 조합의 근거가 됩니다."}
                  {lastFinishedSection === "inventory_reorder" && "안정적인 회전율 확보를 위해, 60일 내 2차 구매 비율 등 매입 가중치 분석 단계로 진입합니다."}
                </p>
                <div className="p-3 bg-white/5 border border-white/5 rounded-[12px] text-white/50 text-[11.5px] leading-relaxed">
                  💡 다음으로 계속 진행하여 최종 예상 투자금 및 ROI 사업 분석 결과를 열어보세요.
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 border-t border-white/10 pt-5">
                <button
                  onClick={() => {
                    setShowSectionInsight(false);
                    setCurrentQuestionIndex(prev => prev + 1);
                  }}
                  className="h-12 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-7 rounded-[8px] font-bold text-[13.5px]"
                >
                  다음 단계 진입하기 →
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2.5 mb-8">
            <span className="text-[11px] text-[#ff2b75] font-black tracking-widest block font-display">
              QUESTION {activeQuestion.id}
            </span>
            <h2 className="text-[18px] sm:text-[21px] font-extrabold text-white leading-snug tracking-tight">
              {activeQuestion.label_ko}
            </h2>
            {activeQuestion.label_ko !== activeQuestion.label_en && (
              <span className="text-[13px] text-white/40 block -mt-1.5 font-medium">
                {activeQuestion.label_en}
              </span>
            )}
            
            {(activeQuestion.helper_ko || activeQuestion.id === "Q6" || activeQuestion.id === "Q22" || activeQuestion.id === "Q35") && (
              <div className="flex items-start gap-2 bg-[#ff2b75]/5 border border-[#ff2b75]/10 rounded-[8px] p-3 text-[12.5px] text-white/60 mt-1 leading-normal font-medium">
                <svg className="w-4 h-4 text-[#ff2b75] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {activeQuestion.helper_ko || 
                   (activeQuestion.id === "Q6" && "매장 규모를 파악하고 지나치게 큰 Display를 추천하지 않기 위해 사용됩니다.") ||
                   (activeQuestion.id === "Q22" && "추천 규모가 실제 투자 여력에 맞도록 조정하는 데 사용됩니다.") ||
                   (activeQuestion.id === "Q35" && "예상 Inventory Turnover와 Annual Sales를 계산하는 데 사용됩니다.")}
                </span>
              </div>
            )}
          </div>

          <div className="mb-10">
            {activeQuestion.multi_select && (
              <span className="text-[11.5px] text-[#ff2b75] font-black tracking-wide block mb-3">
                * 중복 선택 가능 (최대 {activeQuestion.max_select || "제한 없음"}개)
              </span>
            )}
            
            <div className={activeQuestion.type === "tag_chip" ? "grid grid-cols-2 sm:grid-cols-3 gap-3.5" : "grid grid-cols-1 sm:grid-cols-2 gap-3.5"}>
              {activeQuestion.answers.map((ans) => {
                const isSelected = activeQuestion.multi_select 
                  ? (answers[activeQuestion.id] || []).includes(ans.label_ko)
                  : answers[activeQuestion.id] === ans.label_ko;

                if (activeQuestion.type === "tag_chip") {
                  return (
                    <button
                      key={ans.id}
                      onClick={() => handleToggleAnswer(activeQuestion.id, ans.label_ko, activeQuestion.max_select)}
                      className={isSelected 
                        ? "px-4.5 py-3 rounded-[10px] border border-[#ff2b75] bg-[#ff2b75]/8 text-white font-extrabold shadow-[0_0_12px_rgba(255,43,117,0.15)] text-left cursor-pointer" 
                        : "px-4.5 py-3 rounded-[10px] border border-white/5 bg-[#171719]/40 hover:border-white/15 text-white/70 hover:text-white text-left cursor-pointer"}
                    >
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-[13px] leading-tight tracking-tight font-semibold">{ans.label_ko}</span>
                        {isSelected && (
                          <svg className="w-3.5 h-3.5 text-[#ff2b75] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                }

                return (
                  <button
                    key={ans.id}
                    onClick={() => handleSelectAnswer(activeQuestion.id, ans.label_ko)}
                    className={isSelected 
                      ? "p-4 rounded-[12px] border border-[#ff2b75] bg-[#ff2b75]/8 text-white font-extrabold shadow-[0_0_15px_rgba(255,43,117,0.15)] scale-[1.01] text-left cursor-pointer flex flex-col justify-center gap-1" 
                      : "p-4 rounded-[12px] border border-white/5 bg-[#171719]/40 hover:border-white/15 text-white/80 hover:text-white text-left cursor-pointer flex flex-col justify-center gap-1"}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[14px] font-bold tracking-tight">{ans.label_ko}</span>
                      <div className={"w-4 h-4 rounded-full border flex items-center justify-center shrink-0 " + (isSelected ? "border-[#ff2b75] bg-[#ff2b75]" : "border-white/20")}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    {ans.label_ko !== ans.label_en && (
                      <span className="text-[11.5px] text-white/40 block leading-normal mt-0.5 font-medium">
                        {ans.label_en}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 border-t border-white/10 pt-6">
            <button
              onClick={handleBack}
              className="h-12 inline-flex items-center justify-center border border-white/15 hover:border-white/30 text-white px-6 rounded-[8px] font-bold text-[13.5px] tracking-wide transition-colors cursor-pointer"
            >
              이전 (Back)
            </button>
            
            <div className="flex gap-3">
              {activeQuestion.is_optional && (
                <button
                  onClick={handleSkip}
                  className="h-12 inline-flex items-center justify-center text-white/50 hover:text-white px-5 rounded-[8px] font-bold text-[13.5px] transition-colors cursor-pointer"
                >
                  건너뛰기 (Skip)
                </button>
              )}
              
              <button
                onClick={handleNext}
                disabled={
                  !activeQuestion.is_optional && 
                  (activeQuestion.multi_select 
                    ? (!answers[activeQuestion.id] || answers[activeQuestion.id].length === 0)
                    : !answers[activeQuestion.id])
                }
                className="h-12 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-8 rounded-[8px] font-bold text-[13.5px] tracking-wide transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                다음 (Next) →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. PREMIUM ANALYSIS TRANSITION SCREEN                          */}
      {/* ============================================================== */}
      {step === "transition" && (
        <div className="w-full max-w-[500px] mx-auto bg-[#121214] border border-white/10 rounded-[24px] p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center justify-center gap-6 min-h-[350px] animate-fade-in">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-[#ff2b75] animate-spin" />
            <svg className="w-6 h-6 text-[#ff2b75] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          
          <div className="flex flex-col gap-1.5 mt-2">
            <span className="text-[10px] font-black text-[#ff2b75] tracking-[0.15em] uppercase font-display">
              RECOMMENDATION SYSTEM ENGINE
            </span>
            <h3 className="text-[16px] font-extrabold text-white tracking-tight">
              매장 조건 매칭 분석 중
            </h3>
          </div>

          <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden relative border border-white/5 max-w-[280px]">
            <div 
              className="bg-[#ff2b75] h-full transition-all duration-300 shadow-[0_0_8px_#ff2b75]"
              style={{ width: ((transitionStage / (transitionMessages.length - 1)) * 100) + "%" }}
            />
          </div>

          <span className="text-[13px] text-white/70 font-semibold tracking-tight min-h-[20px] animate-pulse">
            {transitionMessages[transitionStage]}
          </span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. RESULTS VIEW DASHBOARD                                     */}
      {/* ============================================================== */}
      {step === "results" && mainRecommendation && (
        <div className="w-full flex flex-col gap-8 animate-fade-in text-left">
          
          <div className="bg-[#121214] border border-white/10 rounded-[20px] p-6 sm:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-xl">
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ff2b75]/20 bg-[#ff2b75]/5 mb-1.5 max-w-max">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
                <span className="text-[9.5px] tracking-widest font-black text-[#ff2b75] uppercase font-display">
                  GROWTH PLAN DETAILED REPORT
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-[30px] font-bold text-white tracking-tight leading-none">
                귀 매장을 위한 K-Beauty Growth Plan
              </h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full lg:w-auto border-t lg:border-t-0 border-white/10 pt-5 lg:pt-0">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] text-white/40 font-black tracking-wider uppercase font-display">RECOMMENDED DISPLAY</span>
                <span className="text-[17px] font-black text-[#ff2b75]">
                  {mainRecommendation.display.program} · {mainRecommendation.display.width_ft}FT
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] text-white/40 font-black tracking-wider uppercase font-display">RECOMMENDED SKU</span>
                <span className="text-[17px] font-black text-white">
                  {mainRecommendation.display.sku_count} SKU
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] text-white/40 font-black tracking-wider uppercase font-display">ESTIMATED TURNOVER</span>
                <span className="text-[17px] font-black text-[#22D3EE]">
                  {mainRecommendation.financial.turnover}x
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] text-white/40 font-black tracking-wider uppercase font-display">ESTIMATED SALES</span>
                <span className="text-[17px] font-black text-white">
                  ${mainRecommendation.financial.annual_sales.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 items-start">
            
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 border-white/10 pb-3 lg:pb-0">
              {[
                { key: "display", label: "01. Recommended Display", icon: "📐" },
                { key: "product", label: "02. Product Strategy", icon: "🧴" },
                { key: "financial", label: "03. Financial Outlook", icon: "📊" }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveResultTab(tab.key as any)}
                  className={activeResultTab === tab.key
                    ? "h-12 px-4.5 rounded-[8px] text-left text-[13px] font-bold tracking-tight transition-all shrink-0 cursor-pointer flex items-center gap-2 bg-[#ff2b75] text-white font-extrabold shadow-[0_4px_12px_rgba(255,43,117,0.25)]"
                    : "h-12 px-4.5 rounded-[8px] text-left text-[13px] font-bold tracking-tight transition-all shrink-0 cursor-pointer flex items-center gap-2 border border-white/5 hover:border-white/10 text-white/60 hover:text-white"}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="bg-[#121214] border border-white/10 rounded-[20px] p-6 sm:p-8 shadow-xl min-h-[400px]">
              
              {/* TAB 1: RECOMMENDED DISPLAY PLAN */}
              {activeResultTab === "display" && (
                <div className="flex flex-col gap-8 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    
                    <div className="flex flex-col gap-5 text-left">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase">RECOMMENDED FIXTURE SIZE</span>
                        <h3 className="font-display text-[26px] font-extrabold text-white leading-none tracking-tight">
                          {mainRecommendation.display.program} · {mainRecommendation.display.width_ft}FT Module
                        </h3>
                      </div>
                      
                      <div className="flex flex-col gap-3 font-medium text-[13.5px] text-white/70">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span>추천 모듈 크기 (Fixture Width):</span>
                          <strong className="text-white">{mainRecommendation.display.width_ft} FT Module</strong>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span>권장 SKU 크기 (Recommended SKU Count):</span>
                          <strong className="text-white">{mainRecommendation.display.sku_count} SKU</strong>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span>초도 공급 수량 (Initial Pack Qty):</span>
                          <strong className="text-white">{mainRecommendation.display.initial_units} Units</strong>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span>초도 상품 예산 (Initial Product Investment):</span>
                          <strong className="text-white">${mainRecommendation.display.investment.toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="relative w-full h-[260px] rounded-[14px] overflow-hidden border border-white/10 shadow-lg bg-[#050505]">
                      <Image
                        src={
                          mainRecommendation.display.program === "START"
                            ? "/images/solutions/4F_A.jpg"
                            : mainRecommendation.display.program === "GROW"
                            ? "/images/solutions/8F_AA.jpg"
                            : "/images/solutions/12F_AAA.jpg"
                        }
                        alt="Recommended K-beauty modular display fixture size"
                        fill
                        className="object-cover opacity-80"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex items-end p-4">
                        <span className="text-white text-[12px] font-black tracking-wider bg-[#ff2b75] px-2.5 py-1 rounded-[4px] uppercase font-display">
                          {mainRecommendation.display.width_ft}FT LED BACKLIT MODULE DISPLAY
                        </span>
                      </div>
                    </div>

                  </div>

                  <div className="border-t border-white/10 pt-6 mt-2">
                    <h4 className="text-[14.5px] font-bold text-white mb-3">왜 이 Display 모듈이 추천되었나요? (Why This Result)</h4>
                    <div className="flex flex-col gap-3">
                      {mainRecommendation.display.reasons.map((r, i) => (
                        <div key={i} className="flex gap-3 items-start p-3 bg-white/5 border border-white/5 rounded-[10px] text-white/80 text-[13px] leading-relaxed">
                          <span className="text-[#ff2b75] font-black font-display shrink-0 mt-0.5">✓</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCT STRATEGY */}
              {activeResultTab === "product" && (
                <div className="flex flex-col gap-8 animate-fade-in">
                  
                  <div className="flex flex-col gap-2 text-left">
                    <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase">RECOMMENDED ASSORTMENT PROFILE</span>
                    <h3 className="font-display text-[22px] font-extrabold text-white leading-tight tracking-tight">
                      {mainRecommendation.assortment.primary_description_ko}
                    </h3>
                    <span className="text-[13.5px] text-[#b4b4b4] font-medium leading-relaxed max-w-xl">
                      고객 및 가격 성향 데이터를 바탕으로 <strong className="text-white font-bold">{mainRecommendation.assortment.primary_description_ko}</strong>를 기본 뼈대로 잡고, 부가적으로 <strong className="text-white font-bold">{mainRecommendation.assortment.secondary_description_ko}</strong>를 보완 매칭한 맞춤형 상품 포트폴리오입니다.
                    </span>
                  </div>

                  <div className="flex flex-col gap-3.5 mt-2">
                    <h4 className="text-[13px] font-bold text-white tracking-wider uppercase font-display">카테고리 믹스 밸런스 비율</h4>
                    
                    <div className="w-full h-4 rounded-full overflow-hidden flex">
                      {mainRecommendation.assortment.category_mix.map((cat) => (
                        <div
                          key={cat.category}
                          style={{ 
                            width: cat.percentage + "%",
                            backgroundColor: cat.color
                          }}
                          className="h-full transition-all duration-300 relative group"
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-1.5">
                      {mainRecommendation.assortment.category_mix.map((cat) => (
                        <div key={cat.category} className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                          <span className="text-[12px] text-white/70 font-semibold tracking-tight">
                            {cat.category} <strong className="text-white font-black">{cat.percentage}%</strong>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6 mt-2">
                    <div className="flex justify-between items-center mb-3.5">
                      <h4 className="text-[14.5px] font-bold text-white">추천 상품군 예시 (Sample Catalog)</h4>
                      <span className="text-[11px] text-[#ff2b75] font-black tracking-wide border border-[#ff2b75]/20 bg-[#ff2b75]/5 px-2.5 py-0.5 rounded-[4px]">
                        ENGINE PREVIEW MOCK
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                      {[
                        { title: "Premium Ampoule", cat: "Skincare", desc: "고함량 스페셜 앰플" },
                        { title: "Hydrating Moisturizer", cat: "Skincare", desc: "24시간 수분 장벽 크림" },
                        { title: "Daily SPF50+ Sunscreen", cat: "Skincare", desc: "백탁 없는 데일리 유기 자차" },
                        { title: "Gentle Foam Cleanser", cat: "Skincare", desc: "약산성 순한 거품 클렌저" },
                        { title: "Trouble Acne Patch", cat: "Skincare", desc: "초슬림 하이드로콜로이드 패치" },
                        { title: "Calming Sheet Mask", cat: "Skincare", desc: "진정 수분 병풀 마스크팩" },
                        { title: "Scalp Revitalizing Shampoo", cat: "Hair Care", desc: "두피 케어 탈모 방지 샴푸" },
                        { title: "Matte Cushion Foundation", cat: "Makeup", desc: "밀착 롱래스팅 매트 쿠션" }
                      ].map((prod) => (
                        <div key={prod.title} className="p-3.5 rounded-[12px] border border-white/5 bg-[#171719]/40 hover:border-white/15 transition-colors flex flex-col justify-between min-h-[90px] text-left">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[8px] text-[#ff2b75] font-black tracking-wider uppercase font-display">{prod.cat}</span>
                            <span className="text-[12.5px] font-bold text-white tracking-tight leading-tight">{prod.title}</span>
                          </div>
                          <span className="text-[11px] text-white/50 block font-semibold mt-2">{prod.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: FINANCIAL OUTLOOK */}
              {activeResultTab === "financial" && (
                <div className="flex flex-col gap-8 animate-fade-in">
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-left">
                    <div className="p-4 bg-white/5 border border-white/5 rounded-[12px] flex flex-col gap-1">
                      <span className="text-[9px] text-[#ff2b75] font-black tracking-wider uppercase font-display">초도 예산 (Initial Product Investment)</span>
                      <strong className="text-white text-[20px] font-black">${mainRecommendation.financial.initial_product_investment.toLocaleString()}</strong>
                      <span className="text-[10px] text-white/40 font-semibold leading-none">디스플레이 무상 대여 포함</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-[12px] flex flex-col gap-1">
                      <span className="text-[9px] text-white/50 font-black tracking-wider uppercase font-display">예상 연간 매출 (Annual Retail Sales)</span>
                      <strong className="text-[#ff2b75] text-[20px] font-black">${mainRecommendation.financial.annual_sales.toLocaleString()}</strong>
                      <span className="text-[10px] text-white/40 font-semibold leading-none">연간 예상 총소매매출액</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-[12px] flex flex-col gap-1">
                      <span className="text-[9px] text-[#22D3EE] font-black tracking-wider uppercase font-display">예상 연간 회전율 (Estimated Turnover)</span>
                      <strong className="text-white text-[20px] font-black">{mainRecommendation.financial.turnover}x / Year</strong>
                      <span className="text-[10px] text-white/40 font-semibold leading-none">평균 재고 회전 수</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-[12px] flex flex-col gap-1">
                      <span className="text-[9px] text-white/50 font-black tracking-wider uppercase font-display">초도 공급 수량 (Initial Pack Units)</span>
                      <strong className="text-white text-[20px] font-black">{mainRecommendation.display.initial_units} Pcs</strong>
                      <span className="text-[10px] text-white/40 font-semibold leading-none">평균 소매가 약 $23-$24 산출</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-[12px] flex flex-col gap-1">
                      <span className="text-[9px] text-white/50 font-black tracking-wider uppercase font-display">보장 소매 마진율 (Gross Margin)</span>
                      <strong className="text-white text-[20px] font-black">{mainRecommendation.financial.gross_margin * 100}%</strong>
                      <span className="text-[10px] text-white/40 font-semibold leading-none">타사 대비 우수한 마진 효율</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-[12px] flex flex-col gap-1">
                      <span className="text-[9px] text-[#ff2b75] font-black tracking-wider uppercase font-display">예상 연간 총수익 (Gross Profit)</span>
                      <strong className="text-[#ff2b75] text-[20px] font-black">${mainRecommendation.financial.gross_profit.toLocaleString()}</strong>
                      <span className="text-[10px] text-white/40 font-semibold leading-none">연간 예상 순수익액</span>
                    </div>
                  </div>

                  <details className="group border border-white/10 rounded-[12px] bg-white/3 overflow-hidden transition-all duration-300">
                    <summary className="p-4 flex justify-between items-center cursor-pointer font-bold text-[13.5px] text-white focus:outline-none select-none">
                      <span>이 결과는 어떻게 계산했나요? (How We Calculated This)</span>
                      <span className="transition-transform duration-200 group-open:rotate-180 text-white/60">▼</span>
                    </summary>
                    <div className="p-4 border-t border-white/5 flex flex-col gap-3.5 text-[12.5px] text-white/70 leading-relaxed font-medium">
                      <div className="flex flex-col gap-1">
                        <strong className="text-white font-bold">1. 예상 재고 회전율 (Turnover Speed)</strong>
                        <span>귀하가 입력한 신규 SKU 도입 예산 수치, 잘 팔리는 SKU의 월 판매량 범위, 품절 예방 리오더 빈도를 가중 합산하여 보수적인 연간 순환 지표({mainRecommendation.financial.turnover}회)를 산정했습니다.</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong className="text-white font-bold">2. 연간 총 소매 매출액 (Annual Retail Sales)</strong>
                        <span>수식: [초기 상품 투자액 × 연간 재고 회전수] ÷ (1 - 목표 리테일 마진율 50%)을 적용하여 산출했습니다.</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong className="text-white font-bold">3. 보장 소매 마진 (Estimated Gross Profit)</strong>
                        <span>수식: [연간 총 소매 매출액 - 연간 매출원가]를 통해 연간 ${mainRecommendation.financial.gross_profit.toLocaleString()}의 마진 수익을 예상 시뮬레이션하였습니다.</span>
                      </div>
                      <div className="p-3 bg-[#ff2b75]/5 border border-[#ff2b75]/10 rounded-[8px] text-[11.5px] text-white/50 leading-relaxed">
                        ⚠️ **주의**: 본 시뮬레이션 결과는 산술적인 예측 모델에 기반하며, 상권 입지 조건, 소비자 선향 및 개별 매장의 실제 운영 성과에 따라 최종 이익 규모가 달라질 수 있습니다. K SELECT는 확정 매출액을 법적으로 보장하지 않습니다.
                      </div>
                    </div>
                  </details>
                </div>
              )}

            </div>
          </div>

          <div className="bg-[#121214] border border-white/10 rounded-[14px] p-5.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4.5 shadow-md">
            <div className="flex flex-col gap-0.5 text-left">
              <span className="text-white text-[13.5px] font-bold">더 적은 투자 규모로 시작하고 싶으신가요?</span>
              <span className="text-white/50 text-[12px] font-semibold">초기 진입 단계에서 작은 투자금의 대안 시나리오를 비교해 볼 수 있습니다.</span>
            </div>
            
            <button
              onClick={() => setShowAlternative(!showAlternative)}
              className="h-10 inline-flex items-center justify-center border border-[#ff2b75]/30 hover:border-[#ff2b75]/50 text-[#ff2b75] px-5.5 rounded-[6px] font-bold text-[12.5px] tracking-wide transition-colors cursor-pointer"
            >
              {showAlternative ? "메인 추천 결과 유지" : "START · 4FT 대안 시나리오 비교"}
            </button>
          </div>

          {showAlternative && (
            <div className="bg-white/3 border border-[#ff2b75]/20 rounded-[18px] p-6.5 sm:p-8 shadow-inner animate-slide-up flex flex-col gap-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase">ALTERNATIVE OPTION</span>
                  <h3 className="font-display text-[20px] font-extrabold text-white">START · {alternativeRecommendation.display.width_ft}FT 컴팩트 시나리오</h3>
                </div>
                <span className="text-[11px] font-bold text-white/50 border border-white/10 bg-white/5 px-2.5 py-0.5 rounded-[4px]">
                  대안 시뮬레이션
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-left">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-white/40 font-bold uppercase font-display">초도 예산 (Product investment)</span>
                  <strong className="text-white text-[15px] font-black">${alternativeRecommendation.display.investment.toLocaleString()}</strong>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-white/40 font-bold uppercase font-display">추천 SKU (SKU Count)</span>
                  <strong className="text-white text-[15px] font-black">{alternativeRecommendation.display.sku_count} SKU</strong>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-white/40 font-bold uppercase font-display">예상 연간 매출 (Annual Sales)</span>
                  <strong className="text-[#ff2b75] text-[15px] font-black">${alternativeRecommendation.financial.annual_sales.toLocaleString()}</strong>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-white/40 font-bold uppercase font-display">연간 예상 순익 (Gross Profit)</span>
                  <strong className="text-[#ff2b75] text-[15px] font-black">${alternativeRecommendation.financial.gross_profit.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          )}

          <div className="bg-[#121214] border border-white/10 rounded-[20px] p-6 sm:p-8 shadow-xl text-left">
            <div className="flex flex-col gap-1 mb-8">
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase">90-DAY ACTION ROADMAP</span>
              <h3 className="font-display text-[22px] font-extrabold text-white">첫 90일 K-Beauty 카테고리 런칭 로드맵</h3>
              <span className="text-[13px] text-white/50 font-semibold">성공적인 매장 안착을 위해 K SELECT와 함께하는 파트너 성장 여정입니다.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {[
                { step: "LAUNCH", title: "Display 설치 및 런칭", desc: "데이터 기반으로 엄선된 초도 큐레이션 라인업 설치 및 LED 백라이트 매대 데모 실행" },
                { step: "30 DAYS", title: "초기 Sell-through 확인", desc: "런칭 첫 달 실구매 소비자 매출 흐름 분석 및 상권 특성별 베스트 품목(Fast Seller) 파악" },
                { step: "60 DAYS", title: "Reorder 패턴 최적화", desc: "품절 방지를 위한 신속 리오더 오토 루프 연결 및 마진 수율 품목 최적화 수행" },
                { step: "90 DAYS", title: "재고 교환 크레딧 수행", desc: "회전율이 부진한 비적격 SKU를 100% 가치의 Exchange Credit으로 회수하여 즉각 인기 상품군으로 교환" }
              ].map((step, idx) => (
                <div key={step.step} className="flex flex-col gap-2 p-4.5 bg-white/3 border border-white/5 rounded-[12px] relative z-10">
                  <span className="text-[10px] font-black text-[#ff2b75] tracking-widest font-display">{step.step}</span>
                  <h4 className="text-[14px] font-bold text-white tracking-tight leading-snug">{step.title}</h4>
                  <p className="text-[12px] text-white/60 leading-relaxed font-medium mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
            <button
              onClick={() => setShowConsultationModal(true)}
              className="h-14 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-9 rounded-[8px] font-bold text-[14.5px] tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,43,117,0.4)] cursor-pointer focus:outline-none"
            >
              이 Growth Plan으로 파트너십 상담 신청하기 →
            </button>
            
            <button
              onClick={handleRestart}
              className="h-14 inline-flex items-center justify-center border border-white/15 hover:border-white/35 text-white px-8 rounded-[8px] font-bold text-[14.5px] tracking-wide transition-colors cursor-pointer"
            >
              조건 변경 후 다시 분석하기
            </button>
          </div>

          {showConsultationModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#121214] border border-white/10 rounded-[24px] p-6 sm:p-10 max-w-[500px] w-full text-left relative animate-slide-up">
                
                <button
                  onClick={() => setShowConsultationModal(false)}
                  className="absolute top-5 right-5 text-white/40 hover:text-white cursor-pointer font-bold text-lg"
                >
                  ✕
                </button>

                <div className="flex flex-col gap-1 mb-6">
                  <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase">SUBMIT PARTNERSHIP APPLICATION</span>
                  <h3 className="font-display text-[21px] font-extrabold text-white">파트너십 상담 정보 전송</h3>
                  <span className="text-[12.5px] text-white/50 font-semibold leading-relaxed">
                    시뮬레이터에서 계산된 추천안 정보(ID: {mainRecommendation.simulation_id}, 권장: {mainRecommendation.display.program} · {mainRecommendation.display.width_ft}FT)가 폼 하단에 자동 임베드됩니다.
                  </span>
                </div>

                <div className="p-4 bg-white/5 border border-white/5 rounded-[12px] text-[12.5px] text-white/80 flex flex-col gap-2 mb-6">
                  <div className="flex justify-between">
                    <span>추천 모듈 크기:</span>
                    <strong className="text-white font-bold">{mainRecommendation.display.program} · {mainRecommendation.display.width_ft}FT</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>초도 예상 투자액:</span>
                    <strong className="text-white font-bold">${mainRecommendation.display.investment.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>예상 매출 성장률:</span>
                    <strong className="text-[#22D3EE] font-bold">{mainRecommendation.financial.turnover}x 회전율</strong>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="#launch-readiness"
                    onClick={() => {
                      setShowConsultationModal(false);
                      const contactForm = document.getElementById("launch-readiness");
                      if (contactForm) {
                        contactForm.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="h-12 w-full inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white rounded-[8px] font-bold text-[13.5px] cursor-pointer text-center"
                  >
                    파트너 신청서 작성하러 가기
                  </a>
                  
                  <button
                    onClick={() => setShowConsultationModal(false)}
                    className="h-12 w-full inline-flex items-center justify-center border border-white/10 hover:bg-white/5 text-white rounded-[8px] font-bold text-[13.5px] cursor-pointer"
                  >
                    돌아가기
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* Extra styles for keyframes animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.45s ease-out forwards;
        }
      ` }} />

    </div>
  );
}
