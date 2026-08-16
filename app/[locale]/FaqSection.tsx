"use client";

import React, { useState, useEffect } from "react";

interface FAQItem {
  qKo: string;
  qEn: string;
  aKo: string;
  aEn: string;
}

interface CategoryConfig {
  id: string;
  titleKo: string;
  titleEn: string;
  questions: FAQItem[];
}

const FAQ_DATA: CategoryConfig[] = [
  {
    id: "program-partnership",
    titleKo: "01 프로그램 & 파트너십",
    titleEn: "01 PROGRAM & PARTNERSHIP",
    questions: [
      {
        qKo: "K SELECT HUB는 일반 도매 프로그램과 무엇이 다른가요?",
        qEn: "How is K SELECT HUB different from regular wholesale vendors?",
        aKo: "K SELECT HUB는 단순히 상품을 공급하는 도매 프로그램이 아닙니다. 매장과 고객 특성을 분석해 상품을 큐레이션하고, 전용 디스플레이, 상품 교육, 재고 관리, 판매 데이터 분석과 지속적인 상품 최적화까지 함께 운영하는 K-Beauty Retail Growth Program입니다.",
        aEn: "K SELECT HUB is not just a wholesale supplier. We are a dynamic Category Management program. We analyze your local customer profile, customize backlit LED displays, train your staff, handle replenishment, and swap slow-moving SKUs based on actual store sales."
      },
      {
        qKo: "어떤 매장이 참여할 수 있나요?",
        qEn: "What stores are eligible to join?",
        aKo: "미국 내 Independent Beauty Supply Store를 주요 대상으로 합니다. 매장 규모보다 K-Beauty 전용 공간을 운영하고, 상품 교육과 재고 관리 등 프로그램 운영 기준에 함께 참여할 의지가 있는지가 더 중요합니다.",
        aEn: "We focus on U.S. independent beauty supply stores. Store size matters less than a commitment to operate a dedicated space, participate in staff training, and sync inventory weekly."
      },
      {
        qKo: "K-Beauty 판매 경험이 없어도 참여할 수 있나요?",
        qEn: "Can I apply if I have zero experience selling K-Beauty?",
        aKo: "네. K-Beauty 경험이 많지 않아도 참여할 수 있습니다. 매장 규모, 고객 특성, 기존 판매 패턴 등을 검토해 적합한 상품 구성과 디스플레이 프로그램을 함께 제안합니다.",
        aEn: "Yes. Many of our partners are launching beauty categories for the first time. We evaluate your store space and demographics to recommend the ideal display format and product assortment."
      },
      {
        qKo: "파트너 신청을 하면 바로 계약이 진행되나요?",
        qEn: "Does applying automatically commit me to a contract?",
        aKo: "아닙니다. 신청 후 Store Review와 프로그램 적합성 검토를 진행하고, 매장과 충분히 협의한 뒤 최종 프로그램과 진행 조건을 결정합니다.",
        aEn: "No. The application is a request for a free Store Review. Our team will review your demographics, consult with you, and design a custom plan before any agreement is signed."
      },
      {
        qKo: "프로그램 신청 자체에 비용이 있나요?",
        qEn: "Is there an application fee to join the program?",
        aKo: "파트너십 신청과 초기 검토에는 별도의 신청비가 없습니다. 실제 프로그램 진행 시 필요한 상품 주문 금액과 조건은 추천되는 Display Program과 상품 구성에 따라 안내됩니다.",
        aEn: "No, applying and receiving a store demographic audit is 100% free. Upfront costs are limited to the opening inventory order, which varies depending on your selected display size."
      }
    ]
  },
  {
    id: "display-storefit",
    titleKo: "02 디스플레이 & 매장 구성",
    titleEn: "02 DISPLAY & STORE FIT",
    questions: [
      {
        qKo: "어떤 크기의 디스플레이 프로그램이 있나요?",
        qEn: "What display sizes are available?",
        aKo: "매장 조건에 따라 START 4FT, GROW 8FT, EXPAND 12FT의 세 가지 모듈형 프로그램을 운영합니다. 매장 규모뿐 아니라 고객 구성, K-Beauty 판매 가능성, 공간과 운영 계획을 함께 고려해 적합한 프로그램을 추천합니다.",
        aEn: "We offer three modular formats: START 4FT, GROW 8FT, and EXPAND 12FT. We recommend the format that fits your available space and launch goals."
      },
      {
        qKo: "우리 매장에 적합한 디스플레이 크기는 어떻게 결정하나요?",
        qEn: "How do we choose the right display size for our store?",
        aKo: "단순히 매장 면적만으로 결정하지 않습니다. 매장 규모, 고객 특성, 기존 상품 구성, 판매 회전, 투자 계획 등을 종합적으로 검토합니다. Growth Simulator를 통해 먼저 추천 결과를 확인할 수도 있으며, 최종 프로그램은 Store Review 후 확정합니다.",
        aEn: "We look at foot traffic, shopper demographics, existing category footprints, and initial purchase budgets. You can generate a recommendation via our Growth Simulator, which we will confirm during the Store Review."
      },
      {
        qKo: "K SELECT HUB 전용 공간을 따로 만들어야 하나요?",
        qEn: "Do I need to dedicate a separate space for K SELECT HUB?",
        aKo: "네. 프로그램의 효과를 높이기 위해 지정된 K-Beauty Display Section은 K SELECT HUB가 큐레이션한 상품을 중심으로 운영해야 합니다. 다른 상품이 섞이면 카테고리의 일관성과 판매 분석 정확도가 떨어질 수 있기 때문입니다.",
        aEn: "Yes. To ensure maximum visual impact and clean sell-through data, the modular LED fixtures must display only K SELECT approved inventory. Mixing other products degrades shelf-talker consistency."
      },
      {
        qKo: "디스플레이 Fixture는 무료인가요?",
        qEn: "Are the LED display fixtures free?",
        aKo: "Launch Partner에게만 전용 Display Fixture를 무상 대여합니다. 별도의 정해진 대여 기간은 없으며, K SELECT HUB 프로그램에 정상적으로 참여하는 동안 사용할 수 있습니다. 일반 파트너의 Fixture 조건은 별도로 안내됩니다.",
        aEn: "Yes, we lease our custom backlit LED display fixtures completely rent-free to our launch partners for as long as they remain active in the K SELECT platform."
      },
      {
        qKo: "매출이 성장하면 더 큰 디스플레이로 확장할 수 있나요?",
        qEn: "Can I upgrade to a larger display size later?",
        aKo: "네. 판매 성과와 매장 공간을 검토하여 START 4FT → GROW 8FT → EXPAND 12FT로 단계적으로 확장할 수 있습니다.",
        aEn: "Yes. As category sales grow, we will review your space and help you transition seamlessly from a 4FT starter module to an 8FT or 12FT setup."
      }
    ]
  },
  {
    id: "product-curation",
    titleKo: "03 상품 큐레이션 & AP",
    titleEn: "03 PRODUCT CURATION",
    questions: [
      {
        qKo: "어떤 상품이 K SELECT HUB에 선정되나요?",
        qEn: "What brands and products are curated?",
        aKo: "모든 K-Beauty 상품을 취급하지 않습니다. 상품 경쟁력, 가격, 리테일 마진, 미국 시장 적합성, 카테고리 역할과 실제 판매 가능성을 검토한 상품 Pool을 기반으로 매장별 상품을 구성합니다.",
        aEn: "We do not supply every K-Beauty brand. We vet skincare and haircare SKUs based on safety, brand prestige, retail margin protection, and U.S. demand, offering only the top essentials."
      },
      {
        qKo: "모든 매장에 동일한 상품이 들어가나요?",
        qEn: "Does every retail store receive the exact same product mix?",
        aKo: "아닙니다. 매장의 고객층, 가격대, 카테고리 수요와 운영 성향이 다르기 때문에 매장별로 적합한 상품 Mix를 구성합니다.",
        aEn: "No. Product mix is tailored. We adjust the skincare-to-haircare ratios, brand tiers, and price points based on your specific local shopper demographic."
      },
      {
        qKo: "Assortment Profile(AP)이 무엇인가요?",
        qEn: "What is an Assortment Profile (AP)?",
        aKo: "Assortment Profile(AP)은 매장의 특성과 고객 수요에 맞춰 상품 구성의 방향을 정하는 큐레이션 유형입니다. 현재 기본 유형은: BALANCE — 균형형, SKIN — 스킨케어 강화형, HAIR — 헤어케어 강화형, ESSENTIAL — 필수·회전 중심형, TREND — 트렌드 중심형, PREMIUM — 프리미엄 중심형이 있습니다. Growth Simulator와 Store Review 결과를 토대로 적합한 AP를 추천합니다.",
        aEn: "An AP is your customized inventory profile. Types include: BALANCE (all-rounder), SKIN (skincare heavy), HAIR (haircare heavy), ESSENTIAL (high-turn staples), TREND (viral items), and PREMIUM (luxury products). We select your AP based on your demographic audit."
      },
      {
        qKo: "제가 원하는 상품을 직접 선택할 수도 있나요?",
        qEn: "Can I choose specific products myself?",
        aKo: "매장 오너의 기존 판매 경험과 고객 요청은 중요한 정보로 반영합니다. 다만 전체 카테고리 균형, 가격대, 마진과 판매 가능성을 함께 검토해 최종 구성을 협의합니다.",
        aEn: "Yes, owner input is valuable. We combine your hands-on store experience with our sell-through data to agree on the final opening order."
      },
      {
        qKo: "상품 구성은 한 번 정하면 계속 동일한가요?",
        qEn: "Is the inventory mix permanent once selected?",
        aKo: "아닙니다. 판매 데이터, 재고 회전, 고객 반응, 신규 제품과 시장 트렌드를 지속적으로 검토해 필요할 경우 상품 Mix와 SKU를 조정합니다.",
        aEn: "No. We monitor weekly sales data and periodically swap underperforming items, introducing fresh bestsellers and seasonal products."
      }
    ]
  },
  {
    id: "pricing-benefits",
    titleKo: "04 가격 · 결제 · 런칭 혜택",
    titleEn: "04 PRICING & BENEFITS",
    questions: [
      {
        qKo: "초기 상품 투자금은 어느 정도인가요?",
        qEn: "What is the typical upfront investment?",
        aKo: "추천되는 Display Program과 Assortment에 따라 달라집니다. Growth Simulator를 통해 예상 상품 투자 범위를 먼저 확인할 수 있으며, 최종 금액은 Store Review와 상품 구성 확정 후 안내합니다.",
        aEn: "Upfront cost is strictly tied to the opening inventory order. The simulator provides a starting estimate based on 4FT, 8FT, or 12FT configurations."
      },
      {
        qKo: "리테일러의 예상 마진은 어느 정도인가요?",
        qEn: "What profit margins can retailers expect?",
        aKo: "상품별로 차이는 있지만 기본적으로 약 45~55% 수준의 Retail Margin을 목표로 상품을 구성합니다. 실제 마진은 상품과 판매 가격에 따라 달라질 수 있습니다.",
        aEn: "We protect our retailers' profits. Our curated product mixes maintain a 45% to 60% gross retail margin."
      },
      {
        qKo: "45-Day Payment Terms는 누구에게 제공되나요?",
        qEn: "Who is eligible for the 45-Day Payment Terms?",
        aKo: "Launch Partner의 첫 주문에 한해 최대 45일 결제 조건을 제공합니다. 일반 파트너에게 자동 적용되는 조건은 아닙니다.",
        aEn: "This cash flow incentive is reserved exclusively for the first order of verified early launch partners."
      },
      {
        qKo: "초기 배송비는 무료인가요?",
        qEn: "Is shipping free?",
        aKo: "네. Launch Partner의 첫 주문 배송비는 전액 지원합니다. 현재 거리나 주문 금액에 따른 별도의 제한 없이 지원합니다.",
        aEn: "Yes, we pay 100% of the shipping and freight costs for the initial delivery of both displays and products to early launch partners."
      },
      {
        qKo: "Launch Partner에게는 어떤 추가 혜택이 있나요?",
        qEn: "What other benefits do early launch partners receive?",
        aKo: "Launch Partner에게는 전용 Display Fixture 무상 대여, First Order 45-Day Payment Terms, Free Initial Order Delivery, 우선적인 Territory Protection 협의, Display Setup Support, Priority Product Access, Personalized Launch Support 등의 초기 우대 혜택을 제공합니다.",
        aEn: "Launch partners secure rent-free LED fixtures, 45-day billing, free shipping, territory protection exclusivity, display setup assistance, and priority allocations of hot product runs."
      }
    ]
  },
  {
    id: "inventory-exchange",
    titleKo: "05 재고 · 90일 교환",
    titleEn: "05 INVENTORY & EXCHANGE",
    questions: [
      {
        qKo: "90-Day Exchange Credit이 무엇인가요?",
        qEn: "What is the 90-Day Exchange Credit?",
        aKo: "상품 자체는 좋아도 지역과 고객 특성에 따라 판매 속도가 달라질 수 있습니다. K SELECT HUB는 초기 판매 데이터를 확인하여 일정 조건에 해당하는 부진 SKU를 더 적합한 상품으로 교환할 수 있도록 지원합니다.",
        aEn: "To eliminate dead stock risk, we allow partners to swap slow-moving products for faster-moving bestsellers within the first 90 days of launching."
      },
      {
        qKo: "어떤 상품이 Exchange Credit 대상이 되나요?",
        qEn: "Which products qualify for a swap credit?",
        aKo: "런칭 후 90일 이내의 실제 판매 데이터를 기준으로 Sell-through가 50% 미만인 SKU가 검토 대상이 됩니다.",
        aEn: "Any SKU that records a sell-through rate under 50% during the initial 90-day evaluation window is eligible for swap credits."
      },
      {
        qKo: "남은 상품은 모두 반품할 수 있나요?",
        qEn: "Can I return unsold products for a cash refund?",
        aKo: "아닙니다. 90-Day Exchange Credit은 일반 반품이나 현금 환불 프로그램이 아닙니다. 조건에 해당하는 부진 SKU를 분석한 뒤 더 적합한 상품으로 교환하는 프로그램입니다.",
        aEn: "No. The program is designed to optimize product mix, not process cash refunds. We exchange slow items for more suitable items to keep your inventory fresh."
      },
      {
        qKo: "Exchange Credit을 이용하기 위한 운영 조건이 있나요?",
        qEn: "Are there requirements to keep the exchange program active?",
        aKo: "네. 다음 운영 기준을 지켜야 합니다. \n\n01 지정 Display Section에는 K SELECT HUB가 승인한 상품을 운영할 것\n02 필수 Product Learning을 이수할 것\n03 최소 주 1회 재고 정보를 업데이트할 것\n\n이 기준이 정상적으로 운영되어야 정확한 판매 데이터를 확보하고 90-Day Exchange Credit을 적용할 수 있습니다.",
        aEn: "Yes. To maintain eligibility, stores must: (1) Use the rent-free displays exclusively for approved K SELECT products, (2) Complete basic staff product learning guides, and (3) Sync inventory levels weekly."
      },
      {
        qKo: "90일이 지난 후에도 Exchange를 신청할 수 있나요?",
        qEn: "Can I request product swaps after 90 days?",
        aKo: "원칙적으로 90-Day Exchange Credit은 런칭 후 90일 이내의 판매 성과를 기준으로 운영합니다. 해당 기간 내 판매 데이터와 재고 상태를 기준으로 검토해야 합니다.",
        aEn: "The 90-day risk protection is designed to optimize your opening mix. Regular restocking and optimization continue post-90 days, but the automatic swap guarantee applies to the initial window."
      }
    ]
  },
  {
    id: "operations-growth",
    titleKo: "06 운영 · 교육 · 성장 지원",
    titleEn: "06 OPERATIONS & GROWTH",
    questions: [
      {
        qKo: "상품을 받은 이후에도 K SELECT HUB가 지원하나요?",
        qEn: "What ongoing support does K SELECT HUB provide?",
        aKo: "네. K SELECT HUB의 역할은 상품을 납품하는 것으로 끝나지 않습니다. 판매와 재고 데이터를 바탕으로 Reorder, Slow Seller, 상품 Mix와 카테고리 성장 상태를 지속적으로 확인하고 최적화를 지원합니다.",
        aEn: "We remain your category partner. We analyze your POS trends to suggest reorders, flag slow items, update planograms, and deliver staff sales tips."
      },
      {
        qKo: "Product Learning은 선택 사항인가요?",
        qEn: "Is staff product training mandatory?",
        aKo: "아닙니다. Product Learning은 프로그램 운영을 위한 필수 과정입니다. 상품의 특징, 사용 방법과 고객에게 설명해야 할 핵심 내용을 오너 또는 담당 직원이 이해해야 실제 판매 가능성을 높일 수 있기 때문입니다. K SELECT HUB는 온라인 교육과 QR 기반 Product Guide를 제공합니다.",
        aEn: "Yes. Educated staff sell more products. We require a brief review of our skin concern matches to ensure your team can comfortably consult beauty buyers."
      },
      {
        qKo: "재고는 얼마나 자주 업데이트해야 하나요?",
        qEn: "How often must I sync inventory?",
        aKo: "최소 주 1회 K SELECT HUB 플랫폼에 재고 정보를 업데이트해야 합니다. 정확한 재고 정보는 Reorder 추천, Slow Seller 분석, 상품 재큐레이션과 90-Day Exchange Credit 운영의 중요한 기준이 됩니다.",
        aEn: "At least once a week. Keeping stock counts updated ensures our ordering system works and handles slow seller swaps properly."
      },
      {
        qKo: "재주문은 자동으로 진행되나요?",
        qEn: "Are reorders automatically shipped and billed?",
        aKo: "판매 및 재고 데이터를 바탕으로 필요한 Reorder를 확인하고 추천하는 운영 시스템을 제공합니다. 실제 주문은 매장의 재고 상황과 필요 수량을 확인하여 진행합니다.",
        aEn: "No. We recommend order quantities based on your sales velocity, but nothing is billed or shipped without your approval."
      },
      {
        qKo: "Territory Protection은 어떻게 결정되나요?",
        qEn: "How do you determine territory exclusivity?",
        aKo: "Territory Protection은 단순히 일정 마일 반경으로 일괄 적용하지 않습니다. 같은 지역이라도 상권, 고객 유동, 경쟁 매장 구조와 실제 시장 조건이 다르기 때문에 Launch Partner와 사전에 상권을 검토하여 적절한 보호 범위를 개별 협의합니다. 먼저 함께 시장을 구축한 Launch Partner의 영업권을 존중하는 것이 기본 원칙입니다.",
        aEn: "We review local store density, shopper foot traffic, and competitors individually to set a protected radius that guards your store's sales."
      }
    ]
  }
];

interface FaqSectionProps {
  locale: string;
}

export default function FaqSection({ locale }: FaqSectionProps) {
  const isKo = locale === "ko";
  const [activeCategory, setActiveCategory] = useState<string>("program-partnership");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  // Reset accordion state to open the first item whenever category switches
  useEffect(() => {
    setIsFading(true);
    const timer = setTimeout(() => {
      setOpenIndex(0);
      setIsFading(false);
    }, 150); // Matches transition duration
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const activeData = FAQ_DATA.find((c) => c.id === activeCategory) || FAQ_DATA[0];

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="bg-[#0c0c0c] border-y border-[#2a2a2a] py-[100px] sm:py-[120px] text-left font-medium">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-[64px]">
        
        {/* Title Header */}
        <div className="flex flex-col gap-2 mb-12 text-center sm:text-left select-none">
          <span className="text-xs sm:text-[13px] font-black text-[#ff2b75] tracking-[0.2em] uppercase font-display">
            FAQ
          </span>
          <h2 className="font-display text-[26px] sm:text-[36px] font-bold leading-tight text-white tracking-tight m-0">
            {isKo ? "자주 묻는 질문" : "Frequently Asked Questions"}
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#9ca3af] leading-relaxed font-medium m-0 mt-1">
            {isKo 
              ? "K SELECT HUB 프로그램 도입 및 운영에 관한 리테일러의 주요 궁금증을 해결해 드립니다."
              : "Clear answers to common questions about K SELECT HUB integration and operations."
            }
          </p>
        </div>

        {/* --- MOBILE LAYOUT: Upper horizontal tabs, lower accordion --- */}
        <div className="block lg:hidden">
          {/* Horizontal Scroll Tabs */}
          <div className="flex gap-2.5 overflow-x-auto pb-4 mb-6 scrollbar-none select-none scroll-smooth">
            {FAQ_DATA.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`h-11 px-5 rounded-[8px] border text-xs font-black tracking-wide whitespace-nowrap transition-all duration-300 focus:outline-none cursor-pointer ${
                    isActive
                      ? "bg-[#ff2b75]/8 border-[#ff2b75] text-[#ff2b75]"
                      : "bg-[#121214] border-white/5 text-[#7A7A7A] hover:border-white/10 hover:text-white"
                  }`}
                >
                  {isKo ? cat.titleKo : cat.titleEn}
                  <span className={`ml-2 text-[10px] font-extrabold ${isActive ? "text-[#ff2b75]" : "text-[#7A7A7A]/70"}`}>
                    5
                  </span>
                </button>
              );
            })}
          </div>

          {/* Accordion List for active category */}
          <div className={`flex flex-col gap-3 transition-opacity duration-150 ${isFading ? "opacity-0" : "opacity-100"}`}>
            {activeData.questions.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border rounded-[16px] overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-[#ff2b75]/30 bg-[#121214]" : "border-white/5 bg-[#121214]/40"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-[13.5px] font-bold text-white pr-4 leading-snug">
                      {isKo ? item.qKo : item.qEn}
                    </span>
                    <span className={`text-[15px] font-black shrink-0 transition-transform duration-200 ${isOpen ? "text-[#ff2b75] rotate-180" : "text-[#7A7A7A]"}`}>
                      ▼
                    </span>
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[300px] border-t border-white/5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="px-5 py-4.5 text-[12.5px] text-[#ADADAD] leading-relaxed font-semibold m-0 whitespace-pre-line">
                      {isKo ? item.aKo : item.aEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- DESKTOP LAYOUT: Left sidebar menu, right accordion list --- */}
        <div className="hidden lg:grid grid-cols-[0.32fr_0.68fr] gap-12 items-stretch mt-4">
          
          {/* Left Category Buttons Menu */}
          <div className="flex flex-col gap-3 select-none">
            {FAQ_DATA.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full h-14 px-6 rounded-[12px] border text-left text-[13px] font-extrabold tracking-wide uppercase transition-all duration-300 focus:outline-none cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? "bg-[#ff2b75]/8 border-[#ff2b75] text-[#ff2b75] shadow-sm"
                      : "bg-[#121214]/50 border-white/5 text-[#7A7A7A] hover:border-white/10 hover:text-white"
                  }`}
                >
                  <span>{isKo ? cat.titleKo : cat.titleEn}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[4px] border ${
                    isActive 
                      ? "bg-[#ff2b75]/10 border-[#ff2b75]/25 text-[#ff2b75]" 
                      : "bg-white/5 border-white/5 text-[#7A7A7A] group-hover:border-white/10 group-hover:text-white"
                  }`}>
                    5
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Accordion List */}
          <div className={`flex flex-col gap-4 transition-opacity duration-150 ${isFading ? "opacity-0" : "opacity-100"}`}>
            {activeData.questions.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border rounded-[18px] overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-[#ff2b75]/35 bg-[#121214]" : "border-white/5 bg-[#121214]/40"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-7 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-[14.5px] font-bold text-white pr-4 leading-snug">
                      {isKo ? item.qKo : item.qEn}
                    </span>
                    <span className={`text-[13px] font-black shrink-0 transition-transform duration-200 ${isOpen ? "text-[#ff2b75] rotate-180" : "text-[#7A7A7A]"}`}>
                      ▼
                    </span>
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[350px] border-t border-white/5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="px-7 py-5 text-[13px] text-[#ADADAD] leading-relaxed font-semibold m-0 whitespace-pre-line">
                      {isKo ? item.aKo : item.aEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
