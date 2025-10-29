# Recomendador de Produtos RD Station

Sistema de recomendação de produtos desenvolvido como parte do processo seletivo para desenvolvedor front-end na RD Station.

## 🌐 Deploy

**[Ver aplicação ao vivo](https://recomendador-de-produtos-rd-station.vercel.app/)**

Obs: Quando acessado pela primeira vez, pode ocasionar um "delay" de até 50 segundos para "acordar" o backend.

## 🔧 Variáveis de Ambiente

### Frontend (.env)

```bash
REACT_APP_API_URL=http://localhost:3001 => Rodar com backend local
REACT_APP_API_URL=https://recomendador-de-produtos-rdstation.onrender.com => Rodar com backend de "prod"
```

> **Nota**: Crie um arquivo `.env` na raiz da pasta frontend com as variáveis acima.

## 🚀 Como Executar

1. Clone o repositório
2. **Configure as variáveis de ambiente** conforme acima
3. Execute `yarn install`
4. Execute `yarn dev`

## 📋 Sobre o Projeto

Aplicação React que recomenda produtos da RD Station com base nas preferências e funcionalidades selecionadas pelo usuário, utilizando um algoritmo de pontuação personalizado.

## ✨ Funcionalidades

- ✅ Sistema de recomendação inteligente baseado em pontuação
- ✅ Dois modos de recomendação (produto único ou múltiplos)
- ✅ Validação de formulário com feedback visual
- ✅ Contador de seleções em tempo real
- ✅ Loading states e animações suaves
- ✅ Botão para limpar formulário
- ✅ Tratamento de empates (retorna último válido)
- ✅ Interface responsiva com Tailwind CSS
- ✅ Testes unitários com boa cobertura

## 🚀 Tecnologias

- **React.js 18.2.0** - Framework frontend
- **json-server** - API REST mockada
- **Tailwind CSS** - Estilização
- **React Icons** - Biblioteca de ícones
- **Jest + Testing Library** - Testes unitários
- **ESLint** - Qualidade de código

## 💡 Solução Implementada

### Algoritmo de Recomendação

O sistema utiliza um **algoritmo de pontuação baseado em matching** que:

1. **Calcula pontos** para cada produto baseado nas seleções do usuário:

   - +1 ponto para cada preferência que o produto atende
   - +1 ponto para cada funcionalidade que o produto oferece

2. **Filtra produtos válidos** (pontuação > 0)

3. **Ordena por pontuação** (maior para menor)

4. **Retorna baseado no modo**:
   - `SingleProduct`: Retorna 1 produto (em empate, o último válido)
   - `MultipleProducts`: Retorna todos os produtos válidos ordenados

### Arquitetura

```
frontend/
├── src/
│   ├── components/
│   │   ├── Form/              # Formulário de seleção
│   │   └── RecommendationList/ # Exibição de resultados
│   ├── services/
│   │   └── recommendation.service.js  # Lógica de recomendação
│   ├── hooks/                 # Custom hooks
│   └── App.js                 # Componente principal
```

### Decisões Técnicas

1. **Interface consistente**: Serviço sempre retorna array para facilitar manipulação no React

2. **Separação de responsabilidades**:

   - `recommendation.service.js` - Lógica pura (testável)
   - `Form.js` - Gerenciamento de estado
   - `App.js` - Orquestração

3. **Tratamento de edge cases**:

   - Array de produtos vazio
   - Nenhuma seleção
   - Nenhum produto com match
   - Empates (retorna último válido conforme especificação)

4. **UX aprimorada**:
   - Validação de formulário com mensagens claras
   - Loading states durante processamento
   - Feedback visual com badges de contagem
   - Botão de limpar formulário
   - Animações suaves de transição

## 🔧 Como Executar

### Pré-requisitos

- Node.js >= 18.3
- Yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/luisdandolini/recomendador-de-produtos-RDStation.git

# Entre na pasta
cd recomendador-de-produtos-RDStation

# Instale as dependências
yarn install

# Execute o script de instalação
./install.sh
```

### Executar a aplicação

```bash
# Inicia frontend e backend simultaneamente
yarn dev

# OU iniciá-los separadamente:
yarn start:frontend  # Frontend em http://localhost:3000
yarn start:backend   # Backend em http://localhost:3001
```

## 🧪 Testes

```bash
# Executar todos os testes
cd frontend && yarn test

# Executar testes em modo watch
yarn test --watch

# Gerar relatório de cobertura
yarn test --coverage
```

### Cobertura de Testes

✅ Casos de sucesso (SingleProduct e MultipleProducts)  
✅ Casos de empate  
✅ Edge cases (sem seleção, sem match, array vazio)  
✅ Validação de ordenação por pontuação

## 📦 Scripts Disponíveis

```bash
yarn start          # Inicia frontend e backend (via Lerna)
yarn dev            # Inicia frontend e backend (via Concurrently)
yarn start:frontend # Apenas frontend
yarn start:backend  # Apenas backend
yarn test           # Executa testes
yarn lint           # Verifica código com ESLint
yarn lint:fix       # Corrige problemas do ESLint automaticamente
```

## ✅ Critérios de Aceite Atendidos

- [x] Recebe preferências e funcionalidades via formulário
- [x] Retorna recomendações baseadas nas seleções
- [x] Modo SingleProduct retorna 1 produto
- [x] Modo MultipleProducts retorna lista ordenada
- [x] Em caso de empate, retorna último produto válido
- [x] Lida com diferentes tipos de preferências
- [x] Código modular e extensível
- [x] Testes unitários implementados

## 🎯 Produtos Disponíveis

- **RD Station CRM** - Gestão de vendas
- **RD Station Marketing** - Automação de marketing
- **RD Conversas** - Comunicação omnichannel
- **RD Mentor AI** - Inteligência artificial

## 👤 Autor

**Luis Fernando Dandolini Duarte**

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/luis-dandolini-duarte/)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github)](https://github.com/luisdandolini)
