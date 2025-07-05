import React from 'react';
import { Calendar, Smile } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MoodChart } from './MoodChart';
import { StatsCards } from './StatsCards';
import { useMoodData } from '../../hooks/useMoodData';
import { ViewType } from '../../types';
import { UserService } from '../../services/userService';
import { PersonalizationService } from '../../services/personalizationService';

interface DashboardProps {
  onViewChange: (view: ViewType) => void;
}

export function Dashboard({ onViewChange }: DashboardProps) {
  const { recentHistory, averageMood, todayEntry, loading } = useMoodData();
  const userProfile = UserService.getUserProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('en', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const personalizedGreeting = userProfile 
    ? PersonalizationService.getPersonalizedGreeting(userProfile.name, userProfile.role)
    : 'Welcome back!';

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card>
        <div className="text-center space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {personalizedGreeting}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              {today}
            </p>
          </div>
          
          {!todayEntry ? (
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400">
                How are you feeling today?
              </p>
              <Button onClick={() => onViewChange('checkin')} className="w-full">
                <Smile className="w-5 h-5" />
                Check In Now
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">{todayEntry.emoji}</span>
                <div className="text-left">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    Today's Mood
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {todayEntry.mood}/5 rating
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Personalized Insights */}
      {userProfile && todayEntry && (
        <Card>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Insights for {userProfile.role === 'business_owner' ? 'Business Owners' : 
                           userProfile.role === 'teacher' ? 'Educators' :
                           userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1) + 's'}
            </h3>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-xl">
              {PersonalizationService.getPersonalizedInsights(userProfile.role, todayEntry).map((insight, index) => (
                <p key={index} className="text-sm text-gray-700 dark:text-gray-300 mb-2 last:mb-0">
                  • {insight}
                </p>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Stats Cards */}
      <StatsCards entries={recentHistory} averageMood={averageMood} />

      {/* Mood Chart */}
      {recentHistory.length > 0 && (
        <Card>
          <MoodChart entries={recentHistory} />
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <Button 
            onClick={() => onViewChange('selfcare')} 
            variant="secondary" 
            className="w-full justify-start"
          >
            <span>💆‍♀️</span>
            Explore Self-Care Activities
          </Button>
          <Button 
            onClick={() => onViewChange('companion')} 
            variant="secondary" 
            className="w-full justify-start"
          >
            <span>🤖</span>
            Chat with Sera (AI Companion)
          </Button>
          <Button 
            onClick={() => onViewChange('checkin')} 
            variant="secondary" 
            className="w-full justify-start"
          >
            <span>📝</span>
            Update Today's Check-in
          </Button>
        </div>
      </Card>
    </div>
  );
}