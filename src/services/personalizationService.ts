import { UserRole, SelfCareActivity, MoodEntry } from '../types';
import { SELF_CARE_ACTIVITIES } from '../utils/constants';

export class PersonalizationService {
  static getPersonalizedGreeting(name: string, role: UserRole): string {
    const greetings = {
      student: `Hi ${name}! Ready to tackle your studies with a clear mind?`,
      teacher: `Welcome back, ${name}! Let's take care of your wellbeing so you can support your students.`,
      employee: `Hello ${name}! Time to check in and maintain that work-life balance.`,
      business_owner: `Good to see you, ${name}! Leading others starts with taking care of yourself.`
    };

    return greetings[role];
  }

  static getPersonalizedActivities(role: UserRole, mood?: number): SelfCareActivity[] {
    const roleSpecificActivities = {
      student: [
        {
          id: 'study-break',
          title: 'Study Break Breathing',
          description: 'Quick breathing exercise between study sessions',
          category: 'breathing' as const,
          duration: '3 min',
          icon: 'BookOpen',
          moodTarget: [1, 2, 3, 4, 5],
          userTypes: ['student' as UserRole]
        },
        {
          id: 'exam-anxiety',
          title: 'Exam Anxiety Relief',
          description: 'Calm your nerves before tests with guided meditation',
          category: 'mindfulness' as const,
          duration: '8 min',
          icon: 'Brain',
          moodTarget: [1, 2, 3],
          userTypes: ['student' as UserRole]
        }
      ],
      teacher: [
        {
          id: 'classroom-reset',
          title: 'Classroom Reset',
          description: 'Quick mindfulness exercise between classes',
          category: 'mindfulness' as const,
          duration: '5 min',
          icon: 'RefreshCw',
          moodTarget: [2, 3, 4],
          userTypes: ['teacher' as UserRole]
        },
        {
          id: 'teacher-burnout',
          title: 'Educator Self-Care',
          description: 'Combat teaching burnout with restorative activities',
          category: 'mindfulness' as const,
          duration: '15 min',
          icon: 'Heart',
          moodTarget: [1, 2, 3],
          userTypes: ['teacher' as UserRole]
        }
      ],
      employee: [
        {
          id: 'desk-stretch',
          title: 'Desk Stretches',
          description: 'Release tension from sitting at your desk',
          category: 'movement' as const,
          duration: '5 min',
          icon: 'Monitor',
          moodTarget: [2, 3, 4],
          userTypes: ['employee' as UserRole]
        },
        {
          id: 'meeting-prep',
          title: 'Pre-Meeting Calm',
          description: 'Center yourself before important meetings',
          category: 'breathing' as const,
          duration: '3 min',
          icon: 'Users',
          moodTarget: [1, 2, 3],
          userTypes: ['employee' as UserRole]
        }
      ],
      business_owner: [
        {
          id: 'decision-clarity',
          title: 'Decision Clarity',
          description: 'Clear your mind for better business decisions',
          category: 'mindfulness' as const,
          duration: '10 min',
          icon: 'Target',
          moodTarget: [2, 3, 4],
          userTypes: ['business_owner' as UserRole]
        },
        {
          id: 'leadership-stress',
          title: 'Leadership Stress Relief',
          description: 'Manage the pressures of leading a team',
          category: 'breathing' as const,
          duration: '8 min',
          icon: 'Crown',
          moodTarget: [1, 2, 3],
          userTypes: ['business_owner' as UserRole]
        }
      ]
    };

    const baseActivities = SELF_CARE_ACTIVITIES.filter(activity => 
      !mood || activity.moodTarget.includes(mood)
    );

    const personalizedActivities = roleSpecificActivities[role] || [];
    
    return [...personalizedActivities, ...baseActivities];
  }

  static getPersonalizedInsights(role: UserRole, entry: MoodEntry): string[] {
    const insights = {
      student: [
        'Remember to take breaks between study sessions',
        'Your mental health is just as important as your grades',
        'Consider talking to a counselor if stress becomes overwhelming'
      ],
      teacher: [
        'You can\'t pour from an empty cup - take care of yourself first',
        'Your wellbeing directly impacts your students\' learning experience',
        'Consider setting boundaries between work and personal time'
      ],
      employee: [
        'Work-life balance is crucial for long-term success',
        'Don\'t hesitate to use your mental health days',
        'Regular check-ins with yourself prevent burnout'
      ],
      business_owner: [
        'Leading by example includes prioritizing mental health',
        'Your team\'s wellbeing reflects your own leadership style',
        'Strategic thinking improves when you\'re mentally refreshed'
      ]
    };

    const roleInsights = insights[role] || [];
    
    if (entry.mood <= 2) {
      return [
        ...roleInsights,
        'It\'s okay to have difficult days - they don\'t define you',
        'Consider reaching out to someone you trust'
      ];
    } else if (entry.mood >= 4) {
      return [
        ...roleInsights,
        'Great to see you in good spirits!',
        'Share your positive energy with others around you'
      ];
    }

    return roleInsights;
  }

  static getPersonalizedRecommendations(role: UserRole, mood: number): string[] {
    const recommendations = {
      student: {
        low: [
          'Take a 10-minute walk between study sessions',
          'Try the Pomodoro technique to manage study stress',
          'Connect with classmates or study groups for support'
        ],
        medium: [
          'Review your study schedule and adjust if needed',
          'Practice active recall techniques for better retention',
          'Reward yourself for completing study goals'
        ],
        high: [
          'Share study tips with classmates who might be struggling',
          'Use this positive energy to tackle challenging subjects',
          'Consider helping others through tutoring or study groups'
        ]
      },
      teacher: {
        low: [
          'Take a few minutes between classes to reset',
          'Remember why you became an educator',
          'Reach out to fellow teachers for support'
        ],
        medium: [
          'Plan engaging activities that energize both you and students',
          'Set small, achievable goals for the day',
          'Practice gratitude for positive student interactions'
        ],
        high: [
          'Channel this energy into creative lesson planning',
          'Mentor a new teacher or share your enthusiasm',
          'Celebrate your impact on students\' lives'
        ]
      },
      employee: {
        low: [
          'Take regular breaks throughout your workday',
          'Communicate with your manager about workload concerns',
          'Use your lunch break for activities that recharge you'
        ],
        medium: [
          'Focus on one task at a time to avoid overwhelm',
          'Set boundaries between work and personal time',
          'Celebrate small wins throughout the day'
        ],
        high: [
          'Use this momentum to tackle challenging projects',
          'Offer help to colleagues who might be struggling',
          'Share your positive attitude with your team'
        ]
      },
      business_owner: {
        low: [
          'Delegate tasks to reduce your immediate stress',
          'Review your priorities and focus on what truly matters',
          'Consider taking a strategic break to gain perspective'
        ],
        medium: [
          'Focus on one major decision or project at a time',
          'Schedule regular check-ins with your team',
          'Invest time in systems that will reduce future stress'
        ],
        high: [
          'Use this clarity to make important strategic decisions',
          'Inspire your team with your positive leadership',
          'Consider expanding or taking on new challenges'
        ]
      }
    };

    const moodLevel = mood <= 2 ? 'low' : mood >= 4 ? 'high' : 'medium';
    return recommendations[role]?.[moodLevel] || [];
  }
}