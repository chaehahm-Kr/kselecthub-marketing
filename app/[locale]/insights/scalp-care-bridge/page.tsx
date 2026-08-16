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
  params: Promise<{ locale?: string }>;
}

export default function ArticleScalpCareBridgePage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale === 'ko' ? 'ko' : 'en';
  const isKo = locale === "ko";

  const [sec1Ref, sec1Visible] = useIntersectionReveal();
  const [sec2Ref, sec2Visible] = useIntersectionReveal();
  const [sec3Ref, sec3Visible] = useIntersectionReveal();
  const [sec4Ref, sec4Visible] = useIntersectionReveal();
  const [sec5Ref, sec5Visible] = useIntersectionReveal();
  const [actionRef, actionVisible] = useIntersectionReveal();

  const productGroups = [
    { label: "CLEANSE", descKo: "두피 전용 샴푸 / 두피 딥클렌저", descEn: "Scalp Shampoo / Scalp Scaling formulas", badgeKo: "두피 스케일링", badgeEn: "Exfoliation" },
    { label: "TREAT", descKo: "두피 세럼 / 토닉 / 앰플", descEn: "Scalp Serum / Tonic / Ampoule treatments", badgeKo: "영양 공급", badgeEn: "Nutrition" },
    { label: "CARE", descKo: "두피 팩 / 헤어 트리트먼트", descEn: "Scalp Mask / Deep Treatment packs", badgeKo: "두피·모근 진정", badgeEn: "Soothing" },
    { label: "TOOL", descKo: "두피 브러쉬 / 마사지 툴", descEn: "Scalp Brush / Massaging Tools", badgeKo: "순환 마사지", badgeEn: "Massage" }
  ];

  const routineSteps = [
    { title: "BEFORE WASH", descKo: "두피 스크럽 / 스케일러", descEn: "Scalp Scrub / Scaler" },
    { title: "DURING WASH", descKo: "샴푸 & 헤어 팩", descEn: "Shampoo & Hair Mask" },
    { title: "AFTER WASH", descKo: "두피 토닉 / 에센스", descEn: "Scalp Tonic / Essence" },
    { title: "BETWEEN WASH DAYS", descKo: "리프레싱 스프레이 / 밤", descEn: "Refreshing Mist / Balm" }
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
              PRODUCT & CATEGORY
            </span>
            <h1 className="font-display text-[26px] sm:text-[38px] lg:text-[42px] font-black leading-tight text-white tracking-tight m-0 keep-all">
              {isKo 
                ? "Scalp Care: Hair 고객을 K-Beauty 고객으로 연결할 수 있을까?" 
                : "Scalp Care: Can We Bridge Hair Customers to K-Beauty Customers?"
              }
            </h1>
            <p className="text-[14px] sm:text-[16px] text-white/60 leading-relaxed font-medium m-0 mt-2 keep-all">
              {isKo
                ? "Beauty Supply가 이미 잘 알고 있는 Hair 고객. K-Beauty의 새로운 성장 기회는 그 고객에게서 시작될 수도 있습니다."
                : "Connect with the hair shoppers already in your store. The next growth frontier in K-Beauty starts from existing hair routines."
              }
            </p>
            <div className="flex items-center gap-4 text-[10.5px] text-[#7A7A7A] font-black uppercase tracking-wider font-display mt-4 border-b border-white/10 pb-6 select-none">
              <span>4 MIN READ</span>
              <span>•</span>
              <span>{isKo ? "카테고리 인사이트" : "CATEGORY INSIGHT"}</span>
              <span>•</span>
              <span>BY K SELECT INSIGHTS</span>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden border border-white/10 shadow-2xl group mb-16">
            <Image
              src="/images/insights/scalp_care_bridge.jpg"
              alt="Scalp Serum, Tonic, Shampoo, and Scalp Brush arrange on dark surface"
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
                ? "글로벌 헤어케어 시장에서 '두피 건강'과 '헤어 세그먼트 트리트먼트'에 대한 관심이 급상승하고 있습니다."
                : "Across the global haircare market, scalp health and targeted treatments are experiencing unprecedented sales growth."
              }
            </p>
            <p className="m-0 keep-all">
              {isKo
                ? "뷰티 서플라이 스토어 오너들에게 이 트렌드가 유난히 기회인 이유는 완전히 새로운 유형의 소비자를 매장에 끌어와야 하는 카테고리가 아니기 때문입니다. 이미 매장에 매일 방문하여 모발, 가발, 일반 샴푸를 구매해가는 단골 헤어(Hair) 고객들이 이미 현장에 존재하기 때문입니다."
                : "For local store owners, this is highly promising: it doesn't require acquiring a new customer demographic. The hair shoppers already in your aisles are the target audience."
              }
            </p>
            {/* Highlight Slogan Box */}
            <div className="bg-[#ff2b75]/5 border-l-2 border-[#ff2b75] p-5.5 rounded-r-[12px] my-4 select-none">
              <span className="block text-[11px] font-black text-[#ff2b75] tracking-widest uppercase font-display mb-1.5">MARKET SIGNAL</span>
              <p className="m-0 text-[14px] text-white font-black leading-normal keep-all">
                {isKo
                  ? "이미 확보된 헤어 소비층을 두피 건강 루틴인 K-Scalp Care와 연결할 때, 매대의 객단가는 자연스럽게 상승합니다."
                  : "Bridging your existing hair clientele to K-Beauty scalp care unlocks high basket sizes without extra marketing acquisition costs."
                }
              </p>
            </div>
          </div>

          {/* SECTION 01 */}
          <div ref={sec1Ref} className={`mb-12 transition-all duration-700 transform ${sec1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              01. 헤어(Hair)와 스킨케어(Skincare)를 연결하는 새로운 카테고리가 만들어지고 있습니다.
              <span className="block text-[11px] font-bold text-[#ff2b75] tracking-widest uppercase font-display mt-1">HAIR × SKINCARE BRIDGE</span>
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "현대 소비자들은 얼굴 피부에 클렌징, 영양 공급, 보습으로 이어지는 스킨케어 단계를 지극히 상식적으로 이해하고 있습니다. 이러한 관점이 헤어 영역으로 확장되면서 “두피도 피부처럼 관리한다”는 인식이 강력하게 자리잡았습니다.<sup>[1]</sup>"
                : "Shoppers understand the facial skincare routine: Cleanse, Treat, and Moisturize. As hair-care undergoes skinification, the scalp is viewed as an extension of the skin itself:"
              }
            </p>
            
            {/* Staggered Routine Progression */}
            <div className="bg-[#121214] border border-white/5 rounded-[20px] p-6 my-6 flex flex-col gap-4 select-none text-xs font-black">
              <div className="flex items-center gap-3">
                <span className="text-[#00f0ff]">CLEANSE</span>
                <span className="text-[#7A7A7A]">➔</span>
                <span className="text-[#ff2b75]">EXFOLIATE (각질 제거)</span>
                <span className="text-[#7A7A7A]">➔</span>
                <span className="text-[#00f0ff]">TREAT (집중 관리)</span>
                <span className="text-[#7A7A7A]">➔</span>
                <span className="text-white/80">MAINTAIN (상태 보존)</span>
              </div>
            </div>

            <p className="m-0 keep-all">
              {isKo
                ? "이 연결고리는 소매점주에게 매우 매력적인 기회입니다. 기존 샴푸나 컨디셔너 단품 구매에 그치던 소비 행동에 '두피 케어'라는 에드온 루틴을 추가로 얹어주어 매출을 극대화하기 때문입니다."
                : "This shift allows store owners to cross-sell supplemental items alongside standard shampoos and conditioners."
              }
            </p>
          </div>

          {/* SECTION 02 */}
          <div ref={sec2Ref} className={`mb-12 transition-all duration-700 transform ${sec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              02. 뷰티 서플라이 매장에서는 더 자연스러운 시작이 가능합니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "소비자에게 복잡한 전문 유기화학 기전을 설명하려 애쓰는 대신, 기존에 하고 있던 일상적인 모발 관리 행위와 연계하여 설명하는 것만으로도 충분히 설득력을 얻습니다."
                : "Rather than forcing complex science on shoppers, connect K-Beauty scalp care to their existing hair habits:"
              }
            </p>
            
            {/* Quote block */}
            <div className="border-l-4 border-[#00f0ff] pl-5 my-6 select-none font-semibold text-white/95">
              <p className="m-0 leading-relaxed italic keep-all text-[13.5px] sm:text-[14px]">
                {isKo
                  ? "“매주 머리를 감기 전, 두피에 바르고 마사지하여 쌓여 있는 노폐물과 굳은 각질을 녹여내는 두피 스케일러 제품입니다.”\n“머리를 감고 말리기 직전 두피에 뿌려 뜨거워진 열감을 즉각 식혀주는 두피 토닉입니다.”"
                  : "“Apply this scaler to dissolve buildup before you wash. Spray this cooling tonic onto damp scalp after you wash to reduce heat.”"
                }
              </p>
            </div>
          </div>

          {/* SECTION 03 */}
          <div ref={sec3Ref} className={`mb-12 transition-all duration-700 transform ${sec3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              03. 어떤 제품군부터 시범 도입해야 할까요?
            </h2>
            <p className="m-0 mb-5 keep-all">
              {isKo
                ? "두피 관리 제품군을 점포에 처음 도입할 때는 다음 4가지 핵심 카테고리 역할을 균형 있게 믹스하는 것이 재고 관리 측면에서 가장 안전합니다."
                : "When testing scalp care inside your store, structure the selection into four distinct operational blocks:"
              }
            </p>

            {/* 4 Product Groups Grid */}
            <div className="grid sm:grid-cols-2 gap-4 my-6 select-none font-medium">
              {productGroups.map((g, idx) => (
                <div key={idx} className="bg-[#121214] border border-white/5 p-5 rounded-[16px] flex flex-col justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black text-[#ff2b75] tracking-widest font-display block mb-1">{g.label}</span>
                    <h4 className="text-[14px] font-black text-white m-0">{g.descKo}</h4>
                  </div>
                  <span className="text-[10.5px] text-[#00f0ff] font-bold border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-2 py-0.5 rounded-[4px] self-start">
                    {isKo ? g.badgeKo : g.badgeEn}
                  </span>
                </div>
              ))}
            </div>

            {/* Routine timeline graphic */}
            <div className="bg-[#121214] border border-white/5 rounded-[16px] p-6 my-6 select-none text-left">
              <span className="block text-[10px] text-[#7A7A7A] font-black tracking-wider uppercase font-display mb-4">SCALP ROUTINE TIMELINE</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs font-black text-white/95">
                {routineSteps.map((step, idx) => (
                  <div key={idx} className="bg-[#0c0c0c] border border-white/10 rounded-[8px] p-3 flex flex-col gap-1.5">
                    <span className="text-[#ff2b75] text-[9px] tracking-wider font-display">{step.title}</span>
                    <span className="text-[11px] leading-tight text-white/80">{isKo ? step.descKo : step.descEn}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 04 */}
          <div ref={sec4Ref} className={`mb-12 transition-all duration-700 transform ${sec4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              04. 매대 내에서 어디에 진열할 것인가가 핵심입니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "두피 전용 상품을 일반 스킨케어 진열대 구석에 방치하면 주 고객층인 헤어 구매자가 발견하기 어렵습니다. 반대로 저가 일반 샴푸 매대 사이에 분산 배치하면 K-Beauty 고유의 고급감이나 솔루션의 성격이 묻혀 버립니다. 따라서 설치 시 'HAIR CARE × K-BEAUTY'의 성격을 가지는 '브릿지 테마 섹션'으로 구획하여 전용 진열 조닝을 확립해야 성공 가능성을 높일 수 있습니다."
                : "Shelf layout dictates shopper discovery. Tucking scalp care away in standard skincare hides it from hair buyers. Separating it as a cross-over K-Beauty Bridge section yields the highest sales velocity."
              }
            </p>
          </div>

          {/* SECTION 05 */}
          <div ref={sec5Ref} className={`mb-12 transition-all duration-700 transform ${sec5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-[19px] sm:text-[22px] font-black text-white tracking-tight leading-tight m-0 mb-4 keep-all">
              05. 용도를 명확히 설명할 수 있어야 구매로 이어집니다.
            </h2>
            <p className="m-0 keep-all">
              {isKo
                ? "K-Scalp Care는 새로 진입하는 단계이기 때문에 제품 사용 방식에 대한 고객 문의 장벽이 높은 편입니다. 고객이 '언제 사용하나요?', '샴푸 전에 쓰나요 후인가요?', '매일 사용해도 안전한가요?'라고 물을 때, 매장 점원이 명확한 대답을 해줄 수 있거나 매대 모바일 QR 안내 가이드가 비치되어 있어야만 리오더 매출이 고착화됩니다.<sup>[2]</sup>"
                : "Scalp products trigger questions: When do I apply it? Daily? Is it safe for color-treated hair? Providing staff learning and mobile QR guides is crucial to ensure steady reorders."
              }
            </p>

            {/* Q&A grid visual */}
            <div className="bg-[#121214] border border-white/10 rounded-[20px] p-6 my-6">
              <span className="block text-[10px] text-[#00f0ff] font-black tracking-widest uppercase font-display mb-4">RETAILER RUNBOOKS</span>
              <div className="flex flex-wrap gap-2 text-[11px] font-extrabold text-[#9ca3af] select-none font-bold">
                {["언제 사용하나요?", "Shampoo 전인가요, 후인가요?", "매일 써도 되나요?", "어떤 두피 타입에 맞나요?", "다른 Hair 제품과 혼용 가능한가요?"].map((q, idx) => (
                  <span key={idx} className="bg-[#0c0c0c] border border-white/5 px-3 py-1.5 rounded-[6px]">
                    {q}
                  </span>
                ))}
              </div>
              <div className="mt-5 border-t border-white/5 pt-4 text-[12px] text-[#ff2b75] font-black flex items-center justify-between gap-4">
                <span>QR PRODUCT GUIDE + LEARNING MODULES</span>
                <span className="text-[#00f0ff]">READY TO DEPLOY</span>
              </div>
            </div>
          </div>

          {/* RETAILER ACTION CHECKLIST */}
          <div 
            ref={actionRef}
            className={`border border-[#ff2b75]/25 bg-[#121214] rounded-[24px] p-7.5 sm:p-9.5 my-12 transition-all duration-700 transform ${
              actionVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
            }`}
          >
            <span className="text-[10px] text-[#ff2b75] font-black tracking-[0.2em] uppercase font-display block mb-2 select-none">
              RETAILER CHECKLIST
            </span>
            <h3 className="text-[17.5px] sm:text-[20px] font-black text-white m-0 mb-6 keep-all">
              {isKo ? "두피 케어를 통한 헤어 매출 확장을 위한 5단계 실행 플랜" : "5 Action Items for Scalp Care launch:"}
            </h3>
            
            <div className="flex flex-col gap-4 text-[13.5px] text-white/90">
              {[
                isKo ? "01 매장에 샴푸/가발을 사는 기존 Hair 고객의 소리(두피 건조, 열감 불만 등)를 파악" : "01 Ask active hair/wig buyers about scalp concerns (dryness, itching)",
                isKo ? "02 역할이 명확히 분담되는 3~5개 시범 큐레이션 제품군 선정" : "02 Select 3 to 5 key scalp-routine products to test",
                isKo ? "03 샴푸 전후 진열 흐름을 매대 조닝(Zoning)에 반영" : "03 Organize the shelf layout based on wash routines",
                isKo ? "04 매장 직원이 2가지 핵심 제품의 사용 용도를 설명할 수 있도록 숙지 교육" : "04 Train retail staff on the basic usage of core products",
                isKo ? "05 런칭 후 30/60/90일 단위의 판매 추이를 통해 큐레이션 최적화" : "05 Monitor sales data at Day 30, 60, and 90 to adjust assortment"
              ].map((check, idx) => (
                <div key={idx} className="flex gap-3.5 items-start">
                  <div className="w-5 h-5 rounded-[4px] border border-[#ff2b75]/35 bg-[#ff2b75]/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-[#ff2b75]">✓</div>
                  <span className="font-semibold leading-relaxed">{check}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 mt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-display font-black text-xs sm:text-sm text-[#ff2b75] uppercase tracking-wider select-none">
                The Opportunity May Already Be in Your Store.
              </span>
              <Link
                href={`/${locale}/simulator`}
                className="h-12 px-4 sm:px-6 w-full sm:w-auto rounded-[8px] bg-[#ff2b75] hover:bg-[#e01a5e] text-white font-black text-[11px] sm:text-[12.5px] tracking-wide inline-flex items-center justify-center transition-all duration-200 shrink-0 whitespace-nowrap"
              >
                {isKo ? "HAIR 강화형 Assortment 시뮬레이션 시작 →" : "Simulate Hair Assortment →"}
              </Link>
            </div>
          </div>

          {/* Previous / Next Insight Navigation */}
          <div className="grid sm:grid-cols-2 gap-6 my-12 border-t border-white/10 pt-12 select-none">
            <Link 
              href={`/${locale}/insights/k-beauty-4ft-start`}
              className="group bg-[#121214] border border-white/5 hover:border-[#ff2b75]/35 p-6 rounded-[20px] flex flex-col items-start text-left transition-all duration-300"
            >
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-2 flex items-center gap-1 transition-transform group-hover:-translate-x-1">
                ← PREVIOUS INSIGHT
              </span>
              <span className="text-[#7A7A7A] text-[9.5px] font-black tracking-widest uppercase font-display block mb-1">
                RETAIL PLAYBOOK
              </span>
              <span className="text-white group-hover:text-[#ff2b75] font-display text-[15px] font-black leading-snug transition-colors keep-all">
                {isKo ? "Beauty Supply Store에서 K-Beauty 4FT를 어떻게 시작할까?" : "How to Launch a 4FT K-Beauty Section in a Beauty Supply Store"}
              </span>
            </Link>
            <Link 
              href={`/${locale}/insights/inventory-turn`}
              className="group bg-[#121214] border border-white/5 hover:border-[#ff2b75]/35 p-6 rounded-[20px] flex flex-col items-end text-right transition-all duration-300"
            >
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-2 flex items-center gap-1 transition-transform group-hover:translate-x-1">
                NEXT INSIGHT →
              </span>
              <span className="text-[#7A7A7A] text-[9.5px] font-black tracking-widest uppercase font-display block mb-1">
                RETAIL PLAYBOOK
              </span>
              <span className="text-white group-hover:text-[#ff2b75] font-display text-[15px] font-black leading-snug transition-colors keep-all">
                {isKo ? "좋은 상품보다 중요한 것: Inventory Turn" : "What Matters More than Good Margins: Inventory Turnover Speed"}
              </span>
            </Link>
          </div>

          {/* Desktop Sticky Navigation */}
          <div className="hidden lg:flex fixed bottom-8 right-8 z-40 bg-[#121214]/90 backdrop-blur border border-white/10 rounded-full px-5 py-3 items-center gap-4.5 shadow-2xl text-[11px] font-black tracking-widest font-display text-white select-none">
            <Link 
              href={`/${locale}/insights/k-beauty-4ft-start`} 
              className="text-white/60 hover:text-[#ff2b75] transition-colors"
              title={isKo ? "K-Beauty 4FT Start" : "K-Beauty 4FT Start"}
            >
              ← PREV
            </Link>
            <span className="text-white/30">|</span>
            <span className="text-[#00f0ff]">05 / 06</span>
            <span className="text-white/30">|</span>
            <Link 
              href={`/${locale}/insights/inventory-turn`} 
              className="text-white/60 hover:text-[#ff2b75] transition-colors"
              title={isKo ? "Inventory Turn" : "Inventory Turn"}
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
                  <span className="text-white/90 font-bold block">Circana (전 NPD 그룹)</span>
                  <span className="text-[#7A7A7A] block mt-0.5">미국 화장품 시장 및 글로벌 헤어/두피 케어 부문 성장률 통계 분석 리포트 (2024)</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">02</span>
                <div>
                  <span className="text-white/90 font-bold block">Cosmetic Design USA</span>
                  <span className="text-[#7A7A7A] block mt-0.5">스킨화 트렌드와 헤어케어의 융합성(Hair-Skin Bridge) 소매 유통 분석 서베이</span>
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
