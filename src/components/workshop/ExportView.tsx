"use client"

import { Button } from "@/components/ui/Button"
import { exportWorkshopEmail } from "@/lib/workshop/exportEmail"
import { REVIEW_DATE } from "@/lib/workshop/content"
import { useState } from "react"
import { Surface } from "./fields"
import { useWorkshop } from "./WorkshopProvider"

export function ExportView() {
  const { state } = useWorkshop()
  const [copied, setCopied] = useState(false)
  const email = exportWorkshopEmail(state)

  const copy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const download = () => {
    const blob = new Blob([email], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "ida-workshop-decisions.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <Surface>
        <h1 className="heading-md font-display text-ink mb-2">
          The 24-hour email
        </h1>
        <p className="text-sm text-ink leading-relaxed">
          Assembled live from the board. Review it, fill any [TBD] gaps on the
          Board tab, then copy and send to the team within 24 hours. This is
          binding for the next 30 days — next review {state.outcomes.nextUpdate || REVIEW_DATE}.
        </p>
        <div className="flex gap-2 mt-4">
          <Button type="button" onClick={copy}>
            {copied ? "Copied ✓" : "Copy email"}
          </Button>
          <Button type="button" variant="outline" onClick={download}>
            Download .txt
          </Button>
        </div>
      </Surface>

      <Surface>
        <pre className="whitespace-pre-wrap text-sm text-ink bg-sunken rounded-sm border p-4 max-h-[560px] overflow-auto font-sans leading-relaxed">
          {email}
        </pre>
      </Surface>
    </div>
  )
}
