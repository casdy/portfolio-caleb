import { FAQItem } from '../types/chat';

export const faqData: FAQItem[] = [
  // ═══════════════════════════════════════════════════════════════
  // GREETINGS & SMALL TALK
  // ═══════════════════════════════════════════════════════════════
  {
    id: "greet_1",
    intent: "greeting",
    keywords: ["hi", "hello", "hey", "howdy", "yo", "sup", "greetings", "whats up", "what's up", "hiya", "good morning", "good afternoon", "good evening"],
    question: "Hello!",
    answer: "Hey there! 👋 Welcome to Caleb Labs. I'm the on-board assistant — ask me about Caleb's technical architecture, projects, or the LABTOOLS suite!",
    routeContext: ["global"]
  },
  {
    id: "greet_2",
    intent: "how_are_you",
    keywords: ["how are you", "how you doing", "how's it going", "what's good", "how do you do", "feeling"],
    question: "How are you?",
    answer: "I'm running at peak efficiency! 🚀 Ready to discuss high-performance React architectures, AI-integrated tooling, or real-time data orchestration. What's on your mind?",
    routeContext: ["global"]
  },
  {
    id: "greet_3",
    intent: "thanks",
    keywords: ["thanks", "thank you", "thx", "appreciate", "cheers", "ty", "grateful", "thank"],
    question: "Thank you!",
    answer: "You're welcome! 😊 If you have any more technical questions about Caleb's work or this portfolio, don't hesitate to ask.",
    routeContext: ["global"]
  },
  {
    id: "greet_4",
    intent: "goodbye",
    keywords: ["bye", "goodbye", "see you", "later", "cya", "peace", "take care", "farewell", "gtg", "gotta go"],
    question: "Goodbye!",
    answer: "See you around! 🖖 Feel free to come back anytime. Don't forget to check out the project nodes and download Caleb's technical resume before you go!",
    routeContext: ["global"]
  },
  {
    id: "greet_5",
    intent: "nice",
    keywords: ["cool", "nice", "awesome", "great", "wow", "amazing", "impressive", "sick", "dope", "fire", "love it", "incredible"],
    question: "This is cool!",
    answer: "Thanks! This entire portfolio was designed as a technical showcase, built with a React + Vite monorepo structure, utilizing TypeScript for strict type safety and Framer Motion for hardware-accelerated animations. Glad you're enjoying the engineering! ✨",
    routeContext: ["global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // WHO IS CALEB — IDENTITY & BACKGROUND (TECH FOCUSED)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "g1",
    intent: "who_is_caleb",
    keywords: ["who", "caleb", "ojukwu", "about", "background", "developer", "calab", "creator", "yourself", "introduce", "tell me about", "who made this"],
    question: "Who is Caleb Ojukwu?",
    answer: "Caleb Ojukwu is a Staff-Level Frontend Architect and Full-Stack Engineer based in Winnipeg, Canada. He specializes in building high-performance web applications, developer-centric tooling, and integrating large language models (LLMs) into production workflows.",
    routeContext: ["global"]
  },
  {
    id: "g1b",
    intent: "where_located",
    keywords: ["where", "located", "live", "based", "city", "country", "location", "from", "hometown", "winnipeg", "canada", "manitoba"],
    question: "Where is Caleb located?",
    answer: "Caleb is based in Winnipeg, Manitoba, Canada. He's open to remote senior-level engineering leadership roles worldwide.",
    routeContext: ["global"]
  },
  {
    id: "g1c",
    intent: "career_switch",
    keywords: ["switch", "career", "change", "transition", "why tech", "pivot", "how did you", "start coding", "become developer", "journey"],
    question: "How did Caleb transition into tech?",
    answer: "Caleb's transition into tech was driven by a deep fascination with complex systems and software orchestration. He leverages a background in high-pressure operational environments to bring unmatched discipline, rapid problem-solving, and decisive leadership to engineering teams.",
    routeContext: ["global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // CONTACT & JOB FIT ALGORITHM
  // ═══════════════════════════════════════════════════════════════
  {
    id: "job_fit_calc",
    intent: "hiring",
    keywords: ["jobs", "roles", "hire", "fit", "positions", "hiring", "recruit", "available", "opportunity", "position", "work", "job", "career"],
    question: "Are you available for hire?",
    answer: "Based on Caleb's architectural experience with high-performance React applications, AI-integrated tooling, and real-time data orchestration, he is an ideal fit for the following roles:\n\n- **Senior Frontend Engineer**\n\n- **Full-Stack Developer (React/Node)**\n\n- **AI Integrations Engineer**\n\n- **Frontend Infrastructure/Platform Engineer**\n\nIf you are recruiting for these positions, I highly recommend downloading his resume from the main dashboard.",
    routeContext: ["global"]
  },
  {
    id: "g2",
    intent: "contact_info",
    keywords: ["contact", "email", "phone", "hire", "reach", "message", "linkedin", "connect", "get in touch", "talk to"],
    question: "How can I contact you?",
    answer: "You can reach out to Caleb via his LinkedIn profile or locate direct contact details on his technical resume. He is currently prioritizing inquiries related to Senior Frontend and AI Platform roles.",
    routeContext: ["global"]
  },
  {
    id: "g3",
    intent: "download_resume",
    keywords: ["resume", "cv", "download", "pdf", "get", "resum", "experience", "hire", "document", "credentials"],
    question: "Can I download your resume?",
    answer: "Yes! You can download Caleb's comprehensive Technical Resume directly from the dashboard. It details his experience with React architectures, Node.js backend systems, and AI integration strategies.",
    routeContext: ["global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // TECH SKILLS — ARCHITECTURAL DEPTH
  // ═══════════════════════════════════════════════════════════════
  {
    id: "t3",
    intent: "tech_stack",
    keywords: ["stack", "stak", "tools", "teck", "languages", "frameworks", "react", "node", "use", "code", "technology", "tech stack", "technologies"],
    question: "What is your primary tech stack?",
    answer: "Caleb's core architecture primarily utilizes **React 18/19**, **Next.js 14/15 (App Router)**, and **TypeScript** for the frontend. On the backend, he orchestrates **Node.js** environments integrated with **OpenRouter LLM** APIs, **PostgreSQL** for relational data, and **Zustand** or **Redux** for state management.",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_react",
    intent: "react_skill",
    keywords: ["react", "reactjs", "react.js", "component", "hooks", "useState", "useEffect", "jsx", "tsx", "reakt"],
    question: "Tell me about your React experience.",
    answer: "Caleb builds performant React applications with a focus on atomicity, reusable component pattern libraries, and complex hook-based state logic. He specializes in optimizing render cycles and implementing hardware-accelerated transitions via Framer Motion.",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_ts",
    intent: "typescript_skill",
    keywords: ["typescript", "ts", "typed", "types", "interfaces", "typscript", "type safety", "strongly typed"],
    question: "Do you use TypeScript?",
    answer: "Strictly. Caleb enforces TypeScript across the entire monorepo to ensure architectural integrity, utilizing advanced generics, union types, and Zod for runtime schema validation.",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_nextjs",
    intent: "nextjs_skill",
    keywords: ["next", "nextjs", "next.js", "ssr", "server side", "server-side rendering", "vercel framework"],
    question: "Do you work with Next.js?",
    answer: "Yes. Caleb leverages Next.js for Server-Side Rendering (SSR), Static Site Generation (SSG), and Edge Middleware. He is particularly experienced in implementing complex authentication and data fetching patterns within the App Router architecture.",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_ai",
    intent: "ai_skill",
    keywords: ["ai", "artificial intelligence", "machine learning", "ml", "gpt", "openai", "chatbot", "bot", "llm", "model", "orchestration", "openrouter"],
    question: "Do you work with AI?",
    answer: "Modern AI orchestration is a core focus. Caleb integrates LLMs via OpenRouter, implementing complex prompt chaining, RAG (Retrieval-Augmented Generation) patterns, and real-time streaming data interfaces in applications like PlanR.",
    routeContext: ["/", "global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // PORTFOLIO & LABTOOLS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "t1",
    intent: "portfolio_tech",
    keywords: ["built", "how", "portfolio", "website", "stack", "react", "vite", "typescript", "framer", "animations", "this site", "made this"],
    question: "How was this Caleb Labs portfolio built?",
    answer: "This is a high-performance React application built with Vite and Tailwind CSS v4. It features a custom-built, client-side NLP engine for this chatbot, dynamic project fetching from the GitHub/Vercel APIs, and a specialized suite of browser-based developer utilities in LABTOOLS.",
    routeContext: ["/", "global"]
  },
  {
    id: "l1",
    intent: "what_is_labtools",
    keywords: ["labtools", "tools", "utilities", "hub", "sector", "features", "what", "developer tools", "dev tools"],
    question: "What is the LABTOOLS sector?",
    answer: "LABTOOLS is a technical utility hub containing browser-native tools like a JSON to TypeScript converter, JWT decoder, and Regex tester. Every tool runs 100% client-side, ensuring zero latency and absolute data privacy.",
    routeContext: ["/labtools", "global"]
  },
  {
    id: "sum_tech",
    intent: "page_summary",
    keywords: ["page", "tab", "about", "here", "looking", "what", "summary", "explain", "where", "am", "i", "nexus", "this page"],
    question: "What is this page about?",
    answer: "You are on the Tech Nexus — the main hub for exploring Caleb's production-grade projects and open-source contributions.",
    routeContext: ["/"]
  },
  {
    id: "sum_labtools",
    intent: "page_summary",
    keywords: ["page", "tab", "about", "here", "looking", "what", "summary", "explain", "where", "am", "i", "sector", "hub", "this page"],
    question: "What is this page about?",
    answer: "You're exploring LABTOOLS — a collection of high-performance developer utilities. These tools are built to streamline common development tasks without ever sending your data to a server.",
    routeContext: ["/labtools"]
  },
  {
    id: "help_1",
    intent: "help",
    keywords: ["help", "can you", "what can", "do you", "capable", "features", "options", "commands", "assist"],
    question: "What can you help me with?",
    answer: "I am specialized in Caleb's professional technical profile. Try asking about: his core tech stack (React, Next.js, Node), AI integration strategies, architectural philosophy, his technical resume, or the specific utilities available in LABTOOLS. 🎯",
    routeContext: ["global"]
  }
];
