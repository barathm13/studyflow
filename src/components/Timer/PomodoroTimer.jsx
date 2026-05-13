import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Minimize2 } from 'lucide-react';
import CircularTimer from './CircularTimer.jsx';
import TimerControls from './TimerControls.jsx';
import { useSettings } from '../../context/SettingsContext.jsx';
import { useAnalytics } from '../../hooks/useAnalytics.js';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts.js';
import { playCompletionChime } from '../../utils/sound.js';
import { sessionStyles } from '../../utils/themes.js';

const modes = ['work', 'short', 'long'];
const everyFourthWorkGetsLongBreak = 4;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

export default function PomodoroTimer() {
  const { settings } = useSettings();
  const { recordSession } = useAnalytics();
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(settings.workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedWork, setCompletedWork] = useState(0);
  const [focusMode, setFocusMode] = useState(false);

  const durations = useMemo(() => ({ work: settings.workMinutes, short: settings.shortMinutes, long: settings.longMinutes }), [settings]);
  const totalSeconds = durations[mode] * 60;
  const style = sessionStyles[mode];

  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(durations[mode] * 60);
  }, [durations, mode]);

  const switchMode = useCallback((nextMode, shouldRun) => {
    setMode(nextMode);
    setSecondsLeft(durations[nextMode] * 60);
    setIsRunning(shouldRun);
  }, [durations]);

  const completeSession = useCallback(async () => {
    playCompletionChime();
    if (settings.notifications && 'Notification' in window) {
      if (Notification.permission === 'granted') new Notification('StudyFlow', { body: `${style.label} session complete.` });
      else if (Notification.permission !== 'denied') Notification.requestPermission();
    }

    await recordSession({ mode, durationMinutes: durations[mode] });
    if (mode === 'work') {
      const nextCompleted = completedWork + 1;
      setCompletedWork(nextCompleted);
      const nextMode = nextCompleted % everyFourthWorkGetsLongBreak === 0 ? 'long' : 'short';
      switchMode(nextMode, settings.autoStartBreaks);
    } else {
      switchMode('work', settings.autoStartSessions);
    }
  }, [completedWork, durations, mode, recordSession, settings.autoStartBreaks, settings.autoStartSessions, settings.notifications, style.label, switchMode]);

  useEffect(() => {
    if (!isRunning) return undefined;
    const interval = window.setInterval(() => {
      setSecondsLeft((current) => (current <= 1 ? 0 : current - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && secondsLeft === 0) completeSession();
  }, [completeSession, isRunning, secondsLeft]);

  useEffect(() => {
    setSecondsLeft(durations[mode] * 60);
    setIsRunning(false);
  }, [durations, mode]);

  const toggle = useCallback(() => setIsRunning((value) => !value), []);
  useKeyboardShortcuts({ onToggle: toggle, onReset: reset });

  const timerContent = (
    <motion.div layout className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
      <div className="flex flex-wrap justify-center gap-2">
        {modes.map((item) => (
          <button key={item} onClick={() => switchMode(item, false)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${mode === item ? `bg-gradient-to-r ${sessionStyles[item].gradient} text-white shadow-lg` : 'bg-white/8 text-white/55 hover:bg-white/14 hover:text-white'}`}>
            {sessionStyles[item].label}
          </button>
        ))}
      </div>
      <CircularTimer progress={(totalSeconds - secondsLeft) / totalSeconds} time={formatTime(secondsLeft)} color={style.color} />
      <TimerControls isRunning={isRunning} onToggle={toggle} onReset={reset} onFocus={() => setFocusMode(true)} />
      <p className="text-sm text-white/45">Shortcuts: Space to start/pause · R to reset</p>
    </motion.div>
  );

  return (
    <>
      <section className={`glass-panel rounded-[2rem] p-6 sm:p-10 ${style.shadow}`}>{timerContent}</section>
      {focusMode && (
        <motion.div className="focus-fullscreen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="absolute right-6 top-6 rounded-2xl border border-white/10 bg-white/10 p-3 text-white/70 hover:text-white" onClick={() => setFocusMode(false)} aria-label="Exit focus mode"><Minimize2 /></button>
          {timerContent}
        </motion.div>
      )}
    </>
  );
}
