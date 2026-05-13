export const ambienceThemes = {
  lofi: {
    name: 'Lofi',
    tagline: 'Warm violet dusk with slow drifting orbs.',
    gradient: 'from-[#12091f] via-[#2b1245] to-[#110b1d]',
    glow: 'rgba(168, 85, 247, 0.38)',
    accent: '#c084fc',
    particles: ['bg-fuchsia-400/25', 'bg-purple-300/20', 'bg-amber-300/15'],
  },
  rain: {
    name: 'Rain',
    tagline: 'Blue glass atmosphere for calm deep work.',
    gradient: 'from-[#07111f] via-[#0d2a4a] to-[#06121f]',
    glow: 'rgba(56, 189, 248, 0.34)',
    accent: '#38bdf8',
    particles: ['bg-sky-300/25', 'bg-cyan-200/15', 'bg-blue-500/20'],
  },
  cafe: {
    name: 'Café',
    tagline: 'Cozy espresso glow for steady study sessions.',
    gradient: 'from-[#160d09] via-[#3a2114] to-[#100806]',
    glow: 'rgba(251, 146, 60, 0.32)',
    accent: '#fb923c',
    particles: ['bg-orange-300/20', 'bg-yellow-200/15', 'bg-rose-300/15'],
  },
  minimal: {
    name: 'Minimal',
    tagline: 'Quiet monochrome space with subtle movement.',
    gradient: 'from-[#09090f] via-[#171720] to-[#080810]',
    glow: 'rgba(226, 232, 240, 0.18)',
    accent: '#e2e8f0',
    particles: ['bg-white/10', 'bg-slate-300/10', 'bg-zinc-400/10'],
  },
};

export const sessionStyles = {
  work: { label: 'Focus', gradient: 'from-purple-500 to-fuchsia-500', shadow: 'shadow-glow', color: '#a855f7' },
  short: { label: 'Short Break', gradient: 'from-sky-400 to-cyan-400', shadow: 'shadow-glow-blue', color: '#38bdf8' },
  long: { label: 'Long Break', gradient: 'from-emerald-400 to-teal-400', shadow: 'shadow-glow-green', color: '#34d399' },
};
