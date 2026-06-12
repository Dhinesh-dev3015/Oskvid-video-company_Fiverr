"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, ChevronDown } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { OptimizedImage } from "@/components/optimized-image"

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [showPortfolioDropdown, setShowPortfolioDropdown] = React.useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    // Only add event listener if window exists
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (typeof window !== "undefined") {
        try {
          window.removeEventListener("scroll", handleScroll)
        } catch (error) {
          console.warn("Error removing scroll listener:", error)
        }
      }
    }
  }, [])

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const routes = [
    { href: "/", label: "Sākums" },
    { href: "/kazu-blogs", label: "Blogs" },
    { href: "/video-filmesana", label: "Pakalpojumi" },
    { href: "/par-oskvid", label: "Par mums" },
    { href: "/portfolio", label: "Portfolio", hasDropdown: true },
    { href: "/atsauksmes", label: "Atsauksmes" },
    { href: "/oskvid-kontakti", label: "Kontakti" },
  ]

  const portfolioItems = [
    { href: "/portfolio/kazu-video-latvija", label: t("portfolioItems.weddings") || "Weddings" },
    { href: "/portfolio/reklamas-video", label: t("portfolioItems.promotional") || "Promotional Videos" },
  ]
  
  
  const handleMouseEnter = () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
        dropdownTimeoutRef.current = null
      }
      setShowPortfolioDropdown(true)
    }
  
    const handleMouseLeave = () => {
      dropdownTimeoutRef.current = setTimeout(() => {
        setShowPortfolioDropdown(false)
      }, 150) // Adjust this value if you want it faster/slower (150–300ms feels natural)
    }
  
    // Cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (dropdownTimeoutRef.current) {
          clearTimeout(dropdownTimeoutRef.current)
        }
      }
    }, [])
  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-black/20 backdrop-blur-sm",
      )}
    >
      <div className="container mx-auto flex h-16 sm:h-18 md:h-20 lg:h-22 xl:h-24 items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-8xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-10 touch-target">
          <div className="relative h-12 w-28 sm:h-16 sm:w-36 md:h-18 md:w-40 lg:h-20 lg:w-44 xl:h-22 xl:w-48 overflow-visible">
            <OptimizedImage
              src="/oskvid-logo-new.png"
              alt="OSKVID Videography Logo"
              width={208}
              height={88}
              priority
              className="object-contain transition-all duration-300"
              style={{
                filter: scrolled ? "contrast(1.1) brightness(1.05)" : "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
              }}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {routes.map((route) => {
              const isActive = pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href))

              if (route.hasDropdown) {
                return (
                  <li
                    key={route.href}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter()}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    <Link
                      href={route.href}
                      className={cn(
                        "flex cursor-pointer items-center text-sm font-medium transition-all duration-200 relative py-2",
                        isActive
                          ? "text-[#cc5339] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#cc5339] after:rounded-full"
                          : scrolled
                            ? "text-gray-700 hover:text-[#cc5339]"
                            : "text-white hover:text-[#cc5339]",
                      )}
                    >
                      {route.label}
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" />
                    </Link>

                    {/* Dropdown Menu */}
                    <div
                      className={cn(
                        "absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 transition-all duration-200 z-50",
                        showPortfolioDropdown
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none",
                      )}
                    >
                      {portfolioItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "block px-4 py-2 text-sm transition-colors duration-150",
                            pathname === item.href
                              ? "text-[#cc5339] bg-orange-50 font-medium"
                              : "text-gray-700 hover:text-[#cc5339] hover:bg-gray-50",
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                )
              }

              return (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={cn(
                      "text-sm font-medium transition-all duration-200 relative py-2",
                      isActive
                        ? "text-[#cc5339] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#cc5339] after:rounded-full"
                        : scrolled
                          ? "text-gray-700 hover:text-[#cc5339]"
                          : "text-white hover:text-[#cc5339]",
                    )}
                  >
                    {route.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "transition-colors duration-200 touch-target h-11 w-11 sm:h-12 sm:w-12",
                  scrolled ? "text-gray-700 hover:text-[#cc5339]" : "text-white hover:text-[#cc5339]",
                )}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:w-80 border-l border-gray-200 bg-white p-0 safe-area-top safe-area-right safe-area-bottom">
              {/* Mobile Menu Header */}
              <div className="flex h-16 sm:h-18 items-center justify-between px-4 sm:px-6 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-2 touch-target" onClick={() => setIsOpen(false)}>
                  <div className="relative h-10 sm:h-12 w-24 sm:w-32 overflow-visible">
                    <OptimizedImage
                      src="/oskvid-logo-new.png"
                      alt="OSKVID Videography Logo"
                      width={128}
                      height={56}
                      priority
                      className="object-contain"
                    />
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-[#cc5339] touch-target h-11 w-11"
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex flex-col px-4 sm:px-6 py-6 scroll-smooth-mobile overflow-y-auto max-h-[calc(100vh-100px)]">
                <nav className="flex flex-col gap-1">
                  {routes.map((route) => {
                    const isActive = pathname === route.href || (route.href !== "/" && pathname.startsWith(route.href))

                    if (route.hasDropdown) {
                      return (
                        <div key={route.href} className="space-y-2">
                          <Link
                            href={route.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex cursor-pointer items-center justify-between rounded-lg px-4 py-4 text-base font-medium transition-colors duration-150 touch-target min-h-[56px]",
                              isActive
                                ? "text-[#cc5339] bg-orange-50 border-l-4 border-[#cc5339]"
                                : "text-gray-700 hover:bg-gray-50 hover:text-[#cc5339]",
                            )}
                          >
                            {route.label}
                            <ChevronDown className="h-4 w-4" />
                          </Link>
                          <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
                            {portfolioItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "block rounded-lg px-4 py-3 text-sm transition-colors duration-150 touch-target min-h-[48px] flex items-center",
                                  pathname === item.href
                                    ? "text-[#cc5339] bg-orange-50 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-[#cc5339]",
                                )}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    }

                    return (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "rounded-lg px-4 py-4 text-base font-medium transition-colors duration-150 touch-target min-h-[56px] flex items-center",
                          isActive
                            ? "text-[#cc5339] bg-orange-50 border-l-4 border-[#cc5339]"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#cc5339]",
                        )}
                      >
                        {route.label}
                      </Link>
                    )
                  })}
                </nav>

                {/* Mobile CTA Button */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Button asChild className="w-full bg-[#cc5339] hover:bg-[#b8472f] text-white font-medium touch-target-large min-h-[56px] text-base">
                    <Link href="/oskvid-kontakti" onClick={() => setIsOpen(false)}>
                      Sākt projektu
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
