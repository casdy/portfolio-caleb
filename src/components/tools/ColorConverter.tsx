import React, { useState, useEffect } from 'react';
import useClipboard from '../../hooks/useClipboard';
import { Copy, Check, Palette } from 'lucide-react';

const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#00e5ff');
  const [rgb, setRgb] = useState('rgb(0, 229, 255)');
  const [hsl, setHsl] = useState('hsl(186, 100%, 50%)');
  const { isCopied, copy } = useClipboard();

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const updateFromHex = (val: string) => {
    setHex(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      const rgbVal = hexToRgb(val);
      if (rgbVal) {
        const rgbStr = `rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`;
        const hslVal = rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b);
        const hslStr = `hsl(${hslVal.h}, ${hslVal.s}%, ${hslVal.l}%)`;
        setRgb(rgbStr);
        setHsl(hslStr);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="flex flex-col gap-6 justify-center">
        <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <Palette size={14} /> Color Formats
        </label>
        
        <div className="space-y-4">
          {[
            { label: 'HEX', value: hex, setter: updateFromHex, placeholder: '#000000' },
            { label: 'RGB', value: rgb, setter: setRgb, readOnly: true },
            { label: 'HSL', value: hsl, setter: setHsl, readOnly: true },
          ].map((field) => (
            <div key={field.label} className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-mono text-zinc-500">{field.label}</span>
                <button
                  onClick={() => copy(field.value)}
                  className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
                >
                   {isCopied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                </button>
              </div>
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.setter && field.setter(e.target.value)}
                readOnly={field.readOnly}
                placeholder={field.placeholder}
                className={`w-full p-3 font-mono text-sm rounded-xl border outline-none transition-all ${
                  field.readOnly 
                    ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500' 
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-cyan-500'
                }`}
              />
            </div>
          ))}
        </div>

        <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-500">Visual Picker</span>
            <input
                type="color"
                value={hex}
                onChange={(e) => updateFromHex(e.target.value)}
                className="w-full h-12 rounded-xl cursor-pointer bg-transparent border-none"
            />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        <div 
            className="w-48 h-48 rounded-3xl shadow-2xl transition-all duration-300" 
            style={{ backgroundColor: hex }}
        />
        <div className="text-center">
            <h3 className="text-2xl font-display font-bold mb-1">{hex.toUpperCase()}</h3>
            <p className="text-sm text-zinc-500 font-mono italic">Live Swatch Preview</p>
        </div>

        <div className="w-full grid grid-cols-5 gap-2 mt-4">
            {[0.1, 0.3, 0.5, 0.7, 0.9].map(op => (
                <div key={op} className="space-y-1">
                    <div 
                        className="h-12 rounded-lg" 
                        style={{ backgroundColor: hex, opacity: op }}
                    />
                    <span className="text-[10px] text-zinc-500 font-mono block text-center">{(op * 100).toFixed(0)}%</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;
