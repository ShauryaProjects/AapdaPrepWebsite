"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChatAssistant } from "@/components/chat-assistant"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Users,
  Calendar,
  BookOpen,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  FileText,
  BarChart3,
  PieChartIcon,
  Activity,
} from "lucide-react"

const participationData = [
  { month: "Jan", students: 120, teachers: 15, participation: 85 },
  { month: "Feb", students: 135, teachers: 18, participation: 88 },
  { month: "Mar", students: 150, teachers: 20, participation: 92 },
  { month: "Apr", students: 165, teachers: 22, participation: 89 },
  { month: "May", students: 180, teachers: 25, participation: 94 },
  { month: "Jun", students: 195, teachers: 28, participation: 96 },
]

const performanceData = [
  { class: "Class 6", score: 78 },
  { class: "Class 7", score: 82 },
  { class: "Class 8", score: 85 },
  { class: "Class 9", score: 88 },
  { class: "Class 10", score: 91 },
  { class: "Class 11", score: 87 },
  { class: "Class 12", score: 93 },
]

const moduleCompletionData = [
  { name: "Earthquake", value: 85, color: "#f59e0b" },
  { name: "Flood", value: 72, color: "#3b82f6" },
  { name: "Fire", value: 91, color: "#ef4444" },
  { name: "Cyclone", value: 68, color: "#8b5cf6" },
]

const drills = [
  { id: 1, title: "Fire Evacuation Drill", date: "2024-01-20", participants: 45, status: "scheduled" },
  { id: 2, title: "Earthquake Response", date: "2024-01-18", participants: 38, status: "completed" },
  { id: 3, title: "Flood Safety Training", date: "2024-01-25", participants: 32, status: "scheduled" },
]

const reports = [
  { id: 1, title: "Monthly Preparedness Report", date: "2024-01-15", type: "PDF", size: "2.3 MB" },
  { id: 2, title: "Drill Performance Analysis", date: "2024-01-10", type: "Excel", size: "1.8 MB" },
  { id: 3, title: "Student Progress Summary", date: "2024-01-05", type: "PDF", size: "3.1 MB" },
]

export default function DashboardPage() {
  const [newDrill, setNewDrill] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    maxParticipants: "",
  })

  const [newContent, setNewContent] = useState({
    title: "",
    type: "",
    description: "",
    difficulty: "",
  })

  const handleScheduleDrill = () => {
    console.log("Scheduling drill:", newDrill)
    // Reset form
    setNewDrill({ title: "", type: "", date: "", time: "", maxParticipants: "" })
  }

  const handleUploadContent = () => {
    console.log("Uploading content:", newContent)
    // Reset form
    setNewContent({ title: "", type: "", description: "", difficulty: "" })
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
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-balance mb-4">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground text-balance">
            Manage drills, content, analytics, and generate reports for disaster preparedness training.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Drills</p>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-blue-600">3 scheduled today</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Score</p>
                  <p className="text-2xl font-bold">86%</p>
                  <p className="text-xs text-green-600">+4% improvement</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-xs text-green-600">Above target</p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="drills" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Drill Management
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Content Management
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Reports
              </TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Participation Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Participation Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={participationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="participation" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Performance by Class */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Performance by Class
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="class" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="score" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Module Completion */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5" />
                      Module Completion Rates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={moduleCompletionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {moduleCompletionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* User Growth */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={participationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="students" fill="#3b82f6" />
                        <Bar dataKey="teachers" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Drill Management Tab */}
            <TabsContent value="drills" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Schedule New Drill */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Schedule New Drill
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="drill-title">Drill Title</Label>
                      <Input
                        id="drill-title"
                        value={newDrill.title}
                        onChange={(e) => setNewDrill({ ...newDrill, title: e.target.value })}
                        placeholder="Enter drill title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="drill-type">Disaster Type</Label>
                      <Select
                        value={newDrill.type}
                        onValueChange={(value) => setNewDrill({ ...newDrill, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select disaster type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="earthquake">Earthquake</SelectItem>
                          <SelectItem value="flood">Flood</SelectItem>
                          <SelectItem value="fire">Fire</SelectItem>
                          <SelectItem value="cyclone">Cyclone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="drill-date">Date</Label>
                        <Input
                          id="drill-date"
                          type="date"
                          value={newDrill.date}
                          onChange={(e) => setNewDrill({ ...newDrill, date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="drill-time">Time</Label>
                        <Input
                          id="drill-time"
                          type="time"
                          value={newDrill.time}
                          onChange={(e) => setNewDrill({ ...newDrill, time: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-participants">Max Participants</Label>
                      <Input
                        id="max-participants"
                        type="number"
                        value={newDrill.maxParticipants}
                        onChange={(e) => setNewDrill({ ...newDrill, maxParticipants: e.target.value })}
                        placeholder="50"
                      />
                    </div>
                    <Button onClick={handleScheduleDrill} className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Drill
                    </Button>
                  </CardContent>
                </Card>

                {/* Existing Drills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Drills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {drills.map((drill) => (
                        <div key={drill.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{drill.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {drill.date} • {drill.participants} participants
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={drill.status === "completed" ? "secondary" : "default"}>
                              {drill.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Content Management Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload New Content */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Upload New Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content-title">Content Title</Label>
                      <Input
                        id="content-title"
                        value={newContent.title}
                        onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                        placeholder="Enter content title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content-type">Content Type</Label>
                      <Select
                        value={newContent.type}
                        onValueChange={(value) => setNewContent({ ...newContent, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="interactive">Interactive Module</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content-description">Description</Label>
                      <Textarea
                        id="content-description"
                        value={newContent.description}
                        onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
                        placeholder="Enter content description"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content-difficulty">Difficulty Level</Label>
                      <Select
                        value={newContent.difficulty}
                        onValueChange={(value) => setNewContent({ ...newContent, difficulty: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleUploadContent} className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Content
                    </Button>
                  </CardContent>
                </Card>

                {/* Content Library */}
                <Card>
                  <CardHeader>
                    <CardTitle>Content Library</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Earthquake Safety Basics</h4>
                          <p className="text-sm text-muted-foreground">Video • Beginner • 15 min</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Published</Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Fire Evacuation Procedures</h4>
                          <p className="text-sm text-muted-foreground">Interactive • Intermediate • 25 min</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Published</Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Flood Response Quiz</h4>
                          <p className="text-sm text-muted-foreground">Quiz • Beginner • 10 min</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Draft</Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Generated Reports
                  </CardTitle>
                  <CardDescription>Download comprehensive reports for NDMA and government integration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <h4 className="font-medium">{report.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {report.date} • {report.type} • {report.size}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-4">Generate New Report</h3>
                    <div className="flex gap-2">
                      <Button>
                        <FileText className="h-4 w-4 mr-2" />
                        Monthly Summary
                      </Button>
                      <Button variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Performance Analysis
                      </Button>
                      <Button variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        User Statistics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <Footer />
      <ChatAssistant />
    </div>
  )
}
