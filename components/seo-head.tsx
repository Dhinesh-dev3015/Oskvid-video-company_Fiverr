"use client"

import { useLanguage } from "@/contexts/language-context"
import { SITE_URL } from "@/lib/site-url"
import { usePathname } from "next/navigation"

export function SEOHead() {
  const { language } = useLanguage()
  const pathname = usePathname()

  const baseUrl = SITE_URL
  const currentUrl = `${baseUrl}${pathname}`

  // Language-specific meta data
  const seoData = {
    en: {
      title: "Osk Vid - Video Filmēšanas Pakalpojumi",
      description:
        "Professional video production services in Latvia. Specializing in weddings, promotional content, and events. Premium cinematic quality with 14+ years experience and 800+ completed projects.",
      keywords:
        "video production Latvia, wedding videography, promotional videos, event videography, cinematic videos, professional videographer",
    },
    lv: {
      title: "Osk Vid - Profesionāli Video Producēšanas Pakalpojumi | Kinematogrāfisks Vizuālais Stāstījums",
      description:
        "Mēs piedāvājam plašu video pakalpojumu klāstu, tostarp video filmēšanu, montāžu, producēšanu, uzņēmumiem visā Latvijā.",
      keywords:
        "video producēšana Latvijā, kāzu videogrāfija, mūzikas video producēšana, reklāmas video, pasākumu videogrāfija, kinemātogrāfiski video, profesionāls videogrāfs",
    },
  }

  const currentSeo = seoData[language]

  return (
    <>
      {/* Basic Meta Tags */}
      <meta name="description" content={currentSeo.description} />
      <meta name="keywords" content={currentSeo.keywords} />
      <meta name="author" content="OskVid" />
      <meta name="robots" content="index, follow" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Hreflang Tags */}
      <link rel="alternate" hrefLang="en" href={`${baseUrl}${pathname}`} />
      <link rel="alternate" hrefLang="lv" href={`${baseUrl}/lv${pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${pathname}`} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={currentSeo.title} />
      <meta property="og:description" content={currentSeo.description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={language === "lv" ? "lv_LV" : "en_US"} />
      <meta property="og:site_name" content="OskVid" />
      <meta property="og:image" content={`${baseUrl}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Osk Vid - Video Filmēšanas Pakalpojumi Kāzām, Pasākumiem un Uzņēmumiem" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentSeo.title} />
      <meta name="twitter:description" content={currentSeo.description} />
      <meta name="twitter:image" content={`${baseUrl}/og-image.png`} />

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="geo.region" content="LV" />
      <meta name="geo.placename" content="Latvia" />
      <meta name="geo.position" content="56.9496;24.1052" />
      <meta name="ICBM" content="56.9496, 24.1052" />

      {/* Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
            sameAs: ["https://www.facebook.com/Oskvidcinematography", "https://www.instagram.com/oskvid"],
            serviceType: [
              "Kāzu videogrāfija",
              "Reklāmas video",
              "Pasākumu videogrāfija",
              "Komerciālā video producēšana",
            ],
            areaServed: {
              "@type": "Country",
              name: "Latvia",
            },
          }),
        }}
      />
    </>
  )
}
