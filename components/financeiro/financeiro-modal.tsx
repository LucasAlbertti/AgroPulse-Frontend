'use client'

import { useEffect, useState } from 'react'

type FinanceiroModalProps = {
  open: boolean
  onClose: () => void
  onSave: (data: {
    tipo: string
    descricao: string
    categoria: string
    valor: number
    data: string
  }) => void
  initialData?: {
    tipo: string
    descricao: string
    categoria: string
    valor: number
    data: string
  }
}

export function FinanceiroModal({
  open,
  onClose,
  onSave,
  initialData
}: FinanceiroModalProps) {

  const [tipo, setTipo] =
    useState('Receita')

  const [descricao, setDescricao] =
    useState('')

  const [categoria, setCategoria] =
    useState('')

  const [valor, setValor] =
    useState('')

  const [data, setData] =
    useState('')

  useEffect(() => {

    if (initialData) {

      setTipo(initialData.tipo)

      setDescricao(initialData.descricao)

      setCategoria(initialData.categoria)

      setValor(
        initialData.valor.toString()
      )

      setData(initialData.data)

    } else {

      setTipo('Receita')

      setDescricao('')

      setCategoria('')

      setValor('')

      setData('')
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
          relative
          w-full
          max-w-xl
          overflow-hidden
          rounded-3xl
          border
          border-border
          bg-background
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
        "
      >

        {/* Glow */}
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

        <div className="relative z-10 p-8">

          {/* Header */}
          <div className="mb-8">

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
              💰 Financeiro
            </div>

            <h2 className="text-3xl font-bold">

              {initialData
                ? 'Editar Lançamento'
                : 'Novo Lançamento'}

            </h2>

            <p className="text-muted-foreground mt-2">
              Gerencie receitas e despesas da fazenda
            </p>

          </div>

          {/* Form */}
          <div className="space-y-5">

            {/* Tipo */}
            <div>

              <label className="text-sm font-medium">
                Tipo
              </label>

              <select
                value={tipo}
                onChange={(e) =>
                  setTipo(e.target.value)
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
                <option value="Receita">
                  Receita
                </option>

                <option value="Despesa">
                  Despesa
                </option>

              </select>

            </div>

            {/* Descrição */}
            <div>

              <label className="text-sm font-medium">
                Descrição
              </label>

              <input
                value={descricao}
                onChange={(e) =>
                  setDescricao(e.target.value)
                }
                placeholder="Ex: Venda de soja"
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

            {/* Categoria */}
            <div>

              <label className="text-sm font-medium">
                Categoria
              </label>

              <input
                value={categoria}
                onChange={(e) =>
                  setCategoria(e.target.value)
                }
                placeholder="Ex: Grãos"
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

            {/* Valor */}
            <div>

              <label className="text-sm font-medium">
                Valor (R$)
              </label>

              <input
                type="number"
                value={valor}
                onChange={(e) =>
                  setValor(e.target.value)
                }
                placeholder="0.00"
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

            {/* Data */}
            <div>

              <label className="text-sm font-medium">
                Data
              </label>

              <input
                type="date"
                value={data}
                onChange={(e) =>
                  setData(e.target.value)
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

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-10">

            <button
              onClick={onClose}
              className="
                px-5
                py-3
                rounded-2xl
                border
                font-medium
                hover:bg-accent
                transition
              "
            >
              Cancelar
            </button>

            <button
              onClick={() => {

                if (
                  !descricao ||
                  !categoria ||
                  !valor ||
                  !data
                ) return

                onSave({
                  tipo,
                  descricao,
                  categoria,
                  valor: Number(valor),
                  data
                })
              }}
              className="
                px-6
                py-3
                rounded-2xl
                bg-primary
                text-primary-foreground
                font-semibold
                shadow-lg
                hover:scale-[1.02]
                hover:opacity-95
                transition-all
              "
            >
              Salvar
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}