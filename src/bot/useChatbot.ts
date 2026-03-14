import Fuse from 'fuse.js';
import { faqData } from './faqData';

// Initialize Fuse outside the hook so it doesn't rebuild on every render
const fuse = new Fuse(faqData, {
  keys: ['keywords', 'question'],
  threshold: 0.4, // 0.0 is perfect match, 1.0 is anything. 0.4 allows for good typo tolerance
  includeScore: true
});

export const useChatbot = () => {
  const getAnswer = (userInput: string, currentPath: string): string => {
    const results = fuse.search(userInput);
    
    if (results.length === 0) {
      return "I'm just a limited AI assistant and I didn't quite catch that. Try asking about Caleb's skills, education, or experience!";
    }

    // Filter results to prioritize the current tab or global scope
    const contextualResults = results.filter(result => 
      result.item.routeContext.includes('global') || 
      result.item.routeContext.includes(currentPath)
    );

    if (contextualResults.length > 0) {
      return contextualResults[0].item.answer;
    }

    // Fallback to the best match even if it's from another tab
    return results[0].item.answer;
  };

  return { getAnswer };
};
