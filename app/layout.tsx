import type React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ThreeDBackground } from '@/components/3d-background'
import { LanguageProvider } from '@/contexts/language-context'
import { LanguageAwareHtml } from '@/components/language-aware-html'
import { ScrollToTop } from '@/components/scroll-to-top'
import { TitleSetter } from '@/components/title-setter'
import { PerformanceMonitor } from '@/components/performance-monitor'
import { FloatingContactWidget } from '@/components/floating-contact-widget'
import { Toaster } from '@/components/ui/toaster'
import { AutoImageUpdater } from '@/components/auto-image-updater'
import { CMSContentRefresher } from '@/components/cms-content-refresher'
import { SITE_URL } from '@/lib/site-url'

const spaceGrotesk = Space_Grotesk({
   subsets: ['latin'],
   variable: '--font-space-grotesk',
   display: 'swap',
   preload: true,
   fallback: ['system-ui', '-apple-system', 'sans-serif'],
})

export const metadata: Metadata = {
   metadataBase: new URL(SITE_URL),
   title: {
      default:
         'Osk Vid - Video Filmēšanas Pakalpojumi Kāzām, Pasākumiem un Uzņēmumiem',
      template: 'Osk Vid | Kāzu Video un pasākumu Video filmēšana',
   },
   description:
      'Mēs piedāvājam plašu video pakalpojumu klāstu, tostarp video filmēšanu, montāžu, producēšanu, uzņēmumiem visā Latvijā.',
   keywords: [
      'video producēšana Latvijā',
      'kāzu videogrāfija',
      'reklāmas video',
      'pasākumu videogrāfija',
      'kinematogrāfiski video',
      'profesionāls videogrāfs',
      'video montāžas pakalpojumi',
      'korporatīvie video',
      'komerciālā video producēšana',
   ],
   authors: [{ name: 'Osk Vid' }],
   creator: 'Osk Vid',
   publisher: 'Osk Vid',
   robots: {
      index: true,
      follow: true,
      googleBot: {
         index: true,
         follow: true,
         'max-video-preview': -1,
         'max-image-preview': 'large',
         'max-snippet': -1,
      },
   },
   openGraph: {
      type: 'website',
      locale: 'lv_LV',
      alternateLocale: 'en_US',
      url: 'https://oskvid.com',
      siteName: 'Osk Vid',
      title: 'Osk Vid | Video Filmēšanas Pakalpojumi',
      description:
         'Profesionāli video producēšanas pakalpojumi Latvijā. Specializējamies kāzās, reklāmas saturā un pasākumos. Premium kino kvalitāte ar 14+ gadu pieredzi.',
      images: [
         {
            url: '/og-image.png',
            width: 1200,
            height: 630,
            alt: 'Osk Vid - Video Filmēšanas Pakalpojumi Kāzām, Pasākumiem un Uzņēmumiem',
         },
      ],
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Osk Vid - Video Filmēšanas Pakalpojumi Kāzām, Pasākumiem un Uzņēmumiem',
      description:
         'Profesionāli video producēšanas pakalpojumi Latvijā. Specializējamies kāzās, reklāmas saturā un pasākumos.',
      images: ['/og-image.png'],
   },
   verification: {
      google: 'your-google-verification-code',
   },
   alternates: {
      canonical: 'https://oskvid.com',
      languages: {
         lv: 'https://oskvid.com',
         en: 'https://oskvid.com/en',
      },
   },
   appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'Osk Vid',
      startupImage: [
         {
            url: '/apple-splash-2048-2732.png',
            media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
         },
         {
            url: '/apple-splash-1668-2224.png',
            media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
         },
         {
            url: '/apple-splash-1536-2048.png',
            media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
         },
         {
            url: '/apple-splash-1125-2436.png',
            media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
         },
         {
            url: '/apple-splash-1242-2208.png',
            media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)',
         },
         {
            url: '/apple-splash-750-1334.png',
            media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
         },
         {
            url: '/apple-splash-640-1136.png',
            media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
         },
      ],
   },
   formatDetection: {
      telephone: true,
      date: false,
      email: true,
      address: true,
   },
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang='lv' className='scroll-smooth' suppressHydrationWarning>
         <head>
            {/* Preload critical resources */}

            {/* DNS prefetch for external resources */}
            <link rel='dns-prefetch' href='//fonts.googleapis.com' />
            <link rel='dns-prefetch' href='//fonts.gstatic.com' />
            <link rel='dns-prefetch' href='//www.googletagmanager.com' />

            <Script
               src='https://www.googletagmanager.com/gtag/js?id=G-QX3V0FVV5P'
               strategy='afterInteractive'
            />
            <Script id='google-analytics' strategy='afterInteractive'>
               {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QX3V0FVV5P');
          `}
            </Script>

            {/* Preconnect to critical domains */}
            <link
               rel='preconnect'
               href='https://fonts.googleapis.com'
               crossOrigin=''
            />
            <link
               rel='preconnect'
               href='https://fonts.gstatic.com'
               crossOrigin=''
            />

            {/* Standard Favicons */}
            <link rel='icon' type='image/x-icon' href='/favicon.ico' />
            <link
               rel='icon'
               type='image/png'
               sizes='32x32'
               href='/favicon.ico'
            />
            <link
               rel='icon'
               type='image/png'
               sizes='16x16'
               href='/favicon.ico'
            />

            {/* Apple Touch Icons - Optimized for all iOS devices */}
            <link rel='apple-touch-icon' href='/favicon.ico' />
            <link rel='apple-touch-icon' sizes='57x57' href='/favicon.ico' />
            <link rel='apple-touch-icon' sizes='60x60' href='/favicon.ico' />
            <link rel='apple-touch-icon' sizes='72x72' href='/favicon.ico' />
            <link rel='apple-touch-icon' sizes='76x76' href='/favicon.ico' />
            <link rel='apple-touch-icon' sizes='114x114' href='/favicon.ico' />
            <link rel='apple-touch-icon' sizes='120x120' href='/favicon.ico' />
            <link rel='apple-touch-icon' sizes='144x144' href='/favicon.ico' />
            <link rel='apple-touch-icon' sizes='152x152' href='/favicon.ico' />
            <link rel='apple-touch-icon' sizes='180x180' href='/favicon.ico' />

            {/* Apple Web App Meta Tags for enhanced iOS experience */}
            <meta name='apple-mobile-web-app-capable' content='yes' />
            <meta
               name='apple-mobile-web-app-status-bar-style'
               content='black-translucent'
            />
            <meta name='apple-mobile-web-app-title' content='OskVid' />
            <meta name='apple-touch-fullscreen' content='yes' />

            {/* Apple Splash Screens for different device sizes */}
            <link
               rel='apple-touch-startup-image'
               href='/favicon.ico'
               media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            />
            <link
               rel='apple-touch-startup-image'
               href='/favicon.ico'
               media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            />
            <link
               rel='apple-touch-startup-image'
               href='/favicon.ico'
               media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            />
            <link
               rel='apple-touch-startup-image'
               href='/favicon.ico'
               media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
            />
            <link
               rel='apple-touch-startup-image'
               href='/favicon.ico'
               media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
            />
            <link
               rel='apple-touch-startup-image'
               href='/favicon.ico'
               media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            />
            <link
               rel='apple-touch-startup-image'
               href='/favicon.ico'
               media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
            />

            {/* Android/Chrome Icons */}
            <link
               rel='icon'
               type='image/png'
               sizes='192x192'
               href='/favicon.ico'
            />
            <link
               rel='icon'
               type='image/png'
               sizes='512x512'
               href='/favicon.ico'
            />

            {/* Microsoft Tiles */}
            <meta
               name='msapplication-TileImage'
               content='/mstile-144x144.png'
            />
            <meta name='msapplication-TileColor' content='#ffd700' />
            <meta name='msapplication-config' content='/browserconfig.xml' />

            {/* PWA Manifest */}
            <link rel='manifest' href='/site.webmanifest' />

            {/* Theme Colors optimized for iOS */}
            <meta name='theme-color' content='#ffd700' />
            <meta name='msapplication-navbutton-color' content='#ffd700' />
            <meta
               name='apple-mobile-web-app-status-bar-style'
               content='black-translucent'
            />

            {/* Mobile Optimization - Enhanced */}
            <meta
               name='viewport'
               content='width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover, shrink-to-fit=no'
            />
            <meta
               name='format-detection'
               content='telephone=yes, date=no, email=yes, address=yes'
            />
            <meta name='mobile-web-app-capable' content='yes' />
            <meta name='HandheldFriendly' content='true' />
            <meta name='MobileOptimized' content='width' />

            {/* Structured Data (Schema.org) */}
            <script
               type='application/ld+json'
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify(
                     {
                        '@context': 'https://schema.org',
                        '@type': 'ProfessionalService',
                        '@id': 'https://oskvid.com/#organization',
                        name: 'Osk Vid',
                        description:
                           'Profesionāli video producēšanas pakalpojumi Latvijā. Specializējamies kāzās, reklāmas saturā un pasākumos. Premium kino kvalitāte ar 14+ gadu pieredzi un 800+ paveiktiem projektiem.',
                        url: 'https://oskvid.com',
                        logo: 'https://oskvid.com/logo-gold.png',
                        image: 'https://oskvid.com/og-image.png',
                        address: {
                           '@type': 'PostalAddress',
                           streetAddress: 'Anniņas',
                           addressLocality: 'Tomes pagasts',
                           addressRegion: 'Ogres novads',
                           postalCode: 'LV-5020',
                           addressCountry: {
                              '@type': 'Country',
                              name: 'Latvia',
                           },
                        },
                        contactPoint: [
                           {
                              '@type': 'ContactPoint',
                              telephone: '+371 23304329',
                              contactType: 'customer service',
                              email: 'info@oskvid.com',
                           },
                        ],
sameAs: [
                            'https://www.facebook.com/Oskvidcinematography/?locale=lv_LV',
                            'https://www.instagram.com/osk_vid/',
                         ],
                        serviceType: [
                           'Kāzu videogrāfija',
                           'Reklāmas video',
                           'Pasākumu videogrāfija',
                           'Komerciālā video producēšana',
                        ],
                        hasOfferCatalog: {
                           '@type': 'OfferCatalog',
                           name: 'Video producēšanas pakalpojumi',
                           itemListElement: [
                              {
                                 '@type': 'Offer',
                                 itemOffered: {
                                    '@type': 'Service',
                                    name: 'Kāzu videogrāfija',
                                 },
                              },
                              {
                                 '@type': 'Offer',
                                 itemOffered: {
                                    '@type': 'Service',
                                    name: 'Reklāmas video',
                                 },
                              },
                              {
                                 '@type': 'Offer',
                                 itemOffered: {
                                    '@type': 'Service',
                                    name: 'Pasākumu videogrāfija',
                                 },
                              },
                              {
                                 '@type': 'Offer',
                                 itemOffered: {
                                    '@type': 'Service',
                                    name: 'Komerciālā video producēšana',
                                 },
                              },
                           ],
                        },
                        areaServed: {
                           '@type': 'Country',
                           name: 'Latvia',
                        },
                     },
                     null,
                     0,
                  ),
               }}
            />

            {/* Critical CSS inline for above-the-fold content */}
            <style
               dangerouslySetInnerHTML={{
                  __html: `
            /* Critical CSS for immediate rendering */
            body {
              margin: 0;
              font-family: var(--font-space-grotesk), system-ui, -apple-system, sans-serif;
              font-display: swap;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            /* Loading placeholder with better performance */
            .loading-placeholder {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
              contain: strict;
            }

            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }

            /* Performance optimizations */
            * { box-sizing: border-box; }
            img, video { height: auto; max-width: 100%; }

            /* Mobile-first responsive design */
            @media (max-width: 768px) {
              body { font-size: 16px; line-height: 1.5; }
              .container { padding: 0 1rem; }
            }

            /* Touch-friendly buttons */
            button, .btn { min-height: 44px; min-width: 44px; }

            /* Prevent horizontal scroll */
            html, body { overflow-x: hidden; max-width: 100vw; }

            /* GPU acceleration for smooth scrolling */
            html { scroll-behavior: smooth; }
            .gpu-accelerated { transform: translateZ(0); will-change: transform; }

            /* iOS specific optimizations */
            @supports (-webkit-touch-callout: none) {
              body { -webkit-tap-highlight-color: transparent; -webkit-text-size-adjust: 100%; }
              input, textarea, select { -webkit-appearance: none; border-radius: 8px; font-size: 16px; }
              /* Prevent zoom on input focus for iOS */
              input[type="text"], input[type="email"], input[type="tel"], textarea { font-size: 16px !important; }
            }

            /* Android specific optimizations */
            @media screen and (-webkit-min-device-pixel-ratio: 0) {
              html { -webkit-text-size-adjust: 100%; }
            }

            /* Handle orientation changes */
            @media (orientation: landscape) and (max-height: 500px) {
              .nav-mobile { height: 60px; }
              .section-mobile-padding { padding-top: 8rem; padding-bottom: 8rem; }
            }
          `,
               }}
            />
         </head>
         <body className={`${spaceGrotesk.variable} font-sans`}>
            {/*<PerformanceMonitor />*/}
            {/*<AutoImageUpdater />*/}
            <CMSContentRefresher />
            <LanguageProvider>
               <TitleSetter />
               <ScrollToTop />
               <LanguageAwareHtml>
                  <div className='relative flex min-h-screen flex-col'>
                     <ThreeDBackground />
                     <Header />
                     <main className='relative z-10 flex-1'>
                        {children}

                        {/* Floating Contact Widget - Fixed */}
                        <FloatingContactWidget />
                     </main>
                     <Footer />
                  </div>
               </LanguageAwareHtml>
               <Toaster />
            </LanguageProvider>
         </body>
      </html>
   )
}
