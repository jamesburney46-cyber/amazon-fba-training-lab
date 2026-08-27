// Structured video metadata for embedded YouTube players.
//
// Only genuine YouTube videos are listed here. Third-party pages that host
// a video walkthrough elsewhere (e.g. junglescout.com episode pages) stay
// as plain external links in the lesson content and src/data/resources.ts —
// they are not embedded.
//
// Sources: src/data/resources.ts (site resource library) and the canonical
// training source, P-M-Business-Intelligence
// "08 Action Control/Training/Tom/2026-08-24_TOM_AMAZON_FBA_12_WEEK_TRAINING_PROGRAMME.md",
// curated in Issue #30 "Week 1–2 missing-video curation — 24 Aug 2026"
// (comment 5402399452).
//
// Weeks 1–7 carry nightly content and curated embedded videos where a
// useful genuine YouTube source exists. Some nights intentionally use
// authoritative reading/manual exercises instead of forcing a weak video.
// Do not fabricate thumbnails or video IDs for future weeks.
//
// One primary embedded video per instructional night. Week 1/2 Night 5 are
// exam nights and intentionally carry no compulsory video.

export type VideoSource = "official" | "govuk" | "third-party";

export type LessonVideo = {
  youtubeId: string;
  title: string;
  source: VideoSource;
  note: string;
  week: number;
  night: number;
};

export const lessonVideos: LessonVideo[] = [
  {
    youtubeId: "uY1zkQ2y4yE",
    title: "Amazon Seller University — How to sell on Amazon for beginners (step-by-step tutorial)",
    source: "official",
    note: "Amazon's own substantial, step-by-step foundation video covering the full selling/FBA journey — the Night 1 core video.",
    week: 1,
    night: 1,
  },
  {
    youtubeId: "XzLrsVwau_A",
    title: "Amazon Seller Central 2026 Dashboard Walkthrough | Step-by-Step Beginner Guide",
    source: "third-party",
    note: "Walks through the redesigned Seller Central dashboard — products, inventory, pricing, orders/returns, advertising, A+ content, reports/payments and growth tools — for Night 2's navigation exercise.",
    week: 1,
    night: 2,
  },
  {
    youtubeId: "8wfFXYR0EHI",
    title: "Travis Marziani — Amazon FBA Fees Explained",
    source: "third-party",
    note: "~26:36 walkthrough covering margin structure, seller account fees, storage/aged inventory, referral fee, pick & pack, the FBA calculator, returns/disposal/prep and fee-saving strategies for Night 3's contribution exercise.",
    week: 1,
    night: 3,
  },
  {
    youtubeId: "S_jBtzXmf4U",
    title: "Orange Klik — How to Conduct Amazon FBA Competitor Analysis Using AI Tools",
    source: "third-party",
    note: "~1:11 live competitor-analysis session across listings, images, reviews, differentiation, customer avatars and keyword/SEO opportunities for Night 4's ten-listing review.",
    week: 1,
    night: 4,
  },
  {
    youtubeId: "HWsCjTZmhVw",
    title: "Jungle Scout — How to Do Amazon Product Research: Live! (Episode 1)",
    source: "third-party",
    note: "Live walkthrough of generating product candidates against demand/competition criteria for Night 1.",
    week: 2,
    night: 1,
  },
  {
    youtubeId: "xRiPKvAIhEQ",
    title: "Jungle Scout — Advanced Product Research Strategy Using Keywords (Episode 6)",
    source: "third-party",
    note: "Keyword research used to validate product opportunities for Night 2's keyword/intent exercise.",
    week: 2,
    night: 2,
  },
  {
    youtubeId: "kp0QZsz-RtQ",
    title: "Helium 10 — product research tutorial (Black Box / Cerebro / Xray)",
    source: "third-party",
    note: "Current walkthrough of the Black Box, Cerebro and Xray research tools for Night 3's tooling exercise.",
    week: 2,
    night: 3,
  },
  {
    youtubeId: "WZyE-dNZPyY",
    title: "Orange Klik — How to Validate Amazon FBA Product Ideas Before You Invest",
    source: "third-party",
    note: "~55:17 current validation workshop covering demand, competition, pricing/PPC, budget, Amazon Product Opportunity Explorer, market fit and competitor reverse engineering before inventory investment, for Night 4.",
    week: 2,
    night: 4,
  },
  {
    youtubeId: "S_jBtzXmf4U",
    title: "Orange Klik — How to Conduct Amazon FBA Competitor Analysis Using AI Tools",
    source: "third-party",
    note: "Deep competitor-analysis session covering listings, images, reviews, customer avatars and differentiation. Reused intentionally for Week 3 Night 1 because this week applies the analysis in much greater depth.",
    week: 3,
    night: 1,
  },
  {
    youtubeId: "-c4vVigJhyQ",
    title: "Sharon Even — 5 Ways to Differentiate Your Products for Amazon FBA",
    source: "third-party",
    note: "Detailed differentiation lesson covering competitor knowledge, buyer avatars and five practical routes to meaningful product differentiation for Week 3 Night 3.",
    week: 3,
    night: 3,
  },
  {
    youtubeId: "WZyE-dNZPyY",
    title: "Orange Klik — How to Validate Amazon FBA Product Ideas Before You Invest",
    source: "third-party",
    note: "Validation workshop reused for Week 3 Night 4 to stress-test whether proposed differentiation genuinely improves the investment case or whether the product should be rejected.",
    week: 3,
    night: 4,
  },
  {
    youtubeId: "Q-mh2ydQ0Z0",
    title: "Million Dollar Case Study — Final Product Selection / Amazon FBA Profitability",
    source: "third-party",
    note: "Walks through stress-testing a candidate's unit economics before committing — the Night 1 core video for building the unit-economics worksheet.",
    week: 4,
    night: 1,
  },
  {
    youtubeId: "8wfFXYR0EHI",
    title: "Travis Marziani — Amazon FBA Fees Explained",
    source: "third-party",
    note: "The detailed fees walkthrough from Week 1 is reused deliberately here: Night 2 now applies its referral, fulfilment, storage, returns and prep cost lines to a complete product P&L rather than viewing fees in isolation.",
    week: 4,
    night: 2,
  },
  {
    youtubeId: "SCVrD6gUW34",
    title: "Amazon Ads Break-even ACoS Calculation Tutorial 2025",
    source: "third-party",
    note: "Focused walkthrough of profit margin and break-even ACoS for Night 3's break-even CPA, break-even ACoS and target ACoS calculations. Cross-check definitions against the linked official Amazon Ads guidance.",
    week: 4,
    night: 3,
  },
  {
    youtubeId: "AIBICWv862s",
    title: "How to find a Supplier in China and on Alibaba for your Amazon FBA Store (with Kian Golzari)",
    source: "third-party",
    note: "Sourcing-expert walkthrough of finding and vetting suppliers in China and on Alibaba for Night 1's supplier-screening exercise.",
    week: 5,
    night: 1,
  },
  {
    youtubeId: "H5nda2CpzPg",
    title: "How to Order Samples From an Alibaba Supplier To Start Amazon FBA",
    source: "third-party",
    note: "Practical walkthrough of ordering paid samples from a shortlisted supplier before committing to production, for Night 2's sample-evaluation exercise.",
    week: 5,
    night: 2,
  },
  {
    youtubeId: "IlJtL7H0nrI",
    title: "How To Negotiate With Suppliers On Alibaba (Amazon FBA)",
    source: "third-party",
    note: "Negotiation walkthrough covering price, MOQ and payment-term tactics for Night 3's negotiation exercise.",
    week: 5,
    night: 3,
  },
  {
    youtubeId: "RqmA9S0w9-Y",
    title: "HMRC — Customs clearance instructions for imports: how to identify the commodity code",
    source: "govuk",
    note: "HMRC's short, worked introduction to finding an import commodity code in the UK tariff for Night 2. The learner must still verify the case product in the live GOV.UK Trade Tariff rather than copying the example code.",
    week: 6,
    night: 2,
  },
  {
    youtubeId: "smJ9iztUMVc",
    title: "HMRC — Importing parcels into Great Britain from other countries",
    source: "govuk",
    note: "Official overview covering EORI, import declarations, customs duty, import VAT and preference claims. Use the relevant chapters for Night 3, then rely on the linked GOV.UK pages for the current rules and calculation exercise.",
    week: 6,
    night: 3,
  },
];

export function getLessonVideos(week: number, night: number): LessonVideo[] {
  return lessonVideos.filter((v) => v.week === week && v.night === night);
}

/** True when at least one night in this week has a curated video. */
export function weekHasVideo(week: number): boolean {
  return lessonVideos.some((v) => v.week === week);
}

/**
 * The earliest-night video for a week, used as a single compact preview
 * thumbnail on the week card in the curriculum/journey view. Returns
 * undefined for weeks with no curated video — callers must not fabricate
 * a thumbnail in that case.
 */
export function getWeekPreviewVideo(week: number): LessonVideo | undefined {
  return lessonVideos
    .filter((v) => v.week === week)
    .sort((a, b) => a.night - b.night)[0];
}
