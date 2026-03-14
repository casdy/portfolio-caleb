import { useState, useEffect } from 'react';
import type { GitHubRepo, Language } from '../types';

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
    return colors[lang] || '#8b949e';
};

/**
 * Extract the first meaningful paragraph from a README as a description.
 * Skips headings, badges, blank lines, and HTML tags.
 */
function extractDescriptionFromReadme(readme: string): string | null {
    const lines = readme.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        // Skip empty lines, headings, badges, HTML, horizontal rules
        if (!trimmed) continue;
        if (trimmed.startsWith('#')) continue;
        if (trimmed.startsWith('![')) continue;
        if (trimmed.startsWith('[!')) continue;
        if (trimmed.startsWith('<')) continue;
        if (trimmed.startsWith('---') || trimmed.startsWith('***')) continue;
        if (trimmed.startsWith('[![')) continue;
        if (trimmed.length < 15) continue; // Skip very short lines like "---" or badges
        // Found a meaningful paragraph line
        // Clean out markdown links/bold/italic
        const cleaned = trimmed
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) → text
            .replace(/\*\*([^*]+)\*\*/g, '$1')       // **bold** → bold
            .replace(/\*([^*]+)\*/g, '$1')            // *italic* → italic
            .replace(/`([^`]+)`/g, '$1');              // `code` → code
        return cleaned.length > 200 ? cleaned.substring(0, 197) + '...' : cleaned;
    }
    return null;
}

interface UseGitHubReposResult {
    repos: GitHubRepo[];
    loading: boolean;
    error: string | null;
}

const useGitHubRepos = (username: string): UseGitHubReposResult => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN as string | undefined;

                const headers: HeadersInit = {
                    'Accept': 'application/vnd.github.v3+json',
                };
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch(
                    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
                    { headers }
                );
                if (!response.ok) {
                    throw new Error(`GitHub API Error: ${response.statusText}`);
                }
                const data: GitHubRepo[] = await response.json();

                // Filter out forks and the 'projects' meta-repo
                let filtered = data.filter(repo => 
                    !repo.fork && 
                    repo.name.toLowerCase() !== 'projects'
                );

                // Map of custom descriptions (overrides)
                const customDescriptions: Record<string, string> = {
                    'juuk-dictionary': "A quick Dictionary webapp, with a simple UI. The user simply types a word & hits the 'ENTER' key. Using the Free Dictionary API.",
                    'password-generator': "A secure, client-side password generator styled as a retro-futuristic 'Cyber-Terminal'. Features CRT scanlines, boot sequences, and robust entropy.",
                    'geopol': "Real-Time Intelligence Dashboard for tracking geopolitical events. Aggregates live news and weather into a professional Command Center interface.",
                    'juuk-editor': "An in-browser image editor with adjustable filters, rotation/flip capabilities, and instant download.",
                    'weather-app': "A modern, immersive weather dashboard providing real-time data and 7-day forecasts with a beautiful glassmorphism UI and dynamic 3D background scenes.",
                    'jobstack': "A modern, locally-hosted Job Application Tracker with a Chrome Extension for one-click job saving and a robust Dashboard.",
                    'luma': "A modern, high-performance web-based photo editor powered by a custom WebGL engine. Offers professional-grade editing tools in a privacy-focused, local-first environment."
                };

                // Inject custom descriptions
                filtered = filtered.map(repo => {
                    const lowerName = repo.name.toLowerCase();
                    if (customDescriptions[lowerName]) {
                        return { ...repo, description: customDescriptions[lowerName] };
                    }
                    return repo;
                });

                // NO LIMIT — return ALL repos (merging/filtering happens in ProjectsGrid)

                // Fetch languages for all repos
                const reposWithLanguages: GitHubRepo[] = await Promise.all(filtered.map(async (repo) => {
                    try {
                        const langResponse = await fetch(repo.languages_url, { headers });
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

                // For repos that still have no description, fetch README and extract one
                const reposWithDescriptions: GitHubRepo[] = await Promise.all(reposWithLanguages.map(async (repo) => {
                    if (repo.description) return repo;
                    try {
                        const readmeResponse = await fetch(
                            `https://api.github.com/repos/${username}/${repo.name}/readme`,
                            { headers: { ...headers, 'Accept': 'application/vnd.github.raw+json' } }
                        );
                        if (!readmeResponse.ok) return repo;
                        const readmeText = await readmeResponse.text();
                        const extracted = extractDescriptionFromReadme(readmeText);
                        if (extracted) {
                            return { ...repo, description: extracted };
                        }
                    } catch (e) {
                        console.error(`Failed to fetch README for ${repo.name}`, e);
                    }
                    return repo;
                }));

                setRepos(reposWithDescriptions);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'An error occurred';
                console.error("Failed to fetch repos:", message);
                setError(message);
                setRepos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [username]);

    return { repos, loading, error };
};

export default useGitHubRepos;
