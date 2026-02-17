import React, { useEffect } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { motion } from 'framer-motion';
import { Repo } from '../../hooks/useGitHubRepos';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Repo | null;
    content: string | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, project, content }) => {
    // Note: isOpen is not strictly used for rendering logic here as strict AnimatePresence handling is done by parent,
    // but we check project existence.
    if (!project) return null;

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-gray-500/75 dark:bg-black/75 backdrop-blur-sm transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></motion.div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <motion.div
                    layoutId={`project-card-${project.id}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="inline-block relative z-50 align-bottom bg-white dark:bg-slate-900 rounded-lg text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-gray-200 dark:border-slate-700"
                >
                    <div className="bg-white dark:bg-slate-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-start mb-4 border-b border-gray-100 dark:border-slate-800 pb-4">
                            <div>
                                <h3 className="text-2xl leading-6 font-bold text-gray-900 dark:text-gray-100" id="modal-title">
                                    {project?.name}
                                </h3>
                                {project?.description && <p className="text-gray-500 dark:text-gray-400 mt-1">{project.description}</p>}
                            </div>
                            <button
                                onClick={onClose}
                                className="bg-white dark:bg-slate-800 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none p-1"
                            >
                                <span className="sr-only">Close</span>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="prose prose-zinc dark:prose-invert max-w-none max-h-[60vh] overflow-y-auto pr-2">
                            {content ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                                        {content}
                                    </ReactMarkdown>
                                </motion.div>
                            ) : (
                                <div className="flex justify-center items-center h-32">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-950 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-between items-center border-t border-gray-100 dark:border-slate-800">
                        <div className="flex space-x-3">
                            {project?.homepage && (
                                <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                                    <ExternalLink size={18} className="mr-1" /> Launch App
                                </a>
                            )}
                            <a href={project?.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white font-medium">
                                <Github size={18} className="mr-1" /> View Code
                            </a>
                        </div>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-slate-600 shadow-sm px-4 py-2 bg-white dark:bg-slate-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Modal;
