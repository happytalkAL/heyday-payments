import { permanentRedirect } from "next/navigation"

export default async function UsagePage() {
  permanentRedirect("/payment/subscription")
}
