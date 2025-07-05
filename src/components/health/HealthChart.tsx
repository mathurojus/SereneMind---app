import React from 'react';
import { HealthMetrics } from '../../types';

interface HealthChartProps {
  metrics: HealthMetrics[];
}

export function HealthChart({ metrics }: HealthChartProps) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const chartData = last7Days.map(date => {
    const entry = metrics.find(m => 
      new Date(m.date).toDateString() === date.toDateString()
    );
    return {
      date,
      steps: entry?.steps || 0,
      heartRate: entry?.heartRate || 0,
      hasData: !!entry
    };
  });

  const maxSteps = Math.max(...chartData.map(d => d.steps), 10000);
  const chartHeight = 150;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        7-Day Health Trends
      </h3>
      
      <div className="relative bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
        {/* Steps Chart */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            Daily Steps
          </h4>
          <div className="flex items-end justify-between gap-2" style={{ height: chartHeight }}>
            {chartData.map((data, index) => {
              const height = data.hasData ? (data.steps / maxSteps) * (chartHeight - 40) : 0;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex flex-col items-center justify-end" style={{ height: chartHeight - 40 }}>
                    {data.hasData && (
                      <>
                        <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {data.steps.toLocaleString()}
                        </span>
                        <div 
                          className="w-6 bg-gradient-to-t from-blue-500 to-teal-500 rounded-t-full transition-all duration-500"
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
        </div>

        {/* Heart Rate Trend */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            Average Heart Rate
          </h4>
          <div className="flex items-center gap-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 text-center">
                <div className={`h-8 rounded flex items-center justify-center ${
                  data.hasData 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <span className="text-xs font-medium">
                    {data.hasData ? `${data.heartRate}` : '-'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}