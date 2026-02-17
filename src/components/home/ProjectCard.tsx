import React from 'react';
import { ExternalLink, Info } from 'lucide-react';
import Button from '../common/Button';
import { motion } from 'framer-motion';
import { Repo } from '../../hooks/useGitHubRepos';

interface ProjectCardProps {
    project: Repo;
    onDetails: (project: Repo) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDetails }) => {
    return (
        <motion.div
            layoutId={`project-card-${project.id}`}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg hover:shadow-xl dark:shadow-zinc-900/50 transition-shadow transition-colors duration-300 overflow-hidden flex flex-col h-full border border-zinc-100 dark:border-zinc-800"
        >
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.name}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                        {project.language || 'Web'}
                    </span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-3 text-sm">
                    {project.description || "No description provided."}
                </p>

                {/* Language Bar */}
                {project.languages && project.languages.length > 0 && (
                    <div className="mb-4">
                        <div className="flex h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 w-full">
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
                                <div key={lang.name} className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: lang.color }}></span>
                                    <span>{lang.name} {Math.round(lang.percent)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills / Topics */}
                {project.topics && project.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                        {project.topics.slice(0, 5).map(topic => (
                            <span key={topic} className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded border border-zinc-200 dark:border-zinc-700">
                                {topic}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="px-6 pb-6 pt-0 mt-auto flex gap-3">
                <Button variant="outline" className="flex-1 text-sm py-2" onClick={() => onDetails(project)}>
                    <Info size={16} className="mr-2" />
                    Details
                </Button>

                {project.homepage && (
                    <Button variant="primary" className="flex-1 text-sm py-2" to={project.homepage} target="_blank">
                        <ExternalLink size={16} className="mr-2" />
                        Launch
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;
