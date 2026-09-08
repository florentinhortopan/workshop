"use client"

import { Button } from "@/components/ui/Button"
import { REVIEW_DATE } from "@/lib/workshop/content"
import { tr } from "@/lib/workshop/i18n"
import { uid } from "@/lib/workshop/state"
import type { SprintRow } from "@/lib/workshop/types"
import { Plus, X } from "lucide-react"
import { Input } from "../fields"
import { useWorkshop } from "../WorkshopProvider"

const METRIC_FIELDS: {
  key: "investors" | "sellers" | "mrr" | "retention" | "uptime" | "mentions"
  label: string
  placeholder: string
}[] = [
  {
    key: "investors",
    label: "Investor conversations",
    placeholder: "e.g. 20 first meetings",
  },
  { key: "sellers", label: "Sellers onboarded", placeholder: "e.g. 50+" },
  { key: "mrr", label: "€ MRR", placeholder: "e.g. 20K within 3 months" },
  { key: "retention", label: "% seller retention", placeholder: "e.g. 95" },
  { key: "uptime", label: "% system uptime", placeholder: "e.g. 99" },
  { key: "mentions", label: "Media mentions", placeholder: "e.g. 50+" },
]

export function Segment6Sprint() {
  const { state, setState, locale } = useWorkshop()

  const setRow = (id: string, patch: Partial<SprintRow>) =>
    setState((current) => ({
      ...current,
      sprint: current.sprint.map((row) =>
        row.id === id ? { ...row, ...patch } : row
      ),
    }))

  const setMetric = (key: (typeof METRIC_FIELDS)[number]["key"], value: string) =>
    setState((current) => ({
      ...current,
      metrics: { ...current.metrics, [key]: value },
    }))

  const addRow = () =>
    setState((current) => ({
      ...current,
      sprint: [
        ...current.sprint,
        {
          id: uid("sprint"),
          role: "",
          owns: "",
          due: REVIEW_DATE,
          deliverable: "",
        },
      ],
    }))

  const removeRow = (id: string) =>
    setState((current) => ({
      ...current,
      sprint: current.sprint.filter((row) => row.id !== id),
    }))

  /** Add a sprint row for every Segment 5 owner not already in the plan. */
  const pullOwners = () =>
    setState((current) => {
      const have = new Set(
        current.sprint.map((row) => row.role.trim().toLowerCase())
      )
      const missing = current.owners.filter(
        (owner) =>
          owner.role.trim() && !have.has(owner.role.trim().toLowerCase())
      )
      if (!missing.length) return current
      return {
        ...current,
        sprint: [
          ...current.sprint,
          ...missing.map((owner) => ({
            id: uid("sprint"),
            role: owner.role,
            owns: owner.commitment,
            due: REVIEW_DATE,
            deliverable: "",
          })),
        ],
      }
    })

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="label-md text-ink">
            {tr(locale, "Rapid-fire · 1 minute per owner — due by")} {REVIEW_DATE}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={pullOwners}
              title={tr(
                locale,
                "Adds a row for every Segment 5 owner missing here, carrying their commitment over."
              )}
            >
              {tr(locale, "Pull owners from Segment 5")}
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={addRow}>
              <Plus className="h-4 w-4" />
              {tr(locale, "Add owner")}
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[720px]">
            <thead>
              <tr className="border-b text-muted">
                <th className="py-2 pr-3 font-medium w-[16%]">{tr(locale, "Owner")}</th>
                <th className="py-2 pr-3 font-medium w-[30%]">{tr(locale, "What they own")}</th>
                <th className="py-2 pr-3 font-medium">{tr(locale, "Due date")}</th>
                <th className="py-2 pr-3 font-medium w-[32%]">{tr(locale, "Deliverable")}</th>
                <th className="py-2 w-8" aria-label={tr(locale, "Remove")} />
              </tr>
            </thead>
            <tbody>
              {state.sprint.map((row) => (
                <tr key={row.id} className="border-b align-top">
                  <td className="py-2 pr-3">
                    <Input
                      value={row.role}
                      onChange={(value) => setRow(row.id, { role: value })}
                      placeholder={tr(locale, "Role")}
                      aria-label={tr(locale, "Sprint owner role")}
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <Input
                      value={row.owns}
                      onChange={(value) => setRow(row.id, { owns: value })}
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <Input
                      value={row.due}
                      onChange={(value) => setRow(row.id, { due: value })}
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <Input
                      value={row.deliverable}
                      onChange={(value) =>
                        setRow(row.id, { deliverable: value })
                      }
                      placeholder={tr(locale, "What lands on the table?")}
                    />
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="text-muted hover:text-ink mt-2"
                      aria-label={`Remove ${row.role || "sprint"} row`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="label-md text-ink mb-2">
          {tr(locale, "Success metrics (Day 1 of launch)")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {METRIC_FIELDS.map(({ key, label, placeholder }) => (
            <Input
              key={key}
              label={tr(locale, label)}
              value={state.metrics[key]}
              onChange={(value) => setMetric(key, value)}
              placeholder={tr(locale, placeholder)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
