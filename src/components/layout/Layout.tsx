import React from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { ViewType } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Layout({ children, title, activeView, onViewChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-blue-900/10">
      <Header title={title} />
      <main className="max-w-md mx-auto px-4 py-6 pb-24">
        {children}
      </main>
      <Navigation activeView={activeView} onViewChange={onViewChange} />
    </div>
  );
}