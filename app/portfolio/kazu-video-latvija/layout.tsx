import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Kāzu video | Osk Vid",
  description:
    "Emocionāli kāzu video ar dokumentālu sajūtu, radošu montāžu un kino kvalitāti katram pārim visā Latvijā.",
}

export default function WeddingsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

