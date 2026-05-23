"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import { MobileMenuButton } from "./sidebar"

interface TopbarProps {
  pageTitle: string
  onMobileMenuClick: () => void
}

export function Topbar({
  pageTitle,
  onMobileMenuClick,
}: TopbarProps) {

  const usuario =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("usuario") || "{}")
      : {}

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6">
      
      <div className="flex items-center gap-4">
        <MobileMenuButton onClick={onMobileMenuClick} />

        <div>
          <h1 className="text-lg lg:text-xl font-semibold text-foreground">
            {pageTitle}
          </h1>

          <p className="text-xs text-muted-foreground hidden sm:block">
            Inteligência para o produtor rural
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">

        {/* Search */}
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Search className="size-5" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />

          <span className="absolute top-1.5 right-1.5 size-2 bg-primary rounded-full" />
        </Button>

        {/* User */}
        <div className="flex items-center gap-3 pl-2 lg:pl-4 border-l border-border">

          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-foreground">
              {usuario?.nome || "Usuário"}
            </p>

            <p className="text-xs text-muted-foreground">
              Administrador
            </p>
          </div>

          <Avatar className="size-9 ring-2 ring-primary/20">

            <AvatarImage
              src="/placeholder-user.jpg"
              alt={usuario?.nome || "Usuário"}
            />

            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              {usuario?.nome
                ? usuario.nome
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                : "U"}
            </AvatarFallback>

          </Avatar>
        </div>
      </div>
    </header>
  )
}