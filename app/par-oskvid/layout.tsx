import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Par mani | Osk Vid",
  description:
    "Uzzini par Osk Vid komandas stāstu, radošo pieeju un uzticamiem partneriem, kas rada kino kvalitātes video Latvijā.",
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

