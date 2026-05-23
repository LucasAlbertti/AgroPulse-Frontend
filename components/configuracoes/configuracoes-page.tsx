'use client'

import {
  useEffect,
  useState
} from 'react'

import api from '@/lib/api'

import {
  User,
  Mail,
  ShieldCheck,
  LogOut,
  Settings,
  Leaf,
  MonitorCog,
  Save,
  Lock,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react'

type Usuario = {
  id: number
  nome: string
  email: string
}

export function ConfiguracoesPage() {

  const [usuario, setUsuario] =
    useState<Usuario | null>(null)

  const [nome, setNome] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [senhaAtual, setSenhaAtual] =
    useState('')

  const [novaSenha, setNovaSenha] =
    useState('')

  const [mostrarSenhaAtual, setMostrarSenhaAtual] =
    useState(false)

  const [mostrarNovaSenha, setMostrarNovaSenha] =
    useState(false)

  const [loading, setLoading] =
    useState(true)

  const [salvandoPerfil, setSalvandoPerfil] =
    useState(false)

  const [salvandoSenha, setSalvandoSenha] =
    useState(false)

  const [mensagem, setMensagem] =
    useState('')

  const [erro, setErro] =
    useState('')

  async function carregarPerfil() {

    try {

      setLoading(true)

      const response =
        await api.get('/usuarios/perfil')

      setUsuario(response.data)

      setNome(response.data.nome)

      setEmail(response.data.email)

      localStorage.setItem(
        'usuario',
        JSON.stringify(response.data)
      )

    } catch (error) {

      console.error(
        'Erro ao carregar perfil:',
        error
      )

      setErro(
        'Não foi possível carregar os dados do usuário.'
      )

    } finally {

      setLoading(false)
    }
  }

  async function salvarPerfil() {

    try {

      setErro('')
      setMensagem('')
      setSalvandoPerfil(true)

      const response =
        await api.put(
          '/usuarios/perfil',
          {
            nome,
            email
          }
        )

      setUsuario(response.data.usuario)

      localStorage.setItem(
        'usuario',
        JSON.stringify(response.data.usuario)
      )

      setMensagem(
        'Perfil atualizado com sucesso.'
      )

    } catch (error: any) {

      console.error(
        'Erro ao salvar perfil:',
        error
      )

      setErro(
        error.response?.data?.erro ||
        'Erro ao atualizar perfil.'
      )

    } finally {

      setSalvandoPerfil(false)
    }
  }

  async function salvarSenha() {

    try {

      setErro('')
      setMensagem('')
      setSalvandoSenha(true)

      await api.put(
        '/usuarios/senha',
        {
          senha_atual: senhaAtual,
          nova_senha: novaSenha
        }
      )

      setSenhaAtual('')
      setNovaSenha('')

      setMensagem(
        'Senha alterada com sucesso.'
      )

    } catch (error: any) {

      console.error(
        'Erro ao alterar senha:',
        error
      )

      setErro(
        error.response?.data?.erro ||
        'Erro ao alterar senha.'
      )

    } finally {

      setSalvandoSenha(false)
    }
  }

  function sairDaConta() {

    localStorage.removeItem('token')
    localStorage.removeItem('usuario')

    window.location.reload()
  }

  useEffect(() => {

    carregarPerfil()

  }, [])

  if (loading) {

    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted-foreground">
          Carregando configurações...
        </p>
      </div>
    )
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
              Perfil e segurança
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Configurações
            </h1>

            <p className="text-muted-foreground mt-2">
              Gerencie seus dados de acesso, perfil e sessão do AgroPulse.
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

      {(mensagem || erro) && (

        <div
          className={`
            rounded-2xl
            border
            p-4
            text-sm
            font-medium
            ${
              mensagem
                ? 'border-green-500/20 bg-green-500/10 text-green-600'
                : 'border-red-500/20 bg-red-500/10 text-red-600'
            }
          `}
        >
          {mensagem || erro}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Perfil */}
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
                  Meu Perfil
                </h2>

                <p className="text-muted-foreground">
                  Atualize suas informações principais
                </p>

              </div>

            </div>

            <div className="grid gap-5">

              <div>

                <label
                  className="
                    text-sm
                    font-medium
                    flex
                    items-center
                    gap-2
                  "
                >
                  <User className="size-4 text-primary" />
                  Nome
                </label>

                <input
                  value={nome}
                  onChange={(e) =>
                    setNome(e.target.value)
                  }
                  placeholder="Seu nome"
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
                    focus:ring-2
                    focus:ring-primary
                  "
                />

              </div>

              <div>

                <label
                  className="
                    text-sm
                    font-medium
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Mail className="size-4 text-primary" />
                  E-mail
                </label>

                <input
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="seu@email.com"
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
                    focus:ring-2
                    focus:ring-primary
                  "
                />

              </div>

              <button
                onClick={salvarPerfil}
                disabled={salvandoPerfil}
                className="
                  mt-2
                  w-full
                  rounded-2xl
                  bg-primary
                  text-primary-foreground
                  px-5
                  py-3
                  font-medium
                  hover:opacity-90
                  transition
                  shadow-lg
                  disabled:opacity-60
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Save className="size-5" />

                {salvandoPerfil
                  ? 'Salvando...'
                  : 'Salvar alterações'}
              </button>

            </div>

          </div>

        </div>

        {/* Conta */}
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
              from-primary/5
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
              <ShieldCheck className="size-8 text-primary" />
            </div>

            <h2 className="text-2xl font-bold">
              Conta
            </h2>

            <p className="text-muted-foreground mt-2">
              Informações da sessão autenticada.
            </p>

            <div className="space-y-4 mt-6">

              <div
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-background/60
                  p-4
                "
              >
                <p className="text-sm text-muted-foreground">
                  ID do usuário
                </p>

                <p className="font-bold mt-1">
                  #{usuario?.id}
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
                <p className="text-sm text-muted-foreground">
                  Status da sessão
                </p>

                <p className="font-bold mt-1 text-green-600">
                  Autenticado com JWT
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Segurança */}
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
              from-blue-500/5
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
                  bg-blue-500/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Lock className="size-8 text-blue-500" />
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Segurança
                </h2>

                <p className="text-muted-foreground">
                  Altere sua senha de acesso
                </p>

              </div>

            </div>

            <div className="grid gap-5">

              <div>

                <label
                  className="
                    text-sm
                    font-medium
                    flex
                    items-center
                    gap-2
                  "
                >
                  <KeyRound className="size-4 text-primary" />
                  Senha atual
                </label>

                <div className="relative mt-2">

                  <input
                    type={
                      mostrarSenhaAtual
                        ? 'text'
                        : 'password'
                    }
                    value={senhaAtual}
                    onChange={(e) =>
                      setSenhaAtual(e.target.value)
                    }
                    placeholder="Digite sua senha atual"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-border
                      bg-background
                      px-4
                      py-3
                      pr-12
                      outline-none
                      focus:ring-2
                      focus:ring-primary
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setMostrarSenhaAtual(
                        !mostrarSenhaAtual
                      )
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-muted-foreground
                      hover:text-foreground
                      transition
                    "
                  >
                    {mostrarSenhaAtual
                      ? <EyeOff className="size-5" />
                      : <Eye className="size-5" />}
                  </button>

                </div>

              </div>

              <div>

                <label
                  className="
                    text-sm
                    font-medium
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Lock className="size-4 text-primary" />
                  Nova senha
                </label>

                <div className="relative mt-2">

                  <input
                    type={
                      mostrarNovaSenha
                        ? 'text'
                        : 'password'
                    }
                    value={novaSenha}
                    onChange={(e) =>
                      setNovaSenha(e.target.value)
                    }
                    placeholder="Mínimo de 6 caracteres"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-border
                      bg-background
                      px-4
                      py-3
                      pr-12
                      outline-none
                      focus:ring-2
                      focus:ring-primary
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setMostrarNovaSenha(
                        !mostrarNovaSenha
                      )
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-muted-foreground
                      hover:text-foreground
                      transition
                    "
                  >
                    {mostrarNovaSenha
                      ? <EyeOff className="size-5" />
                      : <Eye className="size-5" />}
                  </button>

                </div>

              </div>

              <button
                onClick={salvarSenha}
                disabled={salvandoSenha}
                className="
                  mt-2
                  w-full
                  rounded-2xl
                  bg-blue-500
                  text-white
                  px-5
                  py-3
                  font-medium
                  hover:opacity-90
                  transition
                  shadow-lg
                  disabled:opacity-60
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Lock className="size-5" />

                {salvandoSenha
                  ? 'Alterando...'
                  : 'Alterar senha'}
              </button>

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
              Sistema de gestão agrícola para fazendas, talhões, safras, clima, financeiro e relatórios.
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