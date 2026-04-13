"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import BlogThemeToggle from './BlogThemeToggle';

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('blog-theme');
    if (stored) {
      setIsDark(stored === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    setMounted(true);
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('blog-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Avoid flash of wrong theme — render nothing until preference is read
  if (!mounted) return null;

  return (
    // Scoped dark mode: .dark class lives here, not on <html>, so the terminal is unaffected
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors">
        <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft size={15} />
            Terminal
          </a>
          <span className="font-serif text-base font-semibold text-gray-900 dark:text-gray-100">
            Rafael de Mattos
          </span>
          <BlogThemeToggle isDark={isDark} onToggle={toggle} />
        </header>
        <main className="max-w-2xl mx-auto px-6 py-12">{children}</main>
      </div>
    </div>
  );
}
