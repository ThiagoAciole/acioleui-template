# create-acioleui

Template base para projetos React com [AcioleUI](https://github.com/Acioleui), TypeScript e Vite.
Template base e gerador CLI oficial para projetos React modernos com [AcioleUI](https://github.com/Acioleui), TypeScript, Vite e React Router.

## Tecnologias

- React 19
- TypeScript
- Vite
- AcioleUI Components
- **React 19**
- **TypeScript**
- **Vite 8**
- **AcioleUI Components**
- **React Router**
- **ESLint & Prettier** (padronização e formatação automatizada)

---

## Estrutura

## Estrutura de Pastas

```text
src/
├── assets/              # imagens, ícones e outros arquivos estáticos importados pelo código
├── components/          # componentes reutilizáveis do produto
├── hooks/               # hooks reutilizáveis
├── pages/
│   └── Home/
│       └── index.tsx    # uma página por pasta
├── services/            # APIs e integrações externas
├── assets/              # imagens, ícones e arquivos estáticos
├── components/          # componentes reutilizáveis e layout da aplicação
│   ├── Layout/          # casca principal (Sidebar + TopBar + Outlet)
│   ├── Sidebar/         # barra de navegação lateral
│   ├── TopBar/          # barra superior com alternância de tema
│   └── index.ts         # barrel export de componentes
├── hooks/               # hooks customizados reutilizáveis
├── pages/               # páginas da aplicação (uma pasta por página com index.tsx)
│   ├── Home/
│   │   └── index.tsx
│   └── index.ts
├── routes/              # definição centralizada de rotas
│   └── index.tsx
├── services/            # clientes de API e integrações externas
├── styles/
│   └── app.css          # estilos globais de composição do template
├── App.tsx              # composição da aplicação
└── main.tsx             # bootstrap, provider e estilos do AcioleUI
│   └── app.css          # estilos globais e tokens de composição
├── types/               # tipagens e interfaces compartilhadas
├── App.tsx              # orquestração de providers e rotas
├── main.tsx             # ponto de entrada, ThemeProvider e estilos do AcioleUI
└── vite-env.d.ts
```

Crie as camadas abaixo somente quando houver uso real:
---

- `contexts/`: estado global via React Context.
- `store/`: estado global mais complexo.
- `layouts/`: cascas compartilhadas entre duas ou mais áreas.
- `utils/`: funções puras e genéricas.

## Como Usar

Componentes e páginas que crescerem podem usar a mesma convenção: uma pasta por unidade, com `index.tsx` e arquivos locais apenas quando necessários. Reutilize AcioleUI antes de criar componentes-base próprios.

### Criando um novo projeto via NPM / NPX

---

````bash
# Usando npm create
npm create acioleui meu-projeto

## Como usar este template
# Ou usando npx
npx create-acioleui meu-projeto

### Uso

```bash
npm create acioleui@latest meu-projeto -- --install
# Ou instalando dependências automaticamente
npm create acioleui meu-projeto -- --install
````

### Desenvolvimento local

```bash
cd ../<nome-do-projeto>
cd meu-projeto
npm install
npm start
```

---

## Scripts disponíveis

## Scripts Disponíveis

```bash
npm start        # inicia o servidor de desenvolvimento
npm run dev      # alias para npm start
npm run build    # build de produção
npm run preview  # preview do build
npm run lint     # verifica o código
npm run create   # cria um novo projeto a partir deste template
npm start            # inicia o servidor de desenvolvimento Vite
npm run dev          # alias para npm start
npm run build        # valida tipos com tsc e executa build de produção com Vite
npm run preview      # visualiza o build de produção localmente
npm run lint         # verifica erros com ESLint
npm run lint:fix     # corrige automaticamente problemas encontrados pelo ESLint
npm run format       # formata todos os arquivos com Prettier
npm run format:check # verifica se os arquivos estão formatados corretamente
npm run validate     # executa lint, checagem de formatação e build em sequência
```

---

## Publicação no NPM

Para publicar uma nova versão no registro público do NPM:

```bash
npm run validate
npm publish --access public
```
