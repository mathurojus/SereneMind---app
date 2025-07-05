import { UserProfile, UserRole } from '../types';

const USER_STORAGE_KEY = 'serenity_user_profile';

export class UserService {
  static createUserProfile(name: string, role: UserRole): UserProfile {
    const profile: UserProfile = {
      id: Date.now().toString(),
      name,
      role,
      onboardingCompleted: true,
      preferences: {
        theme: 'light',
        notifications: true,
        reminderTime: '09:00',
        smartWatchConnected: false
      },
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
    return profile;
  }

  static getUserProfile(): UserProfile | null {
    const data = localStorage.getItem(USER_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  static updateUserProfile(updates: Partial<UserProfile>): UserProfile | null {
    const current = this.getUserProfile();
    if (!current) return null;

    const updated = { ...current, ...updates };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  static clearUserProfile(): void {
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  static isOnboardingComplete(): boolean {
    const profile = this.getUserProfile();
    return profile?.onboardingCompleted || false;
  }
}