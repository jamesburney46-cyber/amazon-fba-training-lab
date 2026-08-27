// Curriculum data source. Weeks 1–7 are fully populated.
// Weeks 8–12 remain titles/goals only ("planned") until their
// nightly content is built.

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
  {
    n: 3,
    slug: "week-3",
    title: "Competition, reviews and differentiation",
    goal: "Find the customer problem hiding inside competitor reviews, then prove whether solving it creates a defensible product opportunity.",
    status: "live",
    lessons: [
      {
        night: 1,
        title: "Map the competitive landscape",
        steps: [
          {
            kind: "watch",
            heading: "Watch / read",
            items: [
              "Watch the curated Orange Klik competitor-analysis session.",
              "Focus on market shape rather than simply counting how many sellers exist.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Choose one surviving Week 2 product idea and search its primary shopper keyword on Amazon UK.",
              "Record at least ten directly relevant competing listings.",
              "For each competitor capture: selling price, review count, star rating, brand, pack size or specification, listing quality, main promise and obvious differentiator.",
              "Mark whether the market appears fragmented across many sellers or concentrated around a few dominant brands.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Describe the shape of this market in plain English: who appears to win, why customers may choose them, and what makes entry difficult.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "Is this market fragmented, competitive-but-enterable, or dominated? Give three pieces of evidence for your classification.",
          },
        ],
      },
      {
        night: 2,
        title: "Mine competitor reviews for customer problems",
        steps: [
          {
            kind: "watch",
            heading: "Watch / read",
            items: [
              "Read Amazon's own guidance on review highlights and recurring customer-review themes.",
              "Then manually inspect competitor reviews rather than relying on an automated summary alone.",
              "Pay particular attention to recurring complaints rather than isolated bad reviews.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Choose five of the strongest competitors from Night 1.",
              "Read a meaningful sample of 1–3 star reviews, plus recent 4–5 star reviews for context.",
              "Create a complaint log with four columns: problem, frequency, severity, and whether it appears realistically fixable.",
              "Group similar complaints into themes rather than copying individual reviews.",
              "Identify positive features customers repeatedly praise so you do not accidentally remove something the market already values.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain the difference between a customer complaint and a genuine product opportunity. A complaint matters only if it is recurring, important and realistically solvable.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "List the three strongest recurring customer problems you found. For each, state how often it appeared, why it matters, and whether you believe it can be fixed commercially.",
          },
        ],
      },
      {
        night: 3,
        title: "Turn complaints into differentiation",
        steps: [
          {
            kind: "watch",
            heading: "Watch / read",
            items: [
              "Watch the curated product-differentiation lesson covering practical ways to create meaningful customer value rather than merely changing colour, logo or packaging.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Take the strongest review themes from Night 2 and generate at least five possible improvements.",
              "Classify each improvement as product design, material/specification, bundle, packaging/instructions, or positioning.",
              "For each idea estimate whether it would increase landed cost, selling price, complexity or compliance risk.",
              "Reject cosmetic differences that do not solve a meaningful customer problem.",
              "Write one clear customer-facing proposition: 'For customers frustrated by X, this product does Y differently.'",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain why 'different' is not the same as 'better', and why a feature only matters if the customer values it enough to influence purchase.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State your strongest proposed differentiation in one sentence, the review evidence behind it, and what proof you would still need before investing.",
          },
        ],
      },
      {
        night: 4,
        title: "Validate the differentiation — or kill the idea",
        steps: [
          {
            kind: "watch",
            heading: "Read",
            items: [
              "Watch the curated product-validation workshop again, this time specifically testing the proposed differentiation.",
              "Remember the Week 2 rejection mindset: the goal is not to rescue an idea simply because time has already been spent researching it.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Stress-test the proposed differentiation against the ten competitors from Night 1.",
              "Check whether anyone already solves the same problem well.",
              "Ask whether a competitor could copy the improvement quickly and cheaply.",
              "Estimate whether the improvement is likely to support the current market price, require a premium, or destroy margin.",
              "Check for extra size, weight, manufacturing, intellectual-property or compliance risk introduced by the improvement.",
              "Give the candidate one verdict: SURVIVE, INVESTIGATE FURTHER, or REJECT.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Defend the verdict as if you were asking someone else to put their own cash into the product.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "Give the product a SURVIVE, INVESTIGATE FURTHER or REJECT verdict. State the strongest reason for the decision and the single biggest unresolved risk.",
          },
        ],
      },
    ],
    examPrompt:
      "Produce a one-page competitive opportunity brief for one Week 2 survivor. Include: the primary keyword, ten-competitor market view, price/review range, dominant brands, three recurring review themes, the strongest proposed differentiation, why customers should care, likely copyability, biggest commercial risk, and a final SURVIVE / INVESTIGATE FURTHER / REJECT recommendation.",
    passStandard:
      "The recommendation must be traceable to competitor and review evidence. A strong answer distinguishes recurring customer problems from isolated complaints, avoids cosmetic differentiation, identifies reasons the idea could fail, and is willing to recommend REJECT.",
  },
  {
    n: 4,
    slug: "week-4",
    title: "Unit economics and cash",
    goal: "Be able to kill a high-revenue idea because the economics are bad.",
    status: "live",
    lessons: [
      {
        night: 1,
        title: "Unit economics foundations",
        steps: [
          {
            kind: "watch",
            heading: "Watch",
            items: [
              "A Final Product Selection / Profitability walkthrough covering how experienced sellers stress-test a candidate's numbers before committing.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Recreate the unit-economics worksheet shown in the video in your own spreadsheet.",
              "Apply the same structure locally to one fictional candidate carried forward from the Week 2/3 simulation, using plausible case assumptions rather than best-case guesses.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain, in your own words, the difference between revenue, gross margin and contribution, and why a business can go bankrupt while still showing healthy revenue.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State your candidate's sale price, total landed and fee costs, and the resulting contribution per unit. Is it positive?",
          },
        ],
      },
      {
        night: 2,
        title: "Build a full product P&L",
        steps: [
          {
            kind: "watch",
            heading: "Watch / read",
            items: [
              "Re-read Amazon's own fee guidance (referral, FBA, storage) covered in Week 1, Night 3.",
              "Skim a landed-cost / product-profitability breakdown so you know every line item a full P&L should include.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Build a full product P&L, line by line, for your Night 1 candidate: ex-VAT sale price, manufacturing cost, packaging, freight, duty, Amazon referral and FBA fees, expected PPC spend per unit, returns allowance, contribution, and contribution margin (%).",
              "Repeat the same P&L for a second candidate so you can compare contribution margin, not just revenue, side by side.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain why two products with similar revenue can have very different contribution margins, and which line item in your own P&L you have the least confidence in.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State the contribution margin (%) for both candidates and which one you would prioritise on economics alone.",
          },
        ],
      },
      {
        night: 3,
        title: "Break-even and target ACoS",
        steps: [
          {
            kind: "watch",
            heading: "Watch / read",
            items: [
              "Read Amazon Ads' Sponsored Products best-practices guide for how ACoS and cost-per-order are defined and used.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Calculate your candidate's break-even CPA (contribution per unit before ad spend) and break-even ACoS (break-even CPA ÷ sale price).",
              "Set a target ACoS meaningfully below break-even, then calculate profit per unit at 0%, 15%, 25%, 35% and 45% ACoS.",
              "Tabulate profit per unit against ACoS so you can see the exact point at which the product stops being worth advertising.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain the difference between break-even ACoS and target ACoS, and why running PPC at break-even is not a viable long-term strategy.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State your candidate's break-even ACoS, your chosen target ACoS, and the resulting profit per unit.",
          },
        ],
      },
      {
        night: 4,
        title: "Cash conversion cycle",
        steps: [
          {
            kind: "watch",
            heading: "Read",
            items: [
              "Read the GOV.UK guidance on paying VAT and duties on imports, and the import-VAT guidance, so the cash timeline is grounded in real UK obligations rather than assumption.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Model a fictional cash-conversion case locally for your candidate: simulated MOQ 1,000 units, 30% deposit, 70% balance on completion, production period, freight period, Amazon goods-in delay, and an estimated sell-through rate. Do not pay or order anything.",
              "Draw the simulated cash timeline from notional deposit date to notional sell-through, marking the modelled point of maximum cash exposure.",
              "State how many weeks of negative cash the business must fund before that exposure is recovered.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain, in plain English, why a product that is profitable on paper can still fail if the cash-conversion cycle is longer than the funding available.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State the maximum cash exposure in £ and the number of weeks before that cash is recovered.",
          },
        ],
      },
    ],
    examPrompt:
      "You are given three fictional candidate products. Choose one, reject two, and defend the choice using contribution, contribution margin, break-even ACoS and cash exposure — not revenue.",
    passStandard:
      "The recommendation must be traceable to unit-economics and cash-timeline evidence. A strong answer is willing to reject the highest-revenue product if its contribution or cash profile is worse, and states the biggest unresolved cost assumption plainly.",
  },
  {
    n: 5,
    slug: "week-5",
    title: "Suppliers, sourcing, samples and negotiation",
    goal: "Understand that the cheapest quote is not necessarily the cheapest supplier.",
    status: "live",
    lessons: [
      {
        night: 1,
        title: "Find and screen suppliers",
        steps: [
          {
            kind: "watch",
            heading: "Watch",
            items: [
              "A sourcing walkthrough on finding and vetting suppliers in China and on Alibaba, including what separates an experienced Amazon supplier from a generalist trading company.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Using the fictional supplier profiles supplied with the exercise, shortlist 5–10 candidates. Treat simulated Verified, Gold Supplier and Trade Assurance signals as starting filters, not guarantees; do not browse for or contact real suppliers.",
              "Draft—but do not send—the same structured question set for every fictional supplier: MOQ, unit price at the target quantity, lead time, FBA prep capability (FNSKU labelling, poly bagging, carton labelling), and available compliance/test reports.",
              "Score the fictional replies locally on communication clarity, product knowledge, stated FBA prep ability, sample availability and price — do not let price alone decide who advances.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain why 'Verified' or 'Gold Supplier' badges reduce risk but do not replace your own screening, and what a vague or evasive answer to the FBA-prep question tells you.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "Name the top two fictional suppliers and state, with evidence from the supplied simulated replies, why each did or did not inspire confidence.",
          },
        ],
      },
      {
        night: 2,
        title: "Order and evaluate samples",
        steps: [
          {
            kind: "watch",
            heading: "Watch",
            items: [
              "A walkthrough of ordering paid product samples from an Alibaba supplier before committing to a production order.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Using only the fictional sample inspection reports and images supplied with the case, model sample and courier costs for the top 3–5 suppliers. Do not order or pay for samples.",
              "Compare the simulated samples side by side for build quality, material accuracy, packaging, finish and expected customer use; record where the evidence is insufficient for a real decision.",
              "Record which fictional sample(s) would fail the case's acceptance standard and why.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain why a supplier's sample can look better than what a full production run later delivers, and what you would put in writing with the supplier to reduce that risk.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State which fictional supplier's sample would advance in the simulation, the two strongest reasons, and the one unresolved quality risk.",
          },
        ],
      },
      {
        night: 3,
        title: "Negotiate price, MOQ and terms",
        steps: [
          {
            kind: "watch",
            heading: "Watch",
            items: [
              "A supplier-negotiation walkthrough covering how experienced buyers negotiate price, MOQ and payment terms with Alibaba suppliers.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Role-play locally from the supplied fictional opening quote: draft a specific counter-price and a possible middle position. Do not send it to a real supplier.",
              "Draft simulated requests covering a lower MOQ, split shipment, reorder price ladder, lead time and payment terms. Treat every figure as case data, not purchasing advice or authority to transact.",
              "Write down the fictional concessions and gains so each modelled trade-off is explicit.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain why a supplier can agree to a lower unit price and still leave you worse off overall, and which single term in your negotiation matters more to your cash position than price alone.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State the simulated final price, MOQ and payment terms produced by the role-play, and identify the one term the fictional supplier did not improve.",
          },
        ],
      },
      {
        night: 4,
        title: "Product safety, compliance and supplier risk before committing",
        steps: [
          {
            kind: "watch",
            heading: "Read",
            items: [
              "Read the GOV.UK guidance on placing UKCA or CE marked products on the market in Great Britain, so compliance is treated as a real legal obligation, not paperwork to defer.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Identify whether your candidate's product category falls under any UK product-safety marking regime, and if so, what documentation (technical file, Declaration of Conformity, test report) a compliant supplier should be able to provide.",
              "Draft—but do not send—a documentation request, then assess the fictional documents and response supplied with the case. Do not contact a supplier or place an order.",
              "List every reason the fictional evidence gives you to distrust this supplier, however small, rather than only listing reasons to proceed.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain, as the importer, why the legal responsibility for product safety and correct marking sits with you and not the supplier, and what that means for how much diligence is enough before committing real cash.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State whether this supplier can currently evidence compliance for your product category. If not, state whether you would still proceed, and why.",
          },
        ],
      },
    ],
    examPrompt:
      "Produce a one-page supplier decision brief for your chosen candidate: the shortlist and screening evidence, sample findings, final negotiated price/MOQ/terms, compliance documentation status, and a GO / HOLD / REJECT recommendation on this supplier specifically — not the product idea.",
    passStandard:
      "The recommendation must be traceable to supplier evidence, not price alone. A strong answer treats missing compliance documentation or evasive FBA-prep answers as a reason to hold or reject a supplier even at an attractive price, and states the biggest unresolved supplier risk plainly.",
  },
  {
    n: 6,
    slug: "week-6",
    title: "Freight, import VAT, duty and landed cost",
    goal: "Make landed cost real.",
    status: "live",
    lessons: [
      {
        night: 1,
        title: "Freight modes and Incoterms",
        steps: [
          {
            kind: "watch",
            heading: "Read",
            items: [
              "Read GOV.UK's step-by-step guide to importing goods into the UK, focusing on the shipping and customs sequence, not just the paperwork list.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Use the fictional sea- and air-freight quotes supplied with the Week 5 case; note simulated transit time, cost per unit and minimum volume. Do not request a real quote or create a shipment.",
              "Identify the Incoterm in the fictional quote (such as EXW, FOB or CIF) and list, line by line, which modelled costs and risks sit with buyer versus supplier.",
              "Compare the supplied alternative-Incoterm scenario with the original and calculate simulated total landed cost rather than relying on headline unit price.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain, in plain English, the point at which responsibility for the goods passes from supplier to you under your chosen Incoterm, and why an unfamiliar Incoterm is a reason to ask questions before shipping, not after.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State your chosen freight mode, the Incoterm you are shipping under, and the cost per unit that mode adds before duty or VAT.",
          },
        ],
      },
      {
        night: 2,
        title: "Commodity codes and duty",
        steps: [
          {
            kind: "watch",
            heading: "Read",
            items: [
              "Use GOV.UK's Trade Tariff tool to look up the commodity code and duty rate for your candidate product.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Find the correct commodity code for your product on the Trade Tariff tool — do not guess a nearby code because it looks close, since the wrong code can mean the wrong duty rate or a compliance problem later.",
              "Record the indicative duty rate found for the fictional product and calculate modelled duty on the case shipment (customs value × duty rate). Do not make a customs declaration.",
              "Check whether a trade agreement or preference rate could reduce that rate, and what evidence (e.g. certificate of origin) you would need to claim it.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain what 'customs value' means in this calculation and why it is not simply the price you pay your supplier per unit.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State the fictional product's commodity code, indicative duty rate, and modelled duty in £ on the case shipment quantity.",
          },
        ],
      },
      {
        night: 3,
        title: "Import VAT and the EORI number",
        steps: [
          {
            kind: "watch",
            heading: "Read",
            items: [
              "Read GOV.UK's guidance on paying VAT and duties on imports, and on VAT on imports, acquisitions and purchases from abroad.",
              "Read GOV.UK's guidance on getting an EORI number.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Using a fictional importer profile, explain whether the case provides an EORI number and what would happen to its simulated shipment without one. Do not apply for, inspect or change a real EORI/account.",
              "Calculate modelled import VAT on the fictional shipment (VAT rate × (customs value + duty)), and explain how postponed VAT accounting changes the simulated cash timing versus reclaim.",
              "State, in your own words, why import VAT is usually recoverable for a VAT-registered business but still matters as a cash-timing issue, not a real cost.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain the difference between duty (a real cost, not recoverable) and import VAT (a cash-timing issue for a VAT-registered business, usually recoverable), and why conflating the two leads to a wrong landed-cost figure.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State the modelled import VAT on the fictional shipment, whether the case treats it as a cost or cash-timing issue, and why.",
          },
        ],
      },
      {
        night: 4,
        title: "Build the full landed-cost model",
        steps: [
          {
            kind: "watch",
            heading: "Do",
            items: [
              "Combine the fictional case costs from Nights 1–3 into a local landed-cost-per-unit model: ex-works or FOB unit price, freight, duty, import VAT (flagged separately as cash timing, not cost), and simulated first-mile delivery into an Amazon fulfilment centre.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Recalculate the Week 4 simulation using the case's evidence-based landed cost instead of its opening estimate, and note how much modelled contribution per unit and contribution margin change.",
              "If the landed cost is materially worse than your Week 4 estimate, re-run the break-even ACoS and cash-exposure figures from Week 4 with the corrected number.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain which Week 4 case assumption changed most when the supplied freight, duty and VAT figures replaced it, and what that shows about estimating landed cost from guesswork alone.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State your corrected landed cost per unit and corrected contribution margin. Does the candidate still clear the bar you set in Week 4?",
          },
        ],
      },
    ],
    examPrompt:
      "Produce a local landed-cost reconciliation for the fictional candidate: the opening Week 4 estimate, this week's supplied freight/duty/VAT case figures, the corrected modelled landed cost and contribution margin, and a simulated GO / HOLD / REJECT recommendation. Do not book freight, file customs entries or transact.",
    passStandard:
      "The simulated recommendation must be traceable to the supplied freight, duty and VAT case figures, not the opening estimate. A strong answer clearly separates duty (a modelled cost) from import VAT (a modelled cash-timing issue), and is willing to move the fictional candidate from GO to HOLD or REJECT if corrected economics break the threshold.",
  },
  {
    n: 7,
    slug: "week-7",
    title: "Listing and conversion",
    goal: "Understand that PPC cannot rescue a product page customers do not want.",
    status: "live",
    lessons: [
      {
        night: 1,
        title: "Turn customer evidence into a listing brief",
        steps: [
          {
            kind: "watch",
            heading: "Read",
            items: [
              "Read Amazon's guidance on improving product detail pages, focusing on how accurate titles, images, bullets and descriptions help customers make a purchase decision.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Return to the recurring review problems and customer language you captured in Week 3. Group the evidence into customer jobs, objections, desired outcomes and proof required.",
              "Write a one-page listing brief for your candidate: target customer, primary use case, three evidence-backed benefits, three objections the page must answer, and every factual claim that still needs proof.",
              "Mark assumptions explicitly. Do not turn a supplier promise or an isolated review comment into a product claim.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain why a listing brief should begin with customer evidence rather than keywords or clever copy, and identify the weakest claim in your own brief.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "State the primary customer job, the strongest evidenced benefit, and one claim you removed because you could not substantiate it.",
          },
        ],
      },
      {
        night: 2,
        title: "Draft discoverable, accurate listing copy",
        steps: [
          {
            kind: "watch",
            heading: "Read",
            items: [
              "Use Amazon UK's product-detail-page overview and Amazon Ads' detail-page guide to review the purpose of titles, bullet points, descriptions and search terms.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "In a local document only, draft a concise title that identifies the product accurately before adding differentiating detail. Check the current category style guide before any eventual publication.",
              "Draft five scannable bullet points. Lead with the customer-relevant benefit, support it with a factual feature, and include dimensions, compatibility, contents or limitations wherever they prevent a mistaken purchase.",
              "Create a keyword map that assigns one primary search intent to the title and distributes genuinely relevant secondary terms across bullets, description and a separate backend-search-term draft without repetition or keyword stuffing.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain the difference between discoverability and conversion, and why adding a high-volume but weakly relevant keyword can damage the quality of traffic reaching the page.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "Paste your draft title and strongest bullet, then name the customer objection that bullet resolves.",
          },
        ],
      },
      {
        night: 3,
        title: "Design an image sequence that answers objections",
        steps: [
          {
            kind: "watch",
            heading: "Read",
            items: [
              "Re-read Amazon's image guidance, including the role of a compliant main image, multiple high-quality views and images that demonstrate use and important details.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Create a seven-frame image storyboard in a local document: compliant main image, scale/contents, primary benefit, use case, differentiator, objection handling, and care or compatibility information.",
              "For every frame, specify the single question it answers, the visual proof required, and any text overlay. Do not invent certifications, test results, endorsements or performance claims.",
              "Review the storyboard at mobile size. Remove any frame whose message depends on unreadably small text or whose purpose duplicates another frame.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain why a visually polished image can still fail to convert, and which customer uncertainty your sequence resolves earliest.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "List your seven image frames in order and state which review-derived objection frames 2–4 each answer.",
          },
        ],
      },
      {
        night: 4,
        title: "Run a pre-PPC conversion audit",
        steps: [
          {
            kind: "watch",
            heading: "Read",
            items: [
              "Read Amazon Ads' campaign-diagnostics guidance on high clicks with few orders, then treat the product detail page as a possible root cause before changing traffic or bids.",
            ],
          },
          {
            kind: "do",
            heading: "Do",
            items: [
              "Audit your draft as a first-time shopper: can you identify the product, fit, contents, primary benefit, material or dimensions, limitations and reason to trust the claims without filling gaps from your own knowledge?",
              "Ask one uninvolved person to review the local draft only and write down their first unanswered question, strongest hesitation and expected price range. Do not publish the draft or edit a live Amazon listing.",
              "Revise the draft once using the audit evidence. Create a pre-PPC gate with PASS / HOLD for relevance, claim substantiation, mobile clarity, objection coverage and offer economics.",
            ],
          },
          {
            kind: "explain",
            heading: "Explain back",
            items: [
              "Explain why buying more traffic before resolving a weak detail page can produce worse ACoS without teaching you whether demand is genuinely absent.",
            ],
          },
          {
            kind: "checkpoint",
            heading: "Checkpoint",
            items: [],
            checkpointPrompt:
              "Give your draft a PASS or HOLD for pre-PPC readiness, cite the three strongest pieces of evidence, and name the largest unresolved conversion risk.",
          },
        ],
      },
    ],
    examPrompt:
      "Submit a training-only listing pack for your candidate: evidence brief, title, five bullets, keyword map, seven-frame image storyboard and pre-PPC audit. Finish with READY TO TEST / HOLD / REJECT and defend the decision using customer evidence and claim substantiation, not aesthetics.",
    passStandard:
      "The pack must trace benefits and objections back to evidence, distinguish search relevance from conversion, and avoid unsupported claims. A strong answer is clear on mobile, answers material purchase questions, and is willing to HOLD a polished draft when proof or customer clarity is missing.",
  },
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
 * Weeks 8–12 are "planned" (no `lessons` array yet) and are naturally
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
