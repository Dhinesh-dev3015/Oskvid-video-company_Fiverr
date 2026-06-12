'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DynamicContent } from './dynamic-content'

interface PortfolioItem {
   id: number
   title: string
   category: string
   videoUrl: string
   thumbnail: string
   shortDescription: string
}

export default function PortfolioGrid() {
   const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
   const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])

   // Helper function to extract YouTube ID from URL
   const extractYouTubeId = (url: string): string => {
      if (!url) return ''

      // Handle different YouTube URL formats
      const patterns = [
         /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
         /^([a-zA-Z0-9_-]{11})$/, // Direct YouTube ID
      ]

      for (const pattern of patterns) {
         const match = url.match(pattern)
         if (match) return match[1]
      }

      return url // Return as-is if no pattern matches
   }

   // Helper function to generate YouTube thumbnail URL
   const generateYouTubeThumbnail = (videoUrl: string): string => {
      const youtubeId = extractYouTubeId(videoUrl)
      if (youtubeId && youtubeId !== videoUrl) {
         return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      }
      return '/placeholder.svg'
   }

   useEffect(() => {
      // Load portfolio items from localStorage
      const loadPortfolioItems = () => {
         const items: PortfolioItem[] = [
            {
               id: 1,
               title:
                  localStorage.getItem('content_portfolioVideo1Title') ||
                  'EVENT SHOWREEL 2024',
               category:
                  localStorage.getItem('content_portfolioVideo1Category') ||
                  'Pasākumu Filmas',
               videoUrl:
                  localStorage.getItem('content_portfolioVideo1Url') ||
                  'https://www.youtube.com/watch?v=0pHoVAbAizc',
               thumbnail:
                  generateYouTubeThumbnail(
                     localStorage.getItem('content_portfolioVideo1Url') ||
                        'https://www.youtube.com/watch?v=0pHoVAbAizc',
                  ) || '/images/videographer-sunset.jpeg',
               shortDescription:
                  localStorage.getItem(
                     'content_portfolioVideo1ShortDescription',
                  ) ||
                  'Profesionāls pasākumu showreel, kas demonstrē OSK VID komandas prasmes dažādu pasākumu filmēšanā. Iekļauj labākos mirkļus no 2024. gada projektiem.',
            },
            {
               id: 2,
               title:
                  localStorage.getItem('content_portfolioVideo2Title') ||
                  'WEDDING SHOWREEL 2025',
               category:
                  localStorage.getItem('content_portfolioVideo2Category') ||
                  'Kāzu Filmas',
               videoUrl:
                  localStorage.getItem('content_portfolioVideo2Url') ||
                  'https://www.youtube.com/watch?v=b60K5KRpeBQ',
               thumbnail:
                  generateYouTubeThumbnail(
                     localStorage.getItem('content_portfolioVideo2Url') ||
                        'https://www.youtube.com/watch?v=b60K5KRpeBQ',
                  ) || '/images/wedding-couple-church.jpeg',
               shortDescription:
                  localStorage.getItem(
                     'content_portfolioVideo2ShortDescription',
                  ) ||
                  'Emocionāls kāzu showreel ar skaistākajiem mirkļiem no kāzu filmēšanas. Parāda kinematogrāfisko pieeju un profesionālo kvalitāti kāzu video ražošanā.',
            },
            {
               id: 3,
               title:
                  localStorage.getItem('content_portfolioVideo3Title') ||
                  'KREATĪVS PROJEKTS',
               category:
                  localStorage.getItem('content_portfolioVideo3Category') ||
                  'Māksliniecisks Saturs',
               videoUrl:
                  localStorage.getItem('content_portfolioVideo3Url') ||
                  'https://www.youtube.com/watch?v=0a7bQ0wcJf8',
               thumbnail:
                  generateYouTubeThumbnail(
                     localStorage.getItem('content_portfolioVideo3Url') ||
                        'https://www.youtube.com/watch?v=0a7bQ0wcJf8',
                  ) || '/images/studio-purple-lighting.jpeg',
               shortDescription:
                  localStorage.getItem(
                     'content_portfolioVideo3ShortDescription',
                  ) ||
                  'Inovatīvs un kreatīvs video projekts, kas demonstrē unikālu vizuālo stilu un tehniskās prasmes. Eksperimentāla pieeja video ražošanā.',
            },
            {
               id: 4,
               title:
                  localStorage.getItem('content_portfolioVideo4Title') ||
                  'KOMERCIĀLA RAŽOŠANA',
               category:
                  localStorage.getItem('content_portfolioVideo4Category') ||
                  'Reklāmas Video',
               videoUrl:
                  localStorage.getItem('content_portfolioVideo4Url') ||
                  'https://www.youtube.com/watch?v=FXIDrbybF74',
               thumbnail:
                  generateYouTubeThumbnail(
                     localStorage.getItem('content_portfolioVideo4Url') ||
                        'https://www.youtube.com/watch?v=FXIDrbybF74',
                  ) || '/images/professional-camera.jpg',
               shortDescription:
                  localStorage.getItem(
                     'content_portfolioVideo4ShortDescription',
                  ) ||
                  'Profesionāla komerciāla video ražošana ar augstu kvalitāti un radošu pieeju. Parāda spēju strādāt ar korporatīviem klientiem un radīt efektīvu saturu.',
            },
            {
               id: 5,
               title:
                  localStorage.getItem('content_portfolioVideo5Title') ||
                  'DOKUMENTĀLĀ FILMA',
               category:
                  localStorage.getItem('content_portfolioVideo5Category') ||
                  'Dokumentāls Saturs',
               videoUrl:
                  localStorage.getItem('content_portfolioVideo5Url') ||
                  'https://www.youtube.com/watch?v=AHy_pX_4fLU',
               thumbnail:
                  generateYouTubeThumbnail(
                     localStorage.getItem('content_portfolioVideo5Url') ||
                        'https://www.youtube.com/watch?v=AHy_pX_4fLU',
                  ) || '/images/camera-viewfinder.jpeg',
               shortDescription:
                  localStorage.getItem(
                     'content_portfolioVideo5ShortDescription',
                  ) ||
                  'Autentiska dokumentālā filma ar dziļu stāstījumu un profesionālu kinematogrāfiju. Demonstrē spēju strādāt ar sarežģītiem naratīviem.',
            },
            {
               id: 6,
               title:
                  localStorage.getItem('content_portfolioVideo6Title') ||
                  'MŪZIKAS VIDEO',
               category:
                  localStorage.getItem('content_portfolioVideo6Category') ||
                  'Mūzikas Video',
               videoUrl:
                  localStorage.getItem('content_portfolioVideo6Url') ||
                  'https://www.youtube.com/watch?v=Bp3V-cXNZJI',
               thumbnail:
                  generateYouTubeThumbnail(
                     localStorage.getItem('content_portfolioVideo6Url') ||
                        'https://www.youtube.com/watch?v=Bp3V-cXNZJI',
                  ) || '/images/videographer-silhouette.jpeg',
               shortDescription:
                  localStorage.getItem(
                     'content_portfolioVideo6ShortDescription',
                  ) ||
                  'Dinamisks mūzikas video ar kreatīvu vizuālo stilu un profesionālu montāžu. Parāda spēju strādāt ar mūzikas industrijā un radīt vizuāli pievilcīgu saturu.',
            },
         ]
         setPortfolioItems(items)
      }

      loadPortfolioItems()

      // Listen for content updates with more specific event handling
      const handleContentUpdate = (event: any) => {
         console.log('Content updated:', event.detail)
         loadPortfolioItems()
      }

      // Helper function to handle storage changes
      const handleStorageChange = (event: StorageEvent) => {
         if (event.key && event.key.startsWith('content_portfolio')) {
            loadPortfolioItems()
         }
      }

      // Only add event listeners if window exists
      if (typeof window !== 'undefined') {
         window.addEventListener('contentUpdated', handleContentUpdate)
         window.addEventListener('storage', handleStorageChange)
      }

      return () => {
         // Safely remove event listeners
         if (typeof window !== 'undefined') {
            try {
               window.removeEventListener('contentUpdated', handleContentUpdate)
               window.removeEventListener('storage', handleStorageChange)
            } catch (error) {
               console.warn('Error removing event listeners:', error)
            }
         }
      }
   }, [])
   return (
      <div className='py-6'>
         <div className='container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-8xl'>
            {/* Header */}
            <motion.div
               initial={{ opacity: 1, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className='text-center mb-12'
            >
               {/* Placeholder for header content */}
            </motion.div>

            {/* Portfolio Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
               {portfolioItems.map((item, index) => (
                  <motion.div
                     key={item.id}
                     initial={{ opacity: 1, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                     className='group cursor-pointer'
                     onClick={() => setSelectedItem(item)}
                  >
                     <div className='relative overflow-hidden rounded-lg aspect-video bg-gray-900'>
                        <Image
                           src={item.thumbnail || '/placeholder.svg'}
                           alt={item.title}
                           fill
                           className='object-cover transition-transform duration-500 group-hover:scale-110'
                           onError={(e) => {
                              console.error(
                                 'Image loading error for:',
                                 item.thumbnail,
                              )
                              // Fallback to placeholder if image fails to load
                              const target = e.target as HTMLImageElement
                              target.src = '/placeholder.svg'
                           }}
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />

                        {/* Content Overlay */}
                        <div className='absolute bottom-0 left-0 right-0 p-6'>
                           <h3 className='text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#cc5339] transition-colors'>
                              <DynamicContent
                                 contentKey={`portfolioVideo${item.id}Title`}
                                 fallback={item.title}
                              />
                           </h3>
                           {/* Highlighted Text */}
                           {/* The highlightedText field is removed from PortfolioItem, so this block is removed */}
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
               {selectedItem && (
                  <motion.div
                     initial={{ opacity: 1 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
                     onClick={() => setSelectedItem(null)}
                  >
                     <motion.div
                        initial={{ scale: 0.8, opacity: 1 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className='bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 max-w-5xl w-full max-h-[90vh] overflow-y-auto'
                        onClick={(e) => e.stopPropagation()}
                     >
                        {/* Close Button */}
                        <div className='flex justify-end p-4'>
                           <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => setSelectedItem(null)}
                              className='text-gray-600 hover:text-[#cc5339] hover:bg-orange-50'
                           >
                              <X className='w-6 h-6' />
                           </Button>
                        </div>

                        {/* Modal Content */}
                        <div className='px-6 pb-6'>
                           {/* YouTube Video Embed */}
                           <div className='relative aspect-video mb-6 rounded-xl overflow-hidden bg-black shadow-lg'>
                              {/* The youtubeId field is removed from PortfolioItem, so this block is removed */}
                              {selectedItem.videoUrl ? (
                                 <iframe
                                    src={`https://www.youtube.com/embed/${extractYouTubeId(selectedItem.videoUrl)}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`}
                                    title={selectedItem.title}
                                    className='w-full h-full'
                                    frameBorder='0'
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                    allowFullScreen
                                    onError={() =>
                                       console.log(
                                          'Video loading error for URL:',
                                          selectedItem.videoUrl,
                                       )
                                    }
                                 />
                              ) : (
                                 <div className='w-full h-full flex items-center justify-center text-white'>
                                    <div className='text-center'>
                                       <p className='text-lg mb-2'>
                                          Video nav pieejams
                                       </p>
                                       <p className='text-sm opacity-75'>
                                          Pārbaudiet video URL admin panelī
                                       </p>
                                    </div>
                                 </div>
                              )}
                           </div>

                           <div className='space-y-4'>
                              <div>
                                 <div className='text-[#cc5339] text-sm font-semibold mb-2 uppercase tracking-wide'>
                                    <DynamicContent
                                       contentKey={`portfolioVideo${selectedItem.id}Category`}
                                       fallback={selectedItem.category}
                                    />
                                 </div>
                                 <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                                    <DynamicContent
                                       contentKey={`portfolioVideo${selectedItem.id}Title`}
                                       fallback={selectedItem.title}
                                    />
                                 </h3>
                              </div>

                              <p style={{ 
                                whiteSpace: 'pre-wrap', 
                                wordBreak: 'break-word',
                                fontFamily: 'inherit'
                              }} className='text-gray-600 leading-relaxed'>
                                 <DynamicContent
                                    contentKey={`portfolioVideo${selectedItem.id}ShortDescription`}
                                    fallback={selectedItem.shortDescription}
                                 />
                              </p>
                           </div>
                        </div>
                     </motion.div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
   )
}
