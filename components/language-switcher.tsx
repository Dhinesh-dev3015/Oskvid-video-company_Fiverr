"use client"

import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  // Vienkārša funkcija, kas pārslēdz valodu
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "lv" : "en")
  }

  return null
}
