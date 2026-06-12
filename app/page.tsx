"use client";

import { DynamicContent, DynamicImage } from "@/components/dynamic-content";
import { Button } from "@/components/ui/button";
import HeroVideo from "@/components/hero-video";
import { useLanguage } from "@/contexts/language-context";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Home() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Use window scroll instead of target to avoid positioning warnings
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
          <div className="h-full w-full  relative bg-black">
            <HeroVideo
              contentKey="homeHeroBackgroundImage"
              fallback="/images/videographer-sunset.jpeg"
              className="w-full h-full self-stretch"
            />
          </div>
        </motion.div>

        <div className="container-mobile-padding relative z-10 mx-auto max-w-8xl">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-4xl text-center px-4 sm:px-6"
          >
            <DynamicContent
              contentKey="homeHeroMainTitle"
              fallback="Profesionāla Video Ražošana"
              className="mb-3 sm:mb-4 text-mobile-title text-[#cc5339] leading-tight"
              as="h1"
            />
            <DynamicContent
              contentKey="homeHeroDescription"
              fallback="Mēs specializējamās kāzu, mūzikas video, korparatīvo un reklāmas video ražošanā ar vairāk nekā 8 gadu pieredzi. Radām kvalitatīvus video risinājumus, kas palīdz jūsu stāstam sasniegt auditoriju."
              className="text-mobile-body text-white text-shadow-glow max-w-3xl mx-auto"
              as="p"
            />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex animate-bounce cursor-pointer items-center justify-center rounded-full bg-gray-200/80 p-3 sm:p-4 backdrop-blur-sm touch-target"
            onClick={() => {
              document
                .getElementById("services-preview")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-gray-700"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section
        id="services-preview"
        className="section-mobile-padding bg-white"
      >
        <div className="container-mobile-padding mx-auto max-w-8xl">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="section-header mx-auto max-w-4xl text-center"
          >
            <DynamicContent
              contentKey="homeServicesTitle"
              fallback="Mūsu Pakalpojumi"
              className="section-title text-mobile-title text-[#cc5339]"
              as="h2"
            />
            <DynamicContent
              contentKey="homeServicesDescription"
              fallback="Piedāvājam pilnu video ražošanas pakalpojumu spektru - no kāzu filmēšanas līdz korparatīvajiem projektiem un reklāmas video."
              className="text-mobile-body text-gray-600 max-w-3xl mx-auto"
              as="p"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto grid-spacing">
            {[
              {
                titleKey: "homeServiceWeddingTitle",
                title: "Kāzu Filmēšana",
                imageKey: "homeServiceWeddingImage",
                image: "/images/wedding-couple-church.jpeg",
                href: "/portfolio/kazu-video-latvija",
                delay: 0,
              },
              {
                titleKey: "homeServicePromoTitle",
                title: "Korporatīvie  Video",
                imageKey: "homeServicePromoImage",
                image: "/images/professional-equipment.jpeg",
                href: "/portfolio/reklamas-video",
                delay: 0.2,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: service.delay }}
              >
                <Link
                  href={service.href}
                  className="group block relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: "100%",
                      height: "100%",
                      aspectRatio: "6/4",
                    }}
                  >
                    <DynamicImage
                      contentKey={service.imageKey}
                      fallback={service.image}
                      alt={service.title}
                      fill
                      priority={index === 0}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      objectPosition="center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute inset-0 flex items-end justify-center p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="text-center">
                        <DynamicContent
                          contentKey={service.titleKey}
                          fallback={service.title}
                          className="text-lg sm:text-xl font-bold text-white section-title mb-3 sm:mb-4"
                          as="h3"
                        />
                        <div className="inline-flex items-center text-white/90 text-sm font-medium">
                          Uzzināt vairāk
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-2 transition-transform group-hover:translate-x-1"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <DynamicContent
                      contentKey={service.titleKey}
                      fallback={service.title}
                      className="text-lg sm:text-xl font-bold text-center text-gray-900 group-hover:text-primary transition-colors duration-300"
                      as="h3"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Button
              asChild
              size="lg"
              className="mt-8 sm:mt-10 lg:mt-12 text-base bg-[#cc5339] hover:bg-[#b8472f] text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 hover:shadow-[#cc5339]/50 touch-target-large"
            >
              <Link href="/portfolio">
                <DynamicContent
                  contentKey="homeServicesButtonText"
                  fallback="Skatīt Portfolio"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="section-mobile-padding bg-gray-50">
        <div className="container-mobile-padding mx-auto max-w-8xl">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="section-header mx-auto max-w-4xl text-center"
          >
            <DynamicContent
              contentKey="homeWhyChooseUsTitle"
              fallback="Kāpēc Izvēlēties Mūs?"
              className="section-title text-mobile-title text-[#cc5339]"
              as="h2"
            />
            <DynamicContent
              contentKey="homeWhyChooseUsDescription"
              fallback="Mēs apvienojam radošumu ar tehnisko prasmi, lai radītu kvalitatīvus video risinājumus, kas palīdz jūsu stāstam sasniegt auditoriju."
              className="text-mobile-body text-gray-600 max-w-3xl mx-auto"
              as="p"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto grid-spacing">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                    <path d="M12 2v2"></path>
                    <path d="M12 22v-2"></path>
                    <path d="m17 20.66-1-1.73"></path>
                    <path d="M11 10.27 7 3.34"></path>
                    <path d="m20.66 17-1.73-1"></path>
                    <path d="m3.34 7 1.73 1"></path>
                    <path d="M14 12h8"></path>
                    <path d="M2 12h2"></path>
                    <path d="m20.66 7-1.73 1"></path>
                    <path d="m3.34 17 1.73-1"></path>
                    <path d="m17 3.34-1 1.73"></path>
                    <path d="m7 20.66 1-1.73"></path>
                  </svg>
                ),
                titleKey: "homeFeatureCreativeTitle",
                title: "Radoša Pieeja",
                descriptionKey: "homeFeatureCreativeDescription",
                description:
                  "Katrs projekts tiek veidots ar individuālu pieeju un radošu vīziju.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                ),
                titleKey: "homeFeatureQualityTitle",
                title: "Augsta Kvalitāte",
                descriptionKey: "homeFeatureQualityDescription",
                description:
                  "Izmantojam profesionālu aprīkojumu un jaunākās tehnoloģijas.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                ),
                titleKey: "homeFeaturePersonalizedTitle",
                title: "Personalizēta Pieeja",
                descriptionKey: "homeFeaturePersonalizedDescription",
                description:
                  "Katrs klients saņem individuālu uzmanību un personalizētu servisu.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="3"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="3" x2="21" y1="9" y2="9"></line>
                    <line x1="3" x2="21" y1="15" y2="15"></line>
                    <line x1="9" x2="9" y1="3" y2="21"></line>
                    <line x1="15" x2="15" y1="3" y2="21"></line>
                  </svg>
                ),
                titleKey: "homeFeatureExperienceTitle",
                title: "Pieredze",
                descriptionKey: "homeFeatureExperienceDescription",
                description:
                  "Vairāk nekā 8 gadu pieredze video ražošanas jomā.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <path d="M12 8v4l3 3"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                ),
                titleKey: "homeFeatureTimelyTitle",
                title: "Precīzs Grafiks",
                descriptionKey: "homeFeatureTimelyDescription",
                description:
                  "Visi projekti tiek nodoti noteiktajā laikā bez kompromisiem kvalitātē.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"></path>
                    <path d="m12 12 4 10 1.7-4.3L22 16Z"></path>
                  </svg>
                ),
                titleKey: "homeFeatureStorytellingTitle",
                title: "Stāstījums",
                descriptionKey: "homeFeatureStorytellingDescription",
                description:
                  "Katrs video stāsta unikālu stāstu, kas rezonē ar auditoriju.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-4 sm:p-6 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="mb-3 sm:mb-4 rounded-full bg-primary/10 p-2 sm:p-3 text-primary">
                  {feature.icon}
                </div>
                <DynamicContent
                  contentKey={feature.titleKey}
                  fallback={feature.title}
                  className="section-title mb-3 sm:mb-4 text-mobile-subtitle font-bold text-[#cc5339]"
                  as="h3"
                />
                <DynamicContent
                  contentKey={feature.descriptionKey}
                  fallback={feature.description}
                  className="text-mobile-body text-gray-600"
                  as="p"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-mobile-padding bg-white">
        <div className="container-mobile-padding mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="section-header mx-auto max-w-3xl text-center"
          >
            <DynamicContent
              contentKey="homeProcessTitle"
              fallback="Mūsu Darba Process"
              className="section-title text-mobile-title text-[#cc5339]"
              as="h2"
            />
            <DynamicContent
              contentKey="homeProcessDescription"
              fallback="Mēs sekojam struktūrētam procesam, lai nodrošinātu labāko rezultātu jūsu projektam."
              className="text-mobile-body text-gray-600"
              as="p"
            />
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent"></div>

            {[
              {
                number: "01",
                titleKey: "homeProcessStep1Title",
                title: "Konsultācija",
                descriptionKey: "homeProcessStep1Description",
                description:
                  "Apspriežam jūsu vīziju, mērķus un projekta prasības detalizēti.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                ),
              },
              {
                number: "02",
                titleKey: "homeProcessStep2Title",
                title: "Plānošana",
                descriptionKey: "homeProcessStep2Description",
                description:
                  "Izstrādājam detalizētu scenāriju, lokāciju plānu un grafiku.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                ),
              },
              {
                number: "03",
                titleKey: "homeProcessStep3Title",
                title: "Ražošana",
                descriptionKey: "homeProcessStep3Description",
                description:
                  "Profesionāla filmēšana ar augstākās kvalitātes aprīkojumu.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  >
                    <path d="m22 8-6 4 6 4V8Z"></path>
                    <rect
                      width="14"
                      height="12"
                      x="2"
                      y="6"
                      rx="2"
                      ry="2"
                    ></rect>
                  </svg>
                ),
              },
              {
                number: "04",
                titleKey: "homeProcessStep4Title",
                title: "Post-ražošana",
                descriptionKey: "homeProcessStep4Description",
                description:
                  "Profesionāla montāža, krāsu korekcija un audio apstrāde.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  >
                    <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0 -2 2v4"></path>
                    <path d="M14 2v6h6"></path>
                    <path d="m3 15 2 2 4-4"></path>
                  </svg>
                ),
              },
              {
                number: "05",
                titleKey: "homeProcessStep5Title",
                title: "Nodošana",
                descriptionKey: "homeProcessStep5Description",
                description:
                  "Finālā video piegāde visās nepieciešamajās versijās un formātos.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" x2="12" y1="15" y2="3"></line>
                  </svg>
                ),
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative process-step flex ${index % 2 === 0 ? "md:justify-end" : ""}`}
              >
                <div
                  className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right" : ""}`}
                >
                  <div className="relative">
                    <div
                      className={`absolute flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-md ${
                        index % 2 === 0
                          ? "left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-1/2"
                          : "left-1/2 -translate-x-1/2 md:left-0 md:-translate-x-1/2"
                      }`}
                      style={{ top: "0" }}
                    >
                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100 text-primary">
                        {step.icon}
                      </div>
                    </div>

                    <div
                      className={`process-step-content px-2 sm:px-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}
                    >
                      <span className="mb-1 block text-sm font-bold text-[#cc5339]">
                        {step.number}
                      </span>
                      <DynamicContent
                        contentKey={step.titleKey}
                        fallback={step.title}
                        className="section-title mb-3 sm:mb-4 text-mobile-subtitle font-bold text-gray-900"
                        as="h3"
                      />
                      <DynamicContent
                        contentKey={step.descriptionKey}
                        fallback={step.description}
                        className="text-mobile-body text-gray-600"
                        as="p"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-mobile-padding relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-gray-100 relative">
            <DynamicImage
              contentKey="homeCtaBackgroundImage"
              fallback="/images/professional-equipment.jpeg"
              alt="Professional video equipment"
              fill
              className="object-cover opacity-30"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
        </div>
        <div className="container-mobile-padding relative z-10 mx-auto max-w-7xl">
          {/* Statistics Section */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="section-header mx-auto max-w-4xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 text-center grid-spacing">
              <Link href="/par-oskvid">
                <motion.div
                  initial={{ opacity: 1, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 hover:shadow-2xl hover:scale-105 hover:bg-white/90 transition-all duration-300 group cursor-pointer"
                >
                  <DynamicContent
                    contentKey="homeStat1Number"
                    fallback="14+"
                    className="text-responsive-3xl font-bold text-[#cc5339] mb-2 group-hover:text-[#b8472f] transition-colors duration-300"
                    as="div"
                  />
                  <DynamicContent
                    contentKey="homeStat1Label"
                    fallback="Gadu pieredze"
                    className="text-mobile-small text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300"
                    as="div"
                  />
                </motion.div>
              </Link>
              <Link href="/portfolio">
                <motion.div
                  initial={{ opacity: 1, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 hover:shadow-2xl hover:scale-105 hover:bg-white/90 transition-all duration-300 group cursor-pointer"
                >
                  <DynamicContent
                    contentKey="homeStat2Number"
                    fallback="800+"
                    className="text-responsive-3xl font-bold text-[#cc5339] mb-2 group-hover:text-[#b8472f] transition-colors duration-300"
                    as="div"
                  />
                  <DynamicContent
                    contentKey="homeStat2Label"
                    fallback="Pabeigtie projekti"
                    className="text-mobile-small text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300"
                    as="div"
                  />
                </motion.div>
              </Link>
              <Link href="/video-filmesana">
                <motion.div
                  initial={{ opacity: 1, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 hover:shadow-2xl hover:scale-105 hover:bg-white/90 transition-all duration-300 group cursor-pointer"
                >
                  <DynamicContent
                    contentKey="homeStat3Number"
                    fallback="100%"
                    className="text-responsive-3xl font-bold text-[#cc5339] mb-2 group-hover:text-[#b8472f] transition-colors duration-300"
                    as="div"
                  />
                  <DynamicContent
                    contentKey="homeStat3Label"
                    fallback="Projekti nodoti laicīgi"
                    className="text-mobile-small text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300"
                    as="div"
                  />
                </motion.div>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <DynamicContent
              contentKey="homeCtaTitle"
              fallback="Gatavi īstenot savu vīziju dzīvē?"
              className="section-title text-mobile-title text-[#cc5339]"
              as="h2"
            />
            <DynamicContent
              contentKey="homeCtaDescription"
              fallback="Ar vairāk nekā astoņu gadu pieredzi un vairāk nekā 800 pabeigtiem projektiem mums ir zināšanas, lai pārvērstu jūsu idejas aizraujošos vizulālos stāsos."
              className="section-description text-mobile-body text-gray-700"
              as="p"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
