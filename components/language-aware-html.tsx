"use client"

import { useLanguage } from "../contexts/language-context"
import { useEffect, type ReactNode } from "react"
import { DynamicSEO } from "./dynamic-seo"

interface LanguageAwareHtmlProps {
  children: ReactNode
}

export function LanguageAwareHtml({ children }: LanguageAwareHtmlProps) {
  const { language } = useLanguage()

  useEffect(() => {
    // Update the html lang attribute
    document.documentElement.lang = language
  }, [language])

  return (
    <>
      <DynamicSEO />
      {children}
    </>
  )
}
