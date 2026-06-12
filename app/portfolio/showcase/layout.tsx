import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Showcase video | Osk Vid",
  description:
    "Showcase un produktu demonstrāciju video, kas izceļ detaļas, struktūru un padara piedāvājumu saprotamu klientiem.",
}

export default function ShowcaseLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

