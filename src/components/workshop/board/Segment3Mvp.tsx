"use client"

import { MVP_CHALLENGES, TIERS } from "@/lib/workshop/content"
import type { ListItem, TierItem } from "@/lib/workshop/types"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { AddableList, ExampleHint, Input } from "../fields"
import { useWorkshop } from "../WorkshopProvider"

export function Segment3Mvp() {
  const { state, setState } = useWorkshop()

  const setTier1 = (tier1: TierItem[]) =>
    setState((current) => ({ ...current, tier1 }))

  const toggleAgreed = (id: string) =>
    setTier1(
      state.tier1.map((item) =>
        item.id === id ? { ...item, agreed: !item.agreed } : item
      )
    )

  return (
    <div className="flex flex-col gap-5">
      {/* Tier 1 with the template's agreement checkboxes */}
      <div className="rounded-md border border-action/30 bg-action-soft/50 p-4">
        <p className="label-md text-ink">{TIERS.tier1.title}</p>
        <p className="text-sm text-muted mb-3">
          {TIERS.tier1.subtitle} — check ✓ when everyone agrees the feature is
          in. Tier 1 must include exactly ONE AI feature.
        </p>
        <AddableList
          items={state.tier1}
          onChange={(items) =>
            setTier1(
              items.map((item) => {
                const existing = state.tier1.find((entry) => entry.id === item.id)
                return existing ?? { ...item, agreed: false }
              })
            )
          }
          placeholder="Feature everyone agrees on"
          addLabel="Add"
          renderExtra={(item: ListItem) => {
            const tierItem = state.tier1.find((entry) => entry.id === item.id)
            const agreed = tierItem?.agreed ?? false
            return (
              <button
                type="button"
                onClick={() => toggleAgreed(item.id)}
                aria-pressed={agreed}
                className={cn(
                  "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-medium",
                  agreed
                    ? "bg-action text-action-on border-action"
                    : "bg-surface text-muted hover:border-action hover:text-action"
                )}
              >
                <Check className="h-3 w-3" />
                {agreed ? "Agreed" : "TBD"}
              </button>
            )
          }}
        />
        <div className="mt-2">
          <ExampleHint>{TIERS.tier1.examples.join(" · ")}</ExampleHint>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <label className="flex flex-col gap-1.5">
            <span className="label-md text-ink">
              Can we launch with this? (launch readiness)
            </span>
            <div className="flex gap-2">
              {(["yes", "no"] as const).map((answer) => (
                <button
                  key={answer}
                  type="button"
                  onClick={() =>
                    setState((current) => ({
                      ...current,
                      tier1Ready: current.tier1Ready === answer ? "" : answer,
                    }))
                  }
                  className={cn(
                    "flex-1 rounded-sm border px-3 h-[38px] text-sm font-medium uppercase",
                    state.tier1Ready === answer
                      ? answer === "yes"
                        ? "bg-ok text-ok border-transparent"
                        : "bg-danger text-danger border-transparent"
                      : "bg-surface text-muted hover:border-action"
                  )}
                >
                  {answer}
                </button>
              ))}
            </div>
          </label>
          <Input
            label="Design owner"
            value={state.tier1DesignOwner}
            onChange={(value) =>
              setState((current) => ({ ...current, tier1DesignOwner: value }))
            }
            placeholder="Name"
          />
          <Input
            label="Est. engineering weeks"
            value={state.tier1EngWeeks}
            onChange={(value) =>
              setState((current) => ({ ...current, tier1EngWeeks: value }))
            }
            placeholder="e.g. 8–12"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-md border p-4">
          <p className="label-md text-ink">{TIERS.tier2.title}</p>
          <p className="text-sm text-muted mb-3">{TIERS.tier2.subtitle}</p>
          <AddableList
            items={state.tier2}
            onChange={(tier2) => setState((current) => ({ ...current, tier2 }))}
            placeholder="Defer to later (note why)"
            addLabel="Add"
          />
          <div className="mt-2">
            <ExampleHint>{TIERS.tier2.examples.join(" · ")}</ExampleHint>
          </div>
          <div className="mt-3">
            <Input
              label="Timeline (weeks after launch?)"
              value={state.tier2Timeline}
              onChange={(value) =>
                setState((current) => ({ ...current, tier2Timeline: value }))
              }
              placeholder="e.g. 6–8 weeks post-launch"
            />
          </div>
        </div>

        <div className="rounded-md border p-4">
          <p className="label-md text-ink">{TIERS.tier3.title}</p>
          <p className="text-sm text-muted mb-3">{TIERS.tier3.subtitle}</p>
          <AddableList
            items={state.tier3}
            onChange={(tier3) => setState((current) => ({ ...current, tier3 }))}
            placeholder="Deprioritize completely"
            addLabel="Add"
          />
          <div className="mt-2">
            <ExampleHint>{TIERS.tier3.examples.join(" · ")}</ExampleHint>
          </div>
        </div>
      </div>

      <div>
        <p className="label-md text-ink mb-2">
          Challenge questions · 8 minutes — facilitator writes decisions as they
          speak
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {MVP_CHALLENGES.map((challenge) => (
            <li
              key={challenge.role}
              className="rounded-sm border bg-sunken px-3 py-2 text-sm"
            >
              <span className="font-medium text-ink">{challenge.role}</span>{" "}
              <span className="text-muted">asks:</span> {challenge.question}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
