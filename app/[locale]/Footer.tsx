"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assetConfig } from "../assets.config";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  return (
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
          <Link href={`/${locale}#solution`}>제품 큐레이션</Link>
          <Link href={`/${locale}#display`}>디스플레이 프로그램</Link>
          <Link href={`/${locale}#exchange-credit`}>90일 교환 크레딧</Link>
          <Link href={`/${locale}/simulator`}>성장 시뮬레이터</Link>
        </div>

        <div className="flex flex-col gap-3 text-xs text-text-secondary">
          <span className="font-semibold text-white mb-1">파트너</span>
          <Link href={`/${locale}#launch-readiness`}>파트너 신청</Link>
          <a href="https://portal.kselecthub.com" target="_blank" rel="noopener noreferrer">파트너 로그인</a>
          <Link href={`/${locale}#launch-readiness`}>파트너 리소스</Link>
        </div>

        <div className="flex flex-col gap-3 text-xs text-text-secondary">
          <span className="font-semibold text-white mb-1">회사</span>
          <Link href={`/${locale}/about`}>소개</Link>
          <Link href={`/${locale}#launch-readiness`}>문의하기</Link>
          <span className="cursor-pointer">이용약관 · 개인정보처리방침</span>
        </div>

      </div>

      <div className="border-t border-[#2a2a2a] py-5">
        <div className="max-w-[1400px] mx-auto px-[64px] text-xs text-text-secondary text-left">
          <span>© 2026 K Select Hub. All rights reserved. Letusto Inc. HQ New Jersey.</span>
        </div>
      </div>
    </footer>
  );
}
