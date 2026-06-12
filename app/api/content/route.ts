import { NextRequest, NextResponse } from 'next/server'
import { getContentData, saveContentData } from '@/lib/db'
import path from 'path'
import fs from 'node:fs/promises';
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
  servicesPageTitle: string
  servicesBadgeText: string
  servicesHeroTitle: string
  servicesHeroTitleHighlight: string
  servicesHeroTitleEnd: string
  servicesHeroDescription: string
  servicesHeroBackgroundImage: string

  servicesPartnersTitle: string
  servicesPartnersTitleHighlight: string
  servicesPartnersDescription: string

  servicesMainBadgeText: string
  servicesMainTitle: string
  servicesMainTitleHighlight: string
  servicesMainDescription: string

  servicesCtaTitle: string
  servicesCtaDescription: string
  servicesCtaButtonPrimary: string
  servicesCtaButtonSecondary: string

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

  // NEWS ARTICLES
  newsArticle1Title: string
  newsArticle1Excerpt: string
  newsArticle1Image: string
  newsArticle1Category: string
  newsArticle1Date: string
  newsArticle1Readtime: string

  newsArticle2Title: string
  newsArticle2Excerpt: string
  newsArticle2Image: string
  newsArticle2Category: string
  newsArticle2Date: string
  newsArticle2Readtime: string

  newsArticle3Title: string
  newsArticle3Excerpt: string
  newsArticle3Image: string
  newsArticle3Category: string
  newsArticle3Date: string
  newsArticle3Readtime: string

  newsArticle4Title: string
  newsArticle4Excerpt: string
  newsArticle4Image: string
  newsArticle4Category: string
  newsArticle4Date: string
  newsArticle4Readtime: string

  newsArticle5Title: string
  newsArticle5Excerpt: string
  newsArticle5Image: string
  newsArticle5Category: string
  newsArticle5Date: string
  newsArticle5Readtime: string

  newsArticle6Title: string
  newsArticle6Excerpt: string
  newsArticle6Image: string
  newsArticle6Category: string
  newsArticle6Date: string
  newsArticle6Readtime: string

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

  testimonial5Name: string
  testimonial5Role: string
  testimonial5ContentEn: string
  testimonial5ContentLv: string
  testimonial5Source: string

  testimonial6Name: string
  testimonial6Role: string
  testimonial6ContentEn: string
  testimonial6ContentLv: string
  testimonial6Source: string

  testimonial7Name: string
  testimonial7Role: string
  testimonial7ContentEn: string
  testimonial7ContentLv: string
  testimonial7Source: string

  testimonial8Name: string
  testimonial8Role: string
  testimonial8ContentEn: string
  testimonial8ContentLv: string
  testimonial8Source: string

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
  promoVideo1TitleEn: string
  promoVideo1TitleLv: string
  promoVideo1DescriptionEn: string
  promoVideo1DescriptionLv: string
  promoVideo2TitleEn: string
  promoVideo2TitleLv: string
  promoVideo2DescriptionEn: string
  promoVideo2DescriptionLv: string
  promoVideo3TitleEn: string
  promoVideo3TitleLv: string
  promoVideo3DescriptionEn: string
  promoVideo3DescriptionLv: string

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

  // MUSIC PAGE VIDEOS

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

  // PORTFOLIO MUSIC PAGE VIDEO TEXTS

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
}
// OPTIONS - Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// GET - Load content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || 'homepage'
    const language = searchParams.get('language') || 'lv'
    
    const content = getContentData()
    // console.log(content)
    const key = `${page}_${language}`
    return NextResponse.json({ content: content[key] || {} })
  } catch (error) {
    console.error('Error loading content:', error)
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 })
  }
}
const IMAGE_KEYS = [
    'headerLogo', 'homeHeroBackgroundImage', 'homeServiceWeddingImage', 
   'homeServicePromoImage', 'homeCtaBackgroundImage', 
    'servicesHeroBackgroundImage', 'heroImage', 'heroBackgroundImage', 
    'aboutImage', 'serviceWeddingImage',
    'serviceCorporateImage', 'serviceEventImage', 'testimonial1Image', 
    'testimonial2Image', 'testimonial3Image', 'contactImage', 
    'ctaBackgroundImage', 'newsArticle1Image', 'newsArticle2Image', 
    'newsArticle3Image', 'newsArticle4Image', 'newsArticle5Image', 
    'newsArticle6Image', 'partner1Logo', 'partner2Logo', 'partner3Logo', 
    'partner4Logo', 'partner5Logo', 'partner6Logo', 'partner7Logo', 
    'partner8Logo', 'aboutPageHeroImage', 'aboutPageMainImage', 'reviewsPageHeroImage',
    'testimonial4Image', 'testimonial5Image', 'testimonial6Image', 'testimonial7Image', 'testimonial8Image', 
    'aboutPageLogo', 'featuredTestimonial1Image', 'featuredTestimonial2Image', 
    'featuredTestimonial3Image', 'promoFeaturedVideoThumbnail', 
    'promoVideo1Thumbnail', 'promoVideo2Thumbnail', 'promoVideo3Thumbnail',
    'portfolioVideo1Thumbnail', 'portfolioVideo2Thumbnail', 'portfolioVideo3Thumbnail',
    'portfolioVideo4Thumbnail', 'portfolioVideo5Thumbnail', 'portfolioVideo6Thumbnail',
'weddingFeaturedVideoThumbnail','weddingVideo1Thumbnail', 'weddingVideo2Thumbnail', 'weddingVideo3Thumbnail', 
    'service1Image', 'service2Image', 'service3Image', 
    'aboutPageClickableImage1', 'aboutPageClickableImage2', 'aboutPageClickableImage3', 
    'serviceWeddingImage', 'serviceAdImage', 
    'serviceEventImage', 'portfolioWeddingImage', 
'portfolioPromoImage'
] as const; // 'as const' makes this array immutable
const getFileExtensionFromBase64 = (base64String: string): string => {
    // E.g., "data:image/jpeg;base64,..."
    const match = base64String.match(/^data:image\/(\w+);base64,/);
    return match ? `.${match[1]}` : '.jpg'; // Default to .jpg if format is unclear
};

const removeBase64Prefix = (base64String: string): string => {
    return base64String.replace(/^data:image\/\w+;base64,/, '');
};

export async function POST(request: NextRequest) {
    try {
        const data = await request.json(); 
        
        const page = data.page as string;
        const language = data.language as string;

        if (!page || !language || typeof data.content !== 'object') {
            return NextResponse.json({ error: 'Missing required fields (page, language, or content object)' }, { status: 400 })
        }

        const contentUpdate = data.content as Record<string, unknown>;
        const key = `${page}_${language}`
        const allContent = getContentData() 
        const currentContent = allContent[key] || {} as Partial<ContentData>
        const newContent = { ...currentContent };

        const publicDir = path.join(process.cwd(), 'public', 'images')
        await fs.mkdir(publicDir, { recursive: true })
        
        for (const [fieldName, fieldValue] of Object.entries(contentUpdate)) {
            
            if (typeof fieldValue !== 'string') {
                continue;
            }
            
            if (fieldValue.startsWith('data:image')) {
                try {
                    const fileExtension = getFileExtensionFromBase64(fieldValue);
                    const base64Data = removeBase64Prefix(fieldValue);
                    const buffer = Buffer.from(base64Data, 'base64');

                    const fileName = `${fieldName}-${page}-${language}-${Date.now()}${fileExtension}`
                    const filePath = path.join(publicDir, fileName)
                    
                    await fs.writeFile(filePath, buffer)
                    
                    const imageUrl = `/images/${fileName}`
                    newContent[fieldName as keyof ContentData] = imageUrl as any
                } catch (fsError) {
                    // If filesystem write fails (e.g., read-only filesystem on hosting), keep as base64
                    console.warn('Filesystem write failed for content API, keeping base64:', fsError)
                    newContent[fieldName as keyof ContentData] = fieldValue as any
                } 

            } else {
                newContent[fieldName as keyof ContentData] = fieldValue as any 
            }
        }

        allContent[key] = newContent as ContentData
        saveContentData(allContent)

        return NextResponse.json({ 
            success: true, 
            message: 'Content and Base64 images saved successfully',
            updatedKey: key 
        })

    } catch (error) {
        console.error('Error saving content and images:', error)
        return NextResponse.json({ error: 'Failed to save content or decode/upload pictures' }, { status: 500 })
    }
}