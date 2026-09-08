"use client"

import { SEGMENTS, OVERTIME_NOTE } from "@/lib/workshop/content"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
          <Input
            label="Participants"
            value={state.meta.participants}
            onChange={(value) => setMeta("participants", value)}
          />
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
