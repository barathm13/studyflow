import { motion } from 'framer-motion';
import { Coffee, CloudRain, Headphones, Moon } from 'lucide-react';
import PomodoroTimer from '../components/Timer/PomodoroTimer.jsx';
import { useSettings } from '../context/SettingsContext.jsx';
import { ambienceThemes } from '../utils/themes.js';

const icons = { lofi: Headphones, rain: CloudRain, cafe: Coffee, minimal: Moon };

export default function HomePage() {
  const { settings, setSettings } = useSettings();
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-white/45">Today&apos;s workspace</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-6xl">Settle in. Start flowing.</h1>
        </motion.div>
        <PomodoroTimer />
      </div>
      <aside className="space-y-4">
        <div className="glass-panel rounded-[2rem] p-5">
          <h2 className="text-xl font-bold">Ambience</h2>
          <p className="mt-1 text-sm text-white/50">Visual themes only — no local audio assets.</p>
          <div className="mt-5 space-y-3">
            {Object.entries(ambienceThemes).map(([key, theme]) => {
              const Icon = icons[key];
              return (
                <button key={key} onClick={() => setSettings({ theme: key })} className={`w-full rounded-2xl border p-4 text-left transition ${settings.theme === key ? 'border-white/40 bg-white/16' : 'border-white/10 bg-white/6 hover:bg-white/10'}`}>
                  <span className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/12"><Icon size={19} /></span><span><span className="block font-bold">{theme.name}</span><span className="text-xs text-white/50">{theme.tagline}</span></span></span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="glass-panel rounded-[2rem] p-5">
          <h2 className="text-xl font-bold">Flow cues</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>• Browser notification when a timer completes.</li>
            <li>• Lightweight generated chime through Web Audio.</li>
            <li>• Auto-switches between focus and break rhythms.</li>
            <li>• Fullscreen focus mode keeps controls minimal.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
