'use client'

import {
  useEffect,
  useState,
  type ElementType
} from 'react'

import api from '@/lib/api'

import {
  Cloud,
  Sun,
  CloudRain,
  Droplets,
  Wind,
  MapPin,
  Thermometer,
  CloudSun,
  Umbrella
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'

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
  }

  previsao: {
    dia: string
    min: number
    max: number
    condicao: CondicaoClima
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
  sol: 'text-yellow-500',
  nublado: 'text-slate-400',
  chuva: 'text-blue-500',
  parcial: 'text-orange-400'
}

export function WeatherCard() {

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
      <Card className="rounded-3xl border-border bg-card shadow-sm">
        <CardContent className="p-6">
          <div className="h-[360px] rounded-3xl bg-muted animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  if (!clima) {

    return (
      <Card className="rounded-3xl border-border bg-card shadow-sm">
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Não foi possível carregar o clima.
          </p>
        </CardContent>
      </Card>
    )
  }

  const { atual, previsao, local } = clima

  const IconeAtual =
    weatherIcons[atual.tipo] || CloudSun

  return (
    <Card
      className="
        relative
        overflow-hidden
        rounded-3xl
        border-border
        bg-card
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
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

      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle
              className="
                text-2xl
                flex
                items-center
                gap-2
              "
            >
              <CloudSun className="size-6 text-primary" />
              Clima
            </CardTitle>

            <CardDescription
              className="
                mt-2
                flex
                items-center
                gap-2
              "
            >
              <MapPin className="size-4" />
              {local.fazenda} — {local.cidade}, {local.estado}
            </CardDescription>
          </div>

          <div
            className="
              hidden
              sm:flex
              size-12
              rounded-2xl
              bg-sky-500/10
              items-center
              justify-center
            "
          >
            <CloudSun className="size-6 text-sky-500" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        <div
          className="
            rounded-3xl
            border
            border-sky-500/20
            bg-background/60
            p-5
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className="
                  text-5xl
                  font-bold
                  tracking-tight
                "
              >
                {atual.temperatura}°C
              </p>

              <p className="text-sm text-muted-foreground mt-2">
                {atual.condicao}
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                Sensação térmica de {atual.sensacao}°C
              </p>
            </div>

            <div
              className="
                size-20
                rounded-3xl
                bg-orange-500/10
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <IconeAtual
                className={cn(
                  'size-10',
                  weatherColors[atual.tipo]
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div
              className="
                rounded-2xl
                border
                border-border
                bg-card/70
                p-3
              "
            >
              <div className="flex items-center gap-2">
                <Droplets className="size-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">
                  Umidade
                </span>
              </div>

              <p className="font-bold mt-2">
                {atual.umidade}%
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-border
                bg-card/70
                p-3
              "
            >
              <div className="flex items-center gap-2">
                <Wind className="size-4 text-cyan-500" />
                <span className="text-xs text-muted-foreground">
                  Vento
                </span>
              </div>

              <p className="font-bold mt-2">
                {atual.vento} km/h
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-border
                bg-card/70
                p-3
              "
            >
              <div className="flex items-center gap-2">
                <Umbrella className="size-4 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Chuva
                </span>
              </div>

              <p className="font-bold mt-2">
                {atual.chanceChuva}%
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">
              Próximos dias
            </p>

            <div
              className="
                text-xs
                text-muted-foreground
                flex
                items-center
                gap-1
              "
            >
              <Thermometer className="size-3" />
              Min / Máx
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {previsao.slice(0, 5).map((dia, index) => {

              const WeatherIcon =
                weatherIcons[dia.condicao] || CloudSun

              return (
                <div
                  key={`${dia.dia}-${index}`}
                  className={cn(
                    `
                      rounded-2xl
                      border
                      border-border
                      p-3
                      text-center
                      transition-all
                      hover:-translate-y-1
                      hover:shadow-lg
                    `,
                    index === 0
                      ? 'bg-primary/10'
                      : 'bg-background/60'
                  )}
                >
                  <p className="text-xs font-medium">
                    {dia.dia}
                  </p>

                  <WeatherIcon
                    className={cn(
                      'size-6 mx-auto my-3',
                      weatherColors[dia.condicao]
                    )}
                  />

                  <div className="text-xs">
                    <span className="text-muted-foreground">
                      {dia.min}°
                    </span>

                    <span className="font-semibold ml-1">
                      {dia.max}°
                    </span>
                  </div>

                  <p className="text-[11px] text-blue-500 mt-2">
                    {dia.chanceChuva}%
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}