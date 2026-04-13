"use client";

import { Sun, Moon } from 'lucide-react';

interface BlogThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function BlogThemeToggle({ isDark, onToggle }: BlogThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
