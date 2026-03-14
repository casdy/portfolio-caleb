import type { GitHubRepo } from '../../types';

/**
 * Fetches public repos for a GitHub user.
 * Uses the VITE_GITHUB_ACCESS_TOKEN env var for authenticated requests (higher rate limit).
 */
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
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
    throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
  }

  const data: GitHubRepo[] = await response.json();
  return data;
}

/**
 * Fetches the raw README.md content for a given repo.
 */
export async function fetchRepoReadme(owner: string, repoName: string): Promise<string> {
  const token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN as string | undefined;

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.raw+json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}/readme`,
    { headers }
  );

  if (!response.ok) {
    return '# No README found\nThis project does not have a detailed README file.';
  }

  return response.text();
}
