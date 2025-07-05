import { useState, useEffect } from 'react';
import { MoodEntry } from '../types';
import { DataService } from '../services/dataService';

export function useMoodData() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const data = DataService.getMoodEntries();
      setEntries(data);
      setLoading(false);
    };

    loadData();
  }, []);

  const addEntry = (entry: Omit<MoodEntry, 'id'>) => {
    const newEntry = DataService.saveMoodEntry(entry);
    setEntries(prev => [...prev, newEntry]);
    return newEntry;
  };

  const todayEntry = DataService.getTodayEntry();
  const recentHistory = DataService.getMoodHistory(7);
  const averageMood = DataService.getAverageMood(7);

  return {
    entries,
    loading,
    addEntry,
    todayEntry,
    recentHistory,
    averageMood
  };
}