
import React, { useState } from 'react';
import { JournalEntry, UserProfile, Reminder } from '../../types';
import { UserCircleIcon, BookOpenIcon, FireIcon, CalendarIcon, PencilIcon, CogIcon, CheckCircleIcon, BellIcon, PlusIcon } from '../icons/Icons';

interface ProfileScreenProps {
  journalEntries: JournalEntry[];
  onAddJournalEntry: (entry: JournalEntry) => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  reminders: Reminder[];
  onToggleReminder: (id: string) => void;
  onAddReminder: (reminder: Reminder) => void;
}

const prompts = [
  "What's one thing that went well today?",
  "I'm feeling...",
  "What challenge did I overcome?",
  "One thing I'm grateful for is..."
];

const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
    journalEntries, onAddJournalEntry, userProfile, onUpdateProfile, reminders, onToggleReminder, onAddReminder 
}) => {
  const [newEntryText, setNewEntryText] = useState('');
  const [activePrompt, setActivePrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(userProfile);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({ time: '', label: '' });

  const handleSaveEntry = () => {
    if (!newEntryText.trim()) return;
    
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      text: activePrompt ? `${activePrompt} ${newEntryText}` : newEntryText,
    };
    
    onAddJournalEntry(entry);
    setNewEntryText('');
    setActivePrompt('');
  };

  const handleUpdateProfile = () => {
      onUpdateProfile(editForm);
      setIsEditing(false);
  };

  const handleAddReminderSubmit = () => {
      if(newReminder.time && newReminder.label) {
          onAddReminder({
              id: Date.now().toString(),
              time: newReminder.time,
              label: newReminder.label,
              enabled: true
          });
          setNewReminder({ time: '', label: '' });
          setShowAddReminder(false);
      }
  };

  return (
    <div className="p-4 space-y-8 pb-20">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-start justify-between">
             <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-300 overflow-hidden">
                    {userProfile.avatar ? <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" /> : <UserCircleIcon className="w-12 h-12" />}
                </div>
                {isEditing ? (
                    <div className="space-y-2">
                        <input 
                            value={editForm.name} 
                            onChange={e => setEditForm({...editForm, name: e.target.value})}
                            className="block w-full px-2 py-1 border rounded text-sm dark:bg-slate-700 dark:border-slate-600"
                            placeholder="Name"
                        />
                        <input 
                            value={editForm.bio} 
                            onChange={e => setEditForm({...editForm, bio: e.target.value})}
                            className="block w-full px-2 py-1 border rounded text-sm dark:bg-slate-700 dark:border-slate-600"
                            placeholder="Bio"
                        />
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{userProfile.name}</h2>
                        <p className="text-slate-500 dark:text-slate-400">{userProfile.bio}</p>
                        <div className="flex space-x-2 mt-2">
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium flex items-center">
                            <FireIcon className="w-3 h-3 mr-1" /> 5 Day Streak
                            </span>
                        </div>
                    </div>
                )}
             </div>
             <button onClick={() => isEditing ? handleUpdateProfile() : setIsEditing(true)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
                {isEditing ? <CheckCircleIcon className="w-6 h-6 text-emerald-500" /> : <PencilIcon className="w-5 h-5" />}
             </button>
        </div>
      </div>

      {/* Reminders Section */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center">
                  <BellIcon className="w-5 h-5 mr-2 text-slate-400" />
                  Nudges & Reminders
              </h3>
              <button onClick={() => setShowAddReminder(!showAddReminder)} className="text-violet-600 text-xs font-bold flex items-center">
                  <PlusIcon className="w-4 h-4 mr-1" /> Add
              </button>
          </div>
          
          {showAddReminder && (
              <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl flex gap-2 items-center animate-fade-in-down">
                  <input 
                    type="time" 
                    className="p-1 rounded border dark:bg-slate-800 dark:border-slate-600 text-sm"
                    value={newReminder.time}
                    onChange={e => setNewReminder({...newReminder, time: e.target.value})}
                  />
                  <input 
                    placeholder="Label (e.g. Breathing)" 
                    className="flex-1 p-1 rounded border dark:bg-slate-800 dark:border-slate-600 text-sm"
                    value={newReminder.label}
                    onChange={e => setNewReminder({...newReminder, label: e.target.value})}
                  />
                  <button onClick={handleAddReminderSubmit} className="text-xs bg-violet-600 text-white px-2 py-1 rounded">Save</button>
              </div>
          )}

          <div className="space-y-2">
              {reminders.map(reminder => (
                  <div key={reminder.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="flex items-center">
                          <span className="font-mono text-sm font-bold text-slate-600 dark:text-slate-300 mr-3">{reminder.time}</span>
                          <span className="text-sm text-slate-700 dark:text-slate-200">{reminder.label}</span>
                      </div>
                      <button 
                        onClick={() => onToggleReminder(reminder.id)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${reminder.enabled ? 'bg-violet-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                      >
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${reminder.enabled ? 'left-6' : 'left-1'}`} />
                      </button>
                  </div>
              ))}
              {reminders.length === 0 && <p className="text-xs text-slate-400 italic">No reminders set.</p>}
          </div>
      </section>

      {/* Journal Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
                <BookOpenIcon className="w-5 h-5 mr-2 text-violet-500" />
                My Journal
            </h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
           {/* Prompts */}
           <div className="flex flex-wrap gap-2 mb-4">
            {prompts.map(prompt => (
                <button 
                key={prompt}
                onClick={() => setActivePrompt(prompt)}
                className={`text-xs px-3 py-1 rounded-full transition-colors border ${activePrompt === prompt ? 'bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-900/30 dark:border-violet-800 dark:text-violet-300' : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'}`}
                >
                {prompt}
                </button>
            ))}
            </div>
           
           {activePrompt && <p className="text-sm text-violet-600 dark:text-violet-400 mb-2 font-medium">{activePrompt}</p>}
           <textarea
             className="w-full bg-transparent resize-none focus:outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 text-sm"
             rows={3}
             placeholder="Write your thoughts freely..."
             value={newEntryText}
             onChange={(e) => setNewEntryText(e.target.value)}
           />
           <div className="flex justify-end mt-2">
             <button 
               onClick={handleSaveEntry}
               disabled={!newEntryText.trim()}
               className="px-4 py-2 bg-violet-600 text-white rounded-full text-xs font-bold uppercase tracking-wide disabled:opacity-50 hover:bg-violet-700 transition-colors shadow-sm"
             >
               Save Entry
             </button>
           </div>
        </div>

        {/* Past Entries List */}
        <div className="space-y-3">
            {journalEntries.length === 0 && (
                <p className="text-center text-slate-400 text-sm py-4">No journal entries yet. Start writing today!</p>
            )}
            {journalEntries.slice().reverse().map(entry => (
                <div key={entry.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border-l-4 border-violet-300 dark:border-violet-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
                            <CalendarIcon className="w-3 h-3 mr-1" />
                            {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                        </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{entry.text}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
