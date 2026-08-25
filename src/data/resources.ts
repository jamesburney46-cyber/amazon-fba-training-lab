// Sample resource library. Every entry is tagged by evidence source so
// learners always know how much weight to put on it.
export type ResourceCategory =
  | "FBA fundamentals"
  | "Product research"
  | "PPC"
  | "UK import / customs / VAT / IP";

export type Resource = {
  title: string;
  href: string;
  source: "official" | "govuk" | "third-party";
  category: ResourceCategory;
  note: string;
};

export const resources: Resource[] = [
  {
    title: "Amazon UK Seller University",
    href: "https://sell.amazon.co.uk/sell-online/seller-university",
    source: "official",
    category: "FBA fundamentals",
    note: "Amazon's own training hub — treat as the factual backbone for how FBA actually works.",
  },
  {
    title: "Amazon UK Learn hub",
    href: "https://sell.amazon.co.uk/learn",
    source: "official",
    category: "FBA fundamentals",
    note: "Official onboarding and category-specific guidance.",
  },
  {
    title: "Amazon Seller University — FBA overview",
    href: "https://www.youtube.com/watch?v=xQpTTnvxWls",
    source: "official",
    category: "FBA fundamentals",
    note: "Week 1, Night 1 core video.",
  },
  {
    title: "Amazon Seller University — manage FBA inventory",
    href: "https://www.youtube.com/watch?v=y8vqI4pIEj4",
    source: "official",
    category: "FBA fundamentals",
    note: "Used in the stock-planning module.",
  },
  {
    title: "Jungle Scout — complete Amazon FBA beginner course",
    href: "https://www.youtube.com/watch?v=Yx1eLoNdfmc",
    source: "third-party",
    category: "FBA fundamentals",
    note: "Week 1, Night 1 — FBA-model overview. Night 3's core fees video is now the dedicated Travis Marziani fees walkthrough.",
  },
  {
    title: "Amazon FBA training-video collection",
    href: "https://sell.amazon.com/blog/amazon-fba-training-videos?lang=en-US",
    source: "official",
    category: "FBA fundamentals",
    note: "Index of Amazon's own FBA training videos.",
  },
  {
    title: "Amazon Ads — Sponsored Products hub",
    href: "https://advertising.amazon.com/en-gb/solutions/products/sponsored-products",
    source: "official",
    category: "PPC",
    note: "Official product hub for Sponsored Products.",
  },
  {
    title: "Amazon Ads — advertising console guide",
    href: "https://advertising.amazon.com/en-gb/library/guides/advertising-console",
    source: "official",
    category: "PPC",
    note: "Official console orientation, used in Week 1 Night 2.",
  },
  {
    title: "Amazon Ads — Sponsored Products best practices",
    href: "https://advertising.amazon.com/library/guides/sponsored-products-best-practices",
    source: "official",
    category: "PPC",
    note: "Official best-practice guidance for PPC structure.",
  },
  {
    title: "Amazon product-research framework (2026)",
    href: "https://www.junglescout.com/resources/articles/amazon-product-research-framework-for-launching-products/",
    source: "third-party",
    category: "Product research",
    note: "Structured third-party framework — cross-check against the evidence screen, not a substitute for it.",
  },
  {
    title: "Amazon product-research checklist",
    href: "https://www.junglescout.com/resources/guides/amazon-fba-product-research-checklist/",
    source: "third-party",
    category: "Product research",
    note: "Companion checklist used in the Week 2 rejection exercise.",
  },
  {
    title: "Helium 10 — product research tutorial (Black Box / Cerebro / Xray)",
    href: "https://www.youtube.com/watch?v=kp0QZsz-RtQ",
    source: "third-party",
    category: "Product research",
    note: "Week 2, Night 3 core video — current walkthrough of the research tools.",
  },
  {
    title: "Import goods into the UK — step by step",
    href: "https://www.gov.uk/import-goods-into-uk",
    source: "govuk",
    category: "UK import / customs / VAT / IP",
    note: "Authoritative UK government process reference.",
  },
  {
    title: "UK Trade Tariff / commodity-code lookup",
    href: "https://www.gov.uk/trade-tariff",
    source: "govuk",
    category: "UK import / customs / VAT / IP",
    note: "Used to identify plausible commodity codes and duty rates.",
  },
  {
    title: "Paying VAT and duties on imports",
    href: "https://www.gov.uk/guidance/paying-vat-and-duties-on-imports",
    source: "govuk",
    category: "UK import / customs / VAT / IP",
    note: "Factual reference for landed-cost calculations.",
  },
  {
    title: "Import VAT guidance",
    href: "https://www.gov.uk/guidance/vat-imports-acquisitions-and-purchases-from-abroad",
    source: "govuk",
    category: "UK import / customs / VAT / IP",
    note: "Detail on import VAT treatment.",
  },
  {
    title: "EORI guidance",
    href: "https://www.gov.uk/eori",
    source: "govuk",
    category: "UK import / customs / VAT / IP",
    note: "Required registration reference for UK importers.",
  },
  {
    title: "UK Intellectual Property Office — designs",
    href: "https://www.gov.uk/government/collections/intellectual-property-designs",
    source: "govuk",
    category: "UK import / customs / VAT / IP",
    note: "Used in the compliance/IP-risk module.",
  },
];

export const sourceLabels: Record<Resource["source"], string> = {
  official: "Official Amazon",
  govuk: "GOV.UK",
  "third-party": "Third-party",
};
