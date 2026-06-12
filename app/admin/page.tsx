"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  ImageIcon,
  Video,
  Layout,
  LogOut,
  Users,
  Eye,
  Clock,
  Sparkles,
  ArrowRight,
  Activity,
  Calendar,
  Crown,
  Palette,
  Edit3,
  Zap,
  TrendingUp,
} from "lucide-react"

export default function AdminDashboard() {
  const [user, setUser] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalPages: 12,
    totalImages: 48,
    totalVideos: 6,
    totalEdits: 156,
    lastUpdate: "Today",
    activeUsers: 1,
  })
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("cms_user")
    if (!storedUser) {
      router.push("/admin/login")
      return
    }
    else{
      router.push("/admin/simple-cms")
      return
    }
    setUser(storedUser)

    // Load stats from API
    const loadStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (response.ok) {
          const apiStats = await response.json()
          setStats((prev) => ({
            ...prev,
            ...apiStats,
          }))
        }
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("cms_user")
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
          <p className="text-slate-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const adminTools = [
    {
      title: "Content Editor",
      description: "Edit website text and content with precision",
      icon: Edit3,
      href: "/admin/simple-editor",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      stats: "12 sections",
      premium: true,
    },
    {
      title: "Media Library",
      description: "Professional image and video management",
      icon: ImageIcon,
      href: "/admin/simple-media",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      stats: `${stats.totalImages} files`,
      premium: true,
    },
    {
      title: "Page Builder",
      description: "Visual page creation with drag & drop",
      icon: Layout,
      href: "/admin/simple-builder",
      color: "from-orange-600 to-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      stats: "Visual editor",
      premium: false,
    },
    {
      title: "Design System",
      description: "Customize colors, fonts, and styling",
      icon: Palette,
      href: "/admin/design",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      stats: "Theme editor",
      premium: true,
    },
  ]

  const quickStats = [
    {
      label: "Content Pages",
      value: stats.totalPages,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: "+2 this week",
      trend: "up",
    },
    {
      label: "Media Assets",
      value: stats.totalImages + stats.totalVideos,
      icon: ImageIcon,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      change: "+8 this week",
      trend: "up",
    },
    {
      label: "Total Edits",
      value: stats.totalEdits,
      icon: Activity,
      color: "text-red-600",
      bgColor: "bg-red-100",
      change: "+12 today",
      trend: "up",
    },
    {
      label: "Active Sessions",
      value: stats.activeUsers,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "Online now",
      trend: "stable",
    },
  ]

  const recentActivity = [
    {
      action: "Updated homepage hero section",
      time: "2 hours ago",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      type: "content",
    },
    {
      action: "Added new portfolio images",
      time: "5 hours ago",
      icon: ImageIcon,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      type: "media",
    },
    {
      action: "Updated showreel video",
      time: "Yesterday",
      icon: Video,
      color: "text-red-600",
      bgColor: "bg-red-50",
      type: "media",
    },
    {
      action: "Modified contact section",
      time: "2 days ago",
      icon: Layout,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      type: "layout",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl" />
        <div className="relative px-8 py-12 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20">
                  <Crown className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user}</h1>
                  <p className="text-orange-100 text-lg">Premium content management at your fingertips</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-orange-300" />
                  <span>Last updated: {stats.lastUpdate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-orange-300" />
                  <span>{stats.totalEdits} total edits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-orange-300" />
                  <span>Premium features enabled</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {adminTools.map((tool, index) => (
          <Card
            key={index}
            className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:scale-[1.02]"
            onClick={() => router.push(tool.href)}
          >
            <div className="relative">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <tool.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-xl text-slate-900 group-hover:text-slate-800 transition-colors">
                          {tool.title}
                        </CardTitle>
                        {tool.premium && (
                          <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200 text-xs">
                            <Crown className="h-3 w-3 mr-1" />
                            Pro
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-slate-600 mt-1">{tool.description}</CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`${tool.bgColor} ${tool.textColor} border-0 font-medium`}>
                    {tool.stats}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-orange-50 text-orange-600"
                  >
                    Open Tool
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-slate-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-orange-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest changes to your website content</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent hover:bg-orange-50 border-orange-200">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-orange-50 transition-colors duration-200 group"
              >
                <div className={`w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center`}>
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{activity.action}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-slate-500">{activity.time}</p>
                    <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600">
                      {activity.type}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-4 w-4 text-orange-500" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Footer */}
      <div className="flex items-center justify-center space-x-4 pt-8">
        <Button
          onClick={() => window.open("/", "_blank")}
          variant="outline"
          className="bg-white/80 backdrop-blur-sm hover:bg-white border-orange-200 shadow-sm"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Live Website
        </Button>
        <Button
          onClick={() => router.push("/admin/simple")}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Quick Edit Mode
        </Button>
      </div>
    </div>
  )
}
