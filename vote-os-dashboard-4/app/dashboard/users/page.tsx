"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"
import { Menu, Info, Search, Plus, Edit, Users, UserCheck, UserX, UserPlus } from "lucide-react"

const userStats = [
  { label: "Total Users", value: 2847, icon: Users, color: "text-blue-600" },
  { label: "Active Users", value: 2654, icon: UserCheck, color: "text-green-600" },
  { label: "Inactive Users", value: 193, icon: UserX, color: "text-red-600" },
  { label: "New This Month", value: 47, icon: UserPlus, color: "text-purple-600" },
]

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2 hours ago",
    avatar: "JD",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Wahlleitung",
    status: "active",
    lastLogin: "1 day ago",
    avatar: "JS",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Wahllokal",
    status: "inactive",
    lastLogin: "1 week ago",
    avatar: "MJ",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Wahllokal",
    status: "active",
    lastLogin: "3 hours ago",
    avatar: "SW",
  },
  {
    id: 5,
    name: "Thomas Mueller",
    email: "thomas@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "30 minutes ago",
    avatar: "TM",
  },
  {
    id: 6,
    name: "Anna Weber",
    email: "anna@example.com",
    role: "Wahlleitung",
    status: "active",
    lastLogin: "5 hours ago",
    avatar: "AW",
  },
]

export default function UsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const InfoOverlay = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Benutzer Hilfe</h3>
          <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
            ×
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Hier können Sie Benutzerkonten verwalten. Sie sehen eine Übersicht aller Benutzer mit ihren Rollen (Admin,
            Wahlleitung, Wahllokal) und können neue Benutzer hinzufügen oder bestehende bearbeiten.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>
      case "Wahlleitung":
        return <Badge className="bg-blue-100 text-blue-800">Wahlleitung</Badge>
      case "Wahllokal":
        return <Badge className="bg-green-100 text-green-800">Wahllokal</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">inactive</Badge>
    )
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <h1 className="text-xl font-semibold">Benutzer</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setShowInfo(true)}>
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 space-y-6">
          {/* User Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userStats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* User Management Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <p className="text-sm text-muted-foreground">View and manage user accounts</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative max-w-md mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Users List */}
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-gray-100">{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          {getRoleBadge(user.role)}
                          {getStatusBadge(user.status)}
                        </div>
                        <p className="text-xs text-gray-500">Last login: {user.lastLogin}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {showInfo && <InfoOverlay />}
    </div>
  )
}
