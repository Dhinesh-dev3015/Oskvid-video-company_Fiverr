import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Blogs | Osk Vid",
  description:
    "Jaunākie Osk Vid projekti, ziņas un padomi par profesionālu video producēšanu un saturu Latvijā.",
}

export default function NewsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

