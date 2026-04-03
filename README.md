# 🤥 Migué App — Mobile

> **faltou, mas com criatividade**

Gerador de desculpas aleatórias, criativas e engraçadas para escapar de compromissos sociais, eventos familiares, reuniões de trabalho e muito mais.

---

## 📱 Sobre o projeto

O Migué App é um aplicativo mobile construído com **React Native + Expo**, com foco em humor, leveza e compartilhamento. Gere desculpas por categoria e nível de criatividade, favorite as melhores e compartilhe com quem precisar.

---

## ✨ Funcionalidades

- 🎲 **Gerador aleatório** com filtros de categoria e nível
- ❤️ **Favoritos** — salve as desculpas que mais gostou
- 🕐 **Histórico** — acompanhe as últimas 50 desculpas geradas
- 📋 **Copiar** desculpa para a área de transferência
- 📤 **Compartilhar** diretamente por qualquer app
- 💾 **Persistência local** via AsyncStorage (sem backend)
- 110 desculpas em 6 categorias e 4 níveis de criatividade

---

## 📂 Categorias

| Emoji | Categoria |
|-------|-----------|
| 💼 | Trabalho |
| 👨‍👩‍👧‍👦 | Família |
| 🎉 | Eventos Sociais |
| 📚 | Escola/Faculdade |
| 💕 | Relacionamentos |
| 🎲 | Genéricas |

## 🎯 Níveis de criatividade

| Emoji | Nível | Descrição |
|-------|-------|-----------|
| 😊 | Leve | Para sair pela tangente com elegância |
| 😂 | Engraçada | Aquela que faz rir mas funciona |
| 🤪 | Absurda | Para quem não tem mais nada a perder |
| 💀 | Meme | Direto ao ponto, sem cerimônia |

---

## 🛠️ Stack

| Tecnologia | Uso |
|------------|-----|
| [React Native](https://reactnative.dev/) | Framework mobile |
| [Expo](https://expo.dev/) SDK 52 | Toolchain e build |
| [expo-router](https://expo.github.io/router/) | Navegação por arquivos |
| TypeScript | Tipagem estática |
| AsyncStorage | Persistência local |
| expo-clipboard | Copiar desculpas |
| expo-sharing | Compartilhar desculpas |
| @expo/vector-icons | Ícones (Ionicons) |

---

## 📁 Estrutura de pastas

```
migue_app/
├── app/
│   ├── _layout.tsx              # Root layout + AppProvider
│   ├── sobre.tsx                # Tela Sobre (modal)
│   └── (tabs)/
│       ├── _layout.tsx          # Tab bar
│       ├── index.tsx            # 🎲 Gerador
│       ├── favoritos.tsx        # ❤️ Favoritos
│       ├── historico.tsx        # 🕐 Histórico
│       └── configuracoes.tsx    # ⚙️ Configurações
├── src/
│   ├── components/
│   │   ├── DesculpaCard.tsx
│   │   ├── DesculpaListItem.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── LevelFilter.tsx
│   ├── context/
│   │   └── AppContext.tsx
│   ├── data/
│   │   └── desculpas.ts         # 110 desculpas categorizadas
│   ├── hooks/
│   │   └── useDesculpas.ts
│   ├── types/
│   │   └── index.ts
│   ├── constants/
│   │   ├── colors.ts
│   │   └── categories.ts
│   └── utils/
│       └── storage.ts
├── assets/
├── app.json
├── babel.config.js
├── package.json
└── tsconfig.json
```

---

## 🚀 Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Expo Go](https://expo.dev/client) no celular (Android ou iOS)

### Instalação

```bash
# Na raiz do projeto
npm install
```

### Desenvolvimento

```bash
npx expo start
```

Escaneie o QR Code com o **Expo Go** no celular.

### Build para dispositivo

```bash
# Android
npx expo start --android

# iOS (requer macOS)
npx expo start --ios
```

---

## 🎨 Design

| Variável | Cor | Uso |
|----------|-----|-----|
| `background` | `#143022` | Fundo principal |
| `surface` | `#323232` | Cartões e superfícies |
| `primary` | `#317039` | Botões e ações principais |
| `secondary` | `#F1BE49` | Destaques e nível Engraçada |
| `accent` | `#F8EDD9` | Textos de destaque (creme) |
| `text` | `#FFFFFF` | Texto principal |

- **Tema escuro** com verde floresta como cor base
- Cada categoria tem sua cor identificadora
- Cada nível tem sua cor de badge

---

## 🗺️ Roadmap

- [ ] IA para gerar desculpas personalizadas
- [ ] Compartilhamento em formato de imagem
- [ ] Ranking das melhores desculpas
- [ ] Modos especiais (corporativo, família, meme)
- [ ] Mais desculpas e categorias

---

## 📄 Licença

MIT
