import { useEffect } from 'react'

// Hook, kas klausīsies pēc attēlu izmaiņām un automātiski atjaunos vietni
export function useImageUpdates() {
  useEffect(() => {
    // Funkcija, kas atjauno attēlu
    const handleImageUpdate = (event: CustomEvent | MessageEvent) => {
      let key: string
      let imageUrl: string

      if (event instanceof CustomEvent) {
        // CustomEvent no admin panel
        key = event.detail.key
        imageUrl = event.detail.imageUrl
      } else if (event.data && event.data.type === 'IMAGE_UPDATED') {
        // MessageEvent no citu tabu
        key = event.data.key
        imageUrl = event.data.imageUrl
      } else {
        return
      }

      console.log('Image update received:', key, imageUrl)

      // Atjauno attēlu DOM
      updateImageInDOM(key, imageUrl)
    }

    // Klausīties pēc CustomEvent
    window.addEventListener('imageUpdated', handleImageUpdate as EventListener)
    
    // Klausīties pēc MessageEvent (no citu tabu)
    window.addEventListener('message', handleImageUpdate)

    // Klausīties pēc localStorage izmaiņām
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('image_')) {
        const key = e.key.replace('image_', '')
        const imageUrl = e.newValue
        if (imageUrl) {
          console.log('Storage change detected:', key, imageUrl)
          updateImageInDOM(key, imageUrl)
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('imageUpdated', handleImageUpdate as EventListener)
      window.removeEventListener('message', handleImageUpdate)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Funkcija, kas atjauno attēlu DOM
  const updateImageInDOM = (key: string, imageUrl: string) => {
    // Atjauno visus attēlus ar šo atslēgu
    const images = document.querySelectorAll(`[data-image-key="${key}"]`) as NodeListOf<HTMLImageElement>
    
    images.forEach(img => {
      if (img.src !== imageUrl) {
        console.log('Updating image:', key, 'from', img.src, 'to', imageUrl)
        img.src = imageUrl
        
        // Pievieno fade efektu
        img.style.opacity = '0'
        setTimeout(() => {
          img.style.opacity = '1'
        }, 100)
      }
    })

    // Atjauno arī background images
    const elementsWithBg = document.querySelectorAll(`[data-bg-image-key="${key}"]`) as NodeListOf<HTMLElement>
    elementsWithBg.forEach(element => {
      if (element.style.backgroundImage !== `url(${imageUrl})`) {
        console.log('Updating background image:', key, 'to', imageUrl)
        element.style.backgroundImage = `url(${imageUrl})`
      }
    })

    // Paziņo par atjaunošanu
    console.log(`Image ${key} updated successfully on website`)
  }

  return { updateImageInDOM }
}
