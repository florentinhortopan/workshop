"use client"

import { Button } from "@/components/ui/Button"
import { uid } from "@/lib/workshop/state"
import type { ListItem } from "@/lib/workshop/types"
import { cn } from "@/lib/utils"
import { Plus, X } from "lucide-react"
import { useState } from "react"

export function Surface({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        "rounded-lg bg-surface border shadow-soft p-4 md:p-6 scroll-mt-40",
        className
      )}
    >
      {children}
    </section>
  )
}

export function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label?: string
  hint?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <label className="flex flex-col gap-1.5">
      {label ? <span className="label-md text-ink">{label}</span> : null}
      {hint ? <span className="text-sm text-muted">{hint}</span> : null}
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-3 py-2.5 border rounded-sm bg-surface text-ink placeholder:text-muted/70 focus:border-action focus:outline-none focus-visible:ring-2 focus-visible:ring-action text-sm leading-relaxed"
      />
    </label>
  )
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  onKeyDown,
  className,
  "aria-label": ariaLabel,
}: {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  className?: string
  "aria-label"?: string
}) {
  const input = (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyDown}
      className={cn(
        "w-full px-3 py-2 border rounded-sm bg-surface text-ink placeholder:text-muted/70 focus:border-action focus:outline-none focus-visible:ring-2 focus-visible:ring-action text-sm",
        className
      )}
    />
  )

  if (!label) return input

  return (
    <label className="flex flex-col gap-1.5">
      <span className="label-md text-ink">{label}</span>
      {input}
    </label>
  )
}

/** Editable bullet list with add / remove — the template's blank lines. */
export function AddableList({
  items,
  onChange,
  placeholder,
  addLabel = "Add",
  renderExtra,
}: {
  items: ListItem[]
  onChange: (items: ListItem[]) => void
  placeholder?: string
  addLabel?: string
  renderExtra?: (item: ListItem) => React.ReactNode
}) {
  const [draft, setDraft] = useState("")

  const add = () => {
    const text = draft.trim()
    if (!text) return
    onChange([...items, { id: uid("item"), text }])
    setDraft("")
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={setDraft}
          placeholder={placeholder}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              add()
            }
          }}
        />
        <Button
          type="button"
          size="sm"
          onClick={add}
          aria-label={addLabel}
          className="shrink-0 h-[38px]"
        >
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
      </div>
      {items.length ? (
        <ul className="flex flex-col gap-1.5">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-2 rounded-sm border bg-sunken px-3 py-2"
            >
              <span className="text-sm text-ink leading-relaxed">
                {item.text}
              </span>
              <span className="flex items-center gap-2 shrink-0">
                {renderExtra?.(item)}
                <button
                  type="button"
                  onClick={() =>
                    onChange(items.filter((entry) => entry.id !== item.id))
                  }
                  className="text-muted hover:text-ink"
                  aria-label="Remove"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function ExampleHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-muted italic border-l-2 border-action/40 pl-3">
      e.g. {children}
    </p>
  )
}
