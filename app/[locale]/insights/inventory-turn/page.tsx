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
            <p className="text-[14px] sm:text-[16px] text-[#9ca3af] leading-relaxed font-semibold m-0 mt-2 keep-all">
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
        <section className="max-w-[760px] mx-auto px-6 sm:px-12 text-left text-[14.5px] sm:text-[15.5px] text-[#d1d5db] leading-relaxed font-medium pb-24">
          
          {/* INTRO */}
          <div className="flex flex-col gap-5 mb-14 text-white font-semibold">
            <p className="m-0 keep-all text-[16px] sm:text-[17.5px] leading-relaxed">
              {isKo
                ? "소매점 매대 위에 높고 화려하게 표시된 '마진 수치(Retail Margin)'는 점주들의 가슴을 뛰게 만듭니다."
                : "High markup percentages on wholesale invoices look extremely appealing to store owners."
              }
            </p>
            <p className="m-0 keep-all">
              {isKo
                ? "하지만 여기에 재고(Inventory) 개념이 투입되는 순간, 소매 경영의 성패를 가르는 근본적인 척도가 추가로 요구됩니다. 바로 “이 마진율을 가진 상품이 실제로 1년에 몇 번이나 팔려 현금으로 회수되는가?” 즉, 재고회전율(Inventory Turnover)에 대한 질문입니다."
                : "However, the moment physical stock lands in your store, a second metric becomes vital: How many times does this margin investment turn into cold hard cash over a fiscal year?"
              }
            </p>
            {/* Highlight Slogan Box */}
            <div className="bg-[#ff2b75]/5 border-l-2 border-[#ff2b75] p-5.5 rounded-r-[12px] my-4 select-none">
              <span className="block text-[11px] font-black text-[#ff2b75] tracking-widest uppercase font-display mb-1.5">RETAIL RULE</span>
              <p className="m-0 text-[14px] text-white font-black leading-normal keep-all">
                {isKo
                  ? "재고가 멈춘 매대는 자금을 잠식합니다. 소매의 진정한 승부는 단품 마진 크기(Margin)와 판매 순환 주기(Turnover)의 곱으로 증명됩니다."
                  : "Stagnant shelves tie up precious working capital. True retail performance is the product of Unit Margin multiplied by Turnover Velocity."
                }
              </p>
            </div>
          </div>

          {/* SECTION 01 */}
          <div ref={sec1Ref} className={`mb-14 transition-all duration-700 transform ${sec1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[20px] sm:text-[23px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              01. 매출이 높은 상품과 좋은 재고는 같은 말이 아닙니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "소매 리테일러는 일반적으로 매출 볼륨, 소비자 단가, 상품 마진율을 먼저 들여다봅니다. 하지만 매대 위에 현금이 묶이지 않기 위해서는 '판매 속도와 보충 주기'의 결합이 우선되어야 합니다. 연간 재고회전율(Turnover Rate)은 일정 기간 매장의 평균 재고가 완판되어 신규 재고로 완전히 보충되는 횟수를 뜻합니다. 이 회전 속도가 곧 매장의 자금 건전성입니다."
                : "Store owners naturally track top-line sales volume. Yet, avoiding cash locks requires understanding replenishment ratios. Inventory turnover is the number of times your average stock is completely sold out and refilled over a period."
              }
            </p>
          </div>

          {/* SECTION 02 */}
          <div ref={sec2Ref} className={`mb-14 transition-all duration-700 transform ${sec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[20px] sm:text-[23px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              02. Margin × Turnover 매트릭스
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "단순히 마진이 크다는 것 하나만으로는 우수한 상품이라 볼 수 없습니다. 자금과 진열 면적이 얼마나 자주 가치 있는 매출로 변환되는지를 입체적으로 매트릭스 분석해야 합니다."
                : "Margin size alone is an incomplete diagnostic. True performance is plotted on a 2x2 grid combining Margin with Turnover:"
              }
            </p>

            {/* 2x2 Quadrant Grid */}
            <div className="grid sm:grid-cols-2 gap-4 my-6 select-none text-left">
              {quadrants.map((q, idx) => (
                <div key={idx} className="bg-[#121214] border border-white/5 hover:border-[#ff2b75]/25 p-5 rounded-[16px] flex flex-col justify-between gap-3 transition-all">
                  <div>
                    <span className="text-[9px] font-black text-[#7A7A7A] tracking-wider font-display block mb-1">QUADRANT 0{idx+1}</span>
                    <h4 className="text-[14.5px] font-black text-white m-0 leading-tight mb-2">{q.title}</h4>
                    <span className="text-[12.5px] text-[#ff2b75] font-extrabold block mb-1">{isKo ? q.statusKo : q.statusEn}</span>
                  </div>
                  <p className="text-[12.0px] text-[#9ca3af] leading-relaxed font-semibold m-0 border-t border-white/5 pt-2">
                    {isKo ? q.actionKo : q.actionEn}
                  </p>
                </div>
              ))}
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "점포의 핵심 성장 동력은 'High Margin / High Turnover' 품목의 비중을 꾸준히 늘리고, 'Low Margin / Low Turnover' 품목을 적시 교환 및 필터링하여 매대 효율을 순환시키는 데 있습니다."
                : "Managing a successful storefront means expanding your High-Margin/High-Turnover items while systematically swapping out slow products."
              }
            </p>
          </div>

          {/* SECTION 03 */}
          <div ref={sec3Ref} className={`mb-14 transition-all duration-700 transform ${sec3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[20px] sm:text-[23px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              03. Inventory Turn은 Cash Flow의 속도입니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "재고 회전 주기는 곧 소매점 현금 흐름의 속도(Velocity)입니다. 재고가 선반 위에 정체되어 체화될수록, 최신 유행 상품 매입, 빠른 회전율 재오더 확보, 마케팅 프로모션, 인건비 지급에 즉시 사용되어야 할 가용 자금이 매대 위에 묶이게 됩니다."
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
                ? "회전율 제어가 불균형하여 품절 상태(Stock-out)가 반복되는 것 역시 기회비용 매출의 영구적 손실을 불러오므로, 적정한 Reorder 안전 마진을 구축하는 의사결정이 중요합니다."
                : "Conversely, failing to reorder on time leads to stock-outs and permanent loss of revenue."
              }
            </p>
          </div>

          {/* SECTION 04 */}
          <div ref={sec4Ref} className={`mb-14 transition-all duration-700 transform ${sec4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[20px] sm:text-[23px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              04. 연간 Turnover만 기다리지 마세요.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "연단위 회전율 수치 집계만 넋 놓고 바라보는 것은 소 잃고 외양간 고치는 일입니다. 신규 투입된 단품(SKU)은 30일 / 60일 / 90일 단위의 누적 판매 속도(Sell-Through Rate)를 선제 확인해야 리스크를 예방할 수 있습니다."
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
                    <span className="text-white text-[13px]">{isKo ? item.descKo : item.descEn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 05 */}
          <div ref={sec5Ref} className={`mb-14 transition-all duration-700 transform ${sec5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[20px] sm:text-[23px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              05. Slow Seller는 왜 느린지 원인을 해부해야 합니다.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "판매 속도가 부진한 재고가 있다면, 무작정 나쁜 제품으로 매도하여 헐값 처분하기 전에 5가지 운영 요인을 정밀 진단(Diagnostic)해야 합니다."
                : "When an item moves slow, do not just discount it immediately. Troubleshoot the root cause across 5 categories:"
              }
            </p>

            {/* 5-Factor Diagnostic list */}
            <div className="flex flex-col gap-3 my-6 select-none text-left">
              {diagnosticFactors.map((factor, idx) => (
                <div key={idx} className="bg-[#121214] border border-white/5 p-4.5 rounded-[12px] flex items-start gap-4">
                  <span className="text-[9.5px] text-[#ff2b75] font-black tracking-widest font-display bg-[#ff2b75]/5 border border-[#ff2b75]/25 px-2.5 py-1.5 rounded-[4px] flex-shrink-0 mt-0.5">
                    {factor.label}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] text-white font-bold leading-tight">{isKo ? factor.descKo : factor.descEn}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "정확한 원인 진단이 선행되어야만 무작정 할인 판매를 할지, 진열 스티커 및 매대 재배치를 할지, 제품 교육 보강을 할지, 혹은 신규 AP 상품 교환(90-Day Exchange Credit)을 적용할지 올바르게 대응할 수 있습니다."
                : "Identifying the bottleneck shows whether you need markdown sales, repositioning, staff training, or an inventory swap."
              }
            </p>
          </div>

          {/* SECTION 06 */}
          <div ref={sec6Ref} className={`mb-14 transition-all duration-700 transform ${sec6Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[20px] sm:text-[23px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              06. Inventory Data는 Curation과 연동되어야 합니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "숫자 데이터를 수집하는 것 자체만으로는 소용이 없습니다. 확보된 재고 회전 판매 데이터가 다음 주기 상품의 구성 믹스를 더 정교하고 날카롭게 다듬는 '지속적 최적화(Curation Cycle)' 피드백 루프로 연계되어야 합니다."
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
            <h3 className="text-[18px] sm:text-[21px] font-black text-white m-0 mb-6 keep-all">
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
              <span className="font-display font-black text-sm text-[#ff2b75] uppercase tracking-wider select-none">
                Don’t Just Measure What You Sell. Measure How Fast Your Inventory Works.
              </span>
              <Link
                href={`/${locale}/simulator`}
                className="h-12 px-6 rounded-[8px] bg-[#ff2b75] hover:bg-[#e01a5e] text-white font-black text-[12.5px] tracking-wide inline-flex items-center justify-center transition-all duration-200"
              >
                {isKo ? "내 매장의 성장 가능 지표 확인하기 →" : "Simulate Growth Potential →"}
              </Link>
            </div>
          </div>

          {/* SOURCES SECTION */}
          <div className="border-t border-white/10 pt-8 mt-16 text-[11px] text-[#7A7A7A] font-bold select-none">
            <span className="block text-white/50 tracking-wider uppercase font-display mb-2">SOURCES & REFERENCES</span>
            <ul className="list-disc pl-4 space-y-1.5 leading-normal">
              <li>Harvard Business Review: The Power of Inventory Turn in Small Businesses</li>
              <li>Retail Industry Association: Margin vs Turnover Benchmarks in Cosmetics</li>
              <li>Letusto Internal Retail Operations Database 2001-2025</li>
            </ul>
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
