'use client'

import {
  useEffect,
  useState
} from 'react'

import api from '@/lib/api'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'

import {
  Badge
} from '@/components/ui/badge'

import {
  CalendarDays,
  Sprout,
  Tractor,
  Wheat
} from 'lucide-react'

import { cn } from '@/lib/utils'

type Safra = {
  id: number
  cultura: string
  data_plantio: string
  data_colheita: string
  produtividade: number
  talhao_id: number
}

type Talhao = {
  id: number
  nome: string
  area_hectares?: number
  fazenda_nome?: string
}

const culturaStyles: Record<
  string,
  {
    bg: string
    text: string
    border: string
  }
> = {
  Soja: {
    bg: 'bg-green-500/10',
    text: 'text-green-600',
    border: 'border-green-500/20'
  },

  Milho: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-600',
    border: 'border-yellow-500/20'
  },

  Trigo: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600',
    border: 'border-blue-500/20'
  },

  Feijão: {
    bg: 'bg-red-500/10',
    text: 'text-red-600',
    border: 'border-red-500/20'
  },

  Algodão: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-600',
    border: 'border-purple-500/20'
  },

  Aveia: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-600',
    border: 'border-orange-500/20'
  },

  Pastagem: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600',
    border: 'border-emerald-500/20'
  }
}

export function SafrasTable() {

  const [safras, setSafras] =
    useState<Safra[]>([])

  const [talhoes, setTalhoes] =
    useState<Talhao[]>([])

  const [loading, setLoading] =
    useState(true)

  async function carregarDados() {

    try {

      const [
        responseSafras,
        responseTalhoes
      ] = await Promise.all([
        api.get('/safras'),
        api.get('/talhoes')
      ])

      setSafras(responseSafras.data)

      setTalhoes(responseTalhoes.data)

    } catch (error) {

      console.error(
        'Erro ao carregar últimas safras:',
        error
      )

    } finally {

      setLoading(false)
    }
  }

  function obterTalhao(
    id: number
  ) {

    return talhoes.find(
      (talhao) => talhao.id === id
    )
  }

  function formatarData(
    data: string
  ) {

    if (!data) return '-'

    return new Date(data)
      .toLocaleDateString('pt-BR')
  }

  useEffect(() => {

    carregarDados()

  }, [])

  const ultimasSafras =
    safras.slice(0, 5)

  return (

    <Card
      className="
        bg-card
        border-border
        rounded-3xl
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
      "
    >

      <CardHeader className="pb-4">

        <div className="flex items-center justify-between">

          <div>

            <CardTitle
              className="
                text-2xl
                flex
                items-center
                gap-2
              "
            >

              <Sprout className="size-6 text-primary" />

              Últimas Safras

            </CardTitle>

            <CardDescription className="mt-1">
              Acompanhamento das safras mais recentes
            </CardDescription>

          </div>

          <div
            className="
              hidden
              sm:flex
              size-12
              rounded-2xl
              bg-primary/10
              items-center
              justify-center
            "
          >
            <Wheat className="size-6 text-primary" />
          </div>

        </div>

      </CardHeader>

      <CardContent className="px-0">

        {loading && (

          <div className="space-y-3 px-6 pb-6">

            {Array.from({ length: 4 }).map((_, index) => (

              <div
                key={index}
                className="
                  h-16
                  rounded-2xl
                  bg-muted
                  animate-pulse
                "
              />

            ))}

          </div>
        )}

        {!loading && ultimasSafras.length === 0 && (

          <div
            className="
              mx-6
              mb-6
              rounded-3xl
              border
              border-dashed
              p-10
              text-center
              text-muted-foreground
            "
          >
            Nenhuma safra cadastrada ainda.
          </div>
        )}

        {!loading && ultimasSafras.length > 0 && (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-border">

                  <th
                    className="
                      text-left
                      text-xs
                      font-medium
                      text-muted-foreground
                      px-6
                      py-3
                    "
                  >
                    Cultura
                  </th>

                  <th
                    className="
                      text-left
                      text-xs
                      font-medium
                      text-muted-foreground
                      px-6
                      py-3
                      hidden
                      md:table-cell
                    "
                  >
                    Talhão
                  </th>

                  <th
                    className="
                      text-left
                      text-xs
                      font-medium
                      text-muted-foreground
                      px-6
                      py-3
                      hidden
                      lg:table-cell
                    "
                  >
                    Plantio
                  </th>

                  <th
                    className="
                      text-left
                      text-xs
                      font-medium
                      text-muted-foreground
                      px-6
                      py-3
                      hidden
                      lg:table-cell
                    "
                  >
                    Colheita
                  </th>

                  <th
                    className="
                      text-right
                      text-xs
                      font-medium
                      text-muted-foreground
                      px-6
                      py-3
                    "
                  >
                    Produtividade
                  </th>

                </tr>

              </thead>

              <tbody>

                {ultimasSafras.map((safra, index) => {

                  const talhao =
                    obterTalhao(
                      safra.talhao_id
                    )

                  const style =
                    culturaStyles[
                      safra.cultura
                    ] || culturaStyles.Soja

                  return (

                    <tr
                      key={safra.id}
                      className={cn(
                        `
                          hover:bg-muted/40
                          transition-colors
                        `,
                        index !== ultimasSafras.length - 1 &&
                          'border-b border-border'
                      )}
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              size-10
                              rounded-xl
                              bg-primary/10
                              flex
                              items-center
                              justify-center
                              shrink-0
                            "
                          >
                            <Sprout className="size-5 text-primary" />
                          </div>

                          <div>

                            <Badge
                              variant="secondary"
                              className={cn(
                                style.bg,
                                style.text,
                                style.border,
                                `
                                  border
                                  rounded-full
                                  px-3
                                  py-1
                                  font-medium
                                `
                              )}
                            >
                              {safra.cultura}
                            </Badge>

                            <p
                              className="
                                text-xs
                                text-muted-foreground
                                mt-2
                                md:hidden
                              "
                            >
                              {talhao?.nome || 'Talhão'}
                            </p>

                          </div>

                        </div>

                      </td>

                      <td
                        className="
                          px-6
                          py-4
                          hidden
                          md:table-cell
                        "
                      >

                        <div className="flex items-center gap-2">

                          <Tractor className="size-4 text-primary" />

                          <div>

                            <p className="text-sm font-medium">
                              {talhao?.nome || 'Talhão'}
                            </p>

                            {talhao?.fazenda_nome && (

                              <p className="text-xs text-muted-foreground">
                                {talhao.fazenda_nome}
                              </p>
                            )}

                          </div>

                        </div>

                      </td>

                      <td
                        className="
                          px-6
                          py-4
                          hidden
                          lg:table-cell
                        "
                      >

                        <div className="flex items-center gap-2">

                          <CalendarDays className="size-4 text-muted-foreground" />

                          <p className="text-sm">
                            {formatarData(
                              safra.data_plantio
                            )}
                          </p>

                        </div>

                      </td>

                      <td
                        className="
                          px-6
                          py-4
                          hidden
                          lg:table-cell
                        "
                      >

                        <div className="flex items-center gap-2">

                          <CalendarDays className="size-4 text-muted-foreground" />

                          <p className="text-sm">
                            {formatarData(
                              safra.data_colheita
                            )}
                          </p>

                        </div>

                      </td>

                      <td className="px-6 py-4 text-right">

                        <p
                          className="
                            text-sm
                            font-bold
                            text-foreground
                          "
                        >
                          {safra.produtividade
                            ? `${safra.produtividade} sc/ha`
                            : '-'}
                        </p>

                      </td>

                    </tr>
                  )
                })}

              </tbody>

            </table>

          </div>
        )}

      </CardContent>

    </Card>
  )
}