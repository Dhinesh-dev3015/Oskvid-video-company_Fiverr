"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { DynamicImage, DynamicContent } from "@/components/dynamic-content"

export default function AboutPage() {
  const [content, setContent] = useState({
    aboutPageTitle: "Par Oskvid",
    aboutPageBio:
      "Vajadzētu mazu biogrāfiju par Oskaru un sadarbības partneri, lai klientiem ir interesanti lasīt, kas tad ir Oskars, kas viņam patīk, kas nepatīk, kas aizrauj un protams klāt viņa bildes, lai veidotu uzticamību potenciālajiem klientiem un nerastos jautājumi, kas viņš ir.",
    aboutPageHeroTitle: "MĒS ESAM ŠEIT, LAI PALĪDZĒTU JUMS",
    aboutPageHeroSubtitle: "Jūsu radošo mediju partneris",
    aboutPageContactTitle: "Kontaktinformācija",
    aboutPageContactEmail: "info@oskvid.lv",
    aboutPageContactPhone: "+371 20 123 456",
    aboutPageContactAddress: "Rīga, Latvija",
    aboutPageContactHours: "P-Pk: 9:00 - 18:00",
    aboutPageHeroImage: "/images/videographer-studio.jpeg",
    aboutPageMainImage: "/images/videographer-studio.jpeg",
    aboutPageLogo: "/oskvid-logo-new.png",
    aboutPageClickableImage1: "/images/videographer-tower.jpeg",
    aboutPageClickableImage2: "/images/videographer-studio.jpeg",
    aboutPageClickableImage3: "/images/videographer-studio.jpeg",
  })

  useEffect(() => {
    // Load content from localStorage
    const keys = Object.keys(content)
    const loadedContent = { ...content }

    keys.forEach((key) => {
      const saved = localStorage.getItem(`content_${key}`)
      if (saved) {
        loadedContent[key as keyof typeof content] = saved
      }
    })

    setContent(loadedContent)

    // Listen for content updates
    const handleContentUpdate = (event: CustomEvent) => {
      const { key, value } = event.detail
      if (key.startsWith("aboutPage")) {
        setContent((prev) => ({ ...prev, [key]: value }))
      }
    }

    window.addEventListener("contentUpdated", handleContentUpdate as EventListener)
    window.addEventListener("imageUpdated", handleContentUpdate as EventListener)

    return () => {
      window.removeEventListener("contentUpdated", handleContentUpdate as EventListener)
      window.removeEventListener("imageUpdated", handleContentUpdate as EventListener)
    }
  }, [])

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-10 mb-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 1, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center w-full"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#cc5339] mb-8">
              <DynamicContent contentKey="aboutPageTitle" fallback={content.aboutPageTitle} />
            </h1>
            <div className="prose prose-lg text-gray-700 leading-relaxed mx-auto max-w-3xl">
              <p style={{ 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word',
                fontFamily: 'inherit'
              }}  className="text-xl mb-6 text-center">
                <DynamicContent contentKey="aboutPageBio" fallback={content.aboutPageBio} />
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-4xl"
          >
            <div className="relative h-96 lg:h-[550px] w-full rounded-2xl overflow-hidden">
              <DynamicImage
                contentKey="aboutPageHeroImage"
                alt="Video production behind the scenes"
                fill
                className="object-cover"
                objectFit="cover"
                fallback="/images/videographer-studio.jpeg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Clickable Images Section */}
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          <Link href="/video-filmesana" className="group block">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <DynamicImage
                contentKey="aboutPageClickableImage1"
                alt="Video production services"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                objectFit="cover"
                fallback="/images/videographer-tower.jpeg"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl mb-2 font-bold text-[#cc5339] drop-shadow-lg">Pakalpojumi</h3>
                  <p className="text-white drop-shadow-md font-medium">Apskatīt mūsu darbus</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/kazu-blogs" className="group block">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <DynamicImage
                contentKey="aboutPageClickableImage2"
                alt="About our team"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                objectFit="cover"
                fallback="/images/videographer-studio.jpeg"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2 text-[#cc5339] drop-shadow-lg">Blogs</h3>
                  <p className="text-white drop-shadow-md font-medium">Uzzināt vairāk par komandu</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/oskvid-kontakti" className="group block">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <DynamicImage
                contentKey="aboutPageClickableImage3"
                alt="Contact us"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                objectFit="cover"
                fallback="/images/videographer-studio.jpeg"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2 text-[#cc5339] drop-shadow-lg">Kontakti</h3>
                  <p className="text-white drop-shadow-md font-medium">Sazināties ar mums</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
