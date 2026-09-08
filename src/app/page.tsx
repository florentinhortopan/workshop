import { WorkshopApp } from "@/components/workshop/WorkshopApp"
import { WorkshopGate } from "@/components/workshop/WorkshopGate"
import { isWorkshopUnlocked } from "@/lib/workshop/auth"

export const dynamic = "force-dynamic"

export default async function Page() {
  const unlocked = await isWorkshopUnlocked()
  return unlocked ? <WorkshopApp /> : <WorkshopGate />
}
