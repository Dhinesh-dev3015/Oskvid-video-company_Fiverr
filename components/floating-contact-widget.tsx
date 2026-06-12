"use client"

import { useState } from "react"

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleWidget = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 safe-area-bottom safe-area-right">
      <div className="relative">
        {/* Main Contact Button */}
        <button
          onClick={toggleWidget}
          className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 touch-target ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-label={isOpen ? "Close contact options" : "Open contact options"}
        >
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 text-black transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>

        {/* Contact Options */}
        <div
          className={`absolute bottom-16 sm:bottom-20 right-0 transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-2 sm:gap-3">
            {/* Phone Call */}
            <a
              href="tel:+37123304329"
              className="flex items-center gap-2 sm:gap-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-2 sm:p-3 hover:scale-105 group/item touch-target min-h-[48px] sm:min-h-[56px]"
              aria-label="Call us at +371 23304329"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div
                className={`pr-2 sm:pr-4 transition-opacity duration-300 whitespace-nowrap ${
                  isOpen ? "opacity-100" : "opacity-0 group-hover/item:opacity-100"
                }`}
              >
                <p className="text-xs sm:text-sm font-semibold text-gray-900">Zvanīt</p>
                <p className="text-xs text-gray-500 hidden sm:block">23304329</p>
              </div>
            </a>

            {/* Email/Contact Form */}
            <a
              href="/oskvid-kontakti"
              className="flex items-center gap-2 sm:gap-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-2 sm:p-3 hover:scale-105 group/item touch-target min-h-[48px] sm:min-h-[56px]"
              aria-label="Go to contact form"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div
                className={`pr-2 sm:pr-4 transition-opacity duration-300 whitespace-nowrap ${
                  isOpen ? "opacity-100" : "opacity-0 group-hover/item:opacity-100"
                }`}
              >
                <p className="text-xs sm:text-sm font-semibold text-gray-900">Saziņa</p>
                <p className="text-xs text-gray-500 hidden sm:block">Kontaktu forma</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/37123304329?text=Sveiki! Es vēlētos uzzināt vairāk par jūsu video pakalpojumiem."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-2 sm:p-3 hover:scale-105 group/item touch-target min-h-[48px] sm:min-h-[56px]"
              aria-label="Contact us via WhatsApp"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </div>
              <div
                className={`pr-2 sm:pr-4 transition-opacity duration-300 whitespace-nowrap ${
                  isOpen ? "opacity-100" : "opacity-0 group-hover/item:opacity-100"
                }`}
              >
                <p className="text-xs sm:text-sm font-semibold text-gray-900">WhatsApp</p>
                <p className="text-xs text-gray-500 hidden sm:block">Ātrs ziņojums</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
