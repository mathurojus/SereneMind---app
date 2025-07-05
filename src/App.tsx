import React, { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout.tsx';
import { Dashboard } from './components/dashboard/Dashboard.tsx';
import { MoodCheckIn } from './components/mood/MoodCheckIn.tsx';
import { SelfCareHub } from './components/selfcare/SelfCareHub.tsx';
import { AICompanion } from './components/companion/AICompanion.tsx';
import { HealthTracker } from './components/health/HealthTracker.tsx';
import { Settings } from './components/settings/Settings.tsx';
import { WelcomeScreen } from './components/onboarding/WelcomeScreen.tsx';
import { ViewType, UserRole } from './types/index.ts';
import { UserService } from './services/userService.ts';

function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check onboarding status on app load
  useEffect(() => {
    const checkOnboarding = () => {
      const isComplete = UserService.isOnboardingComplete();
      setIsOnboarded(isComplete);
      setLoading(false);
    };

    checkOnboarding();
  }, []);

  // Initialize theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('serenity_theme');
    const isDark = savedTheme ? savedTheme === 'dark' : false; // Default to light
    
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const handleOnboardingComplete = (name: string, role: UserRole) => {
    UserService.createUserProfile(name, role);
    setIsOnboarded(true);
  };

  const viewTitles: Record<ViewType, string> = {
    dashboard: 'Your Wellness Dashboard',
    checkin: 'Daily Mood Check-in',
    selfcare: 'Self-Care Activities',
    companion: 'AI Companion Chat',
    health: 'Health Metrics',
    settings: 'Settings & Preferences'
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onViewChange={setActiveView} />;
      case 'checkin':
        return <MoodCheckIn />;
      case 'selfcare':
        return <SelfCareHub />;
      case 'companion':
        return <AICompanion />;
      case 'health':
        return <HealthTracker />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onViewChange={setActiveView} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isOnboarded) {
    return <WelcomeScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout
      title={viewTitles[activeView]}
      activeView={activeView}
      onViewChange={setActiveView}
    >
      {renderView()}
    </Layout>
  );
}

export default App;