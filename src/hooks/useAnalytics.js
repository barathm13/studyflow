import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../supabase/client.js';

const storageKey = 'studyflow_local_sessions';
const dayKey = (date) => new Date(date).toISOString().slice(0, 10);

function getLocalSessions() {
  return JSON.parse(localStorage.getItem(storageKey) || '[]');
}

function calculateStreak(sessions) {
  const days = new Set(sessions.filter((s) => s.mode === 'work').map((s) => dayKey(s.completed_at)));
  let streak = 0;
  const cursor = new Date();
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function useAnalytics() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSessions = useCallback(async () => {
    setLoading(true);
    if (user && supabase) {
      const since = new Date();
      since.setDate(since.getDate() - 30);
      const { data } = await supabase
        .from('focus_sessions')
        .select('*')
        .gte('completed_at', since.toISOString())
        .order('completed_at', { ascending: false });
      setSessions(data || []);
    } else {
      setSessions(getLocalSessions());
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { loadSessions(); }, [loadSessions]);

  const recordSession = useCallback(async ({ mode, durationMinutes }) => {
    const entry = { mode, duration_minutes: durationMinutes, completed_at: new Date().toISOString() };
    if (user && supabase) {
      await supabase.from('focus_sessions').insert({ ...entry, user_id: user.id });
    } else {
      const next = [entry, ...getLocalSessions()].slice(0, 200);
      localStorage.setItem(storageKey, JSON.stringify(next));
    }
    await loadSessions();
  }, [loadSessions, user]);

  const summary = useMemo(() => {
    const today = dayKey(new Date());
    const week = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      return { key: dayKey(date), label: date.toLocaleDateString(undefined, { weekday: 'short' }), minutes: 0 };
    });

    sessions.forEach((session) => {
      if (session.mode !== 'work') return;
      const bucket = week.find((day) => day.key === dayKey(session.completed_at));
      if (bucket) bucket.minutes += session.duration_minutes;
    });

    const todaysWork = sessions.filter((s) => s.mode === 'work' && dayKey(s.completed_at) === today);
    return {
      dailyFocusTime: todaysWork.reduce((total, s) => total + s.duration_minutes, 0),
      completedSessions: todaysWork.length,
      currentStreak: calculateStreak(sessions),
      week,
      totalSessions: sessions.filter((s) => s.mode === 'work').length,
    };
  }, [sessions]);

  return { sessions, summary, loading, recordSession, refresh: loadSessions };
}
