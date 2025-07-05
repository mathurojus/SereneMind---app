import React from 'react';
import { Home, Heart, Smile, Settings, MessageCircle, Activity } from 'lucide-react';
import { ViewType } from '../../types';

interface NavigationProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard' as ViewType, icon: Home, label: 'Home' },
    { id: 'checkin' as ViewType, icon: Smile, label: 'Mood' },
    { id: 'companion' as ViewType, icon: MessageCircle, label: 'Chat' },
    { id: 'health' as ViewType, icon: Activity, label: 'Health' },
    { id: 'selfcare' as ViewType, icon: Heart, label: 'Care' },
    { id: 'settings' as ViewType, icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-2 py-2 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-all duration-200 ${
                activeView === id 
                  ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}