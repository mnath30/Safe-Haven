
import React, { useState } from 'react';
import type { Mood, Story } from '../../types';
import { SunIcon, LotusLogo, UserCircleIcon, PlusIcon, ListBulletIcon } from '../icons/Icons';

interface HomeScreenProps {
    onMoodSelect: (mood: Mood) => void;
    onNavigate: (page: 'profile' | 'activities') => void;
    stories: Story[];
    onAddStory: (story: Story) => void;
}

const MoodButton: React.FC<{ mood: Mood, emoji: string, label: string, onClick: () => void }> = ({ mood, emoji, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center space-y-2 group">
        <div className="text-3xl md:text-4xl transition-transform duration-200 group-hover:scale-110 transform hover:-translate-y-1">{emoji}</div>
        <span className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 capitalize">{label}</span>
    </button>
);

const MoodTracker: React.FC<{ onMoodSelect: (mood: Mood) => void }> = ({ onMoodSelect }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-center mb-6 text-slate-700 dark:text-slate-200">MindCheck: How are you feeling?</h2>
        <div className="flex justify-between px-2 md:justify-around">
            <MoodButton mood="happy" emoji="😊" label="Happy" onClick={() => onMoodSelect('happy')} />
            <MoodButton mood="content" emoji="🙂" label="Content" onClick={() => onMoodSelect('content')} />
            <MoodButton mood="neutral" emoji="😐" label="Neutral" onClick={() => onMoodSelect('neutral')} />
            <MoodButton mood="sad" emoji="😔" label="Sad" onClick={() => onMoodSelect('sad')} />
            <MoodButton mood="stressed" emoji="😟" label="Stressed" onClick={() => onMoodSelect('stressed')} />
        </div>
    </div>
);

const ComfortTeaser: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => (
    <section className="bg-violet-50 dark:bg-violet-900/20 p-6 rounded-3xl border border-violet-100 dark:border-violet-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
            <h2 className="text-xl font-semibold text-violet-900 dark:text-violet-100 mb-1">Need a quick reset?</h2>
            <p className="text-sm text-violet-700 dark:text-violet-300">Explore our library of breathing exercises, meditations, and grounding techniques.</p>
        </div>
        <button 
            onClick={onNavigate}
            className="px-5 py-3 bg-violet-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-violet-700 transition-colors flex items-center whitespace-nowrap"
        >
            <ListBulletIcon className="w-4 h-4 mr-2" /> View Activities
        </button>
    </section>
);

const PeerLiteStoryCard: React.FC<{ title: string, snippet: string, author: string }> = ({ title, snippet, author }) => (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm flex-shrink-0 w-[80%] md:w-[280px] snap-center border border-slate-100 dark:border-slate-700 flex flex-col justify-between h-full">
        <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 line-clamp-2">{title}</h4>
            <p className="text-slate-600 dark:text-slate-300 text-sm italic mb-3 line-clamp-3">"{snippet}"</p>
        </div>
        <p className="text-right text-xs text-slate-400 dark:text-slate-500 font-medium mt-auto">- {author}</p>
    </div>
);

const SOSBanner: React.FC = () => (
    <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900 p-4 rounded-2xl flex items-center justify-between">
        <div>
            <h3 className="font-bold text-rose-700 dark:text-rose-400">Need immediate support?</h3>
            <p className="text-xs text-rose-600 dark:text-rose-300 mt-1 max-w-[200px]">If you're in crisis, please reach out for professional help.</p>
        </div>
        <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors whitespace-nowrap">
            SOS Mode
        </button>
    </div>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ onMoodSelect, onNavigate, stories, onAddStory }) => {
    const [showAddStory, setShowAddStory] = useState(false);
    const [newStory, setNewStory] = useState({ title: '', snippet: '' });

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    const handleAddStory = () => {
        if (newStory.title && newStory.snippet) {
            onAddStory({
                id: Date.now(),
                title: newStory.title,
                snippet: newStory.snippet,
                author: 'Anonymous'
            });
            setNewStory({ title: '', snippet: '' });
            setShowAddStory(false);
        }
    };

    return (
        <div className="p-4 space-y-8 pb-20">
            <header className="flex items-center justify-between lg:hidden">
                <div>
                    <h1 className="text-2xl font-bold flex items-center text-slate-800 dark:text-slate-100">
                        <LotusLogo className="w-8 h-8 mr-2 text-violet-600" />
                        SafeHaven
                    </h1>
                </div>
                <button onClick={() => onNavigate('profile')} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <UserCircleIcon className="w-8 h-8 text-slate-600 dark:text-slate-300" />
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                     <div>
                        <h2 className="text-3xl font-light text-slate-800 dark:text-slate-100 mb-1">{getGreeting()},</h2>
                        <p className="text-slate-500 dark:text-slate-400">Ready for a moment of reflection?</p>
                    </div>
                    <MoodTracker onMoodSelect={onMoodSelect} />
                    <SOSBanner />
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    <ComfortTeaser onNavigate={() => onNavigate('activities')} />
                    
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">PeerLite Stories</h2>
                            <button 
                                onClick={() => setShowAddStory(!showAddStory)}
                                className="text-xs font-medium text-violet-600 dark:text-violet-400 flex items-center hover:underline"
                            >
                                <PlusIcon className="w-4 h-4 mr-1" /> Share Anonymous
                            </button>
                        </div>
                        
                        {showAddStory && (
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm mb-4 border border-violet-100 dark:border-slate-700 animate-fade-in-down">
                                <input 
                                    placeholder="Title of your experience" 
                                    className="w-full mb-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-sm border-none focus:ring-2 focus:ring-violet-500 outline-none"
                                    value={newStory.title}
                                    onChange={e => setNewStory({...newStory, title: e.target.value})}
                                />
                                <textarea 
                                    placeholder="Share your story anonymously..." 
                                    className="w-full mb-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-sm border-none focus:ring-2 focus:ring-violet-500 outline-none resize-none"
                                    rows={2}
                                    value={newStory.snippet}
                                    onChange={e => setNewStory({...newStory, snippet: e.target.value})}
                                />
                                <div className="flex justify-end">
                                    <button onClick={handleAddStory} className="bg-violet-600 text-white text-xs px-3 py-1.5 rounded-full font-medium">Post</button>
                                </div>
                            </div>
                        )}

                        <div className="flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-4 -mx-4 px-4 hide-scrollbar">
                            {stories.map(story => (
                                <PeerLiteStoryCard key={story.id} {...story} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
