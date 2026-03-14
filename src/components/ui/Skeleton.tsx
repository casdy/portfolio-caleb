import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`bg-slate-800/50 animate-pulse border border-slate-700/50 rounded-xl ${className}`} />
);

export const SkeletonModal: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm`}>
    <div className={`w-full max-w-4xl h-[80vh] bg-slate-900/90 border border-slate-700/50 rounded-2xl animate-pulse ${className}`} />
  </div>
);

export const SkeletonChat: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`w-80 sm:w-96 h-[500px] flex flex-col bg-slate-950/90 backdrop-blur-md border border-cyan-500/50 rounded-xl overflow-hidden animate-pulse ${className}`}>
    <div className="h-14 bg-slate-900 border-b border-cyan-500/30" />
    <div className="flex-1 p-4 space-y-4">
      <div className="w-2/3 h-10 bg-slate-800 rounded-2xl" />
      <div className="w-1/2 h-10 bg-slate-800 rounded-2xl self-end" />
      <div className="w-3/4 h-10 bg-slate-800 rounded-2xl" />
    </div>
    <div className="h-16 bg-slate-900 border-t border-cyan-500/30" />
  </div>
);
