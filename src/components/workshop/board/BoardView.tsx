"use client"

import { Button } from "@/components/ui/Button"
import { SEGMENTS, OVERTIME_NOTE } from "@/lib/workshop/content"
import { uid } from "@/lib/workshop/state"
import type { Participant } from "@/lib/workshop/types"
import { cn } from "@/lib/utils"
import { Check, Plus, X } from "lucide-react"
import { Input, Surface } from "../fields"
import { useWorkshop } from "../WorkshopProvider"
import { Outcomes } from "./Outcomes"
import { Segment1Context } from "./Segment1Context"
import { Segment2AiMap } from "./Segment2AiMap"
import { Segment3Mvp } from "./Segment3Mvp"
import { Segment4Timeline } from "./Segment4Timeline"
import { Segment5Commit } from "./Segment5Commit"
import { Segment6Sprint } from "./Segment6Sprint"

const SEGMENT_BODIES = {
  1: Segment1Context,
  2: Segment2AiMap,
  3: Segment3Mvp,
  4: Segment4Timeline,
  5: Segment5Commit,
  6: Segment6Sprint,
} as const

export function BoardView() {
  const { state, setState } = useWorkshop()

  const setMeta = (key: keyof typeof state.meta, value: string) => {
    setState((current) => ({
      ...current,
      meta: { ...current.meta, [key]: value },
    }))
  }

  const setParticipant = (id: string, patch: Partial<Participant>) =>
    setState((current) => ({
      ...current,
      participants: current.participants.map((row) =>
        row.id === id ? { ...row, ...patch } : row
      ),
    }))

  const addParticipant = () =>
    setState((current) => ({
      ...current,
      participants: [
        ...current.participants,
        { id: uid("participant"), name: "", role: "" },
      ],
    }))

  const removeParticipant = (id: string) =>
    setState((current) => ({
      ...current,
      participants: current.participants.filter((row) => row.id !== id),
    }))

  return (
    <div className="flex flex-col gap-5">
      {/* Session header — from the Google Docs template */}
      <Surface>
        <h1 className="heading-md font-display text-ink mb-1">
          Real-time decision board
        </h1>
        <p className="text-sm text-muted mb-4">
          Fill in as the group speaks. Notes stay in this browser — put one
          machine on the projector as the canonical board.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl">
          <Input
            label="Date"
            value={state.meta.date}
            onChange={(value) => setMeta("date", value)}
          />
          <Input
            label="Facilitator"
            value={state.meta.facilitator}
            onChange={(value) => setMeta("facilitator", value)}
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="label-md text-ink">
              Participants{" "}
              <span className="text-muted font-normal">
                ({state.participants.length})
              </span>
            </p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addParticipant}
            >
              <Plus className="h-4 w-4" />
              Add participant
            </Button>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {state.participants.map((participant) => (
              <li
                key={participant.id}
                className="flex items-center gap-2 rounded-sm border bg-sunken p-2"
              >
                <Input
                  value={participant.role}
                  onChange={(value) =>
                    setParticipant(participant.id, { role: value })
                  }
                  placeholder="Role (e.g. Legal)"
                  aria-label="Participant role"
                />
                <Input
                  value={participant.name}
                  onChange={(value) =>
                    setParticipant(participant.id, { name: value })
                  }
                  placeholder="Name"
                  aria-label="Participant name"
                />
                <button
                  type="button"
                  onClick={() => removeParticipant(participant.id)}
                  className="text-muted hover:text-ink shrink-0"
                  aria-label={`Remove ${participant.role || "participant"}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted mt-2">
            Everyone contributes their expertise — if a department is in the
            room, add its row to the owner and sign-off tables in Segment 5 too.
          </p>
        </div>
      </Surface>

      {/* Segment jump nav */}
      <nav
        className="sticky top-[104px] z-10 flex gap-2 overflow-x-auto py-1 -my-1"
        aria-label="Segments"
      >
        {SEGMENTS.map((segment) => (
          <a
            key={segment.id}
            href={`#segment-${segment.id}`}
            className={cn(
              "shrink-0 rounded-sm px-3 py-1.5 text-sm border bg-surface shadow-soft",
              "hover:border-action hover:text-action",
              state.completed[segment.id] &&
                "border-action/50 text-action bg-action-soft"
            )}
          >
            {state.completed[segment.id] ? (
              <Check className="h-3.5 w-3.5 inline -mt-0.5 mr-1" />
            ) : null}
            <span className="tabular-nums">{segment.id}</span> {segment.title}
            <span className="text-xs opacity-70 ml-1">{segment.minutes}m</span>
          </a>
        ))}
        <a
          href="#outcomes"
          className="shrink-0 rounded-sm px-3 py-1.5 text-sm border bg-surface shadow-soft hover:border-action hover:text-action"
        >
          Outcomes
        </a>
      </nav>

      {SEGMENTS.map((segment) => {
        const Body = SEGMENT_BODIES[segment.id]
        return (
          <SegmentCard key={segment.id} id={segment.id}>
            <Body />
          </SegmentCard>
        )
      })}

      <p className="text-sm text-muted px-1">{OVERTIME_NOTE}</p>

      <Outcomes />
    </div>
  )
}

function SegmentCard({
  id,
  children,
}: {
  id: keyof typeof SEGMENT_BODIES
  children: React.ReactNode
}) {
  const { state, setState } = useWorkshop()
  const segment = SEGMENTS.find((entry) => entry.id === id)!
  const complete = state.completed[id]

  const toggle = () => {
    setState((current) => ({
      ...current,
      completed: { ...current.completed, [id]: !current.completed[id] },
    }))
  }

  return (
    <Surface
      id={`segment-${id}`}
      className={cn(complete && "border-action/40")}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 mb-1">
        <div>
          <p className="label-sm text-action uppercase tracking-wide">
            Segment {segment.id} · {segment.minutes} minutes
          </p>
          <h2 className="heading-md font-display text-ink">{segment.title}</h2>
          <p className="text-muted mt-0.5">{segment.question}</p>
        </div>
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "inline-flex items-center gap-2 rounded-sm border px-3 h-9 text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action",
            complete
              ? "bg-action text-action-on border-action"
              : "bg-surface text-ink hover:border-action"
          )}
        >
          <Check className="h-4 w-4" />
          {complete ? "Complete" : "Mark complete"}
        </button>
      </header>

      <details className="mb-4 group">
        <summary className="text-sm text-action cursor-pointer select-none">
          Facilitator script
        </summary>
        <p className="text-sm text-ink leading-relaxed mt-2 border-l-2 border-action/40 pl-3">
          {segment.script}
        </p>
      </details>

      {children}

      <p className="text-sm text-muted mt-4">
        <span className="font-medium text-ink">Outcome:</span> {segment.outcome}
      </p>
    </Surface>
  )
}
