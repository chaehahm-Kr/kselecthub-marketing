import React from "react";
import Simulator from "../Simulator";
import PartnerModal from "../PartnerModal";
import Header from "../Header";
import Footer from "../Footer";

interface PageProps {
  params: Promise<{ locale?: string }>;
}

export default async function SimulatorPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale === "ko" ? "ko" : "en";

  return (
    <div className="min-h-screen flex flex-col font-body bg-[#141414] text-white overflow-x-hidden selection:bg-[#ff2b75] selection:text-white">
      
      {/* 0. NAV (Header) */}
      <Header locale={locale} />

      {/* Main Container */}
      <main className="flex-1">
        {/* GROWTH SIMULATOR PAGE SECTION */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-16 text-left">
          <Simulator locale={locale} />
        </section>

        {/* Apply Form Popup Modal */}
        <PartnerModal locale={locale} />
      </main>

      {/* 13. Footer */}
      <Footer locale={locale} />

    </div>
  );
}
