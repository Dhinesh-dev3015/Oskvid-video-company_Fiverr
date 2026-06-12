import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Portfolio | Osk Vid",
  description:
    "Ieskaties Osk Vid portfolio ar spilgtākajiem kāzu, promo, mūzikas un showcase video projektiem, kas stāsta klientu stāstus.",
}

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

