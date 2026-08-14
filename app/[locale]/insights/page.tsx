"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";
import PartnerModal from "../PartnerModal";

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

export default function InsightsLandingPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isKo = locale === "ko";

  const [activeTopic, setActiveTopic] = useState<string>("all");
  const [heroRef, heroVisible] = useIntersectionReveal();
  const [featuredRef, featuredVisible] = useIntersectionReveal();
  const [cardsRef, cardsVisible] = useIntersectionReveal();
  const [topicsRef, topicsVisible] = useIntersectionReveal();

  const topics = [
    { id: "all", labelKo: "전체보기", labelEn: "All Insights", isComing: false },
    { id: "market", labelKo: "K-Beauty 시장 & 트렌드", labelEn: "K-Beauty Market", isComing: true },
    { id: "category", labelKo: "상품 & 카테고리 인사이트", labelEn: "Product & Category", isComing: false },
    { id: "playbook", labelKo: "매장 운영 & 판매 전략", labelEn: "Retail Playbook", isComing: false },
    { id: "spotlight", labelKo: "선정 상품 분석", labelEn: "Product Spotlight", isComing: true },
    { id: "signal", labelKo: "Retail Data & Signals", labelEn: "K Select Signal", isComing: true }
  ];

  // Articles configurations
  const articles = [
    {
      id: "k-beauty-4ft-start",
      topic: "playbook",
      category: "RETAIL PLAYBOOK",
      titleKo: "Beauty Supply Store에서 K-Beauty 4FT를 어떻게 시작할까?",
      titleEn: "How to Launch a 4FT K-Beauty Section in a Beauty Supply Store",
      subtitleKo: "처음부터 많은 제품을 넣는 것이 정답은 아닙니다. 중요한 것은 매장에 맞는 카테고리, 가격대, SKU와 재고를 설계하는 것입니다.",
      subtitleEn: "Start smart, not oversized. Design the target categories, pricing tiers, SKUs, and inventory flows matched to your store's demographics.",
      metaKo: "5 MIN READ · RETAIL PLAYBOOK",
      metaEn: "5 MIN READ · RETAIL PLAYBOOK",
      img: "/images/insights/kbeauty_4ft_start.jpg",
      isFeatured: true
    },
    {
      id: "scalp-care-bridge",
      topic: "category",
      category: "PRODUCT & CATEGORY",
      titleKo: "Scalp Care: Hair 고객을 K-Beauty 고객으로 연결할 수 있을까?",
      titleEn: "Scalp Care: Can We Bridge Hair Customers to K-Beauty Customers?",
      subtitleKo: "Beauty Supply가 이미 잘 알고 있는 Hair 고객. K-Beauty의 새로운 성장 기회는 그 고객에게서 시작될 수도 있습니다.",
      subtitleEn: "Connect with the hair shoppers already in your store. The next growth frontier in K-Beauty starts from existing hair routines.",
      metaKo: "4 MIN READ · CATEGORY INSIGHT",
      metaEn: "4 MIN READ · CATEGORY INSIGHT",
      img: "/images/insights/scalp_care_bridge.jpg",
      isFeatured: false
    },
    {
      id: "inventory-turn",
      topic: "playbook",
      category: "RETAIL PLAYBOOK",
      titleKo: "좋은 상품보다 중요한 것: Inventory Turn",
      titleEn: "What Matters More than Good Margins: Inventory Turnover Speed",
      subtitleKo: "마진이 높아도 팔리지 않으면 현금은 Shelf 위에 멈춰 있습니다. Retail의 중요한 질문은 “얼마를 남기나?”와 함께 “얼마나 빨리 다시 파나?”입니다.",
      subtitleEn: "Cash remains frozen on shelves if products sit slow. The vital retail diagnostic combines margin size with transaction velocity.",
      metaKo: "5 MIN READ · RETAIL MANAGEMENT",
      metaEn: "5 MIN READ · RETAIL MANAGEMENT",
      img: "/images/insights/inventory_turn.jpg",
      isFeatured: false
    }
  ];

  const gridArticles = activeTopic === "all" 
    ? articles.filter(a => !a.isFeatured) 
    : articles.filter(a => a.topic === activeTopic && !a.isFeatured);

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0c] text-white font-sans overflow-x-hidden selection:bg-[#ff2b75] selection:text-white">
      
      {/* Header Navigation */}
      <Header locale={locale} />

      <main className="flex-1">
        
        {/* ================= 01. HERO / MARKET SIGNALS ================= */}
        <section 
          ref={heroRef}
          className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] py-16 sm:py-24 text-left scroll-mt-24"
        >
          <div className="max-w-[800px] flex flex-col gap-5">
            <span 
              className={`text-xs sm:text-[13px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display transition-all duration-500 transform ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              INSIGHTS
            </span>
            
            <h1 
              style={{ transitionDelay: "150ms" }}
              className={`font-display text-[30px] sm:text-[44px] lg:text-[46px] font-black leading-[1.18] text-white tracking-tight m-0 keep-all transition-all duration-700 transform ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {isKo ? (
                <>시장 정보를,<br /> 매장의 <span className="text-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.15)]">다음 행동</span>으로 바꿉니다.</>
              ) : (
                <>From Market Signals<br /> to <span className="text-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.15)]">Store Decisions</span>.</>
              )}
            </h1>
            
            <p 
              style={{ transitionDelay: "300ms" }}
              className={`text-sm font-semibold text-[#ff2b75] italic tracking-wider uppercase font-display m-0 transition-all duration-500 transform ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Know What’s Changing. Know What to Do Next.
            </p>
            
            <p 
              style={{ transitionDelay: "450ms" }}
              className={`text-[13.5px] sm:text-[14.5px] text-[#9ca3af] leading-relaxed font-semibold max-w-2xl m-0 mt-1 transition-all duration-600 transform ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {isKo ? (
                "K-Beauty 시장, 상품, 소비자 변화와 Retail 운영 데이터를 Independent Beauty Supply Owner가 실제 매장에서 활용할 수 있도록 분석하고 명확한 가이드라인으로 정리해 드립니다."
              ) : (
                "We translate K-Beauty trends, manufacturer specs, and customer demographics into clear operational guidance that independent store owners can execute immediately."
              )}
            </p>
          </div>
        </section>

        {/* ================= 02. FEATURED ARTICLE ================= */}
        {activeTopic === "all" && (
          <section 
            ref={featuredRef}
            className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] pb-16 sm:pb-24 text-left scroll-mt-24"
          >
            {articles.filter(a => a.isFeatured).map((article) => (
              <div 
                key={article.id}
                className={`bg-[#121214] border border-white/5 hover:border-white/10 rounded-[28px] overflow-hidden grid lg:grid-cols-[1.15fr_0.85fr] items-stretch shadow-2xl relative group transition-all duration-700 transform ${
                  featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                
                {/* Left side detail info */}
                <div className="p-8 sm:p-14 flex flex-col justify-between items-start gap-8 z-10">
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display">
                      {article.category}
                    </span>
                    <h2 className="font-display text-[24px] sm:text-[32px] font-black leading-tight text-white tracking-tight m-0 group-hover:text-[#ff2b75] transition-colors keep-all">
                      {isKo ? article.titleKo : article.titleEn}
                    </h2>
                    <p className="text-[13px] sm:text-[13.5px] text-[#9ca3af] leading-relaxed font-semibold m-0 mt-1 keep-all">
                      {isKo ? article.subtitleKo : article.subtitleEn}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-5 w-full">
                    <span className="text-[10px] text-[#7A7A7A] font-black tracking-wider uppercase font-display">
                      {isKo ? article.metaKo : article.metaEn}
                    </span>
                    <Link
                      href={`/${locale}/insights/${article.id}`}
                      className="h-13 px-8 rounded-[8px] bg-[#ff2b75] hover:bg-[#e01a5e] active:scale-[0.985] text-white font-extrabold text-[13.5px] tracking-wide inline-flex items-center justify-center transition-all duration-200"
                    >
                      {isKo ? "인사이트 읽기 →" : "Read Insight →"}
                    </Link>
                  </div>
                </div>

                {/* Right side Cover Graphic */}
                <div className="relative aspect-[3/2] lg:aspect-auto w-full overflow-hidden border-t lg:border-t-0 lg:border-l border-white/5">
                  <Image
                    src={article.img}
                    alt={article.titleKo}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/40 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            ))}
          </section>
        )}

        {/* ================= 03. EXPLORE BY TOPIC TABS ================= */}
        <section 
          ref={topicsRef} 
          className="bg-[#121214] border-y border-[#222]"
        >
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] py-10">
            <div className="flex flex-col gap-5">
              <span className="text-[11px] font-black text-[#00f0ff] tracking-[0.25em] uppercase font-display select-none">
                EXPLORE BY TOPIC
              </span>
              
              {/* Category Horizontal Scroll tab row */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none select-none scroll-smooth">
                {topics.map((t) => {
                  const isActive = activeTopic === t.id;
                  return (
                    <button
                      key={t.id}
                      disabled={t.isComing}
                      onClick={() => setActiveTopic(t.id)}
                      className={`h-12 px-6 rounded-[8px] border text-xs font-black tracking-wide whitespace-nowrap transition-all duration-200 inline-flex items-center gap-2.5 ${
                        t.isComing 
                          ? "bg-[#0c0c0c]/30 border-white/5 text-[#444] cursor-not-allowed" 
                          : isActive
                            ? "bg-[#ff2b75]/8 border-[#ff2b75] text-[#ff2b75]"
                            : "bg-[#0c0c0c] border-white/5 text-[#7A7A7A] hover:border-white/10 hover:text-white cursor-pointer"
                      }`}
                    >
                      {isKo ? t.labelKo : t.labelEn}
                      {t.isComing && (
                        <span className="text-[9px] font-bold border border-white/10 text-white/30 px-1.5 py-0.5 rounded-[4px] uppercase font-display bg-white/[0.02]">
                          Soon
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 04. TRENDING ARTICLES GRID ================= */}
        <section 
          ref={cardsRef} 
          className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] py-20 text-left scroll-mt-24"
        >
          {gridArticles.length === 0 ? (
            <div className="text-center py-20 border border-white/5 rounded-[20px] bg-[#121214]/30">
              <p className="text-[14px] text-[#7A7A7A] font-semibold">
                {isKo ? "해당 주제의 아티클이 준비 중입니다." : "Articles under this topic are coming soon."}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridArticles.map((article, idx) => (
                <div 
                  key={article.id}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                  className={`bg-[#121214] border border-white/5 hover:border-white/10 rounded-[24px] overflow-hidden flex flex-col justify-between shadow-xl group transition-all duration-700 transform ${
                    cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  
                  {/* Card Cover image */}
                  <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-white/5">
                    <Image
                      src={article.img}
                      alt={article.titleKo}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Card descriptions */}
                  <div className="p-6.5 flex flex-col justify-between items-start gap-6 flex-1">
                    <div className="flex flex-col gap-3">
                      <span className="text-[9.5px] text-[#ff2b75] font-black tracking-widest uppercase font-display">
                        {article.category}
                      </span>
                      <h3 className="font-display text-[17.5px] font-black leading-snug text-white tracking-tight m-0 group-hover:text-[#ff2b75] transition-colors keep-all">
                        {isKo ? article.titleKo : article.titleEn}
                      </h3>
                      <p className="text-[12.5px] text-[#9ca3af] leading-relaxed font-semibold m-0 mt-1 keep-all">
                        {isKo ? article.subtitleKo : article.subtitleEn}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 w-full mt-2">
                      <span className="text-[9.5px] text-[#7A7A7A] font-black tracking-wider uppercase font-display block">
                        {isKo ? article.metaKo : article.metaEn}
                      </span>
                      <Link
                        href={`/${locale}/insights/${article.id}`}
                        className="h-12 px-6 w-full rounded-[8px] border border-[#ff2b75]/35 hover:bg-[#ff2b75] text-[#ff2b75] hover:text-white font-extrabold text-[12.5px] tracking-wide inline-flex items-center justify-center transition-all duration-200"
                      >
                        {isKo ? "인사이트 읽기 →" : "Read Insight →"}
                      </Link>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>

        {/* Apply Partner Form popup modal */}
        <PartnerModal />

      </main>

      {/* Footer */}
      <Footer locale={locale} />

    </div>
  );
}
