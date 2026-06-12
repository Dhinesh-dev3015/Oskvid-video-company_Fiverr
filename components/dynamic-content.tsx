'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { JSX } from 'react/jsx-runtime'
import { useContent, useContentItem } from '@/hooks/use-content'

interface DynamicContentProps {
   contentKey: string
   fallback: string
   className?: string
   as?: keyof JSX.IntrinsicElements
}

interface DynamicImageProps {
    contentKey: string
    fallback: string
    alt: string
    className?: string
    width?: number
    height?: number
    fill?: boolean
   objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
   objectPosition?: string
    priority?: boolean
}

export function DynamicContent({
   contentKey,
   fallback,
   className = '',
   as: Component = 'span',
}: DynamicContentProps) {
   const [content, setContent] = useState(fallback)
   const [isClient, setIsClient] = useState(false)
   setTimeout(() => {
       if (typeof window !== 'undefined') {
          const savedContent = localStorage.getItem(`content_${contentKey}`)
          if (savedContent && content != savedContent) {
             setContent(savedContent)
          }
       }
    }, 1000)

   // bootleg solution to local storage event not being called on the SAME page therefore have to re-check every time for changes

   useEffect(() => {
      setIsClient(true)
      const loadContent = () => {
         if (typeof window !== 'undefined') {
            const savedContent = localStorage.getItem(`content_${contentKey}`)
            if (savedContent) {
               setContent(savedContent)
            }
         }
      }

      loadContent()

      const handleContentUpdate = (event: CustomEvent) => {
         if (event.detail.key === contentKey) {
            setContent(event.detail.value)
         }
      }

      const handleStorageChange = () => {
         loadContent()
      }

      // Only add event listeners if window exists
      if (typeof window !== 'undefined') {
         window.addEventListener('contentUpdated' as any, handleContentUpdate)
         window.addEventListener('storage', handleStorageChange)
      }

      return () => {
         // Safely remove event listeners
         if (typeof window !== 'undefined') {
            try {
               window.removeEventListener(
                  'contentUpdated' as any,
                  handleContentUpdate,
               )
               window.removeEventListener('storage', handleStorageChange)
            } catch (error) {
               console.warn('Error removing event listeners:', error)
            }
         }
      }
   }, [contentKey])

   // Always render the fallback content initially to prevent hydration mismatch
   if (!isClient) {
      return <Component className={className}>{fallback}</Component>
   }

   return <Component className={className}>{content}</Component>
}

export function DynamicImage({
   contentKey,
   fallback,
   alt,
   className = '',
   width,
   height,
   fill,
   objectFit,
  priority = false,
   objectPosition
}: DynamicImageProps) {
   const [imageSrc, setImageSrc] = useState(fallback)
   const [isClient, setIsClient] = useState(false)
   setTimeout(() => {
       if (typeof window !== 'undefined') {
          const savedImage = localStorage.getItem(`content_${contentKey}`)
          if (savedImage && savedImage != imageSrc) {
             setImageSrc(savedImage)
          }
       }
    }, 1000)

   // same solution as above but for pictures
   useEffect(() => {
      setIsClient(true)
      const loadImage = () => {
         if (typeof window !== 'undefined') {
            const savedImage = localStorage.getItem(`content_${contentKey}`)

            if (savedImage) {
               setImageSrc(savedImage)
            }
         }
      }

      loadImage()

      const handleImageUpdate = (event: CustomEvent) => {
         if (event.detail.key === contentKey) {
            setImageSrc(event.detail.value)
         }
      }

      const handleStorageChange = () => {
         loadImage()
      }

      // Only add event listeners if window exists
      if (typeof window !== 'undefined') {
         window.addEventListener('imageUpdated' as any, handleImageUpdate)
         window.addEventListener('storage', handleStorageChange)
      }

      return () => {
         // Safely remove event listeners
         if (typeof window !== 'undefined') {
            try {
               window.removeEventListener(
                  'imageUpdated' as any,
                  handleImageUpdate,
               )
               window.removeEventListener('storage', handleStorageChange)
            } catch (error) {
               console.warn('Error removing event listeners:', error)
            }
         }
      }
   }, [contentKey])

   // Always use fallback initially to prevent hydration mismatch
   const currentSrc = isClient ? imageSrc : fallback

   const mobileOptimizedClassName = `image-mobile ${className}`

   const sizes = fill
      ? '(max-width: 475px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw'
      : '(max-width: 475px) 100vw, (max-width: 768px) 50vw, 33vw'

   if (fill) {
      return (
         <Image
            src={currentSrc || '/placeholder.svg'}
            alt={alt}
            fill
            sizes={sizes}
            quality={85}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            className={mobileOptimizedClassName}
            style={{
               objectFit: objectFit || 'cover', // Default to cover for filled containers
               objectPosition: objectPosition || 'center', // Default to center
            }}
         />
      )
   }

   return (
      <Image
         src={currentSrc || '/placeholder.svg'}
         alt={alt}
         width={width || 400}
         height={height || 300}
         sizes={sizes}
         quality={85}
         priority={priority}
         loading={priority ? 'eager' : 'lazy'}
         className={mobileOptimizedClassName}
         style={{
            height: 'auto',
            maxWidth: '100%',
         }}
      />
   )
}
