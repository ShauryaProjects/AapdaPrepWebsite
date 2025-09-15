"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChatAssistant } from "@/components/chat-assistant"
import { BookOpen, Clock, Award, CheckCircle, Play, Clock3 } from "lucide-react"
import { DISASTER_TYPES } from "@/lib/constants"

const modules = [
  {
    id: "earthquake",
    title: "Earthquake Preparedness",
    type: "earthquake" as const,
    description: "Learn about earthquake safety, building codes, emergency kits, and response procedures.",
    duration: "45 minutes",
    difficulty: "Beginner",
    progress: 100,
    completed: true,
    lessons: 8,
    badge: "Earthquake Expert",
  },
  {
    id: "flood",
    title: "Flood Safety & Response",
    type: "flood" as const,
    description: "Understanding flood risks, evacuation procedures, and water safety measures.",
    duration: "35 minutes",
    difficulty: "Beginner",
    progress: 60,
    completed: false,
    lessons: 6,
    badge: null,
  },
  {
    id: "fire",
    title: "Fire Prevention & Safety",
    type: "fire" as const,
    description: "Fire safety protocols, evacuation plans, and firefighting equipment usage.",
    duration: "40 minutes",
    difficulty: "Intermediate",
    progress: 25,
    completed: false,
    lessons: 7,
    badge: null,
  },
  {
    id: "cyclone",
    title: "Cyclone & Storm Preparedness",
    type: "cyclone" as const,
    description: "Tropical cyclone awareness, shelter preparation, and post-storm recovery.",
    duration: "50 minutes",
    difficulty: "Advanced",
    progress: 0,
    completed: false,
    lessons: 9,
    badge: null,
  },
  {
    id: "pandemic",
    title: "Pandemic Preparedness",
    type: "pandemic" as const,
    description: "Health emergency protocols, disease prevention, and community safety measures.",
    duration: "40 minutes",
    difficulty: "Intermediate",
    progress: 0,
    completed: false,
    lessons: 6,
    badge: null,
    comingSoon: true,
  },
]

const achievements = [
  { name: "First Steps", description: "Complete your first module", earned: true },
  { name: "Knowledge Seeker", description: "Complete 3 modules", earned: true },
  { name: "Safety Champion", description: "Complete all modules", earned: false },
  { name: "Quick Learner", description: "Complete a module in under 30 minutes", earned: true },
]

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-balance mb-4">Learning Modules</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Master disaster preparedness through interactive learning modules designed by experts.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1/4</div>
                  <div className="text-sm text-muted-foreground">Modules Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'oklch(0.63 0.18 239.37)' }}>185</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-sm text-muted-foreground">Badges Unlocked</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {modules.map((module, index) => {
            const disasterType = DISASTER_TYPES[module.type]

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`h-full transition-all duration-300 group ${module.comingSoon ? 'opacity-75' : 'hover:shadow-lg'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 rounded-lg ${disasterType.bgColor} flex items-center justify-center text-2xl`}
                      >
                        {disasterType.icon}
                      </div>
                      {module.comingSoon ? (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                        >
                          <Clock3 className="w-3 h-3 mr-1" />
                          Coming Soon
                        </Badge>
                      ) : module.completed ? (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      ) : null}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Module Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {module.lessons} lessons
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {module.difficulty}
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    {/* Badge */}
                    {module.badge && (
                      <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                          Badge Earned: {module.badge}
                        </span>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="flex justify-center">
                      {module.comingSoon ? (
                        <Button className="w-auto px-6" variant="outline" disabled>
                          <Clock3 className="w-4 h-4 mr-2" />
                          Coming Soon
                        </Button>
                      ) : (
                        <Link href={`/modules/${module.id}`}>
                          <Button className="w-auto px-6" variant={module.completed ? "outline" : "default"}>
                            <Play className="w-4 h-4 mr-2" />
                            {module.completed
                              ? "Review Module"
                              : module.progress > 0
                                ? "Continue Learning"
                                : "Start Learning"}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Achievements
              </CardTitle>
              <CardDescription>
                Unlock badges and certificates as you progress through your learning journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.name}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      achievement.earned
                        ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                        : "bg-muted/50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.earned ? "bg-green-600 text-white" : "bg-muted"
                      }`}
                    >
                      {achievement.earned ? <CheckCircle className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-medium">{achievement.name}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
      <ChatAssistant />
    </div>
  )
}
