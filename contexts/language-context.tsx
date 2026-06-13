"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import translations from "@/translations"

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

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
  }

  const t = (key: string): string => {
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

      if (typeof current === "string") {
        return current
      }

      if (current && typeof current === "object" && current[language]) {
        return current[language]
      }

      return key
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error)
      return key
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageKey: language }}>
      {children}
    </LanguageContext.Provider>
  )
}