'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Play, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { DynamicContent, DynamicImage } from '@/components/dynamic-content'

export default function WeddingsPage() {
   const { t } = useLanguage()
   const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
   const [selectedVideoData, setSelectedVideoData] = useState<{
      title: string
      description?: string
   } | null>(null)
   const [origin, setOrigin] = useState<string>('')
   const [isMobile, setIsMobile] = useState(false)
   const [videoData, setVideoData] = useState({
      featuredVideoUrl: '',
      video1Url: '',
      video2Url: '',
      video3Url: '',
   })

   const [contentData, setContentData] = useState({
      featuredVideoTitle: 'Wedding showreel 2025',
      video1Title: 'Destination Wedding in Spain',
      video1Description:
         'A beautiful destination wedding capturing the romantic moments of Laura and Lucas in the stunning Spanish countryside.',
      video2Title: 'Wedding Highlights',
      video2Description:
         'A cinematic highlight reel showcasing the most emotional and beautiful moments of this special day.',
      video3Title: 'Wedding Film',
      video3Description:
         'A complete wedding film telling the love story from preparation to celebration in artistic detail.',
   })

   const [rightSideText, setRightSideText] = useState(
      'Mūsu kāzu video pakalpojumi ietver pilnu kāzu dienas dokumentēšanu - no sagatavošanās mirkļiem līdz vēlām vakara svinībām. Mēs izmantojam profesionālu aprīkojumu un kinematogrāfiskās tehnikas, lai radītu māksliniecisku un emocionālu stāstījumu par jūsu īpašo dienu.',
   )

   const [pageTitle, setPageTitle] = useState('Kāzu Filmas')

   // Extract YouTube ID from URL if needed
   const extractYouTubeId = (url: string) => {
      if (!url) return null

      // Handle different YouTube URL formats including the "si" parameter
      const patterns = [
         /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
         /youtube\.com\/embed\/([^&\n?#]+)/,
         /^([a-zA-Z0-9_-]{11})$/, // Direct YouTube ID
      ]

      for (const pattern of patterns) {
         const match = url.match(pattern)
         if (match && match[1]) {
            // Clean the ID by removing any additional parameters
            return match[1].split('?')[0].split('&')[0]
         }
      }

      return null
   }

   // Helper function to generate YouTube thumbnail URL
   const generateYouTubeThumbnail = (videoUrl: string): string => {
      if (!videoUrl) return '/placeholder.svg'

      const youtubeId = extractYouTubeId(videoUrl)
      if (youtubeId && youtubeId !== videoUrl) {
         return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      }
      return '/placeholder.svg'
   }

   // Load content data from admin CMS
   const loadContentData = () => {
      const featuredVideoTitle =
         localStorage.getItem('content_portfolioWeddingFeaturedVideoTitle') ||
         'Wedding showreel 2025'
      const video1Title =
         localStorage.getItem('content_portfolioWeddingVideo1Title') ||
         'Destination Wedding in Spain'
      const video1Description =
         localStorage.getItem('content_portfolioWeddingVideo1Description') ||
         'A beautiful destination wedding capturing the romantic moments of Laura and Lucas in the stunning Spanish countryside.'
      const video2Title =
         localStorage.getItem('content_portfolioWeddingVideo2Title') ||
         'Wedding Highlights'
      const video2Description =
         localStorage.getItem('content_portfolioWeddingVideo2Description') ||
         'A cinematic highlight reel showcasing the most emotional and beautiful moments of this special day.'
      const video3Title =
         localStorage.getItem('content_portfolioWeddingVideo3Title') ||
         'Wedding Film'
      const video3Description =
         localStorage.getItem('content_portfolioWeddingVideo3Description') ||
         'A complete wedding film telling the love story from preparation to celebration in artistic detail.'

      setContentData({
         featuredVideoTitle,
         video1Title,
         video1Description,
         video2Title,
         video2Description,
         video3Title,
         video3Description,
      })
   }

   // Handle content updates
   const handleContentUpdate = () => {
      console.log('🔄 Content update detected in weddings page!')
      // Reload video data
      const extractYouTubeId = (url: string): string => {
         if (!url) return ''
         const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /^([a-zA-Z0-9_-]{11})$/, // Direct YouTube ID
         ]
         for (const pattern of patterns) {
            const match = url.match(pattern)
            if (match) return match[1]
         }
         return url
      }

      const featuredUrl =
         localStorage.getItem('content_portfolioWeddingFeaturedVideoUrl') || ''
      const video1Url =
         localStorage.getItem('content_portfolioWeddingVideo1Url') || ''
      const video2Url =
         localStorage.getItem('content_portfolioWeddingVideo2Url') || ''
      const video3Url =
         localStorage.getItem('content_portfolioWeddingVideo3Url') || ''

      setVideoData({
         featuredVideoUrl:
            featuredUrl && featuredUrl.includes('embed')
               ? featuredUrl
               : featuredUrl
                 ? `https://www.youtube.com/embed/${extractYouTubeId(featuredUrl)}`
                 : '',
         video1Url:
            video1Url && video1Url.includes('embed')
               ? video1Url
               : video1Url
                 ? `https://www.youtube.com/embed/${extractYouTubeId(video1Url)}`
                 : '',
         video2Url:
            video2Url && video2Url.includes('embed')
               ? video2Url
               : video2Url
                 ? `https://www.youtube.com/embed/${extractYouTubeId(video2Url)}`
                 : '',
         video3Url:
            video3Url && video3Url.includes('embed')
               ? video3Url
               : video3Url
                 ? `https://www.youtube.com/embed/${extractYouTubeId(video3Url)}`
                 : '',
      })

      loadContentData()

      // Reload page title and right side text
      const savedPageTitle = localStorage.getItem(
         'content_portfolioWeddingsTitle',
      )
      if (savedPageTitle) {
         setPageTitle(savedPageTitle)
      }

      const savedRightSideText = localStorage.getItem(
         'content_portfolioWeddingsPageRightText',
      )
      if (savedRightSideText) {
         setRightSideText(savedRightSideText)
      }
   }

   useEffect(() => {
      setOrigin(window.location.origin)

      // Load video data from admin CMS
      const loadVideoData = () => {
         const extractYouTubeId = (url: string): string => {
            if (!url) return ''
            const patterns = [
               /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
               /^([a-zA-Z0-9_-]{11})$/, // Direct YouTube ID
            ]
            for (const pattern of patterns) {
               const match = url.match(pattern)
               if (match) return match[1]
            }
            return url
         }

         const featuredUrl =
            localStorage.getItem('content_portfolioWeddingFeaturedVideoUrl') ||
            ''
         const video1Url =
            localStorage.getItem('content_portfolioWeddingVideo1Url') || ''
         const video2Url =
            localStorage.getItem('content_portfolioWeddingVideo2Url') || ''
         const video3Url =
            localStorage.getItem('content_portfolioWeddingVideo3Url') || ''

         setVideoData({
            featuredVideoUrl:
               featuredUrl && featuredUrl.includes('embed')
                  ? featuredUrl
                  : featuredUrl
                    ? `https://www.youtube.com/embed/${extractYouTubeId(featuredUrl)}`
                    : '',
            video1Url:
               video1Url && video1Url.includes('embed')
                  ? video1Url
                  : video1Url
                    ? `https://www.youtube.com/embed/${extractYouTubeId(video1Url)}`
                    : '',
            video2Url:
               video2Url && video2Url.includes('embed')
                  ? video2Url
                  : video2Url
                    ? `https://www.youtube.com/embed/${extractYouTubeId(video2Url)}`
                    : '',
            video3Url:
               video3Url && video3Url.includes('embed')
                  ? video3Url
                  : video3Url
                    ? `https://www.youtube.com/embed/${extractYouTubeId(video3Url)}`
                    : '',
         })
      }

      // Load right-side text content
      const savedRightSideText = localStorage.getItem(
         'content_portfolioWeddingsPageRightText',
      )
      if (savedRightSideText) {
         setRightSideText(savedRightSideText)
      }

      // Load page title from CMS
      const savedPageTitle = localStorage.getItem(
         'content_portfolioWeddingsTitle',
      )
      if (savedPageTitle) {
         setPageTitle(savedPageTitle)
      } else {
         // Fallback to translation if CMS value not set
         setPageTitle(t('portfolio.weddings.title'))
      }

      // Load video data and content data
      loadVideoData()
      loadContentData()

      // Add event listeners for content updates
      window.addEventListener('contentUpdated', handleContentUpdate)
      window.addEventListener('storage', handleContentUpdate)

      // Detect mobile device
      const checkMobile = () => {
         setIsMobile(window.innerWidth < 768)
      }

      checkMobile()

      // Only add event listener if window exists
      if (typeof window !== 'undefined') {
         window.addEventListener('resize', checkMobile)
      }

      return () => {
         if (typeof window !== 'undefined') {
            try {
               window.removeEventListener('resize', checkMobile)
               window.removeEventListener('contentUpdated', handleContentUpdate)
               window.removeEventListener('storage', handleContentUpdate)
            } catch (error) {
               console.warn('Error removing event listeners:', error)
            }
         }
      }
   }, [])

   // Prevent body scroll when modal is open
   useEffect(() => {
      if (selectedVideo) {
         document.body.style.overflow = 'hidden'
         // Prevent zoom on iOS
         if (typeof document !== 'undefined') {
            document.addEventListener('touchmove', preventDefault, {
               passive: false,
            })
         }
      } else {
         document.body.style.overflow = 'unset'
         if (typeof document !== 'undefined') {
            try {
               document.removeEventListener('touchmove', preventDefault)
            } catch (error) {
               console.warn('Error removing touchmove listener:', error)
            }
         }
      }

      return () => {
         document.body.style.overflow = 'unset'
         if (typeof document !== 'undefined') {
            try {
               document.removeEventListener('touchmove', preventDefault)
            } catch (error) {
               console.warn('Error removing touchmove listener:', error)
            }
         }
      }
   }, [selectedVideo])

   const preventDefault = (e: TouchEvent) => {
      if (e.touches.length > 1) {
         e.preventDefault()
      }
   }

   // Handle escape key
   useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
         if (e.key === 'Escape' && selectedVideo) {
            setSelectedVideo(null)
            setSelectedVideoData(null)
         }
      }

      if (typeof document !== 'undefined') {
         document.addEventListener('keydown', handleEscape)
      }

      return () => {
         if (typeof document !== 'undefined') {
            try {
               document.removeEventListener('keydown', handleEscape)
            } catch (error) {
               console.warn('Error removing keydown listener:', error)
            }
         }
      }
   }, [selectedVideo])

   // Galvenais video
   const featuredVideo = {
      id: 0,
      title: contentData.featuredVideoTitle,
      videoUrl: videoData.featuredVideoUrl,
   }

   // Pārējie video
   const weddingVideos = [
      {
         id: 1,
         title: contentData.video1Title,
         description: contentData.video1Description,
         thumbnail: generateYouTubeThumbnail(videoData.video1Url),
         videoUrl: videoData.video1Url,
      },
      {
         id: 2,
         title: contentData.video2Title,
         description: contentData.video2Description,
         thumbnail: generateYouTubeThumbnail(videoData.video2Url),
         videoUrl: videoData.video2Url,
      },
      {
         id: 3,
         title: contentData.video3Title,
         description: contentData.video3Description,
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

            {/* Featured Wedding Video Section */}
            <motion.div
               initial={{ opacity: 1, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className='mb-16'
            >
               <div className='grid grid-cols-1 px-8 lg:grid-cols-2 gap-8 items-center'>
                  <div
                     className='relative aspect-video w-full rounded-lg overflow-hidden shadow-lg cursor-pointer group'
                     onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
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
                     <div className='absolute bottom-4 left-4 right-4'>
                        <h3 className='text-white font-semibold text-lg drop-shadow-lg'>
                           <DynamicContent
                              contentKey={'portfolioWeddingFeaturedTitle'}
                              fallback={featuredVideo.title}
                           />
                        </h3>
                     </div>
                  </div>
                  <div className='space-y-4'>
                     <div className='prose prose-lg' style={{ 
                       whiteSpace: 'pre-wrap', 
                       wordBreak: 'break-word',
                       fontFamily: 'inherit'
                     }}>
                        <DynamicContent
                           contentKey={'portfolioWeddingsPageRightText'}
                           fallback={rightSideText}
                        />
                     </div>
                  </div>
               </div>
            </motion.div>

            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'>
               {weddingVideos.map((video, index) => (
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
                              onClick={(e) => {
                                 e.preventDefault()
                                 e.stopPropagation()
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
                              }}  className='text-gray-600 leading-relaxed'>
                                {selectedVideoData?.description}
                              </p>
                           </div>
                        </div>
                     </motion.div>
                  </motion.div>
               )}
            </AnimatePresence>
            
            {/* Optimized Video Modal */}

         </div>
      </div>
   )
}
