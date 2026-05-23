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
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts'

type Cultura = {
  cultura: string
  total: number
}

const COLORS = [
  '#22c55e',
  '#84cc16',
  '#eab308',
  '#3b82f6',
  '#8b5cf6',
  '#ef4444',
  '#14b8a6'
]

export function CulturesChart() {

  const [data, setData] =
    useState<Cultura[]>([])

  async function carregarDados() {

    try {

      const response =
        await api.get(
          '/dashboard/culturas'
        )

      const dadosFormatados =
        response.data.map((item: any) => ({
          cultura: item.cultura,
          total: Number(item.total)
        }))

      setData(dadosFormatados)

    } catch (error) {

      console.error(
        'Erro ao carregar culturas:',
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
          Culturas
        </CardTitle>

        <CardDescription>
          Distribuição das culturas cadastradas
        </CardDescription>

      </CardHeader>

      <CardContent>

        <div className="h-[360px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="total"
                nameKey="cultura"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={70}
                paddingAngle={5}
                strokeWidth={2}
              >

                {data.map((entry, index) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}

              </Pie>

              <Tooltip
                formatter={(value) => [
                  `${value} safras`,
                  'Quantidade'
                ]}

                contentStyle={{
                  borderRadius: '16px',
                  border:
                    '1px solid var(--border)',
                  background:
                    'rgba(15,23,42,0.95)',
                  color: '#fff',
                  backdropFilter:
                    'blur(12px)',
                  boxShadow:
                    '0 10px 30px rgba(0,0,0,0.35)'
                }}

                itemStyle={{
                  color: '#fff'
                }}

                labelStyle={{
                  color: '#22c55e',
                  fontWeight: 600
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  color: 'var(--foreground)',
                  paddingTop: '20px',
                  fontSize: '14px'
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>
  )
}