import Toggle from '../components/UI/Toggle.jsx';
import { useSettings } from '../context/SettingsContext.jsx';
import { ambienceThemes } from '../utils/themes.js';

function NumberField({ label, value, onChange }) {
  return (
    <label className="block rounded-2xl border border-white/10 bg-white/6 p-4">
      <span className="text-sm font-semibold text-white/60">{label}</span>
      <input className="mt-2 w-full bg-transparent text-3xl font-black outline-none" type="number" min="1" max="120" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

export default function SettingsPage() {
  const { settings, setSettings, defaultSettings } = useSettings();
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div><p className="text-sm font-bold uppercase tracking-[0.35em] text-white/45">Preferences</p><h1 className="mt-2 text-4xl font-black tracking-tight sm:text-6xl">Tune your flow.</h1></div>
      <section className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-2xl font-bold">Timer durations</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <NumberField label="Focus minutes" value={settings.workMinutes} onChange={(workMinutes) => setSettings({ workMinutes })} />
          <NumberField label="Short break" value={settings.shortMinutes} onChange={(shortMinutes) => setSettings({ shortMinutes })} />
          <NumberField label="Long break" value={settings.longMinutes} onChange={(longMinutes) => setSettings({ longMinutes })} />
        </div>
      </section>
      <section className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-2xl font-bold">Automation</h2>
        <div className="mt-5 grid gap-4">
          <Toggle label="Auto-start breaks" description="Begin a break as soon as focus ends." checked={settings.autoStartBreaks} onChange={(autoStartBreaks) => setSettings({ autoStartBreaks })} />
          <Toggle label="Auto-start focus sessions" description="Return to work automatically after breaks." checked={settings.autoStartSessions} onChange={(autoStartSessions) => setSettings({ autoStartSessions })} />
          <Toggle label="Browser notifications" description="Ask for permission and notify when sessions finish." checked={settings.notifications} onChange={(notifications) => setSettings({ notifications })} />
        </div>
      </section>
      <section className="glass-panel rounded-[2rem] p-6">
        <h2 className="text-2xl font-bold">Theme</h2>
        <select className="mt-5 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 outline-none" value={settings.theme} onChange={(event) => setSettings({ theme: event.target.value })}>
          {Object.entries(ambienceThemes).map(([key, theme]) => <option key={key} value={key}>{theme.name}</option>)}
        </select>
      </section>
      <button className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold hover:bg-white/15" onClick={() => setSettings(defaultSettings)}>Reset defaults</button>
    </div>
  );
}
