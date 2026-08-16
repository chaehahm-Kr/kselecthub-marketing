"use client";

import React, { useState, useEffect } from "react";
import CtaForm from "./CtaForm";

interface PartnerModalProps {
  locale?: string;
}

export default function PartnerModal({ locale }: PartnerModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Global event delegation for trigger clicks mapping to #apply links
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.endsWith("#apply")) {
          e.preventDefault();
          setIsOpen(true);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  // Lock and unlock body scroll based on modal open state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      
      {/* Dark backdrop overlay with blur */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Dialog Window */}
      <div className="relative w-full max-w-[840px] max-h-[90vh] bg-[#0c0c0c] border border-white/10 rounded-[24px] shadow-2xl overflow-y-auto z-10 p-6 sm:p-10 animate-slide-up text-left">
        
        {/* Close Button (X) */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2b75]"
          aria-label="Close apply modal"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Embedded Application Form Container */}
        <div className="w-full">
          <CtaForm locale={locale} />
        </div>

      </div>
      
    </div>
  );
}
