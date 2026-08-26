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
// In this phase only Week 1 and Week 2 carry nightly content, so only
// those weeks have video entries — do not add Weeks 3–12 entries here
// until their nightly content is built.
//
// One primary embedded video per instructional night. Week 1/2 Night 5 are
// exam nights and intentionally carry no compulsory video.

export type VideoSource = "official" | "third-party";

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
