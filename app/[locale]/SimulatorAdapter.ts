import { QUESTIONS } from "./SimulatorQuestions";

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
    recommended_products?: any[];
  };
  financial: {
    turnover: number;
    annual_sales: number;
    gross_margin: number;
    gross_profit: number;
    initial_product_investment: number;
    payback_months: number;
    budget_fit: "HIGH" | "MEDIUM" | "LOW" | "VERY LOW";
  };
  confidence: {
    level: "BASIC" | "GOOD" | "HIGH";
    accuracy_percentage: number;
  };
}

export function convertLabelsToOptionIds(
  answers: Record<string, any>,
  visibleQuestionIds?: string[]
): Record<string, any> {
  const converted: Record<string, any> = {};

  QUESTIONS.forEach(q => {
    if (visibleQuestionIds && !visibleQuestionIds.includes(q.id)) {
      return; // Skip hidden/stale question answers
    }

    const rawVal = answers[q.id];
    if (rawVal === undefined || rawVal === null) return;

    if (q.multi_select) {
      const values = Array.isArray(rawVal) ? rawVal : [rawVal];
      const convertedArr = values.map(val => {
        const choice = q.answers.find(a => a.label_ko === val || a.label_en === val || a.id === val);
        return choice ? choice.id : val;
      });
      converted[q.id] = convertedArr;
    } else {
      const choice = q.answers.find(a => a.label_ko === rawVal || a.label_en === rawVal || a.id === rawVal);
      converted[q.id] = choice ? choice.id : rawVal;
    }
  });

  return converted;
}

export async function fetchSimulation(
  answersPayload: Record<string, any>,
  email?: string
): Promise<SimulationResult> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_SIMULATOR_API_BASE_URL || "https://kselectnetwork-portal.vercel.app";

  const res = await fetch(`${apiBaseUrl}/api/simulator/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ answers: answersPayload, email })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Failed to fetch simulation results");
  }

  return res.json();
}

export async function registerEmailForSimulation(
  simulationId: string,
  email: string
): Promise<{ success: boolean; simulation_id: string }> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_SIMULATOR_API_BASE_URL || "https://kselectnetwork-portal.vercel.app";

  const res = await fetch(`${apiBaseUrl}/api/simulator/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ simulation_id: simulationId, email })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Failed to register email");
  }

  return res.json();
}
