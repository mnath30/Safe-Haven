
import React from 'react';

export type Page = 'home' | 'chat' | 'activities' | 'growth' | 'progress' | 'profile';

export type Mood = 'happy' | 'content' | 'neutral' | 'sad' | 'stressed';

export interface MoodEntry {
  date: string;
  mood: Mood;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface Story {
  id: number;
  title: string;
  snippet: string;
  author: string;
}

export interface GrowthPathway {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  mood?: Mood;
  tags?: string[];
}

export interface UserStats {
  screenTime: string;
  notifications: number;
  sleepTime: string;
  meetings: number;
}

export interface Activity {
  id: string;
  title: string;
  duration: string;
  description: string;
  category: 'anxious' | 'stressed' | 'calm' | 'overwhelmed';
}

export interface Reminder {
  id: string;
  label: string;
  time: string;
  enabled: boolean;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatar?: string;
}
