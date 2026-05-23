'use client'

import { useEffect, useState } from 'react'

import api from '@/lib/api'

import { FazendaModal } from './fazenda-modal'

import { ConfirmDeleteModal } from '@/components/ui/confirm-delete-modal'

import {
  MapPin,
  Tractor,
  Layers3,
  Sprout
} from 'lucide-react'

type Fazenda = {
  id: number
  nome: string
  cidade: string
  estado: string

  total_talhoes: number
  total_safras: number
  area_total: number
}

export function FazendasPage() {

  const [fazendas, setFazendas] =
    useState<Fazenda[]>([])

  const [loading, setLoading] =
    useState(true)

  const [modalOpen, setModalOpen] =
    useState(false)

  const [fazendaEditando, setFazendaEditando] =
    useState<Fazenda | null>(null)

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false)

  const [fazendaParaExcluir, setFazendaParaExcluir] =
    useState<number | null>(null)

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

    } finally {

      setLoading(false)
    }
  }

  async function salvarFazenda(data: {
    nome: string
    cidade: string
    estado: string
  }) {

    try {

      if (fazendaEditando) {

        await api.put(
          `/fazendas/${fazendaEditando.id}`,
          data
        )

      } else {

        await api.post(
          '/fazendas',
          data
        )
      }

      setModalOpen(false)

      setFazendaEditando(null)

      carregarFazendas()

    } catch (error) {

      console.error(
        'Erro ao salvar fazenda:',
        error
      )
    }
  }

  async function excluirFazenda() {

    if (fazendaParaExcluir === null) return

    try {

      await api.delete(
        `/fazendas/${fazendaParaExcluir}`
      )

      setDeleteModalOpen(false)

      setFazendaParaExcluir(null)

      carregarFazendas()

    } catch (error) {

      console.error(
        'Erro ao excluir fazenda:',
        error
      )
    }
  }

  useEffect(() => {

    carregarFazendas()

  }, [])

  if (loading) {

    return (

      <div className="flex items-center justify-center h-[60vh]">

        <p className="text-muted-foreground">
          Carregando fazendas...
        </p>

      </div>
    )
  }

  return (

    <div className="space-y-6">

      <FazendaModal
        open={modalOpen}
        onClose={() => {

          setModalOpen(false)

          setFazendaEditando(null)
        }}
        onSave={salvarFazenda}
        initialData={
          fazendaEditando || undefined
        }
      />

      <ConfirmDeleteModal
        open={deleteModalOpen}
        title="Excluir fazenda"
        description="
          Tem certeza que deseja excluir esta fazenda?
          Todos os dados relacionados poderão ser perdidos.
        "
        onClose={() => {

          setDeleteModalOpen(false)

          setFazendaParaExcluir(null)
        }}
        onConfirm={excluirFazenda}
      />

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Fazendas
          </h1>

          <p className="text-muted-foreground">
            Gerencie todas as suas fazendas
          </p>

        </div>

        <button
          onClick={() => {

            setFazendaEditando(null)

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
          Nova Fazenda
        </button>

      </div>

      <div className="grid gap-4">

        {fazendas.length === 0 && (

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
            Nenhuma fazenda cadastrada
          </div>
        )}

        {fazendas.map((fazenda) => (

          <div
            key={fazenda.id}
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

            {/* Background gradient */}
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
                    <Tractor className="size-8 text-primary" />
                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">
                      {fazenda.nome}
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
                      <MapPin className="size-4" />

                      <span>
                        {fazenda.cidade} - {fazenda.estado}
                      </span>
                    </div>

                  </div>

                </div>

                <div
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-green-500/10
                    text-green-600
                    text-sm
                    font-medium
                  "
                >
                  Ativa
                </div>

              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">

                <div
                  className="
                    rounded-2xl
                    border
                    border-border
                    bg-background/60
                    p-4
                  "
                >
                  <div className="flex items-center gap-2">

                    <Layers3 className="size-5 text-primary" />

                    <span className="text-sm text-muted-foreground">
                      Talhões
                    </span>

                  </div>

                  <p className="text-2xl font-bold mt-2">
                    {fazenda.total_talhoes}
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
                  <div className="flex items-center gap-2">

                    <Sprout className="size-5 text-primary" />

                    <span className="text-sm text-muted-foreground">
                      Safras
                    </span>

                  </div>

                  <p className="text-2xl font-bold mt-2">
                    {fazenda.total_safras}
                  </p>

                </div>

              </div>

              {/* Área total */}
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
                  Área Total
                </p>

                <p className="text-3xl font-bold mt-2">
                  {fazenda.area_total || 0} ha
                </p>

              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => {

                    setFazendaEditando(
                      fazenda
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

                    setFazendaParaExcluir(
                      fazenda.id
                    )

                    setDeleteModalOpen(true)
                  }}
                  className="
                    flex-1
                    px-5
                    py-3
                    rounded-2xl
                    bg-red-500
                    text-white
                    font-medium
                    hover:opacity-90
                    transition
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