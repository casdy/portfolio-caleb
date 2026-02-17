import { useState } from 'react';
import useGitHubRepos, { Repo } from '../../hooks/useGitHubRepos';
import ProjectCard from './ProjectCard';
import Modal from '../common/Modal';
import { AnimatePresence } from 'framer-motion';

const ProjectsGrid = () => {
    const { repos, loading, error } = useGitHubRepos('casdy');
    const [selectedProject, setSelectedProject] = useState<Repo | null>(null);
    const [readmeContent, setReadmeContent] = useState<string | null>('');

    const handleViewDetails = async (project: Repo) => {
        setSelectedProject(project);
        setReadmeContent(null); // Clear previous content

        try {
            // Trying to fetch raw markdown via API
            const response = await fetch(`https://api.github.com/repos/casdy/${project.name}/readme`, {
                headers: {
                    'Accept': 'application/vnd.github.raw+json'
                }
            });

            if (response.ok) {
                const text = await response.text();
                setReadmeContent(text);
            } else {
                setReadmeContent('# No README found\nThis project does not have a detailed README file.');
            }
        } catch (err) {
            console.error("Error fetching README:", err);
            setReadmeContent('# Error\nFailed to load project details.');
        }
    };

    const closeModal = () => {
        setSelectedProject(null);
        setReadmeContent('');
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-pulse flex space-x-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-4 py-1">
                        <div className="h-4 w-48 bg-gray-200 rounded"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500">Failed to load projects: {error}</p>
            </div>
        );
    }

    return (
        <div id="projects" className="py-20 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-zinc-900 dark:text-white mb-4">Featured Projects</h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        A selection of my recent work, focusing on utility, data visualization, and user experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {repos.map(repo => (
                        <ProjectCard
                            key={repo.id}
                            project={repo}
                            onDetails={handleViewDetails}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <Modal
                        isOpen={!!selectedProject}
                        onClose={closeModal}
                        project={selectedProject}
                        content={readmeContent}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectsGrid;
