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

export default function ArticleKBeauty2026SignalsPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isKo = locale === "ko";

  const [introRef, introVisible] = useIntersectionReveal();
  const [followRef, followVisible] = useIntersectionReveal();
  const [ignoreRef, ignoreVisible] = useIntersectionReveal();
  const [checklistRef, checklistVisible] = useIntersectionReveal();

  // Count-up states
  const [salesGrowth, setSalesGrowth] = useState(0);
  const [twoYearGrowth, setTwoYearGrowth] = useState(0);
  const [ecommerceShare, setEcommerceShare] = useState(0);

  useEffect(() => {
    if (introVisible) {
      // +53%
      let startGrowth = 0;
      const growthTimer = setInterval(() => {
        startGrowth += 3;
        if (startGrowth >= 53) {
          setSalesGrowth(53);
          clearInterval(growthTimer);
        } else {
          setSalesGrowth(startGrowth);
        }
      }, 40);

      // +131%
      let startTwoYear = 0;
      const twoYearTimer = setInterval(() => {
        startTwoYear += 6;
        if (startTwoYear >= 131) {
          setTwoYearGrowth(131);
          clearInterval(twoYearTimer);
        } else {
          setTwoYearGrowth(startTwoYear);
        }
      }, 30);

      // 76%
      let startEco = 0;
      const ecoTimer = setInterval(() => {
        startEco += 4;
        if (startEco >= 76) {
          setEcommerceShare(76);
          clearInterval(ecoTimer);
        } else {
          setEcommerceShare(startEco);
        }
      }, 30);
    }
  }, [introVisible]);

  const followItems = [
    { num: "01", titleKo: "한 번 쓰고 끝나는 유행보다 Routine에 들어가는 Format", titleEn: "Formats that integrate into daily routines", descKo: "아크네 패치, 데일리 세럼, 수분 앰플, 마스크 팩 등 일회성 버즈 상품이 아니라 고객의 일상 화장대 주기에 고착되어 보충(Reorder)이 일어나는 카테고리", descEn: "Acne patches, daily serums, and ampoules that drive recurring shopper repeat-purchases." },
    { num: "02", titleKo: "Skincare 밖으로 확장되는 K-Beauty 영역", titleEn: "Expansion beyond traditional skincare", descKo: "두피 케어 세럼, 모근 앰플 오일, 기능성 헤어 마스크 등 미국 프리미엄 헤어 시장에서 증명된 보습/기능 확장군", descEn: "Scalp serums, root oil ampoules, and damage hair masks matching U.S. premium hair market demands." },
    { num: "03", titleKo: "온라인에서 발견된 제품을 매장에서 완벽히 이해시키는 검증 인프라", titleEn: "In-store validation for online discovery", descKo: "고객이 온라인에서 접하고 온 제품에 대해 매대 위에서 10초 이내로 스킨/모발 고민별 가치를 명확히 입증하는 안내 레이블", descEn: "Clear labels that validate online viral content for immediate in-store shoppers." }
  ];

  const ignoreItems = [
    { num: "01", titleKo: "온라인 화면 속의 모든 일시적 Viral 원료", titleEn: "Blindly chasing viral ingredients", descKo: "인터넷 알고리즘 화제성(Viral)과 매장 주변 상권 단골 고객의 실제 로컬 수요(Local Demand)는 늘 일치하지 않습니다.", descEn: "Viral ingredients trend fast but rarely match local neighborhood customer needs." },
    { num: "02", titleKo: "SKU 가짓수가 많을수록 K-Beauty Section이 좋아질 것이라는 착각", titleEn: "Overloading shelf with sheer quantity", descKo: "비슷비슷한 세럼 10가지를 빽빽하게 진열해 혼란을 주는 것보다, 피부 고민별 대표 4종(ENTRY, HYDRATION, BLEMISH, PREMIUM)의 구조적 진열이 매출을 견인합니다.", descEn: "A structured 4-SKU choice layout converts better than 10 overlapping duplicate bottles." },
    { num: "03", titleKo: "틱톡 바이럴 제품이면 가만히 놔둬도 팔릴 것이라는 기대", titleEn: "Assuming TikTok buzz translates passively", descKo: "온라인과 달리 매장 매대는 침묵합니다. 제품의 구매 이유와 가치가 10초 안에 직관적으로 해석되지 않는 품목은 방치된 재고로 남습니다.", descEn: "Without local visual cues and explanations, viral products gather dust on quiet shelves." }
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
              BEAUTY MARKET
            </span>
            <h1 className="font-display text-[26px] sm:text-[38px] lg:text-[42px] font-black leading-tight text-white tracking-tight m-0 keep-all">
              {isKo 
                ? "K-Beauty 2026: 지금 봐야 할 3가지 신호, 따라가지 않아도 될 3가지 유행" 
                : "K-Beauty 2026: 3 Signals to Track, 3 Trends to Ignore"
              }
            </h1>
            <p className="text-[14px] sm:text-[16px] text-white/60 leading-relaxed m-0 mt-2 keep-all">
              {isKo
                ? "K-Beauty가 빠르게 성장하고 있다는 것과, 모든 K-Beauty 제품이 내 매장에 필요하다는 것은 전혀 다른 이야기입니다."
                : "K-Beauty's macro growth and your local counter needs are completely separate queries. Focus on what translates locally."
              }
            </p>
            <div className="flex items-center gap-4 text-[10.5px] text-[#7A7A7A] font-black uppercase tracking-wider font-display mt-4 border-b border-white/10 pb-6 select-none">
              <span>6 MIN READ</span>
              <span>•</span>
              <span>{isKo ? "글로벌 뷰티 마켓 트렌드" : "K-BEAUTY MARKET"}</span>
              <span>•</span>
              <span>BY K SELECT INSIGHTS</span>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden border border-white/10 shadow-2xl group mb-16">
            <Image
              src="/images/insights/kbeauty_2026_signals.jpg"
              alt="Data-driven K-Beauty shelf visual displaying follow signals and ignore warnings"
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
                ? "K-Beauty가 전 세계 뷰티 소매점의 강력한 견인 엔진으로 도약했다는 사실은 이제 논박의 여지가 없습니다."
                : "It is undisputed that K-Beauty has surged to become a primary volume driver in global cosmetics."
              }
            </p>
            <p className="m-0 keep-all">
              {isKo
                ? "하지만 리테일러 입장에서 핵심 질문은 다릅니다. “그 거대한 글로벌 거시 성장세 중, 정확히 어떤 카테고리가 우리 지역 단골 매대의 실질 매출로 번역될 수 있는가?”라는 점입니다."
                : "Yet, store owners must drill down to a distinct diagnostic: Which part of this macro growth translate directly to our local shelves?"
              }
            </p>

            {/* Count-Up widgets */}
            <div className="grid grid-cols-3 gap-3 my-4 select-none">
              <div className="bg-[#121214] border border-white/5 p-4.5 rounded-[12px] text-left">
                <span className="block text-[8.5px] text-[#ff2b75] font-black tracking-widest font-display mb-1">YOY SURGE</span>
                <strong className="text-white text-[20px] sm:text-[26px] font-black leading-none font-display">
                  +{salesGrowth}%
                </strong>
                <p className="m-0 mt-1 text-[9.5px] text-[#7A7A7A] leading-normal font-bold">K-Beauty 매출 성장률<sup>[1]</sup></p>
              </div>
              <div className="bg-[#121214] border border-white/5 p-4.5 rounded-[12px] text-left">
                <span className="block text-[8.5px] text-[#ff2b75] font-black tracking-widest font-display mb-1">2-YEAR GROWTH</span>
                <strong className="text-white text-[20px] sm:text-[26px] font-black leading-none font-display">
                  +{twoYearGrowth}%
                </strong>
                <p className="m-0 mt-1 text-[9.5px] text-[#7A7A7A] leading-normal font-bold">2개년 누적 성장폭<sup>[1]</sup></p>
              </div>
              <div className="bg-[#121214] border border-white/5 p-4.5 rounded-[12px] text-left">
                <span className="block text-[8.5px] text-[#00f0ff] font-black tracking-widest font-display mb-1">ONLINE PORTION</span>
                <strong className="text-white text-[20px] sm:text-[26px] font-black leading-none font-display">
                  {ecommerceShare}%
                </strong>
                <p className="m-0 mt-1 text-[9.5px] text-[#7A7A7A] leading-normal font-bold">북미 온라인 판매 비중<sup>[2]</sup></p>
              </div>
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "조사에 따르면 북미 시장 K-Beauty 거래의 76%는 여전히 온라인 이커머스에서 수행됩니다. 즉, 매장을 방문하는 단골 고객들이 온라인 화면을 통해 이미 발견하고 유입된 경우가 대부분이므로 오프라인 점포는 무작정 유행을 쫓는 데 리소스를 낭비해서는 안 됩니다."
                : "With 76% of North American sales routed online, customers walk in pre-educated. Stores must act as validation points rather than mere search engines."
              }
            </p>
          </div>

          {/* FOLLOW SIGNALS (01-03 Sequential Reveal) */}
          <div ref={followRef} className="mb-12">
            <span className="text-[10px] text-[#00f0ff] font-black tracking-widest uppercase font-display block mb-2 select-none">
              3 SIGNALS TO FOLLOW
            </span>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-6 keep-all">
              K-Beauty 2026: 매장 안으로 끌어들여야 할 3가지 긍정적 신호
            </h2>

            <div className="flex flex-col gap-4 select-none">
              {followItems.map((item, idx) => {
                const delays = ["delay-[100ms]", "delay-[250ms]", "delay-[400ms]"];
                return (
                  <div 
                    key={idx}
                    className={`bg-[#121214] border border-white/5 p-5 rounded-[16px] flex gap-4.5 items-start transition-all duration-500 transform ${
                      followVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    } ${delays[idx]}`}
                  >
                    <span className="text-[10px] text-[#00f0ff] font-black tracking-widest font-display bg-[#00f0ff]/5 border border-[#00f0ff]/20 px-2 py-1 rounded-[4px] shrink-0 mt-0.5">
                      FOLLOW {item.num}
                    </span>
                    <div className="flex flex-col gap-1 text-left">
                      <h4 className="text-white text-[14px] font-black m-0 leading-tight">
                        {isKo ? item.titleKo : item.titleEn}
                      </h4>
                      <p className="text-[12.5px] text-[#9ca3af] leading-relaxed font-semibold m-0 mt-1">
                        {isKo ? item.descKo : item.descEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* IGNORE TRENDS (01-03 Sequential Reveal / Subtle Fade & Strike Effect) */}
          <div ref={ignoreRef} className="mb-12">
            <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display block mb-2 select-none">
              3 TRENDS TO IGNORE
            </span>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-6 keep-all">
              K-Beauty 2026: 과감하게 거르고 따라가지 않아도 될 3가지 유행성 거품
            </h2>

            <div className="flex flex-col gap-4 select-none">
              {ignoreItems.map((item, idx) => {
                const delays = ["delay-[100ms]", "delay-[250ms]", "delay-[400ms]"];
                return (
                  <div 
                    key={idx}
                    className={`bg-[#121214]/50 border border-white/5 p-5 rounded-[16px] flex gap-4.5 items-start transition-all duration-500 transform ${
                      ignoreVisible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-4"
                    } ${delays[idx]}`}
                  >
                    <span className="text-[10px] text-white/30 font-black tracking-widest font-display bg-white/[0.02] border border-white/10 px-2 py-1 rounded-[4px] shrink-0 mt-0.5 select-none">
                      IGNORE {item.num}
                    </span>
                    <div className="flex flex-col gap-1 text-left">
                      <h4 className="text-white/60 text-[14px] font-black m-0 leading-tight line-through decoration-[#ff2b75]/40 decoration-2">
                        {isKo ? item.titleKo : item.titleEn}
                      </h4>
                      <p className="text-[12.5px] text-[#7A7A7A] leading-relaxed font-semibold m-0 mt-1">
                        {isKo ? item.descKo : item.descEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BEFORE YOU BUY (5 Questions Stagger Checklist) */}
          <div 
            ref={checklistRef}
            className={`border border-[#ff2b75]/25 bg-[#121214] rounded-[24px] p-7.5 sm:p-9.5 my-12 transition-all duration-700 transform ${
              checklistVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
            }`}
          >
            <span className="text-[10px] text-[#ff2b75] font-black tracking-[0.2em] uppercase font-display block mb-2 select-none">
              BEFORE YOU BUY
            </span>
            <h3 className="text-[17.5px] sm:text-[20px] font-black text-white m-0 mb-6 keep-all">
              신규 기초 상품 도입 전 반드시 물어야 할 5가지 질문
            </h3>
            
            <div className="flex flex-col gap-4 text-[13.5px] text-white/90">
              {[
                { ko: "01 이 상품군은 우리 매대 단골 고객의 어떤 피부/두피 고민을 해결하는가?", en: "01 Which skin concern does this specific formula address?" },
                { ko: "02 기존에 이미 진열된 유사 재고 상품과 역할이 겹치지 않고 분명히 차별화되는가?", en: "02 Does this avoid redundancy with existing SKUs?" },
                { ko: "03 이 가격(Retail Price)을 고객이 납득할 수 있는 농도나 기능상 가치가 입증되었는가?", en: "03 Is the retail price point fully justified by performance?" },
                { ko: "04 매장 직원이 매대 앞에서 15초 안에 이 이점을 고객에게 전달할 수 있는가?", en: "04 Can cashier staff explain the benefits in under 15 seconds?" },
                { ko: "05 단순 호기심(One-time trial) 구매를 넘어 정기적인 재구매 주기가 형성될 상품인가?", en: "05 Is this built for recurring replenishments rather than novelty buy?" }
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

            {/* Highlighting Slogan Box */}
            <div className="bg-[#ff2b75]/5 border-l-2 border-[#ff2b75] p-5.5 rounded-r-[12px] my-6 select-none text-left">
              <span className="block text-[10px] font-black text-[#ff2b75] tracking-widest uppercase font-display mb-1">RETAIL TIP</span>
              <p className="m-0 text-[13.5px] text-white font-bold leading-normal keep-all">
                위 5가지 중 3가지 이상 명확하게 답변하기 곤란하다면, 지금 매장에 제품을 사들이지 않는 것 자체가 리스크를 미연에 걷어내는 가장 훌륭한 리테일 결정(Retail Decision)입니다.
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 mt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-display font-black text-xs sm:text-sm text-[#ff2b75] uppercase tracking-wider select-none">
                K-Beauty Is Growing Fast. Your Assortment Doesn’t Have To.
              </span>
              <Link
                href={`/${locale}/insights/inventory-turn`}
                className="h-12 px-6 rounded-[8px] border border-[#ff2b75]/35 hover:bg-[#ff2b75] text-[#ff2b75] hover:text-white font-black text-[12.5px] tracking-wide inline-flex items-center justify-center transition-all duration-200"
              >
                {isKo ? "관련 플레이북: Inventory Turn 다시 읽기 →" : "Read Playbook: Inventory Turn →"}
              </Link>
            </div>
          </div>

          {/* SOURCES & REFERENCES SECTION */}
          <div className="border-t border-white/10 pt-8 mt-16 text-[12px] text-[#7A7A7A] select-none font-medium">
            <span className="block text-white/50 tracking-wider uppercase font-display text-[10px] font-black mb-3">SOURCES & REFERENCES</span>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">01</span>
                <div>
                  <span className="text-white/90 font-bold block">NielsenIQ (NIQ) Market Intelligence</span>
                  <span className="text-[#7A7A7A] block mt-0.5">K-Beauty Goes Global: Sales Surge 53% YoY (July 15, 2026)</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">02</span>
                <div>
                  <span className="text-white/90 font-bold block">NielsenIQ Global Retail Insights</span>
                  <span className="text-[#7A7A7A] block mt-0.5">Beauty in 2026: Global shifts. Local realities. Real growth (April 6, 2026)</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">03</span>
                <div>
                  <span className="text-white/90 font-bold block">Circana Industry Trend Survey</span>
                  <span className="text-[#7A7A7A] block mt-0.5">U.S. Beauty Industry Posts Solid First-Half Growth (August 11, 2026)</span>
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
