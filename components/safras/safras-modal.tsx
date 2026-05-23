'use client'

import {
  useEffect,
  useState
} from 'react'

type Fazenda = {
  id: number
  nome: string
}

type SafraModalProps = {
  open: boolean
  onClose: () => void

  onSave: (data: {
    cultura: string
    data_plantio: string
    data_colheita: string
    produtividade: number
    talhao_id: number
  }) => void

  fazendas?: Fazenda[]

  talhoes: {
    id: number
    nome: string
    fazenda_id: number
  }[]

  initialData?: {
    cultura: string
    data_plantio: string
    data_colheita: string
    produtividade: number
    talhao_id: number
  }
}

const culturasDisponiveis = [
  'Soja',
  'Milho',
  'Trigo',
  'Feijão',
  'Aveia',
  'Algodão',
  'Pastagem'
]

export function SafraModal({
  open,
  onClose,
  onSave,
  talhoes,
  initialData
}: SafraModalProps) {

  const [cultura, setCultura] =
    useState('Soja')

  const [dataPlantio, setDataPlantio] =
    useState('')

  const [dataColheita, setDataColheita] =
    useState('')

  const [produtividade, setProdutividade] =
    useState('')

  const [talhaoId, setTalhaoId] =
    useState('')

  useEffect(() => {

    if (initialData) {

      setCultura(
        initialData.cultura
      )

      setDataPlantio(
        initialData.data_plantio
      )

      setDataColheita(
        initialData.data_colheita
      )

      setProdutividade(
        initialData.produtividade.toString()
      )

      setTalhaoId(
        initialData.talhao_id.toString()
      )

    } else {

      setCultura('Soja')

      setDataPlantio('')

      setDataColheita('')

      setProdutividade('')

      setTalhaoId('')
    }

  }, [initialData, open])

  if (!open) return null

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        backdrop-blur-sm
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-2xl
          rounded-3xl
          border
          border-border
          bg-background
          p-8
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
        "
      >

        <div className="mb-8">

          <h2 className="text-3xl font-bold">

            {initialData
              ? 'Editar Safra'
              : 'Nova Safra'}

          </h2>

          <p className="text-muted-foreground mt-2">
            Gerencie informações da safra
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Cultura */}
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
                rounded-2xl
                border
                border-border
                bg-background
                px-4
                py-3
                outline-none
                transition
                focus:ring-2
                focus:ring-primary
              "
            >

              {culturasDisponiveis.map(
                (item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}

            </select>

          </div>

          {/* Talhão */}
          <div>

            <label className="text-sm font-medium">
              Talhão
            </label>

            <select
              value={talhaoId}
              onChange={(e) =>
                setTalhaoId(
                  e.target.value
                )
              }
              className="
                mt-2
                w-full
                rounded-2xl
                border
                border-border
                bg-background
                px-4
                py-3
                outline-none
                transition
                focus:ring-2
                focus:ring-primary
              "
            >

              <option value="">
                Selecione um talhão
              </option>

              {talhoes.map((talhao) => (

                <option
                  key={talhao.id}
                  value={talhao.id}
                >
                  {talhao.nome}
                </option>
              ))}

            </select>

          </div>

          {/* Plantio */}
          <div>

            <label className="text-sm font-medium">
              Data de Plantio
            </label>

            <input
              type="date"
              value={dataPlantio}
              onChange={(e) =>
                setDataPlantio(
                  e.target.value
                )
              }
              className="
                mt-2
                w-full
                rounded-2xl
                border
                border-border
                bg-background
                px-4
                py-3
                outline-none
                transition
                focus:ring-2
                focus:ring-primary
              "
            />

          </div>

          {/* Colheita */}
          <div>

            <label className="text-sm font-medium">
              Data de Colheita
            </label>

            <input
              type="date"
              value={dataColheita}
              onChange={(e) =>
                setDataColheita(
                  e.target.value
                )
              }
              className="
                mt-2
                w-full
                rounded-2xl
                border
                border-border
                bg-background
                px-4
                py-3
                outline-none
                transition
                focus:ring-2
                focus:ring-primary
              "
            />

          </div>

          {/* Produtividade */}
          <div className="md:col-span-2">

            <label className="text-sm font-medium">
              Produtividade (sc/ha)
            </label>

            <input
              type="number"
              value={produtividade}
              onChange={(e) =>
                setProdutividade(
                  e.target.value
                )
              }
              placeholder="Ex: 68"
              className="
                mt-2
                w-full
                rounded-2xl
                border
                border-border
                bg-background
                px-4
                py-3
                outline-none
                transition
                focus:ring-2
                focus:ring-primary
              "
            />

          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="
              px-5
              py-2.5
              rounded-2xl
              border
              hover:bg-accent
              transition
            "
          >
            Cancelar
          </button>

          <button
            onClick={() => {

              if (
                !cultura ||
                !dataPlantio ||
                !dataColheita ||
                !produtividade ||
                !talhaoId
              ) return

              onSave({
                cultura,
                data_plantio:
                  dataPlantio,
                data_colheita:
                  dataColheita,
                produtividade:
                  Number(produtividade),
                talhao_id:
                  Number(talhaoId)
              })
            }}
            className="
              px-6
              py-2.5
              rounded-2xl
              bg-primary
              text-primary-foreground
              hover:opacity-90
              transition
              font-medium
              shadow-lg
            "
          >
            Salvar Safra
          </button>

        </div>

      </div>

    </div>
  )
}