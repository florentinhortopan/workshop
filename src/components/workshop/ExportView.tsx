"use client"

import { Button } from "@/components/ui/Button"
import { exportWorkshopEmail } from "@/lib/workshop/exportEmail"
import { REVIEW_DATE } from "@/lib/workshop/content"
import { useRef, useState } from "react"
import { Surface } from "./fields"
import { useWorkshop } from "./WorkshopProvider"

function downloadBlob(content: string, type: string, filename: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function timestampSlug(date = new Date()) {
  return date.toISOString().slice(0, 16).replace(/[T:]/g, "-")
}

export function ExportView() {
  const { state } = useWorkshop()
  const [copied, setCopied] = useState(false)
  const email = exportWorkshopEmail(state)

  const copy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    downloadBlob(
      email,
      "text/plain;charset=utf-8",
      "ida-workshop-decisions.txt"
    )
  }

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <Surface>
        <h1 className="heading-md font-display text-ink mb-2">
          The 24-hour email
        </h1>
        <p className="text-sm text-ink leading-relaxed">
          Assembled live from the board. Review it, fill any [TBD] gaps on the
          Board tab, then copy and send to the team within 24 hours. This is
          binding for the next 30 days — next review {state.outcomes.nextUpdate || REVIEW_DATE}.
        </p>
        <div className="flex gap-2 mt-4">
          <Button type="button" onClick={copy}>
            {copied ? "Copied ✓" : "Copy email"}
          </Button>
          <Button type="button" variant="outline" onClick={download}>
            Download .txt
          </Button>
        </div>
      </Surface>

      <Surface>
        <pre className="whitespace-pre-wrap text-sm text-ink bg-sunken rounded-sm border p-4 max-h-[560px] overflow-auto font-sans leading-relaxed">
          {email}
        </pre>
      </Surface>

      <BoardRecord />
    </div>
  )
}

/**
 * The durable record: everything autosaves to this browser as you type;
 * this section makes it portable (board file) and recoverable (snapshots).
 */
function BoardRecord() {
  const { state, snapshots, restoreSnapshot, restoreFromJson } = useWorkshop()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [restoreError, setRestoreError] = useState("")

  const downloadBoard = () => {
    downloadBlob(
      JSON.stringify(state, null, 2),
      "application/json;charset=utf-8",
      `ida-workshop-board-${timestampSlug()}.json`
    )
  }

  const onFilePicked: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return
    setRestoreError("")
    try {
      const parsed = JSON.parse(await file.text())
      if (!restoreFromJson(parsed)) {
        setRestoreError("That file isn't a workshop board export.")
      }
    } catch {
      setRestoreError("Couldn't read that file as JSON.")
    }
  }

  const confirmRestore = (id: string, label: string) => {
    if (
      window.confirm(
        `Restore the board to the snapshot from ${label}? The current board is snapshotted first, so nothing is lost.`
      )
    ) {
      restoreSnapshot(id)
    }
  }

  return (
    <Surface>
      <h2 className="heading-sm text-ink mb-1">Board record & backups</h2>
      <p className="text-sm text-muted leading-relaxed mb-4">
        The board autosaves to this browser on every keystroke. Snapshots are
        taken automatically about once a minute while you edit, and always
        before a reset or restore. Download the board file after the session to
        keep the record outside the browser — it restores on any machine.
      </p>

      <div className="flex flex-wrap gap-2 mb-2">
        <Button type="button" onClick={downloadBoard}>
          Download board file (.json)
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          Restore from file…
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={onFilePicked}
          className="hidden"
          aria-label="Restore board from file"
        />
      </div>
      {restoreError ? (
        <p className="text-sm text-danger rounded-sm border-danger border bg-danger px-3 py-2 mb-2">
          {restoreError}
        </p>
      ) : null}

      <h3 className="label-md text-ink mt-4 mb-2">
        Snapshots on this browser
      </h3>
      {snapshots.length === 0 ? (
        <p className="text-sm text-muted">
          No snapshots yet — they appear automatically as you edit the board.
        </p>
      ) : (
        <ul className="flex flex-col gap-1.5 max-h-[280px] overflow-auto">
          {snapshots.map((snapshot) => {
            const label = new Date(snapshot.at).toLocaleString([], {
              dateStyle: "medium",
              timeStyle: "short",
            })
            return (
              <li
                key={snapshot.id}
                className="flex items-center justify-between gap-3 rounded-sm border bg-sunken px-3 py-2"
              >
                <span className="text-sm text-ink tabular-nums">
                  {label}
                  <span className="text-muted"> · {snapshot.reason}</span>
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => confirmRestore(snapshot.id, label)}
                >
                  Restore
                </Button>
              </li>
            )
          })}
        </ul>
      )}
    </Surface>
  )
}
