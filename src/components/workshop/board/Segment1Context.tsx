"use client"

import { AddableList, ExampleHint, Field } from "../fields"
import { tr } from "@/lib/workshop/i18n"
import { useWorkshop } from "../WorkshopProvider"

export function Segment1Context() {
  const { state, setState, locale } = useWorkshop()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="label-md text-ink mb-1">
          {tr(locale, "Quick poll · 30 seconds each, stick on board, read aloud")}
        </p>
        <AddableList
          items={state.stickies}
          onChange={(stickies) =>
            setState((current) => ({ ...current, stickies }))
          }
          placeholder={tr(locale, "One sticky per frustration — type, then add")}
          addLabel={tr(locale, "Add sticky")}
        />
        <div className="mt-2">
          <ExampleHint>
            payment delays · verification takes too long · can't reach the
            right buyers · pricing
          </ExampleHint>
        </div>
      </div>

      <Field
        label="Common themes"
        hint={tr(
          locale,
          "Themes emerge instantly — write them as the group reads the stickies aloud."
        )}
        value={state.themes}
        onChange={(themes) => setState((current) => ({ ...current, themes }))}
        rows={2}
        placeholder={tr(locale, "e.g. trust and verification dominate; payouts second")}
      />
    </div>
  )
}
