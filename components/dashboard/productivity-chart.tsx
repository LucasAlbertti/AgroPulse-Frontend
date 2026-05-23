'use client'

import {
  useEffect,
  useState
} from 'react'

import api from '@/lib/api'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

type Produtividade = {
  cultura: string
  produtividade: number
}

export function ProductivityChart() {

  const [data, setData] =
    useState<Produtividade[]>([])

  async function carregarDados() {

    try {

      const response =
        await api.get(
          '/dashboard/produtividade'
        )

      setData(response.data)

    } catch (error) {

      console.error(
        'Erro ao carregar produtividade:',
        error
      )
    }
  }

  useEffect(() => {

    carregarDados()

  }, [])

  return (

    <Card
      className="
        border-border
        rounded-3xl
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
      "
    >

      <CardHeader>

        <CardTitle className="text-2xl">
          Produtividade
        </CardTitle>

        <CardDescription>
          Média de produtividade por cultura
        </CardDescription>

      </CardHeader>

      <CardContent>

        <div className="h-[360px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={data}
              barSize={55}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.1}
              />

              <XAxis
                dataKey="cultura"
                tickLine={false}
                axisLine={false}
                fontSize={13}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={13}
              />

              <Tooltip
                cursor={{
                  fill:
                    'rgba(255,255,255,0.03)'
                }}

                contentStyle={{
                  borderRadius: '16px',
                  border:
                    '1px solid var(--border)',
                  background:
                    'var(--background)',
                  backdropFilter:
                    'blur(12px)'
                }}
              />

              <Bar
                dataKey="produtividade"
                radius={[16, 16, 0, 0]}
                fill="url(#colorGradient)"
              />

              <defs>

                <linearGradient
                  id="colorGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#22c55e"
                    stopOpacity={1}
                  />

                  <stop
                    offset="100%"
                    stopColor="#15803d"
                    stopOpacity={0.8}
                  />

                </linearGradient>

              </defs>

            </BarChart>

          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>
  )
}