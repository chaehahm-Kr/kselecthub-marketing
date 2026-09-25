"use client";

import React, { useState, useEffect } from "react";
import { getDictionary } from "../locales/getDictionary";

export default function CtaForm({ locale }: { locale?: string }) {
  const activeLocale = locale === "ko" ? "ko" : "en";
  const t = getDictionary(activeLocale).ctaForm;
  const isKo = activeLocale === "ko";

  // Form Field States
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [comments, setComments] = useState("");
  const [agreed, setAgreed] = useState(false);

  // Integration with Simulator Results
  const [recommendedConfig, setRecommendedConfig] = useState<string | null>(null);
  const [simulatedInvestment, setSimulatedInvestment] = useState<string | null>(null);
  const [simulationId, setSimulationId] = useState<string | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmedAppNumber, setConfirmedAppNumber] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Form validations
    if (!companyName.trim()) {
      setErrorMsg(t.validation.storeRequired);
      return;
    }
    if (!contactName.trim()) {
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
    if (!streetAddress.trim()) {
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

    // Retrieve saved readiness checklist answers from localStorage
    let savedReadiness: any[] = [];
    try {
      const rawReadiness = localStorage.getItem("kselect_readiness_answers");
      if (rawReadiness) {
        savedReadiness = JSON.parse(rawReadiness);
      }
    } catch (readinessErr) {
      console.warn("Error reading readiness answers:", readinessErr);
    }

    const payload = {
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      streetAddress: streetAddress.trim(),
      city: city.trim(),
      state: stateVal.trim(),
      zipCode: zipCode.trim(),
      comments: comments.trim(),
      recommendedConfig: recommendedConfig || "None",
      simulatedInvestment: simulatedInvestment || "None",
      simulationId: simulationId || undefined,
      readinessAnswers: savedReadiness,
    };

    setIsSubmitting(true);
    try {
      const apiBase =
        process.env.NEXT_PUBLIC_KSELECT_API_URL ||
        process.env.NEXT_PUBLIC_PORTAL_API_URL ||
        "https://admin.kselectnetwork.com";

      const response = await fetch(`${apiBase}/api/retailer-applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.ok && (resData.success || resData.ok)) {
        setConfirmedAppNumber(resData.applicationNumber || null);
        setSubmitted(true);

        // Clear local storage integrations upon confirmed success
        localStorage.removeItem("kselect_recommended_config");
        localStorage.removeItem("kselect_simulator_investment");
        localStorage.removeItem("kselect_simulator_id");
        localStorage.removeItem("kselect_readiness_answers");
      } else {
        setSubmitted(false);
        setErrorMsg(
          resData.error ||
            (isKo
              ? "신청서 제출에 실패했습니다. 다시 시도해 주세요."
              : "We couldn't submit your application. Please try again.")
        );
      }
    } catch (networkErr) {
      console.error("Retailer application submission network error:", networkErr);
      setSubmitted(false);
      setErrorMsg(
        isKo
          ? "서버 연결에 실패했습니다. 인터넷 연결을 확인 후 다시 시도해 주세요."
          : "We couldn't submit your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="apply" className="w-full max-w-3xl mx-auto font-medium">
      {submitted ? (
        <div className="bg-[#0c0c0c] border border-[#ff2b75]/20 p-8 sm:p-10 rounded-[20px] text-center max-w-lg mx-auto flex flex-col items-center gap-3">
          <span className="text-4xl select-none">🎉</span>
          <h3 className="font-display text-xl font-bold text-white leading-normal">
            {isKo ? "파트너십 신청이 완료되었습니다." : "Partnership Application Received!"}
          </h3>
          <p className="text-[13px] text-[#9ca3af] leading-relaxed">
            {isKo
              ? "제출해주신 회사 정보를 검토한 후 K SELECT HUB 온보딩 팀이 연락드리겠습니다."
              : "Our K SELECT HUB onboarding team will review your application and contact you soon."}
          </p>
          {confirmedAppNumber && (
            <div className="bg-[#ff2b75]/10 border border-[#ff2b75]/30 px-4 py-2 rounded-[8px] text-xs font-mono font-bold text-[#ff2b75] mt-1 select-all">
              {isKo ? `신청 번호: ${confirmedAppNumber}` : `Application No: ${confirmedAppNumber}`}
            </div>
          )}
          {recommendedConfig && (
            <>
              <div className="w-full h-px bg-white/5 my-2" />
              <div className="bg-[#ff2b75]/10 border border-[#ff2b75]/20 px-4 py-2 rounded-[6px] text-xs font-semibold text-[#ff2b75] mt-2 select-none">
                {isKo
                  ? `신청 모듈 구성: ${recommendedConfig} (약 $${Number(simulatedInvestment).toLocaleString()} 상품 구매 규모)`
                  : `Bound Configuration: ${recommendedConfig} (Approx. $${Number(simulatedInvestment).toLocaleString()} opening order)`}
              </div>
            </>
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
                <span className="font-bold">
                  {isKo ? "🖥️ 시뮬레이터 연동 적용됨" : "🖥️ Simulator Results Connected"}
                </span>
                <span className="opacity-90 text-[#9ca3af]">
                  {isKo
                    ? `추천 구성: ${recommendedConfig} (초기 상품 구매액 약 $${Number(simulatedInvestment).toLocaleString()} 자동 바인딩)`
                    : `Recommended Config: ${recommendedConfig} (Initial Inventory Order: $${Number(simulatedInvestment).toLocaleString()} auto-bound)`}
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearRecommendation}
                className="text-[10px] font-bold underline cursor-pointer text-[#7A7A7A] hover:text-[#ff2b75]"
              >
                {isKo ? "연동 해제" : "Disconnect"}
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
            {/* Company Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="company-name" className="text-xs font-bold text-[#9ca3af]">
                {t.fields.storeName}
              </label>
              <input
                id="company-name"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={isKo ? "예: 뷰티월드 (Beauty World LLC)" : "e.g. Beauty World LLC"}
                className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors font-semibold"
              />
            </div>

            {/* Owner / Contact Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="owner-name" className="text-xs font-bold text-[#9ca3af]">
                {t.fields.ownerName}
              </label>
              <input
                id="owner-name"
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder={isKo ? "예: 홍길동 (John Doe)" : "e.g. John Doe"}
                className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors font-semibold"
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
                className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors font-semibold"
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
                className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors font-semibold"
              />
            </div>
          </div>

          {/* Business / Street Address Block */}
          <div className="flex flex-col gap-3.5">
            {/* Street Address */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="address" className="text-xs font-bold text-[#9ca3af]">
                {t.fields.address}
              </label>
              <input
                id="address"
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder={isKo ? "예: 123 Main St" : "e.g. 123 Main St"}
                className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors font-semibold"
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
                  placeholder={isKo ? "예: Fort Lee" : "e.g. Fort Lee"}
                  className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors font-semibold"
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
                  placeholder={isKo ? "예: NJ" : "e.g. NJ"}
                  className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors font-semibold"
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
                  placeholder={isKo ? "예: 07024" : "e.g. 07024"}
                  className="h-11 px-4 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] transition-colors font-semibold"
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
              placeholder={
                isKo
                  ? "궁금한 점이나 미리 알려주실 내용이 있다면 남겨주세요."
                  : "Let us know if you have any questions or custom requests."
              }
              rows={3}
              className="p-3.5 bg-[#070708] border border-white/10 text-white rounded-[8px] text-sm focus:outline-none focus:border-[#ff2b75] resize-none transition-colors font-semibold"
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
                {isKo
                  ? "파트너십 신청 검토와 후속 상담을 위해 제출한 회사 정보 및 연락처를 K SELECT HUB가 수집·이용하고 연락하는 것에 동의합니다. *"
                  : "I agree that K SELECT HUB may collect and use the submitted company and contact details for partnership review and follow-up communication. *"}
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
            disabled={!agreed || isSubmitting}
            className={`w-full h-14 font-extrabold rounded-[8px] text-[14.5px] tracking-wide transition-all ${
              agreed && !isSubmitting
                ? "bg-[#ff2b75] hover:bg-[#e01a5e] text-white hover:shadow-[0_4px_20px_rgba(255,43,117,0.35)] cursor-pointer"
                : "bg-white/5 border border-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            {isSubmitting
              ? isKo
                ? "신청서 제출 중..."
                : "Submitting Application..."
              : t.button}
          </button>
        </form>
      )}
    </div>
  );
}
