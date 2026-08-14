"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { QUESTIONS, QuestionConfig, AnswerChoice } from "./SimulatorQuestions";
import { fetchSimulation, registerEmailForSimulation, convertLabelsToOptionIds, SimulationResult } from "./SimulatorAdapter";

interface SimulatorProps {
  locale?: string;
}

export default function Simulator({ locale = "ko" }: SimulatorProps) {
  // Simulator State
  const [step, setStep] = useState<"intro" | "assessment" | "transition" | "results" | "review" | "error">("intro");
  
  // Guided Assessment States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  // Asynchronous API simulation result states
  const [mainRecommendation, setMainRecommendation] = useState<SimulationResult | null>(null);
  const [alternativeRecommendation, setAlternativeRecommendation] = useState<SimulationResult | null>(null);
  const [apiCompleted, setApiCompleted] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [emailSending, setEmailSending] = useState<boolean>(false);
  
  // Results UI States
  const [activeResultTab, setActiveResultTab] = useState<"display" | "product" | "financial">("display");
  const [showAlternative, setShowAlternative] = useState<boolean>(false);
  const [showConsultationModal, setShowConsultationModal] = useState<boolean>(false);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [showPartnerModal, setShowPartnerModal] = useState<boolean>(false);
  const [reanalyzedNotice, setReanalyzedNotice] = useState<string | null>(null);
  const [prevRecommendationConfig, setPrevRecommendationConfig] = useState<string | null>(null);

  // Email Form States
  const [emailForm, setEmailForm] = useState({
    name: "",
    storeName: "",
    email: "",
    city: "",
    state: "",
    phone: ""
  });
  const [emailFormConsent, setEmailFormConsent] = useState<boolean>(false);
  const [emailFormSubmitted, setEmailFormSubmitted] = useState<boolean>(false);
  const [emailSuccessMessage, setEmailSuccessMessage] = useState<string | null>(null);
  
  // Review In-Place Editing States
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [tempAnswer, setTempAnswer] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    store_space: true,
    customer_demand: true,
    product_price: true,
    inventory_reorder: true,
    investment_growth: true
  });
  
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
    investment_growth: { ko: "상품 구매 및 성장 목표", en: "Initial Purchase & Growth" }
  };

  // Compute current section
  const currentSection = activeQuestion?.section;
  const sectionKeys = ["store_space", "customer_demand", "product_price", "inventory_reorder", "investment_growth"];
  const currentStepNumber = currentSection ? sectionKeys.indexOf(currentSection) + 1 : 1;

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

  const isNextDisabled = useMemo(() => {
    if (!activeQuestion) return true;
    if (activeQuestion.is_optional) return false;
    
    const ans = answers[activeQuestion.id];
    if (activeQuestion.multi_select) {
      if (!ans || !Array.isArray(ans) || ans.length === 0) return true;
      if (activeQuestion.is_ranking) {
        const requiredCount = activeQuestion.max_select || 3;
        return ans.length < requiredCount;
      }
      return false;
    } else {
      return !ans;
    }
  }, [activeQuestion, answers]);

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

  // Handle analysis loader sequential simulation & API calculation fetch
  useEffect(() => {
    if (step !== "transition") return;
    
    setTransitionStage(0);
    setApiCompleted(false);
    setApiError(null);

    const visibleQuestionIds = visibleQuestions.map(q => q.id);
    const cleanMainAnswers = convertLabelsToOptionIds(answers, visibleQuestionIds);

    const cleanAltAnswers = { ...cleanMainAnswers };
    cleanAltAnswers.Q2 = (cleanMainAnswers.Q2 === "Q2_A1") ? "Q2_A2" : "Q2_A1";
    cleanAltAnswers.Q22 = "Q22_A1";

    let apiSuccess = false;
    let mainRes: SimulationResult | null = null;
    let altRes: SimulationResult | null = null;

    const fetchResults = async () => {
      try {
        const [main, alt] = await Promise.all([
          fetchSimulation(cleanMainAnswers),
          fetchSimulation(cleanAltAnswers)
        ]);
        mainRes = main;
        altRes = alt;
        apiSuccess = true;
        setMainRecommendation(main);
        setAlternativeRecommendation(alt);
      } catch (err: any) {
        console.error("API simulation error:", err);
        setApiError(err.message || "Failed to run growth simulation.");
      } finally {
        setApiCompleted(true);
      }
    };

    fetchResults();

    const interval = setInterval(() => {
      setTransitionStage(prev => {
        if (prev < transitionMessages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 450);

    return () => {
      clearInterval(interval);
    };
  }, [step]);

  // Transition to results or error state once both animation and API call finish
  useEffect(() => {
    if (step !== "transition") return;
    
    const isAtLastMessage = transitionStage === transitionMessages.length - 1;
    if (isAtLastMessage && apiCompleted) {
      setTimeout(() => {
        if (apiError) {
          setStep("error");
        } else if (mainRecommendation && alternativeRecommendation) {
          setStep("results");
        }
      }, 300);
    }
  }, [step, transitionStage, apiCompleted, apiError, mainRecommendation, alternativeRecommendation]);

  // Store recommended investment for CtaForm integration
  useEffect(() => {
    if (step === "results" && mainRecommendation) {
      localStorage.setItem("kselect_recommended_config", mainRecommendation.display.program);
      localStorage.setItem("kselect_simulator_investment", mainRecommendation.display.investment.toString());
      localStorage.setItem("kselect_simulator_id", mainRecommendation.simulation_id);
      window.dispatchEvent(new CustomEvent("kselect_simulator_recommend", {
        detail: { 
          configName: mainRecommendation.display.program,
          investment: mainRecommendation.display.investment,
          simulationId: mainRecommendation.simulation_id
        }
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
    setReanalyzedNotice(null);
    setPrevRecommendationConfig(null);
    localStorage.removeItem("kselect_simulator_investment");
  };

  const handleReviewAnswers = () => {
    if (mainRecommendation) {
      setPrevRecommendationConfig(mainRecommendation.display.program);
    }
    setStep("review");
  };

  // Compare recommendation after reanalysis transition
  useEffect(() => {
    if (step === "results" && prevRecommendationConfig && mainRecommendation) {
      if (mainRecommendation.display.program === prevRecommendationConfig) {
        setReanalyzedNotice("변경된 조건을 반영해 다시 분석했으며, 현재 추천안이 여전히 Best Fit으로 평가되었습니다.");
      } else {
        setReanalyzedNotice("변경된 조건을 반영해 다시 분석을 완료했습니다. 새 조건에 따라 추천안이 업데이트되었습니다.");
      }
      setPrevRecommendationConfig(null);
    }
  }, [step, mainRecommendation, prevRecommendationConfig]);

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
              매장 규모, 고객 특성, 상품 판매 방식과 재주문 패턴을 분석하여 귀 매장에 적합한 디스플레이 모듈 크기, 최적의 상품 믹스, 예상 초기 상품 구매 규모와 매출·수익 가능성 분석 결과를 제안해 드립니다.
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

            <div className="flex flex-col gap-2.5 mt-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button
                  onClick={() => setStep("assessment")}
                  className="h-14 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-9 rounded-[8px] font-bold text-[14.5px] tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,43,117,0.4)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2b75]"
                >
                  내 매장 분석 시작하기 →
                </button>
              </div>
              <span className="text-[12.5px] text-white/60 font-semibold inline-flex items-center gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
                가장 큰 프로그램이 아닌, 귀 매장에 가장 맞는 시작점을 추천합니다.
              </span>
            </div>
          </div>

          <div className="relative min-h-[380px] w-full max-w-[530px] rounded-[24px] overflow-hidden border border-white/10 bg-[#121214] shadow-2xl flex flex-col justify-between p-6 sm:p-8 mx-auto lg:mx-0">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/solutions/build.jpg"
                alt="Fixture preview"
                fill
                className="object-cover opacity-[0.06] pointer-events-none"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#121214]/90 via-transparent to-[#121214]/95 pointer-events-none" />
            </div>

            <div className="relative z-10 flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-1 text-left select-none">
                <span className="text-[14px] font-black text-white tracking-tight">
                  3가지 핵심 분석 결과
                </span>
                <span className="text-[9px] font-extrabold text-[#ff2b75] tracking-wider uppercase font-display block -mt-0.5">
                  3 Core Analytical Outcomes
                </span>
                <span className="text-[12px] text-white/50 font-semibold leading-relaxed mt-1">
                  귀 매장에 맞는 3가지 핵심 결과를 제공합니다.
                </span>
              </div>
              
              <div className="flex flex-col gap-4">
                {[
                  { num: "01", title_ko: "추천 디스플레이", title_en: "DISPLAY PLAN", desc: "4FT · 8FT · 12FT 등 매장 크기와 적합도를 매칭한 피처 집기" },
                  { num: "02", title_ko: "상품 구성 전략", title_en: "PRODUCT STRATEGY", desc: "고객 구매 성향에 최적화된 Assortment 믹스 및 맞춤 카테고리 비율" },
                  { num: "03", title_ko: "예상 사업성 분석", title_en: "BUSINESS OUTLOOK", desc: "초도 매입 비용, 예상 회전율, 연간 매출 및 이익 등 종합 ROI" }
                ].map((item) => (
                  <div key={item.num} className="flex gap-4 items-start p-4 bg-[#1b1b1f] border border-white/10 rounded-[12px] hover:border-[#ff2b75]/35 transition-all duration-300 group/card shadow-lg hover:shadow-xl">
                    <span className="text-[#ff2b75] font-black text-[15px] font-display mt-0.5 group-hover/card:scale-110 transition-transform duration-200">{item.num}</span>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-white text-[13.5px] font-extrabold tracking-tight">{item.title_ko}</span>
                        <span className="text-white/40 text-[9px] font-bold tracking-wider font-display">{item.title_en}</span>
                      </div>
                      <span className="text-white/75 text-[11.5px] leading-normal font-medium mt-1">{item.desc}</span>
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
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-black text-[#ff2b75] tracking-widest uppercase font-display">
                {currentSection ? `STEP ${currentStepNumber} / 5` : "DIAGNOSTIC"}
              </span>
              <h3 className="text-[15.5px] font-extrabold text-white tracking-tight leading-none mt-1">
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
                  💡 다음으로 계속 진행하여 최종 예상 초기 상품 구매 규모와 매출·수익 가능성 분석 결과를 열어보세요.
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
                   (activeQuestion.id === "Q22" && "추천 규모가 실제 상품 구매 예산 범위에 맞도록 조정하는 데 사용됩니다.") ||
                   (activeQuestion.id === "Q35" && "예상 Inventory Turnover와 Annual Sales를 계산하는 데 사용됩니다.")}
                </span>
              </div>
            )}
          </div>

          <div className="mb-10">
            {activeQuestion.multi_select && (
              <span className="text-[11.5px] text-[#ff2b75] font-black tracking-wide block mb-3">
                {activeQuestion.is_ranking 
                  ? `* 정확히 ${activeQuestion.max_select || 3}개를 선택해주세요 (순위 순서대로 선택)`
                  : `* 중복 선택 가능 (최대 ${activeQuestion.max_select || "제한 없음"}개, 최소 1개 선택)`}
              </span>
            )}
            
            <div className={activeQuestion.type === "tag_chip" ? "grid grid-cols-2 sm:grid-cols-3 gap-3.5" : "grid grid-cols-1 sm:grid-cols-2 gap-3.5"}>
              {activeQuestion.answers.map((ans) => {
                const isSelected = activeQuestion.multi_select 
                  ? (answers[activeQuestion.id] || []).includes(ans.label_ko)
                  : answers[activeQuestion.id] === ans.label_ko;

                if (activeQuestion.type === "tag_chip") {
                  const selectIndex = activeQuestion.is_ranking
                    ? (answers[activeQuestion.id] || []).indexOf(ans.label_ko)
                    : -1;

                  return (
                    <button
                      key={ans.id}
                      onClick={() => handleToggleAnswer(activeQuestion.id, ans.label_ko, activeQuestion.max_select)}
                      className={isSelected 
                        ? "px-4.5 py-3 rounded-[10px] border border-[#ff2b75] bg-[#ff2b75]/8 text-white font-extrabold shadow-[0_0_12px_rgba(255,43,117,0.15)] text-left cursor-pointer flex flex-col justify-center gap-0.5" 
                        : "px-4.5 py-3 rounded-[10px] border border-white/5 bg-[#171719]/40 hover:border-white/15 text-white/70 hover:text-white text-left cursor-pointer flex flex-col justify-center gap-0.5"}
                    >
                      <div className="flex justify-between items-center gap-2 w-full">
                        <span className="text-[13px] leading-tight tracking-tight font-bold">{ans.label_ko}</span>
                        {isSelected && (
                          activeQuestion.is_ranking && selectIndex !== -1 ? (
                            <div className="w-[18px] h-[18px] rounded-full bg-[#ff2b75] text-[10px] text-white flex items-center justify-center font-black font-display shrink-0">
                              {selectIndex + 1}
                            </div>
                          ) : (
                            <svg className="w-3.5 h-3.5 text-[#ff2b75] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )
                        )}
                      </div>
                      {ans.label_ko !== ans.label_en && (
                        <span className="text-[10px] text-white/40 block leading-tight font-semibold mt-0.5">
                          {ans.label_en}
                        </span>
                      )}
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

            {activeQuestion.is_ranking && (answers[activeQuestion.id] || []).length > 0 && (
              <div className="mt-6 p-4 bg-[#ff2b75]/4 border border-[#ff2b75]/15 rounded-[12px] animate-fade-in text-left">
                <h4 className="text-[10px] font-black text-[#ff2b75] tracking-widest uppercase mb-2 font-display">
                  선택된 순위 (Ranked Selection)
                </h4>
                <div className="flex flex-col gap-1.5 text-[13px] font-semibold text-white/80">
                  {(answers[activeQuestion.id] || []).map((selectedLabel: string, idx: number) => {
                    const correspondingAnswer = activeQuestion.answers.find(a => a.label_ko === selectedLabel);
                    return (
                      <div key={selectedLabel} className="flex items-center gap-2">
                        <span className="text-[#ff2b75] font-black font-display text-[10.5px] w-5 h-5 rounded-full bg-[#ff2b75]/10 border border-[#ff2b75]/25 flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{selectedLabel}</span>
                        {correspondingAnswer && correspondingAnswer.label_ko !== correspondingAnswer.label_en && (
                          <span className="text-[11px] text-white/35 font-medium leading-none">
                            ({correspondingAnswer.label_en})
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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
                disabled={isNextDisabled}
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

      {step === "error" && (
        <div className="w-full max-w-[500px] mx-auto bg-[#121214] border border-white/10 rounded-[24px] p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center justify-center gap-6 min-h-[350px] animate-fade-in">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-[#ff2b75]" />
            <span className="text-[28px] select-none">⚠️</span>
          </div>
          
          <div className="flex flex-col gap-1.5 mt-2">
            <span className="text-[10px] font-black text-[#ff2b75] tracking-[0.15em] uppercase font-display">
              CALCULATOR ENGINE ERROR
            </span>
            <h3 className="text-[16px] font-extrabold text-white tracking-tight">
              {locale === "ko" ? "분석 결과를 생성하는 중 문제가 발생했습니다." : "An error occurred while generating your analysis."}
            </h3>
            <p className="text-xs text-white/50 leading-relaxed font-semibold mt-1">
              {locale === "ko" ? "잠시 후 다시 시도해 주세요." : "Please try again in a moment."}
            </p>
            {apiError && (
              <p className="text-[10px] text-white/30 font-mono mt-2 bg-black/30 p-2 rounded max-h-[80px] overflow-auto w-full text-left">
                Error Detail: {apiError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 w-full max-w-[200px]">
            <button
              onClick={() => {
                setStep("transition");
              }}
              className="h-11 w-full inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white rounded-[8px] font-bold text-[13.5px] cursor-pointer"
            >
              {locale === "ko" ? "재시도 (Retry)" : "Retry"}
            </button>
            <button
              onClick={handleRestart}
              className="h-11 w-full inline-flex items-center justify-center border border-white/10 hover:bg-white/5 text-white rounded-[8px] font-bold text-[13.5px] cursor-pointer"
            >
              {locale === "ko" ? "처음으로 (Go Home)" : "Go Home"}
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. RESULTS VIEW DASHBOARD                                     */}
      {/* ============================================================== */}
      {step === "results" && mainRecommendation && (
        <div className="w-full flex flex-col gap-8 animate-fade-in text-left">
          
          {reanalyzedNotice && (
            <div className="bg-[#22D3EE]/5 border border-[#22D3EE]/30 p-4 rounded-[12px] text-xs text-[#22D3EE] font-semibold flex items-center gap-2.5 shadow-md">
              <svg className="w-4.5 h-4.5 text-[#22D3EE] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{reanalyzedNotice}</span>
            </div>
          )}

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
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-[9px] text-[#ff2b75] font-black tracking-wider uppercase font-display">권장 매대 크기 · DISPLAY</span>
                <span className="text-[16px] font-black text-[#ff2b75]">
                  {mainRecommendation.display.program} · {mainRecommendation.display.width_ft}FT
                </span>
              </div>
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-[9px] text-white/40 font-black tracking-wider uppercase font-display">권장 상품 수 · RECOMMENDED SKU</span>
                <span className="text-[16px] font-black text-white">
                  {mainRecommendation.display.sku_count} SKU
                </span>
              </div>
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-[9px] text-[#22D3EE] font-black tracking-wider uppercase font-display">예상 연간 회전율 · TURNOVER</span>
                <span className="text-[16px] font-black text-[#22D3EE]">
                  약 {mainRecommendation.financial.turnover}회
                </span>
              </div>
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-[9px] text-white/40 font-black tracking-wider uppercase font-display">예상 연간 매출 · ESTIMATED SALES</span>
                <span className="text-[16px] font-black text-white">
                  약 ${mainRecommendation.financial.annual_sales.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 items-start">
            
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 border-white/10 pb-3 lg:pb-0">
              {[
                { key: "display", label_ko: "01. 추천 디스플레이", label_en: "Recommended Display", icon: "📐" },
                { key: "product", label_ko: "02. 상품 구성 전략", label_en: "Product Strategy", icon: "🧴" },
                { key: "financial", label_ko: "03. 예상 사업성", label_en: "Financial Outlook", icon: "📊" }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveResultTab(tab.key as any)}
                  className={activeResultTab === tab.key
                    ? "h-14 px-4.5 rounded-[8px] text-left transition-all shrink-0 cursor-pointer flex items-center gap-3.5 bg-[#ff2b75] text-white font-extrabold shadow-[0_4px_12px_rgba(255,43,117,0.25)]"
                    : "h-14 px-4.5 rounded-[8px] text-left transition-all shrink-0 cursor-pointer flex items-center gap-3.5 border border-white/5 bg-[#171719]/40 hover:border-white/10 text-white/60 hover:text-white"}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[12.5px] font-extrabold">{tab.label_ko}</span>
                    <span className={`text-[9.5px] font-bold ${activeResultTab === tab.key ? "text-white/80" : "text-white/40"}`}>{tab.label_en}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-[#121214] border border-white/10 rounded-[20px] p-6 sm:p-8 shadow-xl min-h-[400px]">
              
              {/* TAB 1: RECOMMENDED DISPLAY PLAN */}
              {activeResultTab === "display" && (
                <div className="flex flex-col gap-8 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    
                    <div className="flex flex-col gap-5 text-left">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase">권장 집기 규격 · RECOMMENDED FIXTURE SIZE</span>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="font-display text-[26px] font-extrabold text-white leading-none tracking-tight">
                            {mainRecommendation.display.program} · {mainRecommendation.display.width_ft}FT Module
                          </h3>
                          <span className="text-[10px] text-[#ff2b75] font-black tracking-wide border border-[#ff2b75]/30 bg-[#ff2b75]/5 px-2.5 py-0.5 rounded-[4px] uppercase font-display">
                            추천안 · BEST FIT
                          </span>
                        </div>
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
                          <span>예상 초도 상품 구매액 (Estimated Initial Product Purchase):</span>
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
                    
                    {/* Decision Factor Chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["공간 적합도", "고객 수요", "현재 판매 규모", "성장 의지"].map((chip) => (
                        <span key={chip} className="text-[11px] font-extrabold text-[#ff2b75] bg-[#ff2b75]/8 border border-[#ff2b75]/15 px-2.5 py-1 rounded-full">
                          {chip}
                        </span>
                      ))}
                    </div>

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
                  
                  <div className="flex flex-col gap-2.5 text-left">
                    <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase">RECOMMENDED ASSORTMENT PROFILE</span>
                    <h3 className="font-display text-[22px] font-extrabold text-white leading-tight tracking-tight">
                      {(() => {
                        const p = mainRecommendation.assortment.primary_description_ko.replace(" 구성", "").replace(" 솔루션", "").replace(" 특화", "").replace(" 집중", "");
                        const s = mainRecommendation.assortment.secondary_description_ko.replace(" 구성", "").replace(" 매칭", "").replace(" 솔루션", "").replace(" 특화", "").replace(" 집중", "");
                        return `“${p} 중심 + ${s} 보강 구성”`;
                      })()}
                    </h3>
                    <span className="text-[13.5px] text-[#b4b4b4] font-semibold leading-relaxed max-w-xl">
                      고객 및 가격 성향 데이터를 분석하여 맞춤 설계된 상품 포트폴리오 전략입니다.
                    </span>

                    <div className="flex flex-col gap-2.5 text-white/70 text-[13px] leading-relaxed max-w-xl bg-white/3 border border-white/5 p-4 rounded-[12px] mt-2">
                      <div className="flex gap-2">
                        <span className="text-[#ff2b75] font-black shrink-0">·</span>
                        <span><strong>타깃 고객 맞춤</strong>: 매장을 이용하는 주 고객층의 특성을 고려하여, {mainRecommendation.assortment.primary_description_ko}으로 핵심 구매 전환을 유도합니다.</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[#ff2b75] font-black shrink-0">·</span>
                        <span><strong>시너지 상품 보강</strong>: 매장 방문 빈도와 추가 구매(Add-on)를 극대화하기 위해 {mainRecommendation.assortment.secondary_description_ko}을 결합하여 매대 효율을 높입니다.</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[#ff2b75] font-black shrink-0">·</span>
                        <span><strong>상권 매칭</strong>: 입력해주신 상권 및 고객 데이터를 기준으로 K SELECT가 엄선한 베스트셀링 카테고리 비율입니다.</span>
                      </div>
                    </div>
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
                      <h4 className="text-[14.5px] font-bold text-white">추천 상품 구성 예시 (Sample Product Mix)</h4>
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
                  
                  {/* Primary KPIs Block */}
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-[13px] font-bold text-white tracking-wider uppercase font-display">핵심 예상 사업성 (Primary Financial Outlook)</h4>
                      <span className="text-[11px] text-white/50 font-semibold bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-[4px]">
                        현재 입력 조건 기준 예상치
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                      <div className="p-5 bg-white/5 border border-white/10 rounded-[14px] flex flex-col gap-1.5 shadow-md">
                        <span className="text-[10px] text-[#ff2b75] font-black tracking-wider uppercase font-display">① 예상 초도 상품 구매액 (Estimated Initial Product Purchase)</span>
                        <strong className="text-white text-[24px] font-black">~${mainRecommendation.financial.initial_product_investment.toLocaleString()}</strong>
                        <span className="text-[11px] text-white/45 font-semibold leading-relaxed">디스플레이 무상 임대 및 초기 맞춤 상품 세팅비 포함</span>
                      </div>

                      <div className="p-5 bg-white/5 border border-[#22D3EE]/30 rounded-[14px] flex flex-col gap-1.5 shadow-md">
                        <span className="text-[10px] text-[#22D3EE] font-black tracking-wider uppercase font-display">② 예상 연간 재고 회전율 (Estimated Turnover)</span>
                        <strong className="text-white text-[24px] font-black">~{mainRecommendation.financial.turnover}회 / 년</strong>
                        <span className="text-[11px] text-white/60 font-medium leading-normal mt-0.5">
                          💡 판매와 재주문이 반복되는 운영 과정에서 평균 재고가 연간 약 {mainRecommendation.financial.turnover}회 회전하는 수준을 의미합니다.
                        </span>
                      </div>

                      <div className="p-5 bg-white/5 border border-white/10 rounded-[14px] flex flex-col gap-1.5 shadow-md">
                        <span className="text-[10px] text-white/50 font-black tracking-wider uppercase font-display">③ 예상 연간 소매 매출 (Projected Retail Sales)</span>
                        <strong className="text-white text-[24px] font-black">~${mainRecommendation.financial.annual_sales.toLocaleString()}</strong>
                        <span className="text-[11px] text-white/45 font-semibold leading-relaxed">연간 예상 총소매매출액 (소비자가 합산)</span>
                      </div>

                      <div className="p-5 bg-[#ff2b75]/5 border border-[#ff2b75]/35 rounded-[14px] flex flex-col gap-1.5 shadow-lg">
                        <span className="text-[10px] text-[#ff2b75] font-black tracking-wider uppercase font-display">④ 예상 연간 소매 수익 (Estimated Gross Profit)</span>
                        <strong className="text-[#ff2b75] text-[24px] font-black">~${mainRecommendation.financial.gross_profit.toLocaleString()}</strong>
                        <span className="text-[11px] text-white/60 font-semibold leading-relaxed">초도 상품 구매액 대비 우수한 수익성 예측치</span>
                      </div>
                    </div>
                  </div>

                  {/* Secondary KPIs Block */}
                  <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
                    <h4 className="text-[13px] font-bold text-white tracking-wider uppercase font-display mb-1">부가 운영 지표 (Secondary Metrics)</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                      <div className="p-4 bg-white/3 border border-white/5 rounded-[10px] flex flex-col gap-0.5">
                        <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider font-display">초도 공급 수량 (Initial Pack Qty)</span>
                        <strong className="text-white text-[16px] font-black">{mainRecommendation.display.initial_units} Pcs</strong>
                        <span className="text-[10px] text-white/40 font-medium">평균 소매가 $23-$24 기준 산출</span>
                      </div>

                      <div className="p-4 bg-white/3 border border-white/5 rounded-[10px] flex flex-col gap-0.5">
                        <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider font-display">예상 소매 마진율 (Gross Margin)</span>
                        <strong className="text-white text-[16px] font-black">{mainRecommendation.financial.gross_margin * 100}%</strong>
                        <span className="text-[10px] text-white/40 font-medium">타사 카테고리 대비 우수한 마진 효율</span>
                      </div>

                      <div className="p-4 bg-white/3 border border-white/5 rounded-[10px] flex flex-col gap-0.5">
                        <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider font-display">예상 초기 구매비용 회수 기간 (Est. Payback)</span>
                        <strong className="text-white text-[16px] font-black">약 {mainRecommendation.financial.payback_months}개월</strong>
                        <span className="text-[10px] text-white/40 font-medium">마진 총액 기준 보수적 계산</span>
                      </div>

                      <div className="p-4 bg-white/3 border border-white/5 rounded-[10px] flex flex-col gap-0.5">
                        <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider font-display">예상 초도 투자 이익률 (Projected Gross Profit ROI)</span>
                        <strong className="text-[#ff2b75] text-[16px] font-black">
                          {Math.round((mainRecommendation.financial.gross_profit / mainRecommendation.financial.initial_product_investment) * 100)}%
                        </strong>
                        <span className="text-[10px] text-white/40 font-medium">초도 상품 구매액 대비 연간 마진 비율 (매장 운영비 미포함)</span>
                      </div>

                      <div className="p-4 bg-white/3 border border-white/5 rounded-[10px] flex flex-col gap-0.5 sm:col-span-2 lg:col-span-1">
                        <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider font-display">분석 신뢰도 (Analysis Confidence)</span>
                        <strong className="text-white text-[16px] font-black">
                          {mainRecommendation.confidence.level}
                        </strong>
                        <span className="text-[10px] text-white/40 font-medium">
                          {locale === "ko"
                            ? "입력된 매장 정보와 추천 조건을 기반으로 한 분석 신뢰 수준입니다."
                            : "Confidence level based on the store information and recommendation inputs provided."}
                        </span>
                      </div>
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
                        <span>수식: [초기 상품 구매액 × 연간 재고 회전수] ÷ (1 - 목표 리테일 마진율 50%)을 적용하여 산출했습니다.</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong className="text-white font-bold">3. 예상 소매 마진 (Estimated Gross Profit)</strong>
                        <span>수식: [연간 총 소매 매출액 - 연간 매출원가]를 통해 연간 ${mainRecommendation.financial.gross_profit.toLocaleString()}의 마진 수익을 예상 시뮬레이션하였습니다.</span>
                      </div>
                    </div>
                  </details>

                  <div className="p-3.5 bg-white/3 border border-white/10 rounded-[10px] text-[11.5px] text-white/50 leading-relaxed">
                    ⚠️ **시뮬레이션 및 ROI 면책고지 (Disclaimer)**: 본 결과는 입력된 매장 정보와 시뮬레이션 가정값을 기준으로 한 예측치(Projection)이며 실제 판매 성과나 수익률을 보장하지 않습니다. 초도 투자 이익률(ROI)은 상품 매입 비용만을 기준으로 산출되었으며 매장 임차료, 인건비 등 기타 운영 경비(Operating Expenses)는 포함되지 않았습니다. 실제 매장의 영업 성과는 입지 조건, 로컬 경쟁 상황 및 점포 운영 역량에 따라 다를 수 있습니다.
                  </div>
                </div>
              )}

            </div>
          </div>



          {showAlternative && alternativeRecommendation && (
            <div className="bg-[#121214]/60 border border-white/10 rounded-[18px] p-6.5 sm:p-8 shadow-inner animate-slide-up flex flex-col gap-6 mt-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[10px] text-white/50 font-black tracking-widest uppercase">초기 구매 부담을 낮춘 선택 · LOWER-PURCHASE OPTION</span>
                  <h3 className="font-display text-[18px] font-extrabold text-white/85">START · {alternativeRecommendation.display.width_ft}FT 컴팩트 시나리오</h3>
                  <p className="text-[13px] text-white/60 font-medium leading-relaxed mt-1.5">
                    초기 상품 구매 규모를 낮춰 먼저 시장 반응을 확인하고 싶다면 {alternativeRecommendation.display.program} · {alternativeRecommendation.display.width_ft}FT로 시작할 수 있습니다.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-white/40 border border-white/10 bg-white/5 px-2.5 py-0.5 rounded-[4px] shrink-0">
                  대안 시뮬레이션
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-left border-t border-white/5 pt-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-white/40 font-bold uppercase font-display">초도 구매액 · INITIAL PURCHASE</span>
                  <strong className="text-white/80 text-[15px] font-black">~${alternativeRecommendation.display.investment.toLocaleString()}</strong>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-white/40 font-bold uppercase font-display">추천 SKU · SKU COUNT</span>
                  <strong className="text-white/80 text-[15px] font-black">{alternativeRecommendation.display.sku_count} SKU</strong>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-white/40 font-bold uppercase font-display">예상 연간 매출 · SALES</span>
                  <strong className="text-white/80 text-[15px] font-black">~${alternativeRecommendation.financial.annual_sales.toLocaleString()}</strong>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-white/40 font-bold uppercase font-display">예상 연간 순익 · PROFIT</span>
                  <strong className="text-white/80 text-[15px] font-black">~${alternativeRecommendation.financial.gross_profit.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          )}

          <div className="bg-[#121214] border border-white/10 rounded-[20px] p-6 sm:p-8 shadow-xl text-left mt-8">
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

          <div className="flex flex-col gap-4 mt-8 w-full max-w-2xl mx-auto">
            {/* Primary Action */}
            <button
              onClick={() => setShowPartnerModal(true)}
              className="h-15 w-full inline-flex flex-col items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white rounded-[10px] transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,43,117,0.45)] cursor-pointer py-2.5"
            >
              <span className="font-extrabold text-[15.5px] leading-tight">파트너십 상담 신청하기 →</span>
              <span className="text-[10px] text-white/80 font-bold font-display uppercase tracking-widest">Partnership Consultation</span>
            </button>

            {/* Secondary Action */}
            <button
              onClick={() => setShowEmailModal(true)}
              className="h-13 w-full inline-flex flex-col items-center justify-center border border-[#22d3ee]/40 bg-[#22d3ee]/3 hover:bg-[#22d3ee]/8 hover:border-[#22d3ee] text-[#22d3ee] rounded-[8px] transition-all duration-300 cursor-pointer py-1.5 shadow-[0_0_12px_rgba(34,211,238,0.06)]"
            >
              <span className="font-bold text-[13.5px] leading-tight">분석 결과 이메일로 받기</span>
              <span className="text-[9px] text-[#22d3ee]/70 font-bold font-display uppercase tracking-wider">Send Results via Email</span>
            </button>

            {/* Tertiary & Reset Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 border-t border-white/5 pt-4">
              <button
                onClick={handleReviewAnswers}
                className="text-white/60 hover:text-white font-bold text-[12.5px] tracking-tight transition-colors cursor-pointer hover:underline bg-transparent border-0"
              >
                ✏️ 내 답변 검토하기 (Review Answers)
              </button>

              <button
                onClick={handleRestart}
                className="text-white/30 hover:text-white/50 text-[11.5px] hover:underline cursor-pointer bg-transparent border-0 font-medium font-sans"
              >
                처음부터 새로 시작하기 (Reset Simulator)
              </button>
            </div>
          </div>

          {/* Partner Consultation Modal */}
          {showPartnerModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#121214] border border-white/10 rounded-[24px] p-6 sm:p-10 max-w-[500px] w-full text-left relative animate-slide-up">
                
                <button
                  onClick={() => setShowPartnerModal(false)}
                  className="absolute top-5 right-5 text-white/40 hover:text-white cursor-pointer font-bold text-lg"
                >
                  ✕
                </button>

                <div className="flex flex-col gap-1.5 mb-6">
                  <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase">PARTNERSHIP CONSULTATION</span>
                  <h3 className="font-display text-[21px] font-extrabold text-white leading-snug">이 분석 결과와 함께 파트너십 상담을 신청하시겠습니까?</h3>
                  <span className="text-[12.5px] text-white/50 font-semibold leading-relaxed">
                    Simulator에서 확인한 추천 결과를 바탕으로 귀 매장에 적합한 K-Beauty 도입 방향과 다음 단계를 상담합니다.
                  </span>
                </div>

                <div className="p-4 bg-white/5 border border-white/5 rounded-[12px] text-[12.5px] text-white/80 flex flex-col gap-2 mb-6">
                  <div className="flex justify-between">
                    <span>추천 디스플레이 (Recommended Display):</span>
                    <strong className="text-white font-bold">{mainRecommendation.display.program} · {mainRecommendation.display.width_ft}FT</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>추천 상품 (Recommended SKU):</span>
                    <strong className="text-white font-bold">{mainRecommendation.display.sku_count} SKU</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>예상 초도 상품 구매액:</span>
                    <strong className="text-white font-bold">~${mainRecommendation.display.investment.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>예상 재고 회전율 (Turnover):</span>
                    <strong className="text-[#22D3EE] font-bold">~{mainRecommendation.financial.turnover}회 / 년</strong>
                  </div>
                </div>

                <div className="bg-[#ff2b75]/5 border border-[#ff2b75]/15 rounded-[8px] p-3 text-[11.5px] text-white/60 mb-6 leading-normal font-semibold">
                  ⚠️ **안내**: 상담 신청 전, 매장의 기본 준비 상태를 확인하는 간단한 Self-Check가 진행됩니다.
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setShowPartnerModal(false);
                      window.location.href = `/${locale}#launch-readiness`;
                    }}
                    className="h-12 w-full inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white rounded-[8px] font-bold text-[13.5px] cursor-pointer"
                  >
                    파트너십 상담 신청하기
                  </button>
                  
                  <button
                    onClick={() => setShowPartnerModal(false)}
                    className="h-12 w-full inline-flex items-center justify-center border border-white/10 hover:bg-white/5 text-white rounded-[8px] font-bold text-[13.5px] cursor-pointer"
                  >
                    돌아가기
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Email Modal */}
          {showEmailModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#121214] border border-white/10 rounded-[24px] p-6 sm:p-10 max-w-[480px] w-full text-left relative animate-slide-up">
                
                <button
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailFormSubmitted(false);
                    setEmailSuccessMessage(null);
                  }}
                  className="absolute top-5 right-5 text-white/40 hover:text-white cursor-pointer font-bold text-lg"
                >
                  ✕
                </button>

                <div className="flex flex-col gap-1 mb-6">
                  <span className="text-[10px] text-[#22d3ee] font-black tracking-widest uppercase">EMAIL REPORT</span>
                  <h3 className="font-display text-[21px] font-extrabold text-white">분석 결과 이메일로 받기</h3>
                  <span className="text-[12.5px] text-white/50 font-semibold leading-relaxed">
                    현재 분석 결과(Display 규격, 추천 상품 구성 및 예상 구매액)를 이메일로 전송합니다.
                  </span>
                </div>

                {emailFormSubmitted && emailSuccessMessage ? (
                  <div className="flex flex-col gap-4 text-center py-6 animate-fade-in select-none">
                    <span className="text-4xl">✅</span>
                    <h4 className="text-white text-[17px] font-extrabold tracking-tight">분석 결과 전송 요청이 완료되었습니다.</h4>
                    <p className="text-[13px] text-white/60 leading-relaxed font-semibold">
                      입력하신 이메일로 분석 결과 안내가 전달됩니다.
                    </p>
                    <button
                      onClick={() => {
                        setShowEmailModal(false);
                        setEmailFormSubmitted(false);
                        setEmailSuccessMessage(null);
                      }}
                      className="h-11 inline-flex items-center justify-center bg-[#22d3ee] hover:bg-[#06b6d4] text-[#121214] px-6 rounded-[8px] font-bold text-[13px] cursor-pointer mt-4"
                    >
                      확인
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!emailFormConsent) {
                        alert("이메일 수신 동의가 필요합니다.");
                        return;
                      }
                      if (!mainRecommendation?.simulation_id) {
                        alert("유효한 시물레이션 ID가 없습니다.");
                        return;
                      }
                      try {
                        setEmailSending(true);
                        await registerEmailForSimulation(mainRecommendation.simulation_id, emailForm.email);
                        setEmailSuccessMessage("이메일 발송 대기열에 등록되었습니다. (실제 데이터 연동 완료)");
                        setEmailFormSubmitted(true);
                      } catch (err: any) {
                        console.error("Failed to register email:", err);
                        alert(`이메일 등록 중 오류가 발생했습니다: ${err.message || err}`);
                      } finally {
                        setEmailSending(false);
                      }
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-white/50 font-bold">이름 (Name) *</label>
                        <input
                          type="text"
                          required
                          value={emailForm.name}
                          onChange={(e) => setEmailForm(p => ({ ...p, name: e.target.value }))}
                          className="h-10 bg-white/5 border border-white/10 rounded-[6px] px-3 text-white text-[13px] focus:outline-none focus:border-[#22d3ee]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-white/50 font-bold">매장명 (Store Name) *</label>
                        <input
                          type="text"
                          required
                          value={emailForm.storeName}
                          onChange={(e) => setEmailForm(p => ({ ...p, storeName: e.target.value }))}
                          className="h-10 bg-white/5 border border-white/10 rounded-[6px] px-3 text-white text-[13px] focus:outline-none focus:border-[#22d3ee]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-white/50 font-bold">이메일 (Email) *</label>
                      <input
                        type="email"
                        required
                        value={emailForm.email}
                        onChange={(e) => setEmailForm(p => ({ ...p, email: e.target.value }))}
                        className="h-10 bg-white/5 border border-white/10 rounded-[6px] px-3 text-white text-[13px] focus:outline-none focus:border-[#22d3ee]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-white/50 font-bold">City *</label>
                        <input
                          type="text"
                          required
                          value={emailForm.city}
                          onChange={(e) => setEmailForm(p => ({ ...p, city: e.target.value }))}
                          className="h-10 bg-white/5 border border-white/10 rounded-[6px] px-3 text-white text-[13px] focus:outline-none focus:border-[#22d3ee]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-white/50 font-bold">State *</label>
                        <input
                          type="text"
                          required
                          value={emailForm.state}
                          onChange={(e) => setEmailForm(p => ({ ...p, state: e.target.value }))}
                          className="h-10 bg-white/5 border border-white/10 rounded-[6px] px-3 text-white text-[13px] focus:outline-none focus:border-[#22d3ee]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] text-white/50 font-bold">전화번호 (Phone, 선택)</label>
                      <input
                        type="text"
                        value={emailForm.phone}
                        onChange={(e) => setEmailForm(p => ({ ...p, phone: e.target.value }))}
                        className="h-10 bg-white/5 border border-white/10 rounded-[6px] px-3 text-white text-[13px] focus:outline-none focus:border-[#22d3ee]"
                      />
                    </div>

                    <div className="flex items-start gap-2 mt-2">
                      <input
                        type="checkbox"
                        required
                        id="email-consent"
                        checked={emailFormConsent}
                        onChange={(e) => setEmailFormConsent(e.target.checked)}
                        className="mt-1 accent-[#22d3ee] cursor-pointer"
                      />
                      <label htmlFor="email-consent" className="text-[12px] text-white/60 leading-normal cursor-pointer select-none">
                        분석 결과 전송 및 K SELECT 관련 안내를 이메일로 받는 데 동의합니다. (필수)
                      </label>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        type="submit"
                        disabled={emailSending}
                        className="h-12 flex-1 inline-flex items-center justify-center bg-[#22d3ee] hover:bg-[#06b6d4] text-[#121214] rounded-[8px] font-black text-[13.5px] cursor-pointer transition-colors shadow-[0_0_15px_rgba(34,211,238,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {emailSending ? "보내는 중..." : "내 분석 결과 보내기"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowEmailModal(false);
                          setEmailFormSubmitted(false);
                          setEmailSuccessMessage(null);
                        }}
                        className="h-12 px-5 inline-flex items-center justify-center border border-white/10 hover:bg-white/5 text-white rounded-[8px] font-bold text-[13px] cursor-pointer"
                      >
                        취소
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>
          )}

        </div>
      )}

      {step === "review" && (
        <div className="bg-[#1b1b1f] border border-white/10 rounded-[24px] p-5 sm:p-8 shadow-2xl max-w-4xl w-full mx-auto text-left animate-slide-up flex flex-col max-h-[82vh] h-full gap-4">
          <div className="flex flex-col gap-1.5 select-none">
            <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display">REVIEW AND EDIT ANSWERS</span>
            <h3 className="font-display text-[22px] font-extrabold text-white">입력하신 답변 검토하기</h3>
            <span className="text-[13px] text-white/50 font-semibold leading-relaxed">
              각 섹션별 선택값을 확인하고 필요한 부분만 수정할 수 있습니다.
            </span>
            <div className="bg-[#ff2b75]/5 border border-[#ff2b75]/10 text-[#ff2b75] text-[12px] font-bold p-3 rounded-[8px] leading-normal font-sans mt-2">
              💡 변경하려는 질문 카드를 직접 선택해 수정할 수 있습니다. (Click any card to modify)
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3.5">
            {sectionKeys.map((sectionKey) => {
              const labelInfo = sectionLabels[sectionKey];
              const sectionQuestions = visibleQuestions.filter(q => q.section === sectionKey);
              if (sectionQuestions.length === 0) return null;
              const isExpanded = expandedSections[sectionKey];

              return (
                <div key={sectionKey} className="bg-white/3 border border-white/5 rounded-[16px] p-4 flex flex-col gap-3">
                  <div 
                    onClick={() => setExpandedSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }))}
                    className="flex justify-between items-center border-b border-white/5 pb-2 cursor-pointer select-none"
                  >
                    <h4 className="text-[13.5px] font-bold text-[#ff2b75] font-display flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]"></span>
                      {labelInfo.ko} ({labelInfo.en})
                    </h4>
                    <span className="text-white/40 text-[10.5px] font-bold hover:text-white/60 transition-colors">
                      {isExpanded ? "접기 ▲" : "펼치기 ▼"}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 animate-fade-in">
                      {sectionQuestions.map(q => {
                        const answer = answers[q.id];
                        let displayValue = "선택되지 않음";
                        if (answer) {
                          if (Array.isArray(answer)) {
                            displayValue = answer.join(", ");
                          } else {
                            displayValue = answer;
                          }
                        }

                        return (
                          <div 
                            key={q.id} 
                            onClick={() => {
                              setEditingQuestionId(q.id);
                              setTempAnswer(answers[q.id] || (q.multi_select ? [] : ""));
                            }}
                            className="flex flex-col gap-1 bg-[#171719]/40 hover:bg-[#ff2b75]/4 hover:border-[#ff2b75]/35 p-3 rounded-[10px] border border-white/5 cursor-pointer transition-all duration-200 group relative select-none"
                          >
                            <div className="flex justify-between items-start w-full">
                              <span className="text-[11px] font-bold text-white/50 leading-tight group-hover:text-white/70">
                                {q.id}. {q.label_ko}
                              </span>
                              <span className="text-[9.5px] text-[#ff2b75] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                                ✏️ 수정 (Edit)
                              </span>
                            </div>
                            <strong className="text-[12.5px] font-extrabold text-[#ff2b75]/95 leading-normal mt-0.5 group-hover:text-[#ff2b75]">
                              {displayValue}
                            </strong>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 border-t border-white/5 pt-4 mt-auto bg-[#1b1b1f] z-10">
            <button
              onClick={() => setStep("results")}
              className="h-12 w-full sm:w-auto inline-flex items-center justify-center border border-white/10 hover:bg-white/5 text-white px-6 rounded-[8px] font-bold text-[13px] cursor-pointer"
            >
              결과 화면으로 돌아가기 (Back to Results)
            </button>
            <button
              onClick={() => setStep("transition")}
              className="h-12 w-full sm:w-auto inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-8 rounded-[8px] font-black text-[13.5px] cursor-pointer hover:shadow-[0_0_20px_rgba(255,43,117,0.4)] transition-all"
            >
              수정한 답변으로 다시 분석하기 →
            </button>
          </div>
        </div>
      )}

      {/* In-Place Question Edit Modal */}
      {editingQuestionId && (
        (() => {
          const editQuestion = QUESTIONS.find(q => q.id === editingQuestionId);
          if (!editQuestion) return null;

          // Check if Save is disabled based on validation rules
          const isEditSaveDisabled = !editQuestion.is_optional && (
            editQuestion.multi_select
              ? (!tempAnswer || !Array.isArray(tempAnswer) || tempAnswer.length === 0 || (editQuestion.is_ranking && tempAnswer.length < (editQuestion.max_select || 3)))
              : !tempAnswer
          );

          // Handle choice selection inside modal
          const handleSelectChoice = (val: string) => {
            if (editQuestion.multi_select) {
              const current = tempAnswer || [];
              let next: string[] = [];
              if (current.includes(val)) {
                next = current.filter((x: string) => x !== val);
              } else {
                const limit = editQuestion.max_select || 99;
                if (current.length >= limit) {
                  next = [...current.slice(1), val];
                } else {
                  next = [...current, val];
                }
              }
              setTempAnswer(next);
            } else {
              setTempAnswer(val);
            }
          };

          return (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#121214] border border-white/10 rounded-[24px] p-6 sm:p-10 max-w-[580px] w-full text-left relative animate-slide-up max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setEditingQuestionId(null)}
                  className="absolute top-5 right-5 text-white/40 hover:text-white cursor-pointer font-bold text-lg"
                >
                  ✕
                </button>

                <div className="flex flex-col gap-1.5 mb-6">
                  <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display">EDIT QUESTION {editQuestion.id}</span>
                  <h3 className="font-display text-[19px] font-extrabold text-white leading-snug">{editQuestion.label_ko}</h3>
                  {editQuestion.label_ko !== editQuestion.label_en && (
                    <span className="text-[13px] text-white/40 block font-medium">{editQuestion.label_en}</span>
                  )}
                  {editQuestion.multi_select && (
                    <span className="text-[11px] text-[#ff2b75] font-black tracking-wide block mt-1.5">
                      {editQuestion.is_ranking
                        ? `* 정확히 ${editQuestion.max_select || 3}개를 선택해주세요 (순위 순서대로 선택)`
                        : `* 중복 선택 가능 (최대 ${editQuestion.max_select || "제한 없음"}개, 최소 1개 선택)`}
                    </span>
                  )}
                </div>

                <div className="mb-8 max-h-[40vh] overflow-y-auto pr-1">
                  <div className={editQuestion.type === "tag_chip" ? "grid grid-cols-2 gap-3" : "grid grid-cols-1 gap-3.5"}>
                    {editQuestion.answers.map(ans => {
                      const isSelected = editQuestion.multi_select
                        ? (tempAnswer || []).includes(ans.label_ko)
                        : tempAnswer === ans.label_ko;

                      const selectIndex = editQuestion.is_ranking
                        ? (tempAnswer || []).indexOf(ans.label_ko)
                        : -1;

                      return (
                        <button
                          key={ans.id}
                          onClick={() => handleSelectChoice(ans.label_ko)}
                          className={isSelected
                            ? "px-4.5 py-3 rounded-[10px] border border-[#ff2b75] bg-[#ff2b75]/8 text-white font-extrabold text-left cursor-pointer flex justify-between items-center gap-2"
                            : "px-4.5 py-3 rounded-[10px] border border-white/5 bg-[#171719]/40 hover:border-white/15 text-white/70 hover:text-white text-left cursor-pointer flex justify-between items-center gap-2"}
                        >
                          <span className="text-[13px] leading-tight tracking-tight font-bold">{ans.label_ko}</span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#ff2b75] text-white flex items-center justify-center text-[10px] font-black uppercase shrink-0 font-display">
                              {selectIndex !== -1 ? `${selectIndex + 1}` : "✓"}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setAnswers(prev => ({ ...prev, [editQuestion.id]: tempAnswer }));
                      setEditingQuestionId(null);
                    }}
                    disabled={isEditSaveDisabled}
                    className="h-12 flex-1 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white rounded-[8px] font-bold text-[13.5px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    저장하기 (Save)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingQuestionId(null)}
                    className="h-12 px-5 inline-flex items-center justify-center border border-white/10 hover:bg-white/5 text-white rounded-[8px] font-bold text-[13px] cursor-pointer"
                  >
                    취소 (Cancel)
                  </button>
                </div>
              </div>
            </div>
          );
        })()
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
