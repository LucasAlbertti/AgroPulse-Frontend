'use client'

import { useEffect, useState } from 'react'

import { Sidebar } from '@/components/layout/sidebar'
import { Topbar } from '@/components/layout/topbar'

import { DashboardContent } from '@/components/dashboard/dashboard-content'

import { FazendasPage } from '@/components/fazendas/fazendas-page'
import { TalhoesPage } from '@/components/talhoes/talhoes-page'
import { SafrasPage } from '@/components/safras/safras-page'
import { FinanceiroPage } from '@/components/financeiro/financeiro-page'
import { ClimaPage } from '@/components/clima/clima-page'
import { ConfiguracoesPage } from '@/components/configuracoes/configuracoes-page'

import { LoginForm } from '@/components/auth/login-form'

import { cn } from '@/lib/utils'

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  fazendas: 'Fazendas',
  talhoes: 'Talhões',
  safras: 'Safras',
  financeiro: 'Financeiro',
  clima: 'Clima',
  configuracoes: 'Configurações',
}

export default function Home() {

  const [activeItem, setActiveItem] = useState('dashboard')

  const [isCollapsed, setIsCollapsed] = useState(false)

  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const [token, setToken] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const storedToken = localStorage.getItem('token')

    setToken(storedToken)

    setLoading(false)

  }, [])

  if (loading) {

    return null
  }

  if (!token) {

    return <LoginForm />
  }

  return (

    <div className="min-h-screen bg-background">

      <Sidebar
        activeItem={activeItem}
        onItemClick={setActiveItem}
        isCollapsed={isCollapsed}
        onToggleCollapse={() =>
          setIsCollapsed(!isCollapsed)
        }
        isMobileOpen={isMobileOpen}
        onMobileClose={() =>
          setIsMobileOpen(false)
        }
      />

      <div
        className={cn(
          'transition-all duration-300',
          isCollapsed
            ? 'lg:pl-[72px]'
            : 'lg:pl-64'
        )}
      >

        <Topbar
          pageTitle={pageTitles[activeItem]}
          onMobileMenuClick={() =>
            setIsMobileOpen(true)
          }
        />

        <main className="p-4 lg:p-6">

          {activeItem === 'dashboard' && (
            <DashboardContent />
          )}

          {activeItem === 'fazendas' && (
            <FazendasPage />
          )}

          {activeItem === 'talhoes' && (
            <TalhoesPage />
          )}

          {activeItem === 'safras' && (
            <SafrasPage />
          )}

          {activeItem === 'financeiro' && (
            <FinanceiroPage />
          )}

          {activeItem === 'clima' && (
            <ClimaPage />
          )}

          {activeItem === 'configuracoes' && (
            <ConfiguracoesPage />
          )}

          {activeItem !== 'dashboard' &&
            activeItem !== 'fazendas' &&
            activeItem !== 'talhoes' &&
            activeItem !== 'safras' &&
            activeItem !== 'financeiro' &&
            activeItem !== 'clima' &&
            activeItem !== 'configuracoes' && (

            <div className="flex items-center justify-center h-[60vh]">

              <div className="text-center space-y-4">

                <div className="size-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">

                  <span className="text-3xl">
                    🚜
                  </span>

                </div>

                <div>

                  <h2 className="text-xl font-semibold text-foreground">
                    {pageTitles[activeItem]}
                  </h2>

                  <p className="text-muted-foreground mt-1">
                    Esta página está em desenvolvimento.
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Em breve estará disponível para uso.
                  </p>

                </div>

              </div>

            </div>
          )}

        </main>

      </div>

    </div>
  )
}