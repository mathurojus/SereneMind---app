import React, { useState } from 'react';
import { PenTool } from 'lucide-react';

interface JournalEntryProps {
  onEntryChange: (entry: string) => void;
  placeholder?: string;
}

export function JournalEntry({ onEntryChange, placeholder = "What's on your mind today?" }: JournalEntryProps) {
  const [entry, setEntry] = useState('');

  const handleChange = (value: string) => {
    setEntry(value);
    onEntryChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <PenTool className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Share your thoughts
        </h3>
      </div>
      <textarea
        value={entry}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-32 p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
      />
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Your thoughts are private and help us provide better recommendations
      </p>
    </div>
  );
}