"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { assetConfig } from "../assets.config";

interface SolutionImage {
  key: string;
  src: string;
}

export default function SolutionSection() {
  const [activeTab, setActiveTab] = useState(0); // 0: CURATE, 1: DIFFERENTIATE, 2: BUILD, 3: SUPPORT, 4: OPTIMIZE
  const [buildSize, setBuildSize] = useState<"4ft" | "8ft" | "12ft">("8ft"); // Default 8ft based on user specs
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // 5 Master PNG images array in order
  const solutions: SolutionImage[] = [
    { key: "CURATE", src: "/images/solutions/curate.png" },
    { key: "DIFFERENTIATE", src: "/images/solutions/differentiate.png" },
    { key: "BUILD", src: "/images/solutions/build.jpg" },
    { key: "SUPPORT", src: "/images/solutions/support.png" },
    { key: "OPTIMIZE", src: "/images/solutions/optimize.png" }
  ];

  // 4.5s Auto-rolling loop sequence
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || isHovered) {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      return;
    }

    autoPlayTimer.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 5);
    }, 4500);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isHovered]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <section
      id="solution"
      className="w-full bg-[#0c0c0c] border-y border-[#2a2a2a] py-6 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 16:9 Aspect ratio wrapper maintaining exact pixel reproduction of master PNGs */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
        <div className="relative w-full aspect-[1024/576] overflow-hidden rounded-[24px] border border-[#2a2a2a] bg-[#0c0c0c]">
          
          {/* 5 Stacked Master Images with crossfade transition */}
          {solutions.map((sol, index) => (
            <div
              key={sol.key}
              className={`absolute inset-0 transition-opacity duration-300 ${
                activeTab === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={sol.src}
                alt={`K SELECT SOLUTION - ${sol.key}`}
                fill
                className="object-cover"
                sizes="(max-width: 1400px) 100vw, 1400px"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Active Overlay: If BUILD tab is active, render the 4FT/12FT fixture swap overlay */}
          {activeTab === 2 && (buildSize === "4ft" || buildSize === "12ft") && (
            <div className="absolute top-[11.2%] right-[3.5%] w-[26.5%] h-[74.3%] z-20 overflow-hidden rounded-[16px] border border-white/5 shadow-2xl animate-fade-in">
              <Image
                src={assetConfig.displayFixtures[buildSize].src}
                alt={`BUILD ${buildSize.toUpperCase()} Display Fixture`}
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
          )}

          {/* Absolute Hotspot Button Maps - Solution Wheel Nodes */}
          {/* Node 01 - CURATE (Top / 0 deg) */}
          <button
            onClick={() => handleTabClick(0)}
            className="absolute top-[25.5%] left-[18.3%] w-[7.0%] h-[12.0%] z-30 cursor-pointer rounded-full bg-transparent border-0 focus:outline-none"
            aria-label="Solution 01 Curate"
          />

          {/* Node 02 - DIFFERENTIATE (Top Right / 72 deg) */}
          <button
            onClick={() => handleTabClick(1)}
            className="absolute top-[39.5%] left-[31.2%] w-[7.0%] h-[12.0%] z-30 cursor-pointer rounded-full bg-transparent border-0 focus:outline-none"
            aria-label="Solution 02 Differentiate"
          />

          {/* Node 03 - BUILD (Bottom Right / 144 deg) */}
          <button
            onClick={() => handleTabClick(2)}
            className="absolute top-[62.5%] left-[28.5%] w-[7.0%] h-[12.0%] z-30 cursor-pointer rounded-full bg-transparent border-0 focus:outline-none"
            aria-label="Solution 03 Build"
          />

          {/* Node 04 - SUPPORT (Bottom Left / 216 deg) */}
          <button
            onClick={() => handleTabClick(3)}
            className="absolute top-[62.5%] left-[9.5%] w-[7.0%] h-[12.0%] z-30 cursor-pointer rounded-full bg-transparent border-0 focus:outline-none"
            aria-label="Solution 04 Support"
          />

          {/* Node 05 - OPTIMIZE (Top Left / 288 deg) */}
          <button
            onClick={() => handleTabClick(4)}
            className="absolute top-[39.5%] left-[6.5%] w-[7.0%] h-[12.0%] z-30 cursor-pointer rounded-full bg-transparent border-0 focus:outline-none"
            aria-label="Solution 05 Optimize"
          />

          {/* BUILD Size Swapper Hotspots (Only active when BUILD tab is selected) */}
          {activeTab === 2 && (
            <>
              {/* 4FT button hotspot */}
              <button
                onClick={() => setBuildSize("4ft")}
                className="absolute top-[54.8%] left-[45.7%] w-[4.3%] h-[7.0%] z-30 cursor-pointer rounded-[8px] bg-transparent border-0 focus:outline-none"
                aria-label="Build 4FT size"
              />
              {/* 8FT button hotspot */}
              <button
                onClick={() => setBuildSize("8ft")}
                className="absolute top-[54.8%] left-[50.5%] w-[4.3%] h-[7.0%] z-30 cursor-pointer rounded-[8px] bg-transparent border-0 focus:outline-none"
                aria-label="Build 8FT size"
              />
              {/* 12FT button hotspot */}
              <button
                onClick={() => setBuildSize("12ft")}
                className="absolute top-[54.8%] left-[55.3%] w-[4.3%] h-[7.0%] z-30 cursor-pointer rounded-[8px] bg-transparent border-0 focus:outline-none"
                aria-label="Build 12FT size"
              />
            </>
          )}

          {/* Bottom Deep Dive Hotspot Links */}
          {/* 01 Curated Product Mix Link */}
          <a
            href="#products"
            className="absolute top-[81.2%] left-[27.2%] w-[21.6%] h-[12.5%] z-30 cursor-pointer rounded-[12px] bg-transparent focus:outline-none"
            aria-label="Deep dive to Curated Product Mix"
          />
          
          {/* 02 Store-in-a-Store Link */}
          <a
            href="#display"
            className="absolute top-[81.2%] left-[49.6%] w-[21.6%] h-[12.5%] z-30 cursor-pointer rounded-[12px] bg-transparent focus:outline-none"
            aria-label="Deep dive to Store-in-a-Store"
          />

          {/* 03 90-Day Exchange Credit Link */}
          <a
            href="#exchange-credit"
            className="absolute top-[81.2%] left-[72.0%] w-[21.6%] h-[12.5%] z-30 cursor-pointer rounded-[12px] bg-transparent focus:outline-none"
            aria-label="Deep dive to 90-Day Exchange Credit"
          />

        </div>
      </div>
    </section>
  );
}
