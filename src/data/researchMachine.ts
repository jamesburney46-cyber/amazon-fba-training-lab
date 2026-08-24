export type FunnelStageDef = {
  key: string;
  from: number | null;
  to: number;
  title: string;
  description: string;
  criteria: string[];
};

export const funnelStages: FunnelStageDef[] = [
  {
    key: "raw",
    from: null,
    to: 30,
    title: "Stage A — Generate 30 raw ideas",
    description:
      "Broad discovery from marketplace browsing, opportunity tools, competitor review mining, recurring customer problems and off-marketplace demand signals.",
    criteria: [
      "Favour lightweight products.",
      "Avoid fragile products.",
      "Broadly target £15–£30 retail unless evidence justifies an exception.",
      "Avoid obvious regulated/high-liability concepts during early research.",
    ],
  },
  {
    key: "fast-rejection",
    from: 30,
    to: 10,
    title: "Stage B — Fast rejection",
    description: "Reject immediately when any hard stop is clear.",
    criteria: [
      "Dominant brand/review moat with no credible entry angle.",
      "Unrealistic margin before PPC.",
      "Fragile/heavy/oversized without exceptional economics.",
      "Obvious patent/trademark/design risk.",
      "Restricted/high-compliance product without a compelling reason.",
      "Extreme seasonality.",
      "Price race / commodity with no differentiation.",
      "MOQ creates disproportionate initial cash exposure.",
      "Weak search demand.",
      "No believable route to qualified traffic.",
    ],
  },
  {
    key: "evidence",
    from: 10,
    to: 5,
    title: "Stage C — Evidence screen",
    description: "For each survivor, capture concrete evidence before modelling economics.",
    criteria: [
      "Primary shopper keyword(s).",
      "Estimated monthly demand.",
      "Top 10 competitor prices.",
      "Reviews/rating distribution.",
      "Dominant brands.",
      "Obvious listing quality.",
      "1–3 star complaint themes.",
      "Differentiation hypothesis.",
      "Indicative supplier cost, Amazon fees, PPC CPC/acquisition difficulty.",
      "MOQ, lead time, compliance/IP risks.",
    ],
  },
  {
    key: "commercial-model",
    from: 5,
    to: 3,
    title: "Stage D — Commercial model",
    description: "Build full indicative unit economics for each survivor.",
    criteria: [
      "Selling price, manufacturing, packaging, freight, duty, Amazon fees, returns allowance.",
      "Expected PPC CPA, contribution per order, contribution margin.",
      "Break-even CPA, break-even ACoS, target ACoS.",
      "MOQ cash, deposit/balance timing, cash-conversion cycle.",
    ],
  },
  {
    key: "investment-case",
    from: 3,
    to: 3,
    title: "Stage E — Investment case → owner decision",
    description:
      "A maximum of three candidates ever reach an owner decision. Each must carry evidence, assumptions, economics, key risk, next validation step and a GO / INVESTIGATE / REJECT recommendation.",
    criteria: [
      "Evidence",
      "Assumptions",
      "Economics",
      "Key risk",
      "Next validation step",
      "GO / INVESTIGATE / REJECT recommendation",
    ],
  },
];

export const researchDiscipline = {
  preferred: [
    "Search demand appears strong because…",
    "Competition is manageable/unmanageable because…",
    "At an assumed £X CPA, contribution is £Y…",
    "This estimate is unverified because…",
    "I would reject this if…",
  ],
  avoid: [
    "I like it.",
    "It looks popular.",
    "We could make a lot.",
    "The supplier says it sells well.",
    "There aren't many sellers.",
  ],
};
