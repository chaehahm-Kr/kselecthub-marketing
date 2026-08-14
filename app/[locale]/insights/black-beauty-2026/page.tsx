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

export default function ArticleBlackBeauty2026Page({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isKo = locale === "ko";

  const [introRef, introVisible] = useIntersectionReveal();
  const [sec1Ref, sec1Visible] = useIntersectionReveal();
  const [sec2Ref, sec2Visible] = useIntersectionReveal();
  const [sec3Ref, sec3Visible] = useIntersectionReveal();
  const [sec4Ref, sec4Visible] = useIntersectionReveal();
  const [checklistRef, checklistVisible] = useIntersectionReveal();

  // Subtle count-up values
  const [spentGrow, setSpentGrow] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  const [customizationRate, setCustomizationRate] = useState(0);

  useEffect(() => {
    if (introVisible) {
      // +9%
      let startGrow = 0;
      const growTimer = setInterval(() => {
        startGrow += 1;
        if (startGrow >= 9) {
          setSpentGrow(9);
          clearInterval(growTimer);
        } else {
          setSpentGrow(startGrow);
        }
      }, 80);

      // $16.2B (multiplied by 10 internally for decimal point rendering)
      let startSpend = 0;
      const spendTimer = setInterval(() => {
        startSpend += 8;
        if (startSpend >= 162) {
          setTotalSpending(162);
          clearInterval(spendTimer);
        } else {
          setTotalSpending(startSpend);
        }
      }, 40);
    }
  }, [introVisible]);

  useEffect(() => {
    if (sec3Visible) {
      // 60%
      let startCustom = 0;
      const customTimer = setInterval(() => {
        startCustom += 3;
        if (startCustom >= 60) {
          setCustomizationRate(60);
          clearInterval(customTimer);
        } else {
          setCustomizationRate(startCustom);
        }
      }, 40);
    }
  }, [sec3Visible]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0c] text-white font-sans overflow-x-hidden selection:bg-[#ff2b75] selection:text-white">
      
      {/* Header Navigation */}
      <Header locale={locale} />

      <main className="flex-1">
        
        {/* ================= ARTICLE HEADER ================= */}
        <section className="max-w-[900px] mx-auto px-6 sm:px-12 pt-16 sm:pt-24 text-left">
          
          <div className="flex flex-col gap-4 mb-8 font-medium">
            <span className="text-[10px] sm:text-[11px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display select-none">
              BEAUTY MARKET
            </span>
            <h1 className="font-display text-[26px] sm:text-[38px] lg:text-[42px] font-black leading-tight text-white tracking-tight m-0 keep-all">
              {isKo 
                ? "Black Beauty 2026: 온라인이 커져도, 매장이 더 중요해지는 이유" 
                : "Black Beauty 2026: Why Stores Matter More as Online Grows"
              }
            </h1>
            <p className="text-[14px] sm:text-[16px] text-white/60 leading-relaxed m-0 mt-2 keep-all">
              {isKo
                ? "고객은 온라인에서 제품을 발견하지만, 모든 구매 결정이 온라인에서 끝나는 것은 아닙니다. Beauty Supply Store가 다시 생각해야 할 것은 ‘상품 수’보다 ‘매장의 역할’입니다."
                : "Shoppers discover products online, but they don't always finish decisions there. Retailers must rethink the role of the physical store rather than sheer SKU quantity."
              }
            </p>
            <div className="flex items-center gap-4 text-[10.5px] text-[#7A7A7A] font-black uppercase tracking-wider font-display mt-4 border-b border-white/10 pb-6 select-none">
              <span>5 MIN READ</span>
              <span>•</span>
              <span>{isKo ? "소비자 & 리테일 트렌드" : "CONSUMER & RETAIL"}</span>
              <span>•</span>
              <span>BY K SELECT INSIGHTS</span>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden border border-white/10 shadow-2xl group mb-16">
            <Image
              src="/images/insights/black_beauty_2026.jpg"
              alt="Black female customer looking at beauty products while checking product information on her smartphone inside a beauty supply store"
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
          <div ref={introRef} className="flex flex-col gap-5 mb-12 text-white/90">
            <p className="m-0 keep-all text-[15.5px] sm:text-[17px] leading-relaxed font-medium">
              {isKo
                ? "소비자들은 매장에 발을 들이기 훨씬 전부터 쇼핑을 시작합니다."
                : "Shoppers begin their retail journey long before they step foot inside a physical storefront."
              }
            </p>
            <p className="m-0 keep-all">
              {isKo
                ? "오늘날의 뷰티 소비자는 틱톡, 인스타그램, 유튜브 등의 소셜 플랫폼과 온라인 검색을 통해 새로운 제품을 발견하고, 실시간 리뷰와 성분 데이터를 분석한 후 오프라인 점포에 입장합니다. 모바일 화면에서 시작된 정보 탐색이 자연스럽게 매대로 이어지는 것입니다."
                : "Modern beauty shoppers discover new items via TikTok, Instagram, YouTube, and search engines, check reviews and formulations online, and then arrive at the store door with a clear intent."
              }
            </p>

            {/* Subtle Count-Up stats widgets */}
            <div className="grid grid-cols-2 gap-4 my-4 select-none">
              <div className="bg-[#121214] border border-white/5 p-5.5 rounded-[16px] text-left">
                <span className="block text-[10px] text-[#ff2b75] font-black tracking-widest font-display mb-1">YEARLY SPENDING INCREASE</span>
                <strong className="text-white text-[24px] sm:text-[30px] font-black leading-none font-display">
                  +{spentGrow}%
                </strong>
                <p className="m-0 mt-1 text-[11px] text-[#7A7A7A] leading-normal font-bold">Black Beauty 소비 지출 연간 상승폭<sup>[1]</sup></p>
              </div>
              <div className="bg-[#121214] border border-white/5 p-5.5 rounded-[16px] text-left">
                <span className="block text-[10px] text-[#00f0ff] font-black tracking-widest font-display mb-1">TOTAL MARKET SIZE</span>
                <strong className="text-white text-[24px] sm:text-[30px] font-black leading-none font-display">
                  ${(totalSpending / 10).toFixed(1)}B
                </strong>
                <p className="m-0 mt-1 text-[11px] text-[#7A7A7A] leading-normal font-bold">전체 U.S. Black Beauty 소비 규모<sup>[1]</sup></p>
              </div>
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "최신 소비자 데이터 분석에 따르면, 미국 내 Black beauty 소비 시장 규모는 연간 $162억 달러에 도달했습니다. 이 지출의 상당 부분이 온라인 전자상거래 채널에서 발생하고 있지만, 향(Fragrance), 제형(Texture), 사용 경험(Experience)이 중요한 품목군에서는 여전히 오프라인 매장이 소비 결정의 핵심 지점 역할을 수행합니다."
                : "Although nearly half of this beauty spending resides online, for sensory categories where fragrance, texture, and touch dictate compatibility, brick-and-mortar storefronts remain the primary validation point."
              }
            </p>
          </div>

          {/* SECTION 01 */}
          <div ref={sec1Ref} className={`mb-12 transition-all duration-700 transform ${sec1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              01. 모발(Hair)만 봐서는 고객의 뷰티 지출 전체가 보이지 않습니다.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "가발과 모발 관리 제품은 뷰티 서플라이 점포 매출의 중심이자 기둥입니다. 하지만 현대 소비자의 장바구니 지출은 바디 에센스, 향수, 고급 입욕제, 바디 클렌징 등 더 포괄적인 웰니스 라이프스타일 영역으로 가파르게 넓어지고 있습니다."
                : "Wigs and extensions are the foundational pillars of store sales. However, the shopping basket has expanded to encompass body care, shower rituals, fragrances, and home wellness."
              }
            </p>

            {/* Staggered Tags */}
            <div className="flex flex-wrap gap-2 my-5 select-none font-black font-display text-[10.5px]">
              {[
                { label: "HAIR", delay: "delay-[100ms]" },
                { label: "SKIN", delay: "delay-[200ms]" },
                { label: "BODY", delay: "delay-[300ms]" },
                { label: "FRAGRANCE", delay: "delay-[400ms]" },
                { label: "SELF-CARE", delay: "delay-[500ms]" }
              ].map((tag, idx) => (
                <span 
                  key={idx}
                  className={`bg-[#121214] border border-[#ff2b75]/20 text-[#ff2b75] px-3.5 py-1.5 rounded-[6px] transition-all duration-500 transform ${
                    sec1Visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  } ${tag.delay}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "점주는 이제 고객을 단순히 '머리를 구매하러 온 고객'이 아닌, 일상적인 셀프케어 지출 전체를 관리하는 하나의 독립된 뷰티 소비 단위로 파악하고 진열 조닝을 설계해야 합니다."
                : "Retailers must approach shoppers with a holistic view, designing counter placements to capture add-on dollars across their entire self-care routine."
              }
            </p>
            
            {/* Highlighted Slogan Box */}
            <div className="bg-[#ff2b75]/5 border-l-2 border-[#ff2b75] p-5.5 rounded-r-[12px] my-4 select-none">
              <span className="block text-[10px] font-black text-[#ff2b75] tracking-widest uppercase font-display mb-1">KEY QUESTION</span>
              <p className="m-0 text-[14px] text-white font-bold leading-normal keep-all">
                {isKo
                  ? "“우리 고객이 모발 제품을 사러 방문했을 때, 해결받고 싶어하는 다른 숨겨진 뷰티 니즈는 무엇인가?”"
                  : "“When our customers walk in to buy hair extensions, what other beauty needs are they carrying in their mind?”"
                }
              </p>
            </div>
          </div>

          {/* SECTION 02 */}
          <div ref={sec2Ref} className={`mb-12 transition-all duration-700 transform ${sec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              02. 온라인 쇼핑몰과 경쟁하려 하지 말고, 온라인이 줄 수 없는 물리적 가치에 집중하세요.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "무제한적인 상품 가짓수, 성분 검색 필터, 끝없는 가격 비교는 온라인 채널이 절대적 우위를 가집니다. 오프라인 점포는 이러한 디지털 영역과 가격 단가로 진흙탕 싸움을 할 필요가 없습니다. 오프라인이 가진 핵심 강점은 '경험과 즉시성'이기 때문입니다."
                : "Endless inventory selections, detailed ingredient filtration, and immediate price comparison belong to e-commerce. Brick-and-mortar storefronts excel where online fails: physical testing and instant gratification."
              }
            </p>

            {/* Compare Matrix Grid */}
            <div className="grid sm:grid-cols-2 gap-4 my-6 select-none font-bold text-xs">
              <div className="bg-[#121214] border border-white/5 p-5 rounded-[16px]">
                <span className="block text-[#ff2b75] tracking-widest uppercase font-display mb-3">ONLINE CHANNEL</span>
                <ul className="space-y-2.5 text-[#9ca3af]">
                  <li className="flex items-center gap-2"><span>•</span> Search (텍스트/이미지 탐색)</li>
                  <li className="flex items-center gap-2"><span>•</span> Review (디지털 리뷰 수집)</li>
                  <li className="flex items-center gap-2"><span>•</span> Price Comparison (즉각적인 최저가 비교)</li>
                  <li className="flex items-center gap-2"><span>•</span> Endless Selection (무제한 카탈로그)</li>
                </ul>
              </div>
              <div className="bg-[#121214] border border-[#00f0ff]/20 p-5 rounded-[16px]">
                <span className="block text-[#00f0ff] tracking-widest uppercase font-display mb-3">PHYSICAL STORE</span>
                <ul className="space-y-2.5 text-white/90">
                  <li className="flex items-center gap-2"><span>•</span> Try (제형 직접 테스트)</li>
                  <li className="flex items-center gap-2"><span>•</span> Compare (제품 간 향기 비교)</li>
                  <li className="flex items-center gap-2"><span>•</span> Ask (현장 직원과의 대화)</li>
                  <li className="flex items-center gap-2"><span>•</span> Take Home Today (대기 없는 즉시 획득)</li>
                </ul>
              </div>
            </div>

            {/* Sequential Line Flow Animation */}
            <span className="block text-[10px] text-[#7A7A7A] font-black tracking-wider uppercase font-display mb-4">RETAIL VALUE LOOP</span>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121214] border border-white/5 p-6 rounded-[20px] select-none text-xs font-black text-white/90">
              <div className={`transition-all duration-500 delay-[200ms] transform ${sec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} bg-[#0c0c0c] border border-white/10 px-5 py-3 rounded-[10px] text-center w-full`}>
                <span className="text-[#ff2b75] text-[9px] uppercase block mb-1">Phase 01</span>
                <span className="block font-bold">DISCOVERY (발견)</span>
                <span className="text-[#7A7A7A] text-[10px] font-semibold block mt-0.5">온라인 소셜 미디어 탐색</span>
              </div>
              <span className={`text-[#ff2b75] transform rotate-90 sm:rotate-0 transition-all duration-500 delay-[500ms] ${sec2Visible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>➔</span>
              <div className={`transition-all duration-500 delay-[700ms] transform ${sec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} bg-[#0c0c0c] border border-[#00f0ff]/20 px-5 py-3 rounded-[10px] text-center w-full`}>
                <span className="text-[#00f0ff] text-[9px] uppercase block mb-1">Phase 02</span>
                <span className="block font-bold">VALIDATION (검증)</span>
                <span className="text-[#7A7A7A] text-[10px] font-semibold block mt-0.5">매대 테스터 피부 경험</span>
              </div>
              <span className={`text-[#ff2b75] transform rotate-90 sm:rotate-0 transition-all duration-500 delay-[1000ms] ${sec2Visible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>➔</span>
              <div className={`transition-all duration-500 delay-[1200ms] transform ${sec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} bg-[#ff2b75]/5 border border-[#ff2b75]/25 px-5 py-3 rounded-[10px] text-center w-full`}>
                <span className="text-[#ff2b75] text-[9px] uppercase block mb-1">Phase 03</span>
                <span className="block font-bold">EXPERIENCE (경험 구매)</span>
                <span className="text-[#7A7A7A] text-[10px] font-semibold block mt-0.5">현장 결제 즉시 소유</span>
              </div>
            </div>
          </div>

          {/* SECTION 03 */}
          <div ref={sec3Ref} className={`mb-12 transition-all duration-700 transform ${sec3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              03. 더 무거운 매대보다 선택을 단축시키는 구성이 중요합니다.
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "통계 조사에 따르면 Black 소비자의 대다수는 제품이 자신의 뷰티 프로필에 정확히 맞게 맞춤형 제안이 제공되는 것을 가치 있게 여깁니다. 이것이 고난도의 스마트 테크 장치를 설치하라는 의미는 아닙니다. 진열 구성의 로직만 바꿔도 훌륭한 맞춤 솔루션이 됩니다."
                : "Research reveals a clear majority of demographic buyers value customization. Retailers don't need advanced software for this; clean grouping logic solves the problem on shelf level:"
              }
            </p>

            {/* Subtle Count-Up 60% */}
            <div className="bg-[#121214] border border-white/10 rounded-[20px] p-6.5 my-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 text-center sm:text-left select-none">
                <strong className="text-white text-[38px] sm:text-[46px] font-black leading-none font-display block">
                  {customizationRate}%
                </strong>
                <span className="text-[#ff2b75] text-[11px] font-black tracking-widest uppercase font-display mt-1 block">IMPORTANCE OF CUSTOM FIT</span>
              </div>
              <div className="text-[13px] text-[#9ca3af] leading-relaxed font-semibold">
                {isKo
                  ? "설문 응답자의 60%는 제품 제안이 본인의 스킨 및 모발 조건에 맞춰 맞춤 구성(Customization)되는 매장에 강한 로열티를 보였습니다.<sup>[2]</sup>"
                  : "Sixty percent of respondents express a preference for products tailored to their specific hair and skin profiles."
                }
              </div>
            </div>

            {/* Need Option UI Grid */}
            <div className="grid sm:grid-cols-3 gap-4 my-6 select-none font-bold text-xs">
              <div className="bg-[#121214] border border-white/5 p-4.5 rounded-[12px]">
                <span className="text-[#ff2b75] block mb-1">NEED: DRY SCALP</span>
                <span className="text-[#7A7A7A] block text-[10px] uppercase font-display mb-3">3 Recommended Options</span>
                <div className="space-y-1.5 text-white/80">
                  <div className="bg-[#0c0c0c] p-2 rounded">01 두피 스케일러</div>
                  <div className="bg-[#0c0c0c] p-2 rounded">02 모근 수분 앰플</div>
                  <div className="bg-[#0c0c0c] p-2 rounded">03 진정 토닉 스프레이</div>
                </div>
              </div>
              <div className="bg-[#121214] border border-white/5 p-4.5 rounded-[12px]">
                <span className="text-[#00f0ff] block mb-1">NEED: INTENSE HYDRATION</span>
                <span className="text-[#7A7A7A] block text-[10px] uppercase font-display mb-3">3 Recommended Options</span>
                <div className="space-y-1.5 text-white/80">
                  <div className="bg-[#0c0c0c] p-2 rounded">01 히알루론산 토너</div>
                  <div className="bg-[#0c0c0c] p-2 rounded">02 세라마이드 크림</div>
                  <div className="bg-[#0c0c0c] p-2 rounded">03 수분 고착 오일</div>
                </div>
              </div>
              <div className="bg-[#121214] border border-white/5 p-4.5 rounded-[12px]">
                <span className="text-white block mb-1">NEED: QUICK DAILY CARE</span>
                <span className="text-[#7A7A7A] block text-[10px] uppercase font-display mb-3">3 Recommended Options</span>
                <div className="space-y-1.5 text-white/80">
                  <div className="bg-[#0c0c0c] p-2 rounded">01 올인원 워시 밤</div>
                  <div className="bg-[#0c0c0c] p-2 rounded">02 10초 보습 미스트</div>
                  <div className="bg-[#0c0c0c] p-2 rounded">03 유선형 세럼 스틱</div>
                </div>
              </div>
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "30가지 유사 모이스처라이저를 어수선하게 세워두기보다, 특정 고민을 가진 고객의 눈높이에 딱 3개 핵심 제품의 루틴 구도를 일목요연하게 묶어주는 것이 매장 재구매율을 끌어올립니다."
                : "Presenting a clear 3-step routine tailored to a specific concern simplifies the path to purchase and boosts ticket size."
              }
            </p>
          </div>

          {/* SECTION 04 */}
          <div ref={sec4Ref} className={`mb-12 transition-all duration-700 transform ${sec4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              04. 수입 스킨케어도 제조 국가 이전에 '수요(Need)'가 최우선입니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "최근 인기를 끄는 K-Beauty나 글로벌 스킨케어 브랜드를 매대에 들여놓을 때, 단지 유행 제품이라는 이유로 배치해서는 안 됩니다. 먼저 매장 주 고객층의 실제 고민 해결과 어떻게 연결될지 고민해야 합니다. 성분(Ingrediet), 수분감(Hydration), 두피(Scalp), 자외선 차단(Sun Care), 민감성 피부(Sensitive Skin) 같은 명확한 사용 가치가 원산지 레이블보다 우선되어야 합니다."
                : "When adding new import skincare options, avoid stocking items based on simple internet hype. Match catalog additions directly to local concerns (hydration, scalp cooling, blemish control). Customer needs override geographic origin."
              }
            </p>
          </div>

          {/* RETAILER CHECKLIST (01-05 Sequential Reveal) */}
          <div 
            ref={checklistRef}
            className={`border border-[#ff2b75]/25 bg-[#121214] rounded-[24px] p-7.5 sm:p-9.5 my-12 transition-all duration-700 transform ${
              checklistVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
            }`}
          >
            <span className="text-[10px] text-[#ff2b75] font-black tracking-[0.2em] uppercase font-display block mb-2 select-none">
              RETAILER CHECKLIST
            </span>
            <h3 className="text-[17.5px] sm:text-[20px] font-black text-white m-0 mb-6 keep-all">
              {isKo ? "이번 주 매장에서 확인할 다섯 가지 항목" : "Five observation items inside your store this week:"}
            </h3>
            
            <div className="flex flex-col gap-4.5 text-[13.5px] text-white/90">
              {[
                { ko: "01 모발/가발 카테고리 외에 고객이 가장 많이 문의하는 대체 뷰티 아이템 3개 기록", en: "01 Note the top three non-hair items shoppers ask for during visits" },
                { ko: "02 매장에서 고객이 스마트폰 화면을 켜서 보여주며 묻는 특정 제품/성분 성격 확인", en: "02 Log the ingredients or internet photos clients show on their mobile screens" },
                { ko: "03 대기 시간이나 질문이 가장 자주 관찰되는 핵심 매대(Zone) 3곳 파악", en: "03 Track the specific shelves where customers linger or ask for helper assistance" },
                { ko: "04 브랜드 단위 진열에서 탈피하여 고객 고민(Need)별로 소상품을 그룹핑할 공간 확보", en: "04 Identify one counter end-cap where items can be regrouped by solution rather than brand" },
                { ko: "05 매장 직원이 매일 현장에서 반복해서 듣는 고객 질문 내용 5가지 취합", en: "05 Gather the top five frequent questions from your frontline cashiers" }
              ].map((check, idx) => {
                const delays = ["delay-[100ms]", "delay-[250ms]", "delay-[400ms]", "delay-[550ms]", "delay-[700ms]"];
                return (
                  <div 
                    key={idx} 
                    className={`flex gap-3.5 items-start transition-all duration-500 transform ${
                      checklistVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    } ${delays[idx]}`}
                  >
                    <div className="w-5 h-5 rounded-[4px] border border-[#ff2b75]/35 bg-[#ff2b75]/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-[#ff2b75] font-black">✓</div>
                    <span className="font-semibold leading-relaxed">{isKo ? check.ko : check.en}</span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/10 pt-6 mt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-display font-black text-xs sm:text-sm text-[#ff2b75] uppercase tracking-wider select-none">
                The Store Is No Longer Just Where Products Sit. It’s Where Decisions Get Easier.
              </span>
              <Link
                href={`/${locale}/insights/beauty-value-2026`}
                className="h-12 px-4 sm:px-6 w-full sm:w-auto rounded-[8px] border border-[#ff2b75]/35 hover:bg-[#ff2b75] text-[#ff2b75] hover:text-white font-black text-[11px] sm:text-[12.5px] tracking-wide inline-flex items-center justify-center transition-all duration-200 shrink-0 whitespace-nowrap"
              >
                {isKo ? "다음 인사이트: Value의 기준 읽기 →" : "Next Insight: Define Value →"}
              </Link>
            </div>
          </div>

          {/* Previous / Next Insight Navigation */}
          <div className="grid sm:grid-cols-2 gap-6 my-12 border-t border-white/10 pt-12 select-none">
            <div className="hidden sm:block" />
            <Link 
              href={`/${locale}/insights/beauty-value-2026`}
              className="group bg-[#121214] border border-white/5 hover:border-[#ff2b75]/35 p-6 rounded-[20px] flex flex-col items-end text-right transition-all duration-300"
            >
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-2 flex items-center gap-1 transition-transform group-hover:translate-x-1">
                NEXT INSIGHT →
              </span>
              <span className="text-[#7A7A7A] text-[9.5px] font-black tracking-widest uppercase font-display block mb-1">
                RETAIL PLAYBOOK
              </span>
              <span className="text-white group-hover:text-[#ff2b75] font-display text-[15px] font-black leading-snug transition-colors keep-all">
                {isKo ? "가격을 낮추는 게 답은 아닙니다: 2026 Beauty 고객이 말하는 ‘Value’의 기준" : "Lowering Prices Is Not the Answer: How Beauty Shoppers Define Value"}
              </span>
            </Link>
          </div>

          {/* Desktop Sticky Navigation */}
          <div className="hidden lg:flex fixed bottom-8 right-8 z-40 bg-[#121214]/90 backdrop-blur border border-white/10 rounded-full px-5 py-3 items-center gap-4.5 shadow-2xl text-[11px] font-black tracking-widest font-display text-white select-none">
            <span className="text-white/20 cursor-not-allowed">← PREV</span>
            <span className="text-white/30">|</span>
            <span className="text-[#00f0ff]">01 / 06</span>
            <span className="text-white/30">|</span>
            <Link 
              href={`/${locale}/insights/beauty-value-2026`} 
              className="text-white/60 hover:text-[#ff2b75] transition-colors"
              title={isKo ? "가격을 낮추는 게 답은 아닙니다" : "Lowering Prices Is Not the Answer"}
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
                  <span className="text-white/90 font-bold block">NielsenIQ (NIQ)</span>
                  <span className="text-[#7A7A7A] block mt-0.5">Where Culture Meets Care: Inside Today’s Black Beauty Landscape (March 5, 2026)</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">02</span>
                <div>
                  <span className="text-white/90 font-bold block">NielsenIQ Global Retail Survey</span>
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
