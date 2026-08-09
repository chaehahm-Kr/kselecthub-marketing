"use client";

import React, { useState, useEffect } from "react";
import { ko } from "../locales/ko";

export default function CtaForm() {
  const t = ko.ctaForm;
  const ts = ko.partnership;

  // Form Field States
  const [storeName, setStoreName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [storeType, setStoreType] = useState("independent");
  const [desiredSpace, setDesiredSpace] = useState("8ft");
  const [comments, setComments] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Integration with Simulator Results
  const [recommendedConfig, setRecommendedConfig] = useState<string | null>(null);
  const [simulatedInvestment, setSimulatedInvestment] = useState<string | null>(null);
  
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check storage and custom event listeners for simulator connection
  useEffect(() => {
    const savedConfig = localStorage.getItem("kselect_recommended_config");
    const savedInvestment = localStorage.getItem("kselect_simulator_investment");
    if (savedConfig) {
      setRecommendedConfig(savedConfig);
    }
    if (savedInvestment) {
      setSimulatedInvestment(savedInvestment);
    }

    const handleRecommendEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setRecommendedConfig(customEvent.detail.configName);
        setSimulatedInvestment(customEvent.detail.investment.toString());
        setDesiredSpace(customEvent.detail.space);
      }
    };

    window.addEventListener("kselect_simulator_recommend", handleRecommendEvent);
    return () => {
      window.removeEventListener("kselect_simulator_recommend", handleRecommendEvent);
    };
  }, []);

  const handleClearRecommendation = () => {
    setRecommendedConfig(null);
    setSimulatedInvestment(null);
    localStorage.removeItem("kselect_recommended_config");
    localStorage.removeItem("kselect_simulator_investment");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Form validations
    if (!storeName.trim()) {
      setErrorMsg(t.validation.storeRequired);
      return;
    }
    if (!ownerName.trim()) {
      setErrorMsg(t.validation.ownerRequired);
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg(t.validation.emailRequired);
      return;
    }
    if (!phone.trim()) {
      setErrorMsg(t.validation.phoneRequired);
      return;
    }
    if (!address.trim()) {
      setErrorMsg(t.validation.addressRequired);
      return;
    }
    if (!agreed) {
      setErrorMsg(t.validation.agreeRequired);
      return;
    }

    // Submit payload structure simulation
    const payload = {
      storeName,
      ownerName,
      email,
      phone,
      address,
      storeType,
      desiredSpace,
      comments,
      recommendedConfig: recommendedConfig || "None",
      simulatedInvestment: simulatedInvestment || "None",
      agreedToStandards: agreed,
      submittedAt: new Date().toISOString(),
    };

    console.log("Submitting Retailer Partnership Application:", payload);
    setSubmitted(true);

    // Clear local storage integration
    localStorage.removeItem("kselect_recommended_config");
    localStorage.removeItem("kselect_simulator_investment");
  };

  return (
    <div id="apply" className="w-full max-w-3xl mx-auto">
      {submitted ? (
        <div className="bg-[#0c0d14] border border-[#ff127c]/20 p-8 sm:p-12 rounded-panel text-center max-w-lg mx-auto flex flex-col items-center gap-4">
          <span className="text-4xl">🎉</span>
          <h3 className="font-display text-2xl font-bold text-ink">
            신청이 성공적으로 접수되었습니다!
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.validation.success}
          </p>
          {recommendedConfig && (
            <div className="bg-accent-light border border-accent/20 px-4 py-2 rounded-card text-xs font-semibold text-accent mt-2">
              신청 모듈 구성: {recommendedConfig} (${Number(simulatedInvestment).toLocaleString()} 투자 규모)
            </div>
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-border p-6 sm:p-10 rounded-panel text-left flex flex-col gap-6"
        >
          {/* Active Simulator Recommendation Banner */}
          {recommendedConfig && (
            <div className="bg-accent-light border border-accent/20 px-5 py-4 rounded-card text-xs text-accent flex justify-between items-center gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold">🖥️ 시뮬레이터 연동 적용됨</span>
                <span className="opacity-90">
                  추천 구성: <strong>{recommendedConfig}</strong> (${Number(simulatedInvestment).toLocaleString()} 초기 예산 자동 바인딩)
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearRecommendation}
                className="text-[10px] font-bold underline cursor-pointer text-text-secondary hover:text-accent"
              >
                연동 해제
              </button>
            </div>
          )}

          {/* Form Fields Header */}
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">
              PARTNERSHIP APPLICATION
            </span>
            <h3 className="font-display text-2xl font-bold text-ink">
              {t.title}
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Core Fields Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Store Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="store-name" className="text-xs font-bold text-text-secondary">
                {t.fields.storeName}
              </label>
              <input
                id="store-name"
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="예: K-Beauty Mart NJ"
                className="h-12 px-4 bg-[#0c0d14] border border-border text-ink rounded-pill text-sm focus:outline-none focus:border-accent"
              />
            </div>

            {/* Owner Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="owner-name" className="text-xs font-bold text-text-secondary">
                {t.fields.ownerName}
              </label>
              <input
                id="owner-name"
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="예: John Doe"
                className="h-12 px-4 bg-[#0c0d14] border border-border text-ink rounded-pill text-sm focus:outline-none focus:border-accent"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold text-text-secondary">
                {t.fields.email}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@example.com"
                className="h-12 px-4 bg-[#0c0d14] border border-border text-ink rounded-pill text-sm focus:outline-none focus:border-accent"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-xs font-bold text-text-secondary">
                {t.fields.phone}
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="123-456-7890"
                className="h-12 px-4 bg-[#0c0d14] border border-border text-ink rounded-pill text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Store Address */}
          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-xs font-bold text-text-secondary">
              {t.fields.address}
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="예: 123 Main St, Fort Lee, NJ 07024"
              className="h-12 px-4 bg-[#0c0d14] border border-border text-ink rounded-pill text-sm focus:outline-none focus:border-accent"
            />
          </div>

          {/* Selector Fields Row */}
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Store Type Dropdown */}
            <div className="flex flex-col gap-2">
              <label htmlFor="store-type" className="text-xs font-bold text-text-secondary">
                {t.fields.storeType}
              </label>
              <select
                id="store-type"
                value={storeType}
                onChange={(e) => setStoreType(e.target.value)}
                className="h-12 px-4 bg-[#0c0d14] border border-border text-ink rounded-pill text-sm focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="independent">{t.fields.independent}</option>
                <option value="chain">{t.fields.chain}</option>
                <option value="pharmacy">{t.fields.pharmacy}</option>
                <option value="other">{t.fields.other}</option>
              </select>
            </div>

            {/* Desired Module Dropdown */}
            <div className="flex flex-col gap-2">
              <label htmlFor="desired-space" className="text-xs font-bold text-text-secondary">
                {t.fields.spaceSize}
              </label>
              <select
                id="desired-space"
                value={desiredSpace}
                onChange={(e) => setDesiredSpace(e.target.value)}
                className="h-12 px-4 bg-[#0c0d14] border border-border text-ink rounded-pill text-sm focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="4ft">{t.fields.ft4}</option>
                <option value="8ft">{t.fields.ft8}</option>
                <option value="12ft">{t.fields.ft12}</option>
              </select>
            </div>
          </div>

          {/* Comments Textarea */}
          <div className="flex flex-col gap-2">
            <label htmlFor="comments" className="text-xs font-bold text-text-secondary">
              {t.fields.comments}
            </label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="매장 상권 현황이나 도입 희망 시점 등에 대해 메모를 남겨주세요."
              rows={4}
              className="p-4 bg-[#0c0d14] border border-border text-ink rounded-card text-sm focus:outline-none focus:border-accent resize-none"
            />
          </div>

          {/* Partnership Operating Guidelines Checkbox (COMPLIANCE) */}
          <div className="flex items-start gap-3 bg-[#0c0d14] border border-border p-4 rounded-card">
            <input
              id="agreed-standards"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent cursor-pointer accent-accent"
            />
            <label
              htmlFor="agreed-standards"
              className="text-xs text-text-secondary leading-relaxed cursor-pointer select-none"
            >
              {ts.agreeLabel}
            </label>
          </div>

          {/* Error Message Box */}
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold px-4 py-3 rounded-card">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Disclaimer text */}
          <p className="text-[10px] text-text-muted leading-relaxed">
            ※ 입점 신청서 제출 즉시 Letusto Inc. 미국 본사 상권 데이터베이스와 매핑 검토를 거쳐 등록된 이메일/전화번호로 맞춤 리포트 제안서가 전송됩니다. 상권 보호 DB 조건에 일치하지 않는 경우 승인이 제한될 수 있습니다.
          </p>

          {/* Submit Button (DISABLED until agreed box checked) */}
          <button
            type="submit"
            disabled={!agreed}
            className={`w-full h-14 font-bold rounded-pill text-sm transition-all text-white ${
              agreed
                ? "bg-accent hover:bg-accent-hover cursor-pointer"
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
