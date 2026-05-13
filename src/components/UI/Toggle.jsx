export default function Toggle({ checked, onChange, label, description }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/6 p-4">
      <span>
        <span className="block font-semibold text-white">{label}</span>
        {description && <span className="text-sm text-white/55">{description}</span>}
      </span>
      <input className="sr-only" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className={`relative h-7 w-12 rounded-full transition ${checked ? 'bg-purple-400' : 'bg-white/20'}`}>
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? 'left-6' : 'left-1'}`} />
      </span>
    </label>
  );
}
