<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Framer_Motion-FF0066?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

# ✨ PromptArchive — AI System Prompts Explorer

> 🔍 A beautifully crafted, open-source web app to **explore, search, and compare** the hidden system prompts powering today's most popular AI tools.

**[Live Demo](https://amitkadam.netlify.app)** · **[Report Bug](https://github.com/piyushkadam96k/prompts-for-ai/issues)** · **[Request Feature](https://github.com/piyushkadam96k/prompts-for-ai/issues)**

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🧠 **30+ AI Tools** | Browse tools across General AI, Developer AI, Creative AI & Infrastructure |
| 🔎 **Instant Search** | Full-text search with `Ctrl+K` — results update as you type |
| ⚖️ **Prompt Comparison** | Side-by-side diff view for any 2 tools |
| ❤️ **Favorites** | Bookmark prompts — persisted in localStorage |
| 🐦 **Social Sharing** | Share prompts directly to Twitter & LinkedIn |
| 📊 **Token Estimates** | See word count, char count & ~token estimate per prompt |
| 🎨 **3 Themes** | Neon, Dark, and Light modes |
| 🌌 **3D Background** | Interactive Three.js particle effects |
| 📖 **How to Use Guide** | Detailed guide on using system prompts |
| 👤 **About Page** | Credits & tech stack info |

---

## ⚡ Quick Start

```bash
# Clone
git clone https://github.com/piyushkadam96k/prompts-for-ai.git
cd prompts-for-ai

# Install & Run
npm install
npm run dev
```

Open **http://localhost:5173/** 🚀

---

## 🛠️ Tech Stack

**React 19** · **Vite 7** · **Tailwind CSS 4** · **Three.js** · **Framer Motion 12** · **Lenis** · **Lucide React** · **React Markdown**

---

## 📁 Project Structure

```
src/
├── components/        # UI components (11 files)
│   ├── AboutPage      # Creator credits & tech stack
│   ├── CompareView    # Side-by-side prompt comparison
│   ├── Footer         # Site footer with links
│   ├── HeroSection    # Landing hero with stats
│   ├── HowToUseGuide  # How to use guide
│   ├── PromptCard     # Prompt card with favorites
│   ├── PromptDetail   # Full prompt viewer with share
│   ├── SearchView     # Search results
│   ├── ToolCard       # AI tool card in grid
│   ├── ToolDetailView # Tool detail with prompts
│   └── ToolsGrid      # Filterable tool grid
├── hooks/             # Custom React hooks
├── data/              # AI tools metadata
├── motion/            # Animation config
├── utils/             # Formatting utilities
├── App.jsx            # Main app with routing
└── prompts.json       # Prompt archive data
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + K` | Open search |
| `/` | Focus search bar |
| `Esc` | Go back |

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 👨‍💻 Created By

**Amit Kadam** — [GitHub](https://github.com/piyushkadam96k) · [Portfolio](https://amitkadam.netlify.app)

---

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.
