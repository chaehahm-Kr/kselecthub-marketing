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
import ReadinessSection from "./ReadinessSection";
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
              href="#launch-readiness"
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
                href="#launch-readiness"
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

        {/* 9. LAUNCH PARTNER BENEFITS - Core 3 + Additional 4 Premium Package Layout */}
        <section className="bg-[#0c0c0c] border-b border-[#2a2a2a] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px] text-left relative">
            
            {/* Header info */}
            <div className="text-center max-w-[840px] mx-auto mb-12 flex flex-col items-center">
              <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 mb-7 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                <span className="text-[11.5px] tracking-[0.18em] font-black text-[#00F0FF] uppercase font-display select-none">
                  LAUNCH PARTNER ONLY · Early Partner Exclusive
                </span>
              </div>
              <div className="font-display text-[26px] sm:text-[34px] md:text-[40px] lg:text-[46px] xl:text-[48px] font-black text-[#00F0FF] tracking-tight mb-3 uppercase italic leading-none select-none">
                Launch Earlier, Secure More, Grow Faster.
              </div>
              <h2 className="font-display text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px] lg:text-[35px] xl:text-[36px] font-black leading-none text-white text-center tracking-tight m-0 whitespace-nowrap break-keep">
                {locale === "ko" ? "먼저 시작할수록 더 유리한 조건으로 출발합니다." : "Launch Earlier. Secure More. Grow Faster."}
              </h2>
              <p className="text-[14.5px] text-[#9ca3af] mt-5 max-w-2xl text-center leading-relaxed font-medium hidden md:block">
                초기 Launch Partner에게만 제공되는 우선 혜택으로 도입 부담은 낮추고,<br />
                지역·상권 선점과 성공적인 런칭 속도는 높여드립니다.
              </p>
              <p className="text-[13.5px] text-[#9ca3af] mt-4 text-center leading-relaxed font-medium md:hidden px-4">
                초기 Launch Partner에게만 제공되는 우선 혜택으로 도입 부담은 낮추고, 지역·상권 선점과 성공적인 런칭 속도는 높여드립니다.
              </p>
            </div>

            {/* Metric-style Summary 요약 스트립 (Scaled up and Neon Cyan highlights) */}
            <div className="max-w-[1000px] mx-auto mb-14 bg-white/[0.03] border border-white/15 rounded-full py-4.5 px-8 sm:px-12 flex flex-wrap items-center justify-between gap-y-3 gap-x-8 text-[13.5px] font-bold text-white/90 select-none shadow-md">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" /> 7 Exclusive Benefits
              </span>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" /> 45-Day First Order Terms
              </span>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" /> Territory Priority
              </span>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <span className="flex items-center gap-2 text-[#00F0FF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" /> Free Initial Delivery
              </span>
            </div>

            {/* SECTION A: Core 3 Benefits (Large High-Emphasis Cards with Stagger Hover Glow) */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              
              {/* Core 01 */}
              <div className="group border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent rounded-[24px] p-8 flex flex-col justify-between shadow-xl hover:-translate-y-2.5 hover:border-[#ff2b75]/40 hover:shadow-[0_8px_30px_rgba(255,43,117,0.1)] transition-all duration-300">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-[#00F0FF] font-black tracking-widest uppercase font-display bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-2 py-0.5 rounded-[4px]">
                      EXCLUSIVE BENEFIT 01
                    </span>
                    {/* Display Icon */}
                    <svg className="w-6 h-6 text-white/40 group-hover:text-[#00F0FF] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-[20px] font-black text-white tracking-tight leading-snug">
                    Complimentary Fixture Rental
                    <span className="block text-[14px] text-white/50 font-normal mt-1">전용 디스플레이 <span className="text-[#00F0FF] font-semibold">무상 대여</span></span>
                  </h3>
                  <p className="text-[13px] text-[#9ca3af] leading-relaxed font-medium">
                    K-Beauty 모듈형 전용 LED 디스플레이 쇼케이스 집기 전체를 100% 무상으로 렌탈 대여해 드립니다.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 mt-8 flex justify-between items-center text-[11px] font-bold">
                  <span className="text-white/60">초기 집기 시설 구축 비용</span>
                  <span className="text-[#00F0FF] text-[12px] font-extrabold uppercase">$0 Free Rental</span>
                </div>
              </div>

              {/* Core 02 */}
              <div className="group border border-[#ff2b75]/25 bg-gradient-to-b from-[#ff2b75]/[0.02] to-transparent rounded-[24px] p-8 flex flex-col justify-between shadow-xl hover:-translate-y-2.5 hover:border-[#ff2b75]/60 hover:shadow-[0_8px_30px_rgba(255,43,117,0.18)] transition-all duration-300">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-[#00F0FF] font-black tracking-widest uppercase font-display bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-2 py-0.5 rounded-[4px]">
                      EXCLUSIVE BENEFIT 02
                    </span>
                    {/* Payment Terms Icon */}
                    <svg className="w-6 h-6 text-white/40 group-hover:text-[#00F0FF] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-[20px] font-black text-white tracking-tight leading-snug">
                    45-Day Payment Terms
                    <span className="block text-[14px] text-white/50 font-normal mt-1">첫 주문 최대 <span className="text-[#00F0FF] font-semibold">45일 결제 유예</span></span>
                  </h3>
                  <p className="text-[13px] text-[#9ca3af] leading-relaxed font-medium">
                    초도 사입 자금의 부담을 원천 경감하기 위해 첫 런칭 사입액에 한해 최대 45일의 결제 Terms를 지급합니다.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 mt-8 flex justify-between items-center text-[11px] font-bold">
                  <span className="text-white/60">초도 오더 결제 유예</span>
                  <span className="text-[#00F0FF] text-[12.5px] font-extrabold uppercase bg-[#00F0FF]/10 px-2.5 py-0.5 rounded-[4px]">FIRST ORDER ONLY</span>
                </div>
              </div>

              {/* Core 03 */}
              <div className="group border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent rounded-[24px] p-8 flex flex-col justify-between shadow-xl hover:-translate-y-2.5 hover:border-[#ff2b75]/40 hover:shadow-[0_8px_30px_rgba(255,43,117,0.1)] transition-all duration-300">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-[#00F0FF] font-black tracking-widest uppercase font-display bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-2 py-0.5 rounded-[4px]">
                      EXCLUSIVE BENEFIT 03
                    </span>
                    {/* Protection Shield Icon */}
                    <svg className="w-6 h-6 text-white/40 group-hover:text-[#00F0FF] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-[20px] font-black text-white tracking-tight leading-snug">
                    Priority Territory Protection
                    <span className="block text-[14px] text-white/50 font-normal mt-1">상권 내 <span className="text-[#00F0FF] font-semibold">독점적 지위 보호</span> 보장</span>
                  </h3>
                  <p className="text-[13px] text-[#9ca3af] leading-relaxed font-medium">
                    상권 선점 효과를 독점 보장하기 위해 일정 반경 내 타 리테일러 입점을 제한하고 상권 독점 보호를 약속합니다.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 mt-8 flex justify-between items-center text-[11px] font-bold">
                  <span className="text-white/60">지역 파트너 선점 권리 보증</span>
                  <span className="text-[#00F0FF] text-[12.5px] font-extrabold uppercase">Territory Protection</span>
                </div>
              </div>

            </div>

            {/* SECTION B: Additional 4 Supporting Benefits (Subdued, Clean Layout with stagger hovers) */}
            <div className="grid md:grid-cols-4 gap-6 mb-16 border-t border-white/10 pt-12">
              
              {/* Sub 04 */}
              <div 
                className="group bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-[#00F0FF]/50 rounded-[16px] p-6 flex flex-col gap-3 text-left transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_8px_25px_rgba(0,240,255,0.12)] animate-fade-in opacity-0"
                style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#7A7A7A] font-black font-display tracking-widest uppercase">SUPPORT 04</span>
                  {/* Delivery Icon */}
                  <svg className="w-5 h-5 text-white/30 group-hover:text-[#00F0FF] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h4 className="text-[14.5px] font-bold text-white leading-tight">Free Initial Delivery</h4>
                <p className="text-[11.5px] text-[#9ca3af] leading-relaxed font-medium">
                  첫 런칭 시 무거운 LED Fixture 장비와 초도 뷰티 상품군의 초기 물류 배송비를 전액 지원합니다.
                </p>
              </div>

              {/* Sub 05 */}
              <div 
                className="group bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-[#00F0FF]/50 rounded-[16px] p-6 flex flex-col gap-3 text-left transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_8px_25px_rgba(0,240,255,0.12)] animate-fade-in opacity-0"
                style={{ animationDelay: "450ms", animationFillMode: "forwards" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#7A7A7A] font-black font-display tracking-widest uppercase">SUPPORT 05</span>
                  {/* Setup Icon */}
                  <svg className="w-5 h-5 text-white/30 group-hover:text-[#00F0FF] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-[14.5px] font-bold text-white leading-tight">Display Setup Support</h4>
                <p className="text-[11.5px] text-[#9ca3af] leading-relaxed font-medium">
                  스토어 내에 매대 조립, 상품 배치, 테스터 설치 등 최적화된 Merchandising 진열 셋업을 밀착 지원합니다.
                </p>
              </div>

              {/* Sub 06 */}
              <div 
                className="group bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-[#00F0FF]/50 rounded-[16px] p-6 flex flex-col gap-3 text-left transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_8px_25px_rgba(0,240,255,0.12)] animate-fade-in opacity-0"
                style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#7A7A7A] font-black font-display tracking-widest uppercase">SUPPORT 06</span>
                  {/* Access Star Icon */}
                  <svg className="w-5 h-5 text-white/30 group-hover:text-[#00F0FF] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h4 className="text-[14.5px] font-bold text-white leading-tight">Priority Product Access</h4>
                <p className="text-[11.5px] text-[#9ca3af] leading-relaxed font-medium">
                  신규 발굴되는 트렌디한 K-Beauty 신제품 및 일부 독점 브랜드 제품 공급 시 최우선 권리를 제공합니다.
                </p>
              </div>

              {/* Sub 07 */}
              <div 
                className="group bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-[#00F0FF]/50 rounded-[16px] p-6 flex flex-col gap-3 text-left transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_8px_25px_rgba(0,240,255,0.12)] animate-fade-in opacity-0"
                style={{ animationDelay: "750ms", animationFillMode: "forwards" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#7A7A7A] font-black font-display tracking-widest uppercase">SUPPORT 07</span>
                  {/* Personalized Launch Target Icon */}
                  <svg className="w-5 h-5 text-white/30 group-hover:text-[#00F0FF] group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h4 className="text-[14.5px] font-bold text-white leading-tight">Personalized Launch Support</h4>
                <p className="text-[11.5px] text-[#9ca3af] leading-relaxed font-medium">
                  매장 상권 데이터와 면적, 고객 성향을 기반으로 최적화된 맞춤형 Assortment 설계 분석을 제공합니다.
                </p>
              </div>

            </div>

            {/* Bottom Closing Panel */}
            <div className="text-center border-t border-white/10 pt-14 max-w-[800px] mx-auto flex flex-col items-center">
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-3 select-none">
                {locale === "ko" ? "선점의 가치" : "VALUE OF TIMING"}
              </span>
              <h3 className="font-display text-[20px] sm:text-[24px] font-black text-white mb-2 tracking-tight">
                {locale === "ko" ? "먼저 시작할수록, 더 유리한 조건으로 성장할 수 있습니다." : "Launch Earlier. Secure More. Grow Faster."}
              </h3>
              <p className="text-[12.5px] text-[#9ca3af] mb-8 font-medium">
                디스플레이 무상 대여부터 첫 결제 유예, 상권 독점 보호까지 — 런칭 파트너 자격은 상권 내 최초 신청 매장에게 우선권이 제공됩니다.
              </p>
              <a
                href="#launch-readiness"
                className="group/btn h-14 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-9 rounded-[8px] font-extrabold text-[14.5px] tracking-wide transition-all hover:shadow-[0_4px_20px_rgba(255,43,117,0.35)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2b75]"
              >
                {locale === "ko" ? "런칭 파트너 우선 신청하기" : "Apply as a Launch Partner"}
                <span className="ml-1.5 group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>

          </div>
        </section>

        {/* 10. 07 GROWTH SIMULATOR - Redesigned interactive diagnostic teaser layout */}
        <section id="simulator-section" className="max-w-[1400px] mx-auto px-[64px] py-[120px] text-left">
          <Simulator />
        </section>

        {/* 11. Partnership Process - Single Connected Journey Timeline (PLAN ➔ LAUNCH ➔ GROW) */}
        <section id="partnership-timeline" className="bg-[#0c0c0c] border-y border-[#2a2a2a] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px] text-left relative">
            
            {/* Header info */}
            <div className="text-center max-w-[720px] mx-auto mb-16 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff2b75]/20 bg-[#ff2b75]/5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
                <span className="text-[10px] tracking-[0.12em] font-black text-white/70 uppercase font-display">
                  HOW IT WORKS
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-[38px] font-bold leading-[1.22] text-white text-center tracking-tight m-0">
                신청부터 매출 성장까지, K SELECT HUB가 함께합니다.
              </h2>
              <p className="text-[14px] text-[#9ca3af] mt-4 max-w-xl text-center leading-relaxed font-medium">
                매장 분석, 프로그램 추천, 상품 구성, 디스플레이 설치, 런칭, 판매 데이터 최적화까지 하나의 프로세스로 지원합니다.
              </p>
            </div>

            {/* Timeline Wrapper (Desktop Horizontal Journey / Mobile Vertical List) */}
            <div className="relative w-full">
              
              {/* Outer Horizontal Grid dividing PLAN (3cols) / LAUNCH (2cols) / GROW (2cols) */}
              <div className="grid lg:grid-cols-7 gap-8 relative z-10">

                {/* Timeline Connection Line background (Desktop only) */}
                <div className="absolute top-[84px] left-[5%] right-[5%] h-[2.5px] bg-white/5 hidden lg:block z-0" />
                <div 
                  className="absolute top-[84px] left-[5%] h-[2.5px] bg-gradient-to-r from-[#ff2b75] via-[#ff2b75] to-[#ff2b75]/40 hidden lg:block z-0 origin-left"
                  style={{
                    animation: "timelineDraw 2s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                  }}
                />

                {/* ================= PHASE 1: PLAN (Step 01 - 03) ================= */}
                <div className="lg:col-span-3 bg-white/[0.01] border border-white/5 rounded-[20px] p-6 lg:pt-14 relative group/phase hover:bg-white/[0.02] transition-colors duration-300">
                  <span className="text-[11px] font-black tracking-[0.15em] text-[#E6C687] uppercase font-display bg-[#E6C687]/10 px-2.5 py-1 rounded-[4px] absolute top-4 left-6">
                    PLAN
                  </span>
                  <div className="grid sm:grid-cols-3 gap-6 mt-6 lg:mt-8">
                    
                    {/* Step 01 */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 animate-fade-in opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
                      <div className="w-11 h-11 rounded-full border-2 border-[#ff2b75] bg-[#0c0c0c] text-white flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(255,43,117,0.3)] mb-4 hover:scale-105 transition-transform duration-200">
                        01
                      </div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <svg className="w-4 h-4 text-[#ff2b75]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h4 className="text-[13.5px] font-extrabold text-white">Apply</h4>
                      </div>
                      <p className="text-[12px] text-[#9ca3af] leading-relaxed font-semibold">파트너 신청</p>
                    </div>

                    {/* Step 02 */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 animate-fade-in opacity-0" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
                      <div className="w-11 h-11 rounded-full border-2 border-white/10 bg-[#0c0c0c] text-white/50 flex items-center justify-center font-bold text-xs mb-4 group-hover/phase:border-[#ff2b75]/40 transition-colors">
                        02
                      </div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h4 className="text-[13.5px] font-extrabold text-white">Store Review</h4>
                      </div>
                      <p className="text-[12px] text-[#9ca3af] leading-relaxed font-semibold">매장·상권 분석</p>
                    </div>

                    {/* Step 03 */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 animate-fade-in opacity-0" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
                      <div className="w-11 h-11 rounded-full border-2 border-white/10 bg-[#0c0c0c] text-white/50 flex items-center justify-center font-bold text-xs mb-4 group-hover/phase:border-[#ff2b75]/40 transition-colors">
                        03
                      </div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <h4 className="text-[13.5px] font-extrabold text-white">Program Match</h4>
                      </div>
                      <p className="text-[12px] text-[#9ca3af] leading-relaxed font-semibold">Display &amp; AP 추천</p>
                    </div>

                  </div>
                </div>

                {/* ================= PHASE 2: LAUNCH (Step 04 - 05) ================= */}
                <div className="lg:col-span-2 bg-white/[0.01] border border-white/5 rounded-[20px] p-6 lg:pt-14 relative group/phase hover:bg-white/[0.02] transition-colors duration-300">
                  <span className="text-[11px] font-black tracking-[0.15em] text-[#ff2b75] uppercase font-display bg-[#ff2b75]/10 px-2.5 py-1 rounded-[4px] absolute top-4 left-6">
                    LAUNCH
                  </span>
                  <div className="grid sm:grid-cols-2 gap-6 mt-6 lg:mt-8">
                    
                    {/* Step 04 */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 animate-fade-in opacity-0" style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
                      <div className="w-11 h-11 rounded-full border-2 border-white/10 bg-[#0c0c0c] text-white/50 flex items-center justify-center font-bold text-xs mb-4 group-hover/phase:border-[#ff2b75]/40 transition-colors">
                        04
                      </div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h4 className="text-[13.5px] font-extrabold text-white">Design &amp; Mix</h4>
                      </div>
                      <p className="text-[12px] text-[#9ca3af] leading-relaxed font-semibold">상품 &amp; 디스플레이 설계</p>
                    </div>

                    {/* Step 05 */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 animate-fade-in opacity-0" style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}>
                      <div className="w-11 h-11 rounded-full border-2 border-white/10 bg-[#0c0c0c] text-white/50 flex items-center justify-center font-bold text-xs mb-4 group-hover/phase:border-[#ff2b75]/40 transition-colors">
                        05
                      </div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h4 className="text-[13.5px] font-extrabold text-white">Setup &amp; Launch</h4>
                      </div>
                      <p className="text-[12px] text-[#9ca3af] leading-relaxed font-semibold">Fixture 설치 &amp; 셋업 완료</p>
                    </div>

                  </div>
                </div>

                {/* ================= PHASE 3: GROW (Step 06 - 07) ================= */}
                <div className="lg:col-span-2 bg-white/[0.01] border border-white/5 rounded-[20px] p-6 lg:pt-14 relative group/phase hover:bg-white/[0.02] transition-colors duration-300">
                  <span className="text-[11px] font-black tracking-[0.15em] text-[#ff2b75] uppercase font-display bg-[#ff2b75]/10 px-2.5 py-1 rounded-[4px] absolute top-4 left-6">
                    GROW
                  </span>
                  <div className="grid sm:grid-cols-2 gap-6 mt-6 lg:mt-8">
                    
                    {/* Step 06 */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 animate-fade-in opacity-0" style={{ animationDelay: "1200ms", animationFillMode: "forwards" }}>
                      <div className="w-11 h-11 rounded-full border-2 border-white/10 bg-[#0c0c0c] text-white/50 flex items-center justify-center font-bold text-xs mb-4 group-hover/phase:border-[#ff2b75]/40 transition-colors">
                        06
                      </div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <h4 className="text-[13.5px] font-extrabold text-white whitespace-nowrap">90-Day Review</h4>
                      </div>
                      <p className="text-[12px] text-[#9ca3af] leading-relaxed font-semibold">90일 판매 실적 리뷰</p>
                    </div>

                    {/* Step 07 */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 animate-fade-in opacity-0" style={{ animationDelay: "1400ms", animationFillMode: "forwards" }}>
                      <div className="w-11 h-11 rounded-full border-2 border-white/10 bg-[#0c0c0c] text-white/50 flex items-center justify-center font-bold text-xs mb-4 group-hover/phase:border-[#ff2b75]/40 transition-colors">
                        07
                      </div>
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <h4 className="text-[13.5px] font-extrabold text-white">Optimize &amp; Grow</h4>
                      </div>
                      <p className="text-[12px] text-[#9ca3af] leading-relaxed font-semibold">상품 최적화 및 지속 성장</p>
                    </div>

                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Closing Info Panel */}
            <div className="text-center mt-16 border-t border-white/10 pt-10 flex flex-col items-center select-none">
              <span className="text-[10px] text-[#ff2b75] font-black tracking-widest uppercase font-display mb-2">
                ONE PROGRAM · ONE PROCESS
              </span>
              <h4 className="text-[15px] font-black text-white/95 m-0 tracking-wide font-display">
                One Program. One Process. From Setup to Growth.
              </h4>
              <p className="text-[13px] text-[#9ca3af] mt-1.5 font-medium leading-relaxed">
                하나의 프로그램으로, 준비부터 성장까지.
              </p>
            </div>

            {/* Timeline Draw Keyframe CSS Injection */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes timelineDraw {
                from { width: 0; }
                to { width: 90%; }
              }
              @keyframes fadeUp {
                from {
                  opacity: 0;
                  transform: translateY(12px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-fade-in {
                animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            ` }} />

          </div>
        </section>

        {/* Readiness Section Insertion */}
        <ReadinessSection />

        {/* 12. 08 Partnership CTA section - Redesigned closing partnership philosophy */}
        <section className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-[120px] pb-[140px]">
          <div className="bg-[#0c0c0c] border border-white/10 rounded-[28px] overflow-hidden grid lg:grid-cols-[1.15fr_0.85fr] items-stretch text-left shadow-2xl relative group/card transition-all duration-300">
            
            <div className="p-8 sm:p-14 lg:p-16 flex flex-col justify-center relative z-10">
              <span className="text-[11px] font-black text-[#ff2b75] tracking-[0.15em] uppercase font-display block mb-5">
                08 — PARTNERSHIP
              </span>
              <h2 className="font-display text-[28px] sm:text-[38px] lg:text-[42px] font-black leading-[1.18] text-white tracking-tight m-0 select-none">
                리테일러의 성공이<br />
                우리의 성공입니다.
              </h2>
              
              <p className="text-[14.5px] text-[#9ca3af] leading-relaxed mt-6 mb-5 max-w-[480px] font-medium">
                상품 공급에서 끝나지 않습니다. K Select는 큐레이션, 디스플레이, 교체 프로그램, 운영 지원까지 함께하며 매장의 K-Beauty 카테고리가 실제 매출이 되도록 끝까지 동행합니다.
              </p>
              
              {/* Highlight Line */}
              <div className="border-l-2 border-[#ff2b75] pl-4 my-2 select-none">
                <p className="text-[13.5px] text-[#ff2b75] font-extrabold leading-normal m-0">
                  먼저 시작할수록 더 좋은 조건과 더 많은 지원으로 출발할 수 있습니다.
                </p>
              </div>

              {/* Support Line */}
              <p className="text-[12px] text-[#7A7A7A] font-semibold mt-2 mb-8">
                Launch Partner에게는 초기 런칭 특별 혜택이 제공됩니다.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#launch-readiness"
                  className="h-14 inline-flex items-center justify-center bg-[#ff2b75] hover:bg-[#e01a5e] text-white px-8 rounded-[8px] font-extrabold text-[14.5px] tracking-wide transition-all duration-300 hover:shadow-[0_4px_25px_rgba(255,43,117,0.4)] cursor-pointer"
                >
                  런치 파트너 신청 →
                </a>
                <a
                  href="#simulator-section"
                  className="h-14 inline-flex items-center justify-center border border-white/10 hover:border-white/30 text-white px-8 rounded-[8px] font-bold text-[14.5px] tracking-wide transition-all duration-300 hover:bg-white/[0.02] cursor-pointer"
                >
                  성장 시뮬레이터
                </a>
              </div>
            </div>

            {/* Right side custom beauty store owner portrait */}
            <div className="relative min-h-[460px] overflow-hidden">
              <Image
                src="/images/partnership_owner.jpg"
                alt="Confident beauty store owner partnering with K Select"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 35vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/80 via-transparent to-transparent lg:hidden pointer-events-none" />
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
