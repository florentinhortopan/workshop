"use client"

import { Button } from "@/components/ui/Button"
import { unlockWorkshop } from "@/lib/workshop/auth"
import { WORKSHOP_SUBTITLE, WORKSHOP_TITLE } from "@/lib/workshop/content"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"

export function WorkshopGate() {
  const router = useRouter()
  const [state, action, pending] = useActionState(unlockWorkshop, null)

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
        <div>
          <h1 className="heading-md font-display text-ink">{WORKSHOP_TITLE}</h1>
          <p className="text-muted mt-1">{WORKSHOP_SUBTITLE}</p>
          <p className="text-sm text-muted mt-3">
            Unlisted team workspace. Ask Florentin for the password.
          </p>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="label-md text-ink">Password</span>
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
          Unlock workshop
        </Button>
      </form>
    </main>
  )
}
