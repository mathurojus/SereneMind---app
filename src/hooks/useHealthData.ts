import { useState, useEffect } from 'react';
import { HealthMetrics } from '../types';

const HEALTH_STORAGE_KEY = 'serenity_health_data';

export function useHealthData() {
  const [metrics, setMetrics] = useState<HealthMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const data = localStorage.getItem(HEALTH_STORAGE_KEY);
      setMetrics(data ? JSON.parse(data) : []);
      setLoading(false);
    };

    loadData();
  }, []);

  const addMetrics = (newMetrics: Omit<HealthMetrics, 'id'>) => {
    const entry: HealthMetrics = {
      ...newMetrics,
      id: Date.now().toString()
    };
    
    const updatedMetrics = [...metrics, entry];
    setMetrics(updatedMetrics);
    localStorage.setItem(HEALTH_STORAGE_KEY, JSON.stringify(updatedMetrics));
  };

  const getTodayMetrics = (): HealthMetrics | null => {
    const today = new Date().toDateString();
    return metrics.find(m => 
      new Date(m.date).toDateString() === today
    ) || null;
  };

  const getWeeklyMetrics = (): HealthMetrics[] => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);
    
    return metrics.filter(m => 
      new Date(m.date) >= cutoffDate
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return {
    metrics,
    loading,
    addMetrics,
    todayMetrics: getTodayMetrics(),
    weeklyMetrics: getWeeklyMetrics()
  };
}