import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'casdy';

if (!VERCEL_API_TOKEN || !GITHUB_TOKEN) {
  console.error('Error: VERCEL_API_TOKEN and GITHUB_TOKEN must be defined in .env');
  process.exit(1);
}

// ─── Constants ported from ProjectsGrid.tsx ──────────────────────────────────

const NAME_ALIASES: Record<string, { github: string; display: string }> = {
    'geo-pol':                { github: 'geopol',             display: 'GeoPol' },
    'wedaforecast':           { github: 'weather-app',        display: 'WedaForecast' },
    'password-generator-eng': { github: 'password-generator', display: 'Password Generator' },
};

const EXCLUDED_PROJECTS = new Set([
    'earo-invoice',
    'casdy',
    'my-website',
]);

const PREVIEW_IMAGES: Record<string, string> = {
    'wedaforecast':           '/previews/wedaforecast.png',
    'geopol':                 '/previews/geopol.png',
    'planr':                  '/previews/planr.png',
    'password-generator-eng': '/previews/password-generator-eng.png',
};

// ─── Helpers ported from useGitHubRepos.ts ───────────────────────────────────

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

function extractDescriptionFromReadme(readme: string): string | null {
    const lines = readme.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('![') || 
            trimmed.startsWith('[!') || trimmed.startsWith('<') || 
            trimmed.startsWith('---') || trimmed.startsWith('***') || 
            trimmed.startsWith('[![')) continue;
        if (trimmed.length < 15) continue;
        const cleaned = trimmed
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')
            .replace(/`([^`]+)`/g, '$1');
        return cleaned.length > 200 ? cleaned.substring(0, 197) + '...' : cleaned;
    }
    return null;
}

// ─── Fetching Logic ──────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Starting project data fetch...');

  try {
    // 1. Fetch Vercel Projects
    console.log('📡 Fetching Vercel projects...');
    const vercelUrl = VERCEL_TEAM_ID 
      ? `https://api.vercel.com/v9/projects?teamId=${VERCEL_TEAM_ID}`
      : 'https://api.vercel.com/v9/projects';
      
    const vRes = await fetch(vercelUrl, {
      headers: { Authorization: `Bearer ${VERCEL_API_TOKEN}` }
    });
    const vData = await vRes.json() as any;
    const vercelProjects = vData.projects || [];

    // 2. Fetch GitHub Repos
    console.log('📡 Fetching GitHub repositories...');
    const gRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers: { 
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });
    const repos = await gRes.json() as any[];

    // 3. Process GitHub Data (Languages & Descriptions)
    console.log('📡 Processing repositories (fetching languages & READMEs)...');
    const processedRepos = await Promise.all(repos.map(async (repo) => {
      if (repo.fork || repo.name.toLowerCase() === 'projects') return null;

      // Fetch Languages
      const lRes = await fetch(repo.languages_url, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
      });
      const lData = await lRes.json() as Record<string, number>;
      const totalBytes = Object.values(lData).reduce((a, b) => a + b, 0);
      const languages = Object.entries(lData).map(([name, bytes]) => ({
        name,
        percent: (bytes / totalBytes) * 100,
        color: getLanguageColor(name)
      })).sort((a, b) => b.percent - a.percent);

      // Fetch README and extract description if missing
      let description = repo.description;
      let fullReadme = '';
      try {
        const rRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`, {
          headers: { 
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.raw+json'
          }
        });
        if (rRes.ok) {
          fullReadme = await rRes.text();
          if (!description) {
            description = extractDescriptionFromReadme(fullReadme);
          }
        }
      } catch (e) {}

      return {
        ...repo,
        languages,
        description,
        readme: fullReadme // Storing full readme for instant display in modal
      };
    }));

    const githubRepos = processedRepos.filter(Boolean) as any[];

    // 4. Merge Logic (Ported from ProjectsGrid.tsx)
    console.log('🧠 Merging Vercel and GitHub data...');
    const activeVercelProjects = vercelProjects.filter(
        (p: any) => p.targets?.production?.url && !EXCLUDED_PROJECTS.has(p.name.toLowerCase())
    );

    const githubByName = new Map<string, any>();
    githubRepos.forEach(r => githubByName.set(r.name.toLowerCase(), r));

    const consumedGitHubNames = new Set<string>();
    const mergedProjects: any[] = [];

    activeVercelProjects.forEach((vp: any) => {
        const vpKey = vp.name.toLowerCase();
        const alias = NAME_ALIASES[vpKey];
        const ghKey = alias ? alias.github.toLowerCase() : vpKey;
        const ghRepo = githubByName.get(ghKey);

        const displayName = alias ? alias.display : (ghRepo ? ghRepo.name : vp.name);

        mergedProjects.push({
            name: displayName,
            description: ghRepo?.description ?? vp.description,
            liveUrl: `https://${vp.targets.production.url}`,
            githubUrl: ghRepo?.html_url ?? null,
            homepage: ghRepo?.homepage ?? null,
            framework: vp.framework,
            language: ghRepo?.language ?? null,
            languages: ghRepo?.languages ?? [],
            topics: ghRepo?.topics ?? [],
            isLive: true,
            key: `live-${vp.id}`,
            githubRepoName: ghRepo?.name ?? null,
            previewImage: PREVIEW_IMAGES[vpKey] ?? PREVIEW_IMAGES[ghKey] ?? PREVIEW_IMAGES[displayName.toLowerCase()] ?? null,
            readme: ghRepo?.readme ?? null
        });
        consumedGitHubNames.add(ghKey);
    });

    githubRepos.forEach((repo: any) => {
        const key = repo.name.toLowerCase();
        if (consumedGitHubNames.has(key) || EXCLUDED_PROJECTS.has(key)) return;

        mergedProjects.push({
            name: repo.name,
            description: repo.description,
            liveUrl: null,
            githubUrl: repo.html_url,
            homepage: repo.homepage,
            framework: null,
            language: repo.language,
            languages: repo.languages ?? [],
            topics: repo.topics ?? [],
            isLive: false,
            key: `archive-${repo.id}`,
            githubRepoName: repo.name,
            previewImage: PREVIEW_IMAGES[key] ?? null,
            readme: repo.readme ?? null
        });
    });

    const sortedProjects = mergedProjects.sort((a, b) => {
        if (a.isLive && !b.isLive) return -1;
        if (!a.isLive && b.isLive) return 1;
        return 0;
    });

    // 5. Save results
    const outputDir = path.join(process.cwd(), 'src/data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(outputDir, 'generated-projects.json'),
      JSON.stringify(sortedProjects, null, 2)
    );

    console.log(`✅ Success! ${sortedProjects.length} projects saved to src/data/generated-projects.json`);

  } catch (err) {
    console.error('❌ Error during fetch:', err);
    process.exit(1);
  }
}

main();
