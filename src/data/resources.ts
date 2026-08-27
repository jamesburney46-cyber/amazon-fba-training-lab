// Sample resource library. Every entry is tagged by evidence source so
// learners always know how much weight to put on it.
export type ResourceCategory =
  | "FBA fundamentals"
  | "Product research"
  | "Suppliers and sourcing"
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
    title: "Amazon Ads — improve your products for advertising",
    href: "https://advertising.amazon.com/library/guides/improve-your-products-for-advertising",
    source: "official",
    category: "FBA fundamentals",
    note: "Week 7 core reading — official guidance for titles, images, bullets, descriptions and detail-page readiness before paid traffic.",
  },
  {
    title: "Amazon Ads — measure and improve campaigns",
    href: "https://advertising.amazon.com/library/guides/measure-improve-campaigns",
    source: "official",
    category: "PPC",
    note: "Week 7, Night 4 reading — high clicks with few orders can indicate a product-detail-page problem, not merely a bid problem.",
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
    title: "Million Dollar Case Study — Final Product Selection / Amazon FBA Profitability",
    href: "https://www.youtube.com/watch?v=Q-mh2ydQ0Z0",
    source: "third-party",
    category: "FBA fundamentals",
    note: "Week 4, Night 1 core video — stress-testing a candidate's unit economics before committing.",
  },
  {
    title: "How to find a Supplier in China and on Alibaba for your Amazon FBA Store (with Kian Golzari)",
    href: "https://www.youtube.com/watch?v=AIBICWv862s",
    source: "third-party",
    category: "Suppliers and sourcing",
    note: "Week 5, Night 1 core video — finding and vetting suppliers beyond Alibaba badges alone.",
  },
  {
    title: "How to Order Samples From an Alibaba Supplier To Start Amazon FBA",
    href: "https://www.youtube.com/watch?v=H5nda2CpzPg",
    source: "third-party",
    category: "Suppliers and sourcing",
    note: "Week 5, Night 2 core video — ordering and judging paid samples before committing to production.",
  },
  {
    title: "How To Negotiate With Suppliers On Alibaba (Amazon FBA)",
    href: "https://www.youtube.com/watch?v=IlJtL7H0nrI",
    source: "third-party",
    category: "Suppliers and sourcing",
    note: "Week 5, Night 3 core video — negotiating price, MOQ and payment terms, not price alone.",
  },
  {
    title: "Placing UKCA or CE marked products on the market in Great Britain",
    href: "https://www.gov.uk/guidance/placing-ukca-or-ce-marked-products-on-the-market-in-great-britain",
    source: "govuk",
    category: "UK import / customs / VAT / IP",
    note: "Week 5, Night 4 reading — the importer's own legal responsibility for product safety and marking, used to test supplier compliance documentation.",
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
