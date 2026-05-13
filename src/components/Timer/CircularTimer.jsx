import { motion } from 'framer-motion';

export default function CircularTimer({ progress, time, color }) {
  const radius = 128;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative grid place-items-center">
      <svg className="h-80 w-80 -rotate-90 sm:h-96 sm:w-96" viewBox="0 0 300 300" aria-label="Timer progress">
        <circle cx="150" cy="150" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="14" />
        <motion.circle
          cx="150" cy="150" r={radius} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: circumference * (1 - progress) }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 18px ${color})` }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-6xl font-black tracking-tighter sm:text-7xl">{time}</p>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/45">Flow time</p>
      </div>
    </div>
  );
}
