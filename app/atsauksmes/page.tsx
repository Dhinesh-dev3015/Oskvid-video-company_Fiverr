"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, MessageCircle, Quote, Star } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { DynamicContent, DynamicImage } from "@/components/dynamic-content";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  source: string;
  rating: number;
  image?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Linda",
    role: "līgava",
    content:
      "Milzīgs paldies par mūsu īpašās dienas iemūžināšanu. Video atspoguļo mūsu kāzu dienas spilgtākos momentus un sajūtas - no svinīguma asarām par JĀ vārda teikšanu uz mūžu līdz pat ugunīgam dejām uz deju grīdas!",
    source: "Facebook",
    rating: 5,
  },
  {
    id: 2,
    name: "Ieva",
    role: "līgava",
    content:
      "Milzīgs paldies Aināram par mūsu kāzu īpašo mirkļu iemūžināšanu! Vētrainais 29.jūlijs noteikti bija izaicinājums ikvienam, taču Aināra humors, profesionalitāte un pieredze radīja nepiespiestu gaisotni.",
    source: "Facebook",
    rating: 5,
  },
  {
    id: 3,
    name: "Saiva",
    role: "līgava",
    content:
      "Sirsnīgs paldies BalticWedding, ka bijāt mūsu kāzu dienā un iemūžinājāt labākos mirkļus. Filmu un foto kvalitāte burvīga - operators Ainārs nu tāds foršais, ar superīgu humora izjūtu.",
    source: "Facebook",
    rating: 5,
  },
  {
    id: 4,
    name: "Jolanta",
    role: "līgava",
    content:
      "Doms priekš kāzu video ir must have! Paldies Aināram par šo ideju! Ļoti labi samontēts un arī atbilstošā mūzika pareizajām vietām! Patika arī mazais video priekš social network!",
    source: "Facebook",
    rating: 5,
  },
  {
    id: 5,
    name: "Mārtiņš",
    role: "līgavainis",
    content:
      "Plānojot mūsu kāzu dienu, meklējām cilvēkus, kas padarītu Mūsu īpašo dienu krāšņāku un kolorītu. Komunikācija ar Aināru bija viegla, vienmēr viss bija augstākā līmenī.",
    source: "Facebook",
    rating: 5,
  },
  {
    id: 6,
    name: "Laura",
    role: "līgava",
    content:
      "Lielisks foto/video duets. Liks justies brīvi, kā arī radīs piemērotu atmosfēru, lai kadri sanāktu brīvi un nesamāksloti. Pozitīvs piedzīvojums ar lielisku rezultātu!",
    source: "Facebook",
    rating: 5,
  },
  {
    id: 7,
    name: "Klients",
    role: "",
    content: "Izcils serviss un profesionāla pieeja!",
    source: "",
    rating: 5,
  },
  {
    id: 8,
    name: "Klients",
    role: "",
    content: "Ļoti iesaku Osk Vid komandu!",
    source: "",
    rating: 5,
  },
];

const DEFAULT_CTA_URL = "https://share.google/WivDfBdEPoloDPwV0";

export default function ReviewsPage() {
  const { language } = useLanguage();
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(defaultTestimonials);
  const [ctaUrl, setCtaUrl] = useState(DEFAULT_CTA_URL);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadDynamicContent = () => {
      const contentSuffix = language === "en" ? "En" : "Lv";

      const updatedTestimonials = defaultTestimonials.map(
        (testimonial, index) => {
          const testimonialNumber = index + 1;
          const name =
            localStorage.getItem(
              `content_testimonial${testimonialNumber}Name`,
            ) || testimonial.name;
          const role =
            localStorage.getItem(
              `content_testimonial${testimonialNumber}Role`,
            ) || testimonial.role;
          const content =
            localStorage.getItem(
              `content_testimonial${testimonialNumber}Content${contentSuffix}`,
            ) ||
            localStorage.getItem(
              `content_testimonial${testimonialNumber}ContentLv`,
            ) ||
            testimonial.content;
          const source =
            localStorage.getItem(
              `content_testimonial${testimonialNumber}Source`,
            ) || testimonial.source;
          const image =
            localStorage.getItem(
              `content_testimonial${testimonialNumber}Image`,
            ) || "";

          return {
            ...testimonial,
            name,
            role,
            content,
            source,
            image,
          };
        },
      );

      setTestimonials(updatedTestimonials);

      const savedCtaUrl = localStorage.getItem("content_reviewsPageCtaUrl");
      if (savedCtaUrl) {
        setCtaUrl(savedCtaUrl);
      }
    };

    loadDynamicContent();

    const handleContentUpdate = (event?: CustomEvent) => {
      if (event?.detail?.key === "reviewsPageCtaUrl" && event.detail.value) {
        setCtaUrl(event.detail.value);
      }
      loadDynamicContent();
    };

    if (typeof window !== "undefined") {
      window.addEventListener(
        "contentUpdated",
        handleContentUpdate as EventListener,
      );
    }

    return () => {
      if (typeof window !== "undefined") {
        try {
          window.removeEventListener(
            "contentUpdated",
            handleContentUpdate as EventListener,
          );
        } catch (error) {
          console.warn("Error removing event listeners:", error);
        }
      }
    };
  }, [language]);

  const scrollToTestimonials = () => {
    const testimonialsSection = document.getElementById("testimonials-section");
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[55vh] overflow-hidden pt-20"
      >
        <motion.div className="absolute inset-0">
          <DynamicImage
            contentKey="reviewsPageHeroImage"
            fallback="/images/wedding-couple-church.jpeg"
            alt="Wedding couple"
            fill
            className="object-cover"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-wider"
            style={{ fontFamily: "serif" }}
          >
            <DynamicContent
              as="span"
              contentKey="reviewsPageHeroTitle"
              fallback="ATSAUKSMES"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl"
          >
            <DynamicContent
              as="span"
              contentKey="reviewsPageHeroSubtitle"
              fallback="Klientu atsauksmes par sadarbību ar Osk Vid"
            />
          </motion.p>

          <motion.button
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={scrollToTestimonials}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white hover:text-[#cc5339] transition-colors cursor-pointer"
            aria-label="Ritināt uz atsauksmēm"
          >
            <ChevronDown className="w-8 h-8 animate-bounce" />
          </motion.button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials-section" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.id}
                initial={{ opacity: 1, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-8 relative overflow-hidden"
              >
                <div className="absolute top-2 left-4 text-6xl text-gray-200 font-serif leading-none select-none">
                  <Quote />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#4a7c9b] flex items-center justify-center">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold text-lg">
                          {getInitials(testimonial.name)}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 pt-0.5">
                      <h3 className="text-base font-semibold text-gray-800">
                        {testimonial.name}
                        {testimonial.role && (
                          <span className="text-gray-500 font-normal">
                            , {testimonial.role}
                          </span>
                        )}
                        <span className="ml-1">😊</span>
                      </h3>

                      <div
                        className="flex items-center gap-0.5 mt-1"
                        aria-hidden="true"
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {testimonial.content}
                  </p>

                  {testimonial.source && (
                    <p className="text-xs text-gray-400 mt-3">
                      {testimonial.source}
                    </p>
                  )}
                </div>

                <div className="absolute bottom-2 right-4 text-6xl text-gray-200 font-serif leading-none select-none">
                  <Quote />
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 text-center"
          >
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#2d4a3e] hover:bg-[#3d5a4e] text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>
                <DynamicContent
                  as="span"
                  contentKey="reviewsPageCtaText"
                  fallback="ATSTĀT ATSAUKSMES"
                />
              </span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
