"use client"

// Enhanced content store for comprehensive CMS functionality
export interface ContentItem {
  id: string
  type: "text" | "image" | "video" | "section"
  title: string
  content: {
    en: string
    lv: string
  }
  location: string
  lastModified: string
  metadata?: {
    imageUrl?: string
    videoUrl?: string
    alt?: string
    dimensions?: string
    fileSize?: string
    sectionType?: "hero" | "about" | "services" | "cta"
    order?: number
  }
}

// Default comprehensive content for the website
const defaultContent: ContentItem[] = [
  // Homepage Content
  {
    id: "hero_title",
    type: "text",
    title: "Homepage Hero Title",
    content: {
      en: "Cinematic Visual Storytelling",
      lv: "Kinematogrāfisks Vizuālais Stāstījums",
    },
    location: "Homepage Hero",
    lastModified: new Date().toISOString(),
    metadata: {
      sectionType: "hero",
      order: 1,
    },
  },
  {
    id: "hero_description",
    type: "text",
    title: "Homepage Hero Description",
    content: {
      en: "We transform moments into cinematic experiences, crafting visual stories that captivate and inspire.",
      lv: "Mēs pārvēršam mirkļus kinematogrāfiskā pieredzē, veidojot vizuālus stāstus, kas aizrauj un iedvesmo.",
    },
    location: "Homepage Hero",
    lastModified: new Date().toISOString(),
    metadata: {
      sectionType: "hero",
      order: 2,
    },
  },
  {
    id: "hero_cta_button",
    type: "text",
    title: "Hero CTA Button",
    content: {
      en: "View Our Work",
      lv: "Skatīt Mūsu Darbus",
    },
    location: "Homepage Hero",
    lastModified: new Date().toISOString(),
    metadata: {
      sectionType: "hero",
      order: 3,
    },
  },
  // About Page Content
  {
    id: "about_intro_title",
    type: "text",
    title: "About Page Introduction Title",
    content: {
      en: "Our Story",
      lv: "Mūsu Stāsts",
    },
    location: "About Page",
    lastModified: new Date().toISOString(),
    metadata: {
      sectionType: "about",
      order: 1,
    },
  },
  {
    id: "about_intro_text",
    type: "text",
    title: "About Page Introduction Text",
    content: {
      en: "We are your dedicated team of filmmakers, passionate about capturing the essence of your most cherished moments. With years of experience in cinematic storytelling, we bring creativity and technical expertise to every project.",
      lv: "Mēs esam jūsu uzticamā filmu veidotāju komanda, kas aizrautīgi iemūžina jūsu dārgāko mirkļu būtību. Ar gadiem ilgu pieredzi kinematogrāfiskajā stāstīšanā, mēs katram projektam pievienojam radošumu un tehnisko ekspertīzi.",
    },
    location: "About Page",
    lastModified: new Date().toISOString(),
    metadata: {
      sectionType: "about",
      order: 2,
    },
  },
  // Services Content
  {
    id: "services_title",
    type: "text",
    title: "Services Page Title",
    content: {
      en: "Our Services",
      lv: "Mūsu Pakalpojumi",
    },
    location: "Services Page",
    lastModified: new Date().toISOString(),
    metadata: {
      sectionType: "services",
      order: 1,
    },
  },
  {
    id: "services_description",
    type: "text",
    title: "Services Page Description",
    content: {
      en: "Professional video production services tailored to your unique vision and requirements.",
      lv: "Profesionāli video produkcijas pakalpojumi, kas pielāgoti jūsu unikālajai vīzijai un prasībām.",
    },
    location: "Services Page",
    lastModified: new Date().toISOString(),
    metadata: {
      sectionType: "services",
      order: 2,
    },
  },
  // Contact Page Content
  {
    id: "contact_title",
    type: "text",
    title: "Contact Page Title",
    content: {
      en: "Get In Touch",
      lv: "Sazināties ar Mums",
    },
    location: "Contact Page",
    lastModified: new Date().toISOString(),
  },
  {
    id: "contact_description",
    type: "text",
    title: "Contact Page Description",
    content: {
      en: "Ready to bring your vision to life? Let's discuss your project and create something amazing together.",
      lv: "Gatavi īstenot savu vīziju dzīvē? Apspriedīsim jūsu projektu un kopā radīsim kaut ko pārsteidzošu.",
    },
    location: "Contact Page",
    lastModified: new Date().toISOString(),
  },
  // Media Items
  {
    id: "hero_background_image",
    type: "image",
    title: "Homepage Hero Background",
    content: {
      en: "/hero-bg.jpg",
      lv: "/hero-bg.jpg",
    },
    location: "Homepage Hero",
    lastModified: new Date().toISOString(),
    metadata: {
      imageUrl: "/hero-bg.jpg",
      alt: "Cinematic hero background",
      dimensions: "1920x1080",
      fileSize: "2.1 MB",
    },
  },
  {
    id: "showreel_video",
    type: "video",
    title: "Company Showreel",
    content: {
      en: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      lv: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    location: "Homepage",
    lastModified: new Date().toISOString(),
    metadata: {
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      alt: "Company showreel video",
    },
  },
]

class ContentStore {
  private content: ContentItem[] = []
  private initialized = false
  private subscribers: Array<() => void> = []
  private storageKey = "cms_content_v2"

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeStore()
    }
  }

  private async initializeStore() {
    try {
      await this.loadFromStorage()
      this.initialized = true
      this.notifySubscribers()
    } catch (error) {
      console.error("Error initializing content store:", error)
      this.content = [...defaultContent]
      this.initialized = true
      this.saveToStorage()
      this.notifySubscribers()
    }
  }

  private async loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (stored) {
        const parsedContent = JSON.parse(stored)
        // Validate the structure
        if (Array.isArray(parsedContent) && parsedContent.length > 0) {
          this.content = parsedContent
        } else {
          throw new Error("Invalid content structure")
        }
      } else {
        // First time setup
        this.content = [...defaultContent]
        await this.saveToStorage()
      }
    } catch (error) {
      console.error("Error loading content from storage:", error)
      this.content = [...defaultContent]
      await this.saveToStorage()
    }
  }

  private async saveToStorage() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.content))
        // Also save a backup with timestamp
        localStorage.setItem(
          `${this.storageKey}_backup`,
          JSON.stringify({
            content: this.content,
            timestamp: new Date().toISOString(),
          }),
        )
      } catch (error) {
        console.error("Error saving content to storage:", error)
      }
    }
  }

  private notifySubscribers() {
    // Use setTimeout to avoid synchronous updates during render
    setTimeout(() => {
      this.subscribers.forEach((callback) => {
        try {
          callback()
        } catch (error) {
          console.error("Error in content store subscriber:", error)
        }
      })
    }, 0)
  }

  subscribe(callback: () => void) {
    this.subscribers.push(callback)
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback)
    }
  }

  getAll(type?: string, location?: string): ContentItem[] {
    if (!this.initialized) {
      return []
    }

    let filtered = [...this.content]

    if (type) {
      filtered = filtered.filter((item) => item.type === type)
    }

    if (location) {
      filtered = filtered.filter((item) => item.location.toLowerCase().includes(location.toLowerCase()))
    }

    return filtered.sort((a, b) => {
      // Sort by order if available, otherwise by lastModified
      const orderA = a.metadata?.order || 999
      const orderB = b.metadata?.order || 999

      if (orderA !== orderB) {
        return orderA - orderB
      }

      return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    })
  }

  getById(id: string): ContentItem | null {
    if (!this.initialized) {
      return null
    }
    return this.content.find((item) => item.id === id) || null
  }

  getByLocation(location: string): ContentItem[] {
    if (!this.initialized) {
      return []
    }
    return this.content.filter((item) => item.location.toLowerCase().includes(location.toLowerCase()))
  }

  save(item: ContentItem): boolean {
    try {
      const existingIndex = this.content.findIndex((existing) => existing.id === item.id)

      item.lastModified = new Date().toISOString()

      if (existingIndex >= 0) {
        this.content[existingIndex] = { ...item }
      } else {
        this.content.push({ ...item })
      }

      this.saveToStorage()
      this.notifySubscribers()
      return true
    } catch (error) {
      console.error("Error saving content:", error)
      return false
    }
  }

  delete(id: string): boolean {
    try {
      const index = this.content.findIndex((item) => item.id === id)
      if (index >= 0) {
        this.content.splice(index, 1)
        this.saveToStorage()
        this.notifySubscribers()
        return true
      }
      return false
    } catch (error) {
      console.error("Error deleting content:", error)
      return false
    }
  }

  create(item: Omit<ContentItem, "id" | "lastModified">): ContentItem {
    const newItem: ContentItem = {
      ...item,
      id: `${item.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      lastModified: new Date().toISOString(),
    }

    this.save(newItem)
    return newItem
  }

  // Bulk operations for better performance
  bulkSave(items: ContentItem[]): boolean {
    try {
      items.forEach((item) => {
        item.lastModified = new Date().toISOString()
        const existingIndex = this.content.findIndex((existing) => existing.id === item.id)

        if (existingIndex >= 0) {
          this.content[existingIndex] = { ...item }
        } else {
          this.content.push({ ...item })
        }
      })

      this.saveToStorage()
      this.notifySubscribers()
      return true
    } catch (error) {
      console.error("Error bulk saving content:", error)
      return false
    }
  }

  // Search functionality
  search(query: string): ContentItem[] {
    if (!query.trim() || !this.initialized) return this.getAll()

    const searchTerm = query.toLowerCase()
    return this.content.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.content.en.toLowerCase().includes(searchTerm) ||
        item.content.lv.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm),
    )
  }

  // Export/Import functionality
  export(): string {
    return JSON.stringify(this.content, null, 2)
  }

  import(jsonData: string): boolean {
    try {
      const importedContent = JSON.parse(jsonData)
      if (Array.isArray(importedContent)) {
        this.content = importedContent
        this.saveToStorage()
        this.notifySubscribers()
        return true
      }
      return false
    } catch (error) {
      console.error("Error importing content:", error)
      return false
    }
  }

  // Reset to defaults
  reset(): boolean {
    try {
      this.content = [...defaultContent]
      this.saveToStorage()
      this.notifySubscribers()
      return true
    } catch (error) {
      console.error("Error resetting content:", error)
      return false
    }
  }

  // Force refresh - useful for debugging
  forceRefresh(): void {
    this.notifySubscribers()
  }
}

export const contentStore = new ContentStore()

// Export for debugging
if (typeof window !== "undefined") {
  ;(window as any).contentStore = contentStore
}
