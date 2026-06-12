'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Helper function to safely save to localStorage
const safeLocalStorageSetItem = (key: string, value: string): boolean => {
   try {
      // Skip saving large base64 image data URLs
      if (value.startsWith('data:image/') && value.length > 100000) {
         return false // Silently skip large images
      }

      localStorage.setItem(key, value)
      return true
   } catch (error) {
      if (
         error instanceof DOMException &&
         error.name === 'QuotaExceededError'
      ) {
         // Silently fail for refresher - don't spam console
         return false
      }
      return false
   }
}

export function CMSContentRefresher() {
   const pathname = usePathname()

   async function fetchAndCacheCMSContent(
      page: string = 'simple-cms',
      language: string = 'lv',
   ): Promise<void> {
      try {
         const response = await fetch(
            `/api/content?page=${page}&language=${language}`,
         )

         if (!response.ok) {
            console.warn(
               '⚠️ Failed to fetch content from API:',
               response.statusText,
            )
            return
         }

         const data = await response.json()
         const content = data.content || {}

         if (typeof content !== 'object' || Array.isArray(content)) {
            console.error(
               '❌ Invalid content structure received from API:',
               content,
            )
            return
         }

         Object.entries(content).forEach(([key, value]) => {
            if (localStorage.getItem(`content_${key}`) !== String(value)) {
               // console.warn(`🔄 Content updated for key: ${key}`)
            }
            if (
               typeof value === 'string' ||
               typeof value === 'number' ||
               typeof value === 'boolean'
            ) {
               safeLocalStorageSetItem(`content_${key}`, String(value))
            } else {
               safeLocalStorageSetItem(`content_${key}`, JSON.stringify(value))
            }
         })

         // Dispatch event to notify components about content update
         window.dispatchEvent(new CustomEvent('cmsContentUpdated'))

         // console.log(`✅ CMS content for "${page}" saved into localStorage.`)
      } catch (error) {
         console.error('❌ Error fetching and caching CMS content:', error)
      }
   }

   useEffect(() => {
      // Ielādēt saturu uzreiz, kad komponente montējas
      fetchAndCacheCMSContent('simple-cms', 'lv')

      // Atjaunot, kad mainās route (piemēram, no /portfolio uz /portfolio/kazu-video-latvija)
      fetchAndCacheCMSContent('simple-cms', 'lv')

      // Atjaunot, kad lietotājs atgriežas uz tabu/logu
      const handleFocus = () => {
         fetchAndCacheCMSContent('simple-cms', 'lv')
      }

      // Atjaunot, kad lapa kļūst redzama
      const handleVisibilityChange = () => {
         if (!document.hidden) {
            fetchAndCacheCMSContent('simple-cms', 'lv')
         }
      }

      window.addEventListener('focus', handleFocus)
      document.addEventListener('visibilitychange', handleVisibilityChange)

      return () => {
         window.removeEventListener('focus', handleFocus)
         document.removeEventListener(
            'visibilitychange',
            handleVisibilityChange,
         )
      }
   }, [pathname]) // Atjaunot katru reizi, kad mainās route

   // Komponente neko nerāda, tā tikai izpilda loģiku
   return null
}
