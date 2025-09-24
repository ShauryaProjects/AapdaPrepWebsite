"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}



export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your disaster preparedness assistant. How can I help you stay safe?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const scrollRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isOpen])

  // Lock background scroll when chat is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    if (isOpen) {
      // Prevent layout shift by compensating for scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isOpen])

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Use AI API via server route only
    setIsTyping(true)
    try {
      const history = messages
        .concat(userMessage)
        .map((m) => ({ role: m.isUser ? "user" : "assistant", content: m.text }))

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      })

      if (res.ok) {
        const data = await res.json()
        const replyText: string = data?.reply || ""
        if (replyText) {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: replyText,
            isUser: false,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, botMessage])
          setIsTyping(false)
          return
        }
      }
    } catch (e) {
      // ignore and show a generic error
    }
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "Sorry, I couldn't reach the AI service right now. Please try again.",
      isUser: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, botMessage])
    setIsTyping(false)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button onClick={() => setIsOpen(true)} size="lg" className="h-14 w-14 rounded-full shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-2 left-2 sm:right-6 sm:left-auto z-50 w-auto sm:w-[26rem] md:w-[32rem]"
          >
            <Card className="h-[28rem] sm:h-[32rem] md:h-[36rem] flex flex-col shadow-2xl border border-border/60">
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <h3 className="font-semibold">Disaster Assistant</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/40">
                {messages.map((message) => (
                  <div key={message.id} className={`flex items-end gap-2 ${message.isUser ? "justify-end" : "justify-start"}`}>
                    {!message.isUser && (
                      <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">AI</div>
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow ${
                        message.isUser
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      <div>{message.text}</div>
                      <div className={`mt-1 text-[10px] ${message.isUser ? "text-white/80" : "text-foreground/60"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    {message.isUser && (
                      <div className="h-7 w-7 rounded-full bg-zinc-800 text-white flex items-center justify-center text-[10px]">You</div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-end gap-2 justify-start">
                    <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">AI</div>
                    <div className="bg-muted text-foreground rounded-2xl rounded-bl-sm px-3 py-2 text-sm shadow">
                      <span className="inline-flex gap-1 items-center">
                        <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-.2s]"></span>
                        <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-bounce"></span>
                        <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:.2s]"></span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

            

              {/* Input */}
              <div className="p-3 border-t bg-background/60">
                <div className="flex gap-2 items-end">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about disaster safety..."
                    rows={3}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    className="flex-1 resize-none"
                  />
                  <Button size="sm" onClick={() => handleSend()} disabled={!input.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
