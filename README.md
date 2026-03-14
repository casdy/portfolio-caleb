# CalebOjukwu.ca

A modern, secure TypeScript portfolio website showcasing my tech, culinary, and service expertise. Built with React, featuring dynamic animations, dark mode support, and GitHub integration.

## ✨ Features

- **TypeScript**: Fully typed codebase for enhanced reliability and developer experience
- **Dynamic Logo**: Context-aware branding that adapts to each section (.Tech / .Culinary / .Service)
- **GitHub Integration**: Automatic project showcase with language statistics and skill badges
- **Interactive Animations**: Particle constellation background that responds to mouse movement
- **Dark Mode Support**: Seamless theme switching with persistent preferences
- **Project Modals**: Detailed README rendering with markdown support and HTML sanitization
- **Security-Hardened**: Content Security Policy, XSS protection, and automated vulnerability scanning

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

### Security

- Content Security Policy (CSP) headers
- HTML sanitization via rehype-sanitize
- Automated npm audit in CI/CD
- Strict TypeScript compiler settings

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/casdy/portfolio-caleb.git

# Navigate to project directory
cd portfolio-caleb

# Install dependencies
npm install
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit
```

The development server will start at `http://localhost:5173`.

## 🏗️ Project Structure

```
portfolio-caleb/
├── src/
│   ├── assets/              # Static assets (images, resumes)
│   ├── bot/                 # FAQ Chatbot engine (upcoming)
│   ├── components/
│   │   ├── common/          # Reusable components (Logo, Navbar, Modal, etc.)
│   │   ├── home/            # Home page components
│   │   ├── culinary/        # Culinary section components
│   │   ├── service/         # Service section components
│   │   └── tools/           # LabTools utilities
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   └── api/             # API clients (GitHub, Vercel)
│   ├── pages/               # Route pages (Home, Culinary, Service, LabTools)
│   ├── store/               # Global state management (Zustand)
│   ├── types/               # TypeScript definitions
│   └── App.tsx              # Main application component
├── public/
│   ├── favicon.svg          # Portfolio favicon
│   └── previews/            # Project site previews
├── .github/                 # CI/CD workflows
├── scripts/                 # Utility scripts (preview capture)
└── security_report.md       # NIST CSF 2.0 security audit
```

## 🔒 Security

This project implements multiple security best practices:

- **Content Security Policy**: Restricts script execution to trusted sources
- **XSS Protection**: HTML sanitization on all user-generated content via rehype-sanitize
- **Dependency Scanning**: Automated npm audit via GitHub Actions
- **Type Safety**: TypeScript strict mode for compile-time error detection
- **NIST CSF 2.0 Tier 3**: Compliance with cybersecurity framework standards

See [security_report.md](./security_report.md) for the full security audit.

## 🎨 Customization

### GitHub Integration

Update the GitHub username in `src/hooks/useGitHubRepos.ts`:

```typescript
const GITHUB_USERNAME = "your-username-here";
```

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
