
import React, { useState } from 'react';
import { COMFORT_ACTIVITIES } from '../../constants';
import { FunnelIcon, ClockIcon } from '../icons/Icons';

const ActivitiesScreen: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'anxious', 'stressed', 'calm', 'overwhelmed'];

  const filteredActivities = filter === 'all' 
    ? COMFORT_ACTIVITIES 
    : COMFORT_ACTIVITIES.filter(act => act.category === filter);

  return (
    <div className="p-4 space-y-6 pb-20">
      <header>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Comfort Capsules</h1>
        <p className="text-slate-500 dark:text-slate-400">Tools to help you find your balance.</p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        <div className="flex items-center mr-2 text-slate-400">
            <FunnelIcon className="w-4 h-4 mr-1" />
            <span className="text-xs uppercase font-bold">Filter:</span>
        </div>
        {categories.map(cat => (
            <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                    filter === cat
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-violet-50 dark:hover:bg-slate-700'
                }`}
            >
                {cat}
            </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActivities.map(activity => (
            <div key={activity.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow group cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        activity.category === 'anxious' ? 'bg-orange-100 text-orange-700' :
                        activity.category === 'stressed' ? 'bg-rose-100 text-rose-700' :
                        activity.category === 'calm' ? 'bg-teal-100 text-teal-700' :
                        'bg-purple-100 text-purple-700'
                    }`}>
                        {activity.category}
                    </span>
                    <div className="flex items-center text-slate-400 text-xs">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {activity.duration}
                    </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-violet-600 transition-colors">{activity.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{activity.description}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                    <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline">Start Session</button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesScreen;
