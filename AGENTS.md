# Projeto criado com AcioleUI

Diretrizes de arquitetura, padrões de desenvolvimento e regras para agentes e desenvolvedores trabalhando neste projeto.

---

## 🏛️ Arquitetura e Estrutura de Pastas

A estrutura do projeto é inspirada no padrão moderno para aplicações React com Vite, mantendo simplicidade, escalabilidade e separação limpa de responsabilidades:

```text
vite-project/
├── public/                 # Arquivos estáticos servidos diretamente (favicon, manifest, SVGs raiz)
└── src/
    ├── assets/             # ASSETS: Arquivos estáticos locais (imagens, logos, ícones específicos)
    ├── components/         # COMPONENTS: Elementos de UI reutilizáveis (um por pasta com index.tsx)
    │   ├── Button/
    │   │   └── index.tsx
    │   ├── Card/
    │   │   └── index.tsx
    │   ├── Sidebar/
    │   │   └── index.tsx
    │   └── TopBar/
    │       └── index.tsx
    ├── contexts/           # CONTEXTS: Contextos de estado global com React Context API
    ├── hooks/              # HOOKS: Lógica e hooks customizados reutilizáveis (use...)
    ├── layouts/            # LAYOUTS: Modelos e cascas de layout de página (AppLayout, AuthLayout, etc.)
    │   └── Layout/
    │       └── index.tsx
    ├── pages/              # PAGES: Telas e visões das rotas da aplicação (uma por pasta com index.tsx)
    │   ├── Home/
    │   │   └── index.tsx
    │   └── Dashboard/
    │       └── index.tsx
    ├── routes/             # Definição e configuração centralizada de rotas (AppRoutes)
    │   └── index.tsx
    ├── services/           # SERVICES: Integrações com APIs, clientes HTTP e serviços externos
    ├── store/              # STORE: Gerenciamento de estado global complexo (ex: Zustand, Redux)
    ├── styles/             # STYLES: Estilos globais, temas e variáveis de composição
    │   └── app.css
    ├── types/              # Definições de tipos e interfaces TypeScript compartilhadas
    ├── utils/              # UTILS: Funções utilitárias e helpers genéricos puros
    ├── App.tsx             # Orquestração da aplicação e roteamento
    ├── main.tsx            # Ponto de entrada, ThemeProvider e estilos base do AcioleUI
    └── vite-env.d.ts
```

### Padrão de Organização de Componentes e Páginas

- **Component Example**: Cada componente vive em sua própria pasta com estrutura consistente:
  - `src/components/NomeDoComponente/index.tsx`
- **Page Example**: Páginas seguem o mesmo padrão:
  - `src/pages/NomeDaPagina/index.tsx`
- Crie arquivos locais específicos (ex: `styles.ts` ou tipos locais) apenas quando estritamente necessários para aquela unidade.

---

## 🎯 Regras Obrigatórias para Agentes

### 1. Uso Obrigatório das Skills em `.agents`

- **Sempre consulte e siga as skills disponíveis em `.agents/skills/`**, em especial a skill `acioleui-design` (`.agents/skills/acioleui-design/SKILL.md`).
- Utilize as diretrizes de tokens, acessibilidade, providers e convenções documentadas nas skills antes de qualquer implementação de UI.

### 2. Prioridade Absoluta ao AcioleUI (Componentes e Ícones)

- **SEMPRE utilize os componentes e ícones da biblioteca `acioleui`** antes de criar qualquer elemento próprio ou instalar bibliotecas de terceiros.
- Reutilize os componentes fundamentais: botões (`Button`), inputs, modais/diálogos, cards, cabeçalhos (`PageHeader`), navegação (`Sidebar`, `TopBar`), ícones da biblioteca e componentes de layout.
- Não recrie componentes que já existam no AcioleUI.

### 3. Uso Mínimo de CSS (Apenas quando estritamente necessário)

- **Só escreva CSS quando for estritamente necessário**.
- Prefira e priorize sempre os componentes de layout do AcioleUI (`Flex`, `Box`, `Grid`, etc.) e suas propriedades de composição (`gap`, `direction`, `align`, `justify`, etc.).
- Utilize os tokens semânticos e variáveis de design system fornecidos pelo AcioleUI (cores, espaçamentos, tipografia, elevações) em vez de valores arbitrários em CSS.

### 4. Responsividade Obrigatória

- **Todas as interfaces, páginas e componentes DEVEM ser 100% responsivos**.
- Garanta que layouts se adaptem de forma fluida e funcional em dispositivos móveis (smartphones), tablets e desktops.
- Respeite quebras de linha adequadas, overflow controlado e navegações adaptáveis para telas menores.

### 5. Preservação do `ThemeProvider` e Acessibilidade

- Mantenha o `ThemeProvider` no topo da árvore de componentes (em `src/main.tsx`).
- Não adicione provedores duplicados (ex: `ToastProvider`), pois o `ThemeProvider` já inclui a infraestrutura necessária.
- Preserve semântica HTML, tags adequadas, contraste de cores e atributos de acessibilidade (ARIA labels, estados de foco navegáveis por teclado).

### 6. Separação de Camadas

- Mantenha estritamente separados:
  - **UI / Apresentação** (`components/`, `pages/`, `layouts/`)
  - **Lógica e Estado** (`hooks/`, `contexts/`, `store/`)
  - **Integração de Dados** (`services/`)
- Evite regras de negócio pesadas dentro de arquivos puramente visuais.

### 7. Validação Contínua

- Valide todas as alterações executando:
  ```bash
  npm run validate
  ```
  (ou `npm run lint`, `npm run format:check` e `npm run build`).
- Garanta que nenhum commit ou alteração introduza erros de compilação TypeScript, warnings de lint ou quebras de formatação.
