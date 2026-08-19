# 🌱 AgroPulse

> Sistema web de gerenciamento agrícola desenvolvido como projeto Full Stack.

O **AgroPulse** é uma plataforma para gerenciamento de propriedades agrícolas, permitindo centralizar informações sobre fazendas, talhões, safras e movimentações financeiras em um único sistema.

O projeto foi desenvolvido com arquitetura **Full Stack**, utilizando **Node.js + Express + PostgreSQL** no backend e **Next.js + React + TypeScript** no frontend.

---

## 📸 Sobre o projeto

O AgroPulse foi desenvolvido com o objetivo de transformar dados do agronegócio em informações organizadas e de fácil visualização.

O sistema possui funcionalidades para:

* 👤 Gerenciamento de usuários
* 🔐 Autenticação com JWT
* 🚜 Gerenciamento de fazendas
* 🌾 Gerenciamento de talhões
* 🌱 Gerenciamento de safras
* 💰 Controle financeiro
* 📊 Dashboard
* 📈 Gráficos
* 🌦️ Informações climáticas
* 📄 Relatórios
* 👤 Gerenciamento de perfil
* 🔒 Alteração de senha
* 📧 Verificação de e-mail

A estrutura de dados segue principalmente o relacionamento:

```text
Usuário
   │
   └── Fazenda
          │
          └── Talhão
                 │
                 └── Safra
```

---

# 🛠️ Tecnologias

## Backend

| Tecnologia | Utilização                           |
| ---------- | ------------------------------------ |
| Node.js    | Ambiente de execução                 |
| Express    | API REST                             |
| PostgreSQL | Banco de dados                       |
| pg         | Conexão com PostgreSQL               |
| JWT        | Autenticação                         |
| bcrypt     | Criptografia de senhas               |
| dotenv     | Variáveis de ambiente                |
| CORS       | Comunicação entre frontend e backend |
| Joi        | Validação de dados                   |
| Nodemailer | Envio de e-mails                     |

O backend utiliza CommonJS e atualmente possui suas dependências definidas no `package.json`.

---

## Frontend

| Tecnologia      | Utilização            |
| --------------- | --------------------- |
| Next.js         | Framework React       |
| React           | Interface             |
| TypeScript      | Tipagem               |
| Tailwind CSS    | Estilização           |
| Axios           | Comunicação com a API |
| Recharts        | Gráficos              |
| jsPDF           | Geração de PDF        |
| Lucide React    | Ícones                |
| React Hook Form | Formulários           |
| Zod             | Validação             |
| Sonner          | Notificações          |

O frontend utiliza **Next.js 16.2.6**, **React 19** e **TypeScript 5.7.3**.

---

# 📁 Estrutura do projeto

A estrutura geral do projeto é organizada em frontend e backend:

```text
AgroPulse/
│
├── backend/
│   │
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   │
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── .env.local
│   └── package.json
│
├── .gitignore
└── README.md
```

> A estrutura interna de cada pasta pode possuir outros arquivos e componentes.

---

# 💻 Pré-requisitos

Antes de executar o projeto, instale:

* **Git**
* **Node.js**
* **npm**
* **PostgreSQL**
* **pgAdmin**

Verifique as instalações:

```bash
node --version
npm --version
git --version
```

---

# 📥 Instalação

## 1. Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/LucasAlbertti/AgroPulse.git
```

Entre na pasta do projeto:

```bash
cd AgroPulse
```

---

# 🗄️ Configuração do banco de dados

O AgroPulse utiliza **PostgreSQL**.

Abra o **pgAdmin** e crie um banco de dados para o projeto.

Por exemplo:

```text
Nome: agropulse
```

Depois, execute no banco o script SQL responsável pela criação das tabelas.

Entre as principais tabelas utilizadas pelo sistema estão:

```text
usuarios
fazendas
talhoes
safras
financeiro
```

O relacionamento principal é:

```text
usuarios
   │
   └── fazendas
          │
          └── talhoes
                 │
                 └── safras
```

---

# ⚙️ Configurando o Backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

O `package.json` atual do backend contém as dependências necessárias para Express, PostgreSQL, JWT, bcrypt, dotenv, CORS, Joi e Nodemailer.

---

## 🔐 Variáveis de ambiente

Crie um arquivo chamado:

```text
.env
```

dentro da pasta `backend`.

Exemplo:

```env
PORT=4000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=agropulse
DB_USER=postgres
DB_PASSWORD=sua_senha

JWT_SECRET=sua_chave_secreta

FRONTEND_URL=http://localhost:3000
```

Caso o projeto utilize outras variáveis para envio de e-mails, elas também devem ser configuradas no `.env`.

### ⚠️ Importante

**Nunca envie o `.env` para o GitHub.**

No `.gitignore`, mantenha:

```gitignore
.env
.env.local
node_modules/
```

As credenciais do PostgreSQL e a chave JWT devem ser configuradas individualmente em cada máquina.

---

# ▶️ Executando o Backend

O backend atualmente é iniciado diretamente pelo arquivo `index.js`.

Dentro da pasta `backend`, execute:

```bash
node index.js
```

Se tudo estiver configurado corretamente, a API estará disponível na porta configurada no `.env`.

No ambiente local:

```text
http://localhost:4000
```

---

# 🌐 Configurando o Frontend

Abra um **novo terminal**.

Volte para a raiz:

```bash
cd ..
```

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

O frontend possui scripts para desenvolvimento, build, produção e lint.

---

# 🔗 Configurando a API

Crie o arquivo:

```text
.env.local
```

dentro da pasta `frontend`.

Configure a URL da API utilizada pelo projeto.

Exemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

> Caso o código do frontend utilize outro nome de variável para a URL da API, mantenha o nome definido no código.

---

# ▶️ Executando o Frontend

Dentro da pasta `frontend`:

```bash
npm run dev
```

O Next.js iniciará o servidor de desenvolvimento.

Acesse:

```text
http://localhost:3000
```

---

# 🚀 Executando o projeto completo

Para utilizar o AgroPulse localmente, mantenha **dois terminais abertos**.

### Terminal 1 — Backend

```bash
cd AgroPulse/backend
node index.js
```

### Terminal 2 — Frontend

```bash
cd AgroPulse/frontend
npm run dev
```

Depois abra:

```text
http://localhost:3000
```

O funcionamento geral é:

```text
┌─────────────────────┐
│      Navegador      │
│   localhost:3000    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Frontend       │
│ Next.js + React     │
└──────────┬──────────┘
           │ HTTP
           ▼
┌─────────────────────┐
│       Backend       │
│ Node.js + Express   │
│   localhost:4000    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     PostgreSQL      │
│      Database       │
└─────────────────────┘
```

---

# 🔐 Autenticação

O sistema utiliza **JSON Web Token (JWT)** para autenticação.

O fluxo de autenticação funciona da seguinte maneira:

```text
Usuário
   │
   ▼
Login
   │
   ▼
Backend
   │
   ├── Verifica usuário
   ├── Verifica senha
   │
   ▼
JWT
   │
   ▼
Frontend
   │
   ▼
Rotas protegidas
```

As senhas são protegidas utilizando `bcrypt`.

As operações protegidas utilizam o token JWT enviado nas requisições.

---

# 🧪 Testando a API

A API pode ser testada utilizando ferramentas como:

* Postman
* Insomnia
* Swagger, caso configurado

Exemplo de login:

```http
POST http://localhost:4000/usuarios/login
```

Body:

```json
{
  "email": "usuario@email.com",
  "senha": "123456"
}
```

Após o login, o backend retorna o token JWT.

Nas rotas protegidas, o token deve ser enviado no header:

```http
Authorization: Bearer SEU_TOKEN
```

---

# 📌 Principais funcionalidades

## 👤 Usuários

* Cadastro
* Login
* Autenticação JWT
* Perfil
* Atualização de dados
* Alteração de senha
* Verificação de e-mail

---

## 🚜 Fazendas

Permite cadastrar e gerenciar as propriedades agrícolas do usuário.

Principais operações:

```text
Criar
Listar
Atualizar
Excluir
```

---

## 🌾 Talhões

Os talhões pertencem a uma fazenda.

O sistema controla o relacionamento:

```text
Usuário
   ↓
Fazenda
   ↓
Talhão
```

As operações são protegidas para garantir que um usuário não consiga acessar talhões pertencentes a outro usuário.

---

## 🌱 Safras

As safras estão relacionadas aos talhões:

```text
Fazenda
   ↓
Talhão
   ↓
Safra
```

É possível gerenciar informações relacionadas às culturas, plantio, colheita, status e produtividade.

---

## 💰 Financeiro

O sistema possui controle de movimentações financeiras, permitindo trabalhar com:

```text
Receitas
Despesas
```

Esses dados também podem ser utilizados nos indicadores e relatórios.

---

# 📊 Dashboard

O dashboard apresenta uma visão geral das informações cadastradas no sistema.

Entre os dados utilizados estão:

* Total de fazendas
* Total de talhões
* Total de safras
* Área cadastrada
* Produtividade
* Informações financeiras
* Culturas
* Atividades recentes
* Informações climáticas

O frontend utiliza **Recharts** para a construção dos gráficos.

---

# 🌦️ Clima

O AgroPulse possui integração com a **Open-Meteo** para obtenção de informações climáticas.

O fluxo é:

```text
Frontend
   ↓
GET /clima
   ↓
Backend
   ↓
Open-Meteo
   ↓
Dados climáticos
   ↓
Frontend
```

A implementação atual utiliza uma localização configurada no backend para realizar a consulta climática.

---

# 📄 Relatórios

O sistema possui uma área de relatórios para transformar os dados cadastrados em informações de análise.

A rota principal é:

```http
GET /relatorios/geral
```

Ela permite utilizar filtros como:

```text
data_inicio
data_fim
fazenda_id
status
cultura
```

Exemplo:

```text
/relatorios/geral?data_inicio=2026-01-01&data_fim=2026-05-31
```

Também é possível combinar filtros:

```text
/relatorios/geral?fazenda_id=2&status=Ativa&cultura=Soja
```

O relatório pode apresentar:

* Total de fazendas
* Total de talhões
* Área total
* Produtividade média
* Safras por status
* Receitas
* Despesas
* Lucro
* Culturas
* Produtividade por cultura
* Safras cadastradas

---

# 📦 Scripts disponíveis

## Backend

O backend atualmente é executado diretamente pelo `index.js`:

```bash
node index.js
```

O `package.json` atual não possui scripts `dev` ou `start`.

---

## Frontend

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Produção

```bash
npm start
```

### Lint

```bash
npm run lint
```

Esses scripts estão definidos no `package.json` atual do frontend.

---

# 🔄 Atualizando o projeto

Caso o projeto já esteja instalado em outra máquina e você queira baixar as alterações do GitHub:

```bash
git pull
```

Depois, caso tenham sido adicionadas ou atualizadas dependências:

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

# 🛠️ Problemas comuns

## `Cannot find module`

Execute:

```bash
npm install
```

na pasta correspondente ao erro.

---

## Erro de conexão com PostgreSQL

Confira:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agropulse
DB_USER=postgres
DB_PASSWORD=sua_senha
```

Também confirme se o serviço do PostgreSQL está em execução.

---

## Erro `401 Unauthorized`

Verifique:

* se o usuário está autenticado;
* se o token JWT está sendo enviado;
* se o token ainda é válido;
* se o backend está utilizando a mesma chave `JWT_SECRET`;
* se o frontend está apontando para a API correta.

---

## Erro de CORS

Confira se a URL do frontend está autorizada pelo backend.

Exemplo:

```env
FRONTEND_URL=http://localhost:3000
```

---

## Frontend não consegue acessar o backend

Confirme se os dois servidores estão funcionando:

```text
Backend:
http://localhost:4000

Frontend:
http://localhost:3000
```

Também confira o `.env.local` do frontend.

---

# 🔒 Segurança

Nunca faça commit de:

```text
.env
.env.local
node_modules/
```

Também não publique:

* senha do PostgreSQL;
* `JWT_SECRET`;
* credenciais SMTP;
* tokens;
* senhas de usuários.

Utilize variáveis de ambiente para informações sensíveis.

---

# 🌐 Deploy

O projeto pode futuramente ser publicado utilizando uma arquitetura semelhante a:

```text
                 Internet
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
      Frontend             Backend
      Vercel               Render
          │                   │
          │                   ▼
          │              PostgreSQL
          │
          └────── API ────────┘
```

As variáveis de ambiente devem ser configuradas diretamente na plataforma de hospedagem.

---

# 🎯 Objetivo do projeto

O AgroPulse foi desenvolvido para aplicar na prática conceitos de desenvolvimento Full Stack, incluindo:

* Desenvolvimento de APIs REST
* Banco de dados relacional
* SQL
* Autenticação
* Autorização
* CRUD
* Relacionamentos entre entidades
* Integração frontend/backend
* Desenvolvimento de dashboards
* Visualização de dados
* Variáveis de ambiente
* Geração de relatórios
* Integração com APIs externas

---

# 👨‍💻 Desenvolvedor

**Lucas Albertti**

🎓 Sistemas de Informação

💻 Desenvolvimento Full Stack

🔗 GitHub: [LucasAlbertti](https://github.com/LucasAlbertti)

🔗 LinkedIn: [Lucas Albertti](https://www.linkedin.com/in/lucasalbertti/)

---

# 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos, de aprendizado e portfólio.
