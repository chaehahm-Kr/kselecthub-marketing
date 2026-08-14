"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../Header";
import Footer from "../../Footer";
import PartnerModal from "../../PartnerModal";

function useIntersectionReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible] as const;
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function ArticleInventoryTurnPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isKo = locale === "ko";

  const [sec1Ref, sec1Visible] = useIntersectionReveal();
  const [sec2Ref, sec2Visible] = useIntersectionReveal();
  const [sec3Ref, sec3Visible] = useIntersectionReveal();
  const [sec4Ref, sec4Visible] = useIntersectionReveal();
  const [sec5Ref, sec5Visible] = useIntersectionReveal();
  const [sec6Ref, sec6Visible] = useIntersectionReveal();
  const [checkRef, checkVisible] = useIntersectionReveal();

  const quadrants = [
    {
      title: "HIGH MARGIN / LOW TURNOVER",
      statusKo: "Inventory Risk (재고 묶임 위험)",
      statusEn: "Inventory Risk",
      actionKo: "장기 체화 재고화 및 자금 정체 원인",
      actionEn: "Ties up capital & creates slow-moving liabilities"
    },
    {
      title: "HIGH MARGIN / HIGH TURNOVER",
      statusKo: "Strong Performer (가장 확실한 효자 상품)",
      statusEn: "Strong Performer",
      actionKo: "최우선 진열 면적 확보 및 실시간 리오더 대응",
      actionEn: "Allocates prime shelf spaces & triggers automatic reorders"
    },
    {
      title: "LOWER MARGIN / HIGH TURNOVER",
      statusKo: "Traffic / Essential Role (미끼/회전율 기여)",
      statusEn: "Traffic / Essential Role",
      actionKo: "소비자 방문 빈도를 견인하고 품절 절대 방지",
      actionEn: "Drives customer shopping frequency; must avoid stock-outs"
    },
    {
      title: "LOW MARGIN / LOW TURNOVER",
      statusKo: "Reconsider (퇴출 및 SKU 재검토 대상)",
      statusEn: "Reconsider / Decline",
      actionKo: "디스플레이 배치 교환 프로그램 가동",
      actionEn: "Triggers SKU replacement & alternative curation credit"
    }
  ];

  const diagnosticFactors = [
    { label: "PRODUCT ISSUE", descKo: "제품 자체의 품질 결함 또는 유통기한 임박 여부", descEn: "Quality concerns or short shelf-life" },
    { label: "PRICE ISSUE", descKo: "지역 내 타 매장 대비 경쟁 가격 설정 오류 여부", descEn: "Misaligned local pricing strategy" },
    { label: "PLACEMENT ISSUE", descKo: "소비자 눈높이(Golden Zone)에서 빗겨간 비가시성 진열", descEn: "Poor visual merchandising or placement" },
    { label: "KNOWLEDGE ISSUE", descKo: "매장 직원의 제품 특징 및 사용법 설명 능력 부족", descEn: "Lack of staff product knowledge and explanation" },
    { label: "STORE FIT ISSUE", descKo: "매장 주변 상권 및 내방 인종/연령층 구성과의 미스매치", descEn: "Demographics misfit for specific categories" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0c] text-white font-sans overflow-x-hidden selection:bg-[#ff2b75] selection:text-white">
      
      {/* Header Navigation */}
      <Header locale={locale} />

      <main className="flex-1">
        
        {/* ================= ARTICLE HEADER ================= */}
        <section className="max-w-[900px] mx-auto px-6 sm:px-12 pt-16 sm:pt-24 text-left">
          
          <div className="flex flex-col gap-4 mb-8">
            <span className="text-[10px] sm:text-[11px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display select-none">
              RETAIL PLAYBOOK
            </span>
            <h1 className="font-display text-[26px] sm:text-[38px] lg:text-[42px] font-black leading-tight text-white tracking-tight m-0 keep-all">
              {isKo 
                ? "좋은 상품보다 중요한 것: Inventory Turn" 
                : "What Matters More than Good Margins: Inventory Turnover Speed"
              }
            </h1>
            <p className="text-[14px] sm:text-[16px] text-white/60 leading-relaxed font-medium m-0 mt-2 keep-all">
              {isKo
                ? "마진이 높아도 팔리지 않으면 현금은 Shelf 위에 멈춰 있습니다. Retail의 중요한 질문은 “얼마를 남기나?”와 함께 “얼마나 빨리 다시 파나?”입니다."
                : "Cash remains frozen on shelves if products sit slow. The vital retail diagnostic combines margin size with transaction velocity."
              }
            </p>
            <div className="flex items-center gap-4 text-[10.5px] text-[#7A7A7A] font-black uppercase tracking-wider font-display mt-4 border-b border-white/10 pb-6 select-none">
              <span>5 MIN READ</span>
              <span>•</span>
              <span>{isKo ? "소매 경영 인사이트" : "RETAIL MANAGEMENT"}</span>
              <span>•</span>
              <span>BY K SELECT INSIGHTS</span>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden border border-white/10 shadow-2xl group mb-16">
            <Image
              src="/images/insights/inventory_turn.jpg"
              alt="Inventory on modern retail shelf combined with overlay graph charts of sales velocity"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/40 via-transparent to-transparent pointer-events-none" />
          </div>

        </section>

        {/* ================= MAIN ARTICLE BODY ================= */}
        <section className="max-w-[700px] mx-auto px-6 sm:px-12 text-left text-[14.5px] sm:text-[15px] text-white/80 leading-relaxed font-normal pb-24">
          
          {/* INTRO */}
          <div className="flex flex-col gap-5 mb-12 text-white/90">
            <p className="m-0 keep-all text-[15.5px] sm:text-[17px] leading-relaxed font-medium">
              {isKo
                ? "소매점 매대 위에 높게 표시된 마진 수치(Retail Margin)는 점주들의 흥미를 끌기에 충분합니다."
                : "High markup percentages on wholesale invoices look extremely appealing to store owners."
              }
            </p>
            <p className="m-0 keep-all">
              {isKo
                ? "하지만 여기에 재고(Inventory) 개념이 주입되는 순간 소매 경영의 핵심 척도가 요구됩니다. “이 마진율을 가진 상품이 실제로 1년에 몇 번이나 팔려 다시 현금으로 전환되는가?” 즉, 재고 회전 속도(Inventory Turn)에 대한 질문입니다.<sup>[1]</sup>"
                : "However, the moment physical stock lands in your store, a second metric becomes vital: How many times does this margin investment turn into cold hard cash over a fiscal year?"
              }
            </p>
            {/* Highlight Slogan Box */}
            <div className="bg-[#ff2b75]/5 border-l-2 border-[#ff2b75] p-5.5 rounded-r-[12px] my-4 select-none">
              <span className="block text-[11px] font-black text-[#ff2b75] tracking-widest uppercase font-display mb-1.5">RETAIL RULE</span>
              <p className="m-0 text-[14px] text-white font-black leading-normal keep-all">
                {isKo
                  ? "재고가 멈춘 매대는 자금을 잠식합니다. 소매의 진정한 승부는 단품 마진 크기(Margin)와 판매 순환 속도(Turnover)의 곱으로 결정됩니다."
                  : "Stagnant shelves tie up precious working capital. True retail performance is the product of Unit Margin multiplied by Turnover Velocity."
                }
              </p>
            </div>
          </div>

          {/* SECTION 01 */}
          <div ref={sec1Ref} className={`mb-12 transition-all duration-700 transform ${sec1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              01. 매출액이 높다고 해서 무조건 우수한 재고인 것은 아닙니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "소매 리테일러는 일반적으로 총 매출이나 마진율을 먼저 검토합니다. 그러나 매대 위에 현금이 묶이지 않으려면 '판매 속도와 보충 주기'가 최적화되어야 합니다. 연간 재고회전율(Turnover Rate)은 평균 재고가 완판되어 신규 재고로 완전히 보충되는 횟수를 뜻합니다. 이 회전 속도가 곧 매장 자금 흐름의 건강함입니다."
                : "Store owners naturally track top-line sales volume. Yet, avoiding cash locks requires understanding replenishment ratios. Inventory turnover is the number of times your average stock is completely sold out and refilled over a period."
              }
            </p>
          </div>

          {/* SECTION 02 */}
          <div ref={sec2Ref} className={`mb-12 transition-all duration-700 transform ${sec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              02. Margin × Turnover 매트릭스
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "단순히 마진이 크다는 사실만으로는 우수한 상품이라 판단할 수 없습니다. 자본과 진열 면적이 얼마나 빨리 새로운 매출로 변환되는지를 다차원적으로 분석해야 합니다."
                : "Margin size alone is an incomplete diagnostic. True performance is plotted on a 2x2 grid combining Margin with Turnover:"
              }
            </p>

            {/* 2x2 Quadrant Grid */}
            <div className="grid sm:grid-cols-2 gap-4 my-6 select-none text-left font-medium">
              {quadrants.map((q, idx) => (
                <div key={idx} className="bg-[#121214] border border-white/5 hover:border-[#ff2b75]/25 p-5 rounded-[16px] flex flex-col justify-between gap-3 transition-all">
                  <div>
                    <span className="text-[9px] font-black text-[#7A7A7A] tracking-wider font-display block mb-1">QUADRANT 0{idx+1}</span>
                    <h4 className="text-[14px] font-black text-white m-0 leading-tight mb-2">{q.title}</h4>
                    <span className="text-[12.5px] text-[#ff2b75] font-extrabold block mb-1">{isKo ? q.statusKo : q.statusEn}</span>
                  </div>
                  <p className="text-[12px] text-[#9ca3af] leading-relaxed font-semibold m-0 border-t border-white/5 pt-2">
                    {isKo ? q.actionKo : q.actionEn}
                  </p>
                </div>
              ))}
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "점포 성장의 열쇠는 'High Margin / High Turnover' 품목의 비중을 높이고, 'Low Margin / Low Turnover' 품목은 퇴출하여 매대 가용 면적을 회전시키는 데 있습니다."
                : "Managing a successful storefront means expanding your High-Margin/High-Turnover items while systematically swapping out slow products."
              }
            </p>
          </div>

          {/* SECTION 03 */}
          <div ref={sec3Ref} className={`mb-12 transition-all duration-700 transform ${sec3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              03. 재고 회전 주기는 현금 흐름의 속도입니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "재고 회전 주기는 소매점 현금 흐름(Cash Flow)의 속도와 정확히 일치합니다. 재고가 선반 위에 멈춰 체화될수록, 신규 트렌드 상품 도입, 빠른 회전 품목의 리오더 확보, 프로모션 실행 등에 사용되어야 할 자금이 매대 위에 동결됩니다.<sup>[2]</sup>"
                : "The turnover rate determines your cash flow velocity. Stock sitting dead on your shelves represents cold cash frozen in place, preventing reorders of trending fast-sellers."
              }
            </p>
            
            {/* Flow loop diagram */}
            <div className="bg-[#121214] border border-white/5 rounded-[16px] p-5.5 my-6 flex flex-col sm:flex-row items-center justify-between gap-4 select-none text-xs font-black text-white/90">
              {["CASH (점포 현금)", "INVENTORY (재고 확보)", "SALE (실질 판매)", "REORDER (리오더)"].map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="bg-[#0c0c0c] border border-white/10 rounded-[8px] px-4.5 py-2.5 w-full sm:w-auto text-center">
                    {step}
                  </div>
                  {idx < 3 && (
                    <span className="text-[#00f0ff] transform rotate-90 sm:rotate-0 font-extrabold text-sm">➔</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "반대로 회전율 예측 실패로 품절 상태(Stock-out)가 빈번히 일어나는 것 또한 리테일러에게는 영구적인 매출 손실을 초래하므로, 적정한 안전 재고 기준(Safety Stock)을 조율하는 의사결정이 핵심입니다."
                : "Conversely, failing to reorder on time leads to stock-outs and permanent loss of revenue."
              }
            </p>
          </div>

          {/* SECTION 04 */}
          <div ref={sec4Ref} className={`mb-12 transition-all duration-700 transform ${sec4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              04. 연간 회전율 수치 집계만 바라봐서는 늦습니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "연간 정산 단계에서 재고 분석표를 확인하는 것은 사후약방문에 가깝습니다. 신규 투입된 상품군은 30일 / 60일 / 90일 단위의 누적 판매 속도(Sell-Through Rate)를 선제 관리하여야 재고 정체 리스크를 미연에 방지할 수 있습니다."
                : "Waiting for annual spreadsheets is a reactive approach. Track your early metrics at 30, 60, and 90-day checkpoints instead:"
              }
            </p>

            {/* Timeline component */}
            <div className="bg-[#121214] border border-white/5 rounded-[20px] p-6 my-6 select-none flex flex-col gap-5 text-left text-xs font-black">
              {[
                { title: "DAY 30 - Early Signal", descKo: "초기 30일 간의 완판 속도를 통한 고객 반응 조기 경보 파악", descEn: "Assess initial velocity and customer feedback early" },
                { title: "DAY 60 - Reorder Behavior", descKo: "60일 시점의 잔존 수량 분석으로 실질 보충(리오더) 발주 시기 확정", descEn: "Determine the exact reorder quantity based on remaining stock" },
                { title: "DAY 90 - Optimize & Swap", descKo: "90일 시점에 도달한 부진 재고의 90-Day Exchange Credit 발동 여부 검토", descEn: "Activate exchange credits for underperforming SKUs" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4.5 items-start">
                  <span className="text-[#00f0ff] font-display text-[13.5px] leading-none pt-0.5">{item.title}</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-[13px] font-bold">{isKo ? item.descKo : item.descEn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 05 */}
          <div ref={sec5Ref} className={`mb-12 transition-all duration-700 transform ${sec5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              05. 부진 재고 상품은 왜 안 팔리는지 5대 요인을 해부해야 합니다.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "판매 속도가 유난히 더딘 재고가 있을 때, 헐값으로 즉시 덤핑 처분하기 전에 5가지 매장 운영 원인을 정밀 진단(Diagnostic)하는 과정이 필요합니다."
                : "When an item moves slow, do not just discount it immediately. Troubleshoot the root cause across 5 categories:"
              }
            </p>

            {/* 5-Factor Diagnostic list */}
            <div className="flex flex-col gap-3 my-6 select-none text-left font-bold">
              {diagnosticFactors.map((factor, idx) => (
                <div key={idx} className="bg-[#121214] border border-white/5 p-4.5 rounded-[12px] flex items-start gap-4">
                  <span className="text-[9px] text-[#ff2b75] font-black tracking-widest font-display bg-[#ff2b75]/5 border border-[#ff2b75]/25 px-2.5 py-1.5 rounded-[4px] flex-shrink-0 mt-0.5">
                    {factor.label}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] text-white leading-tight">{isKo ? factor.descKo : factor.descEn}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "요인이 제품 자체의 문제인지, 진열 위치(Placement)가 잘못되었는지, 매장 직원의 설명 부족인지에 따라 해결책은 전혀 달라집니다. 원인 분석이 끝나야 비로소 진열 재배치를 할지, 혹은 신규 AP 큐레이션 교환 크레딧(90-Day Exchange Credit)을 적용할지 올바른 점포 의사결정을 내릴 수 있습니다."
                : "Identifying the bottleneck shows whether you need markdown sales, repositioning, staff training, or an inventory swap."
              }
            </p>
          </div>

          {/* SECTION 06 */}
          <div ref={sec6Ref} className={`mb-12 transition-all duration-700 transform ${sec6Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              06. 재고 데이터는 Curation 피드백과 결합되어야 합니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "단순히 회전 데이터를 집계하는 것만으로는 점포 경쟁력이 늘지 않습니다. 판매 순환 데이터를 바탕으로 다음 번 상품 매입 구성(Assortment Curation)을 더 정교하고 날카롭게 보정하는 지속적 순환 피드백 루프가 정립되어야 비로소 K-Beauty 매대의 가치가 극대화됩니다."
                : "Collecting inventory sheets is futile if the resulting numbers don't feed back into refining the next batch of product curations."
              }
            </p>
          </div>

          {/* RETAILER CHECKLIST */}
          <div 
            ref={checkRef}
            className={`border border-[#ff2b75]/25 bg-[#121214] rounded-[24px] p-7.5 sm:p-9.5 my-12 transition-all duration-700 transform ${
              checkVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
            }`}
          >
            <span className="text-[10px] text-[#ff2b75] font-black tracking-[0.2em] uppercase font-display block mb-2 select-none">
              RETAILER CHECKLIST
            </span>
            <h3 className="text-[17.5px] sm:text-[20px] font-black text-white m-0 mb-6 keep-all">
              {isKo ? "다음 5가지 소매 재고 핵심 질문에 바로 답할 수 있습니까?" : "Five diagnostic questions for store owners:"}
            </h3>
            
            <div className="flex flex-col gap-4 text-[13.5px] text-white/90">
              {[
                isKo ? "01 귀 매장에서 가장 빠른 속도로 완판되는 주력 SKU는 한 달에 정확히 몇 개 나가는가?" : "01 Exactly how many units of your top SKU sell through every 30 days?",
                isKo ? "02 재발주(Reorder)를 실행하는 최적의 잔존 수량 기준(Safety Stock)이 설정되어 있는가?" : "02 Is the safety stock replenishment threshold defined?",
                isKo ? "03 신규 진입시킨 K-Beauty SKU 중 60일 내 재구매 발주가 발생하는 비율은 몇 %인가?" : "03 What percentage of newly introduced SKUs require reorders within 60 days?",
                isKo ? "04 지난 90일 동안 매대 회전 속도가 절반(50%) 이하로 떨어진 악성 품목은 무엇인가?" : "04 Which SKUs fell below 50% sell-through over the last 90 days?",
                isKo ? "05 현재 점포의 여유 운전자금이 가장 심각하게 묶여 있는 카테고리는 어디인가?" : "05 Which shelf category holds the largest amount of dead capital?"
              ].map((check, idx) => (
                <div key={idx} className="flex gap-3.5 items-start">
                  <div className="w-5 h-5 rounded-[4px] border border-[#ff2b75]/35 bg-[#ff2b75]/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-[#ff2b75]">✓</div>
                  <span className="font-semibold leading-relaxed">{check}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 mt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-display font-black text-xs sm:text-sm text-[#ff2b75] uppercase tracking-wider select-none">
                Don’t Just Measure What You Sell. Measure How Fast Your Inventory Works.
              </span>
              <Link
                href={`/${locale}/simulator`}
                className="h-12 px-4 sm:px-6 w-full sm:w-auto rounded-[8px] bg-[#ff2b75] hover:bg-[#e01a5e] text-white font-black text-[11px] sm:text-[12.5px] tracking-wide inline-flex items-center justify-center transition-all duration-200 shrink-0 whitespace-nowrap"
              >
                {isKo ? "내 매장의 성장 가능 지표 확인하기 →" : "Simulate Growth Potential →"}
              </Link>
            </div>
          </div>

          {/* Previous / Next Insight Navigation */}
          <div className="grid sm:grid-cols-2 gap-6 my-12 border-t border-white/10 pt-12 select-none">
            <Link 
              href={`/${locale}/insights/scalp-care-bridge`}
              className="group bg-[#121214] border border-white/5 hover:border-[#ff2b75]/35 p-6 rounded-[20px] flex flex-col items-start text-left transition-all duration-300"
            >
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-2 flex items-center gap-1 transition-transform group-hover:-translate-x-1">
                ← PREVIOUS INSIGHT
              </span>
              <span className="text-[#7A7A7A] text-[9.5px] font-black tracking-widest uppercase font-display block mb-1">
                PRODUCT & CATEGORY
              </span>
              <span className="text-white group-hover:text-[#ff2b75] font-display text-[15px] font-black leading-snug transition-colors keep-all">
                {isKo ? "Scalp Care: Hair 고객을 K-Beauty 고객으로 연결할 수 있을까?" : "Scalp Care: Can We Bridge Hair Customers to K-Beauty Customers?"}
              </span>
            </Link>
            <div className="hidden sm:block" />
          </div>

          {/* Desktop Sticky Navigation */}
          <div className="hidden lg:flex fixed bottom-8 right-8 z-40 bg-[#121214]/90 backdrop-blur border border-white/10 rounded-full px-5 py-3 items-center gap-4.5 shadow-2xl text-[11px] font-black tracking-widest font-display text-white select-none">
            <Link 
              href={`/${locale}/insights/scalp-care-bridge`} 
              className="text-white/60 hover:text-[#ff2b75] transition-colors"
              title={isKo ? "Scalp Care Bridge" : "Scalp Care Bridge"}
            >
              ← PREV
            </Link>
            <span className="text-white/30">|</span>
            <span className="text-[#00f0ff]">06 / 06</span>
            <span className="text-white/30">|</span>
            <span className="text-white/20 cursor-not-allowed">NEXT →</span>
          </div>

          {/* SOURCES & REFERENCES SECTION */}
          <div className="border-t border-white/10 pt-8 mt-16 text-[12px] text-[#7A7A7A] select-none font-medium">
            <span className="block text-white/50 tracking-wider uppercase font-display text-[10px] font-black mb-3">SOURCES & REFERENCES</span>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">01</span>
                <div>
                  <span className="text-white/90 font-bold block">Harvard Business Review</span>
                  <span className="text-[#7A7A7A] block mt-0.5">소규모 비즈니스 점포의 현금 가용성과 재고 회전율(Turnover Velocity) 연구 리포트</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">02</span>
                <div>
                  <span className="text-white/90 font-bold block">Retail Management Association</span>
                  <span className="text-[#7A7A7A] block mt-0.5">화장품 카테고리 내 마진(Margin)과 회전 주기 시뮬레이션 연구 결과 보고서 (2024)</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">03</span>
                <div>
                  <span className="text-white/90 font-bold block">Letusto Internal Operations Research</span>
                  <span className="text-[#7A7A7A] block mt-0.5">미국 Independent Beauty Supply 200여 매장 재고 순환성 현장 실증 분석 데이터 (2001-2025)</span>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Apply Partner Form popup modal */}
        <PartnerModal />

      </main>

      {/* Footer */}
      <Footer locale={locale} />

    </div>
  );
}
