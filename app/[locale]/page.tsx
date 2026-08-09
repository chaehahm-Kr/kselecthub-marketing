export const dynamic = 'force-dynamic';

import React from "react";
import Image from "next/image";
import { ko, LocaleDictionary } from "../locales/ko";
import CtaForm from "./CtaForm";
import Simulator from "./Simulator";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const t = ko as LocaleDictionary; // Cast to bypass TS compilation cache issues

  return (
    <div className="min-h-screen flex flex-col font-body bg-[#090a0f] text-white">
      
      {/* 1. Header (Navigation) */}
      <header className="sticky top-0 z-50 bg-[#090a0f]/90 backdrop-blur-md border-b border-[#202330]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-accent">K</span> Select Hub
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
              className="text-xs font-semibold px-4 py-2 border border-[#33394d] text-text-secondary hover:text-white hover:border-white rounded-pill transition-all"
            >
              {t.header.nav.login}
            </a>
            <a
              href="#apply"
              className="bg-accent hover:bg-accent-hover text-white text-xs font-bold px-5 py-2.5 rounded-pill transition-colors flex items-center gap-1.5"
            >
              {t.header.nav.apply} ➔
            </a>
          </div>
        </div>
      </header>

      {/* Main Storytelling Sections Flow */}
      <main className="flex-1">
        
        {/* [1단계] Hero - Premium B2B Technology Platform Feel */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <span className="bg-accent-light border border-accent/20 text-accent text-[11px] font-bold px-3.5 py-1.5 rounded-pill tracking-widest uppercase">
                {t.hero.eyebrow}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
                미국 K-뷰티 시장,<br />
                데이터로 성장하고<br />
                <span className="text-accent">K Select Hub</span>로 앞서가세요
              </h1>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl">
                {t.hero.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
                <a
                  href="#apply"
                  className="inline-flex h-14 items-center justify-center bg-accent text-white px-8 font-bold rounded-pill hover:bg-accent-hover transition-colors text-center text-sm cursor-pointer whitespace-nowrap"
                >
                  {t.hero.primaryCta}
                </a>
                <a
                  href="#simulator-section"
                  className="inline-flex h-14 items-center justify-center border border-border text-text-secondary hover:text-white hover:border-white px-8 font-bold rounded-pill transition-colors text-center text-sm cursor-pointer whitespace-nowrap"
                >
                  {t.hero.secondaryCta}
                </a>
              </div>
            </div>

            {/* Right: Floating Data UI & Store Showcase */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Product Mix Floating Box */}
              <div className="bg-[#12141c] border border-border rounded-card p-5 flex flex-col gap-4">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-text-secondary">큐레이션 제품 믹스</span>
                  <span className="bg-accent-light text-accent px-2.5 py-1 rounded-pill">베스트 셀러 62%</span>
                </div>
                
                {/* Simulated Donut Graph and legend bar */}
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                      <circle cx="16" cy="16" r="14" fill="none" stroke="#202330" strokeWidth="4" />
                      <circle cx="16" cy="16" r="14" fill="none" stroke="#ff127c" strokeWidth="4" strokeDasharray="62 100" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="font-display text-base font-bold text-white">62%</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-[10px] text-text-secondary">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" />스킨케어 60%</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" />메이크업 10%</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />헤어 케어 10%</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" />바디/기타 20%</div>
                  </div>
                </div>
              </div>

              {/* Expected Sales Growth Simulation Graph Card */}
              <div className="bg-[#12141c] border border-border rounded-card p-5 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-text-secondary">성장 시뮬레이션 결과</span>
                  <span className="text-text-muted">예상 90일 후</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-text-secondary">매출 성장</span>
                  <span className="font-display text-2xl font-bold text-accent">+42%</span>
                </div>
                {/* SVG Mock Line Graph */}
                <div className="w-full h-12 mt-2">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path
                      d="M0 25 Q15 20, 30 18 T60 12 T90 5 T100 2"
                      fill="none"
                      stroke="#ff127c"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M0 25 Q15 20, 30 18 T60 12 T90 5 T100 2 L100 30 L0 30 Z"
                      fill="url(#pink-grad)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient id="pink-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff127c" />
                        <stop offset="100%" stopColor="#ff127c" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 border-t border-border pt-10">
            {t.hero.stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1 text-left">
                <span className="font-display text-3xl sm:text-4xl font-bold text-accent">
                  {stat.value}
                </span>
                <span className="text-xs text-text-secondary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* [2단계] Problems - Retailer Pain Points Section */}
        <section id="problems" className="py-20 max-w-7xl mx-auto px-6 border-b border-[#202330]">
          <div className="max-w-3xl mb-16 flex flex-col gap-4 text-left">
            <span className="text-xs font-bold text-accent uppercase tracking-wider block">
              {t.problems.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              {t.problems.title}
            </h2>
            <p className="text-sm text-text-secondary">
              {t.problems.subtitle}
            </p>
          </div>

          {/* 4 Problems Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {t.problems.items.map((item, i) => (
              <div key={i} className="bg-[#12141c] border border-border p-6 sm:p-8 rounded-card flex gap-5 text-left items-start">
                <span className="font-display text-xl font-bold text-accent flex-shrink-0">
                  {item.num}
                </span>
                <div className="flex flex-col gap-2">
                  <h4 className="font-display text-lg font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Core Slogan Box */}
          <div className="bg-accent-light border border-accent/20 p-6 sm:p-8 rounded-card text-center max-w-4xl mx-auto mt-10">
            <p className="font-display text-lg sm:text-xl font-bold text-accent leading-relaxed">
              “{t.problems.conclusion}”
            </p>
          </div>
        </section>

        {/* [3단계] Why K-Beauty Now - Market Opportunity */}
        <section id="opportunity" className="py-20 bg-[#0c0d14] border-b border-[#202330]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Stats */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                  {t.whyKbeauty.eyebrow}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {t.whyKbeauty.title}
                </h2>
                
                <div className="flex flex-col gap-4 mt-4">
                  {t.whyKbeauty.stats.map((s, i) => (
                    <div key={i} className="bg-surface border border-border p-5 rounded-card flex items-center justify-between">
                      <span className="text-xs text-text-secondary font-medium">{s.label}</span>
                      <span className="font-display text-lg sm:text-xl font-bold text-accent">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column Opportunity narrative */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-relaxed">
                  {t.whyKbeauty.subtitle}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {t.whyKbeauty.opportunity}
                </p>
                {/* 4 Pillars Mini infographic badge list */}
                <div className="grid grid-cols-2 gap-3 mt-4 text-[11px] font-semibold text-white">
                  <div className="bg-[#12141c] border border-border px-4 py-3 rounded-card flex items-center gap-2">
                    <span className="text-accent">✓</span> Growing Market (성장 시장)
                  </div>
                  <div className="bg-[#12141c] border border-border px-4 py-3 rounded-card flex items-center gap-2">
                    <span className="text-accent">✓</span> Right Products (정확한 상품)
                  </div>
                  <div className="bg-[#12141c] border border-border px-4 py-3 rounded-card flex items-center gap-2">
                    <span className="text-accent">✓</span> Right Assortment (맞춤 구성)
                  </div>
                  <div className="bg-[#12141c] border border-border px-4 py-3 rounded-card flex items-center gap-2">
                    <span className="text-accent">✓</span> Right Retail Execution (매장 연출)
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* [4단계] Program Core - K-Beauty Retail Growth Program */}
        <section id="program" className="py-20 max-w-7xl mx-auto px-6 border-b border-[#202330]">
          <div className="max-w-3xl mb-16 flex flex-col gap-4 text-left">
            <span className="text-xs font-bold text-accent uppercase tracking-wider block">
              {t.program.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              {t.program.title}
            </h2>
            <p className="text-sm text-text-secondary">
              {t.program.subtitle}
            </p>
          </div>

          {/* Cards for Core Features */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {t.program.features.map((feat, i) => (
              <div key={i} className="bg-[#12141c] border border-border p-6 rounded-card flex flex-col justify-between gap-4 text-left hover:border-accent/40 transition-colors">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-accent font-bold tracking-widest">
                    FEATURE 0{i + 1}
                  </span>
                  <h4 className="font-display text-base font-bold text-white">
                    {feat.title}
                  </h4>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* [5단계] Product Mix - 큐레이션 제품 철학 및 SVG 링 차트 */}
        <section id="products" className="py-20 bg-[#0c0d14] border-b border-[#202330]">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header / Philosophy */}
            <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
              <div className="lg:col-span-7 flex flex-col gap-4 text-left">
                <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                  {t.products.eyebrow}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {t.products.title}
                </h2>
                <p className="text-sm text-text-secondary">
                  {t.products.subtitle}
                </p>
              </div>
            </div>

            {/* Curation Standards 4 cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {t.products.philosophy.items.map((phil, i) => (
                <div key={i} className="bg-surface border border-border p-6 rounded-card flex flex-col gap-3 text-left">
                  <span className="text-[10px] font-display font-bold text-accent uppercase tracking-wider">
                    {phil.key}
                  </span>
                  <h4 className="font-display text-base font-bold text-white">
                    {phil.label}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {phil.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Sourcing Product Mix Visualizer (SVG Donut Chart) */}
            <div className="bg-[#12141c] border border-border rounded-panel p-8">
              <h3 className="font-display text-xl font-bold text-white text-center mb-8">
                {t.products.mix.title}
              </h3>
              
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                
                {/* SVG Donut Visualizer */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#232738" strokeWidth="3" />
                      
                      {/* Skincare (60%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#ff127c"
                        strokeWidth="3"
                        strokeDasharray="60 100"
                        strokeDashoffset="0"
                      />
                      {/* Hair Care (10%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="3"
                        strokeDasharray="10 100"
                        strokeDashoffset="-60"
                      />
                      {/* Makeup (10%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="10 100"
                        strokeDashoffset="-70"
                      />
                      {/* Body Care (10%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeDasharray="10 100"
                        strokeDashoffset="-80"
                      />
                      {/* Personal Care (5%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="3"
                        strokeDasharray="5 100"
                        strokeDashoffset="-90"
                      />
                      {/* Beauty Tools (5%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="3"
                        strokeDasharray="5 100"
                        strokeDashoffset="-95"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-3xl font-bold text-white">60%</span>
                      <span className="text-[10px] text-text-secondary uppercase">Skincare Max</span>
                    </div>
                  </div>
                </div>

                {/* Categories list details */}
                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                  {t.products.mix.categories.map((cat, i) => (
                    <div key={i} className="bg-[#0c0d14] border border-border p-4 rounded-card flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                          {cat.name}
                        </span>
                        <span className="font-display text-sm font-bold" style={{ color: cat.color }}>
                          {cat.ratio}%
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cat.items.map((item, idx) => (
                          <span key={idx} className="bg-[#12141c] text-[9px] font-semibold text-text-secondary px-2 py-0.5 rounded border border-border">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* [6단계] Store-in-a-Store (Display) - LED 진열 모듈 카탈로그 */}
        <section id="display" className="py-20 max-w-7xl mx-auto px-6 border-b border-[#202330]">
          <div className="max-w-3xl mb-16 flex flex-col gap-4 text-left">
            <span className="text-xs font-bold text-accent uppercase tracking-wider block">
              {t.display.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              {t.display.title}
            </h2>
            <p className="text-sm text-text-secondary">
              {t.display.subtitle}
            </p>
          </div>

          {/* Modules Split Display Cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            {t.display.modules.map((mod, i) => {
              const imagePaths = [
                "/images/display_4ft.png",
                "/images/display_8ft.png",
                "/images/display_12ft.jpg",
              ];
              return (
                <div key={i} className="bg-[#12141c] border border-border rounded-card overflow-hidden flex flex-col justify-between">
                  <div className="relative w-full aspect-4/3 bg-[#0c0d14] border-b border-border">
                    <Image
                      src={imagePaths[i]}
                      alt={mod.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-3 text-left">
                    <div className="flex justify-between items-baseline">
                      <span className="font-display text-2xl font-bold text-accent">{mod.size}</span>
                      <span className="text-xs text-text-secondary font-bold">{mod.sku}</span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-white">{mod.name}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* [7단계] Risk Reduction - 90일 재고 교환 안심 제도 */}
        <section id="exchange" className="py-20 bg-[#0c0d14] border-b border-[#202330]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16 flex flex-col gap-4 text-left">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                {t.riskReduction.eyebrow}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                {t.riskReduction.title}
              </h2>
              <p className="text-sm text-text-secondary">
                {t.riskReduction.subtitle}
              </p>
            </div>

            {/* Timeline Arrow Cards */}
            <div className="grid md:grid-cols-5 gap-4 text-left mb-12">
              {t.riskReduction.cycle.map((c, i) => (
                <div key={i} className="bg-[#12141c] border border-border p-5 rounded-card relative flex flex-col gap-2 hover:border-accent-light transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-accent tracking-widest uppercase">
                      STAGE 0{i + 1}
                    </span>
                    {i < 4 && (
                      <span className="hidden md:inline text-text-muted font-display text-lg absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                        ➔
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-base font-bold text-white">{c.step}</h4>
                  <p className="text-[11px] text-text-secondary leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            {/* Bold Message and strict conditions */}
            <div className="bg-[#12141c] border border-border p-6 rounded-card flex flex-col md:flex-row items-center justify-between gap-6 text-left">
              <div className="flex flex-col gap-2 max-w-xl">
                <h4 className="font-semibold text-white text-sm">재고 걱정 없는 파트너십 약속</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {t.riskReduction.boldMessage}
                </p>
              </div>
              
              <div className="flex flex-col gap-1.5 text-[10px] text-text-muted border-l border-border pl-6 flex-shrink-0">
                {t.riskReduction.conditions.map((cond, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {cond}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* [8단계] Growth Simulator - 독립 대메뉴 & 핵심 인터랙티브 기능 */}
        <section id="simulator-section" className="py-20 max-w-7xl mx-auto px-6 border-b border-[#202330]">
          <div className="max-w-3xl mb-12 flex flex-col gap-4 text-left">
            <span className="text-xs font-bold text-accent uppercase tracking-wider block">
              {t.simulator.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              {t.simulator.title}
            </h2>
            <p className="text-sm text-text-secondary">
              {t.simulator.subtitle}
            </p>
          </div>

          {/* Interactive React Simulator Mount */}
          <Simulator />
        </section>

        {/* [9단계] Ongoing Retail Support - 교육 및 스마트 재발주 */}
        <section id="support" className="py-20 bg-[#0c0d14] border-b border-[#202330]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16 flex flex-col gap-4 text-left">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                RETAIL SUPPORT SYSTEMS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                제품 공급을 넘어선 운영 관리 시스템 지원
              </h2>
              <p className="text-sm text-text-secondary">
                지속적인 VMD 업데이트, 스태프 온라인 영상 트레이닝 및 매주 재고 관리 시스템을 밀착 제공합니다.
              </p>
            </div>

            {/* 3 columns support list */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#12141c] border border-border p-6 rounded-card text-left flex flex-col gap-3">
                <span className="text-2xl">📱</span>
                <h4 className="font-display text-lg font-bold text-white">QR 제품 모바일 정보 라벨</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  매대 선반마다 QR 코드가 장착되어 소비자가 현장에서 성분과 루틴 정보를 모바일로 실시간 확인 및 안심 구매 가능.
                </p>
              </div>

              <div className="bg-[#12141c] border border-border p-6 rounded-card text-left flex flex-col gap-3">
                <span className="text-2xl">🎓</span>
                <h4 className="font-display text-lg font-bold text-white">온라인 스태프 교육</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  매장 직원들이 미국 소비자의 질문에 즉시 답할 수 있도록 전용 비디오 아카데미 및 뷰티 수료증 트레이닝 제공.
                </p>
              </div>

              <div className="bg-[#12141c] border border-border p-6 rounded-card text-left flex flex-col gap-3">
                <span className="text-2xl">📈</span>
                <h4 className="font-display text-lg font-bold text-white">주간 재고 업데이트 & 리오더</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  단 한 번의 조회로 매대 품절 상태를 복구하는 간편 주문 포털 시스템을 통해 리테일 최상의 회전 속도를 돕습니다.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* [10단계] Partnership Standards - Provides vs We Ask (Compliance Checkbox) */}
        <section id="partnership" className="py-20 max-w-7xl mx-auto px-6 border-b border-[#202330]">
          <div className="max-w-3xl mb-16 flex flex-col gap-4 text-left">
            <span className="text-xs font-bold text-accent uppercase tracking-wider block">
              {t.partnership.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              {t.partnership.title}
            </h2>
            <p className="text-sm text-text-secondary">
              {t.partnership.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            
            {/* Provides Card */}
            <div className="bg-[#12141c] border border-border p-6 sm:p-8 rounded-panel flex flex-col gap-4">
              <h4 className="font-display text-lg font-bold text-accent">
                {t.partnership.provides.title}
              </h4>
              <ul className="flex flex-col gap-3 text-xs text-text-secondary">
                {t.partnership.provides.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <span className="text-accent">➔</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Asks Card */}
            <div className="bg-[#12141c] border border-border p-6 sm:p-8 rounded-panel flex flex-col gap-4">
              <h4 className="font-display text-lg font-bold text-white">
                {t.partnership.asks.title}
              </h4>
              <ul className="flex flex-col gap-3 text-xs text-text-secondary">
                {t.partnership.asks.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <span className="text-white opacity-40">●</span> {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* [11단계] How It Works - 6단계 파트너십 구축 과정 */}
        <section id="process" className="py-20 bg-[#0c0d14] border-b border-[#202330]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16 flex flex-col gap-4 text-left">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                PARTNERSHIP TIMELINE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                파트너십 구축 및 런칭 진행 과정
              </h2>
              <p className="text-sm text-text-secondary">
                신청부터 실제 상품 런칭 및 데이터 교환까지, 안전하고 신속한 타임라인 가이드라인입니다.
              </p>
            </div>

            {/* Process steps grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {[
                { num: "01", title: "온라인 입점 신청서 접수", desc: "웹사이트 하단의 CtaForm을 통해 매장 위치, 형태, 규모 등 기본 정보와 함께 신청서를 온라인 제출합니다." },
                { num: "02", title: "상권 분석 및 자격 검토", desc: "Letusto 미국 지사의 상권 보호 데이터베이스와 매핑을 진행해 독점 지역 조건 가능 여부를 판별합니다." },
                { num: "03", title: "최적의 Assortment 설계", desc: "매장 크기에 맞는 LED 숍인숍 집기 규격(4ft/8ft/12ft)과 상권 맞춤형 초도 SKU 리스트를 기획합니다." },
                { num: "04", title: "모듈 설치 및 상품 입고", desc: "무상 대여 지원되는 전용 LED 디스플레이 집기 및 VMD 그래픽, 엄선된 큐레이션 화장품을 매장에 진열합니다." },
                { num: "05", title: "90일 실제 판매 테스트", desc: "현장 판매를 개시하고 스태프 온라인 기본 교육 이수 및 고객 선호 데이터 추이를 모니터링합니다." },
                { num: "06", title: "데이터 최적화 및 로테이션", desc: "90일 교환 크레딧 정책을 발동하여 더딘 품목은 회수하고, 판매가 검증된 베스트 SKU로 재고 믹스를 영구 최적화합니다." }
              ].map((step, i) => (
                <div key={i} className="bg-[#12141c] border border-border p-6 rounded-card flex flex-col gap-3">
                  <span className="font-display text-xs font-bold text-accent">{step.num}</span>
                  <h4 className="font-display text-base font-bold text-white">{step.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* [12단계] Why Us / Trust - 20년 노하우 & 중소벤처기업부 인증 */}
        <section id="why-us" className="py-20 max-w-7xl mx-auto px-6 border-b border-[#202330]">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left KPIs Numbers */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-left">
              {t.whyUs.stats.map((s, i) => (
                <div key={i} className="bg-[#12141c] border border-border p-5 rounded-card flex flex-col justify-between min-h-[110px]">
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-wide block">{s.label}</span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-accent mt-2 block">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Right Curation detail & MSS Certification */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                {t.whyUs.eyebrow}
              </span>
              <h2 className="font-display text-3xl font-bold text-white">
                {t.whyUs.title}
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {t.whyUs.subtitle} K Select Hub의 운영 모체인 Letusto Inc.는 단순 무역 벤더와 구별됩니다.
              </p>
              
              {/* MSS certification badge */}
              <div className="bg-[#12141c] border border-border p-5 rounded-card flex flex-col gap-2 mt-2">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="text-accent">★</span> {t.whyUs.official.title}
                </span>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {t.whyUs.official.desc}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Tag Insights Section */}
        <section id="insights" className="py-20 bg-[#0c0d14] border-b border-[#202330]">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mb-12 flex flex-col gap-4 text-left">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                {t.insights.eyebrow}
              </span>
              <h2 className="font-display text-3xl font-bold text-white leading-tight">
                {t.insights.title}
              </h2>
              <p className="text-sm text-text-secondary">
                {t.insights.subtitle}
              </p>
            </div>

            {/* Tag Filters list */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-text-secondary mb-10">
              {Object.entries(t.insights.tags).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`px-4 py-2 rounded-pill border transition-all cursor-pointer ${
                    key === "all"
                      ? "bg-accent-light border-accent text-accent"
                      : "bg-[#12141c] border-border hover:border-accent-light"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mock Article Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { title: "2026 미국 뷰티 서플라이 오프라인 리테일 전략 리포트", tag: "Beauty Retail", date: "2026.08.08" },
                { title: "K-스킨케어 슬로우 셀러를 걸러내는 90일 주기 진단 가이드", tag: "Store Operations", date: "2026.08.05" },
                { title: "왜 미국 Z세대는 클린 뷰티(Clean Beauty)에 열광하는가", tag: "K-Beauty Trends", date: "2026.08.01" }
              ].map((art, i) => (
                <div key={i} className="bg-[#12141c] border border-border rounded-card p-6 flex flex-col justify-between min-h-[160px] hover:border-accent/40 transition-colors cursor-pointer">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-accent font-bold uppercase">{art.tag}</span>
                    <h4 className="font-semibold text-white leading-snug">{art.title}</h4>
                  </div>
                  <span className="text-[10px] text-text-muted mt-4 block">{art.date}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* [Apply Form Section] */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <CtaForm />
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#0c0d14] border-t border-[#202330] py-12 text-sm text-text-secondary">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          <div className="flex flex-col gap-3 text-left">
            <span className="font-display text-xl font-bold text-white">
              {t.header.logo}
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
