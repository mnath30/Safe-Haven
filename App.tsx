
import React, { useState, useCallback } from 'react';
import { Page, Mood, MoodEntry, JournalEntry, Story, UserProfile, Reminder } from './types';
import { PEERLITE_STORIES } from './constants';
import BottomNav from './components/BottomNav';
import DesktopNav from './components/DesktopNav';
import HomeScreen from './components/screens/HomeScreen';
import ChatScreen from './components/screens/ChatScreen';
import GrowthScreen from './components/screens/GrowthScreen';
import ProgressScreen from './components/screens/ProgressScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ActivitiesScreen from './components/screens/ActivitiesScreen';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    { date: '2023-10-21', mood: 'content' },
    { date: '2023-10-22', mood: 'neutral' },
    { date: '2023-10-23', mood: 'happy' },
    { date: '2023-10-24', mood: 'stressed' },
    { date: '2023-10-25', mood: 'content' },
    { date: '2023-10-26', mood: 'happy' },
    { date: '2023-10-27', mood: 'neutral' },
  ]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [stories, setStories] = useState<Story[]>(PEERLITE_STORIES);
  
  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>({
      name: 'Friend',
      bio: 'Learning to prioritize myself.',
      avatar: ''
  });

  // Reminders State
  const [reminders, setReminders] = useState<Reminder[]>([
      { id: '1', time: '08:00', label: 'Morning Check-in', enabled: true }
  ]);

  const handleMoodSelect = useCallback((mood: Mood) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: MoodEntry = { date: today, mood };
    
    setMoodHistory(prevHistory => {
      const existingIndex = prevHistory.findIndex(entry => entry.date === today);
      if (existingIndex !== -1) {
        const updatedHistory = [...prevHistory];
        updatedHistory[existingIndex] = newEntry;
        return updatedHistory;
      }
      return [...prevHistory, newEntry].slice(-30);
    });
  }, []);

  const handleAddJournalEntry = (entry: JournalEntry) => {
      setJournalEntries(prev => [...prev, entry]);
  };

  const handleAddStory = (story: Story) => {
      setStories(prev => [story, ...prev]);
  };
  
  const handleUpdateProfile = (profile: UserProfile) => {
      setUserProfile(profile);
  };

  const handleToggleReminder = (id: string) => {
      setReminders(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleAddReminder = (reminder: Reminder) => {
      setReminders(prev => [...prev, reminder]);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <HomeScreen onMoodSelect={handleMoodSelect} onNavigate={(page) => setActivePage(page)} stories={stories} onAddStory={handleAddStory} />;
      case 'chat':
        return (
            <ChatScreen 
                moodHistory={moodHistory}
                journalEntries={journalEntries}
                userProfile={userProfile}
            />
        );
      case 'activities':
        return <ActivitiesScreen />;
      case 'growth':
        return <GrowthScreen />;
      case 'progress':
        return <ProgressScreen moodHistory={moodHistory} journalEntries={journalEntries} />;
      case 'profile':
        return (
            <ProfileScreen 
                journalEntries={journalEntries} 
                onAddJournalEntry={handleAddJournalEntry}
                userProfile={userProfile}
                onUpdateProfile={handleUpdateProfile}
                reminders={reminders}
                onToggleReminder={handleToggleReminder}
                onAddReminder={handleAddReminder}
            />
        );
      default:
        return <HomeScreen onMoodSelect={handleMoodSelect} onNavigate={(page) => setActivePage(page)} stories={stories} onAddStory={handleAddStory} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans antialiased">
      <DesktopNav activePage={activePage} setActivePage={setActivePage} />
      
      <div className="flex-1 flex flex-col h-full relative w-full max-w-5xl mx-auto lg:max-w-none">
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {renderContent()}
        </main>
        <BottomNav activePage={activePage} setActivePage={setActivePage} />
      </div>
    </div>
  );
};

export default App;
