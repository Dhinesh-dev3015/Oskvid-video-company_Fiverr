"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useLanguage } from "../contexts/language-context"

const pageTitles = {
  "/": {
    lv: "Sākums",
    en: "Home",
  },
  "/par-oskvid": {
    lv: "Par mani",
    en: "About Me",
  },
  "/video-filmesana": {
    lv: "Pakalpojumi",
    en: "Services",
  },
  "/portfolio": {
    lv: "Portfolio",
    en: "Portfolio",
  },
  "/portfolio/kazu-video-latvija": {
    lv: "Kāzas",
    en: "Weddings",
  },
  "/portfolio/reklamas-video": {
    lv: "Pasākumu video",
    en: "Promotional Videos",
  },
  "/reviews": {
    lv: "Atsauksmes",
    en: "Reviews",
  },
  "/atsauksmes": {
    lv: "Atsauksmes",
    en: "Reviews",
  },
  "/kazu-blogs": {
    lv: "Blogs",
    en: "News",
  },
  "/oskvid-kontakti": {
    lv: "Kontakti",
    en: "Contact",
  },
}

export function TitleSetter() {
  const pathname = usePathname()
  const { language } = useLanguage()

  useEffect(() => {
    const pageTitle = pageTitles[pathname as keyof typeof pageTitles]
    if (pathname.includes('/kazu-blogs/')) {
      let cut = pathname.replace('/kazu-blogs', '').replace(/^\/|\/$/g, '').replaceAll("-", " ")
      document.title = 'Osk Vid | '+cut[0].toUpperCase() + cut.slice(1)
    } else if (pageTitle) {
      const title = pageTitle[language]
      document.title = 'Osk Vid | '+title
    }
  }, [pathname, language])

  return null
}
