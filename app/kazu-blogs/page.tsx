"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Facebook, Linkedin, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { absoluteUrl } from "@/lib/site-url"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  image: string
  category?: string
  date?: string
  readtime?: string
}

export default function BlogsPage() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch("/api/news")
        if (response.ok) {
          const data = await response.json()
          setNewsArticles(data.articles || [])
        }
      } catch (error) {
        console.error("Failed to load news articles:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadArticles()
  }, [])

  const handleShare = (platform: string, article: NewsArticle) => {
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
      <div className="min-h-screen bg-white">
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#2d4a3e]">
              Blogs
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Jaunākie raksti par kāzu video, padomi un ieteikumi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          {newsArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {newsArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 1, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/kazu-blogs/${article.id}`} className="block">
                    {/* Featured Image */}
                    <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={article.image || "/images/professional-camera.jpg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Article Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      {article.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.date).toLocaleDateString('lv-LV', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}</span>
                        </div>
                      )}
                      {article.readtime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readtime}</span>
                        </div>
                      )}
                      {article.category && (
                        <span className="text-[#cc5339] font-medium">{article.category}</span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#2d4a3e] group-hover:text-[#cc5339] transition-colors duration-300 leading-tight">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Read More Link */}
                    <div className="flex items-center text-[#cc5339] font-medium group-hover:gap-2 transition-all duration-300">
                      <span>Lasīt vairāk</span>
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>

                  {/* Social Share */}
                  {/*<div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Dalīties:</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleShare('facebook', article)
                      }}
                      className="p-2 rounded-full bg-gray-100 hover:bg-[#cc5339] hover:text-white transition-all duration-300"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleShare('linkedin', article)
                      }}
                      className="p-2 rounded-full bg-gray-100 hover:bg-[#cc5339] hover:text-white transition-all duration-300"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleShare('copy', article)
                      }}
                      className="p-2 rounded-full bg-gray-100 hover:bg-[#cc5339] hover:text-white transition-all duration-300"
                      aria-label="Copy link"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>
                  </div>*/}
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Nav rakstu šajā kategorijā.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
