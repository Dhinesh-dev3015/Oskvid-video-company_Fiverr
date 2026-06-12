import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Pasākumu video | Osk Vid",
  description:
    "Korporatīvie un reklāmas video, kas skaidri izstāsta zīmola vērtību, piesaista auditoriju un stiprina pārdošanu.",
}

export default function PromoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

