import { FAQItem } from '../types/chat';

export const faqData: FAQItem[] = [
  // --- GLOBAL CONTEXT ---
  {
    id: "g1",
    intent: "greeting",
    keywords: ["hello", "hi", "hey", "sup", "yo", "morning", "howdy"],
    question: "Hello!",
    answer: "Hey there! Welcome to Caleb Labs. I'm the digital assistant. I can answer questions about Caleb's tech projects, culinary background, or customer service experience. What would you like to know?",
    routeContext: ["global"]
  },
  {
    id: "g2",
    intent: "location",
    keywords: ["where", "live", "located", "city", "country", "locaton", "from", "winnipeg", "manitoba", "canada", "timezone"],
    question: "Where are you located?",
    answer: "I am currently based in Winnipeg, Manitoba. I'm comfortable working locally or remotely across different time zones!",
    routeContext: ["global"]
  },
  {
    id: "g3",
    intent: "contact",
    keywords: ["contact", "email", "reach", "hire", "phone", "message", "hiring", "calab", "caleb"],
    question: "How can I contact Caleb?",
    answer: "You can reach out via my LinkedIn profile linked in the navigation, or download my resume from any of the sectors for my direct contact details.",
    routeContext: ["global"]
  },

  // --- TECH SECTOR (Route: "/") ---
  {
    id: "t1",
    intent: "tech_stack",
    keywords: ["tools", "stack", "frameworks", "teck", "stak", "use", "code", "languages", "react", "vite", "typescript", "python"],
    question: "What is your main tech stack?",
    answer: "My core stack includes React, TypeScript, Tailwind CSS, and Node.js. I'm highly proficient with build tools like Vite and frameworks like Next.js, and I often integrate AI tools and APIs into my apps.",
    routeContext: ["/", "global"]
  },
  {
    id: "t2",
    intent: "education",
    keywords: ["school", "degree", "university", "college", "graduated", "educaton", "study", "studied", "diploma"],
    question: "What is your educational background?",
    answer: "I hold a degree from the University of Winnipeg, which gave me a strong foundational understanding of problem-solving and critical thinking that I apply to my software engineering.",
    routeContext: ["/", "global"]
  },
  {
    id: "t3",
    intent: "caleb_labs",
    keywords: ["labs", "this site", "website", "built", "how", "portfolio", "nexus"],
    question: "How did you build this portfolio?",
    answer: "Caleb Labs is built entirely on the client side using Vite, React, TypeScript, and Tailwind CSS. It uses the Vercel and GitHub APIs to pull in my live projects dynamically, ensuring it's always up to date!",
    routeContext: ["/", "global"]
  },

  // --- CULINARY SECTOR (Route: "/culinary") ---
  {
    id: "c1",
    intent: "culinary_experience",
    keywords: ["cook", "cooking", "chef", "cheff", "kitchen", "food", "menu", "restaurant", "coking"],
    question: "What is your culinary background?",
    answer: "I have extensive experience managing high-pressure kitchen environments. I focus on flawless menu execution, inventory management, and maintaining top-tier food safety standards while leading a team.",
    routeContext: ["/culinary", "global"]
  },
  {
    id: "c2",
    intent: "kitchen_skills",
    keywords: ["skills", "skils", "knife", "safety", "prep", "service", "rush"],
    question: "What are your strongest kitchen skills?",
    answer: "Beyond technical cooking and knife skills, my greatest strengths are consistency during dinner rushes, precise inventory control to reduce waste, and keeping team morale high when the board is full of tickets.",
    routeContext: ["/culinary"]
  },

  // --- SERVICE SECTOR (Route: "/service") ---
  {
    id: "s1",
    intent: "service_experience",
    keywords: ["customer", "service", "clients", "support", "help", "customers"],
    question: "What is your customer service philosophy?",
    answer: "My approach to customer service is rooted in active listening and empathy. I believe in de-escalating conflicts by making the client feel heard, and then swiftly finding a practical solution that aligns with company policy.",
    routeContext: ["/service", "global"]
  },
  {
    id: "s2",
    intent: "conflict_resolution",
    keywords: ["angry", "upset", "conflict", "problem", "resolution", "resolve", "mad"],
    question: "How do you handle upset clients?",
    answer: "I stay calm, don't take it personally, and use the 'Listen, Apologize, Solve, Thank' method. Often, once a client knows you are genuinely taking ownership of their issue, the tension drops immediately.",
    routeContext: ["/service"]
  }
];
