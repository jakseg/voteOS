"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Smartphone, Shield, Info } from "lucide-react"

export default function LoginPage() {
  const [showPinEntry, setShowPinEntry] = useState(false)
  const [pin, setPin] = useState("")
  const [showInfo, setShowInfo] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    setShowPinEntry(true)
  }

  const handlePinSubmit = () => {
    if (pin === "0000") {
      router.push("/dashboard")
    } else {
      alert('Ungültige PIN. Bitte verwenden Sie "0000".')
    }
  }

  const BundesdruckereiInfoOverlay = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 login-card-bg">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Bundesdruckerei Authentifizierung</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
            ×
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-center mb-3">
            <Image
              src="/images/bundesdruckerei-logo.png"
              alt="Bundesdruckerei"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Sie werden jetzt über die sichere Bundesdruckerei-Infrastruktur authentifiziert. Dies gewährleistet höchste
            Sicherheitsstandards für das Wahlmanagementsystem.
          </p>

          <div className="border-t pt-3">
            <h4 className="font-medium mb-2">PIN-Eingabe:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Geben Sie Ihre 6-stellige Personalausweis-PIN ein</li>
              <li>• Die PIN wird verschlüsselt übertragen</li>
              <li>• Keine lokale Speicherung der PIN</li>
              <li>• Automatische Löschung nach Authentifizierung</li>
            </ul>
          </div>

          <div className="border-t pt-3">
            <h4 className="font-medium mb-2">Sicherheitsfeatures:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ende-zu-Ende Verschlüsselung</li>
              <li>• Bundesdruckerei-zertifizierte Infrastruktur</li>
              <li>• Keine Zwischenspeicherung von Authentifizierungsdaten</li>
              <li>• Compliance mit BSI-Sicherheitsstandards</li>
            </ul>
          </div>

          <div className="border-t pt-3">
            <h4 className="font-medium mb-2">Troubleshooting:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Bei falscher PIN: Eingabe wiederholen</li>
              <li>• Nach 3 Fehlversuchen: 24h Sperrung</li>
              <li>• Kartenlesegerät prüfen</li>
              <li>• AusweisApp2 aktualisieren</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Demo-Hinweis:</strong> In dieser Demonstration verwenden Sie bitte die PIN "0000". Diese Eingabe
              simuliert eine erfolgreiche Bundesdruckerei-Authentifizierung.
            </p>
          </div>

          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-xs text-red-800">
              <strong>Wichtig:</strong> Geben Sie Ihre PIN niemals an Dritte weiter. Die Bundesdruckerei wird Sie
              niemals nach Ihrer PIN fragen.
            </p>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Datenschutz:</strong> Ihre Authentifizierungsdaten werden gemäß DSGVO und BSI-Richtlinien
              verarbeitet und nicht gespeichert.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const MainLoginInfoOverlay = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 login-card-bg">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">voteOS Anmeldehilfe</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
            ×
          </Button>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Willkommen bei voteOS, dem modernen Wahlmanagementsystem. Für die sichere Anmeldung benötigen Sie Ihren
            Personalausweis mit aktivierter Online-Funktion.
          </p>

          <div className="border-t pt-3">
            <h4 className="font-medium mb-2">Benötigte Komponenten:</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Personalausweis mit Online-Funktion und 6-stellige PIN</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Smartphone mit NFC oder Kartenlesegerät</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-sm">AusweisApp2 (empfohlen) oder Browser-Plugin</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-3">
            <h4 className="font-medium mb-2">Anmeldeprozess:</h4>
            <ol className="text-sm text-muted-foreground space-y-1">
              <li>1. Personalausweis und PIN bereithalten</li>
              <li>2. "Anmelden" klicken für Bundesdruckerei-Authentifizierung</li>
              <li>3. PIN eingeben (Demo: "0000")</li>
              <li>4. Automatische Weiterleitung zum Dashboard</li>
            </ol>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Demo-Modus:</strong> Für Testzwecke verwenden Sie die PIN "0000". In der Produktionsumgebung wird
              Ihre echte Personalausweis-PIN benötigt.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  if (showPinEntry) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 login-card-bg">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" size="sm" onClick={() => setShowPinEntry(false)}>
              ← Zurück
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowInfo(true)}>
              <Info className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center mb-4">
            <Image
              src="/images/bundesdruckerei-logo.png"
              alt="Bundesdruckerei"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Bundesdruckerei Login</h2>
          <p className="text-sm text-gray-600 text-center mb-6">Bitte geben Sie Ihre PIN ein</p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="pin">PIN</Label>
              <Input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="0000"
                maxLength={4}
                className="mt-1"
              />
            </div>
            <button
              onClick={handlePinSubmit}
              className="w-full py-3 px-4 login-button hover:login-button rounded-lg font-medium transition-colors"
            >
              Anmelden
            </button>
          </div>
        </div>
        {showInfo && <BundesdruckereiInfoOverlay />}
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 login-card-bg">
        <div className="flex justify-end mb-4">
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(true)}>
            <Info className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center mb-4">
          <Image src="/images/voteos-logo.png" alt="voteOS Logo" width={200} height={80} className="object-contain" />
        </div>
        <h2 className="text-xl font-bold text-blue-600 mb-6 text-center">Halten Sie folgende Dinge bereit</h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 login-item-bg rounded-lg">
            <CreditCard className="h-6 w-6 text-blue-600" />
            <span className="text-blue-700">Personalausweis und PIN</span>
          </div>
          <div className="flex items-center space-x-3 p-3 login-item-bg rounded-lg">
            <Smartphone className="h-6 w-6 text-blue-600" />
            <span className="text-blue-700">Handy oder Kartenlesegerät</span>
          </div>
          <div className="flex items-center space-x-3 p-3 login-item-bg rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-blue-700">Ausweis App</span>
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-3 px-4 login-button hover:login-button rounded-lg font-medium transition-colors"
          >
            Anmelden
          </button>
        </div>
      </div>
      {showInfo && <MainLoginInfoOverlay />}
    </div>
  )
}
