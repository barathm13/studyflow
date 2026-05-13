export default function StatsCard({ label, value, helper }) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <p className="text-sm font-semibold text-white/50">{label}</p>
      <p className="mt-3 text-3xl font-black tracking-tight">{value}</p>
      {helper && <p className="mt-2 text-xs text-white/45">{helper}</p>}
    </div>
  );
}
