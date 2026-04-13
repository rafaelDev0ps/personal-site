"use client";

import { format, parseISO } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Article } from '@/lib/articles';

interface ArticleDetailProps {
  article: Article;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const { title, date, tags } = article.frontmatter;
  const formattedDate = format(parseISO(date), 'MMMM d, yyyy');

  return (
    <article>
      <a
        href="/articles"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors mb-8 font-sans"
      >
        ← Back to articles
      </a>

      <header className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <time className="text-sm text-gray-400 dark:text-gray-500 font-sans">
            {formattedDate}
          </time>
          <span className="text-gray-200 dark:text-gray-700">·</span>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-sans"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="prose dark:prose-invert prose-headings:font-serif prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:font-mono prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800 prose-pre:text-gray-800 dark:prose-pre:text-gray-200 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 max-w-none font-sans">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
