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
    <div className="min-h-screen flex flex-col font-body bg-[#050505] text-white overflow-x-hidden selection:bg-[#ff2b75] selection:text-white">
      
      {/* 1. Header (Navigation) */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="font-display text-2xl font-black tracking-tight text-white flex items-center gap-2">
            {assetConfig.logo.mode === "image" ? (
              <Image
                src={assetConfig.logo.src}
                alt={assetConfig.logo.alt}
                width={assetConfig.logo.width}
                height={assetConfig.logo.height}
                className="object-contain"
              />
            ) : (
              <>
                <span className="text-accent">{assetConfig.logo.text.split(" ")[0]}</span>{" "}
                {assetConfig.logo.text.split(" ").slice(1).join(" ")}
              </>
            )}
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-text-secondary">
            <a href="#program" className="hover:text-accent transition-colors">
              {t.header.nav.program}
            </a>
            <a href="#products" className="hover:text-accent transition-colors">
              {t.header.nav.products}
            </a>
            <a href="#simulator-section" className="hover:text-accent transition-colors">
              {t.header.nav.simulator}
            </a>
            <a href="#why-us" className="hover:text-accent transition-colors">
              {t.header.nav.whyUs}
            </a>
            <a href="#insights" className="hover:text-accent transition-colors">
              {t.header.nav.insights}
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://portal.kselecthub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-2 border border-[#2A2A2A] text-text-secondary hover:text-white hover:border-white rounded-pill transition-all"
            >
              {t.header.nav.login}
            </a>
            <a
              href="#apply"
              className="bg-accent hover:bg-[#e01a5e] text-white text-xs font-black px-6 py-2.5 rounded-pill transition-colors flex items-center gap-1.5"
            >
              {t.header.nav.apply} ➔
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Sections Flow */}
      <main className="flex-1">
        
        {/* [Hero Section] - Side-by-side high-fidelity composition matching primary visual target */}
        <section className="relative py-20 lg:py-28 max-w-7xl mx-auto px-6 border-b border-[#2A2A2A]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Extreme Headline, copy and CTAs */}
            <div className="lg:col-span-6 flex flex-col items-start gap-6">
              <span className="text-xs font-black text-accent uppercase tracking-widest block">
                {t.hero.eyebrow}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-black leading-[1.08] tracking-tight text-white text-left select-none">
                미국 K-뷰티 시장,<br />
                데이터로 성장하고<br />
                <span className="text-accent">K Select Hub</span>로 앞서가세요
              </h1>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xl text-left font-medium">
                미국 독립 Beauty Supply Retailer를 위한 최적의 K-Beauty 카테고리 숍인숍 솔루션. 상품 큐레이션, 맞춤형 디스플레이, 지속적인 머천다이징 및 재고 부담 없는 90일 교환 크레딧을 종합적으로 지원합니다.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
                <a
                  href="#apply"
                  className="inline-flex h-14 items-center justify-center bg-accent text-white px-8 font-black rounded-pill hover:bg-[#e01a5e] transition-colors text-center text-sm cursor-pointer whitespace-nowrap"
                >
                  {t.hero.primaryCta} ➔
                </a>
                <a
                  href="#simulator-section"
                  className="inline-flex h-14 items-center justify-center border border-[#2A2A2A] text-text-secondary hover:text-white hover:border-white px-8 font-black rounded-pill transition-colors text-center text-sm cursor-pointer whitespace-nowrap flex items-center gap-2"
                >
                  <span className="inline-block text-accent">📊</span> {t.hero.secondaryCta}
                </a>
              </div>

              {/* Bottom 3 flat check benefits */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-[11px] font-black text-text-secondary">
                <div className="flex items-center gap-1.5"><span className="text-accent">✓</span> 검증된 K-뷰티 제품</div>
                <div className="flex items-center gap-1.5"><span className="text-accent">✓</span> 맞춤형 성장 전략</div>
                <div className="flex items-center gap-1.5"><span className="text-accent">✓</span> 유연한 신용 지원</div>
              </div>
            </div>

            {/* Right Column: Premium Photography + Floating Data UI Composition */}
            <div className="lg:col-span-6 relative w-full h-[450px] lg:h-[500px] flex items-center justify-center">
              
              {/* Main Store image container acting as base background composition */}
              <div className="absolute inset-0 rounded-panel overflow-hidden border border-[#2A2A2A] bg-[#121214] opacity-80 z-0">
                <Image
                  src={assetConfig.storeShowcase.heroSection.src}
                  alt={assetConfig.storeShowcase.heroSection.alt}
                  fill
                  className="object-cover brightness-[0.4]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Data Card 1: Product Mix Donut Chart (Matches 시안) */}
              <div className="absolute top-6 right-6 w-[230px] sm:w-[260px] bg-[#101010]/90 backdrop-blur-md border border-[#2A2A2A] rounded-card p-4 sm:p-5 flex flex-col gap-3 z-10 shadow-2xl">
                <div className="flex justify-between items-center text-[10px] font-black text-text-secondary uppercase">
                  <span>큐레이션 제품 믹스</span>
                  <span className="text-accent">최적 구성</span>
                </div>
                
                {/* SVG Donut Chart Loop and details */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="14" fill="none" stroke="#222222" strokeWidth="4" />
                      <circle cx="16" cy="16" r="14" fill="none" stroke="#ff2b75" strokeWidth="4" strokeDasharray="62 100" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-sm font-black text-white">62%</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-[9px] font-semibold text-text-secondary">
                    <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent" />스킨케어 62%</div>
                    <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />메이크업 18%</div>
                    <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />마스크팩 12%</div>
                    <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />클렌징 8%</div>
                  </div>
                </div>
              </div>

              {/* Floating Data Card 2: Growth Simulator Preview Graph (Matches 시안) */}
              <div className="absolute bottom-6 left-6 w-[230px] sm:w-[260px] bg-[#101010]/90 backdrop-blur-md border border-[#2A2A2A] rounded-card p-4 sm:p-5 flex flex-col gap-3 z-10 shadow-2xl">
                <div className="flex justify-between items-center text-[10px] font-black text-text-secondary uppercase">
                  <span>성장 시뮬레이션 결과</span>
                  <span className="text-[#FF2B75] bg-[#FF2B75]/10 px-2 py-0.5 rounded-pill">예상 90일 후</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[10px] text-text-secondary font-medium">매출 성장</span>
                  <span className="font-display text-xl font-bold text-accent">+42%</span>
                </div>
                {/* Visual Line Chart Sparkline */}
                <div className="w-full h-10 mt-1">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path
                      d="M0 25 L20 22 L40 18 L60 12 L80 8 L100 2"
                      fill="none"
                      stroke="#ff2b75"
                      strokeWidth="2"
                    />
                    <path
                      d="M0 25 L20 22 L40 18 L60 12 L80 8 L100 2 L100 30 L0 30 Z"
                      fill="url(#pink-grad-hero)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient id="pink-grad-hero" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff2b75" />
                        <stop offset="100%" stopColor="#ff2b75" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex justify-between items-center text-[9px] text-text-secondary border-t border-[#2A2A2A] pt-2">
                  <span>예상 추가 매출</span>
                  <span className="font-display font-bold text-white">$48,750</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* [Feature 3 Cards Section] - Products, Simulator, Display modules in high fidelity cards */}
        <section className="py-24 max-w-7xl mx-auto px-6 border-b border-[#2A2A2A]">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* 01 Curated Products Card */}
            <div className="bg-[#121214] border border-[#2A2A2A] rounded-card overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:border-accent/40 transition-colors">
              <div className="flex flex-col gap-4 text-left">
                <span className="text-[10px] text-accent font-black tracking-widest uppercase">01 / BRAND CURATION</span>
                <h3 className="font-display text-2xl font-bold text-white leading-tight">큐레이션 제품 믹스</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  미국 시장 데이터 기반으로 검증된 베스트셀러 & 신제품 포트폴리오를 제공하여 회전율을 극대화합니다.
                </p>
              </div>
              
              {/* Custom Products visual representation */}
              <div className="my-6 relative w-full h-36 bg-[#050505] border border-[#2A2A2A] rounded-card flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/display_4ft.png"
                  alt="Curated Products"
                  fill
                  className="object-cover opacity-75"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <span className="absolute bottom-3 right-3 bg-accent-light text-accent text-[9px] font-bold px-2 py-1 rounded border border-accent/20">
                  인기 키워드 #진정 #보습 #장벽케어
                </span>
              </div>

              <a
                href="#products"
                className="w-full h-12 inline-flex items-center justify-center bg-[#050505] border border-[#2A2A2A] hover:border-accent text-white font-bold rounded-pill text-xs transition-colors"
              >
                제품 믹스 보기 ➔
              </a>
            </div>

            {/* 02 Growth Simulator Card */}
            <div className="bg-[#121214] border border-[#2A2A2A] rounded-card overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:border-accent/40 transition-colors">
              <div className="flex flex-col gap-4 text-left">
                <span className="text-[10px] text-accent font-black tracking-widest uppercase">02 / ROI PREDICTION</span>
                <h3 className="font-display text-2xl font-bold text-white leading-tight">성장 시뮬레이터</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  매장 데이터 기반으로 예상 매출, 소매 마진, 연간 재고 회전율에 따른 순이익 결과를 실시간 예측해 보세요.
                </p>
              </div>

              {/* Miniature Simulation layout preview */}
              <div className="my-6 p-4 bg-[#050505] border border-[#2A2A2A] rounded-card flex flex-col gap-3 text-[10px] text-left">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">매장 유형</span>
                  <span className="bg-[#121214] px-2 py-0.5 rounded border border-[#2A2A2A] text-white">Independent Store</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between"><span className="text-text-secondary">평균 월 매출</span><span className="text-white">$80,000</span></div>
                  <div className="w-full bg-[#121214] h-1 rounded-full"><div className="bg-accent h-full w-[70%]" /></div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between"><span className="text-text-secondary">매장 면적</span><span className="text-white">2,000 sq.ft</span></div>
                  <div className="w-full bg-[#121214] h-1 rounded-full"><div className="bg-accent h-full w-[45%]" /></div>
                </div>
              </div>

              <a
                href="#simulator-section"
                className="w-full h-12 inline-flex items-center justify-center bg-[#050505] border border-[#2A2A2A] hover:border-accent text-white font-bold rounded-pill text-xs transition-colors"
              >
                시뮬레이터 실행 ➔
              </a>
            </div>

            {/* 03 Display Solution Card */}
            <div className="bg-[#121214] border border-[#2A2A2A] rounded-card overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:border-accent/40 transition-colors">
              <div className="flex flex-col gap-4 text-left">
                <span className="text-[10px] text-accent font-black tracking-widest uppercase">03 / STORE FIXTURES</span>
                <h3 className="font-display text-2xl font-bold text-white leading-tight">디스플레이 솔루션</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  매장 크기와 고객 동선에 최적화된 매장용 LED 백라이트 디스플레이 피처 모듈을 무상 대여 제공합니다.
                </p>
              </div>

              {/* Miniature Fixture Image view */}
              <div className="my-6 relative w-full h-36 bg-[#050505] border border-[#2A2A2A] rounded-card flex items-center justify-center overflow-hidden">
                <Image
                  src={assetConfig.displayFixtures["4ft"].src}
                  alt="Display Fixture"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <span className="absolute bottom-3 right-3 bg-[#121214]/90 border border-[#2A2A2A] text-white text-[9px] font-bold px-2 py-1 rounded">
                  추천 모델: Glow Island 1200
                </span>
              </div>

              <a
                href="#display"
                className="w-full h-12 inline-flex items-center justify-center bg-[#050505] border border-[#2A2A2A] hover:border-accent text-white font-bold rounded-pill text-xs transition-colors"
              >
                솔루션 보기 ➔
              </a>
            </div>

          </div>
        </section>

        {/* [90-Day Exchange Credit Section] - High-Fidelity Premium Card Representation */}
        <section id="exchange-credit" className="py-24 max-w-7xl mx-auto px-6 border-b border-[#2A2A2A]">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Premium card packaging graphic visualization */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-80 h-48 sm:w-[380px] sm:h-[220px] bg-gradient-to-tr from-[#121214] to-[#1e1e24] border border-[#2A2A2A] rounded-panel p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#ff2b75]/30 transition-all">
                
                {/* Decorative Pink Light Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2b75]/10 rounded-full blur-2xl z-0" />

                {/* Card Header */}
                <div className="flex justify-between items-center z-10">
                  <span className="font-display text-sm font-black tracking-tight text-white">K SELECT HUB</span>
                  <span className="text-[10px] bg-accent-light text-accent border border-accent/20 px-2.5 py-0.5 rounded-pill font-bold">
                    90-DAY CREDIT
                  </span>
                </div>

                {/* Card Body */}
                <div className="flex flex-col gap-1 text-left z-10">
                  <span className="text-[10px] text-text-secondary uppercase">Initial Launch Partner Benefit</span>
                  <h3 className="font-display text-2xl font-black text-white tracking-wide">
                    90-Day Exchange Credit
                  </h3>
                </div>

                {/* Card Footer */}
                <div className="flex justify-between items-end border-t border-[#2A2A2A] pt-4 mt-2 z-10 text-[9px] text-text-secondary">
                  <span>ELIGIBLE SLOW-MOVING SKU EXCHANGE</span>
                  <span className="font-display font-bold text-white text-xs">Risk-Free 100%</span>
                </div>
              </div>
            </div>

            {/* Right: Flow information details */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <span className="text-xs font-black text-accent uppercase tracking-wider block">
                {t.riskReduction.eyebrow}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                {t.riskReduction.title}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t.riskReduction.subtitle} 처음부터 모든 SKU 구성을 완벽히 조율하지 못하더라도 K Select Hub가 미판매분을 100% 가치의 Exchange Credit으로 보증 및 다른 베스트셀러 브랜드로 안전하게 교환 지원합니다.
              </p>

              {/* 4 Icon blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div className="bg-[#121214] border border-[#2A2A2A] p-4 rounded-card flex flex-col gap-1">
                  <span className="text-lg">⏳</span>
                  <span className="font-bold text-white text-xs mt-1">90 Days</span>
                  <span className="text-[9px] text-text-secondary leading-none">안심 판매 테스트 기간</span>
                </div>
                <div className="bg-[#121214] border border-border p-4 rounded-card flex flex-col gap-1">
                  <span className="text-lg">📦</span>
                  <span className="font-bold text-white text-xs mt-1">Slow Seller</span>
                  <span className="text-[9px] text-text-secondary leading-none">부진 SKU 무상 발굴</span>
                </div>
                <div className="bg-[#121214] border border-border p-4 rounded-card flex flex-col gap-1">
                  <span className="text-lg">🔄</span>
                  <span className="font-bold text-white text-xs mt-1">Exchange</span>
                  <span className="text-[9px] text-text-secondary leading-none">신속한 크레딧 보상 환수</span>
                </div>
                <div className="bg-[#121214] border border-border p-4 rounded-card flex flex-col gap-1">
                  <span className="text-lg">🚀</span>
                  <span className="font-bold text-white text-xs mt-1">Better Mix</span>
                  <span className="text-[9px] text-text-secondary leading-none">매대 회전율 최종 극대화</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* [Apply Form Section] */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <CtaForm />
        </section>

      </main>

      {/* Footer (Navigation) */}
      <footer className="bg-[#0c0d14] border-t border-[#2A2A2A] py-12 text-sm text-text-secondary">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          <div className="flex flex-col gap-3 text-left">
            <span className="font-display text-xl font-black text-white">
              {assetConfig.logo.mode === "image" ? (
                <Image
                  src={assetConfig.logo.src}
                  alt={assetConfig.logo.alt}
                  width={assetConfig.logo.width}
                  height={assetConfig.logo.height}
                  className="object-contain"
                />
              ) : (
                assetConfig.logo.text
              )}
            </span>
            <p className="text-xs text-text-secondary">
              {t.footer.copyright}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-xs text-text-secondary md:items-end text-left">
            <p className="font-medium text-white">{t.footer.address}</p>
            <p>{t.footer.contact}</p>
          </div>

        </div>
      </footer>
    </div>
  );
}
