import React from 'react';
import { MoodEntry } from '../../types';
import { MOOD_EMOJIS } from '../../utils/constants';

interface MoodChartProps {
  entries: MoodEntry[];
}

export function MoodChart({ entries }: MoodChartProps) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const chartData = last7Days.map(date => {
    const entry = entries.find(e => 
      new Date(e.date).toDateString() === date.toDateString()
    );
    return {
      date,
      mood: entry?.mood || 0,
      emoji: entry?.emoji || '',
      hasData: !!entry
    };
  });

  const maxMood = 5;
  const chartHeight = 200;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        7-Day Mood Trend
      </h3>
      
      <div className="relative bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
        <div className="flex items-end justify-between gap-2" style={{ height: chartHeight }}>
          {chartData.map((data, index) => {
            const height = data.hasData ? (data.mood / maxMood) * (chartHeight - 40) : 0;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="flex flex-col items-center justify-end" style={{ height: chartHeight - 40 }}>
                  {data.hasData && (
                    <>
                      <span className="text-lg mb-1">{data.emoji}</span>
                      <div 
                        className="w-6 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-full transition-all duration-500"
                        style={{ height: `${height}px` }}
                      />
                    </>
                  )}
                  {!data.hasData && (
                    <div className="w-6 h-2 bg-gray-200 dark:bg-gray-600 rounded-full opacity-50" />
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  {data.date.toLocaleDateString('en', { weekday: 'short' })}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 flex flex-col justify-between text-xs text-gray-400 dark:text-gray-500" style={{ height: chartHeight - 40 }}>
          {MOOD_EMOJIS.slice().reverse().map(({ value, emoji }) => (
            <div key={value} className="flex items-center gap-1">
              <span>{emoji}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}