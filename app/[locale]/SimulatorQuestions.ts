export interface AnswerChoice {
  id: string;
  label_ko: string;
  label_en: string;
}

export interface QuestionConfig {
  id: string;
  section: "store_space" | "customer_demand" | "product_price" | "inventory_reorder" | "investment_growth";
  importance: "A" | "B" | "C";
  type: "choice_card" | "range_card" | "tag_chip" | "visual_card";
  is_optional: boolean;
  multi_select: boolean;
  max_select?: number;
  label_ko: string;
  label_en: string;
  helper_ko?: string;
  helper_en?: string;
  answers: AnswerChoice[];
  conditional_trigger?: {
    question_id: string;
    values: string[];
  };
}

export const QUESTIONS: QuestionConfig[] = [
  // ================= STEP 1: 매장 기본 정보 =================
  {
    id: "Q1",
    section: "store_space",
    importance: "B",
    type: "range_card",
    is_optional: false,
    multi_select: false,
    label_ko: "매장의 전체 크기는 어느 정도입니까?",
    label_en: "What is the total size of your store?",
    answers: [
      { id: "Q1_A1", label_ko: "1,500 sq.ft. 미만", label_en: "Under 1,500 sq.ft." },
      { id: "Q1_A2", label_ko: "1,500–3,000 sq.ft.", label_en: "1,500–3,000 sq.ft." },
      { id: "Q1_A3", label_ko: "3,000–5,000 sq.ft.", label_en: "3,000–5,000 sq.ft." },
      { id: "Q1_A4", label_ko: "5,000–8,000 sq.ft.", label_en: "5,000–8,000 sq.ft." },
      { id: "Q1_A5", label_ko: "8,000 sq.ft. 이상", label_en: "8,000 sq.ft. or more" },
      { id: "Q1_A6", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q2",
    section: "store_space",
    importance: "A",
    type: "visual_card",
    is_optional: false,
    multi_select: false,
    label_ko: "K-Beauty를 위해 어느 정도의 공간을 사용할 수 있습니까?",
    label_en: "How much space can you allocate for K-Beauty?",
    answers: [
      { id: "Q2_A1", label_ko: "약 4FT", label_en: "Approx. 4FT" },
      { id: "Q2_A2", label_ko: "약 8FT", label_en: "Approx. 8FT" },
      { id: "Q2_A3", label_ko: "약 12FT", label_en: "Approx. 12FT" },
      { id: "Q2_A4", label_ko: "12FT 이상", label_en: "12FT or more" },
      { id: "Q2_A5", label_ko: "공간은 있지만 어느 정도 사용할지 모르겠습니다", label_en: "Space is available, but unsure of exact size" },
      { id: "Q2_A6", label_ko: "K SELECT 가 적정 크기를 추천해 주세요", label_en: "Let K SELECT recommend the size" }
    ]
  },
  {
    id: "Q3",
    section: "store_space",
    importance: "A",
    type: "choice_card",
    is_optional: false,
    multi_select: false,
    label_ko: "현재 K-Beauty를 어느 정도 판매하고 있습니까?",
    label_en: "To what extent do you currently sell K-Beauty?",
    answers: [
      { id: "Q3_A1", label_ko: "현재 거의 판매하지 않거나 전혀 판매하지 않습니다", label_en: "Almost none / Do not sell" },
      { id: "Q3_A2", label_ko: "몇 개의 K-Beauty 제품을 판매합니다", label_en: "A few select products only" },
      { id: "Q3_A3", label_ko: "한 선반 또는 작은 K-Beauty 구역이 있습니다", label_en: "One shelf or small zone" },
      { id: "Q3_A4", label_ko: "별도의 K-Beauty Section이 있습니다", label_en: "Dedicated section" },
      { id: "Q3_A5", label_ko: "K-Beauty가 이미 중요한 카테고리입니다", label_en: "Important core category" },
      { id: "Q3_A6", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q4",
    section: "store_space",
    importance: "C",
    type: "choice_card",
    is_optional: true,
    multi_select: false,
    label_ko: "현재 별도의 K-Beauty Display 또는 Section이 있습니까?",
    label_en: "Do you currently have a dedicated K-Beauty display or section?",
    answers: [
      { id: "Q4_A1", label_ko: "없습니다", label_en: "None" },
      { id: "Q4_A2", label_ko: "작은 선반 또는 Counter 구역", label_en: "Small shelf / Counter area" },
      { id: "Q4_A3", label_ko: "약 4FT", label_en: "Approx. 4FT" },
      { id: "Q4_A4", label_ko: "약 8FT", label_en: "Approx. 8FT" },
      { id: "Q4_A5", label_ko: "약 12FT 이상", label_en: "Approx. 12FT or more" },
      { id: "Q4_A6", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },

  // ================= STEP 2: 고객과 판매 특성 =================
  {
    id: "Q5",
    section: "customer_demand",
    importance: "A",
    type: "tag_chip",
    is_optional: false,
    multi_select: true,
    max_select: 3,
    label_ko: "현재 매장에서 매출이 가장 높은 카테고리 3개를 순서대로 선택해주세요.",
    label_en: "Please select the top 3 highest-revenue categories in your store in order.",
    answers: [
      { id: "Q5_A1", label_ko: "Hair Chemicals / Hair Care", label_en: "Hair Chemicals / Hair Care" },
      { id: "Q5_A2", label_ko: "Wigs / Hair Extensions", label_en: "Wigs / Hair Extensions" },
      { id: "Q5_A3", label_ko: "Cosmetics / Makeup", label_en: "Cosmetics / Makeup" },
      { id: "Q5_A4", label_ko: "Skincare", label_en: "Skincare" },
      { id: "Q5_A5", label_ko: "Nail", label_en: "Nail" },
      { id: "Q5_A6", label_ko: "Hair Accessories", label_en: "Hair Accessories" },
      { id: "Q5_A7", label_ko: "Beauty Tools", label_en: "Beauty Tools" },
      { id: "Q5_A8", label_ko: "Body / Personal Care", label_en: "Body / Personal Care" },
      { id: "Q5_A9", label_ko: "Bags / Fashion Accessories", label_en: "Bags / Fashion Accessories" },
      { id: "Q5_A10", label_ko: "General Merchandise", label_en: "General Merchandise" },
      { id: "Q5_A11", label_ko: "기타", label_en: "Other" },
      { id: "Q5_A12", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q6",
    section: "customer_demand",
    importance: "B",
    type: "range_card",
    is_optional: true,
    multi_select: false,
    label_ko: "현재 매장의 월간 총매출은 대략 어느 정도입니까?",
    label_en: "What is your approximate monthly total sales volume?",
    helper_ko: "매장 규모를 파악하고 지나치게 큰 Display를 추천하지 않기 위해 사용됩니다.",
    helper_en: "Used to determine store size compatibility and prevent oversized recommendations.",
    answers: [
      { id: "Q6_A1", label_ko: "$30,000 미만", label_en: "Under $30,000" },
      { id: "Q6_A2", label_ko: "$30,000–$60,000", label_en: "$30,000–$60,000" },
      { id: "Q6_A3", label_ko: "$60,000–$100,000", label_en: "$60,000–$100,000" },
      { id: "Q6_A4", label_ko: "$100,000–$150,000", label_en: "$100,000–$150,000" },
      { id: "Q6_A5", label_ko: "$150,000–$250,000", label_en: "$150,000–$250,000" },
      { id: "Q6_A6", label_ko: "$250,000 이상", label_en: "Over $250,000" },
      { id: "Q6_A7", label_ko: "잘 모르겠습니다", label_en: "I do not know" },
      { id: "Q6_A8", label_ko: "답변하지 않겠습니다", label_en: "Prefer not to say" }
    ]
  },
  {
    id: "Q7",
    section: "customer_demand",
    importance: "B",
    type: "choice_card",
    is_optional: false,
    multi_select: false,
    label_ko: "Beauty / Cosmetic 관련 제품이 전체 사업에서 차지하는 비중은 어느 정도입니까?",
    label_en: "What portion of your business consists of Beauty & Cosmetics?",
    answers: [
      { id: "Q7_A1", label_ko: "사업의 작은 부분입니다", label_en: "Minor portion" },
      { id: "Q7_A2", label_ko: "약 25%", label_en: "Approx. 25%" },
      { id: "Q7_A3", label_ko: "약 절반", label_en: "Approx. half" },
      { id: "Q7_A4", label_ko: "절반 이상", label_en: "More than half" },
      { id: "Q7_A5", label_ko: "사업의 대부분", label_en: "Major portion" },
      { id: "Q7_A6", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q8",
    section: "customer_demand",
    importance: "B",
    type: "tag_chip",
    is_optional: false,
    multi_select: true,
    label_ko: "주요 고객층을 선택해주세요.",
    label_en: "Who are your primary target customer segments?",
    answers: [
      { id: "Q8_A1", label_ko: "10 대 / Gen Z", label_en: "Teens / Gen Z" },
      { id: "Q8_A2", label_ko: "Young Adults", label_en: "Young Adults" },
      { id: "Q8_A3", label_ko: "Adults / Families", label_en: "Adults / Families" },
      { id: "Q8_A4", label_ko: "Mature Customers", label_en: "Mature Customers" },
      { id: "Q8_A5", label_ko: "Professional Stylists", label_en: "Professional Stylists" },
      { id: "Q8_A6", label_ko: "Beauty Enthusiasts", label_en: "Beauty Enthusiasts" },
      { id: "Q8_A7", label_ko: "Value Shoppers", label_en: "Value Shoppers" },
      { id: "Q8_A8", label_ko: "혼합 고객층", label_en: "Mixed Customer Base" },
      { id: "Q8_A9", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q9",
    section: "customer_demand",
    importance: "A",
    type: "tag_chip",
    is_optional: false,
    multi_select: true,
    max_select: 3,
    label_ko: "고객들이 가장 많이 찾는 Beauty 카테고리는 무엇입니까?",
    label_en: "Which beauty categories do your customers seek the most?",
    answers: [
      { id: "Q9_A1", label_ko: "Skincare", label_en: "Skincare" },
      { id: "Q9_A2", label_ko: "Hair Care", label_en: "Hair Care" },
      { id: "Q9_A3", label_ko: "Hair Styling", label_en: "Hair Styling" },
      { id: "Q9_A4", label_ko: "Masks & Patches", label_en: "Masks & Patches" },
      { id: "Q9_A5", label_ko: "Makeup", label_en: "Makeup" },
      { id: "Q9_A6", label_ko: "Nail", label_en: "Nail" },
      { id: "Q9_A7", label_ko: "Beauty Tools", label_en: "Beauty Tools" },
      { id: "Q9_A8", label_ko: "Body / Personal Care", label_en: "Body / Personal Care" },
      { id: "Q9_A9", label_ko: "Premium / Functional Products", label_en: "Premium / Functional Products" },
      { id: "Q9_A10", label_ko: "New / Trending Products", label_en: "New & Trending Products" },
      { id: "Q9_A11", label_ko: "뚜렷한 카테고리가 없습니다", label_en: "No clear category" },
      { id: "Q9_A12", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q10",
    section: "customer_demand",
    importance: "A",
    type: "choice_card",
    is_optional: false,
    multi_select: false,
    label_ko: "고객들이 K-Beauty 제품이나 한국 브랜드를 찾거나 물어보는 경우가 있습니까?",
    label_en: "Do customers ask for K-Beauty products or Korean brands?",
    answers: [
      { id: "Q10_A1", label_ko: "자주 있습니다", label_en: "Frequently" },
      { id: "Q10_A2", label_ko: "가끔 있습니다", label_en: "Sometimes" },
      { id: "Q10_A3", label_ko: "드물게 있습니다", label_en: "Rarely" },
      { id: "Q10_A4", label_ko: "거의 없습니다", label_en: "Almost never" },
      { id: "Q10_A5", label_ko: "전혀 없습니다", label_en: "Never" },
      { id: "Q10_A6", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q11",
    section: "customer_demand",
    importance: "B",
    type: "choice_card",
    is_optional: false,
    multi_select: false,
    label_ko: "최근 고객들의 K-Beauty 관심은 어떻게 변하고 있습니까?",
    label_en: "How has K-Beauty interest evolved recently among customers?",
    answers: [
      { id: "Q11_A1", label_ko: "빠르게 증가하고 있습니다", label_en: "Rapidly increasing" },
      { id: "Q11_A2", label_ko: "조금 증가하고 있습니다", label_en: "Slightly increasing" },
      { id: "Q11_A3", label_ko: "비슷한 수준입니다", label_en: "Staying similar" },
      { id: "Q11_A4", label_ko: "감소하고 있습니다", label_en: "Decreasing" },
      { id: "Q11_A5", label_ko: "특별히 관찰하지 못했습니다", label_en: "Not particularly noticed" },
      { id: "Q11_A6", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },

  // ================= STEP 3: 상품 및 가격 성향 =================
  {
    id: "Q12",
    section: "product_price",
    importance: "A",
    type: "tag_chip",
    is_optional: false,
    multi_select: true,
    max_select: 2,
    label_ko: "고객들이 Beauty 제품을 선택할 때 가장 중요하게 보는 것은 무엇입니까?",
    label_en: "What is the key criteria when customers choose beauty products?",
    answers: [
      { id: "Q12_A1", label_ko: "가격 / 가성비", label_en: "Price / Value" },
      { id: "Q12_A2", label_ko: "제품 효과 / 성능", label_en: "Product Efficacy / Results" },
      { id: "Q12_A3", label_ko: "성분", label_en: "Ingredients" },
      { id: "Q12_A4", label_ko: "브랜드", label_en: "Brand" },
      { id: "Q12_A5", label_ko: "트렌드 / 소셜미디어 인기", label_en: "Social Media / Trend Popularity" },
      { id: "Q12_A6", label_ko: "이해하기 쉬운 제품", label_en: "Easy to understand" },
      { id: "Q12_A7", label_ko: "프리미엄 품질", label_en: "Premium Quality" },
      { id: "Q12_A8", label_ko: "매장 직원 추천", label_en: "Staff Recommendation" },
      { id: "Q12_A9", label_ko: "고객마다 다릅니다", label_en: "Depends on customer" },
      { id: "Q12_A10", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q13",
    section: "product_price",
    importance: "A",
    type: "choice_card",
    is_optional: false,
    multi_select: false,
    label_ko: "고객들의 가격 민감도는 어느 정도입니까?",
    label_en: "How price sensitive are your customers?",
    answers: [
      { id: "Q13_A1", label_ko: "가격이 매우 중요합니다", label_en: "Very price sensitive" },
      { id: "Q13_A2", label_ko: "가격과 품질의 균형을 봅니다", label_en: "Price & quality balanced" },
      { id: "Q13_A3", label_ko: "가격보다 품질과 효과가 더 중요합니다", label_en: "Efficacy & quality preferred" },
      { id: "Q13_A4", label_ko: "프리미엄 가격도 받아들입니다", label_en: "Will accept premium price points" },
      { id: "Q13_A5", label_ko: "고객마다 다릅니다", label_en: "Depends on customer" },
      { id: "Q13_A6", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q14",
    section: "product_price",
    importance: "A",
    type: "choice_card",
    is_optional: false,
    multi_select: false,
    label_ko: "고객들은 새로운 브랜드나 새로운 제품을 얼마나 잘 시도합니까?",
    label_en: "How willing are customers to try new brands or products?",
    answers: [
      { id: "Q14_A1", label_ko: "매우 적극적으로 시도합니다", label_en: "Very active to try" },
      { id: "Q14_A2", label_ko: "비교적 잘 시도합니다", label_en: "Moderately willing" },
      { id: "Q14_A3", label_ko: "익숙하거나 검증된 제품을 선호합니다", label_en: "Prefer established brands" },
      { id: "Q14_A4", label_ko: "가격이 매력적이면 시도합니다", label_en: "Willing if price is attractive" },
      { id: "Q14_A5", label_ko: "고객마다 다릅니다", label_en: "Depends on customer" },
      { id: "Q14_A6", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q15",
    section: "product_price",
    importance: "A",
    type: "tag_chip",
    is_optional: false,
    multi_select: true,
    max_select: 2,
    label_ko: "고객들이 Beauty 제품을 구매하는 주요 이유는 무엇입니까?",
    label_en: "What is the main driver for purchasing beauty products?",
    answers: [
      { id: "Q15_A1", label_ko: "반복 구매 / Replenishment", label_en: "Restocking / Replenishment" },
      { id: "Q15_A2", label_ko: "특정 문제 해결", label_en: "Solving specific skin/hair problems" },
      { id: "Q15_A3", label_ko: "새로운 제품 발견", label_en: "Discovering new products" },
      { id: "Q15_A4", label_ko: "트렌드 / 소셜미디어", label_en: "Trends & Social Media hype" },
      { id: "Q15_A5", label_ko: "충동구매 / Add-on", label_en: "Impulse / Add-on purchase" },
      { id: "Q15_A6", label_ko: "신뢰하는 브랜드", label_en: "Brand loyalty & trust" },
      { id: "Q15_A7", label_ko: "매장 직원 추천", label_en: "Staff recommendation" },
      { id: "Q15_A8", label_ko: "선물 / 특별한 목적", label_en: "Gifts / Special events" },
      { id: "Q15_A9", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q16",
    section: "product_price",
    importance: "A",
    type: "range_card",
    is_optional: false,
    multi_select: false,
    label_ko: "Cosmetics / Skincare 에서 가장 잘 판매되는 Retail Price Range 는 어느 정도입니까?",
    label_en: "What is the best-selling retail price range for Cosmetics & Skincare?",
    answers: [
      { id: "Q16_A1", label_ko: "$10 미만", label_en: "Under $10" },
      { id: "Q16_A2", label_ko: "$10–$15", label_en: "$10–$15" },
      { id: "Q16_A3", label_ko: "$15–$20", label_en: "$15–$20" },
      { id: "Q16_A4", label_ko: "$20–$30", label_en: "$20–$30" },
      { id: "Q16_A5", label_ko: "$30–$45", label_en: "$30–$45" },
      { id: "Q16_A6", label_ko: "$45 이상", label_en: "$45 or more" },
      { id: "Q16_A7", label_ko: "제품에 따라 다양합니다", label_en: "Varies significantly by item" },
      { id: "Q16_A8", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q17",
    section: "product_price",
    importance: "B",
    type: "range_card",
    is_optional: false,
    multi_select: false,
    label_ko: "Hair / Chemical 제품에서 가장 잘 판매되는 Retail Price Range 는 어느 정도입니까?",
    label_en: "What is the best-selling retail price range for Hair & Chemical products?",
    answers: [
      { id: "Q17_A1", label_ko: "$10 미만", label_en: "Under $10" },
      { id: "Q17_A2", label_ko: "$10–$15", label_en: "$10–$15" },
      { id: "Q17_A3", label_ko: "$15–$20", label_en: "$15–$20" },
      { id: "Q17_A4", label_ko: "$20–$30", label_en: "$20–$30" },
      { id: "Q17_A5", label_ko: "$30 이상", label_en: "$30 or more" },
      { id: "Q17_A6", label_ko: "제품에 따라 다양합니다", label_en: "Varies significantly by item" },
      { id: "Q17_A7", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },

  // ================= STEP 4: 재고와 재주문 =================
  {
    id: "Q18",
    section: "inventory_reorder",
    importance: "A",
    type: "choice_card",
    is_optional: false,
    multi_select: false,
    label_ko: "잘 팔리는 Beauty 제품은 보통 얼마나 자주 재주문합니까?",
    label_en: "How frequently do you reorder top-selling beauty items?",
    answers: [
      { id: "Q18_A1", label_ko: "주 1 회 이상", label_en: "At least once a week" },
      { id: "Q18_A2", label_ko: "약 2 주마다", label_en: "Approx. every 2 weeks" },
      { id: "Q18_A3", label_ko: "매월", label_en: "Monthly" },
      { id: "Q18_A4", label_ko: "1–2 개월마다", label_en: "Every 1–2 months" },
      { id: "Q18_A5", label_ko: "그보다 드물게", label_en: "Less frequently" },
      { id: "Q18_A6", label_ko: "제품마다 많이 다릅니다", label_en: "Varies widely by product" },
      { id: "Q18_A7", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q19",
    section: "inventory_reorder",
    importance: "A",
    type: "range_card",
    is_optional: false,
    multi_select: false,
    label_ko: "새로운 Beauty 제품을 처음 도입할 때 SKU 당 보통 몇 개 정도 주문합니까?",
    label_en: "What is your typical initial order volume per SKU for new products?",
    answers: [
      { id: "Q19_A1", label_ko: "3–5 개", label_en: "3–5 units" },
      { id: "Q19_A2", label_ko: "6–11 개", label_en: "6–11 units" },
      { id: "Q19_A3", label_ko: "12–23 개", label_en: "12–23 units" },
      { id: "Q19_A4", label_ko: "24–35 개", label_en: "24–35 units" },
      { id: "Q19_A5", label_ko: "36 개 이상", label_en: "36 or more units" },
      { id: "Q19_A6", label_ko: "제품마다 다릅니다", label_en: "Varies by product" },
      { id: "Q19_A7", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q20",
    section: "inventory_reorder",
    importance: "B",
    type: "range_card",
    is_optional: false,
    multi_select: false,
    label_ko: "잘 팔리는 제품을 재주문할 때 SKU 당 보통 몇 개 정도 주문합니까?",
    label_en: "What is your typical reorder volume per SKU for top-selling items?",
    answers: [
      { id: "Q20_A1", label_ko: "6 개 이하", label_en: "6 units or less" },
      { id: "Q20_A2", label_ko: "약 12 개", label_en: "Approx. 12 units" },
      { id: "Q20_A3", label_ko: "약 24 개", label_en: "Approx. 24 units" },
      { id: "Q20_A4", label_ko: "36 개 이상", label_en: "36 or more units" },
      { id: "Q20_A5", label_ko: "Full Case 단위", label_en: "Full Case quantities" },
      { id: "Q20_A6", label_ko: "제품마다 다릅니다", label_en: "Varies by product" },
      { id: "Q20_A7", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q21",
    section: "inventory_reorder",
    importance: "C",
    type: "choice_card",
    is_optional: true,
    multi_select: false,
    label_ko: "잘 팔리는 Beauty 제품이 품절되는 경우는 어느 정도입니까?",
    label_en: "How often do you run out of stock on top-selling items?",
    answers: [
      { id: "Q21_A1", label_ko: "자주 있습니다", label_en: "Frequently" },
      { id: "Q21_A2", label_ko: "가끔 있습니다", label_en: "Sometimes" },
      { id: "Q21_A3", label_ko: "드뭅니다", label_en: "Rarely" },
      { id: "Q21_A4", label_ko: "거의 없습니다", label_en: "Almost never" },
      { id: "Q21_A5", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q35",
    section: "inventory_reorder",
    importance: "A",
    type: "range_card",
    is_optional: false,
    multi_select: false,
    label_ko: "잘 팔리는 Beauty 제품 한 SKU 는 보통 한 달에 몇 개 정도 판매됩니까?",
    label_en: "Typically, how many units of a top-selling SKU do you sell per month?",
    helper_ko: "예상 Inventory Turnover와 Annual Sales를 계산하는 데 사용됩니다.",
    helper_en: "Used directly to estimate inventory turnover speed and projected sales.",
    answers: [
      { id: "Q35_A1", label_ko: "1–3 개", label_en: "1–3 units" },
      { id: "Q35_A2", label_ko: "4–6 개", label_en: "4–6 units" },
      { id: "Q35_A3", label_ko: "7–12 개", label_en: "7–12 units" },
      { id: "Q35_A4", label_ko: "13–18 개", label_en: "13–18 units" },
      { id: "Q35_A5", label_ko: "19–24 개", label_en: "19–24 units" },
      { id: "Q35_A6", label_ko: "25 개 이상", label_en: "25 or more units" },
      { id: "Q35_A7", label_ko: "제품마다 매우 다릅니다", label_en: "Varies significantly by SKU" },
      { id: "Q35_A8", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q36",
    section: "inventory_reorder",
    importance: "A",
    type: "choice_card",
    is_optional: false,
    multi_select: false,
    label_ko: "잘 팔리는 제품은 보통 재고가 어느 정도 남았을 때 재주문합니까?",
    label_en: "At what remaining stock level do you typically trigger a reorder?",
    answers: [
      { id: "Q36_A1", label_ko: "약 절반이 남았을 때", label_en: "When approx. half is left" },
      { id: "Q36_A2", label_ko: "4–6 개 정도 남았을 때", label_en: "When 4–6 units are left" },
      { id: "Q36_A3", label_ko: "2–3 개 남았을 때", label_en: "When 2–3 units are left" },
      { id: "Q36_A4", label_ko: "1 개 정도 남았을 때", label_en: "When 1 unit is left" },
      { id: "Q36_A5", label_ko: "완전히 품절된 후", label_en: "Only after running completely out" },
      { id: "Q36_A6", label_ko: "제품마다 다릅니다", label_en: "Varies by product" },
      { id: "Q36_A7", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q37",
    section: "inventory_reorder",
    importance: "B",
    type: "choice_card",
    is_optional: false,
    multi_select: false,
    label_ko: "새로 도입한 Beauty 제품 중 약 60 일 이내에 두 번째 주문으로 이어지는 비율은 어느 정도입니까?",
    label_en: "What percentage of newly introduced beauty items lead to a reorder within 60 days?",
    answers: [
      { id: "Q37_A1", label_ko: "대부분의 제품", label_en: "Most of them" },
      { id: "Q37_A2", label_ko: "절반 이상", label_en: "More than half" },
      { id: "Q37_A3", label_ko: "약 절반", label_en: "Approx. half" },
      { id: "Q37_A4", label_ko: "절반 미만", label_en: "Less than half" },
      { id: "Q37_A5", label_ko: "아주 일부 제품", label_en: "Only a tiny fraction" },
      { id: "Q37_A6", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },

  // ================= STEP 5: 투자와 성장 목표 =================
  {
    id: "Q22",
    section: "investment_growth",
    importance: "A",
    type: "range_card",
    is_optional: false,
    multi_select: false,
    label_ko: "K-Beauty 를 시작하거나 확대할 때 편안하게 투자할 수 있는 초기 상품 예산은 어느 정도입니까?",
    label_en: "What is your comfortable initial product budget to launch or expand K-Beauty?",
    helper_ko: "추천 규모가 실제 투자 여력에 맞도록 조정하는 데 사용됩니다.",
    helper_en: "Used to scale recommended solutions to match actual store investment capacities.",
    answers: [
      { id: "Q22_A1", label_ko: "$2,000 미만", label_en: "Under $2,000" },
      { id: "Q22_A2", label_ko: "$2,000–$4,000", label_en: "$2,000–$4,000" },
      { id: "Q22_A3", label_ko: "$4,000–$6,000", label_en: "$4,000–$6,000" },
      { id: "Q22_A4", label_ko: "$6,000–$10,000", label_en: "$6,000–$10,000" },
      { id: "Q22_A5", label_ko: "$10,000 이상도 가능합니다", label_en: "$10,000 or more is available" },
      { id: "Q22_A6", label_ko: "먼저 추천안을 보고 싶습니다", label_en: "Show me the recommendation first" },
      { id: "Q22_A7", label_ko: "답변하지 않겠습니다", label_en: "Prefer not to answer" }
    ]
  },
  {
    id: "Q23",
    section: "investment_growth",
    importance: "A",
    type: "visual_card",
    is_optional: false,
    multi_select: false,
    label_ko: "K-Beauty 를 시작할 때 어떤 방식이 가장 편하십니까?",
    label_en: "Which initial setup methodology aligns best with your preference?",
    answers: [
      { id: "Q23_A1", label_ko: "작게 테스트하고 싶습니다", label_en: "Launch small to test" },
      { id: "Q23_A2", label_ko: "다양성은 확보하되 보수적으로 시작하고 싶습니다", label_en: "Broad variety, conservative inventory depth" },
      { id: "Q23_A3", label_ko: "균형 있게 시작하고 싶습니다", label_en: "Balanced layout (Recommended)" },
      { id: "Q23_A4", label_ko: "성장을 목표로 적극적으로 투자하고 싶습니다", label_en: "Aggressive investment for high-growth" },
      { id: "Q23_A5", label_ko: "처음부터 강한 카테고리로 만들고 싶습니다", label_en: "Dominant category presence from day one" },
      { id: "Q23_A6", label_ko: "K SELECT 가 추천해 주세요", label_en: "Let K SELECT make the recommendation" }
    ]
  },
  {
    id: "Q24",
    section: "investment_growth",
    importance: "B",
    type: "choice_card",
    is_optional: false,
    multi_select: false,
    label_ko: "판매가 잘 된다면 K-Beauty Section 을 더 확대할 의향이 있습니까?",
    label_en: "Would you expand the K-Beauty section if sales perform well?",
    answers: [
      { id: "Q24_A1", label_ko: "확실히 있습니다", label_en: "Definitely yes" },
      { id: "Q24_A2", label_ko: "아마 확대할 것입니다", label_en: "Probably yes" },
      { id: "Q24_A3", label_ko: "상황을 보고 결정하겠습니다", label_en: "Evaluate based on performance" },
      { id: "Q24_A4", label_ko: "현재 규모를 유지하고 싶습니다", label_en: "Prefer to maintain current scale" },
      { id: "Q24_A5", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q25",
    section: "investment_growth",
    importance: "A",
    type: "tag_chip",
    is_optional: false,
    multi_select: true,
    max_select: 2,
    label_ko: "K-Beauty 를 새로 도입하거나 확대하려는 가장 큰 이유는 무엇입니까?",
    label_en: "What is your main motivation to introduce or expand K-Beauty?",
    answers: [
      { id: "Q25_A1", label_ko: "매출 증가", label_en: "Revenue growth" },
      { id: "Q25_A2", label_ko: "신규 고객 유입", label_en: "New customer acquisition" },
      { id: "Q25_A3", label_ko: "고객 요청 대응", label_en: "Customer request response" },
      { id: "Q25_A4", label_ko: "반복구매 확대", label_en: "Increase repeat purchases" },
      { id: "Q25_A5", label_ko: "높은 마진 기회", label_en: "Higher margin opportunities" },
      { id: "Q25_A6", label_ko: "경쟁 매장과 차별화", label_en: "Differentiate from local competition" },
      { id: "Q25_A7", label_ko: "트렌드 대응", label_en: "Align with current beauty trends" },
      { id: "Q25_A8", label_ko: "장기 핵심 카테고리 육성", label_en: "Establish core long-term category" },
      { id: "Q25_A9", label_ko: "먼저 테스트", label_en: "Run quick category test" },
      { id: "Q25_A10", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q26",
    section: "investment_growth",
    importance: "A",
    type: "choice_card",
    is_optional: false,
    multi_select: false,
    label_ko: "앞으로 K-Beauty 가 매장에서 어떤 역할을 하기를 원하십니까?",
    label_en: "What role do you want K-Beauty to play in your store in the future?",
    answers: [
      { id: "Q26_A1", label_ko: "작은 테스트 카테고리", label_en: "Minor test category" },
      { id: "Q26_A2", label_ko: "유용한 추가 카테고리", label_en: "Helpful supplemental category" },
      { id: "Q26_A3", label_ko: "꾸준히 성장하는 카테고리", label_en: "Steadily growing category" },
      { id: "Q26_A4", label_ko: "주요 Beauty 카테고리", label_en: "Key major beauty category" },
      { id: "Q26_A5", label_ko: "매장을 차별화하는 핵심 카테고리", label_en: "Signature differentiator category" },
      { id: "Q26_A6", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q27",
    section: "investment_growth",
    importance: "C",
    type: "range_card",
    is_optional: true,
    multi_select: false,
    label_ko: "주변에 경쟁 Beauty Supply 매장이 얼마나 있습니까?",
    label_en: "How many competing Beauty Supply stores are in your immediate area?",
    answers: [
      { id: "Q27_A1", label_ko: "거의 없습니다", label_en: "Almost none" },
      { id: "Q27_A2", label_ko: "1–2 개", label_en: "1–2 competitors" },
      { id: "Q27_A3", label_ko: "3–5 개", label_en: "3–5 competitors" },
      { id: "Q27_A4", label_ko: "5 개 이상", label_en: "5 or more competitors" },
      { id: "Q27_A5", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q28",
    section: "investment_growth",
    importance: "B",
    type: "choice_card",
    is_optional: false,
    multi_select: false,
    label_ko: "주변 경쟁 매장들은 K-Beauty 를 어느 정도 판매하고 있습니까?",
    label_en: "To what extent do competitors in your area sell K-Beauty?",
    answers: [
      { id: "Q28_A1", label_ko: "큰 K-Beauty Selection 이 있습니다", label_en: "They have a large K-beauty section" },
      { id: "Q28_A2", label_ko: "작은 K-Beauty Selection 이 있습니다", label_en: "They have a small K-beauty selection" },
      { id: "Q28_A3", label_ko: "몇 개 제품만 판매합니다", label_en: "They sell only a few select items" },
      { id: "Q28_A4", label_ko: "거의 판매하지 않습니다", label_en: "They rarely sell K-Beauty" },
      { id: "Q28_A5", label_ko: "전혀 판매하지 않는 것 같습니다", label_en: "They do not seem to sell K-Beauty at all" },
      { id: "Q28_A6", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q29",
    section: "investment_growth",
    importance: "C",
    type: "tag_chip",
    is_optional: true,
    multi_select: true,
    max_select: 2,
    label_ko: "귀 매장의 가장 큰 경쟁력은 무엇입니까?",
    label_en: "What is the primary core competency or advantage of your store?",
    answers: [
      { id: "Q29_A1", label_ko: "가격 경쟁력", label_en: "Price competitiveness" },
      { id: "Q29_A2", label_ko: "Hair / Wig 강점", label_en: "Hair & wig specialization" },
      { id: "Q29_A3", label_ko: "Cosmetics 강점", label_en: "Cosmetics & beauty strength" },
      { id: "Q29_A4", label_ko: "다양한 상품", label_en: "Broad assortment variety" },
      { id: "Q29_A5", label_ko: "Customer Service", label_en: "High-quality customer service" },
      { id: "Q29_A6", label_ko: "Trend 상품", label_en: "Trend & fast-moving items" },
      { id: "Q29_A7", label_ko: "좋은 위치", label_en: "Premium store location" },
      { id: "Q29_A8", label_ko: "충성 고객층", label_en: "Loyal customer base" },
      { id: "Q29_A9", label_ko: "Premium 상품", label_en: "Premium/high-end product options" },
      { id: "Q29_A10", label_ko: "기타", label_en: "Other" },
      { id: "Q29_A11", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q34",
    section: "investment_growth",
    importance: "B",
    type: "tag_chip",
    is_optional: false,
    multi_select: true,
    max_select: 2,
    label_ko: "현재 K-Beauty 를 운영하거나 시작하는 데 가장 큰 어려움은 무엇입니까?",
    label_en: "What is the biggest challenge you face with K-Beauty?",
    answers: [
      { id: "Q34_A1", label_ko: "어떤 제품을 선택해야 할지 모르겠습니다", label_en: "Unsure how to select the right items" },
      { id: "Q34_A2", label_ko: "안 팔리는 재고가 걱정됩니다", label_en: "Fear of slow-moving inventory / dead stock" },
      { id: "Q34_A3", label_ko: "Display 공간이 부족합니다", label_en: "Insufficient display fixture space" },
      { id: "Q34_A4", label_ko: "초기 투자금이 부담됩니다", label_en: "High initial product investment burden" },
      { id: "Q34_A5", label_ko: "고객의 가격 민감도가 높습니다", label_en: "High retail customer price sensitivity" },
      { id: "Q34_A6", label_ko: "믿을 만한 공급처가 필요합니다", label_en: "Need a trustworthy wholesale supplier" },
      { id: "Q34_A7", label_ko: "트렌드를 따라가기 어렵습니다", label_en: "Hard to keep pace with rapid trend shifts" },
      { id: "Q34_A8", label_ko: "직원 교육/설명이 어렵습니다", label_en: "Difficulty training staff to consult/sell" },
      { id: "Q34_A9", label_ko: "Merchandising 이 어렵습니다", label_en: "VMD and merchandising is challenging" },
      { id: "Q34_A10", label_ko: "아직 K-Beauty 를 제대로 시도해보지 않았습니다", label_en: "Have not seriously tested K-Beauty yet" },
      { id: "Q34_A11", label_ko: "기타", label_en: "Other" },
      { id: "Q34_A12", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },

  // ================= PRECISION / CONDITIONAL QUESTIONS =================
  {
    id: "Q30",
    section: "store_space",
    importance: "B",
    type: "range_card",
    is_optional: true,
    multi_select: false,
    label_ko: "현재 K-Beauty 의 월 매출은 대략 어느 정도입니까?",
    label_en: "What is your approximate monthly K-Beauty revenue?",
    conditional_trigger: {
      question_id: "Q3",
      values: [
        "별도의 K-Beauty Section이 있습니다",
        "K-Beauty가 이미 중요한 카테고리입니다"
      ]
    },
    answers: [
      { id: "Q30_A1", label_ko: "$2,000 미만", label_en: "Under $2,000" },
      { id: "Q30_A2", label_ko: "$2,000–$5,000", label_en: "$2,000–$5,000" },
      { id: "Q30_A3", label_ko: "$5,000–$10,000", label_en: "$5,000–$10,000" },
      { id: "Q30_A4", label_ko: "$10,000–$20,000", label_en: "$10,000–$20,000" },
      { id: "Q30_A5", label_ko: "$20,000 이상", label_en: "Over $20,000" },
      { id: "Q30_A6", label_ko: "별도로 추적하지 않습니다", label_en: "We do not track separately" },
      { id: "Q30_A7", label_ko: "잘 모르겠습니다", label_en: "I do not know" },
      { id: "Q30_A8", label_ko: "답변하지 않겠습니다", label_en: "Prefer not to say" }
    ]
  },
  {
    id: "Q31",
    section: "store_space",
    importance: "B",
    type: "range_card",
    is_optional: true,
    multi_select: false,
    label_ko: "현재 판매 중인 K-Beauty SKU 는 대략 몇 개입니까?",
    label_en: "How many K-Beauty SKUs do you currently carry?",
    conditional_trigger: {
      question_id: "Q3",
      values: [
        "몇 개의 K-Beauty 제품을 판매합니다",
        "한 선반 또는 작은 K-Beauty 구역이 있습니다",
        "별도의 K-Beauty Section이 있습니다",
        "K-Beauty가 이미 중요한 카테고리입니다"
      ]
    },
    answers: [
      { id: "Q31_A1", label_ko: "없음", label_en: "None" },
      { id: "Q31_A2", label_ko: "10 개 미만", label_en: "Less than 10 SKUs" },
      { id: "Q31_A3", label_ko: "10–30 개", label_en: "10–30 SKUs" },
      { id: "Q31_A4", label_ko: "31–60 개", label_en: "31–60 SKUs" },
      { id: "Q31_A5", label_ko: "61–100 개", label_en: "61–100 SKUs" },
      { id: "Q31_A6", label_ko: "100 개 이상", label_en: "Over 100 SKUs" },
      { id: "Q31_A7", label_ko: "잘 모르겠습니다", label_en: "I do not know" }
    ]
  },
  {
    id: "Q32",
    section: "customer_demand",
    importance: "C",
    type: "range_card",
    is_optional: true,
    multi_select: false,
    label_ko: "하루 평균 매장 방문 고객 수는 대략 어느 정도입니까?",
    label_en: "What is your approximate average daily foot traffic?",
    conditional_trigger: {
      question_id: "Q6",
      values: [
        "잘 모르겠습니다",
        "답변하지 않겠습니다"
      ]
    },
    answers: [
      { id: "Q32_A1", label_ko: "25 명 미만", label_en: "Under 25 customers" },
      { id: "Q32_A2", label_ko: "25–50 명", label_en: "25–50 customers" },
      { id: "Q32_A3", label_ko: "51–100 명", label_en: "51–100 customers" },
      { id: "Q32_A4", label_ko: "101–200 명", label_en: "101–200 customers" },
      { id: "Q32_A5", label_ko: "200 명 이상", label_en: "Over 200 customers" },
      { id: "Q32_A6", label_ko: "잘 모르거나 추적하지 않습니다", label_en: "Unsure or do not track" }
    ]
  },
  {
    id: "Q33",
    section: "customer_demand",
    importance: "B",
    type: "choice_card",
    is_optional: true,
    multi_select: false,
    label_ko: "Beauty 매출 중 K-Beauty 가 차지하는 비중은 어느 정도입니까?",
    label_en: "What percentage of your beauty sales is K-Beauty?",
    conditional_trigger: {
      question_id: "Q3",
      values: [
        "별도의 K-Beauty Section이 있습니다",
        "K-Beauty가 이미 중요한 카테고리입니다"
      ]
    },
    answers: [
      { id: "Q33_A1", label_ko: "거의 없음", label_en: "Almost none" },
      { id: "Q33_A2", label_ko: "10% 미만", label_en: "Less than 10%" },
      { id: "Q33_A3", label_ko: "10–25%", label_en: "10–25%" },
      { id: "Q33_A4", label_ko: "26–50%", label_en: "26–50%" },
      { id: "Q33_A5", label_ko: "50% 이상", label_en: "50% or more" },
      { id: "Q33_A6", label_ko: "별도로 추적하지 않습니다", label_en: "Do not track separately" },
      { id: "Q33_A7", label_ko: "잘 모르겠습니다 / 답변하지 않겠습니다", label_en: "Unsure / Prefer not to say" }
    ]
  }
];