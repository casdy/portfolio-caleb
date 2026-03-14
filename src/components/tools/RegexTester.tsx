import React, { useState, useEffect } from 'react';
import { Search, Info, AlertTriangle } from 'lucide-react';

const RegexTester: React.FC = () => {
  const [regexStr, setRegexStr] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('Contact us at support@caleblabs.tech or hello@example.com for more info.');
  const [matches, setMatches] = useState<RegExpExecArray[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!regexStr) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const re = new RegExp(regexStr, flags.includes('g') ? flags : flags + 'g');
      const found: RegExpExecArray[] = [];
      let m;
      
      // Reset lastIndex for global searches
      re.lastIndex = 0;
      
      if (flags.includes('g')) {
        while ((m = re.exec(testString)) !== null) {
          found.push(m);
          if (m.index === re.lastIndex) re.lastIndex++; // Avoid infinite loops on zero-width matches
        }
      } else {
        m = re.exec(testString);
        if (m) found.push(m);
      }
      
      setMatches(found);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  }, [regexStr, flags, testString]);

  const renderHighlightedText = () => {
    if (error || !testString) return testString;
    
    let lastIndex = 0;
    const parts: React.ReactNode[] = [];
    
    matches.forEach((match, i) => {
      // Unmatched part before this match
      if (match.index > lastIndex) {
        parts.push(testString.substring(lastIndex, match.index));
      }
      
      // The match itself
      parts.push(
        <span 
          key={i} 
          className="bg-amber-500/30 text-amber-600 dark:text-amber-400 border-b border-amber-500/50 px-0.5 rounded-sm"
          title={`Match ${i + 1}: ${match[0]}`}
        >
          {match[0]}
        </span>
      );
      
      lastIndex = match.index + match[0].length;
    });
    
    // Remaining text
    if (lastIndex < testString.length) {
      parts.push(testString.substring(lastIndex));
    }
    
    return parts;
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <Search size={14} /> Regular Expression
          </label>
          <div className="flex items-center bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus-within:ring-2 focus-within:ring-amber-500 overflow-hidden">
             <span className="pl-4 text-zinc-400 font-mono">/</span>
             <input
              type="text"
              value={regexStr}
              onChange={(e) => setRegexStr(e.target.value)}
              className="flex-grow p-3 font-mono text-sm bg-transparent outline-none"
             />
             <span className="text-zinc-400 font-mono">/</span>
             <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-16 p-3 font-mono text-sm bg-transparent text-amber-500 border-l border-zinc-200 dark:border-zinc-800 outline-none"
              placeholder="flags"
             />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs mt-1">
              <AlertTriangle size={12} /> {error}
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <Info size={14} /> Stats
          </label>
          <div className="p-3 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-center">
            <span className="text-2xl font-display font-bold text-amber-500">{matches.length}</span>
            <span className="text-xs text-zinc-500 block">Matches Found</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow overflow-hidden">
        <div className="flex flex-col gap-2 overflow-hidden">
          <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="flex-grow p-4 font-mono text-sm bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none"
          />
        </div>
        
        <div className="flex flex-col gap-2 overflow-hidden">
          <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Visualization</label>
          <div className="flex-grow p-4 font-mono text-sm bg-zinc-950 text-zinc-300 border border-zinc-800 rounded-xl overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {renderHighlightedText()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexTester;
