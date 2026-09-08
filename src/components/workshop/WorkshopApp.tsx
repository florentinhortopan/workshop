"use client"

import { BoardView } from "./board/BoardView"
import { ExportView } from "./ExportView"
import { GuideView } from "./GuideView"
import { WorkshopProvider, useWorkshop } from "./WorkshopProvider"
import { WorkshopShell } from "./WorkshopShell"

function ActiveView() {
  const { state } = useWorkshop()
  switch (state.view) {
    case "guide":
      return <GuideView />
    case "export":
      return <ExportView />
    default:
      return <BoardView />
  }
}

function Workspace() {
  const { hydrated } = useWorkshop()

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        Loading workspace…
      </div>
    )
  }

  return (
    <WorkshopShell>
      <ActiveView />
    </WorkshopShell>
  )
}

export function WorkshopApp() {
  return (
    <WorkshopProvider>
      <Workspace />
    </WorkshopProvider>
  )
}
