"use client"

import { AI_PROMPTS } from "@/lib/workshop/content"
import type { WorkshopState } from "@/lib/workshop/types"
import { ExampleHint, Field } from "../fields"
import { useWorkshop } from "../WorkshopProvider"

const ROLE_KEYS = ["design", "finance", "comms", "strategy"] as const

export function Segment2AiMap() {
  const { state, setState } = useWorkshop()

  const setAi = (key: keyof WorkshopState["ai"], value: string) => {
    setState((current) => ({
      ...current,
      ai: { ...current.ai, [key]: value },
    }))
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="label-md text-ink mb-2">
          Breakout by role · 2 minutes each, parallel thinking
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROLE_KEYS.map((key) => (
            <div key={key} className="flex flex-col gap-1.5">
              <Field
                label={AI_PROMPTS[key].label}
                value={state.ai[key]}
                onChange={(value) => setAi(key, value)}
                placeholder="Write in parallel — 2 minutes"
              />
              <ExampleHint>{AI_PROMPTS[key].example}</ExampleHint>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="label-md text-ink mb-2">
          Facilitator synthesizes · 3 minutes
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field
            label="What AI solves for sellers"
            value={state.ai.sellers}
            onChange={(value) => setAi("sellers", value)}
            placeholder="Speed, trust, reach…"
          />
          <Field
            label="What AI solves for buyers"
            value={state.ai.buyers}
            onChange={(value) => setAi("buyers", value)}
            placeholder="Discovery, authenticity…"
          />
          <Field
            label="What AI solves for IDA"
            value={state.ai.ida}
            onChange={(value) => setAi("ida", value)}
            placeholder="Scale, differentiation…"
          />
        </div>
      </div>
    </div>
  )
}
