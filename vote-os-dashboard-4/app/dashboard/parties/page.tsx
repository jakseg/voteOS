"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Menu, Info, Search, Plus, Edit } from "lucide-react"

const parties = [
  {
    id: 1,
    name: "Sozialdemokratische Partei Deutschlands",
    abbreviation: "SPD",
    color: "#E53E3E",
    ballotPosition: 1,
  },
  {
    id: 2,
    name: "Bündnis 90/Die Grünen",
    abbreviation: "GRÜNE",
    color: "#38A169",
    ballotPosition: 2,
  },
  {
    id: 3,
    name: "Christlich Demokratische Union",
    abbreviation: "CDU",
    color: "#718096",
    ballotPosition: 3,
  },
  {
    id: 4,
    name: "Die Linke",
    abbreviation: "Die Linke",
    color: "#805AD5",
    ballotPosition: 4,
  },
  {
    id: 5,
    name: "Alternative für Deutschland",
    abbreviation: "AfD",
    color: "#3182CE",
    ballotPosition: 5,
  },
  {
    id: 6,
    name: "Freie Demokratische Partei",
    abbreviation: "FDP",
    color: "#D69E2E",
    ballotPosition: 6,
  },
  {
    id: 7,
    name: "Bündnis Sahra Wagenknecht",
    abbreviation: "BSW",
    color: "#ED64A6",
    ballotPosition: 7,
  },
]

export default function PartiesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const InfoOverlay = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Parteien Hilfe</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
            ×
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Hier finden Sie eine Übersicht aller zur Wahl zugelassenen Parteien mit ihren offiziellen Namen,
            Abkürzungen, Farben und Positionen auf dem Stimmzettel.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const filteredParties = parties.filter(
    (party) =>
      party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <h1 className="text-xl font-semibold">Parteien</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setShowInfo(true)}>
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Parteien durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Neue Partei
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParties.map((party) => (
              <Card key={party.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{party.abbreviation}</CardTitle>
                    <Badge variant="outline">Position {party.ballotPosition}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{party.name}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-200"
                      style={{ backgroundColor: party.color }}
                    />
                    <span className="text-sm text-gray-600">{party.color}</span>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Bearbeiten
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {showInfo && <InfoOverlay />}
    </div>
  )
}
