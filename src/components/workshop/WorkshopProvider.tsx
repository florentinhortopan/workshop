"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"
import { LOCALE_STORAGE_KEY, type Locale } from "@/lib/workshop/i18n"
import { WORKSHOP_STORAGE_KEY, type WorkshopState } from "@/lib/workshop/types"
import { createEmptyState, mergeWorkshopState, uid } from "@/lib/workshop/state"

const SNAPSHOT_KEY = `${WORKSHOP_STORAGE_KEY}-snapshots`
/** Take an automatic snapshot at most this often while editing. */
const SNAPSHOT_INTERVAL_MS = 60_000
const SNAPSHOT_LIMIT = 24

export type SnapshotReason = "auto" | "before reset" | "before restore"

export type Snapshot = {
  id: string
  at: string // ISO timestamp
  reason: SnapshotReason
  state: WorkshopState
}

type WorkshopContextValue = {
  state: WorkshopState
  setState: Dispatch<SetStateAction<WorkshopState>>
  locale: Locale
  setLocale: (locale: Locale) => void
  hydrated: boolean
  lastSavedAt: Date | null
  snapshots: Snapshot[]
  reset: () => void
  restoreSnapshot: (id: string) => void
  restoreFromJson: (raw: unknown) => boolean
  patch: (partial: Partial<WorkshopState>) => void
}

const WorkshopContext = createContext<WorkshopContextValue | null>(null)

function readSnapshots(): Snapshot[] {
  try {
    const raw = window.localStorage.getItem(SNAPSHOT_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Snapshot[]) : []
  } catch {
    return []
  }
}

export function WorkshopProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WorkshopState>(createEmptyState)
  const [locale, setLocaleState] = useState<Locale>("en")
  const [hydrated, setHydrated] = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const lastSnapshotAtRef = useRef(0)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WORKSHOP_STORAGE_KEY)
      if (raw) setState(mergeWorkshopState(JSON.parse(raw)))
    } catch {
      // keep empty state
    }
    const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (savedLocale === "it" || savedLocale === "en") {
      setLocaleState(savedLocale)
    }
    setSnapshots(readSnapshots())
    lastSnapshotAtRef.current = Date.now()
    setHydrated(true)
  }, [])

  const pushSnapshot = useCallback(
    (snapshotState: WorkshopState, reason: SnapshotReason) => {
      lastSnapshotAtRef.current = Date.now()
      setSnapshots((current) => {
        const next: Snapshot[] = [
          {
            id: uid("snap"),
            at: new Date().toISOString(),
            reason,
            state: snapshotState,
          },
          ...current,
        ].slice(0, SNAPSHOT_LIMIT)
        try {
          window.localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(next))
        } catch {
          // storage full — keep going, the main record still saves
        }
        return next
      })
    },
    []
  )

  // Autosave on every change + rolling snapshot once a minute while editing.
  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(WORKSHOP_STORAGE_KEY, JSON.stringify(state))
    setLastSavedAt(new Date())
    if (Date.now() - lastSnapshotAtRef.current >= SNAPSHOT_INTERVAL_MS) {
      pushSnapshot(state, "auto")
    }
  }, [hydrated, state, pushSnapshot])

  const reset = useCallback(() => {
    pushSnapshot(state, "before reset")
    setState(createEmptyState())
  }, [state, pushSnapshot])

  const restoreSnapshot = useCallback(
    (id: string) => {
      const snapshot = snapshots.find((entry) => entry.id === id)
      if (!snapshot) return
      pushSnapshot(state, "before restore")
      setState(mergeWorkshopState(snapshot.state))
    },
    [state, snapshots, pushSnapshot]
  )

  const restoreFromJson = useCallback(
    (raw: unknown): boolean => {
      // Only accept files that actually carry a workshop board (v2 or v3).
      const version =
        raw && typeof raw === "object"
          ? (raw as { version?: number }).version
          : undefined
      if (version !== 2 && version !== 3) {
        return false
      }
      pushSnapshot(state, "before restore")
      setState(mergeWorkshopState(raw))
      return true
    },
    [state, pushSnapshot]
  )

  const patch = useCallback((partial: Partial<WorkshopState>) => {
    setState((current) => ({ ...current, ...partial }))
  }, [])

  const setLocale = useCallback((value: Locale) => {
    setLocaleState(value)
    window.localStorage.setItem(LOCALE_STORAGE_KEY, value)
  }, [])

  const value = useMemo(
    () => ({
      state,
      setState,
      locale,
      setLocale,
      hydrated,
      lastSavedAt,
      snapshots,
      reset,
      restoreSnapshot,
      restoreFromJson,
      patch,
    }),
    [
      state,
      locale,
      setLocale,
      hydrated,
      lastSavedAt,
      snapshots,
      reset,
      restoreSnapshot,
      restoreFromJson,
      patch,
    ]
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
