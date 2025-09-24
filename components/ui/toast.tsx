"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function showToast(message: string, options?: { durationMs?: number }) {
  const durationMs = options?.durationMs ?? 1800
  const containerId = "__app_toast_container__"
  let container = document.getElementById(containerId)
  if (!container) {
    container = document.createElement("div")
    container.id = containerId
    container.className = "fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2"
    document.body.appendChild(container)
  }
  const el = document.createElement("div")
  el.className = "rounded-md bg-foreground/90 text-background px-3 py-2 text-sm shadow"
  el.textContent = message
  container.appendChild(el)
  setTimeout(() => {
    el.remove()
    if (container && container.children.length === 0) container.remove()
  }, durationMs)
}

export function ToastExample({ message }: { message: string }) {
  const [open, setOpen] = useState(true)
  useEffect(() => {
    const id = setTimeout(() => setOpen(false), 2000)
    return () => clearTimeout(id)
  }, [])
  if (!open) return null
  return (
    <div className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] rounded-md bg-foreground text-background px-3 py-2 text-sm shadow")}>{message}</div>
  )
}


