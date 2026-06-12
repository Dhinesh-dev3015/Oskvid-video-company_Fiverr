"use client"

import { useEffect, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const isAnimatingRef = useRef(false)
  const isMountedRef = useRef(true)
  const pathname = usePathname()

  const cleanup = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
      animationIdRef.current = null
    }
    isAnimatingRef.current = false
    particlesRef.current = []
  }, [])

  // Cleanup when route changes
  useEffect(() => {
    cleanup()
    // Small delay to allow page transition
    const timeoutId = setTimeout(() => {
      if (isMountedRef.current) {
        isAnimatingRef.current = true
      }
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [pathname, cleanup])

  const resizeCanvas = useCallback(() => {
    if (!isMountedRef.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // Limit DPR for performance
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    } catch (error) {
      console.warn("Canvas resize error:", error)
    }
  }, [])

  useEffect(() => {
    isMountedRef.current = true

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initial canvas setup
    resizeCanvas()

    // Create particles with reduced count for better performance
    const particles: Particle[] = []
    const particleCount = Math.min(20, Math.floor((window.innerWidth * window.innerHeight) / 30000))

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.2 + 0.1,
      })
    }

    particlesRef.current = particles
    isAnimatingRef.current = true

    // Animation loop with better performance
    let lastTime = 0
    const targetFPS = 24 // Reduced FPS for better performance
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      if (!isAnimatingRef.current || !canvas || !ctx || !isMountedRef.current) return

      try {
        if (currentTime - lastTime >= frameInterval) {
          // Clear canvas
          const canvasWidth = canvas.width / Math.min(window.devicePixelRatio || 1, 2)
          const canvasHeight = canvas.height / Math.min(window.devicePixelRatio || 1, 2)

          ctx.clearRect(0, 0, canvasWidth, canvasHeight)

          // Update and draw particles
          particlesRef.current.forEach((particle) => {
            // Update position
            particle.x += particle.vx
            particle.y += particle.vy

            // Wrap around edges
            if (particle.x < 0) particle.x = canvasWidth
            if (particle.x > canvasWidth) particle.x = 0
            if (particle.y < 0) particle.y = canvasHeight
            if (particle.y > canvasHeight) particle.y = 0

            // Draw particle
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(204, 83, 57, ${particle.opacity})`
            ctx.fill()
          })

          lastTime = currentTime
        }

        if (isAnimatingRef.current && isMountedRef.current) {
          animationIdRef.current = requestAnimationFrame(animate)
        }
      } catch (error) {
        console.warn("Animation error:", error)
        cleanup()
      }
    }

    // Handle resize with debouncing
    let resizeTimeout: NodeJS.Timeout | null = null
    const handleResize = () => {
      if (!isMountedRef.current) return

      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }

      resizeTimeout = setTimeout(() => {
        try {
          resizeCanvas()
          // Redistribute particles on resize
          const canvasWidth = window.innerWidth
          const canvasHeight = window.innerHeight

          particlesRef.current.forEach((particle) => {
            if (particle.x > canvasWidth) particle.x = canvasWidth
            if (particle.y > canvasHeight) particle.y = canvasHeight
          })
        } catch (error) {
          console.warn("Resize error:", error)
        }
      }, 250)
    }

    window.addEventListener("resize", handleResize, { passive: true })

    // Start animation with delay
    const startTimeout = setTimeout(() => {
      if (isMountedRef.current && isAnimatingRef.current) {
        animationIdRef.current = requestAnimationFrame(animate)
      }
    }, 100)

    // Cleanup function
    return () => {
      isMountedRef.current = false
      cleanup()
      window.removeEventListener("resize", handleResize)
      if (resizeTimeout) clearTimeout(resizeTimeout)
      if (startTimeout) clearTimeout(startTimeout)
    }
  }, [cleanup, resizeCanvas])

  // Additional cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false
      cleanup()
    }
  }, [cleanup])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{
        opacity: 0.2,
        width: "100vw",
        height: "100vh",
      }}
    />
  )
}
