import type { VercelProject, VercelProjectsResponse } from '../../types';

/**
 * Fetches projects from the Vercel API via the dev-server proxy.
 * In production, this should point to a serverless function.
 */
export async function fetchVercelProjects(): Promise<VercelProject[]> {
  const response = await fetch('/api/vercel/v9/projects');

  if (!response.ok) {
    throw new Error(`Vercel API Error: ${response.status} ${response.statusText}`);
  }

  const data: VercelProjectsResponse = await response.json();
  return data.projects;
}
