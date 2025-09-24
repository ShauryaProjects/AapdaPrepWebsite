"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 
import { Footer } from "@/components/footer"
import { ChatAssistant } from "@/components/chat-assistant"
import { AlertTriangle, MapPin, Clock, Filter, Bell } from "lucide-react"
import { DISASTER_TYPES, SEVERITY_LEVELS } from "@/lib/constants"

const alerts = [
  {
    id: "1",
    type: "earthquake" as const,
    title: "Moderate Earthquake Alert",
    description: "Seismic activity detected in the region. Magnitude 4.2 earthquake recorded.",
    severity: "medium" as const,
    region: "Delhi NCR",
    timestamp: "2024-01-15T10:30:00Z",
    isActive: true,
  },
  {
    id: "2",
    type: "flood" as const,
    title: "Heavy Rainfall Warning",
    description: "Continuous heavy rainfall expected for next 48 hours. Risk of urban flooding.",
    severity: "high" as const,
    region: "Mumbai, Maharashtra",
    timestamp: "2024-01-15T08:15:00Z",
    isActive: true,
  },
  {
    id: "3",
    type: "cyclone" as const,
    title: "Cyclone Approaching Coast",
    description: "Tropical cyclone moving towards eastern coast. Wind speeds up to 120 km/h expected.",
    severity: "critical" as const,
    region: "Odisha Coast",
    timestamp: "2024-01-15T06:00:00Z",
    isActive: true,
  },
  {
    id: "4",
    type: "fire" as const,
    title: "Forest Fire Contained",
    description: "Forest fire in the hills has been successfully contained by fire department.",
    severity: "low" as const,
    region: "Uttarakhand Hills",
    timestamp: "2024-01-14T16:45:00Z",
    isActive: false,
  },
]

export default function AlertsPage() {
  const [filterType, setFilterType] = useState<string>("all")
  const [filterSeverity, setFilterSeverity] = useState<string>("all")

  const filteredAlerts = alerts.filter((alert) => {
    const typeMatch = filterType === "all" || alert.type === filterType
    const severityMatch = filterSeverity === "all" || alert.severity === filterSeverity
    return typeMatch && severityMatch
  })

  const activeAlerts = alerts.filter((alert) => alert.isActive)

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
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
          <h1 className="text-4xl font-bold text-balance mb-4">Disaster Alerts</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Stay informed with real-time disaster alerts and emergency notifications.
          </p>
        </motion.div>

        {/* Alert Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <Bell className="h-5 w-5" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{activeAlerts.length}</div>
                  <div className="text-sm text-muted-foreground">Active Alerts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {activeAlerts.filter((a) => a.severity === "critical").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Critical Alerts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {activeAlerts.filter((a) => a.severity === "high").length}
                  </div>
                  <div className="text-sm text-muted-foreground">High Priority</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="earthquake">Earthquake</SelectItem>
              <SelectItem value="flood">Flood</SelectItem>
              <SelectItem value="fire">Fire</SelectItem>
              <SelectItem value="cyclone">Cyclone</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert, index) => {
            const disasterType = DISASTER_TYPES[alert.type]
            const severityLevel = SEVERITY_LEVELS[alert.severity]

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`${severityLevel.borderColor} border-l-4 ${!alert.isActive ? "opacity-60" : ""}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${disasterType.bgColor} flex items-center justify-center text-lg`}
                        >
                          {disasterType.icon}
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {alert.title}
                            {alert.isActive && (
                              <Badge variant="destructive" className="animate-pulse">
                                ACTIVE
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {alert.region}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTime(alert.timestamp)}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={`${severityLevel.color} ${severityLevel.bgColor}`} variant="secondary">
                        {severityLevel.name}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{alert.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {alert.isActive && (
                        <Button size="sm">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Emergency Response
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filteredAlerts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No alerts found</h3>
            <p className="text-muted-foreground">No alerts match your current filter criteria.</p>
          </motion.div>
        )}
      </div>

      <Footer />
      <ChatAssistant />
    </div>
  )
}
