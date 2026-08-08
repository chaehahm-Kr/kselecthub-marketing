"use client";

import React, { useState, useEffect } from "react";
import { ko } from "../locales/ko";

export default function CtaForm() {
  const t = ko.cta;
  const ts = ko.standards;
  
  const [email, setEmail] = useState("");
  const [storeName, setStoreName] = useState("");
  const [agreed, setAgreed] = useState(false); // Compliance checkbox state
  const [recommendedConfig, setRecommendedConfig] = useState<string | null>(null); // Simulator integration
  const [submitted, setSubmitted] = useState(false);

  // Sync with Simulator results via localStorage and Custom Events
  useEffect(() => {
    // Check initial value from localStorage if already simulated
    const savedConfig = localStorage.getItem("kselect_recommended_config");
    if (savedConfig) {
      setRecommendedConfig(savedConfig);
    }

    // Listen to custom event for real-time simulator updates
    const handleRecommendEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setRecommendedConfig(customEvent.detail);
      }
    };

    window.addEventListener("kselect_simulator_recommend", handleRecommendEvent);
    return () => {
      window.removeEventListener("kselect_simulator_recommend", handleRecommendEvent);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !storeName || !agreed) return;

    // Simulate Supabase table payload structure
    const payload = {
      store_name: storeName,
      email: email,
      agreed_to_standards: agreed,
      recommended_config: recommendedConfig || "None"
    };

    console.log("Submitting Retailer Application:", payload);
    setSubmitted(true);

    // Clear local storage after submission
    localStorage.removeItem("kselect_recommended_config");
  };

  return (
    <div className="w-full">
      {submitted ? (
        <div className="bg-accent text-white p-8 rounded-panel max-w-lg mx-auto border border-accent/20">
          <span className="text-4xl block mb-4">🎉</span>
          <h3 className="font-display text-xl font-bold mb-2">파트너 신청이 정상 접수되었습니다!</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            입력해 주신 정보와 상권을 면밀히 검토한 후, 24시간 이내에 담당자가 유선 연락 또는 이메일로 답변을 제공해 드리겠습니다.
          </p>
          {recommendedConfig && (
            <div className="bg-white/10 px-4 py-2 rounded-card text-xs font-semibold mt-4">
              신청 구성: {recommendedConfig}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-surface p-8 sm:p-10 rounded-panel text-ink text-left max-w-2xl mx-auto border border-border">
          {/* Simulated Recommendation Pre-population Banner */}
          {recommendedConfig && (
            <div className="bg-accent/10 border border-accent/20 px-5 py-3.5 rounded-card text-xs font-semibold text-accent mb-6 flex justify-between items-center">
              <span>💡 성장 시뮬레이터 추천 구성: <strong>{recommendedConfig}</strong></span>
              <button 
                type="button" 
                onClick={() => {
                  setRecommendedConfig(null);
                  localStorage.removeItem("kselect_recommended_config");
                }}
                className="text-[10px] underline cursor-pointer text-text-secondary"
              >
                지우기
              </button>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="store-name" className="text-xs font-bold text-text-secondary">
                매장명 (Store / Business Name) *
              </label>
              <input
                id="store-name"
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="예: Jersey Beauty Supply"
                className="h-12 px-4 border border-border rounded-pill text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold text-text-secondary">
                담당자 이메일 (Professional Email) *
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="예: manager@store.com"
                className="h-12 px-4 border border-border rounded-pill text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Compliance Operating Standard Checkbox */}
          <div className="flex items-start gap-3 mb-6 bg-bg/50 p-4 border border-border rounded-card">
            <input
              id="agreed-standards"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent cursor-pointer"
            />
            <label htmlFor="agreed-standards" className="text-xs text-text-secondary leading-relaxed cursor-pointer select-none">
              {ts.agreeLabel}
            </label>
          </div>

          <p className="text-[11px] text-text-secondary mb-6 leading-relaxed">
            * 제출 즉시 Letusto 미국 본사의 상권 보호 DB와 매핑되며, 입력된 이메일로 분석 상담 안내가 전송됩니다. 가상의 수치나 보증, 의약적 효능 주장 등 FDA 관련 리스크를 철저히 관리한 합법적 스킨케어 유통만을 준수합니다.
          </p>

          <button
            type="submit"
            disabled={!agreed}
            className={`w-full h-14 font-bold rounded-pill text-white text-sm transition-all ${
              agreed 
                ? "bg-accent hover:opacity-95 cursor-pointer" 
                : "bg-border text-text-secondary/60 cursor-not-allowed"
            }`}
          >
            {t.button}
          </button>
        </form>
      )}
    </div>
  );
}
