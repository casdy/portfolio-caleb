import { useState } from 'react';
import ProjectCard from './ProjectCard';
import Modal from '../common/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import projectData from '../../data/generated-projects.json';
import type { MergedProject } from '../../types';


const ProjectsGrid = () => {
    const [selectedProject, setSelectedProject] = useState<MergedProject | null>(null);

    const liveCount = projectData.filter(p => p.isLive).length;
    const archiveCount = projectData.filter(p => !p.isLive).length;

    const handleViewDetails = (project: MergedProject) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    // ─── Render ─────────────────────────────────────────────────────────────────


    return (
        <div id="projects" className="py-20 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold font-display text-zinc-900 dark:text-white mb-4"
                    >
                        The Node Grid
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto font-mono text-sm"
                    >
                        <span className="text-white bg-zinc-900 border border-white/10 px-2 py-0.5 rounded">{liveCount} LIVE</span>
                        <span className="mx-3 opacity-30">|</span>
                        <span className="text-zinc-400 bg-black border border-white/10 px-2 py-0.5 rounded">{archiveCount} ARCHIVED</span>
                        <span className="mx-3 opacity-30">|</span>
                        <span className="text-zinc-500">SYS_CONNECTED</span>
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(projectData as MergedProject[]).map((project, index) => (
                        <motion.div
                            key={project.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            viewport={{ once: true }}
                        >
                            <ProjectCard
                                project={project}
                                onDetails={handleViewDetails}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {selectedProject && (
                    <Modal
                        isOpen={!!selectedProject}
                        onClose={closeModal}
                        project={selectedProject}
                        content={(selectedProject as any)?.readme || '# ' + selectedProject.name + '\n\n' + (selectedProject.description || 'Live deployment on Vercel.')}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectsGrid;
