export type GlossaryTerm = {
  term: string;
  definition: string;
};

export const glossary: GlossaryTerm[] = [
  { term: "FBA", definition: "Fulfilment by Amazon — Amazon stores, picks, packs, ships and handles customer service for a seller's stock." },
  { term: "FBM", definition: "Fulfilled by Merchant — the seller stores and ships stock directly, without using Amazon's fulfilment network." },
  { term: "ACoS", definition: "Advertising Cost of Sale — ad spend ÷ ad-attributed sales, expressed as a percentage." },
  { term: "ROAS", definition: "Return on Ad Spend — ad-attributed sales ÷ ad spend. The inverse relationship of ACoS." },
  { term: "CPA", definition: "Cost Per Acquisition — total cost to acquire one paying order via advertising." },
  { term: "CPC", definition: "Cost Per Click — the amount paid each time a shopper clicks a sponsored ad." },
  { term: "Contribution", definition: "Revenue left after variable costs (COGS, Amazon fees, PPC, returns) — what's actually available to cover overhead and profit." },
  { term: "Contribution margin", definition: "Contribution expressed as a percentage of revenue." },
  { term: "Break-even ACoS", definition: "The ACoS at which advertising exactly consumes the contribution available per order — beyond this, each ad-driven order loses money." },
  { term: "MOQ", definition: "Minimum Order Quantity — the smallest quantity a supplier will manufacture per order." },
  { term: "Landed cost", definition: "The full cost of a unit once it is available for sale: manufacturing + packaging + freight + duty + import VAT, before Amazon fees." },
  { term: "Cash-conversion cycle", definition: "The time between paying a supplier and recovering that cash from sold, settled inventory." },
  { term: "EORI", definition: "Economic Operators Registration and Identification number — required to import goods into the UK/EU." },
  { term: "Days cover", definition: "Current sellable stock ÷ average daily sales velocity — how many days of stock remain at current pace." },
  { term: "Safety stock", definition: "Extra stock held above expected demand to absorb demand or lead-time variability without stocking out." },
  { term: "Review moat", definition: "A competitive barrier created by an incumbent's large volume of reviews and high rating, which is hard for a new entrant to overcome quickly." },
  { term: "Hard-stop gate", definition: "A rejection condition that overrides an otherwise attractive score — see the 100-point Candidate Scorecard." },
  { term: "Incoterm (EXW / FOB / CIF / DDP)", definition: "Standard international trade terms defining which party bears cost/risk at each stage of shipping." },
];
