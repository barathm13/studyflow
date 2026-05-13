import { motion } from 'framer-motion';
import { ambienceThemes } from '../../utils/themes.js';

export default function AmbientBackground({ theme }) {
  const ambience = ambienceThemes[theme] ?? ambienceThemes.lofi;
  return (
    <div className={`pointer-events-none fixed inset-0 bg-gradient-to-br ${ambience.gradient}`}>
      <div className="absolute inset-0 opacity-50 [background:radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_24%)]" />
      <motion.div
        className="absolute -left-32 top-20 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: ambience.glow }}
        animate={{ x: [0, 80, 20], y: [0, 30, -20], scale: [1, 1.12, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-0 h-96 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: ambience.glow }}
        animate={{ x: [0, -80, 10], y: [0, -40, 20], scale: [1.1, 0.95, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {ambience.particles.map((particle, index) => (
        <motion.span
          key={particle}
          className={`absolute h-28 w-28 rounded-full blur-2xl ${particle}`}
          style={{ left: `${20 + index * 28}%`, top: `${18 + index * 18}%` }}
          animate={{ y: [0, -28, 0], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 7 + index * 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20" />
    </div>
  );
}
