"use client"

import { Button } from "@/components/ui/Button"
import { unlockWorkshop } from "@/lib/workshop/auth"
import { WORKSHOP_SUBTITLE, WORKSHOP_TITLE } from "@/lib/workshop/content"
import { LOCALE_STORAGE_KEY, tr, type Locale } from "@/lib/workshop/i18n"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react"

export function WorkshopGate() {
  const router = useRouter()
  const [state, action, pending] = useActionState(unlockWorkshop, null)
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (saved === "it" || saved === "en") setLocale(saved)
  }, [])

  useEffect(() => {
    if (state?.ok) router.refresh()
  }, [state, router])

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        action={action}
        className="w-full max-w-md rounded-lg bg-surface border shadow-diffuse p-6 md:p-8 flex flex-col gap-5"
      >
        <Image src="/Logo.svg" width={126} height={40} alt="IDA" priority />
        <div className="flex items-center self-end rounded-sm border overflow-hidden">
          <button
            type="button"
            onClick={() => {
              setLocale("en")
              window.localStorage.setItem(LOCALE_STORAGE_KEY, "en")
            }}
            className={`px-2.5 h-8 text-xs font-medium ${locale === "en" ? "bg-action text-action-on" : "bg-surface text-muted"}`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => {
              setLocale("it")
              window.localStorage.setItem(LOCALE_STORAGE_KEY, "it")
            }}
            className={`px-2.5 h-8 text-xs font-medium border-l ${locale === "it" ? "bg-action text-action-on" : "bg-surface text-muted"}`}
          >
            IT
          </button>
        </div>
        <div>
          <h1 className="heading-md font-display text-ink">{tr(locale, WORKSHOP_TITLE)}</h1>
          <p className="text-muted mt-1">{tr(locale, WORKSHOP_SUBTITLE)}</p>
          <p className="text-sm text-muted mt-3">
            {tr(locale, "Unlisted team workspace. Ask Florentin for the password.")}
          </p>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="label-md text-ink">{tr(locale, "Password")}</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full px-3 py-2.5 border rounded-sm bg-surface text-ink focus:border-action focus:outline-none focus-visible:ring-2 focus-visible:ring-action"
          />
        </label>
        {state?.error ? (
          <p className="text-sm text-danger rounded-sm border-danger border bg-danger px-3 py-2">
            {state.error}
          </p>
        ) : null}
        <Button type="submit" fullWidth loading={pending}>
          {tr(locale, "Unlock workshop")}
        </Button>
      </form>
    </main>
  )
}
