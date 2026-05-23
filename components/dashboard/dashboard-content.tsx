'use client'

import { StatsCards } from './stats-cards'
import { ProductivityChart } from './productivity-chart'
import { CulturesChart } from './cultures-chart'
import { SafrasTable } from './safras-table'
import { WeatherCard } from './weather-card'

import {
  BarChart3,
  Leaf,
  Activity
} from 'lucide-react'

export function DashboardContent() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-border
          bg-card
          p-6
          shadow-sm
        "
      >

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-primary/10
            via-transparent
            to-transparent
            pointer-events-none
          "
        />

        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-primary/10
                px-4
                py-1.5
                text-sm
                font-medium
                text-primary
                mb-4
              "
            >
              <Leaf className="size-4" />
              Gestão agrícola inteligente
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Visão Geral do AgroPulse
            </h1>

            <p className="text-muted-foreground mt-2 max-w-2xl">
              Acompanhe fazendas, talhões, safras, produtividade, clima e resultados financeiros em um único painel.
            </p>

          </div>

          <div
            className="
              hidden
              lg:flex
              size-20
              items-center
              justify-center
              rounded-3xl
              bg-primary/10
            "
          >
            <BarChart3 className="size-10 text-primary" />
          </div>

        </div>

      </div>

      {/* Indicadores */}
      <section className="space-y-4">

        <div className="flex items-center gap-2">

          <Activity className="size-5 text-primary" />

          <h2 className="text-xl font-semibold">
            Indicadores principais
          </h2>

        </div>

        <StatsCards />

      </section>

      {/* Análises */}
      <section className="space-y-4">

        <div className="flex items-center gap-2">

          <BarChart3 className="size-5 text-primary" />

          <h2 className="text-xl font-semibold">
            Análises agrícolas
          </h2>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <ProductivityChart />

          <CulturesChart />

        </div>

      </section>

      {/* Operação */}
      <section className="space-y-4">

        <div className="flex items-center gap-2">

          <Leaf className="size-5 text-primary" />

          <h2 className="text-xl font-semibold">
            Operação da propriedade
          </h2>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2">

            <SafrasTable />

          </div>

          <div>

            <WeatherCard />

          </div>

        </div>

      </section>

    </div>
  )
}