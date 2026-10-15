import { InvitaliaLetterPrintView } from "@/components/workshop/InvitaliaLetterPrintView"
import { WorkshopGate } from "@/components/workshop/WorkshopGate"
import { isWorkshopUnlocked } from "@/lib/workshop/auth"

export const dynamic = "force-dynamic"

export default async function InvitaliaLetterPrintPage() {
  const unlocked = await isWorkshopUnlocked()
  return unlocked ? <InvitaliaLetterPrintView /> : <WorkshopGate />
}
