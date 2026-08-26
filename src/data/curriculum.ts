// Curriculum data source. Weeks 1–2 are fully populated for Phase 1.
// Weeks 3–12 are intentionally titles/goals only ("planned") — do not
// populate their nightly content in this phase.

export type LessonStep = {
  kind: "watch" | "do" | "explain" | "checkpoint";
  heading: string;
  items: string[];
  checkpointPrompt?: string;
};

export type Lesson = {
  night: number;
  title: string;
  steps: LessonStep[];
};

export type Week = {
  n: number;
  slug: string;
  title: string;
  goal: string;
  status: "live" | "planned";
  lessons?: Lesson[];
  examPrompt?: string;
  passStandard?: string;
};

export const weeks: Week[] = [
  {
    n: 1,
    slug: "week-1",
    title: "How Amazon FBA actually works",
    goal: "Understand the full money/product flow before talking about “winning products.”",
    status: "live",
    lessons: [
      {
        night: 1,
        title: "The FBA model",
        steps: [
          {
            kind: "watch",
            heading: "Watch (30–60 min)",
            items: [
              "Amazon Seller University — FBA overview.",
              "First 20–30 minutes of a complete Amazon FBA beginner course.",
            ],
          },
          {
            kind: "do",
            heading: "Do (30–45 min)",
            items: [
              "Draw the flow: supplier → freight → 3PL/FBA → customer → Amazon fees → settlement → bank.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Write the FBA flow in your own words as if teaching a beginner.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "Explain FBA vs FBM, Prime, who owns the stock, when Amazon gets paid, and when the seller gets cash.",
          },
        ],
      },
      {
        night: 2,
        title: "Seller Central map",
        steps: [
          {
            kind: "watch",
            heading: "Watch / read",
            items: [
              "Amazon Seller University UK.",
              "Amazon advertising-console overview — for orientation only.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Sketch the main areas you expect to use: Catalogue, Inventory, Orders, Reports, Advertising, Performance.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "Explain where you would look for a stock problem, a PPC problem, a listing problem, and an account-health problem.",
          },
        ],
      },
      {
        night: 3,
        title: "Fees and contribution",
        steps: [
          {
            kind: "watch",
            heading: "Watch",
            items: ["Travis Marziani — Amazon FBA Fees Explained."],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "For three hypothetical £19.99 products calculate: sale price, VAT treatment assumption, Amazon referral/FBA fees, landed cost, PPC cost per order, contribution per order.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt: "Explain why revenue is not profit.",
          },
        ],
      },
      {
        night: 4,
        title: "Reviews, competition and customer behaviour",
        steps: [
          {
            kind: "watch",
            heading: "Watch",
            items: ["A product-research walkthrough covering competitor analysis."],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Pick one Amazon category and inspect ten listings.",
              "Record price, reviews, rating, obvious brands, image quality, common complaints.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "Identify one market that looks easy but is actually hard, and explain why.",
          },
        ],
      },
    ],
    examPrompt: "Without notes, explain the entire FBA business on one page.",
    passStandard:
      "A reviewer should be able to ask “where does the money go?” or “what happens if we run out of stock?” and get a coherent answer.",
  },
  {
    n: 2,
    slug: "week-2",
    title: "Product research: demand before enthusiasm",
    goal: "Stop guessing and start validating.",
    status: "live",
    lessons: [
      {
        night: 1,
        title: "Generate candidates",
        steps: [
          {
            kind: "watch",
            heading: "Watch",
            items: ["A structured product-research walkthrough, part 1."],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Find 20 candidate products using the agreed broad screen: light, non-fragile, roughly £15–£30 retail.",
            ],
          },
        ],
      },
      {
        night: 2,
        title: "Keyword and intent research",
        steps: [
          {
            kind: "watch",
            heading: "Watch",
            items: ["A structured product-research walkthrough, part 2."],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Find the main shopper keywords for ten candidates.",
              "Record search intent, competitor count, obvious dominant brands.",
            ],
          },
        ],
      },
      {
        night: 3,
        title: "Research tooling walkthrough",
        steps: [
          {
            kind: "watch",
            heading: "Watch",
            items: ["A current opportunity/keyword research-tool tutorial."],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Follow the video with a sample niche and write down what each tool is trying to prove.",
            ],
          },
        ],
      },
      {
        night: 4,
        title: "Apply the rejection framework",
        steps: [
          {
            kind: "watch",
            heading: "Read",
            items: ["A current product-research framework and checklist."],
          },
          {
            kind: "do",
            heading: "Do",
            items: ["Kill at least half the original 20 ideas using evidence."],
          },
        ],
      },
    ],
    examPrompt:
      "Deliver five surviving product ideas, each with: why demand exists, key keyword, indicative price, competition warning, reason it survived, biggest unknown.",
    passStandard:
      "At least as much emphasis on reasons to reject as reasons to buy.",
  },
  { n: 3, slug: "week-3", title: "Competition, reviews and differentiation", goal: "Find the customer problem hiding inside competitor reviews.", status: "planned" },
  { n: 4, slug: "week-4", title: "Unit economics and cash", goal: "Be able to kill a high-revenue idea because the economics are bad.", status: "planned" },
  { n: 5, slug: "week-5", title: "Suppliers, sourcing, samples and negotiation", goal: "Understand that the cheapest quote is not necessarily the cheapest supplier.", status: "planned" },
  { n: 6, slug: "week-6", title: "Freight, import VAT, duty and landed cost", goal: "Make landed cost real.", status: "planned" },
  { n: 7, slug: "week-7", title: "Listing and conversion", goal: "Understand that PPC cannot rescue a product page customers do not want.", status: "planned" },
  { n: 8, slug: "week-8", title: "PPC without wasting money", goal: "Understand traffic quality before touching bids.", status: "planned" },
  { n: 9, slug: "week-9", title: "Inventory and stock planning", goal: "Understand why profitable businesses can still run out of cash or stock.", status: "planned" },
  { n: 10, slug: "week-10", title: "Compliance, IP and business discipline", goal: "Learn to reject avoidable risk early.", status: "planned" },
  { n: 11, slug: "week-11", title: "Supervised product-research apprenticeship", goal: "Operate the research machine, not just understand it.", status: "planned" },
  { n: 12, slug: "week-12", title: "Investment-committee simulation", goal: "Build a defensible investment case and be willing to recommend REJECT.", status: "planned" },
];

export function getWeek(slug: string): Week | undefined {
  return weeks.find((w) => w.slug === slug);
}

/** A single lesson flattened with its parent week's identity, in curriculum order. */
export type FlatLesson = {
  weekSlug: string;
  weekN: number;
  weekTitle: string;
  night: number;
  lessonTitle: string;
};

/**
 * Every lesson across every currently-built week, in curriculum order.
 * Weeks 3–12 are "planned" (no `lessons` array yet) and are naturally
 * skipped — this only ever reflects real, currently-open content, never
 * invented future weeks. Used to compute a signed-in learner's next
 * incomplete lesson and total programme size from real `lesson_progress`
 * rows.
 */
export function getAllLessons(): FlatLesson[] {
  return weeks.flatMap((w) =>
    (w.lessons ?? []).map((l) => ({
      weekSlug: w.slug,
      weekN: w.n,
      weekTitle: w.title,
      night: l.night,
      lessonTitle: l.title,
    }))
  );
}
