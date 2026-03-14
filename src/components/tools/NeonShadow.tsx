import React, { useState } from 'react';
import useClipboard from '../../hooks/useClipboard';
import { Copy, Check, SunMoon } from 'lucide-react';

const NeonShadow: React.FC = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(5);
  const [color, setColor] = useState('#00e5ff');
  const [opacity, setOpacity] = useState(50);
  
  const { isCopied, copy } = useClipboard();

  const rgba = (hex: string, op: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${op / 100})`;
  };

  const shadowValue = `${x}px ${y}px ${blur}px ${spread}px ${rgba(color, opacity)}`;
  const cssOutput = `box-shadow: ${shadowValue};`;
  const tailwindOutput = `shadow-[${x}px_${y}px_${blur}px_${spread}px_${rgba(color, opacity).replace(/\s/g, '')}]`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <header className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-medium text-sm">
            <SunMoon size={14} /> Adjust Parameters
          </header>
          
          {[
            { label: 'Offset X', value: x, setter: setX, min: -100, max: 100 },
            { label: 'Offset Y', value: y, setter: setY, min: -100, max: 100 },
            { label: 'Blur Radius', value: blur, setter: setBlur, min: 0, max: 200 },
            { label: 'Spread Radius', value: spread, setter: setSpread, min: -50, max: 100 },
            { label: 'Opacity (%)', value: opacity, setter: setOpacity, min: 0, max: 100 },
          ].map((slider) => (
            <div key={slider.label} className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-500">{slider.label}</span>
                <span className="text-cyan-500">{slider.value}px</span>
              </div>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                value={slider.value}
                onChange={(e) => slider.setter(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          ))}

          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-500">Glow Color</label>
            <div className="flex gap-4 items-center">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-none"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-grow p-2 font-mono text-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex-grow flex flex-col items-center justify-center bg-zinc-100/50 dark:bg-zinc-950/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 min-h-[300px]">
          <div 
            className="w-32 h-32 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300"
            style={{ boxShadow: shadowValue }}
          />
          <p className="mt-8 text-xs text-zinc-500 font-mono">Real-time Preview</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono text-zinc-500">CSS Output</label>
              <button 
                onClick={() => copy(cssOutput)}
                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
            </div>
            <code className="block p-3 text-xs font-mono bg-zinc-950 text-cyan-400 rounded-lg border border-zinc-800 break-all">
              {cssOutput}
            </code>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono text-zinc-500">Tailwind Class</label>
              <button 
                onClick={() => copy(tailwindOutput)}
                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
            </div>
            <code className="block p-3 text-xs font-mono bg-zinc-950 text-pink-400 rounded-lg border border-zinc-800 break-all">
              {tailwindOutput}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeonShadow;
