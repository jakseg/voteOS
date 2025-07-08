"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Database,
  Workflow,
  FileText,
  ChevronDown,
  ChevronRight,
  Users,
  Building,
  UserCheck,
  ScanLine,
  FileInput,
  X,
  LogOut,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    icon: Database,
    href: "/dashboard",
  },
  {
    name: "Wahldaten",
    icon: Database,
    children: [
      { name: "Wahlbezirke", href: "/dashboard/districts", icon: Building },
      { name: "Parteien", href: "/dashboard/parties", icon: Users },
      { name: "Kandidaten", href: "/dashboard/candidates", icon: UserCheck },
    ],
  },
  {
    name: "Workflow",
    icon: Workflow,
    children: [
      { name: "Workflow Übersicht", href: "/dashboard/workflow-overview", icon: FileInput },
      { name: "Eingabe Schnellmeldung", href: "/dashboard/scan-pdf", icon: ScanLine },
    ],
  },
  {
    name: "Documents",
    icon: FileText,
    href: "/dashboard/documents",
  },
  {
    name: "Benutzer",
    icon: Users,
    href: "/dashboard/users",
  },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const router = useRouter()

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold voteos-gradient">voteOS</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <>
                  <Button variant="ghost" className="w-full justify-between" onClick={() => toggleExpanded(item.name)}>
                    <div className="flex items-center">
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </div>
                    {expandedItems.includes(item.name) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>

                  {expandedItems.includes(item.name) && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "w-full justify-start",
                              pathname === child.href && "bg-purple-100 text-purple-700",
                            )}
                          >
                            {child.icon && <child.icon className="h-4 w-4 mr-2" />}
                            {child.name}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href || "#"}>
                  <Button
                    variant="ghost"
                    className={cn("w-full justify-start", pathname === item.href && "bg-purple-100 text-purple-700")}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="text-sm text-gray-600 mb-2">Rolle: Wahlleitung</div>
          <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={() => router.push("/login")}>
            <LogOut className="h-4 w-4 mr-2" />
            Abmelden
          </Button>
        </div>
      </div>
    </>
  )
}
