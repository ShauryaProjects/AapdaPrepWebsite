"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type UsageDateISO = string // e.g., "2025-09-23"

export interface ContributionHeatmapProps {
  // optional: pass in usage dates; if not provided, read from localStorage
  usageDates?: UsageDateISO[]
  // storage key to persist local usage; use same key across app
  storageKey?: string
  // number of weeks to show (GitHub uses 53; default 52 for layout)
  weeks?: number
  // callback when a day is toggled (for future extensibility)
  onToggleDay?: (dateISO: string, nowActive: boolean) => void
}

function formatISODate(d: Date): UsageDateISO {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

// Generate a 7 x N matrix of dates ending today, starting on Sunday
function generateCalendarMatrix(weeks: number): Date[][] {
  const today = startOfDay(new Date())
  const dayOfWeek = today.getDay() // 0 = Sun ... 6 = Sat
  // Last column ends at today; we need to fill back to the previous Sunday start for the first column
  const end = new Date(today)
  const start = new Date(today)
  const totalDays = weeks * 7
  start.setDate(start.getDate() - (totalDays - 1) - dayOfWeek)

  const days: Date[] = []
  const cursor = new Date(start)
  while (cursor <= end) {
    days.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  // pad to full weeks if needed
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1]
    const next = new Date(last)
    next.setDate(next.getDate() + 1)
    days.push(next)
  }

  const matrix: Date[][] = []
  for (let c = 0; c < days.length; c += 7) {
    matrix.push(days.slice(c, c + 7))
  }
  return matrix
}

export default function ContributionHeatmap({
  usageDates,
  storageKey = "aapdaprep:usageDates",
  weeks = 53,
  onToggleDay,
}: ContributionHeatmapProps) {
  const [localDates, setLocalDates] = useState<Set<UsageDateISO>>(new Set())
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [cellSize, setCellSize] = useState<number>(8)
  const gapPx = 2
  const leftLabelWidthPx = 36

  // Load from storage if not provided
  useEffect(() => {
    if (usageDates && usageDates.length) {
      setLocalDates(new Set(usageDates))
      return
    }
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (raw) {
        const parsed = JSON.parse(raw) as UsageDateISO[]
        setLocalDates(new Set(parsed))
      }
    } catch {
      // ignore
    }
  }, [usageDates, storageKey])

  // Ensure today is counted as used if we are currently on the site
  useEffect(() => {
    const todayISO = formatISODate(new Date())
    if (!localDates.has(todayISO)) {
      const next = new Set(localDates)
      next.add(todayISO)
      setLocalDates(next)
    }
  }, [])

  // Seed more sample days across months for demo if there's no history saved yet
  useEffect(() => {
    if (localDates.size <= 1) {
      const seed = new Set(localDates)
      const addDaysAgo = (n: number) => {
        const d = new Date()
        d.setDate(d.getDate() - n)
        seed.add(formatISODate(d))
      }
      ;[2, 3, 5, 7, 14, 21, 28, 35, 45, 105, 180, 210,211,212,213,214, 240, 270,280,281,282,283,284,300, 330].forEach(addDaysAgo)
      setLocalDates(seed)
    }
    // run once after initial mount/local load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(Array.from(localDates)))
    } catch {
      // ignore
    }
  }, [localDates, storageKey])

  const matrix = useMemo(() => generateCalendarMatrix(weeks), [weeks])
  const todayISO = formatISODate(new Date())

  const getLevel = (dateISO: string): number => {
    if (!localDates.has(dateISO)) return 0
    // Derive a shade (1..4) based on date to create varied sample intensities
    const d = new Date(dateISO)
    const variant = (d.getMonth() + d.getDate()) % 4
    return 1 + variant
  }

  const levelToColor = (level: number): string => {
    // Lighter palette
    switch (level) {
      case 0:
        return "bg-muted/30 hover:bg-muted/50"
      case 1:
        return "bg-green-200"
      case 2:
        return "bg-green-400"
      case 3:
        return "bg-green-600"
      case 4:
        return "bg-green-800"
      default:
        return "bg-muted/30"
    }
  }

  const toggleDay = (d: Date) => {
    const iso = formatISODate(d)
    const next = new Set(localDates)
    if (next.has(iso)) next.delete(iso)
    else next.add(iso)
    setLocalDates(next)
    onToggleDay?.(iso, next.has(iso))
  }

  // Compute month labels for columns (show label when month changes)
  const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const
  const monthLabels = useMemo(() => {
    const labels: (string | null)[] = []
    let lastMonth = -1
    for (let i = 0; i < matrix.length; i++) {
      const sunday = matrix[i][0]
      const month = sunday.getMonth()
      if (month !== lastMonth) {
        labels.push(MONTHS_SHORT[month])
        lastMonth = month
      } else {
        labels.push(null)
      }
    }
    return labels
  }, [matrix])

  const weekdayLabelForRow = (rowIdx: number): string => {
    if (rowIdx === 1) return "Mon"
    if (rowIdx === 3) return "Wed"
    if (rowIdx === 5) return "Fri"
    return ""
  }

  // Resize-aware cell sizing to fill container width without overflow
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        const columns = matrix.length
        if (columns === 0) return
        const totalGaps = (columns - 1) * gapPx
        const available = Math.max(0, width - leftLabelWidthPx - totalGaps)
        const computed = Math.floor(available / columns)
        // clamp to sane bounds
        const clamped = Math.max(7, Math.min(12, computed))
        setCellSize(clamped)
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [matrix.length])

  return (
    <div className="space-y-3" ref={containerRef}>
      {/* Month labels */}
      <div className="flex gap-[2px] text-[10px] text-muted-foreground select-none" style={{ marginLeft: leftLabelWidthPx }}>
        {monthLabels.map((label, i) => (
          <div key={i} className="text-center" style={{ width: cellSize }}>
            {label}
          </div>
        ))}
      </div>

      <div className="flex" style={{ columnGap: gapPx }}>
        {/* Weekday labels column */}
        <div className="grid grid-rows-7 text-[10px] text-muted-foreground select-none" style={{ rowGap: gapPx, marginRight: 4, width: leftLabelWidthPx }}>
          {[0, 1, 2, 3, 4, 5, 6].map((r) => (
            <div key={r} className="flex items-center" style={{ height: cellSize }}>
              {weekdayLabelForRow(r)}
            </div>
          ))}
        </div>

        {/* Heatmap cells */}
        {matrix.map((col, colIdx) => (
          <div key={colIdx} className="grid grid-rows-7" style={{ rowGap: gapPx }}>
            {col.map((dayDate, rowIdx) => {
              const iso = formatISODate(dayDate)
              const isToday = iso === todayISO
              const level = getLevel(iso)
              const color = levelToColor(level)
              return (
                <button
                  key={`${colIdx}-${rowIdx}`}
                  title={iso}
                  aria-label={iso}
                  onClick={() => toggleDay(dayDate)}
                  className={`rounded-[2px] transition-colors ${color} ${isToday ? "ring-1 ring-offset-1 ring-primary/60" : ""}`}
                  style={{ width: cellSize, height: cellSize }}
                />
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <span className="inline-block rounded-[2px] bg-muted/30" style={{ width: Math.max(6, cellSize - 2), height: Math.max(6, cellSize - 2) }} />
        <span className="inline-block rounded-[2px] bg-green-200" style={{ width: Math.max(6, cellSize - 2), height: Math.max(6, cellSize - 2) }} />
        <span className="inline-block rounded-[2px] bg-green-400" style={{ width: Math.max(6, cellSize - 2), height: Math.max(6, cellSize - 2) }} />
        <span className="inline-block rounded-[2px] bg-green-600" style={{ width: Math.max(6, cellSize - 2), height: Math.max(6, cellSize - 2) }} />
        <span className="inline-block rounded-[2px] bg-green-800" style={{ width: Math.max(6, cellSize - 2), height: Math.max(6, cellSize - 2) }} />
        <span>More</span>
        <span className="ml-auto">Today highlighted</span>
      </div>
    </div>
  )
}


