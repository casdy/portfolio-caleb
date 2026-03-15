import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Utensils, Headphones, Beaker, Terminal } from 'lucide-react';

interface SkeletonProps {
  className?: string;
}

interface PageSplashProps {
  type: 'tech' | 'culinary' | 'service' | 'labtools';
}

const splashConfig = {
  tech: {
    icon: Code2,
    color: 'text-cyan-400',
    glow: 'bg-cyan-500/20',
    border: 'border-cyan-500/30',
    label: 'TECH_NEXUS_OS'
  },
  culinary: {
    icon: Utensils,
    color: 'text-orange-400',
    glow: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    label: 'CULINARY_CORE_v2.0'
  },
  service: {
    icon: Headphones,
    color: 'text-fuchsia-400',
    glow: 'bg-fuchsia-500/20',
    border: 'border-fuchsia-500/30',
    label: 'SERVICE_LAYER_ACTIVE'
  },
  labtools: {
    icon: Beaker,
    color: 'text-emerald-400',
    glow: 'bg-emerald-500/20',
    border: 'border-emerald-500/30',
    label: 'LAB_UTILITIES_SYNC'
  }
};

export const SkeletonCard: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`bg-slate-200/50 dark:bg-slate-800/50 animate-pulse border border-slate-300/50 dark:border-slate-700/50 rounded-xl ${className}`} />
);

export const SkeletonModal: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-100/80 dark:bg-slate-950/80 backdrop-blur-sm`}>
    <div className={`w-full max-w-4xl h-[80vh] bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/50 rounded-2xl animate-pulse ${className}`} />
  </div>
);

export const SkeletonChat: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`w-80 sm:w-96 h-[500px] flex flex-col bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border border-cyan-500/50 rounded-xl overflow-hidden animate-pulse ${className}`}>
    <div className="h-14 bg-slate-50 dark:bg-slate-900 border-b border-cyan-500/30" />
    <div className="flex-1 p-4 space-y-4">
      <div className="w-2/3 h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
      <div className="w-1/2 h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl self-end" />
      <div className="w-3/4 h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
    </div>
    <div className="h-16 bg-slate-50 dark:bg-slate-900 border-t border-cyan-500/30" />
  </div>
);

export const PageSplash: React.FC<PageSplashProps> = ({ type }) => {
  const config = splashConfig[type];
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="relative flex flex-col items-center">
        {/* Ambient Glow */}
        <div className={`absolute -inset-20 blur-[100px] rounded-full opacity-40 dark:opacity-50 animate-pulse ${config.glow}`} />
        
        {/* Terminal Window Loader */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative w-64 sm:w-80 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border ${config.border} rounded-2xl shadow-xl dark:shadow-2xl`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className={`flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest ${config.color}`}>
              <Terminal size={14} />
              <span>{config.label}</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center gap-4 py-8">
            <div className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border ${config.border}`}>
              <Icon className={`w-8 h-8 ${config.color}`} />
            </div>
            
            <div className="flex flex-col items-center gap-1.5 w-full">
              <div className="flex justify-between w-full px-2">
                <span className="font-mono text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Initializing...</span>
                <span className={`font-mono text-[9px] ${config.color}`}>SYSTEM_READY</span>
              </div>
              <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700/50">
                <motion.div 
                   initial={{ x: '-100%' }}
                   animate={{ x: '100%' }}
                   transition={{ 
                     repeat: Infinity, 
                     duration: 1.5, 
                     ease: "easeInOut" 
                   }}
                   className={`h-full w-1/3 blur-[2px] ${config.color.replace('text', 'bg')}`}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
