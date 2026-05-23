'use client'

import {
  User,
  Mail,
  ShieldCheck,
  LogOut,
  Settings,
  Leaf,
  MonitorCog
} from 'lucide-react'

type UsuarioStorage = {
  id?: number
  nome?: string
  email?: string
}

export function ConfiguracoesPage() {

  function obterUsuario(): UsuarioStorage | null {

    try {

      const usuarioSalvo =
        localStorage.getItem('usuario')

      if (!usuarioSalvo) return null

      return JSON.parse(usuarioSalvo)

    } catch {

      return null
    }
  }

  const usuario =
    obterUsuario()

  function sairDaConta() {

    localStorage.removeItem('token')
    localStorage.removeItem('usuario')

    window.location.reload()
  }

  return (

    <div className="space-y-8">

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

        <div className="relative z-10 flex items-center justify-between">

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
              <Settings className="size-4" />
              Preferências do sistema
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Configurações
            </h1>

            <p className="text-muted-foreground mt-2">
              Gerencie sua conta, sessão e preferências do AgroPulse.
            </p>

          </div>

          <div
            className="
              hidden
              md:flex
              size-16
              rounded-3xl
              bg-primary/10
              items-center
              justify-center
            "
          >
            <MonitorCog className="size-8 text-primary" />
          </div>

        </div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Conta */}
        <div
          className="
            xl:col-span-2
            rounded-3xl
            border
            border-border
            bg-card
            p-6
            shadow-sm
            relative
            overflow-hidden
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

            <div className="flex items-center gap-4 mb-8">

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
                <User className="size-8 text-primary" />
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Minha Conta
                </h2>

                <p className="text-muted-foreground">
                  Informações do usuário logado
                </p>

              </div>

            </div>

            <div className="grid gap-4">

              <div
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-background/60
                  p-4
                "
              >

                <div className="flex items-center gap-2 text-muted-foreground text-sm">

                  <User className="size-4 text-primary" />

                  Nome

                </div>

                <p className="text-xl font-bold mt-2">
                  {usuario?.nome || 'Usuário AgroPulse'}
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

                <div className="flex items-center gap-2 text-muted-foreground text-sm">

                  <Mail className="size-4 text-primary" />

                  E-mail

                </div>

                <p className="text-xl font-bold mt-2">
                  {usuario?.email || 'email não encontrado'}
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

                <div className="flex items-center gap-2 text-muted-foreground text-sm">

                  <ShieldCheck className="size-4 text-primary" />

                  Status da sessão

                </div>

                <p className="text-xl font-bold mt-2 text-green-600">
                  Autenticado com JWT
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Sistema / Logout */}
        <div
          className="
            rounded-3xl
            border
            border-border
            bg-card
            p-6
            shadow-sm
            relative
            overflow-hidden
          "
        >

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-red-500/5
              via-transparent
              to-transparent
              pointer-events-none
            "
          />

          <div className="relative z-10">

            <div
              className="
                size-16
                rounded-2xl
                bg-primary/10
                flex
                items-center
                justify-center
                mb-6
              "
            >
              <Leaf className="size-8 text-primary" />
            </div>

            <h2 className="text-2xl font-bold">
              AgroPulse
            </h2>

            <p className="text-muted-foreground mt-2">
              Sistema de gestão agrícola para fazendas, talhões, safras e financeiro.
            </p>

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
                Versão
              </p>

              <p className="font-bold mt-1">
                1.0.0
              </p>

            </div>

            <button
              onClick={sairDaConta}
              className="
                mt-6
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-red-500
                to-red-600
                px-5
                py-3
                text-white
                font-medium
                shadow-lg
                hover:scale-[1.02]
                hover:opacity-95
                active:scale-[0.98]
                transition-all
                flex
                items-center
                justify-center
                gap-2
              "
            >

              <LogOut className="size-5" />

              Sair da conta

            </button>

          </div>

        </div>

      </div>

    </div>
  )
}