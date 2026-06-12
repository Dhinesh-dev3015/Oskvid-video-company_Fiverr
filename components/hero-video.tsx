'use client'
import { useEffect, useState, useRef } from 'react'

interface HeroVideoProps {
   contentKey?: string
   className?: string
}

export default function HeroVideo({
   contentKey,
   className = '',
}: HeroVideoProps) {
   const [src, setSrc] = useState<string | null>(null)
   const [isReady, setIsReady] = useState(false)
   const currentUrlRef = useRef<string | null>(null)

   const isVideo = (url: string): boolean => {
      if (!url) return false
      return (
         /\.(mp4|webm|mov|ogg)$/i.test(url) ||
         url.includes('/videos/') ||
         url.startsWith('data:video/')
      )
   }

   useEffect(() => {
      if (!contentKey) return

      const updateMedia = () => {
         const saved = localStorage.getItem(`content_${contentKey}`)
         if (!saved) return
         const normalized = saved.startsWith('/') || saved.startsWith('data:')
            ? saved
            : `/${saved}`
         if (normalized !== currentUrlRef.current) {
            currentUrlRef.current = normalized
            setIsReady(false)
            setSrc(normalized)
         }
      }

      updateMedia()
      window.addEventListener('storage', updateMedia)
      window.addEventListener('contentUpdated', updateMedia)
      const interval = setInterval(updateMedia, 1000)
      return () => {
         window.removeEventListener('storage', updateMedia)
         window.removeEventListener('contentUpdated', updateMedia)
         clearInterval(interval)
      }
   }, [contentKey])

   if (!src) return null

   return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
         {isVideo(src) ? (
            <video
               key={src}
               className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
               autoPlay
               muted
               loop
               playsInline
               preload="auto"
               src={src}
               onCanPlay={() => setIsReady(true)}
            />
         ) : (
            <img
               key={src}
               src={src}
               alt="Hero background"
               className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
               onLoad={() => setIsReady(true)}
            />
         )}
         <div
            className='absolute inset-0 bg-black/80 pointer-events-none'
            aria-hidden='true'
         />
      </div>
   )
}