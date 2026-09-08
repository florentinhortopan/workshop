"use client"

import type { AgreementRow, OwnerRow, SignOff, SignOffAnswer } from "@/lib/workshop/types"
import { cn } from "@/lib/utils"
import { Field, Input } from "../fields"
import { useWorkshop } from "../WorkshopProvider"

const COMMITMENT_HINTS: Record<string, string> = {
  "design-lead": "Wireframes by…",
  "engineering-lead": "Build ready by…",
  finance: "Contracts by…",
  communications: "Story locked by…",
  strategy: "Roadmap validated: yes/no",
  ceo: "Budget approved: yes/no",
}

const ANSWERS: { value: SignOffAnswer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "conditions", label: "With conditions" },
]

export function Segment5Commit() {
  const { state, setState } = useWorkshop()

  const setAgreement = (id: string, patch: Partial<AgreementRow>) =>
    setState((current) => ({
      ...current,
      agreements: current.agreements.map((row) =>
        row.id === id ? { ...row, ...patch } : row
      ),
    }))

  const setOwner = (id: string, patch: Partial<OwnerRow>) =>
    setState((current) => ({
      ...current,
      owners: current.owners.map((row) =>
        row.id === id ? { ...row, ...patch } : row
      ),
    }))

  const setSignOff = (id: string, patch: Partial<SignOff>) =>
    setState((current) => ({
      ...current,
      signOffs: current.signOffs.map((row) =>
        row.id === id ? { ...row, ...patch } : row
      ),
    }))

  return (
    <div className="flex flex-col gap-5">
      {/* What needs agreement */}
      <div>
        <p className="label-md text-ink mb-2">What needs agreement · 5 min</p>
        <div className="flex flex-col gap-3">
          {state.agreements.map((row) => (
            <div
              key={row.id}
              className="rounded-md border bg-sunken/60 p-3 grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <div className="md:col-span-2 flex flex-wrap items-baseline justify-between gap-2">
                <p className="label-md text-ink">{row.what}</p>
                <p className="text-sm text-muted">Owned by {row.ownedBy}</p>
              </div>
              <Field
                label="Current"
                rows={2}
                value={row.current}
                onChange={(value) => setAgreement(row.id, { current: value })}
                placeholder={row.hint}
              />
              <Field
                label="✓ Agree or change"
                rows={2}
                value={row.change}
                onChange={(value) => setAgreement(row.id, { change: value })}
                placeholder="✓ agree — or the modification"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Owner assignments */}
      <div>
        <p className="label-md text-ink mb-2">Owner assignments & sign-offs</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[680px]">
            <thead>
              <tr className="border-b text-muted">
                <th className="py-2 pr-3 font-medium">Role</th>
                <th className="py-2 pr-3 font-medium">Owner name</th>
                <th className="py-2 pr-3 font-medium w-[35%]">Commitment</th>
                <th className="py-2 font-medium w-[25%]">Blocker?</th>
              </tr>
            </thead>
            <tbody>
              {state.owners.map((row) => (
                <tr key={row.id} className="border-b align-top">
                  <td className="py-2 pr-3 text-ink font-medium whitespace-nowrap pt-4">
                    {row.role}
                  </td>
                  <td className="py-2 pr-3">
                    <Input
                      value={row.name}
                      onChange={(value) => setOwner(row.id, { name: value })}
                      placeholder="Name"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <Input
                      value={row.commitment}
                      onChange={(value) =>
                        setOwner(row.id, { commitment: value })
                      }
                      placeholder={COMMITMENT_HINTS[row.id] ?? ""}
                    />
                  </td>
                  <td className="py-2">
                    <Input
                      value={row.blocker}
                      onChange={(value) => setOwner(row.id, { blocker: value })}
                      placeholder="None identified"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Everyone signs off */}
      <div>
        <p className="label-md text-ink mb-1">Does everyone sign off?</p>
        <p className="text-sm text-muted mb-3">
          Facilitator asks each person: “Do you sign up for this? What's your
          blocker if not?”
        </p>
        <ul className="flex flex-col gap-2">
          {state.signOffs.map((row) => (
            <li
              key={row.id}
              className="grid grid-cols-1 md:grid-cols-[150px_auto_1fr] gap-2 md:items-center"
            >
              <span className="label-md text-ink">{row.role}</span>
              <div className="flex gap-1">
                {ANSWERS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setSignOff(row.id, {
                        answer: row.answer === value ? "" : value,
                      })
                    }
                    className={cn(
                      "rounded-sm border px-2.5 h-8 text-xs font-medium",
                      row.answer === value
                        ? value === "yes"
                          ? "bg-ok text-ok border-transparent"
                          : value === "no"
                            ? "bg-danger text-danger border-transparent"
                            : "bg-warn text-warn border-transparent"
                        : "bg-surface text-muted hover:border-action"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <Input
                value={row.conditions}
                onChange={(value) => setSignOff(row.id, { conditions: value })}
                placeholder="I'm in, unless… / conditions"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
