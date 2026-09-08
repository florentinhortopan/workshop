"use client"

import { Button } from "@/components/ui/Button"
import { lockWorkshop } from "@/lib/workshop/auth"
import {
  SEGMENTS,
  WORKSHOP_SUBTITLE,
  WORKSHOP_TITLE,
} from "@/lib/workshop/content"
import { SEGMENT_IDS, type View } from "@/lib/workshop/types"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Check,
  Clock,
  LayoutList,
  Mail,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
} from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { useWorkshop } from "./WorkshopProvider"

function formatTime(seconds: number) {
  const clamped = Math.max(0, seconds)
  const m = Math.floor(clamped / 60)
  const s = clamped % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

const VIEWS: { id: View; label: string; icon: typeof LayoutList }[] = [
  { id: "board", label: "Board", icon: LayoutList },
  { id: "guide", label: "Guide", icon: BookOpen },
  { id: "export", label: "Export", icon: Mail },
]

/** Segment timer — soft alert at 3 minutes remaining, hard stop at 0. */
function SegmentTimer() {
  const [segmentIdx, setSegmentIdx] = useState(0)
  const segment = SEGMENTS[segmentIdx]
  const [remaining, setRemaining] = useState(segment.minutes * 60)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    setRemaining(SEGMENTS[segmentIdx].minutes * 60)
    setRunning(false)
  }, [segmentIdx])

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [running])

  useEffect(() => {
    if (remaining === 0) setRunning(false)
  }, [remaining])

  const softAlert = remaining > 0 && remaining <= 180
  const hardStop = remaining === 0

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-sm border px-2.5 h-10",
        softAlert && "border-warn bg-warn",
        hardStop && "border-danger bg-danger"
      )}
    >
      <Clock className={cn("h-4 w-4", hardStop && "text-danger")} />
      <select
        value={segmentIdx}
        onChange={(event) => setSegmentIdx(Number(event.target.value))}
        className="bg-transparent text-sm focus:outline-none max-w-[130px]"
        aria-label="Timer segment"
      >
        {SEGMENTS.map((entry, idx) => (
          <option key={entry.id} value={idx}>
            {entry.id}. {entry.title} · {entry.minutes}m
          </option>
        ))}
      </select>
      <span
        className={cn(
          "tabular-nums label-md min-w-[44px] text-right",
          hardStop && "text-danger font-semibold"
        )}
      >
        {formatTime(remaining)}
      </span>
      <Button
        type="button"
        size="sm"
        variant="text"
        onClick={() => setRunning((value) => !value)}
        aria-label={running ? "Pause timer" : "Start timer"}
        className="px-1.5"
      >
        {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <Button
        type="button"
        size="sm"
        variant="text"
        onClick={() => setSegmentIdx((idx) => Math.min(idx + 1, SEGMENTS.length - 1))}
        aria-label="Next segment"
        className="px-1.5"
      >
        <SkipForward className="h-4 w-4" />
      </Button>
    </div>
  )
}

function SavedIndicator({ lastSavedAt }: { lastSavedAt: Date | null }) {
  if (!lastSavedAt) return null
  return (
    <span
      className="flex items-center gap-1 text-xs text-muted tabular-nums shrink-0"
      title="Everything on this board autosaves to this browser as you type. Snapshots and a downloadable board file live in the Export tab."
    >
      <Check className="h-3.5 w-3.5 text-ok" />
      Saved{" "}
      {lastSavedAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </span>
  )
}

export function WorkshopShell({ children }: { children: React.ReactNode }) {
  const { state, patch, reset, lastSavedAt } = useWorkshop()

  const completedCount = useMemo(
    () => SEGMENT_IDS.filter((id) => state.completed[id]).length,
    [state.completed]
  )
  const progress = (completedCount / SEGMENT_IDS.length) * 100

  const confirmReset = () => {
    if (
      window.confirm(
        "Clear this browser's workshop notes? A snapshot is kept — you can restore it from the Export tab. This does not affect anyone else's device."
      )
    ) {
      reset()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 border-b bg-surface/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-3 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Image
                src="/Logo.svg"
                width={88}
                height={28}
                alt="IDA"
                priority
                className="shrink-0"
              />
              <div className="min-w-0">
                <p className="font-display text-lg leading-tight truncate">
                  {WORKSHOP_TITLE}
                </p>
                <p className="text-sm text-muted truncate">
                  {WORKSHOP_SUBTITLE} · {state.meta.date}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <SegmentTimer />
              <nav className="flex gap-1" aria-label="Views">
                {VIEWS.map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    type="button"
                    size="sm"
                    variant={state.view === id ? "filled" : "outline"}
                    onClick={() => patch({ view: id })}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Button>
                ))}
              </nav>
              <Button
                type="button"
                variant="text"
                size="sm"
                onClick={confirmReset}
                aria-label="Reset board"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <form action={lockWorkshop}>
                <Button type="submit" variant="text" size="sm">
                  Lock
                </Button>
              </form>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="h-1.5 flex-1 rounded-full bg-sunken overflow-hidden"
              role="progressbar"
              aria-valuenow={completedCount}
              aria-valuemin={0}
              aria-valuemax={SEGMENT_IDS.length}
              aria-label="Segments complete"
            >
              <div
                className="h-full bg-action transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-muted tabular-nums shrink-0">
              {completedCount}/{SEGMENT_IDS.length} segments complete
            </span>
            <SavedIndicator lastSavedAt={lastSavedAt} />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 lg:px-6 py-6 pb-24">
        {children}
      </main>
    </div>
  )
}
