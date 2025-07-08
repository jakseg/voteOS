"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Menu, Info, Search, Download, Eye, FileText, Upload, Calendar } from "lucide-react"

const templates = [
  {
    id: 1,
    name: "Schnellmeldung Vorlage",
    type: "template",
    description: "Standardvorlage für Schnellmeldungen",
    lastModified: "2025-01-01",
    size: "245 KB",
  },
  {
    id: 2,
    name: "Wahlergebnis Bericht",
    type: "template",
    description: "Vorlage für detaillierte Wahlergebnisse",
    lastModified: "2024-12-28",
    size: "189 KB",
  },
]

const uploadedDocuments = [
  {
    id: 1,
    name: "Schnellmeldung_WB001.pdf",
    district: "Wahlbezirk 001 - Mitte",
    uploadedBy: "Maria Schmidt",
    uploadDate: "2025-01-01 14:30",
    status: "verified",
    size: "1.2 MB",
  },
  {
    id: 2,
    name: "Schnellmeldung_WB002.pdf",
    district: "Wahlbezirk 002 - Prenzlauer Berg",
    uploadedBy: "Thomas Müller",
    uploadDate: "2025-01-01 14:25",
    status: "pending",
    size: "987 KB",
  },
  {
    id: 3,
    name: "Schnellmeldung_WB003.pdf",
    district: "Wahlbezirk 003 - Kreuzberg",
    uploadedBy: "Anna Weber",
    uploadDate: "2025-01-01 14:20",
    status: "verified",
    size: "1.1 MB",
  },
]

export default function DocumentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("templates")

  const InfoOverlay = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Dokumente Hilfe</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
            ×
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Hier finden Sie Vorlagen für Wahlunterlagen sowie hochgeladene Dokumente aus den verschiedenen Wahlbezirken.
            Sie können Dokumente herunterladen, ansehen und verwalten.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verifiziert</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Ausstehend</Badge>
      default:
        return <Badge variant="secondary">Unbekannt</Badge>
    }
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
              <h1 className="text-xl font-semibold">Dokumente</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setShowInfo(true)}>
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 space-y-6">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === "templates" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("templates")}
            >
              Vorlagen
            </Button>
            <Button
              variant={activeTab === "uploads" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("uploads")}
            >
              Hochgeladene Dokumente
            </Button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Dokumente durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Templates Tab */}
          {activeTab === "templates" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Dokumentvorlagen</h2>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Neue Vorlage
                </Button>
              </div>

              {/* Schnellmeldung Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Schnellmeldung Vorlage - Vorschau</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-white">
                    <Image
                      src="/images/schnellmeldung-form.png"
                      alt="Schnellmeldung Form"
                      width={600}
                      height={800}
                      className="w-full max-w-2xl mx-auto"
                    />
                  </div>
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ansehen
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Herunterladen
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <FileText className="h-5 w-5 mr-2" />
                          {template.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{template.description}</p>

                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {template.lastModified} • {template.size}
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Ansehen
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Uploaded Documents Tab */}
          {activeTab === "uploads" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Hochgeladene Dokumente</h2>
                <div className="text-sm text-gray-600">{uploadedDocuments.length} Dokumente</div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {uploadedDocuments.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <FileText className="h-5 w-5 mr-2" />
                          {doc.name}
                        </CardTitle>
                        {getStatusBadge(doc.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm">
                        <p>
                          <strong>Wahlbezirk:</strong> {doc.district}
                        </p>
                        <p>
                          <strong>Hochgeladen von:</strong> {doc.uploadedBy}
                        </p>
                        <p>
                          <strong>Datum:</strong> {doc.uploadDate}
                        </p>
                        <p>
                          <strong>Größe:</strong> {doc.size}
                        </p>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Ansehen
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {showInfo && <InfoOverlay />}
    </div>
  )
}
