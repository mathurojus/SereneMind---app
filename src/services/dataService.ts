import { MoodEntry } from '../types';

const STORAGE_KEY = 'serenity_mood_data';

export class DataService {
  static getMoodEntries(): MoodEntry[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveMoodEntry(entry: Omit<MoodEntry, 'id'>): MoodEntry {
    const entries = this.getMoodEntries();
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString()
    };
    
    entries.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return newEntry;
  }

  static getMoodHistory(days: number = 7): MoodEntry[] {
    const entries = this.getMoodEntries();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return entries.filter(entry => 
      new Date(entry.date) >= cutoffDate
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  static getAverageMood(days: number = 7): number {
    const entries = this.getMoodHistory(days);
    if (entries.length === 0) return 0;
    
    const sum = entries.reduce((acc, entry) => acc + entry.mood, 0);
    return Math.round((sum / entries.length) * 10) / 10;
  }

  static getTodayEntry(): MoodEntry | null {
    const entries = this.getMoodEntries();
    const today = new Date().toDateString();
    
    return entries.find(entry => 
      new Date(entry.date).toDateString() === today
    ) || null;
  }
}