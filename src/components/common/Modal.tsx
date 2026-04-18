import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, Maximize2, BookOpen, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { motion } from 'framer-motion';
import type { ProjectModalProps } from '../../types';

type ModalTab = 'preview' | 'readme';
type Viewport = 'desktop' | 'mobile';

const Modal: React.FC<ProjectModalProps> = ({ onClose, project, content }) => {
    if (!project) return null;

    const previewUrl = project.liveUrl || project.homepage;

    // Use locally-captured Puppeteer screenshot if available
    const screenshotUrl = project.previewImage;
    const hasPreview = !!screenshotUrl;

    const [activeTab, setActiveTab] = useState<ModalTab>(hasPreview ? 'preview' : 'readme');
    const [viewport, setViewport] = useState<Viewport>('desktop');
    const [screenshotLoaded, setScreenshotLoaded] = useState(false);
    const [screenshotError, setScreenshotError] = useState(false);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    // Reset state when project changes
    useEffect(() => {
        setActiveTab(hasPreview ? 'preview' : 'readme');
        setViewport('desktop');
        setScreenshotLoaded(false);
        setScreenshotError(false);
    }, [project.key, hasPreview]);

    const borderClass = project.isLive
        ? 'border-cyan-500/30 shadow-cyan-500/10'
        : 'border-purple-500/30 shadow-purple-500/10';

    const spinnerColor = project.isLive
        ? 'border-cyan-400'
        : 'border-purple-400';

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    aria-hidden="true"
                    onClick={onClose}
                />

                {/* Modal Panel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className={`relative z-50 w-full max-w-6xl max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl border ${borderClass} bg-white dark:bg-slate-950/95 backdrop-blur-xl flex flex-col`}
                >
                    {/* Header */}
                    <div className="flex justify-between items-start p-5 border-b border-zinc-200 dark:border-zinc-800/80 shrink-0">
                        <div className="flex-1 min-w-0 mr-4">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-white truncate" id="modal-title">
                                    {project.name}
                                </h3>
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                                    project.isLive
                                        ? 'bg-cyan-900/40 text-cyan-300 border border-cyan-500/30'
                                        : 'bg-purple-900/40 text-purple-300 border border-purple-500/30'
                                }`}>
                                    {project.isLive ? 'LIVE' : 'ARCHIVE'}
                                </span>
                            </div>
                            {project.description && (
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xl line-clamp-2">{project.description}</p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors shrink-0"
                        >
                            <span className="sr-only">Close</span>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tab bar */}
                    {hasPreview && (
                        <div className="flex border-b border-zinc-200 dark:border-zinc-800/60 bg-zinc-50/80 dark:bg-zinc-950/80 shrink-0">
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                                    activeTab === 'preview'
                                        ? 'border-cyan-400 text-cyan-400'
                                        : 'border-transparent text-zinc-400 hover:text-zinc-200'
                                }`}
                            >
                                <Maximize2 size={14} />
                                Preview
                            </button>
                            <button
                                onClick={() => setActiveTab('readme')}
                                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                                    activeTab === 'readme'
                                        ? 'border-cyan-400 text-cyan-400'
                                        : 'border-transparent text-zinc-400 hover:text-zinc-200'
                                }`}
                            >
                                <BookOpen size={14} />
                                README
                            </button>
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 overflow-hidden">
                        {activeTab === 'preview' && screenshotUrl ? (
                            /* Screenshot-based preview with "Open App" overlay */
                            <div className="w-full h-full min-h-[65vh] bg-zinc-900 relative group">
                                {/* Loading state */}
                                {!screenshotLoaded && !screenshotError && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                                        <div className={`animate-spin rounded-full h-10 w-10 border-b-2 ${spinnerColor}`} />
                                        <span className="text-zinc-400 dark:text-zinc-500 font-mono text-sm">Generating preview...</span>
                                    </div>
                                )}

                                 {/* Viewport Toggle */}
                                <div className="absolute top-4 right-4 z-20 flex bg-zinc-900/80 backdrop-blur-md rounded-lg p-1 border border-zinc-700 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setViewport('desktop'); setScreenshotLoaded(false); }}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${viewport === 'desktop' ? 'bg-cyan-500 text-slate-950' : 'text-zinc-400 hover:text-white'}`}
                                    >
                                        Desktop
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setViewport('mobile'); setScreenshotLoaded(false); }}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${viewport === 'mobile' ? 'bg-cyan-500 text-slate-950' : 'text-zinc-400 hover:text-white'}`}
                                    >
                                        Mobile
                                    </button>
                                </div>

                                {/* Screenshot image */}
                                <img
                                    src={viewport === 'desktop' ? project.previewImage! : (project.previewImageMobile || project.previewImage!)}
                                    alt={`Preview of ${project.name}`}
                                    className={`w-full h-full max-h-[65vh] object-contain transition-opacity duration-500 ${screenshotLoaded ? 'opacity-100' : 'opacity-0'} ${viewport === 'mobile' ? 'max-w-[390px] mx-auto' : ''}`}
                                    onLoad={() => setScreenshotLoaded(true)}
                                    onError={() => setScreenshotError(true)}
                                />

                                {/* Error fallback */}
                                {screenshotError && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-zinc-900">
                                        <Globe size={48} className="text-zinc-600" />
                                        <p className="text-zinc-400 font-mono text-sm">Preview unavailable</p>
                                    </div>
                                )}

                                {/* Hover overlay with "Open App" CTA */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                                    <a
                                        href={previewUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-lg flex items-center gap-3 shadow-2xl shadow-cyan-500/30"
                                    >
                                        <ExternalLink size={22} />
                                        Open Live App
                                    </a>
                                </div>
                            </div>
                        ) : (
                            /* README markdown */
                            <div className="overflow-y-auto max-h-[calc(92vh-180px)]">
                                <div className="p-6 prose dark:prose-invert prose-zinc max-w-none">
                                    {content ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ReactMarkdown 
                                                remarkPlugins={[remarkGfm]} 
                                                rehypePlugins={[
                                                    rehypeRaw, 
                                                    [rehypeSanitize, {
                                                        tagNames: ['img', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'span', 'div', 'code', 'pre', 'strong', 'em', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br', 'hr'],
                                                        attributes: {
                                                            '*': ['className', 'style'],
                                                            'a': ['href', 'target', 'rel', 'title'],
                                                            'img': ['src', 'alt', 'title', 'width', 'height', 'loading'],
                                                            'code': ['className']
                                                        }
                                                    }]
                                                ]}
                                            >
                                                {content}
                                            </ReactMarkdown>
                                        </motion.div>
                                    ) : (
                                        <div className="flex justify-center items-center h-32">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${spinnerColor}`} />
                                                <span className="text-zinc-400 dark:text-zinc-500 font-mono text-xs">Loading README...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-row justify-between items-center bg-zinc-50/50 dark:bg-zinc-950/50 shrink-0">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <div className="flex space-x-4">
                             {previewUrl && (
                                <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-medium text-sm transition-colors">
                                    <ExternalLink size={16} className="mr-1.5" /> Open App
                                </a>
                            )}
                             {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium text-sm transition-colors">
                                    <Github size={16} className="mr-1.5" /> Source
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Modal;
