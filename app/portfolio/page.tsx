"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import PortfolioGrid from "@/components/portfolio-grid"
import { useState, useEffect } from "react"
import { DynamicContent, DynamicImage } from "@/components/dynamic-content"

export default function PortfolioPage() {
  const { t } = useLanguage()
  const [refreshKey, setRefreshKey] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Get content directly from localStorage like PortfolioGrid does
  const getContent = (key: string, fallback: string) => {
    if (typeof window === "undefined") return fallback
    return localStorage.getItem(key) || fallback
  }

  // Listen for content updates like PortfolioGrid does
  useEffect(() => {
    const handleContentUpdate = () => {
      console.log("Portfolio page content updated")
      setRefreshKey(prev => prev + 1)
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && event.key.startsWith("content_portfolio")) {
        handleContentUpdate()
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("contentUpdated", handleContentUpdate)
      window.addEventListener("storage", handleStorageChange)
    }

    return () => {
      if (typeof window !== "undefined") {
        try {
          window.removeEventListener("contentUpdated", handleContentUpdate)
          window.removeEventListener("storage", handleStorageChange)
        } catch (error) {
          console.warn("Error removing event listeners:", error)
        }
      }
    }
  }, [])

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-8xl">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16 xl:mb-20"
        >
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-6"
            style={{ color: "#cc5339" }}
          >
            <DynamicContent contentKey="portfolioTitle" fallback="Mūsu projekti"/>
            {/*{getContent("content_portfolioTitle", "Mūsu projekti")}*/}
          </h1>
          <div className="w-32 sm:w-40 lg:w-48 h-0.5 bg-primary mx-auto mb-8 lg:mb-12"></div>
        </motion.div>

        {/* Interactive Portfolio Grid with YouTube Videos */}
        <PortfolioGrid />

        <div key={`${refreshKey}-${mounted}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 max-w-6xl mx-auto mb-16">
          {/* Kāzu filmas */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group cursor-pointer"
          >
            <Link href="/portfolio/kazu-video-latvija" className="block">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
                <Image
                  src={getContent("content_portfolioWeddingImage", "/images/wedding-couple-church.jpeg")}
                  alt="Kāzu filmas"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="font-semibold text-lg" style={{ color: "#cc5339" }}>
                    VAIRĀK INFO →
                  </span>
                </div>
              </div>
              <h3
                className="text-xl font-bold text-center group-hover:opacity-80 transition-colors mb-3"
                style={{ color: "#cc5339" }}
              >
                <DynamicContent contentKey="portfolioWeddingsTitle" fallback="Kāzu Filmas"/>
                {/*{getContent("content_portfolioWeddingsTitle", "Kāzu Filmas")}*/}
              </h3>
            </Link>
          </motion.div>


          {/* Reklāmas video */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group cursor-pointer"
          >
            <Link href="/portfolio/reklamas-video" className="block">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
                {/*<DynamicImage contentKey="portfolioPromoImage" fallback="/images/promotional-production.jpeg" alt="Reklāmas video"/>*/}
                <Image
                  src={getContent("content_portfolioPromoImage", "/images/promotional-production.jpeg")}
                  alt="Reklāmas video"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="font-semibold text-lg" style={{ color: "#cc5339" }}>
                    VAIRĀK INFO →
                  </span>
                </div>
              </div>
              <h3
                className="text-xl font-bold text-center group-hover:opacity-80 transition-colors mb-3"
                style={{ color: "#cc5339" }}
              >
                <DynamicContent contentKey="portfolioPromoTitle" fallback="Reklāmas Video"/>
                {/*{getContent("content_portfolioPromoTitle", "Reklāmas Video")}*/}
              </h3>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
