// 100-point Candidate Scorecard — weights and hard-stop gates, transcribed
// from the canonical Product Research Machine specification.
export type ScorecardFactor = {
  key: string;
  label: string;
  weight: number;
  question: string;
};

export const scorecardFactors: ScorecardFactor[] = [
  { key: "demand", label: "Demand quality", weight: 10, question: "Is there repeatable shopper demand rather than a fad?" },
  { key: "competition", label: "Competition / review moat", weight: 10, question: "Can a new entrant realistically win visibility and trust?" },
  { key: "differentiation", label: "Customer problem / differentiation", weight: 12, question: "Is there an evidence-backed improvement customers value?" },
  { key: "priceStability", label: "Selling price stability", weight: 5, question: "Is the price band stable enough to protect economics?" },
  { key: "contribution", label: "Contribution after PPC", weight: 15, question: "Does the product still make worthwhile money after realistic acquisition cost?" },
  { key: "ppcDifficulty", label: "PPC difficulty", weight: 8, question: "Can qualified traffic be bought at a defensible CPA/ACoS?" },
  { key: "cashExposure", label: "MOQ / initial cash exposure", weight: 8, question: "Is the amount at risk proportionate?" },
  { key: "cashCycle", label: "Lead time / cash-conversion cycle", weight: 6, question: "How long is cash tied up before it returns?" },
  { key: "supplier", label: "Supplier / manufacturing feasibility", weight: 6, question: "Can the product be made consistently without complexity?" },
  { key: "compliance", label: "Compliance / IP / safety risk", weight: 8, question: "Is risk manageable and verifiable?" },
  { key: "returns", label: "Return / defect risk", weight: 4, question: "Is the product likely to create costly returns or poor reviews?" },
  { key: "seasonality", label: "Seasonality", weight: 3, question: "Is demand sufficiently year-round?" },
  { key: "repeat", label: "Repeat purchase / family potential", weight: 2, question: "Can one SKU lead naturally to more value?" },
  { key: "brand", label: "Brand / exit transferability", weight: 3, question: "Does it build a defensible sellable asset?" },
];

export const totalWeight = scorecardFactors.reduce((sum, f) => sum + f.weight, 0); // 100

export type ScoreBand = {
  min: number;
  max: number;
  label: string;
  tone: "go" | "investigate" | "reject";
};

export const scoreBands: ScoreBand[] = [
  { min: 80, max: 100, label: "Strong candidate, subject to verification", tone: "go" },
  { min: 70, max: 79, label: "Investigate further", tone: "investigate" },
  { min: 60, max: 69, label: "Only continue if one major uncertainty can materially improve the case", tone: "investigate" },
  { min: 0, max: 59, label: "Reject", tone: "reject" },
];

export function bandForScore(score: number): ScoreBand {
  return scoreBands.find((b) => score >= b.min && score <= b.max) ?? scoreBands[scoreBands.length - 1];
}

export const hardStopGates: { key: string; label: string }[] = [
  { key: "contribution", label: "Contribution: realistic post-PPC contribution is too thin to compensate for risk/capital." },
  { key: "ppc", label: "PPC: expected acquisition cost is at/above break-even with no credible organic path." },
  { key: "competition", label: "Competition: dominant incumbents/review moat make entry commercially implausible." },
  { key: "differentiation", label: "Differentiation: the only strategy is “sell the same thing cheaper.”" },
  { key: "cash", label: "Cash: MOQ/deposit/freight creates unacceptable exposure or an unfinanceable cash-conversion cycle." },
  { key: "compliance", label: "IP/compliance: material unverified patent, design, trademark, safety or regulatory exposure." },
  { key: "supplier", label: "Supplier: no credible manufacturer or quality route." },
  { key: "demand", label: "Demand: relies mainly on a temporary trend or unverified estimator output." },
];

export function recommendationFor(
  score: number,
  hardStopTriggered: boolean
): "GO" | "INVESTIGATE" | "REJECT" {
  if (hardStopTriggered) return "REJECT";
  if (score >= 80) return "GO";
  if (score >= 60) return "INVESTIGATE";
  return "REJECT";
}
