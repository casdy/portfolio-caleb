import Fuse from 'fuse.js';
import { faqData } from './faqData';
import type { FAQItem } from '../types/chat';

// ─── Intent trigger map for Tier 1 direct-match ───
const INTENT_TRIGGERS: Record<string, string[]> = {
  greeting:       ['hi', 'hello', 'hey', 'howdy', 'yo', 'sup', 'greetings', 'hiya', 'good morning', 'good afternoon', 'good evening'],
  how_are_you:    ['how are you', "how's it going", 'how you doing', "what's good"],
  thanks:         ['thanks', 'thank you', 'thx', 'ty', 'appreciate it', 'cheers'],
  goodbye:        ['bye', 'goodbye', 'see you', 'later', 'cya', 'peace', 'take care', 'farewell'],
  help:           ['help', 'what can you do', 'commands', 'options', 'assist me'],
  chatbot_info:   ['who are you', 'what are you', 'are you ai', 'are you real', 'are you a bot'],
};

// ─── Follow-up suggestion map by intent category ───
const FOLLOW_UP_MAP: Record<string, string[]> = {
  greeting:         ["What's your tech stack?", "Are you available for hire?", "What is LABTOOLS?"],
  how_are_you:      ["Who is Caleb?", "What can you help me with?", "Tell me about your projects"],
  thanks:           ["How do I navigate this site?", "Can I download your resume?"],
  goodbye:          [],
  help:             ["What's your tech stack?", "Tell me about LabTools", "Are you available?"],
  chatbot_info:     ["How was this portfolio built?", "What's your coding philosophy?"],
  who_is_caleb:     ["What's your tech stack?", "Where is Caleb located?", "Contact info?"],
  where_located:    ["Are you available for hire?", "Can I contact you?"],
  career_switch:    ["What are your biggest strengths?", "Career goals?"],
  contact_info:     ["Can I download your resume?", "Are you available for hire?"],
  download_resume:  ["How can I contact you?", "What's your tech stack?"],
  hiring:           ["Can I download your resume?", "What's your tech stack?", "Contact info?"],
  salary:           ["Are you available for hire?", "Can I download your resume?"],
  tech_stack:       ["Do you know React?", "Do you use TypeScript?", "Backend experience?"],
  react_skill:      ["Do you use TypeScript?", "What about Next.js?", "CSS and design skills?"],
  typescript_skill: ["Do you know React?", "Backend with Node.js?", "What databases?"],
  javascript_skill: ["Do you use TypeScript?", "Do you know React?"],
  nextjs_skill:     ["Backend with Node.js?", "What databases do you use?"],
  nodejs_skill:     ["What databases do you use?", "Do you build mobile apps?"],
  css_skill:        ["How was this portfolio built?", "Do you know React?"],
  git_skill:        ["What's your tech stack?", "Do you use TypeScript?"],
  python_skill:     ["What's your tech stack?", "What databases?"],
  database_skill:   ["Backend with Node.js?", "Do you build mobile apps?"],
  mobile_skill:     ["What's your tech stack?", "Do you know React?"],
  ai_skill:         ["What's your coding philosophy?", "Fun fact about the bot?"],
  portfolio_tech:   ["How do projects get populated?", "What are the glowing nodes?"],
  project_population: ["How do I interact with a project?", "What are the nodes?"],
  education:        ["What's your tech stack?", "Career goals?", "Biggest strengths?"],
  interact_projects: ["What are these glowing nodes?", "How do projects get populated?"],
  what_is_labtools: ["Is the data safe in LabTools?", "JSON to TypeScript tool?", "JWT decoder?"],
  labtools_security: ["What is LabTools?", "Tell me about the JWT decoder"],
  json_to_ts:       ["JWT decoder?", "Cron translator?", "Regex tester?"],
  jwt_decoder:      ["JSON to TypeScript tool?", "Is the data safe?"],
  cron_translator:  ["Regex tester?", "JSON to TypeScript tool?"],
  regex_tester:     ["Cron translator?", "JWT decoder?"],
  page_summary:     ["How do I navigate this site?", "Who is Caleb?"],
  navigation_help:  ["What is this page about?", "What is LABTOOLS?"],
  what_is_node:     ["How do I interact with projects?", "How do projects get populated?"],
  mobile_friendly:  ["How was this portfolio built?", "What's your tech stack?"],
  favorite_language: ["Coding philosophy?", "Fun fact?"],
  coding_philosophy: ["Favorite programming language?", "Career goals?"],
  fun_fact:          ["Who is Caleb?", "Biggest strengths?"],
  hobbies:          ["Fun fact?", "Career goals?"],
  goals:            ["Biggest strengths?", "Are you available for hire?"],
  strengths:        ["Career goals?", "Are you available for hire?"],
  off_topic:        ["What's your tech stack?", "Who is Caleb?", "What is LABTOOLS?"],
  nice:             ["How was this built?", "What's your tech stack?"],
  age:              ["Career goals?", "Where is Caleb located?"],
};

// ─── Smart fallback responses ───
const SMART_FALLBACKS = [
  "Hmm, I'm not sure about that one! Try asking about Caleb's tech stack, projects, or any of the LABTOOLS utilities. 🎯",
  "That's a bit outside my wiring! I know everything about Caleb's technical skills, education, and this portfolio. What would you like to know?",
  "I didn't catch that — but I'm great at answering questions about React, TypeScript, Caleb's career, or how this site works! Give it a shot. 💡",
  "My circuits didn't match that one. Try something like: 'What's your tech stack?', 'Are you available for hire?', or 'What is LABTOOLS?'",
  "Not quite in my database! I can tell you about Caleb's architecture (React, Node, TypeScript...), his projects, or the tools on this site. What interests you?",
  "I'm specialized in all things Caleb Labs — skills, projects, career architecture, and tools. Could you rephrase, or try asking about one of those? 🤖"
];

const FALLBACK_SUGGESTIONS = ["Who is Caleb?", "What's your tech stack?", "What is LABTOOLS?", "Are you available for hire?"];

// ─── Initialize Fuse ───
const fuse = new Fuse(faqData, {
  keys: [
    { name: 'keywords', weight: 0.6 },
    { name: 'question', weight: 0.3 },
    { name: 'intent',   weight: 0.1 }
  ],
  threshold: 0.55,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2
});

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchByIntent(normalized: string): FAQItem | null {
  for (const [intent, triggers] of Object.entries(INTENT_TRIGGERS)) {
    for (const trigger of triggers) {
      const regex = new RegExp(`(?:^|\\s)${trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s|$)`, 'i');
      if (normalized === trigger || regex.test(normalized)) {
        const match = faqData.find(item => item.intent === intent);
        if (match) return match;
      }
    }
  }
  return null;
}

function getSuggestions(intent: string): string[] {
  const followUps = FOLLOW_UP_MAP[intent] || FALLBACK_SUGGESTIONS;
  return followUps.slice(0, 3);
}

function getSmartFallback(): string {
  return SMART_FALLBACKS[Math.floor(Math.random() * SMART_FALLBACKS.length)];
}

export interface ChatbotResponse {
  answer: string;
  suggestions: string[];
}

/** Get initial FAQ chips based on current route */
export function getInitialSuggestions(currentPath: string): string[] {
  if (currentPath === '/labtools') return ["What is LABTOOLS?", "Is my data safe?", "JSON to TypeScript?"];
  return ["Who is Caleb?", "What's your tech stack?", "Are you hiring?"];
}

export const useChatbot = () => {
  const getAnswer = (userInput: string, currentPath: string): ChatbotResponse => {
    const normalized = normalize(userInput);

    if (!normalized) return { answer: getSmartFallback(), suggestions: FALLBACK_SUGGESTIONS };

    // ── TIER 1: Direct intent match ──
    const intentMatch = matchByIntent(normalized);
    if (intentMatch) {
      return {
        answer: intentMatch.answer,
        suggestions: getSuggestions(intentMatch.intent)
      };
    }

    // ── TIER 2: Fuse.js fuzzy search ──
    const results = fuse.search(normalized);

    if (results.length > 0) {
      const contextual = results.filter(r =>
        r.item.routeContext.includes('global') ||
        r.item.routeContext.includes(currentPath)
      );

      const matchedItem = contextual.length > 0 ? contextual[0].item : results[0].item;
      return {
        answer: matchedItem.answer,
        suggestions: getSuggestions(matchedItem.intent)
      };
    }

    // ── TIER 3: Smart fallback ──
    return { answer: getSmartFallback(), suggestions: FALLBACK_SUGGESTIONS };
  };

  return { getAnswer };
};
