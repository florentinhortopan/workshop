"use client"

type PrintTimelineBar = {
  lane: string
  label: string
  start: number
  end: number
}

const TIMELINE_BARS: PrintTimelineBar[] = [
  { lane: "Data & Targeting", label: "VAT ingest + category scoring", start: 0, end: 1.5 },
  { lane: "Product Core", label: "Auto-shop generation + claim flow", start: 0.5, end: 2.5 },
  { lane: "Buyer Activation", label: "Buyer early access + interaction loop", start: 1.5, end: 3.5 },
  { lane: "Compliance & Ops", label: "Export readiness + HITL docs", start: 2, end: 4.5 },
  { lane: "Automation", label: "Payments/invoicing integration wave 1", start: 3, end: 5.5 },
  { lane: "Hiring", label: "Wave 1: Head Product + 2 Full-stack + GTM Lead", start: 0, end: 1.2 },
  { lane: "Hiring", label: "Wave 2: AI/Automation + Trade Ops", start: 1.5, end: 3 },
  { lane: "Hiring", label: "Wave 3: SDR/AE + Buyer Success + Full-stack", start: 3, end: 5.5 },
]

const DEPENDENCIES = [
  "VAT ingest + category scoring -> Auto-shop generation + claim flow",
  "Auto-shop generation + claim flow -> Buyer early access + interaction loop",
  "Auto-shop generation + claim flow -> Export readiness + HITL docs",
  "Export readiness + HITL docs -> Payments/invoicing integration wave 1",
  "Hiring Wave 1 -> Hiring Wave 2 -> Hiring Wave 3",
]

function barStyle(start: number, end: number) {
  const left = (start / 6) * 100
  const width = ((end - start) / 6) * 100
  return { left: `${left}%`, width: `${Math.max(width, 8)}%` }
}

export function OperatingPlanPrintView() {
  const lanes = Array.from(new Set(TIMELINE_BARS.map((item) => item.lane)))

  return (
    <main className="print-page bg-white text-black min-h-screen p-8">
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          html,
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .print-page {
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="max-w-[980px] mx-auto">
        <div className="no-print flex justify-end mb-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-2 rounded border border-black text-sm"
          >
            Print
          </button>
        </div>

        <header className="mb-6">
          <h1 className="text-2xl font-semibold">
            IDA Operating Roadmap - Printable Executive Plan
          </h1>
          <p className="text-sm mt-2">
            Objective: launch a defensible two-sided export platform from VAT targeting, to
            auto-generated international shops, to buyer activation and compliance-led automation.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Timeline M0-M6 (overlapping execution + hiring)</h2>
          <div className="border border-black p-3">
            <div className="grid grid-cols-7 text-xs mb-2">
              <div className="text-center">M0</div>
              <div className="text-center">M1</div>
              <div className="text-center">M2</div>
              <div className="text-center">M3</div>
              <div className="text-center">M4</div>
              <div className="text-center">M5</div>
              <div className="text-center">M6</div>
            </div>
            <div className="space-y-2">
              {lanes.map((lane) => (
                <div key={lane} className="grid grid-cols-[170px_1fr] gap-2 items-center">
                  <div className="text-xs">{lane}</div>
                  <div className="relative h-8 border border-black/30">
                    {TIMELINE_BARS.filter((item) => item.lane === lane).map((item) => (
                      <div
                        key={`${lane}-${item.label}`}
                        className="absolute top-1/2 -translate-y-1/2 h-6 px-2 text-[10px] leading-6 truncate border border-black/50 bg-black/5"
                        style={barStyle(item.start, item.end)}
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
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Critical Dependencies</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {DEPENDENCIES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Quarter Goals</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-black p-3">
              <p className="font-semibold">Q1 (M0-M3)</p>
              <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                <li>Target 1-3 high-friction categories</li>
                <li>Launch claim/non-claim seller flow</li>
                <li>Activate early-access buyers</li>
                <li>Close hiring waves 1-2</li>
              </ul>
            </div>
            <div className="border border-black p-3">
              <p className="font-semibold">Q2 (M3-M6)</p>
              <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                <li>Operationalize compliance/HITL workflows</li>
                <li>Ship first payment/invoicing integrations</li>
                <li>Scale GTM with buyer intent data</li>
                <li>Close hiring wave 3 and stabilize pod operations</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
