"use client"

import { useLanguage } from "@/contexts/language-context"
import { SITE_URL } from "@/lib/site-url"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

export function DynamicSEO() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const createdElementsRef = useRef<HTMLElement[]>([])

  const baseUrl = SITE_URL
  const currentUrl = `${baseUrl}${pathname}`

  // Route-specific SEO data
  const routeSeoData: Record<string, { en: { title: string; description: string }; lv: { title: string; description: string } }> = {
    "/par-oskvid": {
      en: {
        title: "About Me | Osk Vid",
        description: "Learn about Osk Vid team's story, creative approach and trusted partners creating cinema-quality videos in Latvia.",
      },
      lv: {
        title: "Par mani | Osk Vid",
        description: "Uzzini par Osk Vid komandas stāstu, radošo pieeju un uzticamiem partneriem, kas rada kino kvalitātes video Latvijā.",
      },
    },
    "/video-filmesana": {
      en: {
        title: "Services | Osk Vid",
        description: "Professional video production services: weddings, music videos, corporate and promotional content in Latvia.",
      },
      lv: {
        title: "Pakalpojumi | Osk Vid",
        description: "Profesionāli video producēšanas pakalpojumi: kāzas, mūzikas video, korporatīvie un reklāmas video Latvijā.",
      },
    },
    "/portfolio": {
      en: {
        title: "Portfolio | Osk Vid",
        description: "Explore our video production portfolio: weddings, music videos, corporate and promotional content showcasing cinematic quality.",
      },
      lv: {
        title: "Portfolio | Osk Vid",
        description: "Apskaties mūsu video producēšanas portfolio: kāzas, mūzikas video, korporatīvie un reklāmas video ar kino kvalitāti.",
      },
    },
    "/portfolio/kazu-video-latvija": {
      en: {
        title: "Wedding Videography | Osk Vid",
        description: "Professional wedding videography services capturing your special day with cinematic quality and emotional storytelling.",
      },
      lv: {
        title: "Kāzu Videogrāfija | Osk Vid",
        description: "Profesionāla kāzu videogrāfija, kas notver jūsu īpašo dienu ar kino kvalitāti un emocionālu stāstījumu.",
      },
    },
    "/portfolio/reklamas-video": {
      en: {
        title: "Promotional Videos | Osk Vid",
        description: "Professional promotional and corporate video production services for businesses in Latvia with cinematic quality.",
      },
      lv: {
        title: "Pasākumu video | Osk Vid",
        description: "Profesionāla reklāmas un korporatīvo video producēšana uzņēmumiem Latvijā ar kino kvalitāti.",
      },
    },
    "/portfolio/music": {
      en: {
        title: "Music Videos | Osk Vid",
        description: "Professional music video production services in Latvia, creating visually stunning content for artists and musicians.",
      },
      lv: {
        title: "Mūzikas Video | Osk Vid",
        description: "Profesionāla mūzikas video producēšana Latvijā, radot vizuāli iespaidīgu saturu māksliniekiem un mūziķiem.",
      },
    },
    "/portfolio/showcase": {
      en: {
        title: "Showcase | Osk Vid",
        description: "Our best video production work showcasing cinematic quality across weddings, events, and commercial projects.",
      },
      lv: {
        title: "Showcase | Osk Vid",
        description: "Mūsu labākie video producēšanas darbi, demonstrējot kino kvalitāti kāzās, pasākumos un komerciālos projektos.",
      },
    },
    "/reviews": {
      en: {
        title: "Reviews | Osk Vid",
        description: "Read client reviews and testimonials about Osk Vid's professional video production services in Latvia.",
      },
      lv: {
        title: "Atsauksmes | Osk Vid",
        description: "Lasiet klientu atsauksmes un vērtējumus par Osk Vid profesionālajiem video producēšanas pakalpojumiem Latvijā.",
      },
    },
    "/atsauksmes": {
      en: {
        title: "Reviews | Osk Vid",
        description: "Read client reviews and testimonials about Osk Vid's professional video production services in Latvia.",
      },
      lv: {
        title: "Atsauksmes | Osk Vid",
        description: "Lasiet klientu atsauksmes un vērtējumus par Osk Vid profesionālajiem video producēšanas pakalpojumiem Latvijā.",
      },
    },
    "/kazu-blogs": {
      en: {
        title: "News | Osk Vid",
        description: "Latest news and updates from Osk Vid about video production, projects, and industry insights in Latvia.",
      },
      lv: {
        title: "Blogs | Osk Vid",
        description: "Jaunākās ziņas un atjauninājumi no Osk Vid par video producēšanu, projektiem un nozares ieskatiem Latvijā.",
      },
    },
    "/oskvid-kontakti": {
      en: {
        title: "Contact | Osk Vid",
        description: "Contact Osk Vid for professional video production services in Latvia. Get in touch for weddings, events, and commercial projects.",
      },
      lv: {
        title: "Kontakti | Osk Vid",
        description: "Sazinieties ar Osk Vid profesionāliem video producēšanas pakalpojumiem Latvijā. Kontakti kāzām, pasākumiem un komerciāliem projektiem.",
      },
    },
  }

  // Language-specific default meta data
  const defaultSeoData = {
    en: {
      title: "Osk Vid | Video Filmēšanas Pakalpojumi",
      description:
        "Professional video production services in Latvia. Specializing in weddings, music videos, promotional content, and events. Premium cinematic quality with 14+ years experience and 800+ completed projects.",
      keywords:
        "video production Latvia, wedding videography, music video production, promotional videos, event videography, cinematic videos, professional videographer",
    },
    lv: {
      title: "Osk Vid - Profesionāli Video Producēšanas Pakalpojumi | Kinematogrāfisks Vizuālais Stāstījums",
      description:
        "Mēs piedāvājam plašu video pakalpojumu klāstu, tostarp video filmēšanu, montāžu, producēšanu, uzņēmumiem visā Latvijā.",
      keywords:
        "video producēšana Latvijā, kāzu videogrāfija, mūzikas video producēšana, reklāmas video, pasākumu videogrāfija, kinemātogrāfiski video, profesionāls videogrāfs",
    },
  }

  // Get route-specific SEO or fall back to default
  const routeSeo = routeSeoData[pathname] || null
  const currentSeo = routeSeo ? routeSeo[language] : defaultSeoData[language]

  // Helper function to safely create and append elements
  const safelyCreateAndAppend = (tagName: string, attributes: Record<string, string>): HTMLElement | null => {
    if (typeof document === "undefined") return null

    try {
      const element = document.createElement(tagName)
      Object.entries(attributes).forEach(([key, value]) => {
        if (key === "hrefLang") {
          element.setAttribute("hreflang", value)
        } else {
          element.setAttribute(key, value)
        }
      })
      // Mark elements created by this component so we only ever remove our own
      element.setAttribute("data-dynamic-seo", "1")
      
      if (document.head) {
        document.head.appendChild(element)
        createdElementsRef.current.push(element)
        return element
      }
    } catch (error) {
      console.warn("Error creating/appending element:", error)
    }
    return null
  }

  // Helper function to safely remove elements
  const safelyRemoveElement = (element: Element | null) => {
    if (typeof document === "undefined" || !element) return

    try {
      // Prefer modern API which is safe if the node has no parent
      if ("remove" in element && typeof (element as any).remove === "function") {
        ;(element as any).remove()
        return
      }

      // Fallback to parentNode.removeChild with null checks
      const parent = (element as any).parentNode as ParentNode | null
      if (parent && typeof (parent as any).removeChild === "function") {
        ;(parent as any).removeChild(element)
      }
    } catch (error) {
      console.warn("Error removing element:", error)
    }
  }

  useEffect(() => {
    // Check if document exists (client-side only)
    if (typeof document === "undefined") return

    try {
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute("content", currentSeo.description)
      } else {
        safelyCreateAndAppend("meta", {
          name: "description",
          content: currentSeo.description,
        })
      }

      // Update meta keywords (use default keywords for all routes)
      const defaultKeywords = defaultSeoData[language].keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]')
      if (metaKeywords) {
        metaKeywords.setAttribute("content", defaultKeywords)
      } else {
        safelyCreateAndAppend("meta", {
          name: "keywords",
          content: defaultKeywords,
        })
      }

      // Update canonical link to main domain
      const canonicalLink = document.querySelector('link[rel="canonical"]')
      if (canonicalLink) {
        canonicalLink.setAttribute("href", currentUrl)
      } else {
        safelyCreateAndAppend("link", {
          rel: "canonical",
          href: currentUrl,
        })
      }

      // Remove only hreflang links previously created by this component
      createdElementsRef.current = createdElementsRef.current.filter((el) => {
        const isOurAlt =
          el.tagName === "LINK" &&
          (el as HTMLElement).getAttribute("data-dynamic-seo") === "1" &&
          (el as HTMLLinkElement).rel === "alternate"
        if (isOurAlt) {
          safelyRemoveElement(el)
          return false
        }
        return true
      })

      // Add new hreflang links with main domain (only our own)
      const hreflangs = [
        { lang: "lv", url: `${baseUrl}${pathname}` },
        { lang: "en", url: `${baseUrl}/en${pathname}` },
        { lang: "x-default", url: `${baseUrl}${pathname}` },
      ]

      hreflangs.forEach(({ lang, url }) => {
        safelyCreateAndAppend("link", {
          rel: "alternate",
          hreflang: lang,
          href: url,
        })
      })

      // Update Open Graph meta tags with main domain
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) {
        ogTitle.setAttribute("content", currentSeo.title)
      }

      const ogDescription = document.querySelector('meta[property="og:description"]')
      if (ogDescription) {
        ogDescription.setAttribute("content", currentSeo.description)
      }

      const ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) {
        ogUrl.setAttribute("content", currentUrl)
      }

      const ogLocale = document.querySelector('meta[property="og:locale"]')
      if (ogLocale) {
        ogLocale.setAttribute("content", language === "lv" ? "lv_LV" : "en_US")
      }

      // Update Twitter Card meta tags
      const twitterTitle = document.querySelector('meta[name="twitter:title"]')
      if (twitterTitle) {
        twitterTitle.setAttribute("content", currentSeo.title)
      }

      const twitterDescription = document.querySelector('meta[name="twitter:description"]')
      if (twitterDescription) {
        twitterDescription.setAttribute("content", currentSeo.description)
      }
    } catch (error) {
      console.warn("Error updating SEO meta tags:", error)
    }
  }, [language, pathname, currentSeo, currentUrl])

  useEffect(() => {
    // Check if document exists (client-side only)
    if (typeof document === "undefined") return

    try {
      // Remove only schema script previously created by this component
      createdElementsRef.current = createdElementsRef.current.filter((el) => {
        const isOurSchema =
          el.tagName === "SCRIPT" &&
          (el as HTMLElement).getAttribute("data-dynamic-seo") === "1" &&
          (el as HTMLScriptElement).type === "application/ld+json"
        if (isOurSchema) {
          safelyRemoveElement(el)
          return false
        }
        return true
      })

      const schemaScript = safelyCreateAndAppend("script", {
        type: "application/ld+json",
      })

      if (schemaScript) {
        schemaScript.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "OskVid",
          description: currentSeo.description,
          url: baseUrl,
          logo: `${baseUrl}/logo-gold.png`,
          image: `${baseUrl}/og-image.png`,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Anniņas",
            addressLocality: "Tomes pagasts",
            addressRegion: "Ogres novads",
            postalCode: "LV-5020",
            addressCountry: {
              "@type": "Country",
              name: "Latvia",
            },
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+371 23304329",
            contactType: "customer service",
            email: "info@oskvid.com",
          },
          sameAs: ["https://www.facebook.com/Oskvidcinematography/?locale=lv_LV", "https://www.instagram.com/osk_vid/"],
          serviceType: [
            "Wedding Videography",
            "Promotional Videos",
            "Event Videography",
            "Commercial Video Production",
          ],
          areaServed: {
            "@type": "Country",
            name: "Latvia",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": currentUrl,
          },
          potentialAction: {
            "@type": "ContactAction",
            target: `${baseUrl}/oskvid-kontakti`,
            name: "Contact us",
          },
        })
      }
    } catch (error) {
      console.warn("Error updating schema script:", error)
    }
  }, [currentSeo, baseUrl, currentUrl])

  // Cleanup function to remove created elements
  useEffect(() => {
    return () => {
      if (typeof document === "undefined") return

      try {
        // Remove all elements we created
        createdElementsRef.current.forEach((element) => {
          try {
            safelyRemoveElement(element)
          } catch (error) {
            console.warn("Error removing element during cleanup:", error)
          }
        })
        createdElementsRef.current = []
      } catch (error) {
        console.warn("Error during cleanup:", error)
      }
    }
  }, [])

  return null
}
