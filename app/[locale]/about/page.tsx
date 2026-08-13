import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";
import PartnerModal from "../PartnerModal";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  const isKo = locale === "ko";

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0c] text-white font-sans overflow-x-hidden selection:bg-[#ff2b75] selection:text-white">
      
      {/* Navigation Header */}
      <Header locale={locale} />

      <main className="flex-1">
        
        {/* ================= 01. HERO / ABOUT US ================= */}
        <section id="about-hero" className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] py-16 sm:py-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center text-left">
          {/* Left Column: Copywriting */}
          <div className="flex flex-col gap-5">
            <span className="text-xs sm:text-[13px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display">
              ABOUT US
            </span>
            <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[48px] font-black leading-[1.18] text-white tracking-tight m-0 select-none">
              {isKo ? (
                <>우리는 리테일을 조사만 한 것이 아니라,<br className="hidden sm:inline" /> 직접 운영해왔습니다.</>
              ) : (
                <>We Don't Just Research Retail.<br className="hidden sm:inline" /> We Live It.</>
              )}
            </h1>
            <p className="text-sm font-semibold text-[#ff2b75] italic tracking-wide uppercase font-display m-0">
              We Know Retail Because We’ve Lived It.
            </p>
            <div className="flex flex-col gap-4 text-[13.5px] sm:text-[14.5px] text-[#9ca3af] leading-relaxed font-medium mt-2">
              <p className="m-0">
                {isKo ? (
                  "K SELECT HUB는 실제 소매 매장과 글로벌 공급망을 온전히 직접 운영해온 현장의 경험에서 시작되었습니다. 2001년부터 이어온 실전 리테일 운영 노하우를 바탕으로, 단순한 시장 조사에 그치지 않고 브랜드 소싱, 규정 및 컴플라이언스(FDA/MoCRA), 미국 직수입 및 통관, 현지 물류(3PL) 창고 관리, 온라인 및 이커머스 세일즈(아마존 FBA 포함), 매장 머천다이징까지 공급망 전 과정을 직접 조율하고 실행해왔습니다."
                ) : (
                  "K SELECT HUB was built directly from raw, hands-on experience operating real retail stores and global supply chains. Grounded in U.S. retail operations since 2001, we have executed every step of the value chain: brand sourcing, FDA/MoCRA compliance, import clearance, local 3PL warehousing, digital commerce (including Amazon FBA), and modular fixture merchandising."
                )}
              </p>
              <p className="m-0 font-semibold text-white/90">
                {isKo ? (
                  "우리는 단순한 공급사나 중개상이 아닙니다. 소매점 선반 위의 제품 하나가 움직일 때 드는 비용과 가치, 그리고 리스크를 가장 깊이 이해하는 동반자이자 현장 중심의 실행 파트너입니다."
                ) : (
                  "We are not just wholesalers or brokers. We are real operators who understand the exact cost, velocity, and risks associated with every product sitting on your store shelves."
                )}
              </p>
            </div>
          </div>

          {/* Right Column: Premium Generated Visual */}
          <div className="relative aspect-[3/2] w-full rounded-[24px] overflow-hidden border border-white/10 shadow-2xl group">
            <Image
              src="/images/about/kbeauty_hero_visual.jpg"
              alt="Premium K-Beauty retail section visual"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
            {/* Dark reflection layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ================= 02. ABOUT LETUSTO ================= */}
        <section id="about-letusto" className="bg-[#121214] border-y border-[#222]">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] py-[100px] sm:py-[120px] text-left">
            
            {/* Header Block */}
            <div className="max-w-[800px] flex flex-col gap-3 mb-16">
              <span className="text-xs sm:text-[13px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display">
                ABOUT LETUSTO
              </span>
              <h2 className="font-display text-[26px] sm:text-[36px] font-bold leading-tight text-white tracking-tight m-0 select-none">
                {isKo ? (
                  <>매장에서 공급망까지,<br className="hidden sm:inline" /> 실제 운영으로 완성한 경험.</>
                ) : (
                  <>From Shelves to Supply Chains:<br className="hidden sm:inline" /> Built on Real Operations.</>
                )}
              </h2>
              <p className="text-[13.5px] sm:text-[14.5px] text-[#9ca3af] leading-relaxed font-medium max-w-2xl m-0 mt-2">
                {isKo ? (
                  "Letusto는 실전 소매 운영 및 온라인 커머스 경험을 이식한 글로벌 물류·리테일 파트너사입니다. 미국 전역의 소매 매장 환경과 한국·중국의 제조 인프라를 직접 조율하며 물류, 규정, 머천다이징을 하나의 연동된 솔루션으로 제공합니다."
                ) : (
                  "Letusto is a global retail and logistics partner designed around real-world retail operations. We connect U.S. storefronts directly with sourcing and hardware infrastructure in South Korea and China."
                )}
              </p>
            </div>

            {/* 6 Core Expertise Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                {
                  id: "retail",
                  titleKo: "2001년부터의 리테일 경험",
                  titleEn: "Retail Experience Since 2001",
                  descKo: "미국 시장 현지에서 단일 뷰티숍 운영부터 시작하여 최대 8개 이상의 다중 오프라인 스토어를 직접 소유하고 운영하며 소비자의 구매 흐름을 관리해왔습니다.",
                  descEn: "Began with local storefronts in the U.S. and expanded to operating 8+ retail stores, gaining deep knowledge of retail foot traffic, consumer psychology, and checkout dynamics.",
                  icon: (
                    <svg className="w-5 h-5 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )
                },
                {
                  id: "ecommerce",
                  titleKo: "이커머스 & 아마존 운영 전문성",
                  titleEn: "E-commerce & Amazon Expertise",
                  descKo: "자체 D2C 온라인 채널부터 글로벌 1위 플랫폼인 아마존 FBA 세일즈, 디지털 퍼포먼스 광고 및 검색 노출 최적화까지 온라인과 모바일을 아우르는 리테일 노하우를 실행합니다.",
                  descEn: "Hands-on operation of direct-to-consumer online storefronts and Amazon FBA channels, leveraging data-driven advertising, conversion optimization, and supply replenishment.",
                  icon: (
                    <svg className="w-5 h-5 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  )
                },
                {
                  id: "import",
                  titleKo: "수입 통관 · 규정 규제 대응",
                  titleEn: "Import & Compliance Cleared",
                  descKo: "HS Code 분류, FDA 성분 등록, 최신 화장품 규제(MoCRA) 준수, 미국 세관(CBP) 정식 통관 절차 및 포장 라벨링 가이드라인을 직접 주도해 안전하게 처리합니다.",
                  descEn: "Navigating strict U.S. trade laws: HS Code classification, FDA product registrations, MoCRA compliance, CBP custom clearances, and strict labeling guidelines.",
                  icon: (
                    <svg className="w-5 h-5 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )
                },
                {
                  id: "logistics",
                  titleKo: "물류 창고 · 재고 스마트 제어",
                  titleEn: "Logistics & Inventory Control",
                  descKo: "뉴저지 현지 거점 물류 창고와 3PL 분배 라인을 조율하며, 정밀한 발주(PO) 및 리오더 프로세스로 매장의 품절 부담과 유통기한 기한 초과 등의 재고 리스크를 차단합니다.",
                  descEn: "Executing domestic 3PL storage and regional dispatch from our NJ hub, utilizing optimized purchase orders and systematic reorder terms to minimize slow-moving stock.",
                  icon: (
                    <svg className="w-5 h-5 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )
                },
                {
                  id: "beauty",
                  titleKo: "뷰티 카테고리 운영 노하우",
                  titleEn: "Beauty Category Know-How",
                  descKo: "스킨케어, 헤어케어, 색조 메이크업, 뷰티 기구까지 현지 뷰티 서플라이 소비자들이 반응하는 성분, 마진 구조, 진열 연출 방식을 체계적으로 가려냅니다.",
                  descEn: "Span-wide understanding of skincare, haircare, cosmetics, and beauty tools, specifically optimized for margins and customer demographic demand in local beauty stores.",
                  icon: (
                    <svg className="w-5 h-5 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  )
                },
                {
                  id: "data",
                  titleKo: "데이터 기반 리테일 의사결정",
                  titleEn: "Data-Driven Decisions",
                  descKo: "자체 구축한 소매 분석 데이터 뷰어(LENS)를 통해 매장의 면적(sq.ft.), 판매 주기, 카테고리 기여율을 수치화하여 매대 공간 효율을 과학적으로 유도합니다.",
                  descEn: "Integrating retail analytics through our proprietary LENS viewer to track sq.ft. yield, inventory turn speeds, and margin contribution to design data-justified shelf space.",
                  icon: (
                    <svg className="w-5 h-5 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                }
              ].map((item) => (
                <div key={item.id} className="bg-[#0c0c0c] border border-white/5 hover:border-[#ff2b75]/35 p-6 rounded-[20px] shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-[12px] bg-white/[0.03] border border-white/10 flex items-center justify-center mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-[17px] font-black text-white leading-tight mb-2.5">
                    {isKo ? item.titleKo : item.titleEn}
                  </h3>
                  <p className="text-[12.5px] sm:text-[13px] text-[#9ca3af] leading-relaxed font-semibold m-0">
                    {isKo ? item.descKo : item.descEn}
                  </p>
                </div>
              ))}
            </div>

            {/* core statement banner section */}
            <div className="border-t border-white/10 pt-10 flex flex-col sm:flex-row justify-between items-start gap-4 select-none">
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display border border-[#ff2b75]/35 bg-[#ff2b75]/5 px-3 py-1 rounded-[4px]">
                PRODUCT JUDGMENT
              </span>
              <p className="font-display text-[16px] sm:text-[20px] font-black text-white m-0 max-w-3xl leading-snug tracking-tight text-left">
                {isKo ? (
                  <>우리는 단순히 <span className="text-[#ff2b75]">“좋은 상품인가?”</span>만 보지 않습니다.<br /> <span className="text-[#00f0ff] font-bold">“이 가격에, 이 매장에서, 이 고객에게 실제로 팔릴 것인가?”</span>를 분석하고 공급합니다.</>
                ) : (
                  <>We don’t just ask, <span className="text-[#ff2b75]">"Is this a good product?"</span><br /> We ask, <span className="text-[#00f0ff] font-bold">"Will it actually sell at this price point, in this specific store, to this specific customer?"</span></>
                )}
              </p>
            </div>

          </div>
        </section>

        {/* ================= 03. WHY PARTNER WITH US ================= */}
        <section id="why-partner-with-us" className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] py-[100px] sm:py-[120px] text-left scroll-mt-24">
          
          <div className="max-w-[800px] flex flex-col gap-3 mb-14">
            <span className="text-xs sm:text-[13px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display">
              WHY PARTNER WITH US
            </span>
            <h2 className="font-display text-[26px] sm:text-[36px] font-bold leading-tight text-white tracking-tight m-0 select-none">
              {isKo ? "좋은 제품은 시작일 뿐입니다." : "A Good Product is Only the Beginning."}
            </h2>
            
            {/* Highlighted Slogan */}
            <div className="mt-4 border-l-2 border-[#ff2b75] pl-4">
              <span className="block font-display text-[18px] sm:text-[22px] font-black text-[#ff2b75] uppercase leading-none select-none">
                Our Goal Is Sell-Through — Not Just Sell-In.
              </span>
              <p className="text-[12.5px] sm:text-[13.5px] text-[#9ca3af] font-semibold leading-relaxed m-0 mt-2">
                {isKo ? (
                  "리테일러 매장의 선반에 제품이 안착하는 사입(Sell-In)을 넘어, 매대에서 최종 소비자의 손에 쥐어지고 품절과 정식 리오더가 순환하는 실질 판매(Sell-Through)를 유일한 파트너십 성공 지표로 삼습니다."
                ) : (
                  "We do not consider our job done when products arrive on your shelves. True partner success is achieved only when inventory is purchased by local shoppers, triggering sustainable, automated reorders."
                )}
              </p>
            </div>
          </div>

          {/* 6 Capabilities Cards Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                titleKo: "리테일러 마인드셋",
                titleEn: "Retailer Mindset",
                descKo: "우리는 소매점주가 매일 부딪히는 선반 효율, 한정된 자금 흐름, SKU 회전 속도, 악성 재고 처리의 복잡한 현실을 잘 알고 있습니다. 철저히 소매점 중심의 관점으로 접근합니다.",
                descEn: "We operate with a deep understanding of store layouts, shelf space limitations, capital cycles, and turnover rates. Our logic matches the cash flow needs of small business owners."
              },
              {
                num: "02",
                titleKo: "맞춤형 큐레이션",
                titleEn: "Curated, Not Random",
                descKo: "무분별한 벌크 상품 공급을 배제합니다. 귀 매장의 상권, 반경 내 경쟁점의 현황, 소비자 선호 가격대를 다각도로 필터링하여 오직 성과를 유도할 수 있는 제품만 큐레이션합니다.",
                descEn: "We never deliver generic mass catalogs. Every single SKU is hand-picked based on local store demographics, neighborhood dynamics, and optimized retail pricing strategies."
              },
              {
                num: "03",
                titleKo: "검증된 판매 데이터",
                titleEn: "Real Sales Experience",
                descKo: "우리가 제안하는 모든 뷰티 모듈러와 화장품 믹스는 Letusto가 직접 구축하고 현지 오프라인 매장 및 온라인 세널에서 테스트하여 실제 성과가 입증된 데이터만을 배경으로 채택합니다.",
                descEn: "Every recommended assortment program and LED display shelf is built on real sales trials and solid transactional data verified across Letusto's own retail channels."
              },
              {
                num: "04",
                titleKo: "끝까지 책임지는 실행력",
                titleEn: "End-to-End Capability",
                descKo: "소싱 ➔ 미국 통관 ➔ 수입 ➔ 창고 ➔ 큐레이션 ➔ 현지 집기 설치 ➔ 판매 모니터링 ➔ 부진 상품 리오더 교환까지 공급망 전체를 원스톱으로 관리해 불필요한 마진 누수를 차단합니다.",
                descEn: "We manage the entire chain directly: from sourcing, customs clearance, sea shipping, warehousing, store-level setups, to automatic Exchange Credit swaps for slow sellers."
              },
              {
                num: "05",
                titleKo: "데이터와 실전의 결합",
                titleEn: "Data + Human Judgment",
                descKo: "자체 구축 시스템 LENS의 통계적 예측 데이터와 20년 이상 뷰티 매장을 발로 뛰며 체득한 전문가의 현장 감각을 상호 검증하여, 리스크는 낮추고 정확도는 극대화합니다.",
                descEn: "We integrate the logic of our LENS analytics platform with the human intuition of beauty supply veterans who have spent decades interacting directly with retail customers."
              },
              {
                num: "06",
                titleKo: "동반 매출 성장에 집중",
                titleEn: "Sell-Through Focus",
                descKo: "소매점의 판매 속도(Sell-Through)가 곧 당사의 성공 지표입니다. K SELECT HUB는 선반에 물건을 채워 넣는 것을 넘어, 리테일러의 실질 이익과 회전율 안착을 끝까지 돕습니다.",
                descEn: "We align our revenue directly with your store performance. We win only when products move off your counter and generate cash, fostering long-term, mutually profitable partnerships."
              }
            ].map((item) => (
              <div key={item.num} className="flex gap-4.5 text-left items-start group">
                <span className="font-display font-black text-[22px] text-[#ff2b75] leading-none pt-0.5 group-hover:scale-110 transition-transform">
                  {item.num}
                </span>
                <div className="flex flex-col gap-2">
                  <h4 className="text-[15.5px] font-black text-white leading-tight m-0">
                    {isKo ? item.titleKo : item.titleEn}
                  </h4>
                  <p className="text-[12.5px] sm:text-[13px] text-[#9ca3af] leading-relaxed font-semibold m-0">
                    {isKo ? item.descKo : item.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ================= 04. BUILT TO EXECUTE ================= */}
        <section id="built-to-execute" className="bg-[#121214] border-y border-[#222]">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] py-[80px] sm:py-[100px] text-center">
            
            <div className="max-w-[600px] mx-auto mb-12 flex flex-col items-center gap-2">
              <span className="text-xs sm:text-[13px] font-black text-[#00F0FF] tracking-[0.2em] uppercase font-display select-none">
                BUILT TO EXECUTE
              </span>
              <h2 className="font-display text-[26px] sm:text-[34px] font-bold text-white tracking-tight m-0 select-none">
                {isKo ? "실행력으로 증명된 숫자" : "Proven in Action: Key Metrics"}
              </h2>
            </div>

            {/* 6 Grid Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-[1200px] mx-auto">
              {[
                { val: "20+ Years", labelKo: "리테일 & 이커머스 운영", labelEn: "Retail & E-commerce" },
                { val: "30+", labelKo: "런칭 완료 화장품 라인", labelEn: "Successful Launches" },
                { val: "200+", labelKo: "활성 SKU 재고 품목수", labelEn: "Active SKUs Managed" },
                { val: "3 Bases", labelKo: "미국 · 한국 · 중국 거점", labelEn: "Operating Bases" },
                { val: "85%", labelKo: "초기 런칭 매장 안착률", labelEn: "Launch Success Rate" },
                { val: "1 System", labelKo: "자체 물류/MD 분석 LENS", labelEn: "Proprietary LENS System" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#0c0c0c] border border-white/5 rounded-[20px] p-6 flex flex-col justify-center items-center shadow-md">
                  <span className="font-display text-2xl sm:text-3xl font-black text-[#00F0FF] leading-none mb-2">
                    {stat.val}
                  </span>
                  <span className="text-[11px] sm:text-[11.5px] text-[#9ca3af] font-bold text-center leading-tight">
                    {isKo ? stat.labelKo : stat.labelEn}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= 05. OUR NETWORK ================= */}
        <section id="our-network" className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] py-[100px] sm:py-[120px] text-left">
          
          <div className="max-w-[800px] flex flex-col gap-3 mb-16">
            <span className="text-xs sm:text-[13px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display">
              GLOBAL LOGISTICS NETWORK
            </span>
            <h2 className="font-display text-[26px] sm:text-[36px] font-bold leading-tight text-white tracking-tight m-0 select-none">
              {isKo ? "현지 실행력, 글로벌 연결" : "Local Execution, Global Connections."}
            </h2>
            <p className="text-[13.5px] sm:text-[14.5px] text-[#9ca3af] leading-relaxed font-medium max-w-2xl m-0 mt-1">
              {isKo ? (
                "미국, 한국, 중국의 3개국 거점을 실시간 연계하여 트렌디한 화장품 소싱부터 규정 준수, 그리고 단가 경쟁력을 지닌 LED 매대 기획 제작까지 매끄럽게 처리합니다."
              ) : (
                "Our logistics infrastructure connects key hubs across the U.S., South Korea, and China to secure cost-competitive sourcing, rapid regulatory clearance, and prompt retail setups."
              )}
            </p>
          </div>

          {/* 3 Node Cards Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "UNITED STATES",
                subKo: "현지 창고 및 리테일 오퍼레이션",
                subEn: "U.S. Logistics & Operations Hub",
                descKo: "뉴저지 본사를 거점으로 로컬 뷰티 물류창고(3PL) 및 유통 허브를 직접 제어하며, 미국 동부·서부 지역 매장으로 큐레이션된 제품과 조명 집기를 직접 분배 배송합니다.",
                descEn: "Headquartered in New Jersey, managing local 3PL warehousing and domestic freight routes to coordinate efficient dispatch and delivery of fixtures and cosmetics directly to retailers.",
                tags: ["Warehousing & 3PL", "Domestic Logistics", "Store Support"]
              },
              {
                title: "SOUTH KOREA",
                subKo: "브랜드 발굴 및 수출 컴플라이언스",
                subEn: "Brand Sourcing & Compliance Hub",
                descKo: "서울 오피스에서 성분 안전성 및 마진율이 검증된 에센셜 한국 브랜드 제품을 다이렉트 소싱하고, 화장품 규정(MoCRA/FDA) 서류화 프로세스를 체계적으로 수행합니다.",
                descEn: "Operating from Seoul to discover high-margin K-Beauty brands, running strict ingredient checks, and completing export procedures to guarantee full compliance with MoCRA and FDA laws.",
                tags: ["Brand Sourcing", "MoCRA Compliance", "Quality Assurance"]
              },
              {
                title: "CHINA",
                subKo: "집기 원자재 조립 및 원가 최적화",
                subEn: "Modular Fixture & Components Supply",
                descKo: "LED 모듈러 디스플레이 매대 프레임, 하드웨어 집기 부품의 정밀 제조를 총괄합니다. 금형 제작 및 원부자재 공정을 철저히 감독하여 공급 단가를 합리적으로 경감합니다.",
                descEn: "Supervising raw material purchasing and precise production of our LED showcases. Direct oversight of hardware tooling enables cost optimization passed directly onto our partners.",
                tags: ["Fixture Manufacturing", "Material Procurement", "Cost Efficiency"]
              }
            ].map((node, idx) => (
              <div key={idx} className="bg-[#121214] border border-white/5 p-8 rounded-[24px] flex flex-col justify-between shadow-xl relative hover:border-white/10 transition-colors">
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display block mb-1">OPERATING BASE</span>
                    <h3 className="text-[20px] font-black text-white tracking-tight leading-none m-0">
                      {node.title}
                    </h3>
                  </div>
                  <h4 className="text-[13.5px] font-bold text-white/90 leading-tight m-0 border-b border-white/10 pb-3">
                    {isKo ? node.subKo : node.subEn}
                  </h4>
                  <p className="text-[12.5px] sm:text-[13px] text-[#9ca3af] leading-relaxed font-semibold m-0 mt-1">
                    {isKo ? node.descKo : node.descEn}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-8 border-t border-white/5 pt-4">
                  {node.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="text-[10px] text-[#ff2b75] bg-[#ff2b75]/8 border border-[#ff2b75]/15 px-2.5 py-0.5 rounded-[4px] font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ================= 06. OUR TEAM ================= */}
        <section id="our-team" className="bg-[#121214] border-y border-[#222]">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] py-[100px] sm:py-[120px] text-left">
            
            <div className="max-w-[800px] flex flex-col gap-3 mb-14">
              <span className="text-xs sm:text-[13px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display">
                OUR TEAM
              </span>
              <h2 className="font-display text-[26px] sm:text-[36px] font-bold leading-tight text-white tracking-tight m-0 select-none">
                {isKo ? "경험 있는 운영팀이 매 결정 뒤에 있습니다." : "An Experienced Operating Team Behind Every Decision."}
              </h2>
            </div>

            {/* 4 Team Member Profiles */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Chae Hahm",
                  role: "Founder & CEO",
                  img: "/images/about/chae_hahm.png",
                  descKo: "미국 뷰티 서플라이 매장을 포함하여 20년 이상 리테일 스토어 직접 운영. 수입 규제 준수, 미국 국내 물류 및 Letusto 자금 조율 총괄.",
                  descEn: "20+ years of U.S. storefront operations. Oversees global compliance, customs clearance, U.S. warehousing, and Letusto's strategic growth."
                },
                {
                  name: "John Back",
                  role: "Marketing",
                  img: "/images/about/john_back.png",
                  descKo: "디지털 브랜드 마케팅, 소비자 행동 분석 및 브랜드 런칭 기획 담당.",
                  descEn: "Digital brand marketing, consumer behavioral analytics, and retail customer acquisition strategies."
                },
                {
                  name: "Sean Hahm",
                  role: "Korea Sourcing",
                  img: "/images/about/sean_hahm.png",
                  descKo: "한국 뷰티 브랜드 제휴 총괄. 화장품 제조 유통 기획 및 MoCRA(화장품 규제법) 등 한국 기업의 통관 준비 및 가이딩 책임.",
                  descEn: "Managing South Korea brand partnerships, manufacturer relations, and MoCRA compliance sourcing."
                },
                {
                  name: "Chae Yim",
                  role: "Operations",
                  img: "/images/about/chae_yim.png",
                  descKo: "중국 디스플레이 프레임 원부자재 생산 감리 및 글로벌 통관 조율. U.S. 창고 재고 관리와 3PL 운영 총괄.",
                  descEn: "Supervises modular fixture manufacturing in China and coordinates intercontinental freight flows. Manages U.S. local warehouse operations and 3PL dispatch."
                }
              ].map((member, idx) => (
                <div key={idx} className="bg-[#0c0c0c] border border-white/5 rounded-[20px] p-6 shadow-lg flex flex-col items-center text-center">
                  
                  {/* Portrait photo frame */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-white/10 mb-5 bg-[#121214]">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 112px, 128px"
                    />
                  </div>

                  <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display block mb-1">
                    {member.role}
                  </span>
                  <h4 className="text-[16px] font-black text-white leading-none m-0 mb-3 select-none">
                    {member.name}
                  </h4>
                  <p className="text-[12.5px] text-[#9ca3af] leading-relaxed font-semibold m-0">
                    {isKo ? member.descKo : member.descEn}
                  </p>

                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= 07. RECOGNIZED PARTNER ================= */}
        <section id="recognized-partner" className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px] py-[100px] sm:py-[120px] text-left">
          
          <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-12 lg:gap-16 items-center max-w-[1100px] mx-auto">
            
            {/* Left Column: Cert Badge */}
            <div className="flex justify-center relative">
              <div className="relative w-[340px] max-w-full aspect-[487/320] rounded-[16px] overflow-hidden border border-white/15 shadow-2xl bg-[#121214] p-2 flex items-center justify-center animate-pulse">
                <Image
                  src="/images/about/kosme_cert_2026.png"
                  alt="KOSME Global Business Partner 2026 Certificate"
                  width={487}
                  height={320}
                  className="object-contain rounded-[10px]"
                />
              </div>
            </div>

            {/* Right Column: Statement */}
            <div className="flex flex-col gap-4">
              <span className="text-xs sm:text-[13px] font-black text-[#00f0ff] tracking-[0.2em] uppercase font-display">
                RECOGNIZED PARTNER
              </span>
              <h2 className="font-display text-[26px] sm:text-[34px] font-bold leading-tight text-white tracking-tight m-0 select-none">
                {isKo ? "공식적으로 인정받은 글로벌 비즈니스 파트너" : "A Trusted Partner Recognized by KOSME."}
              </h2>
              <div className="flex flex-col gap-3 text-[13.5px] sm:text-[14.5px] text-[#9ca3af] leading-relaxed font-medium">
                <p className="m-0">
                  {isKo ? (
                    "Letusto Inc.는 대한민국 중소벤처기업진흥공단(KOSME)이 공인한 '2026 Global Business Partner'입니다. 이는 한국 중소기업과의 무역 안전성, 미국 현지 수출 리스크 관리 능력, 엄격한 규정 준수 이행 역량 및 신뢰할 수 있는 물류 인프라 실행 역량을 공공기관으로부터 공식적으로 공인받았음을 증명합니다."
                  ) : (
                    "Letusto Inc. is officially accredited as a '2026 Global Business Partner' by KOSME (Korea SMEs and Startups Agency). This government-backed certification verifies our supply chain stability, international trade compliance, U.S. risk management competence, and operational execution."
                  )}
                </p>
                <p className="m-0 font-semibold text-white/95">
                  {isKo ? (
                    "우리는 정부 공인 기관의 검증된 기준을 바탕으로 한국 화장품 브랜드와 미국 독립 뷰티 리테일러 간의 가교 역할을 안전하고 투명하게 수행하고 있습니다."
                  ) : (
                    "Backed by verified public agency standards, we build a secure, transparent logistics bridge between premium South Korean beauty manufacturers and independent retail store owners in the United States."
                  )}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ================= 08. FINAL CTA ================= */}
        <section id="about-cta" className="bg-[#121214] border-t border-[#222] py-20 text-center">
          <div className="max-w-[800px] mx-auto px-6 sm:px-12 flex flex-col items-center gap-6">
            
            <span className="text-xs sm:text-[13px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display select-none">
              GET STARTED WITH K SELECT HUB
            </span>
            
            <h2 className="font-display text-[26px] sm:text-[38px] font-black leading-tight text-white tracking-tight m-0 max-w-2xl select-none">
              {isKo ? (
                <>우리는 또 하나의 공급사가 되려는 것이 아닙니다.<br /> 당신의 <span className="text-[#ff2b75]">K-Beauty 성장 파트너</span>가 되려는 것입니다.</>
              ) : (
                <>We Don’t Want to Be Another Supplier.<br /> We Want to Be Your <span className="text-[#ff2b75]">K-Beauty Growth Partner</span>.</>
              )}
            </h2>
            
            <p className="text-[13px] sm:text-[13.5px] text-[#ff2b75] font-black tracking-widest uppercase m-0 leading-none select-none">
              We Don’t Want to Be Another Supplier. We Want to Be Your K-Beauty Growth Partner.
            </p>

            {/* Supporting Bullet points */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2 text-[12px] font-bold text-white/80 select-none">
              {["Better Products", "Better Assortment", "Better Inventory Decisions", "Better Sell-Through"].map((point, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
                  {point}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href={`/${locale}#launch-readiness`}
                className="h-14 px-9 rounded-[8px] bg-[#ff2b75] hover:bg-[#e01a5e] text-white font-extrabold text-[14.5px] tracking-wide inline-flex items-center justify-center transition-all duration-300 hover:shadow-[0_4px_25px_rgba(255,43,117,0.4)] hover:-translate-y-0.5"
              >
                {isKo ? "파트너 상담 신청 →" : "Request Partner Consultation →"}
              </Link>
              <Link
                href={`/${locale}#solution`}
                className="h-14 px-9 rounded-[8px] border border-[#22d3ee]/35 text-[#22d3ee] hover:bg-[#22d3ee] hover:text-[#0c0c0c] font-bold text-[14.5px] tracking-wide inline-flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:-translate-y-0.5"
              >
                {isKo ? "K-Beauty Growth Program 보기 →" : "View Growth Program →"}
              </Link>
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
