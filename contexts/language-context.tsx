"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "lv"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  languageKey: Language
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("lv")
  const [translations, setTranslations] = useState<any>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load translations
    try {
      import("@/translations")
        .then((module) => {
          setTranslations(module.default || {})
          setIsLoaded(true)
        })
        .catch((error) => {
          console.warn("Failed to load translations:", error)
          setIsLoaded(true)
        })
    } catch (error) {
      console.warn("Translation import error:", error)
      setIsLoaded(true)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
  }

  const t = (key: string): string => {
    if (!isLoaded || !translations) return key

    try {
      const keys = key.split(".")
      let current: any = translations

      for (const k of keys) {
        if (current && typeof current === "object" && k in current) {
          current = current[k]
        } else {
          return key
        }
      }

      // If current is a string, return it
      if (typeof current === "string") {
        return current
      }

      // If current is an object with language key, return that
      if (current && typeof current === "object" && current[language]) {
        return current[language]
      }

      return key
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error)
      return key
    }
  }

  const languageKey = language

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageKey }}>{children}</LanguageContext.Provider>
  )
}
