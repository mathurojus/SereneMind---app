import React, { useState } from 'react';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { UserRole } from '../../types';

interface WelcomeScreenProps {
  onComplete: (name: string, role: UserRole) => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [step, setStep] = useState<'welcome' | 'name' | 'role'>('welcome');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles = [
    {
      id: 'student' as UserRole,
      title: 'Student',
      description: 'Managing studies, exams, and academic stress',
      icon: '🎓',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'teacher' as UserRole,
      title: 'Teacher/Educator',
      description: 'Supporting students while managing your own wellbeing',
      icon: '👩‍🏫',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'employee' as UserRole,
      title: 'Employee',
      description: 'Balancing work responsibilities and personal life',
      icon: '💼',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'business_owner' as UserRole,
      title: 'Business Owner',
      description: 'Managing business stress and leadership challenges',
      icon: '🚀',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const handleComplete = () => {
    if (name && selectedRole) {
      onComplete(name, selectedRole);
    }
  };

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome to Serenity
                </h1>
                <p className="text-gray-600 text-lg">
                  Your AI-powered mental health companion
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">What you'll get:</h3>
                </div>
                <ul className="text-sm text-gray-700 space-y-2 text-left">
                  <li>• Daily mood tracking and insights</li>
                  <li>• Personalized self-care recommendations</li>
                  <li>• AI companion for supportive conversations</li>
                  <li>• Health metrics integration</li>
                  <li>• Stress-relief games and activities</li>
                </ul>
              </div>
            </div>

            <Button onClick={() => setStep('name')} className="w-full" size="lg">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>

            <p className="text-xs text-gray-500">
              Your privacy is our priority. All data is stored securely and locally.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'name') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="space-y-6">
            <div className="text-center">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                What should we call you?
              </h2>
              <p className="text-gray-600">
                We'd love to personalize your experience
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800 placeholder-gray-500"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => setStep('welcome')} 
                variant="secondary" 
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={() => setStep('role')} 
                disabled={!name.trim()}
                className="flex-1"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Tell us about yourself
            </h2>
            <p className="text-gray-600">
              This helps us provide better recommendations
            </p>
          </div>

          <div className="space-y-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedRole === role.id
                    ? 'border-purple-400 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                    <span className="text-2xl">{role.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {role.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {role.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => setStep('name')} 
              variant="secondary" 
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              onClick={handleComplete} 
              disabled={!selectedRole}
              className="flex-1"
            >
              Complete Setup
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}