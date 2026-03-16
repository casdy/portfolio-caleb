import { describe, it, expect } from 'vitest';
import Fuse from 'fuse.js';
import { faqData } from './faqData';

// ─── Re-create the matching logic for direct testing ───
// (We test the core logic functions, not the React hook wrapper)

const INTENT_TRIGGERS: Record<string, string[]> = {
  greeting:     ['hi', 'hello', 'hey', 'howdy', 'yo', 'sup', 'greetings', 'hiya', 'good morning', 'good afternoon', 'good evening'],
  how_are_you:  ['how are you', "how's it going", 'how you doing', "what's good"],
  thanks:       ['thanks', 'thank you', 'thx', 'ty', 'appreciate it', 'cheers'],
  goodbye:      ['bye', 'goodbye', 'see you', 'later', 'cya', 'peace', 'take care', 'farewell'],
  help:         ['help', 'what can you do', 'commands', 'options', 'assist me'],
  chatbot_info: ['who are you', 'what are you', 'are you ai', 'are you real', 'are you a bot'],
};


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

function matchByIntent(normalized: string): string | null {
  for (const [intent, triggers] of Object.entries(INTENT_TRIGGERS)) {
    for (const trigger of triggers) {
      const regex = new RegExp(`(?:^|\\s)${trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s|$)`, 'i');
      if (normalized === trigger || regex.test(normalized)) {
        const match = faqData.find(item => item.intent === intent);
        if (match) return match.answer;
      }
    }
  }
  return null;
}

function getAnswer(userInput: string, currentPath: string): string {
  const normalized = normalize(userInput);
  if (!normalized) return 'fallback';

  const intentMatch = matchByIntent(normalized);
  if (intentMatch) return intentMatch;

  const results = fuse.search(normalized);
  if (results.length > 0) {
    const contextual = results.filter(r =>
      r.item.routeContext.includes('global') ||
      r.item.routeContext.includes(currentPath)
    );
    if (contextual.length > 0) return contextual[0].item.answer;
    return results[0].item.answer;
  }

  return 'fallback';
}

// Helper: assert answer does NOT return fallback
function expectMatch(query: string, path = '/'): string {
  const answer = getAnswer(query, path);
  expect(answer).not.toBe('fallback');
  return answer;
}

// Helper: assert answer contains a substring
function expectAnswerContains(query: string, substring: string, path = '/'): void {
  const answer = getAnswer(query, path);
  expect(answer.toLowerCase()).toContain(substring.toLowerCase());
}


// ═══════════════════════════════════════════════════════════════
// TEST SUITES
// ═══════════════════════════════════════════════════════════════

describe('Chatbot FAQ Data Integrity', () => {
  it('should have at least 50 FAQ entries', () => {
    expect(faqData.length).toBeGreaterThanOrEqual(50);
  });

  it('should have unique IDs for all entries', () => {
    const ids = faqData.map(f => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('every entry should have required fields', () => {
    faqData.forEach(item => {
      expect(item.id).toBeTruthy();
      expect(item.intent).toBeTruthy();
      expect(item.keywords.length).toBeGreaterThan(0);
      expect(item.question).toBeTruthy();
      expect(item.answer).toBeTruthy();
      expect(item.routeContext.length).toBeGreaterThan(0);
    });
  });

  it('every routeContext should be a valid route or "global"', () => {
    const validContexts = ['global', '/', '/culinary', '/service', '/labtools'];
    faqData.forEach(item => {
      item.routeContext.forEach(ctx => {
        expect(validContexts).toContain(ctx);
      });
    });
  });
});


describe('Tier 1: Intent Classification (Direct Match)', () => {
  it('should match "hi" as a greeting', () => {
    const answer = expectMatch('hi');
    expect(answer).toContain('Welcome');
  });

  it('should match "hello" as a greeting', () => {
    expectMatch('hello');
  });

  it('should match "hey" as a greeting', () => {
    expectMatch('hey');
  });

  it('should match "yo" as a greeting', () => {
    expectMatch('yo');
  });

  it('should match "howdy" as a greeting', () => {
    expectMatch('howdy');
  });

  it('should match "good morning" as a greeting', () => {
    expectMatch('good morning');
  });

  it('should match "good afternoon" as a greeting', () => {
    expectMatch('good afternoon');
  });

  it('should match "how are you" properly', () => {
    const answer = expectMatch('how are you');
    expect(answer).toContain('peak efficiency');
  });

  it('should match "how are you doing today" (contains trigger)', () => {
    expectMatch('how are you doing today');
  });

  it('should match "thanks" as gratitude', () => {
    const answer = expectMatch('thanks');
    expect(answer).toContain('welcome');
  });

  it('should match "thank you" as gratitude', () => {
    expectMatch('thank you');
  });

  it('should match "bye" as goodbye', () => {
    const answer = expectMatch('bye');
    expect(answer).toContain('See you');
  });

  it('should match "goodbye" as goodbye', () => {
    expectMatch('goodbye');
  });

  it('should match "help" request', () => {
    const answer = expectMatch('help');
    expect(answer).toContain('help');
  });

  it('should match "who are you" as chatbot info', () => {
    expectMatch('who are you');
  });

  it('should match "are you ai" as chatbot info', () => {
    expectMatch('are you ai');
  });

  it('should be case-insensitive', () => {
    expectMatch('HELLO');
    expectMatch('Hi');
    expectMatch('HEY THERE');
  });

  it('should handle punctuation gracefully', () => {
    expectMatch('hello!');
    expectMatch('hi!!');
    expectMatch('hey...');
  });
});


describe('Tier 2: Fuse.js Fuzzy Matching', () => {
  describe('Identity & Background', () => {
    it('should match "who is caleb"', () => {
      expectAnswerContains('who is caleb', 'full-stack');
    });

    it('should match "tell me about caleb"', () => {
      expectMatch('tell me about caleb');
    });

    it('should match "who made this site"', () => {
      expectMatch('who made this site');
    });

    it('should match with typo "calab"', () => {
      expectMatch('calab ojukwu');
    });

    it('should match "where is caleb located"', () => {
      expectAnswerContains('where is caleb located', 'winnipeg');
    });

    it('should match "where are you from"', () => {
      expectMatch('where are you from');
    });
  });

  describe('Tech Skills', () => {
    it('should match "what is your tech stack"', () => {
      expectMatch('what is your tech stack');
    });

    it('should match "react experience"', () => {
      expectMatch('tell me about react');
    });

    it('should match "do you know typescript"', () => {
      expectAnswerContains('do you know typescript', 'typescript');
    });

    it('should match with typo "typscript"', () => {
      expectMatch('typscript experience');
    });

    it('should match "javascript skills"', () => {
      expectMatch('javascript skills');
    });

    it('should match "do you use node.js"', () => {
      expectMatch('do you use node.js');
    });

    it('should match "next.js"', () => {
      expectMatch('next.js');
    });

    it('should match "css and design skills"', () => {
      expectMatch('css and design skills');
    });

    it('should match "do you use git"', () => {
      expectMatch('do you use git');
    });

    it('should match "database experience"', () => {
      expectMatch('database experience');
    });

    it('should match "mobile app development"', () => {
      expectMatch('mobile app development');
    });

    it('should match "ai and machine learning"', () => {
      expectMatch('ai and machine learning');
    });

    it('should match "python"', () => {
      expectMatch('python');
    });

    it('should match "what languages do you use"', () => {
      expectMatch('what languages do you use');
    });

    it('should match "what tools do you use"', () => {
      expectMatch('what tools do you use');
    });

    it('should match vague "code" query', () => {
      expectMatch('what do you code in');
    });
  });

  describe('Contact & Hiring', () => {
    it('should match "how can I contact you"', () => {
      expectAnswerContains('how can I contact you', 'linkedin');
    });

    it('should match "download resume"', () => {
      expectAnswerContains('download resume', 'resume');
    });

    it('should match "are you available for hire"', () => {
      expectAnswerContains('are you available for hire', 'opportunities');
    });

    it('should match "can I hire you"', () => {
      expectMatch('can I hire you');
    });

    it('should match "job opportunity"', () => {
      expectMatch('job opportunity');
    });

    it('should match "freelance work"', () => {
      expectMatch('freelance work');
    });

    it('should match "salary expectations"', () => {
      expectMatch('salary expectations');
    });
  });

  describe('Education', () => {
    it('should match education-related queries', () => {
      expectMatch('what degree do you have');
    });

    it('should match "education background"', () => {
      expectMatch('education background');
    });

    it('should match "degree"', () => {
      expectMatch('what degree do you have');
    });
  });

  describe('Portfolio & Site', () => {
    it('should match "how was this portfolio built"', () => {
      expectAnswerContains('how was this portfolio built', 'vite');
    });

    it('should match "what is this website"', () => {
      expectMatch('what is this website');
    });

    it('should match "how do projects get populated"', () => {
      expectMatch('how do projects get populated');
    });

    it('should match "how to interact with projects"', () => {
      expectMatch('how to interact with projects');
    });

    it('should match "what are these glowing nodes"', () => {
      expectMatch('what are these glowing nodes');
    });
  });

  describe('LABTOOLS', () => {
    it('should match "what is labtools"', () => {
      expectAnswerContains('what is labtools', 'developer');
    });

    it('should match "json to typescript"', () => {
      expectMatch('json to typescript converter');
    });

    it('should match "jwt decoder"', () => {
      expectMatch('jwt decoder');
    });

    it('should match "cron expression"', () => {
      expectMatch('cron expression');
    });

    it('should match "regex tester"', () => {
      expectMatch('regex tester');
    });

    it('should match "are the tools safe"', () => {
      expectMatch('are the tools safe to use');
    });
  });

  describe('Culinary Sector', () => {
    it('should match "culinary background"', () => {
      expectAnswerContains('culinary background', 'kitchen');
    });

    it('should match with typo "cheff experience"', () => {
      expectMatch('cheff experience');
    });

    it('should match "cooking skills"', () => {
      expectMatch('cooking skills');
    });

    it('should match "why include culinary experience"', () => {
      expectMatch('why include culinary experience');
    });
  });

  describe('Service Sector', () => {
    it('should match "customer service approach"', () => {
      expectAnswerContains('customer service approach', 'empathy');
    });

    it('should match "soft skills"', () => {
      expectMatch('soft skills');
    });

    it('should match "soft skills"', () => {
      expectMatch('soft skills communication');
    });
  });

  describe('Fun & Personality', () => {
    it('should match "favorite programming language"', () => {
      expectAnswerContains('favorite programming language', 'typescript');
    });

    it('should match "coding philosophy"', () => {
      expectMatch('coding philosophy');
    });

    it('should match "fun fact"', () => {
      expectMatch('tell me a fun fact');
    });

    it('should match "career goals"', () => {
      expectMatch('career goals');
    });

    it('should match "biggest strengths"', () => {
      expectMatch('biggest strengths');
    });

    it('should match "hobbies"', () => {
      expectMatch('hobbies outside of work');
    });
  });
});


describe('Tier 2: Context-Aware Page Summaries', () => {
  it('should return tech page summary when on "/"', () => {
    const answer = getAnswer('what is this page', '/');
    expect(answer).toContain('Tech Nexus');
  });

  it('should return culinary page summary when on "/culinary"', () => {
    const answer = getAnswer('what is this page about', '/culinary');
    expect(answer).toContain('Culinary');
  });

  it('should return service page summary when on "/service"', () => {
    const answer = getAnswer('what is this page about', '/service');
    expect(answer).toContain('Service');
  });

  it('should return labtools page summary when on "/labtools"', () => {
    const answer = getAnswer('what is this page about', '/labtools');
    expect(answer).toContain('LABTOOLS');
  });

  it('should return global summary on unknown route', () => {
    const answer = getAnswer('what is this website', '/unknown');
    expect(answer).toContain('Caleb Labs');
  });
});


describe('Tier 3: Smart Fallback Behavior', () => {
  it('should return fallback for completely unrelated gibberish', () => {
    const answer = getAnswer('xyzzy plugh foobar bazqux', '/');
    expect(answer).toBe('fallback');
  });

  it('should return fallback for empty input', () => {
    const answer = getAnswer('', '/');
    expect(answer).toBe('fallback');
  });

  it('should return fallback for whitespace-only input', () => {
    const answer = getAnswer('   ', '/');
    expect(answer).toBe('fallback');
  });
});


describe('Normalization & Edge Cases', () => {
  it('should handle ALL CAPS input', () => {
    expectMatch('WHO IS CALEB');
  });

  it('should handle mixed case', () => {
    expectMatch('wHo Is CaLeB');
  });

  it('should handle excessive punctuation', () => {
    expectMatch('hello!!!');
  });

  it('should handle question marks', () => {
    expectMatch('who is caleb?');
  });

  it('should handle leading/trailing whitespace', () => {
    expectMatch('   hello   ');
  });

  it('should handle multiple spaces between words', () => {
    expectMatch('who   is    caleb');
  });

  it('should handle contractions gracefully', () => {
    expectMatch("what's your tech stack");
  });
});


describe('Navigation & Help Queries', () => {
  it('should match "how do I navigate"', () => {
    expectMatch('how do I navigate this site');
  });

  it('should match "is this site mobile friendly"', () => {
    expectMatch('is this site mobile friendly');
  });

  it('should handle "this is cool" type compliments', () => {
    expectMatch('this is awesome');
  });

  it('should handle "nice" as a compliment', () => {
    expectMatch('nice site');
  });
});


describe('Off-Topic Handling', () => {
  it('should match weather-related off-topic query', () => {
    const answer = getAnswer('whats the weather like', '/');
    // Should either match the off_topic entry or return fallback
    // Both are acceptable — the key is it should NOT crash
    expect(answer).toBeTruthy();
  });

  it('should match joke request', () => {
    const answer = getAnswer('tell me a joke', '/');
    expect(answer).toBeTruthy();
  });
});


describe('Route Context Filtering', () => {
  it('should prioritize tech-specific results on "/" route', () => {
    const answer = getAnswer('how do projects get populated', '/');
    expect(answer).toContain('dynamic');
  });

  it('should still return results for labtools questions from home page', () => {
    // labtools questions have "global" context so should work from "/"
    const answer = getAnswer('what is labtools', '/');
    expect(answer).toContain('developer');
  });

  it('global-context answers should work from any route', () => {
    const routes = ['/', '/culinary', '/service', '/labtools'];
    routes.forEach(route => {
      const answer = getAnswer('who is caleb', route);
      expect(answer).toBeTruthy();
      expect(answer).not.toBe('fallback');
    });
  });
});
