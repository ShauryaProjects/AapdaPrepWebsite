"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const quickQuestions = [
  "What should I do during an earthquake?",
  "How to prepare for floods?",
  "Fire safety measures at home",
  "Emergency contact numbers",
]

const responses: Record<string, string> = {
  earthquake:
    "During an earthquake: DROP to hands and knees, COVER your head and neck under a desk/table, HOLD ON until shaking stops. Stay away from windows and heavy objects.",
  flood:
    "For flood preparation: Move to higher ground, avoid walking/driving through flood water, keep emergency supplies ready, listen to weather alerts.",
  fire: "Fire safety: Install smoke detectors, plan escape routes, keep fire extinguishers accessible, never use elevators during fire, call 101 immediately.",
  emergency: "Emergency contacts: Fire: 101, Police: 100, Ambulance: 108, NDMA: 1078, Disaster Management: 1070",
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

  const handleSend = (text: string = input) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simple response logic
    setTimeout(() => {
      let response =
        "I understand your concern. For detailed information, please check our learning modules or contact emergency services if it's urgent."

      const lowerText = text.toLowerCase()
      for (const [key, value] of Object.entries(responses)) {
        if (lowerText.includes(key)) {
          response = value
          break
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
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
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96"
          >
            <Card className="h-96 flex flex-col shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Disaster Assistant</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 text-sm ${
                        message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Questions */}
              <div className="p-2 border-t">
                <div className="flex flex-wrap gap-1 mb-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-6 bg-transparent"
                      onClick={() => handleSend(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about disaster safety..."
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={() => handleSend()}>
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
