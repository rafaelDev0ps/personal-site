"use client";

import { useState } from 'react';
import type { Article } from '@/lib/articles';
import ArticleSearch from './ArticleSearch';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? articles.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.frontmatter.title.toLowerCase().includes(q) ||
          a.frontmatter.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : articles;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Articles
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
          Things I learn and write down.
        </p>
      </div>

      <div className="mb-8">
        <ArticleSearch value={query} onChange={setQuery} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 font-sans">
          No articles match "{query}".
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((article) => (
            <ArticleCard key={article.frontmatter.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
