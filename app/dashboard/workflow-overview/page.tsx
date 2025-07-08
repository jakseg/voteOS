"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import {
  Menu,
  Info,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  User,
  Shield,
  Monitor,
  Camera,
  FileText,
  ComputerIcon as Desktop,
} from "lucide-react"

const workflowSteps = [
  {
    id: 1,
    title: "Login Screen",
    subtitle: "Authentication",
    description: "User enters credentials and PIN",
    icon: User,
    color: "bg-blue-100 text-blue-600",
    status: "completed",
  },
  {
    id: 2,
    title: "PIN Entry",
    subtitle: "Security Verification",
    description: "Bundesdruckerei PIN verification",
    icon: Shield,
    color: "bg-green-100 text-green-600",
    status: "completed",
  },
  {
    id: 3,
    title: "Input Selection",
    subtitle: "Choose Method",
    description: "Select between PDF scan or manual entry",
    icon: Monitor,
    color: "bg-purple-100 text-purple-600",
    status: "active",
  },
  {
    id: 4,
    title: "Camera View",
    subtitle: "Document Capture",
    description: "Photograph election documents",
    icon: Camera,
    color: "bg-orange-100 text-orange-600",
    status: "pending",
  },
  {
    id: 5,
    title: "Document Processing",
    subtitle: "Verification",
    description: "OCR processing and data validation",
    icon: FileText,
    color: "bg-teal-100 text-teal-600",
    status: "pending",
  },
  {
    id: 6,
    title: "Desktop View",
    subtitle: "Final Review",
    description: "Review and submit final results",
    icon: Desktop,
    color: "bg-indigo-100 text-indigo-600",
    status: "pending",
  },
]

export default function WorkflowOverviewPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [selectedStep, setSelectedStep] = useState(1)

  const InfoOverlay = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Workflow Hilfe</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
            ×
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Diese Übersicht zeigt den Dokumenten-Authentifizierungs-Workflow. Klicken Sie auf einen Schritt, um Details
            anzuzeigen und als abgeschlossen zu markieren.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "active":
        return <Clock className="h-5 w-5 text-blue-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Abgeschlossen</Badge>
      case "active":
        return <Badge className="bg-blue-100 text-blue-800">Aktiv</Badge>
      default:
        return <Badge variant="secondary">Ausstehend</Badge>
    }
  }

  const selectedStepData = workflowSteps.find((step) => step.id === selectedStep)
  const completedSteps = workflowSteps.filter((step) => step.status === "completed").length
  const activeSteps = workflowSteps.filter((step) => step.status === "active").length
  const remainingSteps = workflowSteps.filter((step) => step.status === "pending").length

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Workflow Übersicht</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setShowInfo(true)}>
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Authentication Workflow</CardTitle>
              <p className="text-sm text-muted-foreground">Click on any step to view details and mark as completed</p>
            </CardHeader>
            <CardContent>
              {/* Workflow Steps */}
              <div className="flex flex-wrap gap-4 mb-8">
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <Card
                      className={`w-48 cursor-pointer transition-all hover:shadow-md ${
                        selectedStep === step.id ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setSelectedStep(step.id)}
                    >
                      <CardContent className="p-4">
                        <div className={`w-12 h-12 rounded-lg ${step.color} flex items-center justify-center mb-3`}>
                          <step.icon className="h-6 w-6" />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">{step.title}</h3>
                          {getStatusIcon(step.status)}
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{step.subtitle}</p>
                      </CardContent>
                    </Card>
                    {index < workflowSteps.length - 1 && <ArrowRight className="h-5 w-5 text-gray-400 mx-2" />}
                  </div>
                ))}
              </div>

              {/* Selected Step Details */}
              {selectedStepData && (
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <selectedStepData.icon className="h-5 w-5 mr-2" />
                        Step {selectedStepData.id}: {selectedStepData.title}
                      </CardTitle>
                      {getStatusBadge(selectedStepData.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Process Details:</h4>
                        <p className="text-sm text-gray-600">{selectedStepData.description}</p>
                      </div>

                      {selectedStepData.id === 1 && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm">Anmeldescreen: 'bitte halte deinen Perso und pin bereit'</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {selectedStepData.status !== "completed" && (
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completed
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Next Step
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">{completedSteps}</div>
                    <div className="text-sm text-gray-600">Completed Steps</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{activeSteps}</div>
                    <div className="text-sm text-gray-600">Active Step</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <AlertCircle className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-orange-600">{remainingSteps}</div>
                    <div className="text-sm text-gray-600">Remaining Steps</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {showInfo && <InfoOverlay />}
    </div>
  )
}
