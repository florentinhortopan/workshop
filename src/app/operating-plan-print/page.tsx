import { OperatingPlanPrintView } from "@/components/workshop/OperatingPlanPrintView"
import { WorkshopGate } from "@/components/workshop/WorkshopGate"
import { isWorkshopUnlocked } from "@/lib/workshop/auth"

export const dynamic = "force-dynamic"

export default async function OperatingPlanPrintPage() {
  const unlocked = await isWorkshopUnlocked()
  return unlocked ? <OperatingPlanPrintView /> : <WorkshopGate />
}
