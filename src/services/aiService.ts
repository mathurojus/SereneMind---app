import { MoodEntry, UserRole } from '../types';
import { geminiService } from './geminiService';

export class AIService {
  static async analyzeSentiment(text: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    emotions: string[];
    confidence: number;
  }> {
    return await geminiService.analyzeSentiment(text);
  }

  static async generateRecommendations(entry: MoodEntry, userRole?: UserRole): Promise<string[]> {
    return await geminiService.generateRecommendations(entry, userRole);
  }

  static async generateCompanionResponse(
    userMessage: string, 
    todayEntry?: MoodEntry | null, 
    userRole?: UserRole,
    userName?: string
  ): Promise<string> {
    return await geminiService.generateCompanionResponse(userMessage, todayEntry, userRole, userName);
  }

  static async getInsight(entry: MoodEntry): Promise<string> {
    try {
      const prompt = `Provide a brief, encouraging insight for someone who rated their mood as ${entry.mood}/5 and shared: "${entry.description || 'No additional details'}". Keep it supportive and under 50 words.`;
      
      // For now, use fallback insights since this is a simple case
      if (entry.mood <= 2) {
        return "It's okay to have difficult days. Remember that feelings are temporary and you have the strength to get through this.";
      } else if (entry.mood === 3) {
        return "You're doing well maintaining balance. Small positive actions can help shift your mood in a good direction.";
      } else {
        return "It's wonderful that you're feeling good! Consider what contributed to this positive mood to recreate it in the future.";
      }
    } catch (error) {
      console.error('Error generating insight:', error);
      return "Thank you for checking in with yourself today. Self-awareness is an important step in mental wellness.";
    }
  }
}