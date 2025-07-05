import React, { useState, useEffect } from 'react';
import { Sparkles, Filter } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ActivityCard } from './ActivityCard';
import { SelfCareActivity } from '../../types';
import { useMoodData } from '../../hooks/useMoodData';
import { AIService } from '../../services/aiService';
import { UserService } from '../../services/userService';
import { PersonalizationService } from '../../services/personalizationService';

export function SelfCareHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { todayEntry } = useMoodData();
  const userProfile = UserService.getUserProfile();

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'breathing', label: 'Breathing' },
    { id: 'movement', label: 'Movement' },
    { id: 'mindfulness', label: 'Mindfulness' },
    { id: 'creative', label: 'Creative' },
    { id: 'social', label: 'Social' },
    { id: 'games', label: 'Games' }
  ];

  // Get personalized activities based on user role and mood
  const personalizedActivities = userProfile 
    ? PersonalizationService.getPersonalizedActivities(userProfile.role, todayEntry?.mood)
    : [];

  const filteredActivities = selectedCategory === 'all' 
    ? personalizedActivities
    : personalizedActivities.filter(activity => activity.category === selectedCategory);

  const recommendedActivities = todayEntry 
    ? personalizedActivities.filter(activity => 
        activity.moodTarget.includes(todayEntry.mood)
      )
    : [];

  useEffect(() => {
    if (todayEntry && userProfile) {
      setLoading(true);
      // Get both AI recommendations and personalized recommendations
      Promise.all([
        AIService.generateRecommendations(todayEntry, userProfile.role),
        Promise.resolve(PersonalizationService.getPersonalizedRecommendations(userProfile.role, todayEntry.mood))
      ]).then(([aiRecs, personalizedRecs]) => {
        setRecommendations([...personalizedRecs, ...aiRecs]);
      }).finally(() => setLoading(false));
    }
  }, [todayEntry, userProfile]);

  const handleStartActivity = (activity: SelfCareActivity) => {
    // In a real app, this would start a guided activity or timer
    if (activity.category === 'games') {
      alert(`Starting "${activity.title}"! Take ${activity.duration} to play and relax. Games are a great way to reduce stress! 🎮`);
    } else {
      alert(`Starting "${activity.title}"! Take ${activity.duration} for yourself. You've got this! 💚`);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI-Powered Recommendations */}
      {todayEntry && userProfile && (
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                AI-Powered Recommendations for {userProfile.name}
              </h3>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Based on your mood today ({todayEntry.emoji}) and your role as a {userProfile.role.replace('_', ' ')}, here are AI-generated suggestions:
              </p>
              
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  AI is analyzing your mood and generating personalized recommendations...
                </div>
              ) : (
                <ul className="space-y-2">
                  {recommendations.slice(0, 4).map((rec, index) => (
                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                      <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {recommendedActivities.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Recommended Activities:
                </h4>
                <div className="space-y-3">
                  {recommendedActivities.slice(0, 2).map(activity => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      onStart={handleStartActivity}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Category Filter */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Browse Activities
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'primary' : 'ghost'}
                size="sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Activities Grid */}
      <div className="space-y-4">
        {filteredActivities.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onStart={handleStartActivity}
          />
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <Card className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No activities found in this category.
          </p>
        </Card>
      )}
    </div>
  );
}