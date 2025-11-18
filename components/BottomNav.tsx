
import React from 'react';
import { Page } from '../types';
import { HomeIcon, ChatBubbleOvalLeftEllipsisIcon, SparklesIcon, ChartBarIcon, ListBulletIcon } from './icons/Icons';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavItem: React.FC<{
  page: Page;
  label: string;
  Icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}> = ({ page, label, Icon, isActive, onClick }) => {
  const activeClasses = 'text-violet-600 dark:text-violet-400 transform scale-110';
  const inactiveClasses = 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full py-3 transition-all duration-200 ${isActive ? activeClasses : inactiveClasses}`}
      aria-label={`Go to ${label}`}
    >
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
    </button>
  );
};


const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { page: 'home', label: 'Home', Icon: HomeIcon },
    { page: 'chat', label: 'Aasha', Icon: ChatBubbleOvalLeftEllipsisIcon },
    { page: 'activities', label: 'Activities', Icon: ListBulletIcon },
    { page: 'growth', label: 'Growth', Icon: SparklesIcon },
    { page: 'progress', label: 'Progress', Icon: ChartBarIcon },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700 shadow-lg lg:hidden">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map(item => (
          <NavItem
            key={item.page}
            page={item.page}
            label={item.label}
            Icon={item.Icon}
            isActive={activePage === item.page}
            onClick={() => setActivePage(item.page)}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
