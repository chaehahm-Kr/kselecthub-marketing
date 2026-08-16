"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { assetConfig } from "../assets.config";
import { getDictionary } from "../locales/getDictionary";

interface HeaderProps {
  locale?: string;
}

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const isSimulator = pathname.includes("/simulator");
  const krHref = isSimulator ? "/ko/simulator" : "/ko";
  const enHref = isSimulator ? "/simulator" : "/";
  
  const activeLocale = locale === "ko" ? "ko" : "en";
  const basePath = locale === "ko" ? "/ko" : "";
  const t = getDictionary(activeLocale);

  return (
    <header className="sticky top-0 z-50 bg-[#141414]/86 backdrop-blur-md border-b border-[#2A2A2A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-12 h-[88px] flex items-center justify-between gap-4 sm:gap-6 lg:gap-8">
        <div className="flex items-center gap-4 lg:gap-5 xl:gap-8">
          {/* Logo Click Area */}
          <Link href={basePath || "/"} className="flex items-center group focus:outline-none focus:ring-2 focus:ring-[#ff2b75] focus:ring-offset-2 focus:ring-offset-[#141414] rounded-card -ml-2 sm:-ml-4">
            <div className="relative w-[170px] h-[40px] sm:w-[220px] sm:h-[52px]">
              <Image
                src={assetConfig.logo.src}
                alt={assetConfig.logo.alt}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 170px, 220px"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-sm font-semibold text-white/70">
            
            {/* 01. PROGRAM */}
            <div className="relative group/nav py-6">
              <button className="flex items-center gap-1 focus:outline-none cursor-pointer">
                <div className="relative h-5 w-[75px] flex items-center justify-start select-none">
                  <span className={`absolute left-0 text-[12.5px] tracking-wider font-extrabold text-white/80 ${locale === "ko" ? "group-hover/nav:opacity-0" : ""} transition-opacity duration-200 pointer-events-none whitespace-nowrap`}>
                    PROGRAM
                  </span>
                  {locale === "ko" && (
                    <span className="absolute left-0 text-[12.5px] tracking-wider font-extrabold text-[#ff2b75] opacity-0 group-hover/nav:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      프로그램
                    </span>
                  )}
                </div>
                <svg className="w-3.5 h-3.5 text-white/30 group-hover/nav:text-[#ff2b75] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Container */}
              <div className="absolute top-[100%] left-0 w-[300px] bg-[#0c0c0c] border border-white/10 rounded-[16px] p-3.5 flex flex-col gap-1 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300 z-50">
                {[
                  { label: "01. Why K-Beauty Now", sub: locale === "ko" ? "왜 지금 K-Beauty인가" : "Market Opportunity", href: `${basePath || ""}/#opportunity` },
                  { label: "02. Retailer Challenges", sub: locale === "ko" ? "리테일러가 겪는 현실적인 문제" : "Retail Challenges", href: `${basePath || ""}/#problems-section` },
                  { label: "03. K Select Solution", sub: locale === "ko" ? "통합 성장 솔루션" : "Category Solution", href: `${basePath || ""}/#solution` },
                  { label: "03A. Product Curation", sub: locale === "ko" ? "매장 맞춤 상품 큐레이션" : "Assortment Curation", href: `${basePath || ""}/#products`, isSub: true },
                  { label: "03B. K-Beauty Category Display", sub: locale === "ko" ? "4FT · 8FT · 12FT 전문 디스플레이" : "Display Modules", href: `${basePath || ""}/#display`, isSub: true },
                  { label: "03C. 90-Day Exchange Credit", sub: locale === "ko" ? "초기 재고 리스크 완화" : "Exchange Credit Program", href: `${basePath || ""}/#exchange-credit`, isSub: true },
                  { label: "04. Launch Partner Only", sub: locale === "ko" ? "초기 런칭 파트너 전용 혜택" : "Partner Benefits", href: `${basePath || ""}/#benefits` },
                  { label: "05. How It Works", sub: locale === "ko" ? "신청부터 성장까지" : "Partnership Timeline", href: `${basePath || ""}/#partnership-timeline` },
                  { label: "06. Launch Readiness / Self-Check", sub: locale === "ko" ? "매장 자격 확인 및 파트너 신청" : "Apply for Partnership", href: `${basePath || ""}/#launch-readiness` },
                  { label: "FAQ", sub: locale === "ko" ? "자주 묻는 질문" : "Frequently Asked Questions", href: `${basePath || ""}/#faq` }
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex flex-col px-3 py-2 rounded-[8px] hover:bg-white/5 transition-all text-left group/item ${item.isSub ? "ml-4 border-l border-white/10 pl-3.5" : ""}`}
                  >
                    <span className={`text-[12px] font-extrabold text-white group-hover/item:text-[#ff2b75] transition-colors ${item.isSub ? "text-white/80 font-bold" : ""}`}>
                      {item.label}
                    </span>
                    <span className="text-[10px] text-[#7A7A7A] mt-0.5 font-semibold">
                      {item.sub}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 02. SIMULATOR (Independent Main Menu) */}
            <Link href={`${basePath}/simulator`} className="flex items-center cursor-pointer py-6">
              <div className="relative h-5 w-[110px] flex items-center justify-start select-none group/sim">
                <span className={`absolute left-0 text-[12.5px] tracking-wider font-extrabold ${isSimulator ? "text-[#ff2b75]" : "text-white/80"} ${locale === "ko" ? "group-hover/sim:opacity-0" : ""} transition-opacity duration-200 pointer-events-none whitespace-nowrap`}>
                  SIMULATOR
                </span>
                {locale === "ko" && (
                  <span className="absolute left-0 text-[12.5px] tracking-wider font-extrabold text-[#ff2b75] opacity-0 group-hover/sim:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    성장 시뮬레이터
                  </span>
                )}
              </div>
            </Link>

            {/* 03. ABOUT */}
            <div className="relative group/nav py-6">
              <Link href={`${basePath}/about`} className="flex items-center gap-1 focus:outline-none cursor-pointer">
                <div className="relative h-5 w-[55px] flex items-center justify-start select-none">
                  <span className={`absolute left-0 text-[12.5px] tracking-wider font-extrabold text-white/80 ${locale === "ko" ? "group-hover/nav:opacity-0" : ""} transition-opacity duration-200 pointer-events-none whitespace-nowrap`}>
                    ABOUT
                  </span>
                  {locale === "ko" && (
                    <span className="absolute left-0 text-[12.5px] tracking-wider font-extrabold text-[#ff2b75] opacity-0 group-hover/nav:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      소개
                    </span>
                  )}
                </div>
                <svg className="w-3.5 h-3.5 text-white/30 group-hover/nav:text-[#ff2b75] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              <div className="absolute top-[100%] left-0 w-[280px] bg-[#0c0c0c] border border-white/10 rounded-[16px] p-3 flex flex-col gap-1 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300 z-50">
                {[
                  { label: "About Letusto", sub: locale === "ko" ? "Letusto의 Retail & E-commerce Experience" : "Letusto's Retail & E-commerce History", href: `${basePath}/about` },
                  { label: "Why Partner With Us", sub: locale === "ko" ? "경험, 인프라, 운영 역량" : "Our Track Record & Capabilities", href: `${basePath}/about#why-partner-with-us` }
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex flex-col px-3 py-2 rounded-[8px] hover:bg-white/5 transition-all text-left group/item"
                  >
                    <span className="text-[12px] font-extrabold text-white group-hover/item:text-[#ff2b75] transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-[#7A7A7A] mt-0.5 font-semibold">
                      {item.sub}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 04. INSIGHTS (Independent Main Menu) */}
            <Link href={`${basePath}/insights`} className="flex items-center cursor-pointer py-6">
              <div className="relative h-5 w-[75px] flex items-center justify-start select-none group/insights">
                <span className={`absolute left-0 text-[12.5px] tracking-wider font-extrabold text-white/80 ${locale === "ko" ? "group-hover/insights:opacity-0" : ""} transition-opacity duration-200 pointer-events-none whitespace-nowrap`}>
                  INSIGHTS
                </span>
                {locale === "ko" && (
                  <span className="absolute left-0 text-[12.5px] tracking-wider font-extrabold text-[#ff2b75] opacity-0 group-hover/insights:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    인사이트
                  </span>
                )}
              </div>
            </Link>

          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-[20px]">
          {/* Language Selector UI: EN | KR */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary select-none whitespace-nowrap">
            {locale === "ko" ? (
              <>
                <Link href={enHref} className="hover:text-white transition-colors animate-fade-in" aria-label="Switch to English">EN</Link>
                <span className="text-text-muted">|</span>
                <span className="text-white font-bold cursor-default" aria-label="Korean active selection">KR</span>
              </>
            ) : (
              <>
                <span className="text-white font-bold cursor-default" aria-label="English active selection">EN</span>
                <span className="text-text-muted">|</span>
                <Link href={krHref} className="hover:text-white transition-colors animate-fade-in" aria-label="Switch to Korean">KR</Link>
              </>
            )}
          </div>
          
          <a
            href="https://portal.kselecthub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-text-secondary hover:text-white transition-all focus:outline-none focus:underline whitespace-nowrap"
          >
            {locale === "ko" ? "로그인" : "Sign In"}
          </a>
          <div className="w-px h-5 bg-[#2A2A2A] hidden xs:block" />
          
          <Link
            id="btn-header-apply"
            data-analytics="header-apply"
            href={`${basePath || ""}/#launch-readiness`}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-[8px] bg-[#ff2b75] hover:bg-[#e01a5e] text-white text-xs font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2b75]"
          >
            {locale === "ko" ? t.header.nav.apply : "Apply Now"}
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
