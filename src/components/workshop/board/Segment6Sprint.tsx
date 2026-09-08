"use client"

import { REVIEW_DATE } from "@/lib/workshop/content"
import type { SprintRow } from "@/lib/workshop/types"
import { Input } from "../fields"
import { useWorkshop } from "../WorkshopProvider"

const METRIC_FIELDS: {
  key: "sellers" | "mrr" | "retention" | "uptime" | "mentions"
  label: string
  placeholder: string
}[] = [
  { key: "sellers", label: "Sellers onboarded", placeholder: "e.g. 50+" },
  { key: "mrr", label: "€ MRR", placeholder: "e.g. 20K within 3 months" },
  { key: "retention", label: "% seller retention", placeholder: "e.g. 95" },
  { key: "uptime", label: "% system uptime", placeholder: "e.g. 99" },
  { key: "mentions", label: "Media mentions", placeholder: "e.g. 50+" },
]

export function Segment6Sprint() {
  const { state, setState } = useWorkshop()

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

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="label-md text-ink mb-2">
          Rapid-fire · 1 minute per owner — due by {REVIEW_DATE}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[680px]">
            <thead>
              <tr className="border-b text-muted">
                <th className="py-2 pr-3 font-medium">Owner</th>
                <th className="py-2 pr-3 font-medium w-[30%]">What they own</th>
                <th className="py-2 pr-3 font-medium">Due date</th>
                <th className="py-2 font-medium w-[35%]">Deliverable</th>
              </tr>
            </thead>
            <tbody>
              {state.sprint.map((row) => (
                <tr key={row.id} className="border-b align-top">
                  <td className="py-2 pr-3 text-ink font-medium whitespace-nowrap pt-4">
                    {row.role}
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
                  <td className="py-2">
                    <Input
                      value={row.deliverable}
                      onChange={(value) =>
                        setRow(row.id, { deliverable: value })
                      }
                      placeholder="What lands on the table?"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="label-md text-ink mb-2">Success metrics (Day 1 of launch)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {METRIC_FIELDS.map(({ key, label, placeholder }) => (
            <Input
              key={key}
              label={label}
              value={state.metrics[key]}
              onChange={(value) => setMetric(key, value)}
              placeholder={placeholder}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
