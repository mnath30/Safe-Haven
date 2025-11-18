
import React from 'react';
import { Page } from '../types';
import { HomeIcon, ChatBubbleOvalLeftEllipsisIcon, SparklesIcon, ChartBarIcon, ListBulletIcon, UserCircleIcon, LotusLogo } from './icons/Icons';

interface DesktopNavProps {
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
  const activeClasses = 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300';
  const inactiveClasses = 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800';

  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 mb-2 rounded-xl transition-all duration-200 font-medium ${isActive ? activeClasses : inactiveClasses}`}
    >
      <Icon className={`w-6 h-6 mr-3 ${isActive ? 'text-violet-600 dark:text-violet-300' : 'text-slate-400'}`} />
      <span className="text-sm">{label}</span>
    </button>
  );
};

const DesktopNav: React.FC<DesktopNavProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { page: 'home', label: 'Home', Icon: HomeIcon },
    { page: 'chat', label: 'Aasha Companion', Icon: ChatBubbleOvalLeftEllipsisIcon },
    { page: 'activities', label: 'Activities', Icon: ListBulletIcon },
    { page: 'growth', label: 'Growth', Icon: SparklesIcon },
    { page: 'progress', label: 'Progress', Icon: ChartBarIcon },
    { page: 'profile', label: 'Profile', Icon: UserCircleIcon },
  ] as const;

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 sticky top-0 p-4 z-50">
      <div className="flex items-center px-4 py-3 mb-8">
        <LotusLogo className="w-8 h-8 text-violet-600 mr-2" />
        <span className="text-xl font-bold text-slate-800 dark:text-slate-100">SafeHaven</span>
      </div>

      <nav className="flex-1 space-y-1">
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
      </nav>

      <div className="p-4 bg-violet-50 dark:bg-slate-800 rounded-2xl mt-auto">
        <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Need Help?</h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Our support team is here for you.</p>
        <button className="w-full text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600">
            Contact Support
        </button>
      </div>
    </aside>
  );
};

export default DesktopNav;
