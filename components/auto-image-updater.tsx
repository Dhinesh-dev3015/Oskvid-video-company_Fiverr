"use client"

import { useEffect } from 'react'

// Vienkāršs komponents, kas automātiski atjauno attēlus
export function AutoImageUpdater() {
  useEffect(() => {
    // Funkcija, kas atjauno attēlu
    const handleImageUpdate = (event: CustomEvent) => {
      const { key, imageUrl } = event.detail
      console.log('AutoImageUpdater: Image update received:', key, imageUrl)
      
      // Atjauno attēlus ar data-image-key atribūtu
      const images = document.querySelectorAll(`[data-image-key="${key}"]`) as NodeListOf<HTMLImageElement>
      images.forEach(img => {
        if (img.src !== imageUrl) {
          console.log('AutoImageUpdater: Updating image:', key, 'to', imageUrl)
          img.src = imageUrl
          
          // Pievieno fade efektu
          img.style.transition = 'opacity 0.3s ease'
          img.style.opacity = '0'
          setTimeout(() => {
            img.style.opacity = '1'
          }, 150)
        }
      })

      // Atjauno background images
      const elementsWithBg = document.querySelectorAll(`[data-bg-image-key="${key}"]`) as NodeListOf<HTMLElement>
      elementsWithBg.forEach(element => {
        if (element.style.backgroundImage !== `url(${imageUrl})`) {
          console.log('AutoImageUpdater: Updating background image:', key, 'to', imageUrl)
          element.style.backgroundImage = `url(${imageUrl})`
        }
      })
    }

    // Klausīties pēc attēlu izmaiņām
    window.addEventListener('imageUpdated', handleImageUpdate as EventListener)
    
    // Klausīties pēc localStorage izmaiņām
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('image_')) {
        const key = e.key.replace('image_', '')
        const imageUrl = e.newValue
        if (imageUrl) {
          console.log('AutoImageUpdater: Storage change detected:', key, imageUrl)
          
          // Izveido CustomEvent, lai izmantotu to pašu loģiku
          const customEvent = new CustomEvent('imageUpdated', {
            detail: { key, imageUrl }
          })
          window.dispatchEvent(customEvent)
        }
      }
    }
    
    window.addEventListener('storage', handleStorageChange)

    // Pārbaudīt, vai ir saglabāti attēli localStorage
    const checkSavedImages = () => {
      const keys = [
        'hero-bg', 'wedding-service', 'promo-service', 'cta-bg',
        'news-1', 'news-2', 'news-3', 'news-4',
        'partner-1', 'partner-2', 'partner-3', 'partner-4', 'partner-5', 'partner-6', 'partner-7', 'partner-8',
        'about-hero', 'about-main', 'about-logo', 'about-clickable-1', 'about-clickable-2', 'about-clickable-3',
        'testimonial-1', 'testimonial-2', 'testimonial-3',
        'service-wedding', 'service-ad', 'service-event'
      ]
      
      keys.forEach(key => {
        const savedImage = localStorage.getItem(`image_${key}`)
        if (savedImage) {
          console.log('AutoImageUpdater: Found saved image for:', key, savedImage)
          // Izveido CustomEvent ar saglabāto attēlu
          const customEvent = new CustomEvent('imageUpdated', {
            detail: { key, imageUrl: savedImage }
          })
          window.dispatchEvent(customEvent)
        }
      })
    }

    // Pārbaudīt saglabātos attēlus uzreiz
    checkSavedImages()

    return () => {
      window.removeEventListener('imageUpdated', handleImageUpdate as EventListener)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Šis komponents neko neattēlo, tikai klausās pēc izmaiņām
  return null
}
