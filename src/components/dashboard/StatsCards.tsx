import React from 'react';
import { TrendingUp, Calendar, Target, Heart } from 'lucide-react';
import { Card } from '../ui/Card';
import { MoodEntry } from '../../types';

interface StatsCardsProps {
  entries: MoodEntry[];
  averageMood: number;
}

export function StatsCards({ entries, averageMood }: StatsCardsProps) {
  const totalEntries = entries.length;
  const streakDays = calculateStreak(entries);
  const improvementTrend = calculateTrend(entries);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card padding="sm" className="text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {averageMood.toFixed(1)}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Avg Mood</p>
          </div>
        </div>
      </Card>

      <Card padding="sm" className="text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {streakDays}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
          </div>
        </div>
      </Card>

      <Card padding="sm" className="text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {totalEntries}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Check-ins</p>
          </div>
        </div>
      </Card>

      <Card padding="sm" className="text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-full">
            <TrendingUp className={`w-5 h-5 ${
              improvementTrend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {improvementTrend >= 0 ? '+' : ''}{improvementTrend.toFixed(1)}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Trend</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function calculateStreak(entries: MoodEntry[]): number {
  if (entries.length === 0) return 0;

  const sortedEntries = entries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const entry of sortedEntries) {
    const entryDate = new Date(entry.date);
    entryDate.setHours(0, 0, 0, 0);

    if (entryDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (entryDate.getTime() < currentDate.getTime()) {
      break;
    }
  }

  return streak;
}

function calculateTrend(entries: MoodEntry[]): number {
  if (entries.length < 2) return 0;

  const recent = entries.slice(-3);
  const older = entries.slice(-6, -3);

  if (recent.length === 0 || older.length === 0) return 0;

  const recentAvg = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
  const olderAvg = older.reduce((sum, entry) => sum + entry.mood, 0) / older.length;

  return recentAvg - olderAvg;
}