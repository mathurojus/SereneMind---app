import React from 'react';
import { Moon, Sun, Bell, User, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useTheme } from '../../hooks/useTheme';
import { UserService } from '../../services/userService';

export function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const userProfile = UserService.getUserProfile();

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out? This will clear all your data.')) {
      UserService.clearUserProfile();
      localStorage.clear();
      window.location.reload();
    }
  };

  const settingsGroups = [
    {
      title: 'Appearance',
      items: [
        {
          icon: isDark ? Sun : Moon,
          label: isDark ? 'Light Mode' : 'Dark Mode',
          action: toggleTheme,
          type: 'toggle' as const
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Daily Reminders',
          subtitle: 'Get reminded to check in daily',
          type: 'navigation' as const
        }
      ]
    },
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile Settings',
          type: 'navigation' as const
        },
        {
          icon: Shield,
          label: 'Privacy & Data',
          subtitle: 'Manage your data and privacy settings',
          type: 'navigation' as const
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          type: 'navigation' as const
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      {userProfile && (
        <Card>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {userProfile.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 capitalize">
                {userProfile.role.replace('_', ' ')}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                Member since {new Date(userProfile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
      )}

      {settingsGroups.map((group, groupIndex) => (
        <Card key={groupIndex}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {group.title}
          </h3>
          <div className="space-y-3">
            {group.items.map((item, itemIndex) => {
              const IconComponent = item.icon;
              
              return (
                <div key={itemIndex} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {item.label}
                      </p>
                      {item.subtitle && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {item.type === 'toggle' && item.action && (
                    <Button onClick={item.action} variant="ghost" size="sm">
                      {isDark ? '🌞' : '🌙'}
                    </Button>
                  )}
                  
                  {item.type === 'navigation' && (
                    <Button variant="ghost" size="sm">
                      →
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      ))}

      {/* Logout Section */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Account Actions
          </h3>
          <Button 
            onClick={handleLogout}
            variant="secondary" 
            className="w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-4 h-4" />
            Log Out & Clear Data
          </Button>
        </div>
      </Card>

      <Card className="text-center">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Need Professional Help?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            If you're experiencing persistent mental health challenges, consider reaching out to a mental health professional.
          </p>
          <Button variant="secondary" className="w-full">
            Find Resources
          </Button>
        </div>
      </Card>

      <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-4">
        Serenity v1.0 • Made with 💜 for your wellbeing
      </div>
    </div>
  );
}