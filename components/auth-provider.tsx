"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  user: string | null
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") return

    try {
      const storedUser = localStorage.getItem("cms_user")
      setUser(storedUser)
      setIsLoading(false)

      // Redirect logic with timeout to prevent race conditions
      setTimeout(() => {
        if (!storedUser && pathname !== "/admin/login") {
          router.push("/admin/login")
        } else if (storedUser && pathname === "/admin/login") {
          router.push("/admin/simple-cms")
        }
      }, 0)
    } catch (error) {
      console.warn("Error in auth logic:", error)
      setIsLoading(false)
    }
  }, [pathname, router])

  const login = (username: string) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cms_user", username)
        setUser(username)
        router.push("/admin/simple-cms")
      }
    } catch (error) {
      console.warn("Error during login:", error)
    }
  }

  const logout = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("cms_user")
        setUser(null)
        router.push("/admin/login")
      }
    } catch (error) {
      console.warn("Error during logout:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-orange-500 rounded-lg animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Ielādē...</p>
        </div>
      </div>
    )
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
