"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  ImageIcon,
  LogOut,
  Menu,
  X,
  Settings,
  ExternalLink,
  HelpCircle,
  Edit,
  Layers,
  Sparkles,
  Crown,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      description: "Overview and analytics",
      badge: "Home",
    },
    {
      name: "Content Editor",
      href: "/admin/simple-editor",
      icon: Edit,
      description: "Manage website content",
      badge: "Editor",
    },
    {
      name: "Media Library",
      href: "/admin/simple-media",
      icon: ImageIcon,
      description: "Images and videos",
      badge: "Media",
    },
    {
      name: "Page Builder",
      href: "/admin/simple-builder",
      icon: Layers,
      description: "Create custom pages",
      badge: "Builder",
    },
    {
      name: "Design System",
      href: "/admin/design",
      icon: Palette,
      description: "Colors and styling",
      badge: "Design",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      description: "System preferences",
      badge: "Config",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-orange-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-orange-200/50 transform transition-transform duration-300 ease-out lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Premium Header */}
          <div className="relative h-20 px-6 border-b border-orange-200/50 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10" />
            <div className="relative flex items-center justify-between h-full">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white tracking-tight">OSKVID</h1>
                  <p className="text-xs text-orange-100 font-medium">Content Management</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-orange-100 hover:text-white hover:bg-white/10 rounded-lg"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* User Profile */}
          <div className="px-6 py-6 border-b border-orange-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full flex items-center justify-center shadow-inner ring-2 ring-orange-200/50">
                <span className="text-orange-800 font-bold text-lg">A</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">Administrator</p>
                <p className="text-xs text-orange-600 flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Premium Access
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={cn(
                        "group relative flex items-center px-4 py-3.5 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-orange-50 to-amber-50 text-slate-900 shadow-sm border border-orange-200/50"
                          : "text-slate-600 hover:bg-orange-50 hover:text-slate-900",
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-r-full" />
                      )}

                      <div
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-lg mr-4 transition-colors",
                          isActive
                            ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md"
                            : "bg-orange-100 text-orange-600 group-hover:bg-orange-200 group-hover:text-orange-700",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p
                            className={cn(
                              "text-sm font-semibold truncate",
                              isActive ? "text-slate-900" : "text-slate-700",
                            )}
                          >
                            {item.name}
                          </p>
                          <span
                            className={cn(
                              "text-xs px-2 py-1 rounded-md font-medium",
                              isActive
                                ? "bg-orange-100 text-orange-700"
                                : "bg-orange-100 text-orange-600 group-hover:bg-orange-200",
                            )}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-4 border-t border-orange-100 bg-orange-50/50">
            <div className="space-y-2">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm h-10 bg-white hover:bg-orange-50 border-orange-200"
                >
                  <ExternalLink className="h-4 w-4 mr-3" />
                  View Live Site
                </Button>
              </a>
              <Button
                variant="outline"
                className="w-full justify-start text-sm h-10 bg-white hover:bg-orange-50 border-orange-200"
              >
                <HelpCircle className="h-4 w-4 mr-3" />
                Help & Support
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-orange-100">
            <Link href="/admin/login">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm text-slate-600 hover:text-slate-900 hover:bg-orange-100 rounded-lg"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Mobile header */}
        <div className="lg:hidden bg-white/95 backdrop-blur-xl shadow-sm border-b border-orange-200/50 px-4 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="hover:bg-orange-100 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Crown className="h-4 w-4 text-white" />
              </div>
              <h1 className="font-bold text-slate-900">OSKVID CMS</h1>
            </div>
            <div className="w-10"></div>
          </div>
        </div>

        {/* Page content with refined spacing */}
        <main className="p-6 lg:p-8 pb-24 min-h-screen">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
