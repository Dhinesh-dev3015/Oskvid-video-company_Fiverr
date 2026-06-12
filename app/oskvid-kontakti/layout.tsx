import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Kontakti | Osk Vid",
  description:
    "Sazinies ar Osk Vid, lai rezervētu filmēšanu vai saņemtu piedāvājumu – e-pasts, tālrunis un ērta kontaktforma.",
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

