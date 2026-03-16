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
    answer: "Hey there! 👋 Welcome to Caleb Labs. I'm the on-board assistant — ask me about Caleb's skills, projects, experience, or anything you see on this site!",
    routeContext: ["global"]
  },
  {
    id: "greet_2",
    intent: "how_are_you",
    keywords: ["how are you", "how you doing", "how's it going", "what's good", "how do you do", "feeling"],
    question: "How are you?",
    answer: "I'm running at peak efficiency! 🚀 Thanks for asking. What can I help you explore today — Caleb's tech projects, career background, or the tools on this site?",
    routeContext: ["global"]
  },
  {
    id: "greet_3",
    intent: "thanks",
    keywords: ["thanks", "thank you", "thx", "appreciate", "cheers", "ty", "grateful", "thank"],
    question: "Thank you!",
    answer: "You're welcome! 😊 If you have any more questions about Caleb's work or this portfolio, don't hesitate to ask.",
    routeContext: ["global"]
  },
  {
    id: "greet_4",
    intent: "goodbye",
    keywords: ["bye", "goodbye", "see you", "later", "cya", "peace", "take care", "farewell", "gtg", "gotta go"],
    question: "Goodbye!",
    answer: "See you around! 🖖 Feel free to come back anytime. Don't forget to check out the project nodes and download a resume before you go!",
    routeContext: ["global"]
  },
  {
    id: "greet_5",
    intent: "nice",
    keywords: ["cool", "nice", "awesome", "great", "wow", "amazing", "impressive", "sick", "dope", "fire", "love it", "incredible"],
    question: "This is cool!",
    answer: "Thanks! This entire portfolio was designed and coded by Caleb from scratch using React, TypeScript, Tailwind CSS and Framer Motion. Glad you're enjoying it! ✨",
    routeContext: ["global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // WHO IS CALEB — IDENTITY & BACKGROUND
  // ═══════════════════════════════════════════════════════════════
  {
    id: "g1",
    intent: "who_is_caleb",
    keywords: ["who", "caleb", "ojukwu", "about", "background", "developer", "calab", "creator", "yourself", "introduce", "tell me about", "who made this"],
    question: "Who is Caleb Ojukwu?",
    answer: "Caleb Ojukwu is a Full-Stack Web Developer based in Winnipeg, Manitoba. He bridges multiple professional worlds — from software engineering to culinary arts and customer service — bringing a unique perspective to everything he builds.",
    routeContext: ["global"]
  },
  {
    id: "g1b",
    intent: "where_located",
    keywords: ["where", "located", "live", "based", "city", "country", "location", "from", "hometown", "winnipeg", "canada", "manitoba"],
    question: "Where is Caleb located?",
    answer: "Caleb is based in Winnipeg, Manitoba, Canada. He's open to both local and remote opportunities!",
    routeContext: ["global"]
  },
  {
    id: "g1c",
    intent: "career_switch",
    keywords: ["switch", "career", "change", "transition", "why tech", "pivot", "how did you", "start coding", "become developer", "journey"],
    question: "How did Caleb transition into tech?",
    answer: "Caleb's journey into tech is fueled by a passion for problem-solving and building things. His diverse background in culinary and customer service gives him a unique edge — he understands users, thrives under pressure, and brings strong communication skills to every dev team.",
    routeContext: ["global"]
  },
  {
    id: "g1d",
    intent: "hobbies",
    keywords: ["hobbies", "hobby", "free time", "fun", "interests", "outside work", "besides coding", "spare time", "passion"],
    question: "What are Caleb's hobbies?",
    answer: "Outside of coding, Caleb is passionate about cooking, staying up-to-date with emerging tech trends, and exploring new tools and frameworks. He also enjoys gaming and creative problem-solving challenges.",
    routeContext: ["global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // CONTACT & HIRING
  // ═══════════════════════════════════════════════════════════════
  {
    id: "g2",
    intent: "contact_info",
    keywords: ["contact", "email", "phone", "hire", "reach", "message", "linkedin", "connect", "get in touch", "talk to"],
    question: "How can I contact you?",
    answer: "You can reach out to Caleb via his LinkedIn profile (linked in the navigation bar), or find direct contact details on any of his downloadable resumes. He's always open to connecting!",
    routeContext: ["global"]
  },
  {
    id: "g3",
    intent: "download_resume",
    keywords: ["resume", "cv", "download", "pdf", "get", "resum", "experience", "hire", "document", "credentials"],
    question: "Can I download your resume?",
    answer: "Yes! Caleb offers three tailored resumes for his distinct career paths. You can download the Tech, Culinary, or Customer Service resume by visiting their respective sector pages and clicking the 'Download Data' button.",
    routeContext: ["global"]
  },
  {
    id: "smart_3",
    intent: "hiring",
    keywords: ["hire", "hiring", "job", "work", "available", "freelance", "opportunity", "employ", "open to", "looking for work", "position", "recruit", "interview"],
    question: "Are you available for hire?",
    answer: "Yes, Caleb is actively looking for new opportunities! Download the resume that best fits your needs or connect with him on LinkedIn to discuss how he can bring value to your team. 🤝",
    routeContext: ["global"]
  },
  {
    id: "hire_2",
    intent: "salary",
    keywords: ["salary", "rate", "pay", "compensation", "cost", "charge", "how much", "pricing", "hourly"],
    question: "What is your salary expectation?",
    answer: "Salary discussions are best handled directly! Feel free to reach out to Caleb via LinkedIn or the contact info on his resume to discuss compensation and role specifics.",
    routeContext: ["global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // TECH SKILLS — DETAILED
  // ═══════════════════════════════════════════════════════════════
  {
    id: "t3",
    intent: "tech_stack",
    keywords: ["stack", "stak", "tools", "teck", "languages", "frameworks", "react", "node", "use", "code", "technology", "tech stack", "technologies"],
    question: "What is your primary tech stack?",
    answer: "Caleb's core stack includes React, Next.js, TypeScript, Tailwind CSS, and Node.js. He also works with Vite, Framer Motion, Zustand for state management, and integrates external APIs (GitHub, Vercel, AI services) into his applications.",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_react",
    intent: "react_skill",
    keywords: ["react", "reactjs", "react.js", "component", "hooks", "useState", "useEffect", "jsx", "tsx", "reakt"],
    question: "Tell me about your React experience.",
    answer: "React is Caleb's primary frontend framework. He builds performant SPAs using functional components, custom hooks, context API, Zustand for state management, and React Router for navigation. This portfolio itself is a React + TypeScript application!",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_ts",
    intent: "typescript_skill",
    keywords: ["typescript", "ts", "typed", "types", "interfaces", "typscript", "type safety", "strongly typed"],
    question: "Do you use TypeScript?",
    answer: "Absolutely! TypeScript is Caleb's go-to for all projects. He leverages type safety, interfaces, generics, and strict typing to write robust, maintainable code. Every file in this portfolio is written in TypeScript.",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_js",
    intent: "javascript_skill",
    keywords: ["javascript", "js", "es6", "vanilla", "ecmascript", "scripting"],
    question: "Do you know JavaScript?",
    answer: "JavaScript is the foundation of Caleb's skillset. He's proficient in ES6+ features including async/await, destructuring, modules, closures, and modern array methods. TypeScript builds on this strong JS foundation.",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_nextjs",
    intent: "nextjs_skill",
    keywords: ["next", "nextjs", "next.js", "ssr", "server side", "server-side rendering", "vercel framework"],
    question: "Do you work with Next.js?",
    answer: "Yes! Caleb uses Next.js for projects that benefit from server-side rendering, API routes, and optimized performance. It's part of his core full-stack toolkit alongside React and Node.js.",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_node",
    intent: "nodejs_skill",
    keywords: ["node", "nodejs", "node.js", "backend", "server", "express", "api", "rest", "endpoint"],
    question: "Do you do backend development?",
    answer: "Yes! Caleb works with Node.js and Express for building RESTful APIs and backend services. He's comfortable with server-side logic, middleware, authentication, and database integrations.",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_css",
    intent: "css_skill",
    keywords: ["css", "tailwind", "styling", "design", "responsive", "animation", "framer", "motion", "ui", "ux", "user interface"],
    question: "What about your CSS and design skills?",
    answer: "Caleb excels at creating polished UIs using Tailwind CSS, vanilla CSS, and Framer Motion for animations. He follows mobile-first responsive design principles and has a strong eye for modern aesthetics — as you can see from this portfolio! ✨",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_git",
    intent: "git_skill",
    keywords: ["git", "github", "version control", "repository", "repos", "branches", "commits", "pull request", "merge"],
    question: "Do you use Git/GitHub?",
    answer: "Git is central to Caleb's workflow. He uses GitHub for version control, collaboration, CI/CD pipelines, and open-source contributions. His GitHub profile is linked right here in the navigation!",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_python",
    intent: "python_skill",
    keywords: ["python", "py", "django", "flask", "scripting", "automation", "data"],
    question: "Do you know Python?",
    answer: "Yes, Caleb has experience with Python for scripting, automation, and data processing tasks. His primary focus remains on the JavaScript/TypeScript ecosystem for full-stack web development.",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_db",
    intent: "database_skill",
    keywords: ["database", "db", "sql", "postgres", "mongodb", "supabase", "firebase", "storage", "data", "mysql"],
    question: "What databases do you work with?",
    answer: "Caleb has experience with both SQL and NoSQL databases including PostgreSQL, Supabase, Firebase, and MongoDB. He's comfortable with schema design, queries, and real-time database integrations.",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_mobile",
    intent: "mobile_skill",
    keywords: ["mobile", "app", "ionic", "capacitor", "android", "ios", "native", "hybrid", "cross platform", "phone app"],
    question: "Can you build mobile apps?",
    answer: "Yes! Caleb builds cross-platform mobile applications using Ionic and Capacitor, which allow him to deploy React-based apps to both Android and iOS from a single codebase.",
    routeContext: ["/", "global"]
  },
  {
    id: "skill_ai",
    intent: "ai_skill",
    keywords: ["ai", "artificial intelligence", "machine learning", "ml", "gpt", "openai", "chatbot", "bot", "llm", "model"],
    question: "Do you work with AI?",
    answer: "Caleb integrates AI tools and APIs into his applications — from building intelligent chatbots (like me!) to leveraging AI-assisted development workflows. He stays current with the rapidly evolving AI landscape.",
    routeContext: ["/", "global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // PORTFOLIO & THIS WEBSITE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "t1",
    intent: "portfolio_tech",
    keywords: ["built", "how", "portfolio", "website", "stack", "react", "vite", "typescript", "framer", "animations", "this site", "made this"],
    question: "How was this Caleb Labs portfolio built?",
    answer: "This portfolio is a high-performance client-side application built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion. It features live API integrations with GitHub and Vercel, a custom chatbot, built-in developer tools, and a stunning cyber-space theme — all built from scratch by Caleb.",
    routeContext: ["/", "global"]
  },
  {
    id: "t2",
    intent: "project_population",
    keywords: ["populate", "projects", "api", "vercel", "github", "live", "dynamic", "fetch", "showcase", "repos", "where do projects come from"],
    question: "How do you populate the projects on the main page?",
    answer: "The project nodes are completely dynamic! The site connects to the Vercel API to fetch live production deployments and the GitHub API to fetch open-source code repositories — all in real-time. No hardcoded project data.",
    routeContext: ["/"]
  },
  {
    id: "t4",
    intent: "education",
    keywords: ["degree", "school", "university", "college", "graduated", "educaton", "winnipeg", "study", "education", "academic", "learned"],
    question: "Where did you get your degree?",
    answer: "Caleb holds a degree from the University of Winnipeg, which provided a strong foundation in critical thinking, complex problem-solving, and research methodology.",
    routeContext: ["/", "global"]
  },
  {
    id: "t5",
    intent: "interact_projects",
    keywords: ["interact", "click", "projects", "playground", "readme", "modal", "test", "demo", "view", "open", "try", "preview"],
    question: "How do I interact with your tech projects?",
    answer: "Click on any glowing project node on the main grid! If it has a live deployment, an interactive playground opens right on screen. If it's a code repository, you'll see a clean, formatted README. Try it out!",
    routeContext: ["/"]
  },
  {
    id: "about_chatbot",
    intent: "chatbot_info",
    keywords: ["chatbot", "bot", "assistant", "you", "who are you", "what are you", "this chat", "are you ai", "are you real"],
    question: "What are you? Are you AI?",
    answer: "I'm LABS_ASSISTANT_OS — a custom-built, client-side chatbot embedded in this portfolio! I run entirely in your browser using intelligent pattern matching against a knowledge base about Caleb. No external AI API calls needed. 🤖",
    routeContext: ["global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // LABTOOLS SECTOR
  // ═══════════════════════════════════════════════════════════════
  {
    id: "l1",
    intent: "what_is_labtools",
    keywords: ["labtools", "tools", "utilities", "hub", "sector", "features", "what", "developer tools", "dev tools"],
    question: "What is the LABTOOLS sector?",
    answer: "LABTOOLS is a built-in developer utility hub containing browser-based tools like a JSON to TypeScript converter, a JWT decoder, a Cron expression translator, a Regex tester, and more. All ready to use right here in your browser!",
    routeContext: ["/labtools", "global"]
  },
  {
    id: "l2",
    intent: "labtools_security",
    keywords: ["secure", "security", "privacy", "data", "safe", "server", "client-side", "backend", "save", "trust"],
    question: "Are the LABTOOLS utilities safe to use?",
    answer: "Absolutely. Every tool in LABTOOLS executes 100% client-side in your browser. No data, tokens, or inputs are ever sent to any backend server. Your data stays on your machine.",
    routeContext: ["/labtools"]
  },
  {
    id: "l3",
    intent: "json_to_ts",
    keywords: ["json", "typescript", "converter", "interface", "convert", "transform", "json to ts", "generate types"],
    question: "Tell me about the JSON to TypeScript converter.",
    answer: "The JSON to TypeScript converter takes any JSON data and automatically generates clean TypeScript interfaces from it. Just paste your JSON, and it instantly outputs ready-to-use TypeScript types. Perfect for speeding up your development workflow!",
    routeContext: ["/labtools"]
  },
  {
    id: "l4",
    intent: "jwt_decoder",
    keywords: ["jwt", "token", "decode", "decoder", "json web token", "auth", "authentication", "payload", "header"],
    question: "What does the JWT decoder do?",
    answer: "The JWT Decoder lets you paste any JSON Web Token and instantly see its decoded header, payload, and signature — all without sending anything to a server. Great for debugging authentication flows!",
    routeContext: ["/labtools"]
  },
  {
    id: "l5",
    intent: "cron_translator",
    keywords: ["cron", "cronjob", "schedule", "cron expression", "translate", "human readable", "crontab"],
    question: "How does the Cron translator work?",
    answer: "The Cron Expression Translator converts complex cron syntax (like '0 */6 * * *') into plain, human-readable English. Perfect for understanding or debugging scheduled tasks!",
    routeContext: ["/labtools"]
  },
  {
    id: "l6",
    intent: "regex_tester",
    keywords: ["regex", "regular expression", "pattern", "test", "match", "regexp"],
    question: "Is there a regex tester?",
    answer: "Yes! The Regex Tester lets you write regular expressions and test them against sample text in real-time. It highlights matches and shows capture groups — a handy tool for debugging patterns.",
    routeContext: ["/labtools"]
  },

  // ═══════════════════════════════════════════════════════════════
  // CULINARY SECTOR
  // ═══════════════════════════════════════════════════════════════
  {
    id: "c1",
    intent: "culinary_background",
    keywords: ["culinary", "cook", "chef", "kitchen", "food", "restaurant", "coking", "cheff", "management", "cooking"],
    question: "What is your culinary background?",
    answer: "Caleb has extensive experience managing high-pressure kitchen environments. His strengths include menu execution, strict food safety compliance (including WHMIS/Food Handler certifications), and maintaining team efficiency during intense service rushes.",
    routeContext: ["/culinary", "global"]
  },
  {
    id: "c2",
    intent: "culinary_skills",
    keywords: ["knife", "prep", "grill", "saute", "plating", "menu", "recipe", "ingredients", "cuisine"],
    question: "What culinary skills do you have?",
    answer: "Caleb is skilled in knife work, grill and sauté stations, food preparation, plating, menu planning, and kitchen inventory management. He brings the same attention to detail from the kitchen into his code.",
    routeContext: ["/culinary"]
  },
  {
    id: "c3",
    intent: "why_culinary",
    keywords: ["why culinary", "food industry", "kitchen career", "restaurant experience"],
    question: "Why include culinary experience?",
    answer: "The culinary industry teaches invaluable soft skills — working under extreme pressure, time management, team coordination, and attention to detail. These skills translate directly to software development and make Caleb a well-rounded team player.",
    routeContext: ["/culinary", "global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // SERVICE SECTOR
  // ═══════════════════════════════════════════════════════════════
  {
    id: "s1",
    intent: "service_approach",
    keywords: ["customer", "service", "conflict", "resolution", "angry", "upset", "clients", "help", "support", "empathy", "communication"],
    question: "What is your approach to customer service?",
    answer: "Caleb's approach is rooted in active listening and empathy. He focuses on de-escalating conflicts by ensuring clients feel heard, then swiftly finding practical solutions that align with company policies.",
    routeContext: ["/service", "global"]
  },
  {
    id: "s2",
    intent: "service_skills",
    keywords: ["soft skills", "teamwork", "leadership", "team player", "collaborate", "cooperate", "interpersonal"],
    question: "What are your soft skills?",
    answer: "Caleb excels in communication, teamwork, leadership, time management, and adaptability. His diverse career has honed his ability to collaborate effectively with both technical and non-technical stakeholders.",
    routeContext: ["/service", "global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // CONTEXT-AWARE PAGE SUMMARIES
  // ═══════════════════════════════════════════════════════════════
  {
    id: "sum_tech",
    intent: "page_summary",
    keywords: ["page", "tab", "about", "here", "looking", "what", "summary", "explain", "where", "am", "i", "nexus", "this page"],
    question: "What is this page about?",
    answer: "You are on the Tech Nexus — the main hub of Caleb Labs. Here you can explore live software projects, interact with deployed web apps, and browse open-source code repositories.",
    routeContext: ["/"]
  },
  {
    id: "sum_culinary",
    intent: "page_summary",
    keywords: ["page", "tab", "about", "here", "looking", "what", "summary", "explain", "where", "am", "i", "sector", "this page"],
    question: "What is this page about?",
    answer: "You're viewing the Culinary Sector. This page highlights Caleb's professional kitchen experience — kitchen management, food safety, and menu execution. You can download a culinary-specific resume here too!",
    routeContext: ["/culinary"]
  },
  {
    id: "sum_service",
    intent: "page_summary",
    keywords: ["page", "tab", "about", "here", "looking", "what", "summary", "explain", "where", "am", "i", "sector", "this page"],
    question: "What is this page about?",
    answer: "This is the Customer Service Sector. It showcases Caleb's experience in client relations, de-escalation, and professional communication. His customer service resume is available for download here.",
    routeContext: ["/service"]
  },
  {
    id: "sum_labtools",
    intent: "page_summary",
    keywords: ["page", "tab", "about", "here", "looking", "what", "summary", "explain", "where", "am", "i", "sector", "hub", "this page"],
    question: "What is this page about?",
    answer: "You're exploring LABTOOLS — a collection of fully functional, client-side developer utilities Caleb built. Use the JSON to TypeScript converter, JWT decoder, Regex tester, and more right in your browser!",
    routeContext: ["/labtools"]
  },
  {
    id: "sum_global",
    intent: "page_summary",
    keywords: ["page", "tab", "about", "here", "looking", "what", "summary", "explain", "where", "am", "i", "website", "site", "this page"],
    question: "What is this website about?",
    answer: "Welcome to Caleb Labs! Use the top navigation to explore tech projects, check out Caleb's culinary and customer service backgrounds, or try out the built-in developer utilities in LABTOOLS.",
    routeContext: ["global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // NAVIGATION & HELP
  // ═══════════════════════════════════════════════════════════════
  {
    id: "smart_1",
    intent: "navigation_help",
    keywords: ["navigate", "how", "find", "menu", "around", "switch", "go", "nav", "sections", "pages", "explore"],
    question: "How do I navigate this site?",
    answer: "Use the navigation bar at the top to switch between the Tech Nexus (homepage), Culinary Sector, Service Sector, and LABTOOLS. Each sector has its own unique content and downloadable resume!",
    routeContext: ["global"]
  },
  {
    id: "smart_2",
    intent: "what_is_node",
    keywords: ["node", "nodes", "card", "box", "glowing", "mean", "represent", "grid", "dots", "circles"],
    question: "What are these glowing nodes?",
    answer: "Each glowing 'node' represents one of Caleb's projects. 'Live Nodes' are production apps pulled from Vercel that you can use right here. 'Archive Nodes' are code repositories pulled from GitHub. Click any node to explore!",
    routeContext: ["/"]
  },
  {
    id: "smart_4",
    intent: "mobile_friendly",
    keywords: ["mobile", "phone", "tablet", "responsive", "break", "screen", "small screen"],
    question: "Is this website mobile friendly?",
    answer: "Yes! Caleb Labs is built with a responsive, mobile-first design. All project playgrounds, tools, and even this chat window scale perfectly to any device.",
    routeContext: ["global"]
  },
  {
    id: "help_1",
    intent: "help",
    keywords: ["help", "can you", "what can", "do you", "capable", "features", "options", "commands", "assist"],
    question: "What can you help me with?",
    answer: "I can help with all sorts of things! Try asking me about: Caleb's tech skills, specific frameworks (React, TypeScript, etc.), his projects, education, career background, how this portfolio works, or any of the LABTOOLS utilities. Fire away! 🎯",
    routeContext: ["global"]
  },

  // ═══════════════════════════════════════════════════════════════
  // FUN / PERSONALITY / MISC
  // ═══════════════════════════════════════════════════════════════
  {
    id: "fun_1",
    intent: "favorite_language",
    keywords: ["favorite", "favourite", "best", "preferred", "language", "prefer", "like most"],
    question: "What's your favorite programming language?",
    answer: "TypeScript is the clear favorite! 💙 It combines the flexibility of JavaScript with the safety of static typing. It's the language Caleb reaches for in every new project.",
    routeContext: ["global"]
  },
  {
    id: "fun_2",
    intent: "coding_philosophy",
    keywords: ["philosophy", "approach", "style", "principle", "mindset", "believe", "values", "methodology"],
    question: "What's your coding philosophy?",
    answer: "Caleb believes in writing clean, readable code that solves real problems. His philosophy: build with purpose, prioritize user experience, stay curious, and never stop learning. Every line of code should have a reason to exist.",
    routeContext: ["global"]
  },
  {
    id: "fun_3",
    intent: "fun_fact",
    keywords: ["fun fact", "interesting", "random", "trivia", "something cool", "tell me something", "surprise"],
    question: "Tell me a fun fact!",
    answer: "Fun fact: This chatbot you're talking to runs entirely in your browser — zero API calls, zero backend, zero latency! It uses intelligent pattern matching against a curated knowledge base. Pretty cool for a client-side bot, right? 🤖",
    routeContext: ["global"]
  },
  {
    id: "fun_4",
    intent: "age",
    keywords: ["age", "old", "young", "born", "birthday", "years"],
    question: "How old is Caleb?",
    answer: "Caleb is a young professional in his twenties — early in his career but already building impressive full-stack applications and managing complex multi-platform deployments!",
    routeContext: ["global"]
  },
  {
    id: "fun_5",
    intent: "goals",
    keywords: ["goal", "goals", "aspiration", "dream", "future", "plan", "ambition", "where do you see", "five years"],
    question: "What are Caleb's career goals?",
    answer: "Caleb aims to grow as a full-stack developer, working on challenging products that make a real impact. He's passionate about building exceptional user experiences and contributing to innovative teams that push technology forward.",
    routeContext: ["global"]
  },
  {
    id: "fun_6",
    intent: "strengths",
    keywords: ["strength", "strengths", "good at", "excel", "best at", "strong", "advantage"],
    question: "What are your biggest strengths?",
    answer: "Caleb's key strengths include: rapid learning ability, strong UI/UX design sense, full-stack versatility, and the soft skills gained from his diverse career background — communication, pressure management, and team leadership.",
    routeContext: ["global"]
  },
  {
    id: "misc_weather",
    intent: "off_topic",
    keywords: ["weather", "joke", "sing", "song", "game", "play", "movie", "music", "sports", "politics", "news"],
    question: "Off-topic question",
    answer: "Ha, that's outside my area of expertise! 😄 I'm laser-focused on everything Caleb Labs — his tech skills, projects, career background, and the tools on this site. Try asking me about any of those!",
    routeContext: ["global"]
  }
];
