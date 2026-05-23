'use client'

import { useEffect, useState } from 'react'

import {
  X,
  Tractor,
  MapPin,
  Building2
} from 'lucide-react'

type FazendaModalProps = {
  open: boolean
  onClose: () => void
  onSave: (data: {
    nome: string
    cidade: string
    estado: string
  }) => void
  initialData?: {
    nome: string
    cidade: string
    estado: string
  }
}

export function FazendaModal({
  open,
  onClose,
  onSave,
  initialData
}: FazendaModalProps) {

  const [nome, setNome] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  useEffect(() => {

    if (initialData) {

      setNome(initialData.nome)
      setCidade(initialData.cidade)
      setEstado(initialData.estado)

    } else {

      setNome('')
      setCidade('')
      setEstado('')
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
          max-w-xl
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-background/95
          shadow-2xl
          animate-in
          zoom-in-95
          fade-in
          duration-300
        "
      >

        {/* Gradient decorativo */}
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

        {/* Botão fechar */}
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
            hover:text-foreground
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
              <Tractor className="size-8 text-primary" />
            </div>

            <div>

              <h2 className="text-3xl font-bold tracking-tight">

                {initialData
                  ? 'Editar Fazenda'
                  : 'Nova Fazenda'}

              </h2>

              <p className="text-muted-foreground mt-1">
                Gerencie os dados da propriedade agrícola
              </p>

            </div>

          </div>

          {/* Inputs */}
          <div className="space-y-5">

            {/* Nome */}
            <div>

              <label className="text-sm font-medium">
                Nome da fazenda
              </label>

              <div className="relative mt-2">

                <Building2
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
                  placeholder="Ex: Fazenda AgroBrusA"
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

            {/* Cidade */}
            <div>

              <label className="text-sm font-medium">
                Cidade
              </label>

              <div className="relative mt-2">

                <MapPin
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
                  value={cidade}
                  onChange={(e) =>
                    setCidade(e.target.value)
                  }
                  placeholder="Ex: Concórdia"
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

            {/* Estado */}
            <div>

              <label className="text-sm font-medium">
                Estado
              </label>

              <div className="relative mt-2">

                <MapPin
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
                  value={estado}
                  onChange={(e) =>
                    setEstado(e.target.value)
                  }
                  placeholder="Ex: SC"
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
                  !cidade ||
                  !estado
                ) return

                onSave({
                  nome,
                  cidade,
                  estado
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
              Salvar Fazenda
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}