import type { SegmentId } from "./types"

export const WORKSHOP_TITLE = "IDA Product Strategy Workshop"
export const WORKSHOP_SUBTITLE = "60-minute core team alignment"

/**
 * The source documents were written for a March 2026 workshop with a July
 * 2026 launch. Dates are rebased from today (8 Sep 2026): specs late Sep,
 * build Oct–Nov, QA/beta Dec, launch date decided by the team in Segment 4.
 */
export const WORKSHOP_DATE = "8 Sep 2026"
export const REVIEW_DATE = "8 Oct 2026"

export const SEGMENTS: {
  id: SegmentId
  minutes: number
  title: string
  question: string
  outcome: string
  script: string
}[] = [
  {
    id: 1,
    minutes: 5,
    title: "Context setting",
    question: "What's ONE thing our sellers are frustrated with RIGHT NOW?",
    outcome: "Shared problem agreement, not abstract theory",
    script:
      "We have 60 minutes to answer three questions and leave here aligned. We'll make decisions, not debate. Everyone here knows something the others don't — design knows user friction, finance knows constraints, comms knows market signals, strategy knows competitive moves. We need all of you. Our job: define what IDA is building in the next 6 months and WHY — not perfectly, but clearly enough to execute.",
  },
  {
    id: 2,
    minutes: 8,
    title: "AI opportunity map",
    question: "In an AI-driven marketplace, where do we WIN vs. compete?",
    outcome: "Clear picture of where AI fits in IDA's differentiation",
    script:
      "Two minutes of parallel thinking by role, then we synthesize onto the board: what AI solves for sellers, for buyers, and for IDA.",
  },
  {
    id: 3,
    minutes: 12,
    title: "MVP definition",
    question:
      "What's the MINIMUM viable product for the Italia launch vs. the later U.S. launch?",
    outcome:
      "Written Tier 1 list everyone agrees to (or disagrees specifically on)",
    script:
      "Three tiers. Tier 1 must include exactly one AI feature — pick ONE. Then each role asks its challenge question. Ask: can we launch with this? YES / NO.",
  },
  {
    id: 4,
    minutes: 15,
    title: "Timeline & dependencies",
    question: "What's the realistic timeline? What blocks us?",
    outcome: "Everyone knows their piece, sees dependencies, knows what blocks us",
    script:
      "Build the timeline together, month by month. Launch date stays blank until the team writes it. Blockers are typically payments, legal, API integrations, or fundraising timing — not design or engineering. Most likely 12–16 weeks from today to first real users.",
  },
  {
    id: 5,
    minutes: 15,
    title: "Decisions & commitments",
    question: "Do we agree on this plan, or do we need to pivot?",
    outcome: "Written, signed agreement everyone owns",
    script:
      "I will ask each person: do you sign up for this? What's your blocker if not? We leave with written statements, not vibes.",
  },
  {
    id: 6,
    minutes: 5,
    title: "30-day sprint plan",
    question: "What happens in the next 30 days?",
    outcome: `Everyone knows what success looks like by ${REVIEW_DATE}`,
    script:
      "Rapid-fire. One minute per owner. What do you deliver in the next 30 days?",
  },
]

export const CLOSING_SCRIPT =
  "Here's what we agreed. Everyone owns a piece. If your piece falls behind, raise it immediately — don't wait three weeks. I'll send the summary email within 24 hours."

/** Segment 2 role prompts (from the agenda). */
export const AI_PROMPTS = {
  design: {
    label: "Design — “AI can solve friction in…”",
    example: "Auto-verify products; smart seller onboarding; smart search",
  },
  finance: {
    label: "Finance — “AI features investors will fund & we can monetize…”",
    example:
      "Premium verification badge; AI recommendations; the metrics that anchor the seed narrative",
  },
  comms: {
    label: "Communications — “AI stories that resonate with the market…”",
    example:
      "“Trust through tech”; “Verification that works”; “Sellers get an AI assistant”",
  },
  strategy: {
    label: "Strategy — “Competitors doing AI right now…”",
    example:
      "Etsy (search), Amazon (recommendations), other marketplaces (verification)",
  },
}

/** Segment 3 tier descriptions + starter examples (from the agenda). */
export const TIERS = {
  tier1: {
    title: "Tier 1 · Must have",
    subtitle: "Italia MVP",
    examples: [
      "Core marketplace (sellers, buyers, transactions)",
      "One AI feature (pick ONE)",
      "VerificationBadge (RINA partnership)",
      "Basic search",
    ],
  },
  tier2: {
    title: "Tier 2 · Should have",
    subtitle: "Italia follow-on + U.S. launch",
    examples: [
      "Recommendation engine",
      "Seller dashboard analytics",
      "Chat with basic translation",
      "Mobile optimization",
    ],
  },
  tier3: {
    title: "Tier 3 · Nice to have",
    subtitle: "Post-launch — deprioritize or postpone",
    examples: ["Advanced AI prediction", "API marketplace", "White-label"],
  },
}

/** Segment 3 challenge questions (from the agenda). */
export const MVP_CHALLENGES = [
  {
    role: "Design",
    question:
      "Which Tier 1 feature takes longest to design? What's the blocker?",
  },
  {
    role: "Finance",
    question:
      "What does Tier 1 cost in runway, and what must the seed round cover?",
  },
  {
    role: "Communications",
    question: "What story are we telling for the Tier 1 launch?",
  },
  {
    role: "Strategy",
    question: "Does Tier 1 differentiate us from Etsy, Amazon, competitors?",
  },
]

/** Critical path note (from the agenda). */
export const CRITICAL_PATH =
  "Usually: Design specs → Engineering build → Finance compliance → Launch. Blockers are typically payments, legal, or API integrations."

export const BLOCKER_PLACEHOLDERS = [
  { blocker: "Payment processor contract", owner: "Finance" },
  { blocker: "RINA API access", owner: "Leadership / Legal" },
  { blocker: "Seed round timing (runway gate)", owner: "Leadership / Finance" },
]

/** Google Docs template formatting conventions. */
export const DOC_CONVENTIONS = [
  "Use BOLD for decisions that stick",
  "Use [BLOCKER] for items that stop progress",
  "Use [TBD] for items still being decided",
  "Use ✓ to mark decisions as final",
]

/** Who fills in each segment (from the setup guide). */
export const WHO_FILLS_IN: { segment: string; task: string; who: string }[] = [
  { segment: "1 (5 min)", task: "Shared problems", who: "Note-taker" },
  { segment: "2 (8 min)", task: "AI map by role", who: "Each role fills own row" },
  { segment: "3 (12 min)", task: "MVP tiers", who: "Note-taker + Design lead" },
  { segment: "4 (15 min)", task: "Timeline + blockers", who: "Note-taker + owners" },
  { segment: "5 (15 min)", task: "Owner commitments", who: "Each owner fills own row" },
  { segment: "6 (5 min)", task: "30-day sprint", who: "Note-taker" },
]

/** Workshop roles (from the setup guide). */
export const SESSION_ROLES = [
  {
    role: "Facilitator (Florentin)",
    duty: "Move conversation, watch time, ensure all voices heard, synthesize",
  },
  {
    role: "Note-taker",
    duty: "Fill in answers as the group speaks (can rotate per segment)",
  },
  {
    role: "Timekeeper (optional)",
    duty: "Announce when 3 minutes remain in each segment",
  },
  {
    role: "Everyone else",
    duty: "Contribute your expertise, debate briefly, reach decisions",
  },
]

/** Facilitation tips (from the setup guide). */
export const FACILITATION_TIPS: { title: string; items: string[] }[] = [
  {
    title: "Keep time aggressive",
    items: [
      "Use the built-in timer — soft alert at the 3-minute mark: “3 minutes left in this segment”",
      "Hard stop at 0 — move to the next segment regardless",
    ],
  },
  {
    title: "Manage conversation",
    items: [
      "First round: everyone speaks once on the question",
      "Second round: only if there's real disagreement",
      "No third round: facilitator decides (don't debate forever)",
      "Write while talking — visible decisions stop people repeating",
    ],
  },
  {
    title: "Get decisions, not consensus",
    items: [
      "“Do we agree on this list?” → look for nods",
      "“Any hard no's?” → look for raised hands",
      "“Finance: is this timeline realistic?” → direct question to the owner",
      "Silence = agreement (after you ask three times)",
    ],
  },
  {
    title: "Handle disagreement",
    items: [
      "“Design says 12 weeks, Engineering says 8. Design, what's the risk if we do 8?” → listen",
      "“Engineering, can you do 10 with one more dev?” → gets to the real blocker",
      "Escalate to the next owner — don't solve it in the room",
    ],
  },
  {
    title: "Call out blockers early",
    items: [
      "If Finance can't have the data room ready by date X, surface it now",
      "“Blocker: the raise needs 6 weeks and gates hiring. Can leadership start investor intros today?” → forces action",
      "Never let a blocker hide until Week 6",
    ],
  },
]

/** What to bring (from the setup guide). */
export const WHAT_TO_BRING = {
  physical: [
    "Whiteboard + markers (backup note-taking if WiFi dies)",
    "Printed agenda one-pager",
    "Sticky notes (for the Segment 1 poll, if doing a physical version)",
  ],
  digital: [
    "Laptop with this board open",
    "One machine on the projector / screen share (canonical board)",
    "Headphones for anyone remote",
    "Charger — a 90-minute room kills laptops",
  ],
  before: [
    "Coffee / water in the room",
    "Silence Slack and email",
    "Tell your team: no interruptions for 60 minutes",
  ],
}

/** Prep checklists (from the agenda). */
export const PREP_FACILITATOR = [
  "Timer ready (this page)",
  "Password shared with the team — not the public internet",
  "Everyone has the URL open on their laptop",
  "Email template ready (send summary within 24 hours)",
]

export const PREP_PARTICIPANTS = [
  "“60 minutes — we lock product direction and timeline”",
  "“Bring your department's constraints (budget, timeline, capability)”",
  "“We'll leave with written decisions everyone agrees to”",
]

/** What makes it work / what kills it (from the agenda). */
export const SUCCESS_FACTORS = [
  "Timeboxed aggressively (no tangents)",
  "Everyone talks (not one person dominating)",
  "Write as you go (visible decisions, not vague agreement)",
  "Specific outputs (features, dates, owners — not “we'll figure it out”)",
  "Roles are clear (design talks design, finance talks finance)",
  "Facilitator moves it (keeps time, synthesizes, prevents debate loops)",
  "Leadership asks questions and trusts domain owners",
]

export const KILLERS = [
  "A single voice dominates without listening",
  "One person long-winded",
  "No decisions (just “let's explore options”)",
  "Vague outcomes (“we'll figure it out”)",
  "Missing someone (finance decides budget, design decides timeline)",
  "No written agreement after",
]

/** Do / don't (from the setup guide). */
export const DO_THIS = [
  "Lock features (no new asks during build)",
  "Lock timeline (dates don't move unless a blocker resolves)",
  "Lock owners (same person drives each piece)",
  "Check in weekly (don't wait for monthly reviews)",
  "Escalate blockers fast (day 1, not week 6)",
]

export const DONT_DO_THIS = [
  "Vague timelines (“sometime in May”)",
  "Changing owners mid-sprint (“John is now on it”)",
  "Adding features during build (“just one more thing”)",
  "Hoping blockers resolve (“payment will figure itself out”)",
  "Waiting for monthly review to surface issues",
]

/** After-workshop cadence (from the setup guide). */
export const AFTER_WORKSHOP = [
  "Florentin reviews the board for completeness",
  "Copy decisions into the summary email (Export tab) and send within 24 hours",
  `Everyone replies: “Confirmed — I own [my piece]”`,
  "Lock the record (view-only) and export a PDF to the shared drive",
  "Weekly 15-min standups until launch",
  `30-day review on ${REVIEW_DATE}: on track or pivoting?`,
  "Monthly 1-hour reviews (1st Friday of each month)",
]

export const STANDUP_FORMAT = [
  "Design: “Wireframes __% done — on track?”",
  "Engineering: “Dev env ready? Blocker: [if any]”",
  "Finance: “Runway holding? Data room progress?”",
  "Communications: “Story locked? Need anything from product?”",
  "Leadership: “Investor meetings booked? Term sheet progress? RINA API confirmed?”",
  "One sentence per person. Stop.",
]

export const ESCALATION_RULE =
  "If anyone is off track at the 30-day review, hold an emergency 30-minute sync with leadership and that owner."

/** Post-workshop checklist items (from the template). */
export const CHECKLIST_ITEMS: { id: string; label: string }[] = [
  { id: "email", label: "Summary email sent to team (within 24 hours)" },
  { id: "replies", label: "Everyone replied: “Confirmed — I own [my piece]”" },
  {
    id: "calendar",
    label: "Calendar blocks booked (weekly 15-min standups, monthly reviews)",
  },
  { id: "lock", label: "Record locked (view-only) and PDF exported" },
  { id: "review", label: `30-day review scheduled (${REVIEW_DATE})` },
]

/** If the workshop runs long (from the agenda). */
export const OVERTIME_NOTE =
  "If the workshop goes over time, cut Segment 4 or 5 to hit the 1-hour hard stop. Everything else is higher priority."

export function holidayRisk(launchDate: string): boolean {
  const t = launchDate.toLowerCase()
  return /dec(ember)?|christmas|new\s*year|natale|capodanno|2026-12/.test(t)
}
