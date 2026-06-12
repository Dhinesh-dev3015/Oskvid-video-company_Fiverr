'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
   Save,
   Type,
   Search,
   ChevronDown,
   ChevronUp,
   Plus,
   Edit,
   Trash2,
   Calendar,
   Clock,
   Tag,
   Briefcase,
   Film,
   Home,
   MessageCircle,
   Newspaper,
   Palette,
   Quote,
   Star,
   Users,
   Video,
   User,
} from 'lucide-react'
import Image from 'next/image'
import ImageHint from '@/components/ImageHint'

interface ContentData {
   // HOME PAGE CONTENT
   homeHeroMainTitle: string
   homeHeroDescription: string
   homeHeroBackgroundImage: string

   homeServicesTitle: string
   homeServicesDescription: string
   homeServicesButtonText: string

   homeServiceWeddingTitle: string
   homeServiceWeddingImage: string
   homeServicePromoTitle: string
   homeServicePromoImage: string

   homeWhyChooseUsTitle: string
   homeWhyChooseUsDescription: string

   homeFeatureCreativeTitle: string
   homeFeatureCreativeDescription: string
   homeFeatureQualityTitle: string
   homeFeatureQualityDescription: string
   homeFeaturePersonalizedTitle: string
   homeFeaturePersonalizedDescription: string
   homeFeatureExperienceTitle: string
   homeFeatureExperienceDescription: string
   homeFeatureTimelyTitle: string
   homeFeatureTimelyDescription: string
   homeFeatureStorytellingTitle: string
   homeFeatureStorytellingDescription: string

   homeProcessTitle: string
   homeProcessDescription: string
   homeProcessStep1Title: string
   homeProcessStep1Description: string
   homeProcessStep2Title: string
   homeProcessStep2Description: string
   homeProcessStep3Title: string
   homeProcessStep3Description: string
   homeProcessStep4Title: string
   homeProcessStep4Description: string
   homeProcessStep5Title: string
   homeProcessStep5Description: string

   homeCtaTitle: string
   homeCtaDescription: string
   homeCtaBackgroundImage: string

   homeStat1Number: string
   homeStat1Label: string
   homeStat2Number: string
   homeStat2Label: string
   homeStat3Number: string
   homeStat3Label: string

   // SERVICES PAGE CONTENT
   servicesHeroTitle: string
   servicesHeroTitleHighlight: string
   servicesHeroTitleEnd: string
   servicesHeroDescription: string
   servicesHeroBackgroundImage: string
   servicesSectionTitle: string
   servicesSectionDescription: string

   // HERO SECTION
   heroTitle: string
   heroSubtitle: string
   heroDescription: string
   heroButtonPrimary: string
   heroButtonSecondary: string
   heroImage: string
   heroBackgroundImage: string

   // ABOUT SECTION
   aboutTitle: string
   aboutSubtitle: string
   aboutDescription: string
   aboutExperience: string
   aboutProjects: string
   aboutClients: string
   aboutImage: string
   aboutButtonText: string

   // SERVICES SECTION
   servicesTitle: string
   servicesSubtitle: string
   servicesDescription: string

   // Service 3 - Corporate
   serviceCorporateTitle: string
   serviceCorporateDescription: string
   serviceCorporatePrice: string
   serviceCorporateImage: string

   // PORTFOLIO SECTION

   // TESTIMONIALS SECTION
   testimonialsTitle: string
   testimonialsSubtitle: string

   // Testimonial 1 (Legacy - kept for compatibility)
   testimonial1Company: string
   testimonial1Text: string
   testimonial1Image: string

   // Testimonial 2 (Legacy - kept for compatibility)
   testimonial2Company: string
   testimonial2Text: string
   testimonial2Image: string

   // Testimonial 3 (Legacy - kept for compatibility)
   testimonial3Company: string
   testimonial3Text: string
   testimonial3Image: string

   // CONTACT SECTION
   contactTitle: string
   contactSubtitle: string
   contactDescription: string
   contactPhone: string
   contactEmail: string
   contactAddress: string
   contactButtonText: string
   contactImage: string

   // FOOTER
   footerDescription: string
   footerCopyright: string
   footerSocialFacebook: string
   footerSocialInstagram: string
   footerSocialYoutube: string

   // CTA SECTION
   ctaTitle: string
   ctaDescription: string
   ctaButtonText: string
   ctaBackgroundImage: string

   // NEWS PAGE CONTENT
   newsPageTitle: string
   newsPageDescription: string

   // PARTNER LOGOS
   partner1Name: string
   partner1Logo: string
   partner2Name: string
   partner2Logo: string
   partner3Name: string
   partner3Logo: string
   partner4Name: string
   partner4Logo: string
   partner5Name: string
   partner5Logo: string
   partner6Name: string
   partner6Logo: string
   partner7Name: string
   partner7Logo: string
   partner8Name: string
   partner8Logo: string

   // ABOUT ME PAGE CONTENT
   aboutPageTitle: string
   aboutPageBio: string
   aboutPageHeroTitle: string
   aboutPageHeroSubtitle: string
   aboutPageContactTitle: string
   aboutPageContactEmail: string
   aboutPageContactPhone: string
   aboutPageContactAddress: string
   aboutPageContactHours: string
   aboutPageHeroImage: string
   aboutPageMainImage: string
   aboutPageLogo: string

   // CONTACT PAGE CONTENT
   contactPageTitle: string
   contactPageFormTitle: string

    // REVIEWS PAGE HERO & CTA
    reviewsPageHeroTitle: string
    reviewsPageHeroSubtitle: string
    reviewsPageHeroImage: string
    reviewsPageCtaText: string
    reviewsPageCtaUrl: string

    // TESTIMONIALS FOR REVIEWS PAGE
    testimonial1Name: string
    testimonial1Role: string
    testimonial1ContentEn: string
    testimonial1ContentLv: string
    testimonial1Source: string

    testimonial2Name: string
    testimonial2Role: string
    testimonial2ContentEn: string
    testimonial2ContentLv: string
    testimonial2Source: string

    testimonial3Name: string
    testimonial3Role: string
    testimonial3ContentEn: string
    testimonial3ContentLv: string
    testimonial3Source: string

    testimonial4Name: string
    testimonial4Role: string
    testimonial4ContentEn: string
    testimonial4ContentLv: string
    testimonial4Source: string
    testimonial4Image: string

    testimonial5Name: string
    testimonial5Role: string
    testimonial5ContentEn: string
    testimonial5ContentLv: string
    testimonial5Source: string
    testimonial5Image: string

    testimonial6Name: string
    testimonial6Role: string
    testimonial6ContentEn: string
    testimonial6ContentLv: string
    testimonial6Source: string
    testimonial6Image: string

    testimonial7Name: string
    testimonial7Role: string
    testimonial7ContentEn: string
    testimonial7ContentLv: string
    testimonial7Source: string
    testimonial7Image: string

    testimonial8Name: string
    testimonial8Role: string
    testimonial8ContentEn: string
    testimonial8ContentLv: string
    testimonial8Source: string
    testimonial8Image: string

   // FEATURED TESTIMONIALS FOR REVIEWS PAGE
   featuredTestimonial1Name: string
   featuredTestimonial1Content: string
   featuredTestimonial1Description: string
   featuredTestimonial1Image: string

   featuredTestimonial2Name: string
   featuredTestimonial2Content: string
   featuredTestimonial2Description: string
   featuredTestimonial2Image: string

   featuredTestimonial3Name: string
   featuredTestimonial3Content: string
   featuredTestimonial3Description: string
   featuredTestimonial3Image: string

   // PROMO PAGE VIDEOS
   promoFeaturedVideoUrl: string
   promoFeaturedVideoThumbnail: string
   promoVideo1Url: string
   promoVideo1Thumbnail: string
   promoVideo2Url: string
   promoVideo2Thumbnail: string
   promoVideo3Url: string
   promoVideo3Thumbnail: string

   // PROMO PAGE VIDEOS - Extended
   promoFeaturedVideoTitle: string
   promoVideo1Title: string
   promoVideo1Description: string
   promoVideo2Title: string
   promoVideo2Description: string
   promoVideo3Title: string
   promoVideo3Description: string

   // PORTFOLIO PAGE VIDEOS
   portfolioVideo1Title: string
   portfolioVideo1Category: string
   portfolioVideo1Description: string
   portfolioVideo1Thumbnail: string
   portfolioVideo1Url: string
   portfolioVideo1YoutubeId: string
   portfolioVideo1Client: string
   portfolioVideo1Year: string

   portfolioVideo2Title: string
   portfolioVideo2Category: string
   portfolioVideo2Description: string
   portfolioVideo2Thumbnail: string
   portfolioVideo2Url: string
   portfolioVideo2YoutubeId: string
   portfolioVideo2Client: string
   portfolioVideo2Year: string

   portfolioVideo3Title: string
   portfolioVideo3Category: string
   portfolioVideo3Description: string
   portfolioVideo3Thumbnail: string
   portfolioVideo3Url: string
   portfolioVideo3YoutubeId: string
   portfolioVideo3Client: string
   portfolioVideo3Year: string

   portfolioVideo4Title: string
   portfolioVideo4Category: string
   portfolioVideo4Description: string
   portfolioVideo4Thumbnail: string
   portfolioVideo4Url: string
   portfolioVideo4YoutubeId: string
   portfolioVideo4Client: string
   portfolioVideo4Year: string

   portfolioVideo5Title: string
   portfolioVideo5Category: string
   portfolioVideo5Description: string
   portfolioVideo5Thumbnail: string
   portfolioVideo5Url: string
   portfolioVideo5YoutubeId: string
   portfolioVideo5Client: string
   portfolioVideo5Year: string

   portfolioVideo6Title: string
   portfolioVideo6Category: string
   portfolioVideo6Description: string
   portfolioVideo6Thumbnail: string
   portfolioVideo6Url: string
   portfolioVideo6YoutubeId: string
   portfolioVideo6Client: string
   portfolioVideo6Year: string

   // WEDDING PAGE VIDEOS
   weddingFeaturedVideoTitle: string
   weddingFeaturedVideoUrl: string
   weddingFeaturedVideoThumbnail: string
   weddingFeaturedVideoDescriptionEn: string
   weddingFeaturedVideoDescriptionLv: string

   weddingVideo1TitleEn: string
   weddingVideo1TitleLv: string
   weddingVideo1DescriptionEn: string
   weddingVideo1DescriptionLv: string
   weddingVideo1Thumbnail: string
   weddingVideo1Url: string
   weddingVideo1Year: string

   weddingVideo2TitleEn: string
   weddingVideo2TitleLv: string
   weddingVideo2DescriptionEn: string
   weddingVideo2DescriptionLv: string
   weddingVideo2Thumbnail: string
   weddingVideo2Url: string
   weddingVideo2Year: string

   weddingVideo3TitleEn: string
   weddingVideo3TitleLv: string
   weddingVideo3DescriptionEn: string
   weddingVideo3DescriptionLv: string
   weddingVideo3Thumbnail: string
   weddingVideo3Url: string
   weddingVideo3Year: string

   // PAKALPOJUMI PAGE SERVICES (Legacy - kept for compatibility)
   service1Title: string
   service1Subtitle: string
   service1Description: string
   service1Price: string
   service1Duration: string
   service1VideoUrl: string
   service1VideoThumbnail: string
   service1Image: string

   service2Title: string
   service2Subtitle: string
   service2Description: string
   service2Price: string
   service2Duration: string
   service2VideoUrl: string
   service2VideoThumbnail: string
   service2Image: string

   service3Title: string
   service3Subtitle: string
   service3Description: string
   service3Price: string
   service3Duration: string
   service3VideoUrl: string
   service3VideoThumbnail: string
   service3Image: string

   // ABOUT ME PAGE CLICKABLE IMAGES
   aboutPageClickableImage1: string
   aboutPageClickableImage2: string
   aboutPageClickableImage3: string

   // PAKALPOJUMI PAGE DETAILED SERVICE CONTENT
   serviceWeddingTitle: string
   serviceWeddingSubtitle: string
   serviceWeddingDescription: string
   serviceWeddingPrice: string
   serviceWeddingDuration: string
   serviceWeddingImage: string
   serviceWeddingVideoUrl: string
   serviceWeddingFeatures: string
   serviceWeddingHighlights: string
   serviceWeddingButtonOrder: string
   serviceWeddingButtonLearnMore: string
   serviceWeddingTag1: string
   serviceWeddingTag2: string
   serviceWeddingTag3: string
   serviceWeddingIncluded1: string
   serviceWeddingIncluded2: string
   serviceWeddingIncluded3: string
   serviceWeddingIncluded4: string
   serviceWeddingIncluded5: string
   serviceWeddingIncluded6: string

   serviceAdTitle: string
   serviceAdSubtitle: string
   serviceAdDescription: string
   serviceAdPrice: string
   serviceAdDuration: string
   serviceAdImage: string
   serviceAdVideoUrl: string
   serviceAdFeatures: string
   serviceAdHighlights: string
   serviceAdButtonOrder: string
   serviceAdButtonLearnMore: string
   serviceAdTag1: string
   serviceAdTag2: string
   serviceAdTag3: string
   serviceAdIncluded1: string
   serviceAdIncluded2: string
   serviceAdIncluded3: string
   serviceAdIncluded4: string
   serviceAdIncluded5: string
   serviceAdIncluded6: string

   serviceEventTitle: string
   serviceEventSubtitle: string
   serviceEventDescription: string
   serviceEventPrice: string
   serviceEventDuration: string
   serviceEventImage: string
   serviceEventVideoUrl: string
   serviceEventFeatures: string
   serviceEventHighlights: string
   serviceEventButtonOrder: string
   serviceEventButtonLearnMore: string
   serviceEventTag1: string
   serviceEventTag2: string
   serviceEventTag3: string
   serviceEventIncluded1: string
   serviceEventIncluded2: string
   serviceEventIncluded3: string
   serviceEventIncluded4: string
   serviceEventIncluded5: string
   serviceEventIncluded6: string

   // PORTFOLIO PAGE MAIN IMAGES
   portfolioWeddingImage: string
   portfolioPromoImage: string

   // PORTFOLIO PAGE VIDEO DESCRIPTIONS
   portfolioVideo1ShortDescription: string
   portfolioVideo2ShortDescription: string
   portfolioVideo3ShortDescription: string
   portfolioVideo4ShortDescription: string
   portfolioVideo5ShortDescription: string
   portfolioVideo6ShortDescription: string

   // PORTFOLIO PAGE VIDEO THUMBNAIL DESCRIPTIONS
   portfolioVideo1ThumbnailDescription: string
   portfolioVideo2ThumbnailDescription: string
   portfolioVideo3ThumbnailDescription: string
   portfolioVideo4ThumbnailDescription: string
   portfolioVideo5ThumbnailDescription: string
   portfolioVideo6ThumbnailDescription: string

   // PORTFOLIO PAGE MAIN CATEGORY TEXTS
   portfolioWeddingsTitle: string
   portfolioPromoTitle: string

   // PORTFOLIO WEDDINGS PAGE VIDEO TEXTS
   portfolioWeddingVideo1Title: string
   portfolioWeddingVideo1Description: string
   portfolioWeddingVideo1Url: string
   portfolioWeddingVideo2Title: string
   portfolioWeddingVideo2Description: string
   portfolioWeddingVideo2Url: string
   portfolioWeddingVideo3Title: string
   portfolioWeddingVideo3Description: string
   portfolioWeddingVideo3Url: string

   // PORTFOLIO PROMO PAGE VIDEO TEXTS
   portfolioPromoVideo1Title: string
   portfolioPromoVideo1Description: string
   portfolioPromoVideo1Url: string
   portfolioPromoVideo2Title: string
   portfolioPromoVideo2Description: string
   portfolioPromoVideo2Url: string
   portfolioPromoVideo3Title: string
   portfolioPromoVideo3Description: string
   portfolioPromoVideo3Url: string

   // PORTFOLIO CATEGORY PAGES RIGHT-SIDE TEXTS
   portfolioWeddingsPageRightText: string
   portfolioWeddingFeaturedVideoUrl: string
   portfolioWeddingFeaturedVideoTitle: string
   portfolioPromoPageRightText: string
   portfolioPromoFeaturedVideoUrl: string
   portfolioPromoFeaturedVideoTitle: string

   // PORTFOLIO PAGE VIDEO HIGHLIGHTED TEXTS
   portfolioVideo1HighlightedText: string
   portfolioVideo2HighlightedText: string
   portfolioVideo3HighlightedText: string
   portfolioVideo4HighlightedText: string
   portfolioVideo5HighlightedText: string
   portfolioVideo6HighlightedText: string

   servicesHeroSubtitle: string
}

const defaultContent: any = {
   // HEADER

   // HOME PAGE CONTENT
   homeHeroMainTitle: 'Profesionāla Video Ražošana',
   homeHeroDescription:
      'Mēs specializējamies kāzu, mūzikas video, korporatīvo un reklāmas video ražošanā ar vairāk nekā 8 gadu pieredzi. Radām kvalitatīvus video risinājumus, kas palīdz jūsu stāstam sasniegt auditoriju.',
   homeHeroBackgroundImage: '/images/videographer-sunset.jpeg',

   homeServicesTitle: 'Mūsu Pakalpojumi',
   homeServicesDescription:
      'Piedāvājam pilnu video ražošanas pakalpojumu spektru - no kāzu filmēšanas līdz korporatīvajiem projektiem un reklāmas video.',
   homeServicesButtonText: 'Skatīt Portfolio',

   homeServiceWeddingTitle: 'Kāzu Filmēšana',
   homeServiceWeddingImage: '/images/wedding-couple-church.jpeg',
   homeServicePromoTitle: 'Korporatīvie Video',
   homeServicePromoImage: '/images/professional-equipment.jpeg',

   homeWhyChooseUsTitle: 'Kāpēc Izvēlēties Mūs?',
   homeWhyChooseUsDescription:
      'Mēs apvienojam radošumu ar tehnisko prasmi, lai radītu kvalitatīvus video risinājumus, kas palīdz jūsu stāstam sasniegt auditoriju.',

   homeFeatureCreativeTitle: 'Radoša Pieeja',
   homeFeatureCreativeDescription:
      'Katrs projekts tiek veidots ar individuālu pieeju un radošu vīziju.',
   homeFeatureQualityTitle: 'Augsta Kvalitāte',
   homeFeatureQualityDescription:
      'Izmantojam profesionālu aprīkojumu un jaunākās tehnoloģijas.',
   homeFeaturePersonalizedTitle: 'Personalizēta Pieeja',
   homeFeaturePersonalizedDescription:
      'Katrs klients saņem individuālu uzmanību un personalizētu servisu.',
   homeFeatureExperienceTitle: 'Pieredze',
   homeFeatureExperienceDescription:
      'Vairāk nekā 8 gadu pieredze video ražošanas jomā.',
   homeFeatureTimelyTitle: 'Precīzs Grafiks',
   homeFeatureTimelyDescription:
      'Visi projekti tiek nodoti noteiktajā laikā bez kompromisiem kvalitātē.',
   homeFeatureStorytellingTitle: 'Stāstījums',
   homeFeatureStorytellingDescription:
      'Katrs video stāsta unikālu stāstu, kas rezonē ar auditoriju.',

   homeProcessTitle: 'Mūsu Darba Process',
   homeProcessDescription:
      'Mēs sekojam strukturētam procesam, lai nodrošinātu labāko rezultātu jūsu projektam.',
   homeProcessStep1Title: 'Konsultācija',
   homeProcessStep1Description:
      'Apspriežam jūsu vīziju, mērķus un projekta prasības detalizēti.',
   homeProcessStep2Title: 'Plānošana',
   homeProcessStep2Description:
      'Izstrādājam detalizētu scenāriju, lokāciju plānu un grafiku.',
   homeProcessStep3Title: 'Ražošana',
   homeProcessStep3Description:
      'Profesionāla filmēšana ar augstākās kvalitātes aprīkojumu.',
   homeProcessStep4Title: 'Post-ražošana',
   homeProcessStep4Description:
      'Profesionāla montāža, krāsu korekcija un audio apstrāde.',
   homeProcessStep5Title: 'Nodošana',
   homeProcessStep5Description:
      'Finālā video piegāde visās nepieciešamajās versijās un formātos.',

   homeCtaTitle: 'Gatavi īstenot savu vīziju dzīvē?',
   homeCtaDescription:
      'Ar vairāk nekā astoņu gadu pieredzi un vairāk nekā 800 pabeigtiem projektiem mums ir zināšanas, lai pārvērstu jūsu idejas aizraujošos vizuālos stāstos.',
   homeCtaBackgroundImage: '/images/professional-equipment.jpeg',

   homeStat1Number: '14+',
   homeStat1Label: 'Gadu pieredze',
   homeStat2Number: '800+',
   homeStat2Label: 'Pabeigtie projekti',
   homeStat3Number: '100%',
   homeStat3Label: 'Projekti nodoti laicīgi',

   // SERVICES PAGE CONTENT
   servicesPageTitle: 'Pakalpojumi',
   servicesBadgeText: 'Profesionāli video pakalpojumi',
   servicesHeroTitle: 'Pārvēršam jūsu',
   servicesHeroTitleHighlight: 'vīzijas',
   servicesHeroTitleEnd: 'realitātē',
   servicesHeroDescription:
      'Ar vairāk nekā 8 gadu pieredzi un 800+ pabeigtiem projektiem, mēs radām video saturu, kas atstāj paliekošu iespaidu.',
   servicesHeroBackgroundImage: '/hero-cinematic.jpg',

   servicespartnersTitle: 'Uzticēti',
   servicespartnersTitleHighlight: 'TOP partneri',
   servicespartnersDescription:
      'Mēs lepojamies ar sadarbību ar vadošajiem tehnoloģiju uzņēmumiem un zīmoliem',

   servicesMainBadgeText: 'Pilns video risinājumu spektrs',
   servicesMainTitle: 'Mūsu',
   servicesMainTitleHighlight: 'pakalpojumi',
   servicesMainDescription:
      'No koncepcijas līdz gatavam produktam - mēs nodrošinām visus video ražošanas posmus',

   servicesCtaTitle: 'Gatavi sākt savu projektu?',
   servicesCtaDescription:
      'Sazinieties ar mums jau šodien un saņemiet bezmaksas konsultāciju par jūsu video projektu',
   servicesCtaButtonPrimary: 'Sazināties tagad',
   servicesCtaButtonSecondary: 'Skatīt portfolio',

   // HERO SECTION
   heroTitle: 'Profesionāla Video Ražošana',
   heroSubtitle: 'Radām Kvalitatīvus Video Risinājumus',
   heroDescription:
      'Mēs specializējamies kāzu, mūzikas video, korporatīvo un reklāmas video ražošanā ar vairāk nekā 8 gadu pieredzi.',
   heroButtonPrimary: 'Skatīt Portfolio',
   heroButtonSecondary: 'Sazināties',
   heroImage: '/images/videographer-sunset.jpeg',
   heroBackgroundImage: '/hero-bg.jpg',

   // ABOUT SECTION
   aboutTitle: 'Par Mums',
   aboutSubtitle: 'Jūsu Stāsta Radītāji',
   aboutDescription:
      'Mēs esam pieredzējuši video ražošanas profesionāļi, kas palīdz uzņēmumiem un privātpersonām radīt kvalitatīvus video materiālus. Mūsu komanda apvieno radošumu ar tehnisko prasmi.',
   aboutExperience: '14+ Gadi Pieredzes',
   aboutProjects: '800+ Projekti',
   aboutClients: '200+ Klienti',
   aboutImage: '/images/professional-equipment.jpeg',
   aboutButtonText: 'Uzzināt Vairāk',

   // SERVICES SECTION
   servicesTitle: 'Mūsu Pakalpojumi',
   servicesSubtitle: 'Pilns Video Ražošanas Spektrs',
   servicesDescription:
      'Piedāvājam dažādus video ražošanas pakalpojumus - no kāzu filmēšanas līdz korporatīvajiem projektiem.',

   // Service 3 - Corporate
   serviceCorporateTitle: 'Korporatīvie Video',
   serviceCorporateDescription:
      'Uzņēmumu prezentācijas, reklāmas un korporatīvo pasākumu filmēšana.',
   serviceCorporatePrice: 'No €600',
   serviceCorporateImage: '/images/camera-setup-blue.jpeg',

   // PORTFOLIO SECTION

   // TESTIMONIALS SECTION
   testimonialsTitle: 'Ko Saka Klienti',
   testimonialsSubtitle: 'Atsauksmes Par Mūsu Darbu',

   // Testimonial 1 (Legacy - kept for compatibility)
   testimonial1Company: 'Kāzu Organizatore',
   testimonial1Text:
      'Fantastisks darbs! Video kvalitāte pārspēja visas cerības. Profesionāla komanda un lieliska sadarbība.',
   testimonial1Image: '/team-member-one.png',

   // Testimonial 2 (Legacy - kept for compatibility)
   testimonial2Company: 'Mūziķis',
   testimonial2Text:
      'Mūzikas video klips izdevās perfekts! Radošā pieeja un tehniskā kvalitāte ir augstākajā līmenī.',
   testimonial2Image: '/team-member-2.png',

   // Testimonial 3 (Legacy - kept for compatibility)
   testimonial3Company: 'Uzņēmums',
   testimonial3Text:
      'Korporatīvais video palīdzēja mums piesaistīt jaunus klientus. Ļoti apmierināti ar rezultātu!',
   testimonial3Image: '/diverse-team-member-3.png',

   // FOOTER
   footerDescription:
      'Osk Vid - jūsu uzticamais partneris video ražošanas jomā. Radām kvalitatīvus video risinājumus jau vairāk nekā 8 gadus.',
   footerCopyright: '© 2026 Osk Vid. Visas tiesības aizsargātas.',
    footerSocialFacebook: 'https://www.facebook.com/Oskvidcinematography/?locale=lv_LV',
    footerSocialInstagram: 'https://www.instagram.com/osk_vid/',
   footerSocialYoutube: 'https://www.youtube.com/@OskarsAndersons',

   // CTA SECTION
   ctaTitle: 'Gatavs Sākt Savu Projektu?',
   ctaDescription:
      'Sazinieties ar mums jau šodien un iegūstiet bezmaksas konsultāciju par jūsu video projektu.',
   ctaButtonText: 'Sazināties Tagad',
   ctaBackgroundImage: '/cta-bg.jpg',

   // NEWS PAGE CONTENT
   newsPageTitle: 'Jaunumi',
   newsPageDescription: 'Mūsu jaunākie projekti un aktualitātes',

   // NEWS ARTICLES - Complete set
   newsArticle1Title: 'Jauns Sony FX6 kamerā',
   newsArticle1Excerpt:
      'Esam iegādājušies jaunu Sony FX6 kameru. Dalāmies ar pirmajiem iespaideiem.',
   newsArticle1Image: '/images/professional-camera.jpg',

   newsArticle2Title: 'Kāzu video padomi',
   newsArticle2Excerpt:
      'Kā sagatavoties kāzu video filmēšanai. Praktiski padomi pāriem.',
   newsArticle2Image: '/images/wedding-preparation.jpeg',

   newsArticle3Title: 'RSU projekts pabeigts',
   newsArticle3Excerpt:
      'Veiksmīgi pabeidzām korporatīvo video projektu Rīgas Stradiņa universitātei.',
   newsArticle3Image: '/partners/rsu-logo.png',

   newsArticle4Title: 'Dronu filmēšana',
   newsArticle4Excerpt:
      'Jaunākās iespējas dronu video filmēšanā un nepieciešamās atļaujas.',
   newsArticle4Image: '/images/drone-shot.png',

   newsArticle5Title: 'Studijas apgaismojums',
   newsArticle5Excerpt:
      'Pamati studijas apgaismojuma iestatīšanai dažādiem projektiem.',
   newsArticle5Image: '/images/studio-purple-lighting.jpeg',
   newsArticle6Title: 'TV3 sadarbība',
   newsArticle6Excerpt:
      'Sākam jaunu sadarbību ar TV3 Group reklāmas video ražošanā.',
   newsArticle6Image: '/partners/tv3-group-logo.png',

   newsArticle1Category: 'Tehnoloģijas',
   newsArticle1Date: '2024-01-15',
   newsArticle1Readtime: '3 min',
   newsArticle2Category: 'Padomi',
   newsArticle2Date: '2024-01-12',
   newsArticle2Readtime: '5 min',
   newsArticle3Category: 'Projekti',
   newsArticle3Date: '2024-01-10',
   newsArticle3Readtime: '2 min',
   newsArticle4Category: 'Padomi',
   newsArticle4Date: '2024-01-08',
   newsArticle4Readtime: '4 min',
   newsArticle5Category: 'Padomi',
   newsArticle5Date: '2024-01-05',
   newsArticle5Readtime: '',
   newsArticle6Category: '',
   newsArticle6Date: '',
   newsArticle6Readtime: '',

   // PARTNER LOGOS
   partner1Name: 'Rīgas Stradiņa Universitāte',
   partner1Logo: '/partners/rsu-logo.png',
   partner2Name: 'ZANEL Events',
   partner2Logo: '/partners/zanel-logo.png',
   partner3Name: 'Skudras Metropole',
   partner3Logo: '/partners/skudras-metropole-logo.jpeg',
   partner4Name: 'TV3 Group',
   partner4Logo: '/partners/tv3-group-logo.png',
   partner5Name: 'Mārupes Novads',
   partner5Logo: '/partners/marupes-novads-logo.png',
   partner6Name: 'Hanseatic',
   partner6Logo: '/partners/hanseatic-logo.webp',
   partner7Name: 'DOLE KRAVAS AUTO',
   partner7Logo: '/partners/dole-kravas-auto-logo.gif',
   partner8Name: 'COMPENSA Vienna Insurance Group',
   partner8Logo: '/partners/compensa-logo.png',

   // ABOUT ME PAGE CONTENT
   aboutPageTitle: 'Par Oskvid',
   aboutPageBio:
      'Vajadzētu mazu biogrāfiju par Oskaru un sadarbības partneri, lai klientiem ir interesanti lasīt, kas tad ir Oskars, kas viņam patīk, kas nepatīk, kas aizrauj un protams klāt viņa bildes, lai veidotu uzticamību potenciālajiem klientiem un nerastos jautājumi, kas viņš ir.',
   aboutPageHeroTitle: 'MĒS ESAM ŠEIT, LAI PALĪDZĒTU JUMS',
   aboutPageHeroSubtitle: 'Jūsu radošo mediju partneris',
   aboutPageContactTitle: 'Kontaktinformācija',
   aboutPageContactEmail: 'info@oskvid.lv',
   aboutPageContactPhone: '+371 20 123 456',
   aboutPageContactAddress: 'Rīga, Latvija',
   aboutPageContactHours: 'P-Pk: 9:00 - 18:00',
   aboutPageHeroImage: '/images/videographer-studio.jpeg',
   aboutPageMainImage: '/images/videographer-studio.jpeg',
   aboutPageLogo: '/oskvid-logo-new.png',

   // CONTACT PAGE CONTENT
   contactPageTitle: 'Sazināties',
   contactPageFormTitle: 'Sazināties ar Oskvid',

   // REVIEWS PAGE HERO & CTA
   reviewsPageHeroTitle: 'ATSAUKSMES',
   reviewsPageHeroSubtitle: 'Klientu atsauksmes par sadarbību ar Osk Vid',
   reviewsPageHeroImage: '/images/wedding-couple-church.jpeg',
   reviewsPageCtaText: 'ATSTĀT ATSAUKSMES',
   reviewsPageCtaUrl: 'https://share.google/WivDfBdEPoloDPwV0',

   // TESTIMONIALS FOR REVIEWS PAGE
   testimonial1Name: 'Laura Jadikina',
   testimonial1Role: 'Baby Shower Client',
   testimonial1ContentEn:
      'He made me amazing baby shower video and also pictures with such a great quality and in so short notice and time. Super happy with this guy! Really friendly what is totally important for me! Easy to comunicate. Thank u Oskar! 🙏 🌞 😁 Next time maybe wedding video 💍👰',
   testimonial1ContentLv:
      'Viņš man izveidoja lielisku baby shower video un arī bildes ar tik lielisku kvalitāti un tik īsā laikā. Super priecīga par šo puisi! Tiešām draudzīgs, kas man ir ļoti svarīgi! Viegli komunicēt. Paldies tev, Oskar! 🙏 🌞 😁 Nākamreiz varbūt kāzu video 💍👰',
   testimonial1Source: 'Facebook',

   testimonial2Name: 'Toms Aboltins',
   testimonial2Role: 'Music Video Client',
   testimonial2ContentEn:
      "Bro, you haven't filmed anything for me yet, but I definitely recommend you! In short, you know what to do to make the outcome exactly what people want! Respect, and keep on going! 👍 👍 👍",
   testimonial2ContentLv:
      'Čom, tu man vēl neko neesi filmējis, bet es tevi noteikti iesaku! Īsumā, tu zini, ko darīt, lai rezultāts būtu tieši tāds, kādu cilvēki vēlas! Cieņa, un turpini tā! 👍 👍 👍',
   testimonial2Source: 'Facebook',

   testimonial3Name: 'Romans Gorbačovs',
   testimonial3Role: 'Commercial Client',
   testimonial3ContentEn:
      'Very good quality videos! If you want some cinematic video Osk Vid can make it 💦💦',
   testimonial3ContentLv:
      'Ļoti labas kvalitātes video! Ja vēlies kādu kinematogrāfisku video, Osk Vid to var izveidot 💦💦',
   testimonial3Source: 'Facebook',

   testimonial4Name: 'Anna Liepiņa',
   testimonial4Role: 'Wedding Client',
   testimonial4ContentEn:
      "Oskar captured our wedding day perfectly! The attention to detail and the way he documented all the special moments was incredible. We couldn't be happier with our wedding film. It brings tears to our eyes every time we watch it.",
   testimonial4ContentLv:
      'Oskars lieliski iemūžināja mūsu kāzu dienu! Uzmanība detaļām un veids, kā viņš dokumentēja visus īpašos mirkļus, bija neticams. Mēs nevaram būt laimīgāki ar mūsu kāzu filmu. Tā izraisa asaras mūsu acīs katru reizi, kad to skatāmies.',
   testimonial4Source: 'Facebook',

   testimonial5Name: 'Jānis Bērziņš',
   testimonial5Role: 'Corporate Client',
   testimonial5ContentEn:
      "We hired OSK VID for our company's promotional video and the results exceeded our expectations. Professional, creative, and delivered on time. Our customers love the video and it has significantly improved our brand image.",
   testimonial5ContentLv:
      'Mēs nolīgām OSK VID mūsu uzņēmuma reklāmas video veidošanai, un rezultāti pārsniedza mūsu cerības. Profesionāli, radoši un piegādāti laikā. Mūsu klientiem patīk video, un tas ir ievērojami uzlabojis mūsu zīmola tēlu.',
   testimonial5Source: 'Google',

   testimonial6Name: 'Marta Ozola',
   testimonial6Role: 'Music Artist',
   testimonial6ContentEn:
      'Working with Oskar on my music video was an amazing experience. He understood my vision perfectly and added his creative touch to make it even better. The video has helped me gain more followers and recognition in the industry.',
   testimonial6ContentLv:
      'Darbs ar Oskaru pie mana mūzikas video bija lieliska pieredze. Viņš lieliski saprata manu vīziju un pievienoja savu radošo pieskārienu, lai to padarītu vēl labāku. Video man ir palīdzējis iegūt vairāk sekotāju un atzinību nozarē.',
   testimonial6Source: 'Instagram',

   testimonial7Name: 'Kristaps Zālītis',
   testimonial7Role: 'Barbershop Owner',
   testimonial7ContentEn:
      'The promotional video OSK VID created for our barbershop has brought in so many new clients! The quality of the filming and editing is top-notch. Oskar was easy to work with and really understood what we wanted to achieve.',
   testimonial7ContentLv:
      'Reklāmas video, ko OSK VID izveidoja mūsu bārddziņu salonam, ir piesaistījis tik daudz jaunu klientu! Filmēšanas un montāžas kvalitāte ir augstākā līmeņa. Ar Oskaru bija viegli sadarboties, un viņš tiešām saprata, ko mēs vēlējāmies sasniegt.',
   testimonial7Source: 'Facebook',

   testimonial8Name: 'Linda Kļaviņa',
   testimonial8Role: 'Event Organizer',
   testimonial8ContentEn:
      "We've worked with OSK VID for multiple events and they never disappoint. Their ability to capture the atmosphere and energy of our events is unmatched. Always professional, always on time, and always delivering exceptional quality.",
   testimonial8ContentLv:
      'Mēs esam sadarbojušies ar OSK VID vairākos pasākumos, un viņi nekad nevilj. Viņu spēja notvert mūsu pasākumu atmosfēru un enerģiju ir nepārspējama. Vienmēr profesionāli, vienmēr laikā un vienmēr nodrošina izcilu kvalitāti.',
    testimonial8Source: 'Google',

    // TESTIMONIAL IMAGES (4-8, 1-3 have legacy images)
    testimonial4Image: '',
    testimonial5Image: '',
    testimonial6Image: '',
    testimonial7Image: '',
    testimonial8Image: '',

    // FEATURED TESTIMONIALS FOR REVIEWS PAGE
   featuredTestimonial1Name: 'Inese un Emīls',
   featuredTestimonial1Content: 'Waaaaau Nav vārdu! Tik skaisti 😍😍😍 🤍',
   featuredTestimonial1Description:
      'Mums bija tik skaista diena, man tāds prieks ka mēs izvēlējāmies tieši jūs! Mums kāzu dienā bija pati labākā komanda!',
   featuredTestimonial1Image: '/images/wedding-couple-church.jpeg',

   featuredTestimonial2Name: 'Kristīne un Mārtiņš',
   featuredTestimonial2Content: 'Neticami profesionāli! 🎥✨',
   featuredTestimonial2Description:
      'Oskars iemūžināja mūsu kāzu dienu tik skaisti! Video kvalitāte ir fantastiski augsta, un viņa radošā pieeja pārspēja visas mūsu cerības.',
   featuredTestimonial2Image: '/images/videographer-silhouette.jpeg',

   featuredTestimonial3Name: 'Laura un Jānis',
   featuredTestimonial3Content: 'Mūsu sapņu kāzu video! 💕👰🤵',
   featuredTestimonial3Description:
      'OSK VID komanda bija neticami profesionāla un radoša. Viņi notveŗa katru īpašo mirkli, un rezultāts pārsniedza visas mūsu cerības!',
   featuredTestimonial3Image: '/images/camera-viewfinder.jpeg',

   // PROMO PAGE VIDEOS
   promoFeaturedVideoUrl: 'https://www.youtube.com/embed/0pHoVAbAizc',
   promoFeaturedVideoThumbnail:
      'https://img.youtube.com/vi/0pHoVAbAizc/hqdefault.jpg',
   promoVideo1Url: 'https://www.youtube.com/embed/gLUmzmxgkqw',
   promoVideo1Thumbnail:
      'https://img.youtube.com/vi/gLUmzmxgkqw/hqdefault.jpg',
   promoVideo2Url: 'https://www.youtube.com/embed/624qTZkRjoQ',
   promoVideo2Thumbnail:
      'https://img.youtube.com/vi/624qTZkRjoQ/hqdefault.jpg',
   promoVideo3Url: 'https://www.youtube.com/embed/INuvMNyhzeo',
   promoVideo3Thumbnail:
      'https://img.youtube.com/vi/INuvMNyhzeo/hqdefault.jpg',

   // PROMO PAGE VIDEOS - Extended
   promoFeaturedVideoTitle: 'Promotional Showreel 2025',
   promoVideo1Title: 'Cakes n Bakes',
   promoVideo1Description:
      'Profesionāls reklāmas video, kas demonstrē amatniecības konditorejas produktus ar satriecošu vizuālo stāstījumu un ēdienvēlmi raisošu kinematogrāfiju.',
   promoVideo2Title: 'Reklāmas Video',
   promoVideo2Description:
      'Dinamisks komerciāls saturs, kas izstrādāts, lai iesaistītu auditoriju un efektīvi nodotu zīmola vērtības caur pārliecinošu vizuālo stāstījumu.',
   promoVideo3Title: 'Komerciālais Promo',
   promoVideo3Description:
      'Augstas ietekmes komerciāls reklāmas video, kas veidots, lai maksimizētu zīmola atpazīstamību un veicinātu klientu iesaisti caur radošu stāstījumu.',

   // PORTFOLIO PAGE VIDEOS
   portfolioVideo1Title: 'EVENT SHOWREEL 2024',
   portfolioVideo1Category: 'Pasākumu Filmas',
   portfolioVideo1Description:
      'Profesionāls pasākumu showreel, kas demonstrē OSK VID komandas prasmes dažādu pasākumu filmēšanā. Iekļauj labākos mirkļus no 2024. gada projektiem.',
   portfolioVideo1Thumbnail:
      'https://img.youtube.com/vi/0pHoVAbAizc/hqdefault.jpg',
   portfolioVideo1Url: 'https://www.youtube.com/watch?v=0pHoVAbAizc',
   portfolioVideo1YoutubeId: '0pHoVAbAizc',
   portfolioVideo1Client: 'OSK VID',
   portfolioVideo1Year: '2024',

   portfolioVideo2Title: 'WEDDING SHOWREEL 2025',
   portfolioVideo2Category: 'Kāzu Filmas',
   portfolioVideo2Description:
      'Emocionāls kāzu showreel ar skaistākajiem mirkļiem no kāzu filmēšanas. Parāda kinematogrāfisko pieeju un profesionālo kvalitāti kāzu video ražošanā.',
   portfolioVideo2Thumbnail:
      'https://img.youtube.com/vi/b60K5KRpeBQ/hqdefault.jpg',
   portfolioVideo2Url: 'https://www.youtube.com/watch?v=b60K5KRpeBQ',
   portfolioVideo2YoutubeId: 'b60K5KRpeBQ',
   portfolioVideo2Client: 'OSK VID',
   portfolioVideo2Year: '2025',

   portfolioVideo3Title: 'KREATĪVS PROJEKTS',
   portfolioVideo3Category: 'Māksliniecisks Saturs',
   portfolioVideo3Description:
      'Inovatīvs un kreatīvs video projekts, kas demonstrē unikālu vizuālo stilu un tehniskās prasmes. Eksperimentāla pieeja video ražošanā.',
   portfolioVideo3Thumbnail:
      'https://img.youtube.com/vi/0a7bQ0wcJf8/hqdefault.jpg',
   portfolioVideo3Url: 'https://www.youtube.com/watch?v=0a7bQ0wcJf8',
   portfolioVideo3YoutubeId: '0a7bQ0wcJf8',
   portfolioVideo3Client: 'OSK VID',
   portfolioVideo3Year: '2024',

   
   portfolioVideo4Title: 'KOMERCIĀLA RAŽOŠANA',
   portfolioVideo4Category: 'Reklāmas Video',
   portfolioVideo4Description:
      'Profesionāla komerciāla video ražošana ar augstu kvalitāti un radošu pieeju. Parāda spēju strādāt ar korporatīviem klientiem un radīt efektīvu saturu.',
   portfolioVideo4Thumbnail:
      'https://img.youtube.com/vi/FXIDrbybF74/hqdefault.jpg',
   portfolioVideo4Url: 'https://www.youtube.com/watch?v=FXIDrbybF74',
   portfolioVideo4YoutubeId: 'FXIDrbybF74',
   portfolioVideo4Client: 'Korporatīvs klients',
   portfolioVideo4Year: '2024',

   portfolioVideo5Title: 'DOKUMENTĀLĀ FILMA',
   portfolioVideo5Category: 'Dokumentāls Saturs',
   portfolioVideo5Description:
      'Autentiska dokumentālā filma ar dziļu stāstījumu un profesionālu kinematogrāfiju. Demonstrē spēju strādāt ar sarežģītiem naratīviem.',
   portfolioVideo5Thumbnail:
      'https://img.youtube.com/vi/AHy_pX_4fLU/hqdefault.jpg',
   portfolioVideo5Url: 'https://www.youtube.com/watch?v=AHy_pX_4fLU',
   portfolioVideo5YoutubeId: 'AHy_pX_4fLU',
   portfolioVideo5Client: '',
   portfolioVideo5Year: '2024',

   portfolioVideo6Title: 'MŪZIKAS VIDEO',
   portfolioVideo6Category: 'Mūzikas Video',
   portfolioVideo6Description:
      'Dinamisks mūzikas video ar kreatīvu vizuālo stilu un profesionālu montāžu. Parāda spēju strādāt ar mūzikas industrijā un radīt vizuāli pievilcīgu saturu.',
   portfolioVideo6Thumbnail:
      'https://img.youtube.com/vi/Bp3V-cXNZJI/hqdefault.jpg',
   portfolioVideo6Url: 'https://www.youtube.com/watch?v=Bp3V-cXNZJI',
   portfolioVideo6YoutubeId: 'Bp3V-cXNZJI',
   portfolioVideo6Client: 'Mūzikas mākslinieks',
   portfolioVideo6Year: '2024',

   // WEDDING PAGE VIDEOS
   weddingFeaturedVideoTitle: 'Wedding showreel 2025',
   weddingFeaturedVideoUrl: 'https://www.youtube.com/embed/b60K5KRpeBQ',
   weddingFeaturedVideoThumbnail:
      'https://img.youtube.com/vi/b60K5KRpeBQ/hqdefault.jpg',
   weddingFeaturedVideoDescriptionEn:
      "Our 2025 wedding showreel featuring the most beautiful and emotional moments from weddings we've captured throughout the year.",
   weddingFeaturedVideoDescriptionLv:
      'Mūsu 2025. gada kāzu demonstrācijas video, kurā redzami skaistākie un emocionālākie mirkļi no kāzām, ko esam iemūžinājuši gada laikā.',

   weddingVideo1TitleEn: 'Destination Wedding in Spain - Laura and Lucas',
   weddingVideo1TitleLv: 'Galamērķa Kāzas Spānijā - Laura un Lucas',
   weddingVideo1DescriptionEn:
      'A beautiful destination wedding capturing the romantic moments of Laura and Lucas in the stunning Spanish countryside.',
   weddingVideo1DescriptionLv:
      'Skaistas galamērķa kāzas, iemūžinot Lauras un Lucasa romantiskos mirkļus brīnišķīgajā Spānijas laukos.',
   weddingVideo1Thumbnail:
      'https://img.youtube.com/vi/FvUDpvITh-g/hqdefault.jpg',
   weddingVideo1Url: 'https://www.youtube.com/embed/FvUDpvITh-g',
   weddingVideo1Year: '2024',

   weddingVideo2TitleEn: 'Wedding Highlights',
   weddingVideo2TitleLv: 'Kāzu Spilgtākie Mirkļi',
   weddingVideo2DescriptionEn:
      'A cinematic highlight reel showcasing the most emotional and beautiful moments of this special day.',
   weddingVideo2DescriptionLv:
      'Kinematogāfisks spilgtāko mirkļu apkopojums, kas parāda šīs īpašās dienas emocionālākos un skaistākos mirkļus.',
   weddingVideo2Thumbnail:
      'https://img.youtube.com/vi/AHy_pX_4fLU/hqdefault.jpg',
   weddingVideo2Url: 'https://www.youtube.com/embed/AHy_pX_4fLU',
   weddingVideo2Year: '2024',

   weddingVideo3TitleEn: 'Wedding Film',
   weddingVideo3TitleLv: 'Kāzu Filma',
   weddingVideo3DescriptionEn:
      'A complete wedding film telling the love story from preparation to celebration in artistic detail.',
   weddingVideo3DescriptionLv:
      'Pilna kāzu filma, kas stāsta mīlas stāstu no sagatavošanās līdz svinībām mākslinieciskos detaļos.',
   weddingVideo3Thumbnail:
      'https://img.youtube.com/vi/QPLO05GLtoY/hqdefault.jpg',
   weddingVideo3Url: 'https://www.youtube.com/embed/QPLO05GLtoY',
   weddingVideo3Year: '2024',

   // PAKALPOJUMI PAGE SERVICES (Legacy - kept for compatibility)
   service1Title: 'Kāzu video',
   service1Subtitle: 'Jūsu īpašās dienas mūžīgā atmiņa',
   service1Description:
      'Profesionāla kāzu video uzņemšana un montāža, kas saglabās jūsu svarīgākās dzīves brīžus.',
   service1Price: 'No €800',
   service1Duration: '8-12 stundas',
   service1VideoUrl: 'https://www.youtube.com/embed/b60K5KRpeBQ',
   service1VideoThumbnail:
      'https://img.youtube.com/vi/b60K5KRpeBQ/hqdefault.jpg',
   service1Image: '/images/wedding-couple-church.jpeg',

   service2Title: 'Reklāmas video',
   service2Subtitle: 'Jūsu zīmola stāsts vizuālā formātā',
   service2Description:
      'Radošs un efektīvs reklāmas video saturs, kas palīdzēs jūsu biznesam izcelties tirgū.',
   service2Price: 'No €500',
   service2Duration: '1-3 dienas',
   service2VideoUrl: 'https://www.youtube.com/embed/0pHoVAbAizc',
   service2VideoThumbnail:
      'https://img.youtube.com/vi/0pHoVAbAizc/hqdefault.jpg',
   service2Image: '/images/professional-equipment.jpeg',

   service3Title: 'Pasākumu video',
   service3Subtitle: 'Jūsu pasākuma atmosfēras saglabāšana',
   service3Description:
      'Koncertu, konferenču un citu pasākumu profesionāla video dokumentēšana.',
   service3Price: 'No €400',
   service3Duration: '2-8 stundas',
   service3VideoUrl: 'https://www.youtube.com/embed/0pHoVAbAizc',
   service3VideoThumbnail:
      'https://img.youtube.com/vi/0pHoVAbAizc/hqdefault.jpg',
   service3Image: '/images/studio-purple-lighting.jpeg',

   // ABOUT ME PAGE CLICKABLE IMAGES
   aboutPageClickableImage1: '/images/videographer-tower.jpeg',
   aboutPageClickableImage2: '/images/videographer-studio.jpeg',
   aboutPageClickableImage3: '/images/videographer-studio.jpeg',

   // PAKALPOJUMI PAGE DETAILED SERVICE CONTENT
   serviceWeddingTitle: 'Kāzu Video - Virsraksts',
   serviceWeddingSubtitle: 'Jūsu īpašās dienas mūžīgā atmiņa',
   serviceWeddingDescription:
      'Profesionāla kāzu video uzņemšana un montāža, kas saglabās jūsu svarīgākās dzīves brīžus.',
   serviceWeddingPrice: 'No €800',
   serviceWeddingDuration: '8-12 stundas',
   serviceWeddingImage: '/images/wedding-couple-church.jpeg',
   serviceWeddingVideoUrl: 'https://www.youtube.com/embed/b60K5KRpeBQ',
   serviceWeddingFeatures:
      'Profesionāla kamera, Drone filmēšana, Audio ieraksts, Montāža',
   serviceWeddingHighlights: 'Emocionāli mirkļi, Skaisti kadri, Mūzika, Efekti',
   serviceWeddingButtonOrder: 'Pasūtīt tagad',
   serviceWeddingButtonLearnMore: 'Uzzināt vairāk',
   serviceWeddingTag1: 'Neierobežots laiks',
   serviceWeddingTag2: '2 operatori',
   serviceWeddingTag3: 'Ātra apstrāde',
   serviceWeddingIncluded1: 'Pilna dienas dokumentēšana',
   serviceWeddingIncluded2: 'Profesionāla audio ierakstīšana',
   serviceWeddingIncluded3: 'Dronu uzņēmumi',
   serviceWeddingIncluded4: 'Kinematografisks montāžas stils',
   serviceWeddingIncluded5: '4K kvalitāte',
   serviceWeddingIncluded6: 'Mūzikas licencēšana',

   serviceAdTitle: 'Reklāmas Video - Virsraksts',
   serviceAdSubtitle: 'Jūsu zīmola stāsts vizuālā formātā',
   serviceAdDescription:
      'Radošs un efektīvs reklāmas video saturs, kas palīdzēs jūsu biznesam izcelties tirgū.',
   serviceAdPrice: 'No €500',
   serviceAdDuration: '1-3 dienas',
   serviceAdImage: '/images/professional-equipment.jpeg',
   serviceAdVideoUrl: 'https://www.youtube.com/embed/0pHoVAbAizc',
   serviceAdFeatures: 'Scenārijs, Filmēšana, Montāža, Efekti',
   serviceAdHighlights: 'Zīmola identitāte, Atsaucība, Kvalitāte',
   serviceAdButtonOrder: 'Pasūtīt tagad',
   serviceAdButtonLearnMore: 'Uzzināt vairāk',
   serviceAdTag1: 'Stratēģiska pieeja',
   serviceAdTag2: 'ROI fokuss',
   serviceAdTag3: 'Multi-platform',
   serviceAdIncluded1: 'Koncepcijas izstrāde',
   serviceAdIncluded2: 'Scenārija rakstīšana',
   serviceAdIncluded3: 'Profesionāla apgaismošana',
   serviceAdIncluded4: 'Produktu fotografēšana',
   serviceAdIncluded5: 'Animācijas elementi',
   serviceAdIncluded6: 'Sociālo mediju optimizācija',

   serviceEventTitle: 'Pasākumu Video - Virsraksts',
   serviceEventSubtitle: 'Jūsu pasākuma atmosfēras saglabāšana',
   serviceEventDescription:
      'Koncertu, konferenču un citu pasākumu profesionāla video dokumentēšana.',
   serviceEventPrice: 'No €400',
   serviceEventDuration: '2-8 stundas',
   serviceEventImage: '/images/studio-purple-lighting.jpeg',
   serviceEventVideoUrl: 'https://www.youtube.com/embed/0pHoVAbAizc',
   serviceEventFeatures: 'Multi-kamera, Audio, Montāža, Efekti',
   serviceEventHighlights: 'Atmosfēra, Dinamika, Kvalitāte',
   serviceEventButtonOrder: 'Pasūtīt tagad',
   serviceEventButtonLearnMore: 'Uzzināt vairāk',
   serviceEventTag1: 'Tiešraide',
   serviceEventTag2: 'Ātra piegāde',
   serviceEventTag3: 'Vairākas kameras',
   serviceEventIncluded1: 'Vairāku kameru uzstādījums',
   serviceEventIncluded2: 'Tiešraides iespējas',
   serviceEventIncluded3: 'Profesionāla skaņas ierakstīšana',
   serviceEventIncluded4: 'Ātra apstrāde',
   serviceEventIncluded5: 'Sociālo mediju klippi',
   serviceEventIncluded6: 'Pilna pasākuma dokumentēšana',

   // PORTFOLIO PAGE MAIN IMAGES
   portfolioTitle: 'Mūsu projekti',
   portfolioWeddingImage: '/images/wedding-couple-church.jpeg',
   portfolioPromoImage: '/images/promotional-production.jpeg',

   // PORTFOLIO PAGE VIDEO DESCRIPTIONS
   portfolioVideo1ShortDescription:
      'Profesionāls pasākumu showreel, kas demonstrē OSK VID komandas prasmes dažādu pasākumu filmēšanā. Iekļauj labākos mirkļus no 2024. gada projektiem.',
   portfolioVideo2ShortDescription:
      'Emocionāls kāzu showreel ar skaistākajiem mirkļiem no kāzu filmēšanas. Parāda kinematogrāfisko pieeju un profesionālo kvalitāti kāzu video ražošanā.',
   portfolioVideo3ShortDescription:
      'Inovatīvs un kreatīvs video projekts, kas demonstrē unikālu vizuālo stilu un tehniskās prasmes. Eksperimentāla pieeja video ražošanā.',
   portfolioVideo4ShortDescription:
      'Profesionāla komerciāla video ražošana ar augstu kvalitāti un radošu pieeju. Parāda spēju strādāt ar korporatīviem klientiem un radīt efektīvu saturu.',
   portfolioVideo5ShortDescription:
      'Autentiska dokumentālā filma ar dziļu stāstījumu un profesionālu kinematogrāfiju. Demonstrē spēju strādāt ar sarežģītiem naratīviem.',
   portfolioVideo6ShortDescription:
      'Dinamisks mūzikas video ar kreatīvu vizuālo stilu un profesionālu montāžu. Parāda spēju strādāt ar mūzikas industrijā un radīt vizuāli pievilcīgu saturu.',

   // PORTFOLIO PAGE VIDEO THUMBNAIL DESCRIPTIONS
   portfolioVideo1ThumbnailDescription:
      'Profesionāls pasākumu showreel ar skaistākajiem mirkļiem no 2024. gada projektiem.',
   portfolioVideo2ThumbnailDescription:
      'Emocionāls kāzu showreel ar kinematogrāfisko pieeju.',
   portfolioVideo3ThumbnailDescription:
      'Inovatīvs un kreatīvs video projekts ar eksperimentālu pieeju.',
   portfolioVideo4ThumbnailDescription:
      'Profesionāla komerciāla video ražošana ar augstu kvalitāti.',
   portfolioVideo5ThumbnailDescription:
      'Autentiska dokumentālā filma ar dziļu stāstījumu.',
   portfolioVideo6ThumbnailDescription:
      'Dinamisks mūzikas video ar kreatīvu vizuālo stilu.',

   // PORTFOLIO PAGE VIDEO HIGHLIGHTED TEXTS
   portfolioVideo1HighlightedText: '',
   portfolioVideo2HighlightedText: '',
   portfolioVideo3HighlightedText: '',
   portfolioVideo4HighlightedText: '',
   portfolioVideo5HighlightedText: '',
   portfolioVideo6HighlightedText: '',

   // PORTFOLIO PAGE MAIN CATEGORY TEXTS
   portfolioWeddingsTitle: 'Kāzu Filmas - Virsraksts',
   portfolioPromoTitle: 'Reklāmas Video - Virsraksts',

   // PORTFOLIO WEDDINGS PAGE VIDEO TEXTS
   portfolioWeddingVideo1Title:
      'Destination Wedding in Spain - Laura and Lucas',
   portfolioWeddingVideo1Description:
      'A beautiful destination wedding capturing the romantic moments of Laura and Lucas in the stunning Spanish countryside.',
   portfolioWeddingVideo1Url: 'https://www.youtube.com/watch?v=FvUDpvITh-g',
   portfolioWeddingVideo2Title: 'Wedding Highlights',
   portfolioWeddingVideo2Description:
      'A cinematic highlight reel showcasing the most emotional and beautiful moments of this special day.',
   portfolioWeddingVideo2Url: 'https://www.youtube.com/watch?v=AHy_pX_4fLU',
   portfolioWeddingVideo3Title: 'Wedding Film',
   portfolioWeddingVideo3Description:
      'A complete wedding film telling the love story from preparation to celebration in artistic detail.',
   portfolioWeddingVideo3Url: 'https://www.youtube.com/watch?v=QPLO05GLtoY',

   // PORTFOLIO PROMO PAGE VIDEO TEXTS
   portfolioPromoVideo1Title: 'Reklāmas Video 1 - Virsraksts',
   portfolioPromoVideo1Description: 'Reklāmas Video 1 - Apraksts',
   portfolioPromoVideo1Url: 'https://www.youtube.com/watch?v=0pHoVAbAizc',
   portfolioPromoVideo2Title: 'Reklāmas Video 2 - Virsraksts',
   portfolioPromoVideo2Description: 'Reklāmas Video 2 - Apraksts',
   portfolioPromoVideo2Url: 'https://www.youtube.com/watch?v=b60K5KRpeBQ',
   portfolioPromoVideo3Title: 'Reklāmas Video 3 - Virsraksts',
   portfolioPromoVideo3Description: 'Reklāmas Video 3 - Apraksts',
   portfolioPromoVideo3Url: 'https://www.youtube.com/watch?v=0a7bQ0wcJf8',

   // PORTFOLIO CATEGORY PAGES RIGHT-SIDE TEXTS
   portfolioWeddingsPageRightText: 'Kāzu Filmas - Apraksts',
   portfolioWeddingFeaturedVideoUrl:
      'https://www.youtube.com/watch?v=5gmNlP9KF_A',
   portfolioWeddingFeaturedVideoTitle: 'Wedding showreel 2025',
   portfolioPromoPageRightText: 'Reklāmas Video - Apraksts',
   portfolioPromoFeaturedVideoUrl:
      'https://www.youtube.com/watch?v=0pHoVAbAizc',
   portfolioPromoFeaturedVideoTitle: 'Promotional Showreel 2025',

   servicesHeroSubtitle: 'realitātē',
   servicesSectionTitle: 'Mūsu pakalpojumi',
   servicesSectionDescription: 'Mūsu pakalpojumi ir izplatīti visā pasaulē.',
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

const getEmptyNewsForm = () => ({
   title: '',
   excerpt: '',
   image: '',
   category: '',
   date: new Date().toISOString().split('T')[0],
   readtime: '',
})

// Helper function to extract YouTube ID from URL
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

// Helper function to generate YouTube thumbnail URL
const generateYouTubeThumbnail = (videoUrl: string): string => {
   const youtubeId = extractYouTubeId(videoUrl)
   if (youtubeId && youtubeId !== videoUrl) {
      return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
   }
   return ''
}
    const fieldGroups = [
      {
          id: 'home',
          label: 'Sākumlapa',
          icon: <Home className='h-6 w-6' />,
          color: 'from-blue-500 to-cyan-500',
          subgroups: [
            {
                id: 'home-hero',
                label: 'Hero sadaļa',
                icon: <Palette className='h-5 w-5' />,
                fields: [
                  {
                      image: '/images/hints/home/hht.png',
                      name: 'homeHeroMainTitle',
                  },
                  {
                      image: '/images/hints/home/hhd.png',
                      name: 'homeHeroDescription',
                  },
                  {
                      image: '',
                      name: 'homeHeroBackgroundImage',
                  },
                ],
            },
            {
                id: 'home-services-preview',
                label: 'Pakalpojumu priekšskatījums',
                icon: <Briefcase className='h-5 w-5' />,
                fields: [
                  {
                      image: '/images/hints/home/services/hst.png',
                      name: 'homeServicesTitle',
                  },
                  {
                      image: '/images/hints/home/services/hsd.png',
                      name: 'homeServicesDescription',
                  },
                  {
                      image: '/images/hints/home/services/hsbt.png',
                      name: 'homeServicesButtonText',
                  },
                  {
                      image: '/images/hints/home/services/hswt.png',
                      name: 'homeServiceWeddingTitle',
                  },
                  {
                      image: '/images/hints/home/services/hswi.png',
                      name: 'homeServiceWeddingImage',
                  },
                  {
                      image: '/images/hints/home/services/hsct.png',
                      name: 'homeServicePromoTitle',
                  },
                  {
                      image: '/images/hints/home/services/hsci.png',
                      name: 'homeServicePromoImage',
                  },
                ],
            },
            {
                id: 'home-why-us',
                label: 'Kāpēc izvēlēties mūs',
                icon: <Star className='h-5 w-5' />,
                fields: [
                  {
                      image: '/images/hints/home/whyus/wut.png',
                      name: 'homeWhyChooseUsTitle',
                  },
                  {
                      image: '/images/hints/home/whyus/wud.png',
                      name: 'homeWhyChooseUsDescription',
                  },
                  {
                      image: '/images/hints/home/whyus/hfct.png',
                      name: 'homeFeatureCreativeTitle',
                  },
                  {
                      image: '/images/hints/home/whyus/hfcd.png',
                      name: 'homeFeatureCreativeDescription',
                  },
                  {
                      image: '/images/hints/home/whyus/hfqt.png',
                      name: 'homeFeatureQualityTitle',
                  },
                  {
                      image: '/images/hints/home/whyus/hfqd.png',
                      name: 'homeFeatureQualityDescription',
                  },
                  {
                      image: '/images/hints/home/whyus/hfpt.png',
                      name: 'homeFeaturePersonalizedTitle',
                  },
                  {
                      image: '/images/hints/home/whyus/hfpd.png',
                      name: 'homeFeaturePersonalizedDescription',
                  },
                  {
                      image: '/images/hints/home/whyus/hfet.png',
                      name: 'homeFeatureExperienceTitle',
                  },
                  {
                      image: '/images/hints/home/whyus/hfed.png',
                      name: 'homeFeatureExperienceDescription',
                  },
                  {
                      image: '/images/hints/home/whyus/hftt.png',
                      name: 'homeFeatureTimelyTitle',
                  },
                  {
                      image: '/images/hints/home/whyus/hftd.png',
                      name: 'homeFeatureTimelyDescription',
                  },
                  {
                      image: '/images/hints/home/whyus/hfst.png',
                      name: 'homeFeatureStorytellingTitle',
                  },
                  {
                      image: '/images/hints/home/whyus/hfsd.png',
                      name: 'homeFeatureStorytellingDescription',
                  },
                ],
            },
            {
                id: 'home-process',
                label: 'Darba process',
                icon: <Film className='h-5 w-5' />,
                fields: [
                  {
                      image: '/images/hints/home/process/pt.png',
                      name: 'homeProcessTitle',
                  },
                  {
                      image: '/images/hints/home/process/pd.png',
                      name: 'homeProcessDescription',
                  },
                  {
                      image: '/images/hints/home/process/p1t.png',
                      name: 'homeProcessStep1Title',
                  },
                  {
                      image: '/images/hints/home/process/p1d.png',
                      name: 'homeProcessStep1Description',
                  },
                  {
                      image: '/images/hints/home/process/p2t.png',
                      name: 'homeProcessStep2Title',
                  },
                  {
                      image: '/images/hints/home/process/p2d.png',
                      name: 'homeProcessStep2Description',
                  },
                  {
                      image: '/images/hints/home/process/p3t.png',
                      name: 'homeProcessStep3Title',
                  },
                  {
                      image: '/images/hints/home/process/p3d.png',
                      name: 'homeProcessStep3Description',
                  },
                  {
                      image: '/images/hints/home/process/p4t.png',
                      name: 'homeProcessStep4Title',
                  },
                  {
                      image: '/images/hints/home/process/p4d.png',
                      name: 'homeProcessStep4Description',
                  },
                  {
                      image: '/images/hints/home/process/p5t.png',
                      name: 'homeProcessStep5Title',
                  },
                  {
                      image: '/images/hints/home/process/p5d.png',
                      name: 'homeProcessStep5Description',
                  },
                ],
            },
            {
                id: 'home-cta',
                label: 'Aicinājums uz darbību (CTA)',
                icon: <MessageCircle className='h-5 w-5' />,
                fields: [
                  {
                      image: '/images/hints/home/cta/ctt.png',
                      name: 'homeCtaTitle',
                  },
                  {
                      image: '/images/hints/home/cta/ctd.png',
                      name: 'homeCtaDescription',
                  },
                  {
                      image: '/images/hints/home/cta/ctp.png',
                      name: 'homeCtaBackgroundImage',
                  },
                ],
            },
            {
                id: 'home-stats',
                label: 'Statistika',
                icon: <Users className='h-5 w-5' />,
                fields: [
                  {
                      image: '/images/hints/home/stats/hs1n.png',
                      name: 'homeStat1Number',
                  },
                  {
                      image: '/images/hints/home/stats/hs1l.png',
                      name: 'homeStat1Label',
                  },
                  {
                      image: '/images/hints/home/stats/hs2n.png',
                      name: 'homeStat2Number',
                  },
                  {
                      image: '/images/hints/home/stats/hs2l.png',
                      name: 'homeStat2Label',
                  },
                  {
                      image: '/images/hints/home/stats/hs3n.png',
                      name: 'homeStat3Number',
                  },
                  {
                      image: '/images/hints/home/stats/hs3l.png',
                      name: 'homeStat3Label',
                  },
                ],
            },
          ],
      },
      {
          id: 'services',
          label: 'Pakalpojumi',
          icon: <Briefcase className='h-6 w-6' />,
          color: 'from-emerald-500 to-teal-500',
          subgroups: [
            {
                id: 'services-hero',
                label: 'Hero & Badge',
                fields: [
                  {
                      image: '/images/hints/services/sht.png',
                      name: 'servicesHeroTitle',
                  },
                  {
                      image: '/images/hints/services/shh.png',
                      name: 'servicesHeroTitleHighlight',
                  },
                  {
                      image: '/images/hints/services/shs.png',
                      name: 'servicesHeroSubtitle',
                  },
                  {
                      image: '/images/hints/services/shd.png',
                      name: 'servicesHeroDescription',
                  },
                  {
                      image: '',
                      name: 'servicesHeroBackgroundImage',
                  },
                ],
            },
            {
                id: 'services-main',
                label: 'Galvenā sadaļa',
                fields: [
                  {
                      image: '/images/hints/services/shmt.png',
                      name: 'servicesSectionTitle',
                  },
                  {
                      image: '/images/hints/services/shmd.png',
                      name: 'servicesSectionDescription',
                  },
                ],
            },
            {
                id: 'wedding-detailed',
                label: 'Detalizēts kāzu serviss',
                fields: [
                  {
                      image: '/images/hints/services/wedding/wt.png',
                      name: 'serviceWeddingTitle',
                  },
                  {
                      image: '/images/hints/services/wedding/ws.png',
                      name: 'serviceWeddingSubtitle',
                  },
                  {
                      image: '/images/hints/services/wedding/wd.png',
                      name: 'serviceWeddingDescription',
                  },
                  {
                      image: '/images/hints/services/wedding/wp.png',
                      name: 'serviceWeddingPrice',
                  },
                  {
                      image: '/images/hints/services/wedding/wst.png',
                      name: 'serviceWeddingDuration',
                  },
                  {
                      image: '',
                      name: 'serviceWeddingImage',
                  },
                  {
                      image: '',
                      name: 'serviceWeddingVideoUrl',
                  },
                  {
                      image: '/images/hints/services/wedding/wob.png',
                      name: 'serviceWeddingButtonOrder',
                  },
                  {
                      image: '/images/hints/services/wedding/wlb.png',
                      name: 'serviceWeddingButtonLearnMore',
                  },
                  {
                      image: '/images/hints/services/wedding/wit.png',
                      name: 'serviceWeddingTag1',
                  },
                  {
                      image: '/images/hints/services/wedding/wit.png',
                      name: 'serviceWeddingTag2',
                  },
                  {
                      image: '/images/hints/services/wedding/wit.png',
                      name: 'serviceWeddingTag3',
                  },
                  {
                      image: '/images/hints/services/wedding/wis.png',
                      name: 'serviceWeddingIncluded1',
                  },
                  {
                      image: '/images/hints/services/wedding/wis.png',
                      name: 'serviceWeddingIncluded2',
                  },
                  {
                      image: '/images/hints/services/wedding/wis.png',
                      name: 'serviceWeddingIncluded3',
                  },
                  {
                      image: '/images/hints/services/wedding/wis.png',
                      name: 'serviceWeddingIncluded4',
                  },
                  {
                      image: '/images/hints/services/wedding/wis.png',
                      name: 'serviceWeddingIncluded5',
                  },
                  {
                      image: '/images/hints/services/wedding/wis.png',
                      name: 'serviceWeddingIncluded6',
                  },
                ],
            },
            {
                id: 'services-detailed',
                label: 'Detalizēts reklāmu serviss',
                fields: [
                  {
                      image: '',
                      name: 'serviceAdTitle',
                  },
                  {
                      image: '',
                      name: 'serviceAdSubtitle',
                  },
                  {
                      image: '',
                      name: 'serviceAdDescription',
                  },
                  {
                      image: '',
                      name: 'serviceAdPrice',
                  },
                  {
                      image: '',
                      name: 'serviceAdDuration',
                  },
                  {
                      image: '',
                      name: 'serviceAdImage',
                  },
                  {
                      image: '',
                      name: 'serviceAdVideoUrl',
                  },
                  {
                      image: '',
                      name: 'serviceAdButtonOrder',
                  },
                  {
                      image: '',
                      name: 'serviceAdButtonLearnMore',
                  },
                  {
                      image: '',
                      name: 'serviceAdTag1',
                  },
                  {
                      image: '',
                      name: 'serviceAdTag2',
                  },
                  {
                      image: '',
                      name: 'serviceAdTag3',
                  },
                  {
                      image: '',
                      name: 'serviceAdIncluded1',
                  },
                  {
                      image: '',
                      name: 'serviceAdIncluded2',
                  },
                  {
                      image: '',
                      name: 'serviceAdIncluded3',
                  },
                  {
                      image: '',
                      name: 'serviceAdIncluded4',
                  },
                  {
                      image: '',
                      name: 'serviceAdIncluded5',
                  },
                  {
                      image: '',
                      name: 'serviceAdIncluded6',
                  },
                ],
            },
            {
                id: 'services-detailed',
                label: 'Detalizēts pasākumu serviss',
                fields: [
                  {
                      image: '',
                      name: 'serviceEventTitle',
                  },
                  {
                      image: '',
                      name: 'serviceEventSubtitle',
                  },
                  {
                      image: '',
                      name: 'serviceEventDescription',
                  },
                  {
                      image: '',
                      name: 'serviceEventPrice',
                  },
                  {
                      image: '',
                      name: 'serviceEventDuration',
                  },
                  {
                      image: '',
                      name: 'serviceEventImage',
                  },
                  {
                      image: '',
                      name: 'serviceEventVideoUrl',
                  },
                  {
                      image: '',
                      name: 'serviceEventButtonOrder',
                  },
                  {
                      image: '',
                      name: 'serviceEventButtonLearnMore',
                  },
                  {
                      image: '',
                      name: 'serviceEventTag1',
                  },
                  {
                      image: '',
                      name: 'serviceEventTag2',
                  },
                  {
                      image: '',
                      name: 'serviceEventTag3',
                  },
                  {
                      image: '',
                      name: 'serviceEventIncluded1',
                  },
                  {
                      image: '',
                      name: 'serviceEventIncluded2',
                  },
                  {
                      image: '',
                      name: 'serviceEventIncluded3',
                  },
                  {
                      image: '',
                      name: 'serviceEventIncluded4',
                  },
                  {
                      image: '',
                      name: 'serviceEventIncluded5',
                  },
                  {
                      image: '',
                      name: 'serviceEventIncluded6',
                  },
                ],
            },
          ],
      },
      {
          id: 'portfolio',
          label: 'Portfolio',
          icon: <Video className='h-6 w-6' />,
          color: 'from-orange-500 to-red-500',
          subgroups: [
            {
                id: 'portfolio-main',
                label: 'Galvenā portfolio lapa',
                fields: [
                  {
                      image: '/images/hints/portfolio/main/pmt.png',
                      name: 'portfolioTitle',
                  },
                  {
                      image: '',
                      name: 'portfolioWeddingImage',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoImage',
                  },
                ],
            },
            {
                id: 'portfolio-videos',
                label: 'Portfolio video (6 galvenie)',
                icon: <Film className='h-5 w-5' />,
                fields: [
                  {
                      image: '/images/hints/portfolio/main/pvt.png',
                      name: 'portfolioVideo1Title',
                  },
                  {
                      image: '/images/hints/portfolio/main/pvd.png',
                      name: 'portfolioVideo1Category',
                  },
                  {
                      image: '/images/hints/portfolio/main/pvd.png',
                      name: 'portfolioVideo1ShortDescription',
                  },
                  {
                      image: '/images/hints/portfolio/main/pvd.png',
                      name: 'portfolioVideo1Url',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo2Title',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo2Category',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo2ShortDescription',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo2Url',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo3Title',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo3Category',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo3ShortDescription',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo3Url',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo4Title',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo4Category',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo4ShortDescription',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo4Url',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo5Title',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo5Category',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo5ShortDescription',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo5Url',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo6Title',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo6Category',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo6ShortDescription',
                  },
                  {
                      image: '',
                      name: 'portfolioVideo6Url',
                  },
                ],
            },
            {
                id: 'portfolio-categories',
                label: 'Apakšlapas galvenie video (Kāzu / Reklāmas)',
                fields: [
                  {
                      image: '',
                      name: 'portfolioWeddingsTitle',
                  },
                  {
                      image: '',
                      name: 'portfolioWeddingsPageRightText',
                  },
                  {
                      image: '',
                      name: 'portfolioWeddingFeaturedVideoUrl',
                  },
                  {
                      image: '',
                      name: 'portfolioWeddingFeaturedVideoTitle',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoTitle',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoPageRightText',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoFeaturedVideoUrl',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoFeaturedVideoTitle',
                  },
                ],
            },
            {
                id: 'wedding-videos',
                label: 'Kāzu video',
                fields: [
                  {
                      image: '',
                      name: 'portfolioWeddingVideo1Title',
                  },
                  {
                      image: '',
                      name: 'portfolioWeddingVideo1Description',
                  },
                  {
                      image: '',
                      name: 'portfolioWeddingVideo1Url',
                  },
                  {
                      image: '',
                      name: 'portfolioWeddingVideo2Title',
                  },
                  {
                      image: '',
                      name: 'portfolioWeddingVideo2Description',
                  },
                  {
                      image: '',
                      name: 'portfolioWeddingVideo2Url',
                  },
                  {
                      image: '',
                      name: 'portfolioWeddingVideo3Title',
                  },
                  {
                      image: '',
                      name: 'portfolioWeddingVideo3Description',
                  },
                  {
                      image: '',
                      name: 'portfolioWeddingVideo3Url',
                  },
                ],
            },
            {
                id: 'advertisement-videos',
                label: 'Reklāmu video',
                fields: [
                  {
                      image: '',
                      name: 'portfolioPromoVideo1Title',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoVideo1Description',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoVideo1Url',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoVideo2Title',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoVideo2Description',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoVideo2Url',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoVideo3Title',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoVideo3Description',
                  },
                  {
                      image: '',
                      name: 'portfolioPromoVideo3Url',
                  },
                ],
            },
          ],
      },
      {
          id: 'about-contact',
          label: 'Par mums & Kontakti',
          icon: <Users className='h-6 w-6' />,
          color: 'from-indigo-500 to-purple-500',
          subgroups: [
            {
                id: 'about',
                label: 'Par mums lapa',
                fields: [
                  {
                      image: '/images/hints/aboutus/aut.png',
                      name: 'aboutPageTitle',
                  },
                  {
                      image: '/images/hints/aboutus/aub.png',
                      name: 'aboutPageBio',
                  },
                  {
                      image: '/images/hints/aboutus/aui.png',
                      name: 'aboutPageHeroImage',
                  },
                  {
                      image: '/images/hints/aboutus/auci1.png',
                      name: 'aboutPageClickableImage1',
                  },
                  {
                      image: '/images/hints/aboutus/auci2.png',
                      name: 'aboutPageClickableImage2',
                  },
                  {
                      image: '/images/hints/aboutus/auci3.png',
                      name: 'aboutPageClickableImage3',
                  },
                ],
            },
            {
                id: 'contact',
                label: 'Kontakti lapa',
                fields: [
                  {
                      image: '',
                      name: 'contactPageTitle',
                  },
                  {
                      image: '',
                      name: 'contactPageFormTitle',
                  },
                ],
            },
          ],
      },
      {
          id: 'testimonials',
          label: 'Atsauksmes',
          icon: <Quote className='h-6 w-6' />,
          color: 'from-pink-500 to-rose-500',
          subgroups: [
            {
                id: 'reviews-hero',
                label: 'Lapas virsraksts un CTA',
                fields: [
                  {
                      image: '',
                      name: 'reviewsPageHeroTitle',
                  },
                  {
                      image: '',
                      name: 'reviewsPageHeroSubtitle',
                  },
                  {
                      image: '/images/wedding-couple-church.jpeg',
                      name: 'reviewsPageHeroImage',
                  },
                  {
                      image: '',
                      name: 'reviewsPageCtaText',
                  },
                  {
                      image: '',
                      name: 'reviewsPageCtaUrl',
                  },
                ],
            },
            {
                id: 'featured',
                label: 'Izceltās atsauksmes (novecojis, neizmantot)',
                fields: [
                  {
                      image: '',
                      name: 'featuredTestimonial1Name',
                  },
                  {
                      image: '',
                      name: 'featuredTestimonial1Content',
                  },
                  {
                      image: '',
                      name: 'featuredTestimonial1Description',
                  },
                  {
                      image: '',
                      name: 'featuredTestimonial1Image',
                  },
                  {
                      image: '',
                      name: 'featuredTestimonial2Name',
                  },
                  {
                      image: '',
                      name: 'featuredTestimonial2Content',
                  },
                  {
                      image: '',
                      name: 'featuredTestimonial2Description',
                  },
                  {
                      image: '',
                      name: 'featuredTestimonial2Image',
                  },
                  {
                      image: '',
                      name: 'featuredTestimonial3Name',
                  },
                  {
                      image: '',
                      name: 'featuredTestimonial3Content',
                  },
                  {
                      image: '',
                      name: 'featuredTestimonial3Description',
                  },
                  {
                      image: '',
                      name: 'featuredTestimonial3Image',
                  },
                ],
            },
            {
                id: 'all-testimonials',
                label: 'Visas atsauksmes (8)',
                fields: [
                  {
                      image: '',
                      name: 'testimonial1Name',
                  },
                  {
                      image: '',
                      name: 'testimonial1Role',
                  },
                  {
                      image: '',
                      name: 'testimonial1ContentLv',
                  },
                  {
                      image: '',
                      name: 'testimonial1Source',
                  },
                  {
                      image: '',
                      name: 'testimonial1Image',
                  },
                  {
                      image: '',
                      name: 'testimonial2Name',
                  },
                  {
                      image: '',
                      name: 'testimonial2Role',
                  },
                  {
                      image: '',
                      name: 'testimonial2ContentLv',
                  },
                  {
                      image: '',
                      name: 'testimonial2Source',
                  },
                  {
                      image: '',
                      name: 'testimonial2Image',
                  },
                  {
                      image: '',
                      name: 'testimonial3Name',
                  },
                  {
                      image: '',
                      name: 'testimonial3Role',
                  },
                  {
                      image: '',
                      name: 'testimonial3ContentLv',
                  },
                  {
                      image: '',
                      name: 'testimonial3Source',
                  },
                  {
                      image: '',
                      name: 'testimonial3Image',
                  },
                  {
                      image: '',
                      name: 'testimonial4Name',
                  },
                  {
                      image: '',
                      name: 'testimonial4Role',
                  },
                  {
                      image: '',
                      name: 'testimonial4ContentLv',
                  },
                  {
                      image: '',
                      name: 'testimonial4Source',
                  },
                  {
                      image: '',
                      name: 'testimonial4Image',
                  },
                  {
                      image: '',
                      name: 'testimonial5Name',
                  },
                  {
                      image: '',
                      name: 'testimonial5Role',
                  },
                  {
                      image: '',
                      name: 'testimonial5ContentLv',
                  },
                  {
                      image: '',
                      name: 'testimonial5Source',
                  },
                  {
                      image: '',
                      name: 'testimonial5Image',
                  },
                  {
                      image: '',
                      name: 'testimonial6Name',
                  },
                  {
                      image: '',
                      name: 'testimonial6Role',
                  },
                  {
                      image: '',
                      name: 'testimonial6ContentLv',
                  },
                  {
                      image: '',
                      name: 'testimonial6Source',
                  },
                  {
                      image: '',
                      name: 'testimonial6Image',
                  },
                  {
                      image: '',
                      name: 'testimonial7Name',
                  },
                  {
                      image: '',
                      name: 'testimonial7Role',
                  },
                  {
                      image: '',
                      name: 'testimonial7ContentLv',
                  },
                  {
                      image: '',
                      name: 'testimonial7Source',
                  },
                  {
                      image: '',
                      name: 'testimonial7Image',
                  },
                  {
                      image: '',
                      name: 'testimonial8Name',
                  },
                  {
                      image: '',
                      name: 'testimonial8Role',
                  },
                  {
                      image: '',
                      name: 'testimonial8ContentLv',
                  },
                  {
                      image: '',
                      name: 'testimonial8Source',
                  },
                  {
                      image: '',
                      name: 'testimonial8Image',
                  },
                ],
            },
          ],
      },
      {
          id: 'news',
          label: 'Jaunumi & partneri',
          icon: <Newspaper className='h-6 w-6' />,
          color: 'from-amber-500 to-orange-500',
          isSpecial: true, // Will show news manager
      },
      {
          id: 'partners',
          label: 'Mūsu partneri',
          icon: <User className='h-6 w-6' />,
          color: 'from-blue-500 to-indigo-500',
          isSpecial: false,
          subgroups:[
            {
                id: 'featured',
                label: 'Partneru bildes',
                fields: [
                  {
                      image: '',
                      name: 'partner1Name',
                  },
                  {
                      image: '',
                      name: 'partner1Logo',
                  },
                  {
                      image: '',
                      name: 'partner2Name',
                  },
                  {
                      image: '',
                      name: 'partner2Logo',
                  },
                  {
                      image: '',
                      name: 'partner3Name',
                  },
                  {
                      image: '',
                      name: 'partner3Logo',
                  },
                  {
                      image: '',
                      name: 'partner4Name',
                  },
                  {
                      image: '',
                      name: 'partner4Logo',
                  },
                  {
                      image: '',
                      name: 'partner5Name',
                  },
                  {
                      image: '',
                      name: 'partner5Logo',
                  },
                  {
                      image: '',
                      name: 'partner6Name',
                  },
                  {
                      image: '',
                      name: 'partner6Logo',
                  },
                  {
                      image: '',
                      name: 'partner7Name',
                  },
                  {
                      image: '',
                      name: 'partner7Logo',
                  },
                  {
                      image: '',
                      name: 'partner8Name',
                  },
                  {
                      image: '',
                      name: 'partner8Logo',
                  },
                ]
            },
          ]
      },
]

export default function SimpleCMS() {
   const [user, setUser] = useState<string | null>(null)
   const [content, setContent] = useState<ContentData>(defaultContent)
   const [hasChanges, setHasChanges] = useState(false)
   const [isSaving, setIsSaving] = useState(false)
   const [searchTerm, setSearchTerm] = useState('')
   const router = useRouter()
   const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
      {},
   )
   const [activeOverlay, setActiveOverlay] = useState('')
   const [overlayData, setOverlayData] = useState<{ url?: string }>({})
   const [uploading, setUploading] = useState<Record<string, boolean>>({})
   // Upload status: 'uploading' | 'compressing' | 'complete' | 'error'
   const [uploadStatus, setUploadStatus] = useState<
      Record<string, 'uploading' | 'compressing' | 'complete' | 'error'>
   >({})
   // Compression results: { originalSize, compressedSize, compressionRatio }
   const [compressionResults, setCompressionResults] = useState<
      Record<
         string,
         {
            originalSize?: number
            compressedSize?: number
            compressionRatio?: string
            isVideo?: boolean
         }
      >
   >({})
   const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
   const [isLoadingNews, setIsLoadingNews] = useState(false)
   const [isNewsFormOpen, setIsNewsFormOpen] = useState(false)
   const [editingNewsId, setEditingNewsId] = useState<string | null>(null)
   const [newsFormData, setNewsFormData] = useState(getEmptyNewsForm())
   const [newsImagePreview, setNewsImagePreview] = useState<string>('')
   const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
      new Set(['header', 'home']),
   )
   const [expandedSubgroups, setExpandedSubgroups] = useState<Set<string>>(
      new Set(),
   )
   const toggleGroup = (id: string) => {
      setExpandedGroups((prev) => {
         const next = new Set(prev)
         if (next.has(id)) next.delete(id)
         else next.add(id)
         return next
      })
   }

   const toggleSubgroup = (id: string) => {
      setExpandedSubgroups((prev) => {
         const next = new Set(prev)
         if (next.has(id)) next.delete(id)
         else next.add(id)
         return next
      })
   }

   useEffect(() => {
      const storedUser = localStorage.getItem('cms_user')
      if (!storedUser) {
         router.push('/admin/login')
         return
      }
      setUser(storedUser)
      loadContent()
      loadNewsArticles()
   }, [router])

   const loadContent = async () => {
      try {
         // Try to load from API first
         const response = await fetch(
            '/api/content?page=simple-cms&language=lv',
         )
         if (response.ok) {
            const data = await response.json()
            const apiContent = data.content || {}

            // Merge with defaults for any missing fields
            const loadedContent = { ...defaultContent }
            Object.keys(defaultContent).forEach((key) => {
               if (apiContent[key] !== undefined) {
                  loadedContent[key as keyof ContentData] = apiContent[key]
               }
            })

            setContent(loadedContent)
         } else {
            // Fallback to localStorage
            loadFromLocalStorage()
         }
      } catch (error) {
         console.error('Failed to load content from API:', error)
         // Fallback to localStorage
         loadFromLocalStorage()
      }
   }

   const loadFromLocalStorage = () => {
      const keys = Object.keys(defaultContent) as (keyof ContentData)[]
      const loadedContent = { ...defaultContent }

      keys.forEach((key) => {
         const saved = localStorage.getItem(`content_${key}`)
         if (saved) {
            loadedContent[key] = saved as any
         }
      })

      setContent(loadedContent)
   }

   const loadNewsArticles = async () => {
      setIsLoadingNews(true)
      try {
         const response = await fetch('/api/news')
         if (response.ok) {
            const data = await response.json()
            const sortedArticles: NewsArticle[] = (data.articles || []).sort(
               (a: NewsArticle, b: NewsArticle) => {
                  const dateA = a.date || a.createdAt || ''
                  const dateB = b.date || b.createdAt || ''
                  return dateB.localeCompare(dateA)
               },
            )
            setNewsArticles(sortedArticles)
         } else {
            throw new Error('Failed to load news')
         }
      } catch (error) {
         console.error('Failed to load news articles:', error)
         toast({
            title: 'Kļūda',
            description: 'Neizdevās ielādēt jaunumu sarakstu',
            variant: 'destructive',
         })
      } finally {
         setIsLoadingNews(false)
      }
   }

   const handleNewsImageChange = (file: File) => {
      const reader = new FileReader()
      reader.onloadend = () => {
         const base64String = reader.result as string
         setNewsImagePreview(base64String)
         setNewsFormData((prev) => ({ ...prev, image: base64String }))
      }
      reader.readAsDataURL(file)
   }

   const startCreateNews = () => {
      setIsNewsFormOpen(true)
      setEditingNewsId(null)
      setNewsFormData(getEmptyNewsForm())
      setNewsImagePreview('')
   }

   const startEditNews = (article: NewsArticle) => {
      setIsNewsFormOpen(true)
      setEditingNewsId(article.id)
      setNewsFormData({
         title: article.title,
         excerpt: article.excerpt,
         image: article.image,
         category: article.category || '',
         date: article.date || new Date().toISOString().split('T')[0],
         readtime: article.readtime || '',
      })
      setNewsImagePreview(article.image)
   }

   const resetNewsForm = () => {
      setIsNewsFormOpen(false)
      setEditingNewsId(null)
      setNewsFormData(getEmptyNewsForm())
      setNewsImagePreview('')
   }

   const handleNewsSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (!newsFormData.title || !newsFormData.excerpt) {
         toast({
            title: 'Kļūda',
            description: 'Virsraksts un apraksts ir obligāti lauki',
            variant: 'destructive',
         })
         return
      }

      try {
         const payload = {
            ...newsFormData,
            date: newsFormData.date || new Date().toISOString().split('T')[0],
         }

         const response = await fetch('/api/news', {
            method: editingNewsId ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
               editingNewsId
                  ? {
                       id: editingNewsId,
                       ...payload,
                    }
                  : payload,
            ),
         })

         if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Neizdevās saglabāt jaunumu')
         }

         toast({
            title: 'Veiksmīgi',
            description: editingNewsId
               ? 'Jaunums atjaunināts'
               : 'Jaunums izveidots',
         })

         await loadNewsArticles()
         resetNewsForm()
      } catch (error) {
         console.error('Failed to save news article:', error)
         toast({
            title: 'Kļūda',
            description: 'Neizdevās saglabāt jaunumu',
            variant: 'destructive',
         })
      }
   }

   const handleNewsDelete = async (id: string) => {
      if (!confirm('Vai tiešām vēlaties dzēst šo jaunumu?')) {
         return
      }

      try {
         const response = await fetch(`/api/news?id=${id}`, {
            method: 'DELETE',
         })

         if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Neizdevās dzēst jaunumu')
         }

         toast({
            title: 'Veiksmīgi',
            description: 'Jaunums izdzēsts',
         })

         await loadNewsArticles()
      } catch (error) {
         console.error('Failed to delete news article:', error)
         toast({
            title: 'Kļūda',
            description: 'Neizdevās dzēst jaunumu',
            variant: 'destructive',
         })
      }
   }

   const handleContentChange = (key: keyof ContentData, value: string) => {
      setContent((prev) => {
         const newContent = { ...prev, [key]: value }

         // Auto-generate thumbnail for video URL fields
         if (key.includes('VideoUrl') || key.includes('videoUrl')) {
            const thumbnailKey = key
               .replace('VideoUrl', 'VideoThumbnail')
               .replace('videoUrl', 'videoThumbnail') as keyof ContentData
            const autoThumbnail = generateYouTubeThumbnail(value)
            if (autoThumbnail && thumbnailKey in newContent) {
               newContent[thumbnailKey] = autoThumbnail as any
            }
         }

         return newContent
      })
      setHasChanges(true)
   }

   const handleImageUpload = async (
      key: keyof ContentData,
      file: File | null,
   ) => {
      if (!file) {
         return
      }

      // Check if this is homeHeroBackgroundImage - allow video uploads for it
      const isHeroBackground = key === 'homeHeroBackgroundImage'
      const isVideo = file.type.startsWith('video/')

      // Validate file type
      const allowedImageTypes = [
         'image/jpeg',
         'image/jpg',
         'image/png',
         'image/gif',
         'image/webp',
      ]
      const allowedVideoTypes = [
         'video/mp4',
         'video/webm',
         'video/mov',
         'video/quicktime',
         'video/x-msvideo',
      ]

      const allowedTypes = isHeroBackground
         ? [...allowedImageTypes, ...allowedVideoTypes]
         : allowedImageTypes

      if (!allowedTypes.includes(file.type)) {
         toast({
            title: 'Kļūda',
            description: isHeroBackground
               ? 'Atbalstīti tikai JPG, JPEG, PNG, GIF, WebP, MP4, WebM, MOV un AVI formāti'
               : 'Atbalstīti tikai JPG, JPEG, PNG, GIF un WebP formāti',
            variant: 'destructive',
         })
         return
      }

      // Validate file size
      const maxSize = isVideo ? 100 * 1024 * 1024 : 20 * 1024 * 1024 // 100MB for video, 20MB for images
      if (file.size > maxSize) {
         toast({
            title: 'Kļūda',
            description: isVideo
               ? `Fails ir pārāk liels (maksimums 100MB)`
               : 'Fails ir pārāk liels (maksimums 20MB)',
            variant: 'destructive',
         })
         return
      }

      // Set uploading state
      setUploading((prev) => ({ ...prev, [key]: true }))
      setUploadProgress((prev) => ({ ...prev, [key]: 0 }))
      setUploadStatus((prev) => ({ ...prev, [key]: 'uploading' }))
      // Clear previous compression results
      setCompressionResults((prev) => {
         const newResults = { ...prev }
         delete newResults[key]
         return newResults
      })

      // Show preview immediately for images only
      if (!isVideo) {
         const reader = new FileReader()
         reader.onload = (e) => {
            const imageUrl = e.target?.result as string
            handleContentChange(key, imageUrl)
         }
         reader.readAsDataURL(file)
      }

      // Upload using XMLHttpRequest for progress tracking
      return new Promise<void>((resolve, reject) => {
         const xhr = new XMLHttpRequest()
         const formData = new FormData()
         formData.append('file', file)
         formData.append('key', key as string)
         formData.append('page', 'simple-cms')
         formData.append('language', 'lv')

         xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
               const percentComplete = Math.round((e.loaded / e.total) * 100)
               setUploadProgress((prev) => ({
                  ...prev,
                  [key]: percentComplete,
               }))
               // When upload is complete, switch to compressing status
               if (percentComplete === 100) {
                  setUploadStatus((prev) => ({ ...prev, [key]: 'compressing' }))
               }
            }
         })

         xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
               try {
                  const response = JSON.parse(xhr.responseText)
                  const urlKey = isVideo ? 'videoUrl' : 'imageUrl'
                  if (response.success && response[urlKey]) {
                     // Set the URL immediately (original for videos, may be compressed for images)
                     const initialUrl = response[urlKey]
                     handleContentChange(key, response.compressedUrl || initialUrl)
                     setUploadProgress((prev) => ({ ...prev, [key]: 100 }))

                     // For videos with background compression, poll for status
                     if (isVideo && response.compressionJobId) {
                        setUploadStatus((prev) => ({
                           ...prev,
                           [key]: 'compressing',
                        }))

                        // Store initial compression info
                        setCompressionResults((prev) => ({
                           ...prev,
                           [key]: {
                              originalSize: response.originalSize,
                              isVideo: true,
                           },
                        }))

                        toast({
                           title: 'Video augšupielādēts',
                           description:
                              'Saspiešana notiek fonā. Lūdzu, uzgaidiet...',
                        })

                        // Poll for compression status
                        const pollInterval = setInterval(async () => {
                           try {
                              const statusResponse = await fetch(
                                 `/api/compression-status?jobId=${response.compressionJobId}`,
                              )
                              const statusData = await statusResponse.json()

                              if (statusData.status === 'complete') {
                                 clearInterval(pollInterval)

                                 // Update to compressed URL
                                 if (statusData.compressedUrl) {
                                    handleContentChange(
                                       key,
                                       statusData.compressedUrl,
                                    )
                                 }

                                 setUploadStatus((prev) => ({
                                    ...prev,
                                    [key]: 'complete',
                                 }))
                                 setCompressionResults((prev) => ({
                                    ...prev,
                                    [key]: {
                                       originalSize: statusData.originalSize,
                                       compressedSize: statusData.compressedSize,
                                       compressionRatio:
                                          statusData.compressionRatio,
                                       isVideo: true,
                                    },
                                 }))

                                 toast({
                                    title: 'Veiksmīgi',
                                    description: `Video saspiests (samazināts par ${statusData.compressionRatio})`,
                                 })

                                 // Clear status after 5 seconds
                                 setTimeout(() => {
                                    setUploadProgress((prev) => {
                                       const newProgress = { ...prev }
                                       delete newProgress[key]
                                       return newProgress
                                    })
                                    setUploadStatus((prev) => {
                                       const newStatus = { ...prev }
                                       delete newStatus[key]
                                       return newStatus
                                    })
                                 }, 5000)

                                 // Clear compression results after 10 seconds
                                 setTimeout(() => {
                                    setCompressionResults((prev) => {
                                       const newResults = { ...prev }
                                       delete newResults[key]
                                       return newResults
                                    })
                                 }, 10000)
                              } else if (statusData.status === 'failed') {
                                 clearInterval(pollInterval)
                                 setUploadStatus((prev) => ({
                                    ...prev,
                                    [key]: 'complete',
                                 }))
                                 toast({
                                    title: 'Brīdinājums',
                                    description:
                                       'Video saspiešana neizdevās. Tiek izmantots oriģināls.',
                                    variant: 'destructive',
                                 })
                                 // Clear status after 5 seconds
                                 setTimeout(() => {
                                    setUploadStatus((prev) => {
                                       const newStatus = { ...prev }
                                       delete newStatus[key]
                                       return newStatus
                                    })
                                 }, 5000)
                              }
                           } catch (pollError) {
                              console.error(
                                 'Error polling compression status:',
                                 pollError,
                              )
                           }
                        }, 3000) // Poll every 3 seconds

                        // Stop polling after 10 minutes (safety timeout)
                        setTimeout(
                           () => {
                              clearInterval(pollInterval)
                              setUploadStatus((prev) => {
                                 if (prev[key] === 'compressing') {
                                    toast({
                                       title: 'Brīdinājums',
                                       description:
                                          'Video saspiešana aizņem pārāk ilgu laiku. Tiek izmantots oriģināls.',
                                       variant: 'destructive',
                                    })
                                    return { ...prev, [key]: 'complete' }
                                 }
                                 return prev
                              })
                           },
                           10 * 60 * 1000,
                        )

                        resolve()
                     } else {
                        // For images or videos with immediate compression
                        setUploadStatus((prev) => ({
                           ...prev,
                           [key]: 'complete',
                        }))

                        // Store compression results
                        if (response.originalSize) {
                           setCompressionResults((prev) => ({
                              ...prev,
                              [key]: {
                                 originalSize: response.originalSize,
                                 compressedSize: response.compressedSize,
                                 compressionRatio: response.compressionRatio,
                                 isVideo: isVideo,
                              },
                           }))
                        }

                        // Clear progress and status after 5 seconds
                        setTimeout(() => {
                           setUploadProgress((prev) => {
                              const newProgress = { ...prev }
                              delete newProgress[key]
                              return newProgress
                           })
                           setUploadStatus((prev) => {
                              const newStatus = { ...prev }
                              delete newStatus[key]
                              return newStatus
                           })
                        }, 5000)

                        // Clear compression results after 10 seconds
                        setTimeout(() => {
                           setCompressionResults((prev) => {
                              const newResults = { ...prev }
                              delete newResults[key]
                              return newResults
                           })
                        }, 10000)

                        const compressionInfo = response.compressionRatio
                           ? ` (samazināts par ${response.compressionRatio})`
                           : ''
                        toast({
                           title: 'Veiksmīgi',
                           description: isVideo
                              ? `Video augšupielādēts${compressionInfo}`
                              : `Attēls augšupielādēts${compressionInfo}`,
                        })
                        resolve()
                     }
                  } else {
                     const errorMsg =
                        response.message || response.error || 'Upload failed'
                     throw new Error(errorMsg)
                  }
               } catch (error) {
                  setUploadStatus((prev) => ({ ...prev, [key]: 'error' }))
                  reject(error)
               }
            } else {
               try {
                  const response = JSON.parse(xhr.responseText)
                  const errorMsg =
                     response.message ||
                     response.error ||
                     `Upload failed with status ${xhr.status}`
                  setUploadStatus((prev) => ({ ...prev, [key]: 'error' }))
                  reject(new Error(errorMsg))
               } catch {
                  setUploadStatus((prev) => ({ ...prev, [key]: 'error' }))
                  reject(
                     new Error(
                        `Upload failed with status ${xhr.status}: ${xhr.statusText}`,
                     ),
                  )
               }
            }
            setUploading((prev) => {
               const newUploading = { ...prev }
               delete newUploading[key]
               return newUploading
            })
         })

         xhr.addEventListener('error', () => {
            setUploading((prev) => {
               const newUploading = { ...prev }
               delete newUploading[key]
               return newUploading
            })
            setUploadProgress((prev) => {
               const newProgress = { ...prev }
               delete newProgress[key]
               return newProgress
            })
            setUploadStatus((prev) => ({ ...prev, [key]: 'error' }))
            // Clear error status after 5 seconds
            setTimeout(() => {
               setUploadStatus((prev) => {
                  const newStatus = { ...prev }
                  delete newStatus[key]
                  return newStatus
               })
            }, 5000)
            toast({
               title: 'Kļūda',
               description: isVideo
                  ? 'Neizdevās augšupielādēt video. Pārbaudiet savienojumu ar serveri.'
                  : 'Neizdevās augšupielādēt attēlu. Pārbaudiet savienojumu ar serveri.',
               variant: 'destructive',
            })
            reject(new Error('Upload failed'))
         })

         // Use video upload endpoint for videos, image upload for images
         const uploadEndpoint = isVideo
            ? '/api/videos/upload'
            : '/api/images/upload'
         xhr.open('POST', uploadEndpoint)
         xhr.send(formData)
      })
   }

   const saveContent = async () => {
      setIsSaving(true)

      try {
         // Process content for video URLs
         const processedContent = { ...content }
         Object.entries(content).forEach(([key, value]) => {
            // If this is a video URL field, also save the extracted YouTube ID
            if (key.includes('VideoUrl') || key.includes('videoUrl')) {
               const youtubeId = extractYouTubeId(value)
               if (youtubeId && youtubeId !== value) {
                  // Save the YouTube ID separately
                  const idKey = key
                     .replace('Url', 'YoutubeId')
                     .replace('videoUrl', 'videoYoutubeId')
                  processedContent[idKey as keyof ContentData] =
                     youtubeId as any

                  // Convert URL to embed format
                  processedContent[key as keyof ContentData] =
                     `https://www.youtube.com/embed/${youtubeId}` as any
               }
            }
         })

         // Save to API first
         const response = await fetch('/api/content', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               page: 'simple-cms',
               language: 'lv',
               content: processedContent,
            }),
         })

         if (response.status === 423) {
            // Production/read-only environment
            const errorData = await response.json()

            // Still save to localStorage
            Object.entries(processedContent).forEach(([key, value]) => {
               let processedValue = value
               if (key.includes('VideoUrl') || key.includes('videoUrl')) {
                  const youtubeId = extractYouTubeId(value)
                  if (youtubeId && youtubeId !== value) {
                     const idKey = key
                        .replace('Url', 'YoutubeId')
                        .replace('videoUrl', 'videoYoutubeId')
                     localStorage.setItem(`content_${idKey}`, youtubeId)
                     processedValue = `https://www.youtube.com/embed/${youtubeId}`
                  }
               }
               localStorage.setItem(`content_${key}`, processedValue)

               // Dispatch events for real-time updates
               window.dispatchEvent(
                  new CustomEvent(
                     key.includes('Image') ||
                        key.includes('Logo') ||
                        key.includes('Thumbnail')
                        ? 'imageUpdated'
                        : 'contentUpdated',
                     {
                        detail: { key, value: processedValue },
                     },
                  ),
               )
            })

            setHasChanges(false)
            toast({
               title: '⚠️ Ražošanas vide',
               description:
                  errorData.message ||
                  'Izmaiņas saglabātas lokāli. Lai saglabātu pastāvīgi, nepieciešama datubāzes konfigurācija.',
               variant: 'destructive',
            })
            return
         }

         if (!response.ok) {
            throw new Error('Failed to save to API')
         }

         // Also save to localStorage as backup
         Object.entries(processedContent).forEach(([key, value]) => {
            localStorage.setItem(`content_${key}`, value)

            // Dispatch events for real-time updates
            console.log(`📤 Dispatching contentUpdated event for key: ${key}`)
            window.dispatchEvent(
               new CustomEvent(
                  key.includes('Image') ||
                     key.includes('Logo') ||
                     key.includes('Thumbnail')
                     ? 'imageUpdated'
                     : 'contentUpdated',
                  {
                     detail: { key, value },
                  },
               ),
            )
         })

         setHasChanges(false)
         toast({
            title: '✅ Saturs saglabāts!',
            description:
               'Viss saturs ir veiksmīgi saglabāts serverī un video thumbnails ģenerēti automātiski.',
         })
      } catch (error) {
         console.error('Save error:', error)

         // Fallback - save to localStorage only
         Object.entries(content).forEach(([key, value]) => {
            let processedValue = value
            if (key.includes('VideoUrl') || key.includes('videoUrl')) {
               const youtubeId = extractYouTubeId(value)
               if (youtubeId && youtubeId !== value) {
                  const idKey = key
                     .replace('Url', 'YoutubeId')
                     .replace('videoUrl', 'videoYoutubeId')
                  localStorage.setItem(`content_${idKey}`, youtubeId)
                  processedValue = `https://www.youtube.com/embed/${youtubeId}`
               }
            }
            localStorage.setItem(`content_${key}`, processedValue)
         })

         toast({
            title: '⚠️ Daļēji saglabāts',
            description:
               'Saturs saglabāts lokāli. Servera saglabāšana neizdevās - izmaiņas var nesakrāties kad hostosiet.',
            variant: 'destructive',
         })
      } finally {
         setIsSaving(false)
      }
   }

   if (!user) {
      return null
   }

   return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
         {/* === HEADER === */}

         {activeOverlay != '' ? (
            <div
               onClick={() => {
                  setActiveOverlay('')
                  setOverlayData({})
               }}
               className='w-full h-full flex flex-col fixed justify-center right-0 items-center bg-gray-200/80 backdrop-blur-md z-40'
            >
               <img src={overlayData.url} />
            </div>
         ) : null}

         <div className='bg-white/80 backdrop-blur-md border-b border-slate-200/60 h-24 sticky top-0 z-50 shadow-sm'></div>

         {/* === SEARCH === */}
         <div className='max-w-7xl mx-auto px-6 pt-8'>
            <div className='relative max-w-xl'>
               <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5.5 w-5.5 text-slate-400' />
               <Input
                  placeholder='Meklēt sadaļu vai lauku...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-12 py-6 text-lg rounded-2xl bg-white/80 backdrop-blur-sm border-slate-200/60'
               />
            </div>
         </div>

         {/* === CONTENT GROUPS === */}
         <div className='max-w-7xl mx-auto px-6 py-10 pb-32 space-y-10'>
            {fieldGroups
               .filter(
                  (g) =>
                     g.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     g.subgroups?.some(
                        (s) =>
                           s.label
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                           s.fields.some((f) =>
                              f.name
                                 .toLowerCase()
                                 .includes(searchTerm.toLowerCase()),
                           ),
                     ),
               )
               .map((group) => (
                  <div key={group.id} className='p-2'>
                     {/* Group Header */}
                     <button
                        onClick={() => toggleGroup(group.id)}
                        className='w-full flex items-center justify-between p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/60 hover:bg-white/95 transition-all group'
                     >
                        <div className='flex items-center gap-6'>
                           <div
                              className={`w-16 h-16 bg-gradient-to-br ${group.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                           >
                              {group.icon}
                           </div>
                           <div className='text-left'>
                              <h2 className='text-2xl font-bold text-slate-900'>
                                 {group.label}
                              </h2>
                              <p className='text-slate-600'>
                                 {group.subgroups?.length || 1} apakšsadaļas
                              </p>
                           </div>
                        </div>
                        {expandedGroups.has(group.id) ? (
                           <ChevronUp className='h-8 w-8 text-slate-400' />
                        ) : (
                           <ChevronDown className='h-8 w-8 text-slate-400' />
                        )}
                     </button>

                     {/* Subgroups */}
                     {expandedGroups.has(group.id) &&
                        group.subgroups
                           ?.filter((subgroup) => {
                              const term = searchTerm.toLowerCase()
                              if (!term) return true

                              const hasMatchInFields = subgroup.fields?.some(
                                 (f) => {
                                    const fieldValue =
                                       content[f.name as keyof ContentData] || ''
                                    return (
                                       f.name.toLowerCase().includes(term) ||
                                       (typeof fieldValue === 'string' &&
                                          fieldValue
                                             .toLowerCase()
                                             .includes(term))
                                    )
                                 },
                              )

                              return hasMatchInFields
                           })
                           .map((subgroup) => (
                              <div key={subgroup.id} className='mt-6 ml-12'>
                                 <button
                                    onClick={() => toggleSubgroup(subgroup.id)}
                                    className='w-full flex items-center justify-between p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 hover:bg-white/95 transition-all'
                                 >
                                    <div className='flex items-center gap-4'>
                                       <div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border'>
                                          <Type className='h-5 w-5 text-slate-600' />
                                       </div>
                                       <span className='font-semibold text-slate-800'>
                                          {subgroup.label}
                                       </span>
                                       <span className='text-sm text-slate-500'>
                                          ({subgroup.fields.length} lauki)
                                       </span>
                                    </div>
                                    {expandedSubgroups.has(subgroup.id) ? (
                                       <ChevronUp className='h-5 w-5' />
                                    ) : (
                                       <ChevronDown className='h-5 w-5' />
                                    )}
                                 </button>

                                 {/* Fields */}
                                 {expandedSubgroups.has(subgroup.id) && (
                                    <div className='mt-6 space-y-5 pl-14'>
                                       {subgroup.fields.map((key) => {
                                          const isImage =
                                             key.name.includes('Image') ||
                                             key.name.includes('Logo') ||
                                             key.name.includes('Thumbnail')
                                          const isHeroBackground =
                                             key.name ===
                                             'homeHeroBackgroundImage'
                                          const currentSrc = content[
                                             key.name as keyof ContentData
                                          ] as string
                                          const isVideoFile =
                                             currentSrc &&
                                             (currentSrc.includes('/videos/') ||
                                                currentSrc.startsWith(
                                                   'data:video/',
                                                ) ||
                                                currentSrc.endsWith('.mp4') ||
                                                currentSrc.endsWith('.webm') ||
                                                currentSrc.endsWith('.mov'))

                                          if (
                                             searchTerm != '' &&
                                             !key.name
                                                .toLowerCase()
                                                .includes(
                                                   searchTerm.toLowerCase(),
                                                )
                                          ) {
                                             return null
                                          }
                                          return (
                                             <Card
                                                key={key.name}
                                                className='card-container shadow-lg hover:shadow-xl transition-all bg-white/95 backdrop-blur-sm border-slate-200/60'
                                             >
                                                <CardHeader className='pb-4'>
                                                   <CardTitle className='text-base font-semibold text-slate-800 flex items-center justify-between'>
                                                      <span>
                                                         {key.name
                                                            .replace(
                                                               /([A-Z])/g,
                                                               ' $1',
                                                            )
                                                            .replace(
                                                               /^./,
                                                               (s) =>
                                                                  s.toUpperCase(),
                                                            )}
                                                      </span>
                                                      {key.image != '' ? (
                                                         <span
                                                            onMouseDown={(
                                                               e,
                                                            ) => {
                                                               setActiveOverlay(
                                                                  activeOverlay ===
                                                                     key.name
                                                                     ? ''
                                                                     : key.name,
                                                               )
                                                               setOverlayData({
                                                                  url: key.image,
                                                               })
                                                            }}
                                                         >
                                                            nospied mani
                                                         </span>
                                                      ) : null}
                                                      <code className='text-xs bg-slate-100 px-2.5 py-1 rounded-full'>
                                                         {key.name}
                                                      </code>
                                                   </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                   {isImage ? (
                                                      <div className='space-y-6'>
                                                         {/* Current Preview */}
                                                         <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                                            <div>
                                                               <p className='text-sm font-medium text-slate-600 mb-3'>
                                                                  {isVideoFile
                                                                     ? 'Pašreizējais video'
                                                                     : 'Pašreizējais attēls'}
                                                               </p>
                                                               <div className='relative w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-inner'>
                                                                  {currentSrc ? (
                                                                     isVideoFile ? (
                                                                        <video
                                                                           src={
                                                                              currentSrc
                                                                           }
                                                                           controls
                                                                           className='w-full h-full object-cover'
                                                                        >
                                                                           Jūsu
                                                                           pārlūkprogramma
                                                                           neatbalsta
                                                                           video
                                                                           atskaņošanu.
                                                                        </video>
                                                                     ) : (
                                                                        <Image
                                                                           src={
                                                                              currentSrc
                                                                           }
                                                                           alt='Current'
                                                                           fill
                                                                           className='object-cover'
                                                                        />
                                                                     )
                                                                  ) : (
                                                                     <div className='flex items-center justify-center h-full text-slate-400 text-lg'>
                                                                        {isHeroBackground
                                                                           ? 'Nav attēla vai video'
                                                                           : 'Nav attēla'}
                                                                     </div>
                                                                  )}
                                                               </div>
                                                            </div>
                                                         </div>

                                                         {/* Upload Progress and Status */}
                                                         {(uploading[
                                                            key.name as keyof ContentData
                                                         ] ||
                                                            uploadStatus[
                                                               key.name as keyof ContentData
                                                            ]) && (
                                                            <div className='space-y-3'>
                                                               {/* Status Message */}
                                                               <div className='flex items-center justify-between text-sm'>
                                                                  <div className='flex items-center gap-2'>
                                                                     {uploadStatus[
                                                                        key.name as keyof ContentData
                                                                     ] ===
                                                                        'uploading' && (
                                                                        <>
                                                                           <div className='w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin' />
                                                                           <span className='text-blue-600 font-medium'>
                                                                              Augšupielāde...
                                                                           </span>
                                                                        </>
                                                                     )}
                                                                     {uploadStatus[
                                                                        key.name as keyof ContentData
                                                                     ] ===
                                                                        'compressing' && (
                                                                        <>
                                                                           <div className='w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin' />
                                                                           <span className='text-amber-600 font-medium'>
                                                                              Saspiešana... (Ja video nav webm tas tiks pārveidots uz to un saspiests, tas aizņem laiku)
                                                                           </span>
                                                                        </>
                                                                     )}
                                                                     {uploadStatus[
                                                                        key.name as keyof ContentData
                                                                     ] ===
                                                                        'complete' && (
                                                                        <>
                                                                           <svg
                                                                              className='w-4 h-4 text-green-600'
                                                                              fill='currentColor'
                                                                              viewBox='0 0 20 20'
                                                                           >
                                                                              <path
                                                                                 fillRule='evenodd'
                                                                                 d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                                                                 clipRule='evenodd'
                                                                              />
                                                                           </svg>
                                                                           <span className='text-green-600 font-medium'>
                                                                              Pabeigts!
                                                                           </span>
                                                                        </>
                                                                     )}
                                                                     {uploadStatus[
                                                                        key.name as keyof ContentData
                                                                     ] ===
                                                                        'error' && (
                                                                        <>
                                                                           <svg
                                                                              className='w-4 h-4 text-red-600'
                                                                              fill='currentColor'
                                                                              viewBox='0 0 20 20'
                                                                           >
                                                                              <path
                                                                                 fillRule='evenodd'
                                                                                 d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                                                                                 clipRule='evenodd'
                                                                              />
                                                                           </svg>
                                                                           <span className='text-red-600 font-medium'>
                                                                              Kļūda!
                                                                           </span>
                                                                        </>
                                                                     )}
                                                                  </div>
                                                                  {uploadStatus[
                                                                     key.name as keyof ContentData
                                                                  ] ===
                                                                     'uploading' && (
                                                                     <span className='text-blue-600 font-medium'>
                                                                        {uploadProgress[
                                                                           key.name as keyof ContentData
                                                                        ] || 0}
                                                                        %
                                                                     </span>
                                                                  )}
                                                               </div>

                                                               {/* Progress Bar */}
                                                               {(uploadStatus[
                                                                  key.name as keyof ContentData
                                                               ] ===
                                                                  'uploading' ||
                                                                  uploadStatus[
                                                                     key.name as keyof ContentData
                                                                  ] ===
                                                                     'compressing') && (
                                                                  <div className='w-full bg-slate-200 rounded-full h-2.5 overflow-hidden'>
                                                                     {uploadStatus[
                                                                        key.name as keyof ContentData
                                                                     ] ===
                                                                     'compressing' ? (
                                                                        <div className='bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 h-2.5 w-full animate-pulse' />
                                                                     ) : (
                                                                        <div
                                                                           className='bg-blue-600 h-2.5 rounded-full transition-all duration-300'
                                                                           style={{
                                                                              width: `${
                                                                                 uploadProgress[
                                                                                    key.name as keyof ContentData
                                                                                 ] ||
                                                                                 0
                                                                              }%`,
                                                                           }}
                                                                        />
                                                                     )}
                                                                  </div>
                                                               )}

                                                               {/* Compression Results */}
                                                               {compressionResults[
                                                                  key.name as keyof ContentData
                                                               ] && (
                                                                  <div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200'>
                                                                     <div className='flex items-center gap-2 mb-2'>
                                                                        <svg
                                                                           className='w-4 h-4 text-green-600'
                                                                           fill='none'
                                                                           stroke='currentColor'
                                                                           viewBox='0 0 24 24'
                                                                        >
                                                                           <path
                                                                              strokeLinecap='round'
                                                                              strokeLinejoin='round'
                                                                              strokeWidth={2}
                                                                              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                                                                           />
                                                                        </svg>
                                                                        <span className='text-green-700 font-medium text-sm'>
                                                                           {compressionResults[
                                                                              key.name as keyof ContentData
                                                                           ]
                                                                              ?.isVideo
                                                                              ? 'Video saspiests'
                                                                              : 'Attēls saspiests'}
                                                                        </span>
                                                                     </div>
                                                                     <div className='grid grid-cols-3 gap-2 text-xs'>
                                                                        <div className='bg-white/60 rounded-lg p-2 text-center'>
                                                                           <p className='text-slate-500'>
                                                                              Oriģināls
                                                                           </p>
                                                                           <p className='font-semibold text-slate-700'>
                                                                              {compressionResults[
                                                                                 key.name as keyof ContentData
                                                                              ]
                                                                                 ?.originalSize
                                                                                 ? `${(
                                                                                      compressionResults[
                                                                                         key.name as keyof ContentData
                                                                                      ]
                                                                                         .originalSize! /
                                                                                      1024 /
                                                                                      1024
                                                                                   ).toFixed(
                                                                                      2,
                                                                                   )} MB`
                                                                                 : '-'}
                                                                           </p>
                                                                        </div>
                                                                        <div className='bg-white/60 rounded-lg p-2 text-center'>
                                                                           <p className='text-slate-500'>
                                                                              Saspiests
                                                                           </p>
                                                                           <p className='font-semibold text-green-600'>
                                                                              {compressionResults[
                                                                                 key.name as keyof ContentData
                                                                              ]
                                                                                 ?.compressedSize
                                                                                 ? `${(
                                                                                      compressionResults[
                                                                                         key.name as keyof ContentData
                                                                                      ]
                                                                                         .compressedSize! /
                                                                                      1024 /
                                                                                      1024
                                                                                   ).toFixed(
                                                                                      2,
                                                                                   )} MB`
                                                                                 : '-'}
                                                                           </p>
                                                                        </div>
                                                                        <div className='bg-white/60 rounded-lg p-2 text-center'>
                                                                           <p className='text-slate-500'>
                                                                              Ietaupīts
                                                                           </p>
                                                                           <p className='font-semibold text-emerald-600'>
                                                                              {compressionResults[
                                                                                 key.name as keyof ContentData
                                                                              ]
                                                                                 ?.compressionRatio ||
                                                                                 '-'}
                                                                           </p>
                                                                        </div>
                                                                     </div>
                                                                  </div>
                                                               )}
                                                            </div>
                                                         )}

                                                         {/* Upload Input */}
                                                         <input
                                                            type='file'
                                                            accept={
                                                               isHeroBackground
                                                                  ? 'image/jpeg,image/jpg,image/png,image/webp,image/gif,video/mp4,video/webm,video/mov,video/quicktime'
                                                                  : 'image/jpeg,image/jpg,image/png,image/webp,image/gif'
                                                            }
                                                            onChange={(e) =>
                                                               handleImageUpload(
                                                                  key.name as keyof ContentData,
                                                                  e.target
                                                                     .files?.[0] ||
                                                                     null,
                                                               )
                                                            }
                                                            disabled={
                                                               uploading[
                                                                  key.name as keyof ContentData
                                                               ]
                                                            }
                                                            className='block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-indigo-600 file:text-white hover:file:from-blue-600 hover:file:to-indigo-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                                                         />
                                                         <p className='text-xs text-slate-500 mt-2'>
                                                            {isHeroBackground
                                                               ? 'Atbalstītie formāti: JPG, PNG, WebP, GIF, MP4, WebM, MOV (attēli max 20MB, video max 100MB)'
                                                               : 'Atbalstītie formāti: JPG, PNG, WebP, GIF (max 20MB)'}
                                                         </p>
                                                      </div>
                                                   ) : key.name.includes(
                                                        'Description',
                                                     ) ||
                                                     key.name.includes('Bio') ||
                                                     key.name.includes(
                                                        'Content',
                                                     )||key.name.includes('RightText') ? (
                                                      <Textarea
                                                         value={
                                                            (content[
                                                               key.name as keyof ContentData
                                                            ] as string) || ''
                                                         }
                                                         onChange={(e) =>
                                                            handleContentChange(
                                                               key.name as keyof ContentData,
                                                               e.target.value,
                                                            )
                                                         }
                                                         rows={5}
                                                         className='resize-none text-base bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl'
                                                      />
                                                   ) : (
                                                      <Input
                                                         value={
                                                            (content[
                                                               key.name as keyof ContentData
                                                            ] as string) || ''
                                                         }
                                                         onChange={(e) =>
                                                            handleContentChange(
                                                               key.name as keyof ContentData,
                                                               e.target.value,
                                                            )
                                                         }
                                                         className='text-base bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl'
                                                      />
                                                   )}
                                                </CardContent>
                                             </Card>
                                          )
                                       })}
                                    </div>
                                 )}
                              </div>
                           ))}
                     {group.isSpecial && expandedGroups.has(group.id) && (
                        <div className='mt-8 ml-12'>
                           <Card className='shadow-lg border-slate-200/60 bg-white/95 backdrop-blur-sm'>
                              <CardHeader className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                                 <div>
                                    <CardTitle className='text-lg font-semibold text-slate-900'>
                                       Jaunumu saraksts
                                    </CardTitle>
                                    <p className='text-sm text-slate-500'>
                                       Pievienojiet vai rediģējiet aktualitātes,
                                       kas parādās publiskajā lapā.
                                    </p>
                                 </div>
                                 <Button
                                    type='button'
                                    onClick={startCreateNews}
                                    className='bg-blue-600 hover:bg-blue-700 text-white'
                                 >
                                    <Plus className='h-4 w-4 mr-2' />
                                    Pievienot jaunumu
                                 </Button>
                              </CardHeader>
                              <CardContent className='space-y-6'>
                                 {isNewsFormOpen && (
                                    <form
                                       onSubmit={handleNewsSubmit}
                                       className='space-y-4 rounded-2xl border border-dashed border-slate-200 p-4 bg-slate-50/80'
                                    >
                                       <div className='grid md:grid-cols-2 gap-4'>
                                          <div className='space-y-2'>
                                             <label className='text-sm font-medium text-slate-700'>
                                                Virsraksts{' '}
                                                <span className='text-red-500'>
                                                   *
                                                </span>
                                             </label>
                                             <Input
                                                className='bg-white'
                                                value={newsFormData.title}
                                                onChange={(e) =>
                                                   setNewsFormData((prev) => ({
                                                      ...prev,
                                                      title: e.target.value,
                                                   }))
                                                }
                                                placeholder='Piemēram: Jauns projekts'
                                                required
                                             />
                                          </div>
                                          <div className='space-y-2'>
                                             <label className='text-sm font-medium text-slate-700'>
                                                Kategorija
                                             </label>
                                             <Input
                                                className='bg-white'
                                                value={newsFormData.category}
                                                onChange={(e) =>
                                                   setNewsFormData((prev) => ({
                                                      ...prev,
                                                      category: e.target.value,
                                                   }))
                                                }
                                                placeholder='Piemēram: Projekti'
                                             />
                                          </div>
                                       </div>

                                       <div className='space-y-2'>
                                          <label className='text-sm font-medium text-slate-700'>
                                             Apraksts{' '}
                                             <span className='text-red-500'>
                                                *
                                             </span>
                                          </label>
                                          <Textarea
                                             className='bg-white'
                                             value={newsFormData.excerpt}
                                             onChange={(e) =>
                                                setNewsFormData((prev) => ({
                                                   ...prev,
                                                   excerpt: e.target.value,
                                                }))
                                             }
                                             rows={3}
                                             placeholder='Īss jaunuma kopsavilkums'
                                             required
                                          />
                                       </div>

                                       <div className='grid md:grid-cols-3 gap-4'>
                                          <div className='space-y-2'>
                                             <label className='text-sm font-medium text-slate-700'>
                                                Datums
                                             </label>
                                             <Input
                                                className='bg-white'
                                                type='date'
                                                value={newsFormData.date}
                                                onChange={(e) =>
                                                   setNewsFormData((prev) => ({
                                                      ...prev,
                                                      date: e.target.value,
                                                   }))
                                                }
                                             />
                                          </div>
                                          <div className='space-y-2'>
                                             <label className='text-sm font-medium text-slate-700'>
                                                Lasīšanas laiks
                                             </label>
                                             <Input
                                                className='bg-white'
                                                value={newsFormData.readtime}
                                                onChange={(e) =>
                                                   setNewsFormData((prev) => ({
                                                      ...prev,
                                                      readtime: e.target.value,
                                                   }))
                                                }
                                                placeholder='Piemēram: 3 min'
                                             />
                                          </div>
                                          <div className='space-y-2'>
                                             <label className='text-sm font-medium text-slate-700'>
                                                Attēls
                                             </label>
                                             <Input
                                                className='bg-white'
                                                type='file'
                                                accept='image/*'
                                                onChange={(e) => {
                                                   const file =
                                                      e.target.files?.[0]
                                                   if (file) {
                                                      handleNewsImageChange(
                                                         file,
                                                      )
                                                   }
                                                }}
                                             />
                                          </div>
                                       </div>

                                       {(newsImagePreview ||
                                          newsFormData.image) && (
                                          <div className='space-y-2'>
                                             <label className='text-sm font-medium text-slate-700'>
                                                Attēla priekšskatījums
                                             </label>
                                             <div className='relative w-full h-48 rounded-xl overflow-hidden border border-slate-200'>
                                                <Image
                                                   src={
                                                      newsImagePreview ||
                                                      newsFormData.image ||
                                                      '/images/professional-camera.jpg'
                                                   }
                                                   alt='Jaunuma attēls'
                                                   fill
                                                   className='object-cover'
                                                />
                                             </div>
                                          </div>
                                       )}

                                       <div className='flex justify-end gap-3'>
                                          <Button
                                             type='button'
                                             variant='default'
                                             onClick={resetNewsForm}
                                          >
                                             <span>Atcelt</span>
                                          </Button>
                                          <Button
                                             type='submit'
                                             className='bg-blue-600 hover:bg-blue-700 text-white'
                                          >
                                             <Save className='h-4 w-4 mr-2' />
                                             Saglabāt
                                          </Button>
                                       </div>
                                    </form>
                                 )}

                                 {isLoadingNews ? (
                                    <div className='text-center py-8 text-slate-500'>
                                       Ielādē jaunumu sarakstu...
                                    </div>
                                 ) : newsArticles.length === 0 ? (
                                    <div className='text-center py-8 border border-dashed border-slate-200 rounded-2xl bg-slate-50 text-slate-500'>
                                       Nav pievienotu jaunumu
                                    </div>
                                 ) : (
                                    <div className='space-y-4'>
                                       {newsArticles.map((article) => (
                                          <div
                                             key={article.id}
                                             className='border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm'
                                          >
                                             <div className='grid md:grid-cols-5 gap-0'>
                                                <div className='relative h-48 md:h-full md:col-span-2'>
                                                   <Image
                                                      src={
                                                         article.image ||
                                                         '/images/professional-camera.jpg'
                                                      }
                                                      alt={article.title}
                                                      fill
                                                      className='object-cover'
                                                   />
                                                </div>
                                                <div className='p-5 space-y-4 md:col-span-3'>
                                                   <div>
                                                      <h3 className='text-lg font-semibold text-slate-900'>
                                                         {article.title}
                                                      </h3>
                                                      <p className='text-sm text-slate-600 mt-1 line-clamp-3'>
                                                         {article.excerpt}
                                                      </p>
                                                   </div>
                                                   <div className='flex flex-wrap gap-3 text-xs text-slate-500'>
                                                      {article.category && (
                                                         <span className='inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full'>
                                                            <Tag className='h-3 w-3' />
                                                            {article.category}
                                                         </span>
                                                      )}
                                                      {article.date && (
                                                         <span className='inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 rounded-full'>
                                                            <Calendar className='h-3 w-3' />
                                                            {new Date(
                                                               article.date,
                                                            ).toLocaleDateString(
                                                               'lv-LV',
                                                            )}
                                                         </span>
                                                      )}
                                                      {article.readtime && (
                                                         <span className='inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 rounded-full'>
                                                            <Clock className='h-3 w-3' />
                                                            {article.readtime}
                                                         </span>
                                                      )}
                                                   </div>
                                                   <div className='flex flex-wrap gap-3'>
                                                      <Button
                                                         type='button'
                                                         variant='default'
                                                         size='sm'
                                                         onClick={() =>
                                                            startEditNews(
                                                               article,
                                                            )
                                                         }
                                                         className='flex items-center gap-2'
                                                      >
                                                         <Edit className='h-4 w-4' />
                                                         Rediģēt
                                                      </Button>
                                                      <Button
                                                         type='button'
                                                         variant='default'
                                                         size='sm'
                                                         onClick={() =>
                                                            handleNewsDelete(
                                                               article.id,
                                                            )
                                                         }
                                                         className='flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50'
                                                      >
                                                         <Trash2 className='h-4 w-4' />
                                                         Dzēst
                                                      </Button>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 )}
                              </CardContent>
                           </Card>
                        </div>
                     )}
                  </div>
               ))}
         </div>

         {/* === FIXED SAVE BUTTON === */}
         {hasChanges && (
            <div className='fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/60 p-6 shadow-2xl z-[100]'>
               <div className='max-w-7xl mx-auto flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                     <div className='w-3 h-3 bg-orange-500 rounded-full animate-pulse' />
                     <span className='font-medium text-slate-700'>
                        Ir nesaglabātas izmaiņas
                     </span>
                  </div>
                  <Button
                     onClick={saveContent}
                     disabled={isSaving}
                     size='lg'
                     className='inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 py-2 h-14 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg shadow-xl shadow-orange-500/25 rounded-2xl transition-all duration-200 transform hover:scale-105'
                  >
                     <Save className='h-5 w-5 mr-3' />
                     {isSaving ? 'Saglabā...' : 'Saglabāt Visas Izmaiņas'}
                  </Button>
               </div>
            </div>
         )}
      </div>
   )
}
