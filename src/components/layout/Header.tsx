import React from 'react';
import { Heart } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-white p-6 rounded-b-3xl shadow-lg">
      <div className="max-w-md mx-auto flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-full">
          <Heart className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">SereneMind</h1>
          <p className="text-white/80 text-sm">{title}</p>
        </div>
      </div>
    </header>
  );
}