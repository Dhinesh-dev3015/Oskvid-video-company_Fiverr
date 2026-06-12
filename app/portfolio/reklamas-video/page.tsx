'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Play, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'

export default function PromoPage() {
   const { t } = useLanguage()
   const [pageTitle, setPageTitle] = useState('Pasākumu video | Osk Vid')
   const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
   const [selectedVideoData, setSelectedVideoData] = useState<{
      title: string
      description?: string
   } | null>(null)
   const [origin, setOrigin] = useState<string>('')
   const [isMobile, setIsMobile] = useState(false)

   const [videoData, setVideoData] = useState({
      featuredVideoUrl: '',
      featuredVideoTitle: '',
      video1Url: '',
      video2Url: '',
      video3Url: '',
   })

   // Titles & Descriptions from localStorage (with fallbacks)
   const [video1Title, setVideo1Title] = useState('Cakes n Bakes')
   const [video1Description, setVideo1Description] = useState(
      'Professional promotional video showcasing artisanal bakery products with stunning visual storytelling and appetizing cinematography.',
   )
   const [video2Title, setVideo2Title] = useState('Promotional Video')
   const [video2Description, setVideo2Description] = useState(
      'Dynamic commercial content designed to engage audiences and effectively communicate brand values through compelling visual narrative.',
   )
   const [video3Title, setVideo3Title] = useState('Commercial Promo')
   const [video3Description, setVideo3Description] = useState(
      'High-impact commercial promotional video crafted to maximize brand exposure and drive customer engagement through creative storytelling.',
   )

   const [rightSideText, setRightSideText] = useState(
      'Mūsu 2025. gada reklāmas video demonstrācijas video, kurā redzami efektīvākie un radošākie reklāmas video, ko esam ražojuši gada laikā. Profesionāla reklāmas video ražošana, kas palīdz uzņēmumiem pārdot savus produktus un pakalpojumus efektīvi un radoši.',
   )

   // Extract YouTube ID
   const extractYouTubeId = (url: string): string => {
      if (!url) return ''
      const patterns = [
         /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
         /^([a-zA-Z0-9_-]{11})$/,
      ]
      for (const pattern of patterns) {
         const match = url.match(pattern)
         if (match) return match[1]
      }
      return url
   }

   // Generate thumbnail URL
   const generateYouTubeThumbnail = (videoUrl: string): string => {
      const youtubeId = extractYouTubeId(videoUrl)
      if (youtubeId && youtubeId !== videoUrl) {
         return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      }
      return '/placeholder.svg'
   }

   // Load everything from localStorage + handle updates
   useEffect(() => {
      setOrigin(window.location.origin)
      const savedPageTitle = localStorage.getItem('content_portfolioPromoTitle')
      if (savedPageTitle) {
         setPageTitle(savedPageTitle)
      } else {
         setPageTitle('Pasākumu video | Osk Vid')
      }
      const loadContent = () => {
         // Video URLs
         const featuredUrl =
            localStorage.getItem('content_portfolioPromoFeaturedVideoUrl') ||
            'https://www.youtube.com/embed/0pHoVAbAizc'
         const featuredTitle =
            localStorage.getItem('content_portfolioPromoFeaturedVideoTitle') ||
            'Promotional showreel 2025'
         const video1Url =
            localStorage.getItem('content_portfolioPromoVideo1Url') ||
            'https://www.youtube.com/embed/gLUmzmxgkqw'
         const video2Url =
            localStorage.getItem('content_portfolioPromoVideo2Url') ||
            'https://www.youtube.com/embed/624qTZkRjoQ'
         const video3Url =
            localStorage.getItem('content_portfolioPromoVideo3Url') ||
            'https://www.youtube.com/embed/INuvMNyhzeo'

         setVideoData({
            featuredVideoUrl: featuredUrl.includes('embed')
               ? featuredUrl
               : `https://www.youtube.com/embed/${extractYouTubeId(featuredUrl)}`,
            featuredVideoTitle: featuredTitle,
            video1Url: video1Url.includes('embed')
               ? video1Url
               : `https://www.youtube.com/embed/${extractYouTubeId(video1Url)}`,
            video2Url: video2Url.includes('embed')
               ? video2Url
               : `https://www.youtube.com/embed/${extractYouTubeId(video2Url)}`,
            video3Url: video3Url.includes('embed')
               ? video3Url
               : `https://www.youtube.com/embed/${extractYouTubeId(video3Url)}`,
         })

         // Right side text
         const savedRightSideText = localStorage.getItem(
            'content_portfolioPromoPageRightText',
         )
         if (savedRightSideText) setRightSideText(savedRightSideText)

         // Titles & Descriptions – only override if value exists
         const v1t = localStorage.getItem('content_portfolioPromoVideo1Title')
         const v1d = localStorage.getItem(
            'content_portfolioPromoVideo1Description',
         )
         const v2t = localStorage.getItem('content_portfolioPromoVideo2Title')
         const v2d = localStorage.getItem(
            'content_portfolioPromoVideo2Description',
         )
         const v3t = localStorage.getItem('content_portfolioPromoVideo3Title')
         const v3d = localStorage.getItem(
            'content_portfolioPromoVideo3Description',
         )

         if (v1t) setVideo1Title(v1t)
         if (v1d) setVideo1Description(v1d)
         if (v2t) setVideo2Title(v2t)
         if (v2d) setVideo2Description(v2d)
         if (v3t) setVideo3Title(v3t)
         if (v3d) setVideo3Description(v3d)
      }

      loadContent()

      // Re-load on CMS updates
      window.addEventListener('contentUpdated', loadContent)
      window.addEventListener('storage', loadContent)

      // Mobile detection
      const checkMobile = () => setIsMobile(window.innerWidth < 768)
      checkMobile()
      window.addEventListener('resize', checkMobile)

      return () => {
         window.removeEventListener('contentUpdated', loadContent)
         window.removeEventListener('storage', loadContent)
         window.removeEventListener('resize', checkMobile)
      }
   }, [])

   // Prevent scroll when modal open
   useEffect(() => {
      if (selectedVideo) {
         document.body.style.overflow = 'hidden'
      } else {
         document.body.style.overflow = 'unset'
      }
   }, [selectedVideo])

   // ESC key to close
   useEffect(() => {
      const handler = (e: KeyboardEvent) => {
         if (e.key === 'Escape') {
            setSelectedVideo(null)
            setSelectedVideoData(null)
         }
      }
      document.addEventListener('keydown', handler)
      return () => document.removeEventListener('keydown', handler)
   }, [])

   const featuredVideo = {
      title: videoData.featuredVideoTitle,
      videoUrl: videoData.featuredVideoUrl,
   }

   const promoVideos = [
      {
         id: 1,
         title: video1Title,
         description: video1Description,
         thumbnail: generateYouTubeThumbnail(videoData.video1Url),
         videoUrl: videoData.video1Url,
      },
      {
         id: 2,
         title: video2Title,
         description: video2Description,
         thumbnail: generateYouTubeThumbnail(videoData.video2Url),
         videoUrl: videoData.video2Url,
      },
      {
         id: 3,
         title: video3Title,
         description: video3Description,
         thumbnail: generateYouTubeThumbnail(videoData.video3Url),
         videoUrl: videoData.video3Url,
      },
   ]

   const closeVideo = () => {
      setSelectedVideo(null)
      setSelectedVideoData(null)
   }

   return (
      <div className='pt-32 pb-20'>
         <div className='container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl'>
            <motion.div
               initial={{ opacity: 1, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className='text-center mb-8'
            >
               <h1 className='text-3xl md:text-4xl font-bold mb-6'>
                  {pageTitle}
               </h1>
               <div className='w-40 h-0.5 bg-primary mx-auto mb-8'></div>
            </motion.div>

            {/* Featured Video + Right Text */}
            <motion.div
               initial={{ opacity: 1, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className='mb-16'
            >
               <div className='grid px-8 grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
                  <div
                     className='relative aspect-video w-full rounded-lg overflow-hidden shadow-lg cursor-pointer group'
                     onClick={() => {
                        setSelectedVideo(videoData.featuredVideoUrl)
                        setSelectedVideoData({ title: featuredVideo.title })
                     }}
                  >
                     <img
                        src={generateYouTubeThumbnail(
                           videoData.featuredVideoUrl,
                        )}
                        alt={featuredVideo.title}
                        className='w-full h-full object-cover'
                     />
                     <div className='absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all'>
                        <div className='bg-white/90 hover:bg-white rounded-full p-4 transition-all group-hover:scale-110'>
                           <Play className='h-8 w-8 text-black ml-1' />
                        </div>
                     </div>
                     <div className='absolute bottom-4 left-4'>
                        <h3 className='text-white font-semibold text-lg drop-shadow-lg'>
                           {featuredVideo.title}
                        </h3>
                     </div>
                  </div>

                  <div className='space-y-4 prose prose-lg'>
                     <p style={{ 
                       whiteSpace: 'pre-wrap', 
                       wordBreak: 'break-word',
                       fontFamily: 'inherit'
                     }} >{rightSideText}</p>
                  </div>
               </div>
            </motion.div>

            {/* Grid of 3 promo videos */}
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'>
               {promoVideos.map((video, index) => (
                  <motion.div
                     key={video.id}
                     initial={{ opacity: 1, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: index * 0.1 }}
                     className='group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md'
                  >
                     <div className='relative aspect-video'>
                        <Image
                           src={video.thumbnail || '/placeholder.svg'}
                           alt={video.title}
                           fill
                           className='object-cover'
                           unoptimized
                        />
                        <div className='absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/60 group-hover:opacity-100'>
                           <Button
                              variant='outline'
                              size='icon'
                              className='h-12 w-12 rounded-full border-white text-white hover:bg-white/20 bg-transparent'
                              onClick={() => {
                                 setSelectedVideo(video.videoUrl)
                                 setSelectedVideoData({
                                    title: video.title,
                                    description: video.description,
                                 })
                              }}
                           >
                              <Play className='h-6 w-6' />
                              <span className='sr-only'>
                                 {t('common.play')}
                              </span>
                           </Button>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>

            <AnimatePresence>
               {selectedVideo && (
                  <motion.div
                     initial={{ opacity: 1 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
                     onClick={() => setSelectedVideo(null)}
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
                              onClick={() => setSelectedVideo(null)}
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
                              {selectedVideo ? (
                                 <iframe
                                    src={`https://www.youtube.com/embed/${extractYouTubeId(selectedVideo)}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`}
                                    title={selectedVideoData?.title}
                                    className='w-full h-full'
                                    frameBorder='0'
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                    allowFullScreen
                                    onError={() =>
                                       console.log(
                                          'Video loading error for URL:',
                                          selectedVideo,
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
                                 {/*<div className='text-[#cc5339] text-sm font-semibold mb-2 uppercase tracking-wide'>
                               {selectedVideoData?.title}
                             </div>*/}
                                 <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                                    {selectedVideoData?.title}
                                 </h3>
                              </div>

                              <p style={{ 
                                whiteSpace: 'pre-wrap', 
                                wordBreak: 'break-word',
                                fontFamily: 'inherit'
                              }} className='text-gray-600 leading-relaxed'>
                                 {selectedVideoData?.description ? selectedVideoData.description : rightSideText}
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
