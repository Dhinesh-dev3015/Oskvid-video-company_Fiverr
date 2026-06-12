"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play, Facebook, Youtube, Linkedin, Instagram, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { DynamicImage } from "@/components/dynamic-content"

export default function Footer() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleCount, setVisibleCount] = useState(4)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Static partner structure - content will be loaded via DynamicContent
  const partners = [
    { id: 1, nameKey: "partner1Name", logoKey: "partner1Logo" },
    { id: 2, nameKey: "partner2Name", logoKey: "partner2Logo" },
    { id: 3, nameKey: "partner3Name", logoKey: "partner3Logo" },
    { id: 4, nameKey: "partner4Name", logoKey: "partner4Logo" },
    { id: 5, nameKey: "partner5Name", logoKey: "partner5Logo" },
    { id: 6, nameKey: "partner6Name", logoKey: "partner6Logo" },
    { id: 7, nameKey: "partner7Name", logoKey: "partner7Logo" },
    { id: 8, nameKey: "partner8Name", logoKey: "partner8Logo" },
  ]

  // Determine how many logos to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 768) {
        setVisibleCount(2)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3)
      } else {
        setVisibleCount(4)
      }
    }

    handleResize()
    // Only add event listener if window exists
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (typeof window !== "undefined") {
        try {
          window.removeEventListener("resize", handleResize)
        } catch (error) {
          console.warn("Error removing resize listener:", error)
        }
      }
    }
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    if (isPaused) return

    timerRef.current = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % (partners.length - visibleCount + 1))
    }, 3000)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [activeIndex, isPaused, visibleCount, partners.length])

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => Math.min(partners.length - visibleCount, prevIndex + 1))
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <footer className="relative bg-gray-50">
      {/* Partners Carousel */}
      <div className="border-b border-gray-200 py-10">
        <div className="container-mobile-padding mx-auto max-w-8xl">
          <div className="relative mx-auto max-w-7xl xl:max-w-8xl">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * (100 / visibleCount)}%)` }}
              >
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="w-full flex-shrink-0 px-2 sm:px-3 md:px-4 lg:px-6"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <div className="flex h-16 sm:h-18 lg:h-20 xl:h-22 items-center justify-center">
                      <div className="relative h-8 sm:h-10 lg:h-12 xl:h-14 w-full">
                        <DynamicImage
                          contentKey={partner.logoKey}
                          fallback={`/partners/${
                            partner.id === 1
                              ? "rsu-logo-color.svg"
                              : partner.id === 2
                                ? "zanel-logo-color.svg"
                                : partner.id === 3
                                  ? "skudras-metropole-logo-color.svg"
                                  : partner.id === 4
                                    ? "tv3-group-logo-color.svg"
                                    : partner.id === 5
                                      ? "marupes-novads-logo-color.svg"
                                      : partner.id === 6
                                        ? "hanseatic-logo-color.svg"
                                        : partner.id === 7
                                          ? "dole-kravas-auto-logo-color.svg"
                                          : "compensa-logo-color.svg"
                          }`}
                          alt={`Partner ${partner.id}`}
                          fill
                          className="object-contain"
                          objectFit="contain"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={activeIndex === 0}
                className="h-10 w-10 sm:h-12 sm:w-12 bg-white border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 touch-target"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Previous</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={togglePause}
                className="h-10 w-10 sm:h-12 sm:w-12 bg-white border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 touch-target"
              >
                {isPaused ? <Play className="h-5 w-5 sm:h-6 sm:w-6" /> : <Pause className="h-5 w-5 sm:h-6 sm:w-6" />}
                <span className="sr-only">{isPaused ? "Play" : "Pause"}</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={activeIndex >= partners.length - visibleCount}
                className="h-10 w-10 sm:h-12 sm:w-12 bg-white border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 touch-target"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Content */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Kontakti</h3>
              <div className="space-y-2">
                <a href="mailto:info@oskvid.com" className="flex items-center gap-2 text-gray-600 hover:text-[#cc5339] transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@oskvid.com</span>
                </a>
                <a href="tel:+37123304329" className="flex items-center gap-2 text-gray-600 hover:text-[#cc5339] transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+371 23304329</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Sociālie tīkli</h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/Oskvidcinematography/?locale=lv_LV" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#cc5339] hover:text-white transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/osk_vid/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#cc5339] hover:text-white transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@OskarsAndersons" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#cc5339] hover:text-white transition-all duration-300">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://lv.linkedin.com/in/oskvid" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#cc5339] hover:text-white transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Brand/Logo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Osk Vid</h3>
              <p className="text-gray-600 text-sm">
                Profesionāla kāzu un korporatīvo video filmēšana
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 Osk Vid. Visas tiesības aizsargātas.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
