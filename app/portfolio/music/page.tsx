"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, X } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

export default function MusicPage() {
  const router = useRouter()
  useEffect(() => {
    router.push("/")
  }, [router])
  // const { t } = useLanguage()
  // const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  // const [selectedVideoData, setSelectedVideoData] = useState<any>(null)
  // const [origin, setOrigin] = useState<string>("")
  // const [isMobile, setIsMobile] = useState(false)
  // const [videoData, setVideoData] = useState({
  //   featuredVideoUrl: "",
  //   video1Url: "",
  //   video2Url: "",
  //   video3Url: "",
  // })

  // const [contentData, setContentData] = useState({
  //   featuredVideoTitle: "Music Video Showreel 2025",
  //   video1Title: "Mūzikas Video 1 - Virsraksts",
  //   video1Description: "Mūzikas Video 1 - Apraksts",
  //   video2Title: "Mūzikas Video 2 - Virsraksts",
  //   video2Description: "Mūzikas Video 2 - Apraksts",
  //   video3Title: "Mūzikas Video 3 - Virsraksts",
  //   video3Description: "Mūzikas Video 3 - Apraksts",
  // })

  // const [rightSideText, setRightSideText] = useState(
  //   "Mūsu 2025. gada mūzikas video demonstrācijas video, kurā redzami radošākie un vizuāli satriecošākie mūzikas video, ko esam ražojuši gada laikā. Mēs radām dinamisks un radošus mūzikas video, kas palīdz mūzikas māksliniekiem izpausties un sasniegt savu auditoriju."
  // )

  // // Extract YouTube ID from URL if needed
  // const extractYouTubeId = (url: string) => {
  //   if (!url) return null

  //   // Handle different YouTube URL formats including the "si" parameter
  //   const patterns = [
  //     /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
  //     /youtube\.com\/embed\/([^&\n?#]+)/,
  //     /^([a-zA-Z0-9_-]{11})$/, // Direct YouTube ID
  //   ]

  //   for (const pattern of patterns) {
  //     const match = url.match(pattern)
  //     if (match && match[1]) {
  //       // Clean the ID by removing any additional parameters
  //       return match[1].split("?")[0].split("&")[0]
  //     }
  //   }

  //   return null
  // }

  // // Helper function to generate YouTube thumbnail URL
  // const generateYouTubeThumbnail = (videoUrl: string): string => {
  //   if (!videoUrl) return "/placeholder.svg"
    
  //   const youtubeId = extractYouTubeId(videoUrl)
  //   if (youtubeId && youtubeId !== videoUrl) {
  //     return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
  //   }
  //   return "/placeholder.svg"
  // }


  // // Load content data from admin CMS
  // const loadContentData = () => {
  //   const featuredVideoTitle = localStorage.getItem("content_musicFeaturedVideoTitle") || "Music Video Showreel 2025"
  //   const video1Title = localStorage.getItem("content_musicVideo1Title") || "Mūzikas Video 1 - Virsraksts"
  //   const video1Description = localStorage.getItem("content_musicVideo1Description") || "Mūzikas Video 1 - Apraksts"
  //   const video2Title = localStorage.getItem("content_musicVideo2Title") || "Mūzikas Video 2 - Virsraksts"
  //   const video2Description = localStorage.getItem("content_musicVideo2Description") || "Mūzikas Video 2 - Apraksts"
  //   const video3Title = localStorage.getItem("content_musicVideo3Title") || "Mūzikas Video 3 - Virsraksts"
  //   const video3Description = localStorage.getItem("content_musicVideo3Description") || "Mūzikas Video 3 - Apraksts"

  //   setContentData({
  //     featuredVideoTitle,
  //     video1Title,
  //     video1Description,
  //     video2Title,
  //     video2Description,
  //     video3Title,
  //     video3Description,
  //   })
  // }

  // // Handle content updates
  // const handleContentUpdate = () => {
  //   console.log("🔄 Content update detected in music page!")
  //   // Reload video data
  //   const extractYouTubeId = (url: string): string => {
  //     if (!url) return ""
  //     const patterns = [
  //       /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  //       /^([a-zA-Z0-9_-]{11})$/, // Direct YouTube ID
  //     ]
  //     for (const pattern of patterns) {
  //       const match = url.match(pattern)
  //       if (match) return match[1]
  //     }
  //     return url
  //   }

  //   const featuredUrl = localStorage.getItem("content_musicFeaturedVideoUrl") || "https://www.youtube.com/embed/Bp3V-cXNZJI"
  //   const video1Url = localStorage.getItem("content_musicVideo1Url") //|| "https://www.youtube.com/embed/dQw4w9WgXcQ"
  //   const video2Url = localStorage.getItem("content_musicVideo2Url") //|| "https://www.youtube.com/embed/9bZkp7q19f0"
  //   const video3Url = localStorage.getItem("content_musicVideo3Url") //|| "https://www.youtube.com/embed/YQHsXMglC9A"

  //   setVideoData({
  //     featuredVideoUrl: featuredUrl.includes("embed")
  //       ? featuredUrl
  //       : `https://www.youtube.com/embed/${extractYouTubeId(featuredUrl)}`,
  //     video1Url: video1Url.includes("embed")
  //       ? video1Url
  //       : `https://www.youtube.com/embed/${extractYouTubeId(video1Url)}`,
  //     video2Url: video2Url.includes("embed")
  //       ? video2Url
  //       : `https://www.youtube.com/embed/${extractYouTubeId(video2Url)}`,
  //     video3Url: video3Url.includes("embed")
  //       ? video3Url
  //       : `https://www.youtube.com/embed/${extractYouTubeId(video3Url)}`,
  //   })
    
  //   loadContentData()
  // }

  // useEffect(() => {
  //   setOrigin(window.location.origin)

  //   // Load video data from admin CMS
  //   const loadVideoData = () => {
  //     const extractYouTubeId = (url: string): string => {
  //       if (!url) return ""
  //       const patterns = [
  //         /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  //         /^([a-zA-Z0-9_-]{11})$/, // Direct YouTube ID
  //       ]
  //       for (const pattern of patterns) {
  //         const match = url.match(pattern)
  //         if (match) return match[1]
  //       }
  //       return url
  //     }

  //     const featuredUrl = localStorage.getItem("content_musicFeaturedVideoUrl") || "https://www.youtube.com/embed/Bp3V-cXNZJI"
  //     const video1Url = localStorage.getItem("content_musicVideo1Url") || "https://www.youtube.com/embed/dQw4w9WgXcQ"
  //     const video2Url = localStorage.getItem("content_musicVideo2Url") || "https://www.youtube.com/embed/9bZkp7q19f0"
  //     const video3Url = localStorage.getItem("content_musicVideo3Url") || "https://www.youtube.com/embed/YQHsXMglC9A"

  //     setVideoData({
  //       featuredVideoUrl: featuredUrl.includes("embed")
  //         ? featuredUrl
  //         : `https://www.youtube.com/embed/${extractYouTubeId(featuredUrl)}`,
  //       video1Url: video1Url.includes("embed")
  //         ? video1Url
  //         : `https://www.youtube.com/embed/${extractYouTubeId(video1Url)}`,
  //       video2Url: video2Url.includes("embed")
  //         ? video2Url
  //         : `https://www.youtube.com/embed/${extractYouTubeId(video2Url)}`,
  //       video3Url: video3Url.includes("embed")
  //         ? video3Url
  //         : `https://www.youtube.com/embed/${extractYouTubeId(video3Url)}`,
  //     })
  //   }

  //   // Load right-side text content
  //   const savedRightSideText = localStorage.getItem("content_musicPageRightText")
  //   if (savedRightSideText) {
  //     setRightSideText(savedRightSideText)
  //   }

  //   // Load video data and content data
  //   loadVideoData()
  //   loadContentData()

  //   // Add event listeners for content updates
  //   window.addEventListener("contentUpdated", handleContentUpdate)
  //   window.addEventListener("storage", handleContentUpdate)

  //   // Detect mobile device
  //   const checkMobile = () => {
  //     setIsMobile(window.innerWidth < 768)
  //   }

  //   checkMobile()
    
  //   // Only add event listener if window exists
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("resize", checkMobile)
  //   }

  //   return () => {
  //     if (typeof window !== "undefined") {
  //       try {
  //         window.removeEventListener("resize", checkMobile)
  //         window.removeEventListener("contentUpdated", handleContentUpdate)
  //         window.removeEventListener("storage", handleContentUpdate)
  //       } catch (error) {
  //         console.warn("Error removing event listeners:", error)
  //       }
  //     }
  //   }
  // }, [])


  // // Prevent body scroll when modal is open
  // useEffect(() => {
  //   if (selectedVideo) {
  //     document.body.style.overflow = "hidden"
  //     // Prevent zoom on iOS
  //     if (typeof document !== "undefined") {
  //       document.addEventListener("touchmove", preventDefault, { passive: false })
  //     }
  //   } else {
  //     document.body.style.overflow = "unset"
  //     if (typeof document !== "undefined") {
  //       try {
  //         document.removeEventListener("touchmove", preventDefault)
  //       } catch (error) {
  //         console.warn("Error removing touchmove listener:", error)
  //       }
  //     }
  //   }

  //   return () => {
  //     document.body.style.overflow = "unset"
  //     if (typeof document !== "undefined") {
  //       try {
  //         document.removeEventListener("touchmove", preventDefault)
  //       } catch (error) {
  //         console.warn("Error removing touchmove listener:", error)
  //       }
  //     }
  //   }
  // }, [selectedVideo])

  // const preventDefault = (e: TouchEvent) => {
  //   if (e.touches.length > 1) {
  //     e.preventDefault()
  //   }
  //   }

  // // Handle escape key
  // useEffect(() => {
  //   const handleEscape = (e: KeyboardEvent) => {
  //     if (e.key === "Escape" && selectedVideo) {
  //       setSelectedVideo(null)
  //       setSelectedVideoData(null)
  //     }
  //   }

  //   if (typeof document !== "undefined") {
  //     document.addEventListener("keydown", handleEscape)
  //   }

  //   return () => {
  //     if (typeof document !== "undefined") {
  //       try {
  //         document.removeEventListener("keydown", handleEscape)
  //       } catch (error) {
  //         console.warn("Error removing keydown listener:", error)
  //       }
  //     }
  //   }
  // }, [selectedVideo])

  // // Galvenais video
  // const featuredVideo = {
  //   id: 0,
  //   title: contentData.featuredVideoTitle,
  //   videoUrl: videoData.featuredVideoUrl,
  // }

  // // Pārējie video
  // const musicVideos = [
  //   {
  //     id: 1,
  //     title: contentData.video1Title,
  //     description: contentData.video1Description,
  //     thumbnail: generateYouTubeThumbnail(videoData.video1Url),
  //     videoUrl: videoData.video1Url,
  //   },
  //   {
  //     id: 2,
  //     title: contentData.video2Title,
  //     description: contentData.video2Description,
  //     thumbnail: generateYouTubeThumbnail(videoData.video2Url),
  //     videoUrl: videoData.video2Url,
  //   },
  //   {
  //     id: 3,
  //     title: contentData.video3Title,
  //     description: contentData.video3Description,
  //     thumbnail: generateYouTubeThumbnail(videoData.video3Url),
  //     videoUrl: videoData.video3Url,
  //   },
  // ]

  // const closeVideo = () => {
  //   setSelectedVideo(null)
  // }

  // return (
  //   <div className="pt-32 pb-20">
  //     <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
  //       <motion.div
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.8 }}
  //         className="text-center mb-8"
  //       >
  //         <h1 className="text-3xl md:text-4xl font-bold mb-6">Mūzikas videoklipi</h1>
  //         <div className="w-40 h-0.5 bg-primary mx-auto mb-8"></div>
  //       </motion.div>

  //       {/* Featured Music Video Section */}
  //       <motion.div
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.8 }}
  //         className="mb-16"
  //       >
  //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
  //           <div
  //             className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg cursor-pointer group"
  //             onClick={(e) => {
  //               e.preventDefault()
  //               e.stopPropagation()
  //               setSelectedVideo(videoData.featuredVideoUrl)
  //             }}
  //           >
  //             <img
  //               src={generateYouTubeThumbnail(videoData.featuredVideoUrl)}
  //               alt={featuredVideo.title}
  //               className="w-full h-full object-cover"
  //             />
  //             <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
  //               <div className="bg-white/90 hover:bg-white rounded-full p-4 transition-all group-hover:scale-110">
  //                 <Play className="h-8 w-8 text-black ml-1" />
  //               </div>
  //             </div>
  //             <div className="absolute bottom-4 left-4 right-4">
  //               <h3 className="text-white font-semibold text-lg drop-shadow-lg">
  //                 {featuredVideo.title}
  //               </h3>
  //             </div>
  //           </div>
  //           <div className="space-y-4">
  //             <div className="prose prose-lg">
  //               <p>
  //                 {rightSideText}
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </motion.div>

  //       <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
  //         {musicVideos.map((video, index) => (
  //           <motion.div
  //             key={video.id}
  //             initial={{ opacity: 0, y: 20 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ duration: 0.6, delay: index * 0.1 }}
  //             className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
  //           >
  //             <div className="relative aspect-video">
  //               <Image
  //                 src={video.thumbnail || "/placeholder.svg"}
  //                 alt={video.title}
  //                 fill
  //                 className="object-cover"
  //                 unoptimized
  //               />
  //               <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/60 group-hover:opacity-100">
  //                 <Button
  //                   variant="outline"
  //                   size="icon"
  //                   className="h-12 w-12 rounded-full border-white text-white hover:bg-white/20 bg-transparent"
  //                   onClick={(e) => {
  //                     e.preventDefault()
  //                     e.stopPropagation()
  //                     setSelectedVideo(video.videoUrl)
  //                   }}
  //                 >
  //                   <Play className="h-6 w-6" />
  //                   <span className="sr-only">{t("common.play")}</span>
  //                 </Button>
  //               </div>
  //             </div>
  //             <div className="p-4">
  //               <h3 className="mb-1 font-medium">{video.title}</h3>
  //               <p className="text-sm text-muted-foreground">{video.description}</p>
  //             </div>
  //           </motion.div>
  //         ))}
  //       </div>

  //       {/* Optimized Video Modal */}
  //       {selectedVideo && (
  //         <div
  //           className="fixed inset-0 z-[9999] bg-black"
  //           style={{
  //             position: "fixed",
  //             top: 0,
  //             left: 0,
  //             right: 0,
  //             bottom: 0,
  //             width: "100vw",
  //             height: "100dvh",
  //           }}
  //         >
  //           {/* Close Button */}
  //           <div className="absolute top-0 left-0 right-0 z-[10000] p-4 bg-gradient-to-b from-black/50 to-transparent">
  //             <div className="flex justify-between items-center">
  //               <div className="text-white text-sm opacity-75">{isMobile ? "Tap to close" : "Press ESC to close"}</div>
  //               <Button
  //                 onClick={closeVideo}
  //                 variant="secondary"
  //                 size="icon"
  //                 className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm h-10 w-10 rounded-full"
  //               >
  //                 <X className="h-5 w-5" />
  //                 <span className="sr-only">{t("common.closeVideo")}</span>
  //               </Button>
  //             </div>
  //           </div>

  //           {/* Video Container */}
  //           <div className="absolute inset-0 flex items-center justify-center pt-16 sm:pt-18 md:pt-20 lg:pt-22 xl:pt-24" onClick={closeVideo}>
  //             <div
  //               className="relative w-full h-full max-w-none max-h-none md:max-w-6xl md:max-h-[90vh] md:mx-4"
  //               onClick={(e) => e.stopPropagation()}
  //             >
  //               <div className="relative w-full h-full md:h-0 md:pb-[56.25%] bg-black">
  //                 <iframe
  //                   src={`${selectedVideo.replace("youtube.com", "youtube-nocookie.com")}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&iv_load_policy=3&fs=0&color=white&disablekb=1&playsinline=1&origin=${origin}`}
  //                   title="Video Player"
  //                   frameBorder="0"
  //                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //                   allowFullScreen={false}
  //                   className="absolute top-0 left-0 w-full h-full"
  //                   style={{
  //                     width: "100%",
  //                     height: "100%",
  //                     objectFit: "contain",
  //                   }}
  //                 />
  //               </div>
  //             </div>
  //           </div>

  //           {/* Mobile: Swipe indicator */}
  //           {isMobile && (
  //             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs text-center">
  //               <div className="bg-black/30 rounded-full px-3 py-1 backdrop-blur-sm">
  //                 {"Swipe down or tap outside to close"}
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // )
}
