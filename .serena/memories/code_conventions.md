# Convenções de Código - Turnbold Solutions

## Padrões TypeScript
- Uso estrito do TypeScript com configuração rigorosa
- Interfaces para tipagem de dados
- Props tipadas para componentes React
- Uso de `type` para unions e `interface` para objetos

## Padrões React
- Componentes funcionais com hooks
- Props destructuring
- Uso de React Query para estado servidor
- React Hook Form para formulários
- Nomenclatura PascalCase para componentes

## Estrutura de Arquivos
- `src/pages/` - Páginas da aplicação
- `src/components/` - Componentes reutilizáveis
- `src/components/ui/` - Componentes shadcn/ui (não editar diretamente)
- `src/integrations/supabase/` - Configuração Supabase
- `src/lib/` - Utilitários (utils.ts com função cn)
- `src/hooks/` - Hooks customizados
- `src/data/` - Dados estáticos

## Estilo e UI
- Tailwind CSS para estilização
- shadcn/ui para componentes base
- Função `cn()` para merge de classes CSS
- Sistema de temas (next-themes)

## Nomenclatura
- Arquivos: kebab-case para páginas com múltiplas palavras
- Componentes: PascalCase
- Funções: camelCase
- Constantes: UPPER_SNAKE_CASE

## ESLint Rules
- `@typescript-eslint/no-unused-vars: "off"` - Variáveis não utilizadas permitidas
- React Hooks rules ativadas
- React Refresh para hot reload