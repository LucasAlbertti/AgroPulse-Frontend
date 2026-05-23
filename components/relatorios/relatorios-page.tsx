'use client'

import {
  useEffect,
  useState
} from 'react'

import api from '@/lib/api'

import jsPDF from 'jspdf'

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
  Leaf,
  Filter,
  Download,
  Search,
  RotateCcw
} from 'lucide-react'

import { cn } from '@/lib/utils'

type RelatorioData = {
  filtros?: {
    data_inicio: string | null
    data_fim: string | null
    fazenda_id: string | null
    fazenda_nome: string | null
    status: string | null
    cultura: string | null
  }

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

type Fazenda = {
  id: number
  nome: string
  cidade: string
  estado: string
}

const statusOptions = [
  'Planejada',
  'Ativa',
  'Concluída',
  'Cancelada'
]

const culturaOptions = [
  'Soja',
  'Milho',
  'Trigo',
  'Feijão',
  'Aveia',
  'Algodão',
  'Pastagem'
]

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

const culturaStyles: Record<string, string> = {
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

  const [fazendas, setFazendas] =
    useState<Fazenda[]>([])

  const [loading, setLoading] =
    useState(true)

  const [exportando, setExportando] =
    useState(false)

  const [mesInicio, setMesInicio] =
    useState('')

  const [mesFim, setMesFim] =
    useState('')

  const [fazendaId, setFazendaId] =
    useState('')

  const [status, setStatus] =
    useState('')

  const [cultura, setCultura] =
    useState('')

  async function carregarFazendas() {

    try {

      const response =
        await api.get('/fazendas')

      setFazendas(response.data)

    } catch (error) {

      console.error(
        'Erro ao carregar fazendas:',
        error
      )
    }
  }

  function obterDatasPeriodo() {

    let dataInicio = ''
    let dataFim = ''

    if (mesInicio) {
      dataInicio =
        `${mesInicio}-01`
    }

    if (mesFim) {

      const [
        anoFim,
        mesFinal
      ] = mesFim.split('-')

      const ultimoDia =
        new Date(
          Number(anoFim),
          Number(mesFinal),
          0
        ).getDate()

      dataFim =
        `${mesFim}-${String(ultimoDia).padStart(2, '0')}`
    }

    return {
      dataInicio,
      dataFim
    }
  }

  async function carregarRelatorio() {

    try {

      setLoading(true)

      const params =
        new URLSearchParams()

      const {
        dataInicio,
        dataFim
      } = obterDatasPeriodo()

      if (dataInicio) {
        params.append(
          'data_inicio',
          dataInicio
        )
      }

      if (dataFim) {
        params.append(
          'data_fim',
          dataFim
        )
      }

      if (fazendaId) {
        params.append(
          'fazenda_id',
          fazendaId
        )
      }

      if (status) {
        params.append(
          'status',
          status
        )
      }

      if (cultura) {
        params.append(
          'cultura',
          cultura
        )
      }

      const query =
        params.toString()

      const url =
        query
          ? `/relatorios/geral?${query}`
          : '/relatorios/geral'

      const response =
        await api.get(url)

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

  function limparFiltros() {

    setMesInicio('')
    setMesFim('')
    setFazendaId('')
    setStatus('')
    setCultura('')
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

  function formatarPeriodo() {

    if (!mesInicio && !mesFim) {
      return 'Todos os períodos'
    }

    if (mesInicio && !mesFim) {

      const [ano, mes] =
        mesInicio.split('-')

      return `A partir de ${mes}/${ano}`
    }

    if (!mesInicio && mesFim) {

      const [ano, mes] =
        mesFim.split('-')

      return `Até ${mes}/${ano}`
    }

    const [anoInicio, mesInicial] =
      mesInicio.split('-')

    const [anoFim, mesFinal] =
      mesFim.split('-')

    return `${mesInicial}/${anoInicio} até ${mesFinal}/${anoFim}`
  }

  function fazendaSelecionadaNome() {

    if (!fazendaId) {
      return 'Todas'
    }

    const fazenda =
      fazendas.find(
        (item) =>
          String(item.id) === fazendaId
      )

    return fazenda?.nome || 'Fazenda selecionada'
  }

  function formatarNumero(valor: number) {

    return Number(valor || 0)
      .toLocaleString('pt-BR')
  }

  async function exportarPDF() {

    if (!data) return

    try {

      setExportando(true)

      const pdf =
        new jsPDF(
          'p',
          'mm',
          'a4'
        )

      const pageWidth =
        pdf.internal.pageSize.getWidth()

      const pageHeight =
        pdf.internal.pageSize.getHeight()

      const margin =
        14

      let y =
        16

      function verificarPagina(
        alturaNecessaria = 20
      ) {

        if (
          y + alturaNecessaria >
          pageHeight - 16
        ) {

          pdf.addPage()

          y = 16
        }
      }

      function titulo(texto: string) {

        verificarPagina(18)

        pdf.setFont(
          'helvetica',
          'bold'
        )

        pdf.setFontSize(16)

        pdf.setTextColor(
          22,
          163,
          74
        )

        pdf.text(
          texto,
          margin,
          y
        )

        y += 9
      }

      function textoNormal(texto: string) {

        verificarPagina(8)

        pdf.setFont(
          'helvetica',
          'normal'
        )

        pdf.setFontSize(10)

        pdf.setTextColor(
          75,
          85,
          99
        )

        pdf.text(
          texto,
          margin,
          y
        )

        y += 6
      }

      function linha() {

        verificarPagina(8)

        pdf.setDrawColor(
          229,
          231,
          235
        )

        pdf.line(
          margin,
          y,
          pageWidth - margin,
          y
        )

        y += 7
      }

      function card(
        label: string,
        valor: string | number,
        x: number,
        largura: number
      ) {

        pdf.setDrawColor(
          229,
          231,
          235
        )

        pdf.setFillColor(
          249,
          250,
          251
        )

        pdf.roundedRect(
          x,
          y,
          largura,
          22,
          3,
          3,
          'FD'
        )

        pdf.setFont(
          'helvetica',
          'normal'
        )

        pdf.setFontSize(8)

        pdf.setTextColor(
          107,
          114,
          128
        )

        pdf.text(
          label,
          x + 4,
          y + 7
        )

        pdf.setFont(
          'helvetica',
          'bold'
        )

        pdf.setFontSize(11)

        pdf.setTextColor(
          17,
          24,
          39
        )

        const valorTexto =
          String(valor)

        pdf.text(
          valorTexto.length > 18
            ? `${valorTexto.slice(0, 18)}...`
            : valorTexto,
          x + 4,
          y + 16
        )
      }

      // Cabeçalho premium
      pdf.setFillColor(
        22,
        163,
        74
      )

      pdf.rect(
        0,
        0,
        pageWidth,
        32,
        'F'
      )

      pdf.setFont(
        'helvetica',
        'bold'
      )

      pdf.setFontSize(21)

      pdf.setTextColor(
        255,
        255,
        255
      )

      pdf.text(
        'AgroPulse',
        margin,
        16
      )

      pdf.setFontSize(11)

      pdf.setFont(
        'helvetica',
        'normal'
      )

      pdf.text(
        'Relatório geral da propriedade',
        margin,
        24
      )

      y = 42

      titulo('Filtros aplicados')

      textoNormal(
        `Período: ${formatarPeriodo()}`
      )

      textoNormal(
        `Fazenda: ${fazendaSelecionadaNome()}`
      )

      textoNormal(
        `Status: ${status || 'Todos'}`
      )

      textoNormal(
        `Cultura: ${cultura || 'Todas'}`
      )

      textoNormal(
        `Gerado em: ${new Date().toLocaleDateString('pt-BR')}`
      )

      y += 4

      linha()

      titulo('Resumo da Propriedade')

      const cardWidth =
        42

      const gap =
        7

      verificarPagina(30)

      card(
        'Fazendas',
        data.resumo.total_fazendas,
        margin,
        cardWidth
      )

      card(
        'Talhões',
        data.resumo.total_talhoes,
        margin + cardWidth + gap,
        cardWidth
      )

      card(
        'Área Total',
        `${formatarNumero(data.resumo.area_total)} ha`,
        margin + (cardWidth + gap) * 2,
        cardWidth
      )

      card(
        'Produtividade',
        `${Number(data.resumo.produtividade_media).toFixed(1)} sc/ha`,
        margin + (cardWidth + gap) * 3,
        cardWidth
      )

      y += 32

      titulo('Resumo Financeiro')

      verificarPagina(30)

      card(
        'Receitas',
        formatarValor(data.financeiro.receitas),
        margin,
        55
      )

      card(
        'Despesas',
        formatarValor(data.financeiro.despesas),
        margin + 62,
        55
      )

      card(
        'Lucro',
        formatarValor(data.financeiro.lucro),
        margin + 124,
        55
      )

      y += 32

      titulo('Status das Safras')

      verificarPagina(30)

      card(
        'Planejadas',
        data.resumo.safras_planejadas,
        margin,
        cardWidth
      )

      card(
        'Ativas',
        data.resumo.safras_ativas,
        margin + cardWidth + gap,
        cardWidth
      )

      card(
        'Concluídas',
        data.resumo.safras_concluidas,
        margin + (cardWidth + gap) * 2,
        cardWidth
      )

      card(
        'Canceladas',
        data.resumo.safras_canceladas,
        margin + (cardWidth + gap) * 3,
        cardWidth
      )

      y += 32

      titulo('Culturas Cadastradas')

      if (data.culturas.length === 0) {

        textoNormal(
          'Nenhuma cultura cadastrada no período.'
        )

      } else {

        data.culturas.forEach((item) => {

          verificarPagina(8)

          pdf.setFont(
            'helvetica',
            'normal'
          )

          pdf.setFontSize(10)

          pdf.setTextColor(
            17,
            24,
            39
          )

          pdf.text(
            `${item.cultura}: ${item.total} safra(s)`,
            margin,
            y
          )

          y += 6
        })
      }

      y += 4

      titulo('Produtividade por Cultura')

      if (
        data.produtividade_por_cultura.length === 0
      ) {

        textoNormal(
          'Nenhuma produtividade registrada no período.'
        )

      } else {

        data.produtividade_por_cultura.forEach((item) => {

          verificarPagina(8)

          pdf.setFont(
            'helvetica',
            'normal'
          )

          pdf.setFontSize(10)

          pdf.setTextColor(
            17,
            24,
            39
          )

          pdf.text(
            `${item.cultura}: ${Number(item.media_produtividade).toFixed(1)} sc/ha (${item.total_safras} safra(s))`,
            margin,
            y
          )

          y += 6
        })
      }

      y += 4

      titulo('Safras Registradas')

      if (data.safras.length === 0) {

        textoNormal(
          'Nenhuma safra registrada neste período.'
        )

      } else {

        verificarPagina(14)

        pdf.setFillColor(
          243,
          244,
          246
        )

        pdf.rect(
          margin,
          y,
          pageWidth - margin * 2,
          9,
          'F'
        )

        pdf.setFont(
          'helvetica',
          'bold'
        )

        pdf.setFontSize(8)

        pdf.setTextColor(
          17,
          24,
          39
        )

        pdf.text(
          'Cultura',
          margin + 2,
          y + 6
        )

        pdf.text(
          'Status',
          margin + 40,
          y + 6
        )

        pdf.text(
          'Talhão',
          margin + 75,
          y + 6
        )

        pdf.text(
          'Produtividade',
          margin + 120,
          y + 6
        )

        pdf.text(
          'Plantio',
          margin + 160,
          y + 6
        )

        y += 10

        data.safras.forEach((safra) => {

          verificarPagina(10)

          pdf.setDrawColor(
            229,
            231,
            235
          )

          pdf.line(
            margin,
            y + 1,
            pageWidth - margin,
            y + 1
          )

          pdf.setFont(
            'helvetica',
            'normal'
          )

          pdf.setFontSize(8)

          pdf.setTextColor(
            31,
            41,
            55
          )

          pdf.text(
            String(safra.cultura || '-').slice(0, 18),
            margin + 2,
            y + 7
          )

          pdf.text(
            String(safra.status || 'Ativa').slice(0, 16),
            margin + 40,
            y + 7
          )

          pdf.text(
            String(safra.talhao_nome || '-').slice(0, 20),
            margin + 75,
            y + 7
          )

          pdf.text(
            safra.produtividade
              ? `${safra.produtividade} sc/ha`
              : '-',
            margin + 120,
            y + 7
          )

          pdf.text(
            formatarData(
              safra.data_plantio
            ),
            margin + 160,
            y + 7
          )

          y += 9
        })
      }

      const totalPaginas =
        pdf.getNumberOfPages()

      for (
        let i = 1;
        i <= totalPaginas;
        i++
      ) {

        pdf.setPage(i)

        pdf.setFont(
          'helvetica',
          'normal'
        )

        pdf.setFontSize(8)

        pdf.setTextColor(
          107,
          114,
          128
        )

        pdf.text(
          `AgroPulse - Página ${i} de ${totalPaginas}`,
          margin,
          pageHeight - 8
        )
      }

      pdf.save(
        `relatorio-agropulse-${mesInicio || 'inicio'}-${mesFim || 'fim'}.pdf`
      )

    } catch (error) {

      console.error(
        'Erro ao exportar PDF:',
        error
      )

    } finally {

      setExportando(false)
    }
  }

  useEffect(() => {

    carregarFazendas()
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

      {/* Filtros e exportação */}
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

        <div className="relative z-10 space-y-6">

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
              <Filter className="size-4" />
              Filtro de exportação
            </div>

            <h2 className="text-2xl font-bold">
              Exportar relatório por período
            </h2>

            <p className="text-muted-foreground mt-2 max-w-2xl">
              Filtre por período, fazenda, status e cultura antes de gerar o PDF.
            </p>

          </div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-5
              gap-4
            "
          >

            <div>
              <label className="text-sm font-medium">
                Mês inicial
              </label>

              <input
                type="month"
                value={mesInicio}
                onChange={(e) =>
                  setMesInicio(e.target.value)
                }
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-primary
                "
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Mês final
              </label>

              <input
                type="month"
                value={mesFim}
                onChange={(e) =>
                  setMesFim(e.target.value)
                }
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-primary
                "
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Fazenda
              </label>

              <select
                value={fazendaId}
                onChange={(e) =>
                  setFazendaId(e.target.value)
                }
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-primary
                "
              >
                <option value="">
                  Todas
                </option>

                {fazendas.map((fazenda) => (
                  <option
                    key={fazenda.id}
                    value={fazenda.id}
                  >
                    {fazenda.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-primary
                "
              >
                <option value="">
                  Todos
                </option>

                {statusOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Cultura
              </label>

              <select
                value={cultura}
                onChange={(e) =>
                  setCultura(e.target.value)
                }
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-background
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-primary
                "
              >
                <option value="">
                  Todas
                </option>

                {culturaOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <button
              onClick={carregarRelatorio}
              className="
                rounded-xl
                bg-primary
                text-primary-foreground
                px-5
                py-3
                font-medium
                hover:opacity-90
                transition
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Search className="size-5" />
              Aplicar filtros
            </button>

            <button
              onClick={() => {
                limparFiltros()
                setTimeout(
                  carregarRelatorio,
                  0
                )
              }}
              className="
                rounded-xl
                border
                border-border
                px-5
                py-3
                font-medium
                hover:bg-accent
                transition
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <RotateCcw className="size-5" />
              Limpar
            </button>

            <button
              onClick={exportarPDF}
              disabled={exportando}
              className="
                rounded-xl
                bg-gradient-to-r
                from-red-500
                to-red-600
                text-white
                px-5
                py-3
                font-medium
                hover:opacity-90
                transition
                shadow-lg
                disabled:opacity-60
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Download className="size-5" />

              {exportando
                ? 'Exportando...'
                : 'Exportar PDF'}
            </button>

          </div>

        </div>

      </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 text-sm">
              <div className="rounded-2xl border border-border bg-background/60 p-3">
                <span className="text-muted-foreground">
                  Período
                </span>
                <p className="font-semibold mt-1">
                  {formatarPeriodo()}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-3">
                <span className="text-muted-foreground">
                  Fazenda
                </span>
                <p className="font-semibold mt-1">
                  {fazendaSelecionadaNome()}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-3">
                <span className="text-muted-foreground">
                  Status
                </span>
                <p className="font-semibold mt-1">
                  {status || 'Todos'}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-3">
                <span className="text-muted-foreground">
                  Cultura
                </span>
                <p className="font-semibold mt-1">
                  {cultura || 'Todas'}
                </p>
              </div>
            </div>

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

      {/* Culturas e Produtividade */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

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
            Produtividade por cultura
          </h2>

          <p className="text-muted-foreground text-sm mt-1">
            Média de produtividade por cultura no período
          </p>

          <div className="space-y-3 mt-6">

            {data.produtividade_por_cultura.length === 0 && (
              <p className="text-muted-foreground">
                Nenhuma produtividade registrada.
              </p>
            )}

            {data.produtividade_por_cultura.map((item) => (
              <div
                key={item.cultura}
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-background/60
                  p-4
                "
              >
                <div className="flex items-center justify-between">

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
                    {Number(item.media_produtividade).toFixed(1)} sc/ha
                  </span>

                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  {item.total_safras} safra(s) considerada(s)
                </p>
              </div>
            ))}

          </div>
        </div>

      </section>

      {/* Tabela */}
      <section
        className="
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
                    Nenhuma safra registrada neste período.
                  </td>
                </tr>
              )}

              {data.safras.map((safra, index) => {

                const statusSafra =
                  safra.status || 'Ativa'

                const style =
                  statusStyles[statusSafra] || statusStyles.Ativa

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
                        {statusSafra}
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
      </section>

    </div>
  )
}