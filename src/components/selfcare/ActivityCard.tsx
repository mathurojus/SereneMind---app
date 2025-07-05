import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SelfCareActivity } from '../../types';
import * as Icons from 'lucide-react';

interface ActivityCardProps {
  activity: SelfCareActivity;
  onStart: (activity: SelfCareActivity) => void;
}

export function ActivityCard({ activity, onStart }: ActivityCardProps) {
  const IconComponent = Icons[activity.icon as keyof typeof Icons] as React.ComponentType<any>;

  const categoryColors = {
    breathing: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    movement: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    mindfulness: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    creative: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    social: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
    games: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
  };

  return (
    <Card padding="md" className="hover:shadow-xl transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${categoryColors[activity.category]}`}>
          {IconComponent && <IconComponent className="w-6 h-6" />}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 leading-tight">
              {activity.title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              <Clock className="w-4 h-4" />
              {activity.duration}
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
            {activity.description}
          </p>
          
          <Button 
            onClick={() => onStart(activity)}
            size="sm"
            className="w-full"
          >
            Start Activity
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}