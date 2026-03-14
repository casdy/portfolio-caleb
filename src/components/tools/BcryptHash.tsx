import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import useClipboard from '../../hooks/useClipboard';
import { Copy, Check, Hash, Activity } from 'lucide-react';

const BcryptHash: React.FC = () => {
  const [input, setInput] = useState('');
  const [rounds, setRounds] = useState(10);
  const [output, setOutput] = useState('');
  const [isHashing, setIsHashing] = useState(false);
  const { isCopied, copy } = useClipboard();

  const handleHash = async () => {
    if (!input) return;
    setIsHashing(true);
    try {
      // Use setTimeout to allow UI to show hashing state
      setTimeout(() => {
        const salt = bcrypt.genSaltSync(rounds);
        const hash = bcrypt.hashSync(input, salt);
        setOutput(hash);
        setIsHashing(false);
      }, 50);
    } catch (e) {
      console.error(e);
      setIsHashing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="flex flex-col gap-6">
        <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <Hash size={14} /> Plain Text Input
        </label>
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password or string to hash..."
          className="w-full h-32 p-4 font-mono text-sm bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-slate-500 outline-none resize-none"
        />

        <div className="space-y-4">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-zinc-500">Salt Rounds</span>
            <span className="text-slate-500 font-bold">{rounds}</span>
          </div>
          <input
            type="range"
            min="4"
            max="15"
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-slate-500"
          />
          <p className="text-[10px] text-zinc-400 italic">
            Warning: High salt rounds (12+) may cause browser lag during hashing.
          </p>
        </div>

        <button
          onClick={handleHash}
          disabled={!input || isHashing}
          className="flex items-center justify-center gap-2 w-full py-4 bg-slate-800 dark:bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all disabled:opacity-50"
        >
          {isHashing ? <Activity size={18} className="animate-spin" /> : <Hash size={18} />}
          {isHashing ? 'Hashing...' : 'Generate Bcrypt Hash'}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex-grow flex flex-col justify-center gap-4 bg-zinc-100/50 dark:bg-zinc-950/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 min-h-[200px]">
           <div className="flex justify-between items-center">
              <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Resulting Hash</label>
              <button
                onClick={() => copy(output)}
                disabled={!output}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-2 text-xs font-mono disabled:opacity-30"
              >
                 {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                 {isCopied ? 'Copied' : 'Copy'}
              </button>
           </div>
           <div className="p-6 bg-zinc-950 text-slate-300 font-mono text-sm break-all leading-relaxed border border-zinc-800 rounded-xl min-h-[100px] flex items-center">
             {output || '// Hash will appear here'}
           </div>
        </div>
        
        <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
             <p className="text-xs text-amber-600 dark:text-amber-400 leading-relaxed">
                <strong>Bcrypt</strong> is a one-way hashing function. You cannot "decode" it. 
                Use this to generate test hashes for seed data or manually verify passwords.
             </p>
        </div>
      </div>
    </div>
  );
};

export default BcryptHash;
