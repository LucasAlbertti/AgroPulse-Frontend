'use client'

import {
  useEffect,
  useState,
  type ElementType
} from 'react'

import api from '@/lib/api'

import {
  CloudSun,
  Sun,
  Cloud,
  CloudRain,
  Droplets,
  Wind,
  Thermometer,
  Umbrella,
  MapPin,
  AlertTriangle,
  Gauge,
  Leaf
} from 'lucide-react'

import { cn } from '@/lib/utils'

type CondicaoClima =
  | 'sol'
  | 'nublado'
  | 'chuva'
  | 'parcial'

type ClimaData = {
  local: {
    fazenda: string
    cidade: string
    estado: string
  }

  atual: {
    temperatura: number
    sensacao: number
    umidade: number
    condicao: string
    tipo: CondicaoClima
    vento: number
    chanceChuva: number
    pressao: number
  }

  previsao: {
    dia: string
    min: number
    max: number
    condicao: CondicaoClima
    descricao: string
    chanceChuva: number
  }[]
}

const weatherIcons: Record<CondicaoClima, ElementType> = {
  sol: Sun,
  nublado: Cloud,
  chuva: CloudRain,
  parcial: CloudSun
}

const weatherColors: Record<CondicaoClima, string> = {
  sol: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  nublado: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
  chuva: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  parcial: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
}

export function ClimaPage() {

  const [clima, setClima] =
    useState<ClimaData | null>(null)

  const [loading, setLoading] =
    useState(true)

  async function carregarClima() {

    try {

      const response =
        await api.get('/clima')

      setClima(response.data)

    } catch (error) {

      console.error(
        'Erro ao carregar clima:',
        error
      )

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    carregarClima()

  }, [])

  if (loading) {

    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted-foreground">
          Carregando dados climáticos...
        </p>
      </div>
    )
  }

  if (!clima) {

    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted-foreground">
          Não foi possível carregar o clima.
        </p>
      </div>
    )
  }

  const { atual, previsao, local } = clima

  const IconeAtual =
    weatherIcons[atual.tipo] || CloudSun

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
            from-sky-500/10
            via-transparent
            to-primary/5
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
                bg-sky-500/10
                px-4
                py-1.5
                text-sm
                font-medium
                text-sky-500
                mb-4
              "
            >
              <CloudSun className="size-4" />
              Monitoramento climático em tempo real
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Clima
            </h1>

            <p className="text-muted-foreground mt-2 max-w-2xl">
              Acompanhe temperatura, chuva, vento, umidade e previsão semanal para apoiar decisões no campo.
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
              bg-sky-500/10
            "
          >
            <CloudSun className="size-10 text-sky-500" />
          </div>

        </div>
      </div>

      {/* Clima atual */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div
          className="
            xl:col-span-2
            relative
            overflow-hidden
            rounded-3xl
            border
            border-border
            bg-card
            p-8
            shadow-sm
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-orange-500/10
              via-transparent
              to-sky-500/10
              pointer-events-none
            "
          />

          <div className="relative z-10">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

              <div>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="size-4 text-primary" />

                  <span>
                    {local.fazenda} — {local.cidade}, {local.estado}
                  </span>
                </div>

                <p className="text-7xl font-bold tracking-tight">
                  {atual.temperatura}°C
                </p>

                <p className="text-xl font-medium mt-4">
                  {atual.condicao}
                </p>

                <p className="text-muted-foreground mt-2">
                  Sensação térmica de {atual.sensacao}°C
                </p>

              </div>

              <div
                className={cn(
                  `
                    size-32
                    rounded-[36px]
                    border
                    flex
                    items-center
                    justify-center
                    shrink-0
                  `,
                  weatherColors[atual.tipo]
                )}
              >
                <IconeAtual className="size-16" />
              </div>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Droplets className="size-4 text-blue-500" />
                  Umidade
                </div>

                <p className="text-2xl font-bold mt-3">
                  {atual.umidade}%
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Wind className="size-4 text-cyan-500" />
                  Vento
                </div>

                <p className="text-2xl font-bold mt-3">
                  {atual.vento} km/h
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Umbrella className="size-4 text-primary" />
                  Chuva
                </div>

                <p className="text-2xl font-bold mt-3">
                  {atual.chanceChuva}%
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Gauge className="size-4 text-purple-500" />
                  Pressão
                </div>

                <p className="text-2xl font-bold mt-3">
                  {atual.pressao}
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  hPa
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Alerta agrícola */}
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
              from-yellow-500/10
              via-transparent
              to-transparent
              pointer-events-none
            "
          />

          <div className="relative z-10">

            <div
              className="
                size-16
                rounded-2xl
                bg-yellow-500/10
                border
                border-yellow-500/20
                flex
                items-center
                justify-center
                mb-6
              "
            >
              <AlertTriangle className="size-8 text-yellow-500" />
            </div>

            <h2 className="text-2xl font-bold">
              Alerta Agrícola
            </h2>

            <p className="text-muted-foreground mt-3 leading-relaxed">
              Chance de chuva para hoje: {atual.chanceChuva}%. Avalie atividades como pulverização, colheita e preparo do solo.
            </p>

            <div
              className="
                mt-6
                rounded-2xl
                border
                border-border
                bg-background/60
                p-4
              "
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="size-4 text-primary" />
                Recomendação
              </div>

              <p className="font-semibold mt-2">
                {atual.chanceChuva >= 60
                  ? 'Evite operações sensíveis à chuva.'
                  : 'Condições favoráveis para manejo no campo.'}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Previsão semanal */}
      <div
        className="
          rounded-3xl
          border
          border-border
          bg-card
          p-6
          shadow-sm
        "
      >
        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold">
              Previsão semanal
            </h2>

            <p className="text-muted-foreground mt-1">
              Temperatura mínima, máxima e chance de chuva
            </p>

          </div>

          <div
            className="
              hidden
              md:flex
              items-center
              gap-2
              text-sm
              text-muted-foreground
            "
          >
            <Thermometer className="size-4" />
            Min / Máx
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">

          {previsao.map((dia, index) => {

            const WeatherIcon =
              weatherIcons[dia.condicao] || CloudSun

            return (
              <div
                key={`${dia.dia}-${index}`}
                className={cn(
                  `
                    rounded-3xl
                    border
                    p-5
                    text-center
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  `,
                  index === 0
                    ? 'bg-primary/10 border-primary/20'
                    : 'bg-background/60 border-border'
                )}
              >
                <p className="font-semibold">
                  {dia.dia}
                </p>

                <div
                  className={cn(
                    `
                      mx-auto
                      my-5
                      size-16
                      rounded-2xl
                      border
                      flex
                      items-center
                      justify-center
                    `,
                    weatherColors[dia.condicao]
                  )}
                >
                  <WeatherIcon className="size-8" />
                </div>

                <p className="text-xs text-muted-foreground mb-3">
                  {dia.descricao}
                </p>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-muted-foreground">
                    {dia.min}°
                  </span>

                  <span className="text-xl font-bold">
                    {dia.max}°
                  </span>
                </div>

                <div
                  className="
                    mt-4
                    rounded-full
                    bg-blue-500/10
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-blue-500
                  "
                >
                  {dia.chanceChuva}% chuva
                </div>
              </div>
            )
          })}

        </div>
      </div>

    </div>
  )
}