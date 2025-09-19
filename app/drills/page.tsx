"use client"

import { useEffect, useState } from "react"
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
import { GamifiedDrillFullscreen, type DrillScenario, type DrillScore } from "@/components/gamified-drill"

const drills = [
  {
    id: "1",
    title: "Earthquake Drop, Cover, Hold Drill",
    type: "earthquake" as const,
    date: "2024-01-20",
    time: "10:00 AM",
    status: "active" as const,
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
  const [selectedDrill, setSelectedDrill] = useState<typeof drills[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fullscreenScenario, setFullscreenScenario] = useState<DrillScenario | null>(null)
  const [resultsDrill, setResultsDrill] = useState<typeof drills[0] | null>(null)
  const [drillResults, setDrillResults] = useState<Record<string, DrillScore | undefined>>({})

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }
  }, [isModalOpen])
  useEffect(() => {
    if (resultsDrill) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }
  }, [resultsDrill])

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

  const handleDetailsClick = (drill: typeof drills[0]) => {
    setSelectedDrill(drill)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDrill(null)
  }

  const openResults = (drill: typeof drills[0]) => {
    setResultsDrill(drill)
  }
  const closeResults = () => setResultsDrill(null)

  const handleDrillComplete = (score: DrillScore) => {
    if (!fullscreenScenario) return
    setDrillResults((prev) => ({ ...prev, [fullscreenScenario.id]: score }))
    // Open results modal for the corresponding drill
    const completedDrill = drills.find((d) => scenariosByType[d.type].id === fullscreenScenario.id)
    setFullscreenScenario(null)
    if (completedDrill) {
      setResultsDrill(completedDrill)
    }
  }

  const backgroundImageByType: Record<string, string> = {
    earthquake: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop",
    fire: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=2069&auto=format&fit=crop",
    flood: "https://images.unsplash.com/photo-1597591488605-9797eeabc1bc?q=80&w=2069&auto=format&fit=crop",
    cyclone: "https://images.unsplash.com/photo-1505672678657-cc7037095e60?q=80&w=2069&auto=format&fit=crop",
  }

  const scenariosByType: Record<string, DrillScenario> = {
    earthquake: {
      id: "eq-1",
      title: "Earthquake: Drop, Cover, Hold",
      type: "earthquake",
      intro: "You're in class. Suddenly, an earthquake starts! Find the safest immediate action.",
      backgroundImage: backgroundImageByType.earthquake,
      questions: [
        {
          id: 1,
          question: "You're in your classroom and the ground starts shaking. What do you do first?",
          options: ["Run outside immediately", "Drop, cover, and hold under your desk", "Stand near windows", "Call your parents"],
          correct: 1,
          explanation: "Correct! Indoors, the safest action is Drop, Cover, Hold.",
          timeLimit: 15,
        },
        {
          id: 2,
          question: "After the shaking stops, what should you do?",
          options: ["Stay under the desk for a bit to avoid aftershocks", "Run outside immediately", "Stand by the windows", "Use the elevator"],
          correct: 0,
          explanation: "Stay under cover briefly to be sure shaking has fully stopped.",
          timeLimit: 12,
        },
        {
          id: 3,
          question: "If you're near heavy shelves, what is safest?",
          options: ["Stand beside the shelf", "Move away from heavy objects", "Hold the shelf", "Climb on the shelf"],
          correct: 1,
          explanation: "Move away from items that could fall and injure you.",
          timeLimit: 12,
        },
        {
          id: 4,
          question: "You smell gas after an earthquake. What do you do?",
          options: ["Use a lighter to see", "Turn off gas and ventilate", "Flip switches to check power", "Ignore it"],
          correct: 1,
          explanation: "Turn off gas if safe, ventilate, and evacuate the area.",
          timeLimit: 15,
        },
        {
          id: 5,
          question: "If you're outside when shaking starts, you should...",
          options: ["Run into a building", "Move to open area away from buildings", "Stand under power lines", "Stand near glass"],
          correct: 1,
          explanation: "Open areas away from hazards are safest outdoors.",
          timeLimit: 14,
        },
        {
          id: 6,
          question: "What should you protect most during shaking?",
          options: ["Feet", "Hands", "Head and neck", "Knees"],
          correct: 2,
          explanation: "Shield your head and neck from falling debris.",
          timeLimit: 10,
        },
        {
          id: 7,
          question: "After shaking, before evacuating you should...",
          options: ["Use elevators", "Check for hazards and assist others", "Jump from windows", "Turn on all lights"],
          correct: 1,
          explanation: "Check for injuries and hazards; assist others safely.",
          timeLimit: 12,
        },
        {
          id: 8,
          question: "Where is the safest place indoors during shaking?",
          options: ["Under sturdy furniture", "Near tall cabinets", "In stairwells", "Behind glass walls"],
          correct: 0,
          explanation: "Shelter under sturdy desks/tables to avoid falling objects.",
          timeLimit: 12,
        },
      ],
    },
    fire: {
      id: "fi-1",
      title: "Fire: Evacuate Safely",
      type: "fire",
      intro: "The alarm sounds. Smoke is in the hallway. Evacuate calmly and safely.",
      backgroundImage: backgroundImageByType.fire,
      questions: [
        {
          id: 1,
          question: "When the fire alarm sounds, what do you do first?",
          options: ["Finish your task", "Evacuate using nearest exit", "Check if it's a drill", "Collect belongings"],
          correct: 1,
          explanation: "Always evacuate immediately when the alarm sounds.",
          timeLimit: 10,
        },
        {
          id: 2,
          question: "There is smoke in the corridor. What's the safest way forward?",
          options: ["Walk upright through smoke", "Crawl low under the smoke", "Run fast", "Open all doors for airflow"],
          correct: 1,
          explanation: "Cleanest air is near the floor. Crawl to the exit.",
          timeLimit: 12,
        },
        {
          id: 3,
          question: "Before opening a door, you should...",
          options: ["Kick it open", "Feel it with the back of your hand", "Open quickly", "Shout and open"],
          correct: 1,
          explanation: "If the door is hot, fire may be on the other side.",
          timeLimit: 12,
        },
        {
          id: 4,
          question: "Where do you go after evacuating?",
          options: ["Nearest cafe", "Your car", "Designated assembly point", "Back inside to help"],
          correct: 2,
          explanation: "Go to the assembly point for headcount and safety.",
          timeLimit: 10,
        },
        {
          id: 5,
          question: "Should you use elevators during a fire?",
          options: ["Yes, they're faster", "Only if no smoke", "Never", "Only with security"],
          correct: 2,
          explanation: "Never use elevators; use stairs to evacuate.",
          timeLimit: 9,
        },
        {
          id: 6,
          question: "Clothes catch fire. What do you do?",
          options: ["Run outside", "Stop, drop, and roll", "Wave arms", "Use fan"],
          correct: 1,
          explanation: "Stop, drop, and roll to smother flames.",
          timeLimit: 10,
        },
        {
          id: 7,
          question: "If smoke fills a room, you should...",
          options: ["Open windows wide", "Stay low and cover nose/mouth", "Stand and breathe deeply", "Turn on AC"],
          correct: 1,
          explanation: "Stay low and filter air if possible; exit quickly.",
          timeLimit: 12,
        },
        {
          id: 8,
          question: "When exiting, you should...",
          options: ["Grab belongings", "Close doors behind you", "Leave doors open", "Return for items"],
          correct: 1,
          explanation: "Closing doors can slow the spread of fire and smoke.",
          timeLimit: 8,
        },
      ],
    },
    flood: {
      id: "fl-1",
      title: "Flood: Move to Higher Ground",
      type: "flood",
      intro: "Heavy rains cause rising waters. Respond quickly and avoid hazards.",
      backgroundImage: backgroundImageByType.flood,
      questions: [
        {
          id: 1,
          question: "Water rises on your street. What should you do?",
          options: ["Wait and watch", "Move to higher ground immediately", "Drive through the water", "Film for social media"],
          correct: 1,
          explanation: "Go to higher ground without delay. Floodwaters rise fast.",
          timeLimit: 15,
        },
        {
          id: 2,
          question: "If you must walk through water, how do you stay safe?",
          options: ["Run quickly", "Use a stick to test the ground", "Walk the deepest part", "Hold live wires"],
          correct: 1,
          explanation: "Use a stick to test footing. Avoid unseen hazards.",
          timeLimit: 15,
        },
        {
          id: 3,
          question: "Approaching water in a car, you should...",
          options: ["Drive through quickly", "Turn around, don't drown", "Follow other cars", "Speed then brake"],
          correct: 1,
          explanation: "Turn around; 12 inches of water can sweep a car away.",
          timeLimit: 12,
        },
        {
          id: 4,
          question: "Electric safety during floods:",
          options: ["Leave power on", "Unplug and move appliances up", "Use outlets barefoot", "Dry with heater"],
          correct: 1,
          explanation: "Unplug and raise appliances; avoid electrical hazards.",
          timeLimit: 12,
        },
        {
          id: 5,
          question: "Floodwater may contain...",
          options: ["Clean drinking water", "Debris, sewage, chemicals", "Only rainwater", "Nothing harmful"],
          correct: 1,
          explanation: "Avoid contact; floodwater can be contaminated and dangerous.",
          timeLimit: 10,
        },
        {
          id: 6,
          question: "If trapped in a building, you should...",
          options: ["Go to basement", "Move to highest safe level", "Open gas lines", "Swim out"],
          correct: 1,
          explanation: "Head to the highest safe level and call for help.",
          timeLimit: 12,
        },
        {
          id: 7,
          question: "After waters recede, before re-entering homes...",
          options: ["Enter immediately", "Wait for authorities and check structure", "Turn on all power", "Light candles"],
          correct: 1,
          explanation: "Ensure structural and electrical safety first.",
          timeLimit: 12,
        },
        {
          id: 8,
          question: "When walking in water, best practice is...",
          options: ["Barefoot", "Wear sturdy shoes", "Flip-flops", "High heels"],
          correct: 1,
          explanation: "Wear sturdy shoes to avoid injuries from debris.",
          timeLimit: 8,
        },
      ],
    },
    cyclone: {
      id: "cy-1",
      title: "Cyclone: Shelter and Protect",
      type: "cyclone",
      intro: "Severe winds incoming. Shelter in a safe place away from windows.",
      backgroundImage: backgroundImageByType.cyclone,
      questions: [
        {
          id: 1,
          question: "A cyclone warning is issued. What is your best first action?",
          options: ["Go outside to check", "Move to the designated shelter", "Open windows", "Drive around"],
          correct: 1,
          explanation: "Move to a designated shelter immediately.",
          timeLimit: 12,
        },
        {
          id: 2,
          question: "If you cannot reach a shelter, where do you stay?",
          options: ["Room with many windows", "Basement/lowest floor, away from windows", "Garage", "Balcony"],
          correct: 1,
          explanation: "Stay on the lowest interior space away from windows.",
          timeLimit: 12,
        },
        {
          id: 3,
          question: "Before the cyclone arrives, you should...",
          options: ["Leave objects outside", "Secure loose items and close shutters", "Open doors and windows", "Do nothing"],
          correct: 1,
          explanation: "Secure loose items and close/secure windows and shutters.",
          timeLimit: 12,
        },
        {
          id: 4,
          question: "During the eye of the storm, it's best to...",
          options: ["Go outside; it's over", "Stay sheltered until officials say safe", "Open all windows", "Drive to beach"],
          correct: 1,
          explanation: "The eye is temporary calm; remain sheltered.",
          timeLimit: 10,
        },
        {
          id: 5,
          question: "In high winds, safest indoor location is...",
          options: ["Near glass walls", "Interior room/closet/bathroom", "Top floor balcony", "Garage"],
          correct: 1,
          explanation: "Choose interior rooms away from windows and exterior walls.",
          timeLimit: 10,
        },
        {
          id: 6,
          question: "Evacuation routes should be...",
          options: ["Chosen during storm", "Planned in advance", "Ignored", "Only for cars"],
          correct: 1,
          explanation: "Plan routes before the cyclone to evacuate quickly if needed.",
          timeLimit: 9,
        },
        {
          id: 7,
          question: "Essential supplies include...",
          options: ["Snacks only", "Water, meds, flashlight, radio", "Only cash", "Balloons"],
          correct: 1,
          explanation: "Prepare emergency kit with water, meds, flashlight, radio, etc.",
          timeLimit: 12,
        },
        {
          id: 8,
          question: "After the storm, first step should be...",
          options: ["Touch downed wires", "Check for hazards and listen to authorities", "Drive through floodwater", "Climb damaged trees"],
          correct: 1,
          explanation: "Beware hazards; follow official guidance for safety.",
          timeLimit: 12,
        },
      ],
    },
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
                        {drill.status === "active" && (
                          drillResults[scenariosByType[drill.type].id] ? (
                            <>
                              <Button className="flex-1" onClick={() => setFullscreenScenario(scenariosByType[drill.type])}>
                                <Play className="w-4 h-4 mr-2" />
                                Retry Drill
                              </Button>
                              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => openResults(drill)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                View Results
                              </Button>
                            </>
                          ) : (
                            <Button className="flex-1" onClick={() => setFullscreenScenario(scenariosByType[drill.type])}>
                              <Play className="w-4 h-4 mr-2" />
                              Join Active Drill
                            </Button>
                          )
                        )}
                        {drill.status === "upcoming" && (
                          <Button className="flex-1" variant="outline" disabled>
                            <Clock className="w-4 h-4 mr-2" />
                            Will be live soon
                          </Button>
                        )}
                        {drill.status === "completed" && (
                          drill.type === "flood" ? (
                            <>
                              <Button className="flex-1" onClick={() => setFullscreenScenario(scenariosByType[drill.type])}>
                                <Play className="w-4 h-4 mr-2" />
                                Retry Drill
                              </Button>
                              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => openResults(drill)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                View Results
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => openResults(drill)}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              View Results
                            </Button>
                          )
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => handleDetailsClick(drill)}
                        >
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

      {/* Fullscreen Gamified Drill */}
      {fullscreenScenario && (
        <GamifiedDrillFullscreen
          scenario={fullscreenScenario}
          onClose={() => setFullscreenScenario(null)}
          onComplete={handleDrillComplete}
        />
      )}

      {/* Drill Details Modal */}
      {isModalOpen && selectedDrill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${DISASTER_TYPES[selectedDrill.type].bgColor} flex items-center justify-center text-xl`}
                  >
                    {DISASTER_TYPES[selectedDrill.type].icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedDrill.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(selectedDrill.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {selectedDrill.time}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Status and Duration */}
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(selectedDrill.status)}>
                  {selectedDrill.status.toUpperCase()}
                </Badge>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Duration: {selectedDrill.duration}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {selectedDrill.description}
                </p>
              </div>

              {/* Participation Details */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Participation</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Participants</span>
                    <span className="font-medium">
                      {selectedDrill.participants}/{selectedDrill.maxParticipants}
                    </span>
                  </div>
                  <Progress 
                    value={(selectedDrill.participants / selectedDrill.maxParticipants) * 100} 
                    className="h-2" 
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-500 text-center">
                    {Math.round((selectedDrill.participants / selectedDrill.maxParticipants) * 100)}% capacity
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Additional Information</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Disaster Type:</span>
                    <span className="capitalize font-medium">{selectedDrill.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Participants:</span>
                    <span className="font-medium">{selectedDrill.maxParticipants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Participants:</span>
                    <span className="font-medium">{selectedDrill.participants}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex gap-3">
                {selectedDrill.status === "active" && (
                  drillResults[scenariosByType[selectedDrill.type].id] ? (
                    <Button 
                      className="flex-1 mb-2 sm:mb-0"
                      onClick={() => {
                        setFullscreenScenario(scenariosByType[selectedDrill.type])
                        closeModal()
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Retry Drill
                    </Button>
                  ) : (
                    <Button 
                      className="flex-1 mb-2 sm:mb-0"
                      onClick={() => {
                        setFullscreenScenario(scenariosByType[selectedDrill.type])
                        closeModal()
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Join Active Drill
                    </Button>
                  )
                )}
                {selectedDrill.status === "upcoming" && (
                  <Button variant="outline" className="flex-1" disabled>
                    <Clock className="w-4 h-4 mr-2" />
                    Will be live soon
                  </Button>
                )}
                {selectedDrill.status === "completed" && selectedDrill.type === "flood" && (
                  <>
                    <Button 
                      className="flex-1 mb-2 sm:mb-0"
                      onClick={() => {
                        setFullscreenScenario(scenariosByType[selectedDrill.type])
                        closeModal()
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Retry Drill
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => openResults(selectedDrill)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      View Results
                    </Button>
                  </>
                )}
                {selectedDrill.status === "completed" && selectedDrill.type !== "flood" && (
                  <Button variant="outline" className="flex-1" onClick={() => openResults(selectedDrill)}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    View Results
                  </Button>
                )}
                <Button variant="outline" onClick={closeModal}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Results Modal */}
      {resultsDrill && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeResults} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">Results</div>
                <h3 className="text-xl font-bold">{resultsDrill.title}</h3>
              </div>
              <button onClick={closeResults} className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">Close</button>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50">
                    <div className="text-sm text-blue-700 dark:text-blue-300">Overall Score</div>
                    <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{drillResults[scenariosByType[resultsDrill.type].id]?.totalPoints ?? 0}</div>
                    <div className="text-xs text-blue-700/80 dark:text-blue-300/80">(+{drillResults[scenariosByType[resultsDrill.type].id]?.timeBonus ?? 0} time bonus)</div>
                  </div>
                  <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200/50">
                    <div className="text-sm text-green-700 dark:text-green-300">Accuracy</div>
                    <div className="text-3xl font-bold text-green-900 dark:text-green-100">{Math.round(drillResults[scenariosByType[resultsDrill.type].id]?.accuracy ?? 0)}%</div>
                    <div className="text-xs text-green-700/80 dark:text-green-300/80">
                      {drillResults[scenariosByType[resultsDrill.type].id]?.correctAnswers ?? 0} correct • {drillResults[scenariosByType[resultsDrill.type].id]?.wrongAnswers ?? 0} wrong
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50">
                    <div className="text-sm text-purple-700 dark:text-purple-300">Completion Time</div>
                    {(() => {
                      const res = drillResults[scenariosByType[resultsDrill.type].id]
                      const secs = res?.elapsedSeconds ?? 0
                      const mm = String(Math.floor(secs / 60)).padStart(2, '0')
                      const ss = String(secs % 60).padStart(2, '0')
                      return (
                        <>
                          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{mm}:{ss}</div>
                          <div className="text-xs text-purple-700/80 dark:text-purple-300/80">Average {res?.avgSecondsPerQuestion ?? 0}s / question</div>
                        </>
                      )
                    })()}
                  </div>
                </div>

                {/* Question Breakdown (Bar Chart) */}
                <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/60">
                  <div className="font-semibold mb-3">Question Breakdown</div>
                  <div className="space-y-3">
                    {(drillResults[scenariosByType[resultsDrill.type].id]?.perQuestionStatuses || []).map((status, i) => {
                      const label = `Q${i + 1}`
                      const color = status === "correct" ? "bg-green-500" : status === "wrong" ? "bg-red-500" : status === "timeout" ? "bg-orange-400" : "bg-gray-300"
                      const width = status === "correct" ? 100 : status === "wrong" ? 40 : status === "timeout" ? 60 : 20
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-10 text-xs text-gray-600 dark:text-gray-400">{label}</div>
                          <div className="flex-1 h-3 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden">
                            <div className={`h-full ${color}`} style={{ width: `${width}%` }} />
                          </div>
                          <div className="w-10 text-xs text-gray-700 dark:text-gray-300 text-right">{width}%</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Side: Donut + Insights */}
              <div className="space-y-6">
                <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/60">
                  <div className="font-semibold mb-4">Answer Distribution</div>
                  <div className="flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-40 h-40">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                      {(() => {
                        const res = drillResults[scenariosByType[resultsDrill.type].id]
                        const total = res?.totalQuestions ?? 1
                        const correct = res?.correctAnswers ?? 0
                        const wrong = res?.wrongAnswers ?? 0
                        const timeout = res?.timeouts ?? 0
                        const correctPct = Math.round((correct / total) * 100)
                        const wrongPct = Math.round((wrong / total) * 100)
                        const timeoutPct = Math.max(0, 100 - correctPct - wrongPct)
                        return (
                          <>
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray={`${correctPct} 100`} strokeDashoffset="25" />
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray={`${timeoutPct} 100`} strokeDashoffset={`${25 - correctPct}`} />
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray={`${wrongPct} 100`} strokeDashoffset={`${25 - correctPct - timeoutPct}`} />
                            <text x="18" y="18" textAnchor="middle" dominantBaseline="middle" fontSize="4" className="fill-gray-900 dark:fill-gray-100">Correct {correctPct}%</text>
                          </>
                        )
                      })()}
                    </svg>
                  </div>
                  <div className="mt-3 space-y-1 text-sm">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500" /> Correct</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400" /> Skipped</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500" /> Wrong</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/60">
                  <div className="font-semibold mb-2">Insights</div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Strong on evacuation routes and hazard identification.</li>
                    <li>Improve on electrical safety and post-flood hygiene.</li>
                    <li>Maintain pace; top 25% time bonus achieved.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
