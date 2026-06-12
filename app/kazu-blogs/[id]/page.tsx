'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Calendar, Clock, Tag, Facebook, Linkedin, Link2, ArrowRight } from 'lucide-react'
import { absoluteUrl } from '@/lib/site-url'

function getYouTubeVideoId(url: string): string | null {
   const match = url.match(
      /(?:youtu\.be\/(?<id1>[^\s?&]+)|youtube\.com\/(?:watch\?v=|embed\/(?<id2>[^\s?&]+)))/
   )
   return match?.groups?.id1 || match?.groups?.id2 || null
}

interface NewsArticle {
   id: string
   title: string
   excerpt: string
   image: string
   category?: string
   date?: string
   readtime?: string
}

export default function ArticleDetailPage() {
   const { id } = useParams()
   const router = useRouter()
   const [article, setArticle] = useState<NewsArticle | null>(null)
   const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([])
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const fetchArticle = async () => {
         try {
            const response = await fetch(`/api/news?id=${id}`)
            if (response.ok) {
               const data = await response.json()
               setArticle(data.article)
            }
            
            // Fetch all articles for related section
            const allResponse = await fetch('/api/news')
            if (allResponse.ok) {
               const allData = await allResponse.json()
               const filtered = (allData.articles || []).filter((a: NewsArticle) => a.id !== id).slice(0, 3)
               setRelatedArticles(filtered)
            }
         } catch (error) {
            console.error('Error fetching article:', error)
         } finally {
            setIsLoading(false)
         }
      }
      if (id) fetchArticle()
   }, [id])

   const handleShare = (platform: string) => {
      if (!article) return
      const url = absoluteUrl(`/kazu-blogs/${article.id}`)
      const text = article.title
      
      switch (platform) {
         case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
            break
         case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
            break
         case 'copy':
            navigator.clipboard.writeText(url)
            break
      }
   }

   if (isLoading) {
      return (
         <div className='min-h-screen bg-white flex items-center justify-center'>
            <div className="animate-pulse space-y-4 text-center">
               <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
               <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
            </div>
         </div>
      )
   }

   if (!article) {
      return (
         <div className='min-h-screen bg-white flex flex-col items-center justify-center space-y-4 px-4'>
            <p className='text-gray-600 text-lg'>Raksts netika atrasts.</p>
            <Button onClick={() => router.push('/kazu-blogs')} variant='outline' className="border-[#cc5339] text-[#cc5339] hover:bg-[#cc5339] hover:text-white">
               <ChevronLeft className='w-4 h-4 mr-2' />
               Atgriezties uz blogu
            </Button>
         </div>
      )
   }

   return (
      <div className='min-h-screen bg-white'>
         {/* Article Header */}
         <section className='pt-28 pb-8 md:pt-32'>
            <div className='container mx-auto px-4 max-w-4xl'>
               <motion.div
                  initial={{ opacity: 1, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
               >
                  {/* Back Button */}
                  <Button
                     variant='ghost'
                     onClick={() => router.push('/kazu-blogs')}
                     className='mb-8 hover:bg-gray-100 text-gray-600 -ml-4'
                  >
                     <ChevronLeft className='w-4 h-4 mr-2' />
                     Atpakaļ uz blogu
                  </Button>

                  {/* Meta Info */}
                  <div className='flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6'>
                     {article.date && (
                        <div className='flex items-center gap-1'>
                           <Calendar className='w-4 h-4' />
                           <span>{new Date(article.date).toLocaleDateString('lv-LV', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                           })}</span>
                        </div>
                     )}
                     {article.readtime && (
                        <div className='flex items-center gap-1'>
                           <Clock className='w-4 h-4' />
                           <span>{article.readtime}</span>
                        </div>
                     )}
                     {article.category && (
                        <div className='flex items-center gap-1'>
                           <Tag className='w-4 h-4' />
                           <span className='bg-[#cc5339]/10 px-3 py-1 rounded-full text-[#cc5339] font-medium'>
                              {article.category}
                           </span>
                        </div>
                     )}
                  </div>

                  {/* Title */}
                  <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-[#2d4a3e] leading-tight'>
                     {article.title}
                  </h1>
               </motion.div>
            </div>
         </section>

         {/* Featured Image */}
         <section className='pb-8'>
            <div className='container mx-auto px-4 max-w-5xl'>
               <motion.div
                  initial={{ opacity: 1, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className='relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl'
               >
                  <Image
                     src={article.image || '/images/professional-camera.jpg'}
                     alt={article.title}
                     fill
                     priority
                     className='object-cover'
                  />
               </motion.div>
            </div>
         </section>

         {/* Article Content */}
         <section className='pb-16'>
            <div className='container mx-auto px-4 max-w-3xl'>
               <motion.article
                  initial={{ opacity: 1, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className='prose prose-lg max-w-none'
               >
                  <div className='text-gray-700 leading-relaxed space-y-6 text-lg'>
                     {article.excerpt.split('\n').map((paragraph, index) => {
                        const videoId = getYouTubeVideoId(paragraph.trim())
                        if (videoId) {
                           return (
                              <div
                                 key={index}
                                 className='relative w-full overflow-hidden rounded-xl shadow-lg my-6'
                                 style={{ paddingBottom: '56.25%' /* 16:9 */ }}
                              >
                                 <iframe
                                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                                    title='YouTube video player'
                                    allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                    className='absolute top-0 left-0 w-full h-full border-0'
                                    loading='lazy'
                                 />
                              </div>
                           )
                        }
                        return <p key={index} className="mb-4">{paragraph}</p>
                     })}
                  </div>
               </motion.article>

               {/* Social Share */}
               <motion.div
                  initial={{ opacity: 1, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-12 pt-8 border-t border-gray-200"
               >
                  <div className="flex items-center gap-4">
                     <span className="text-gray-600 font-medium">Dalīties:</span>
                     <div className="flex items-center gap-3">
                        <button
                           onClick={() => handleShare('facebook')}
                           className="p-3 rounded-full bg-gray-100 hover:bg-[#cc5339] hover:text-white transition-all duration-300"
                           aria-label="Share on Facebook"
                        >
                           <Facebook className="w-5 h-5" />
                        </button>
                        <button
                           onClick={() => handleShare('linkedin')}
                           className="p-3 rounded-full bg-gray-100 hover:bg-[#cc5339] hover:text-white transition-all duration-300"
                           aria-label="Share on LinkedIn"
                        >
                           <Linkedin className="w-5 h-5" />
                        </button>
                        <button
                           onClick={() => handleShare('copy')}
                           className="p-3 rounded-full bg-gray-100 hover:bg-[#cc5339] hover:text-white transition-all duration-300"
                           aria-label="Copy link"
                        >
                           <Link2 className="w-5 h-5" />
                        </button>
                     </div>
                  </div>
               </motion.div>
            </div>
         </section>

         {/* Related Articles */}
         {/*{relatedArticles.length > 0 && (
            <section className='pb-16 md:pb-24 bg-gray-50'>
               <div className='container mx-auto px-4 max-w-6xl'>
                  <motion.div
                     initial={{ opacity: 1, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5 }}
                  >
                     <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#2d4a3e]">Jaunākie raksti</h2>
                        <Link 
                           href="/kazu-blogs" 
                           className="text-[#cc5339] font-medium hover:underline flex items-center gap-1"
                        >
                           Skatīt visus
                           <ArrowRight className="w-4 h-4" />
                        </Link>
                     </div>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedArticles.map((relatedArticle, index) => (
                           <motion.article
                              key={relatedArticle.id}
                              initial={{ opacity: 1, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                           >
                              <Link href={`/kazu-blogs/${relatedArticle.id}`} className="block group">
                                 <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-gray-200">
                                    <Image
                                       src={relatedArticle.image || "/images/professional-camera.jpg"}
                                       alt={relatedArticle.title}
                                       fill
                                       className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                 </div>
                                 <h3 className="font-semibold text-lg text-[#2d4a3e] group-hover:text-[#cc5339] transition-colors line-clamp-2">
                                    {relatedArticle.title}
                                 </h3>
                                 {relatedArticle.date && (
                                    <p className="text-sm text-gray-500 mt-2">
                                       {new Date(relatedArticle.date).toLocaleDateString('lv-LV', {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric',
                                       })}
                                    </p>
                                 )}
                              </Link>
                           </motion.article>
                        ))}
                     </div>
                  </motion.div>
               </div>
            </section>
         )}*/}
      </div>
   )
}
