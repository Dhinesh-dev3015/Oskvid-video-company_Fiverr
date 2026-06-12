"use client"

import { useState, useEffect, useCallback } from "react"
import { contentStore, type ContentItem } from "@/lib/content-store"

export function useContent(type?: string) {
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(() => {
    try {
      setLoading(true)
      setError(null)
      const data = contentStore.getAll(type)
      setContent(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      setContent([])
    } finally {
      setLoading(false)
    }
  }, [type])

  const saveContent = async (item: Partial<ContentItem>) => {
    try {
      let savedItem: ContentItem

      if (item.id) {
        // Update existing
        savedItem = { ...item } as ContentItem
        const success = contentStore.save(savedItem)
        if (!success) throw new Error("Failed to save content")
      } else {
        // Create new
        savedItem = contentStore.create(item as Omit<ContentItem, "id" | "lastModified">)
      }

      fetchContent() // Refresh the list
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      return false
    }
  }

  const updateContent = async (id: string, updates: Partial<ContentItem>) => {
    try {
      const existingItem = contentStore.getById(id)
      if (!existingItem) throw new Error("Content not found")

      const updatedItem = { ...existingItem, ...updates, id, lastModified: new Date().toISOString() }
      const success = contentStore.save(updatedItem)

      if (!success) throw new Error("Failed to update content")

      fetchContent() // Refresh the list
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      return false
    }
  }

  const deleteContent = async (id: string) => {
    try {
      const success = contentStore.delete(id)
      if (!success) throw new Error("Failed to delete content")

      fetchContent() // Refresh the list
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      return false
    }
  }

  useEffect(() => {
    // Subscribe to content store changes
    const unsubscribe = contentStore.subscribe(() => {
      fetchContent()
    })

    // Initial fetch with a small delay to ensure localStorage is available
    const timer = setTimeout(() => {
      fetchContent()
    }, 100)

    return () => {
      clearTimeout(timer)
      unsubscribe()
    }
  }, [fetchContent])

  return {
    content,
    loading,
    error,
    saveContent,
    updateContent,
    deleteContent,
    refetch: fetchContent,
  }
}

export function useContentItem(id: string) {
  const [item, setItem] = useState<ContentItem | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchItem = useCallback(() => {
    try {
      setLoading(true)
      const foundItem = contentStore.getById(id)
      setItem(foundItem)
    } catch (err) {
      console.error("Error fetching content item:", err)
      setItem(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    // Subscribe to content store changes
    const unsubscribe = contentStore.subscribe(() => {
      fetchItem()
    })

    // Initial fetch with a small delay to ensure localStorage is available
    const timer = setTimeout(() => {
      fetchItem()
    }, 100)

    return () => {
      clearTimeout(timer)
      unsubscribe()
    }
  }, [fetchItem])

  return { item, loading }
}
