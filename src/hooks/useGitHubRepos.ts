import { useState, useEffect } from 'react';

interface Language {
    name: string;
    percent: number;
    color: string;
}

export interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    topics: string[];
    languages_url: string;
    fork: boolean;
    languages?: Language[];
}

const useGitHubRepos = (username: string) => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
                if (!response.ok) {
                    throw new Error(`GitHub API Error: ${response.statusText}`);
                }
                const data: Repo[] = await response.json();

                // Custom filtering and sorting
                // 1. Filter out forks (optional) and the specific 'projects' repo
                let filtered = data.filter(repo => 
                    !repo.fork && 
                    repo.name.toLowerCase() !== 'projects'
                );

                // Map of custom descriptions
                const customDescriptions: Record<string, string> = {
                    'juuk-dictionary': "A quick Dictionary webapp, with a simple UI. The user simply types a word & hits the 'ENTER' key. Using the Free Dictionary API.",
                    'password-generator': "A secure, client-side password generator styled as a retro-futuristic 'Cyber-Terminal'. Features CRT scanlines, boot sequences, and robust entropy.",
                    'geopol': "Real-Time Intelligence Dashboard for tracking geopolitical events. Aggregates live news and weather into a professional Command Center interface.",
                    'juuk-editor': "An in-browser image editor with adjustable filters, rotation/flip capabilities, and instant download.",
                    'weather-app': "A modern, immersive weather dashboard providing real-time data and 7-day forecasts with a beautiful glassmorphism UI and dynamic 3D background scenes.",
                    'jobstack': "A modern, locally-hosted Job Application Tracker with a Chrome Extension for one-click job saving and a robust Dashboard.",
                    'luma': "A modern, high-performance web-based photo editor powered by a custom WebGL engine. Offers professional-grade editing tools in a privacy-focused, local-first environment."
                };

                // 2. Inject descriptions where missing or needing upgrade
                filtered = filtered.map(repo => {
                    const lowerName = repo.name.toLowerCase();
                    if (customDescriptions[lowerName]) {
                        return { ...repo, description: customDescriptions[lowerName] };
                    }
                    return repo;
                });

                // 3. Prioritize 'JUUK-dictionary' if it exists
                const dictionaryRepo = filtered.find(r => r.name.toLowerCase() === 'juuk-dictionary');
                if (dictionaryRepo) {
                    filtered = filtered.filter(r => r.name.toLowerCase() !== 'juuk-dictionary');
                    filtered.unshift(dictionaryRepo);
                }

                // 4. Limit to top 6
                const topRepos = filtered.slice(0, 6);

                // 5. Fetch languages for these top repos
                const reposWithLanguages = await Promise.all(topRepos.map(async (repo) => {
                    try {
                        const langResponse = await fetch(repo.languages_url);
                        if (!langResponse.ok) return { ...repo, languages: [] };
                        const langData: Record<string, number> = await langResponse.json();
                        
                        const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);
                        const languages: Language[] = Object.entries(langData).map(([name, bytes]) => ({
                            name,
                            percent: (bytes / totalBytes) * 100,
                            color: getLanguageColor(name)
                        })).sort((a, b) => b.percent - a.percent);

                        return { ...repo, languages };
                    } catch (e) {
                        console.error(`Failed to fetch languages for ${repo.name}`, e);
                        return { ...repo, languages: [] };
                    }
                }));

                setRepos(reposWithLanguages);
            } catch (err: any) {
                console.error("Failed to fetch repos:", err);
                setError(err.message || "An error occurred");
                // Fallback mock data could be set here
                setRepos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [username]);

    return { repos, loading, error };
};

// Helper for language colors
const getLanguageColor = (lang: string): string => {
    const colors: Record<string, string> = {
        JavaScript: '#f1e05a',
        TypeScript: '#2b7489',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Python: '#3572A5',
        Java: '#b07219',
        Shell: '#89e051',
        Vue: '#41b883',
        Swift: '#ffac45',
        Kotlin: '#A97BFF',
        Dart: '#00B4AB',
        Go: '#00ADD8',
        Rust: '#dea584',
        C: '#555555',
        'C++': '#f34b7d',
        'C#': '#178600',
        PHP: '#4F5D95',
        Ruby: '#701516'
    };
    return colors[lang] || '#8b949e'; // Default gray
};

export default useGitHubRepos;

