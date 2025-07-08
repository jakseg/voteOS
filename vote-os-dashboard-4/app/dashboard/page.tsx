"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Menu, Info, Users, Server, Activity, Upload } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"

const electionData = [
  { party: "CDU", percentage: 31.9, fill: "#000000" },
  { party: "AfD", percentage: 30.6, fill: "#3182CE" },
  { party: "BSW", percentage: 11.8, fill: "#805AD5" },
  { party: "SPD", percentage: 7.3, fill: "#E53E3E" },
  { party: "BÜNDNISGRÜNE", percentage: 5.1, fill: "#38A169" },
  { party: "Die Linke", percentage: 4.5, fill: "#ED64A6" },
  { party: "FREIE WÄHLER", percentage: 2.3, fill: "#D69E2E" },
  { party: "SONSTIGE", percentage: 6.5, fill: "#718096" },
]

const districtStatus = [
  { status: "Ready", count: 45, color: "bg-green-500" },
  { status: "In Validation", count: 12, color: "bg-yellow-500" },
  { status: "In Progress", count: 8, color: "bg-blue-500" },
  { status: "Open", count: 3, color: "bg-gray-500" },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const InfoOverlay = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Dashboard Übersicht</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
            ×
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Das Dashboard zeigt Ihnen eine Übersicht über den aktuellen Stand der Wahlen. Sie können den Fortschritt der
            einzelnen Wahlbezirke verfolgen, vorläufige Ergebnisse einsehen und Systemmetriken überwachen.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Image src="/images/voteos-logo.png" alt="voteOS" width={120} height={40} className="object-contain" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Wahlleitung</Badge>
              <Button variant="ghost" size="sm" onClick={() => setShowInfo(true)}>
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 space-y-6">
          {/* Progress Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Wahlfortschritt</span>
                <span className="text-2xl font-bold text-green-600">66%</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={66} className="mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {districtStatus.map((status) => (
                  <div key={status.status} className="text-center">
                    <div className={`w-4 h-4 rounded-full ${status.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold">{status.count}</div>
                    <div className="text-sm text-muted-foreground">{status.status}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Election Results Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Vorläufige Ergebnisse - Landtagswahl Sachsen 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={electionData}>
                    <XAxis dataKey="party" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, "Stimmenanteil"]} />
                    <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                      {electionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aktive Benutzer</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-xs text-muted-foreground">+12% seit gestern</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-xs text-muted-foreground">Letzte 24h</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CPU Auslastung</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23%</div>
                <p className="text-xs text-muted-foreground">Durchschnitt</p>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Publish Button */}
        <div className="fixed bottom-4 right-4">
          <Button size="lg" disabled className="bg-gray-400 cursor-not-allowed">
            <Upload className="h-4 w-4 mr-2" />
            Ergebnisse veröffentlichen
          </Button>
        </div>
      </div>

      {showInfo && <InfoOverlay />}
    </div>
  )
}
