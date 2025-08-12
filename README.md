# Bewear E-commerce

Uma plataforma de e-commerce moderna e robusta construída com as melhores tecnologias web atuais.

## 🚀 Sobre o Projeto

Bewear é uma aplicação de e-commerce completa que oferece uma experiência de compra moderna e intuitiva. O projeto foi desenvolvido seguindo as melhores práticas de desenvolvimento web, com foco em performance, escalabilidade e manutenibilidade.

### ✨ Funcionalidades Principais

- **Catálogo de Produtos**: Navegação por categorias e produtos
- **Sistema de Carrinho**: Gerenciamento completo de itens e quantidades
- **Autenticação**: Login/registro com email/senha e Google OAuth
- **Checkout**: Processamento de pedidos com Stripe
- **Gestão de Pedidos**: Histórico e acompanhamento de compras
- **Endereços de Entrega**: Múltiplos endereços por usuário
- **Interface Responsiva**: Design adaptável para todos os dispositivos

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface do usuário
- **TypeScript** - Linguagem de programação tipada
- **Tailwind CSS 4** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes React
- **Lucide React** - Ícones vetoriais

### Backend & Banco de Dados

- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM moderno e type-safe
- **BetterAuth** - Sistema de autenticação robusto
- **Stripe** - Processamento de pagamentos

### Formulários & Validação

- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **@hookform/resolvers** - Integração entre React Hook Form e Zod

### Estado & Cache

- **TanStack Query (React Query)** - Gerenciamento de estado do servidor
- **React Context** - Estado global da aplicação

### Desenvolvimento

- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Drizzle Kit** - Ferramentas para o banco de dados

## 📁 Estrutura do Projeto

```
src/
├── actions/                    # Server Actions
│   ├── add-cart-product/      # Adicionar produto ao carrinho
│   ├── add-shipping-address/  # Adicionar endereço de entrega
│   ├── create-checkout-session/ # Criar sessão de checkout
│   ├── decrease-cart-product-quantity/ # Diminuir quantidade
│   ├── finish-order/          # Finalizar pedido
│   ├── get-cart/              # Buscar carrinho
│   ├── get-shipping-addresses/ # Buscar endereços
│   ├── increase-cart-product-quantity/ # Aumentar quantidade
│   ├── remove-cart-product/   # Remover produto do carrinho
│   └── update-cart-shipping-address/ # Atualizar endereço
├── app/                       # App Router (Next.js 15)
│   ├── api/                   # Rotas da API
│   │   ├── auth/              # Endpoints de autenticação
│   │   └── stripe/            # Webhooks do Stripe
│   ├── authentication/        # Páginas de autenticação
│   ├── cart/                  # Páginas do carrinho
│   ├── category/              # Páginas de categoria
│   ├── checkout/              # Páginas de checkout
│   ├── my-orders/             # Páginas de pedidos
│   └── product-variant/       # Páginas de produto
├── components/                 # Componentes reutilizáveis
│   ├── common/                # Componentes comuns
│   ├── icons/                 # Ícones das marcas
│   └── ui/                    # Componentes base (shadcn/ui)
├── constants/                  # Constantes da aplicação
├── db/                        # Configuração do banco de dados
│   ├── index.ts               # Conexão com o banco
│   ├── schema.ts              # Schemas das tabelas
│   └── seed.ts                # Dados iniciais
├── helpers/                    # Funções utilitárias
├── hooks/                     # Hooks customizados
│   └── data/                  # Hooks para dados (React Query)
├── lib/                       # Bibliotecas e configurações
└── providers/                 # Provedores de contexto
```

## 🗄️ Esquema do Banco de Dados

O projeto utiliza um banco PostgreSQL com as seguintes tabelas principais:

- **user**: Usuários da aplicação
- **session**: Sessões de autenticação
- **account**: Contas de autenticação (OAuth)
- **category**: Categorias de produtos
- **product**: Produtos
- **product_variant**: Variações de produtos (tamanho, cor, etc.)
- **cart**: Carrinhos de compra
- **cart_item**: Itens no carrinho
- **shipping_address**: Endereços de entrega
- **order**: Pedidos
- **order_item**: Itens dos pedidos

## 🔧 Configuração e Instalação

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta no Stripe (para pagamentos)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/bewear-ecomerce.git
cd bewear-ecomerce
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Banco de dados
DATABASE_URL

# Stripe
STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET

# BetterAuth
AUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

### 4. Configure o banco de dados

```bash
# Execute as migrações
npm run db:migrate

# (Opcional) Execute o seed para dados iniciais
npm run db:seed
```

### 5. Execute o projeto

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run db:migrate` - Executa migrações do banco
- `npm run db:seed` - Executa seed do banco

## 📱 Funcionalidades da Aplicação

### Página Inicial

- Banner promocional
- Lista de marcas parceiras
- Produtos mais vendidos
- Seletor de categorias
- Produtos novos

### Sistema de Autenticação

- Login com email/senha
- Registro de usuário
- Autenticação com Google OAuth
- Sessões persistentes

### Carrinho de Compras

- Adicionar/remover produtos
- Ajustar quantidades
- Resumo financeiro
- Seleção de endereço de entrega

### Checkout

- Integração com Stripe
- Processamento de pagamentos
- Confirmação de pedidos
- Histórico de compras

## 🎨 Design System

O projeto utiliza o **shadcn/ui** como base para componentes, garantindo:

- Consistência visual
- Acessibilidade
- Customização via Tailwind CSS
- Componentes reutilizáveis

## 🔒 Segurança

- Autenticação robusta com BetterAuth
- Validação de dados com Zod
- Sanitização de inputs
- HTTPS em produção
- Proteção contra CSRF

## 📊 Performance

- Server Components do Next.js 15
- Otimização de imagens automática
- Lazy loading de componentes
- Cache inteligente com React Query
- Build otimizado para produção

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido com ❤️ usando as melhores tecnologias web modernas.
