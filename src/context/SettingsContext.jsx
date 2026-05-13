import { createContext, useContext, useMemo, useState } from 'react';

const defaultSettings = {
  workMinutes: 25,
  shortMinutes: 5,
  longMinutes: 15,
  autoStartBreaks: true,
  autoStartSessions: false,
  notifications: true,
  theme: 'lofi',
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettingsState] = useState(() => {
    const stored = localStorage.getItem('studyflow_settings');
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  });

  const setSettings = (next) => {
    setSettingsState((current) => {
      const merged = typeof next === 'function' ? next(current) : { ...current, ...next };
      localStorage.setItem('studyflow_settings', JSON.stringify(merged));
      return merged;
    });
  };

  const value = useMemo(() => ({ settings, setSettings, defaultSettings }), [settings]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}
