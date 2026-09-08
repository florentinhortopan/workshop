"use client"

import { Button } from "@/components/ui/Button"
import { uid } from "@/lib/workshop/state"
import type { AgreementRow, OwnerRow, SignOff, SignOffAnswer } from "@/lib/workshop/types"
import { cn } from "@/lib/utils"
import { Plus, X } from "lucide-react"
import { Field, Input } from "../fields"
import { useWorkshop } from "../WorkshopProvider"

const COMMITMENT_HINTS: Record<string, string> = {
  "design-lead": "Wireframes by…",
  "engineering-lead": "Build ready by…",
  finance: "Runway model + data room by…",
  communications: "Story locked by…",
  strategy: "Roadmap validated: yes/no",
  ceo: "Investor pipeline live by…",
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

  const addOwner = () =>
    setState((current) => ({
      ...current,
      owners: [
        ...current.owners,
        { id: uid("owner"), role: "", name: "", commitment: "", blocker: "" },
      ],
    }))

  const removeOwner = (id: string) =>
    setState((current) => ({
      ...current,
      owners: current.owners.filter((row) => row.id !== id),
    }))

  const addSignOff = () =>
    setState((current) => ({
      ...current,
      signOffs: [
        ...current.signOffs,
        { id: uid("signoff"), role: "", answer: "" as const, conditions: "" },
      ],
    }))

  const removeSignOff = (id: string) =>
    setState((current) => ({
      ...current,
      signOffs: current.signOffs.filter((row) => row.id !== id),
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
        <div className="flex items-center justify-between mb-2">
          <p className="label-md text-ink">Owner assignments & sign-offs</p>
          <Button type="button" size="sm" variant="outline" onClick={addOwner}>
            <Plus className="h-4 w-4" />
            Add owner
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[720px]">
            <thead>
              <tr className="border-b text-muted">
                <th className="py-2 pr-3 font-medium w-[18%]">Role</th>
                <th className="py-2 pr-3 font-medium">Owner name</th>
                <th className="py-2 pr-3 font-medium w-[32%]">Commitment</th>
                <th className="py-2 pr-3 font-medium w-[24%]">Blocker?</th>
                <th className="py-2 w-8" aria-label="Remove" />
              </tr>
            </thead>
            <tbody>
              {state.owners.map((row) => (
                <tr key={row.id} className="border-b align-top">
                  <td className="py-2 pr-3">
                    <Input
                      value={row.role}
                      onChange={(value) => setOwner(row.id, { role: value })}
                      placeholder="Role"
                      aria-label="Owner role"
                    />
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
                  <td className="py-2 pr-3">
                    <Input
                      value={row.blocker}
                      onChange={(value) => setOwner(row.id, { blocker: value })}
                      placeholder="None identified"
                    />
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      onClick={() => removeOwner(row.id)}
                      className="text-muted hover:text-ink mt-2"
                      aria-label={`Remove ${row.role || "owner"} row`}
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

      {/* Everyone signs off */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="label-md text-ink">Does everyone sign off?</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={addSignOff}
          >
            <Plus className="h-4 w-4" />
            Add person
          </Button>
        </div>
        <p className="text-sm text-muted mb-3">
          Facilitator asks each person: “Do you sign up for this? What's your
          blocker if not?”
        </p>
        <ul className="flex flex-col gap-2">
          {state.signOffs.map((row) => (
            <li
              key={row.id}
              className="grid grid-cols-1 md:grid-cols-[150px_auto_1fr_auto] gap-2 md:items-center"
            >
              <Input
                value={row.role}
                onChange={(value) => setSignOff(row.id, { role: value })}
                placeholder="Role / name"
                aria-label="Sign-off role"
              />
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
              <button
                type="button"
                onClick={() => removeSignOff(row.id)}
                className="text-muted hover:text-ink justify-self-start md:justify-self-auto"
                aria-label={`Remove ${row.role || "sign-off"} row`}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
