import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://oskvid.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/portfolio/',
        '/par-oskvid/',  
        '/oskvid-kontakti/',  
        '/atsauksmes/',  
        '/video-filmesana/',  
        '/kazu-blogs/',  
      ],
      disallow: [
        '/admin/',
        '/api/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}