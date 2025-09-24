"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, XCircle, Volume2, VolumeX, RotateCcw } from "lucide-react"

export type DrillType = "earthquake" | "fire" | "flood" | "cyclone"

export type DrillQuestion = {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  timeLimit: number
}

export type DrillScenario = {
  id: string
  title: string
  type: DrillType
  intro: string
  description?: string
  backgroundImage: string
  questions: DrillQuestion[]
  completionMessage?: string
}

export type DrillScore = {
  totalPoints: number
  correctAnswers: number
  totalQuestions: number
  timeBonus: number
  accuracy: number
  badges: string[]
  perQuestionStatuses: Array<"pending" | "correct" | "wrong" | "timeout">
  wrongAnswers: number
  timeouts: number
  elapsedSeconds: number
  avgSecondsPerQuestion: number
}

type Props = {
  scenario: DrillScenario
  onClose: () => void
  onComplete: (score: DrillScore) => void
}

export function GamifiedDrillFullscreen({ scenario, onClose, onComplete }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [questions, setQuestions] = useState<DrillQuestion[]>(scenario.questions)
  const [timeLeft, setTimeLeft] = useState(scenario.questions[0]?.timeLimit ?? 15)
  const [playing, setPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [timeBonus, setTimeBonus] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [soundOn, setSoundOn] = useState(true)
  const [badges, setBadges] = useState<string[]>([])
  const [bgLoaded, setBgLoaded] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [statuses, setStatuses] = useState<Array<"pending" | "correct" | "wrong" | "timeout">>(
    Array.from({ length: scenario.questions.length }, () => "pending")
  )
  const [startAtMs, setStartAtMs] = useState<number | null>(null)
  const [finalScore, setFinalScore] = useState<DrillScore | null>(null)

  const q = questions[index]
  const progress = (index / questions.length) * 100
  const timePct = Math.max(0, Math.min(100, (timeLeft / (q?.timeLimit || 1)) * 100))

  useEffect(() => {
    setTimeLeft(q?.timeLimit ?? 15)
    setSelected(null)
    setShowResult(false)
  }, [index, q])

  // Shuffle questions on join (and when scenario changes)
  useEffect(() => {
    const shuffled = [...scenario.questions]
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item)
    setQuestions(shuffled)
    setStatuses(Array.from({ length: scenario.questions.length }, () => "pending"))
    setIndex(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario.id])

  // Preload background image, then trigger countdown
  useEffect(() => {
    setBgLoaded(false)
    setCountdown(null)
    setHasStarted(false)
    const img = new Image()
    img.src = scenario.backgroundImage
    if (img.complete) {
      setBgLoaded(true)
      setCountdown(3)
    } else {
      img.onload = () => {
        setBgLoaded(true)
        setCountdown(3)
      }
      img.onerror = () => {
        // In case of error, proceed anyway
        setBgLoaded(true)
        setCountdown(3)
      }
    }
    // Ensure we are not already playing while joining
    setPlaying(false)
  }, [scenario.backgroundImage])

  // Handle countdown progression
  useEffect(() => {
    if (countdown === null) return
    if (countdown <= 0) {
      setHasStarted(true)
      setPlaying(true)
      setStartAtMs((prev) => prev ?? Date.now())
      return
    }
    const id = setTimeout(() => setCountdown((c) => (c ?? 0) - 1), 1000)
    return () => clearTimeout(id)
  }, [countdown])

  useEffect(() => {
    if (!playing || showResult || !q) return
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id)
          handleTimeUp()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [playing, showResult, q])

  const playBeep = (ok: boolean) => {
    if (!soundOn || typeof window === "undefined") return
    try {
      const Ctor = (window as any).AudioContext || (window as any).webkitAudioContext
      const ctx = new Ctor()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = ok ? "triangle" : "sawtooth"
      osc.frequency.value = ok ? 660 : 220
      gain.gain.value = 0.08
      const now = ctx.currentTime
      osc.start(now)
      osc.stop(now + 0.18)
    } catch {}
  }

  const start = () => setPlaying(true)

  const handleAnswer = (i: number) => {
    if (showResult) return
    setSelected(i)
    setShowResult(true)
    setPlaying(false)

    const isCorrect = i === q.correct
    const bonus = Math.max(0, Math.floor(timeLeft * 0.5))
    if (isCorrect) {
      setScore((s) => s + 50 + bonus)
      setTimeBonus((b) => b + bonus)
      setCorrectCount((c) => c + 1)
      if (timeLeft >= Math.floor((q.timeLimit ?? 15) * 0.8)) {
        setBadges((b) => Array.from(new Set([...b, "⚡ Speed Demon"])) )
      }
      if (index === 0) {
        setBadges((b) => Array.from(new Set([...b, "🎯 First Strike"])) )
      }
      playBeep(true)
      setStatuses((prev) => {
        const next = [...prev]
        next[index] = "correct"
        return next
      })
    } else {
      playBeep(false)
      setScore((s) => s - 10)
      setStatuses((prev) => {
        const next = [...prev]
        next[index] = "wrong"
        return next
      })
    }

    setTimeout(() => next(), 1500)
  }

  const handleTimeUp = () => {
    setSelected(-1)
    setShowResult(true)
    setStatuses((prev) => {
      const next = [...prev]
      next[index] = "timeout"
      return next
    })
    setTimeout(() => next(), 1000)
  }

  const next = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1)
      setPlaying(true)
    } else {
      const finishedAt = Date.now()
      const elapsedSeconds = Math.max(0, Math.round(((finishedAt - (startAtMs ?? finishedAt)) / 1000)))
      const total = score + timeBonus
      const accuracy = (correctCount / questions.length) * 100
      const wrongAnswers = statuses.filter((s) => s === "wrong").length
      const timeouts = statuses.filter((s) => s === "timeout").length
      const final: DrillScore = {
        totalPoints: total,
        correctAnswers: correctCount,
        totalQuestions: questions.length,
        timeBonus,
        accuracy,
        badges,
        perQuestionStatuses: statuses,
        wrongAnswers,
        timeouts,
        elapsedSeconds,
        avgSecondsPerQuestion: questions.length ? Math.round(elapsedSeconds / questions.length) : 0,
      }
      setFinalScore(final)
      setPlaying(false)
    }
  }

  const retry = () => {
    setIndex(0)
    setSelected(null)
    setShowResult(false)
    // reshuffle on retry as well
    const shuffled = [...scenario.questions]
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item)
    setQuestions(shuffled)
    setStatuses(Array.from({ length: scenario.questions.length }, () => "pending"))
    setTimeLeft(shuffled[0]?.timeLimit ?? 15)
    setCountdown(null)
    setHasStarted(true)
    setPlaying(true)
    setScore(0)
    setTimeBonus(0)
    setCorrectCount(0)
    setBadges([])
    setStartAtMs(Date.now())
    setFinalScore(null)
  }

  const bgStyles = useMemo(() => ({
    backgroundImage: `url(${scenario.backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  }), [scenario.backgroundImage])

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0" style={bgStyles} />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-2xl border border-white/20 shadow-2xl"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-white/80">{scenario.type}</div>
                <h2 className="text-xl font-bold text-white drop-shadow-sm">{scenario.title}</h2>
              </div>
              <Button variant="outline" onClick={onClose} className="bg-white/90 dark:bg-gray-800/80">
                Close
              </Button>
            </div>
          </div>

          {/* Segmented Progress */}
          <div className="px-5 pt-4">
            <div className="flex w-full gap-1">
              {questions.map((_, i) => {
                const status = statuses[i]
                const isCurrent = i === index && hasStarted && !showResult
                let cls = "bg-white/30"
                if (status === "correct") cls = "bg-green-500"
                else if (status === "wrong") cls = "bg-red-500"
                else if (status === "timeout") cls = "bg-orange-400"
                else if (isCurrent) cls = "bg-yellow-400"
                return (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded ${cls}`}
                    title={`Question ${i + 1}`}
                  />
                )
              })}
            </div>
          </div>

          {/* Intro, Question, or Completion */}
          <div className="p-5 space-y-5">
            {finalScore ? (
              <div className="flex flex-col items-center justify-center py-12 gap-6 text-center">
                <div className="text-2xl font-bold text-white">Drill Complete</div>
                <div className="text-white/90">Score: <span className="font-semibold text-white">{finalScore.totalPoints}</span> • Accuracy: {Math.round(finalScore.accuracy)}%</div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={retry} className="bg-white/90">Retry Drill</Button>
                  <Button variant="default" onClick={() => onComplete(finalScore)}>View Results</Button>
                </div>
              </div>
            ) : !hasStarted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                {!bgLoaded ? (
                  <div className="text-white text-center">
                    <div className="text-2xl font-semibold mb-2">Preparing your drill...</div>
                    <div className="text-white/80">Loading scene background</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">Get Ready.</div>
                    <div className="text-white/90 text-lg mb-4">Drill starts in...</div>
                    <div className="text-7xl font-extrabold text-white drop-shadow-sm">{Math.max(0, countdown ?? 0)}</div>
                  </div>
                )}
                {/* Placeholder content box */}
                <div className="w-full max-w-xl h-40 rounded-xl border border-white/30 bg-white/10" />
                <div className="flex items-center gap-2 text-white/90 mt-6">
                  {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <button className="underline" onClick={() => setSoundOn(!soundOn)}>
                    {soundOn ? "Sound on" : "Sound off"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Timer */}
                <div className="flex items-center gap-2 text-white">
                  <Clock className={`w-5 h-5 ${timeLeft <= 5 ? "text-red-400" : "text-blue-300"}`} />
                  <div className={`text-2xl font-bold ${timeLeft <= 5 ? "text-red-200" : "text-white"}`}>{timeLeft}s</div>
                  <div className="text-white/80 text-sm">Question {index + 1} of {questions.length}</div>
                </div>
                {/* Shrinking timer bar */}
                <div className="w-full h-2 rounded bg-white/20 overflow-hidden">
                  <div
                    className={`h-full ${timePct < 30 ? "bg-red-500" : timePct < 60 ? "bg-yellow-400" : "bg-green-500"}`}
                    style={{ width: `${timePct}%`, transition: "width 1s linear" }}
                  />
                </div>

                {/* Question */}
                <div className="text-white text-xl font-semibold leading-relaxed">{q?.question}</div>

                {/* Options */}
                <div className="space-y-3">
                  {q?.options.map((opt, i) => {
                    const isCorrect = showResult && i === q.correct
                    const isWrongPick = showResult && i === selected && i !== q.correct
                    let cls = "w-full justify-start text-left h-auto p-4"
                    if (isCorrect) cls += " bg-green-600 hover:bg-green-700 text-white"
                    else if (isWrongPick) cls += " bg-red-600 hover:bg-red-700 text-white"
                    else cls += " bg-white/90 hover:bg-white"
                    return (
                      <Button key={i} className={cls} disabled={showResult} onClick={() => handleAnswer(i)}>
                        <div className="flex items-center gap-3 w-full">
                          <div className="w-6 h-6 rounded-full border-2 border-black/70 bg-white text-black flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className="flex-1 text-gray-900">{opt}</span>
                          {isCorrect && <CheckCircle className="w-5 h-5" />}
                          {isWrongPick && <XCircle className="w-5 h-5" />}
                        </div>
                      </Button>
                    )
                  })}
                </div>

                {/* Feedback */}
                {showResult && (
                  <div className={`p-4 rounded-lg ${selected === q.correct ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"}`}>
                    <div className="font-semibold mb-1">{selected === q.correct ? "Correct!" : "Incorrect."}</div>
                    <div className="text-sm">{q.explanation}</div>
                    {selected === q.correct && (
                      <div className="text-sm font-medium mt-2">+10 points{timeLeft > 0 ? ` +${Math.floor(timeLeft * 0.5)} bonus` : ""}</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-white/80">
                <div className="text-sm">Score: <span className="font-semibold text-white">{score}</span></div>
                <div className="text-sm">Bonus: <span className="font-semibold text-white">{timeBonus}</span></div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={retry} className="bg-white/90">
                  <RotateCcw className="w-4 h-4 mr-2" /> Retry
                </Button>
                <Button variant="outline" onClick={onClose} className="bg-white/90">Exit</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}



