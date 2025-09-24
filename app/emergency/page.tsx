"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 
import { Footer } from "@/components/footer"
import { ChatAssistant } from "@/components/chat-assistant"
import { Phone, AlertTriangle, Camera, Send, Clock, CheckCircle } from "lucide-react"
import { EMERGENCY_CONTACTS } from "@/lib/constants"

export default function EmergencyPage() {
  const [sosActive, setSosActive] = useState(false)
  const [incidentReport, setIncidentReport] = useState({
    type: "",
    location: "",
    description: "",
    severity: "",
  })
  const [reportSubmitted, setReportSubmitted] = useState(false)
  

  const handleSOS = () => {
    setSosActive(true)
    // Simulate emergency call
    setTimeout(() => {
      setSosActive(false)
    }, 5000)
  }

  

  const handleIncidentSubmit = () => {
    console.log("Incident report:", incidentReport)
    setReportSubmitted(true)
    setTimeout(() => {
      setReportSubmitted(false)
      setIncidentReport({ type: "", location: "", description: "", severity: "" })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-balance mb-4 text-red-600">Emergency Tools</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Quick access to emergency services, SOS features, and incident reporting tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SOS Section */}
          <div className="space-y-6">
            {/* SOS Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 border-red-200 dark:border-red-800">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-red-700 dark:text-red-300">Emergency SOS</CardTitle>
                  <CardDescription className="text-red-600 dark:text-red-400">
                    Press and hold for 3 seconds to activate emergency services
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className={`w-32 h-32 rounded-full text-white font-bold text-xl ${
                        sosActive ? "bg-red-700 animate-pulse-glow" : "bg-red-600 hover:bg-red-700"
                      }`}
                      onClick={handleSOS}
                      disabled={sosActive}
                    >
                      {sosActive ? (
                        <div className="flex flex-col items-center">
                          <AlertTriangle className="h-8 w-8 mb-1" />
                          <span className="text-sm">CALLING...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Phone className="h-8 w-8 mb-1" />
                          <span>SOS</span>
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Emergency Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-600" />
                    Emergency Contacts
                  </CardTitle>
                  <CardDescription>Quick dial emergency services and authorities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {EMERGENCY_CONTACTS.map((contact, index) => (
                    <motion.div
                      key={contact.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{contact.icon}</span>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-muted-foreground">{contact.number}</div>
                          </div>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Incident Reporting */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Report Incident
                  </CardTitle>
                  <CardDescription>Report disasters, hazards, or emergency situations in your area</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reportSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-green-600 mb-2">Report Submitted</h3>
                      <p className="text-muted-foreground">
                        Your incident report has been sent to local authorities. Reference ID: #IR
                        {Date.now().toString().slice(-6)}
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="incident-type">Incident Type</Label>
                        <Select
                          value={incidentReport.type}
                          onValueChange={(value) => setIncidentReport({ ...incidentReport, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select incident type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="earthquake">Earthquake</SelectItem>
                            <SelectItem value="flood">Flood</SelectItem>
                            <SelectItem value="fire">Fire</SelectItem>
                            <SelectItem value="cyclone">Cyclone</SelectItem>
                            <SelectItem value="accident">Accident</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="incident-location">Location</Label>
                        <Input
                          id="incident-location"
                          value={incidentReport.location}
                          onChange={(e) => setIncidentReport({ ...incidentReport, location: e.target.value })}
                          placeholder="Enter location or address"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="incident-severity">Severity Level</Label>
                        <Select
                          value={incidentReport.severity}
                          onValueChange={(value) => setIncidentReport({ ...incidentReport, severity: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low - Minor incident</SelectItem>
                            <SelectItem value="medium">Medium - Moderate impact</SelectItem>
                            <SelectItem value="high">High - Significant danger</SelectItem>
                            <SelectItem value="critical">Critical - Life threatening</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="incident-description">Description</Label>
                        <Textarea
                          id="incident-description"
                          value={incidentReport.description}
                          onChange={(e) => setIncidentReport({ ...incidentReport, description: e.target.value })}
                          placeholder="Describe the incident in detail..."
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Camera className="h-4 w-4 mr-2" />
                          Add Photo
                        </Button>
                        
                      </div>

                      <Button
                        onClick={handleIncidentSubmit}
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        disabled={!incidentReport.type || !incidentReport.location || !incidentReport.description}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Submit Report
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    Recent Reports
                  </CardTitle>
                  <CardDescription>Your recent incident reports and their status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Fire incident near school</div>
                      <div className="text-sm text-muted-foreground">Jan 12, 2024 • #IR123456</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Resolved</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Waterlogging on main road</div>
                      <div className="text-sm text-muted-foreground">Jan 10, 2024 • #IR123455</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-yellow-600">In Progress</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Earthquake tremors felt</div>
                      <div className="text-sm text-muted-foreground">Jan 8, 2024 • #IR123454</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-blue-600">Under Review</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Emergency Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Emergency Response Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏗️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Earthquake</h3>
                  <p className="text-sm text-muted-foreground">
                    Drop, Cover, Hold On. Stay away from windows and heavy objects.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌊</span>
                  </div>
                  <h3 className="font-semibold mb-2">Flood</h3>
                  <p className="text-sm text-muted-foreground">
                    Move to higher ground. Avoid walking through flood water.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <h3 className="font-semibold mb-2">Fire</h3>
                  <p className="text-sm text-muted-foreground">
                    Stay low, exit quickly. Never use elevators during fire.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌪️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Cyclone</h3>
                  <p className="text-sm text-muted-foreground">
                    Seek shelter in sturdy buildings. Stay away from windows.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      

      <Footer />
      <ChatAssistant />
    </div>
  )
}
