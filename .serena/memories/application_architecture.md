# Arquitetura da Aplicação - Turnbold Solutions

## Estrutura de Roteamento
- **Rotas Públicas**: Home, Sobre, Projetos, Blog, FAQ, Contato, etc.
- **Rotas de Autenticação**: /login, /signup
- **Rotas Protegidas**: /dashboard/* (requer autenticação)

## Sistema de Autenticação
- **Provider**: Supabase
- **Proteção**: ProtectedRoute component
- **Layout**: DashboardLayout para rotas protegidas
- **Persistência**: localStorage com autoRefreshToken

## Componentes Principais
- **Header**: Navegação principal
- **Footer**: Rodapé com links
- **Sidebar**: Navegação do dashboard
- **DashboardLayout**: Layout para área protegida
- **ProtectedRoute**: HOC para proteção de rotas

## Páginas de Projetos
- AnaliseJUR (projeto jurídico)
- FitCoach (personal trainers)
- BarberNow (barbearias)
- LovelyNails (salão de beleza)
- OnDemand (sistema sob demanda)

## Artigos do Blog
- Como IA revoluciona setor jurídico
- Modernização sistemas COBOL
- Tecnologia para personal trainers
- OCR e Machine Learning
- Gestão digital para barbearias
- LGPD e proteção de dados

## Integração Supabase
- Cliente configurado em `src/integrations/supabase/client.ts`
- Tipos gerados em `src/integrations/supabase/types.ts`
- Autenticação persistente com localStorage