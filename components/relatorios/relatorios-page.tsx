'use client'

import {
  useEffect,
  useState
} from 'react'

import api from '@/lib/api'

import {
  FileText,
  Building2,
  Grid3X3,
  MapPinned,
  Sprout,
  CheckCircle2,
  XCircle,
  Clock,
  Wallet,
  TrendingUp,
  TrendingDown,
  Wheat,
  Leaf
} from 'lucide-react'

import { cn } from '@/lib/utils'

type RelatorioData = {
  resumo: {
    total_fazendas: number
    total_talhoes: number
    area_total: number
    produtividade_media: number
    safras_planejadas: number
    safras_ativas: number
    safras_concluidas: number
    safras_canceladas: number
  }

  financeiro: {
    receitas: number
    despesas: number
    lucro: number
  }

  culturas: {
    cultura: string
    total: number
  }[]

  produtividade_por_cultura: {
    cultura: string
    total_safras: number
    media_produtividade: number
  }[]

  safras: {
    id: number
    cultura: string
    status: string
    produtividade: number
    data_plantio: string
    data_colheita: string
    talhao_nome: string
    fazenda_nome: string
  }[]
}

const statusStyles: Record<
  string,
  {
    bg: string
    text: string
    border: string
  }
> = {
  Planejada: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600',
    border: 'border-blue-500/20'
  },

  Ativa: {
    bg: 'bg-green-500/10',
    text: 'text-green-600',
    border: 'border-green-500/20'
  },

  Concluída: {
    bg: 'bg-zinc-500/10',
    text: 'text-zinc-500',
    border: 'border-zinc-500/20'
  },

  Cancelada: {
    bg: 'bg-red-500/10',
    text: 'text-red-600',
    border: 'border-red-500/20'
  }
}

const culturaStyles: Record<
  string,
  string
> = {
  Soja: 'bg-green-500/10 text-green-600 border-green-500/20',
  Milho: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  Trigo: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  Feijão: 'bg-red-500/10 text-red-600 border-red-500/20',
  Algodão: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  Aveia: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  Pastagem: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
}

export function RelatoriosPage() {

  const [data, setData] =
    useState<RelatorioData | null>(null)

  const [loading, setLoading] =
    useState(true)

  async function carregarRelatorio() {

    try {

      const response =
        await api.get('/relatorios/geral')

      setData(response.data)

    } catch (error) {

      console.error(
        'Erro ao carregar relatório:',
        error
      )

    } finally {

      setLoading(false)
    }
  }

  function formatarValor(valor: number) {

    return valor.toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }
    )
  }

  function formatarData(data: string) {

    if (!data) return '-'

    return new Date(data)
      .toLocaleDateString('pt-BR')
  }

  useEffect(() => {

    carregarRelatorio()

  }, [])

  if (loading) {

    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted-foreground">
          Gerando relatório...
        </p>
      </div>
    )
  }

  if (!data) {

    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted-foreground">
          Não foi possível carregar o relatório.
        </p>
      </div>
    )
  }

  const cardsResumo = [
    {
      titulo: 'Fazendas',
      valor: data.resumo.total_fazendas,
      icone: Building2,
      bg: 'bg-primary/10',
      text: 'text-primary'
    },
    {
      titulo: 'Talhões',
      valor: data.resumo.total_talhoes,
      icone: Grid3X3,
      bg: 'bg-orange-500/10',
      text: 'text-orange-500'
    },
    {
      titulo: 'Área Total',
      valor: `${data.resumo.area_total} ha`,
      icone: MapPinned,
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-500'
    },
    {
      titulo: 'Produtividade Média',
      valor: `${Number(data.resumo.produtividade_media).toFixed(1)} sc/ha`,
      icone: Wheat,
      bg: 'bg-green-500/10',
      text: 'text-green-600'
    }
  ]

  const cardsStatus = [
    {
      titulo: 'Planejadas',
      valor: data.resumo.safras_planejadas,
      icone: Clock,
      style: statusStyles.Planejada
    },
    {
      titulo: 'Ativas',
      valor: data.resumo.safras_ativas,
      icone: Sprout,
      style: statusStyles.Ativa
    },
    {
      titulo: 'Concluídas',
      valor: data.resumo.safras_concluidas,
      icone: CheckCircle2,
      style: statusStyles.Concluída
    },
    {
      titulo: 'Canceladas',
      valor: data.resumo.safras_canceladas,
      icone: XCircle,
      style: statusStyles.Cancelada
    }
  ]

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
              <FileText className="size-4" />
              Relatório geral
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Relatórios
            </h1>

            <p className="text-muted-foreground mt-2 max-w-2xl">
              Resumo consolidado das fazendas, talhões, safras, culturas e financeiro do AgroPulse.
            </p>

          </div>

          <div
            className="
              hidden
              lg:flex
              size-20
              rounded-3xl
              bg-primary/10
              items-center
              justify-center
            "
          >
            <FileText className="size-10 text-primary" />
          </div>

        </div>
      </div>

      {/* Resumo */}
      <section className="space-y-4">

        <div className="flex items-center gap-2">
          <Leaf className="size-5 text-primary" />

          <h2 className="text-xl font-semibold">
            Resumo da propriedade
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {cardsResumo.map((card) => {

            const Icon = card.icone

            return (
              <div
                key={card.titulo}
                className="
                  rounded-3xl
                  border
                  border-border
                  bg-card
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-sm text-muted-foreground">
                      {card.titulo}
                    </p>

                    <h3 className="text-3xl font-bold mt-3">
                      {card.valor}
                    </h3>

                  </div>

                  <div
                    className={cn(
                      'size-14 rounded-2xl flex items-center justify-center',
                      card.bg
                    )}
                  >
                    <Icon
                      className={cn(
                        'size-7',
                        card.text
                      )}
                    />
                  </div>

                </div>
              </div>
            )
          })}

        </div>

      </section>

      {/* Financeiro */}
      <section className="space-y-4">

        <div className="flex items-center gap-2">
          <Wallet className="size-5 text-primary" />

          <h2 className="text-xl font-semibold">
            Resumo financeiro
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">
                  Receitas
                </p>

                <h3 className="text-3xl font-bold mt-3 text-green-600">
                  {formatarValor(data.financeiro.receitas)}
                </h3>
              </div>

              <div className="size-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="size-7 text-green-600" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">
                  Despesas
                </p>

                <h3 className="text-3xl font-bold mt-3 text-red-500">
                  {formatarValor(data.financeiro.despesas)}
                </h3>
              </div>

              <div className="size-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="size-7 text-red-500" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">
                  Lucro
                </p>

                <h3 className="text-3xl font-bold mt-3">
                  {formatarValor(data.financeiro.lucro)}
                </h3>
              </div>

              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Wallet className="size-7 text-primary" />
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* Status Safras */}
      <section className="space-y-4">

        <div className="flex items-center gap-2">
          <Sprout className="size-5 text-primary" />

          <h2 className="text-xl font-semibold">
            Status das safras
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {cardsStatus.map((card) => {

            const Icon = card.icone

            return (
              <div
                key={card.titulo}
                className={cn(
                  `
                    rounded-3xl
                    border
                    bg-card
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  `,
                  card.style.border
                )}
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-muted-foreground">
                      {card.titulo}
                    </p>

                    <h3
                      className={cn(
                        'text-3xl font-bold mt-3',
                        card.style.text
                      )}
                    >
                      {card.valor}
                    </h3>
                  </div>

                  <div
                    className={cn(
                      'size-14 rounded-2xl flex items-center justify-center',
                      card.style.bg
                    )}
                  >
                    <Icon
                      className={cn(
                        'size-7',
                        card.style.text
                      )}
                    />
                  </div>

                </div>
              </div>
            )
          })}

        </div>

      </section>

      {/* Culturas e Safras */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Culturas */}
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
          <h2 className="text-xl font-semibold">
            Culturas cadastradas
          </h2>

          <p className="text-muted-foreground text-sm mt-1">
            Distribuição por quantidade de safras
          </p>

          <div className="space-y-3 mt-6">

            {data.culturas.length === 0 && (
              <p className="text-muted-foreground">
                Nenhuma cultura cadastrada.
              </p>
            )}

            {data.culturas.map((item) => (
              <div
                key={item.cultura}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-border
                  bg-background/60
                  p-4
                "
              >
                <div
                  className={cn(
                    `
                      rounded-full
                      border
                      px-3
                      py-1
                      text-sm
                      font-medium
                    `,
                    culturaStyles[item.cultura] ||
                    'bg-muted text-muted-foreground border-border'
                  )}
                >
                  {item.cultura}
                </div>

                <span className="font-bold">
                  {item.total}
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* Tabela */}
        <div
          className="
            xl:col-span-2
            rounded-3xl
            border
            border-border
            bg-card
            shadow-sm
            overflow-hidden
          "
        >
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">
              Safras registradas
            </h2>

            <p className="text-muted-foreground text-sm mt-1">
              Lista consolidada de safras do sistema
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">
                    Cultura
                  </th>

                  <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 hidden md:table-cell">
                    Talhão
                  </th>

                  <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">
                    Status
                  </th>

                  <th className="text-right text-xs font-medium text-muted-foreground px-6 py-3 hidden lg:table-cell">
                    Produtividade
                  </th>

                  <th className="text-right text-xs font-medium text-muted-foreground px-6 py-3 hidden lg:table-cell">
                    Plantio
                  </th>
                </tr>
              </thead>

              <tbody>

                {data.safras.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-muted-foreground"
                    >
                      Nenhuma safra registrada.
                    </td>
                  </tr>
                )}

                {data.safras.map((safra, index) => {

                  const status =
                    safra.status || 'Ativa'

                  const style =
                    statusStyles[status] || statusStyles.Ativa

                  return (
                    <tr
                      key={safra.id}
                      className={cn(
                        'hover:bg-muted/40 transition-colors',
                        index !== data.safras.length - 1 &&
                        'border-b border-border'
                      )}
                    >
                      <td className="px-6 py-4">
                        <div
                          className={cn(
                            `
                              inline-flex
                              rounded-full
                              border
                              px-3
                              py-1
                              text-sm
                              font-medium
                            `,
                            culturaStyles[safra.cultura] ||
                            'bg-muted text-muted-foreground border-border'
                          )}
                        >
                          {safra.cultura}
                        </div>
                      </td>

                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-sm font-medium">
                          {safra.talhao_nome}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {safra.fazenda_nome}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <div
                          className={cn(
                            `
                              inline-flex
                              rounded-full
                              border
                              px-3
                              py-1
                              text-sm
                              font-medium
                            `,
                            style.bg,
                            style.text,
                            style.border
                          )}
                        >
                          {status}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right hidden lg:table-cell">
                        {safra.produtividade
                          ? `${safra.produtividade} sc/ha`
                          : '-'}
                      </td>

                      <td className="px-6 py-4 text-right hidden lg:table-cell">
                        {formatarData(safra.data_plantio)}
                      </td>
                    </tr>
                  )
                })}

              </tbody>

            </table>

          </div>
        </div>

      </section>

    </div>
  )
}