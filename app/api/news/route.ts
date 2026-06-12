import { NextRequest, NextResponse } from "next/server"
import { getContentData, saveContentData } from "@/lib/db"
import path from "path"
import fs from "node:fs/promises"

/** Generate a URL-friendly slug from a title string */
function createSlug(title: string, existingSlugs: string[]): string {
  // Latvian characters to ASCII
  const map: Record<string, string> = {
    'ā': 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i',
    'ķ': 'k', 'ļ': 'l', 'ņ': 'n', 'ō': 'o', 'ŗ': 'r',
    'š': 's', 'ū': 'u', 'ž': 'z',
    'Ā': 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'I',
    'Ķ': 'K', 'Ļ': 'L', 'Ņ': 'N', 'Ō': 'O', 'Ŗ': 'R',
    'Š': 'S', 'Ū': 'U', 'Ž': 'Z'
  }
  let slug = title
    .split('')
    .map(c => map[c] || c)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')  // replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '')       // trim leading/trailing hyphens
    .replace(/-+/g, '-')            // collapse multiple hyphens

  // Ensure uniqueness by appending number if needed
  let uniqueSlug = slug
  let counter = 1
  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`
    counter++
  }
  return uniqueSlug
}

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  image: string
  category?: string
  date?: string
  readtime?: string
  createdAt?: string
  updatedAt?: string
}

const NEWS_KEY = "news_articles"

const sortArticles = (articles: NewsArticle[]) =>
  articles.sort((a, b) => {
    const dateA = a.date || a.createdAt || ""
    const dateB = b.date || b.createdAt || ""
    return dateB.localeCompare(dateA)
  })

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    const allContent = getContentData()
    const newsArticles: NewsArticle[] = allContent[NEWS_KEY] || []

    if (id) {
      const article = newsArticles.find((a) => a.id === id)
      if (!article) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 })
      }
      return NextResponse.json({ article })
    }

    return NextResponse.json({ articles: sortArticles(newsArticles) })
  } catch (error) {
    console.error("Error loading news articles:", error)
    return NextResponse.json({ error: "Failed to load news articles" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { title, excerpt, image, category, date, readtime } = data

    if (!title || !excerpt) {
      return NextResponse.json({ error: "Title and excerpt are required" }, { status: 400 })
    }

    const allContent = getContentData()
    const newsArticles: NewsArticle[] = allContent[NEWS_KEY] || []

    const existingSlugs = newsArticles.map(a => a.id).filter(id => !id.startsWith('news_'))  // collect user-provided/custom slugs
    const newId = createSlug(title, existingSlugs)
    let imageUrl = image || "/images/professional-camera.jpg"

    if (image && image.startsWith("data:image")) {
      const publicDir = path.join(process.cwd(), "public", "images")
      await fs.mkdir(publicDir, { recursive: true })

      const match = image.match(/^data:image\/(\w+);base64,/)
      const fileExtension = match ? `.${match[1]}` : ".jpg"
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "")
      const buffer = Buffer.from(base64Data, "base64")

      const fileName = `news-${newId}-${Date.now()}${fileExtension}`
      const filePath = path.join(publicDir, fileName)
      await fs.writeFile(filePath, buffer)
      imageUrl = `/images/${fileName}`
    }

    const newArticle: NewsArticle = {
      id: newId,
      title,
      excerpt,
      image: imageUrl,
      category: category || "",
      date: date || new Date().toISOString().split("T")[0],
      readtime: readtime || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    newsArticles.push(newArticle)
    allContent[NEWS_KEY] = newsArticles
    saveContentData(allContent)

    return NextResponse.json({ success: true, article: newArticle })
  } catch (error) {
    console.error("Error creating news article:", error)
    return NextResponse.json({ error: "Failed to create news article" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, title, excerpt, image, category, date, readtime } = data

    if (!id || !title || !excerpt) {
      return NextResponse.json({ error: "ID, title and excerpt are required" }, { status: 400 })
    }

    const allContent = getContentData()
    const newsArticles: NewsArticle[] = allContent[NEWS_KEY] || []
    const index = newsArticles.findIndex((article) => article.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    let imageUrl = newsArticles[index].image
    if (image && image.startsWith("data:image")) {
      const publicDir = path.join(process.cwd(), "public", "images")
      await fs.mkdir(publicDir, { recursive: true })

      const match = image.match(/^data:image\/(\w+);base64,/)
      const fileExtension = match ? `.${match[1]}` : ".jpg"
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "")
      const buffer = Buffer.from(base64Data, "base64")

      const fileName = `news-${id}-${Date.now()}${fileExtension}`
      const filePath = path.join(publicDir, fileName)
      await fs.writeFile(filePath, buffer)
      imageUrl = `/images/${fileName}`
    } else if (image && !image.startsWith("data:image")) {
      imageUrl = image
    }

    newsArticles[index] = {
      ...newsArticles[index],
      title,
      excerpt,
      image: imageUrl,
      category: category || "",
      date: date || newsArticles[index].date || new Date().toISOString().split("T")[0],
      readtime: readtime || "",
      updatedAt: new Date().toISOString(),
    }

    allContent[NEWS_KEY] = newsArticles
    saveContentData(allContent)

    return NextResponse.json({ success: true, article: newsArticles[index] })
  } catch (error) {
    console.error("Error updating news article:", error)
    return NextResponse.json({ error: "Failed to update news article" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 })
    }

    const allContent = getContentData()
    const newsArticles: NewsArticle[] = allContent[NEWS_KEY] || []
    const index = newsArticles.findIndex((article) => article.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    newsArticles.splice(index, 1)
    allContent[NEWS_KEY] = newsArticles
    saveContentData(allContent)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting news article:", error)
    return NextResponse.json({ error: "Failed to delete news article" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

