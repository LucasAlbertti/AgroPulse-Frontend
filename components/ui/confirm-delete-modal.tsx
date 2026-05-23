'use client'

import {
  AlertTriangle,
  X
} from 'lucide-react'

type ConfirmDeleteModalProps = {
  open: boolean
  title?: string
  description?: string
  onClose: () => void
  onConfirm: () => void
}

export function ConfirmDeleteModal({
  open,
  title = 'Excluir item',
  description = 'Essa ação não poderá ser desfeita.',
  onClose,
  onConfirm
}: ConfirmDeleteModalProps) {

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
          max-w-md
          overflow-hidden
          rounded-[30px]
          border
          border-red-500/20
          bg-background/95
          shadow-2xl
          animate-in
          zoom-in-95
          duration-300
        "
      >

        {/* Glow */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-red-500/10
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

          {/* Ícone */}
          <div
            className="
              mb-6
              flex
              size-20
              items-center
              justify-center
              rounded-3xl
              bg-red-500/10
            "
          >
            <AlertTriangle
              className="
                size-10
                text-red-500
              "
            />
          </div>

          {/* Conteúdo */}
          <div>

            <h2 className="text-3xl font-bold">
              {title}
            </h2>

            <p className="mt-3 text-muted-foreground leading-relaxed">
              {description}
            </p>

          </div>

          {/* Botões */}
          <div className="mt-8 flex gap-3">

            <button
              onClick={onClose}
              className="
                flex-1
                rounded-2xl
                border
                px-5
                py-3
                font-medium
                transition
                hover:bg-accent
              "
            >
              Cancelar
            </button>

            <button
              onClick={onConfirm}
              className="
                flex-1
                rounded-2xl
                bg-red-500
                px-5
                py-3
                font-medium
                text-white
                shadow-lg
                transition
                hover:scale-[1.02]
                hover:bg-red-600
                active:scale-[0.98]
              "
            >
              Excluir
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}