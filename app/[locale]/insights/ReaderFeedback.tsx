"use client";

import React, { useState, useEffect } from "react";

interface ReaderFeedbackProps {
  articleId: string;
  locale?: string;
  channel?: "HUB" | "NETWORK";
}

export default function ReaderFeedback({
  articleId,
  locale = "en",
  channel = "HUB"
}: ReaderFeedbackProps) {
  const isKo = locale === "ko";
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [feedbackChoice, setFeedbackChoice] = useState<"HELPFUL" | "NOT_HELPFUL" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && articleId) {
      const savedChoice = sessionStorage.getItem(`hub_feedback_${articleId}`);
      if (savedChoice === "HELPFUL" || savedChoice === "NOT_HELPFUL") {
        setFeedbackChoice(savedChoice as "HELPFUL" | "NOT_HELPFUL");
        setSubmitted(true);
      }
    }
  }, [articleId]);

  const handleFeedback = async (choice: "HELPFUL" | "NOT_HELPFUL") => {
    if (submitted || isSubmitting) return;

    setIsSubmitting(true);
    setFeedbackChoice(choice);

    try {
      const portalUrl =
        process.env.NEXT_PUBLIC_PORTAL_URL ||
        (process.env.NODE_ENV === "production"
          ? "https://kselectnetwork-portal.vercel.app"
          : "http://localhost:3010");

      const res = await fetch(`${portalUrl}/api/insights/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          article_id: articleId,
          channel: "HUB",
          feedback: choice
        })
      });

      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem(`hub_feedback_${articleId}`, choice);
        }
      } else {
        // Fallback set submitted state to ensure seamless single-click UX
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Reader feedback submit error:", err);
      // Optimistic UI completion
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full my-10 p-6 sm:p-7 rounded-[20px] bg-[#121214] border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 select-none">
      <div className="flex flex-col gap-1 text-left">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]" />
          <h4 className="font-display font-bold text-sm sm:text-[15px] text-white tracking-tight">
            {isKo ? "이 인사이트가 도움이 되었나요?" : "Was this insight helpful?"}
          </h4>
        </div>
        <p className="text-[12px] sm:text-[12.5px] text-white/50 font-medium leading-relaxed mt-0.5">
          {isKo
            ? "독자 피드백은 K SELECT Insights 연구 데스크의 콘텐츠 품질 향상에 직접 활용됩니다."
            : "Your feedback directly helps our research team refine retail intelligence for store operators."}
        </p>
      </div>

      {submitted ? (
        <div className="animate-fade-in inline-flex items-center gap-2 bg-[#ff2b75]/10 border border-[#ff2b75]/30 text-white px-4 py-2.5 rounded-[12px] text-xs font-bold shrink-0">
          <span className="text-[#ff2b75] font-black">✓</span>
          <span>
            {isKo
              ? "피드백이 전달되었습니다. 감사합니다!"
              : "Thank you for your feedback!"}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={() => handleFeedback("HELPFUL")}
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial h-11 px-5 rounded-[12px] bg-[#ff2b75]/10 hover:bg-[#ff2b75] border border-[#ff2b75]/30 hover:border-[#ff2b75] text-white font-bold text-xs sm:text-[13px] tracking-wide inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <span>👍</span>
            <span>{isKo ? "도움이 됨" : "Helpful"}</span>
          </button>
          <button
            onClick={() => handleFeedback("NOT_HELPFUL")}
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial h-11 px-5 rounded-[12px] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-bold text-xs sm:text-[13px] tracking-wide inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <span>👎</span>
            <span>{isKo ? "아쉬움" : "Not Helpful"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
