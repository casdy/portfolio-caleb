# Caleblabs.pro

A modern, secure TypeScript portfolio website showcasing my tech, culinary, and service expertise. Built with React, featuring dynamic animations, dark mode support, and GitHub integration.

## ✨ Features

- **Secure Pre-Build Architecture**: Projects and statistics are fetched securely at build time, preventing API key leakage.
- **FAQ Chatbot**: A context-aware assistant powered by Fuse.js for fuzzy retrieval.
- **Cyber-Skeleton UI**: Custom-themed loading states for a smooth, high-performance feel.
- **TypeScript**: Fully typed codebase for enhanced reliability and developer experience.
- **Dynamic Logo**: Context-aware branding that adapts to each section (.Tech / .Culinary / .Service).
- **GitHub & Vercel Integration**: Automatic project showcase with language statistics and live deployment links.

## 🚀 Tech Stack

### Core

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite 7** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Framer Motion** - Animation library

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **@tailwindcss/typography** - Beautiful prose styling

### GitHub Integration

- **react-markdown** - Markdown rendering
- **rehype-sanitize** - XSS protection
- **rehype-raw** - HTML in markdown
- **remark-gfm** - GitHub Flavored Markdown support

### Security & Pipeline

- **Secure Node.js Pre-Build Script**: Fetches data from GitHub and Vercel.
- **Pre-Generated JSON**: Instant project loading with zero client-side API latency.
- **Content Security Policy (CSP)**: Restricts script execution to trusted sources.
- **HTML Sanitization**: Protection on markdown rendering via `rehype-sanitize`.
- **Strict TypeScript**: Compiler settings for high-confidence code.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/casdy/portfolio-caleb.git

# Navigate to project directory
cd portfolio-caleb

# Install dependencies
npm install

# Setup Environment Variables
# Create a .env file with your VERCEL_API_TOKEN and GITHUB_TOKEN
cp .env.example .env
```

## 🛠️ Development

# Start development server (trigger pre-fetch)

npm run dev

# Build for production (trigger pre-fetch)

npm run build

# Preview production build

npm run preview

# Manual Project Data Fetch

npm run predev

```

The development server will start at `http://localhost:5173`.

## 🏗️ Project Structure

```

├── scripts/ # Secure Build Scripts (fetch-projects.ts)
├── src/
│ ├── bot/ # FAQ Chatbot (Context-aware logic)
│ ├── components/
│ │ ├── common/ # Logo, Navbar, Modal, etc.
│ │ ├── home/ # Node Grid, Hero, Projects
│ │ └── ui/ # Skeleton UI system
│ ├── data/ # Static & Generated Data (generated-projects.json)
│ ├── pages/ # Route pages
│ ├── store/ # Global state (Zustand)
│ ├── types/ # TypeScript definitions
│ └── App.tsx # Main application root
├── .env # Private tokens (ignored by git)
├── security_report.md # NIST CSF 2.0 security audit

````

## 🔒 Security

This project implements multiple security best practices:

- **Content Security Policy**: Restricts script execution to trusted sources
- **XSS Protection**: HTML sanitization on all user-generated content via rehype-sanitize
- **Dependency Scanning**: Automated npm audit via GitHub Actions
- **Type Safety**: TypeScript strict mode for compile-time error detection
- **NIST CSF 2.0 Tier 3**: Compliance with cybersecurity framework standards

See [security_report.md](./security_report.md) for the full security audit.

## 🎨 Customization

### Secure Pre-Build Integration

Update the credentials in your local `.env` file. Do NOT use the `VITE_` prefix to ensure keys remain strictly backend-only.

```bash
GITHUB_TOKEN=your_token
VERCEL_API_TOKEN=your_token
VERCEL_TEAM_ID=your_team_id
````

### Dynamic Logo

The logo automatically adapts based on route. Customize text in `src/components/common/Logo.tsx`.

### Color Scheme

Tailwind configuration supports both light and dark modes. Customize colors in `tailwind.config.js`.

## 📝 License

This project is private and not licensed for public use.

## 🙏 Acknowledgments

- Design inspired by modern portfolio best practices
- Security framework based on NIST CSF 2.0 and MITRE ATT&CK
- Icon library: [Lucide React](https://lucide.dev)

---

**Built with ❤️ by Caleb Ojukwu**
