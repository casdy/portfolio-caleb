import React, { useState } from 'react';
import useClipboard from '../../hooks/useClipboard';
import { Copy, Check, Lock, RefreshCw } from 'lucide-react';

const SecureKeyGen: React.FC = () => {
  const [length, setLength] = useState(32);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [key, setKey] = useState('');
  
  const { isCopied, copy } = useClipboard();

  const generate = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = '';
    if (includeUpper) chars += upper;
    if (includeLower) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    if (!chars) return;

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(array[i] % chars.length);
    }
    
    setKey(result);
  };

  // Generate on first load
  React.useEffect(() => {
    generate();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="flex flex-col gap-6">
        <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <Lock size={14} /> Configuration
        </label>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-500">Key Length</span>
              <span className="text-red-500">{length}</span>
            </div>
            <input
              type="range"
              min="8"
              max="128"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
                { label: 'Uppercase', state: includeUpper, setter: setIncludeUpper },
                { label: 'Lowercase', state: includeLower, setter: setIncludeLower },
                { label: 'Numbers', state: includeNumbers, setter: setIncludeNumbers },
                { label: 'Symbols', state: includeSymbols, setter: setIncludeSymbols },
            ].map((opt) => (
                <label key={opt.label} className="flex items-center gap-3 group cursor-pointer">
                    <div className={`relative w-10 h-6 transition-colors rounded-full ${opt.state ? 'bg-red-500' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
                        <input
                            type="checkbox"
                            checked={opt.state}
                            onChange={(e) => opt.setter(e.target.checked)}
                            className="sr-only"
                        />
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${opt.state ? 'translate-x-4' : ''}`} />
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                        {opt.label}
                    </span>
                </label>
            ))}
          </div>
        </div>

        <button
            onClick={generate}
            className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/20 active:scale-[0.98]"
        >
            <RefreshCw size={18} /> Regenerate Key
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex-grow flex flex-col justify-center gap-4 bg-zinc-100/50 dark:bg-zinc-950/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 min-h-[200px]">
          <div className="flex justify-between items-center">
             <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Generated Output</label>
             <button
                onClick={() => copy(key)}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                title="Copy Key"
             >
                {isCopied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
             </button>
          </div>
          <div className="p-6 bg-zinc-950 text-red-400 font-mono text-xl md:text-2xl break-all leading-tight border border-zinc-800 rounded-xl min-h-[120px] flex items-center justify-center text-center">
            {key}
          </div>
          <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest">
            Cryptographically secure random values
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecureKeyGen;
