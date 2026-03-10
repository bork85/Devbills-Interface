# 💰 DevBills - Gerenciador Financeiro

<p align="center">
  <img src="./src/assets/payment-cards-money-svgrepo-com (1).svg" alt="DevBills Logo" width="200">
</p>

Uma aplicação moderna de gerenciamento financeiro desenvolvida com React, TypeScript e Vite, permitindo controle completo de receitas e despesas com visualizações intuitivas.

## ✨ Características

💳 **Dashboard Interativo**: Visualização completa de saldo, receitas e despesas  
📊 **Gráficos Dinâmicos**: Análise visual com gráficos de pizza e barras  
🔐 **Autenticação Google**: Login seguro via Firebase Authentication  
📱 **Design Responsivo**: Interface adaptativa para todos os dispositivos  
🎨 **UI Moderna**: Componentes estilizados com Tailwind CSS e Material UI  
📈 **Histórico Mensal**: Acompanhamento de transações por período  
🏷️ **Categorização**: Organize despesas por categorias personalizadas  
🔄 **Filtros Avançados**: Seleção de mês e ano para análise detalhada  

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── assets/              # Imagens e recursos estáticos
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Footer.tsx
│   │   ├── GoogleLoginButton.tsx
│   │   ├── Header.tsx
│   │   ├── Input.tsx
│   │   ├── MonthYearSelect.tsx
│   │   ├── Select.tsx
│   │   └── TransactionTypeSelector.tsx
│   ├── config/              # Configurações (Firebase)
│   ├── context/             # Context API (Autenticação)
│   ├── layout/              # Layouts da aplicação
│   ├── pages/               # Páginas principais
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── NewTransaction.tsx
│   │   └── TransactionsSummary.tsx
│   ├── routes/              # Configuração de rotas
│   ├── services/            # Serviços de API
│   ├── types/               # Definições TypeScript
│   └── utils/               # Funções utilitárias
├── .env.example             # Exemplo de variáveis de ambiente
├── package.json             # Dependências do projeto
├── vite.config.ts           # Configuração do Vite
└── README.md                # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **React 19**: Biblioteca para construção de interfaces
- **TypeScript**: Superset JavaScript com tipagem estática
- **Vite**: Build tool moderna e rápida
- **Tailwind CSS**: Framework CSS utilitário
- **Material UI**: Componentes React prontos
- **Firebase**: Autenticação e backend
- **Recharts**: Biblioteca de gráficos para React
- **Axios**: Cliente HTTP para requisições
- **React Router**: Navegação entre páginas
- **Lucide React**: Ícones modernos

## 📋 Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| **Login Google** | Autenticação segura via Firebase |
| **Dashboard** | Visão geral de finanças com gráficos |
| **Nova Transação** | Cadastro de receitas e despesas |
| **Resumo** | Listagem completa de transações |
| **Filtros** | Seleção por mês e ano |
| **Categorias** | Organização por categorias customizadas |

## 🎨 Componentes Principais

- **Card**: Container estilizado para informações
- **Button**: Botões customizados com variantes
- **Input**: Campos de entrada com validação
- **Select**: Seleção de opções dropdown
- **MonthYearSelect**: Seletor de período
- **GoogleLoginButton**: Botão de login com Google
- **TransactionTypeSelector**: Seletor de tipo de transação

## 🚀 Como Usar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta Firebase configurada
- Ter o backend rodando (https://github.com/bork85/Devbills-back-end)

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/bork85/Devbills-Interface.git
cd frontend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Copie o arquivo `.env.example` para `.env` e configure suas credenciais do Firebase:

```bash
cp .env.example .env
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

5. **Acesse no navegador**

```
http://localhost:5173
```

### Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Visualiza build de produção
npm run lint     # Executa linter
```

## 📝 Configuração do Firebase

Para utilizar a autenticação Google, configure o Firebase:

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative a autenticação Google
3. Copie as credenciais para o arquivo `.env`
4. Configure as variáveis:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - Outras configurações necessárias

## 🔧 Personalização

Para customizar a aplicação:

- **Cores**: Modifique o arquivo `tailwind.config.js`
- **Componentes**: Edite os arquivos em `src/components/`
- **Páginas**: Altere os arquivos em `src/pages/`
- **Estilos globais**: Ajuste `src/styles.css`

## 📄 Licença e Copyright

© 2025 - DevBills - Todos os direitos reservados

Feito com ❤️ para facilitar o gerenciamento financeiro

## ✉️ Contato

**Desenvolvedor**: Daniel Bork  
**E-mail**: [daniel.bork@yahoo.com.br](mailto:daniel.bork@yahoo.com.br)

---

**Versão**: 0.0.0  
**Idioma**: Português (Brasil)  
**Data de Criação**: Outubro de 2025  
**Último Commit**: 26-out-2025
