import React, { useState, useEffect } from 'react';
import useClipboard from '../../hooks/useClipboard';
import { Copy, Check, Terminal } from 'lucide-react';

const JsonToTs: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { isCopied, copy } = useClipboard();

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const interfaces = generateInterfaces(parsed, 'RootInterface');
      setOutput(interfaces);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  }, [input]);

  const generateInterfaces = (obj: any, rootName: string): string => {
    const interfaces: string[] = [];
    const processed = new Set<string>();

    const toInterface = (val: any, name: string): string => {
      if (Array.isArray(val)) {
        if (val.length === 0) return 'any[]';
        const type = toInterface(val[0], name);
        return type.endsWith('[]') ? type : `${type}[]`;
      }
      if (val !== null && typeof val === 'object') {
        const interfaceName = name.charAt(0).toUpperCase() + name.slice(1);
        if (processed.has(interfaceName)) return interfaceName;
        
        processed.add(interfaceName);
        let fields = 'export interface ' + interfaceName + ' {\n';
        for (const [key, value] of Object.entries(val)) {
          const type = toInterface(value, key.endsWith('s') ? key.slice(0, -1) : key);
          fields += `  ${key}: ${type};\n`;
        }
        fields += '}';
        interfaces.push(fields);
        return interfaceName;
      }
      return typeof val;
    };

    toInterface(obj, rootName);
    return interfaces.reverse().join('\n\n');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <Terminal size={14} /> JSON Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{ "key": "value" }'
          className="flex-grow p-4 font-mono text-sm bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
        />
        {error && <p className="text-red-500 text-xs mt-1">Error: {error}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">TypeScript Interfaces</label>
          <button
            onClick={() => copy(output)}
            disabled={!output}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
          >
            {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            {isCopied ? 'Copied' : 'Copy Result'}
          </button>
        </div>
        <div className="relative flex-grow">
          <pre className="absolute inset-0 p-4 font-mono text-sm bg-zinc-950 text-cyan-400 border border-zinc-800 rounded-xl overflow-auto">
            {output || '// Output will appear here'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default JsonToTs;
