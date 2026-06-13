'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { DynamicContent, DynamicImage } from '../../components/dynamic-content'
import { DynamicSEO } from '@/components/dynamic-seo'

export default function PakalpojumiPage() {

   const [activeService, setActiveService] = useState<number | null>(0)
   const [isVideoOpen, setIsVideoOpen] = useState(false)
   const [selectedVideo, setSelectedVideo] = useState<{
      url: string
      title: string
   } | null>(null)
   const [localStorageLinks, setLocalStorageLinks] = useState<{
      [key: number]: string
   }>({})
   const openVideo = (url: string, service: any) => {
      setSelectedVideo({ url, title: service.title })
      setIsVideoOpen(true)
   }

   const closeVideo = () => {
      setIsVideoOpen(false)
      setSelectedVideo(null)
   }

   useEffect(() => {
      const wedding = localStorage.getItem('content_serviceWeddingVideoUrl')
      const advertisement = localStorage.getItem('content_serviceAdVideoUrl')
      const event = localStorage.getItem('content_serviceEventVideoUrl')
      console.log(wedding, advertisement, event)
      setLocalStorageLinks({
         1: wedding,
         2: advertisement,
         3: event,
      })
   }, [selectedVideo])

   return (
      <>
         <DynamicSEO />

         {/* Hero Section */}
         <section className='relative h-[55vh] pt-20 overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10' />
            <div className='absolute inset-0'>
               <DynamicImage
                  contentKey='servicesHeroBackgroundImage'
                  fallback='/hero-cinematic.jpg'
                  alt='Video pakalpojumi'
                  fill
                  priority
                  className='object-cover'
                  objectFit='cover'
               />
            </div>

            <div className='container mx-auto px-4 relative z-20 h-full flex flex-col items-center justify-center'>
                <div className='max-w-4xl mx-auto text-center text-white'>
                  <motion.div
                     initial={{ opacity: 1, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8 }}
                  >
                    <h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
                       <DynamicContent contentKey='servicesHeroTitle' fallback='Profesionāli' />
                       {' '}
                       <span style={{ color: '#cc5339' }}>
                          <DynamicContent contentKey='servicesHeroTitleHighlight' fallback='video risinājumi tavai' />
                       </span>
                       {' '}
                       <DynamicContent contentKey='servicesHeroSubtitle' fallback='izaugsmei un atmiņām.' />
                    </h1>
                     <p className='text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto'>
                        <DynamicContent
                           contentKey='servicesHeroDescription'
                           fallback='No personīgiem stāstiem līdz jaudīgam saturam uzņēmumiem.'
                        />
                     </p>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* Services Section */}
         <section className='bg-white min-h-screen flex flex-col pb-10'>
            <div className='container mx-auto px-4'>
               <motion.div
                  initial={{ opacity: 1, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className='text-center mb-16'
               >
                  <h2 className='text-4xl md:text-5xl font-bold mb-6'>
                     <DynamicContent
                        contentKey='servicesSectionTitle'
                        fallback='Mūsu pakalpojumi'
                     />
                  </h2>
                  <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                     <DynamicContent
                        contentKey='servicesSectionDescription'
                        fallback='No koncepcijas līdz gatavam produktam - mēs nodrošinām visus video ražošanas posmus'
                     />
                  </p>
               </motion.div>

               <div className="max-w-5xl mx-auto flex flex-col gap-6">
                  {/* Service Navigation */}
                  <div className="flex flex-col gap-4 justify-center">
                     {[0, 1, 2].map((index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 1, x: -20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                           <Card
                           className={`h-full min-h-[140px] cursor-pointer transition-all duration-300 hover:shadow-lg ${
                              activeService === index ? "ring-2 shadow-lg" : ""
                           }`}
                           onClick={() =>
                              setActiveService(activeService === index ? null : index)
                           }
                           style={
                              activeService === index
                                 ? { boxShadow: "0 0 0 2px #cc5339" }
                                 : {}
                           }
                           >
                           <CardContent className="flex items-center p-6 relative">
                              <motion.div className="flex items-center gap-4 flex-1">
                                 <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                 {index === 0 && (
                                    <DynamicImage
                                       fill
                                       objectFit="cover"
                                       contentKey="serviceWeddingImage"
                                       fallback="/images/wedding-couple-church.jpeg"
                                       alt="kāzu video"
                                    />
                                 )}
                                 {index === 1 && (
                                    <DynamicImage
                                       fill
                                       objectFit="cover"
                                       contentKey="serviceAdImage"
                                       fallback="/images/professional-equipment.jpeg"
                                       alt="reklāmas video"
                                    />
                                 )}
                                 {index === 2 && (
                                    <DynamicImage
                                       fill
                                       objectFit="cover"
                                       contentKey="serviceEventImage"
                                       fallback="/images/studio-purple-lighting.jpeg"
                                       alt="pasākumu video"
                                    />
                                 )}
                                 </div>

                                 <div className="flex flex-col gap-1">
                                 <h3 className="text-xl font-bold mb-2">
                                    {index === 0 && (
                                       <DynamicContent
                                       contentKey="serviceWeddingTitle"
                                       fallback="Kāzu video"
                                       />
                                    )}
                                    {index === 1 && (
                                       <DynamicContent
                                       contentKey="serviceAdTitle"
                                       fallback="Reklāmas video"
                                       />
                                    )}
                                    {index === 2 && (
                                       <DynamicContent
                                       contentKey="serviceEventTitle"
                                       fallback="Pasākumu video"
                                       />
                                    )}
                                 </h3>

                                 <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {index === 0 && (
                                       <DynamicContent
                                       contentKey="serviceWeddingSubtitle"
                                       fallback="Jūsu īpašās dienas mūžīgā atmiņa"
                                       />
                                    )}
                                    {index === 1 && (
                                       <DynamicContent
                                       contentKey="serviceAdSubtitle"
                                       fallback="Jūsu zīmola stāsts vizuālā formātā"
                                       />
                                    )}
                                    {index === 2 && (
                                       <DynamicContent
                                       contentKey="serviceEventSubtitle"
                                       fallback="Jūsu pasākuma atmosfēras saglabāšana"
                                       />
                                    )}
                                 </p>

                                 <div className="flex items-center justify-start gap-4 text-sm text-gray-500 h-full">
                                    <span
                                       className="font-semibold"
                                       style={{ color: "#cc5339" }}
                                    >
                                       {index === 0 && (
                                       <DynamicContent
                                          contentKey="serviceWeddingPrice"
                                          fallback="No €800"
                                       />
                                       )}
                                       {index === 1 && (
                                       <DynamicContent
                                          contentKey="serviceAdPrice"
                                          fallback="No €500"
                                       />
                                       )}
                                       {index === 2 && (
                                       <DynamicContent
                                          contentKey="serviceEventPrice"
                                          fallback="No €400"
                                       />
                                       )}
                                    </span>
                                 </div>
                                 </div>

                                 <ArrowRight
                                 className={`h-5 w-5 transition-transform absolute right-6 top-1/2 -translate-y-1/2 ${
                                    activeService === index
                                       ? "rotate-90 text-yellow-500"
                                       : "text-gray-400"
                                 }`}
                                 />
                              </motion.div>
                           </CardContent>
                           </Card>

                           <AnimatePresence initial={false}>
                           {activeService === index && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{
                                 duration: 0.4,
                                 ease: "easeInOut",
                                 }}
                                 className="overflow-hidden"
                              >
                                 <div className="w-full mt-4">
                                    <Card className="h-full overflow-hidden shadow-xl flex flex-col">
                                       <div className='relative h-52 flex-shrink-0'>
                                          {activeService === 0 && (
                                             <DynamicImage
                                                fill
                                                objectFit='cover'
                                                contentKey='serviceWeddingImage'
                                                fallback='/images/wedding-couple-church.jpeg'
                                                alt='kāzu video'
                                             />
                                          )}
                                          {activeService === 1 && (
                                             <DynamicImage
                                                fill
                                                objectFit='cover'
                                                contentKey='serviceAdImage'
                                                fallback='/images/professional-equipment.jpeg'
                                                alt='reklāmas video'
                                             />
                                          )}
                                          {activeService === 2 && (
                                             <DynamicImage
                                                fill
                                                objectFit='cover'
                                                contentKey='serviceEventImage'
                                                fallback='/images/studio-purple-lighting.jpeg'
                                                alt='pasākumu video'
                                             />
                                          )}
                                          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                                          <Button
                                             size='lg'
                                             className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30'
                                             onClick={() =>
                                                openVideo(
                                                   activeService === 0
                                                      ? localStorageLinks[1]
                                                      : activeService === 1
                                                      ? localStorageLinks[2]
                                                      : localStorageLinks[3],
                                                   {
                                                      title:
                                                         activeService === 0
                                                            ? 'Kāzu video'
                                                            : activeService === 1
                                                            ? 'Reklāmas video'
                                                            : 'Pasākumu video',
                                                   },
                                                )
                                             }
                                          >
                                             <Play className='h-6 w-6' />
                                          </Button>
                                       </div>

                                       <CardContent className='p-6 flex-1 overflow-y-auto min-h-0 flex flex-col items-center text-center'>
                                          <h3 className="text-2xl font-bold text-center mb-6">
                                             {activeService === 0 && (
                                                <DynamicContent
                                                   contentKey="serviceWeddingTitle"
                                                   fallback="Kāzu video"
                                                />
                                             )}
                                             {activeService === 1 && (
                                                <DynamicContent
                                                   contentKey="serviceAdTitle"
                                                   fallback="Reklāmas video"
                                                />
                                             )}
                                             {activeService === 2 && (
                                                <DynamicContent
                                                   contentKey="serviceEventTitle"
                                                   fallback="Pasākumu video"
                                                />
                                             )}
                                          </h3>
                                          <p className='text-gray-600 mb-4 text-center max-w-2xl'>
                                             {activeService === 0 && (
                                                <DynamicContent
                                                   contentKey='serviceWeddingDescription'
                                                   fallback='Profesionāla kāzu video uzņemšana un montāža, kas saglabās jūsu svarīgākās dzīves brīžus.'
                                                />
                                             )}
                                             {activeService === 1 && (
                                                <DynamicContent
                                                   contentKey='serviceAdDescription'
                                                   fallback='Radošs un efektīvs reklāmas video saturs, kas palīdzēs jūsu biznesam izcelties tirgū.'
                                                />
                                             )}
                                             {activeService === 2 && (
                                                <DynamicContent
                                                   contentKey='serviceEventDescription'
                                                   fallback='Koncertu, konferenču un citu pasākumu profesionāla video dokumentēšana.'
                                                />
                                             )}
                                          </p>

                                          <div className="mb-8 flex flex-col items-center gap-6">

                                             {/* BIG PRICE CARD (CENTERED ONLY, NOT FULL WIDTH) */}
                                             <div className="flex justify-center w-full">
                                                <div className="w-fit px-10 py-8 rounded-2xl bg-gray-50 shadow-xl text-center border">
                                                   
                                                   <div className="text-4xl font-extrabold text-yellow-600">
                                                   {activeService === 0 && (
                                                      <DynamicContent contentKey='serviceWeddingPrice' fallback='No €800' />
                                                   )}
                                                   {activeService === 1 && (
                                                      <DynamicContent contentKey='serviceAdPrice' fallback='No €500' />
                                                   )}
                                                   {activeService === 2 && (
                                                      <DynamicContent contentKey='serviceEventPrice' fallback='No €400' />
                                                   )}
                                                   </div>

                                                   <div className="text-sm text-gray-500 mt-2">
                                                   Sākot no
                                                   </div>

                                                </div>
                                             </div>


                                             {/* SMALL CARDS ROW (BELOW BIG CARD) */}
                                             <div className="flex justify-center w-full">
                                                <div className="grid grid-cols-3 gap-3 w-fit">

                                                   <div className="w-[100px] p-3 rounded-xl bg-gray-100 text-center">
                                                   <div className="text-sm font-medium">
                                                      {activeService === 0 && (
                                                         <DynamicContent contentKey='serviceWeddingDuration' fallback='8-12 stundas' />
                                                      )}
                                                      {activeService === 1 && (
                                                         <DynamicContent contentKey='serviceAdDuration' fallback='1-3 dienas' />
                                                      )}
                                                      {activeService === 2 && (
                                                         <DynamicContent contentKey='serviceEventDuration' fallback='2-8 stundas' />
                                                      )}
                                                   </div>
                                                   <div className="text-xs text-gray-500">Darba laiks</div>
                                                   </div>

                                                   <div className="w-[100px] p-3 rounded-xl bg-gray-100 text-center">
                                                   <div className="text-sm font-medium">4K</div>
                                                   <div className="text-xs text-gray-500">Kvalitāte</div>
                                                   </div>

                                                   <div className="w-[100px] p-3 rounded-xl bg-gray-100 text-center">
                                                   <div className="text-sm font-medium">Pro</div>
                                                   <div className="text-xs text-gray-500">Pakalpojums</div>
                                                   </div>

                                                </div>
                                             </div>

                                          </div>

                                          <div className='mb-8 flex flex-col items-center text-center w-full'>
                                             <h4 className='font-semibold mb-4 flex items-center justify-center gap-2'>
                                                <CheckCircle className='h-5 w-5 text-green-500' />
                                                Iekļautie pakalpojumi
                                             </h4>
                                             <div className='flex flex-col gap-2 w-full max-w-xl items-center'>
                                                {activeService === 0 && (
                                                   <>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceWeddingIncluded1'
                                                               fallback='Pilna dienas dokumentēšana'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceWeddingIncluded2'
                                                               fallback='Profesionāla audio ierakstīšana'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceWeddingIncluded3'
                                                               fallback='Dronu uzņēmumi'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceWeddingIncluded4'
                                                               fallback='Kinematografisks montāžas stils'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceWeddingIncluded5'
                                                               fallback='4K kvalitāte'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceWeddingIncluded6'
                                                               fallback='Mūzikas licencēšana'
                                                            />
                                                         </span>
                                                      </div>
                                                   </>
                                                )}
                                                {activeService === 1 && (
                                                   <>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceAdIncluded1'
                                                               fallback='Koncepcijas izstrāde'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceAdIncluded2'
                                                               fallback='Scenārija rakstīšana'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceAdIncluded3'
                                                               fallback='Profesionāla apgaismošana'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceAdIncluded4'
                                                               fallback='Produktu fotografēšana'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceAdIncluded5'
                                                               fallback='Animācijas elementi'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceAdIncluded6'
                                                               fallback='Sociālo mediju optimizācija'
                                                            />
                                                         </span>
                                                      </div>
                                                   </>
                                                )}
                                                {activeService === 2 && (
                                                   <>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceEventIncluded1'
                                                               fallback='Vairāku kameru uzstādījums'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceEventIncluded2'
                                                               fallback='Tiešraides iespējas'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceEventIncluded3'
                                                               fallback='Profesionāla skaņas ierakstīšana'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceEventIncluded4'
                                                               fallback='Ātra apstrāde'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceEventIncluded5'
                                                               fallback='Sociālo mediju klippi'
                                                            />
                                                         </span>
                                                      </div>
                                                      <div className='flex items-center gap-2 text-sm'>
                                                         <span>
                                                            <DynamicContent
                                                               contentKey='serviceEventIncluded6'
                                                               fallback='Pilna pasākuma dokumentēšana'
                                                            />
                                                         </span>
                                                      </div>
                                                   </>
                                                )}
                                             </div>
                                          </div>

                                          <div className='mb-8'>
                                             <h4 className='font-semibold mb-4 flex items-center justify-center gap-2'>
                                                <CheckCircle className='h-5 w-5 text-green-500' />
                                                Galvenās iezīmes
                                             </h4>
                                             <div className='flex flex-wrap gap-2 justify-center'>
                                                {activeService === 0 && (
                                                   <>
                                                      <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                                                         <DynamicContent
                                                            contentKey='serviceWeddingTag1'
                                                            fallback='Neierobežots laiks'
                                                         />
                                                      </span>
                                                      <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                                                         <DynamicContent
                                                            contentKey='serviceWeddingTag2'
                                                            fallback='2 operatori'
                                                         />
                                                      </span>
                                                      <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                                                         <DynamicContent
                                                            contentKey='serviceWeddingTag3'
                                                            fallback='Ātra apstrāde'
                                                         />
                                                      </span>
                                                   </>
                                                )}
                                                {activeService === 1 && (
                                                   <>
                                                      <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                                                         <DynamicContent
                                                            contentKey='serviceAdTag1'
                                                            fallback='Stratēģiska pieeja'
                                                         />
                                                      </span>
                                                      <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                                                         <DynamicContent
                                                            contentKey='serviceAdTag2'
                                                            fallback='ROI fokuss'
                                                         />
                                                      </span>
                                                      <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                                                         <DynamicContent
                                                            contentKey='serviceAdTag3'
                                                            fallback='Multi-platform'
                                                         />
                                                      </span>
                                                   </>
                                                )}
                                                {activeService === 2 && (
                                                   <>
                                                      <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                                                         <DynamicContent
                                                            contentKey='serviceEventTag1'
                                                            fallback='Tiešraide'
                                                         />
                                                      </span>
                                                      <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                                                         <DynamicContent
                                                            contentKey='serviceEventTag2'
                                                            fallback='Ātra piegāde'
                                                         />
                                                      </span>
                                                      <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                                                         <DynamicContent
                                                            contentKey='serviceEventTag3'
                                                            fallback='Vairākas kameras'
                                                         />
                                                      </span>
                                                   </>
                                                )}
                                             </div>
                                          </div>

                                          <div className='flex gap-3 w-full'>
                                             <Link
                                                href='/oskvid-kontakti'
                                                className='flex-1 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0 flex items-center justify-center text-center hover:opacity-90'
                                                style={{ backgroundColor: '#cc5339' }}
                                             >
                                                {activeService === 0 && (
                                                   <DynamicContent
                                                      contentKey='serviceWeddingButtonOrder'
                                                      fallback='Pasūtīt tagad'
                                                   />
                                                )}
                                                {activeService === 1 && (
                                                   <DynamicContent
                                                      contentKey='serviceAdButtonOrder'
                                                      fallback='Pasūtīt tagad'
                                                   />
                                                )}
                                                {activeService === 2 && (
                                                   <DynamicContent
                                                      contentKey='serviceEventButtonOrder'
                                                      fallback='Pasūtīt tagad'
                                                   />
                                                )}
                                             </Link>
                                             <Link
                                                href={activeService==0?'/portfolio/kazu-video-latvija': '/portfolio/reklamas-video'}
                                                className='flex-1 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-800 hover:text-gray-900 font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center text-center'
                                             >
                                                {activeService === 0 && (
                                                   <DynamicContent
                                                      contentKey='serviceWeddingButtonLearnMore'
                                                      fallback='Uzzināt vairāk'
                                                   />
                                                )}
                                                {activeService === 1 && (
                                                   <DynamicContent
                                                      contentKey='serviceAdButtonLearnMore'
                                                      fallback='Uzzināt vairāk'
                                                   />
                                                )}
                                                {activeService === 2 && (
                                                   <DynamicContent
                                                      contentKey='serviceEventButtonLearnMore'
                                                      fallback='Uzzināt vairāk'
                                                   />
                                                )}
                                             </Link>
                                          </div>
                                       </CardContent>
                                    </Card>
                                 </div>

                              </motion.div>
                           )}
                           </AnimatePresence>
                        </motion.div>
                     ))}
                  </div>

                 
               </div>
            </div>
         </section>

         {/* Video Modal */}
         {isVideoOpen && selectedVideo && (
            <div className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 pt-20 sm:pt-20 md:pt-24 lg:pt-24 xl:pt-28'>
               <div className='relative w-full max-w-4xl aspect-video'>
                  <Button
                     onClick={closeVideo}
                     className='absolute -top-12 right-0 bg-white text-black hover:bg-gray-100'
                  >
                     Aizvērt
                  </Button>
                  <iframe
                     src={selectedVideo.url}
                     title={selectedVideo.title}
                     className='w-full h-full rounded-lg'
                     allowFullScreen
                  />
               </div>
            </div>
         )}
      </>
   )
}