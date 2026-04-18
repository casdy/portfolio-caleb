import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  ShieldCheck, 
  SunMoon, 
  Clock, 
  Search, 
  FileJson, 
  Palette, 
  FileEdit, 
  Lock, 
  Hash,
  X,
  Activity,
  FileType
} from 'lucide-react';

const JsonToTs = React.lazy(() => import('../components/tools/JsonToTs'));
const JwtDecoder = React.lazy(() => import('../components/tools/JwtDecoder'));
const NeonShadow = React.lazy(() => import('../components/tools/NeonShadow'));
const CronTranslator = React.lazy(() => import('../components/tools/CronTranslator'));
const RegexTester = React.lazy(() => import('../components/tools/RegexTester'));
const Base64Tool = React.lazy(() => import('../components/tools/Base64Tool'));
const ColorConverter = React.lazy(() => import('../components/tools/ColorConverter'));
const MarkdownPreview = React.lazy(() => import('../components/tools/MarkdownPreview'));
const SecureKeyGen = React.lazy(() => import('../components/tools/SecureKeyGen'));
const BcryptHash = React.lazy(() => import('../components/tools/BcryptHash'));
const FileConverter = React.lazy(() => import('../components/tools/FileConverter'));

// Tool Types
interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  component: React.LazyExoticComponent<React.FC<any>>;
  color: string;
}

const tools: Tool[] = [
  {
    id: 'json-to-ts',
    title: 'JSON to TypeScript',
    description: 'Convert raw JSON to strongly-typed interfaces.',
    icon: FileJson,
    component: JsonToTs,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'jwt-decoder',
    title: 'JWT Decoder',
    description: 'Decode header and payload instantly (client-side).',
    icon: ShieldCheck,
    component: JwtDecoder,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'neon-shadow',
    title: 'Neon Shadow',
    description: 'Generate glowing cyberpunk CSS box-shadows.',
    icon: SunMoon,
    component: NeonShadow,
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'cron-translator',
    title: 'Cron Translator',
    description: 'Translate cron strings to human-readable text.',
    icon: Clock,
    component: CronTranslator,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'regex-tester',
    title: 'Regex Tester',
    description: 'Real-time regular expression testing & visualization.',
    icon: Search,
    component: RegexTester,
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'base64-tool',
    title: 'Base64 Encoder',
    description: 'Securely encode and decode Base64 strings.',
    icon: Code2,
    component: Base64Tool,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'color-converter',
    title: 'Color Converter',
    description: 'HEX, RGB, HSL conversions with live preview.',
    icon: Palette,
    component: ColorConverter,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'markdown-preview',
    title: 'Markdown Preview',
    description: 'Real-time GFM rendering and preview.',
    icon: FileEdit,
    component: MarkdownPreview,
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 'secure-key-gen',
    title: 'Secure Key Gen',
    description: 'Generate cryptographically secure random strings.',
    icon: Lock,
    component: SecureKeyGen,
    color: 'from-red-500 to-rose-500',
  },
  {
    id: 'bcrypt-hash',
    title: 'Bcrypt Hash',
    description: 'Generate hashes for secure password testing.',
    icon: Hash,
    component: BcryptHash,
    color: 'from-zinc-500 to-slate-500',
  },
  {
    id: 'file-converter',
    title: 'File Converter',
    description: 'Convert MD, TXT, HTML, CSV, JSON to PDF and back.',
    icon: FileType,
    component: FileConverter,
    color: 'from-teal-500 to-emerald-500',
  },
];

const LabTools = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const activeTool = tools.find(t => t.id === selectedTool);

  return (
    <div className="pb-20">
      {/* Header Section */}
      <div className="text-center py-12 md:py-20 relative overflow-hidden flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative group"
        >
          <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
          
          <div className="relative z-10 p-4 rounded-3xl glass-panel border-cyan-500/20 shadow-[0_20px_50px_rgba(0,229,255,0.15)] group-hover:shadow-[0_25px_60px_rgba(0,229,255,0.25)] transition-all duration-500">
            <div className="relative [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
              <img 
                src="/assets/cyber-toolbox.png" 
                alt="Cyber Toolbox" 
                className="w-48 h-48 md:w-64 md:h-64 object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Inner Glow Polish */}
            <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 uppercase tracking-tight flex items-center justify-center">
            LABTOOLS
            <span className="terminal-cursor text-cyber-cyan opacity-80" />
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto px-4 leading-relaxed">
            A free high-performance toolkit for modern developers. 
            Execution-grade utilities, zero latency, 100% client-side.
          </p>
        </motion.div>
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-cyan-500/20 blur-[120px] rounded-full scale-150"></div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedTool(tool.id)}
            className="glass-panel group cursor-pointer p-6 relative overflow-hidden flex flex-col items-start gap-4 hover:border-cyan-500/50 transition-colors spotlight-border"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
            }}
          >
            {/* Hover Gradient mask handled by spotlight-border in CSS */}
            
            <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} shadow-lg shadow-cyan-500/10`}>
              <tool.icon className="w-6 h-6 text-white" />
            </div>
            
            <div>
              <h3 className="text-xl font-mono font-bold mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                {tool.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {tool.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Interface */}
      <AnimatePresence>
        {selectedTool && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTool(null)}
              className="absolute inset-0 bg-slate-950/40 dark:bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-[#0a0a0a] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col relative border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${activeTool?.color}`}>
                    {activeTool && <activeTool.icon className="w-5 h-5 text-white" />}
                  </div>
                  <h2 className="text-2xl font-mono font-bold uppercase tracking-tight">{activeTool?.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedTool(null)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Tool Interface Wrapper */}
              <div className="flex-grow overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                <React.Suspense fallback={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-500">
                    <Activity className="w-8 h-8 animate-spin text-cyan-500" />
                    <p className="font-mono text-sm tracking-widest uppercase">Initializing Utility...</p>
                  </div>
                }>
                  {activeTool && <activeTool.component />}
                </React.Suspense>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LabTools;
