export const dynamic = 'force-dynamic';

import React from "react";
import Image from "next/image";
import { ko, LocaleDictionary } from "../locales/ko";
import CtaForm from "./CtaForm";
import Simulator from "./Simulator";
import OpportunitySection from "./OpportunitySection";
import { assetConfig } from "../assets.config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const t = ko as LocaleDictionary; // Cast to bypass TS compilation cache issues

  return (
    <div className="min-h-screen flex flex-col font-body bg-[#141414] text-white overflow-x-hidden selection:bg-[#ff2b75] selection:text-white">
      
      {/* 0. NAV (Header) - Height 88px, sticky nav with backdrop blur */}
      <header className="sticky top-0 z-50 bg-[#141414]/86 backdrop-blur-md border-b border-[#2A2A2A]">
        <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] h-[88px] flex items-center justify-between gap-10">
          <div className="flex items-center gap-[32px] xl:gap-[44px]">
            {/* Logo Click Area expansion - Wraps symbol and text together with negative margin to align left */}
            <a href="/ko" className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#ff2b75] focus:ring-offset-2 focus:ring-offset-[#141414] rounded-card -ml-[12px] sm:-ml-[16px]">
              <div className="relative w-[210px] h-[50px] sm:w-[294px] sm:h-[70px]">
                <Image
                  src={assetConfig.logo.src}
                  alt={assetConfig.logo.alt}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 210px, 294px"
                />
              </div>
            </a>
            {/* Header navigation bar links with whitespace-nowrap and optimized gap */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-semibold text-text-secondary">
              <a href="#opportunity" className="hover:text-accent transition-colors whitespace-nowrap">솔루션</a>
              <a href="#products" className="hover:text-accent transition-colors whitespace-nowrap">제품 큐레이션</a>
              <a href="#display" className="hover:text-accent transition-colors whitespace-nowrap">디스플레이</a>
              <a href="#exchange-credit" className="hover:text-accent transition-colors whitespace-nowrap">신용 프로그램</a>
              <a href="#simulator-section" className="hover:text-accent transition-colors whitespace-nowrap">성장 시뮬레이터</a>
              <a href="#partnership-timeline" className="hover:text-accent transition-colors whitespace-nowrap">파트너 리소스</a>
            </nav>
          </div>

          <div className="flex items-center gap-[20px]">
            {/* Language Selector UI (Language -> 로그인 -> 파트너 신청) */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
              <span className="text-white font-bold cursor-pointer" aria-label="Korean active selection">KR</span>
              <span className="text-text-muted select-none">|</span>
              <span className="hover:text-white cursor-pointer transition-colors" aria-label="English locale selection waiting">EN</span>
            </div>
            
            <a
              href="https://portal.kselecthub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-text-secondary hover:text-white transition-all focus:outline-none focus:underline"
            >
              로그인
            </a>
            <div className="w-px h-5 bg-[#2A2A2A]" />
            
            <a
              id="btn-header-apply"
              data-analytics="header-apply"
              href="#apply"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-[#ff2b75] hover:bg-[#e01a5e] text-white text-xs font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2b75]"
            >
              파트너 신청 
              {/* Inline SVG arrow instead of broken icons */}
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1">
        
        {/* 1. HERO SECTION - desktop matching exactly 1.05fr 0.95fr split layout */}
        <section className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[80px] lg:py-[96px] grid lg:grid-cols-[1.05fr_0.95fr] gap-[64px] items-center text-left relative">
          
          {/* Left Hero Narrative */}
          <div className="flex flex-col items-start animate-fade-in z-10">
            
            {/* Eyebrow Label with pill design */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ff2b75]/20 bg-[#ff2b75]/5 mb-7 transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
              <span className="text-[10px] tracking-[0.08em] font-semibold text-[#ff2b75]">
                K-BEAUTY RETAIL GROWTH PLATFORM
              </span>
            </div>

            {/* Headline with exact visual highlights */}
            <h1 className="margin-0 font-display text-4xl sm:text-5xl lg:text-[56px] font-black leading-[1.12] tracking-tight text-white mb-6 select-none animate-slide-up">
              제품을 파는 게 아니라,<br />
              매장의 <span className="text-[#ff2b75]">K-Beauty 카테고리</span>와 <span className="text-[#ff2b75]">매출</span>을 설계합니다.
            </h1>

            {/* Subcopy with specified constraints */}
            <p className="margin-0 text-xs sm:text-sm leading-relaxed text-text-secondary mb-9 max-w-[540px]">
              검증된 제품 큐레이션부터 매장 맞춤 디스플레이, 런칭 이후 상품 최적화까지 — K Select Hub는 독립 Beauty Supply 매장의 K-Beauty 카테고리 성장을 함께 설계합니다.
            </p>

            {/* CTAs with Click Tracking Attributes */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-9 w-full sm:w-auto">
              <a
                id="btn-hero-apply"
                data-analytics="hero-apply"
                href="#apply"
                className="h-14 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-8 rounded-[8px] font-semibold text-[15px] transition-all hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,43,117,0.4)] active:translate-y-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2b75] focus:ring-offset-2 focus:ring-offset-[#141414]"
              >
                파트너 신청하기 →
              </a>
              <a
                id="btn-hero-simulator"
                data-analytics="hero-simulator"
                href="#simulator-section"
                className="h-14 inline-flex items-center justify-center border border-[#2a2a2a] hover:border-white hover:bg-white/5 text-white px-8 rounded-[8px] font-semibold text-[15px] transition-all active:scale-[0.98] cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
              >
                성장 시뮬레이터 보기
              </a>
            </div>

            {/* Benefits Check Labels with Pure Inline SVGs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-[28px] gap-y-3 mt-2">
              <span className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-white transition-colors duration-200">
                {/* Check Circle SVG */}
                <svg className="w-4 h-4 text-[#ff2b75] fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                검증된 제품 큐레이션
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-white transition-colors duration-200">
                {/* Grid Layout SVG */}
                <svg className="w-4 h-4 text-[#ff2b75] fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                매장 맞춤 상품 구성
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-white transition-colors duration-200">
                {/* Refresh/Shield SVG */}
                <svg className="w-4 h-4 text-[#ff2b75] fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                런칭 후 지속 최적화
              </span>
            </div>

          </div>

          {/* Right Hero Visuals with Layered Floating Cards */}
          <div className="relative animate-fade-in delay-200 mt-10 lg:mt-0">
            
            {/* Base Photography Asset with priority rendering */}
            <div className="relative w-full h-[360px] sm:h-[500px] lg:h-[560px] rounded-[20px] overflow-hidden border border-[#2a2a2a] bg-[#121214]">
              <Image
                src={assetConfig.storeShowcase.heroSection.src}
                alt={assetConfig.storeShowcase.heroSection.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              {/* Soft Left-to-Right layout fade overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent z-0" />
            </div>

            {/* Simplified Overlay Card: Display Options (Matches 시안) */}
            <div className="absolute top-6 right-[-10px] sm:right-[-28px] w-[220px] sm:w-[250px] bg-[#121214]/85 backdrop-blur-md border border-[#2a2a2a] rounded-[16px] p-4 sm:p-5 shadow-2xl z-10 flex flex-col gap-3 text-left animate-subtle-float">
              <span className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">
                Display Options
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-display text-lg font-black text-white">4FT / 8FT / 12FT</span>
                <span className="text-[9px] text-[#ff2b75] font-semibold">모듈형 숍인숍 무상 대여 지원</span>
              </div>
            </div>

            {/* Simplified Overlay Card 2: Launch Support */}
            <div className="absolute bottom-6 left-[-10px] sm:left-[-28px] w-[210px] sm:w-[230px] bg-[#121214]/85 backdrop-blur-md border border-[#2a2a2a] rounded-[16px] p-4 shadow-2xl z-10 flex flex-col gap-2 text-left animate-subtle-float">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-text-secondary uppercase">Launch Support</span>
                <span className="text-accent text-[9px] border border-[#ff2b75]/30 px-2 py-0.5 rounded-full bg-[#ff2b75]/5">1:1</span>
              </div>
              <p className="text-[10px] text-text-secondary leading-normal">
                Assortment · Setup · Merchandising 지원을 제공합니다.
              </p>
            </div>

          </div>

          {/* Scroll Down Indicator - Small, subtle anchor */}
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 text-center pointer-events-none select-none z-10">
            <span className="font-display text-[9px] tracking-[0.2em] text-text-secondary">SCROLL</span>
            <svg className="w-4 h-4 animate-bounce text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* 2. EVIDENCE STRIP - 4 columns premium B2B statistics */}
        {/* 2. EVIDENCE STRIP - 4 columns premium B2B statistics */}
        <section className="border-y border-[#2a2a2a] bg-[#0c0c0c] relative z-10 mt-10 lg:mt-0">
          <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-9 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 text-left">
            <div className="flex flex-col gap-1.5 pr-4 lg:border-r border-[#2a2a2a]/60">
              <span className="font-display text-3xl sm:text-[38px] font-black text-white leading-none">3 Display Formats</span>
              <span className="text-[10px] text-accent uppercase tracking-widest font-black">4FT / 8FT / 12FT</span>
              <p className="text-[11px] text-text-secondary">매장 맞춤 모듈 디스플레이 규격</p>
            </div>
            <div className="flex flex-col gap-1.5 px-0 lg:px-4 lg:border-r border-[#2a2a2a]/60">
              <span className="font-display text-3xl sm:text-[38px] font-black text-[#ff2b75] leading-none">90-Day Exchange Credit</span>
              <span className="text-[10px] text-accent uppercase tracking-widest font-black">Slow Seller Risk Reduction</span>
              <p className="text-[11px] text-text-secondary">판매 저조 재고 100% 교환 리스크 방지</p>
            </div>
            <div className="flex flex-col gap-1.5 px-0 lg:px-4 lg:border-r border-[#2a2a2a]/60">
              <span className="font-display text-3xl sm:text-[38px] font-black text-white leading-none">8 Launch Partner Benefits</span>
              <span className="text-[10px] text-accent uppercase tracking-widest font-black">Early Partner Advantages</span>
              <p className="text-[11px] text-text-secondary">초기 런칭 파트너를 위한 독점 혜택</p>
            </div>
            <div className="flex flex-col gap-1.5 pl-0 lg:pl-4">
              <span className="font-display text-3xl sm:text-[38px] font-black text-white leading-none">Ongoing Optimization</span>
              <span className="text-[10px] text-accent uppercase tracking-widest font-black">Measure · Reorder · Grow</span>
              <p className="text-[11px] text-text-secondary">실시간 데이터를 통한 지속 매출 성장</p>
            </div>
          </div>
        </section>

        {/* 3. 01 OPPORTUNITY - WHY NOW? (Visual Fidelity Reproduction with Client Scroll Animations) */}
        <OpportunitySection />
        
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
            <div className="flex items-center mb-4 -ml-[12px] sm:-ml-[16px]">
              <div className="relative w-[210px] h-[50px] sm:w-[294px] sm:h-[70px]">
                <Image
                  src={assetConfig.logo.src}
                  alt={assetConfig.logo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 210px, 294px"
                />
              </div>
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
