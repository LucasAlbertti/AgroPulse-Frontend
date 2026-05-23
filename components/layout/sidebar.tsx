'use client'

import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Building2,
  Grid3X3,
  Sprout,
  DollarSign,
  Cloud,
  Settings,
  ChevronLeft,
  Menu,
  Leaf,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  activeItem: string
  onItemClick: (item: string) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
  isMobileOpen: boolean
  onMobileClose: () => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'fazendas', label: 'Fazendas', icon: Building2 },
  { id: 'talhoes', label: 'Talhões', icon: Grid3X3 },
  { id: 'safras', label: 'Safras', icon: Sprout },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
  { id: 'clima', label: 'Clima', icon: Cloud },
  { id: 'relatorios', label: 'Relatórios', icon: FileText },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
]

export function Sidebar({ 
  activeItem, 
  onItemClick, 
  isCollapsed, 
  onToggleCollapse,
  isMobileOpen,
  onMobileClose 
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-50 flex flex-col transition-all duration-300',
          isCollapsed ? 'w-[72px]' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className={cn(
          'h-16 flex items-center border-b border-sidebar-border px-4',
          isCollapsed ? 'justify-center' : 'gap-3'
        )}>
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Leaf className="size-6 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-sidebar-foreground">AgroPulse</span>
              <span className="text-xs text-muted-foreground">Gestão Agrícola</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onItemClick(item.id)
                      onMobileClose()
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive 
                        ? 'bg-sidebar-accent text-sidebar-primary' 
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
                      isCollapsed && 'justify-center px-0'
                    )}
                  >
                    <Icon className={cn(
                      'size-5 shrink-0',
                      isActive && 'text-sidebar-primary'
                    )} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Collapse button */}
        <div className="p-3 border-t border-sidebar-border hidden lg:block">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className={cn(
              'w-full',
              isCollapsed && 'justify-center px-0'
            )}
          >
            <ChevronLeft className={cn(
              'size-4 transition-transform',
              isCollapsed && 'rotate-180'
            )} />
            {!isCollapsed && <span>Recolher</span>}
          </Button>
        </div>
      </aside>
    </>
  )
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      onClick={onClick}
    >
      <Menu className="size-5" />
    </Button>
  )
}
