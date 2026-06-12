"use client"

import { useEffect, useRef } from "react"

export function PerformanceMonitor() {
  const observerRef = useRef<PerformanceObserver | null>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    if (typeof window !== "undefined" && "performance" in window && "PerformanceObserver" in window) {
      try {
        // Monitor Core Web Vitals
        const observer = new PerformanceObserver((list) => {
          if (!isMountedRef.current) return

          try {
            for (const entry of list.getEntries()) {
              if (entry.entryType === "measure") {
                console.log(`Performance: ${entry.name} - ${entry.duration}ms`)
              }
            }
          } catch (error) {
            console.warn("Performance monitoring error:", error)
          }
        })

        observerRef.current = observer

        observer.observe({ entryTypes: ["measure", "navigation"] })
      } catch (e) {
        // Fallback for older browsers
        console.log("Performance monitoring not supported")
      }
    }

    return () => {
      isMountedRef.current = false
      if (observerRef.current) {
        try {
          observerRef.current.disconnect()
        } catch (error) {
          console.warn("Observer disconnect error:", error)
        }
        observerRef.current = null
      }
    }
  }, [])

  return null
}
