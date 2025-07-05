import { UserRole } from '../types';

export const MOOD_EMOJIS = [
  { value: 1, emoji: '😢', label: 'Very Sad' },
  { value: 2, emoji: '😔', label: 'Sad' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 4, emoji: '😊', label: 'Happy' },
  { value: 5, emoji: '😄', label: 'Very Happy' }
];

export const EMOTION_LABELS = [
  'Anxious', 'Calm', 'Stressed', 'Excited', 'Tired', 'Energetic',
  'Lonely', 'Connected', 'Frustrated', 'Content', 'Overwhelmed', 'Focused'
];

export const SELF_CARE_ACTIVITIES = [
  {
    id: '1',
    title: 'Deep Breathing Exercise',
    description: 'Take 5 minutes to practice deep breathing and center yourself',
    category: 'breathing' as const,
    duration: '5 min',
    icon: 'Wind',
    moodTarget: [1, 2, 3],
    userTypes: ['student', 'teacher', 'employee', 'business_owner'] as UserRole[]
  },
  {
    id: '2',
    title: 'Gentle Stretching',
    description: 'Release tension with simple stretches',
    category: 'movement' as const,
    duration: '10 min',
    icon: 'Activity',
    moodTarget: [2, 3, 4],
    userTypes: ['student', 'teacher', 'employee', 'business_owner'] as UserRole[]
  },
  {
    id: '3',
    title: 'Gratitude Journaling',
    description: 'Write down three things you\'re grateful for today',
    category: 'mindfulness' as const,
    duration: '10 min',
    icon: 'BookOpen',
    moodTarget: [1, 2, 3, 4],
    userTypes: ['student', 'teacher', 'employee', 'business_owner'] as UserRole[]
  },
  {
    id: '4',
    title: 'Creative Drawing',
    description: 'Express yourself through art or doodling',
    category: 'creative' as const,
    duration: '15 min',
    icon: 'Palette',
    moodTarget: [3, 4, 5],
    userTypes: ['student', 'teacher', 'employee', 'business_owner'] as UserRole[]
  },
  {
    id: '5',
    title: 'Call a Friend',
    description: 'Reach out to someone you care about',
    category: 'social' as const,
    duration: '20 min',
    icon: 'Phone',
    moodTarget: [1, 2, 3],
    userTypes: ['student', 'teacher', 'employee', 'business_owner'] as UserRole[]
  },
  {
    id: '6',
    title: 'Mindful Walking',
    description: 'Take a peaceful walk and observe your surroundings',
    category: 'movement' as const,
    duration: '15 min',
    icon: 'MapPin',
    moodTarget: [2, 3, 4, 5],
    userTypes: ['student', 'teacher', 'employee', 'business_owner'] as UserRole[]
  },
  {
    id: '7',
    title: 'Block Stacking Challenge',
    description: 'Stack virtual blocks to build towers and clear your mind',
    category: 'games' as const,
    duration: '10 min',
    icon: 'Square',
    moodTarget: [1, 2, 3, 4],
    userTypes: ['student', 'employee'] as UserRole[]
  },
  {
    id: '8',
    title: 'Color Matching Game',
    description: 'Match colors in this relaxing puzzle game to reduce stress',
    category: 'games' as const,
    duration: '8 min',
    icon: 'Palette',
    moodTarget: [2, 3, 4],
    userTypes: ['student', 'teacher', 'employee'] as UserRole[]
  },
  {
    id: '9',
    title: 'Zen Garden Builder',
    description: 'Create peaceful patterns in a virtual zen garden',
    category: 'games' as const,
    duration: '12 min',
    icon: 'Flower2',
    moodTarget: [1, 2, 3],
    userTypes: ['teacher', 'employee', 'business_owner'] as UserRole[]
  },
  {
    id: '10',
    title: 'Bubble Pop Meditation',
    description: 'Pop bubbles at your own pace for a calming experience',
    category: 'games' as const,
    duration: '5 min',
    icon: 'Circle',
    moodTarget: [1, 2, 3, 4, 5],
    userTypes: ['student', 'teacher', 'employee', 'business_owner'] as UserRole[]
  },
  {
    id: '11',
    title: 'Memory Card Game',
    description: 'Improve focus while relaxing with this gentle memory game',
    category: 'games' as const,
    duration: '10 min',
    icon: 'Brain',
    moodTarget: [2, 3, 4],
    userTypes: ['student', 'teacher', 'employee'] as UserRole[]
  },
  {
    id: '12',
    title: 'Simple Jigsaw Puzzle',
    description: 'Piece together beautiful nature scenes to unwind',
    category: 'games' as const,
    duration: '15 min',
    icon: 'Puzzle',
    moodTarget: [3, 4, 5],
    userTypes: ['teacher', 'employee', 'business_owner'] as UserRole[]
  }
];