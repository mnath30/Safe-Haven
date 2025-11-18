
import type { Story, Activity } from './types';
import { BookOpenIcon, HeartIcon, ShieldCheckIcon, SparklesIcon } from './components/icons/Icons';

export const PEERLITE_STORIES: Story[] = [
  {
    id: 1,
    title: "The Pressure of the First Big Project",
    snippet: "I felt like I was drowning. Everyone seemed to know what they were doing, and I was just faking it. Talking about it with a senior who went through the same thing made all the difference.",
    author: "Software Developer, 24"
  },
  {
    id: 2,
    title: "Juggling Work and Family Expectations",
    snippet: "My family didn't understand why I had to work late. It felt like I was failing on both fronts. Learning to set boundaries was hard, but it saved my sanity.",
    author: "Marketing Manager, 28"
  },
  {
    id: 3,
    title: "Feeling Isolated While Working Remotely",
    snippet: "The silence was deafening. I missed the small office chats. I started a virtual 'chai break' with my team, and it helped us reconnect on a human level again.",
    author: "Graphic Designer, 26"
  }
];

export const GROWTH_PATHWAYS = [
  {
    id: 1,
    title: "Building Emotional Resilience",
    description: "Learn to bounce back from setbacks and navigate stress with grace.",
    category: "Resilience",
    icon: ShieldCheckIcon
  },
  {
    id: 2,
    title: "Mastering Mindful Communication",
    description: "Improve your work relationships by communicating with empathy and clarity.",
    category: "Skills",
    icon: HeartIcon
  },
  {
    id: 3,
    title: "First-Jobber's Survival Guide",
    description: "Navigate the challenges and anxieties of starting your career.",
    category: "Career",
    icon: BookOpenIcon
  },
  {
    id: 4,
    title: "Finding Your Work-Life Harmony",
    description: "Techniques to create a sustainable balance that works for you.",
    category: "Balance",
    icon: SparklesIcon
  }
];

export const COMFORT_ACTIVITIES: Activity[] = [
  { id: '1', title: "4-7-8 Breathing", duration: "2 min", description: "Calming breath work", category: 'anxious' },
  { id: '2', title: "Grounding 5-4-3-2-1", duration: "3 min", description: "Connect with senses", category: 'anxious' },
  { id: '3', title: "Body Scan", duration: "7 min", description: "Release physical tension", category: 'stressed' },
  { id: '4', title: "Self-Compassion", duration: "3 min", description: "Kind affirmations", category: 'stressed' },
  { id: '5', title: "Mindful Moment", duration: "2 min", description: "Present awareness", category: 'calm' },
  { id: '6', title: "Nature Sounds", duration: "5 min", description: "Relaxing auditory escape", category: 'calm' },
  { id: '7', title: "Guided Meditation", duration: "5 min", description: "Find your center", category: 'overwhelmed' },
  { id: '8', title: "Deep Belly Breathing", duration: "2 min", description: "Reset your nervous system", category: 'overwhelmed' },
  { id: '9', title: "Box Breathing", duration: "3 min", description: "Focus and clarity", category: 'anxious' },
  { id: '10', title: "Gratitude Journal", duration: "4 min", description: "Shift your perspective", category: 'stressed' },
];
