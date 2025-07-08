"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Menu, Info, Search, Plus, Edit, MapPin, Users, Phone } from "lucide-react"

const districts = [
  {
    id: 1,
    name: "Wahlbezirk 001 - Mitte",
    eligibleVoters: 2847,
    isCity: true,
    address: "Rathausstraße 15, 10178 Berlin",
    contact: "Maria Schmidt",
    phone: "+49 30 12345678",
    status: "ready",
  },
  {
    id: 2,
    name: "Wahlbezirk 002 - Prenzlauer Berg",
    eligibleVoters: 3156,
    isCity: true,
    address: "Kollwitzstraße 42, 10405 Berlin",
    contact: "Thomas Müller",
    phone: "+49 30 87654321",
    status: "in-progress",
  },
  {
    id: 3,
    name: "Wahlbezirk 003 - Kreuzberg",
    eligibleVoters: 2934,
    isCity: true,
    address: "Oranienstraße 25, 10999 Berlin",
    contact: "Anna Weber",
    phone: "+49 30 11223344",
    status: "validation",
  },
]

export default function DistrictsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const InfoOverlay = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Wahlbezirke Hilfe</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
            ×
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Hier finden Sie eine Übersicht aller Wahlbezirke mit Details wie Anzahl der Wahlberechtigten, Adresse und
            Kontaktperson. Sie können neue Bezirke hinzufügen oder bestehende bearbeiten.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-100 text-green-800">Bereit</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Bearbeitung</Badge>
      case "validation":
        return <Badge className="bg-yellow-100 text-yellow-800">Validierung</Badge>
      default:
        return <Badge variant="secondary">Offen</Badge>
    }
  }

  const filteredDistricts = districts.filter(
    (district) =>
      district.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      district.contact.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <h1 className="text-xl font-semibold">Wahlbezirke</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setShowInfo(true)}>
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 space-y-6">
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Wahlbezirke durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Neuer Wahlbezirk
            </Button>
          </div>

          {/* Districts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDistricts.map((district) => (
              <Card key={district.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{district.name}</CardTitle>
                    {getStatusBadge(district.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {district.eligibleVoters.toLocaleString()} Wahlberechtigte
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {district.address}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {district.contact}
                  </div>

                  <div className="pt-2">
                    <Badge variant={district.isCity ? "default" : "secondary"}>
                      {district.isCity ? "Stadtgebiet" : "Landkreis"}
                    </Badge>
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
