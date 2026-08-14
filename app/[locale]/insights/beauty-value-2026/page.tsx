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

export default function ArticleBeautyValue2026Page({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isKo = locale === "ko";

  const [sec1Ref, sec1Visible] = useIntersectionReveal();
  const [sec2Ref, sec2Visible] = useIntersectionReveal();
  const [sec3Ref, sec3Visible] = useIntersectionReveal();
  const [sec4Ref, sec4Visible] = useIntersectionReveal();
  const [sec5Ref, sec5Visible] = useIntersectionReveal();
  const [exerciseRef, exerciseVisible] = useIntersectionReveal();

  const priceLadder = [
    { label: "ENTRY", descKo: "처음 구매하기 부담 없는 진입 장벽의 상품군", descEn: "Low-risk entry point category" },
    { label: "CORE", descKo: "매출 부피를 채워주는 매장의 주력 매출 상품군", descEn: "Core volume contributor category" },
    { label: "BETTER", descKo: "성분이나 성능 차이가 눈에 보이고 업셀링을 유도하는 상품군", descEn: "Clear upselling category based on visible results" },
    { label: "PREMIUM", descKo: "브랜드력이나 확실한 임상 실증을 바탕으로 높은 객단가를 형성하는 상품군", descEn: "High-ticket category supported by clinical credentials" }
  ];

  const diagnostics = [
    { label: "PRICE", textKo: "단순히 경쟁 매장이나 온라인 오픈마켓 대비 가격 오설정 문제인가?", textEn: "Is it a pricing mismatch vs local stores?" },
    { label: "PLACEMENT", textKo: "매대 골든존에서 벗어나 고객의 눈길이 전혀 닿지 못하는 물리적 진열의 문제인가?", textEn: "Is it hidden from Golden Zone shelf views?" },
    { label: "EXPLANATION", textKo: "제품의 독특한 이점을 직원이 설명하지 못하거나 안내 마크업이 미비한 셀러 교육의 문제인가?", textEn: "Is it a lack of staff guidance or description?" },
    { label: "ASSORTMENT", textKo: "지역 인근 소비자의 나이, 피부 성향 등 상권 핏과 불일치하는 구색의 문제인가?", textEn: "Is it a catalog demographic mismatch?" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0c] text-white font-sans overflow-x-hidden selection:bg-[#ff2b75] selection:text-white">
      
      {/* Header Navigation */}
      <Header locale={locale} />

      <main className="flex-1">
        
        {/* ================= ARTICLE HEADER ================= */}
        <section className="max-w-[900px] mx-auto px-6 sm:px-12 pt-16 sm:pt-24 text-left">
          
          <div className="flex flex-col gap-4 mb-8 font-medium">
            <span className="text-[10px] sm:text-[11px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display select-none">
              RETAIL PLAYBOOK
            </span>
            <h1 className="font-display text-[26px] sm:text-[38px] lg:text-[42px] font-black leading-tight text-white tracking-tight m-0 keep-all">
              {isKo 
                ? "가격을 낮추는 게 답은 아닙니다: 2026 Beauty 고객이 말하는 ‘Value’의 기준" 
                : "Lowering Prices Is Not the Answer: How Beauty Shoppers Define Value"
              }
            </h1>
            <p className="text-[14px] sm:text-[16px] text-white/60 leading-relaxed m-0 mt-2 keep-all">
              {isKo
                ? "Value는 가장 싼 가격이 아닙니다. 고객이 “이 가격이면 살 이유가 있다”고 느끼는 순간에 만들어집니다."
                : "Value is not the lowest price index. It is created the instant a customer recognizes a clear justification to buy."
              }
            </p>
            <div className="flex items-center gap-4 text-[10.5px] text-[#7A7A7A] font-black uppercase tracking-wider font-display mt-4 border-b border-white/10 pb-6 select-none">
              <span>5 MIN READ</span>
              <span>•</span>
              <span>{isKo ? "가격 및 구색 전략" : "PRICING & MERCHANDISING"}</span>
              <span>•</span>
              <span>BY K SELECT INSIGHTS</span>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden border border-white/10 shadow-2xl group mb-16">
            <Image
              src="/images/insights/beauty_value_2026.jpg"
              alt="Beauty Supply shelf with products at different positioning levels ENTRY, CORE, BETTER, PREMIUM"
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
                ? "공급망 단가 할인 경쟁에 뛰어들어 가격만 낮추는 것은 소매 수익성의 자멸 경로입니다."
                : "Engaging in wholesale price wars and constant markdowns is a race to the bottom for retail profit margins."
              }
            </p>
            <p className="m-0 keep-all">
              {isKo
                ? "가격표의 절대적 수치가 낮다고 해서 고객이 느끼는 가치(Value)가 커지지는 않습니다. 현대 뷰티 소비 연구에서 소매 점주가 던져야 할 가치 판단은 다음과 같습니다. “우리 매장은 고객이 이 비용을 지불해야 할 합리적 근거를 설명해 주고 있는가?”라는 점입니다."
                : "A lower decimal point on price tags does not equate to higher perceived value. Retailers should ask: Are we communicating a clear reason for the price point to the shopper?"
              }
            </p>

            {/* Dynamic Value Formula Swap Animation */}
            <div className="bg-[#121214] border border-white/10 rounded-[20px] p-6.5 text-center my-4 select-none">
              <span className="block text-[9px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-2">RETAIL VALUE EQUATION</span>
              <div className="text-[17px] sm:text-[19px] font-black font-display tracking-tight transition-all duration-700">
                {sec1Visible ? (
                  <span className="text-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.15)]">Value = Clear Reason to Buy (가치 = 선명한 구매의 이유)</span>
                ) : (
                  <span className="text-white/40">Value ≠ Lowest Price (가치 ≠ 무작정 낮은 단가)</span>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 01 */}
          <div ref={sec1Ref} className={`mb-12 transition-all duration-700 transform ${sec1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              01. 뷰티 소비자는 정해진 단일 가격대를 넘나들며 지출합니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "많은 점포가 매장 타깃 가격을 중저가 혹은 고가 중 하나로 성급하게 단정 짓곤 합니다. 하지만 실제 소비 패턴을 뜯어보면, 샴푸(Shampoo)나 기본 클렌징 등 회전성이 높고 일상적인 기초 케어에는 알뜰한 중저가 옵션(Value/Entry)을 매칭하면서도, 에센스나 세럼(Serum) 같은 깊은 피부 집중 트리트먼트 케어에는 기꺼이 3~4배가 넘는 비용을 투자(Premium)합니다.<sup>[1]</sup>"
                : "Shoppers cross price boundaries daily. A customer might pick a budget-friendly basic cleanser, yet invest heavily in high-potency serums and treatments in the very same visit."
              }
            </p>

            {/* Grid display for category matching */}
            <div className="grid grid-cols-2 gap-4 my-6 select-none font-bold text-xs">
              <div className="bg-[#121214] border border-white/5 p-4 rounded-[12px] flex items-center justify-between">
                <span className="text-white/60">DAILY CLEANSER</span>
                <span className="text-[#00f0ff] border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-2 py-0.5 rounded">ENTRY / VALUE</span>
              </div>
              <div className="bg-[#121214] border border-[#ff2b75]/25 p-4 rounded-[12px] flex items-center justify-between">
                <span className="text-white/95">ACTIVE SERUM</span>
                <span className="text-[#ff2b75] border border-[#ff2b75]/20 bg-[#ff2b75]/5 px-2 py-0.5 rounded">PREMIUM / TREATMENT</span>
              </div>
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "즉, 모든 진열대를 다 유사한 마진율과 저가 전략으로 통일시킬 필요가 전혀 없습니다. 품목의 위상에 맞춰 가격 전략을 다각화해야 매대의 수익이 탄탄해집니다."
                : "Operating all catalog listings under a single cost formula is an inefficient use of shelf space. Align prices to product category functions."
              }
            </p>
          </div>

          {/* SECTION 02 */}
          <div ref={sec2Ref} className={`mb-12 transition-all duration-700 transform ${sec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              02. 건강한 진열대(Shelf)는 반드시 명확한 가격 사다리를 이룹니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "선반 위의 가격 구배는 단순히 비싸고 싼 것의 무작위 배치가 아닙니다. 고객이 다가왔을 때 단계별로 이해하고 비교할 수 있는 정교한 세그먼트 배열이 성립되어야 합니다."
                : "A structured shelf guides choice. Align your retail space to represent a ladder of price entry options:"
              }
            </p>

            {/* ENTRY -> CORE -> BETTER -> PREMIUM Stagger Reveal */}
            <div className="flex flex-col gap-3.5 my-6 select-none font-bold text-xs">
              {priceLadder.map((tier, idx) => {
                const delays = ["delay-[100ms]", "delay-[250ms]", "delay-[400ms]", "delay-[550ms]"];
                return (
                  <div 
                    key={idx}
                    className={`bg-[#121214] border border-white/5 p-4.5 rounded-[12px] flex items-center gap-4.5 transition-all duration-500 transform ${
                      sec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    } ${delays[idx]}`}
                  >
                    <span className="text-[#00f0ff] font-display font-black text-[11px] border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-2 py-0.5 rounded-[4px] min-w-[70px] text-center">
                      {tier.label}
                    </span>
                    <span className="text-white/80 font-semibold leading-relaxed">
                      {isKo ? tier.descKo : tier.descEn}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <p className="m-0 keep-all">
              {isKo
                ? "가격의 단차가 발생하는 명확한 이유(성능, 농도, 크기 등)가 직관적으로 보여야 고객은 거부감 없이 업셀링을 수용합니다."
                : "If the differentiation in price is visually obvious, upsells occur organically without customer friction."
              }
            </p>
          </div>

          {/* SECTION 03 */}
          <div ref={sec3Ref} className={`mb-12 transition-all duration-700 transform ${sec3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              03. 프리미엄 가격 정책은 반드시 '설명'으로 뒷받침되어야 합니다.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "고단가 제품을 판매할 때 직원이 단순히 '이게 새로 나온 좋은 수입품입니다'라는 식의 권유는 효력이 없습니다. 가격이 높은 상품은 다음과 같은 차별점을 직관적으로 어필할 수 있는 구조가 완비되어 있어야 마진 가치를 수행합니다.<sup>[2]</sup>"
                : "High-ticket items cannot sell on internet buzz alone. Realize markup profits by validating why the product commands premium prices:"
              }
            </p>

            {/* Premium factors list */}
            <div className="bg-[#121214] border border-white/10 rounded-[20px] p-6 text-left text-[13px] font-bold">
              <span className="block text-[10px] text-[#ff2b75] tracking-wider uppercase font-display mb-4">PREMIUM DIFFERENTIATORS</span>
              <ul className="space-y-3 text-white/95">
                <li className="flex items-start gap-3">
                  <span className="text-[#ff2b75]">✔</span>
                  <span><strong>Concentration</strong>: 희석률이 낮은 고밀도 활성 성분 함량 배합</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff2b75]">✔</span>
                  <span><strong>Multi-benefit</strong>: 보습과 미백, 두피 쿨링과 장벽 개선을 동시 해결하는 다기능 솔루션</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff2b75]">✔</span>
                  <span><strong>Clinical Claim</strong>: 규제 기관 기준에 준하는 엄격한 공인 피부 테스트 입증 임상 데이터</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ff2b75]">✔</span>
                  <span><strong>Format / Applicator</strong>: 위생적인 스포이드, 롤러 볼 등 인체 공학적 설계 팩키징</span>
                </li>
              </ul>
            </div>
          </div>

          {/* SECTION 04 */}
          <div ref={sec4Ref} className={`mb-12 transition-all duration-700 transform ${sec4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              04. 판매 부진에 대해 가격 할인을 지르기 전에 원인부터 해부하세요.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "어떤 상품의 완판 속도가 느리다고 해서 점주가 성급하게 가격 할인(Markdowns)부터 단행하는 것은 영업 마진의 영구 손실을 부릅니다. 진단을 통해 요인을 체계적으로 분별하는 것이 현명합니다.<sup>[3]</sup>"
                : "Immediately turning to sales markdowns when inventory velocity slows is a reactive solution. Diagnose the operational cause systematically:"
              }
            </p>

            {/* Diagnostic Matrix Staggered Display */}
            <div className="grid sm:grid-cols-2 gap-4 my-6 select-none font-bold text-left text-xs">
              {diagnostics.map((diag, idx) => {
                const delays = ["delay-[100ms]", "delay-[250ms]", "delay-[400ms]", "delay-[550ms]"];
                return (
                  <div 
                    key={idx}
                    className={`bg-[#121214] border border-white/5 p-5 rounded-[16px] flex flex-col justify-between gap-3 transition-all duration-500 transform ${
                      sec4Visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    } ${delays[idx]}`}
                  >
                    <div>
                      <span className="text-[9px] text-[#ff2b75] tracking-widest uppercase font-display block mb-1">DIAGNOSTIC FACTOR 0{idx+1}</span>
                      <h4 className="text-white text-[13.5px] font-black m-0 mb-2">{diag.label}</h4>
                    </div>
                    <p className="m-0 text-[#9ca3af] leading-relaxed font-semibold border-t border-white/5 pt-2">
                      {isKo ? diag.textKo : diag.textEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 05 */}
          <div ref={sec5Ref} className={`mb-12 transition-all duration-700 transform ${sec5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              05. 글로벌 뷰티 카테고리 진입 시에도 동일한 가치 등식을 대입해야 합니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "K-Beauty는 최근 혁신적인 성분, 우수한 Efficacy, 높은 Affordability 측면에서 글로벌 뷰티 마켓의 기대를 높이고 있습니다. 하지만 단순히 '이것이 한국 수입 기초 화장품이니까 잘 팔릴 것'이라는 생각은 접어야 합니다. K-Beauty 품목군 역시 선반 위의 배치 흐름에 맞춰 Benefit이 투명하게 입증될 수 있어야 고객이 가격 저항을 무너뜨리고 리오더 매출의 궤도로 진입합니다."
                : "Although K-Beauty raises the baseline expectations for ingredient safety and pricing efficiency, the import origin alone does not assure conversions. Apply the same value diagnostic: Can the customer immediately identify the benefit on shelf level?"
              }
            </p>
          </div>

          {/* RETAILER EXERCISE */}
          <div 
            ref={exerciseRef}
            className={`border border-[#ff2b75]/25 bg-[#121214] rounded-[24px] p-7.5 sm:p-9.5 my-12 transition-all duration-700 transform ${
              exerciseVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
            }`}
          >
            <span className="text-[10px] text-[#ff2b75] font-black tracking-[0.2em] uppercase font-display block mb-2 select-none">
              RETAILER EXERCISE
            </span>
            <h3 className="text-[17.5px] sm:text-[20px] font-black text-white m-0 mb-6 keep-all">
              이번 주 매장 진열 진단 실습 (Price Ladder Test)
            </h3>
            
            <div className="flex flex-col gap-4.5 text-[13.5px] text-white/90">
              <p className="m-0 leading-relaxed font-semibold">
                매장 안에서 동일한 성격의 카테고리 제품(예: 수분 에센스 5종)을 집어 올린 후, 점포 직원에게 다음과 같은 질문을 직접 던져보세요.
              </p>
              <div className="bg-[#0c0c0c] border border-white/10 p-5 rounded-[12px] font-bold text-center italic text-[#00f0ff] select-none">
                “이 수분 에센스가 바로 옆에 있는 에센스보다 비싼 이유가 무엇인지 15초 안에 고객에게 설명할 수 있나요?”
              </div>
              <p className="m-0 leading-relaxed font-semibold">
                만약 매장 직원이 15초 안에 답변하기 곤란해하거나 설명을 헤맨다면, 매장의 **진열 위치(Placement)**, **직원 교육(Education)**, 혹은 **제품 구색 조합(Assortment)** 중 어디에 병목이 발생해 가치 소통을 막고 있는지 파악해야 합니다.
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 mt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-display font-black text-xs sm:text-sm text-[#ff2b75] uppercase tracking-wider select-none">
                Value Is Not the Lowest Price. Value Is a Clear Reason to Buy.
              </span>
              <Link
                href={`/${locale}/insights/black-beauty-2026`}
                className="h-12 px-4 sm:px-6 w-full sm:w-auto rounded-[8px] border border-[#ff2b75]/35 hover:bg-[#ff2b75] text-[#ff2b75] hover:text-white font-black text-[11px] sm:text-[12.5px] tracking-wide inline-flex items-center justify-center transition-all duration-200 shrink-0 whitespace-nowrap"
              >
                {isKo ? "매장 적용용 Price Ladder Checklist 보기 →" : "View Price Ladder Checklist →"}
              </Link>
            </div>
          </div>

          {/* Previous / Next Insight Navigation */}
          <div className="grid sm:grid-cols-2 gap-6 my-12 border-t border-white/10 pt-12 select-none">
            <Link 
              href={`/${locale}/insights/black-beauty-2026`}
              className="group bg-[#121214] border border-white/5 hover:border-[#ff2b75]/35 p-6 rounded-[20px] flex flex-col items-start text-left transition-all duration-300"
            >
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-2 flex items-center gap-1 transition-transform group-hover:-translate-x-1">
                ← PREVIOUS INSIGHT
              </span>
              <span className="text-[#7A7A7A] text-[9.5px] font-black tracking-widest uppercase font-display block mb-1">
                BEAUTY MARKET
              </span>
              <span className="text-white group-hover:text-[#ff2b75] font-display text-[15px] font-black leading-snug transition-colors keep-all">
                {isKo ? "Black Beauty 2026: 온라인이 커져도, 매장이 더 중요해지는 이유" : "Black Beauty 2026: Why Stores Matter More as Online Grows"}
              </span>
            </Link>
            <Link 
              href={`/${locale}/insights/k-beauty-2026-signals`}
              className="group bg-[#121214] border border-white/5 hover:border-[#ff2b75]/35 p-6 rounded-[20px] flex flex-col items-end text-right transition-all duration-300"
            >
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-2 flex items-center gap-1 transition-transform group-hover:translate-x-1">
                NEXT INSIGHT →
              </span>
              <span className="text-[#7A7A7A] text-[9.5px] font-black tracking-widest uppercase font-display block mb-1">
                BEAUTY MARKET
              </span>
              <span className="text-white group-hover:text-[#ff2b75] font-display text-[15px] font-black leading-snug transition-colors keep-all">
                {isKo ? "K-Beauty 2026: 지금 봐야 할 3가지 신호, 따라가지 않아도 될 3가지 유행" : "K-Beauty 2026: 3 Signals to Track, 3 Trends to Ignore"}
              </span>
            </Link>
          </div>

          {/* Desktop Sticky Navigation */}
          <div className="hidden lg:flex fixed bottom-8 right-8 z-40 bg-[#121214]/90 backdrop-blur border border-white/10 rounded-full px-5 py-3 items-center gap-4.5 shadow-2xl text-[11px] font-black tracking-widest font-display text-white select-none">
            <Link 
              href={`/${locale}/insights/black-beauty-2026`} 
              className="text-white/60 hover:text-[#ff2b75] transition-colors"
              title={isKo ? "Black Beauty 2026" : "Black Beauty 2026"}
            >
              ← PREV
            </Link>
            <span className="text-white/30">|</span>
            <span className="text-[#00f0ff]">02 / 06</span>
            <span className="text-white/30">|</span>
            <Link 
              href={`/${locale}/insights/k-beauty-2026-signals`} 
              className="text-white/60 hover:text-[#ff2b75] transition-colors"
              title={isKo ? "K-Beauty 2026" : "K-Beauty 2026"}
            >
              NEXT →
            </Link>
          </div>

          {/* SOURCES & REFERENCES SECTION */}
          <div className="border-t border-white/10 pt-8 mt-16 text-[12px] text-[#7A7A7A] select-none font-medium">
            <span className="block text-white/50 tracking-wider uppercase font-display text-[10px] font-black mb-3">SOURCES & REFERENCES</span>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">01</span>
                <div>
                  <span className="text-white/90 font-bold block">Circana Group Inc.</span>
                  <span className="text-[#7A7A7A] block mt-0.5">Beauty in 2026: How Value, Wellness, and Tech Are Writing the Next Chapter (January 12, 2026)</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">02</span>
                <div>
                  <span className="text-white/90 font-bold block">Circana Beauty Operations Tracker</span>
                  <span className="text-[#7A7A7A] block mt-0.5">U.S. Beauty Industry Posts Solid First-Half Growth (August 11, 2026)</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">03</span>
                <div>
                  <span className="text-white/90 font-bold block">NielsenIQ (NIQ) Retail Insights</span>
                  <span className="text-[#7A7A7A] block mt-0.5">Beauty in 2026: Global shifts. Local realities. Real growth (April 6, 2026)</span>
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
