![Memix Logo](client/public/memix-logo.png)

# Memix – Flashcards & Decks (MERN)

Memix is a MERN application for creating, generating, and studying flashcard decks.
Users can:

- Create decks manually or generate them with AI
- Study cards in Card Mode or Quiz Mode with progress tracking
- Browse and manage personal and public decks
- Sign up, log in, and reset passwords

![App Demo](./client/public/demo.gif)

## File structure

```
.
├─ client/
│  ├─ public/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ constants/
│  │  ├─ context/
│  │  ├─ data/
│  │  ├─ hooks/
│  │  ├─ pages/
│  │  ├─ provider/
│  │  ├─ routes/
│  │  └─ util/
│  ├─ index.html
│  └─ vite.config.js
│
├─ server/
│  ├─ src/
│  │  ├─ cards/
│  │  ├─ constants/
│  │  ├─ decks/
│  │  ├─ emails/
│  │  ├─ general/
│  │  ├─ middlewares/
│  │  ├─ services/
│  │  │  └─ openAi/
│  │  ├─ users/
│  │  ├─ usersProgress/
│  │  └─ util/
│  └─ index.js
│
├─ cypress/
│  ├─ e2e/
│  ├─ fixtures/
│  ├─ plugins/
│  └─ support/
│
├─ Procfile
├─ package.json
└─ README.md
```

### Client highlights

- `src/api`: API helpers for cards, decks, users
- `src/pages`: App pages (Home, BrowseDecks, GenerateDeck, CardMode, QuizMode, etc.)
- `src/components`: Reusable UI components and modals
- `src/util`: Utilities like card progress tracking

### Server highlights

- `src/decks`, `src/cards`, `src/users`: Domain modules (models, controllers, services, routers)
- `src/services/openAi`: AI-powered deck generation
- `src/middlewares`: Authentication and error handling
- `src/emails`: Email templates (contact, report problem, reset password)

---

For development, open `client` and `server` package.json scripts; run each app locally or use the root scripts to orchestrate both.
