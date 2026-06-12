import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Pakalpojumi | Osk Vid",
  description:
    "Pilna servisa video producēšana Latvijā – kāzas, reklāma, korporatīvie un pasākumu projekti ar profesionālu komandu.",
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

