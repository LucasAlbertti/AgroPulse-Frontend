'use client'

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

const climaData = {
  local: {
    fazenda: 'Fazenda Principal',
    cidade: 'Concórdia',
    estado: 'SC'
  },

  atual: {
    temperatura: 28,
    sensacao: 30,
    umidade: 65,
    condicao: 'Parcialmente nublado',
    vento: 12,
    chanceChuva: 30,
    pressao: 1014
  },

  previsao: [
    {
      dia: 'Hoje',
      min: 22,
      max: 30,
      condicao: 'parcial' as CondicaoClima,
      chanceChuva: 30
    },
    {
      dia: 'Amanhã',
      min: 21,
      max: 28,
      condicao: 'nublado' as CondicaoClima,
      chanceChuva: 45
    },
    {
      dia: 'Quarta',
      min: 19,
      max: 26,
      condicao: 'chuva' as CondicaoClima,
      chanceChuva: 80
    },
    {
      dia: 'Quinta',
      min: 20,
      max: 27,
      condicao: 'chuva' as CondicaoClima,
      chanceChuva: 60
    },
    {
      dia: 'Sexta',
      min: 22,
      max: 29,
      condicao: 'sol' as CondicaoClima,
      chanceChuva: 15
    },
    {
      dia: 'Sábado',
      min: 23,
      max: 31,
      condicao: 'sol' as CondicaoClima,
      chanceChuva: 10
    },
    {
      dia: 'Domingo',
      min: 22,
      max: 30,
      condicao: 'parcial' as CondicaoClima,
      chanceChuva: 25
    }
  ]
}

const weatherIcons: Record<CondicaoClima, React.ElementType> = {
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
  const { atual, previsao, local } = climaData

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
              Monitoramento climático
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Clima
            </h1>

            <p className="text-muted-foreground mt-2 max-w-2xl">
              Acompanhe as condições climáticas da propriedade, previsão de chuva,
              temperatura, vento e alertas para apoiar decisões no campo.
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
                className="
                  size-32
                  rounded-[36px]
                  bg-orange-500/10
                  border
                  border-orange-500/20
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <CloudSun className="size-16 text-orange-400" />
              </div>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

              <div
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-background/60
                  p-4
                "
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Droplets className="size-4 text-blue-500" />
                  Umidade
                </div>

                <p className="text-2xl font-bold mt-3">
                  {atual.umidade}%
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-background/60
                  p-4
                "
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Wind className="size-4 text-cyan-500" />
                  Vento
                </div>

                <p className="text-2xl font-bold mt-3">
                  {atual.vento} km/h
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-background/60
                  p-4
                "
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Umbrella className="size-4 text-primary" />
                  Chuva
                </div>

                <p className="text-2xl font-bold mt-3">
                  {atual.chanceChuva}%
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-background/60
                  p-4
                "
              >
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
              Há previsão de chuva forte nos próximos dias. Avalie atividades de
              pulverização, colheita e preparo do solo com atenção.
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
                Priorizar manejo antes da quarta-feira.
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
              weatherIcons[dia.condicao]

            return (
              <div
                key={dia.dia}
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