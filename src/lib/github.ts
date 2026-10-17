// Stars/forks of the curated repos, read once at build time.
// Falls back to an empty map if GitHub is unreachable or rate-limited.

export type RepoStats = { stars: number; forks: number; language: string | null; pushedAt: string };

let cache: Promise<Map<string, RepoStats>> | null = null;

export function getRepoStats(): Promise<Map<string, RepoStats>> {
  cache ??= (async () => {
    const stats = new Map<string, RepoStats>();
    const headers: Record<string, string> = { "User-Agent": "vanessamarely.dev build" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    try {
      for (let page = 1; page <= 3; page++) {
        const res = await fetch(`https://api.github.com/users/vanessamarely/repos?per_page=100&page=${page}`, {
          headers,
          signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        const repos: any[] = await res.json();
        for (const r of repos) {
          stats.set(r.name, { stars: r.stargazers_count, forks: r.forks_count, language: r.language, pushedAt: r.pushed_at });
        }
        if (repos.length < 100) break;
      }
    } catch (err) {
      console.warn(`[github] no se pudieron leer las estadísticas: ${err}`);
    }
    return stats;
  })();
  return cache;
}
