<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Three.js-0.183-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0066?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

# ✨ PromptArchive — AI System Prompts Explorer

> 🔍 A beautifully crafted, open-source web app to **explore, search, and compare** the hidden system prompts powering today's most popular AI tools.

---

## 🌟 Overview

**PromptArchive** is a modern, developer-focused platform that lets you peek behind the curtain of AI assistants. Browse a curated archive of **real system prompts** from 30+ AI tools — organized by category, searchable, and comparable side-by-side.

Whether you're a prompt engineer, AI researcher, or just curious about what makes ChatGPT tick, PromptArchive is built for you.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🧠 **AI Tool Explorer** | Browse 30+ AI tools across 4 categories: General AI, Developer AI, Creative AI & Infrastructure |
| 🔎 **Instant Search** | Full-text search with keyboard shortcuts (`Ctrl+K` or `/`) — results update as you type |
| ⚖️ **Prompt Comparison** | Select any 2 tools and compare their system prompts side-by-side with diff highlighting |
| 🎨 **3 Themes** | Neon (default), Dark, and Light — persisted in localStorage |
| 🌌 **3D Background** | Interactive Three.js particle background that responds to your theme |
| ⚡ **Smooth Animations** | Page transitions, scroll progress bar, hover effects powered by Framer Motion |
| 📋 **Copy & Share** | One-click copy of any prompt, with formatted markdown rendering |
| ⌨️ **Keyboard Shortcuts** | `Ctrl+K` to search, `/` to focus search, `Esc` to go back |
| ⭐ **GitHub Stars** | Live star count fetched from the source repository |
| 📱 **Responsive Design** | Fully responsive from mobile to ultrawide displays |

---

## 🗂️ AI Tools Covered

<details>
<summary><strong>🧠 General AI (8 tools)</strong></summary>

- ChatGPT (OpenAI)
- Gemini (Google)
- Claude (Anthropic)
- Perplexity
- Microsoft Copilot
- Meta AI
- Grok (xAI)
- Mistral

</details>

<details>
<summary><strong>💻 Developer AI (12 tools)</strong></summary>

- Cursor
- Codex CLI (OpenAI)
- Replit AI
- v0 by Vercel
- Antigravity (Google DeepMind)
- Lovable
- Windsurf (Codeium)
- Devin (Cognition)
- Codeium
- GitHub Copilot
- Manus
- Augment Code
- Amp (Sourcegraph)

</details>

<details>
<summary><strong>🎨 Creative AI (8 tools)</strong></summary>

- Midjourney
- DALL·E (OpenAI)
- Stable Diffusion
- Runway
- Pika
- Leonardo AI
- Ideogram
- Kaiber

</details>

<details>
<summary><strong>⚙️ Infrastructure (8 tools)</strong></summary>

- HuggingFace
- LangChain
- OpenRouter
- Together AI
- Replicate
- Groq
- Ollama
- DeepSeek

</details>

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev) |
| **Build Tool** | [Vite 7](https://vite.dev) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) |
| **3D Graphics** | [Three.js](https://threejs.org) + [@react-three/fiber](https://r3f.docs.pmnd.rs) + [@react-three/drei](https://drei.docs.pmnd.rs) |
| **Animations** | [Framer Motion 12](https://motion.dev) |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Markdown** | [react-markdown](https://remarkjs.github.io/react-markdown/) + [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) |

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools.git

# 2. Navigate into the web app directory
cd prompt-archive-web

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173/**

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

---

## 📁 Project Structure

```
prompt-archive-web/
├── public/                     # Static assets
├── src/
│   ├── components/             # React UI components
│   │   ├── CompareView.jsx     #   ⚖️ Side-by-side prompt comparison
│   │   ├── ErrorBoundary.jsx   #   🛡️ Error boundary wrapper
│   │   ├── HeroSection.jsx     #   🏠 Landing hero with stats
│   │   ├── PromptCard.jsx      #   📄 Individual prompt card
│   │   ├── PromptDetail.jsx    #   📝 Full prompt viewer with markdown
│   │   ├── SearchView.jsx      #   🔎 Search results page
│   │   ├── ToolCard.jsx        #   🃏 AI tool card in grid
│   │   ├── ToolDetailView.jsx  #   🔍 Tool detail with prompt list
│   │   ├── ToolIcon.jsx        #   🎨 Dynamic tool icon renderer
│   │   └── ToolsGrid.jsx       #   📊 Filterable tool grid layout
│   ├── data/
│   │   └── toolsData.js        # AI tools metadata & categories
│   ├── hooks/
│   │   ├── useDebouncedValue.js # Input debouncing
│   │   ├── useGitHubStars.js    # Live GitHub star count
│   │   └── useKeyboardShortcuts.js # Keyboard shortcut handler
│   ├── motion/
│   │   ├── constants.js        # Animation duration & easing
│   │   └── useMotionPreferences.js # Reduced-motion support
│   ├── utils/
│   │   └── formatting.js       # Text formatting utilities
│   ├── 3d/                     # Three.js scene components
│   ├── App.jsx                 # Main application with routing
│   ├── Background3D.jsx        # 3D particle background
│   ├── constants.js            # App-wide constants
│   ├── index.css               # Global styles & design tokens
│   ├── main.jsx                # React DOM entry point
│   └── prompts.json            # 📦 Prompt archive data (~1.7MB)
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

---

## 🎨 Themes

PromptArchive ships with **3 beautiful themes** — toggle them from the header:

| Theme | Description |
|---|---|
| ⚡ **Neon** (default) | Cyberpunk-inspired with neon glows, glassmorphism panels, and glowing gradients |
| 🌙 **Dark** | Clean dark mode with subtle borders and muted tones |
| ☀️ **Light** | Warm, paper-like aesthetic with soft shadows and earthy accents |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + K` | Open / focus search |
| `/` | Focus search bar |
| `Esc` | Go back / close current view |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Adding a New AI Tool

To add a new AI tool to the explorer, add an entry to the `TOOLS` array in [`src/data/toolsData.js`](src/data/toolsData.js):

```js
{
    id: 'your-tool',
    name: 'Your Tool',
    category: 'general', // general | developer | creative | infrastructure
    description: 'Short description of the tool',
    color: '#hexcolor',
    iconSlug: 'simpleicons-slug', // from simpleicons.org, or null
    companyKeys: ['Company Name'],  // must match company field in prompts.json
    initials: 'YT', // fallback when no icon
},
```

---

## 📜 License

This project is open source. See the source repository for license details.

---

## 🙏 Credits

- **Prompt Data** sourced from [system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)
- **Icons** via [Simple Icons](https://simpleicons.org) and [Lucide](https://lucide.dev)
- Built with ❤️ using React, Vite, Tailwind CSS, Three.js & Framer Motion

---

<p align="center">
  <strong>⭐ Star the repo if you find PromptArchive useful!</strong>
</p>
