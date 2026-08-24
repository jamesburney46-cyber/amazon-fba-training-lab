// Structured video metadata for embedded YouTube players.
//
// Only genuine YouTube videos are listed here. Third-party pages that host
// a video walkthrough elsewhere (e.g. junglescout.com episode pages) stay
// as plain external links in the lesson content and src/data/resources.ts —
// they are not embedded.
//
// Sources: src/data/resources.ts (site resource library) and the canonical
// training source, P-M-Business-Intelligence
// "08 Action Control/Training/Tom/2026-08-24_TOM_AMAZON_FBA_12_WEEK_TRAINING_PROGRAMME.md".
//
// In this phase only Week 1 and Week 2 carry nightly content, so only
// those weeks have video entries — do not add Weeks 3–12 entries here
// until their nightly content is built.

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
    youtubeId: "xQpTTnvxWls",
    title: "Amazon Seller University — FBA overview",
    source: "official",
    note: "Amazon's own explanation of the FBA money/product flow — the Night 1 core video.",
    week: 1,
    night: 1,
  },
  {
    youtubeId: "Yx1eLoNdfmc",
    title: "Jungle Scout — complete Amazon FBA beginner course",
    source: "third-party",
    note: "Watch the first 20–30 minutes for Night 1's FBA-model overview.",
    week: 1,
    night: 1,
  },
  {
    youtubeId: "Yx1eLoNdfmc",
    title: "Jungle Scout — complete Amazon FBA beginner course (fees & profitability sections)",
    source: "third-party",
    note: "Same course as Night 1 — this time watch the sections covering FBA fees and profitability.",
    week: 1,
    night: 3,
  },
  {
    youtubeId: "kp0QZsz-RtQ",
    title: "Helium 10 — product research tutorial (Black Box / Cerebro / Xray)",
    source: "third-party",
    note: "Current walkthrough of the Black Box, Cerebro and Xray research tools for Night 3's tooling exercise.",
    week: 2,
    night: 3,
  },
];

export function getLessonVideos(week: number, night: number): LessonVideo[] {
  return lessonVideos.filter((v) => v.week === week && v.night === night);
}
