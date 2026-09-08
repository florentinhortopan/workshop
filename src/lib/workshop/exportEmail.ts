import { REVIEW_DATE } from "./content"
import { tr, type Locale } from "./i18n"
import type { WorkshopState } from "./types"

const RULE = "━".repeat(56)

function section(title: string, body: string) {
  return `${RULE}\n${title}\n${RULE}\n\n${body.trim() || "[not captured]"}\n`
}

function lines(items: string[], mark: string) {
  return items
    .filter((item) => item.trim())
    .map((item) => `${mark} ${item.trim()}`)
    .join("\n")
}

/**
 * Post-workshop summary email, following the template in the
 * Workshop Setup Guide (send within 24 hours).
 */
export function exportWorkshopEmail(state: WorkshopState, locale: Locale = "en"): string {
  const t = (text: string) => tr(locale, text)
  const tier1 = lines(
    state.tier1.map((item) => `${item.text}${item.agreed ? "" : ` [${t("TBD")}]`}`),
    "✓"
  )
  const tier2 = lines(state.tier2.map((item) => item.text), "→")

  const timeline = state.months
    .map((month) => {
      const parts = [
        month.early && `  ${t("Week 1–2")}: ${month.early}`,
        month.late && `  ${t("Week 3–4")}: ${month.late}`,
        month.blocker && `  [BLOCKER] ${month.blocker}`,
      ].filter(Boolean)
      if (!parts.length) return ""
      return `${month.label}\n${parts.join("\n")}`
    })
    .filter(Boolean)
    .join("\n\n")

  const launch = [
    `${t("Launch date")}: ${state.launch.date || "[TBD]"}`,
    state.launch.sellers && `${t("Target sellers (Day 1)")}: ${state.launch.sellers}`,
    state.launch.revenue && `${t("Revenue target")}: ${state.launch.revenue}`,
  ]
    .filter(Boolean)
    .join("\n")

  const participants = state.participants
    .filter((row) => row.role.trim() || row.name.trim())
    .map((row) =>
      row.name.trim()
        ? `${row.role.trim() || t("Participant")} (${row.name.trim()})`
        : row.role.trim()
    )
    .join(", ")

  const owners = state.owners
    .filter(
      (row) =>
        row.role.trim() ||
        row.name.trim() ||
        row.commitment.trim() ||
        row.blocker.trim()
    )
    .map((row) => {
      const name = row.name ? ` — ${row.name}` : ""
      const commitment = row.commitment || "[TBD]"
      const blocker = row.blocker
        ? `\n✗ ${t("Blocker")}: ${row.blocker}`
        : `\n✓ ${t("Blocker?")} ${t("None identified")}`
      return `${row.role || "[role TBD]"}${name}\n✓ ${t("Responsible for")}: ${commitment}${blocker}`
    })
    .join("\n\n")

  const blockers = state.criticalBlockers
    .filter((row) => row.blocker.trim())
    .map((row) => {
      const details = [
        row.owner && `   ${t("Owner")}: ${row.owner}`,
        row.deadline && `   ${t("Deadline")}: ${row.deadline}`,
        row.status && `   ${t("Status")}: ${row.status}`,
      ]
        .filter(Boolean)
        .join("\n")
      return `⚠ ${row.blocker.toUpperCase()}${details ? `\n${details}` : ""}`
    })
    .join("\n\n")

  const signOffs = state.signOffs
    .filter((row) => row.role.trim() || row.answer || row.conditions.trim())
    .map((row) => {
      const answer =
        row.answer === "yes"
          ? "YES"
          : row.answer === "no"
            ? "NO"
            : row.answer === "conditions"
              ? `WITH CONDITIONS: ${row.conditions || "[unspecified]"}`
              : t("[not asked]")
      return `- ${row.role || "[role TBD]"}: ${answer}`
    })
    .join("\n")

  const sprint = state.sprint
    .filter(
      (row) => row.role.trim() || row.owns.trim() || row.deliverable.trim()
    )
    .map(
      (row) =>
        `- ${row.role || "[role TBD]"}: ${row.owns} (due ${row.due})${row.deliverable ? ` → ${row.deliverable}` : ""}`
    )
    .join("\n")

  const metrics = [
    state.metrics.investors &&
      `- ${state.metrics.investors} ${t("investor conversations")}`,
    state.metrics.sellers && `- ${state.metrics.sellers} ${t("sellers onboarded")}`,
    state.metrics.mrr && `- €${state.metrics.mrr} MRR`,
    state.metrics.retention && `- ${state.metrics.retention}% ${t("seller retention")}`,
    state.metrics.uptime && `- ${state.metrics.uptime}% ${t("system uptime")}`,
    state.metrics.mentions && `- ${state.metrics.mentions} ${t("media mentions")}`,
  ]
    .filter(Boolean)
    .join("\n")

  const decisions = state.outcomes.decisions.trim()

  return `${t("Subject")}: IDA Product Strategy — ${t("Decisions & Next Steps")} (${state.meta.date})

${t("Team")},

${t("Yesterday we locked the product direction and timeline. Here's what we committed to:")}

${t("Facilitator")}: ${state.meta.facilitator || "Florentin"}
${t("Participants")}: ${participants || t("[not captured]")}

${section(`${t("TIER 1 MVP")}${state.launch.date ? ` (${state.launch.date} ${t("launch target")})` : ""}`, tier1)}
${
  tier2
    ? `${t("Defer to Phase 2 (post-launch)")}:
${tier2}
`
    : ""
}
${section(t("REALISTIC TIMELINE"), `${timeline}${timeline && launch ? "\n\n" : ""}${launch}`)}
${section(t("OWNER COMMITMENTS"), owners)}
${section(t("CRITICAL BLOCKERS (Must resolve immediately)"), blockers)}
${section(t("DECISIONS"), decisions)}
${t("SIGN-OFFS")}
${signOffs}

${section(t("30-DAY SPRINT"), sprint)}
${metrics ? `${t("SUCCESS METRICS (Day 1 of launch)")}\n${metrics}\n\n` : ""}${RULE}
${t("NEXT STEPS")}
${RULE}

1. ${t("Everyone reply to this email: \"Confirmed — I own [your piece]\"")}
2. ${t("Add to calendars")}:
   • ${t("Weekly 15-min standups")}
   • ${t("30-day review")} (${state.outcomes.nextUpdate || REVIEW_DATE})
   • ${t("Monthly reviews (1st Friday of each month)")}
3. ${t("Blocker owners: start TODAY — legal timelines don't compress.")}

→ ${t("30-DAY REVIEW")}: ${state.outcomes.nextUpdate || REVIEW_DATE}
   ${t("Question")}: ${t("on track or pivoting?")}

${t("This is binding for the next 30 days. If your timeline or constraints change, flag it in standup — don't wait.")}

${t("We're close. Let's execute.")}

—${state.meta.facilitator || "Florentin"}
`
}
