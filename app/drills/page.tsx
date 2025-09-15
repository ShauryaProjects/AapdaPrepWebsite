"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChatAssistant } from "@/components/chat-assistant"
import { Users, Calendar, Clock, Play, CheckCircle, AlertTriangle, Target, TrendingUp } from "lucide-react"
import { DISASTER_TYPES } from "@/lib/constants"

const drills = [
  {
    id: "1",
    title: "Earthquake Drop, Cover, Hold Drill",
    type: "earthquake" as const,
    date: "2024-01-20",
    time: "10:00 AM",
    status: "upcoming" as const,
    participants: 45,
    maxParticipants: 50,
    duration: "15 minutes",
    description: "Practice the fundamental earthquake safety response: Drop, Cover, and Hold On.",
  },
  {
    id: "2",
    title: "Fire Evacuation Drill",
    type: "fire" as const,
    date: "2024-01-18",
    time: "2:30 PM",
    status: "active" as const,
    participants: 32,
    maxParticipants: 40,
    duration: "20 minutes",
    description: "Complete building evacuation following designated fire escape routes.",
  },
  {
    id: "3",
    title: "Flood Response Simulation",
    type: "flood" as const,
    date: "2024-01-15",
    time: "11:00 AM",
    status: "completed" as const,
    participants: 38,
    maxParticipants: 40,
    duration: "25 minutes",
    description: "Virtual flood scenario with evacuation and emergency response procedures.",
  },
  {
    id: "4",
    title: "Cyclone Shelter Drill",
    type: "cyclone" as const,
    date: "2024-01-25",
    time: "9:00 AM",
    status: "upcoming" as const,
    participants: 12,
    maxParticipants: 30,
    duration: "30 minutes",
    description: "Practice moving to designated cyclone shelters and safety procedures.",
  },
]

const quizQuestions = [
  {
    id: 1,
    question: "During an earthquake, what is the first action you should take?",
    options: ["Run outside immediately", "Drop to hands and knees", "Stand in a doorway", "Call for help"],
    correct: 1,
  },
  {
    id: 2,
    question: "What should you do if you smell gas after an earthquake?",
    options: [
      "Light a match to see better",
      "Turn off gas supply and ventilate",
      "Ignore it",
      "Use electrical switches",
    ],
    correct: 1,
  },
]

export default function DrillsPage() {
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === quizQuestions[currentQuiz].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuiz < quizQuestions.length - 1) {
        setCurrentQuiz(currentQuiz + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      }
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-balance mb-4">Virtual Drills & Simulations</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Practice emergency responses through realistic virtual drills and scenario-based training.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Drills Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm text-muted-foreground">Participation Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">92</div>
              <div className="text-sm text-muted-foreground">Readiness Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Drills List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Scheduled Drills</h2>
            {drills.map((drill, index) => {
              const disasterType = DISASTER_TYPES[drill.type]
              const participationRate = (drill.participants / drill.maxParticipants) * 100

              return (
                <motion.div
                  key={drill.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-lg ${disasterType.bgColor} flex items-center justify-center text-xl`}
                          >
                            {disasterType.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{drill.title}</CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(drill.date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {drill.time}
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={getStatusColor(drill.status)}>{drill.status.toUpperCase()}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{drill.description}</p>

                      {/* Participation */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Participation</span>
                          <span>
                            {drill.participants}/{drill.maxParticipants} participants
                          </span>
                        </div>
                        <Progress value={participationRate} className="h-2" />
                      </div>

                      {/* Action Button */}
                      <div className="flex gap-2">
                        {drill.status === "upcoming" && (
                          <Button className="flex-1">
                            <Users className="w-4 h-4 mr-2" />
                            Join Drill
                          </Button>
                        )}
                        {drill.status === "active" && (
                          <Button className="flex-1 bg-green-600 hover:bg-green-700">
                            <Play className="w-4 h-4 mr-2" />
                            Join Active Drill
                          </Button>
                        )}
                        {drill.status === "completed" && (
                          <Button variant="outline" className="flex-1 bg-transparent">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            View Results
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Quick Quiz Simulation */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Quick Simulation
                  </CardTitle>
                  <CardDescription>Test your emergency response knowledge</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentQuiz < quizQuestions.length ? (
                    <>
                      <div className="text-sm text-muted-foreground">
                        Question {currentQuiz + 1} of {quizQuestions.length}
                      </div>
                      <h3 className="font-medium text-balance">{quizQuestions[currentQuiz].question}</h3>
                      <div className="space-y-2">
                        {quizQuestions[currentQuiz].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={
                              showResult
                                ? index === quizQuestions[currentQuiz].correct
                                  ? "default"
                                  : index === selectedAnswer
                                    ? "destructive"
                                    : "outline"
                                : "outline"
                            }
                            className="w-full justify-start text-left h-auto p-3"
                            onClick={() => !showResult && handleQuizAnswer(index)}
                            disabled={showResult}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                      {showResult && (
                        <div
                          className={`p-3 rounded-lg ${
                            selectedAnswer === quizQuestions[currentQuiz].correct
                              ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
                              : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
                          }`}
                        >
                          {selectedAnswer === quizQuestions[currentQuiz].correct
                            ? "Correct! Well done."
                            : "Incorrect. The correct answer is highlighted above."}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Quiz Complete!</h3>
                      <p className="text-muted-foreground mb-4">
                        You scored {score} out of {quizQuestions.length}
                      </p>
                      <Button
                        onClick={() => {
                          setCurrentQuiz(0)
                          setScore(0)
                          setSelectedAnswer(null)
                          setShowResult(false)
                        }}
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Readiness Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Your Readiness
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Earthquake Preparedness</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Fire Safety</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Flood Response</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Cyclone Safety</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">80%</div>
                      <div className="text-sm text-muted-foreground">Overall Readiness</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
      <ChatAssistant />
    </div>
  )
}
