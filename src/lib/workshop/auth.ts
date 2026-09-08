"use server"

import { createHash, timingSafeEqual } from "crypto"
import { cookies as nextCookies } from "next/headers"
import { revalidatePath } from "next/cache"

const WORKSHOP_COOKIE = "ida_workshop_ok"

function digest(value: string) {
  return createHash("sha256").update(`ida-workshop:${value}`).digest("hex")
}

function expectedPassword() {
  const fromEnv = process.env.WORKSHOP_PASSWORD?.trim()
  if (fromEnv) return fromEnv
  if (process.env.NODE_ENV !== "production") return "ida"
  return ""
}

function safeEqualHex(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

export async function isWorkshopUnlocked() {
  const password = expectedPassword()
  if (!password) return false
  const cookies = await nextCookies()
  const token = cookies.get(WORKSHOP_COOKIE)?.value
  if (!token) return false
  return safeEqualHex(token, digest(password))
}

export async function unlockWorkshop(
  _prev: { error?: string; ok?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; ok?: boolean }> {
  const password = expectedPassword()
  if (!password) {
    return { error: "Workshop password is not configured on the server." }
  }

  const submitted = String(formData.get("password") ?? "")
  if (!safeEqualHex(digest(submitted), digest(password))) {
    return { error: "Wrong password." }
  }

  const cookies = await nextCookies()
  cookies.set(WORKSHOP_COOKIE, digest(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
  })

  revalidatePath("/", "layout")
  return { ok: true }
}

export async function lockWorkshop() {
  const cookies = await nextCookies()
  cookies.set(WORKSHOP_COOKIE, "", { maxAge: -1, path: "/" })
  revalidatePath("/", "layout")
}
