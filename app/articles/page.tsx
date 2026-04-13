"use client";

import { useState, useEffect } from 'react';
import { loadArticles, getArticleBySlug } from '@/lib/articles';
import BlogLayout from '@/components/blog/BlogLayout';
import ArticleList from '@/components/blog/ArticleList';
import ArticleDetail from '@/components/blog/ArticleDetail';

export default function ArticlesPage() {
  const [slug, setSlug] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSlug(params.get('slug'));
    setReady(true);
  }, []);

  if (!ready) return null;

  const articles = loadArticles();
  const article = slug ? getArticleBySlug(slug) : null;

  return (
    <BlogLayout>
      {article ? (
        <ArticleDetail article={article} />
      ) : (
        <ArticleList articles={articles} />
      )}
    </BlogLayout>
  );
}
