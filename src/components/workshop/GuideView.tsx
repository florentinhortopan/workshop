"use client"

import {
  AFTER_WORKSHOP,
  DOC_CONVENTIONS,
  DONT_DO_THIS,
  DO_THIS,
  ESCALATION_RULE,
  FACILITATION_TIPS,
  KILLERS,
  PREP_FACILITATOR,
  PREP_PARTICIPANTS,
  SEGMENTS,
  SESSION_ROLES,
  STANDUP_FORMAT,
  SUCCESS_FACTORS,
  WHAT_TO_BRING,
  WHO_FILLS_IN,
} from "@/lib/workshop/content"
import { Surface } from "./fields"

function List({ items, mark = "•" }: { items: string[]; mark?: string }) {
  return (
    <ul className="space-y-1.5 text-sm text-ink">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="text-muted shrink-0">{mark}</span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function GuideView() {
  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <Surface>
        <h1 className="heading-md font-display text-ink mb-2">
          Facilitator & participant guide
        </h1>
        <p className="text-sm text-ink leading-relaxed">
          The Board tab is the live tracker — fill it in as the group speaks,
          mark segments complete, and the progress bar updates for everyone
          watching the projector. This page is the script, the rules, and the
          checklists. After the session, the Export tab assembles the summary
          email to send within 24 hours.
        </p>
      </Surface>

      <Surface>
        <h2 className="heading-sm text-ink mb-3">Agenda · 60 minutes, hard stop</h2>
        <ol className="space-y-3">
          {SEGMENTS.map((segment) => (
            <li key={segment.id} className="flex gap-3">
              <span className="label-md text-action w-14 shrink-0 tabular-nums">
                {segment.minutes} min
              </span>
              <div>
                <p className="label-md text-ink">
                  {segment.id}. {segment.title}
                </p>
                <p className="text-sm text-muted">{segment.question}</p>
                <p className="text-sm text-ink mt-0.5">{segment.outcome}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted mt-4">
          Running long? Cut Segment 4 or 5 — everything else is higher priority.
        </p>
      </Surface>

      <Surface>
        <h2 className="heading-sm text-ink mb-3">Roles during the session</h2>
        <ul className="space-y-2 text-sm">
          {SESSION_ROLES.map((entry) => (
            <li key={entry.role}>
              <span className="font-medium text-ink">{entry.role}</span>
              <span className="text-muted"> — {entry.duty}</span>
            </li>
          ))}
        </ul>

        <h3 className="label-md text-ink mt-5 mb-2">Who fills in each segment</h3>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b text-muted">
              <th className="py-1.5 pr-3 font-medium">Segment</th>
              <th className="py-1.5 pr-3 font-medium">Task</th>
              <th className="py-1.5 font-medium">Who fills in</th>
            </tr>
          </thead>
          <tbody>
            {WHO_FILLS_IN.map((row) => (
              <tr key={row.segment} className="border-b">
                <td className="py-1.5 pr-3 whitespace-nowrap">{row.segment}</td>
                <td className="py-1.5 pr-3">{row.task}</td>
                <td className="py-1.5 text-muted">{row.who}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="label-md text-ink mt-5 mb-2">Formatting conventions</h3>
        <List items={DOC_CONVENTIONS} />
      </Surface>

      <Surface>
        <h2 className="heading-sm text-ink mb-4">Facilitation</h2>
        <div className="flex flex-col gap-5">
          {FACILITATION_TIPS.map((tip) => (
            <div key={tip.title}>
              <h3 className="label-md text-ink mb-1.5">{tip.title}</h3>
              <List items={tip.items} />
            </div>
          ))}
        </div>
      </Surface>

      <Surface>
        <h2 className="heading-sm text-ink mb-3">Prep</h2>
        <h3 className="label-md text-ink mb-1.5">Facilitator, before the session</h3>
        <List items={PREP_FACILITATOR} mark="☐" />
        <h3 className="label-md text-ink mt-4 mb-1.5">
          Participants should know before arriving
        </h3>
        <List items={PREP_PARTICIPANTS} />
        <h3 className="label-md text-ink mt-4 mb-1.5">What to bring</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted mb-1">Physical</p>
            <List items={WHAT_TO_BRING.physical} />
          </div>
          <div>
            <p className="text-muted mb-1">Digital</p>
            <List items={WHAT_TO_BRING.digital} />
          </div>
          <div>
            <p className="text-muted mb-1">Before starting</p>
            <List items={WHAT_TO_BRING.before} />
          </div>
        </div>
      </Surface>

      <Surface>
        <h2 className="heading-sm text-ink mb-3">
          What makes it work / what kills it
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-muted text-sm mb-1">Works</p>
            <List items={SUCCESS_FACTORS} mark="✅" />
          </div>
          <div>
            <p className="text-muted text-sm mb-1">Kills it</p>
            <List items={KILLERS} mark="❌" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div>
            <p className="text-muted text-sm mb-1">Do this</p>
            <List items={DO_THIS} mark="✅" />
          </div>
          <div>
            <p className="text-muted text-sm mb-1">Don't do this</p>
            <List items={DONT_DO_THIS} mark="❌" />
          </div>
        </div>
      </Surface>

      <Surface>
        <h2 className="heading-sm text-ink mb-3">After the workshop</h2>
        <List items={AFTER_WORKSHOP} mark="→" />
        <h3 className="label-md text-ink mt-5 mb-1.5">
          Weekly 15-min standup format
        </h3>
        <List items={STANDUP_FORMAT} />
        <p className="text-sm text-ink mt-4 rounded-sm border-warn border bg-warn px-3 py-2">
          {ESCALATION_RULE}
        </p>
      </Surface>
    </div>
  )
}
