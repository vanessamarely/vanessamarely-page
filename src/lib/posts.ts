// Articles are fetched at build time (not in the browser), so the published
// site is plain static HTML. The GitHub Action rebuilds daily to pick up new posts.

export type Source = "devto" | "medium";

export type Post = {
  title: string;
  url: string;
  date: string; // ISO
  excerpt: string;
  cover: string | null;
  tags: string[];
  source: Source;
  lang: "es" | "en";
  readingMinutes: number | null;
  alsoOn?: { source: Source; url: string };
};

const DEVTO_USER = "vanessamarely";
const MEDIUM_USER = "vanessamarely";
const TIMEOUT_MS = 10_000;

async function get(url: string): Promise<Response> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (vanessamarely.dev build)" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res;
}

const ES_HINTS = /[¿¡ñáéíóú]|\b(el|la|los|las|de|del|que|para|con|una|por|cómo|qué)\b/gi;

function detectLang(text: string): "es" | "en" {
  const hits = text.match(ES_HINTS)?.length ?? 0;
  return hits >= 2 ? "es" : "en";
}

function stripHtml(html: string): string {
  return html
    .replace(/<figure[\s\S]*?<\/figure>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(text: string, max = 170): string {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)).replace(/[,.;:]$/, "") + "…";
}

async function fetchDevto(): Promise<Post[]> {
  const res = await get(`https://dev.to/api/articles?username=${DEVTO_USER}&per_page=100`);
  const data: any[] = await res.json();
  return data.map((a) => ({
    title: a.title,
    url: a.url,
    date: a.published_at,
    excerpt: excerpt(a.description ?? ""),
    cover: a.cover_image ?? null,
    tags: a.tag_list ?? [],
    source: "devto" as const,
    lang: a.language === "es" || a.language === "en" ? a.language : detectLang(`${a.title} ${a.description}`),
    readingMinutes: a.reading_time_minutes ?? null,
  }));
}

function tag(item: string, name: string): string {
  const m = item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return (m?.[1] ?? "").replace(/^<!\[CDATA\[|\]\]>$/g, "").trim();
}

async function fetchMedium(): Promise<Post[]> {
  const res = await get(`https://medium.com/feed/@${MEDIUM_USER}`);
  const xml = await res.text();
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items.map((item) => {
    const content = tag(item, "content:encoded");
    const text = stripHtml(content);
    const title = tag(item, "title");
    const words = text.split(" ").length;
    return {
      title,
      url: tag(item, "link").split("?")[0],
      date: new Date(tag(item, "pubDate")).toISOString(),
      excerpt: excerpt(text),
      cover: content.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? null,
      tags: [...item.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)].map((m) => m[1]),
      source: "medium" as const,
      lang: detectLang(`${title} ${text.slice(0, 400)}`),
      readingMinutes: Math.max(1, Math.round(words / 230)),
    };
  });
}

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");

let cache: Promise<Post[]> | null = null;

/** All posts from both platforms, newest first; cross-posts are merged into one entry. */
export function getPosts(): Promise<Post[]> {
  cache ??= (async () => {
    const results = await Promise.allSettled([fetchDevto(), fetchMedium()]);
    const all: Post[] = [];
    for (const r of results) {
      if (r.status === "fulfilled") all.push(...r.value);
      else console.warn(`[posts] no se pudo cargar una fuente: ${r.reason}`);
    }
    all.sort((a, b) => +new Date(b.date) - +new Date(a.date));

    const byTitle = new Map<string, Post>();
    for (const post of all) {
      const key = normalize(post.title);
      const existing = byTitle.get(key);
      if (!existing) byTitle.set(key, post);
      else if (existing.source !== post.source && !existing.alsoOn) {
        existing.alsoOn = { source: post.source, url: post.url };
        existing.cover ??= post.cover;
      }
    }
    return [...byTitle.values()];
  })();
  return cache;
}

export const sourceLabel: Record<Source, string> = { devto: "DEV", medium: "Medium" };
