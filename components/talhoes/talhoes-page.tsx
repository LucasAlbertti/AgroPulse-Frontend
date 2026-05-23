'use client'

import { useEffect, useState } from 'react'

import api from '@/lib/api'

import { TalhaoModal } from './talhao-modal'

import { ConfirmDeleteModal } from '@/components/ui/confirm-delete-modal'

import {
  Grid3X3,
  Tractor,
  MapPinned,
  Plus,
  Pencil,
  Trash2,
  Wheat
} from 'lucide-react'

type Talhao = {
  id: number
  nome: string
  area_hectares: number
  tipo_cultura: string
  fazenda_id: number
  fazenda_nome?: string
  total_safras?: number
}

type Fazenda = {
  id: number
  nome: string
}

export function TalhoesPage() {

  const [talhoes, setTalhoes] =
    useState<Talhao[]>([])

  const [fazendas, setFazendas] =
    useState<Fazenda[]>([])

  const [loading, setLoading] =
    useState(true)

  const [openModal, setOpenModal] =
    useState(false)

  const [editingTalhao, setEditingTalhao] =
    useState<Talhao | null>(null)

  const [talhaoParaExcluir, setTalhaoParaExcluir] =
    useState<Talhao | null>(null)

  async function carregarDados() {

    try {

      const [
        responseTalhoes,
        responseFazendas
      ] = await Promise.all([
        api.get('/talhoes'),
        api.get('/fazendas')
      ])

      setTalhoes(responseTalhoes.data)

      setFazendas(responseFazendas.data)

    } catch (error) {

      console.error(
        'Erro ao carregar talhões:',
        error
      )

    } finally {

      setLoading(false)
    }
  }

  async function salvarTalhao(data: any) {

    try {

      if (editingTalhao) {

        await api.put(
          `/talhoes/${editingTalhao.id}`,
          data
        )

      } else {

        await api.post(
          '/talhoes',
          data
        )
      }

      setOpenModal(false)

      setEditingTalhao(null)

      carregarDados()

    } catch (error) {

      console.error(
        'Erro ao salvar talhão:',
        error
      )
    }
  }

  async function excluirTalhao() {

    if (!talhaoParaExcluir) return

    try {

      await api.delete(
        `/talhoes/${talhaoParaExcluir.id}`
      )

      setTalhaoParaExcluir(null)

      carregarDados()

    } catch (error) {

      console.error(
        'Erro ao excluir talhão:',
        error
      )
    }
  }

  useEffect(() => {

    carregarDados()

  }, [])

  if (loading) {

    return (

      <div className="flex items-center justify-center h-[60vh]">

        <p className="text-muted-foreground">
          Carregando talhões...
        </p>

      </div>
    )
  }

  const totalHectares =
    talhoes.reduce(
      (acc, talhao) =>
        acc + Number(talhao.area_hectares),
      0
    )

  return (

    <div className="space-y-8">

      <TalhaoModal
        open={openModal}
        onClose={() => {

          setOpenModal(false)

          setEditingTalhao(null)
        }}
        onSave={salvarTalhao}
        fazendas={fazendas}
        initialData={
          editingTalhao
            ? {
                nome:
                  editingTalhao.nome,

                area_hectares:
                  editingTalhao.area_hectares,

                tipo_cultura:
                  editingTalhao.tipo_cultura,

                fazenda_id:
                  editingTalhao.fazenda_id
              }
            : undefined
        }
      />

      <ConfirmDeleteModal
        open={!!talhaoParaExcluir}
        title="Excluir talhão"
        description="
          Tem certeza que deseja excluir este talhão?
          Todos os dados relacionados poderão ser perdidos.
        "
        onClose={() => {

          setTalhaoParaExcluir(null)
        }}
        onConfirm={excluirTalhao}
      />

      {/* Header */}
      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <div>

          <h1 className="text-4xl font-bold tracking-tight">
            Talhões
          </h1>

          <p className="text-muted-foreground mt-2">
            Gerencie todas as áreas agrícolas
          </p>

        </div>

        <button
          onClick={() => {

            setEditingTalhao(null)

            setOpenModal(true)
          }}
          className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-primary
            px-5
            py-3
            font-medium
            text-primary-foreground
            shadow-lg
            transition
            hover:scale-[1.02]
            hover:opacity-90
            active:scale-[0.98]
          "
        >

          <Plus className="size-5" />

          Novo Talhão

        </button>

      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">

        <div
          className="
            rounded-3xl
            border
            bg-card
            p-6
            shadow-sm
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Total de Talhões
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {talhoes.length}
              </h3>

            </div>

            <div
              className="
                flex
                size-14
                items-center
                justify-center
                rounded-2xl
                bg-primary/10
              "
            >
              <Grid3X3 className="size-7 text-primary" />
            </div>

          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            bg-card
            p-6
            shadow-sm
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Área Total
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {totalHectares} ha
              </h3>

            </div>

            <div
              className="
                flex
                size-14
                items-center
                justify-center
                rounded-2xl
                bg-emerald-500/10
              "
            >
              <MapPinned className="size-7 text-emerald-500" />
            </div>

          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            bg-card
            p-6
            shadow-sm
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Safras Ativas
              </p>

              <h3 className="text-3xl font-bold mt-2">

                {
                  talhoes.reduce(
                    (acc, talhao) =>
                      acc +
                      Number(
                        talhao.total_safras || 0
                      ),
                    0
                  )
                }

              </h3>

            </div>

            <div
              className="
                flex
                size-14
                items-center
                justify-center
                rounded-2xl
                bg-yellow-500/10
              "
            >
              <Wheat className="size-7 text-yellow-500" />
            </div>

          </div>

        </div>

      </div>

      {/* Lista */}
      <div className="grid gap-5">

        {talhoes.length === 0 && (

          <div
            className="
              rounded-3xl
              border
              border-dashed
              p-16
              text-center
            "
          >

            <Grid3X3
              className="
                mx-auto
                size-14
                text-muted-foreground/50
              "
            />

            <h3 className="text-xl font-semibold mt-5">
              Nenhum talhão cadastrado
            </h3>

            <p className="text-muted-foreground mt-2">
              Crie o primeiro talhão do sistema
            </p>

          </div>
        )}

        {talhoes.map((talhao) => (

          <div
            key={talhao.id}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              bg-card
              p-6
              shadow-sm
              transition
              hover:-translate-y-1
              hover:shadow-xl
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
                opacity-100
                pointer-events-none
              "
            />

            <div className="relative z-10">

              <div className="flex items-start justify-between">

                <div className="space-y-4">

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex
                        size-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-primary/10
                      "
                    >
                      <Tractor className="size-7 text-primary" />
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        {talhao.nome}
                      </h2>

                      <p className="text-muted-foreground">
                        {talhao.fazenda_nome}
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <div
                      className="
                        rounded-xl
                        border
                        bg-background/60
                        px-4
                        py-2
                        text-sm
                      "
                    >
                      🌾 {talhao.tipo_cultura}
                    </div>

                    <div
                      className="
                        rounded-xl
                        border
                        bg-background/60
                        px-4
                        py-2
                        text-sm
                      "
                    >
                      📍 {talhao.area_hectares} ha
                    </div>

                    <div
                      className="
                        rounded-xl
                        border
                        bg-background/60
                        px-4
                        py-2
                        text-sm
                      "
                    >
                      🌱 {talhao.total_safras || 0} safras
                    </div>

                  </div>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => {

                      setEditingTalhao(talhao)

                      setOpenModal(true)
                    }}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-2xl
                      border
                      px-5
                      py-3
                      font-medium
                      transition
                      hover:bg-accent
                    "
                  >

                    <Pencil className="size-4" />

                    Editar

                  </button>

                  <button
                    onClick={() =>
                      setTalhaoParaExcluir(talhao)
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-2xl
                      bg-red-500
                      px-5
                      py-3
                      font-medium
                      text-white
                      transition
                      hover:opacity-90
                    "
                  >

                    <Trash2 className="size-4" />

                    Excluir

                  </button>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}