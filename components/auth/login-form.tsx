"use client"

import { useState } from "react"
import api from "@/lib/api"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    try {
      const response = await api.post("/usuarios/login", {
        email,
        senha,
      })

      const { token, usuario } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("usuario", JSON.stringify(usuario))

      window.location.reload()

    } catch (error) {
      console.log(error)
      setErro("Email ou senha inválidos")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            AgroPulse
          </h1>

          <p className="text-muted-foreground mt-2">
            Inteligência para o produtor rural
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="text-sm text-foreground">
              Email
            </label>

            <input
              type="email"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-background border border-border outline-none focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-foreground">
              Senha
            </label>

            <input
              type="password"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-background border border-border outline-none focus:border-primary"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && (
            <p className="text-sm text-red-500">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Entrar
          </button>

        </form>
      </div>
    </div>
  )
}