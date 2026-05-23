"use client"

import {
  useState
} from "react"

import api from "@/lib/api"

export function LoginForm() {

  const [modo, setModo] =
    useState<"login" | "cadastro">("login")

  const [nome, setNome] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [senha, setSenha] =
    useState("")

  const [erro, setErro] =
    useState("")

  const [mensagem, setMensagem] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault()

    try {

      setErro("")
      setMensagem("")
      setLoading(true)

      const response =
        await api.post(
          "/usuarios/login",
          {
            email:
              email.trim().toLowerCase(),
            senha
          }
        )

      const {
        token,
        usuario
      } = response.data

      localStorage.setItem(
        "token",
        token
      )

      localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
      )

      window.location.reload()

    } catch (error: any) {

      console.log(error)

      setErro(
        error.response?.data?.erro ||
        "Email ou senha inválidos"
      )

    } finally {

      setLoading(false)
    }
  }

  async function handleCadastro(
    e: React.FormEvent
  ) {

    e.preventDefault()

    try {

      setErro("")
      setMensagem("")
      setLoading(true)

      await api.post(
        "/usuarios/cadastro",
        {
          nome,
          email:
            email.trim().toLowerCase(),
          senha
        }
      )

      setMensagem(
        "Cadastro realizado com sucesso. Verifique seu e-mail para liberar o acesso."
      )

      setModo("login")
      setNome("")
      setSenha("")

    } catch (error: any) {

      console.log(error)

      setErro(
        error.response?.data?.erro ||
        "Erro ao cadastrar usuário"
      )

    } finally {

      setLoading(false)
    }
  }

  function alternarModo() {

    setErro("")
    setMensagem("")
    setNome("")
    setEmail("")
    setSenha("")

    setModo(
      modo === "login"
        ? "cadastro"
        : "login"
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">

      <div
        className="
          w-full
          max-w-md
          bg-card
          border
          border-border
          rounded-3xl
          p-8
          shadow-xl
          relative
          overflow-hidden
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

        <div className="relative z-10">

          <div className="text-center mb-8">

            <div
              className="
                mx-auto
                mb-4
                size-16
                rounded-3xl
                bg-primary/10
                flex
                items-center
                justify-center
              "
            >
              <span className="text-3xl">
                🌱
              </span>
            </div>

            <h1 className="text-3xl font-bold text-foreground">
              AgroPulse
            </h1>

            <p className="text-muted-foreground mt-2">
              {modo === "login"
                ? "Acesse sua conta"
                : "Crie sua conta"}
            </p>

          </div>

          <form
            onSubmit={
              modo === "login"
                ? handleLogin
                : handleCadastro
            }
            className="space-y-5"
          >

            {modo === "cadastro" && (

              <div>
                <label className="text-sm text-foreground">
                  Nome
                </label>

                <input
                  type="text"
                  className="
                    w-full
                    mt-2
                    px-4
                    py-3
                    rounded-xl
                    bg-background
                    border
                    border-border
                    outline-none
                    focus:border-primary
                  "
                  value={nome}
                  onChange={(e) =>
                    setNome(e.target.value)
                  }
                />
              </div>
            )}

            <div>
              <label className="text-sm text-foreground">
                Email
              </label>

              <input
                type="email"
                className="
                  w-full
                  mt-2
                  px-4
                  py-3
                  rounded-xl
                  bg-background
                  border
                  border-border
                  outline-none
                  focus:border-primary
                "
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div>
              <label className="text-sm text-foreground">
                Senha
              </label>

              <input
                type="password"
                className="
                  w-full
                  mt-2
                  px-4
                  py-3
                  rounded-xl
                  bg-background
                  border
                  border-border
                  outline-none
                  focus:border-primary
                "
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
              />
            </div>

            {erro && (
              <div
                className="
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-3
                  text-sm
                  text-red-500
                "
              >
                {erro}
              </div>
            )}

            {mensagem && (
              <div
                className="
                  rounded-xl
                  border
                  border-green-500/20
                  bg-green-500/10
                  px-4
                  py-3
                  text-sm
                  text-green-600
                "
              >
                {mensagem}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-primary
                text-primary-foreground
                py-3
                rounded-xl
                font-medium
                hover:opacity-90
                transition
                disabled:opacity-60
              "
            >
              {loading
                ? "Aguarde..."
                : modo === "login"
                  ? "Entrar"
                  : "Criar conta"}
            </button>

          </form>

          <button
            type="button"
            onClick={alternarModo}
            className="
              w-full
              mt-6
              text-sm
              text-muted-foreground
              hover:text-primary
              transition
            "
          >
            {modo === "login"
              ? "Ainda não tem conta? Criar cadastro"
              : "Já tem conta? Fazer login"}
          </button>

        </div>

      </div>

    </div>
  )
}