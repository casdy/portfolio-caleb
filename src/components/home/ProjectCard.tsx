import React from 'react';
import { ExternalLink, Info, Zap, Archive } from 'lucide-react';
import Button from '../common/Button';
import { motion } from 'framer-motion';
import type { ProjectCardProps } from '../../types';

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDetails }) => {
    const badgeLabel = project.isLive ? 'LIVE' : 'ARCHIVE';
    const badgeIcon = project.isLive ? <Zap size={12} className="mr-1" /> : <Archive size={12} className="mr-1" />;
    const badgeClasses = project.isLive
        ? 'bg-white text-black border border-white'
        : 'bg-black text-white border border-white/20';
    
    const glowBorder = 'border-white/10 dark:border-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]';

    const launchUrl = project.liveUrl || project.homepage;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`bg-white dark:bg-[#0a0a0a] backdrop-blur-sm shadow-lg transition-all duration-300 flex flex-col h-full border ${glowBorder}`}
        >
            {/* Preview Image */}
            {project.previewImage && (
                <div className="w-full h-40 overflow-hidden">
                    <img 
                        src={project.previewImage} 
                        alt={`${project.name} preview`}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                    />
                </div>
            )}
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-white">
                        {project.name}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center shrink-0 ${badgeClasses}`}>
                        {badgeIcon}
                        {badgeLabel}
                    </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-300 mb-6 line-clamp-3 text-sm">
                    {project.description || 'No description provided.'}
                </p>

                {/* Language bar */}
                {project.languages.length > 0 && (
                    <div className="mb-4">
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                            {project.languages.slice(0, 4).map((lang) => (
                                <div key={lang.name} className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-600"></span>
                                    <span>{lang.name} {Math.round(lang.percent)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Framework badge (for Vercel projects) */}
                {project.framework && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold bg-zinc-900 text-white rounded-sm border border-white/10 font-mono">
                            {project.framework}
                        </span>
                    </div>
                )}

                {/* Topics / Tags */}
                {project.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                        {project.topics.slice(0, 5).map(topic => (
                            <span key={topic} className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold bg-zinc-900 text-zinc-400 rounded-sm border border-white/5 font-mono">
                                {topic}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="px-6 pb-6 pt-0 mt-auto flex gap-3">
                <Button variant="outline" className="flex-1 text-sm py-2 text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-600 hover:dark:bg-zinc-800 hover:dark:text-white transition-all font-mono uppercase" onClick={() => onDetails(project)}>
                    <Info size={16} className="mr-2" />
                    Details
                </Button>

                {launchUrl && (
                    <Button variant="primary" className={`flex-1 text-sm py-2 ${project.isLive ? 'bg-white text-black hover:bg-zinc-200 font-mono uppercase' : 'font-mono uppercase transition-all'}`} to={launchUrl} target="_blank">
                        <ExternalLink size={16} className="mr-2" />
                        Launch
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;
