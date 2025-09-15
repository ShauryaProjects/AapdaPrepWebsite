"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChatAssistant } from "@/components/chat-assistant"
import { BookOpen, Users, AlertTriangle, Trophy, Phone, Shield, Target, Award, ArrowRight } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Interactive Learning Modules",
    description:
      "Comprehensive disaster education covering earthquakes, floods, fires, and cyclones with engaging content.",
    href: "/modules",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    icon: Users,
    title: "Virtual Drills & Simulations",
    description: "Practice emergency responses through realistic virtual drills and scenario-based training.",
    href: "/drills",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    icon: AlertTriangle,
    title: "Real-Time Disaster Alerts",
    description: "Stay informed with live disaster alerts and emergency notifications for your region.",
    href: "/alerts",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn points, badges, and certificates while competing on leaderboards with peers.",
    href: "/gamification",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    icon: Phone,
    title: "Emergency Response Tools",
    description: "Quick access to SOS features, emergency contacts, and incident reporting systems.",
    href: "/emergency",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
]

const stats = [
  { label: "Students Trained", value: "50,000+", icon: Users },
  { label: "Schools Partnered", value: "500+", icon: Shield },
  { label: "Disaster Types Covered", value: "5+", icon: Target },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-blue-950 dark:via-background dark:to-orange-950">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
                Be <span className="text-blue-600">Disaster Ready</span>.
                <br />
                Save Lives. Stay Safe.
              </h1>
              <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Comprehensive digital disaster education and preparedness platform designed for schools and colleges
                across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/modules">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/drills">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    Try Virtual Drill
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse z-0"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-200 dark:bg-orange-800 rounded-full opacity-20 animate-pulse delay-1000 z-0"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
              Everything You Need for Disaster Preparedness
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources needed to prepare for and respond to
              natural disasters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
              Ready to Make Your Community Disaster Ready?
            </h2>
            <p className="text-xl text-primary-foreground/80 text-balance mb-8 max-w-2xl mx-auto">
              Join thousands of students and educators who are already building a safer future through disaster
              preparedness education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/modules">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Explore Modules
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatAssistant />
    </div>
  )
}
