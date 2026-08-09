export const dynamic = 'force-dynamic';

import React from "react";
import Image from "next/image";
import { ko, LocaleDictionary } from "../locales/ko";
import CtaForm from "./CtaForm";
import Simulator from "./Simulator";
import { assetConfig } from "../assets.config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const t = ko as LocaleDictionary; // Cast to bypass TS compilation cache issues

  return (
    <div className="min-h-screen flex flex-col font-body bg-[#141414] text-white overflow-x-hidden selection:bg-[#ff2b75] selection:text-white">
      
      {/* 0. NAV (Header) - Height 80px, sticky nav with backdrop blur */}
      <header className="sticky top-0 z-50 bg-[#141414]/86 backdrop-blur-md border-b border-[#2A2A2A]">
        <div className="max-w-[1400px] mx-auto px-[64px] h-20 flex items-center justify-between gap-10">
          <div className="flex items-center gap-[44px]">
            {/* Logo treatment matching master spec */}
            <div className="flex items-center gap-2.5">
              <div className="w-[30px] h-[30px] rounded-[6px] bg-[#ff2b75] flex items-center justify-center color-white font-bold text-base select-none">
                K
              </div>
              <span className="text-lg font-black tracking-tight text-white select-none">
                K Select Hub
              </span>
            </div>
            {/* Header navigation bar links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-text-secondary">
              <a href="#opportunity" className="hover:text-accent transition-colors">솔루션</a>
              <a href="#products" className="hover:text-accent transition-colors">제품 큐레이션</a>
              <a href="#display" className="hover:text-accent transition-colors">디스플레이</a>
              <a href="#exchange-credit" className="hover:text-accent transition-colors">신용 프로그램</a>
              <a href="#simulator-section" className="hover:text-accent transition-colors">성장 시뮬레이터</a>
              <a href="#partnership-timeline" className="hover:text-accent transition-colors">파트너 리소스</a>
            </nav>
          </div>

          <div className="flex items-center gap-[20px]">
            <a
              href="https://portal.kselecthub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-text-secondary hover:text-white transition-all"
            >
              로그인
            </a>
            <div className="w-px h-5 bg-[#2A2A2A]" />
            <a
              href="#apply"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-[#ff2b75] hover:bg-[#e01a5e] text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              파트너 신청 
              <img
                src={assetConfig.icons.arrowUp}
                alt="arrow"
                className="w-3.5 h-3.5 transform rotate-90"
              />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1">
        
        {/* 1. HERO SECTION - desktop matching exactly 1.05fr 0.95fr split layout */}
        <section className="max-w-[1400px] mx-auto padding-hero px-[64px] py-[96px] grid lg:grid-cols-[1.05fr_0.95fr] gap-[64px] items-center text-left">
          
          {/* Left Hero Narrative */}
          <div className="flex flex-col items-start">
            
            {/* Eyebrow Label with pill design */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ff2b75]/20 bg-[#ff2b75]/5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
              <span className="text-[10px] tracking-[0.08em] font-semibold text-[#ff2b75]">
                K-BEAUTY RETAIL GROWTH PLATFORM
              </span>
            </div>

            <h1 className="margin-0 font-display text-[60px] font-bold leading-[1.12] tracking-tight text-white mb-6 select-none">
              제품을 파는 게 아니라,<br />
              <span className="text-[#ff2b75]">매장의 K-Beauty 매출</span>을<br />
              설계합니다.
            </h1>

            <p className="margin-0 text-base leading-relaxed text-text-secondary mb-9 max-w-[520px]">
              검증된 제품 큐레이션, 매장 맞춤 디스플레이, 성장 예측 시뮬레이터와 90일 재고 교환 크레딧까지 — K Select Hub는 독립 뷰티 리테일러를 위한 하나의 성장 프로그램입니다.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 mb-9">
              <a
                href="#apply"
                className="h-14 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-7 rounded-[8px] font-semibold text-[15px] transition-colors cursor-pointer"
              >
                파트너 신청하기 →
              </a>
              <a
                href="#simulator-section"
                className="h-14 inline-flex items-center justify-center border border-[#2a2a2a] hover:border-white text-white px-7 rounded-[8px] font-semibold text-[15px] transition-colors cursor-pointer"
              >
                성장 시뮬레이터 보기
              </a>
            </div>

            {/* Benefits Check Labels */}
            <div className="flex flex-wrap items-center gap-[28px]">
              <span className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <img src={assetConfig.icons.circleCheck} alt="check" className="w-4 h-4" />
                검증된 K-Beauty 제품
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <img src={assetConfig.icons.circleCheck} alt="check" className="w-4 h-4" />
                매장 맞춤 성장 전략
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <img src={assetConfig.icons.circleCheck} alt="check" className="w-4 h-4" />
                재고 리스크 완화
              </span>
            </div>

          </div>

          {/* Right Hero Visuals with Layered Floating Cards */}
          <div className="relative">
            
            {/* Base Photography Asset */}
            <div className="relative w-full h-[560px] rounded-[20px] overflow-hidden border border-[#2a2a2a] bg-[#121214]">
              <Image
                src={assetConfig.storeShowcase.heroSection.src}
                alt={assetConfig.storeShowcase.heroSection.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
              {/* Complex overlays matching target visual language */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/80 via-transparent to-transparent z-0" />
            </div>

            {/* Floating Card 1: Donut Product Mix Card */}
            <div className="absolute top-6 right-[-28px] w-[260px] bg-[#121214]/72 backdrop-blur-md border border-[#2a2a2a] rounded-[16px] p-5 shadow-2xl z-10 flex flex-col gap-3.5">
              <span className="text-[11px] text-text-secondary uppercase tracking-wider font-semibold text-left">
                큐레이션 제품 믹스
              </span>
              <div className="flex items-center gap-4 text-left">
                <div className="relative w-[76px] h-[76px] rounded-full bg-conic-gradient flex items-center justify-center flex-shrink-0">
                  <div className="w-[50px] h-[50px] rounded-full bg-[#121214] flex items-center justify-center text-sm font-bold text-white select-none">
                    62%
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-[11px] text-text-secondary font-medium">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-[2px] bg-[#ff2b75]" />스킨케어 62%</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-[2px] bg-[#845ec2]" />메이크업 18%</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-[2px] bg-[#ffc75f]" />바디/툴 12%</span>
                </div>
              </div>
            </div>

            {/* Floating Card 2: Growth Sparkline Card */}
            <div className="absolute top-[200px] right-[-28px] w-[230px] bg-[#121214]/72 backdrop-blur-md border border-[#2a2a2a] rounded-[16px] p-[18px] shadow-2xl z-10 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-text-secondary">성장 시뮬레이션 · 90일 후</span>
                <span className="font-bold text-[#10b981]">+42%</span>
              </div>
              {/* SVG Sparkline Sparking */}
              <div className="w-full h-[52px]">
                <svg viewBox="0 0 240 60" width="100%" height="52" className="block">
                  <polyline
                    points="0,50 30,44 60,46 90,34 120,36 150,20 180,22 210,10 240,6"
                    fill="none"
                    stroke="#ff2b75"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="240" cy="6" r="4" fill="#ff2b75" />
                </svg>
              </div>
              <span className="text-xs text-text-secondary text-left">
                예상 추가 매출 <b className="text-white">$48,750</b>
              </span>
            </div>

          </div>
        </section>

        {/* 2. METRICS BAND - 4-column summary metric boxes */}
        <section className="border-y border-[#2a2a2a] bg-[#0c0c0c]">
          <div className="max-w-[1400px] mx-auto px-[64px] py-9 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="flex flex-col gap-1 pr-6 border-r border-[#2a2a2a]">
              <span className="font-display text-[32px] font-bold text-white leading-none">600+</span>
              <span className="text-xs text-text-secondary">미국 파트너 매장</span>
            </div>
            <div className="flex flex-col gap-1 px-6 border-r border-[#2a2a2a]">
              <span className="font-display text-[32px] font-bold text-white leading-none">2,500+</span>
              <span className="text-xs text-text-secondary">검증된 K-Beauty 제품</span>
            </div>
            <div className="flex flex-col gap-1 px-6 border-r border-[#2a2a2a]">
              <span className="font-display text-[32px] font-bold text-[#ff2b75] leading-none">$120M+</span>
              <span className="text-xs text-text-secondary">파트너 누적 매출 성장</span>
            </div>
            <div className="flex flex-col gap-1 pl-6">
              <span className="font-display text-[32px] font-bold text-white leading-none">4.9/5</span>
              <span className="text-xs text-text-secondary">파트너 만족도</span>
            </div>
          </div>
        </section>

        {/* 3. 01 OPPORTUNITY - Growth SVG Area line chart and 4 grid columns */}
        <section id="opportunity" className="max-w-[1400px] mx-auto px-[64px] py-[120px] text-left">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-[56px] items-center mb-12">
            
            {/* Right graphic column in DC hierarchy (order-2 in desktop grid) */}
            <div className="lg:order-2 bg-[#0c0c0c] border border-[#2a2a2a] rounded-[20px] p-[36px_40px] w-full box-border">
              <div className="flex justify-between items-baseline mb-5 text-xs text-text-secondary font-medium">
                <span>미국 K-Beauty 소매 시장 규모 (연도별, 추정)</span>
              </div>
              {/* SVG Area Chart */}
              <div className="w-full h-40">
                <svg viewBox="0 0 1120 160" width="100%" height="160">
                  <line x1="0" y1="140" x2="1120" y2="140" stroke="#222222" strokeWidth="1" />
                  <line x1="0" y1="95" x2="1120" y2="95" stroke="#222222" strokeWidth="1" strokeDasharray="3 6" />
                  <line x1="0" y1="50" x2="1120" y2="50" stroke="#222222" strokeWidth="1" strokeDasharray="3 6" />
                  <path d="M0,140 L0,130 L224,120 L448,100 L672,72 L896,38 L1120,12 L1120,140 Z" fill="#ff2b75" opacity="0.1" />
                  <polyline points="0,130 224,120 448,100 672,72 896,38 1120,12" fill="none" stroke="#ff2b75" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="1120" cy="12" r="5" fill="#ff2b75" />
                </svg>
              </div>
              <div className="flex justify-between mt-2 text-[11px] text-text-secondary">
                <span>2021</span>
                <span>2023</span>
                <span>2025</span>
                <span>2027E</span>
              </div>
              <span className="inline-block text-[11px] font-semibold text-[#10b981] mt-2">
                CAGR +21% (연평균 성장률)
              </span>
            </div>

            {/* Left text description column */}
            <div className="lg:order-1 flex flex-col gap-4">
              <span className="text-xs font-semibold text-accent tracking-[0.04em]">
                01 — WHY NOW?
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.25] tracking-tight text-white mb-2">
                미국 K-Beauty 시장은 성장하고 있습니다.<br />
                하지만 진짜 기회는 <span className="text-accent">‘무엇을 어떻게 파느냐’</span>에 있습니다.
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                소비자의 관심은 빠르게 커지고 있지만, 성공적인 리테일 카테고리는 제품 선정, 가격, 머천다이징과 재고 운영에서 결정됩니다.
              </p>
            </div>

          </div>

          {/* Sub 4 Opportunity Tiles grid */}
          <div className="grid md:grid-cols-4 gap-px bg-[#2a2a2a] overflow-hidden rounded-[8px]">
            <div className="bg-[#0c0c0c] p-8 flex flex-col gap-3">
              <span className="text-[10px] text-text-secondary tracking-widest uppercase">TILE 01 · MARKET GROWTH</span>
              <div className="flex items-baseline gap-1.5 my-1">
                <span className="text-3xl font-bold text-white">+21%</span>
                <span className="text-[10px] text-text-secondary">CAGR</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Fast-Growing Category</h4>
              <p className="text-xs text-text-secondary leading-normal">미국 소비자의 K-Beauty 관심과 구매가 지속적으로 확대되고 있습니다.</p>
            </div>

            <div className="bg-[#0c0c0c] p-8 flex flex-col gap-3">
              <span className="text-[10px] text-text-secondary tracking-widest uppercase">TILE 02 · CONSUMER MOMENTUM</span>
              <div className="flex items-baseline gap-1.5 my-1">
                <span className="text-3xl font-bold text-white">Top 3</span>
                <span className="text-[10px] text-text-secondary">뷰티 트렌드</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Demand Goes Mainstream</h4>
              <p className="text-xs text-text-secondary leading-normal">검색, 소셜, 리테일 수요 전반에서 K-Beauty 관심이 확대되고 있습니다.</p>
            </div>

            <div className="bg-[#0c0c0c] p-8 flex flex-col gap-3">
              <span className="text-[10px] text-text-secondary tracking-widest uppercase">TILE 03 · RETAIL OPPORTUNITY</span>
              <div className="flex items-baseline gap-1.5 my-1">
                <span className="text-3xl font-bold text-white">600+</span>
                <span className="text-[10px] text-text-secondary">파트너 매장</span>
              </div>
              <h4 className="text-sm font-semibold text-white">From Trend to Category</h4>
              <p className="text-xs text-text-secondary leading-normal">온라인 트렌드를 넘어 오프라인 리테일 카테고리로 자리잡고 있습니다.</p>
            </div>

            <div className="bg-[#0c0c0c] p-8 flex flex-col gap-3 border-l-2 border-[#ff2b75]">
              <span className="text-[10px] text-accent tracking-widest uppercase">TILE 04 · THE EXECUTION GAP</span>
              <div className="flex items-baseline gap-1.5 my-1">
                <span className="text-xl font-black text-accent leading-tight">Growth ≠<br />Guaranteed Sales</span>
              </div>
              <h4 className="text-sm font-semibold text-white">시장이 커져도, 저절로 팔리지 않습니다</h4>
              <p className="text-xs text-text-secondary leading-normal">Right Products + Right Assortment + Right Execution이 필요합니다.</p>
            </div>
          </div>
        </section>

        {/* 4. 02 PROBLEM - 4 retailer pain point columns */}
        <section id="problems-section" className="bg-[#0c0c0c] border-y border-[#2a2a2a]">
          <div className="max-w-[1400px] mx-auto px-[64px] py-[120px] text-left">
            <div className="max-w-[640px] mb-14 flex flex-col gap-3">
              <span className="text-xs font-semibold text-accent tracking-[0.04em]">
                02 — RETAILER PROBLEM
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.25] tracking-tight text-white">
                그런데 막상 시작하면, 무엇을 어떻게 운영해야 할지 막막합니다.
              </h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-px bg-[#2a2a2a] overflow-hidden rounded-[8px]">
              <div className="bg-[#0c0c0c] p-8 flex flex-col gap-4">
                <span className="font-display text-[44px] font-black text-[#222222] leading-none">01</span>
                <h3 className="text-base font-semibold text-white">Product Selection</h3>
                <p className="text-xs text-text-secondary leading-relaxed">수천 개 제품 중, 우리 매장에서 실제로 팔릴 제품을 고르기 어렵습니다.</p>
              </div>

              <div className="bg-[#0c0c0c] p-8 flex flex-col gap-4">
                <span className="font-display text-[44px] font-black text-[#222222] leading-none">02</span>
                <h3 className="text-base font-semibold text-white">Price Competition</h3>
                <p className="text-xs text-text-secondary leading-relaxed">온라인·주변 매장과 같은 제품을 팔면 가격 경쟁에서 벗어나기 어렵습니다.</p>
              </div>

              <div className="bg-[#0c0c0c] p-8 flex flex-col gap-4">
                <span className="font-display text-[44px] font-black text-[#222222] leading-none">03</span>
                <h3 className="text-base font-semibold text-white">Inventory Risk</h3>
                <p className="text-xs text-text-secondary leading-relaxed">새로운 SKU 도입 시 Slow Seller와 Dead Stock 위험이 그대로 남습니다.</p>
              </div>

              <div className="bg-[#0c0c0c] p-8 flex flex-col gap-4">
                <span className="font-display text-[44px] font-black text-[#222222] leading-none">04</span>
                <h3 className="text-base font-semibold text-white">Retail Execution</h3>
                <p className="text-xs text-text-secondary leading-relaxed">Display, staff 지식, 재고 관리까지 없으면 카테고리가 완성되지 않습니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 03 SOLUTION - 5 core standard chips + 3 feature cards */}
        <section id="solution" className="max-w-[1400px] mx-auto px-[64px] py-[120px] text-left">
          <div className="text-center max-w-[720px] mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-semibold text-accent tracking-[0.04em]">
              03 — K SELECT SOLUTION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.25] text-white">
              제품 선정부터 디스플레이, 운영까지<br />
              하나의 성장 프로그램으로 해결합니다.
            </h2>
          </div>

          {/* 5 core mini chip bars */}
          <div className="flex flex-wrap justify-between gap-4 p-[24px_8px] border-y border-[#2a2a2a] mb-14 text-left">
            <div className="min-w-[160px]">
              <span className="text-[10px] font-semibold text-accent uppercase tracking-wider block">01 CURATED</span>
              <p className="text-xs text-text-secondary mt-1.5">미국 시장에 맞는 제품 엄선</p>
            </div>
            <div className="min-w-[160px]">
              <span className="text-[10px] font-semibold text-accent uppercase tracking-wider block">02 DIFFERENTIATED</span>
              <p className="text-xs text-text-secondary mt-1.5">가격 경쟁에서 벗어난 assortment</p>
            </div>
            <div className="min-w-[160px]">
              <span className="text-[10px] font-semibold text-accent uppercase tracking-wider block">03 RETAIL-READY</span>
              <p className="text-xs text-text-secondary mt-1.5">Display·머천다이징·테스터까지 준비</p>
            </div>
            <div className="min-w-[160px]">
              <span className="text-[10px] font-semibold text-accent uppercase tracking-wider block">04 PROFIT-FOCUSED</span>
              <p className="text-xs text-text-secondary mt-1.5">45–60% target margin</p>
            </div>
            <div className="min-w-[160px]">
              <span className="text-[10px] font-semibold text-accent uppercase tracking-wider block">05 INVENTORY-SMART</span>
              <p className="text-xs text-text-secondary mt-1.5">데이터 기반 product mix 최적화</p>
            </div>
          </div>

          {/* 3 Solutions detail cards */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#0c0c0c] border border-[#2a2a2a] rounded-[20px] overflow-hidden flex flex-col justify-between">
              <div className="relative h-[200px] w-full">
                <img
                  src={assetConfig.storeShowcase.curationSection.src}
                  alt="Products curation"
                  className="w-full h-full object-cover block"
                />
                <span className="absolute top-3.5 left-3.5 bg-[#ff2b75] text-white text-[9px] font-bold px-2 py-0.5 rounded-full select-none">
                  NEW
                </span>
              </div>
              <div className="p-7">
                <span className="text-[10px] font-semibold text-text-secondary tracking-widest uppercase">
                  01 · CURATED PRODUCT MIX
                </span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2.5">Right Products</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  판매 가능성 높은 제품만 선별해 매장 맞춤 상품 믹스를 구성합니다.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0c0c0c] border border-[#2a2a2a] rounded-[20px] overflow-hidden flex flex-col justify-between">
              <div className="relative h-[200px] w-full bg-white p-[22px_22px_0] flex flex-col justify-end">
                <div className="flex flex-col gap-2.5 mb-4 text-left">
                  <div>
                    <span className="text-[9px] text-[#555555] font-semibold">매장 면적</span>
                    <div className="h-1 rounded-full bg-[#eeeeee] mt-1 overflow-hidden">
                      <div className="bg-[#ff2b75] h-full w-[40%]" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#555555] font-semibold">초기 투자금</span>
                    <div className="h-1 rounded-full bg-[#eeeeee] mt-1 overflow-hidden">
                      <div className="bg-[#ff2b75] h-full w-[65%]" />
                    </div>
                  </div>
                </div>
                <div className="flex items-baseline justify-between border-t border-[#eeeeee] py-3">
                  <span className="text-[10px] text-[#555555]">예상 연 매출</span>
                  <span className="text-[18px] font-bold text-[#ff2b75]">$96,400</span>
                </div>
              </div>
              <div className="p-7">
                <span className="text-[10px] font-semibold text-text-secondary tracking-widest uppercase">
                  02 · GROWTH SIMULATOR
                </span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2.5">Predict the Result</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  매장 데이터 기반으로 매출, 마진, 재고 회전율까지 예측해봅니다.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0c0c0c] border border-[#ff2b75] rounded-[20px] overflow-hidden flex flex-col justify-between relative">
              <span className="absolute top-3.5 right-3.5 bg-[#ff2b75] text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-10 select-none">
                추천 모듈 8FT
              </span>
              <div className="relative h-[200px] w-full">
                <img
                  src={assetConfig.displayFixtures["8ft"].src}
                  alt="8ft display module"
                  className="w-full h-full object-cover block"
                />
              </div>
              <div className="p-7">
                <span className="text-[10px] font-semibold text-[#ff2b75] tracking-widest uppercase">
                  03 · DISPLAY SOLUTION
                </span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2.5">Right Display</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  매장 규모에 맞는 모듈형 K-Beauty 매대로 전문 카테고리를 완성합니다.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 6. 04 PRODUCT CURATION - We don't list everything */}
        <section id="products" className="bg-[#0c0c0c] border-y border-[#2a2a2a]">
          <div className="max-w-[1400px] mx-auto px-[64px] py-[120px] grid lg:grid-cols-2 gap-[72px] items-center text-left">
            <div>
              <span className="text-xs font-semibold text-accent tracking-[0.04em]">
                04 — PRODUCT CURATION
              </span>
              <h2 className="font-display text-4xl sm:text-[46px] font-bold leading-[1.2] tracking-tight text-white my-5">
                We Don't List<br />
                Everything.<br />
                <span className="text-accent">We Select What<br />Belongs in Your Store.</span>
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-[440px]">
                모든 제품을 나열하지 않습니다. 판매 가능성과 리테일 적합성을 기준으로, 매장에 실제로 어울리는 제품만 선별합니다.
              </p>
              
              {/* 4 standards tag chips */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                <span className="text-xs text-text-secondary border border-[#2a2a2a] px-3.5 py-1.5 rounded-full">Performance · 상품 경쟁력</span>
                <span className="text-xs text-text-secondary border border-[#2a2a2a] px-3.5 py-1.5 rounded-full">Price Fit · 적정 가격</span>
                <span className="text-xs text-text-secondary border border-[#2a2a2a] px-3.5 py-1.5 rounded-full">Retail Margin · 리테일 마진</span>
                <span className="text-xs text-text-secondary border border-[#2a2a2a] px-3.5 py-1.5 rounded-full">Store Fit · 매장 적합성</span>
              </div>

              {/* 6 categories chip list */}
              <div className="grid grid-cols-3 gap-3">
                <div className="border border-[#2a2a2a] rounded-[8px] p-3.5"><span className="text-xs font-medium text-white">스킨케어</span></div>
                <div className="border border-[#2a2a2a] rounded-[8px] p-3.5"><span className="text-xs font-medium text-white">헤어케어</span></div>
                <div className="border border-[#2a2a2a] rounded-[8px] p-3.5"><span className="text-xs font-medium text-white">메이크업</span></div>
                <div className="border border-[#2a2a2a] rounded-[8px] p-3.5"><span className="text-xs font-medium text-white">바디케어</span></div>
                <div className="border border-[#2a2a2a] rounded-[8px] p-3.5"><span className="text-xs font-medium text-white">퍼스널케어</span></div>
                <div className="border border-[#2a2a2a] rounded-[8px] p-3.5"><span className="text-xs font-medium text-white">뷰티 툴</span></div>
              </div>
            </div>

            {/* Right side flatlay image slot */}
            <div className="relative">
              <div className="w-full h-[480px] rounded-[20px] overflow-hidden border border-[#2a2a2a] relative">
                <Image
                  src={assetConfig.storeShowcase.curationSection.src}
                  alt={assetConfig.storeShowcase.curationSection.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
              <span className="absolute top-5 left-5 bg-[#ff2b75] text-white text-[11px] font-bold px-3 py-1.5 rounded-full select-none">
                NEW · 이번 시즌 베스트셀러
              </span>
              <div className="absolute bottom-5 left-5 right-5 bg-[#121214]/85 backdrop-blur-sm border border-[#2a2a2a] rounded-[12px] p-[14px_18px] text-left">
                <span className="text-[11px] text-text-secondary">인기 검색 키워드</span>
                <div className="flex gap-2 mt-2 flex-wrap text-xs text-white">
                  <span className="bg-[#0c0d14] px-2.5 py-1.5 rounded-full">#진정</span>
                  <span className="bg-[#0c0d14] px-2.5 py-1.5 rounded-full">#보습</span>
                  <span className="bg-[#0c0d14] px-2.5 py-1.5 rounded-full">#속광</span>
                  <span className="bg-[#0c0d14] px-2.5 py-1.5 rounded-full">#장벽케어</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 7. 05 DISPLAY PROGRAM - 4ft, 8ft, 12ft modular cards */}
        <section id="display" className="max-w-[1400px] mx-auto px-[64px] py-[120px] text-left">
          <div className="max-w-[720px] mb-16 flex flex-col gap-3">
            <span className="text-xs font-semibold text-accent tracking-[0.04em]">
              05 — STORE-IN-A-STORE DISPLAY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.25] tracking-tight text-white">
              매장 안에, 하나의 전문 K-Beauty 카테고리를 만듭니다.
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mt-1">
              매장 규모와 고객 동선에 맞춘 모듈형 디스플레이 시스템. 제품 한 줄이 아니라, 카테고리 전체를 설계합니다.
            </p>
          </div>

          {/* 3 columns displays mapping */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* 4FT */}
            <div className="border border-[#2a2a2a] rounded-[20px] overflow-hidden bg-[#0c0c0c]">
              <div className="relative w-full h-[280px] bg-[#121214] border-b border-[#2a2a2a]">
                <Image
                  src={assetConfig.displayFixtures["4ft"].src}
                  alt={assetConfig.displayFixtures["4ft"].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <div className="p-6">
                <span className="text-[11px] font-semibold text-text-secondary tracking-[0.04em]">
                  4 FT — STARTER
                </span>
                <h3 className="text-lg font-bold text-white mt-2.5 mb-2">진입형 매대</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  K-Beauty를 처음 도입하는 매장을 위한 컴팩트 구성.
                </p>
              </div>
            </div>

            {/* 8FT */}
            <div className="border border-[#ff2b75] rounded-[20px] overflow-hidden bg-[#0c0c0c] relative">
              <span className="absolute top-4 right-4 bg-[#ff2b75] text-white text-[9px] font-bold px-2.5 py-1 rounded-full z-10 select-none">
                MOST POPULAR
              </span>
              <div className="relative w-full h-[280px] bg-[#121214] border-b border-[#2a2a2a]">
                <Image
                  src={assetConfig.displayFixtures["8ft"].src}
                  alt={assetConfig.displayFixtures["8ft"].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <div className="p-6">
                <span className="text-[11px] font-semibold text-accent tracking-[0.04em]">
                  8 FT — GROWTH
                </span>
                <h3 className="text-lg font-bold text-white mt-2.5 mb-2">성장형 매대</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  카테고리별 분류와 풀 라인업으로 매출을 확장.
                </p>
              </div>
            </div>

            {/* 12FT */}
            <div className="border border-[#2a2a2a] rounded-[20px] overflow-hidden bg-[#0c0c0c]">
              <div className="relative w-full h-[280px] bg-[#121214] border-b border-[#2a2a2a]">
                <Image
                  src={assetConfig.displayFixtures["12ft"].src}
                  alt={assetConfig.displayFixtures["12ft"].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <div className="p-6">
                <span className="text-[11px] font-semibold text-text-secondary tracking-[0.04em]">
                  12 FT — DESTINATION
                </span>
                <h3 className="text-lg font-bold text-white mt-2.5 mb-2">데스티네이션 매대</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  K-Beauty 자체가 목적 구매가 되는 완결형 존.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 8. 06 90-DAY EXCHANGE CREDIT - Black luxury card layout */}
        <section id="exchange-credit" className="bg-[#0c0c0c] border-y border-[#2a2a2a]">
          <div className="max-w-[1400px] mx-auto px-[64px] py-[120px] grid lg:grid-cols-2 gap-[72px] items-center text-left">
            
            {/* Left Content Column */}
            <div>
              <span className="text-xs font-semibold text-accent tracking-[0.04em]">
                06 — RISK REDUCTION
              </span>
              <div className="flex items-center gap-3 mt-4 mb-5">
                <h2 className="margin-0 font-display text-4xl font-bold leading-tight text-white tracking-tight">
                  90-Day Exchange Credit
                </h2>
                <span className="text-[11px] font-semibold text-accent border border-[#ff2b75] px-2.5 py-1 rounded-full select-none">
                  업계 유일
                </span>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-[460px]">
                초기 파트너의 가장 큰 부담은 팔리지 않는 재고입니다. 90일 이내 판매 부진 제품을, 판매 가능성 높은 다른 제품으로 교환할 수 있습니다. 재고 부담은 낮추고, 성장의 기회는 계속 열어둡니다.
              </p>

              {/* 4 numeric highlights */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border-t-2 border-[#ff2b75] pt-3.5">
                  <span className="text-2xl font-bold text-white">90일</span>
                  <p className="text-[11px] text-text-secondary mt-1">유연한 교환 기간</p>
                </div>
                <div className="border-t-2 border-[#ff2b75] pt-3.5">
                  <span className="text-2xl font-bold text-white">100%</span>
                  <p className="text-[11px] text-text-secondary mt-1">미판매 제품 교환 가능</p>
                </div>
                <div className="border-t-2 border-[#ff2b75] pt-3.5">
                  <span className="text-2xl font-bold text-white">0%</span>
                  <p className="text-[11px] text-text-secondary mt-1">현금 환불 부담</p>
                </div>
                <div className="border-t-2 border-[#ff2b75] pt-3.5">
                  <span className="text-2xl font-bold text-white">↑</span>
                  <p className="text-[11px] text-text-secondary mt-1">매출 상황에 따라 확대</p>
                </div>
              </div>
            </div>

            {/* Right Card Graphic Column */}
            <div className="bg-[#121214] border border-[#2a2a2a] rounded-[20px] p-10 flex flex-col justify-center">
              
              {/* Floating physical card replica */}
              <div className="w-[280px] max-w-full aspect-[1.6/1] rounded-[12px] bg-gradient-to-br from-[#1c1c1c] to-[#0c0c0c] border border-[#2a2a2a] shadow-2xl p-6 flex flex-col justify-between transform rotate-[-3deg] mx-auto mb-8 relative select-none">
                <div className="flex justify-between items-center">
                  <div className="w-[26px] h-[26px] rounded-[6px] bg-[#ff2b75] flex items-center justify-center color-white font-bold text-xs">
                    K
                  </div>
                  <span className="text-[10px] font-semibold text-[#ff2b75] tracking-widest uppercase">
                    업계 유일
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-white tracking-tight leading-normal whitespace-nowrap">
                    90-Day Exchange Credit
                  </span>
                  <span className="block mt-2.5 text-[10px] text-text-secondary tracking-widest uppercase whitespace-nowrap">
                    K SELECT HUB · PARTNER PROGRAM
                  </span>
                </div>
              </div>

              {/* Optimization cycle */}
              <span className="text-[11px] text-text-secondary tracking-widest uppercase text-left">
                최적화 사이클
              </span>
              
              <div className="flex items-center gap-2 mt-5 mb-7 text-xs font-semibold text-white flex-wrap">
                <span>Launch</span>
                <span className="text-text-secondary">→</span>
                <span>Measure</span>
                <span className="text-text-secondary">→</span>
                <span>Identify</span>
                <span className="text-text-secondary">→</span>
                <span className="text-accent">Exchange</span>
                <span className="text-text-secondary">→</span>
                <span>Optimize</span>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed">
                초기 상품 선택이 완벽하지 않아도 괜찮습니다. K Select가 실제 판매 데이터를 보고 매장의 product mix를 계속 최적화합니다.
              </p>
            </div>

          </div>
        </section>

        {/* 9. LAUNCH PARTNER BENEFITS - 8 modular benefit grids */}
        <section className="bg-[#0c0c0c] border-b border-[#2a2a2a]">
          <div className="max-w-[1400px] mx-auto px-[64px] py-[100px] text-left">
            <div className="text-center max-w-[640px] mx-auto mb-14 flex flex-col items-center">
              
              {/* Highlight badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff2b75]/20 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
                <span className="text-[11px] tracking-[0.1em] font-semibold text-[#ff2b75]">
                  LAUNCH PARTNER · LIMITED BENEFITS
                </span>
              </div>

              <h2 className="font-display text-4xl font-bold leading-[1.25] text-white text-center">
                Early Partners Get More<br />
                <span className="text-xl font-medium text-text-secondary mt-2 block">
                  먼저 시작하는 파트너에게 더 많은 혜택을 제공합니다.
                </span>
              </h2>
            </div>

            {/* 8 items grids split layout */}
            <div className="grid md:grid-cols-4 border-t border-l border-white/10 mb-px">
              
              {/* 01 */}
              <div className="border-r border-b border-white/10 p-[28px_24px]">
                <span className="text-xs text-accent font-semibold">01</span>
                <h4 className="text-sm font-semibold text-white mt-2.5 mb-1">Complimentary Display Fixture</h4>
                <span className="text-xs text-accent block mb-1.5">전용 디스플레이 무상 대여</span>
                <p className="text-[11px] text-text-secondary leading-relaxed">초기 Launch Partner에게 K Select 전용 Display Fixture를 무상 대여합니다.</p>
              </div>

              {/* 02 */}
              <div className="border-r border-b border-white/10 p-[28px_24px]">
                <span className="text-xs text-accent font-semibold">02</span>
                <h4 className="text-sm font-semibold text-white mt-2.5 mb-1">45-Day Payment Terms</h4>
                <span className="text-xs text-accent block mb-1.5">최대 45일 결제 조건</span>
                <p className="text-[11px] text-text-secondary leading-relaxed">자격 요건 충족 시 초기 주문에 대해 최대 45일 payment term을 제공합니다.</p>
              </div>

              {/* 03 */}
              <div className="border-r border-b border-white/10 p-[28px_24px]">
                <span className="text-xs text-accent font-semibold">03</span>
                <h4 className="text-sm font-semibold text-white mt-2.5 mb-1">90-Day Exchange Credit</h4>
                <span className="text-xs text-accent block mb-1.5">90일 상품 교환 크레딧</span>
                <p className="text-[11px] text-text-secondary leading-relaxed">적격 Slow-moving SKU를 더 적합한 상품으로 조정할 수 있습니다.</p>
              </div>

              {/* 04 */}
              <div className="border-r border-b border-white/10 p-[28px_24px]">
                <span className="text-xs text-accent font-semibold">04</span>
                <h4 className="text-sm font-semibold text-white mt-2.5 mb-1">Priority Territory Protection</h4>
                <span className="text-xs text-accent block mb-1.5">우선 지역 보호</span>
                <p className="text-[11px] text-text-secondary leading-relaxed">초기 Launch Partner의 상권과 운영 지역을 우선적으로 보호합니다.</p>
              </div>

            </div>

            <div className="grid md:grid-cols-4 border-l border-white/10 mb-12">
              
              {/* 05 */}
              <div className="border-r border-b border-white/10 p-[22px_20px]">
                <span className="text-[11px] text-text-secondary font-semibold">05</span>
                <h4 className="text-xs font-semibold text-text-secondary mt-2 mb-1">Free Initial Delivery</h4>
                <span className="text-[11px] text-accent block mb-1.5">초기 배송비 지원</span>
                <p className="text-[10px] text-text-secondary leading-relaxed">초도 Launch 시 상품 및 Display 관련 초기 배송비 부담을 지원합니다.</p>
              </div>

              {/* 06 */}
              <div className="border-r border-b border-white/10 p-[22px_20px]">
                <span className="text-[11px] text-text-secondary font-semibold">06</span>
                <h4 className="text-xs font-semibold text-text-secondary mt-2 mb-1">Priority Product Access</h4>
                <span className="text-[11px] text-accent block mb-1.5">신규·독점 상품 우선 공급</span>
                <p className="text-[10px] text-text-secondary leading-relaxed">새로운 K-Beauty 및 일부 Exclusive Product에 우선 접근 기회를 제공합니다.</p>
              </div>

              {/* 07 */}
              <div className="border-r border-b border-white/10 p-[22px_20px]">
                <span className="text-[11px] text-text-secondary font-semibold">07</span>
                <h4 className="text-xs font-semibold text-text-secondary mt-2 mb-1">Personalized Launch Support</h4>
                <span className="text-[11px] text-accent block mb-1.5">맞춤형 런칭 지원</span>
                <p className="text-[10px] text-text-secondary leading-relaxed">매장 규모와 고객 특성에 맞춰 Assortment, Display 및 Setup을 함께 설계합니다.</p>
              </div>

              {/* 08 */}
              <div className="border-r border-b border-white/10 p-[22px_20px]">
                <span className="text-[11px] text-text-secondary font-semibold">08</span>
                <h4 className="text-xs font-semibold text-text-secondary mt-2 mb-1">Post-Launch Category Support</h4>
                <span className="text-[11px] text-accent block mb-1.5">런칭 이후 카테고리 운영 지원</span>
                <p className="text-[10px] text-text-secondary leading-relaxed">판매 데이터, Reorder, Slow Seller 조정 및 Category Optimization을 지속적으로 지원합니다.</p>
              </div>

            </div>

            {/* Bottom mini CTA row */}
            <div className="text-center border-t border-white/10 pt-10">
              <h3 className="font-display text-[22px] font-bold text-white mb-2">
                Launch With Support. Grow With Support.
              </h3>
              <p className="text-xs text-text-secondary mb-8">
                런칭할 때도, 성장할 때도 함께합니다 — 판매 모니터링, Smart Reorder, 상품 교체, Category Optimization까지.
              </p>
              <a
                href="#apply"
                className="h-14 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-8 rounded-[8px] font-semibold text-[15px] transition-colors cursor-pointer"
              >
                런칭 파트너 신청 →
              </a>
            </div>

          </div>
        </section>

        {/* 10. 07 GROWTH SIMULATOR - React simulation tool layout */}
        <section id="simulator-section" className="max-w-[1400px] mx-auto px-[64px] py-[120px] text-left">
          <div className="text-center max-w-[680px] mx-auto mb-14 flex flex-col gap-3">
            <span className="text-xs font-semibold text-accent tracking-[0.04em]">
              07 — GROWTH SIMULATOR
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.25] text-white">
              매장 조건을 입력하면, 예상 결과가 바로 계산됩니다.
            </h2>
            <p className="text-sm text-text-secondary">
              일반적인 계산기가 아닙니다. K Select Hub의 데이터 기반 리테일 성장 도구입니다.
            </p>
          </div>

          <Simulator />
        </section>

        {/* 11. Partnership Process - 3-phase / 6-step timeline diagram */}
        <section id="partnership-timeline" className="bg-[#0c0c0c] border-y border-[#2a2a2a]">
          <div className="max-w-[1400px] mx-auto px-[64px] py-[72px] text-left">
            <h3 className="font-display text-3xl font-bold text-white mb-1">
              From Application to Growth
            </h3>
            <p className="text-sm text-text-secondary mb-10">
              신청부터 매출 최적화까지, K Select가 함께합니다.
            </p>
            
            <div className="grid md:grid-cols-3 gap-px bg-[#2a2a2a] overflow-hidden rounded-[8px]">
              
              {/* Phase 1 */}
              <div className="bg-[#121214] p-8">
                <span className="text-[11px] font-bold text-accent tracking-[0.08em] block mb-4">
                  PLAN (준비 단계)
                </span>
                <div className="flex flex-col gap-4 text-xs font-semibold text-white">
                  <div>
                    <span>01 Apply</span>
                    <p className="text-[11px] text-text-secondary font-medium mt-1">파트너 신청</p>
                  </div>
                  <div>
                    <span>02 Store Review</span>
                    <p className="text-[11px] text-text-secondary font-medium mt-1">매장·상권 분석</p>
                  </div>
                  <div>
                    <span>03 Assortment Design</span>
                    <p className="text-[11px] text-text-secondary font-medium mt-1">맞춤 상품 구성 설계</p>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-[#121214] p-8 flex flex-col justify-between">
                <span className="text-[11px] font-bold text-accent tracking-[0.08em] block mb-4">
                  LAUNCH (실행 단계)
                </span>
                <div className="text-xs font-semibold text-white">
                  <span>04 Display &amp; Launch</span>
                  <p className="text-[11px] text-text-secondary font-medium mt-1">
                    K-Beauty 카테고리를 매장에 구축합니다. (LED Wall Display 모듈 설치)
                  </p>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="bg-[#121214] p-8">
                <span className="text-[11px] font-bold text-accent tracking-[0.08em] block mb-4">
                  GROW (성장 단계)
                </span>
                <div className="flex flex-col gap-4 text-xs font-semibold text-white">
                  <div>
                    <span>05 90-Day Sales Test</span>
                    <p className="text-[11px] text-text-secondary font-medium mt-1">실제 Sell-through 측정</p>
                  </div>
                  <div>
                    <span>06 Optimize &amp; Grow</span>
                    <p className="text-[11px] text-text-secondary font-medium mt-1">Reorder·Slow Seller 조정 및 카테고리 확장</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 12. 08 Partnership CTA section */}
        <section className="max-w-[1400px] mx-auto px-[64px] py-[96px] pb-[120px]">
          <div className="bg-[#0c0c0c] border border-[#2a2a2a] rounded-[20px] overflow-hidden grid lg:grid-cols-[1.2fr_0.8fr] items-stretch text-left">
            
            <div className="p-14 flex flex-col justify-center">
              <span className="text-xs font-semibold text-accent tracking-[0.04em] block">
                08 — PARTNERSHIP
              </span>
              <h2 className="font-display text-[34px] font-bold leading-[1.22] text-white my-3.5">
                초기 K-Beauty<br />
                Launch Partner를<br />
                모집합니다.
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-3 max-w-[420px]">
                상품 선정부터 Display, 재고 관리와 런칭 이후 성장까지 K Select가 함께합니다.
              </p>
              <p className="text-xs text-accent font-semibold mb-6">
                Launch Partner에게는 초기 한정 특별 혜택이 제공됩니다.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#apply"
                  className="h-14 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-7 rounded-[8px] font-semibold text-[15px] transition-colors cursor-pointer"
                >
                  런칭 파트너 신청 →
                </a>
                <a
                  href="#simulator-section"
                  className="h-14 inline-flex items-center justify-center border border-[#2a2a2a] hover:border-white text-white px-7 rounded-[8px] font-semibold text-[15px] transition-colors cursor-pointer"
                >
                  성장 시뮬레이터
                </a>
              </div>
            </div>

            {/* Right side background image slot */}
            <div className="relative min-h-[460px]">
              <Image
                src={assetConfig.storeShowcase.partnershipSection.src}
                alt={assetConfig.storeShowcase.partnershipSection.alt}
                fill
                className="object-cover rounded-r-[20px]"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>

          </div>
        </section>

        {/* [Apply Form Section] */}
        <section className="py-20 max-w-[1400px] mx-auto px-[64px]">
          <CtaForm />
        </section>

      </main>

      {/* 13. Footer - 4 columns navigation */}
      <footer className="border-t border-[#2a2a2a] bg-[#0c0c0c]">
        <div className="max-w-[1400px] mx-auto px-[64px] py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-left">
          
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-[26px] h-[26px] rounded-[6px] bg-[#ff2b75] flex items-center justify-center color-white font-bold text-sm">
                K
              </div>
              <span className="text-base font-bold text-white">K Select Hub</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed max-w-[280px]">
              미국 독립 뷰티 리테일러를 위한 K-Beauty Retail Growth Platform.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-xs text-text-secondary">
            <span className="font-semibold text-white mb-1">솔루션</span>
            <span>제품 큐레이션</span>
            <span>디스플레이 프로그램</span>
            <span>90일 교환 크레딧</span>
            <span>성장 시뮬레이터</span>
          </div>

          <div className="flex flex-col gap-3 text-xs text-text-secondary">
            <span className="font-semibold text-white mb-1">파트너</span>
            <span>파트너 신청</span>
            <span>파트너 로그인</span>
            <span>파트너 리소스</span>
          </div>

          <div className="flex flex-col gap-3 text-xs text-text-secondary">
            <span className="font-semibold text-white mb-1">회사</span>
            <span>소개</span>
            <span>문의하기</span>
            <span>이용약관 · 개인정보처리방침</span>
          </div>

        </div>

        <div className="border-t border-[#2a2a2a] py-5">
          <div className="max-w-[1400px] mx-auto px-[64px] text-xs text-text-secondary text-left">
            <span>© 2026 K Select Hub. All rights reserved. Letusto Inc. HQ New Jersey.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
