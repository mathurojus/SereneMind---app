import { GoogleGenerativeAI } from '@google/generative-ai';
import { MoodEntry, UserRole } from '../types/index.ts';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
      this.isInitialized = false;
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      this.isInitialized = true;
      console.log('Gemini AI initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
      this.isInitialized = false;
    }
  }

  private getFallbackCompanionResponse(userMessage: string, userName?: string): string {
    const responses = [
      `I hear you${userName ? `, ${userName}` : ''}. While I'm having some technical difficulties right now, I want you to know that your feelings are valid and I'm here for you. 💜`,
      `Thank you for sharing that with me${userName ? `, ${userName}` : ''}. I'm experiencing some connection issues, but I want you to know that what you're going through matters. Take a deep breath - you're not alone. ✨`,
      `I appreciate you opening up${userName ? `, ${userName}` : ''}. Even though I'm having trouble accessing my full capabilities right now, I want to remind you that it's okay to feel whatever you're feeling. Be gentle with yourself today. 🌟`,
      `${userName ? `${userName}, ` : ''}I'm listening, even if I can't respond with my usual insight right now. Your thoughts and feelings are important. Remember to take care of yourself, and don't hesitate to reach out to someone you trust if you need support. 💙`,
      `I'm having some technical challenges at the moment${userName ? `, ${userName}` : ''}, but I want you to know that sharing your thoughts takes courage. Whatever you're going through, remember that difficult feelings are temporary and you have the strength to get through this. 🌈`
    ];

    // Simple hash function to pick a consistent response based on message content
    let hash = 0;
    for (let i = 0; i < userMessage.length; i++) {
      const char = userMessage.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    const index = Math.abs(hash) % responses.length;
    return responses[index];
  }

  async generateCompanionResponse(
    userMessage: string, 
    todayEntry?: MoodEntry | null, 
    userRole?: UserRole,
    userName?: string
  ): Promise<string> {
    if (!this.isInitialized || !this.model) {
      return this.getFallbackCompanionResponse(userMessage, userName);
    }

    try {
      // Build context for the AI
      let systemPrompt = `You are Sera, a compassionate AI mental health companion. You provide supportive, empathetic responses to help users with their mental wellbeing. 

Guidelines:
- Be warm, understanding, and genuinely helpful
- Keep responses conversational and natural (2-4 sentences)
- Use emojis sparingly but appropriately
- Focus on validation, gentle guidance, and emotional support
- Ask follow-up questions when appropriate
- Never provide medical advice, but encourage professional help when needed`;

      let contextInfo = '';

      if (userName) {
        contextInfo += `The user's name is ${userName}. `;
      }

      if (userRole) {
        const roleContext = {
          student: "They are a student dealing with academic stress, exams, and study pressures.",
          teacher: "They are a teacher/educator managing classroom stress while supporting students.",
          employee: "They are an employee balancing work responsibilities and personal life.",
          business_owner: "They are a business owner handling leadership challenges and business stress."
        };
        contextInfo += roleContext[userRole] + ' ';
      }

      if (todayEntry) {
        contextInfo += `Today they rated their mood as ${todayEntry.mood}/5. `;
        if (todayEntry.description) {
          contextInfo += `They shared about their day: "${todayEntry.description}" `;
        }
      }

      const fullPrompt = `${systemPrompt}

${contextInfo ? `Context: ${contextInfo}` : ''}

User message: "${userMessage}"

Respond as Sera with empathy and support:`;

      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      
      return text || "I'm here for you. Sometimes I need a moment to find the right words, but I'm listening. 💜";
    } catch (error) {
      console.error('Gemini API error:', error);
      // Return fallback response instead of throwing an error
      return this.getFallbackCompanionResponse(userMessage, userName);
    }
  }

  async analyzeSentiment(text: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    emotions: string[];
    confidence: number;
  }> {
    if (!this.isInitialized || !this.model) {
      return this.fallbackSentimentAnalysis(text);
    }

    try {
      const prompt = `Analyze the sentiment and emotions in this text. Respond with ONLY a JSON object in this exact format:
{
  "sentiment": "positive|negative|neutral",
  "emotions": ["emotion1", "emotion2"],
  "confidence": 0.85
}

Text to analyze: "${text}"`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();
      
      try {
        // Clean the response text to extract JSON
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const analysis = JSON.parse(jsonMatch[0]);
          return {
            sentiment: analysis.sentiment || 'neutral',
            emotions: analysis.emotions || ['neutral'],
            confidence: analysis.confidence || 0.5
          };
        }
        return this.fallbackSentimentAnalysis(text);
      } catch (parseError) {
        return this.fallbackSentimentAnalysis(text);
      }
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      return this.fallbackSentimentAnalysis(text);
    }
  }

  async generateRecommendations(entry: MoodEntry, userRole?: UserRole): Promise<string[]> {
    if (!this.isInitialized || !this.model) {
      return this.fallbackRecommendations(entry.mood);
    }

    try {
      let prompt = `Generate 3 specific, actionable mental health recommendations for someone who:
- Rated their mood as ${entry.mood}/5
- Shared: "${entry.description || 'No additional details'}"`;

      if (userRole) {
        const roleContext = {
          student: "- Is a student dealing with academic pressures",
          teacher: "- Is a teacher managing classroom and student responsibilities", 
          employee: "- Is an employee balancing work and personal life",
          business_owner: "- Is a business owner handling leadership and business challenges"
        };
        prompt += `\n${roleContext[userRole]}`;
      }

      prompt += `\n\nProvide 3 specific, practical recommendations. Format as a JSON array: ["recommendation1", "recommendation2", "recommendation3"]`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();

      try {
        // Clean the response text to extract JSON
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const recommendations = JSON.parse(jsonMatch[0]);
          return Array.isArray(recommendations) ? recommendations : this.fallbackRecommendations(entry.mood);
        }
        return this.fallbackRecommendations(entry.mood);
      } catch (parseError) {
        return this.fallbackRecommendations(entry.mood);
      }
    } catch (error) {
      console.error('Recommendations error:', error);
      return this.fallbackRecommendations(entry.mood);
    }
  }

  private fallbackSentimentAnalysis(text: string) {
    const words = text.toLowerCase();
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    const emotions: string[] = [];
    
    if (words.includes('happy') || words.includes('good') || words.includes('great') || words.includes('excited')) {
      sentiment = 'positive';
      emotions.push('Happy', 'Content');
    } else if (words.includes('sad') || words.includes('bad') || words.includes('stressed') || words.includes('anxious')) {
      sentiment = 'negative';
      emotions.push('Sad', 'Stressed');
    } else if (words.includes('calm') || words.includes('peaceful')) {
      sentiment = 'positive';
      emotions.push('Calm');
    }
    
    return {
      sentiment,
      emotions: emotions.length > 0 ? emotions : ['Neutral'],
      confidence: 0.75
    };
  }

  private fallbackRecommendations(mood: number): string[] {
    if (mood <= 2) {
      return [
        'Try some deep breathing exercises for 5 minutes',
        'Consider reaching out to a friend or family member',
        'Take a warm bath or listen to calming music'
      ];
    } else if (mood === 3) {
      return [
        'Go for a short walk outside',
        'Practice gratitude by writing down 3 positive things',
        'Do some light stretching or gentle movement'
      ];
    } else {
      return [
        'Share your positive energy with others',
        'Try something creative or learn something new',
        'Reflect on what made you feel good today'
      ];
    }
  }
}

export const geminiService = new GeminiService();