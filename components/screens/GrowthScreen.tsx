
import React from 'react';
import { GROWTH_PATHWAYS } from '../../constants';
import type { GrowthPathway } from '../../types';
import { AcademicCapIcon, FireIcon, ShieldCheckIcon, SparklesIcon } from '../icons/Icons';

const PathwayCard: React.FC<{ pathway: GrowthPathway }> = ({ pathway }) => (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-start space-x-4 border border-slate-100 dark:border-slate-700">
        <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-full">
            <pathway.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{pathway.category}</span>
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-100 mt-1">{pathway.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-3">{pathway.description}</p>
            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <p className="text-xs text-slate-400 mt-1 text-right">Start Lesson</p>
        </div>
    </div>
);

const Badge: React.FC<{ icon: React.ElementType, label: string, color: string, active?: boolean }> = ({ icon: Icon, label, color, active = false }) => (
    <div className={`flex flex-col items-center space-y-2 ${active ? 'opacity-100' : 'opacity-50 grayscale'}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${color} border-4 border-white dark:border-slate-800 shadow-sm`}>
            <Icon className="w-8 h-8 text-white" />
        </div>
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</span>
    </div>
);

const GrowthScreen: React.FC = () => {
    return (
        <div className="p-4 space-y-8 pb-20">
            <header>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Growth & Resilience</h1>
                <p className="text-slate-500 dark:text-slate-400">Track your journey and build new habits.</p>
            </header>

            <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold mb-6 text-slate-700 dark:text-slate-200 flex items-center">
                    <SparklesIcon className="w-5 h-5 mr-2 text-amber-500" />
                    My Achievements
                </h2>
                <div className="flex justify-between px-2">
                    <Badge icon={ShieldCheckIcon} label="Resilient" color="bg-blue-500" active={true} />
                    <Badge icon={FireIcon} label="7-Day Streak" color="bg-orange-500" active={true} />
                    <Badge icon={AcademicCapIcon} label="Scholar" color="bg-violet-500" active={false} />
                    <Badge icon={SparklesIcon} label="Zen Master" color="bg-emerald-500" active={false} />
                </div>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                     <h2 className="font-semibold text-slate-700 dark:text-slate-200">In Progress</h2>
                     <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between mb-2">
                             <h3 className="font-bold text-slate-800 dark:text-slate-100">Emotional First Aid</h3>
                             <span className="text-xs font-bold text-violet-600 bg-violet-100 px-2 py-1 rounded-md">75%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 mb-2">
                             <div className="bg-violet-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-xs text-slate-500">Module 3: Handling Criticism</p>
                     </div>
                </div>

                <div className="space-y-4">
                     <h2 className="font-semibold text-slate-700 dark:text-slate-200">Explore Pathways</h2>
                    {GROWTH_PATHWAYS.map(pathway => (
                        <PathwayCard key={pathway.id} pathway={pathway} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GrowthScreen;
