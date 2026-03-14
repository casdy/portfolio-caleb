import React from 'react';
import { ExternalLink, Info, Zap, Archive } from 'lucide-react';
import Button from '../common/Button';
import { motion } from 'framer-motion';
import type { ProjectCardProps } from '../../types';

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDetails }) => {
    const badgeLabel = project.isLive ? 'LIVE' : 'ARCHIVE';
    const badgeIcon = project.isLive ? <Zap size={12} className="mr-1" /> : <Archive size={12} className="mr-1" />;
    const badgeClasses = project.isLive
        ? 'bg-cyan-900/30 text-cyan-300 border border-cyan-500/30'
        : 'bg-purple-900/30 text-purple-300 border border-purple-500/30';
    
    const glowBorder = project.isLive
        ? 'border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]'
        : 'border-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]';

    const launchUrl = project.liveUrl || project.homepage;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border ${glowBorder}`}
        >
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold font-display text-white">
                        {project.name}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center shrink-0 ${badgeClasses}`}>
                        {badgeIcon}
                        {badgeLabel}
                    </span>
                </div>

                <p className="text-zinc-400 mb-6 line-clamp-3 text-sm">
                    {project.description || 'No description provided.'}
                </p>

                {/* Language bar */}
                {project.languages.length > 0 && (
                    <div className="mb-4">
                        <div className="flex h-2 overflow-hidden rounded-full bg-zinc-800 w-full">
                            {project.languages.map((lang) => (
                                <div
                                    key={lang.name}
                                    style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
                                    className="h-full"
                                    title={`${lang.name}: ${lang.percent.toFixed(1)}%`}
                                />
                            ))}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                            {project.languages.slice(0, 4).map((lang) => (
                                <div key={lang.name} className="flex items-center gap-1.5 text-xs text-zinc-400">
                                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: lang.color }}></span>
                                    <span>{lang.name} {Math.round(lang.percent)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Framework badge (for Vercel projects) */}
                {project.framework && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold bg-cyan-950/50 text-cyan-300 rounded border border-cyan-500/20 font-mono">
                            {project.framework}
                        </span>
                    </div>
                )}

                {/* Topics / Tags */}
                {project.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                        {project.topics.slice(0, 5).map(topic => (
                            <span key={topic} className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold bg-zinc-800 text-zinc-300 rounded border border-zinc-700 font-mono">
                                {topic}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="px-6 pb-6 pt-0 mt-auto flex gap-3">
                <Button variant="outline" className="flex-1 text-sm py-2 text-zinc-300 border-zinc-600 hover:border-zinc-400" onClick={() => onDetails(project)}>
                    <Info size={16} className="mr-2" />
                    Details
                </Button>

                {launchUrl && (
                    <Button variant="primary" className={`flex-1 text-sm py-2 ${project.isLive ? 'bg-cyan-600 hover:bg-cyan-500' : ''}`} to={launchUrl} target="_blank">
                        <ExternalLink size={16} className="mr-2" />
                        Launch
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;
