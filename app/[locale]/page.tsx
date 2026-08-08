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

  // Category Colors for Product Mix Chart mapping
  const categoryColors = [
    { name: "K-스킨케어", color: "#ff9671", percent: "60%" },
    { name: "K-헤어 케어", color: "#845ec2", percent: "10%" },
    { name: "K-메이크업", color: "#ffc75f", percent: "10%" },
    { name: "K-바디 케어", color: "#00c9a7", percent: "10%" },
    { name: "K-퍼스널 케어", color: "#4d807a", percent: "5%" },
    { name: "K-뷰티 툴", color: "#d65db1", percent: "5%" }
  ];

  return (
    <div className="min-h-screen flex flex-col font-body bg-bg text-ink">
      {/* 1. Header */}
      <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="font-display text-2xl font-bold tracking-tight text-ink">
            {t.header.logo}
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            <a href="#program" className="text-sm font-medium hover:text-accent transition-colors">
              {t.header.nav.program}
            </a>
            <a href="#products" className="text-sm font-medium hover:text-accent transition-colors">
              {t.header.nav.products}
            </a>
            <a href="#display" className="text-sm font-medium hover:text-accent transition-colors">
              실제 진열 피처
            </a>
            <a href="#exchange" className="text-sm font-medium hover:text-accent transition-colors">
              90일 안심 교환
            </a>
            <a href="#simulator-anchor" className="text-sm font-medium hover:text-accent transition-colors text-accent font-bold">
              {t.header.nav.simulator}
            </a>
            <a href="#why-kselect" className="text-sm font-medium hover:text-accent transition-colors">
              {t.header.nav.whyKselect}
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://portal.kselecthub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-2 border border-ink rounded-pill hover:bg-ink hover:text-white transition-all"
            >
              {t.header.nav.login}
            </a>
            <a
              href="#apply"
              className="hidden sm:inline-block text-xs font-semibold bg-accent text-white px-5 py-2.5 rounded-pill hover:opacity-90 transition-opacity"
            >
              {t.header.nav.apply}
            </a>
          </div>
        </div>
      </header>

      {/* Main Sections Flow */}
      <main className="flex-1">
        
        {/* [Section 1] Hero - K-Beauty Opportunity + K Select 핵심 가치 */}
        <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col items-start gap-6">
              <span className="text-eyebrow text-accent uppercase tracking-wider">
                {t.hero.eyebrow}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-ink">
                {t.hero.title}
              </h1>
              <p className="text-body text-text-secondary max-w-2xl">
                {t.hero.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
                <a
                  href="#apply"
                  className="inline-flex h-14 items-center justify-center bg-accent text-white px-8 font-semibold rounded-pill hover:opacity-95 transition-opacity text-center"
                >
                  {t.hero.primaryCta}
                </a>
                <a
                  href="#simulator-anchor"
                  className="inline-flex h-14 items-center justify-center border border-ink text-ink px-8 font-semibold rounded-pill hover:bg-ink hover:text-white transition-all text-center"
                >
                  {t.header.nav.simulator} 시작하기
                </a>
              </div>
            </div>

            {/* Split layout showcasing real-store photography */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative h-[340px] sm:h-[440px] w-full rounded-card overflow-hidden border border-border bg-surface">
                <Image
                  src="/images/display_12ft.jpg"
                  alt="K-Beauty Store-in-a-Store Fixture Installation"
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-4 left-4 bg-ink/90 text-bg text-[10px] font-semibold px-3 py-1.5 rounded-pill backdrop-blur-sm">
                  📍 실제 매장 안의 K-Beauty Section 설치 사례 (12FT Destination)
                </div>
              </div>
            </div>
          </div>

          {/* Quick value cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {t.hero.highlights.map((h, i) => (
              <div key={i} className="bg-surface border border-border p-6 rounded-card flex flex-col gap-3 justify-between">
                <span className="text-3xl">{h.emoji}</span>
                <p className="font-semibold text-xs sm:text-sm leading-relaxed text-ink">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* [Section 2] Why K-Beauty - 미국 리테일러 기회 */}
        <section id="opportunity" className="py-20 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
              <span className="text-eyebrow text-accent uppercase tracking-wider">
                {t.whyKbeauty.eyebrow}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                {t.whyKbeauty.title}
              </h2>
              <p className="text-body text-text-secondary">
                {t.whyKbeauty.subtitle}
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {t.whyKbeauty.stats.map((s, i) => (
                <div key={i} className="bg-bg border border-border p-8 rounded-card text-center flex flex-col gap-2">
                  <span className="font-display text-4xl sm:text-5xl font-bold text-accent">
                    {s.value}
                  </span>
                  <span className="text-sm font-medium text-text-secondary">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto text-center">
              <p className="text-body text-ink leading-relaxed">
                {t.whyKbeauty.description}
              </p>
            </div>
          </div>
        </section>

        {/* [Section 3] K Select Solution - 도매와의 비교 */}
        <section id="program" className="py-20 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 flex flex-col gap-4">
            <span className="text-eyebrow text-accent uppercase tracking-wider">
              {t.solution.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              {t.solution.title}
            </h2>
            <p className="text-body text-text-secondary">
              {t.solution.subtitle}
            </p>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto border border-border rounded-panel bg-surface">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-border bg-bg">
                  <th className="py-5 px-6 font-display font-bold text-sm text-ink w-1/4">
                    {t.solution.comparison.headers[0]}
                  </th>
                  <th className="py-5 px-6 font-display font-bold text-sm text-text-secondary w-3/8">
                    {t.solution.comparison.headers[1]}
                  </th>
                  <th className="py-5 px-6 font-display font-bold text-sm text-accent w-3/8">
                    {t.solution.comparison.headers[2]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.solution.comparison.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-bg/40 transition-colors">
                    <td className="py-6 px-6 font-semibold text-sm text-ink">
                      {row.area}
                    </td>
                    <td className="py-6 px-6 text-sm text-text-secondary leading-relaxed">
                      {row.traditional}
                    </td>
                    <td className="py-6 px-6 text-sm text-ink font-medium leading-relaxed bg-accent/[0.02]">
                      {row.kselect}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* [Section 4] Curated Product Mix - 60/10/10/10/5/5 SVG 도넛차트 및 상세 대표 품목 */}
        <section id="products" className="py-20 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16 flex flex-col gap-4">
              <span className="text-eyebrow text-accent uppercase tracking-wider">
                {t.products.eyebrow}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                K Select Sourcing Product Mix
              </h2>
              <p className="text-body text-text-secondary">
                {t.products.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left: Donut Ring Chart Visualizer */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-bg border border-border rounded-panel">
                <div className="relative w-72 h-72">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Circle Radius = 15.91549430918954 (~ 100/2pi) for Circumference = 100 */}
                    {/* Skincare (60%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="25"
                      fill="transparent"
                      stroke="#ff9671"
                      strokeWidth="12"
                      strokeDasharray="60 40"
                      strokeDashoffset="0"
                    />
                    {/* Haircare (10%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="25"
                      fill="transparent"
                      stroke="#845ec2"
                      strokeWidth="12"
                      strokeDasharray="10 90"
                      strokeDashoffset="-60"
                    />
                    {/* Makeup (10%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="25"
                      fill="transparent"
                      stroke="#ffc75f"
                      strokeWidth="12"
                      strokeDasharray="10 90"
                      strokeDashoffset="-70"
                    />
                    {/* Bodycare (10%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="25"
                      fill="transparent"
                      stroke="#00c9a7"
                      strokeWidth="12"
                      strokeDasharray="10 90"
                      strokeDashoffset="-80"
                    />
                    {/* Personalcare (5%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="25"
                      fill="transparent"
                      stroke="#4d807a"
                      strokeWidth="12"
                      strokeDasharray="5 95"
                      strokeDashoffset="-90"
                    />
                    {/* Tools (5%) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="25"
                      fill="transparent"
                      stroke="#d65db1"
                      strokeWidth="12"
                      strokeDasharray="5 95"
                      strokeDashoffset="-95"
                    />
                  </svg>
                  {/* Center Text representation */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent pointer-events-none">
                    <span className="font-display text-xs font-semibold text-text-secondary uppercase tracking-widest">sourcing</span>
                    <span className="font-display text-3xl font-extrabold text-ink mt-0.5">Mix Ratio</span>
                  </div>
                </div>

                {/* Color Legend chips */}
                <div className="grid grid-cols-3 gap-x-6 gap-y-3 w-full mt-8 pt-6 border-t border-border">
                  {categoryColors.map((chip, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: chip.color }} />
                      <div className="flex flex-col text-[10px] leading-tight">
                        <span className="font-medium text-ink">{chip.name}</span>
                        <span className="font-bold text-accent font-display">{chip.percent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Detailed Category List & Representative Products */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {t.products.categories.map((c, i) => (
                  <div key={i} className="bg-surface border border-border p-6 rounded-card flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex flex-col gap-2 max-w-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{c.emoji}</span>
                        <h3 className="font-bold text-base text-ink">{c.name}</h3>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {c.desc}
                      </p>
                    </div>

                    {/* Dynamic Representative product label chips */}
                    <div className="flex flex-col sm:items-end justify-center shrink-0">
                      <span className="text-xs font-display font-extrabold text-accent bg-accent/5 px-3 py-1 rounded-pill mb-2 self-start sm:self-auto">
                        Sourcing Ratio: {c.ratio}
                      </span>
                      <div className="flex flex-wrap sm:justify-end gap-1 max-w-[280px]">
                        {c.items?.map((item, idx) => (
                          <span key={idx} className="text-[9px] font-mono border border-border px-2 py-0.5 rounded bg-bg text-text-secondary">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* [Section 5] Assortment Strategy - 상권 맞춤 구성 및 독점 상권 보호 정책 */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-eyebrow text-accent uppercase tracking-wider">
                {t.assortment.eyebrow}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight">
                {t.assortment.title}
              </h2>
              <p className="text-body text-text-secondary">
                {t.assortment.subtitle}
              </p>
              
              <div className="bg-surface border border-accent/20 p-6 rounded-panel mt-4">
                <h4 className="font-display font-bold text-sm text-accent mb-2">🔒 상권 독점 보호 정책 (Exclusive Territory Protection)</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  K Select는 파트너 매장의 안정적인 가격 주도권과 영업권 확보를 위해, 반경 내 타 매장에 동일 브랜드를 무분별하게 중복 공급하여 벌어지는 파괴적 할인 경쟁을 철저하게 방지하고 통제합니다.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4">
              {t.assortment.features.map((f, i) => (
                <div key={i} className="bg-surface border border-border p-6 rounded-card flex gap-4 items-start">
                  <div className="h-8 w-8 bg-accent/10 rounded-pill flex items-center justify-center text-accent font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-ink mb-1">{f.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [Section 6] Actual Store / Display - 실사 이미지 배치 및 비교 레이아웃 */}
        <section id="display" className="py-20 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16 flex flex-col gap-4">
              <span className="text-eyebrow text-accent uppercase tracking-wider">
                {t.display.eyebrow}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                실제 매장 전용 디스플레이 피처(Fixture)
              </h2>
              <p className="text-body text-text-secondary">
                K Select는 가구 모듈을 모듈화하여 매장 규모와 요구사항에 맞춘 맞춤형 설치를 제공합니다. 단순 벤더가 아닌 Category 파트너로서 매장의 구도를 변화시킵니다.
              </p>
            </div>

            {/* Layout Comparison with Real Store Images */}
            <div className="flex flex-col gap-12">
              
              {/* Module 1: Starter (4FT) */}
              <div className="grid lg:grid-cols-12 gap-8 items-center bg-bg border border-border rounded-panel p-8">
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">STARTER MODULE (4FT)</span>
                  <h3 className="font-display text-2xl font-bold text-ink">16 - 24 SKUs • 1 Module</h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    K-Beauty를 매장 내에 처음 도입하거나 계산대 부근, 혹은 소형 뷰티서플라이 코너에 가장 효율적으로 카테고리를 시험해 볼 수 있는 미니 디스플레이 모듈 사양입니다.
                  </p>
                  <ul className="text-xs text-text-secondary flex flex-col gap-1 list-disc pl-5 mt-2">
                    <li>48"W x 86"H x 18"D 가구 사양</li>
                    <li>탑 조명 헤더 사인보드 일체</li>
                    <li>화장품 정보 설명 스트립 포함</li>
                  </ul>
                </div>
                <div className="lg:col-span-7">
                  <div className="relative h-96 w-full rounded-card overflow-hidden border border-border bg-surface">
                    <Image
                      src="/images/display_4ft.png"
                      alt="4FT K-Beauty Starter Display Module"
                      fill
                      sizes="(max-w-768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Module 2: Growth (8FT) */}
              <div className="grid lg:grid-cols-12 gap-8 items-center bg-bg border border-border rounded-panel p-8">
                <div className="lg:col-span-7 order-last lg:order-first">
                  <div className="relative h-96 w-full rounded-card overflow-hidden border border-border bg-surface">
                    <Image
                      src="/images/display_8ft.png"
                      alt="8FT K-Beauty Growth Display Module"
                      fill
                      sizes="(max-w-768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">GROWTH MODULE (8FT)</span>
                  <h3 className="font-display text-2xl font-bold text-ink">32 - 48 SKUs • 2 Modules</h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    본격적인 K-Beauty 스킨케어와 헤어/패치 라인업을 확보하고, 동선 중앙 혹은 벽면에 전용 쇼룸 존을 설계하여 매장 방문객의 시각적 발견율과 전환을 높이는 표준형 패키지입니다.
                  </p>
                  <ul className="text-xs text-text-secondary flex flex-col gap-1 list-disc pl-5 mt-2">
                    <li>96"W x 86"H x 18"D (4FT 가구 2조 연결)</li>
                    <li>중앙 LED 테스터 존 및 미러 포함</li>
                    <li>다양한 브랜드 믹스를 조화롭게 수용</li>
                  </ul>
                </div>
              </div>

              {/* Module 3: Destination (12FT) */}
              <div className="grid lg:grid-cols-12 gap-8 items-center bg-bg border border-border rounded-panel p-8">
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">DESTINATION ZONE (12FT)</span>
                  <h3 className="font-display text-2xl font-bold text-ink">48 - 70 SKUs • 3 Modules</h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    지역 상권의 K-Beauty 명소(Destination)로 거듭나도록 대형 매장에 적합한 샵인샵 전용 부스를 설계합니다. 가장 넓은 범위의 스킨/메이크업/바디/헤어 SKU를 수용하여 마진 잠재력을 극대화합니다.
                  </p>
                  <ul className="text-xs text-text-secondary flex flex-col gap-1 list-disc pl-5 mt-2">
                    <li>144"W x 86"H x 18"D (4FT 가구 3조 연결)</li>
                    <li>전 카테고리(스킨, 헤어, 툴, 메이크업 등) 풀 구성</li>
                    <li>LED 조명 액센트와 미러 갤러리 피처링</li>
                  </ul>
                </div>
                <div className="lg:col-span-7">
                  <div className="relative h-96 w-full rounded-card overflow-hidden border border-border bg-surface">
                    <Image
                      src="/images/display_12ft.jpg"
                      alt="12FT K-Beauty Destination Zone Display"
                      fill
                      sizes="(max-w-768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* [Section 7] K Select Partnership Package - 11가지 지원 항목 패키지 */}
        <section id="partnership-package" className="py-20 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 flex flex-col gap-4">
            <span className="text-eyebrow text-accent uppercase tracking-wider">
              {t.package.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              {t.package.title}
            </h2>
            <p className="text-body text-text-secondary">
              {t.package.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.package.benefits.map((b, i) => (
              <div key={i} className="bg-surface border border-border p-6 rounded-card flex flex-col gap-3 justify-between hover:border-accent transition-colors">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-accent/10 rounded-pill flex items-center justify-center text-accent text-xs font-bold font-display shrink-0">
                      {(i + 1).toString().padStart(2, "0")}
                    </div>
                    <h3 className="font-bold text-sm text-ink">{b.title}</h3>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* [Section 8] 90-Day Exchange Credit / Risk Reduction */}
        <section id="exchange" className="py-20 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16 flex flex-col gap-4">
              <span className="text-eyebrow text-accent uppercase tracking-wider">
                {t.riskReduction.eyebrow}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                {t.riskReduction.title}
              </h2>
              <p className="text-body text-text-secondary">
                {t.riskReduction.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center mb-12">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t.riskReduction.desc}
                </p>
                <div className="bg-bg border border-border p-5 rounded-card text-xs text-text-secondary mt-2">
                  💡 <strong>보조 메시지:</strong> 처음부터 모든 상품을 완벽하게 맞힐 필요는 없습니다. K Select가 판매 결과를 보면서 더 적합한 상품 구성으로 조정할 수 있도록 지원합니다.
                </div>
              </div>

              {/* Infographic Steps flow layout */}
              <div className="lg:col-span-7 flex flex-col gap-3 relative">
                {t.riskReduction.steps.map((step, idx) => (
                  <div key={idx} className="bg-bg border border-border p-5 rounded-card flex gap-4 items-center relative">
                    <div className="h-10 w-10 bg-accent text-white rounded-pill flex items-center justify-center font-display font-extrabold text-sm shrink-0">
                      Step 0{idx + 1}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-sm text-ink">{step.title}</span>
                      <span className="text-xs text-text-secondary mt-0.5 leading-relaxed">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-6 max-w-4xl mx-auto">
              <p className="text-[11px] text-text-secondary leading-relaxed text-center italic">
                {t.riskReduction.disclaimer}
              </p>
            </div>
          </div>
        </section>

        {/* [Section 9] Growth Simulator - 성장 시뮬레이터 로드 */}
        <section id="simulator-anchor" className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-eyebrow text-accent uppercase tracking-wider">
              {t.simulator.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              {t.simulator.title}
            </h2>
            <p className="text-body text-text-secondary">
              {t.simulator.subtitle}
            </p>
          </div>

          <Simulator />
        </section>

        {/* [Section 10] How It Works - 온보딩 과정 */}
        <section id="process" className="py-20 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16 flex flex-col gap-4">
              <span className="text-eyebrow text-accent uppercase tracking-wider">
                {t.process.eyebrow}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                {t.process.title}
              </h2>
              <p className="text-body text-text-secondary">
                {t.process.subtitle}
              </p>
            </div>

            {/* Stepper Grid */}
            <div className="grid sm:grid-cols-5 gap-6 relative">
              {t.process.steps.map((step, i) => (
                <div key={i} className="flex flex-col gap-4 relative">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-3xl font-extrabold text-accent/20">
                      {step.num}
                    </span>
                    {i < 4 && (
                      <div className="hidden sm:block absolute right-0 top-4 w-full h-[1px] bg-border translate-x-1/2 z-0" />
                    )}
                  </div>
                  <div className="z-10 bg-bg p-5 border border-border rounded-card h-full flex flex-col gap-2">
                    <h3 className="font-bold text-sm text-ink">{step.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [Section 11] Partner Operating Standards - Provides vs We Ask */}
        <section id="standards" className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-eyebrow text-accent uppercase tracking-wider">
              {t.standards.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              {t.standards.title}
            </h2>
            <p className="text-body text-text-secondary">
              {t.standards.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* What K Select Provides */}
            <div className="bg-surface border border-border p-8 rounded-panel flex flex-col gap-6">
              <h3 className="font-display font-bold text-lg text-accent flex items-center gap-2">
                🤝 {t.standards.provides.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {t.standards.provides.items.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-text-secondary flex gap-3 items-start leading-relaxed">
                    <span className="text-accent shrink-0 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Ask */}
            <div className="bg-surface border border-border p-8 rounded-panel flex flex-col gap-6">
              <h3 className="font-display font-bold text-lg text-ink flex items-center gap-2">
                📢 {t.standards.asks.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {t.standards.asks.items.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-text-secondary flex gap-3 items-start leading-relaxed">
                    <span className="text-ink shrink-0 font-bold">▪</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* [Section 12] Why K Select - 경험 및 인프라 (기존 신뢰 섹션) */}
        <section id="why-kselect" className="py-20 bg-surface border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-16 flex flex-col gap-4">
              <span className="text-eyebrow text-accent uppercase tracking-wider">
                {t.trust.eyebrow}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                {t.trust.title}
              </h2>
              <p className="text-body text-text-secondary">
                {t.trust.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {t.trust.details.map((detail: { title: string; desc: string }, i: number) => (
                <div key={i} className="bg-bg border border-border p-8 rounded-panel flex flex-col gap-4">
                  <span className="text-xs font-bold text-accent tracking-wide uppercase">
                    Reason 0{i + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {detail.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {detail.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 flex flex-col gap-3">
            <span className="text-eyebrow text-accent uppercase tracking-wider">FAQ</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">자주 묻는 질문</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="bg-surface border border-border p-6 rounded-card">
              <h3 className="font-bold text-sm text-ink mb-2">Q. 가입 입점 비용이나 가구 보증금이 따로 있나요?</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                K Select는 단순 집기 판매업체가 아닙니다. 입점 승인 후 상권 분석 결과와 매칭되어 집기는 무상 또는 보조금 형태로 지원(지원 사양에 따름)하며, 구체적인 계약 조건은 소싱 파트너십 단계에서 투명하게 조율됩니다.
              </p>
            </div>
            <div className="bg-surface border border-border p-6 rounded-card">
              <h3 className="font-bold text-sm text-ink mb-2">Q. 안 팔리는 재고가 남으면 어떻게 처리하나요?</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                K Select는 First Order Protection 정책을 보유하고 있어, 초기 런칭 후 판매량이 부진한 상품은 시장 선호도가 입증된 타 스킨케어/헤어 카테고리 제품으로 로테이션 교체가 가능합니다.
              </p>
            </div>
            <div className="bg-surface border border-border p-6 rounded-card">
              <h3 className="font-bold text-sm text-ink mb-2">Q. 주문 접수 및 배송 기간은 얼마나 걸리나요?</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                미국 뉴저지 HQ 자체 물류센터에 항상 충분한 스톡을 상시 확보하고 있으므로, 발주 접수 후 미국 전역 3~5영업일 내에 신속한 물류 배송이 완료됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* [Section 13] Apply - 최종 신청서 로드 */}
        <section id="apply" className="py-24 bg-ink text-bg relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-bg leading-tight">
              {t.cta.title}
            </h2>
            <p className="text-sm opacity-80 mb-12 max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>

            <CtaForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <span className="font-display text-xl font-bold tracking-tight text-ink">
              {t.header.logo}
            </span>
            <p className="text-xs text-text-secondary">
              {t.footer.copyright}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-xs text-text-secondary md:items-end">
            <p className="font-medium text-ink">{t.footer.address}</p>
            <p>{t.footer.contact}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
