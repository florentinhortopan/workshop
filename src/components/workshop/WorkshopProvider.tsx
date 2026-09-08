"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"
import { WORKSHOP_STORAGE_KEY, type WorkshopState } from "@/lib/workshop/types"
import { createEmptyState, mergeWorkshopState } from "@/lib/workshop/state"

type WorkshopContextValue = {
  state: WorkshopState
  setState: Dispatch<SetStateAction<WorkshopState>>
  hydrated: boolean
  reset: () => void
  patch: (partial: Partial<WorkshopState>) => void
}

const WorkshopContext = createContext<WorkshopContextValue | null>(null)

export function WorkshopProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WorkshopState>(createEmptyState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WORKSHOP_STORAGE_KEY)
      if (raw) setState(mergeWorkshopState(JSON.parse(raw)))
    } catch {
      // keep empty state
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(WORKSHOP_STORAGE_KEY, JSON.stringify(state))
  }, [hydrated, state])

  const reset = useCallback(() => {
    const next = createEmptyState()
    setState(next)
    window.localStorage.setItem(WORKSHOP_STORAGE_KEY, JSON.stringify(next))
  }, [])

  const patch = useCallback((partial: Partial<WorkshopState>) => {
    setState((current) => ({ ...current, ...partial }))
  }, [])

  const value = useMemo(
    () => ({ state, setState, hydrated, reset, patch }),
    [state, hydrated, reset, patch]
  )

  return (
    <WorkshopContext.Provider value={value}>
      {children}
    </WorkshopContext.Provider>
  )
}

export function useWorkshop() {
  const ctx = useContext(WorkshopContext)
  if (!ctx) throw new Error("useWorkshop must be used inside WorkshopProvider")
  return ctx
}
