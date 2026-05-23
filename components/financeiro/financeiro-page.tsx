'use client'

import { useEffect, useState } from 'react'

import api from '@/lib/api'

import { FinanceiroModal } from './financeiro-modal'

import { ConfirmDeleteModal } from '@/components/ui/confirm-delete-modal'

import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  Wallet
} from 'lucide-react'

type Lancamento = {
  id: number
  tipo: string
  descricao: string
  categoria: string
  valor: number
  data: string
}

export function FinanceiroPage() {

  const [lancamentos, setLancamentos] =
    useState<Lancamento[]>([])

  const [loading, setLoading] =
    useState(true)

  const [modalOpen, setModalOpen] =
    useState(false)

  const [lancamentoEditando, setLancamentoEditando] =
    useState<Lancamento | null>(null)

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false)

  const [lancamentoParaExcluir, setLancamentoParaExcluir] =
    useState<number | null>(null)

  async function carregarLancamentos() {

    try {

      const response =
        await api.get('/financeiro')

      setLancamentos(response.data)

    } catch (error) {

      console.error(
        'Erro ao carregar financeiro:',
        error
      )

    } finally {

      setLoading(false)
    }
  }

  async function salvarLancamento(data: {
    tipo: string
    descricao: string
    categoria: string
    valor: number
    data: string
  }) {

    try {

      if (lancamentoEditando) {

        await api.put(
          `/financeiro/${lancamentoEditando.id}`,
          data
        )

      } else {

        await api.post(
          '/financeiro',
          data
        )
      }

      setModalOpen(false)

      setLancamentoEditando(null)

      carregarLancamentos()

    } catch (error) {

      console.error(
        'Erro ao salvar lançamento:',
        error
      )
    }
  }

  async function excluirLancamento() {

    if (lancamentoParaExcluir === null) return

    try {

      await api.delete(
        `/financeiro/${lancamentoParaExcluir}`
      )

      setDeleteModalOpen(false)

      setLancamentoParaExcluir(null)

      carregarLancamentos()

    } catch (error) {

      console.error(
        'Erro ao excluir lançamento:',
        error
      )
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

    return new Date(data)
      .toLocaleDateString('pt-BR')
  }

  const totalReceitas =
    lancamentos
      .filter(
        (item) =>
          item.tipo === 'Receita'
      )
      .reduce(
        (acc, item) =>
          acc + Number(item.valor),
        0
      )

  const totalDespesas =
    lancamentos
      .filter(
        (item) =>
          item.tipo === 'Despesa'
      )
      .reduce(
        (acc, item) =>
          acc + Number(item.valor),
        0
      )

  const saldo =
    totalReceitas - totalDespesas

  useEffect(() => {

    carregarLancamentos()

  }, [])

  if (loading) {

    return (

      <div className="flex items-center justify-center h-[60vh]">

        <p className="text-muted-foreground">
          Carregando financeiro...
        </p>

      </div>
    )
  }

  return (

    <div className="space-y-6">

      <FinanceiroModal
        open={modalOpen}
        onClose={() => {

          setModalOpen(false)

          setLancamentoEditando(null)
        }}
        onSave={salvarLancamento}
        initialData={
          lancamentoEditando || undefined
        }
      />

      <ConfirmDeleteModal
        open={deleteModalOpen}
        title="Excluir lançamento"
        description="
          Tem certeza que deseja excluir este lançamento?
          Esta ação não poderá ser desfeita.
        "
        onClose={() => {

          setDeleteModalOpen(false)

          setLancamentoParaExcluir(null)
        }}
        onConfirm={excluirLancamento}
      />

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Financeiro
          </h1>

          <p className="text-muted-foreground">
            Controle financeiro da propriedade
          </p>

        </div>

        <button
          onClick={() => {

            setLancamentoEditando(null)

            setModalOpen(true)
          }}
          className="
            bg-primary
            text-primary-foreground
            px-5
            py-2.5
            rounded-xl
            font-medium
            hover:opacity-90
            transition
            shadow-lg
          "
        >
          Novo Lançamento
        </button>

      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* Receitas */}
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

          <div className="flex items-center justify-between">

            <div>

              <p className="text-muted-foreground">
                Receitas
              </p>

              <h2 className="text-3xl font-bold mt-2 text-green-600">
                {formatarValor(
                  totalReceitas
                )}
              </h2>

            </div>

            <div
              className="
                size-14
                rounded-2xl
                bg-green-500/10
                flex
                items-center
                justify-center
              "
            >
              <TrendingUp className="size-7 text-green-600" />
            </div>

          </div>

        </div>

        {/* Despesas */}
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

          <div className="flex items-center justify-between">

            <div>

              <p className="text-muted-foreground">
                Despesas
              </p>

              <h2 className="text-3xl font-bold mt-2 text-red-500">
                {formatarValor(
                  totalDespesas
                )}
              </h2>

            </div>

            <div
              className="
                size-14
                rounded-2xl
                bg-red-500/10
                flex
                items-center
                justify-center
              "
            >
              <TrendingDown className="size-7 text-red-500" />
            </div>

          </div>

        </div>

        {/* Saldo */}
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

          <div className="flex items-center justify-between">

            <div>

              <p className="text-muted-foreground">
                Saldo Atual
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {formatarValor(
                  saldo
                )}
              </h2>

            </div>

            <div
              className="
                size-14
                rounded-2xl
                bg-primary/10
                flex
                items-center
                justify-center
              "
            >
              <Wallet className="size-7 text-primary" />
            </div>

          </div>

        </div>

      </div>

      {/* Lista */}
      <div className="grid gap-4">

        {lancamentos.length === 0 && (

          <div
            className="
              border
              border-dashed
              rounded-2xl
              p-10
              text-center
              text-muted-foreground
            "
          >
            Nenhum lançamento cadastrado
          </div>
        )}

        {lancamentos.map((item) => (

          <div
            key={item.id}
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

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-primary/5
                via-transparent
                to-transparent
                pointer-events-none
              "
            />

            <div className="relative z-10">

              <div className="flex items-start justify-between">

                <div className="flex gap-4">

                  <div
                    className={`
                      size-16
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      shrink-0

                      ${
                        item.tipo === 'Receita'
                          ? 'bg-green-500/10'
                          : 'bg-red-500/10'
                      }
                    `}
                  >
                    <DollarSign
                      className={`
                        size-8

                        ${
                          item.tipo === 'Receita'
                            ? 'text-green-600'
                            : 'text-red-500'
                        }
                      `}
                    />
                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">
                      {item.descricao}
                    </h2>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mt-2
                        text-muted-foreground
                      "
                    >
                      <CalendarDays className="size-4" />

                      <span>
                        {formatarData(
                          item.data
                        )}
                      </span>

                    </div>

                  </div>

                </div>

                <div
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium

                    ${
                      item.tipo === 'Receita'
                        ? 'bg-green-500/10 text-green-600'
                        : 'bg-red-500/10 text-red-500'
                    }
                  `}
                >
                  {item.tipo}
                </div>

              </div>

              {/* Categoria */}
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

                <p className="text-sm text-muted-foreground">
                  Categoria
                </p>

                <p className="text-xl font-bold mt-2">
                  {item.categoria}
                </p>

              </div>

              {/* Valor */}
              <div
                className="
                  mt-4
                  rounded-2xl
                  border
                  border-border
                  bg-background/60
                  p-4
                "
              >

                <p className="text-sm text-muted-foreground">
                  Valor
                </p>

                <p
                  className={`
                    text-3xl
                    font-bold
                    mt-2

                    ${
                      item.tipo === 'Receita'
                        ? 'text-green-600'
                        : 'text-red-500'
                    }
                  `}
                >
                  {formatarValor(
                    item.valor
                  )}
                </p>

              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => {

                    setLancamentoEditando(
                      item
                    )

                    setModalOpen(true)
                  }}
                  className="
                    flex-1
                    px-5
                    py-3
                    rounded-2xl
                    border
                    font-medium
                    hover:bg-accent
                    transition
                  "
                >
                  Editar
                </button>

                <button
                  onClick={() => {

                    setLancamentoParaExcluir(
                      item.id
                    )

                    setDeleteModalOpen(true)
                  }}
                  className="
                    flex-1
                    px-5
                    py-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-red-500
                    to-red-600
                    text-white
                    font-medium
                    shadow-lg
                    hover:scale-[1.02]
                    hover:opacity-95
                    transition-all
                  "
                >
                  Excluir
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}