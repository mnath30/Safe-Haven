
import React, { useState, useRef, useEffect } from 'react';
import { getAashaResponse } from '../../services/geminiService';
import { ChatMessage } from '../../types';
import { PaperAirplaneIcon, UserCircleIcon, LotusLogo } from '../icons/Icons';

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


const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Hello! I'm Aasha, your personal wellness companion. How are you feeling today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await getAashaResponse(userMessage.text, messages);

    const modelMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full p-4 max-w-5xl mx-auto w-full">
      <header className="text-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex justify-center mb-2">
            <LotusLogo className="w-8 h-8 text-violet-600" />
        </div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Aasha</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Your Safe Emotional Space</p>
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
      <div className="mt-4 flex items-center gap-2 pt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your thoughts here..."
          className="flex-1 w-full px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm transition-shadow"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || input.trim() === ''}
          className="p-3 bg-violet-600 text-white rounded-full disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors shadow-md"
          aria-label="Send message"
        >
          <PaperAirplaneIcon className="w-5 h-5 transform rotate-90" />
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
