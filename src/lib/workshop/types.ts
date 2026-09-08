export const WORKSHOP_STORAGE_KEY = "ida-workshop-v2"

export type View = "board" | "guide" | "export"

export const SEGMENT_IDS = [1, 2, 3, 4, 5, 6] as const
export type SegmentId = (typeof SEGMENT_IDS)[number]

export type ListItem = { id: string; text: string }

export type Participant = { id: string; name: string; role: string }

/** Tier feature with the template's agreement checkbox. */
export type TierItem = { id: string; text: string; agreed: boolean }

export type MonthRow = {
  id: string
  label: string
  early: string // Week 1–2
  late: string // Week 3–4
  blocker: string
}

export type BlockerRow = {
  id: string
  blocker: string
  owner: string
  deadline: string
  status: string
}

export type AgreementRow = {
  id: string
  what: string
  hint: string
  current: string
  change: string
  ownedBy: string
}

export type OwnerRow = {
  id: string
  role: string
  name: string
  commitment: string
  blocker: string
}

export type SignOffAnswer = "" | "yes" | "no" | "conditions"

export type SignOff = {
  id: string
  role: string
  answer: SignOffAnswer
  conditions: string
}

export type SprintRow = {
  id: string
  role: string
  owns: string
  due: string
  deliverable: string
}

export type WorkshopState = {
  version: 3
  view: View
  meta: {
    date: string
    facilitator: string
  }
  participants: Participant[]
  completed: Record<SegmentId, boolean>

  // Segment 1 — Context setting
  stickies: ListItem[]
  themes: string

  // Segment 2 — AI opportunity map
  ai: {
    design: string
    finance: string
    comms: string
    strategy: string
    sellers: string
    buyers: string
    ida: string
  }

  // Segment 3 — MVP definition
  tier1: TierItem[]
  tier1Ready: "" | "yes" | "no"
  tier1DesignOwner: string
  tier1EngWeeks: string
  tier2: ListItem[]
  tier2Timeline: string
  tier3: ListItem[]

  // Segment 4 — Timeline & dependencies
  months: MonthRow[]
  launch: { date: string; sellers: string; revenue: string }
  criticalBlockers: BlockerRow[]
  redFlags: string

  // Segment 5 — Decisions & commitments
  agreements: AgreementRow[]
  owners: OwnerRow[]
  signOffs: SignOff[]

  // Segment 6 — 30-day sprint plan
  sprint: SprintRow[]
  metrics: {
    sellers: string
    mrr: string
    retention: string
    uptime: string
    mentions: string
  }

  // Workshop outcomes
  outcomes: {
    decisions: string
    ownership: string
    blockers: string
    nextUpdate: string
  }
  parkingLot: string
  checklist: Record<string, boolean>
}
