export interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  emoji: string;
  description?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  emotions?: string[];
  aiInsights?: string;
  recommendedActions?: string[];
}

export interface SelfCareActivity {
  id: string;
  title: string;
  description: string;
  category: 'breathing' | 'movement' | 'mindfulness' | 'creative' | 'social' | 'games';
  duration: string;
  icon: string;
  moodTarget: number[];
  userTypes?: UserRole[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type?: 'text' | 'suggestion' | 'mood-check';
}

export interface HealthMetrics {
  id: string;
  date: string;
  steps?: number;
  heartRate?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  oxygenSaturation?: number;
  sleepHours?: number;
  activeMinutes?: number;
  source: 'manual' | 'apple_health' | 'google_fit' | 'fitbit' | 'garmin';
}

export type UserRole = 'student' | 'teacher' | 'employee' | 'business_owner';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  onboardingCompleted: boolean;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    reminderTime: string;
    smartWatchConnected: boolean;
    smartWatchType?: 'apple' | 'google' | 'fitbit' | 'garmin';
  };
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    reminderTime: string;
    smartWatchConnected: boolean;
    smartWatchType?: 'apple' | 'google' | 'fitbit' | 'garmin';
  };
}

export type ViewType = 'dashboard' | 'checkin' | 'selfcare' | 'companion' | 'health' | 'settings';