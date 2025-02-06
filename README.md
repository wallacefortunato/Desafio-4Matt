# Desafio-4Matt

# Dashboard de Gerenciamento de Contratos

### Pré-requisitos

- [React.js](https://react.dev/) (versão 18 ou superior)
- [NPM](https://www.npmjs.com/) 
- [Git](https://git-scm.com/)

### Iniciando o projeto
Para iniciar o projeto:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/wallacefortunato/Desafio-4Matt.git
   cd desafio-4matt
   code .
   ```
2. **Execute o comando no terminal:**
```bash
npm i
npm run dev
```
3. **Abra o navegador no endereço:**
```
http://localhost:5173/
```

### Arquitetura e Gestão do Estado:

- Utilizei o Zustand para gerenciamento de estado devido à sua simplicidade e desempenho
- Componentes organizados em uma estrutura modular
- Implementado TypeScript para segurança de tipagem
  
### Features:

- Navegação responsiva na barra lateral
- Cartões de métricas mostrando estatísticas importantes
- Tabela de dados classificáveis ​​com todas as informações do contrato
- Formulário modal para adição de novos contratos
- Filtragem abrangente e visualização de dados
  
### Biblioteca utilizada:

@tanstack/react-table para tabela de dados
chart.js and react-chartjs-2 para gráficos
date-fns para manipulação de datas
lucide-react para icones
zustand para gerenciamento de estados

### UI/UX:

- Design limpo e moderno com Tailwind CSS
- Layout responsivo que funciona em todos os tamanhos de tela
- Elementos interativos com estados de foco
- Visualização clara de dados
- Navegação intuitiva

## Gerenciamento de Estado

### Escolha da Solução: Zustand

Para este projeto, optei por utilizar o Zustand como solução de gerenciamento de estado. O Zustand é uma biblioteca minimalista de gerenciamento de estado para React que oferece uma API simples e intuitiva, mantendo a flexibilidade e poder necessários para aplicações escaláveis.

#### Razões da Escolha

1. **Simplicidade e Minimalismo**
   - API simples e direta, sem boilerplate excessivo
   - Curva de aprendizado reduzida
   - Código mais limpo e manutenível
   - Bundle size menor comparado a outras soluções (2kB)

2. **Performance**
   - Atualizações automáticas e eficientes dos componentes
   - Sem necessidade de providers ou HOCs
   - Otimização automática de re-renderizações
   - Suporte nativo a DevTools

3. **Escalabilidade**
   - Facilidade para dividir a store em módulos
   - Suporte a middleware e persist
   - Compatibilidade com TypeScript
   - Possibilidade de criar stores independentes para diferentes domínios

4. **Manutenibilidade**
   - Código mais previsível e fácil de debugar
   - Estrutura clara e organizada
   - Facilidade para testar
   - Menos código boilerplate = menos pontos de falha

### Implementação

A implementação do Zustand segue as melhores práticas:

1. **Store Centralizada**
```typescript
// src/store/useContractStore.ts
interface ContractStore {
  contracts: Contract[];
  filteredContracts: Contract[];
  dateRange: {
    startDate: string;
    endDate: string;
  };
  selectedStatus: string;
  selectedType: string;
  // ... actions
}
```

2. **Ações Bem Definidas**
- Cada ação tem uma responsabilidade única
- Nomenclatura clara e descritiva
- Tipagem forte com TypeScript

3. **Separação de Concerns**
- Estado global apenas para dados compartilhados
- Estado local para UI específica de componentes
- Lógica de filtragem centralizada

### Vantagens da Implementação

1. **Compartilhamento de Estado**
- Métricas, filtros e dados dos contratos sincronizados
- Atualizações em tempo real
- Consistência entre componentes

2. **Gerenciamento de Filtros**
- Filtros globais afetam todos os componentes relevantes
- Estado persistente durante navegação
- Fácil extensão para novos tipos de filtros

3. **Performance**
- Atualizações seletivas de componentes
- Memoização automática
- Baixo overhead de memória

### Comparação com Alternativas

1. **Redux**
- Mais verboso
- Maior curva de aprendizado
- Mais adequado para aplicações muito grandes

2. **Context API**
- Menos performático para atualizações frequentes
- Sem ferramentas de debug avançadas
- Melhor para temas e configurações

3. **MobX**
- Mais complexo
- Maior bundle size
- Mais adequado para aplicações com estado muito complexo

### Escalabilidade

O Zustand permite escalar a aplicação de várias formas:

1. **Modularização**
```typescript
// Exemplo de divisão futura em módulos
const useContractStore = create(...)
const useUserStore = create(...)
const useSettingsStore = create(...)
```

2. **Middleware**
- Logging
- Persistência
- Validação
- Sincronização

3. **Integração com Outras Ferramentas**
- React Query para cache
- React Router para navegação
- React Hook Form para formulários

### Manutenção

A manutenção é simplificada devido a:

1. **Código Declarativo**
- Fácil de entender
- Fácil de modificar
- Fácil de testar

2. **Tipagem Forte**
- Menos bugs
- Melhor autocompletion
- Refatoração segura

3. **DevTools**
- Debugging facilitado
- Inspeção de estado
- Time-travel debugging


### Utilização de IA para Acelerar o Desenvolvimento
Durante o desenvolvimento deste projeto, diversas ferramentas de IA foram empregadas para otimizar e acelerar o processo, tais como:

Geração de Código: Utilizamos assistentes de código (como o GitHub Copilot) para gerar snippets e sugestões, agilizando a escrita de funções repetitivas e melhorando a produtividade.
Revisão e Refatoração: Ferramentas baseadas em IA ajudaram na identificação de padrões de código subótimos e sugeriram melhorias para aumentar a eficiência e legibilidade do código.
Documentação Automatizada: Soluções de IA auxiliaram na criação e padronização da documentação, facilitando a compreensão e manutenção por parte de toda a equipe.
Suporte e Debug: Chatbots e assistentes virtuais foram consultados para resolver dúvidas técnicas e identificar rapidamente possíveis causas de bugs, reduzindo o tempo de resolução de problemas.
