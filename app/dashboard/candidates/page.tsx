"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Menu, Info, Search, Plus, Edit, User, MapPin } from "lucide-react"

const candidates = [
  {
    id: 1,
    name: "Maria Schmidt",
    gender: "Weiblich",
    age: 45,
    profession: "Rechtsanwältin",
    address: "Unter den Linden 12, 10117 Berlin",
    party: "SPD",
    listPosition: 1,
    district: "Wahlbezirk 001 - Mitte",
  },
  {
    id: 2,
    name: "Thomas Müller",
    gender: "Männlich",
    age: 52,
    profession: "Ingenieur",
    address: "Friedrichstraße 45, 10117 Berlin",
    party: "CDU",
    listPosition: 2,
    district: "Wahlbezirk 002 - Prenzlauer Berg",
  },
  {
    id: 3,
    name: "Anna Weber",
    gender: "Weiblich",
    age: 38,
    profession: "Lehrerin",
    address: "Kastanienallee 23, 10435 Berlin",
    party: "GRÜNE",
    listPosition: 1,
    district: "Wahlbezirk 003 - Kreuzberg",
  },
  {
    id: 4,
    name: "Michael Fischer",
    gender: "Männlich",
    age: 41,
    profession: "Sozialarbeiter",
    address: "Warschauer Straße 67, 10243 Berlin",
    party: "Die Linke",
    listPosition: 3,
    district: "Wahlbezirk 001 - Mitte",
  },
]

export default function CandidatesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const InfoOverlay = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Kandidaten Hilfe</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
            ×
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Hier finden Sie eine Übersicht aller Kandidaten mit ihren persönlichen Daten, Parteizugehörigkeit und
            Wahlbezirk-Zuordnung.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.district.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPartyColor = (party: string) => {
    const colors: { [key: string]: string } = {
      SPD: "#E53E3E",
      CDU: "#718096",
      GRÜNE: "#38A169",
      "Die Linke": "#805AD5",
      AfD: "#3182CE",
      FDP: "#D69E2E",
      BSW: "#ED64A6",
    }
    return colors[party] || "#A0AEC0"
  }

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
              <h1 className="text-xl font-semibold">Kandidaten</h1>
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
                placeholder="Kandidaten durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Neuer Kandidat
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      {candidate.name}
                    </CardTitle>
                    <Badge style={{ backgroundColor: getPartyColor(candidate.party), color: "white" }}>
                      {candidate.party}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Geschlecht:</span>
                      <p>{candidate.gender}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Alter:</span>
                      <p>{candidate.age} Jahre</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Beruf:</span>
                      <p>{candidate.profession}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Listenplatz:</span>
                      <p>Position {candidate.listPosition}</p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium text-gray-600 flex items-center mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      Adresse:
                    </span>
                    <p>{candidate.address}</p>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium text-gray-600">Wahlbezirk:</span>
                    <p>{candidate.district}</p>
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
