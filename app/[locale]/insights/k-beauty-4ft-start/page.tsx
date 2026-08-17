"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../Header";
import Footer from "../../Footer";
import PartnerModal from "../../PartnerModal";
import ReaderFeedback from "../ReaderFeedback";

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
  params: Promise<{ locale?: string }>;
}

export default function Article4FtStartPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale === 'ko' ? 'ko' : 'en';
  const isKo = locale === "ko";

  const [sec1Ref, sec1Visible] = useIntersectionReveal();
  const [sec2Ref, sec2Visible] = useIntersectionReveal();
  const [sec3Ref, sec3Visible] = useIntersectionReveal();
  const [sec4Ref, sec4Visible] = useIntersectionReveal();
  const [sec5Ref, sec5Visible] = useIntersectionReveal();
  const [takeawayRef, takeawayVisible] = useIntersectionReveal();

  const pricingTiers = [
    {
      label: "ENTRY",
      descKo: "처음 구매하기 쉬운 가격대 ($10 - $18)",
      descEn: "Easy entry price point for first-time buyers ($10 - $18)",
      roleKo: "고객 방문 유도 및 체험 유인",
      roleEn: "Drives traffic & lowers trial barrier"
    },
    {
      label: "CORE",
      descKo: "매출의 중심이 되는 주력 가격대 ($18 - $32)",
      descEn: "Core price tier contributing to main sales ($18 - $32)",
      roleKo: "매장 내 가장 두터운 매출 기여",
      roleEn: "Contributes the largest sales volume"
    },
    {
      label: "PREMIUM",
      descKo: "기능성과 객단가를 만드는 가격대 ($32 - $50+)",
      descEn: "High performance tier driving high ticket size ($32 - $50+)",
      roleKo: "객단가 상승 및 차별화 마진 창출",
      roleEn: "Increases average transaction value & margins"
    }
  ];

  const apTypes = [
    { name: "BALANCE", descKo: "균형형 - 주요 제품군의 조화로운 조합", descEn: "Balanced - A proportional mix of top-performing SKUs" },
    { name: "SKIN", descKo: "스킨케어 강화형 - 고마진 스킨 루틴 위주", descEn: "Skincare Focused - High-margin active skincare routines" },
    { name: "HAIR", descKo: "헤어/두피 강화형 - 두피 진정 및 트리트먼트 케어", descEn: "Hair/Scalp Focused - Target scalp soothing & treatment products" },
    { name: "ESSENTIAL", descKo: "필수·회전 중심형 - 입문용 시트 마스크 및 클렌징", descEn: "Essential - Fast-rotating sheet masks and basic cleansing" },
    { name: "TREND", descKo: "트렌드 중심형 - SNS 및 인플루언서 인기 품목", descEn: "Trend Focused - Social media viral & influencer favorites" },
    { name: "PREMIUM", descKo: "프리미엄 중심형 - 고기능성 안티에이징 라인", descEn: "Premium - High-end, functional anti-aging formulas" }
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
                ? "Beauty Supply Store에서 K-Beauty 4FT를 어떻게 시작할까?" 
                : "How to Launch a 4FT K-Beauty Section in a Beauty Supply Store"
              }
            </h1>
            <p className="text-[14px] sm:text-[16px] text-[#9ca3af] leading-relaxed font-semibold m-0 mt-2 keep-all">
              {isKo
                ? "처음부터 많은 제품을 넣는 것이 정답은 아닙니다. 중요한 것은 매장에 맞는 카테고리, 가격대, SKU와 재고를 설계하는 것입니다."
                : "Start smart, not oversized. Design the target categories, pricing tiers, SKUs, and inventory flows matched to your store's demographics."
              }
            </p>
            <div className="flex items-center gap-4 text-[10.5px] text-[#7A7A7A] font-black uppercase tracking-wider font-display mt-4 border-b border-white/10 pb-6 select-none">
              <span>5 MIN READ</span>
              <span>•</span>
              <span>{isKo ? "소매 매뉴얼" : "RETAIL MANUAL"}</span>
              <span>•</span>
              <span>BY K SELECT INSIGHTS</span>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden border border-white/10 shadow-2xl group mb-16">
            <Image
              src="/images/insights/kbeauty_4ft_start.jpg"
              alt="U.S. Beauty Supply Store inside K-Beauty 4FT display fixture"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/40 via-transparent to-transparent pointer-events-none" />
          </div>

        </section>

        {/* ================= MAIN ARTICLE BODY (Editorial Readability Column) ================= */}
        <section className="max-w-[700px] mx-auto px-6 sm:px-12 text-left text-[14.5px] sm:text-[15px] text-white/80 leading-relaxed font-normal pb-24">
          
          {/* INTRO */}
          <div className="flex flex-col gap-5 mb-12 text-white/90">
            <p className="m-0 keep-all text-[15.5px] sm:text-[17px] leading-relaxed font-medium">
              {isKo
                ? "K-Beauty 시장이 급격하게 확장되었다고 해서, 모든 소매 매장이 대규모 재고나 무분별한 벌크 상품을 채우며 동일하게 시작할 필요는 없습니다."
                : "Just because the K-Beauty category is growing rapidly doesn't mean every store needs to rush into large-scale inventory buys or flood their counter space."
              }
            </p>
            <p className="m-0 keep-all">
              {isKo
                ? "2025년 한국 화장품 수출액은 사상 최고치를 달성했으며, 미국 시장은 그 성장의 핵심 축으로 자리잡았습니다.<sup>[1]</sup> 하지만 뷰티 서플라이 오너가 마주한 실제 질문은 훨씬 구체적이어야 합니다. “그래서 우리 매장의 4피트 선반에 어떤 제품을 얼마나 진열해야 실질 매출로 연결될까?”라는 물음입니다."
                : "Although U.S. consumer demand for K-Beauty is reaching record highs, local retailers need to address a specific query: How do I allocate my 4-foot of shelf space to maximize sales velocity?"
              }
            </p>
            {/* Highlighted Slogan Box */}
            <div className="bg-[#ff2b75]/5 border-l-2 border-[#ff2b75] p-5.5 rounded-r-[12px] my-4 select-none">
              <span className="block text-[11px] font-black text-[#ff2b75] tracking-widest uppercase font-display mb-1.5">CORE PRINCIPLE</span>
              <p className="m-0 text-[14px] text-white font-black leading-normal keep-all">
                {isKo
                  ? "처음 K-Beauty 전용 구획을 신설할 때 핵심은 전시 면적의 크기가 아니라, 매대 면적당 회전율을 보장할 수 있는 구성입니다."
                  : "When setting up your initial K-Beauty section, the goal is not to maximize SKU counts, but to assure high space efficiency."
                }
              </p>
            </div>
          </div>

          {/* SECTION 01 */}
          <div ref={sec1Ref} className={`mb-12 transition-all duration-700 transform ${sec1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              01. 먼저 진열 공간을 정하고, 그 다음 상품을 설계하세요.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "새로운 카테고리를 매장에 배치할 때 보통 들여오고 싶은 제품 브랜드나 인기 상품 목록부터 작성하기 쉽습니다. 그러나 소매 면적이 제한적인 매장에서는 다음과 같이 공간 중심의 의사결정 단계를 거쳐 계획을 좁혀나가는 것이 효과적입니다."
                : "When introducing a new product line, it's tempting to draft a list of desired items first. However, for brick-and-mortar stores with fixed square footage, the reverse flow is far more effective:"
              }
            </p>
            
            {/* 3-Step Flow Diagram */}
            <div className="bg-[#121214] border border-white/5 rounded-[16px] p-5 my-6 flex flex-col sm:flex-row items-center justify-between gap-4 select-none text-xs font-black text-white/90">
              {["SPACE (공간 확정)", "CATEGORY (비율 분할)", "PRICE (가격 구조)", "SKU & INVENTORY"].map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="bg-[#0c0c0c] border border-white/10 rounded-[8px] px-4 py-2.5 w-full sm:w-auto text-center hover:border-[#ff2b75]/35 transition-colors">
                    {step}
                  </div>
                  {idx < 3 && (
                    <span className="text-[#ff2b75] transform rotate-90 sm:rotate-0 font-extrabold text-sm">➔</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "예를 들어 4피트(4FT)라는 물리적 매대 구획을 미리 고정해 두면, 진열할 세부 카테고리 구성 비율, 한 선반에 올라갈 단품 수량(SKU), 시선을 이끌어 낼 주력 주연 상품(Hero SKU), 그리고 초도 재고 예산과 정기 리오더 주기(Reorder)를 과학적으로 수치화하여 관리할 수 있게 됩니다."
                : "By locking down a 4FT physical footprint first, you instantly establish your category ratios, target item counts per shelf, hero placements, and replenishment cycles."
              }
            </p>
          </div>

          {/* SECTION 02 */}
          <div ref={sec2Ref} className={`mb-12 transition-all duration-700 transform ${sec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              02. 4FT 매대 안에 모든 카테고리를 다 담으려고 하지 마세요.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "기초 화장품부터 색조 메이크업, 두피 케어, 마스크팩, 헤어 에센스까지 K-Beauty 제품군은 무수히 다양합니다. 하지만 4FT의 제한적인 선반에 모든 라인을 조금씩 조각내어 나열하면, 매장을 방문한 고객에게 명확한 진열 컨셉(Shopping Story)을 전달할 수 없으며 오히려 전문성이 떨어져 보입니다."
                : "Skincare, cosmetics, scalp care, and sheet masks represent diverse paths. Trying to fit tiny portions of every category on a single 4FT shelf only creates clutter, confusing shoppers."
              }
            </p>

            {/* Key Takeaway Box */}
            <div className="bg-[#121214] border border-white/10 rounded-[20px] p-6 my-6 flex flex-col gap-4">
              <h4 className="text-[13.5px] font-black text-white/95 m-0 flex items-center gap-2 select-none">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                {isKo ? "매장 상권 맞춤형 큐레이션 가이드" : "Target Store Profiling"}
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 text-[12.5px] font-medium">
                <div className="bg-[#0c0c0c] border border-white/5 p-4 rounded-[12px]">
                  <span className="block text-[#ff2b75] font-black mb-1.5">Hair 제품 구매가 활발한 매장</span>
                  <p className="m-0 text-[#9ca3af] leading-relaxed">두피 에센스 및 세럼류(HAIR & SCALP CARE) + 보습 마스크팩 믹스</p>
                </div>
                <div className="bg-[#0c0c0c] border border-white/5 p-4 rounded-[12px]">
                  <span className="block text-[#00f0ff] font-black mb-1.5">스킨케어 수요가 강한 매장</span>
                  <p className="m-0 text-[#9ca3af] leading-relaxed">클렌저 ➔ 앰플/세럼 ➔ 보습제 ➔ 시트 팩으로 이어지는 Routine 중심 진열</p>
                </div>
              </div>
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "수십 개의 제품을 단순 병렬식으로 채우는 것보다 확실한 케어 가치를 제안하는 소수의 핵심 제품군을 묶어 제안할 때, 소비자의 첫 구매 허들이 낮아집니다."
                : "Concentrating on a targeted selection that solves a specific customer concern builds trust and drives conversion."
              }
            </p>
          </div>

          {/* SECTION 03 */}
          <div ref={sec3Ref} className={`mb-12 transition-all duration-700 transform ${sec3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              03. 가격대도 하나의 카테고리처럼 체계적으로 배분해야 합니다.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "제품 가격의 포트폴리오를 설계하는 것도 매우 중요합니다. 너무 저렴한 제품(Value)만 놓거나 지나치게 비싼 고가 브랜드(Premium)만 배치하는 것은 구매 효율을 저해합니다. 매대를 만났을 때 심리적 안정감을 얻고 자연스럽게 구매로 연결될 수 있는 3단계 가격 배치가 필수적입니다."
                : "Pricing is also a key layout factor. Aligning your products into Entry, Core, and Premium categories provides consumers with a clear value ladder:"
              }
            </p>

            {/* 3-Step Pricing Table/Cards */}
            <div className="grid sm:grid-cols-3 gap-4 my-6 select-none font-medium">
              {pricingTiers.map((tier, idx) => (
                <div key={idx} className="bg-[#121214] border border-white/5 hover:border-[#ff2b75]/25 p-5 rounded-[16px] flex flex-col justify-between gap-4 transition-all">
                  <div>
                    <span className="text-[9px] font-black text-[#ff2b75] tracking-widest font-display block mb-1">TIER 0{idx+1}</span>
                    <h4 className="text-[15px] font-black text-white m-0 mb-2">{tier.label}</h4>
                    <p className="text-[12px] text-[#9ca3af] leading-relaxed font-semibold m-0">{isKo ? tier.descKo : tier.descEn}</p>
                  </div>
                  <span className="text-[10px] text-[#ff2b75]/95 font-bold border border-[#ff2b75]/20 bg-[#ff2b75]/5 px-2 py-0.5 rounded-[4px] self-start">
                    {isKo ? tier.roleKo : tier.roleEn}
                  </span>
                </div>
              ))}
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "이를 통해 K-Beauty를 처음 시험 구매하는 입문 고객을 확보(Entry)하는 동시에, 주력 매출 규모를 확보하고(Core), 기능성 고단가 단위를 유도하여(Premium) 객단가 상승을 꾀할 수 있습니다."
                : "This pricing mix ensures you capture new shoppers with low-risk entry items while scaling ticket size via high-margin core formulas."
              }
            </p>
          </div>

          {/* Pull Quote */}
          <div className="border-l-4 border-[#ff2b75] pl-6 my-10 select-none">
            <p className="text-[15.5px] sm:text-[17px] font-black text-white italic leading-relaxed m-0 keep-all">
              {isKo
                ? "“도매 납품 거래에서 핵심은 단순히 공급 단가를 깎는 흥정이 아닙니다. 그 제품이 매대 면적당 얼마의 속도로 회전하여 순현금을 창출해 주는지가 소매의 본질입니다.”"
                : "“The key to retail inventory is not negotiating a slightly cheaper cost, but ensuring that capital moves off shelves at maximum speed.”"
              }
            </p>
          </div>

          {/* SECTION 04 */}
          <div ref={sec4Ref} className={`mb-12 transition-all duration-700 transform ${sec4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              04. 첫 주문(Initial Order)보다 중요한 것은 첫 재주문(Reorder)입니다.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "많은 유통 벤더들이 매장 입점과 첫 공급 물량에만 집중합니다. 그러나 리테일러 입장에서 중요한 핵심은 '첫 리오더(Reorder)가 얼마나 신속하고 순조롭게 발생하느냐'입니다. 매대 구축 이후 첫 90일 동안 다음의 판매 데이터를 주기적으로 추적하여 공급망을 진단해야 합니다.<sup>[2]</sup>"
                : "Initial buys mean nothing without replenishment. True retail success is marked by when the first reorder takes place. Owners must track inventory flows across a structured timeline:"
              }
            </p>

            {/* Inventory Timeline Widget */}
            <div className="bg-[#121214] border border-white/5 rounded-[20px] p-6 my-6 select-none flex flex-col gap-5 text-left text-xs font-black">
              {[
                { title: "DAY 30 - Early Signal", descKo: "초기 30일 간의 완판 속도를 통한 고객 반응 조기 경보 파악", descEn: "First-month sell-through check & early customer response data" },
                { title: "DAY 60 - Reorder Behavior", descKo: "60일 시점의 잔존 수량 분석으로 실질 보충(리오더) 발주 시기 확정", descEn: "Trigger reorders on fast-rotating SKUs to avoid stock-outs" },
                { title: "DAY 90 - Optimize & Swap", descKo: "90일 시점에 도달한 부진 재고의 90-Day Exchange Credit 발동 여부 검토", descEn: "Exchange slow items for proven SKUs via 90-Day Exchange Credit" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4.5 items-start">
                  <span className="text-[#00f0ff] font-display text-[13.5px] leading-none pt-0.5">{item.title}</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-[13px] font-bold">{isKo ? item.descKo : item.descEn}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "30일 내에 초기 데이터 반응을 식별하고, 60일이 경과하는 시점에 주력 SKU의 공백을 막는 보충 발주를 연동하며, 90일 단계에서 판매율(Sell-through)이 기준선(50% 미만) 이하인 품목을 타 인기 품목으로 교환하여 재고가 묶이는 리스크를 선제 제어해야 합니다."
                : "By mapping metrics across 30, 60, and 90 days, you mitigate risk and keep the store's cash flow moving smoothly."
              }
            </p>
          </div>

          {/* SECTION 05 */}
          <div ref={sec5Ref} className={`mb-12 transition-all duration-700 transform ${sec5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              05. 모든 매장에 동일한 4FT 매대 구성이 들어가서는 안 됩니다.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "매장 주변 상권과 방문 고객 유형에 따라 선반 구성(Assortment)은 완전히 다르게 설계되어야 합니다. K SELECT HUB는 각 매장의 정밀 분석 결과와 성장 시뮬레이터를 기반으로 고유한 큐레이션 유형인 어소트먼트 프로필(AP)을 정의합니다."
                : "Demographics determine shelf layout. K SELECT HUB uses a proprietary Assortment Profile (AP) system to guide shelf configuration:"
              }
            </p>

            {/* AP Grid Items */}
            <div className="grid sm:grid-cols-2 gap-3 my-6 select-none text-left font-bold">
              {apTypes.map((ap, idx) => (
                <div key={idx} className="bg-[#121214] border border-white/5 p-4 rounded-[12px] flex items-center gap-4">
                  <span className="text-[10px] text-[#ff2b75] font-black tracking-widest font-display bg-[#ff2b75]/5 border border-[#ff2b75]/20 px-2 py-0.5 rounded-[4px]">
                    {ap.name}
                  </span>
                  <span className="text-[12.5px] text-[#9ca3af] leading-none">
                    {isKo ? ap.descKo : ap.descEn}
                  </span>
                </div>
              ))}
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "어소트먼트 프로필(AP)은 단순한 분류 명칭이 아닙니다. '우리 매장에는 어떤 K-Beauty 구성 방향과 진열 방식이 매출을 극대화하는가?'에 답하는 현장의 기준입니다. 매장 환경에 맞는 올바른 큐레이션 비율이 적용될 때, 4FT 공간의 성과가 배가됩니다."
                : "These profiles are actionable store templates designed to align shelf layouts directly with local shopping behavior."
              }
            </p>
          </div>

          {/* RETAILER TAKEAWAY CHECKLIST */}
          <div 
            ref={takeawayRef}
            className={`border border-[#ff2b75]/25 bg-[#121214] rounded-[24px] p-7.5 sm:p-9.5 my-12 transition-all duration-700 transform ${
              takeawayVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
            }`}
          >
            <span className="text-[10px] text-[#ff2b75] font-black tracking-[0.2em] uppercase font-display block mb-2 select-none">
              RETAILER CHECKLIST
            </span>
            <h3 className="text-[17.5px] sm:text-[20px] font-black text-white m-0 mb-6 keep-all">
              {isKo ? "처음 K-Beauty를 시작한다면 이 다섯 가지부터 확인하세요." : "Five questions before you launch K-Beauty:"}
            </h3>
            
            <div className="flex flex-col gap-4 text-[13.5px] text-white/90">
              {[
                isKo ? "01 사용할 수 있는 가용 매대 공간은 확실히 확보되어 있는가?" : "01 Is the target shelf space cleared and dedicated?",
                isKo ? "02 우리 매장 방문 고객들이 주로 선호하는 기초 화장품 니즈는 무엇인가?" : "02 What is the primary skincare concern of your active shoppers?",
                isKo ? "03 고객들이 지갑을 열기 쉬운 초기 진입 가격대는 어떠한가?" : "03 What is the local price barrier for trial cosmetics?",
                isKo ? "04 정밀 관리가 가능한 적절한 SKU 한계선을 넘기지는 않았는가?" : "04 Is the product assortment count easy for staff to manage?",
                isKo ? "05 90일 내에 안전하게 리오더 데이터 순환이 일어날 프로세스가 준비되었는가?" : "05 Is there a structured reorder tracking process in place?"
              ].map((check, idx) => (
                <div key={idx} className="flex gap-3.5 items-start">
                  <div className="w-5 h-5 rounded-[4px] border border-[#ff2b75]/35 bg-[#ff2b75]/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-[#ff2b75]">✓</div>
                  <span className="font-semibold leading-relaxed">{check}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 mt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-display font-black text-xs sm:text-sm text-[#ff2b75] uppercase tracking-wider select-none">
                Not Every Store Needs the Same 4FT.
              </span>
              <Link
                href={`/${locale}/simulator`}
                className="h-12 px-4 sm:px-6 w-full sm:w-auto rounded-[8px] bg-[#ff2b75] hover:bg-[#e01a5e] text-white font-black text-[11px] sm:text-[12.5px] tracking-wide inline-flex items-center justify-center transition-all duration-200 shrink-0 whitespace-nowrap"
              >
                {isKo ? "내 매장 시뮬레이션 시작하기 →" : "Start Store Simulator →"}
              </Link>
            </div>
          </div>

          {/* Reader Feedback UI */}
          <ReaderFeedback articleId="k-beauty-4ft-start" locale={locale} channel="HUB" />

          {/* Previous / Next Insight Navigation */}
          <div className="grid sm:grid-cols-2 gap-6 my-12 border-t border-white/10 pt-12 select-none">
            <Link 
              href={`/${locale}/insights/k-beauty-2026-signals`}
              className="group bg-[#121214] border border-white/5 hover:border-[#ff2b75]/35 p-6 rounded-[20px] flex flex-col items-start text-left transition-all duration-300"
            >
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-2 flex items-center gap-1 transition-transform group-hover:-translate-x-1">
                ← PREVIOUS INSIGHT
              </span>
              <span className="text-[#7A7A7A] text-[9.5px] font-black tracking-widest uppercase font-display block mb-1">
                BEAUTY MARKET
              </span>
              <span className="text-white group-hover:text-[#ff2b75] font-display text-[15px] font-black leading-snug transition-colors keep-all">
                {isKo ? "K-Beauty 2026: 지금 봐야 할 3가지 신호, 따라가지 않아도 될 3가지 유행" : "K-Beauty 2026: 3 Signals to Track, 3 Trends to Ignore"}
              </span>
            </Link>
            <Link 
              href={`/${locale}/insights/scalp-care-bridge`}
              className="group bg-[#121214] border border-white/5 hover:border-[#ff2b75]/35 p-6 rounded-[20px] flex flex-col items-end text-right transition-all duration-300"
            >
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-2 flex items-center gap-1 transition-transform group-hover:translate-x-1">
                NEXT INSIGHT →
              </span>
              <span className="text-[#7A7A7A] text-[9.5px] font-black tracking-widest uppercase font-display block mb-1">
                PRODUCT & CATEGORY
              </span>
              <span className="text-white group-hover:text-[#ff2b75] font-display text-[15px] font-black leading-snug transition-colors keep-all">
                {isKo ? "Scalp Care: Hair 고객을 K-Beauty 고객으로 연결할 수 있을까?" : "Scalp Care: Can We Bridge Hair Customers to K-Beauty Customers?"}
              </span>
            </Link>
          </div>

          {/* Desktop Sticky Navigation */}
          <div className="hidden lg:flex fixed bottom-8 right-8 z-40 bg-[#121214]/90 backdrop-blur border border-white/10 rounded-full px-5 py-3 items-center gap-4.5 shadow-2xl text-[11px] font-black tracking-widest font-display text-white select-none">
            <Link 
              href={`/${locale}/insights/k-beauty-2026-signals`} 
              className="text-white/60 hover:text-[#ff2b75] transition-colors"
              title={isKo ? "K-Beauty 2026" : "K-Beauty 2026"}
            >
              ← PREV
            </Link>
            <span className="text-white/30">|</span>
            <span className="text-[#00f0ff]">04 / 06</span>
            <span className="text-white/30">|</span>
            <Link 
              href={`/${locale}/insights/scalp-care-bridge`} 
              className="text-white/60 hover:text-[#ff2b75] transition-colors"
              title={isKo ? "Scalp Care Bridge" : "Scalp Care Bridge"}
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
                  <span className="text-white/90 font-bold block">대한민국 식품의약품안전처 (MFDS)</span>
                  <span className="text-[#7A7A7A] block mt-0.5">2024-2025년 한국 화장품 수출액 통계 분석 및 국가별 무역 자료</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">02</span>
                <div>
                  <span className="text-white/90 font-bold block">Retail Management Association</span>
                  <span className="text-[#7A7A7A] block mt-0.5">미국 화장품·소매점 카테고리 운영 및 평균 재고 회전(Inventory Turn) 벤치마크 지표 리포트 (2024)</span>
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
