import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../supabase/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [guest, setGuest] = useState(() => localStorage.getItem('studyflow_guest') === 'true');
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return undefined;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession) setGuest(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const value = useMemo(() => ({
    session,
    user: session?.user ?? null,
    guest,
    loading,
    isConfigured: isSupabaseConfigured,
    continueAsGuest: () => {
      localStorage.setItem('studyflow_guest', 'true');
      setGuest(true);
    },
    signOut: async () => {
      localStorage.removeItem('studyflow_guest');
      setGuest(false);
      if (supabase) await supabase.auth.signOut();
    },
  }), [session, guest, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
