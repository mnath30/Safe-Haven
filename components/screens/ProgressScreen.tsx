
import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Mood, MoodEntry, JournalEntry } from '../../types';
import { ClockIcon, BellIcon, CalendarIcon } from '../icons/Icons';


const moodToValue: Record<Mood, number> = {
    'stressed': 1,
    'sad': 2,
    'neutral': 3,
    'content': 4,
    'happy': 5,
};

const valueToEmoji: Record<number, string> = {
    1: '😟',
    2: '😔',
    3: '😐',
    4: '😌',
    5: '😊',
};


const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-700 p-3 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg">
                <p className="label font-semibold text-slate-700 dark:text-slate-200">{`Date : ${label}`}</p>
                <p className="intro text-violet-500 dark:text-violet-400">{`Mood : ${valueToEmoji[payload[0].value] || ''} (${payload[0].value}/5)`}</p>
            </div>
        );
    }
    return null;
};

const InsightCard: React.FC<{ title: string, text: string, type: 'pattern' | 'strength' | 'suggestion' }> = ({ title, text, type }) => {
    const colors = {
        pattern: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
        strength: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
        suggestion: 'bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800',
    };

    return (
        <div className={`p-4 rounded-xl border ${colors[type]} transition-all duration-300 hover:shadow-md h-full`}>
            <h4 className="font-bold text-sm mb-1 uppercase opacity-80">{title}</h4>
            <p className="text-sm font-medium">{text}</p>
        </div>
    );
};

const StatBox: React.FC<{ icon: React.ElementType, value: string, label: string }> = ({ icon: Icon, value, label }) => (
    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-center h-full flex flex-col justify-center items-center">
        <Icon className="w-6 h-6 mx-auto mb-2 text-slate-400" />
        <div className="font-bold text-lg text-slate-700 dark:text-slate-200">{value}</div>
        <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
    </div>
);

const WeeklyMoodStrip: React.FC = () => {
    const days = [
        { day: 'Mon', emoji: '😊' },
        { day: 'Tue', emoji: '😌' },
        { day: 'Wed', emoji: '😐' },
        { day: 'Thu', emoji: '😌' },
        { day: 'Fri', emoji: '😊' },
        { day: 'Sat', emoji: '😊' },
        { day: 'Sun', emoji: '😌' },
    ];
    return (
        <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-x-auto">
            {days.map((d, i) => (
                <div key={i} className="flex flex-col items-center min-w-[40px]">
                    <span className="text-2xl mb-1">{d.emoji}</span>
                    <span className="text-xs font-medium text-slate-400">{d.day}</span>
                </div>
            ))}
        </div>
    );
};

type TimeRange = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

const ProgressScreen: React.FC<{ moodHistory: MoodEntry[], journalEntries: JournalEntry[] }> = ({ moodHistory, journalEntries }) => {
    const [timeRange, setTimeRange] = useState<TimeRange>('weekly');

    // Mock data generation based on range for visualization purposes
    const getDataForRange = (range: TimeRange) => {
        const baseData = moodHistory.map(entry => ({
            ...entry,
            value: moodToValue[entry.mood],
            date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        }));

        if (range === 'weekly') return baseData;
        
        if (range === 'yearly') {
            return Array.from({ length: 12 }).map((_, i) => ({
                 date: `M${i+1}`,
                 value: Math.floor(Math.random() * 3) + 3, // Random mood between 3 and 5
                 mood: 'happy'
            }));
        }

        // Simulate more data points for longer ranges
        const dummyPoints = range === 'monthly' ? 30 : 90;
        return Array.from({ length: dummyPoints }).map((_, i) => ({
             date: `Day ${i+1}`,
             value: Math.floor(Math.random() * 3) + 3, // Random mood between 3 and 5
             mood: 'happy'
        }));
    };

    const chartData = getDataForRange(timeRange);

    // Dynamic Calculations for Stats and Insights
    const { insights, stats } = useMemo(() => {
        const moodCount = moodHistory.length;
        const journalCount = journalEntries.length;
        const lastMoods = moodHistory.slice(-5);
        const recentAvg = lastMoods.reduce((acc, curr) => acc + moodToValue[curr.mood], 0) / (lastMoods.length || 1);
        
        // Dynamic Stats based on usage
        // Roughly estimating interaction time based on entries
        const estimatedScreenTimeMinutes = (journalCount * 15) + (moodCount * 2); 
        const hours = Math.floor(estimatedScreenTimeMinutes / 60);
        const minutes = estimatedScreenTimeMinutes % 60;
        const screenTimeStr = `${hours}h ${minutes}m`;
        
        // Estimate notifications based on interaction frequency (pseudo-logic)
        const notifsCount = Math.max(2, Math.floor(journalCount * 1.2) + 3);
        
        // Content analysis for insights
        const journalText = journalEntries.map(j => j.text.toLowerCase()).join(' ');
        const meetingCount = (journalText.match(/meeting|call|zoom|team|boss|standup|work/g) || []).length;

        const stressKeywords = ['stress', 'tired', 'deadline', 'anxious', 'bad', 'overwhelmed', 'tough', 'hard', 'pressure'];
        const positiveKeywords = ['happy', 'good', 'great', 'excited', 'proud', 'calm', 'peace', 'joy', 'win'];
        const sleepKeywords = ['sleep', 'tired', 'insomnia', 'awake', 'night', 'nap', 'rest'];
        const workKeywords = ['job', 'work', 'office', 'boss', 'project', 'career'];
        
        const stressMentions = stressKeywords.reduce((acc, word) => acc + (journalText.match(new RegExp(word, 'g')) || []).length, 0);
        const positiveMentions = positiveKeywords.reduce((acc, word) => acc + (journalText.match(new RegExp(word, 'g')) || []).length, 0);
        const sleepMentions = sleepKeywords.reduce((acc, word) => acc + (journalText.match(new RegExp(word, 'g')) || []).length, 0);
        const workMentions = workKeywords.reduce((acc, word) => acc + (journalText.match(new RegExp(word, 'g')) || []).length, 0);

        const newInsights = [];
        
        // Pattern Insight based on content
        if (sleepMentions > 1) {
             newInsights.push({ type: 'pattern' as const, title: 'Sleep Patterns', text: "You've mentioned sleep issues recently. Consider a wind-down routine." });
        } else if (workMentions > 3 && stressMentions > 2) {
             newInsights.push({ type: 'pattern' as const, title: 'Work Stress', text: "Work seems to be a major stressor this week. Remember to take breaks." });
        } else if (positiveMentions > stressMentions) {
            newInsights.push({ type: 'pattern' as const, title: 'Positivity Peak', text: "Your journal reflects high energy and gratitude lately!" });
        } else if (journalCount === 0) {
            newInsights.push({ type: 'pattern' as const, title: 'Getting Started', text: "Start journaling to see patterns emerge." });
        } else {
             newInsights.push({ type: 'pattern' as const, title: 'Steady Flow', text: "You're maintaining a balanced emotional state this week." });
        }

        // Strength Insight
        if (journalCount > 5) {
            newInsights.push({ type: 'strength' as const, title: 'Deep Reflector', text: `You've journaled ${journalCount} times. Self-reflection is becoming a habit.` });
        } else if (recentAvg > 4) {
             newInsights.push({ type: 'strength' as const, title: 'Resilience', text: "You've maintained a positive outlook despite daily challenges." });
        } else {
             newInsights.push({ type: 'strength' as const, title: 'Consistency', text: "Tracking your mood daily builds emotional awareness." });
        }

        // Suggestion Insight
        if (recentAvg < 3 || stressMentions > 2) {
            newInsights.push({ type: 'suggestion' as const, title: 'Try This', text: "The '4-7-8 Breathing' exercise is great for reducing acute stress." });
        } else if (positiveMentions > 2) {
            newInsights.push({ type: 'suggestion' as const, title: 'Share the Joy', text: "Consider writing a gratitude entry to lock in these good feelings." });
        } else {
            newInsights.push({ type: 'suggestion' as const, title: 'Daily Prompt', text: "What is one thing you are looking forward to tomorrow?" });
        }

        return {
            insights: newInsights,
            stats: {
                screenTime: screenTimeStr,
                notifs: notifsCount,
                meetings: meetingCount
            }
        };

    }, [moodHistory, journalEntries]);
    
    return (
        <div className="p-4 space-y-6 pb-20">
            <header className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Your Progress</h1>
                    <p className="text-slate-500 dark:text-slate-400">Visualizing your wellness journey.</p>
                </div>
                <div className="mt-4 md:mt-0 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl inline-flex">
                    {(['weekly', 'monthly', 'quarterly', 'yearly'] as TimeRange[]).map(range => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                                timeRange === range 
                                ? 'bg-white dark:bg-slate-700 text-violet-600 shadow-sm' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                            }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </header>

            {/* Weekly Strip - Only show for weekly view */}
            {timeRange === 'weekly' && (
                <section>
                    <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">This Week's Mood Journey</h3>
                    <WeeklyMoodStrip />
                </section>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart Section */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm h-96 flex flex-col border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-slate-800 dark:text-slate-100 capitalize">{timeRange} Dashboard</h2>
                        <span className="text-emerald-500 text-sm font-bold bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">
                            Trend: Stable
                        </span>
                    </div>
                    <div className="flex-grow -ml-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chartData}
                                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis 
                                    dataKey="date" 
                                    tick={{ fill: '#94a3b8', fontSize: 10 }} 
                                    axisLine={false} 
                                    tickLine={false} 
                                    dy={10} 
                                    interval={timeRange === 'yearly' ? 0 : 'preserveStartEnd'}
                                />
                                <YAxis 
                                    domain={[0, 6]} 
                                    ticks={[1, 2, 3, 4, 5]}
                                    tickFormatter={(value) => valueToEmoji[value] || ''}
                                    tick={{ fontSize: 18 }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={40}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '5 5' }} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Insights & Stats */}
                <div className="space-y-6">
                     <section className="space-y-3">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Insights from Your Journal</h3>
                        <div className="grid gap-3">
                            {insights.map((insight, idx) => (
                                <InsightCard key={idx} type={insight.type} title={insight.title} text={insight.text} />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Digital Wellbeing (Est.)</h3>
                        <div className="grid grid-cols-3 gap-3 h-32">
                            <StatBox icon={ClockIcon} value={stats.screenTime} label="Time in App" />
                            <StatBox icon={BellIcon} value={stats.notifs.toString()} label="Actions" />
                            <StatBox icon={CalendarIcon} value={stats.meetings.toString()} label="Work Mentions" />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProgressScreen;
