import React, { useState } from 'react';
import useClipboard from '../../hooks/useClipboard';
import { Copy, Check, Code2, ArrowLeftRight } from 'lucide-react';

const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);
  const { isCopied, copy } = useClipboard();

  const process = (val: string, currentMode: 'encode' | 'decode') => {
    setInput(val);
    if (!val.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (currentMode === 'encode') {
        setOutput(btoa(val));
      } else {
        setOutput(atob(val));
      }
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    // Try to swap input and output
    const oldOutput = output;
    process(oldOutput, newMode);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <Code2 size={14} /> Base64 {mode === 'encode' ? 'Encoder' : 'Decoder'}
        </label>
        <button
          onClick={toggleMode}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-colors"
        >
          <ArrowLeftRight size={14} /> Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-zinc-500 uppercase tracking-tighter">
            {mode === 'encode' ? 'Plain Text' : 'Base64 String'}
          </label>
          <textarea
            value={input}
            onChange={(e) => process(e.target.value, mode)}
            placeholder={mode === 'encode' ? 'Hello World' : 'SGVsbG8gV29ybGQ='}
            className="flex-grow p-4 font-mono text-sm bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
          />
          {error && <p className="text-red-500 text-xs mt-1">Invalid {mode === 'decode' ? 'Base64' : 'String'}: {error}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-mono text-zinc-500 uppercase tracking-tighter">
              {mode === 'encode' ? 'Base64 Result' : 'Plain Text Result'}
            </label>
            <button
              onClick={() => copy(output)}
              disabled={!output}
              className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              {isCopied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="flex-grow p-4 font-mono text-sm bg-zinc-950 text-cyan-400 border border-zinc-800 rounded-xl outline-none resize-none"
            placeholder="Result will appear here..."
          />
        </div>
      </div>

      <div className="p-4 bg-zinc-100 dark:bg-zinc-900/50 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl text-center">
        <p className="text-xs text-zinc-500">
          This tool uses the browser's native <code>btoa()</code> and <code>atob()</code> functions.
          All processing is done locally in your browser.
        </p>
      </div>
    </div>
  );
};

export default Base64Tool;
