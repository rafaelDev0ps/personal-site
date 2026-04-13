"use client";

import { format, parseISO } from 'date-fns';
import type { Article } from '@/lib/articles';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { title, date, tags, slug, excerpt } = article.frontmatter;

  const formattedDate = format(parseISO(date), 'MMMM d, yyyy');

  const preview =
    excerpt ||
    article.content
      .replace(/#{1,6}\s[^\n]+/g, '')
      .replace(/`{3}[\s\S]*?`{3}/g, '')
      .replace(/[*_`]/g, '')
      .trim()
      .slice(0, 160) + '…';

  return (
    <a
      href={`/articles?slug=${slug}`}
      className="block group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-sm transition-all"
    >
      <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors leading-snug mb-2">
        {title}
      </h2>
      <time className="text-xs text-gray-400 dark:text-gray-500 font-sans">
        {formattedDate}
      </time>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-sans leading-relaxed line-clamp-2">
        {preview}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-sans"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
