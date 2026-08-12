export const dynamic = 'force-dynamic';

import React from "react";
import Image from "next/image";
import { ko, LocaleDictionary } from "../locales/ko";
import CtaForm from "./CtaForm";
import Simulator from "./Simulator";
import OpportunitySection from "./OpportunitySection";
import ChallengesSection from "./ChallengesSection";
import SolutionSection from "./SolutionSection";
import CurationSection from "./CurationSection";
import DisplaySection from "./DisplaySection";
import PartnerModal from "./PartnerModal";
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
        
        {/* 4. 02 PROBLEM - RETAILER CHALLENGES (Visual Fidelity Reproduction with Client Scroll Animations) */}
        <ChallengesSection />

        {/* 5. 03 SOLUTION - 5 core standard chips + 3 feature cards */}
        {/* 5. 03 SOLUTION - K SELECT SOLUTION (Visual Fidelity Reproduction with Client Interaction Orbit) */}
        <SolutionSection />

        {/* 6. 04 PRODUCT CURATION - Interactive Selection & Showcase Curation Component */}
        <CurationSection />

        {/* 7. 05 DISPLAY PROGRAM - Interactive K-Beauty Category Display Component */}
        <DisplaySection />

        {/* 8. 06 90-DAY EXCHANGE CREDIT - Black luxury card layout */}
        <section id="exchange-credit" className="bg-[#0c0c0c] border-y border-[#2a2a2a]">
          <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px] grid lg:grid-cols-[0.52fr_0.48fr] gap-12 lg:gap-[72px] items-center text-left">
            
            {/* Left Content Column */}
            <div>
              <span className="text-xs font-black text-accent tracking-[0.08em] uppercase">
                06 — RISK REDUCTION
              </span>
              <div className="flex flex-wrap items-center gap-3 mt-4 mb-5">
                <h2 className="margin-0 font-display text-3xl sm:text-[38px] font-bold leading-tight text-white tracking-tight">
                  90-Day Exchange Credit
                </h2>
                <span className="text-[9.5px] font-black text-[#ff2b75] bg-[#ff2b75]/8 border border-[#ff2b75]/25 px-3 py-1 rounded-full uppercase tracking-wider select-none">
                  Launch Partner Benefit
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-[13.5px] text-[#9ca3af] leading-relaxed max-w-xl font-medium">
                  초기 파트너에게 가장 큰 부담은 팔리지 않는 재고입니다. K SELECT HUB는 첫 90일 동안 실제 판매 데이터를 확인하고, <strong className="text-white font-bold">판매율이 50% 미만인 대상 SKU를 더 적합한 상품으로 교환할 수 있는 Exchange Credit</strong>을 제공합니다.
                </p>
                <p className="text-[13.5px] text-[#ff2b75] leading-relaxed max-w-xl font-bold">
                  목적은 반품이 아니라, 매장에 더 잘 맞는 상품 구성으로 최적화하는 것입니다. (Better Product Mix Optimization)
                </p>
              </div>

              {/* 4 numeric highlights */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-8 mt-8">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[20px] font-black text-white leading-none">90 DAYS</span>
                  <span className="text-[10px] text-[#7A7A7A] font-bold uppercase tracking-wider mt-1">
                    초기 성과 측정 기간 (Initial Performance Window)
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[20px] font-black text-white leading-none">&lt; 50% SELL-THROUGH</span>
                  <span className="text-[10px] text-[#7A7A7A] font-bold uppercase tracking-wider mt-1">
                    교환 검토 기준 (Sell-Through Target for Exchange)
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[20px] font-black text-white leading-none">EXCHANGE CREDIT</span>
                  <span className="text-[10px] text-[#7A7A7A] font-bold uppercase tracking-wider mt-1">
                    상품 교환 크레딧 발급 (Eligible SKU Replacement Credit)
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[20px] font-black text-white leading-none">DATA-BASED MATCH</span>
                  <span className="text-[10px] text-[#7A7A7A] font-bold uppercase tracking-wider mt-1">
                    실제 판매 데이터 기반 재구성 (Assortment Optimization)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Card Graphic Column */}
            <div className="bg-[#0c0c0c] border border-white/10 rounded-[20px] p-8 sm:p-10 flex flex-col justify-center shadow-xl">
              
              {/* Floating physical card replica */}
              <div className="w-[300px] max-w-full aspect-[1.58/1] rounded-[16px] bg-gradient-to-br from-[#18181a] via-[#0e0e10] to-[#070708] border border-white/10 shadow-2xl p-6 flex flex-col justify-between transform rotate-[-2.5deg] mx-auto mb-8 relative select-none">
                <div className="flex justify-between items-center">
                  <div className="w-[30px] h-[30px] rounded-[8px] bg-[#ff2b75] flex items-center justify-center text-white font-black text-sm">
                    K
                  </div>
                  <span className="text-[8.5px] font-black text-[#ff2b75] bg-[#ff2b75]/10 border border-[#ff2b75]/20 px-2 py-0.5 rounded-[4px] tracking-wider uppercase font-display">
                    Launch Partner Program
                  </span>
                </div>
                <div>
                  <span className="block text-[14.5px] font-black text-white tracking-tight leading-normal uppercase">
                    Inventory Risk Protection
                  </span>
                  <span className="block mt-1 text-[9.5px] text-[#ff2b75] font-black tracking-widest uppercase">
                    Powered by 90-Day Exchange Credit
                  </span>
                </div>
              </div>

              {/* Optimization cycle */}
              <span className="text-[9.5px] text-[#7A7A7A] tracking-wider font-black uppercase text-left border-b border-white/10 pb-2">
                최적화 운영 시스템 (Optimization Refinement System)
              </span>
              
              <div className="flex items-center gap-2 mt-4 mb-4 text-[10.5px] font-black text-white flex-wrap">
                <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-[4px]">Launch</span>
                <span className="text-[#7A7A7A]">→</span>
                <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-[4px]">Measure</span>
                <span className="text-[#7A7A7A]">→</span>
                <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-[4px]">Identify</span>
                <span className="text-[#7A7A7A]">→</span>
                <span className="px-2 py-0.5 bg-[#ff2b75]/10 border border-[#ff2b75]/35 text-[#ff2b75] rounded-[4px] shadow-[0_0_8px_rgba(255,43,117,0.1)]">Exchange</span>
                <span className="text-[#7A7A7A]">→</span>
                <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-[4px]">Optimize</span>
              </div>

              <div className="flex flex-col gap-2.5 text-left pt-2">
                <p className="text-[12.5px] text-[#9ca3af] leading-relaxed">
                  초기 상품 구성이 완벽하지 않아도 괜찮습니다. K SELECT HUB는 실제 판매 데이터를 보고, 판매율이 낮은 SKU를 더 적합한 상품으로 교환하며 product mix를 최적화합니다.
                </p>
                <p className="text-[12px] text-[#ff2b75] font-black tracking-tight leading-relaxed">
                  * 본 프로그램은 현금 환불(Cash Refund)이 아닌 더 나은 상품군 교환(Exchange Credit)을 지원합니다.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 9. LAUNCH PARTNER BENEFITS - 3 High-Emphasis Core + 4 Subdued Supports */}
        <section className="bg-[#0c0c0c] border-b border-[#2a2a2a]">
          <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px] text-left">
            
            {/* Header info */}
            <div className="text-center max-w-[720px] mx-auto mb-16 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
                <span className="text-[10px] tracking-[0.12em] font-black text-white/70 uppercase font-display">
                  LAUNCH PARTNER · LIMITED BENEFITS
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-[38px] font-bold leading-[1.22] text-white text-center tracking-tight m-0">
                {locale === "ko" ? "먼저 시작하는 파트너가 더 유리한 조건을 선점합니다." : "Launch Earlier. Secure More. Grow Faster."}
              </h2>
              <p className="text-[13.5px] text-[#9ca3af] mt-4 max-w-xl text-center leading-relaxed font-medium">
                초기 Launch Partner에게는 일반 파트너보다 더욱 특별한 진입 조건과 전폭적인 리테일 인프라 지원을 제공하여 초기 부담을 낮추고 빠르게 지역 K-Beauty 시장을 선점하도록 돕습니다.
              </p>
            </div>

            {/* SECTION 1: 3 High-Emphasis Core Benefits (Large 3-Column Layout) */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              
              {/* Core 01 */}
              <div className="border border-white/15 bg-white/[0.02] rounded-[20px] p-8 flex flex-col justify-between shadow-lg hover:border-white/20 transition-all duration-300">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display">
                    CORE BENEFIT 01
                  </span>
                  <h3 className="text-[19px] font-bold text-white tracking-tight leading-snug">
                    Complimentary Display Fixture Rental
                    <span className="block text-[14px] text-white/50 font-normal mt-1">전용 디스플레이 무상 대여</span>
                  </h3>
                  <p className="text-[12.5px] text-[#9ca3af] leading-relaxed mt-2 font-medium">
                    초기 Launch Partner의 초기 인프라 구축 부담을 완전히 제거하기 위해, K SELECT HUB 전용 LED 모듈형 Display Fixture를 무상으로 대여해 드립니다.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 mt-6">
                  <span className="text-[10.5px] text-[#ff2b75] font-bold">초기 집기 투자 비용 $0</span>
                </div>
              </div>

              {/* Core 02 */}
              <div className="border border-[#ff2b75]/30 bg-[#ff2b75]/[0.01] rounded-[20px] p-8 flex flex-col justify-between shadow-lg shadow-pink-950/5 hover:border-[#ff2b75]/40 transition-all duration-300">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display">
                      CORE BENEFIT 02
                    </span>
                    <span className="text-[8.5px] font-black text-[#ff2b75] bg-[#ff2b75]/10 border border-[#ff2b75]/25 px-2 py-0.5 rounded-[4px] tracking-wider uppercase font-display">
                      FIRST ORDER ONLY
                    </span>
                  </div>
                  <h3 className="text-[19px] font-bold text-white tracking-tight leading-snug">
                    45-Day Payment Terms
                    <span className="block text-[14px] text-white/50 font-normal mt-1">첫 주문 한정 최대 45일 결제 조건</span>
                  </h3>
                  <p className="text-[12.5px] text-[#9ca3af] leading-relaxed mt-2 font-medium">
                    초기 제품 사입 자금의 유동성을 원활하게 확보하고 부담을 경감할 수 있도록, 첫 번째 런칭 주문 한정에 대해 최대 45일의 Payment Terms 조건을 파격적으로 제공합니다.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 mt-6">
                  <span className="text-[10.5px] text-[#ff2b75] font-bold">첫 초도 물량 도입 자금 유예</span>
                </div>
              </div>

              {/* Core 03 */}
              <div className="border border-white/15 bg-white/[0.02] rounded-[20px] p-8 flex flex-col justify-between shadow-lg hover:border-white/20 transition-all duration-300">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display">
                    CORE BENEFIT 03
                  </span>
                  <h3 className="text-[19px] font-bold text-white tracking-tight leading-snug">
                    Priority Territory Protection
                    <span className="block text-[14px] text-white/50 font-normal mt-1">우선 지역 / 독점 상권 보호</span>
                  </h3>
                  <p className="text-[12.5px] text-[#9ca3af] leading-relaxed mt-2 font-medium">
                    먼저 진입한 매장의 선점 효과와 안정적인 장기 매출 독점권을 지켜드리기 위해, 지역 상권 내 타 리테일러 입점을 제한하고 우선권을 엄격히 보장합니다.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 mt-6">
                  <span className="text-[10.5px] text-[#ff2b75] font-bold">상권 내 K-Beauty 경쟁 차단</span>
                </div>
              </div>

            </div>

            {/* SECTION 2: 4 Subdued Supports (Clean 4-Column Layout) */}
            <div className="grid md:grid-cols-4 gap-6 mb-16 border-t border-white/10 pt-12">
              
              {/* Sub 04 */}
              <div className="flex flex-col gap-2.5 p-1 text-left">
                <span className="text-[11px] text-[#7A7A7A] font-black uppercase font-display">SUPPORT 04</span>
                <h4 className="text-[13.5px] font-bold text-white">Free Initial Delivery</h4>
                <span className="text-[11px] text-[#ff2b75] font-bold">초기 배송비 전액 지원</span>
                <p className="text-[11.5px] text-[#9ca3af] leading-relaxed font-medium">
                  첫 런칭 시 무거운 전용 LED Display Fixture 및 초도 상품군의 물류 배송비 일체를 K SELECT가 전액 지원합니다.
                </p>
              </div>

              {/* Sub 05 */}
              <div className="flex flex-col gap-2.5 p-1 text-left">
                <span className="text-[11px] text-[#7A7A7A] font-black uppercase font-display">SUPPORT 05</span>
                <h4 className="text-[13.5px] font-bold text-white">Display Setup Support</h4>
                <span className="text-[11px] text-[#ff2b75] font-bold">초기 디스플레이 셋업 지원</span>
                <p className="text-[11.5px] text-[#9ca3af] leading-relaxed font-medium">
                  Fixture 조립부터 테스터 배치, 그리고 고객 시선을 극대화하는 Merchandising 상품 진열 가이드를 지원하여 즉시 판매 상태로 진입하게 돕습니다.
                </p>
              </div>

              {/* Sub 06 */}
              <div className="flex flex-col gap-2.5 p-1 text-left">
                <span className="text-[11px] text-[#7A7A7A] font-black uppercase font-display">SUPPORT 06</span>
                <h4 className="text-[13.5px] font-bold text-white">Priority Product Access</h4>
                <span className="text-[11px] text-[#ff2b75] font-bold">신규·독점 상품 우선 공급</span>
                <p className="text-[11.5px] text-[#9ca3af] leading-relaxed font-medium">
                  새롭게 런칭하는 트렌디한 인디 K-Beauty 신제품 및 특정 브랜드의 독점 SKU 배정 시 Launch Partner에게 최우선권을 제공합니다.
                </p>
              </div>

              {/* Sub 07 */}
              <div className="flex flex-col gap-2.5 p-1 text-left">
                <span className="text-[11px] text-[#7A7A7A] font-black uppercase font-display">SUPPORT 07</span>
                <h4 className="text-[13.5px] font-bold text-white">Personalized Launch Support</h4>
                <span className="text-[11px] text-[#ff2b75] font-bold">맞춤형 런칭 지원</span>
                <p className="text-[11.5px] text-[#9ca3af] leading-relaxed font-medium">
                  매장 면적, 핵심 단골 연령대, 가격 민감도를 모두 분석하여 매장에 100% 최적화된 초도 Assortment(AP) 설계 및 판매 매뉴얼을 밀착 매핑합니다.
                </p>
              </div>

            </div>

            {/* Bottom Closing Panel */}
            <div className="text-center border-t border-white/10 pt-14 max-w-[800px] mx-auto flex flex-col items-center">
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-3">
                {locale === "ko" ? "선점의 가치" : "VALUE OF TIMING"}
              </span>
              <h3 className="font-display text-[20px] sm:text-[23px] font-bold text-white mb-2 tracking-tight">
                {locale === "ko" ? "먼저 시작할수록, 더 유리한 조건으로 성장할 수 있습니다." : "Launch Earlier. Secure More. Grow Faster."}
              </h3>
              <p className="text-[12.5px] text-[#9ca3af] mb-8 font-medium">
                {locale === "ko" 
                  ? "디스플레이 지원부터 결제 유예, 상권 독점 보호까지 — 런칭 파트너 자격은 상권 내 최초 신청 매장에게 우선권이 제공됩니다." 
                  : "From display rentals to deferred terms and region protection — early launch slots are limited per local territory."
                }
              </p>
              <a
                href="#apply"
                className="h-14 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-9 rounded-[8px] font-bold text-[14.5px] tracking-wide transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_15px_rgba(255,43,117,0.2)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2b75]"
              >
                {locale === "ko" ? "런칭 파트너 우선 신청하기 →" : "Apply as a Launch Partner →"}
              </a>
            </div>

          </div>
        </section>

        {/* 10. 07 GROWTH SIMULATOR - Redesigned interactive diagnostic teaser layout */}
        <section id="simulator-section" className="max-w-[1400px] mx-auto px-[64px] py-[120px] text-left">
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

        {/* [Apply Form Popup Modal Listener] */}
        <PartnerModal />

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
