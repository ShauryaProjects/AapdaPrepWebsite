"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChatAssistant } from "@/components/chat-assistant"
import { Trophy, Award, Star, Download, Medal, Crown, Target } from "lucide-react"

const leaderboard = [
  { rank: 1, name: "Arjun Sharma", points: 2450, level: "Champion", badges: 12, avatar: "👨‍🎓" },
  { rank: 2, name: "Priya Patel", points: 2380, level: "Champion", badges: 11, avatar: "👩‍🎓" },
  { rank: 3, name: "Rahul Kumar", points: 2250, level: "Intermediate", badges: 10, avatar: "👨‍🎓" },
  { rank: 4, name: "Sneha Singh", points: 2100, level: "Intermediate", badges: 9, avatar: "👩‍🎓" },
  { rank: 5, name: "Vikram Gupta", points: 1950, level: "Intermediate", badges: 8, avatar: "👨‍🎓" },
  { rank: 6, name: "Anita Reddy", points: 1850, level: "Intermediate", badges: 7, avatar: "👩‍🎓" },
  { rank: 7, name: "Karan Joshi", points: 1750, level: "Beginner", badges: 6, avatar: "👨‍🎓" },
  { rank: 8, name: "Meera Nair", points: 1650, level: "Beginner", badges: 5, avatar: "👩‍🎓" },
]

const badges = [
  { name: "First Steps", description: "Complete your first module", earned: true, icon: "🎯", rarity: "common" },
  { name: "Earthquake Expert", description: "Master earthquake preparedness", earned: true, icon: "🏗️", rarity: "rare" },
  {
    name: "Fire Safety Champion",
    description: "Complete fire safety training",
    earned: true,
    icon: "🔥",
    rarity: "rare",
  },
  {
    name: "Quick Learner",
    description: "Complete module in under 30 minutes",
    earned: true,
    icon: "⚡",
    rarity: "uncommon",
  },
  { name: "Drill Master", description: "Participate in 10 virtual drills", earned: false, icon: "🎪", rarity: "epic" },
  {
    name: "Safety Ambassador",
    description: "Help 5 peers complete modules",
    earned: false,
    icon: "🤝",
    rarity: "legendary",
  },
  {
    name: "Perfect Score",
    description: "Score 100% on all assessments",
    earned: false,
    icon: "💯",
    rarity: "legendary",
  },
  {
    name: "Community Hero",
    description: "Top 10 on leaderboard for 30 days",
    earned: false,
    icon: "🦸",
    rarity: "mythic",
  },
]

const achievements = [
  { title: "Learning Streak", current: 7, target: 30, unit: "days", icon: "🔥" },
  { title: "Modules Completed", current: 3, target: 4, unit: "modules", icon: "📚" },
  { title: "Drill Participation", current: 8, target: 15, unit: "drills", icon: "🎯" },
  { title: "Points Earned", current: 1850, target: 2500, unit: "points", icon: "⭐" },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    case "uncommon":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "rare":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "epic":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    case "legendary":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    case "mythic":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />
    default:
      return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
  }
}

export default function GamificationPage() {
  const currentUser = { rank: 7, name: "You", points: 1750, level: "Beginner", badges: 6 }
  const avatarPool = [
    "/avatars/a1.jpg",
    "/avatars/a2.jpg",
    "/avatars/a3.jpg",
    "/avatars/a4.jpg",
    "/avatars/a5.jpg",
    "/avatars/a6.jpg",
    "/avatars/a7.jpg",
    "/avatars/a4.jpg",
    "/avatars/a3.jpg",
    "/avatars/a1.jpg",
  ]
  const pickAvatar = (seed: number) => {
    const idx = Math.abs(Math.floor((Math.sin(seed) * 10000)) % avatarPool.length)
    return avatarPool[idx]
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
          <h1 className="text-4xl font-bold text-balance mb-4">Gamification & Achievements</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Earn points, unlock badges, and compete with peers while mastering disaster preparedness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Progress & Stats */}
          <div className="space-y-6">
            {/* Current Level */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Level: Beginner</CardTitle>
                  <CardDescription>1,750 points earned</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to Intermediate</span>
                      <span>750/1000 XP</span>
                    </div>
                    <Progress value={75} className="h-3" />
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      Rank #{currentUser.rank}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-600" />
                    Current Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const progress = (achievement.current / achievement.target) * 100
                    return (
                      <div key={achievement.title} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{achievement.icon}</span>
                            <span className="font-medium text-sm">{achievement.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {achievement.current}/{achievement.target}
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Certificate Download */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    Certificates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div>
                      <div className="font-medium">Earthquake Safety</div>
                      <div className="text-sm text-muted-foreground">Completed Jan 10, 2024</div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Complete more modules to earn certificates
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Leaderboard
                  </CardTitle>
                  <CardDescription>Top performers in disaster preparedness training</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Podium Top 3 */}
                  <div className="relative rounded-2xl bg-gradient-to-b from-indigo-900/40 to-transparent p-6 mb-6">
                    <div className="grid grid-cols-3 gap-4 items-end text-center">
                      {leaderboard
                        .filter((u) => u.rank <= 3)
                        .sort((a, b) => a.rank - b.rank)
                        .map((u) => (
                          <div key={u.rank} className={`relative ${u.rank === 1 ? "order-2" : u.rank === 2 ? "order-1" : "order-3"}`}>
                            {u.rank === 1 && (
                              <>
                                {/* Crown without background */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl">👑</div>                               
                              </>
                            )}
                            <div className={`mx-auto rounded-full ring-4 ring-indigo-500/40 overflow-hidden ${u.rank === 1 ? "w-24 h-24" : "w-20 h-20"}`}>
                              <img src={pickAvatar(u.rank)} alt={u.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="mt-2 text-sm text-white/90 font-medium">{u.name}</div>
                            <div className="text-xs text-purple-200">{u.points} points</div>
                            <div className={`mt-3 mx-auto rounded-t-lg ${u.rank === 1 ? "h-10 bg-purple-600" : u.rank === 2 ? "h-7 bg-purple-500" : "h-6 bg-purple-400"}`}></div>
                            <div className="absolute -bottom-4 left-[52%] -translate-x-1/2 w-10 h-10 rounded-full bg-indigo-700 text-white text-lg font-extrabold flex items-center justify-center shadow">{u.rank}</div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Header Row */}
                  <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-indigo-950/40 text-indigo-200 text-sm mb-3">
                    <div className="w-14">Rank</div>
                    <div className="flex-1">Player</div>
                    <div className="w-28 text-right">Points</div>
                  </div>

                  {/* Ranked List */}
                  <div className="space-y-3">
                    {leaderboard
                      .filter((u) => u.rank > 3)
                      .map((user, index) => (
                        <motion.div
                          key={user.rank}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.05 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600/80 to-indigo-600/80 text-white shadow border border-white/10"
                        >
                          <div className="w-16 text-lg font-extrabold opacity-90 pl-2">{user.rank}</div>
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/20">
                              <img src={pickAvatar(user.rank + 100)} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="font-medium">{user.name}</div>
                          </div>
                          <div className="w-28 text-right text-sm opacity-90">{user.points} points</div>
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Badges Collection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    Badge Collection
                  </CardTitle>
                  <CardDescription>Unlock badges by completing challenges and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {badges.map((badge, index) => (
                      <motion.div
                        key={badge.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className={`p-4 rounded-lg border text-center transition-all duration-300 ${
                          badge.earned
                            ? "bg-gradient-to-br from-fuchsia-500/15 via-violet-500/15 to-cyan-500/15 dark:from-fuchsia-400/15 dark:via-violet-400/15 dark:to-cyan-400/15 border-fuchsia-300/40 dark:border-fuchsia-700/40 ring-1 ring-fuchsia-400/30 hover:shadow-[0_0_30px_-10px_rgba(217,70,239,0.8)] hover:scale-[1.02]"
                            : "bg-muted/50 opacity-60 grayscale"
                        }`}
                      >
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <div className="font-medium text-sm mb-1">{badge.name}</div>
                        <div className="text-xs text-muted-foreground mb-2">{badge.description}</div>
                        <Badge variant="secondary" className={`text-xs ${getRarityColor(badge.rarity)}`}>
                          {badge.rarity}
                        </Badge>
                      </motion.div>
                    ))}
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
