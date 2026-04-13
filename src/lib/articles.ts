/// <reference types="vite/client" />

// Vite loads all .md files as raw strings at build time
const rawFiles = import.meta.glob('../../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export interface ArticleFrontmatter {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  excerpt?: string;
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  content: string;
}

/**
 * Parses the YAML frontmatter block from a markdown string.
 * Handles the subset we use: quoted strings and inline string arrays.
 */
function parseFrontmatter(raw: string): { data: ArticleFrontmatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {} as ArticleFrontmatter, content: raw };

  const yamlStr = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of yamlStr.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();

    if (value.startsWith('[')) {
      // Inline array: ["tag1", "tag2"]
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      // Scalar: strip optional surrounding quotes
      data[key] = value.replace(/^["']|["']$/g, '');
    }
  }

  return { data: data as ArticleFrontmatter, content };
}

export function loadArticles(): Article[] {
  return Object.values(rawFiles)
    .map((raw) => {
      const { data, content } = parseFrontmatter(raw as string);
      return { frontmatter: data, content };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return loadArticles().find((a) => a.frontmatter.slug === slug);
}
