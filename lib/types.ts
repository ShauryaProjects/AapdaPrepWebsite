export interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "admin" | "parent"
  points: number
  level: "beginner" | "intermediate" | "champion"
  completedModules: string[]
  badges: string[]
}

export interface DisasterModule {
  id: string
  title: string
  type: "earthquake" | "flood" | "fire" | "cyclone"
  description: string
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  completed: boolean
  progress: number
}

export interface Drill {
  id: string
  title: string
  type: "earthquake" | "flood" | "fire" | "cyclone"
  date: string
  time: string
  status: "upcoming" | "active" | "completed"
  participants: number
  maxParticipants: number
}

export interface Alert {
  id: string
  type: "earthquake" | "flood" | "fire" | "cyclone" | "weather"
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  region: string
  timestamp: string
  isActive: boolean
}

export interface LeaderboardEntry {
  rank: number
  name: string
  points: number
  level: string
  badges: number
}
