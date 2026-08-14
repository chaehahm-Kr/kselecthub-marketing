"use client";

import React, { useState, useEffect } from "react";
import { ko } from "../locales/ko";

export default function CtaForm() {
  const t = ko.ctaForm;

  // Form Field States (only core items kept, address splits included)
  const [storeName, setStoreName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [comments, setComments] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Hidden/Default inputs for legacy API compatibility
  const storeType = "independent";
  const [desiredSpace, setDesiredSpace] = useState("8ft");

  // Integration with Simulator Results
  const [recommendedConfig, setRecommendedConfig] = useState<string | null>(null);
  const [simulatedInvestment, setSimulatedInvestment] = useState<string | null>(null);
  const [simulationId, setSimulationId] = useState<string | null>(null);
  
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check storage and custom event listeners for simulator connection
  useEffect(() => {
    const savedConfig = localStorage.getItem("kselect_recommended_config");
    const savedInvestment = localStorage.getItem("kselect_simulator_investment");
    const savedId = localStorage.getItem("kselect_simulator_id");
    if (savedConfig) {
      setRecommendedConfig(savedConfig);
    }
    if (savedInvestment) {
      setSimulatedInvestment(savedInvestment);
    }
    if (savedId) {
      setSimulationId(savedId);
    }

    const handleRecommendEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setRecommendedConfig(customEvent.detail.configName);
        setSimulatedInvestment(customEvent.detail.investment.toString());
        setDesiredSpace(customEvent.detail.space);
        if (customEvent.detail.simulationId) {
          setSimulationId(customEvent.detail.simulationId);
        }
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
    setSimulationId(null);
    localStorage.removeItem("kselect_recommended_config");
    localStorage.removeItem("kselect_simulator_investment");
    localStorage.removeItem("kselect_simulator_id");
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
    if (!city.trim()) {
      setErrorMsg(t.validation.cityRequired);
      return;
    }
    if (!stateVal.trim()) {
      setErrorMsg(t.validation.stateRequired);
      return;
    }
    if (!zipCode.trim()) {
      setErrorMsg(t.validation.zipRequired);
      return;
    }
    if (!agreed) {
      setErrorMsg(t.validation.agreeRequired);
      return;
    }

    // Combine granular addresses for backward-compatible unified string
    const fullAddress = `${address.trim()}, ${city.trim()}, ${stateVal.trim()} ${zipCode.trim()}`;

    // Submit payload structure simulation
    const payload = {
      storeName,
      ownerName,
      email,
      phone,
      address: fullAddress,
      city: city.trim(),
      state: stateVal.trim(),
      zipCode: zipCode.trim(),
      storeType,
      desiredSpace,
      comments,
      recommendedConfig: recommendedConfig || "None",
      simulatedInvestment: simulatedInvestment || "None",
      simulationId: simulationId || undefined,
      agreedToStandards: agreed,
      submittedAt: new Date().toISOString(),
    };

    console.log("Submitting Retailer Partnership Application:", payload);
    setSubmitted(true);

    // Clear local storage integration
    localStorage.removeItem("kselect_recommended_config");
    localStorage.removeItem("kselect_simulator_investment");
    localStorage.removeItem("kselect_simulator_id");
  };

  return (
    <div id="apply" className="w-full max-w-3xl mx-auto">
      {submitted ? (
        <div className="bg-[#0c0c0c] border border-[#ff2b75]/20 p-8 sm:p-10 rounded-[20px] text-center max-w-lg mx-auto flex flex-col items-center gap-3">
          <span className="text-4xl select-none">🎉</span>
          <h3 className="font-display text-xl font-bold text-white leading-normal">
            파트너십 신청이 완료되었습니다.
          </h3>
          <p className="text-[13px] text-[#9ca3af] leading-relaxed">
            제출해주신 정보를 검토한 후 K SELECT HUB 팀이 연락드리겠습니다.
          </p>
          <div className="w-full h-px bg-white/5 my-2" />
          <p className="text-[11.5px] text-[#7A7A7A] leading-relaxed">
            Your partnership application has been received.<br />
            Our K SELECT HUB team will review your information and contact you regarding the next step.
          </p>
           {recommendedConfig && (
            <div className="bg-[#ff2b75]/10 border border-[#ff2b75]/20 px-4 py-2 rounded-[6px] text-xs font-semibold text-[#ff2b75] mt-2 select-none">
              신청 모듈 구성: {recommendedConfig} (약 ${Number(simulatedInvestment).toLocaleString()} 상품 구매 규모)
            </div>
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-[#0c0c0c] border border-white/10 p-6 sm:p-8 rounded-[20px] text-left flex flex-col gap-5.5"
        >
          {/* Active Simulator Recommendation Banner */}
          {recommendedConfig && (
            <div className="bg-[#ff2b75]/5 border border-[#ff2b75]/25 px-4.5 py-3.5 rounded-[12px] text-xs text-[#ff2b75] flex justify-between items-center gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold">🖥️ 시뮬레이터 연동 적용됨</span>
                <span className="opacity-90 text-[#9ca3af]">
                  추천 구성: <strong className="text-white font-bold">{recommendedConfig}</strong> (초기 상품 구매액 약 ${Number(simulatedInvestment).toLocaleString()} 자동 바인딩)
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearRecommendation}
                className="text-[10px] font-bold underline cursor-pointer text-[#7A7A7A] hover:text-[#ff2b75]"
              >
                연동 해제
              </button>
            </div>
          )}

          {/* Form Fields Header */}
          <div>
            <span className="text-[10px] font-black text-[#ff2b75] tracking-widest uppercase font-display block mb-1.5 select-none">
              PARTNERSHIP APPLICATION
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-white m-0 tracking-tight select-none">
              {t.title}
            </h3>
            <p className="text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Core Fields Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Store Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="store-name" className="text-xs font-bold text-[#9ca3af]">
                {t.fields.storeName}
              </label>
              <input
                id="store-name"
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="예: K-Beauty Mart NJ"
                className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors"
              />
            </div>

            {/* Owner Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="owner-name" className="text-xs font-bold text-[#9ca3af]">
                {t.fields.ownerName}
              </label>
              <input
                id="owner-name"
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="예: John Doe"
                className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold text-[#9ca3af]">
                {t.fields.email}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@example.com"
                className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-xs font-bold text-[#9ca3af]">
                {t.fields.phone}
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="123-456-7890"
                className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors"
              />
            </div>
          </div>

          {/* Store Address Block - Split into Street Address, City, State, and Zip Code */}
          <div className="flex flex-col gap-3.5">
            {/* Street Address */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="address" className="text-xs font-bold text-[#9ca3af]">
                {t.fields.address}
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="예: 123 Main St"
                className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors"
              />
            </div>

            {/* City, State, Zip Code (3 Columns Grid) */}
            <div className="grid grid-cols-3 gap-3.5">
              {/* City */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="city" className="text-xs font-bold text-[#9ca3af]">
                  {t.fields.city}
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="예: Fort Lee"
                  className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors"
                />
              </div>

              {/* State */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="state-val" className="text-xs font-bold text-[#9ca3af]">
                  {t.fields.state}
                </label>
                <input
                  id="state-val"
                  type="text"
                  value={stateVal}
                  onChange={(e) => setStateVal(e.target.value)}
                  placeholder="예: NJ"
                  className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors"
                />
              </div>

              {/* Zip Code */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="zip-code" className="text-xs font-bold text-[#9ca3af]">
                  {t.fields.zipCode}
                </label>
                <input
                  id="zip-code"
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="예: 07024"
                  className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Comments Textarea */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="comments" className="text-xs font-bold text-[#9ca3af]">
              {t.fields.comments}
            </label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="궁금한 점이나 미리 알려주실 내용이 있다면 남겨주세요."
              rows={3}
              className="p-3.5 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] resize-none transition-colors"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3 bg-[#070708] border border-white/10 p-4 rounded-[12px]">
            <input
              id="agreed-standards"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4.5 w-4.5 rounded border-white/10 text-[#ff2b75] focus:ring-[#ff2b75] cursor-pointer accent-[#ff2b75]"
            />
            <label
              htmlFor="agreed-standards"
              className="text-[11.5px] text-[#9ca3af] leading-relaxed cursor-pointer select-none flex flex-col gap-0.5"
            >
              <span className="font-bold text-white/90">
                파트너십 신청 검토와 후속 상담을 위해 제출한 매장 정보 및 연락처를 K SELECT HUB가 수집·이용하고 연락하는 것에 동의합니다. *
              </span>
              <span className="text-[10px] text-[#7A7A7A] font-semibold">
                I agree that K SELECT HUB may collect and use the submitted store and contact information for partnership review and follow-up communication.
              </span>
            </label>
          </div>

          {/* Error Message Box */}
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold px-4 py-2.5 rounded-[8px] select-none">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!agreed}
            className={`w-full h-14 font-extrabold rounded-[8px] text-[14.5px] tracking-wide transition-all ${
              agreed
                ? "bg-[#ff2b75] hover:bg-[#e01a5e] text-white hover:shadow-[0_4px_20px_rgba(255,43,117,0.35)] cursor-pointer"
                : "bg-white/5 border border-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            {t.button}
          </button>
        </form>
      )}
    </div>
  );
}
