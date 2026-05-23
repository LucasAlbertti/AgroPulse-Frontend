'use client'

import {
  useEffect,
  useState
} from 'react'

import api from '@/lib/api'

import {
  Sprout,
  Wheat,
  Calendar,
  Tractor
} from 'lucide-react'

import { SafraModal }
  from './safras-modal'

import { ConfirmDeleteModal }
  from '@/components/ui/confirm-delete-modal'

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

export function SafrasPage() {

  const [safras, setSafras] =
    useState<Safra[]>([])

  const [talhoes, setTalhoes] =
    useState<Talhao[]>([])

  const [loading, setLoading] =
    useState(true)

  const [modalOpen, setModalOpen] =
    useState(false)

  const [safraEditando, setSafraEditando] =
    useState<Safra | null>(null)

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false)

  const [safraParaExcluir, setSafraParaExcluir] =
    useState<number | null>(null)

  async function carregarDados() {

    try {

      const [
        responseSafras,
        responseTalhoes
      ] = await Promise.all([
        api.get('/safras'),
        api.get('/talhoes')
      ])

      setSafras(
        responseSafras.data
      )

      setTalhoes(
        responseTalhoes.data
      )

    } catch (error) {

      console.error(
        'Erro ao carregar safras:',
        error
      )

    } finally {

      setLoading(false)
    }
  }

  async function salvarSafra(data: {
    cultura: string
    data_plantio: string
    data_colheita: string
    produtividade: number
    talhao_id: number
  }) {

    try {

      if (safraEditando) {

        await api.put(
          `/safras/${safraEditando.id}`,
          data
        )

      } else {

        await api.post(
          '/safras',
          data
        )
      }

      setModalOpen(false)

      setSafraEditando(null)

      carregarDados()

    } catch (error) {

      console.error(
        'Erro ao salvar safra:',
        error
      )
    }
  }

  async function excluirSafra() {

    if (!safraParaExcluir)
      return

    try {

      await api.delete(
        `/safras/${safraParaExcluir}`
      )

      setDeleteModalOpen(false)

      setSafraParaExcluir(null)

      carregarDados()

    } catch (error) {

      console.error(
        'Erro ao excluir safra:',
        error
      )
    }
  }

  function obterNomeTalhao(
    id: number
  ) {

    const talhao =
      talhoes.find(
        (t) => t.id === id
      )

    return talhao?.nome
      || 'Talhão'
  }

  useEffect(() => {

    carregarDados()

  }, [])

  if (loading) {

    return (

      <div
        className="
          flex
          items-center
          justify-center
          h-[60vh]
        "
      >

        <p className="text-muted-foreground">
          Carregando safras...
        </p>

      </div>
    )
  }

  return (

    <div className="space-y-6">

      <SafraModal
        open={modalOpen}
        onClose={() => {

          setModalOpen(false)

          setSafraEditando(null)
        }}
        onSave={salvarSafra}
        talhoes={talhoes}
        initialData={
          safraEditando || undefined
        }
      />

      <ConfirmDeleteModal
        open={deleteModalOpen}
        title="Excluir Safra"
        description="
          Tem certeza que deseja excluir esta safra?
          Esta ação não poderá ser desfeita.
        "
        onClose={() => {

          setDeleteModalOpen(false)

          setSafraParaExcluir(null)
        }}
        onConfirm={excluirSafra}
      />

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Safras
          </h1>

          <p className="text-muted-foreground">
            Gerencie suas safras agrícolas
          </p>

        </div>

        <button
          onClick={() => {

            setSafraEditando(null)

            setModalOpen(true)
          }}
          className="
            bg-primary
            text-primary-foreground
            px-5
            py-2.5
            rounded-2xl
            font-medium
            hover:opacity-90
            transition
            shadow-lg
          "
        >
          Nova Safra
        </button>

      </div>

      {/* GRID */}
      <div className="grid gap-5">

        {safras.length === 0 && (

          <div
            className="
              border
              border-dashed
              rounded-3xl
              p-10
              text-center
              text-muted-foreground
            "
          >
            Nenhuma safra cadastrada
          </div>
        )}

        {safras.map((safra) => {

          const style =
            culturaStyles[
              safra.cultura
            ] || culturaStyles.Soja

          return (

            <div
              key={safra.id}
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

                {/* TOP */}
                <div className="flex items-start justify-between">

                  <div className="flex gap-4">

                    <div
                      className="
                        size-16
                        rounded-2xl
                        bg-primary/10
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >
                      <Sprout
                        className="
                          size-8
                          text-primary
                        "
                      />
                    </div>

                    <div>

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <h2
                          className="
                            text-2xl
                            font-bold
                          "
                        >
                          {safra.cultura}
                        </h2>

                        <div
                          className={`
                            px-3
                            py-1
                            rounded-full
                            border
                            text-sm
                            font-medium
                            ${style.bg}
                            ${style.text}
                            ${style.border}
                          `}
                        >
                          Ativa
                        </div>

                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          mt-2
                          text-muted-foreground
                        "
                      >

                        <Tractor
                          className="size-4"
                        />

                        <span>
                          {obterNomeTalhao(
                            safra.talhao_id
                          )}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                {/* STATS */}
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                    mt-6
                  "
                >

                  <div
                    className="
                      rounded-2xl
                      border
                      border-border
                      bg-background/60
                      p-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <Calendar
                        className="
                          size-5
                          text-primary
                        "
                      />

                      <span
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >
                        Plantio
                      </span>

                    </div>

                    <p
                      className="
                        text-lg
                        font-bold
                        mt-2
                      "
                    >
                      {
                        new Date(
                          safra.data_plantio
                        ).toLocaleDateString(
                          'pt-BR'
                        )
                      }
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

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <Wheat
                        className="
                          size-5
                          text-primary
                        "
                      />

                      <span
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >
                        Produtividade
                      </span>

                    </div>

                    <p
                      className="
                        text-2xl
                        font-bold
                        mt-2
                      "
                    >
                      {
                        safra.produtividade
                      } sc/ha
                    </p>

                  </div>

                </div>

                {/* BUTTONS */}
                <div
                  className="
                    flex
                    gap-3
                    mt-6
                  "
                >

                  <button
                    onClick={() => {

                      setSafraEditando(
                        safra
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

                      setSafraParaExcluir(
                        safra.id
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
                      hover:opacity-90
                      transition
                      shadow-lg
                    "
                  >
                    Excluir
                  </button>

                </div>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}