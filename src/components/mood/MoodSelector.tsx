import React from 'react';
import { MOOD_EMOJIS } from '../../utils/constants';

interface MoodSelectorProps {
  selectedMood: number | null;
  onMoodSelect: (mood: number, emoji: string) => void;
}

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
        How are you feeling today?
      </h3>
      <div className="flex justify-center gap-4">
        {MOOD_EMOJIS.map(({ value, emoji, label }) => (
          <button
            key={value}
            onClick={() => onMoodSelect(value, emoji)}
            className={`p-4 rounded-2xl transition-all duration-200 ${
              selectedMood === value
                ? 'bg-purple-100 dark:bg-purple-900/30 ring-2 ring-purple-400 scale-110'
                : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:scale-105'
            } shadow-lg`}
            title={label}
          >
            <span className="text-3xl">{emoji}</span>
          </button>
        ))}
      </div>
      {selectedMood && (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          {MOOD_EMOJIS.find(m => m.value === selectedMood)?.label}
        </p>
      )}
    </div>
  );
}