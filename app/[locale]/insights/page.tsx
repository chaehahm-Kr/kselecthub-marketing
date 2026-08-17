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
  params: Promise<{ locale?: string }>;
}

export default function InsightsLandingPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale === 'ko' ? 'ko' : 'en';
  const isKo = locale === "ko";

  const [activeTopic, setActiveTopic] = useState<string>("all");
  const [heroRef, heroVisible] = useIntersectionReveal();
  const [featuredRef, featuredVisible] = useIntersectionReveal();
  const [cardsRef, cardsVisible] = useIntersectionReveal();
  const [topicsRef, topicsVisible] = useIntersectionReveal();
  const [latestRef, latestVisible] = useIntersectionReveal();

  const [apiArticles, setApiArticles] = useState<any[]>([]);

  const VALID_IMAGES = [
    "/images/insights/kbeauty_2026_signals.jpg",
    "/images/insights/beauty_value_2026.jpg",
    "/images/insights/black_beauty_2026.jpg",
    "/images/insights/kbeauty_4ft_start.jpg",
    "/images/insights/scalp_care_bridge.jpg",
    "/images/insights/inventory_turn.jpg"
  ];

  const ARTICLE_THUMBNAIL_MAP: Record<string, string> = {
    "black-beauty-2026": "/images/insights/black_beauty_2026.jpg",
    "k-beauty-4ft-start": "/images/insights/kbeauty_4ft_start.jpg",
    "fda-mocra-customs-enforcement-alert-essential-compliance-checklist-for-korean-export-brands-u-s-store-buyers-2700":
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
    "independent-retailer-margins-reallocating-store-shelf-space-from-hair-extensions-to-high-velocity-korean-scalp-barrier-care-3107":
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop",
    "scalp-care-us-market-trend-deep-dive": "/images/insights/scalp_care_bridge.jpg",
    "why-good-products-fail-us-market-entry": "/images/insights/beauty_value_2026.jpg",
    "what-to-verify-with-300-unit-test-launch": "/images/insights/inventory_turn.jpg",
    "scalp-care-k-beauty-hair-opportunity":
      "https://images.unsplash.com/photo-1522337360788-8b13edd793be?q=80&w=1200&auto=format&fit=crop"
  };

  function getSafeHeroImage(rawImage: string | null | undefined, slug: string): string {
    if (ARTICLE_THUMBNAIL_MAP[slug]) {
      return ARTICLE_THUMBNAIL_MAP[slug];
    }
    if (rawImage && (rawImage.startsWith("http") || rawImage.startsWith("/images/"))) {
      return rawImage;
    }
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      hash += slug.charCodeAt(i);
    }
    return VALID_IMAGES[hash % VALID_IMAGES.length];
  }

  useEffect(() => {
    async function fetchHubPublishedInsights() {
      try {
        const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || "http://localhost:3010";
        const res = await fetch(`${portalUrl}/api/insights?channel=HUB`);
        if (res.ok) {
          const data = await res.json();
          if (data.articles && Array.isArray(data.articles)) {
            const mapped = data.articles.map((art: any) => {
              const cat = (art.category || "BEAUTY MARKET").toUpperCase();
              let topic = "market";
              if (cat.includes("PLAYBOOK") || cat.includes("STRATEGY")) topic = "playbook";
              else if (cat.includes("PRODUCT") || cat.includes("CATEGORY")) topic = "category";

              return {
                id: art.slug || art.id,
                slug: art.slug,
                topic,
                category: cat,
                titleKo: art.title_ko || art.title,
                titleEn: art.title_en || art.title,
                subtitleKo: art.summary_ko || art.excerpt || art.subtitle,
                subtitleEn: art.summary_en || art.subtitle || art.excerpt,
                metaKo: "K SELECT INSIGHTS · RETAILER INTELLIGENCE",
                metaEn: "K SELECT INSIGHTS · RETAILER INTELLIGENCE",
                img: getSafeHeroImage(art.hero_image, art.slug || art.id),
                isFeatured: art.featured === true
              };
            });
            setApiArticles(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to fetch Hub insights from Portal API:", err);
      }
    }
    fetchHubPublishedInsights();
  }, []);

  const topics = [
    { id: "all", labelKo: "전체보기", labelEn: "All Insights", isComing: false },
    { id: "market", labelKo: "Beauty 시장 & 소비자 트렌드", labelEn: "BEAUTY MARKET", isComing: false },
    { id: "category", labelKo: "상품 & 카테고리 인사이트", labelEn: "PRODUCT & CATEGORY", isComing: false },
    { id: "playbook", labelKo: "매장 운영 & 판매 전략", labelEn: "RETAIL PLAYBOOK", isComing: false },
    { id: "spotlight", labelKo: "선정 상품 분석", labelEn: "PRODUCT SPOTLIGHT", isComing: true },
    { id: "signal", labelKo: "Retail Data & Signals", labelEn: "K SELECT SIGNAL", isComing: true }
  ];

  const articles = apiArticles;

  // Select Hero Featured Article
  const featuredArticle = articles.find(a => a.isFeatured) || articles[0] || null;

  // Filter out Featured Hero Article from Grid below to eliminate double rendering
  const nonFeaturedArticles = featuredArticle
    ? articles.filter(a => a.id !== featuredArticle.id)
    : articles;

  const gridArticles = activeTopic === "all"
    ? nonFeaturedArticles
    : nonFeaturedArticles.filter(a => a.topic === activeTopic);

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0c] text-white font-sans overflow-x-hidden selection:bg-[#ff2b75] selection:text-white">
      <Header locale={locale} />

      <main className="flex-1">
        
        {/* ================= 01. HERO / MARKET SIGNALS ================= */}
        <section 
          ref={heroRef}
          className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] pt-10 sm:pt-14 pb-8 sm:pb-12 text-left scroll-mt-24"
        >
          <div className="max-w-[800px] flex flex-col gap-4">
            <span 
              className={`text-xs sm:text-[13px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display transition-all duration-500 transform ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              INSIGHTS
            </span>
            
            <h1 
              style={{ transitionDelay: "150ms" }}
              className={`font-display text-[28px] sm:text-[40px] lg:text-[44px] font-black leading-[1.18] text-white tracking-tight m-0 keep-all transition-all duration-700 transform ${
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
              className={`text-xs sm:text-sm font-semibold text-[#ff2b75] italic tracking-wider uppercase font-display m-0 transition-all duration-500 transform ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Know What’s Changing. Know What to Do Next.
            </p>
            
            <p 
              style={{ transitionDelay: "450ms" }}
              className={`text-[13px] sm:text-[14px] text-[#9ca3af] leading-relaxed font-semibold max-w-2xl m-0 mt-1 transition-all duration-600 transform ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {isKo ? (
                "Beauty 시장, 상품, 소비자 변화와 Retail 운영 데이터를 Independent Beauty Supply Owner가 실제 매장에서 활용할 수 있도록 분석하고 명확한 가이드라인으로 정리해 드립니다."
              ) : (
                "We translate beauty market trends, manufacturer specs, and customer demographics into clear operational guidance that independent store owners can execute immediately."
              )}
            </p>
          </div>
        </section>

        {/* ================= 02. FEATURED ARTICLE ================= */}
        {activeTopic === "all" && featuredArticle && (
          <section 
            ref={featuredRef}
            className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] pb-10 sm:pb-14 text-left scroll-mt-24"
          >
            <div 
              key={featuredArticle.id}
              className={`bg-[#121214] border border-white/5 hover:border-white/10 rounded-[28px] overflow-hidden grid lg:grid-cols-[1.15fr_0.85fr] items-stretch shadow-2xl relative group transition-all duration-700 transform ${
                featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="p-8 sm:p-14 flex flex-col justify-between items-start gap-8 z-10">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display">
                    {featuredArticle.category}
                  </span>
                  <h2 className="font-display text-[24px] sm:text-[32px] font-black leading-tight text-white tracking-tight m-0 group-hover:text-[#ff2b75] transition-colors keep-all">
                    {isKo ? featuredArticle.titleKo : featuredArticle.titleEn}
                  </h2>
                  <p className="text-[13px] sm:text-[13.5px] text-[#9ca3af] leading-relaxed font-semibold m-0 mt-1 keep-all">
                    {isKo ? featuredArticle.subtitleKo : featuredArticle.subtitleEn}
                  </p>
                </div>
                
                <div className="flex flex-col gap-5 w-full">
                  <span className="text-[10px] text-[#7A7A7A] font-black tracking-wider uppercase font-display">
                    {isKo ? featuredArticle.metaKo : featuredArticle.metaEn}
                  </span>
                  <Link
                    href={`/${locale}/insights/${featuredArticle.slug}`}
                    className="h-13 px-8 rounded-[8px] bg-[#ff2b75] hover:bg-[#e01a5e] active:scale-[0.985] text-white font-extrabold text-[13.5px] tracking-wide inline-flex items-center justify-center transition-all duration-200"
                  >
                    {isKo ? "인사이트 읽기 →" : "Read Insight →"}
                  </Link>
                </div>
              </div>

              <div className="relative aspect-[3/2] lg:aspect-auto w-full overflow-hidden border-t lg:border-t-0 lg:border-l border-white/5 bg-[#121214]">
                <img
                  src={featuredArticle.img}
                  alt=""
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = VALID_IMAGES[0];
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </section>
        )}

        {/* ================= 03. EXPLORE BY TOPIC TABS ================= */}
        <section 
          ref={topicsRef} 
          className="bg-[#121214] border-y border-[#222]"
        >
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] py-6 sm:py-8">
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-black text-[#00f0ff] tracking-[0.25em] uppercase font-display select-none">
                EXPLORE BY TOPIC
              </span>
              
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none select-none scroll-smooth">
                {topics.map((t) => {
                  const isActive = activeTopic === t.id;
                  return (
                    <button
                      key={t.id}
                      disabled={t.isComing}
                      onClick={() => setActiveTopic(t.id)}
                      className={`h-11 px-5 rounded-[8px] border text-xs font-black tracking-wide whitespace-nowrap transition-all duration-200 inline-flex items-center gap-2.5 ${
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
          className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] py-12 sm:py-16 text-left scroll-mt-24"
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
                  <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-white/5 bg-[#121214]">
                    <img
                      src={article.img}
                      alt=""
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = VALID_IMAGES[idx % VALID_IMAGES.length];
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/40 via-transparent to-transparent pointer-events-none" />
                  </div>

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
                      <span className="text-[9.5px] text-[#00f0ff] font-black tracking-wider uppercase font-display block">
                        {isKo ? article.metaKo : article.metaEn}
                      </span>
                      <Link
                        href={`/${locale}/insights/${article.slug}`}
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

        <PartnerModal />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
