import { WORKSHOP_DATE } from "./content"
import {
  SEGMENT_IDS,
  type Participant,
  type SegmentId,
  type WorkshopState,
} from "./types"

export function uid(prefix = "id"): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

const OWNER_ROLES: { role: string; commitmentHint: string }[] = [
  { role: "Design Lead", commitmentHint: "Wireframes by…" },
  { role: "Engineering Lead", commitmentHint: "Build ready by…" },
  { role: "Finance", commitmentHint: "Contracts by…" },
  { role: "Communications", commitmentHint: "Story locked by…" },
  { role: "Strategy", commitmentHint: "Roadmap validated: yes/no" },
  { role: "CEO", commitmentHint: "Budget approved: yes/no" },
]

/** 30-day sprint rows, dates rebased from 8 Sep 2026. */
const SPRINT_ROWS: { role: string; owns: string; due: string }[] = [
  { role: "Strategy", owns: "Finalize Tier 1 spec doc", due: "8 Oct 2026" },
  { role: "Design", owns: "Wireframe all Tier 1 screens", due: "18 Oct 2026" },
  { role: "Engineering", owns: "Architecture review, setup", due: "8 Oct 2026" },
  { role: "Finance", owns: "Contracts & budget", due: "22 Sep 2026" },
  { role: "Communications", owns: "Launch narrative", due: "8 Oct 2026" },
  { role: "CEO", owns: "Budget approval", due: "22 Sep 2026" },
]

const MONTHS: { id: string; label: string }[] = [
  { id: "sep", label: "September 2026" },
  { id: "oct", label: "October 2026" },
  { id: "nov", label: "November 2026" },
  { id: "dec", label: "December 2026" },
]

/** Roster from the workshop docs (Engineering added per the Segment 4 table). */
const DEFAULT_PARTICIPANTS: { name: string; role: string }[] = [
  { name: "Florentin", role: "Facilitator" },
  { name: "Daniel", role: "CEO" },
  { name: "", role: "Design Lead" },
  { name: "", role: "Strategy/Product" },
  { name: "", role: "Communications" },
  { name: "", role: "Finance" },
  { name: "", role: "Engineering" },
]

export function createEmptyState(): WorkshopState {
  return {
    version: 3,
    view: "board",
    meta: {
      date: WORKSHOP_DATE,
      facilitator: "Florentin",
    },
    participants: DEFAULT_PARTICIPANTS.map((entry) => ({
      id: uid("participant"),
      ...entry,
    })),
    completed: Object.fromEntries(
      SEGMENT_IDS.map((id) => [id, false])
    ) as Record<SegmentId, boolean>,

    stickies: [],
    themes: "",

    ai: {
      design: "",
      finance: "",
      comms: "",
      strategy: "",
      sellers: "",
      buyers: "",
      ida: "",
    },

    tier1: [],
    tier1Ready: "",
    tier1DesignOwner: "",
    tier1EngWeeks: "",
    tier2: [],
    tier2Timeline: "",
    tier3: [],

    months: MONTHS.map((month) => ({
      ...month,
      early: "",
      late: "",
      blocker: "",
    })),
    launch: { date: "", sellers: "", revenue: "" },
    criticalBlockers: [
      { id: "b1", blocker: "", owner: "", deadline: "", status: "" },
      { id: "b2", blocker: "", owner: "", deadline: "", status: "" },
      { id: "b3", blocker: "", owner: "", deadline: "", status: "" },
    ],
    redFlags: "",

    agreements: [
      {
        id: "features",
        what: "Tier 1 features",
        hint: "List from Segment 3",
        current: "",
        change: "",
        ownedBy: "Design + Strategy",
      },
      {
        id: "timeline",
        what: "Timeline",
        hint: "Realistic or too aggressive?",
        current: "",
        change: "",
        ownedBy: "Engineering + Finance",
      },
      {
        id: "launch",
        what: "MVP launch date",
        hint: "Target or aspirational?",
        current: "",
        change: "",
        ownedBy: "CEO",
      },
      {
        id: "budget",
        what: "Budget required",
        hint: "Available or fundraising needed?",
        current: "",
        change: "",
        ownedBy: "Finance + CEO",
      },
      {
        id: "ai",
        what: "AI strategy",
        hint: "Right bets or pivot?",
        current: "",
        change: "",
        ownedBy: "Strategy + Communications",
      },
    ],
    owners: OWNER_ROLES.map(({ role, commitmentHint }) => ({
      id: role.toLowerCase().replace(/[^a-z]+/g, "-"),
      role,
      name: "",
      commitment: "",
      blocker: "",
      // hint carried via placeholder in the UI
      commitmentHint,
    })).map(({ commitmentHint: _hint, ...row }) => row),

    signOffs: OWNER_ROLES.map(({ role }) => ({
      id: role.toLowerCase().replace(/[^a-z]+/g, "-"),
      role,
      answer: "" as const,
      conditions: "",
    })),

    sprint: SPRINT_ROWS.map((row) => ({
      id: row.role.toLowerCase(),
      ...row,
      deliverable: "",
    })),
    metrics: { sellers: "", mrr: "", retention: "", uptime: "", mentions: "" },

    outcomes: { decisions: "", ownership: "", blockers: "", nextUpdate: "" },
    parkingLot: "",
    checklist: {},
  }
}

/** v2 boards stored participants as one free-text string in meta. */
function migrateParticipants(raw: Record<string, unknown>): Participant[] | null {
  const direct = raw.participants
  if (Array.isArray(direct)) return direct as Participant[]
  const meta = raw.meta as { participants?: unknown } | undefined
  const legacy = meta?.participants
  if (typeof legacy === "string" && legacy.trim()) {
    return legacy.split(",").map((token) => {
      const match = token.trim().match(/^(.+?)\s*\((.+)\)$/)
      return match
        ? { id: uid("participant"), role: match[1], name: match[2] }
        : { id: uid("participant"), role: token.trim(), name: "" }
    })
  }
  return null
}

export function mergeWorkshopState(raw: unknown): WorkshopState {
  const empty = createEmptyState()
  if (!raw || typeof raw !== "object") return empty
  const parsed = raw as Partial<WorkshopState>
  const version = (parsed as { version?: number }).version
  if (version !== 2 && version !== 3) return empty

  return {
    ...empty,
    ...parsed,
    version: 3,
    meta: {
      date:
        (parsed.meta as { date?: string } | undefined)?.date ?? empty.meta.date,
      facilitator:
        (parsed.meta as { facilitator?: string } | undefined)?.facilitator ??
        empty.meta.facilitator,
    },
    participants:
      migrateParticipants(parsed as Record<string, unknown>) ??
      empty.participants,
    completed: { ...empty.completed, ...parsed.completed },
    ai: { ...empty.ai, ...parsed.ai },
    launch: { ...empty.launch, ...parsed.launch },
    metrics: { ...empty.metrics, ...parsed.metrics },
    outcomes: { ...empty.outcomes, ...parsed.outcomes },
    checklist: { ...parsed.checklist },
    stickies: parsed.stickies ?? empty.stickies,
    tier1: parsed.tier1 ?? empty.tier1,
    tier2: parsed.tier2 ?? empty.tier2,
    tier3: parsed.tier3 ?? empty.tier3,
    months:
      parsed.months && parsed.months.length ? parsed.months : empty.months,
    criticalBlockers:
      parsed.criticalBlockers && parsed.criticalBlockers.length
        ? parsed.criticalBlockers
        : empty.criticalBlockers,
    agreements:
      parsed.agreements && parsed.agreements.length
        ? parsed.agreements
        : empty.agreements,
    owners: parsed.owners && parsed.owners.length ? parsed.owners : empty.owners,
    signOffs:
      parsed.signOffs && parsed.signOffs.length
        ? parsed.signOffs
        : empty.signOffs,
    sprint: parsed.sprint && parsed.sprint.length ? parsed.sprint : empty.sprint,
    view:
      parsed.view === "guide" || parsed.view === "export"
        ? parsed.view
        : "board",
  }
}
