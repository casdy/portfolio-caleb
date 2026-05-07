// ─── Vercel API Types ───────────────────────────────────────────────────────

export interface VercelTarget {
  url: string;
}

export interface VercelTargets {
  production?: VercelTarget;
}

export interface VercelProject {
  id: string;
  name: string;
  description: string | null;
  framework: string | null;
  targets: VercelTargets;
}

export interface VercelProjectsResponse {
  projects: VercelProject[];
}

// ─── GitHub API Types ───────────────────────────────────────────────────────

export interface Language {
  name: string;
  percent: number;
  color: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  topics: string[];
  updated_at: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  fork: boolean;
  languages?: Language[];
}

// ─── Unified Project Type (Merged) ──────────────────────────────────────────

export interface MergedProject {
  /** Display name */
  name: string;
  /** Description (prefer GitHub's, fallback to Vercel's) */
  description: string | null;
  /** If live on Vercel, the production URL */
  liveUrl: string | null;
  /** GitHub html_url for the repo */
  githubUrl: string | null;
  /** GitHub homepage if set */
  homepage: string | null;
  /** Framework from Vercel (e.g. "nextjs") */
  framework: string | null;
  /** Primary language from GitHub */
  language: string | null;
  /** Language breakdown from GitHub */
  languages: Language[];
  /** Topic tags from GitHub */
  topics: string[];
  /** Is this project live on Vercel? */
  isLive: boolean;
  /** Unique key for React rendering */
  key: string;
  /** GitHub repo name for README fetching (may differ from display name due to aliases) */
  githubRepoName: string | null;
  /** Path to a local preview screenshot image (e.g. /previews/geopol.png) */
  previewImage: string | null;
  /** Path to a local mobile preview screenshot image (e.g. /previews/geopol-mobile.png) */
  previewImageMobile: string | null;
}

// ─── Component Prop Types ───────────────────────────────────────────────────

export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: MergedProject | null;
  content: string | null;
}

export interface ProjectCardProps {
  project: MergedProject;
  onDetails: (project: MergedProject) => void;
}

export interface PageTransitionProps {
  children: React.ReactNode;
}

export interface LogoProps {
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: string;
  rel?: string;
  download?: boolean | string;
}
