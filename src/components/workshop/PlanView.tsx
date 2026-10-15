"use client"

import { Button } from "@/components/ui/Button"
import { Surface } from "@/components/workshop/fields"
import { useWorkshop } from "@/components/workshop/WorkshopProvider"
import Link from "next/link"
import { useMemo, useState } from "react"

type Scenario = {
  name: string
  monthlyBurn: string
  runway: string
  focus: string
  mix: { label: string; value: string }[]
}

type PlanTab = "execution" | "schema"

type TimelineBar = {
  id: string
  lane: string
  label: string
  start: number
  end: number
  type: "execution" | "hiring"
  dependsOn?: string[]
}

const ROADMAP = [
  {
    phase: "0-30 giorni",
    goal: "Attivare il motore di supply e i primi buyer",
    deliverables: [
      "Pipeline VAT + ranking categorie (top 1-3 cluster)",
      "MVP shop auto-generato + claim/non-claim flow",
      "Buyer early access su directory claimed/non-claimed",
    ],
    owner: "Strategy + Engineering + Communications",
  },
  {
    phase: "31-60 giorni",
    goal: "Aumentare conversione seller e segnali buyer",
    deliverables: [
      "Onboarding seller guidato + checklist export readiness",
      "Lead scoring buyer/seller e handoff sales",
      "KPI dashboard su claim rate, activation e buyer intent",
    ],
    owner: "Product/Strategy + Engineering + GTM",
  },
  {
    phase: "61-90 giorni",
    goal: "Passare da directory a workflow export operativo",
    deliverables: [
      "Documenti assistiti (HITL) per prime rotte commerciali",
      "Prime integrazioni pagamenti/fatturazione prioritarie",
      "Pacchetti monetizzazione: self-serve + assisted export",
    ],
    owner: "Engineering + Finance + Compliance",
  },
  {
    phase: "90-180 giorni",
    goal: "Scalare categorie e consolidare unita economica",
    deliverables: [
      "Espansione su nuove categorie/mercati con score model",
      "Automazioni doganali progressive e SLA operativi",
      "Standard org a pod con obiettivi trimestrali",
    ],
    owner: "Leadership + All Pods",
  },
]

const ORG_PODS = [
  {
    pod: "Product & Strategy",
    mission: "Decidere priorita categorie e disegnare il product wedge",
    roles: "Head of Product/Strategy, Product Ops, Data Analyst",
  },
  {
    pod: "Engineering & AI",
    mission: "Costruire shop generation, workflow export, e automazioni",
    roles: "Engineering Lead, 3-5 Full-stack, 1-2 AI/Automation",
  },
  {
    pod: "Compliance & Trade Ops",
    mission: "Ridurre rischio normativo su dogana/certificazioni",
    roles: "Trade Ops Lead, Compliance Specialist, External Advisors",
  },
  {
    pod: "GTM (Sales + Comms)",
    mission: "Attivare seller target e convertire buyer early access",
    roles: "GTM Lead, SDR/AE, Growth, Communications",
  },
]

const SCENARIOS: Scenario[] = [
  {
    name: "Base case",
    monthlyBurn: "EUR 120k-150k / mese",
    runway: "18-22 mesi",
    focus: "Bilanciato: product velocity + attivazione GTM disciplinata",
    mix: [
      { label: "People", value: "74%" },
      { label: "Infra + AI", value: "10%" },
      { label: "GTM", value: "10%" },
      { label: "Compliance/Legal", value: "6%" },
    ],
  },
  {
    name: "Upside (aggressivo)",
    monthlyBurn: "EUR 170k-220k / mese",
    runway: "12-16 mesi",
    focus: "Massimizzare execution speed e category expansion anticipata",
    mix: [
      { label: "People", value: "76%" },
      { label: "Infra + AI", value: "12%" },
      { label: "GTM", value: "9%" },
      { label: "Compliance/Legal", value: "3%" },
    ],
  },
  {
    name: "Downside (difensivo)",
    monthlyBurn: "EUR 85k-110k / mese",
    runway: "24-30 mesi",
    focus: "Forte disciplina costi, focus su una sola categoria iniziale",
    mix: [
      { label: "People", value: "70%" },
      { label: "Infra + AI", value: "9%" },
      { label: "GTM", value: "8%" },
      { label: "Compliance/Legal", value: "13%" },
    ],
  },
]

const KPI = [
  { label: "Shop claim rate (30g)", target: ">= 18%" },
  { label: "Seller activation rate", target: ">= 35%" },
  { label: "Buyer active accounts", target: ">= 100 in early access" },
  { label: "Qualified buyer intents / month", target: ">= 80" },
  { label: "Avg time to publish export-ready shop", target: "< 24h" },
  { label: "MRR milestone", target: "EUR 20k-30k entro mese 6" },
]

const HIRING_PLAN = [
  { when: "Mese 0-1", who: "Head of Product/Strategy, 2 Full-stack, GTM Lead", why: "Avvio wedge e velocity MVP" },
  { when: "Mese 2-3", who: "1 AI/Automation, 1 Trade Ops", why: "Ridurre attrito export e migliorare assistenza" },
  { when: "Mese 4-6", who: "1 SDR/AE, 1 Buyer Success, 1 Full-stack", why: "Scalare conversione buyer/seller" },
]

const TIMELINE_BARS: TimelineBar[] = [
  {
    id: "vat-pipeline",
    lane: "Data & Targeting",
    label: "VAT ingest + category scoring model",
    start: 0,
    end: 1.5,
    type: "execution",
  },
  {
    id: "shop-mvp",
    lane: "Product Core",
    label: "Auto-shop generation + claim/non-claim",
    start: 0.5,
    end: 2.5,
    type: "execution",
    dependsOn: ["vat-pipeline"],
  },
  {
    id: "buyer-early",
    lane: "Buyer Activation",
    label: "Buyer early access + interaction loop",
    start: 1.5,
    end: 3.5,
    type: "execution",
    dependsOn: ["shop-mvp"],
  },
  {
    id: "export-hitl",
    lane: "Compliance & Ops",
    label: "Export readiness + HITL document assist",
    start: 2,
    end: 4.5,
    type: "execution",
    dependsOn: ["shop-mvp"],
  },
  {
    id: "payments-invoice",
    lane: "Automation",
    label: "Payments/invoicing integration wave 1",
    start: 3,
    end: 5.5,
    type: "execution",
    dependsOn: ["export-hitl"],
  },
  {
    id: "hire-wave-1",
    lane: "Hiring",
    label: "Wave 1: Head Product, 2 Full-stack, GTM Lead",
    start: 0,
    end: 1.2,
    type: "hiring",
  },
  {
    id: "hire-wave-2",
    lane: "Hiring",
    label: "Wave 2: AI/Automation + Trade Ops",
    start: 1.5,
    end: 3,
    type: "hiring",
    dependsOn: ["hire-wave-1"],
  },
  {
    id: "hire-wave-3",
    lane: "Hiring",
    label: "Wave 3: SDR/AE + Buyer Success + Full-stack",
    start: 3,
    end: 5.5,
    type: "hiring",
    dependsOn: ["hire-wave-2", "buyer-early"],
  },
]

const TIMELINE_MONTHS = ["M0", "M1", "M2", "M3", "M4", "M5", "M6"]

const CATEGORY_MODEL = [
  "Friction score (dogana/certificazioni/documenti)",
  "Readiness score (catalogo digitale, tempi onboarding, compliance baseline)",
  "Monetization score (margine, frequenza ordini, valore medio transazione)",
]

const RISK_MAP = [
  {
    risk: "Dati VAT incompleti o non aggiornati",
    mitigation: "Data partnership + pipeline enrichment settimanale",
  },
  {
    risk: "Claim rate basso su shop non rivendicati",
    mitigation: "Outbound per cluster + incentivi onboarding iniziale",
  },
  {
    risk: "Complessita compliance rallenta conversione",
    mitigation: "HITL con Trade Ops + template mercato-specifici",
  },
  {
    risk: "Buyer early access senza liquidita sufficiente",
    mitigation: "Categoria focus e attivazione seller per domanda prioritaria",
  },
]

const SCHEMA_PRINCIPLES = [
  "Capture behavior + outcomes, not only profiles",
  "Keep an entity graph: company, product, market, requirement, workflow, intent",
  "Store critical actions as append-only events",
  "Separate operational DB, analytics warehouse, and feature store",
]

const SCHEMA_DOMAINS = [
  {
    name: "Identity & Organization",
    tables: ["accounts", "companies", "company_users", "company_verification", "external_ids"],
  },
  {
    name: "Seller GTM",
    tables: ["seller_profiles", "shops", "shop_claims", "products", "product_classification_runs"],
  },
  {
    name: "Buyer GTM",
    tables: ["buyer_profiles", "buyer_intents", "matches", "conversations"],
  },
  {
    name: "Export/Compliance Workflow",
    tables: ["market_requirements", "requirement_versions", "compliance_checks", "workflow_runs", "workflow_steps", "documents", "hitl_actions"],
  },
  {
    name: "Commercial Layer",
    tables: ["leads", "campaigns", "funnel_events", "subscriptions", "invoices", "payments"],
  },
  {
    name: "Defendability Layer",
    tables: ["events", "feature_values", "scores", "score_explanations", "experiment_assignments"],
  },
]

const MOAT_FIELDS = [
  "time_to_claim",
  "time_to_export_ready_shop",
  "compliance_error_rate_before_after",
  "hs_code_confidence + human_override_rate",
  "buyer_intent_to_deal_conversion",
  "workflow_step_blockers by market/category",
  "campaign_cluster_roi",
]

const EVENT_TAXONOMY = [
  "company_identified",
  "shop_generated",
  "shop_claim_started / shop_claim_completed",
  "product_classified",
  "compliance_check_passed / compliance_check_failed",
  "workflow_step_blocked / workflow_step_resolved",
  "buyer_intent_created",
  "match_generated",
  "inquiry_sent / inquiry_accepted",
  "subscription_started",
]

const SCHEMA_ROLLOUT = [
  { phase: "0-30 giorni", scope: "Core operational tables + event stream + GTM funnel events" },
  { phase: "31-60 giorni", scope: "Feature store + scoring layer + explanation logs" },
  { phase: "61-90 giorni", scope: "Requirement versioning + HITL quality loop + experiments" },
]

function MetricCard({ label, target }: { label: string; target: string }) {
  return (
    <div className="rounded-md border bg-sunken/60 p-3">
      <p className="text-sm text-muted">{label}</p>
      <p className="label-md text-ink mt-1">{target}</p>
    </div>
  )
}

function overlapStyle(start: number, end: number, rangeStart: number, rangeEnd: number) {
  const total = rangeEnd - rangeStart
  const clippedStart = Math.max(start, rangeStart)
  const clippedEnd = Math.min(end, rangeEnd)
  const left = ((clippedStart - rangeStart) / total) * 100
  const width = ((clippedEnd - clippedStart) / total) * 100
  return {
    left: `${Math.max(0, left)}%`,
    width: `${Math.max(6, width)}%`,
  }
}

function VisualTimeline({ isIt }: { isIt: boolean }) {
  const [windowFilter, setWindowFilter] = useState<"all" | "q1" | "q2">("all")
  const [criticalOnly, setCriticalOnly] = useState(false)
  const [riskedOnly, setRiskedOnly] = useState(false)
  const criticalPathIds = useMemo(
    () => new Set(["vat-pipeline", "shop-mvp", "buyer-early", "export-hitl", "payments-invoice"]),
    []
  )
  const riskedIds = useMemo(
    () => new Set(["buyer-early", "export-hitl", "payments-invoice", "hire-wave-2", "hire-wave-3"]),
    []
  )

  const range = useMemo(() => {
    if (windowFilter === "q1") return { start: 0, end: 3, labels: ["M0", "M1", "M2", "M3"] }
    if (windowFilter === "q2") return { start: 3, end: 6, labels: ["M3", "M4", "M5", "M6"] }
    return { start: 0, end: 6, labels: TIMELINE_MONTHS }
  }, [windowFilter])

  const filteredBars = useMemo(() => {
    const inRange = TIMELINE_BARS.filter(
      (item) => item.end > range.start && item.start < range.end
    )
    const criticalFiltered = !criticalOnly
      ? inRange
      : inRange.filter(
      (item) =>
        criticalPathIds.has(item.id) ||
        (item.dependsOn ?? []).some((dep) => criticalPathIds.has(dep))
    )
    if (!riskedOnly) return criticalFiltered
    return criticalFiltered.filter(
      (item) =>
        riskedIds.has(item.id) ||
        (item.dependsOn ?? []).some((dep) => riskedIds.has(dep))
    )
  }, [range.end, range.start, criticalOnly, criticalPathIds, riskedOnly, riskedIds])

  const lanes = Array.from(new Set(TIMELINE_BARS.map((item) => item.lane)))
  const barMap = new Map(filteredBars.map((item) => [item.id, item]))
  const dependencies = filteredBars.flatMap((bar) =>
    (bar.dependsOn ?? []).map((dep) => ({
      from: barMap.get(dep)?.label ?? TIMELINE_BARS.find((item) => item.id === dep)?.label ?? dep,
      to: bar.label,
      critical: criticalPathIds.has(dep) && criticalPathIds.has(bar.id),
      risked: riskedIds.has(dep) || riskedIds.has(bar.id),
    }))
  ).filter((edge) => edge.from !== edge.to)

  return (
    <Surface>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <h2 className="heading-sm text-ink mb-1">
            {isIt
              ? "Timeline operativo visuale (fasi sovrapposte)"
              : "Visual operating timeline (overlapping phases)"}
          </h2>
          <p className="text-sm text-muted">
            {isIt
              ? "Le fasi sono intenzionalmente sovrapposte: hiring ed execution procedono insieme, con dipendenze esplicite."
              : "Phases intentionally overlap: hiring and execution run in parallel, with explicit dependencies."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={windowFilter === "all" ? "filled" : "outline"}
            onClick={() => setWindowFilter("all")}
          >
            All M0-M6
          </Button>
          <Button
            type="button"
            size="sm"
            variant={windowFilter === "q1" ? "filled" : "outline"}
            onClick={() => setWindowFilter("q1")}
          >
            Q1 (M0-M3)
          </Button>
          <Button
            type="button"
            size="sm"
            variant={windowFilter === "q2" ? "filled" : "outline"}
            onClick={() => setWindowFilter("q2")}
          >
            Q2 (M3-M6)
          </Button>
          <Button
            type="button"
            size="sm"
            variant={criticalOnly ? "filled" : "outline"}
            onClick={() => setCriticalOnly((value) => !value)}
          >
            {isIt ? "Critical path" : "Critical path"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant={riskedOnly ? "filled" : "outline"}
            onClick={() => setRiskedOnly((value) => !value)}
          >
            {isIt ? "Attivita a rischio" : "Risked tasks"}
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-sunken/40 p-3">
        <div className={`grid text-xs text-muted mb-2`} style={{ gridTemplateColumns: `repeat(${range.labels.length}, minmax(0, 1fr))` }}>
          {range.labels.map((month) => (
            <div key={month} className="text-center">
              {month}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {lanes.map((lane) => (
            <div key={lane} className="grid grid-cols-[160px_1fr] gap-2 items-center">
              <p className="text-xs text-muted">{lane}</p>
              <div className="relative h-10 rounded-sm border bg-surface/80 overflow-hidden">
                {filteredBars.filter((item) => item.lane === lane).map((item) => (
                  <div
                    key={item.id}
                    className={[
                      "absolute top-1/2 -translate-y-1/2 h-7 rounded-sm px-2",
                      "text-[11px] leading-7 truncate border transition-opacity",
                      item.type === "hiring"
                        ? "bg-action-soft border-action/50 text-ink"
                        : "bg-sunken border-strong text-ink",
                      riskedIds.has(item.id) && "border-warn/70 bg-warn/20",
                      criticalOnly && !criticalPathIds.has(item.id) ? "opacity-50" : "opacity-100",
                    ].join(" ")}
                    style={overlapStyle(item.start, item.end, range.start, range.end)}
                    title={item.label}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {dependencies.map((dep) => (
          <div
            key={`${dep.from}-${dep.to}`}
            className={[
              "rounded-sm border p-2 text-sm",
              dep.critical
                ? "border-action/50 bg-action-soft/40"
                : dep.risked
                  ? "border-warn/60 bg-warn/20"
                  : "bg-sunken/50",
            ].join(" ")}
          >
            <span className="text-muted">{dep.from}</span>
            <span className="text-action px-2">→</span>
            <span className="text-ink">{dep.to}</span>
          </div>
        ))}
      </div>
    </Surface>
  )
}

function SchemaTabContent({ isIt }: { isIt: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <Surface>
        <h2 className="heading-sm text-ink mb-2">
          {isIt ? "Schema dati per difendibilita e scala" : "Data schema for defendability and scale"}
        </h2>
        <p className="text-sm text-muted mb-3">
          {isIt
            ? "Questa struttura dati e' progettata per massimizzare execution oggi e data moat domani."
            : "This data structure is designed for fast execution now and moat compounding later."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SCHEMA_PRINCIPLES.map((item) => (
            <div key={item} className="rounded-sm border bg-sunken/50 p-3 text-sm text-ink">
              {item}
            </div>
          ))}
        </div>
      </Surface>

      <Surface>
        <h2 className="heading-sm text-ink mb-3">
          {isIt ? "Domini schema (entita principali)" : "Schema domains (core entities)"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SCHEMA_DOMAINS.map((domain) => (
            <article key={domain.name} className="rounded-md border bg-sunken/40 p-3">
              <p className="label-md text-ink">{domain.name}</p>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {domain.tables.map((table) => (
                  <li key={table}>
                    <span className="text-ink">{table}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Surface>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Surface>
          <h2 className="heading-sm text-ink mb-3">
            {isIt ? "Moat fields da tracciare da subito" : "Moat fields to track from day one"}
          </h2>
          <ul className="space-y-1.5 text-sm text-muted">
            {MOAT_FIELDS.map((field) => (
              <li key={field}>- {field}</li>
            ))}
          </ul>
        </Surface>

        <Surface>
          <h2 className="heading-sm text-ink mb-3">
            {isIt ? "Event taxonomy minima" : "Minimum event taxonomy"}
          </h2>
          <ul className="space-y-1.5 text-sm text-muted">
            {EVENT_TAXONOMY.map((eventName) => (
              <li key={eventName}>- {eventName}</li>
            ))}
          </ul>
        </Surface>
      </div>

      <Surface>
        <h2 className="heading-sm text-ink mb-3">
          {isIt ? "Rollout implementativo (90 giorni)" : "Implementation rollout (90 days)"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SCHEMA_ROLLOUT.map((step) => (
            <article key={step.phase} className="rounded-md border bg-sunken/40 p-3">
              <p className="label-md text-action">{step.phase}</p>
              <p className="text-sm text-ink mt-1">{step.scope}</p>
            </article>
          ))}
        </div>
      </Surface>
    </div>
  )
}

export function PlanView() {
  const { locale, state } = useWorkshop()
  const [planTab, setPlanTab] = useState<PlanTab>("execution")
  const isIt = locale === "it"
  const activePeople = state.participants.filter(
    (person) => person.role.trim() || person.name.trim()
  )
  const highlightedPainPoints = state.stickies.slice(0, 6)

  return (
    <div className="flex flex-col gap-5 max-w-6xl">
      <Surface className="bg-gradient-to-br from-action-soft/30 via-surface to-sunken">
        <p className="label-sm text-action uppercase tracking-wide">Execution Blueprint · v0 Inferred</p>
        <h1 className="heading-md font-display text-ink mt-1">
          {isIt
            ? "Roadmap, struttura aziendale e budget operativo"
            : "Roadmap, company structure, and operating budget"}
        </h1>
        <p className="text-sm text-muted mt-3 leading-relaxed max-w-4xl">
          {isIt
            ? "Piano costruito dai segnali emersi nel workshop e completato con inferenze operative. Obiettivo: trasformare la visione 'shop internazionale in un click' in una macchina esecutiva con ownership e milestone visibili."
            : "Plan built from workshop signals and completed with operational inference. Goal: turn the 'international shop in one click' vision into an execution machine with clear ownership and milestones."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <MetricCard label="North Star" target="1-click international shop ops" />
          <MetricCard
            label="GTM Wedge"
            target={isIt ? "Categorie ad alta frizione export" : "High-friction export categories"}
          />
          <MetricCard
            label="Market Engine"
            target={isIt ? "Seller claim + buyer early access loop" : "Seller claim + buyer early access loop"}
          />
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            <Link href="/operating-plan-print" target="_blank" className="inline-flex">
              <Button type="button" size="sm" variant="outline">
                {isIt ? "Apri versione stampabile (timeline)" : "Open printable timeline"}
              </Button>
            </Link>
            <Link href="/invitalia-letter-print" target="_blank" className="inline-flex">
              <Button type="button" size="sm" variant="outline">
                {isIt ? "Apri lettera Invitalia stampabile" : "Open printable Invitalia letter"}
              </Button>
            </Link>
          </div>
        </div>
      </Surface>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={planTab === "execution" ? "filled" : "outline"}
          onClick={() => setPlanTab("execution")}
        >
          {isIt ? "Piano di esecuzione" : "Execution Plan"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant={planTab === "schema" ? "filled" : "outline"}
          onClick={() => setPlanTab("schema")}
        >
          {isIt ? "Schema dati e moat" : "Data Schema & Moat"}
        </Button>
      </div>

      {planTab === "schema" ? (
        <SchemaTabContent isIt={isIt} />
      ) : (
        <>
          <VisualTimeline isIt={isIt} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Surface>
          <h2 className="heading-sm text-ink mb-3">
            {isIt ? "GTM operativo: dal database VAT al cluster target" : "Operating GTM: from VAT data to target clusters"}
          </h2>
          <ol className="space-y-2 text-sm text-muted">
            <li>1. Estrarre e normalizzare aziende con partita IVA.</li>
            <li>2. Calcolare score categoria e selezionare 1-3 cluster iniziali.</li>
            <li>3. Auto-generare shop e avviare claim campaign per i seller.</li>
            <li>4. Aprire early access buyer su claimed/non-claimed shops.</li>
            <li>5. Usare interazioni buyer per iterare ranking e roadmap feature.</li>
          </ol>
          <p className="label-md text-ink mt-4 mb-1">Category scoring model</p>
          <ul className="space-y-1 text-sm text-muted">
            {CATEGORY_MODEL.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </Surface>

        <Surface>
          <h2 className="heading-sm text-ink mb-3">
            {isIt ? "Hiring sequence (primi 6 mesi)" : "Hiring sequence (first 6 months)"}
          </h2>
          <div className="space-y-2">
            {HIRING_PLAN.map((step) => (
              <article key={step.when} className="rounded-sm border bg-sunken/50 p-3">
                <p className="label-md text-action">{step.when}</p>
                <p className="text-sm text-ink mt-1">{step.who}</p>
                <p className="text-xs text-muted mt-1">{step.why}</p>
              </article>
            ))}
          </div>
        </Surface>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
        <Surface>
          <h2 className="heading-sm text-ink mb-3">
            {isIt ? "Roadmap operativo (0-180 giorni)" : "Operating roadmap (0-180 days)"}
          </h2>
          <div className="flex flex-col gap-3">
            {ROADMAP.map((item) => (
              <article key={item.phase} className="rounded-md border bg-sunken/40 p-4">
                <p className="label-md text-action">{item.phase}</p>
                <p className="text-sm text-ink mt-1">{item.goal}</p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted">
                  {item.deliverables.map((deliverable) => (
                    <li key={deliverable}>- {deliverable}</li>
                  ))}
                </ul>
                <p className="text-xs text-muted mt-2">
                  <span className="text-ink">Owner:</span> {item.owner}
                </p>
              </article>
            ))}
          </div>
        </Surface>

        <Surface>
          <h2 className="heading-sm text-ink mb-3">
            {isIt ? "Segnali emersi dal workshop" : "Signals from workshop"}
          </h2>
          <p className="text-sm text-muted mb-3">
            {state.themes ||
              (isIt
                ? "Nessun tema ancora consolidato nella board."
                : "No consolidated themes in the board yet.")}
          </p>
          <ul className="space-y-2">
            {highlightedPainPoints.length ? (
              highlightedPainPoints.map((item) => (
                <li key={item.id} className="rounded-sm border bg-sunken px-3 py-2 text-sm text-ink">
                  {item.text}
                </li>
              ))
            ) : (
              <li className="text-sm text-muted">
                {isIt
                  ? "Aggiungi sticky nella board per affinare il piano."
                  : "Add sticky notes in the board to refine this plan."}
              </li>
            )}
          </ul>
          <div className="mt-4 rounded-sm border border-action/40 bg-action-soft p-3 text-sm">
            <p className="label-md text-ink mb-1">
              {isIt ? "Team base attuale" : "Current base team"}
            </p>
            <p className="text-muted">
              {activePeople.map((person) => `${person.role}${person.name ? ` (${person.name})` : ""}`).join(", ")}
            </p>
          </div>
        </Surface>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Surface>
          <h2 className="heading-sm text-ink mb-3">
            {isIt ? "Company structure per execution" : "Execution-oriented company structure"}
          </h2>
          <div className="space-y-3">
            {ORG_PODS.map((pod) => (
              <article key={pod.pod} className="rounded-md border bg-sunken/50 p-3">
                <p className="label-md text-ink">{pod.pod}</p>
                <p className="text-sm text-muted mt-1">{pod.mission}</p>
                <p className="text-xs text-muted mt-2">
                  <span className="text-ink">Roles:</span> {pod.roles}
                </p>
              </article>
            ))}
          </div>
        </Surface>

        <Surface>
          <h2 className="heading-sm text-ink mb-3">
            {isIt ? "KPI di controllo (board-level)" : "Control KPIs (board-level)"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {KPI.map((metric) => (
              <MetricCard key={metric.label} label={metric.label} target={metric.target} />
            ))}
          </div>
        </Surface>
      </div>

      <Surface>
        <h2 className="heading-sm text-ink mb-3">
          {isIt ? "Budget scenarios (inferred range)" : "Budget scenarios (inferred range)"}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {SCENARIOS.map((scenario) => (
            <article key={scenario.name} className="rounded-md border bg-sunken/50 p-4">
              <p className="label-md text-ink">{scenario.name}</p>
              <p className="text-sm text-muted mt-1">{scenario.focus}</p>
              <p className="text-sm mt-3">
                <span className="text-muted">Burn:</span>{" "}
                <span className="text-ink">{scenario.monthlyBurn}</span>
              </p>
              <p className="text-sm">
                <span className="text-muted">Runway:</span>{" "}
                <span className="text-ink">{scenario.runway}</span>
              </p>
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {scenario.mix.map((entry) => (
                  <li key={entry.label}>
                    {entry.label}: <span className="text-ink">{entry.value}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="text-xs text-muted mt-3">
          {isIt
            ? "Nota: numeri placeholder inferiti per scenario planning. Da sostituire con costo reale team + cloud + GTM."
            : "Note: placeholder numbers inferred for scenario planning. Replace with actual team, cloud, and GTM costs."}
        </p>
      </Surface>

      <Surface>
        <h2 className="heading-sm text-ink mb-3">
          {isIt ? "Risk map e mitigazioni (execution)" : "Risk map and mitigations (execution)"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {RISK_MAP.map((item) => (
            <article key={item.risk} className="rounded-sm border bg-sunken/50 p-3">
              <p className="label-md text-ink">{item.risk}</p>
              <p className="text-sm text-muted mt-1">{item.mitigation}</p>
            </article>
          ))}
        </div>
          </Surface>
        </>
      )}
    </div>
  )
}
