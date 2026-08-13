export interface SimulationResult {
  simulation_id: string;
  display: {
    program: "START" | "GROW" | "EXPAND";
    width_ft: number;
    sku_count: number;
    initial_units: number;
    investment: number;
    reasons: string[];
  };
  assortment: {
    primary: "BALANCE" | "SKIN" | "HAIR" | "ESSENTIAL" | "TREND" | "PREMIUM";
    secondary: "BALANCE" | "SKIN" | "HAIR" | "ESSENTIAL" | "TREND" | "PREMIUM";
    primary_description_ko: string;
    secondary_description_ko: string;
    category_mix: { category: string; percentage: number; color: string }[];
  };
  financial: {
    turnover: number;
    annual_sales: number;
    gross_margin: number;
    gross_profit: number;
    initial_product_investment: number;
    payback_months: number;
  };
  confidence: {
    level: "BASIC" | "GOOD" | "HIGH";
    accuracy_percentage: number;
  };
}

export function simulateGrowth(answers: Record<string, any>): SimulationResult {
  // Generate random simulation ID
  const simId = "SIM-" + Math.floor(10000 + Math.random() * 90000);

  // 1. Determine Display Program based on Q2 (space) and Q22 (budget)
  let program: "START" | "GROW" | "EXPAND" = "GROW";
  const spacePref = answers["Q2"] || "";
  const budgetPref = answers["Q22"] || "";

  if (spacePref.includes("4FT") || budgetPref.includes("$2,000") || budgetPref.includes("$4,000")) {
    program = "START";
  } else if (spacePref.includes("12FT") || budgetPref.includes("$10,000")) {
    program = "EXPAND";
  }

  // Display Specs mapping
  let width_ft = 8;
  let sku_count = 48;
  let initial_units = 560;
  let investment = 6800;

  if (program === "START") {
    width_ft = 4;
    sku_count = 24;
    initial_units = 300;
    investment = 3500;
  } else if (program === "EXPAND") {
    width_ft = 12;
    sku_count = 72;
    initial_units = 840;
    investment = 10500;
  }

  // 2. Recommend Reasons based on input answers
  const reasons: string[] = [];
  
  // Custom reason mapping based on space capability
  if (answers["Q1"] && !answers["Q1"].includes("잘 모르겠습니다")) {
    reasons.push(`귀하가 입력하신 매장 크기(${answers["Q1"]})에 안정적으로 안착될 수 있는 최적의 모듈형 규격입니다.`);
  } else {
    reasons.push("매장 내 동선 효율과 동종 유통점 평균 스페이스 대비 마진 수율이 가장 우수한 모듈 크기입니다.");
  }

  // Reason based on K-Beauty customer inquiries
  if (answers["Q10"] && (answers["Q10"].includes("자주") || answers["Q10"].includes("가끔"))) {
    reasons.push("매장 방문 고객들의 K-Beauty 브랜드 문의 빈도가 감지되어, 적극적인 시각 노출이 가능한 볼륨을 채택했습니다.");
  }

  // Reason based on investment preference
  if (answers["Q23"]) {
    reasons.push(`초기 상품 구성 및 성장 목표로 선택하신 \'${answers["Q23"]}\' 방향성과 높은 시너지 배치가 가능합니다.`);
  }

  // 3. Recommended Product Strategy (Assortment Profile)
  let primaryAP: "BALANCE" | "SKIN" | "HAIR" | "ESSENTIAL" | "TREND" | "PREMIUM" = "BALANCE";
  let secondaryAP: "BALANCE" | "SKIN" | "HAIR" | "ESSENTIAL" | "TREND" | "PREMIUM" = "ESSENTIAL";

  const topCats = answers["Q5"] || [];
  const soughtCats = answers["Q9"] || [];
  const importantValue = answers["Q12"] || [];
  const sensitivity = answers["Q13"] || "";

  // Primary AP mapping logic
  if (topCats.includes("스킨케어") || soughtCats.includes("스킨케어")) {
    primaryAP = "SKIN";
  } else if (topCats.includes("헤어 케미컬 / 헤어케어") || soughtCats.includes("헤어케어")) {
    primaryAP = "HAIR";
  } else if (importantValue.includes("가격 / 가성비") || sensitivity.includes("가격이 매우 중요")) {
    primaryAP = "ESSENTIAL";
  }

  // Secondary AP mapping logic
  if (importantValue.includes("트렌드 / 소셜미디어") || answers["Q14"]?.includes("매우 적극적")) {
    secondaryAP = "TREND";
  } else if (importantValue.includes("프리미엄 품질") || sensitivity.includes("프리미엄 가격")) {
    secondaryAP = "PREMIUM";
  } else {
    secondaryAP = primaryAP === "SKIN" ? "TREND" : "BALANCE";
  }

  if ((primaryAP as string) === (secondaryAP as string)) {
    secondaryAP = primaryAP === "SKIN" ? "TREND" : "ESSENTIAL";
  }

  // Friendly descriptions mapping
  const apDescriptions = {
    BALANCE: "균형 잡힌 스탠다드 믹스",
    SKIN: "스킨케어 집중 솔루션 구성",
    HAIR: "헤어케어 전문 특화 구성",
    ESSENTIAL: "데일리 필수 상품 및 가성비 보강",
    TREND: "트렌디 소셜 히트 아이템 매칭",
    PREMIUM: "고기능성 프리미엄 솔루션 구성"
  };

  // Category mix percentages
  let category_mix = [
    { category: "스킨케어 (Skincare)", percentage: 40, color: "#ff2b75" },
    { category: "헤어 케어 (Hair Care)", percentage: 20, color: "#4f46e5" },
    { category: "메이크업 (Makeup)", percentage: 20, color: "#10b981" },
    { category: "바디 케어 (Body Care)", percentage: 10, color: "#f59e0b" },
    { category: "뷰티 툴 (Beauty Tools)", percentage: 10, color: "#8b5cf6" }
  ];

  if (primaryAP === "SKIN") {
    category_mix = [
      { category: "스킨케어 (Skincare)", percentage: 65, color: "#ff2b75" },
      { category: "헤어 케어 (Hair Care)", percentage: 10, color: "#4f46e5" },
      { category: "메이크업 (Makeup)", percentage: 10, color: "#10b981" },
      { category: "바디 케어 (Body Care)", percentage: 10, color: "#f59e0b" },
      { category: "뷰티 툴 (Beauty Tools)", percentage: 5, color: "#8b5cf6" }
    ];
  } else if (primaryAP === "HAIR") {
    category_mix = [
      { category: "스킨케어 (Skincare)", percentage: 20, color: "#ff2b75" },
      { category: "헤어 케어 (Hair Care)", percentage: 60, color: "#4f46e5" },
      { category: "메이크업 (Makeup)", percentage: 10, color: "#10b981" },
      { category: "바디 케어 (Body Care)", percentage: 5, color: "#f59e0b" },
      { category: "뷰티 툴 (Beauty Tools)", percentage: 5, color: "#8b5cf6" }
    ];
  } else if (primaryAP === "ESSENTIAL") {
    category_mix = [
      { category: "스킨케어 (Skincare)", percentage: 40, color: "#ff2b75" },
      { category: "헤어 케어 (Hair Care)", percentage: 15, color: "#4f46e5" },
      { category: "메이크업 (Makeup)", percentage: 15, color: "#10b981" },
      { category: "바디 케어 (Body Care)", percentage: 20, color: "#f59e0b" },
      { category: "뷰티 툴 (Beauty Tools)", percentage: 10, color: "#8b5cf6" }
    ];
  }

  // 4. Financial Calculations based on inputs
  // Estimated Turnover calculation based on Q35 and Q18
  let baseTurnover = 5.5;
  const velocity = answers["Q35"] || "";
  if (velocity.includes("1–3 개")) baseTurnover = 2.8;
  else if (velocity.includes("4–6 개")) baseTurnover = 4.2;
  else if (velocity.includes("7–12 개")) baseTurnover = 6.0;
  else if (velocity.includes("13–18 개")) baseTurnover = 7.4;
  else if (velocity.includes("19–24 개")) baseTurnover = 8.5;
  else if (velocity.includes("25 개 이상")) baseTurnover = 9.8;

  // Add filters based on store traffic or competitive signals
  if (answers["Q10"]?.includes("자주")) baseTurnover += 0.8;
  if (answers["Q28"]?.includes("큰 K-Beauty Selection")) baseTurnover -= 0.5;

  const turnover = parseFloat(baseTurnover.toFixed(1));

  // Wholesale Cost (Initial Cost) is investment
  // Gross Margin is fixed at 50%
  const gross_margin = 0.50; 
  
  // Projections:
  // COGS = investment * turnover
  const cogs = investment * turnover;
  // Retail Sales = COGS / (1 - margin) = 2 * COGS
  const annual_sales = Math.round(cogs / (1 - gross_margin));
  // Profit = Retail Sales - COGS = COGS
  const gross_profit = annual_sales - cogs;

  // Simple payback estimation
  const payback_months = Math.ceil((investment / (gross_profit / 12)) || 3);

  // 5. Confidence Score assessment
  // Check how many precision/optional questions are answered (Q6, Q22, Q30, Q31, Q32, Q33)
  const precisionIds = ["Q6", "Q22", "Q30", "Q31", "Q32", "Q33"];
  let answeredPrecisionCount = 0;
  precisionIds.forEach(pid => {
    if (answers[pid] && !answers[pid].includes("잘 모르겠") && !answers[pid].includes("답변하지 않")) {
      answeredPrecisionCount++;
    }
  });

  let level: "BASIC" | "GOOD" | "HIGH" = "BASIC";
  let accuracy_percentage = 65;
  if (answeredPrecisionCount >= 4) {
    level = "HIGH";
    accuracy_percentage = 95 - Math.floor(Math.random() * 5); // 90-95%
  } else if (answeredPrecisionCount >= 2) {
    level = "GOOD";
    accuracy_percentage = 80 - Math.floor(Math.random() * 6); // 74-80%
  } else {
    accuracy_percentage = 65 - Math.floor(Math.random() * 8); // 57-65%
  }

  return {
    simulation_id: simId,
    display: {
      program,
      width_ft,
      sku_count,
      initial_units,
      investment,
      reasons
    },
    assortment: {
      primary: primaryAP,
      secondary: secondaryAP,
      primary_description_ko: apDescriptions[primaryAP],
      secondary_description_ko: apDescriptions[secondaryAP],
      category_mix
    },
    financial: {
      turnover,
      annual_sales,
      gross_margin,
      gross_profit,
      initial_product_investment: investment,
      payback_months
    },
    confidence: {
      level,
      accuracy_percentage
    }
  };
}
