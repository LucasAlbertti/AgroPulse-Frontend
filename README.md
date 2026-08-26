# 🌱 AgroPulse Dashboard

Frontend do **AgroPulse**, uma plataforma web desenvolvida para gerenciamento e acompanhamento de propriedades agrícolas.

O dashboard foi desenvolvido para oferecer uma interface moderna e intuitiva, permitindo que o produtor visualize informações das suas propriedades, acompanhe safras, controle movimentações financeiras, consulte o clima e gere relatórios.

Este repositório contém exclusivamente o **frontend da aplicação**.

---

## 🛠️ Tecnologias

O frontend foi desenvolvido utilizando:

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **Axios**
* **Recharts**
* **Lucide React**
* **React Hook Form**
* **Zod**
* **jsPDF**

O projeto utiliza Next.js como framework principal e React para construção da interface.

---

# 📊 Telas do sistema

## 🏠 Dashboard

Tela principal do AgroPulse.

O Dashboard apresenta uma visão geral das informações cadastradas no sistema, permitindo acompanhar rapidamente os principais indicadores da propriedade.

Entre as informações apresentadas estão:

* Total de fazendas
* Total de talhões
* Total de safras
* Indicadores de produtividade
* Informações financeiras
* Gráficos
* Resumo das atividades
* Informações climáticas

### 📷 Screenshot

> <img width="1913" height="908" alt="Dashboard" src="https://github.com/user-attachments/assets/0ddd18c2-cd3e-40f9-bde0-21b177ba14aa" />


---

## 🚜 Fazendas

A tela de **Fazendas** permite cadastrar e gerenciar as propriedades agrícolas do usuário.

Nela é possível visualizar as fazendas cadastradas e realizar operações de gerenciamento, como:

* Cadastrar uma nova fazenda
* Visualizar informações da propriedade
* Editar uma fazenda
* Excluir uma fazenda

As fazendas servem como base para a organização dos talhões e safras.

### 📷 Screenshot

> <img width="1910" height="906" alt="Fazendas" src="https://github.com/user-attachments/assets/724a3408-9db2-4fdd-b9a4-03851a54df1a" />


---

## 🌾 Talhões

A tela de **Talhões** permite gerenciar as áreas pertencentes às fazendas cadastradas.

Cada talhão está associado a uma fazenda e pode conter informações como:

* Nome do talhão
* Área em hectares
* Cultura
* Fazenda relacionada

A tela permite cadastrar, visualizar, editar e excluir talhões.

### 📷 Screenshot

> <img width="1916" height="911" alt="Talhões" src="https://github.com/user-attachments/assets/666ed75b-82e0-4f9d-a366-e159a59295dc" />


---

## 🌱 Safras

A tela de **Safras** permite acompanhar as safras cadastradas nos talhões.

Nela são apresentadas informações relacionadas à produção agrícola, como:

* Cultura
* Talhão
* Fazenda
* Status da safra
* Data de plantio
* Data de colheita
* Produtividade

Também é possível cadastrar, editar e excluir safras.

### 📷 Screenshot

> <img width="1914" height="906" alt="Safras" src="https://github.com/user-attachments/assets/7c5183bb-ef4c-4efc-8971-10438e9adfe1" />


---

## 💰 Financeiro

A tela de **Financeiro** permite registrar e acompanhar as movimentações financeiras relacionadas à propriedade.

As movimentações podem ser organizadas entre:

* Receitas
* Despesas

A tela também apresenta informações que auxiliam no acompanhamento financeiro da propriedade.

### 📷 Screenshot

> <img width="1915" height="909" alt="Financeiro" src="https://github.com/user-attachments/assets/1968216f-a9fa-4342-925e-6cfa423cebec" />


---

## 🌦️ Clima

A tela de **Clima** apresenta informações meteorológicas para auxiliar o produtor no acompanhamento das condições climáticas.

Entre as informações apresentadas estão:

* Temperatura
* Sensação térmica
* Umidade
* Vento
* Probabilidade de chuva
* Previsão para os próximos dias

As informações climáticas são obtidas através de integração com uma API externa.

### 📷 Screenshot

> <img width="1918" height="911" alt="Clima" src="https://github.com/user-attachments/assets/82961d18-b025-4265-aecb-014259a1bbf0" />


---

## 📄 Relatórios

A tela de **Relatórios** permite transformar os dados cadastrados no AgroPulse em uma visão mais completa da propriedade.

É possível consultar informações relacionadas a:

* Fazendas
* Talhões
* Safras
* Produtividade
* Culturas
* Receitas
* Despesas
* Lucro

A tela também permite utilizar filtros para facilitar a análise dos dados.

### 📷 Screenshot

> <img width="1910" height="910" alt="Relatórios" src="https://github.com/user-attachments/assets/810b2843-8ce7-4201-bbce-3b8d5d9f50b0" />


---

## ⚙️ Configurações

A tela de **Configurações** permite que o usuário gerencie suas informações pessoais e configurações da conta.

Entre as funcionalidades disponíveis estão:

* Visualização do perfil
* Atualização dos dados do usuário
* Alteração de senha
* Configurações relacionadas à conta

### 📷 Screenshot

> <img width="1919" height="906" alt="Configurações" src="https://github.com/user-attachments/assets/ffbfa4ba-633b-4aed-9a56-6147a3fcebe8" />


---

# 📁 Estrutura básica

A estrutura do frontend é organizada utilizando a arquitetura do Next.js:

```text
dashboard-agro-pulse/
│
├── app/
├── components/
├── lib/
├── public/
├── .env.local
├── package.json
└── README.md
```

---

# 🚀 Como executar

## 1. Clonar o repositório

```bash
git clone https://github.com/LucasAlbertti/AgroPulse-Dashboard.git
```

Entre na pasta:

```bash
cd AgroPulse-Dashboard
```

---

## 2. Instalar as dependências

```bash
npm install
```

---

## 3. Configurar a API

Crie um arquivo:

```text
.env.local
```

e configure a URL do backend utilizada pelo projeto.

Exemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 4. Executar o projeto

```bash
npm run dev
```

O dashboard estará disponível em:

```text
http://localhost:3000
```

---

# 🎨 Interface

O frontend foi desenvolvido com foco em:

* Interface moderna
* Responsividade
* Organização das informações
* Facilidade de navegação
* Visualização de dados
* Componentização
* Experiência do usuário

As páginas utilizam componentes reutilizáveis para manter um padrão visual consistente em todo o sistema.

---

# 👨‍💻 Desenvolvedor

**Lucas Albertti**

🎓 Sistemas de Informação

💻 Desenvolvimento Full Stack

🔗 GitHub: [LucasAlbertti](https://github.com/LucasAlbertti)

---

# 📄 Licença

Projeto desenvolvido para fins acadêmicos, de aprendizado e portfólio.
