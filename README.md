# Caleb Labs — Developer Portfolio

A premium, multi-sector portfolio showcasing tech, culinary, and client-service expertise. Built with React 18, TypeScript, and Tailwind CSS 4, featuring a Supabase-powered backend, a private Chrome Extension CMS, an intelligent FAQ chatbot, 10 developer utilities, and deep-space UI animations.

**Live**: [caleblabs.pro](https://caleblabs.pro)

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Intelligent Chatbot** | 3-tier matching engine (intent → fuzzy → smart fallback) with 60+ FAQ entries and contextual follow-up suggestion chips |
| **LabTools Suite** | 10 browser-based developer utilities — JSON→TS, JWT Decoder, Regex Tester, Cron Translator, Base64, Bcrypt, Color Converter, Markdown Preview, Secure Key Gen, Neon Shadow |
| **Deep Space Theme** | Canvas-rendered twinkling star field, shooting stars, particle network with mouse interaction |
| **Instant Theme Toggle** | Shared zustand store syncs dark/light instantly across all components including the chatbot |
| **Dynamic Branding** | Logo label (`.TECH` / `.CULINARY` / `.SERVICE` / `.LABTOOLS`) and browser tab title switch mid-splash per route |
| **Node Grid** | Auto-populated project cards from GitHub + Vercel with live iframe previews and README modals |
| **Private CMS** | Custom Chrome Extension built with Vite + React for remote, authenticated portfolio management |
| **Node Grid** | Auto-populated project cards from GitHub + Vercel with live iframe previews and README modals |
| **Supabase Backend** | Secure, real-time fetching from Supabase Postgres and Storage |

## 🚀 Tech Stack

| Layer | Technologies |
|---|---|
| **Core** | React 18, TypeScript, Vite 7, React Router 7 |
| **Backend** | Supabase (Postgres, Storage, Auth) |
| **Styling** | Tailwind CSS 4, `@tailwindcss/typography` |
| **Animation** | Framer Motion, HTML5 Canvas |
| **State** | Zustand (theme, chat, navigation) |
| **Chatbot** | Fuse.js fuzzy search, intent classification |
| **Fonts** | Inter, Space Grotesk, JetBrains Mono (Google Fonts) |
| **Markdown** | react-markdown, rehype-sanitize, rehype-raw, remark-gfm |
| **Testing** | Vitest (102 chatbot tests) |

## 📦 Getting Started

```bash
# Clone
git clone https://github.com/casdy/portfolio-caleb.git
cd portfolio-caleb

# Install
npm install

# Environment setup
cp .env.example .env.local
# Add your GITHUB_ACCESS_TOKEN, VC_ACCESS_TOKEN, VC_TEAM_ID
# Add VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY

# Dev server (auto-fetches project data)
npm run dev

# Production build
npm run build

# Run tests
npm test
```

## 🏗️ Project Structure

```
├── scripts/                  # Pre-build data fetchers
├── src/
│   ├── bot/                  # Chatbot engine (useChatbot, faqData, tests)
│   ├── components/
│   │   ├── common/           # Navbar, Footer, Logo, ThemeToggle, BackgroundAnimation
│   │   ├── home/             # Hero, NodeGrid, project cards
│   │   ├── culinary/         # Timeline, SkillsMenu, DishGallery
│   │   ├── service/          # ServiceHighlights, CompanyLogos
│   │   ├── tools/            # 10 LabTools utilities
│   │   └── ui/               # PageSplash skeleton system
│   ├── hooks/                # useDarkMode (zustand-backed)
│   ├── store/                # chatStore, navigationStore
│   ├── pages/                # Home, Culinary, Service, LabTools
│   └── types/                # TypeScript interfaces
├── index.html
├── vite.config.ts
└── security_report.md
```

## 🔒 Security

- **Supabase RLS** — Row Level Security ensures read-only public access and authenticated-only inserts
- **Content Security Policy** — restricts script execution to trusted origins
- **XSS Protection** — HTML sanitization on markdown via `rehype-sanitize`
- **TypeScript Strict Mode** — compile-time error detection
- **NIST CSF 2.0 Tier 3** — see [security_report.md](./security_report.md)

## 🔒 Security Updates

- Fixed **jspdf** (script injection) by upgrading to `^4.2.1`.
- Resolved **minimatch** ReDoS vulnerability via `npm audit fix`.
- Patched **rollup** arbitrary file write issue via `npm audit fix`.
- Confirmed **serialize-javascript** is not present.

These changes bring the project to **0 vulnerabilities** as reported by `npm audit`.


## 📝 License

Private — not licensed for public use.

---

**Built with ❤️ by Caleb Ojukwu**
