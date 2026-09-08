"use client"

import { Button } from "@/components/ui/Button"
import {
  CHECKLIST_ITEMS,
  CLOSING_SCRIPT,
  REVIEW_DATE,
} from "@/lib/workshop/content"
import { tr } from "@/lib/workshop/i18n"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { Field, Input, Surface } from "../fields"
import { useWorkshop } from "../WorkshopProvider"

export function Outcomes() {
  const { state, setState, patch, locale } = useWorkshop()

  const setOutcome = (key: keyof typeof state.outcomes, value: string) =>
    setState((current) => ({
      ...current,
      outcomes: { ...current.outcomes, [key]: value },
    }))

  const toggleChecklist = (id: string) =>
    setState((current) => ({
      ...current,
      checklist: { ...current.checklist, [id]: !current.checklist[id] },
    }))

  return (
    <Surface id="outcomes">
      <p className="label-sm text-action uppercase tracking-wide">
        {tr(locale, "Closing · 5 minutes")}
      </p>
      <h2 className="heading-md font-display text-ink mb-1">
        {tr(locale, "Workshop outcomes")}
      </h2>
      <p className="text-sm text-ink leading-relaxed border-l-2 border-action/40 pl-3 mb-5">
        {tr(locale, CLOSING_SCRIPT)}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label={tr(locale, "What we decided")}
          rows={5}
          value={state.outcomes.decisions}
          onChange={(value) => setOutcome("decisions", value)}
          placeholder={"✓ Tier 1 features: …\n✓ Timeline: …\n✓ AI bet: …"}
        />
        <Field
          label={tr(locale, "Who owns what")}
          rows={5}
          value={state.outcomes.ownership}
          onChange={(value) => setOutcome("ownership", value)}
          placeholder={"- Design: …\n- Engineering: …\n- Finance: …"}
        />
        <Field
          label={tr(locale, "Critical blockers (resolve by)")}
          rows={4}
          value={state.outcomes.blockers}
          onChange={(value) => setOutcome("blockers", value)}
          placeholder={tr(
            locale,
            "⚠ Payment processor — Finance, by …\n⚠ RINA API — Leadership, by …"
          )}
        />
        <div className="flex flex-col gap-4">
          <Input
            label={tr(locale, "Next board update")}
            value={state.outcomes.nextUpdate}
            onChange={(value) => setOutcome("nextUpdate", value)}
            placeholder={REVIEW_DATE}
          />
          <Field
            label={tr(locale, "Notes & parking lot")}
            hint={tr(locale, "Items that came up but don't fit in 60 min — revisit later.")}
            rows={3}
            value={state.parkingLot}
            onChange={(parkingLot) =>
              setState((current) => ({ ...current, parkingLot }))
            }
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="label-md text-ink mb-2">{tr(locale, "Post-workshop checklist")}</p>
        <ul className="flex flex-col gap-1.5">
          {CHECKLIST_ITEMS.map((item) => {
            const done = !!state.checklist[item.id]
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggleChecklist(item.id)}
                  aria-pressed={done}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-sm border px-3 py-2 text-left text-sm",
                    done
                      ? "bg-action-soft border-action/40 text-ink"
                      : "bg-surface text-ink hover:border-action"
                  )}
                >
                  <span
                    className={cn(
                      "h-5 w-5 rounded-xs border flex items-center justify-center shrink-0",
                      done
                        ? "bg-action border-action text-action-on"
                        : "border-strong"
                    )}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                  <span className={cn(done && "line-through opacity-70")}>
                    {tr(locale, item.label)}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="button" onClick={() => patch({ view: "export" })}>
          {tr(locale, "Generate the 24-hour email →")}
        </Button>
        <p className="text-sm text-muted">
          {tr(locale, "Everyone replies: “Confirmed — I own [my piece]”.")}
        </p>
      </div>
    </Surface>
  )
}
