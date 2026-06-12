"use client"

import { useContentItem } from "@/hooks/use-content"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

interface ContentDisplayProps {
  contentId: string
  fallback?: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function ContentDisplay({ contentId, fallback = "", className, as: Component = "span" }: ContentDisplayProps) {
  const { item, loading } = useContentItem(contentId)
  const { language } = useLanguage()
  const [displayContent, setDisplayContent] = useState(fallback)

  useEffect(() => {
    if (!loading && item) {
      const content = item.content[language] || item.content.lv || item.content.en || fallback
      setDisplayContent(content)
    } else if (!loading && !item) {
      setDisplayContent(fallback)
    }
  }, [item, loading, language, fallback])

  // Show fallback during loading to prevent layout shift
  if (loading) {
    return <Component className={className}>{fallback}</Component>
  }

  return <Component className={className}>{displayContent}</Component>
}

// Hook for getting content directly in components
export function useContentText(contentId: string, fallback = "") {
  const { item, loading } = useContentItem(contentId)
  const { language } = useLanguage()
  const [content, setContent] = useState(fallback)

  useEffect(() => {
    if (!loading && item) {
      const textContent = item.content[language] || item.content.lv || item.content.en || fallback
      setContent(textContent)
    } else if (!loading && !item) {
      setContent(fallback)
    }
  }, [item, loading, language, fallback])

  return { content, loading }
}
