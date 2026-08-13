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

export default function Article4FtStartPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
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
        <section className="max-w-[760px] mx-auto px-6 sm:px-12 text-left text-[14.5px] sm:text-[15.5px] text-[#d1d5db] leading-relaxed font-medium pb-24">
          
          {/* INTRO */}
          <div className="flex flex-col gap-5 mb-14 text-white font-semibold">
            <p className="m-0 keep-all text-[16px] sm:text-[17.5px] leading-relaxed">
              {isKo
                ? "K-Beauty 시장이 커졌다고 해서, 모든 매장이 대규모 자본이나 과도한 벌크 상품을 채우며 동일한 방식으로 시작할 필요는 없습니다."
                : "Just because the K-Beauty category is growing rapidly doesn't mean every store needs to rush into large-scale inventory buys or flood their counter space."
              }
            </p>
            <p className="m-0 keep-all">
              {isKo
                ? "2025년 한국 화장품 수출은 사상 최고치에 도달했으며, 미국은 그 핵심 성장 동력입니다. 하지만 오프라인 매장 오너가 내려야 할 결정은 더 정밀해야 합니다. “그래서 우리 매장의 4피트 선반에 무엇을 얼마나 넣어야 매출로 이어질까?”라는 질문입니다."
                : "Although U.S. consumer demand for K-Beauty is reaching record highs, local retailers need to address a specific query: How do I allocate my 4-foot of shelf space to maximize sales velocity?"
              }
            </p>
            {/* Highlighted Slogan Box */}
            <div className="bg-[#ff2b75]/5 border-l-2 border-[#ff2b75] p-5.5 rounded-r-[12px] my-4 select-none">
              <span className="block text-[11px] font-black text-[#ff2b75] tracking-widest uppercase font-display mb-1.5">CORE PRINCIPLE</span>
              <p className="m-0 text-[14px] text-white font-black leading-normal keep-all">
                {isKo
                  ? "처음 K-Beauty Section을 만들 때 중요한 것은 크게 시작하는 것이 아니라, 매대 효율을 보장하도록 제대로 시작하는 것입니다."
                  : "When setting up your initial K-Beauty section, the goal is not to maximize SKU counts, but to assure high space efficiency."
                }
              </p>
            </div>
          </div>

          {/* SECTION 01 */}
          <div ref={sec1Ref} className={`mb-14 transition-all duration-700 transform ${sec1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[20px] sm:text-[23px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              01. 먼저 공간을 정하고, 그 다음 상품을 정하세요.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "새로운 카테고리를 개설할 때 보통 취급하고 싶은 상품 목록(SKU)부터 나열하곤 합니다. 하지만 소매 공간이 한정된 오프라인 스토어에서는 다음의 순서로 의사결정을 설계하는 것이 훨씬 입체적입니다."
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
                ? "예를 들어 4피트(4FT)라는 물리적 구획을 선결정하면 매장에 진열할 카테고리 구성 비율, 한 선반에 드러날 단품(SKU) 수량, 매대의 시인성을 이끌어 낼 핵심 주력 상품(Hero SKU), 그리고 보충 공급 주기와 초도 재고 예산이 과학적으로 수치화됩니다."
                : "By locking down a 4FT physical footprint first, you instantly establish your category ratios, target item counts per shelf, hero placements, and replenishment cycles."
              }
            </p>
          </div>

          {/* SECTION 02 */}
          <div ref={sec2Ref} className={`mb-14 transition-all duration-700 transform ${sec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[20px] sm:text-[23px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              02. 4FT 안에 모든 K-Beauty를 다 넣을 수는 없습니다.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "스킨케어, 메이크업, 헤어/두피 케어, 마스크팩, 뷰티 소품까지 K-Beauty 브랜드와 성분은 무수합니다. 하지만 4FT의 제한적인 선반 공간에 모든 유형을 조각내어 진열하면, 고객에게 매력적인 '진열 연출(Shopping Story)'을 전달할 수 없고 전문성이 결여되어 보입니다."
                : "Skincare, cosmetics, scalp care, and sheet masks represent diverse paths. Trying to fit tiny portions of every category on a single 4FT shelf only creates clutter, confusing shoppers."
              }
            </p>

            {/* Key Takeaway Box */}
            <div className="bg-[#121214] border border-white/10 rounded-[20px] p-6 my-6 flex flex-col gap-4">
              <h4 className="text-[14.5px] font-black text-white m-0 flex items-center gap-2 select-none">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                {isKo ? "매장 상권 맞춤형 큐레이션 가이드" : "Target Store Profiling"}
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 text-[13px]">
                <div className="bg-[#0c0c0c] border border-white/5 p-4 rounded-[12px]">
                  <span className="block text-[#ff2b75] font-black mb-1">Hair 고객 중심 매장</span>
                  <p className="m-0 text-[#9ca3af] leading-relaxed font-semibold">헤어/두피 케어 세럼·토닉 + 트렌디 시트 마스크 및 기초 진정 라인 믹스</p>
                </div>
                <div className="bg-[#0c0c0c] border border-white/5 p-4 rounded-[12px]">
                  <span className="block text-[#00f0ff] font-black mb-1">기초 스킨케어 수요 매장</span>
                  <p className="m-0 text-[#9ca3af] leading-relaxed font-semibold">클렌저 ➔ 앰플/세럼 ➔ 보습제 ➔ 시트 팩으로 이어지는 스킨케어 루틴 위주 진열</p>
                </div>
              </div>
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "많은 SKU를 병렬식으로 세워 두는 것보다 확실한 판매 가치를 주는 소수의 핵심 라인을 묶어 제안할 때, 매장을 방문한 소비자의 지갑이 열립니다."
                : "Concentrating on a targeted selection that solves a specific customer concern builds trust and drives conversion."
              }
            </p>
          </div>

          {/* SECTION 03 */}
          <div ref={sec3Ref} className={`mb-14 transition-all duration-700 transform ${sec3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[20px] sm:text-[23px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              03. 가격대도 하나의 카테고리처럼 설계해야 합니다.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "진열할 가격 범위를 설계하는 것 역시 중요합니다. 저가 제품(Value)이나 고가 제품(Premium) 하나만 고집하는 매장은 구매 저항을 부릅니다. 소비자가 매대를 만났을 때 심리적 안정을 느끼고 단계적으로 장바구니에 담을 수 있는 3단계 가격 구조가 배치되어야 합니다."
                : "Pricing is also a key layout factor. Aligning your products into Entry, Core, and Premium categories provides consumers with a clear value ladder:"
              }
            </p>

            {/* 3-Step Pricing Table/Cards */}
            <div className="grid sm:grid-cols-3 gap-4 my-6 select-none">
              {pricingTiers.map((tier, idx) => (
                <div key={idx} className="bg-[#121214] border border-white/5 hover:border-[#ff2b75]/25 p-5 rounded-[16px] flex flex-col justify-between gap-4 transition-all">
                  <div>
                    <span className="text-[9.5px] font-black text-[#ff2b75] tracking-widest font-display block mb-1">TIER 0{idx+1}</span>
                    <h4 className="text-[16px] font-black text-white m-0 mb-2">{tier.label}</h4>
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
                ? "이를 통해 신규 K-Beauty 유입 고객의 첫 트라이를 확보(Entry)하면서도, 단골 고객층의 재구매 매출 볼륨을 견인(Core)하고 고마진의 고단가 단위를 확보(Premium)할 수 있습니다."
                : "This pricing mix ensures you capture new shoppers with low-risk entry items while scaling ticket size via high-margin core formulas."
              }
            </p>
          </div>

          {/* Pull Quote */}
          <div className="border-l-4 border-[#ff2b75] pl-6 my-10 select-none">
            <p className="text-[16px] sm:text-[18px] font-black text-white italic leading-relaxed m-0 keep-all">
              {isKo
                ? "“도매(Wholesale) 거래에서 중요한 것은 단가 흥정이 아닙니다. 그 제품이 매대 면적당 얼마의 속도로 회전하여 순현금을 창출해 주는지가 본질입니다.”"
                : "“The key to retail inventory is not negotiating a slightly cheaper cost, but ensuring that capital moves off shelves at maximum speed.”"
              }
            </p>
          </div>

          {/* SECTION 04 */}
          <div ref={sec4Ref} className={`mb-14 transition-all duration-700 transform ${sec4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[20px] sm:text-[23px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              04. 첫 주문보다 중요한 것은 첫 재주문입니다.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "많은 유통업체들이 첫 납품 계약에만 집중하지만, 리테일러 입장에서 중요한 것은 '첫 리오더(Reorder)가 언제 일어나는가'입니다. 초기 4FT 런칭 이후 첫 90일 동안 다음의 재고 흐름을 주기적으로 진단해야 합니다."
                : "Initial buys mean nothing without replenishment. True retail success is marked by when the first reorder takes place. Owners must track inventory flows across a structured timeline:"
              }
            </p>

            {/* Inventory Timeline Widget */}
            <div className="bg-[#121214] border border-white/5 rounded-[20px] p-6 my-6 select-none flex flex-col gap-5 text-left text-xs font-black">
              {[
                { title: "DAY 30", descKo: "초기 판매 성과(Early Sell-Through) 식별 및 매장 고객 반응 확인", descEn: "First-month sell-through check & early customer response data" },
                { title: "DAY 60", descKo: "주요 인기 상품의 품절 방지를 위한 리오더(Reorder) 추천 실행", descEn: "Trigger reorders on fast-rotating SKUs to avoid stock-outs" },
                { title: "DAY 90", descKo: "부진 상품의 Exchange Credit 신청 및 매장 Assortment 정밀 최적화", descEn: "Exchange slow items for proven SKUs via 90-Day Exchange Credit" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4.5 items-start">
                  <span className="text-[#00f0ff] font-display text-[14px] leading-none pt-0.5">{item.title}</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-[13px]">{isKo ? item.descKo : item.descEn}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "30일 내에 초기 데이터 반응을 확보하고, 60일 경과 시점에 주력 SKU의 공백을 막는 리오더를 배치하며, 90일 단계에서 판매율이 기준선(50%) 이하인 품목을 타 상품으로 교환하여 재고가 묶이는 리스크를 선제 통제해야 합니다."
                : "By mapping metrics across 30, 60, and 90 days, you mitigate risk and keep the store's cash flow moving smoothly."
              }
            </p>
          </div>

          {/* SECTION 05 */}
          <div ref={sec5Ref} className={`mb-14 transition-all duration-700 transform ${sec5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[20px] sm:text-[23px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              05. 모든 매장에 같은 4FT가 들어가서는 안 됩니다.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "상권과 방문 고객 유형에 따라 선반 구성은 완전히 달라져야 합니다. K SELECT HUB는 각 매장의 정밀 분석 결과와 성장 시뮬레이터를 기반으로 고유한 큐레이션 유형인 Assortment Profile(AP)을 정의합니다."
                : "Demographics determine shelf layout. K SELECT HUB uses a proprietary Assortment Profile (AP) system to guide shelf configuration:"
              }
            </p>

            {/* AP Grid Items */}
            <div className="grid sm:grid-cols-2 gap-3 my-6 select-none text-left">
              {apTypes.map((ap, idx) => (
                <div key={idx} className="bg-[#121214] border border-white/5 p-4 rounded-[12px] flex items-center gap-4">
                  <span className="text-[10px] text-[#ff2b75] font-black tracking-widest font-display bg-[#ff2b75]/5 border border-[#ff2b75]/20 px-2 py-0.5 rounded-[4px]">
                    {ap.name}
                  </span>
                  <span className="text-[12.5px] text-[#9ca3af] font-semibold leading-none">
                    {isKo ? ap.descKo : ap.descEn}
                  </span>
                </div>
              ))}
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "AP는 단순한 분류 명칭이 아닙니다. '우리 매장에는 어떤 K-Beauty 배치와 브랜드 포지셔닝이 매출에 적합한가?'에 답하는 현장의 기준입니다. 매장 환경에 맞는 올바른 큐레이션 비율이 적용될 때, 4FT 공간의 성과가 극대화됩니다."
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
            <h3 className="text-[18px] sm:text-[21px] font-black text-white m-0 mb-6 keep-all">
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
              <span className="font-display font-black text-sm text-[#ff2b75] uppercase tracking-wider select-none">
                Not Every Store Needs the Same 4FT.
              </span>
              <Link
                href={`/${locale}/simulator`}
                className="h-12 px-6 rounded-[8px] bg-[#ff2b75] hover:bg-[#e01a5e] text-white font-black text-[12.5px] tracking-wide inline-flex items-center justify-center transition-all duration-200"
              >
                {isKo ? "내 매장 시뮬레이션 시작하기 →" : "Start Store Simulator →"}
              </Link>
            </div>
          </div>

          {/* SOURCES SECTION */}
          <div className="border-t border-white/10 pt-8 mt-16 text-[11px] text-[#7A7A7A] font-bold select-none">
            <span className="block text-white/50 tracking-wider uppercase font-display mb-2">SOURCES & REFERENCES</span>
            <ul className="list-disc pl-4 space-y-1.5 leading-normal">
              <li>Korea Ministry of Food and Drug Safety (MFDS) Export Statistics 2024-2025</li>
              <li>Circana Beauty Industry Market Research & Consumer Trends Report</li>
              <li>U.S. Food and Drug Administration (FDA) MoCRA Compliance Guideline</li>
              <li>Retail Management Association Inventory Turn Benchmarks</li>
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
