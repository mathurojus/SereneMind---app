import React, { useState } from 'react';
import { Activity, Heart, Droplets, Moon, Watch, Smartphone, Plus } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { HealthMetrics } from '../../types';
import { useHealthData } from '../../hooks/useHealthData';
import { SmartWatchConnector } from './SmartWatchConnector';
import { HealthChart } from './HealthChart';

export function HealthTracker() {
  const [showConnector, setShowConnector] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const { todayMetrics, weeklyMetrics, addMetrics, loading } = useHealthData();

  const handleManualEntry = (metrics: Partial<HealthMetrics>) => {
    addMetrics({
      ...metrics,
      date: new Date().toISOString(),
      source: 'manual'
    });
    setShowManualEntry(false);
  };

  const healthCards = [
    {
      title: 'Steps',
      value: todayMetrics?.steps || 0,
      target: 10000,
      icon: Activity,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      unit: 'steps'
    },
    {
      title: 'Heart Rate',
      value: todayMetrics?.heartRate || 0,
      target: 70,
      icon: Heart,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      unit: 'bpm'
    },
    {
      title: 'Oxygen',
      value: todayMetrics?.oxygenSaturation || 0,
      target: 98,
      icon: Droplets,
      color: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-teal-100 dark:bg-teal-900/30',
      unit: '%'
    },
    {
      title: 'Sleep',
      value: todayMetrics?.sleepHours || 0,
      target: 8,
      icon: Moon,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      unit: 'hrs'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Smart Watch Connection */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
              <Watch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Smart Watch Integration
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect your device for automatic health tracking
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setShowConnector(true)}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <Watch className="w-4 h-4" />
            Connect Device
          </Button>
          <Button
            onClick={() => setShowManualEntry(true)}
            variant="ghost"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Manual Entry
          </Button>
        </div>
      </Card>

      {/* Today's Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {healthCards.map((card) => {
          const IconComponent = card.icon;
          const percentage = card.target ? Math.min((card.value / card.target) * 100, 100) : 0;
          
          return (
            <Card key={card.title} padding="sm">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-full ${card.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${card.color}`} />
                </div>
                
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {card.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {card.unit}
                  </p>
                </div>

                {card.target && (
                  <div className="w-full">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>{card.title}</span>
                      <span>{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          card.color.includes('blue') ? 'bg-blue-500' :
                          card.color.includes('red') ? 'bg-red-500' :
                          card.color.includes('teal') ? 'bg-teal-500' :
                          'bg-purple-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Blood Pressure */}
      {todayMetrics?.bloodPressure && (
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <Heart className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Blood Pressure
            </h3>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              {todayMetrics.bloodPressure.systolic}/{todayMetrics.bloodPressure.diastolic}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">mmHg</p>
          </div>
        </Card>
      )}

      {/* Weekly Chart */}
      {weeklyMetrics.length > 0 && (
        <Card>
          <HealthChart metrics={weeklyMetrics} />
        </Card>
      )}

      {/* Health Insights */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Health Insights
          </h3>
        </div>

        <div className="space-y-3">
          {todayMetrics?.steps && todayMetrics.steps >= 8000 && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <p className="text-sm text-green-800 dark:text-green-200">
                🎉 Great job! You're staying active today with {todayMetrics.steps.toLocaleString()} steps.
              </p>
            </div>
          )}
          
          {todayMetrics?.sleepHours && todayMetrics.sleepHours < 7 && (
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                💤 Consider getting more sleep tonight. Quality rest is important for mental health.
              </p>
            </div>
          )}

          {(!todayMetrics || Object.keys(todayMetrics).length <= 2) && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                📱 Connect your smart watch or add manual entries to track your health metrics.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Smart Watch Connector Modal */}
      {showConnector && (
        <SmartWatchConnector onClose={() => setShowConnector(false)} />
      )}

      {/* Manual Entry Modal */}
      {showManualEntry && (
        <ManualEntryModal
          onSave={handleManualEntry}
          onClose={() => setShowManualEntry(false)}
        />
      )}
    </div>
  );
}

// Manual Entry Modal Component
function ManualEntryModal({ 
  onSave, 
  onClose 
}: { 
  onSave: (metrics: Partial<HealthMetrics>) => void;
  onClose: () => void;
}) {
  const [metrics, setMetrics] = useState<Partial<HealthMetrics>>({});

  const handleSave = () => {
    onSave(metrics);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Manual Health Entry
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Steps
            </label>
            <input
              type="number"
              placeholder="10000"
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              onChange={(e) => setMetrics(prev => ({ ...prev, steps: parseInt(e.target.value) || undefined }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Heart Rate (bpm)
            </label>
            <input
              type="number"
              placeholder="70"
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              onChange={(e) => setMetrics(prev => ({ ...prev, heartRate: parseInt(e.target.value) || undefined }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sleep Hours
            </label>
            <input
              type="number"
              step="0.5"
              placeholder="8"
              className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              onChange={(e) => setMetrics(prev => ({ ...prev, sleepHours: parseFloat(e.target.value) || undefined }))}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={onClose} variant="secondary" className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
}