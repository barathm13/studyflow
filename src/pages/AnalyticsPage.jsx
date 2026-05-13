import { Loader2 } from 'lucide-react';
import StatsCard from '../components/Analytics/StatsCard.jsx';
import WeeklyChart from '../components/Analytics/WeeklyChart.jsx';
import { useAnalytics } from '../hooks/useAnalytics.js';

export default function AnalyticsPage() {
  const { summary, loading } = useAnalytics();
  if (loading) return <div className="grid min-h-[50vh] place-items-center"><Loader2 className="animate-spin text-white/60" size={42} /></div>;
  return (
    <div className="space-y-6">
      <div><p className="text-sm font-bold uppercase tracking-[0.35em] text-white/45">Focus insights</p><h1 className="mt-2 text-4xl font-black tracking-tight sm:text-6xl">Your progress, simplified.</h1></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Daily focus time" value={`${summary.dailyFocusTime}m`} helper="Completed focus minutes today" />
        <StatsCard label="Completed sessions" value={summary.completedSessions} helper="Work sessions finished today" />
        <StatsCard label="Current streak" value={`${summary.currentStreak}d`} helper="Consecutive focus days" />
        <StatsCard label="All focus sessions" value={summary.totalSessions} helper="Last 30 days" />
      </div>
      <WeeklyChart week={summary.week} />
    </div>
  );
}
