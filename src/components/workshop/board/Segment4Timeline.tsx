"use client"

import { Button } from "@/components/ui/Button"
import {
  BLOCKER_PLACEHOLDERS,
  CRITICAL_PATH,
  holidayRisk,
} from "@/lib/workshop/content"
import { tr } from "@/lib/workshop/i18n"
import { uid } from "@/lib/workshop/state"
import type { BlockerRow, MonthRow } from "@/lib/workshop/types"
import { AlertTriangle, Plus, X } from "lucide-react"
import { Field, Input } from "../fields"
import { useWorkshop } from "../WorkshopProvider"

export function Segment4Timeline() {
  const { state, setState, locale } = useWorkshop()

  const setMonth = (id: string, patch: Partial<MonthRow>) =>
    setState((current) => ({
      ...current,
      months: current.months.map((row) =>
        row.id === id ? { ...row, ...patch } : row
      ),
    }))

  const setLaunch = (key: keyof typeof state.launch, value: string) =>
    setState((current) => ({
      ...current,
      launch: { ...current.launch, [key]: value },
    }))

  const setBlocker = (id: string, patch: Partial<BlockerRow>) =>
    setState((current) => ({
      ...current,
      criticalBlockers: current.criticalBlockers.map((row) =>
        row.id === id ? { ...row, ...patch } : row
      ),
    }))

  const addBlocker = () =>
    setState((current) => ({
      ...current,
      criticalBlockers: [
        ...current.criticalBlockers,
        { id: uid("blocker"), blocker: "", owner: "", deadline: "", status: "" },
      ],
    }))

  const removeBlocker = (id: string) =>
    setState((current) => ({
      ...current,
      criticalBlockers: current.criticalBlockers.filter((row) => row.id !== id),
    }))

  const risky = holidayRisk(state.launch.date)

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted -mt-1">
        {tr(
          locale,
          "Scaffolding starts 8 Sep 2026 — most likely 12–16 weeks from today to first real users."
        )}{" "}
        {tr(locale, CRITICAL_PATH)}
      </p>

      {/* Month-by-month, from the template (rebased) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {state.months.map((month) => (
          <div key={month.id} className="rounded-md border p-4">
            <p className="label-md text-ink mb-3">{month.label}</p>
            <div className="flex flex-col gap-3">
              <Field
                label={tr(locale, "Week 1–2")}
                rows={2}
                value={month.early}
                onChange={(value) => setMonth(month.id, { early: value })}
                placeholder={tr(locale, "What happens?")}
              />
              <Field
                label={tr(locale, "Week 3–4")}
                rows={2}
                value={month.late}
                onChange={(value) => setMonth(month.id, { late: value })}
                placeholder={tr(locale, "What happens?")}
              />
              <Field
                label="[BLOCKER]"
                rows={2}
                value={month.blocker}
                onChange={(value) => setMonth(month.id, { blocker: value })}
                placeholder={tr(locale, "What can slip this month?")}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Launch block */}
      <div className="rounded-md border border-action/30 bg-action-soft/50 p-4">
        <p className="label-md text-ink mb-3">
          {tr(locale, "Launch — the team writes this date in this room")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            label={tr(locale, "Launch date")}
            value={state.launch.date}
            onChange={(value) => setLaunch("date", value)}
            placeholder={tr(locale, "e.g. 19 Jan 2027")}
          />
          <Input
            label={tr(locale, "Target sellers (Day 1)")}
            value={state.launch.sellers}
            onChange={(value) => setLaunch("sellers", value)}
            placeholder={tr(locale, "e.g. 50+")}
          />
          <Input
            label={tr(locale, "Revenue target")}
            value={state.launch.revenue}
            onChange={(value) => setLaunch("revenue", value)}
            placeholder={tr(locale, "e.g. €20K MRR in 3 months")}
          />
        </div>
        {risky ? (
          <p className="mt-3 text-sm rounded-sm border-warn border bg-warn px-3 py-2 text-warn flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            {tr(
              locale,
              "Late December / New Year is a holiday freeze. If this is a real target, name who works through the holidays."
            )}
          </p>
        ) : null}
      </div>

      {/* Critical blockers table */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="label-md text-ink">{tr(locale, "Critical blockers (must resolve)")}</p>
          <Button type="button" size="sm" variant="outline" onClick={addBlocker}>
            <Plus className="h-4 w-4" />
            {tr(locale, "Add blocker")}
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[680px]">
            <thead>
              <tr className="border-b text-muted">
                <th className="py-2 pr-3 font-medium w-[35%]">{tr(locale, "Blocker")}</th>
                <th className="py-2 pr-3 font-medium">{tr(locale, "Owner")}</th>
                <th className="py-2 pr-3 font-medium">{tr(locale, "Deadline")}</th>
                <th className="py-2 pr-3 font-medium">{tr(locale, "Status")}</th>
                <th className="py-2 w-8" aria-label={tr(locale, "Remove")} />
              </tr>
            </thead>
            <tbody>
              {state.criticalBlockers.map((row, index) => {
                const hint = BLOCKER_PLACEHOLDERS[index]
                const active = row.blocker.trim().length > 0
                return (
                  <tr
                    key={row.id}
                    className={
                      active
                        ? "border-b border-danger bg-danger/40 align-top"
                        : "border-b align-top"
                    }
                  >
                    <td className="py-2 pr-3">
                      <Input
                        value={row.blocker}
                        onChange={(value) => setBlocker(row.id, { blocker: value })}
                        placeholder={
                          hint
                            ? `${tr(locale, "e.g.")} ${tr(locale, hint.blocker)}`
                            : tr(locale, "Blocker")
                        }
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <Input
                        value={row.owner}
                        onChange={(value) => setBlocker(row.id, { owner: value })}
                        placeholder={hint ? tr(locale, hint.owner) : tr(locale, "Owner")}
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <Input
                        value={row.deadline}
                        onChange={(value) =>
                          setBlocker(row.id, { deadline: value })
                        }
                        placeholder={tr(locale, "Date")}
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <Input
                        value={row.status}
                        onChange={(value) => setBlocker(row.id, { status: value })}
                        placeholder={tr(locale, "Open / in progress")}
                      />
                    </td>
                    <td className="py-2">
                      <button
                        type="button"
                        onClick={() => removeBlocker(row.id)}
                        className="text-muted hover:text-ink mt-2"
                        aria-label="Remove blocker"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-2">
          {tr(
            locale,
            "Red rows stay highlighted until resolved. Never let a blocker hide until Week 6."
          )}
        </p>
      </div>

      <Field
        label={tr(locale, "Red flags (what could derail us)")}
        value={state.redFlags}
        onChange={(redFlags) => setState((current) => ({ ...current, redFlags }))}
        rows={3}
        placeholder={"1. …\n2. …\n3. …"}
      />
    </div>
  )
}
