import { useState, useEffect } from 'react';
import type { VercelProject } from '../types';
import { fetchVercelProjects } from '../lib/api/vercel';

interface UseVercelProjectsResult {
  projects: VercelProject[];
  loading: boolean;
  error: string | null;
}

const useVercelProjects = (): UseVercelProjectsResult => {
  const [projects, setProjects] = useState<VercelProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchVercelProjects();
        setProjects(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch Vercel projects';
        console.error('Vercel API error:', message);
        setError(message);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { projects, loading, error };
};

export default useVercelProjects;
