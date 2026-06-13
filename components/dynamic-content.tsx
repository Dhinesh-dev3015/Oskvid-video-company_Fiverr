'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { JSX } from 'react/jsx-runtime'

function readStorage(key: string): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(`content_${key}`)
  } catch {
    return null
  }
}

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
  // Always start with fallback to match server render exactly
  const [content, setContent] = useState(fallback)

  useEffect(() => {
    // Only runs on client after hydration — safe to read localStorage here
    const saved = readStorage(contentKey)
    if (saved) setContent(saved)

    const handleContentUpdate = (event: CustomEvent) => {
      if (event.detail.key === contentKey) setContent(event.detail.value)
    }
    const handleStorageChange = () => {
      const updated = readStorage(contentKey)
      if (updated) setContent(updated)
    }

    window.addEventListener('contentUpdated' as any, handleContentUpdate)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('contentUpdated' as any, handleContentUpdate)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [contentKey])

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
  objectPosition,
}: DynamicImageProps) {
  // Always start with fallback to match server render exactly
  const [imageSrc, setImageSrc] = useState(fallback)

  useEffect(() => {
    const saved = readStorage(contentKey)
    if (saved) setImageSrc(saved)

    const handleImageUpdate = (event: CustomEvent) => {
      if (event.detail.key === contentKey) setImageSrc(event.detail.value)
    }
    const handleStorageChange = () => {
      const updated = readStorage(contentKey)
      if (updated) setImageSrc(updated)
    }

    window.addEventListener('imageUpdated' as any, handleImageUpdate)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('imageUpdated' as any, handleImageUpdate)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [contentKey])

  const sizes = fill
    ? '(max-width: 475px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw'
    : '(max-width: 475px) 100vw, (max-width: 768px) 50vw, 33vw'

  if (fill) {
    return (
      <Image
        src={imageSrc || '/placeholder.svg'}
        alt={alt}
        fill
        sizes={sizes}
        quality={85}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={`image-mobile ${className}`}
        style={{ objectFit: objectFit || 'cover', objectPosition: objectPosition || 'center' }}
      />
    )
  }

  return (
    <Image
      src={imageSrc || '/placeholder.svg'}
      alt={alt}
      width={width || 400}
      height={height || 300}
      sizes={sizes}
      quality={85}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      className={`image-mobile ${className}`}
      style={{ height: 'auto', maxWidth: '100%' }}
    />
  )
}