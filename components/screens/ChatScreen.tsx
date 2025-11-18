
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getAashaResponse } from '../../services/geminiService';
import { ChatMessage, MoodEntry, JournalEntry, UserProfile } from '../../types';
import { PaperAirplaneIcon, UserCircleIcon, LotusLogo } from '../icons/Icons';

interface ChatScreenProps {
    moodHistory?: MoodEntry[];
    journalEntries?: JournalEntry[];
    userProfile?: UserProfile;
}

const BASE_SUGGESTIONS = [
  "I'm feeling anxious 😰",
  "Trouble sleeping 😴",
  "Work stress is high 📉",
  "I need motivation 💪",
  "Just want to chat ☕",
  "Help me relax 🌿"
];

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isModel = message.role === 'model';
  return (
    <div className={`flex items-start gap-3 ${isModel ? '' : 'justify-end'}`}>
      {isModel && (
          <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <LotusLogo className="w-5 h-5 text-violet-600 dark:text-violet-300" />
          </div>
      )}
      <div
        className={`max-w-[85%] md:max-w-md p-4 rounded-2xl shadow-sm ${
          isModel
            ? 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-none text-slate-800 dark:text-slate-200'
            : 'bg-violet-600 text-white rounded-br-none'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
      </div>
       {!isModel && <UserCircleIcon className="w-8 h-8 text-slate-400 flex-shrink-0 mt-1" />}
    </div>
  );
};


const ChatScreen: React.FC<ChatScreenProps> = ({ moodHistory = [], journalEntries = [], userProfile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: `Hello ${userProfile?.name || 'friend'}! I'm Aasha, your wellness buddy. I'm here to listen without judgment. How are you feeling right now?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create user context string to act as "Sensory Data" for Aasha
  const userContext = useMemo(() => {
      const recentMoods = moodHistory.slice(-5).map(m => m.mood).join(', ');
      const recentJournal = journalEntries.slice(-3).map(j => j.text).join('; ');
      return `User Name: ${userProfile?.name || 'Unknown'}. 
      Recent Mood History (last 5 days): ${recentMoods}. 
      Recent Journal Entries: ${recentJournal}.`;
  }, [moodHistory, journalEntries, userProfile]);

  // Dynamic Suggestions based on context
  const suggestions = useMemo(() => {
      const lastMood = moodHistory[moodHistory.length - 1]?.mood;
      const dynamic = [...BASE_SUGGESTIONS];
      
      if (lastMood === 'stressed') {
          dynamic.unshift("Can we talk about my stress? 🧘");
      } else if (lastMood === 'sad') {
          dynamic.unshift("I'm feeling down today 😔");
      } else if (lastMood === 'happy') {
          dynamic.unshift("Something good happened! 🎉");
      }
      
      // Add a journal reflection prompt if there are entries
      if (journalEntries.length > 0) {
          dynamic.push("Analyze my recent journal entries 📔");
      }

      return dynamic.slice(0, 8); // Limit to 8
  }, [moodHistory, journalEntries]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (textToSend.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend.trim(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Pass userContext to the service so Aasha acts as a buddy sensing emotional shifts
    const responseText = await getAashaResponse(userMessage.text, messages, userContext);

    const modelMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full p-4 max-w-5xl mx-auto w-full pb-24 lg:pb-4">
      <header className="text-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex justify-center mb-2">
            <LotusLogo className="w-12 h-12 text-violet-600" />
        </div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Chat with Aasha</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Your empathetic buddy for emotional support</p>
      </header>
      
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 pb-4 scrollbar-thin">
        {messages.map(msg => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
           <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <LotusLogo className="w-5 h-5 text-violet-600 dark:text-violet-300" />
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-none shadow-sm">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-0"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
                  </div>
              </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto pt-2">
        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 mb-3 justify-center">
          {suggestions.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              disabled={isLoading}
              className="px-3 py-1.5 bg-violet-50 dark:bg-slate-800 text-violet-700 dark:text-violet-300 text-xs font-medium rounded-full border border-violet-100 dark:border-slate-700 hover:bg-violet-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Message Aasha..."
            className="flex-1 w-full px-4 py-2 bg-transparent focus:outline-none text-slate-800 dark:text-slate-200"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || input.trim() === ''}
            className="p-2 bg-violet-600 text-white rounded-full disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors"
            aria-label="Send message"
          >
            <PaperAirplaneIcon className="w-5 h-5 transform rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
