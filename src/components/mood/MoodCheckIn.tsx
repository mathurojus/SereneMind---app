import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MoodSelector } from './MoodSelector';
import { JournalEntry } from './JournalEntry';
import { AIService } from '../../services/aiService';
import { useMoodData } from '../../hooks/useMoodData';
import { UserService } from '../../services/userService';

export function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [journalEntry, setJournalEntry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const { addEntry, todayEntry } = useMoodData();
  const userProfile = UserService.getUserProfile();

  const handleMoodSelect = (mood: number, emoji: string) => {
    setSelectedMood(mood);
    setSelectedEmoji(emoji);
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;

    setIsSubmitting(true);
    
    try {
      let aiAnalysis = null;
      let recommendations: string[] = [];
      
      if (journalEntry.trim()) {
        aiAnalysis = await AIService.analyzeSentiment(journalEntry);
      }

      const entry = {
        date: new Date().toISOString(),
        mood: selectedMood,
        emoji: selectedEmoji,
        description: journalEntry || undefined,
        sentiment: aiAnalysis?.sentiment,
        emotions: aiAnalysis?.emotions
      };

      const savedEntry = addEntry(entry);
      recommendations = await AIService.generateRecommendations(savedEntry, userProfile?.role);

      // Update entry with recommendations
      savedEntry.recommendedActions = recommendations;
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting mood entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (todayEntry && !submitted) {
    return (
      <Card className="text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              You've already checked in today!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your mood: {todayEntry.emoji} ({todayEntry.mood}/5)
            </p>
            <Button onClick={() => setSubmitted(false)} variant="secondary">
              Update Check-in
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (submitted) {
    return (
      <Card className="text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Thank you for checking in!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your mood has been analyzed by AI. Check out the Self-Care tab for personalized suggestions.
            </p>
            <Button 
              onClick={() => {
                setSubmitted(false);
                setSelectedMood(null);
                setJournalEntry('');
              }} 
              variant="secondary"
            >
              Check In Again
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <MoodSelector
          selectedMood={selectedMood}
          onMoodSelect={handleMoodSelect}
        />
      </Card>

      <Card>
        <JournalEntry onEntryChange={setJournalEntry} />
      </Card>

      <Button
        onClick={handleSubmit}
        disabled={!selectedMood || isSubmitting}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing with AI...
          </>
        ) : (
          'Submit Check-in'
        )}
      </Button>
    </div>
  );
}