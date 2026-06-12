import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Mūzikas video | Osk Vid",
  description:
    "Mūzikas video producēšana ar dinamisku stāstījumu, gaismu dizainu un vizuāliem efektiem, kas pastiprina dziesmas emocijas.",
}

export default function MusicLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

