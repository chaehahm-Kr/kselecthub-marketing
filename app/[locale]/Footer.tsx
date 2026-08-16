"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assetConfig } from "../assets.config";
import { getDictionary } from "../locales/getDictionary";

interface FooterProps {
  locale?: string;
}

export default function Footer({ locale }: FooterProps) {
  const activeLocale = locale === "ko" ? "ko" : "en";
  const basePath = locale === "ko" ? "/ko" : "";
  const t = getDictionary(activeLocale);

  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0c0c0c]">
      <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-left font-medium">
        
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
            {activeLocale === "ko" 
              ? "미국 독립 뷰티 리테일러를 위한 K-Beauty Category Management 플랫폼."
              : "The turn-key K-Beauty category management platform for U.S. independent beauty retailers."
            }
          </p>
        </div>

        <div className="flex flex-col gap-3 text-xs text-text-secondary">
          <span className="font-semibold text-white mb-1">
            {activeLocale === "ko" ? "솔루션" : "SOLUTIONS"}
          </span>
          <Link href={`${basePath}/#solution`}>
            {activeLocale === "ko" ? "제품 큐레이션" : "Product Curation"}
          </Link>
          <Link href={`${basePath}/#display`}>
            {activeLocale === "ko" ? "디스플레이 프로그램" : "Display Program"}
          </Link>
          <Link href={`${basePath}/#exchange-credit`}>
            {activeLocale === "ko" ? "90일 교환 크레딧" : "90-Day Exchange Credit"}
          </Link>
          <Link href={`${basePath}/simulator`}>
            {activeLocale === "ko" ? "성장 시뮬레이터" : "Growth Simulator"}
          </Link>
        </div>

        <div className="flex flex-col gap-3 text-xs text-text-secondary">
          <span className="font-semibold text-white mb-1">
            {activeLocale === "ko" ? "파트너" : "PARTNERS"}
          </span>
          <Link href={`${basePath}/#launch-readiness`}>
            {activeLocale === "ko" ? "파트너 신청" : "Apply for Partnership"}
          </Link>
          <a href="https://portal.kselecthub.com" target="_blank" rel="noopener noreferrer">
            {activeLocale === "ko" ? "파트너 로그인" : "Partner Login"}
          </a>
          <Link href={`${basePath}/#launch-readiness`}>
            {activeLocale === "ko" ? "파트너 리소스" : "Partner Resources"}
          </Link>
        </div>

        <div className="flex flex-col gap-3 text-xs text-text-secondary">
          <span className="font-semibold text-white mb-1">
            {activeLocale === "ko" ? "회사" : "COMPANY"}
          </span>
          <Link href={`${basePath}/about`}>
            {activeLocale === "ko" ? "소개" : "About Us"}
          </Link>
          <Link href={`${basePath}/#launch-readiness`}>
            {activeLocale === "ko" ? "문의하기" : "Contact Us"}
          </Link>
          <span className="cursor-pointer">
            {activeLocale === "ko" ? "이용약관 · 개인정보처리방침" : "Terms & Privacy Policy"}
          </span>
        </div>

      </div>

      <div className="border-t border-[#2a2a2a] py-5">
        <div className="max-w-[1400px] mx-auto px-[32px] sm:px-[64px] text-xs text-text-secondary text-left flex flex-col sm:flex-row justify-between gap-2.5">
          <span>{t.footer.copyright}</span>
          <span className="text-[11px] text-[#7A7A7A]">{t.footer.contact}</span>
        </div>
      </div>
    </footer>
  );
}
