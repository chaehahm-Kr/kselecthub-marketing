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

const FALLBACK_IMAGES = [
  "/images/insights/kbeauty_2026_signals.jpg",
  "/images/insights/beauty_value_2026.jpg",
  "/images/insights/black_beauty_2026.jpg",
  "/images/insights/kbeauty_4ft_start.jpg",
  "/images/insights/scalp_care_bridge.jpg",
  "/images/insights/inventory_turn.jpg"
];

const LEGACY_STATIC_ARTICLES: Record<string, any> = {
  "black-beauty-2026": {
    title_ko: "Black Beauty 2026: 온라인이 커져도, 매장이 더 중요해지는 이유",
    title_en: "Black Beauty 2026: Why Stores Matter More as Online Grows",
    summary_ko: "고객은 온라인에서 제품을 발견하지만, 모든 구매 결정이 온라인에서 끝나는 것은 아닙니다. Beauty Supply Store가 다시 생각해야 할 것은 ‘상품 수’보다 ‘매장의 역할’입니다.",
    summary_en: "Shoppers discover products online, but they don't always finish decisions there. Retailers must rethink the role of the physical store rather than sheer SKU quantity.",
    category: "BEAUTY MARKET",
    hero_image: "/images/insights/black_beauty_2026.jpg",
    author: "K SELECT MARKET RESEARCH",
    retailer_takeaway: "온라인 채널 확대에도 불고하고 오프라인 매장은 고객의 피부 톤, 제형 체험, 현장 상담이 일어나는 핵심 의사결정 공간입니다.",
    retailer_actions: [
      { ko: "01 방문 고객이 가장 자주 묻는 비-헤어(Non-Hair) 품목 Top 3 기록", en: "01 Note the top three non-hair items shoppers ask for during visits" },
      { ko: "02 매장에서 고객이 스마트폰 화면을 켜서 보여주며 묻는 특정 제품/성분 확인", en: "02 Log the ingredients or internet photos clients show on their mobile screens" },
      { ko: "03 대기 시간이나 질문이 가장 자주 관찰되는 핵심 매대 3곳 파악", en: "03 Track the specific shelves where customers linger or ask for helper assistance" }
    ],
    sources: [
      "NielsenIQ (NIQ) - Where Culture Meets Care: Inside Today's Black Beauty Landscape",
      "NielsenIQ Global Retail Survey - Beauty in 2026: Global shifts. Local realities."
    ]
  },
  "beauty-value-2026": {
    title_ko: "가격을 낮추는 게 답은 아닙니다: 2026 Beauty 고객이 말하는 ‘Value’의 기준",
    title_en: "Lowering Prices Is Not the Answer: How Beauty Shoppers Define Value",
    summary_ko: "Value는 가장 싼 가격이 아닙니다. 고객이 “이 가격이면 살 이유가 있다”고 느끼는 순간에 만들어집니다.",
    summary_en: "Value is not the lowest price index. It is created the instant a customer recognizes a clear justification to buy.",
    category: "RETAIL PLAYBOOK",
    hero_image: "/images/insights/beauty_value_2026.jpg",
    author: "PRICING & MERCHANDISING DESK",
    retailer_takeaway: "가격 할인 경쟁 대신 세그먼트별 명확한 Price Ladder(Entry, Core, Premium)를 구축하여 객단가를 높여야 합니다.",
    retailer_actions: [
      { ko: "01 $10-$18 Entry, $18-$32 Core, $32+ Premium 가격 사다리 구성", en: "01 Set up $10-$18 Entry, $18-$32 Core, $32+ Premium price tiers" },
      { ko: "02 마진율 50%+ 확보 제품을 메인 4FT에 배치", en: "02 Feature 50%+ margin products on prime 4FT endcaps" }
    ],
    sources: [
      "Circana Group Inc. - Beauty in 2026: How Value, Wellness, and Tech Are Writing the Next Chapter",
      "Circana Beauty Operations Tracker - U.S. Beauty Industry Growth"
    ]
  },
  "k-beauty-2026-signals": {
    title_ko: "K-Beauty 2026: 지금 봐야 할 3가지 신호, 따라가지 않아도 될 3가지 유행",
    title_en: "K-Beauty 2026: 3 Signals to Track, 3 Trends to Ignore",
    summary_ko: "K-Beauty가 빠르게 성장하고 있다는 것과, 모든 K-Beauty 제품이 내 매장에 필요하다는 것은 전혀 다른 이야기입니다.",
    summary_en: "K-Beauty's macro growth and your local counter needs are completely separate queries. Focus on what translates locally.",
    category: "BEAUTY MARKET",
    hero_image: "/images/insights/kbeauty_2026_signals.jpg",
    author: "K SELECT RESEARCH TEAM",
    retailer_takeaway: "단순한 SNS 일회성 유행을 쫓기보다 상권 Demographics에 맞는 3가지 지속 가능한 K-Beauty 신호에 집중하세요.",
    retailer_actions: [
      { ko: "01 스킨바리어 & 세라마이드 고기능성 라인 유치", en: "01 Stock barrier repair & ceramide functional skincare" },
      { ko: "02 Clear MSRP 라벨링 및 모방 방지 영문 설명 제공", en: "02 Provide clear MSRP labeling and English product guides" }
    ],
    sources: [
      "NielsenIQ (NIQ) Market Intelligence - K-Beauty Goes Global",
      "Letusto Independent Beauty Retailer Network Survey 2025"
    ]
  },
  "k-beauty-4ft-start": {
    title_ko: "Beauty Supply Store에서 K-Beauty 4FT를 어떻게 시작할까?",
    title_en: "How to Launch a 4FT K-Beauty Section in a Beauty Supply Store",
    summary_ko: "처음부터 많은 제품을 넣는 것이 정답은 아닙니다. 중요한 것은 매장에 맞는 카테고리, 가격대, SKU와 재고를 설계하는 것입니다.",
    summary_en: "Start smart, not oversized. Design the target categories, pricing tiers, SKUs, and inventory flows matched to your store's demographics.",
    category: "RETAIL PLAYBOOK",
    hero_image: "/images/insights/kbeauty_4ft_start.jpg",
    author: "RETAIL OPERATIONS MANUAL",
    retailer_takeaway: "4피트 전용 fixture를 기반으로 최적화된 AP(Assortment Profile) 큐레이션을 적용하여 고회전 재고 순환을 달성합니다.",
    retailer_actions: [
      { ko: "01 4FT 전용 매대 영역 확보", en: "01 Allocate a dedicated 4FT display fixture" },
      { ko: "02 매장 상권 분석을 통한 AP 유형 선정", en: "02 Select matching Assortment Profile (AP) for your area" }
    ],
    sources: [
      "K SELECT Growth Simulator Optimization Database",
      "Letusto U.S. Beauty Supply Foot Traffic Report"
    ]
  },
  "scalp-care-bridge": {
    title_ko: "Scalp Care: Hair 고객을 K-Beauty 고객으로 연결할 수 있을까?",
    title_en: "Scalp Care: Can We Bridge Hair Customers to K-Beauty Customers?",
    summary_ko: "기존 Hair Extension 및 헤어 케어 구매 고객을 고마진 K-Beauty 스칼프 & 스킨케어 카테고리로 교차 판매(Cross-sell)하는 노하우.",
    summary_en: "Cross-selling existing hair extension shoppers into high-margin K-Beauty scalp & barrier skincare products.",
    category: "PRODUCT & CATEGORY",
    hero_image: "/images/insights/scalp_care_bridge.jpg",
    author: "CATEGORY GROWTH GROUP",
    retailer_takeaway: "헤어와 스킨케어의 교차 지점인 두피 케어(Scalp Care) 제품군을 통해 기존 헤어 고객의 장바구니 단가를 증대시킵니다.",
    retailer_actions: [
      { ko: "01 헤어케어 매대 바로 옆에 스칼프 세럼 배치", en: "01 Position scalp serums right next to hair care displays" },
      { ko: "02 두피 각질 제거제 + 샴푸 묶음 구성", en: "02 Bundle scalp exfoliator with premium shampoo" }
    ],
    sources: [
      "Circana (전 NPD 그룹) 글로벌 헤어/두피 케어 성장률 리포트",
      "Cosmetic Design USA 스킨화 트렌드 서베이"
    ]
  },
  "inventory-turn": {
    title_ko: "좋은 상품보다 중요한 것: Inventory Turn",
    title_en: "What Matters More than Good Margins: Inventory Turnover Speed",
    summary_ko: "단순 마진율보다 재고 회전 속도가 매장 순이익을 결정합니다.",
    summary_en: "Inventory turnover speed dictates net profit far more than initial gross margin percentages.",
    category: "RETAIL PLAYBOOK",
    hero_image: "/images/insights/inventory_turn.jpg",
    author: "FINANCIAL & INVENTORY OPERATIONS",
    retailer_takeaway: "매대에 오래 방치되는 악성 재고 대신 30-60일 내 고속 회전하는 K-Beauty SKU로 선반을 재배치하십시오.",
    retailer_actions: [
      { ko: "01 90일 이상 미판매 SKU 퇴출", en: "01 Clear out non-moving SKUs older than 90 days" },
      { ko: "02 고회전 K-Beauty 베스트셀러 20개 SKU로 대체", en: "02 Replace with top 20 fast-turning K-Beauty SKUs" }
    ],
    sources: [
      "K SELECT Growth Simulator Optimization Database",
      "Retail Inventory Operations Handbook 2026"
    ]
  }
};

function getSafeHeroImage(rawImage: string | null | undefined, slug: string): string {
  if (rawImage && (rawImage.startsWith("http") || rawImage.startsWith("/images/"))) {
    return rawImage;
  }
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash += slug.charCodeAt(i);
  }
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length];
}

interface PageProps {
  params: Promise<{ locale?: string; slug: string }>;
}

export default function DynamicInsightDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale === "ko" ? "ko" : "en";
  const slug = resolvedParams.slug;
  const isKo = locale === "ko";

  const [article, setArticle] = useState<any | null>(null);
  const [prevArticle, setPrevArticle] = useState<any | null>(null);
  const [nextArticle, setNextArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [heroImageSrc, setHeroImageSrc] = useState<string>("/images/insights/kbeauty_2026_signals.jpg");
  const [takeawayRef, takeawayVisible] = useIntersectionReveal();

  useEffect(() => {
    async function fetchArticleDetail() {
      setLoading(true);
      setError(null);
      try {
        const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || "http://localhost:3010";
        const res = await fetch(`${portalUrl}/api/insights?slug=${encodeURIComponent(slug)}&channel=HUB`);
        if (res.ok) {
          const data = await res.json();
          if (data.article) {
            setArticle(data.article);
            setPrevArticle(data.prevArticle || null);
            setNextArticle(data.nextArticle || null);
            setHeroImageSrc(getSafeHeroImage(data.article.hero_image, slug));
          } else if (LEGACY_STATIC_ARTICLES[slug]) {
            setArticle(LEGACY_STATIC_ARTICLES[slug]);
            setHeroImageSrc(getSafeHeroImage(LEGACY_STATIC_ARTICLES[slug].hero_image, slug));
          } else {
            setError("Article not found");
          }
        } else if (LEGACY_STATIC_ARTICLES[slug]) {
          setArticle(LEGACY_STATIC_ARTICLES[slug]);
          setHeroImageSrc(getSafeHeroImage(LEGACY_STATIC_ARTICLES[slug].hero_image, slug));
        } else {
          setError("Failed to load article");
        }
      } catch (err) {
        console.error("Error fetching article detail:", err);
        if (LEGACY_STATIC_ARTICLES[slug]) {
          setArticle(LEGACY_STATIC_ARTICLES[slug]);
          setHeroImageSrc(getSafeHeroImage(LEGACY_STATIC_ARTICLES[slug].hero_image, slug));
        } else {
          setError("Error connecting to server");
        }
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchArticleDetail();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0c0c0c] text-white font-sans">
        <Header locale={locale} />
        <main className="flex-1 max-w-[900px] mx-auto px-6 py-32 text-center">
          <div className="w-10 h-10 border-2 border-[#ff2b75] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-sm font-semibold text-[#7A7A7A]">
            {isKo ? "인사이트를 불러오는 중입니다..." : "Loading Insight Article..."}
          </p>
        </main>
        <Footer locale={locale} />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0c0c0c] text-white font-sans">
        <Header locale={locale} />
        <main className="flex-1 max-w-[900px] mx-auto px-6 py-32 text-center">
          <h1 className="text-2xl font-black text-white mb-4">
            {isKo ? "아티클을 찾을 수 없습니다." : "Insight Article Not Found"}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-8">
            {isKo ? "요청하신 아티클이 존재하지 않거나 삭제되었습니다." : "The requested insight article could not be located."}
          </p>
          <Link
            href={`/${locale}/insights`}
            className="h-12 px-6 rounded-[8px] bg-[#ff2b75] text-white font-bold text-xs inline-flex items-center justify-center"
          >
            {isKo ? "← 인사이트 목록으로 돌아가기" : "← Back to Insights Overview"}
          </Link>
        </main>
        <Footer locale={locale} />
      </div>
    );
  }

  const title = isKo ? (article.title_ko || article.title) : (article.title_en || article.title);
  const subtitle = isKo ? (article.summary_ko || article.subtitle || article.excerpt) : (article.summary_en || article.subtitle || article.excerpt);
  const category = article.category || "BEAUTY MARKET";
  const author = article.author || "K SELECT INSIGHTS TEAM";
  const publishDate = article.publish_date
    ? new Date(article.publish_date).toLocaleDateString(isKo ? "ko-KR" : "en-US", { year: "numeric", month: "short", day: "numeric" })
    : "2026";

  const retailerTakeaway = isKo
    ? (article.hub_retailer_takeaway_ko || article.retailer_takeaway || "매장 운영 점주를 위한 핵심 실행 포인트")
    : (article.hub_retailer_takeaway_en || article.retailer_takeaway || "Key actionable takeaways for store management");

  const retailerActions = isKo
    ? (article.hub_retailer_actions_ko || article.retailer_actions || [])
    : (article.hub_retailer_actions_en || article.retailer_actions || []);

  const rawBlocks = isKo
    ? (article.body_blocks_ko && article.body_blocks_ko.length > 0 ? article.body_blocks_ko : article.body_blocks)
    : (article.body_blocks_en && article.body_blocks_en.length > 0 ? article.body_blocks_en : (article.body_blocks_ko || article.body_blocks));
  const bodyBlocks = Array.isArray(rawBlocks) ? rawBlocks : [];
  const sources = Array.isArray(article.sources) ? article.sources : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0c] text-white font-sans overflow-x-hidden selection:bg-[#ff2b75] selection:text-white">
      <Header locale={locale} />

      <main className="flex-1">
        {/* ================= ARTICLE HEADER ================= */}
        <section className="max-w-[900px] mx-auto px-6 sm:px-12 pt-16 sm:pt-24 text-left">
          <div className="flex flex-col gap-4 mb-8">
            <span className="text-[10px] sm:text-[11px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display select-none">
              {category}
            </span>
            <h1 className="font-display text-[26px] sm:text-[38px] lg:text-[42px] font-black leading-tight text-white tracking-tight m-0 keep-all">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[14px] sm:text-[16px] text-[#9ca3af] leading-relaxed font-semibold m-0 mt-2 keep-all">
                {subtitle}
              </p>
            )}
            <div className="flex items-center gap-4 text-[10.5px] text-[#7A7A7A] font-black uppercase tracking-wider font-display mt-4 border-b border-white/10 pb-6 select-none">
              <span>{publishDate}</span>
              <span>•</span>
              <span>BY {author}</span>
              <span>•</span>
              <span>K SELECT HUB</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden border border-white/10 shadow-2xl group mb-16 bg-[#121214]">
            <img
              src={heroImageSrc}
              alt=""
              onError={() => setHeroImageSrc(FALLBACK_IMAGES[0])}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ================= ARTICLE BODY ================= */}
        <section className="max-w-[700px] mx-auto px-6 sm:px-12 text-left text-[14.5px] sm:text-[15px] text-white/80 leading-relaxed font-normal pb-24">
          
          {/* Render Body Blocks if present */}
          {bodyBlocks.length > 0 ? (
            <div className="flex flex-col gap-6">
              {bodyBlocks.map((block: any, idx: number) => {
                if (block.type === "HEADING") {
                  return (
                    <h2 key={idx} className="text-[20px] sm:text-[24px] font-black text-white tracking-tight leading-tight mt-6 mb-2 keep-all">
                      {block.value}
                    </h2>
                  );
                } else if (block.type === "QUOTE") {
                  return (
                    <blockquote key={idx} className="border-l-2 border-[#ff2b75] pl-5 my-6 py-1 italic text-white/90 text-[15px] sm:text-[16px] font-medium">
                      "{block.value}"
                      {block.author && <span className="block text-xs font-bold text-[#ff2b75] not-italic mt-2 font-display uppercase tracking-wider">— {block.author}</span>}
                    </blockquote>
                  );
                } else if (block.type === "CHECKLIST" && Array.isArray(block.items)) {
                  return (
                    <div key={idx} className="bg-[#121214] border border-white/10 rounded-[16px] p-6 my-6">
                      {block.title && <h4 className="text-xs font-black text-[#ff2b75] uppercase tracking-wider font-display mb-4">{block.title}</h4>}
                      <ul className="flex flex-col gap-3 m-0 p-0 list-none text-xs font-semibold text-white/90">
                        {block.items.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="text-[#ff2b75] font-black">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                } else if (block.type === "MARKET_DATA" && Array.isArray(block.headers) && Array.isArray(block.rows)) {
                  return (
                    <div key={idx} className="overflow-x-auto my-6 border border-white/10 rounded-[16px] bg-[#121214] p-4">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-[#00f0ff] font-display font-black uppercase">
                            {block.headers.map((h: string, i: number) => (
                              <th key={i} className="pb-3 px-3">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-semibold text-white/80">
                          {block.rows.map((row: string[], ri: number) => (
                            <tr key={ri}>
                              {row.map((cell: string, ci: number) => (
                                <td key={ci} className="py-3 px-3 whitespace-nowrap">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                } else if (block.type === "KEY_TAKEAWAY") {
                  return (
                    <div key={idx} className="p-6 rounded-[16px] bg-[#ff2b75]/10 border border-[#ff2b75]/30 text-white my-6 font-semibold leading-relaxed">
                      <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display block mb-2">KEY TAKEAWAY</span>
                      {block.value}
                    </div>
                  );
                }
                return (
                  <p key={idx} className="m-0 keep-all">
                    {block.value || (typeof block === "string" ? block : "")}
                  </p>
                );
              })}
            </div>
          ) : (
            /* Fallback formatted excerpt / body text */
            <div className="flex flex-col gap-6 text-white/90 font-medium">
              <p className="m-0 keep-all text-[15.5px] sm:text-[17px] leading-relaxed">
                {subtitle || (isKo ? "미국 뷰티 시장에서 소매업체가 주목해야 할 핵심 시장 신호 및 실행 가이드라인입니다." : "Actionable market signals and store guidance for independent beauty supply operators.")}
              </p>
              {article.excerpt && article.excerpt !== subtitle && (
                <p className="m-0 keep-all leading-relaxed">
                  {article.excerpt}
                </p>
              )}
            </div>
          )}

          {/* RETAILER TAKEAWAY CHECKLIST */}
          {(retailerTakeaway || retailerActions.length > 0) && (
            <div 
              ref={takeawayRef}
              className={`border border-[#ff2b75]/25 bg-[#121214] rounded-[24px] p-7.5 sm:p-9.5 my-12 transition-all duration-700 transform ${
                takeawayVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
              }`}
            >
              <span className="text-[10px] text-[#ff2b75] font-black tracking-[0.2em] uppercase font-display block mb-2 select-none">
                RETAILER CHECKLIST
              </span>
              <h3 className="font-display text-[18px] sm:text-[21px] font-black text-white tracking-tight m-0 mb-4 keep-all">
                {isKo ? "이 인사이트를 내 매장에 적용하기 전 점검할 5가지" : "Store Action Checklist"}
              </h3>
              <p className="text-[13px] text-[#9ca3af] font-semibold leading-relaxed m-0 mb-6 keep-all">
                {retailerTakeaway}
              </p>

              {retailerActions.length > 0 && (
                <div className="flex flex-col gap-3.5 pt-4 border-t border-white/10 text-[13px] text-white/90">
                  {retailerActions.map((check: any, idx: number) => (
                    <div key={idx} className="flex gap-3.5 items-start">
                      <div className="w-5 h-5 rounded-[4px] border border-[#ff2b75]/35 bg-[#ff2b75]/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-[#ff2b75] font-black">
                        ✓
                      </div>
                      <span className="font-semibold leading-relaxed">
                        {typeof check === "string" ? check : (isKo ? check.ko || check.en : check.en || check.ko)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= CENTRALIZED READER FEEDBACK ================= */}
          <ReaderFeedback articleId={slug} locale={locale} channel="HUB" />

          {/* ================= PREVIOUS / NEXT NAVIGATION ================= */}
          <div className="grid sm:grid-cols-2 gap-6 my-12 border-t border-white/10 pt-12 select-none">
            {prevArticle ? (
              <Link 
                href={`/${locale}/insights/${prevArticle.slug}`}
                className="group bg-[#121214] border border-white/5 hover:border-[#ff2b75]/35 p-6 rounded-[20px] flex flex-col items-start text-left transition-all duration-300"
              >
                <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-2 flex items-center gap-1 transition-transform group-hover:-translate-x-1">
                  ← PREVIOUS INSIGHT
                </span>
                <span className="text-white group-hover:text-[#ff2b75] font-display text-[14px] font-black leading-snug transition-colors keep-all line-clamp-2">
                  {prevArticle.title}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextArticle ? (
              <Link 
                href={`/${locale}/insights/${nextArticle.slug}`}
                className="group bg-[#121214] border border-white/5 hover:border-[#ff2b75]/35 p-6 rounded-[20px] flex flex-col items-end text-right transition-all duration-300"
              >
                <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-2 flex items-center gap-1 transition-transform group-hover:translate-x-1">
                  NEXT INSIGHT →
                </span>
                <span className="text-white group-hover:text-[#ff2b75] font-display text-[14px] font-black leading-snug transition-colors keep-all line-clamp-2">
                  {nextArticle.title}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
          </div>

          {/* ================= SOURCES & REFERENCES ================= */}
          {sources.length > 0 && (
            <div className="border-t border-white/10 pt-8 mt-16 text-[12px] text-[#7A7A7A] select-none font-medium">
              <span className="block text-white/50 tracking-wider uppercase font-display text-[10px] font-black mb-3">SOURCES & REFERENCES</span>
              <div className="flex flex-col gap-4">
                {sources.map((src: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-[#00f0ff] font-display text-[10px] font-black border border-[#00f0ff]/20 bg-[#00f0ff]/5 px-1.5 py-0.5 rounded-[4px]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="text-white/90 font-bold block">
                        {typeof src === "string" ? src : src.title || src.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>

        <PartnerModal />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
