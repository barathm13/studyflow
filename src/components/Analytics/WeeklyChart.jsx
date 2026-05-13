export default function WeeklyChart({ week }) {
  const max = Math.max(...week.map((day) => day.minutes), 60);
  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <div className="mb-8 flex items-center justify-between">
        <div><h2 className="text-2xl font-bold">Weekly productivity</h2><p className="text-sm text-white/50">Focused minutes completed this week.</p></div>
      </div>
      <div className="flex h-64 items-end gap-3 sm:gap-5">
        {week.map((day) => (
          <div key={day.key} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex h-48 w-full items-end rounded-full bg-white/8 p-1">
              <div className="w-full rounded-full bg-gradient-to-t from-purple-500 to-fuchsia-300 shadow-glow transition-all" style={{ height: `${Math.max((day.minutes / max) * 100, day.minutes ? 8 : 0)}%` }} />
            </div>
            <span className="text-xs font-semibold text-white/50">{day.label}</span>
            <span className="text-xs text-white/35">{day.minutes}m</span>
          </div>
        ))}
      </div>
    </div>
  );
}
