import React, { useState, useEffect } from 'react';
import useClipboard from '../../hooks/useClipboard';
import { Copy, Check, Shield } from 'lucide-react';

const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { isCopied, copy } = useClipboard();

  useEffect(() => {
    if (!token.trim()) {
      setHeader(null);
      setPayload(null);
      setError(null);
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Must have 3 parts separated by dots.');
      }

      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = JSON.parse(atob(parts[1]));

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setHeader(null);
      setPayload(null);
    }
  }, [token]);

  const copyResult = () => {
    const result = JSON.stringify({ header, payload }, null, 2);
    copy(result);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <Shield size={14} /> JWT Token
        </label>
        <div className="relative">
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="w-full h-24 p-4 font-mono text-xs bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none break-all"
          />
        </div>
        {error && <p className="text-red-500 text-xs">Error: {error}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow overflow-hidden">
        <div className="flex flex-col gap-2 overflow-hidden">
          <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Header</label>
          <pre className="flex-grow p-4 font-mono text-xs bg-zinc-950 text-purple-400 border border-zinc-800 rounded-xl overflow-auto">
            {header ? JSON.stringify(header, null, 2) : '// Header'}
          </pre>
        </div>
        <div className="flex flex-col gap-2 overflow-hidden">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Payload</label>
            <button
              onClick={copyResult}
              disabled={!payload}
              className="flex items-center gap-2 px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
            >
              {isCopied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
              {isCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="flex-grow p-4 font-mono text-xs bg-zinc-950 text-indigo-400 border border-zinc-800 rounded-xl overflow-auto">
            {payload ? JSON.stringify(payload, null, 2) : '// Payload'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default JwtDecoder;
