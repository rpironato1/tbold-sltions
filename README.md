# Turnbold Solutions

Site corporativo da Turnbold Solutions construído com React, TypeScript e Vite. Apresenta um site público com informações da empresa, showcase de projetos, blog e uma área de dashboard protegida com autenticação Supabase.

## Desenvolvimento Local

Pré-requisitos: Node.js e npm instalados

```sh
# Clone o repositório
git clone <YOUR_GIT_URL>

# Navegue até o diretório do projeto
cd turnbold-solutions

# Instale as dependências
npm i

# Inicie o servidor de desenvolvimento (porta 8080)
npm run dev
```

## Comandos Disponíveis

```bash
# Servidor de desenvolvimento (porta 8080)
npm run dev

# Build para produção
npm run build

# Executar ESLint (SEMPRE executar após mudanças no código)
npm run lint

# Preview do build localmente
npm run preview
```

## Stack Tecnológica

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: shadcn/ui components + Tailwind CSS
- **Roteamento**: React Router DOM v6 com rotas protegidas
- **Backend/Auth**: Supabase com persistência no localStorage
- **Estado**: React Query para estado do servidor
- **Formulários**: React Hook Form + validação Zod

## Arquitetura do Projeto

### Estrutura de Componentes
- Componentes funcionais com props TypeScript
- Componentes em `src/components/`, páginas em `src/pages/`
- Componentes UI do shadcn/ui em `src/components/ui/`

### Fluxo de Autenticação
- **Rotas públicas**: `/`, `/about`, `/projects`, `/blog/*`
- **Rotas de auth**: `/login`, `/signup`
- **Rotas protegidas**: `/dashboard/*` com `<ProtectedRoute>`

### Organização dos Arquivos

```
src/
├── components/         # Componentes reutilizáveis
│   ├── ui/            # Componentes shadcn/ui
│   ├── Header.tsx     # Navegação principal
│   └── ProtectedRoute.tsx
├── pages/             # Componentes de rota
│   ├── blogs-articles/ # Componentes dos posts do blog
│   └── projetos/      # Páginas de showcase dos projetos
├── integrations/supabase/ # Config e tipos do Supabase
├── lib/               # Utilitários
└── data/              # Conteúdo estático
```

## Notas Importantes de Desenvolvimento

1. **Sempre executar `npm run lint`** após fazer mudanças
2. **Não modificar `src/components/ui/*`** - gerados pelo shadcn/ui CLI
3. **Usar TypeScript estritamente** - todos os componentes devem ter definições de tipos
4. **Seguir padrões de roteamento existentes** - usar sintaxe React Router v6
5. **Integração Supabase** - estado de auth gerenciado automaticamente
