import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Atsauksmes | Osk Vid",
  description:
    "Klientu atsauksmes par sadarbību ar Osk Vid – kvalitāte, radošums un uzticamība katrā video projektā.",
}

export default function ReviewsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

