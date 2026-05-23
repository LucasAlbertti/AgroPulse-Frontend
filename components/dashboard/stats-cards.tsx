'use client'

import { useEffect, useState } from 'react'

import {
  Building2,
  Grid3X3,
  Sprout,
  Map,
  Wallet,
  TrendingDown,
  TrendingUp
} from 'lucide-react'

import api from '@/lib/api'

type DashboardData = {
  total_fazendas: number
  total_talhoes: number
  total_safras: number
  area_total: number
  produtividade_media: number
  receitas: number
  despesas: number
  lucro: number
}

export function StatsCards() {

  const [data, setData] =
    useState<DashboardData | null>(null)

  async function carregarDashboard() {

    try {

      const response =
        await api.get('/dashboard')

      setData(response.data)

    } catch (error) {

      console.error(
        'Erro ao carregar dashboard:',
        error
      )
    }
  }

  useEffect(() => {

    carregarDashboard()

  }, [])

  if (!data) {

    return (

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {Array.from({ length: 6 }).map((_, i) => (

          <div
            key={i}
            className="
              h-40
              rounded-3xl
              border
              border-border
              bg-card
              animate-pulse
            "
          />

        ))}

      </div>
    )
  }

  const cards = [

    {
      title: 'Fazendas',
      value: data.total_fazendas,
      icon: Building2,

      gradient:
        'from-emerald-500 to-green-600',

      bg:
        'bg-emerald-500/10'
    },

    {
      title: 'Talhões',
      value: data.total_talhoes,
      icon: Grid3X3,

      gradient:
        'from-orange-500 to-amber-500',

      bg:
        'bg-orange-500/10'
    },

    {
      title: 'Safras',
      value: data.total_safras,
      icon: Sprout,

      gradient:
        'from-lime-500 to-green-500',

      bg:
        'bg-lime-500/10'
    },

    {
      title: 'Área Total',
      value: `${data.area_total} ha`,
      icon: Map,

      gradient:
        'from-cyan-500 to-blue-500',

      bg:
        'bg-cyan-500/10'
    },

    {
      title: 'Receitas',
      value:
        data.receitas.toLocaleString(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL'
          }
        ),

      icon: TrendingUp,

      gradient:
        'from-green-500 to-emerald-600',

      bg:
        'bg-green-500/10'
    },

    {
      title: 'Despesas',
      value:
        data.despesas.toLocaleString(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL'
          }
        ),

      icon: TrendingDown,

      gradient:
        'from-red-500 to-rose-600',

      bg:
        'bg-red-500/10'
    },

    {
      title: 'Lucro',
      value:
        data.lucro.toLocaleString(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL'
          }
        ),

      icon: Wallet,

      gradient:
        'from-primary to-indigo-600',

      bg:
        'bg-primary/10'
    }
  ]

  return (

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
      "
    >

      {cards.map((card) => {

        const Icon = card.icon

        return (

          <div
            key={card.title}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-border
              bg-card
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
            "
          >

            {/* Glow */}
            <div
              className={`
                absolute
                inset-0
                bg-gradient-to-br
                ${card.gradient}
                opacity-[0.04]
              `}
            />

            <div className="relative z-10">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-muted-foreground text-sm">
                    {card.title}
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-bold
                      mt-3
                      tracking-tight
                    "
                  >
                    {card.value}
                  </h2>

                </div>

                <div
                  className={`
                    size-14
                    rounded-2xl
                    ${card.bg}
                    flex
                    items-center
                    justify-center
                    shrink-0
                  `}
                >

                  <Icon className="size-7 text-primary" />

                </div>

              </div>

            </div>

          </div>
        )
      })}

    </div>
  )
}