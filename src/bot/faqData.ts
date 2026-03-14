import { FAQItem } from '../types/chat';

export const faqData: FAQItem[] = [
  // --- GLOBAL CONTEXT ---
  {
    id: "g1",
    intent: "who_is_caleb",
    keywords: ["who", "caleb", "ojukwu", "about", "background", "developer", "calab", "creator"],
    question: "Who is Caleb Ojukwu?",
    answer: "I am a Full-Stack Web Developer based in Winnipeg, Manitoba, with additional professional experience in culinary arts and customer service.",
    routeContext: ["global"]
  },
  {
    id: "g2",
    intent: "contact_info",
    keywords: ["contact", "email", "phone", "hire", "reach", "message", "linkedin", "connect"],
    question: "How can I contact you?",
    answer: "You can reach out to me via my LinkedIn profile, which is linked in the navigation, or find my direct contact details on any of my downloadable resumes.",
    routeContext: ["global"]
  },
  {
    id: "g3",
    intent: "download_resume",
    keywords: ["resume", "cv", "download", "pdf", "get", "resum", "experience", "hire"],
    question: "Can I download your resume?",
    answer: "Yes! Because I have distinct career paths, I offer three tailored resumes. You can download my Tech, Culinary, or Customer Service resume by visiting their respective sector pages and clicking the 'Download Data' button.",
    routeContext: ["global"]
  },

  // --- TECH & HOME SECTOR (Route: "/") ---
  {
    id: "t1",
    intent: "portfolio_tech",
    keywords: ["built", "how", "portfolio", "website", "stack", "react", "vite", "typescript", "framer", "animations"],
    question: "How was this Caleb Labs portfolio built?",
    answer: "This portfolio is a highly optimized, client-side application built using Vite, React, TypeScript, Tailwind CSS, and Framer Motion for the cyber-space animations and transitions.",
    routeContext: ["/", "global"]
  },
  {
    id: "t2",
    intent: "project_population",
    keywords: ["populate", "projects", "api", "vercel", "github", "live", "dynamic", "fetch", "showcase", "repos"],
    question: "How do you populate the projects on the main Tech homepage?",
    answer: "The project nodes are completely dynamic. The site connects to the Vercel API to fetch my live production deployments and the GitHub API to fetch my open-source code repositories in real-time.",
    routeContext: ["/"]
  },
  {
    id: "t3",
    intent: "tech_stack",
    keywords: ["stack", "stak", "tools", "teck", "languages", "frameworks", "react", "node", "use", "code"],
    question: "What is your primary tech stack?",
    answer: "My core stack focuses on modern frontend and full-stack ecosystems, including React, Next.js, TypeScript, Tailwind CSS, and Node.js. I also integrate AI tools and external APIs into my applications.",
    routeContext: ["/", "global"]
  },
  {
    id: "t4",
    intent: "education",
    keywords: ["degree", "school", "university", "college", "graduated", "educaton", "winnipeg", "study"],
    question: "Where did you get your degree?",
    answer: "I hold a degree from the University of Winnipeg, which provided me with a strong foundation in critical thinking and complex problem-solving.",
    routeContext: ["/", "global"]
  },
  {
    id: "t5",
    intent: "interact_projects",
    keywords: ["interact", "click", "projects", "playground", "readme", "modal", "test", "demo", "view"],
    question: "How do I interact with your tech projects?",
    answer: "Click on any glowing project node on the main grid. If it has a live deployment, it will open an interactive playground right on the screen. If it's a code repository, it will display a clean, formatted README.",
    routeContext: ["/"]
  },

  // --- LABTOOLS SECTOR (Route: "/labtools") ---
  {
    id: "l1",
    intent: "what_is_labtools",
    keywords: ["labtools", "tools", "utilities", "hub", "sector", "features", "what"],
    question: "What is the LABTOOLS sector?",
    answer: "LABTOOLS is a built-in developer utility hub containing pre-packaged tools, such as a JSON to TypeScript interface converter, a JWT decoder, and a Cron expression translator, ready to use directly in your browser.",
    routeContext: ["/labtools", "global"]
  },
  {
    id: "l2",
    intent: "labtools_security",
    keywords: ["secure", "security", "privacy", "data", "safe", "server", "client-side", "backend", "save"],
    question: "Are the utilities in the LABTOOLS sector secure to use with my own data?",
    answer: "Absolutely. Every tool in the LABTOOLS sector executes 100% client-side in your browser. No data, tokens, or inputs are ever sent to a backend server.",
    routeContext: ["/labtools"]
  },

  // --- CULINARY SECTOR (Route: "/culinary") ---
  {
    id: "c1",
    intent: "culinary_background",
    keywords: ["culinary", "cook", "chef", "kitchen", "food", "restaurant", "coking", "cheff", "management"],
    question: "What is your background in the culinary industry?",
    answer: "I have extensive experience managing high-pressure kitchen environments. My strengths include menu execution, strict food safety compliance, and maintaining team efficiency during intense dinner rushes.",
    routeContext: ["/culinary", "global"]
  },

  // --- SERVICE SECTOR (Route: "/service") ---
  {
    id: "s1",
    intent: "service_approach",
    keywords: ["customer", "service", "conflict", "resolution", "angry", "upset", "clients", "help", "support", "empathy"],
    question: "What is your approach to customer service and conflict resolution?",
    answer: "My approach is rooted in active listening and empathy. I focus on de-escalating conflicts by ensuring clients feel heard, and then swiftly finding practical solutions that align with company policies.",
    routeContext: ["/service", "global"]
  },

  // --- CONTEXT-AWARE SUMMARIES (The "What is this page?" feature) ---
  
  // 1. Tech / Homepage Summary
  {
    id: "sum_tech",
    intent: "page_summary",
    keywords: ["page", "tab", "about", "here", "looking", "what", "summary", "explain", "where", "am", "i", "nexus"],
    question: "What is this page about?",
    answer: "You are currently on the Tech Nexus, the main hub of Caleb Labs. Here you can explore my software engineering portfolio, interact with my live web apps, and view my open-source code repositories.",
    routeContext: ["/"]
  },
  
  // 2. Culinary Summary
  {
    id: "sum_culinary",
    intent: "page_summary",
    keywords: ["page", "tab", "about", "here", "looking", "what", "summary", "explain", "where", "am", "i", "sector"],
    question: "What is this page about?",
    answer: "You're viewing the Culinary Sector. This page highlights my professional experience in the kitchen, focusing on kitchen management, food safety, and menu execution. You can also download my culinary-specific resume here.",
    routeContext: ["/culinary"]
  },
  
  // 3. Service Summary
  {
    id: "sum_service",
    intent: "page_summary",
    keywords: ["page", "tab", "about", "here", "looking", "what", "summary", "explain", "where", "am", "i", "sector"],
    question: "What is this page about?",
    answer: "This is the Customer Service Sector. It outlines my professional experience in client relations, de-escalation, and communication. My customer service resume is available for download on this page.",
    routeContext: ["/service"]
  },
  
  // 4. LabTools Summary
  {
    id: "sum_labtools",
    intent: "page_summary",
    keywords: ["page", "tab", "about", "here", "looking", "what", "summary", "explain", "where", "am", "i", "sector", "hub"],
    question: "What is this page about?",
    answer: "You are exploring LABTOOLS, a collection of fully functional, client-side developer utilities I built. You can use tools like the JSON to TypeScript converter or the JWT decoder safely right here in your browser.",
    routeContext: ["/labtools"]
  },

  // 5. Global Fallback Summary (If they ask on a 404 page or unmapped route)
  {
    id: "sum_global",
    intent: "page_summary",
    keywords: ["page", "tab", "about", "here", "looking", "what", "summary", "explain", "where", "am", "i", "website", "site"],
    question: "What is this website about?",
    answer: "You are exploring Caleb Labs! Use the top navigation to view my tech projects, check out my culinary and customer service backgrounds, or try out my custom developer utilities.",
    routeContext: ["global"]
  },

  // --- ADDITIONAL "SMART" QUESTIONS ---

  {
    id: "smart_1",
    intent: "navigation_help",
    keywords: ["navigate", "how", "find", "menu", "around", "switch", "go", "nav"],
    question: "How do I navigate this site?",
    answer: "You can use the main navigation bar at the top of the screen to switch between the Tech Nexus, Culinary Sector, Service Sector, and LABTOOLS.",
    routeContext: ["global"]
  },
  {
    id: "smart_2",
    intent: "what_is_node",
    keywords: ["node", "nodes", "card", "box", "glowing", "mean", "represent"],
    question: "What are these glowing nodes?",
    answer: "Each glowing 'node' represents one of my projects. 'Live Nodes' are production apps pulled from Vercel that you can use right here. 'Archive Nodes' are code repositories pulled from GitHub.",
    routeContext: ["/"]
  },
  {
    id: "smart_3",
    intent: "hiring",
    keywords: ["hire", "hiring", "job", "work", "available", "freelance", "opportunity", "employ"],
    question: "Are you available for hire?",
    answer: "Yes, I am actively looking for new opportunities! Please download the resume that best fits your needs or connect with me on LinkedIn to discuss how I can bring value to your team.",
    routeContext: ["global"]
  },
  {
    id: "smart_4",
    intent: "mobile_friendly",
    keywords: ["mobile", "phone", "tablet", "responsive", "break", "screen"],
    question: "Is this website mobile friendly?",
    answer: "Yes. Caleb Labs is built with a responsive, mobile-first design. All the project playgrounds, tools, and even this chat window scale perfectly to your device.",
    routeContext: ["global"]
  }
];
