"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Kad mainās ceļš (pathname), ritināt uz augšu
    const scrollToTop = () => {
      try {
        if (typeof window !== "undefined") {
          window.scrollTo({
            top: 0,
            behavior: "instant", // Izmantojam "instant" nevis "smooth", lai izvairītos no redzamas ritināšanas
          })
        }
      } catch (error) {
        console.warn("Scroll to top error:", error)
      }
    }

    // Neliels delay, lai ļautu lapai pilnībā ielādēties
    const timeoutId = setTimeout(scrollToTop, 50)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [pathname])

  return null // Šī komponente neko nerenderē
}
