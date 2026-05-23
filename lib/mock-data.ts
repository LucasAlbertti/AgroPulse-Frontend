// Mock data for AgroPulse Dashboard

export const dashboardStats = {
  totalFazendas: 12,
  totalTalhoes: 48,
  totalSafras: 24,
  areaPlantadaTotal: 1250, // hectares
}

export const fazendas = [
  { id: 1, nome: 'Fazenda São José', area: 320, talhoes: 12, cultura: 'Soja', cidade: 'Uberaba', estado: 'MG' },
  { id: 2, nome: 'Fazenda Boa Vista', area: 180, talhoes: 8, cultura: 'Milho', cidade: 'Ribeirão Preto', estado: 'SP' },
  { id: 3, nome: 'Fazenda Santa Rita', area: 450, talhoes: 15, cultura: 'Algodão', cidade: 'Rondonópolis', estado: 'MT' },
  { id: 4, nome: 'Fazenda Esperança', area: 300, talhoes: 13, cultura: 'Café', cidade: 'Patrocínio', estado: 'MG' },
]

export const safras = [
  { id: 1, nome: 'Soja 2024/25', fazenda: 'Fazenda São José', area: 280, status: 'Em andamento', produtividade: 65, cultura: 'Soja' },
  { id: 2, nome: 'Milho 2024/25', fazenda: 'Fazenda Boa Vista', area: 150, status: 'Em andamento', produtividade: 120, cultura: 'Milho' },
  { id: 3, nome: 'Algodão 2024/25', fazenda: 'Fazenda Santa Rita', area: 380, status: 'Planejada', produtividade: 0, cultura: 'Algodão' },
  { id: 4, nome: 'Café 2024', fazenda: 'Fazenda Esperança', area: 200, status: 'Colhida', produtividade: 45, cultura: 'Café' },
  { id: 5, nome: 'Soja 2023/24', fazenda: 'Fazenda São José', area: 260, status: 'Colhida', produtividade: 62, cultura: 'Soja' },
]

export const produtividadeData = [
  { mes: 'Jan', soja: 58, milho: 110, algodao: 42 },
  { mes: 'Fev', soja: 60, milho: 115, algodao: 45 },
  { mes: 'Mar', soja: 62, milho: 118, algodao: 48 },
  { mes: 'Abr', soja: 64, milho: 120, algodao: 50 },
  { mes: 'Mai', soja: 65, milho: 122, algodao: 52 },
  { mes: 'Jun', soja: 63, milho: 119, algodao: 49 },
]

export const culturasData = [
  { name: 'Soja', value: 540, color: 'var(--chart-1)' },
  { name: 'Milho', value: 280, color: 'var(--chart-2)' },
  { name: 'Algodão', value: 230, color: 'var(--chart-3)' },
  { name: 'Café', value: 200, color: 'var(--chart-4)' },
]

export const climaData = {
  atual: {
    temperatura: 28,
    umidade: 65,
    condicao: 'Parcialmente nublado',
    vento: 12,
    chanceChuva: 30,
  },
  previsao: [
    { dia: 'Hoje', min: 22, max: 30, condicao: 'sol', chanceChuva: 10 },
    { dia: 'Amanhã', min: 21, max: 28, condicao: 'nublado', chanceChuva: 40 },
    { dia: 'Quarta', min: 19, max: 26, condicao: 'chuva', chanceChuva: 80 },
    { dia: 'Quinta', min: 20, max: 27, condicao: 'chuva', chanceChuva: 60 },
    { dia: 'Sexta', min: 22, max: 29, condicao: 'sol', chanceChuva: 15 },
  ],
}

export const talhoes = [
  { id: 1, nome: 'Talhão A1', fazenda: 'Fazenda São José', area: 45, cultura: 'Soja', status: 'Plantado' },
  { id: 2, nome: 'Talhão A2', fazenda: 'Fazenda São José', area: 38, cultura: 'Soja', status: 'Plantado' },
  { id: 3, nome: 'Talhão B1', fazenda: 'Fazenda Boa Vista', area: 52, cultura: 'Milho', status: 'Colhido' },
  { id: 4, nome: 'Talhão C1', fazenda: 'Fazenda Santa Rita', area: 60, cultura: 'Algodão', status: 'Preparando' },
]

export const usuario = {
  nome: 'Carlos Silva',
  email: 'carlos@agropulse.com',
  avatar: '/placeholder-user.jpg',
  cargo: 'Produtor Rural',
  fazendaPrincipal: 'Fazenda São José',
}
