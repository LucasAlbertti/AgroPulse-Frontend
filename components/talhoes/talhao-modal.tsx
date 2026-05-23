'use client'

import { useEffect, useState } from 'react'

import {
  X,
  Grid3X3,
  Tractor,
  Sprout,
  Map
} from 'lucide-react'

type Fazenda = {
  id: number
  nome: string
}

type TalhaoModalProps = {
  open: boolean
  onClose: () => void

  onSave: (data: {
    nome: string
    area_hectares: number
    tipo_cultura: string
    fazenda_id: number
  }) => void

  fazendas: Fazenda[]

  initialData?: {
    nome: string
    area_hectares: number
    tipo_cultura: string
    fazenda_id: number
  }
}

export function TalhaoModal({
  open,
  onClose,
  onSave,
  fazendas,
  initialData
}: TalhaoModalProps) {

  const [nome, setNome] =
    useState('')

  const [areaHectares, setAreaHectares] =
    useState('')

  const [tipoCultura, setTipoCultura] =
    useState('')

  const [fazendaId, setFazendaId] =
    useState('')

  useEffect(() => {

    if (initialData) {

      setNome(initialData.nome)

      setAreaHectares(
        String(initialData.area_hectares)
      )

      setTipoCultura(
        initialData.tipo_cultura
      )

      setFazendaId(
        String(initialData.fazenda_id)
      )

    } else {

      setNome('')
      setAreaHectares('')
      setTipoCultura('')
      setFazendaId('')
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
        bg-black/60
        backdrop-blur-md
        p-4
        animate-in
        fade-in
      "
    >

      <div
        className="
          relative
          w-full
          max-w-2xl
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-background/95
          shadow-2xl
          animate-in
          zoom-in-95
          duration-300
        "
      >

        {/* Gradient */}
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

        {/* Fechar */}
        <button
          onClick={onClose}
          className="
            absolute
            right-5
            top-5
            z-20
            rounded-full
            p-2
            text-muted-foreground
            transition
            hover:bg-accent
          "
        >
          <X className="size-5" />
        </button>

        <div className="relative z-10 p-8">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">

            <div
              className="
                flex
                size-16
                items-center
                justify-center
                rounded-2xl
                bg-primary/10
              "
            >
              <Grid3X3
                className="
                  size-8
                  text-primary
                "
              />
            </div>

            <div>

              <h2 className="text-3xl font-bold">

                {initialData
                  ? 'Editar Talhão'
                  : 'Novo Talhão'}

              </h2>

              <p className="text-muted-foreground mt-1">
                Gerencie as áreas agrícolas da fazenda
              </p>

            </div>

          </div>

          {/* Inputs */}
          <div className="grid gap-5">

            {/* Nome */}
            <div>

              <label className="text-sm font-medium">
                Nome do Talhão
              </label>

              <div className="relative mt-2">

                <Map
                  className="
                    absolute
                    left-4
                    top-1/2
                    size-5
                    -translate-y-1/2
                    text-muted-foreground
                  "
                />

                <input
                  value={nome}
                  onChange={(e) =>
                    setNome(e.target.value)
                  }
                  placeholder="Ex: Talhão Norte"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-border
                    bg-background/70
                    py-4
                    pl-12
                    pr-4
                    outline-none
                    transition
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                  "
                />

              </div>

            </div>

            {/* Área */}
            <div>

              <label className="text-sm font-medium">
                Área (hectares)
              </label>

              <div className="relative mt-2">

                <Tractor
                  className="
                    absolute
                    left-4
                    top-1/2
                    size-5
                    -translate-y-1/2
                    text-muted-foreground
                  "
                />

                <input
                  type="number"
                  value={areaHectares}
                  onChange={(e) =>
                    setAreaHectares(
                      e.target.value
                    )
                  }
                  placeholder="Ex: 120"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-border
                    bg-background/70
                    py-4
                    pl-12
                    pr-4
                    outline-none
                    transition
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                  "
                />

              </div>

            </div>

            {/* Cultura */}
            <div>

              <label className="text-sm font-medium">
                Cultura
              </label>

              <div className="relative mt-2">

                <Sprout
                  className="
                    absolute
                    left-4
                    top-1/2
                    size-5
                    -translate-y-1/2
                    text-muted-foreground
                  "
                />

                <input
                  value={tipoCultura}
                  onChange={(e) =>
                    setTipoCultura(
                      e.target.value
                    )
                  }
                  placeholder="Ex: Soja"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-border
                    bg-background/70
                    py-4
                    pl-12
                    pr-4
                    outline-none
                    transition
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                  "
                />

              </div>

            </div>

            {/* Fazenda */}
            <div>

              <label className="text-sm font-medium">
                Fazenda
              </label>

              <select
                value={fazendaId}
                onChange={(e) =>
                  setFazendaId(
                    e.target.value
                  )
                }
                className="
                  mt-2
                  w-full
                  rounded-2xl
                  border
                  border-border
                  bg-background/70
                  px-4
                  py-4
                  outline-none
                  transition
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                "
              >

                <option value="">
                  Selecione uma fazenda
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

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8">

            <button
              onClick={onClose}
              className="
                rounded-2xl
                border
                px-6
                py-3
                font-medium
                transition
                hover:bg-accent
              "
            >
              Cancelar
            </button>

            <button
              onClick={() => {

                if (
                  !nome ||
                  !areaHectares ||
                  !tipoCultura ||
                  !fazendaId
                ) return

                onSave({
                  nome,
                  area_hectares:
                    Number(areaHectares),
                  tipo_cultura:
                    tipoCultura,
                  fazenda_id:
                    Number(fazendaId)
                })
              }}
              className="
                rounded-2xl
                bg-primary
                px-6
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
              Salvar Talhão
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}