import React, { useState, useEffect } from 'react';
import cronstrue from 'cronstrue';
import useClipboard from '../../hooks/useClipboard';
import { Copy, Check, Clock } from 'lucide-react';

const CronTranslator: React.FC = () => {
  const [cron, setCron] = useState('*/5 * * * *');
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { isCopied, copy } = useClipboard();

  useEffect(() => {
    if (!cron.trim()) {
      setTranslation('');
      setError(null);
      return;
    }

    try {
      const result = cronstrue.toString(cron);
      setTranslation(result);
      setError(null);
    } catch (e: any) {
      setError(e.toString());
      setTranslation('');
    }
  }, [cron]);

  const examples = [
    '*/5 * * * *',
    '0 0 * * *',
    '0 12 * * 1-5',
    '0 0 1 1 *',
    '30 15 * * 5',
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <Clock size={14} /> Cron Expression
          </label>
          <input
            type="text"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
            placeholder="* * * * *"
            className="w-full p-4 font-mono text-xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          {error && <p className="text-red-500 text-xs">Error: {error}</p>}
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Quick Examples</label>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => setCron(ex)}
                className="px-3 py-1.5 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex-grow flex flex-col justify-center gap-4 bg-zinc-100/50 dark:bg-zinc-950/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 min-h-[200px]">
          <label className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Human Readable</label>
          <div className="text-2xl font-display font-medium text-emerald-500 leading-tight">
            {translation || (error ? 'Invalid Expression' : 'Enter a cron string...')}
          </div>
          
          <button
            onClick={() => copy(translation)}
            disabled={!translation}
            className="mt-6 self-start flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-sm font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
          >
            {isCopied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            {isCopied ? 'Copied Description' : 'Copy Description'}
          </button>
        </div>
        
        <div className="p-4 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
            <strong>Tip:</strong> Cron expressions are usually 5 or 6 fields separated by spaces. 
            Standard format: minute, hour, day of month, month, day of week.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CronTranslator;
