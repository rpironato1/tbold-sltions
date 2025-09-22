# Checklist de Conclusão de Tarefas

## Após Implementar Código
1. **Executar ESLint**: `npm run lint` - Verificar e corrigir problemas de código
2. **Testar funcionamento**: `npm run dev` - Verificar se aplicação executa sem erros
3. **Build test**: `npm run build` - Verificar se build é bem-sucedido
4. **Verificar tipos**: TypeScript é verificado automaticamente pelo build

## Verificações de Qualidade
- Componentes seguem padrões shadcn/ui
- Uso correto da função `cn()` para classes CSS
- Props tipadas corretamente
- Importações organizadas e corretas
- Responsividade (mobile-first com Tailwind)

## Antes do Commit
- Código livre de erros ESLint
- Build bem-sucedido
- Funcionalidade testada no browser
- Documentação atualizada se necessário

## Notas Especiais
- Não modificar componentes em `src/components/ui/` (gerados pelo shadcn/ui)
- Verificar se novas dependências são necessárias no package.json
- Manter padrões de roteamento do React Router v6