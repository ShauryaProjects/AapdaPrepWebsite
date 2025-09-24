"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Menu,
  X,
  Bell,
  Shield,
  Home,
  BookOpen,
  Users,
  AlertTriangle,
  Trophy,
  BarChart3,
  Phone,
  LogIn,
  Clock3,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Modules", href: "/modules", icon: BookOpen },
  { name: "Drills", href: "/drills", icon: Users },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Emergency Tools", href: "/emergency", icon: Phone },
]


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [alertCount, setAlertCount] = useState(3)
  const notificationRef = useRef<HTMLDivElement>(null)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Earthquake Alert",
      message: "Magnitude 4.2 earthquake detected in your region",
      time: "2 minutes ago",
      type: "alert",
      read: false,
    },
    {
      id: 2,
      title: "Module Completed",
      message: "Congratulations! You've completed the Fire Safety module",
      time: "1 hour ago",
      type: "achievement",
      read: false,
    },
    {
      id: 3,
      title: "New Drill Available",
      message: "Flood preparedness drill is now available",
      time: "3 hours ago",
      type: "info",
      read: true,
    },
  ])
  const pathname = usePathname()
  const { user } = useAuth()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNotifications])

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
    setAlertCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
    setAlertCount(0)
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Shield className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-foreground">AapdaPrep</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.name} href={item.href}>
                  <Button 
                    variant={isActive ? "default" : "ghost"} 
                    size="sm" 
                    className={`flex items-center space-x-2 cursor-pointer ${
                      isActive 
                        ? "hover:bg-primary/80 dark:hover:bg-primary/80" 
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-2">
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative cursor-pointer hover:bg-accent"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {alertCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs animate-pulse-glow"
                  >
                    {alertCount}
                  </Badge>
                )}
              </Button>
              
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-[9999]">
                  <div className="px-3 py-2 text-sm font-semibold border-b border-gray-200 dark:border-gray-700">
                    Notifications
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full ml-2 mt-1" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      className="text-sm text-muted-foreground hover:text-foreground w-full text-left"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth button */}
            {user ? (
              <Link href="/profile">
                <button className="hidden xl:flex items-center cursor-pointer">
                  <img src={user.photoURL || "/placeholder-user.jpg"} alt="avatar" className="w-8 h-8 rounded-full object-cover cursor-pointer" />
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm" className="hidden xl:flex items-center space-x-2 cursor-pointer hover:bg-primary/80">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}

          {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="lg:hidden cursor-pointer hover:bg-accent" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden"
            >
              <div className="space-y-1 pb-4 pt-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={`w-full justify-start space-x-2 cursor-pointer ${
                          isActive 
                            ? "hover:bg-primary/80 dark:hover:bg-primary/80" 
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Button>
                    </Link>
                  )
                })}
                {user ? (
                  <Link href="/profile">
                    <Button size="sm" className="w-full justify-start space-x-2 mt-2 cursor-pointer hover:bg-accent hover:text-accent-foreground">
                      <span>Profile</span>
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button size="sm" className="w-full justify-start space-x-2 mt-2 cursor-pointer hover:bg-accent hover:text-accent-foreground">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
