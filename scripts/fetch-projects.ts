import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import puppeteer from 'puppeteer-core';

// Load .env and .env.local
dotenv.config();
dotenv.config({ path: '.env.local' });

const VERCEL_API_TOKEN = process.env.VC_ACCESS_TOKEN;
const VERCEL_TEAM_ID = process.env.VC_TEAM_ID;
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const GITHUB_USERNAME = 'casdy';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PREVIEWS_DIR = path.join(process.cwd(), 'public/previews');
const PROJECT_DATA_PATH = path.join(process.cwd(), 'src/data/generated-projects.json');

if (!VERCEL_API_TOKEN || !GITHUB_TOKEN) {
  console.error('Error: VC_ACCESS_TOKEN and GITHUB_ACCESS_TOKEN must be defined in .env or .env.local');
  process.exit(1);
}

const NAME_ALIASES: Record<string, { github: string, display: string }> = {
    'geo-pol':                { github: 'geopol',             display: 'GeoPol' },
    'wedaforecast':           { github: 'weather-app',        display: 'WedaForecast' },
    'password-generator-eng': { github: 'password-generator', display: 'Password Generator' },
    'calebojukwu':            { github: 'portfolio-caleb',    display: 'Calebojukwu' },
    'pro-libris':             { github: 'ProLibris',          display: 'ProLibris' },
    'earo-invoice':           { github: 'earo-invoice',       display: 'Earo Invoice' },
};

const EXCLUDED_PROJECTS = new Set([
    'recipe-app',
    'calebojukw',
    'juuk-dictionary',
]);

// Ported PREVIEW_IMAGES removed - now dynamically detected

// ─── Helpers ported from useGitHubRepos.ts ───────────────────────────────────

async function fetchGitHubRepo(name: string) {
    try {
        const repoRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${name}`, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
        
        if (!repoRes.ok) return null;
        const repo: any = await repoRes.json();

        // Fetch languages
        const langRes = await fetch(repo.languages_url, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
        const langs: any = await langRes.json();
        
        const total = Object.values(langs).reduce((a: any, b: any) => a + b, 0) as number;
        const formattedLangs = Object.entries(langs).map(([name, size]) => ({
            name,
            percent: ((size as number) / total) * 100,
            color: getLanguageColor(name)
        }));

        // Fetch README
        const readmeRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${name}/readme`, {
            headers: { 
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.raw'
            }
        });
        const readme = readmeRes.ok ? await readmeRes.text() : null;

        return {
            ...repo,
            languages: formattedLangs,
            readme
        };
    } catch (err) {
        console.error(`Error fetching GitHub repo ${name}:`, err);
        return null;
    }
}

function getLanguageColor(lang: string): string {
    const colors: Record<string, string> = {
        'TypeScript': '#2b7489',
        'JavaScript': '#f1e05a',
        'Vue': '#41b883',
        'CSS': '#563d7c',
        'HTML': '#e34c26',
        'Python': '#3572A5',
        'SCSS': '#c6538c',
        'PHP': '#4f5d95'
    };
    return colors[lang] || '#8b8b8b';
}

async function captureScreenshots(url: string, name: string) {
    if (!fs.existsSync(PREVIEWS_DIR)) {
        fs.mkdirSync(PREVIEWS_DIR, { recursive: true });
    }

    const desktopPath = path.join(PREVIEWS_DIR, `${name}.png`);
    const mobilePath = path.join(PREVIEWS_DIR, `${name}-mobile.png`);

    const desktopExists = fs.existsSync(desktopPath);
    const mobileExists = fs.existsSync(mobilePath);

    // Skip if both exist
    if (desktopExists && mobileExists) {
        return { desktop: `/previews/${name}.png`, mobile: `/previews/${name}-mobile.png` };
    }

    console.log(`📸 Taking screenshots for ${name}...`);
    let browser;
    try {
        browser = await puppeteer.launch({
            executablePath: CHROME_PATH,
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // 1. Desktop Screenshot
        if (!desktopExists) {
            await page.setViewport({ width: 1280, height: 800 });
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            await new Promise(r => setTimeout(r, 2000)); // Wait for animations
            await page.screenshot({ path: desktopPath });
            console.log(`   ✅ Desktop captured: ${name}.png`);
        } else {
            console.log(`   ⏭️ Skipping Desktop (exists): ${name}.png`);
        }

        // 2. Mobile Screenshot
        if (!mobileExists) {
            await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            await new Promise(r => setTimeout(r, 2000));
            await page.screenshot({ path: mobilePath });
            console.log(`   ✅ Mobile captured: ${name}-mobile.png`);
        } else {
            console.log(`   ⏭️ Skipping Mobile (exists): ${name}-mobile.png`);
        }

        await browser.close();
        return { desktop: `/previews/${name}.png`, mobile: `/previews/${name}-mobile.png` };
    } catch (err) {
        console.warn(`   ⚠️ Screenshot failed for ${name}:`, err.message);
        if (browser) await browser.close();
        return { desktop: null, mobile: null };
    }
}

// ─── Fetching Logic ──────────────────────────────────────────────────────────

async function main() {
    console.log('🚀 Starting project data fetch...');

    // Load existing projects for caching
    let existingProjects: any[] = [];
    if (fs.existsSync(PROJECT_DATA_PATH)) {
        try {
            existingProjects = JSON.parse(fs.readFileSync(PROJECT_DATA_PATH, 'utf-8'));
        } catch (e) {
            console.warn('⚠️ Failed to parse existing projects data, starting fresh.');
        }
    }
    const existingProjectsMap = new Map(existingProjects.map(p => [p.key, p]));

    try {
        // 1. Fetch Vercel Projects
        console.log('📡 Fetching Vercel projects...');
        const vercelUrl = VERCEL_TEAM_ID 
          ? `https://api.vercel.com/v9/projects?teamId=${VERCEL_TEAM_ID}`
          : `https://api.vercel.com/v9/projects`;
          
        const vercelRes = await fetch(vercelUrl, {
            headers: { Authorization: `Bearer ${VERCEL_API_TOKEN}` }
        });
        const vercelData: any = await vercelRes.json();
        const activeVercelProjects = vercelData.projects.filter((p: any) => !EXCLUDED_PROJECTS.has(p.name));

        // 2. Fetch all user GitHub repos for archived/fallback projects
        console.log('📡 Fetching GitHub repositories...');
        const ghRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
        const githubRepos: any = await ghRes.json();
        const githubByName = new Map();
        githubRepos.forEach((repo: any) => githubByName.set(repo.name.toLowerCase(), repo));

        // 3. Process & Merge
        console.log('🧠 Merging Vercel and GitHub data (using local cache where possible)...');
        const consumedGitHubNames = new Set<string>();
        const mergedProjects: any[] = [];

        for (const vp of activeVercelProjects) {
            const vpKey = vp.name.toLowerCase();
            const alias = NAME_ALIASES[vpKey];
            const ghKey = alias ? alias.github.toLowerCase() : vpKey;

            const cached = existingProjectsMap.get(`live-${vp.id}`);
            // Use cached GitHub data if available, otherwise fetch
            const ghRepo = (cached && cached.readme) ? cached : await fetchGitHubRepo(ghKey);

            const displayName = alias ? alias.display : (ghRepo ? (ghRepo.name || vp.name) : vp.name);

            let previews = { 
                desktop: (cached?.previewImage && fs.existsSync(path.join(process.cwd(), 'public', cached.previewImage))) ? cached.previewImage : null, 
                mobile: (cached?.previewImageMobile && fs.existsSync(path.join(process.cwd(), 'public', cached.previewImageMobile))) ? cached.previewImageMobile : null 
            };

            // Custom override for ProLibris or if previews are missing
            if (ghKey === 'prolibris') {
                previews = { desktop: '/previews/prolibris.png', mobile: '/previews/prolibris-mobile.png' };
            } else if (vp.targets?.production?.url && (!previews.desktop || !previews.mobile)) {
                previews = await captureScreenshots(`https://${vp.targets.production.url}`, ghKey || vpKey);
            }

            mergedProjects.push({
                name: displayName,
                description: ghRepo?.description ?? vp.description,
                liveUrl: `https://${vp.targets.production.url}`,
                githubUrl: ghRepo?.html_url ?? cached?.githubUrl ?? null,
                homepage: ghRepo?.homepage ?? cached?.homepage ?? null,
                framework: vp.framework,
                language: ghRepo?.language ?? cached?.language ?? null,
                languages: ghRepo?.languages ?? cached?.languages ?? [],
                topics: ghRepo?.topics ?? cached?.topics ?? [],
                isLive: true,
                key: `live-${vp.id}`,
                githubRepoName: ghRepo?.name ?? cached?.githubRepoName ?? null,
                previewImage: previews.desktop,
                previewImageMobile: previews.mobile,
                readme: ghRepo?.readme ?? cached?.readme ?? null,
                updatedAt: ghRepo?.pushed_at || vp.updatedAt || cached?.updatedAt || Date.now()
            });
            consumedGitHubNames.add(ghKey);
        }

        // Add GitHub-only repos (archives)
        const WHITELISTED_ARCHIVES = new Set(['luma', 'jobstack']);
        for (const repo of githubRepos) {
            const key = repo.name.toLowerCase();
            if (consumedGitHubNames.has(key) || EXCLUDED_PROJECTS.has(key)) continue;
            
            // Only include whitelisted archives
            if (!WHITELISTED_ARCHIVES.has(key)) continue;

            const cached = existingProjectsMap.get(`archive-${repo.id}`);
            const ghRepo = (cached && cached.readme) ? cached : await fetchGitHubRepo(repo.name);

            mergedProjects.push({
                name: ghRepo?.name || repo.name,
                description: ghRepo?.description || repo.description,
                liveUrl: null,
                githubUrl: ghRepo?.html_url || repo.html_url,
                homepage: ghRepo?.homepage || repo.homepage,
                framework: null,
                language: ghRepo?.language || repo.language,
                languages: ghRepo?.languages || [],
                topics: ghRepo?.topics || repo.topics || [],
                isLive: false,
                key: `archive-${repo.id}`,
                githubRepoName: repo.name,
                previewImage: (key === 'prolibris') ? '/previews/prolibris.png' : (fs.existsSync(path.join(PREVIEWS_DIR, `${key}.png`)) ? `/previews/${key}.png` : null),
                previewImageMobile: (key === 'prolibris') ? '/previews/prolibris.png' : (fs.existsSync(path.join(PREVIEWS_DIR, `${key}-mobile.png`)) ? `/previews/${key}-mobile.png` : null),
                readme: ghRepo?.readme ?? null,
                updatedAt: repo.pushed_at || cached?.updatedAt || Date.now()
            });
        }

        // 4. Final Processing & Sort
        const descriptions: Record<string, string> = {
            'PlanR': 'Engineered an adaptive fitness engine integrating the OpenRouter LLM API to dynamically generate personalized workout telemetry with ultra-low latency.',
            'GeoPol': 'Architected a Next.js situational awareness dashboard aggregating 46 concurrent YouTube live streams and global APIs, optimizing data-fetching for real-time monitoring.',
            'Luma': 'Developed a high-performance, local-first WebGL photo editor, utilizing browser-based rendering engines to deliver professional-grade editing with zero server latency.',
            'CloudSpark': 'Built an AI prompt-generation engine using Next.js, streamlining the creation of structured system prompts for seamless integration with cross-provider AI models.',
            'JobStack': 'Deployed a full-stack, locally-hosted Job Application Tracker featuring a custom Chrome Extension for automated, one-click DOM data extraction.'
        };
        const RETAINED_NAMES = ['GeoPol', 'PlanR', 'Luma', 'CloudSpark', 'JobStack'];

        // Normalize names
        mergedProjects.forEach(p => {
            if (p.name.toLowerCase() === 'luma') p.name = 'Luma';
            if (p.name.toLowerCase() === 'jobstack') p.name = 'JobStack';
            
            if (descriptions[p.name]) {
                p.description = descriptions[p.name];
                p.isLive = true; // force live
            }
        });

        if (!mergedProjects.find(p => p.name === 'CloudSpark')) {
            mergedProjects.push({
                name: 'CloudSpark',
                liveUrl: 'https://cloudspark.vercel.app',
                githubUrl: 'https://github.com/casdy/CloudSpark',
                homepage: 'https://cloudspark.vercel.app/',
                framework: 'nextjs',
                language: 'TypeScript',
                languages: [{ name: 'TypeScript', percent: 100, color: '#2b7489' }],
                topics: [],
                isLive: true,
                key: 'live-prj_cloudspark',
                githubRepoName: 'CloudSpark',
                previewImage: '/previews/cloudspark.png',
                previewImageMobile: '/previews/cloudspark.png',
                readme: '# CloudSpark\n\nAI Prompt-generation engine.',
                updatedAt: Date.now()
            });
        }

        const filteredProjects = mergedProjects.filter(p => RETAINED_NAMES.includes(p.name));

        const CUSTOM_ORDER = [
            'GeoPol',
            'PlanR',
            'Luma',
            'CloudSpark',
            'JobStack'
        ];

        const sortedProjects = filteredProjects.sort((a, b) => {
            const indexA = CUSTOM_ORDER.indexOf(a.name);
            const indexB = CUSTOM_ORDER.indexOf(b.name);
            return indexA - indexB;
        });

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
