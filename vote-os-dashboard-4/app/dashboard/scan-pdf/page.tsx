"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sidebar } from "@/components/sidebar"
import { Camera, Check, ArrowLeft, Menu, Info, Upload, Edit } from "lucide-react"

type ElectionType = "european" | "bundestag" | "state" | "mayoral"

export default function ScanPDFPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [step, setStep] = useState(1)
  const [electionType, setElectionType] = useState<ElectionType>()
  const [scannedData, setScannedData] = useState({
    district: "Wahlbezirk 001 - Mitte",
    spd: "156",
    gruene: "134",
    cdu: "189",
    linke: "98",
    afd: "87",
    fdp: "23",
    others: "15",
  })
  const router = useRouter()

  const InfoOverlay = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">PDF Scan Hilfe</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
            ×
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {step === 1 && "Wählen Sie zunächst den Wahltyp aus, für den Sie Ergebnisse erfassen möchten."}
            {step === 2 &&
              "Fotografieren Sie das Wahlprotokoll mit der Kamera. Achten Sie auf gute Beleuchtung und scharfe Aufnahme."}
            {step === 3 && "Überprüfen Sie die automatisch erkannten Daten und korrigieren Sie diese bei Bedarf."}
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const handleNext = () => {
    if (step === 1 && electionType) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push("/dashboard")
    }
  }

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
              <h1 className="text-xl font-semibold">Eingabe Schnellmeldung - Schritt {step} von 3</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowInfo(true)}>
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          {step === 1 && (
            <div className="space-y-6">
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Wahltyp auswählen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select onValueChange={(value) => setElectionType(value as ElectionType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wählen Sie den Wahltyp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="european">Europawahl</SelectItem>
                      <SelectItem value="bundestag">Bundestagswahl</SelectItem>
                      <SelectItem value="state">Landtagswahl</SelectItem>
                      <SelectItem value="mayoral">Bürgermeisterwahl</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleNext} disabled={!electionType} className="w-full">
                    Weiter
                  </Button>
                </CardContent>
              </Card>

              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Eingabemethode wählen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full h-16 flex flex-col bg-transparent"
                    onClick={() => setStep(2)}
                    disabled={!electionType}
                  >
                    <Camera className="h-6 w-6 mb-2" />
                    PDF scannen
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-16 flex flex-col bg-transparent"
                    onClick={() => setStep(3)}
                    disabled={!electionType}
                  >
                    <Edit className="h-6 w-6 mb-2" />
                    Manuell eingeben
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 2 && (
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Wahlprotokoll fotografieren</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Kamera aktivieren</p>
                    <p className="text-sm text-gray-400">Fotografieren Sie das Wahlprotokoll</p>
                  </div>
                </div>
                <Button onClick={handleNext} className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Foto aufgenommen
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  Erkannte Daten überprüfen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district">Wahlbezirk</Label>
                    <Input
                      id="district"
                      value={scannedData.district}
                      onChange={(e) => setScannedData({ ...scannedData, district: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:col-span-2">
                    <div>
                      <Label htmlFor="spd">SPD</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="spd"
                          value={scannedData.spd}
                          onChange={(e) => setScannedData({ ...scannedData, spd: e.target.value })}
                        />
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gruene">GRÜNE</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="gruene"
                          value={scannedData.gruene}
                          onChange={(e) => setScannedData({ ...scannedData, gruene: e.target.value })}
                        />
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cdu">CDU</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="cdu"
                          value={scannedData.cdu}
                          onChange={(e) => setScannedData({ ...scannedData, cdu: e.target.value })}
                        />
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="linke">Die Linke</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="linke"
                          value={scannedData.linke}
                          onChange={(e) => setScannedData({ ...scannedData, linke: e.target.value })}
                        />
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="afd">AfD</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="afd"
                          value={scannedData.afd}
                          onChange={(e) => setScannedData({ ...scannedData, afd: e.target.value })}
                        />
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="fdp">FDP</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="fdp"
                          value={scannedData.fdp}
                          onChange={(e) => setScannedData({ ...scannedData, fdp: e.target.value })}
                        />
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Bestätigung erforderlich:</strong> Ich bestätige, dass die eingegebenen Daten korrekt sind
                    und möchte eine Schnellmeldung unterzeichnen.
                  </p>
                </div>

                <Button onClick={handleNext} className="w-full bg-green-600 hover:bg-green-700">
                  Senden
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      {showInfo && <InfoOverlay />}
    </div>
  )
}
