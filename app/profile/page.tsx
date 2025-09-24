"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { AuthGuard } from "@/components/auth-guard"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signOut, sendPasswordResetEmail } from "firebase/auth"
import { Crown, Award, Star, Target, Download, Clock3, Play, CheckCircle, Settings } from "lucide-react"
import ContributionHeatmap from "@/components/contribution-heatmap"

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const router = useRouter()
  const displayName = user?.displayName || "Anonymous"
  const email = user?.email || ""
  const [studentClass, setStudentClass] = useState("")
  const [newName, setNewName] = useState("")
  const [showNameDialog, setShowNameDialog] = useState(false)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)

  // Mocked data moved from Gamification
  const currentUser = { rank: 7, name: displayName || "You", points: 1750, level: "Beginner", badges: 6 }
  const avatarPaths = Array.from({ length: 7 }, (_, i) => `/avatars/a${i + 1}.jpg`)
  const fallbackAvatarPaths = Array.from({ length: 7 }, (_, i) => `/New folder/a${i + 1}.jpg`)
  const getAvatar = (index: number) => avatarPaths[index % avatarPaths.length]
  const getFallbackAvatar = (index: number) => fallbackAvatarPaths[index % fallbackAvatarPaths.length]

  const leaderboard = [
    { rank: 1, name: "Arjun Sharma", points: 2750 },
    { rank: 2, name: "Priya Patel", points: 2680 },
    { rank: 3, name: "Rahul Kumar", points: 2590 },
    { rank: 4, name: "Neha Verma", points: 2440 },
    { rank: 5, name: "Amit Singh", points: 2395 },
    { rank: 6, name: "Karan Mehta", points: 2280 },
    { rank: 7, name: "Isha Gupta", points: 2210 },
    { rank: 8, name: "Vikas Rao", points: 2150 },
    { rank: 9, name: "Sneha Nair", points: 2090 },
    { rank: 10, name: "Rohit Das", points: 2015 },
  ]

  // Merge current user into leaderboard at their rank and ensure they are visible
  const mergedLeaderboard = (() => {
    const base = [...leaderboard]
    const selfIdx = base.findIndex((e) => e.rank === currentUser.rank)
    const selfEntry = {
      rank: currentUser.rank,
      name: displayName || "You",
      points: currentUser.points || 1750,
      isSelf: true,
    } as any
    if (selfIdx >= 0) base[selfIdx] = { ...base[selfIdx], ...selfEntry }
    else base.push(selfEntry)
    return base.sort((a, b) => a.rank - b.rank).slice(0, 10)
  })()
  const badges = [
    { name: "First Steps", description: "Complete your first module", earned: true, icon: "🎯", rarity: "common" },
    { name: "Earthquake Expert", description: "Master earthquake preparedness", earned: true, icon: "🏗️", rarity: "rare" },
    { name: "Fire Safety Champion", description: "Complete fire safety training", earned: true, icon: "🔥", rarity: "rare" },
  ]
  const achievements = [
    { title: "Modules Completed", current: 3, target: 4, unit: "modules", icon: "📚" },
  ]

  const handleResetPassword = async () => {
    if (!email) return
    await sendPasswordResetEmail(auth, email)
    // Intentionally no alerts
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your information and view your progress</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Profile card */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your identity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <img src={user?.photoURL || "/placeholder-user.jpg"} alt="avatar" className="w-40 h-40 rounded-full object-cover" />
                    <button
                      type="button"
                      aria-label="Change avatar"
                      onClick={() => setShowAvatarPicker((v) => !v)}
                      className="absolute -bottom-1 -right-1 rounded-full p-2 bg-background border shadow hover:bg-accent"
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-2xl font-bold">{displayName}</div>
                  <div className="text-sm text-muted-foreground">{email}</div>
                </div>

                {showAvatarPicker && (
                  <div className="mx-auto w-full max-w-md rounded-lg border bg-background p-3 shadow-sm">
                    <div className="mb-2 text-sm font-medium">Choose an avatar</div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 7 }, (_, i) => i + 1).map((n, idx) => {
                        const primary = `/avatars/a${n}.jpg`
                        const fallback = `/New folder/a${n}.jpg`
                        return (
                          <button
                            key={n}
                            className="rounded-full border hover:ring-2 hover:ring-primary/50"
                            onClick={() => import("firebase/auth").then(async ({ updateProfile }) => {
                              if (auth.currentUser) {
                                await updateProfile(auth.currentUser, { photoURL: primary })
                                setShowAvatarPicker(false)
                                // Show a subtle toast-like inline confirmation instead of full reload
                                const el = document.createElement("div")
                                el.textContent = "Avatar updated"
                                el.className = "fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] rounded-md bg-foreground text-background px-3 py-1 text-sm shadow"
                                document.body.appendChild(el)
                                // update local auth context so UI refreshes without logout flash
                                setUser({ ...(auth.currentUser as any) })
                                setTimeout(() => { el.remove() }, 900)
                              }
                            })}
                          >
                            <img
                              src={primary}
                              onError={(e) => {
                                const img = e.currentTarget as HTMLImageElement
                                img.onerror = null
                                img.src = fallback
                              }}
                              alt={`Avatar ${n}`}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          </button>
                        )
                      })}
                    </div>
                </div>
                )}

                <div className="flex justify-center">
                  <Button onClick={() => { setNewName(""); setShowNameDialog(true) }}>Change Name</Button>
                </div>
              </CardContent>
            </Card>
            {showNameDialog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-full max-w-sm rounded-lg border bg-background p-4 shadow-lg">
                  <div className="mb-3 text-lg font-semibold">Change Display Name</div>
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="nameModalInput">New name</Label>
                    <Input id="nameModalInput" autoFocus placeholder="Enter new display name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowNameDialog(false)}>Cancel</Button>
                    <Button disabled={!newName.trim()} onClick={() => import("firebase/auth").then(async ({ updateProfile }) => { if (auth.currentUser) { await updateProfile(auth.currentUser, { displayName: newName.trim() }); setShowNameDialog(false); const el = document.createElement("div"); el.textContent = "Name updated"; el.className = "fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] rounded-md bg-foreground text-background px-3 py-1 text-sm shadow"; document.body.appendChild(el); setTimeout(() => el.remove(), 1500); } })}>Save</Button>
                  </div>
                </div>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Crown className="h-5 w-5 text-yellow-500" /> Highlights</CardTitle>
                <CardDescription>Your current rank and points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">Level: <span className="font-medium">{currentUser.level}</span></div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Rank #{currentUser.rank}</Badge>
                  <div className="text-sm">{currentUser.points} points</div>
                </div>
                <Progress value={75} className="h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Right: Gamification moved here */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-purple-600" /> Badges</CardTitle>
                <CardDescription>Your earned achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {badges.map((badge) => (
                    <div key={badge.name} className="p-4 rounded-lg border text-center">
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <div className="font-medium text-sm mb-1">{badge.name}</div>
                      <div className="text-xs text-muted-foreground">{badge.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-500" /> Activity</CardTitle>
                <CardDescription>Your usage over the past year</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ContributionHeatmap weeks={53} storageKey="aapdaprep:usageDates" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-yellow-500" /> Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((a) => (
                  <div key={a.title} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><span className="text-lg">{a.icon}</span><span className="text-sm font-medium">{a.title}</span></div>
                      <span className="text-sm text-muted-foreground">{a.current}/{a.target}</span>
                    </div>
                    <Progress value={(a.current / a.target) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-blue-600" /> Leaderboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Your current rank</div>
                  <Badge variant="secondary" className="text-base px-3 py-1">#{currentUser.rank}</Badge>
                </div>

                {mergedLeaderboard.map((u: any, idx: number) => {
                  const isTop3 = u.rank <= 3
                  const sizePx = 32 // same as before: w-8 h-8
                  const bg = u.rank === 1
                    ? "bg-yellow-50/60 dark:bg-yellow-950/30"
                    : u.rank === 2
                    ? "bg-slate-50/60 dark:bg-slate-900/40"
                    : u.rank === 3
                    ? "bg-amber-50/60 dark:bg-amber-950/30"
                    : "bg-background"
                  const border = u.rank === 1
                    ? "border-2 border-yellow-400 dark:border-yellow-600 shadow-[0_0_0_2px_rgba(250,204,21,0.2)]"
                    : u.rank === 2
                    ? "border-2 border-slate-400 dark:border-slate-600 shadow-[0_0_0_2px_rgba(148,163,184,0.2)]"
                    : u.rank === 3
                    ? "border-2 border-amber-500 dark:border-amber-600 shadow-[0_0_0_2px_rgba(245,158,11,0.2)]"
                    : "border"
                  const crown = u.rank === 1 ? "🥇" : u.rank === 2 ? "🥈" : u.rank === 3 ? "🥉" : ""

                  return (
                    <div
                      key={u.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${border} ${u.isSelf ? "border-2 border-sky-300 dark:border-sky-600" : ""} ${bg}`}
                    >
                    <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center justify-center rounded-full font-semibold text-[10px] px-2 py-[2px] ${
                          u.rank === 1 ? "bg-yellow-200 text-yellow-900" : u.rank === 2 ? "bg-slate-200 text-slate-900" : u.rank === 3 ? "bg-amber-200 text-amber-900" : "bg-muted text-foreground/80"
                        }`}>#{u.rank}</span>
                        <img
                          src={u.isSelf && user?.photoURL ? user.photoURL : getAvatar(idx)}
                          alt={u.name}
                          className={`rounded-full object-cover`}
                          style={{ width: sizePx, height: sizePx }}
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement
                            img.onerror = null
                            img.src = u.isSelf && user?.photoURL ? getAvatar(idx) : getFallbackAvatar(idx)
                          }}
                        />
                        <div className="flex items-center gap-2">
                          {isTop3 && <span className="text-lg leading-none">{crown}</span>}
                          <div className={`font-medium text-sm`}>{u.name}{u.isSelf ? " (You)" : ""}</div>
                        </div>
                      </div>
                      <div className={`text-sm ${isTop3 ? "font-semibold" : ""}`}>{u.points} pts</div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button className="bg-red-600 hover:bg-red-800 text-white" onClick={async () => { await signOut(auth); router.push("/") }}>Logout</Button>
        </div>
      </div>
      </div>
    </AuthGuard>
  )
}



